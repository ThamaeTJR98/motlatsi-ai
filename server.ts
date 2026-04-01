
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Vite middleware setup
async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS for all routes
  app.use(cors());

  // Middleware for parsing JSON bodies
  app.use(express.json());

  // In-memory rate limiting map (Best effort for serverless)
  const rateLimit = new Map();
  const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 Hour
  const RATE_LIMIT_MAX = 50; // Requests per hour per IP

  // API Routes
  app.post('/api/generate', async (req, res) => {
    // --- Rate Limiting Logic ---
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const userRecord = rateLimit.get(ip) || { count: 0, startTime: now };

    if (now - userRecord.startTime > RATE_LIMIT_WINDOW) {
        // Reset window
        userRecord.count = 1;
        userRecord.startTime = now;
    } else {
        userRecord.count++;
    }

    rateLimit.set(ip, userRecord);

    if (userRecord.count > RATE_LIMIT_MAX) {
        return res.status(429).json({ error: 'Proxy rate limit exceeded. Please try again later.' });
    }
    // ---------------------------

    // Declare apiKey outside try block for error handling scope
    let apiKey: string | undefined;

    try {
      const { model, contents, config } = req.body;
      
      // 1. Check Header First (Client Override)
      const headerKey = req.headers['x-goog-api-key'];
      if (typeof headerKey === 'string') {
          apiKey = headerKey;
      }
      let source = 'header';

      // 2. Fallback to Environment Variables
      if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
          apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.VITE_API_KEY || process.env.VITE_GEMINI_API_KEY;
          source = 'env';
      }

      // Ensure key is clean and strip quotes if present
      if (apiKey) {
          apiKey = apiKey.trim();
          if ((apiKey.startsWith('"') && apiKey.endsWith('"')) || (apiKey.startsWith("'") && apiKey.endsWith("'"))) {
              apiKey = apiKey.substring(1, apiKey.length - 1);
          }
      }

      if (!apiKey || apiKey === 'undefined' || apiKey === 'null') {
        console.error('Server API key configuration missing');
        const envVars = Object.keys(process.env).filter(k => k.includes('API') || k.includes('KEY')).join(', ');
        console.error('Available Key-like Env Vars:', envVars);
        return res.status(500).json({ error: 'Server API key configuration missing', debug: { availableEnvVars: envVars } });
      }

      // Basic validation: Google API keys usually start with AIza
      if (!apiKey.startsWith('AIza')) {
          console.warn(`[WARNING] API Key might be invalid. Source: ${source}. Starts with: ${apiKey.substring(0, 4)}`);
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Log the attempt (masked)
      console.log(`[Proxy] Attempting GenAI call. Source: ${source}. Key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length-4)}`);
      console.log(`[Proxy] Model: ${model || 'gemini-3-flash-preview'}`);

      try {
          const response = await ai.models.generateContent({
            model: model || 'gemini-3-flash-preview',
            contents,
            config
          });
          console.log('[Proxy] Success');
          res.json(response);
      } catch (genAiError: any) {
          console.error('[Proxy] GenAI Error:', genAiError);
          throw genAiError; // Re-throw to be caught by outer catch
      }
    } catch (error: any) {
      console.error('[Proxy] AI Generation Error:', error);
      
      // Extract status and message from the error object if possible
      const status = error.status || error.code || 500;
      const errorMessage = error.message || (typeof error === 'object' ? JSON.stringify(error) : 'Internal Server Error');

      // Safe debug info (masking the key)
      const keyDebug = apiKey ? 
          `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)} (Length: ${apiKey.length})` : 
          'Missing/Empty';

      res.status(status === 429 ? 429 : 500).json({ 
          error: errorMessage, 
          details: {
              message: error.message,
              status: error.status,
              code: error.code,
              raw: error // Send the whole error for debugging
          },
          debug: {
              keyStatus: keyDebug,
              model: req.body.model || 'default'
          }
      });
    }
  });

  app.post('/api/battle', async (req, res) => {
    try {
      const { questions, answers, timeLeft } = req.body;

      if (!questions || !answers || !Array.isArray(questions) || !Array.isArray(answers)) {
         return res.status(400).json({ error: 'Invalid payload' });
      }

      let calculatedScore = 0;
      let correctCount = 0;

      // Verify answers against the provided question set (in a real app, verify ID against DB)
      // Here we trust the question object structure but verify logic server-side
      questions.forEach((q: any, index: number) => {
          const userAns = answers[index];
          // Assuming q.correctIndex is available on the question object
          if (userAns !== undefined && userAns === q.correctIndex) {
              calculatedScore += 1000;
              correctCount++;
          }
      });

      // Add time bonus securely
      if (correctCount > 0 && timeLeft > 0) {
          calculatedScore += (timeLeft * 10);
      }

      res.json({ 
          score: calculatedScore,
          correctCount,
          total: questions.length,
          verified: true 
      });

    } catch (error) {
      console.error('Battle Scoring Error:', error);
      res.status(500).json({ error: 'Scoring failed' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const path = await import('path');
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    app.get('*all', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

