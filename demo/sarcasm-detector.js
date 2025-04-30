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
            /fantastic/i,
            /groundbreaking/i,
            /revolutionary/i,
            /innovative/i,
            /brilliant/i,
            /genius/i
        ];
        
        this.exaggerationWords = [
            'totally', 'completely', 'absolutely', 'literally',
            'definitely', 'perfectly', 'exactly', 'precisely',
            'most', 'best', 'greatest', 'worst', 'never', 'always',
            'every', 'all', 'none', 'nothing', 'everything'
        ];
        
        this.ironyIndicators = [
            'of course', 'naturally', 'obviously', 'clearly',
            'as expected', 'predictably', 'surprise surprise',
            'if only', 'if we were', 'in a perfect world',
            'back in the day', 'in the good old days'
        ];

        this.temporalPhrases = [
            'still living in', 'back in', 'in the year',
            'in this day and age', 'in modern times',
            'in the future', 'in the past'
        ];

        // Simple sentiment analysis
        this.positiveWords = ['good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'perfect', 'love', 'like', 'enjoy', 'groundbreaking', 'revolutionary', 'innovative', 'brilliant', 'genius'];
        this.negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'dislike', 'hate', 'worst', 'poor', 'suck', 'stupid', 'outdated', 'old', 'ancient', 'primitive'];
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

        // Check for temporal phrases that might indicate sarcasm
        const hasTemporalPhrase = this.temporalPhrases.some(phrase =>
            text.toLowerCase().includes(phrase)
        );
        
        // Check for positive sentiment with negative context
        const hasPositiveSentimentWithNegativeContext = 
            sentiment.score > 0 && 
            (patternMatches || hasExaggeration || hasIrony || hasTemporalPhrase);
        
        // Calculate sarcasm probability
        const sarcasmScore = this.calculateSarcasmScore({
            patternMatches,
            hasExaggeration,
            hasIrony,
            hasTemporalPhrase,
            hasPositiveSentimentWithNegativeContext,
            sentimentScore: sentiment.score
        });
        
        return {
            isSarcastic: sarcasmScore > 0.4, // Lowered threshold to catch more subtle sarcasm
            confidence: sarcasmScore,
            sentiment: sentiment.score,
            indicators: {
                patternMatches,
                hasExaggeration,
                hasIrony,
                hasTemporalPhrase,
                hasPositiveSentimentWithNegativeContext
            }
        };
    }

    calculateSarcasmScore(indicators) {
        let score = 0;
        
        // Pattern matches are strong indicators
        if (indicators.patternMatches) score += 0.3;
        
        // Exaggeration is a moderate indicator
        if (indicators.hasExaggeration) score += 0.2;
        
        // Irony indicators are moderate indicators
        if (indicators.hasIrony) score += 0.2;

        // Temporal phrases are strong indicators
        if (indicators.hasTemporalPhrase) score += 0.3;
        
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