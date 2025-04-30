// Browser-compatible version of the sarcasm detector
class SarcasmDetector {
    constructor() {
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

        // Simple sentiment analysis
        this.positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'perfect', 'love', 'like', 'enjoy'];
        this.negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'dislike', 'hate', 'worst', 'poor', 'suck', 'stupid'];
    }

    analyzeSentiment(text) {
        let score = 0;
        const words = text.toLowerCase().split(/\s+/);
        
        words.forEach(word => {
            if (this.positiveWords.includes(word)) score += 1;
            if (this.negativeWords.includes(word)) score -= 1;
        });
        
        return { score };
    }

    detectSarcasm(text) {
        const sentiment = this.analyzeSentiment(text);
        const tokens = text.toLowerCase().split(/\s+/);
        
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

    detectTone(text) {
        const sentiment = this.analyzeSentiment(text);
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