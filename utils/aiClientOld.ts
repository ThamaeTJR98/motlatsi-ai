import { GoogleGenAI, Type } from "@google/genai";
import { Capacitor } from '@capacitor/core';

/**
 * Helper to ensure the response object mimics the SDK's response structure,
 * specifically the .text getter which might be lost during JSON serialization from the proxy.
 */
const wrapResponse = (data: any) => {
    return {
        ...data,
        get text(): string | undefined {
            if (data.candidates && data.candidates.length > 0 && 
                data.candidates[0].content && 
                data.candidates[0].content.parts && 
                data.candidates[0].content.parts.length > 0) {
                return data.candidates[0].content.parts.map((p: any) => p.text).join('');
            }
            return undefined;
        }
    };
};

/**
 * Safely retrieve the API Key injected by Vite.
 */
const getApiKey = (): string | undefined => {
    try {
        const key = process.env.API_KEY || process.env.VITE_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        if (key) {
            console.log("AI_DEBUG: API Key found in process.env");
            return key;
        }
        
        if (import.meta.env) {
            const viteKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY || import.meta.env.API_KEY;
            if (viteKey) {
                console.log("AI_DEBUG: API Key found in import.meta.env");
                return viteKey;
            }
        }
        
        console.log("AI_DEBUG: API Key NOT found");
        return undefined;
    } catch (e) {
        console.error("AI_DEBUG: Error retrieving API Key", e);
        return undefined;
    }
};

// Sleep helper
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simple in-memory cache to prevent redundant requests
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours (increased for better persistence in session)

/**
 * Retry wrapper for API calls.
 * Retries on 429 (Too Many Requests) and 503 (Service Unavailable).
 */
const withRetry = async <T>(
    fn: () => Promise<T>, 
    options: { retries?: number, initialDelay?: number, retryOn429?: boolean } = {}
): Promise<T> => {
  const retries = options.retries ?? 5;
  const initialDelay = options.initialDelay ?? 3000;
  const retryOn429 = options.retryOn429 ?? true;

  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error: any) {
      attempt++;
      
      // Check for rate limit or server overload indicators
      const msg = typeof error === 'string' ? error : (error?.message || JSON.stringify(error) || '');
      const status = error?.status || error?.response?.status;
      const code = error?.error?.code || error?.code; 
      
      const isRateLimit = status === 429 || code === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota');
      const isServerOverload = status === 503 || status === 500 || msg.includes('503') || msg.includes('500');
      
      // If it's a rate limit error, notify the app so it can show a key selection prompt if needed
      if (isRateLimit && aiClient.onQuotaExceeded) {
          aiClient.onQuotaExceeded();
      }

      // Determine if we should retry
      const shouldRetry = isServerOverload || (isRateLimit && retryOn429);

      // If it's a retryable error and we haven't hit max retries...
      if (shouldRetry && attempt < retries) {
        // Try to extract retry delay from error if provided (e.g., "27s")
        let delay = initialDelay * Math.pow(2, attempt - 1) + (Math.random() * 1000);
        
        // Look for retryDelay in the error details if available
        const retryInfo = error?.error?.details?.find((d: any) => d['@type']?.includes('RetryInfo'));
        if (retryInfo?.retryDelay) {
            const seconds = parseInt(retryInfo.retryDelay);
            if (!isNaN(seconds)) {
                delay = (seconds + 1) * 1000; // Add 1s buffer
            }
        } else if (msg.includes('retry in')) {
            const match = msg.match(/retry in ([\d.]+)s/);
            if (match && match[1]) {
                delay = (parseFloat(match[1]) + 1) * 1000;
            }
        }

        console.warn(`AI Request failed (Attempt ${attempt}/${retries}). Retrying in ${Math.round(delay)}ms...`, msg);
        await wait(delay);
        continue;
      }
      // If not retryable or max retries reached, throw the error
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};

export const aiClient = {
  onQuotaExceeded: null as (() => void) | null,
  onConsumeCredit: null as ((params?: { orgId?: string }) => boolean | Promise<boolean>) | null,
  
  generate: async (params: { model?: string, contents: any, config?: any, cacheKey?: string, organizationId?: string }) => {
    // Generate a cache key based on params, or use the explicit one provided
    const cacheKey = params.cacheKey || `ai_cache_${JSON.stringify({
        model: params.model || 'gemini-3-flash-preview',
        contents: params.contents,
        systemInstruction: params.config?.systemInstruction
    })}`;

    // Try to get from in-memory cache first
    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        console.log("Returning cached AI response (memory)", cacheKey);
        return cached.data;
    }

    // Try to get from localStorage cache as secondary
    try {
        const localCached = localStorage.getItem(cacheKey);
        if (localCached) {
            const parsed = JSON.parse(localCached);
            if (Date.now() - parsed.timestamp < CACHE_TTL) {
                console.log("Returning cached AI response (localStorage)", cacheKey);
                // Backfill memory cache
                cache.set(cacheKey, parsed);
                return parsed.data;
            }
        }
    } catch (e) {
        // Ignore localStorage errors
    }

    // --- CACHE MISS: We are about to call the real API ---
    
    // 1. Check Quotas/Credits before making the call
    if (aiClient.onConsumeCredit) {
        const hasCredit = await aiClient.onConsumeCredit({ orgId: params.organizationId });
        if (!hasCredit) {
            const error: any = new Error("QUOTA_EXCEEDED");
            error.status = 402; // Payment Required / Quota Exceeded
            throw error;
        }
    }

    // Model Fallback Strategy
    const requestedModel = params.model || 'gemini-3-flash-preview';
    // Fallback models: Try generic Flash Latest (1.5) if the preview fails.
    // We explicitly DO NOT fallback to Pro models to protect the free tier quota and prevent 429s.
    const fallbackModels = ['gemini-flash-latest'];
    const uniqueModels = [...new Set([requestedModel, ...fallbackModels])];

    let result: any;
    let lastError: any;

    for (let i = 0; i < uniqueModels.length; i++) {
        const currentModel = uniqueModels[i];
        const isLastModel = i === uniqueModels.length - 1;

        try {
            result = await withRetry(async () => {
                const apiKey = getApiKey();
                
                // 1. Direct Client Call (Preferred if Key is available locally)
                if (apiKey && typeof apiKey === 'string' && apiKey.length > 0 && apiKey.startsWith('AIza')) {
                    try {
                        const ai = new GoogleGenAI({ apiKey });
                        const response = await ai.models.generateContent({
                            model: currentModel, // Use the current model in the fallback chain
                            contents: params.contents,
                            config: params.config
                        });
                        return response;
                    } catch (clientError: any) {
                        if (typeof clientError === 'object' && clientError !== null) {
                            throw clientError;
                        }
                        throw new Error(String(clientError));
                    }
                } 
                
                // 2. Proxy Call (Fallback)
                else {
                    try {
                        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                        if (apiKey) {
                            headers['x-goog-api-key'] = apiKey;
                        }

                        const response = await fetch('/api/generate', {
                            method: 'POST',
                            headers,
                            body: JSON.stringify({
                                ...params,
                                model: currentModel // Override model
                            })
                        });

                        if (!response.ok) {
                            const err = await response.json().catch(() => ({}));
                            const errorMessage = err.error || `AI Request Failed: ${response.status}`;
                            const error: any = new Error(errorMessage);
                            error.status = response.status;
                            error.error = err.error_details || err; 
                            throw error;
                        }

                        const data = await response.json();
                        return wrapResponse(data);
                    } catch (proxyError) {
                        console.error("AI Proxy Error:", proxyError);
                        throw proxyError;
                    }
                }
            }, {
                // If it's the last model, retry aggressively (5 attempts).
                // If it's NOT the last model, try only ONCE (1 attempt) so we can fail fast and switch.
                retryOn429: isLastModel,
                retries: isLastModel ? 5 : 1 
            });

            // If successful, break the loop
            break;

        } catch (error: any) {
            lastError = error;
            const msg = typeof error === 'string' ? error : (error?.message || '');
            const status = error?.status || error?.response?.status;
            const isRateLimit = status === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED');
            const isNotFound = status === 404 || msg.includes('404') || msg.includes('NOT_FOUND');

            // If it's a rate limit OR not found (bad model name) and we have more models to try, log and continue
            if ((isRateLimit || isNotFound) && !isLastModel) {
                console.warn(`Model ${currentModel} failed (${isRateLimit ? 'Rate Limited' : 'Not Found'}). Falling back to ${uniqueModels[i+1]}...`);
                continue;
            }
            
            // Otherwise (server error or last model), throw
            throw error;
        }
    }

    // Cache the successful result
    const cacheEntry = { data: result, timestamp: Date.now() };
    cache.set(cacheKey, cacheEntry);
    try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        
        // Cleanup old cache entries if localStorage is getting full
        if (localStorage.length > 50) {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('ai_cache_'));
            if (keys.length > 30) {
                keys.sort().slice(0, 10).forEach(k => localStorage.removeItem(k));
            }
        }
    } catch (e) {
        // Ignore localStorage errors
    }
    return result;
  }
};
