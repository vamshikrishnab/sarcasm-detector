// Browser-compatible version of the sarcasm detector
class SarcasmDetector {
    constructor() {
        // Basic sarcasm patterns
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
        
        // Exaggeration and hyperbole
        this.exaggerationWords = [
            'totally', 'completely', 'absolutely', 'literally',
            'definitely', 'perfectly', 'exactly', 'precisely',
            'most', 'best', 'greatest', 'worst', 'never', 'always',
            'every', 'all', 'none', 'nothing', 'everything',
            'unbelievable', 'incredible', 'mind-blowing', 'earth-shattering'
        ];
        
        // Irony and contradiction indicators
        this.ironyIndicators = [
            'of course', 'naturally', 'obviously', 'clearly',
            'as expected', 'predictably', 'surprise surprise',
            'if only', 'if we were', 'in a perfect world',
            'back in the day', 'in the good old days',
            'because that makes sense', 'that\'s logical',
            'makes perfect sense', 'totally reasonable'
        ];

        // Temporal and contextual phrases
        this.temporalPhrases = [
            'still living in', 'back in', 'in the year',
            'in this day and age', 'in modern times',
            'in the future', 'in the past',
            'in the 21st century', 'in today\'s world'
        ];

        // Contradiction patterns
        this.contradictionPatterns = [
            /but.*actually/i,
            /except.*not/i,
            /unless.*you.*don't/i,
            /unless.*you.*do/i,
            /as if.*would/i,
            /like.*would/i
        ];

        // Contextual indicators
        this.contextualIndicators = {
            positive: ['great', 'amazing', 'wonderful', 'perfect', 'excellent', 'brilliant', 'genius', 'innovative', 'revolutionary'],
            negative: ['terrible', 'awful', 'horrible', 'disastrous', 'catastrophic', 'outdated', 'primitive', 'archaic'],
            neutral: ['interesting', 'fascinating', 'curious', 'notable', 'remarkable']
        };

        // Semantic patterns for deep sarcasm
        this.semanticPatterns = [
            {
                pattern: /(?:very|extremely|incredibly|unbelievably)\s+(?:helpful|useful|productive)/i,
                weight: 0.3
            },
            {
                pattern: /(?:just|exactly|precisely)\s+(?:what|the thing)\s+(?:i|we)\s+(?:needed|wanted)/i,
                weight: 0.4
            },
            {
                pattern: /(?:because|since)\s+(?:that|this)\s+(?:makes|made)\s+(?:perfect|total)\s+sense/i,
                weight: 0.4
            },
            {
                pattern: /(?:in|during)\s+(?:the|this)\s+(?:21st|modern)\s+(?:century|era|age)/i,
                weight: 0.3
            }
        ];

        // Sentiment analysis
        this.positiveWords = [
            'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'perfect',
            'love', 'like', 'enjoy', 'groundbreaking', 'revolutionary', 'innovative',
            'brilliant', 'genius', 'helpful', 'useful', 'productive', 'efficient'
        ];
        this.negativeWords = [
            'bad', 'terrible', 'awful', 'horrible', 'dislike', 'hate', 'worst',
            'poor', 'suck', 'stupid', 'outdated', 'old', 'ancient', 'primitive',
            'archaic', 'useless', 'pointless', 'waste', 'failure'
        ];
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

    analyzeContext(text) {
        const context = {
            hasPositiveWords: false,
            hasNegativeWords: false,
            hasContradiction: false,
            hasTemporalReference: false,
            semanticScore: 0
        };

        // Check for positive/negative word combinations
        this.contextualIndicators.positive.forEach(word => {
            if (text.toLowerCase().includes(word)) {
                context.hasPositiveWords = true;
            }
        });

        this.contextualIndicators.negative.forEach(word => {
            if (text.toLowerCase().includes(word)) {
                context.hasNegativeWords = true;
            }
        });

        // Check for contradiction patterns
        context.hasContradiction = this.contradictionPatterns.some(pattern => 
            pattern.test(text)
        );

        // Check for temporal references
        context.hasTemporalReference = this.temporalPhrases.some(phrase =>
            text.toLowerCase().includes(phrase)
        );

        // Calculate semantic score
        this.semanticPatterns.forEach(pattern => {
            if (pattern.pattern.test(text)) {
                context.semanticScore += pattern.weight;
            }
        });

        return context;
    }

    detectSarcasm(text) {
        const sentiment = this.analyzeSentiment(text);
        const context = this.analyzeContext(text);
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

        // Check for temporal phrases
        const hasTemporalPhrase = context.hasTemporalReference;
        
        // Check for contradiction
        const hasContradiction = context.hasContradiction;
        
        // Check for positive sentiment with negative context
        const hasPositiveSentimentWithNegativeContext = 
            (sentiment.score > 0 && context.hasNegativeWords) ||
            (context.hasPositiveWords && context.hasNegativeWords);
        
        // Calculate sarcasm probability
        const sarcasmScore = this.calculateSarcasmScore({
            patternMatches,
            hasExaggeration,
            hasIrony,
            hasTemporalPhrase,
            hasContradiction,
            hasPositiveSentimentWithNegativeContext,
            semanticScore: context.semanticScore,
            sentimentScore: sentiment.score
        });
        
        return {
            isSarcastic: sarcasmScore > 0.35, // Lowered threshold for better detection
            confidence: sarcasmScore,
            sentiment: sentiment.score,
            indicators: {
                patternMatches,
                hasExaggeration,
                hasIrony,
                hasTemporalPhrase,
                hasContradiction,
                hasPositiveSentimentWithNegativeContext,
                semanticScore: context.semanticScore
            }
        };
    }

    calculateSarcasmScore(indicators) {
        let score = 0;
        
        // Pattern matches
        if (indicators.patternMatches) score += 0.2;
        
        // Exaggeration
        if (indicators.hasExaggeration) score += 0.2;
        
        // Irony indicators
        if (indicators.hasIrony) score += 0.2;

        // Temporal phrases
        if (indicators.hasTemporalPhrase) score += 0.2;

        // Contradiction
        if (indicators.hasContradiction) score += 0.3;
        
        // Positive sentiment with negative context
        if (indicators.hasPositiveSentimentWithNegativeContext) score += 0.3;

        // Semantic score
        score += indicators.semanticScore;
        
        // Normalize score to 0-1 range
        return Math.min(1, score);
    }

    detectTone(text) {
        const sentiment = this.analyzeSentiment(text);
        const sarcasm = this.detectSarcasm(text);
        const context = this.analyzeContext(text);
        
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
            isSarcastic: sarcasm.isSarcastic,
            context: context
        };
    }
} 