
import { LearningNeed } from "../types";

/**
 * Safely parses JSON returned from an LLM.
 * Aggressively cleans Markdown, fix common trailing commas, and partial JSON issues.
 */
export const safeJsonParse = <T>(text: string | undefined, fallback: T | null = null): T | null => {
    if (!text) return fallback;

    try {
        // 1. Strip Markdown code blocks
        let cleanText = text.replace(/```json\n?|```/g, '').trim();
        
        // 2. Remove "json" prefix if it exists without backticks
        if (cleanText.toLowerCase().startsWith('json')) {
            cleanText = cleanText.substring(4).trim();
        }

        // 3. Remove any text before the first '{' or '['
        const firstBracket = cleanText.search(/[{[]/);
        if (firstBracket > 0) {
            cleanText = cleanText.substring(firstBracket);
        }

        // 4. Remove any text after the last '}' or ']'
        const lastBracket = cleanText.search(/[}\]]$/); // Check if it ends correctly
        // (If not, we might need to find the last occurrence, but usually LLMs finish the block)
        const lastCurly = cleanText.lastIndexOf('}');
        const lastSquare = cleanText.lastIndexOf(']');
        const end = Math.max(lastCurly, lastSquare);
        if (end !== -1) {
            cleanText = cleanText.substring(0, end + 1);
        }

        return JSON.parse(cleanText) as T;
    } catch (e) {
        console.error("JSON Parse Error on AI output:", e);
        return fallback;
    }
};

/**
 * DEPRECATED: Images are now handled via CSS patterns/Icons to ensure production reliability.
 * Returns a placeholder to prevent crashes if called.
 */
export const getSafeImageUrl = (keyword: string): string => {
    return `https://placehold.co/800x600/e2e8f0/475569?text=${encodeURIComponent(keyword)}`;
};

/**
 * Checks if the browser supports Speech Recognition (Chrome/Edge/Android).
 */
export const supportsSpeechRecognition = (): boolean => {
    if (typeof window === 'undefined') return false;
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

/**
 * Generates specific pedagogical instructions based on a student's learning needs.
 */
export const getLearnerProfileContext = (needs: LearningNeed[] | undefined): string => {
    if (!needs || needs.length === 0) return "";

    const instructions: string[] = [];

    if (needs.includes('visual_impairment')) {
        instructions.push("STRICT ACCESSIBILITY: Content must be descriptive text only. No reliance on diagrams.");
    }
    if (needs.includes('dyslexia')) {
        instructions.push("FORMATTING: Use short sentences, bullet points, and simple vocabulary.");
    }
    if (needs.includes('adhd')) {
        instructions.push("ENGAGEMENT: Break concepts into micro-chunks. Use exciting, active language.");
    }

    if (instructions.length > 0) {
        return `\n\nLEARNER PROFILE ADJUSTMENTS:\n${instructions.join('\n')}\n`;
    }
    return "";
};

/**
 * Simple string matching helper for voice answers.
 * Returns true if the input contains the target answer (fuzzy).
 */
export const isFuzzyMatch = (input: string, targets: string[], threshold: number = 0.8): boolean => {
    if (!input || !targets || targets.length === 0) return false;
    const lowerInput = input.toLowerCase();
    return targets.some(target => lowerInput.includes(target.toLowerCase()));
};
