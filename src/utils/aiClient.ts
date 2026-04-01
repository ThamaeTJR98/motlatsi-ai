import { GoogleGenAI } from "@google/genai";

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

const getApiKey = (): string | undefined => {
    try {
        const key = process.env.API_KEY || process.env.VITE_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
        if (key) return key;
        
        if (import.meta.env) {
            const viteKey = import.meta.env.VITE_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY || import.meta.env.API_KEY;
            if (viteKey) return viteKey;
        }
        return undefined;
    } catch (e) {
        return undefined;
    }
};

const getApiBaseUrl = (): string => {
    try {
        // 1. Check environment variables
        const envUrl = process.env.VITE_API_BASE_URL || (import.meta.env && import.meta.env.VITE_API_BASE_URL);
        if (envUrl) return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;

        // 2. Detect if we are in a native environment (Capacitor)
        const isNative = window.location.protocol === 'capacitor:' || window.location.protocol === 'http:' && window.location.hostname === 'localhost' && !window.location.port;
        
        // 3. Fallback to current origin if not native
        if (!isNative) return '';
        
        return ''; // Default to relative if we can't determine
    } catch (e) {
        return '';
    }
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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
      
      const msg = typeof error === 'string' ? error : (error?.message || JSON.stringify(error) || '');
      const status = error?.status || error?.response?.status;
      const code = error?.error?.code || error?.code; 
      
      const isRateLimit = status === 429 || code === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota');
      const isServerOverload = status === 503 || status === 500 || msg.includes('503') || msg.includes('500');
      
      if (isRateLimit && aiClient.onQuotaExceeded) {
          aiClient.onQuotaExceeded();
      }

      const shouldRetry = isServerOverload || (isRateLimit && retryOn429);

      if (shouldRetry && attempt < retries) {
        let delay = initialDelay * Math.pow(2, attempt - 1) + (Math.random() * 1000);
        
        const retryInfo = error?.error?.details?.find((d: any) => d['@type']?.includes('RetryInfo'));
        if (retryInfo?.retryDelay) {
            const seconds = parseInt(retryInfo.retryDelay);
            if (!isNaN(seconds)) {
                delay = (seconds + 1) * 1000;
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
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};

const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export const aiClient = {
  onQuotaExceeded: null as (() => void) | null,
  onConsumeCredit: null as ((params?: { orgId?: string }) => boolean | Promise<boolean>) | null,
  
  generate: async (params: { model?: string, contents: any, config?: any, cacheKey?: string, organizationId?: string }) => {
    const cacheKey = params.cacheKey || `ai_cache_${JSON.stringify({
        model: params.model || 'gemini-3-flash-preview',
        contents: params.contents,
        systemInstruction: params.config?.systemInstruction
    })}`;

    const cached = cache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
        return cached.data;
    }

    try {
        const localCached = localStorage.getItem(cacheKey);
        if (localCached) {
            const parsed = JSON.parse(localCached);
            if (Date.now() - parsed.timestamp < CACHE_TTL) {
                cache.set(cacheKey, parsed);
                return parsed.data;
            }
        }
    } catch (e) {
        // Silently ignore localStorage errors
    }

    if (aiClient.onConsumeCredit) {
        const hasCredit = await aiClient.onConsumeCredit({ orgId: params.organizationId });
        if (!hasCredit) {
            const error: any = new Error("QUOTA_EXCEEDED");
            error.status = 402;
            throw error;
        }
    }

    const requestedModel = params.model || 'gemini-3-flash-preview';
    const fallbackModels = ['gemini-flash-latest'];
    const uniqueModels = [...new Set([requestedModel, ...fallbackModels])];

    let result: any;

    for (let i = 0; i < uniqueModels.length; i++) {
        const currentModel = uniqueModels[i];
        const isLastModel = i === uniqueModels.length - 1;

        try {
            result = await withRetry(async () => {
                const apiKey = getApiKey();
                
                if (apiKey && typeof apiKey === 'string' && apiKey.length > 0 && apiKey.startsWith('AIza')) {
                    const ai = new GoogleGenAI({ apiKey });
                    const response = await ai.models.generateContent({
                        model: currentModel,
                        contents: params.contents,
                        config: params.config
                    });
                    return response;
                } 
                else {
                    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                    if (apiKey) {
                        headers['x-goog-api-key'] = apiKey;
                    }

                    const baseUrl = getApiBaseUrl();
                    const response = await fetch(`${baseUrl}/api/generate`, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({
                            ...params,
                            model: currentModel
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
                }
            }, {
                retryOn429: isLastModel,
                retries: isLastModel ? 5 : 1 
            });

            break;

        } catch (error: any) {
            const msg = typeof error === 'string' ? error : (error?.message || '');
            const status = error?.status || error?.response?.status;
            const isRateLimit = status === 429 || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED');
            const isNotFound = status === 404 || msg.includes('404') || msg.includes('NOT_FOUND');

            if ((isRateLimit || isNotFound) && !isLastModel) {
                continue;
            }
            
            throw error;
        }
    }

    const cacheEntry = { data: result, timestamp: Date.now() };
    cache.set(cacheKey, cacheEntry);
    try {
        localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
        
        if (localStorage.length > 50) {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('ai_cache_'));
            if (keys.length > 30) {
                keys.sort().slice(0, 10).forEach(k => localStorage.removeItem(k));
            }
        }
    } catch (e) {
        // Silently ignore localStorage errors
    }
    return result;
  }
};
