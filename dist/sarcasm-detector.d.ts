declare class SarcasmDetector {
    constructor();

    /**
     * Analyzes the sentiment of the given text
     * @param text The text to analyze
     * @returns Object containing sentiment score and context score
     */
    analyzeSentiment(text: string): {
        score: number;
        contextScore: number;
    };

    /**
     * Analyzes the context of the given text
     * @param text The text to analyze
     * @returns Object containing various context indicators and scores
     */
    analyzeContext(text: string): {
        hasPositiveWords: boolean;
        hasNegativeWords: boolean;
        hasContradiction: boolean;
        hasTemporalReference: boolean;
        semanticScore: number;
        contextScore: number;
    };

    /**
     * Detects sarcasm in the given text
     * @param text The text to analyze
     * @returns Object containing sarcasm detection results and indicators
     */
    detectSarcasm(text: string): {
        isSarcastic: boolean;
        confidence: number;
        sentiment: number;
        indicators: {
            patternMatches: boolean;
            hasExaggeration: boolean;
            hasIrony: boolean;
            hasTemporalPhrase: boolean;
            hasContradiction: boolean;
            hasPositiveSentimentWithNegativeContext: boolean;
            semanticScore: number;
            contextScore: number;
        };
    };

    /**
     * Detects the tone of the given text
     * @param text The text to analyze
     * @returns Object containing tone detection results
     */
    detectTone(text: string): {
        tone: 'sarcastic' | 'positive' | 'negative' | 'ironic' | 'neutral';
        confidence: number;
        sentiment: number;
        contextScore: number;
    };
}

export = SarcasmDetector; 