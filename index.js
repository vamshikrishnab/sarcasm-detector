const Sentiment = require('sentiment');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

class SarcasmDetector {
    constructor() {
        this.sentiment = new Sentiment();
        this.sarcasmPatterns = [
            /yeah right/i,
            /sure thing/i,
            /as if/i,
            /whatever you say/i,
            /oh great/i,
            /just what i needed/i,
            /perfect timing/i,
            /wow/i,
            /amazing/i,
            /fantastic/i
        ];
        
        this.exaggerationWords = [
            'totally', 'completely', 'absolutely', 'literally',
            'definitely', 'perfectly', 'exactly', 'precisely'
        ];
        
        this.ironyIndicators = [
            'of course', 'naturally', 'obviously', 'clearly',
            'as expected', 'predictably', 'surprise surprise'
        ];
    }

    /**
     * Detects sarcasm in a given text
     * @param {string} text - The text to analyze
     * @returns {Object} - Analysis results
     */
    detectSarcasm(text) {
        const sentiment = this.sentiment.analyze(text);
        const tokens = tokenizer.tokenize(text);
        
        // Check for common sarcasm patterns
        const patternMatches = this.sarcasmPatterns.some(pattern => pattern.test(text));
        
        // Check for exaggeration
        const hasExaggeration = this.exaggerationWords.some(word => 
            tokens.includes(word.toLowerCase())
        );
        
        // Check for irony indicators
        const hasIrony = this.ironyIndicators.some(indicator => 
            text.toLowerCase().includes(indicator)
        );
        
        // Check for positive sentiment with negative context
        const hasPositiveSentimentWithNegativeContext = 
            sentiment.score > 0 && 
            (patternMatches || hasExaggeration || hasIrony);
        
        // Calculate sarcasm probability
        const sarcasmScore = this.calculateSarcasmScore({
            patternMatches,
            hasExaggeration,
            hasIrony,
            hasPositiveSentimentWithNegativeContext,
            sentimentScore: sentiment.score
        });
        
        return {
            isSarcastic: sarcasmScore > 0.5,
            confidence: sarcasmScore,
            sentiment: sentiment.score,
            indicators: {
                patternMatches,
                hasExaggeration,
                hasIrony,
                hasPositiveSentimentWithNegativeContext
            }
        };
    }

    /**
     * Calculates a sarcasm probability score
     * @param {Object} indicators - Various indicators of sarcasm
     * @returns {number} - Sarcasm probability (0-1)
     */
    calculateSarcasmScore(indicators) {
        let score = 0;
        
        // Pattern matches are strong indicators
        if (indicators.patternMatches) score += 0.4;
        
        // Exaggeration is a moderate indicator
        if (indicators.hasExaggeration) score += 0.2;
        
        // Irony indicators are moderate indicators
        if (indicators.hasIrony) score += 0.2;
        
        // Positive sentiment with negative context is a strong indicator
        if (indicators.hasPositiveSentimentWithNegativeContext) score += 0.4;
        
        // Normalize score to 0-1 range
        return Math.min(1, score);
    }

    /**
     * Detects the tone of a given text
     * @param {string} text - The text to analyze
     * @returns {Object} - Tone analysis results
     */
    detectTone(text) {
        const sentiment = this.sentiment.analyze(text);
        const sarcasm = this.detectSarcasm(text);
        
        let tone = 'neutral';
        
        if (sarcasm.isSarcastic) {
            tone = 'sarcastic';
        } else if (sentiment.score > 2) {
            tone = 'positive';
        } else if (sentiment.score < -2) {
            tone = 'negative';
        } else if (sentiment.score > 0) {
            tone = 'slightly positive';
        } else if (sentiment.score < 0) {
            tone = 'slightly negative';
        }
        
        return {
            tone,
            confidence: Math.abs(sentiment.score) / 5,
            sentiment: sentiment.score,
            isSarcastic: sarcasm.isSarcastic
        };
    }
}

module.exports = SarcasmDetector; 