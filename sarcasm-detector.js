// Browser-compatible version of the sarcasm detector with enhanced NLP
class SarcasmDetector {
    constructor() {
        // Pre-trained word embeddings for common words (simplified version)
        this.wordEmbeddings = {
            'great': [0.8, 0.2, 0.1],
            'amazing': [0.9, 0.3, 0.2],
            'wonderful': [0.85, 0.25, 0.15],
            'terrible': [-0.8, -0.2, -0.1],
            'awful': [-0.9, -0.3, -0.2],
            'horrible': [-0.85, -0.25, -0.15],
            'perfect': [0.95, 0.4, 0.3],
            'excellent': [0.9, 0.35, 0.25],
            'brilliant': [0.85, 0.3, 0.2],
            'genius': [0.9, 0.35, 0.25],
            'innovative': [0.8, 0.25, 0.15],
            'revolutionary': [0.85, 0.3, 0.2],
            'outdated': [-0.7, -0.2, -0.1],
            'primitive': [-0.75, -0.25, -0.15],
            'archaic': [-0.8, -0.3, -0.2]
        };

        // Enhanced sarcasm patterns with context
        this.sarcasmPatterns = [
            {
                pattern: /yeah right/i,
                context: ['doubt', 'skepticism', 'disbelief'],
                weight: 0.3
            },
            {
                pattern: /sure thing/i,
                context: ['skepticism', 'doubt'],
                weight: 0.3
            },
            {
                pattern: /as if/i,
                context: ['impossibility', 'unlikelihood'],
                weight: 0.4
            },
            {
                pattern: /whatever you say/i,
                context: ['dismissal', 'disagreement'],
                weight: 0.3
            },
            {
                pattern: /oh great/i,
                context: ['sarcasm', 'disappointment'],
                weight: 0.4
            },
            {
                pattern: /just what i needed/i,
                context: ['sarcasm', 'frustration'],
                weight: 0.4
            },
            {
                pattern: /totally my favorite/i,
                context: ['sarcasm', 'exaggeration'],
                weight: 0.5
            },
            {
                pattern: /just love when/i,
                context: ['sarcasm', 'frustration'],
                weight: 0.5
            },
            {
                pattern: /can't wait/i,
                context: ['sarcasm', 'anticipation'],
                weight: 0.4
            },
            {
                pattern: /not\.$/i,
                context: ['sarcasm', 'negation'],
                weight: 0.6
            },
            {
                pattern: /perfect plan/i,
                context: ['sarcasm', 'approval'],
                weight: 0.4
            },
            {
                pattern: /amazing\. that's exactly what/i,
                context: ['sarcasm', 'approval'],
                weight: 0.5
            },
            {
                pattern: /absolutely thrilled/i,
                context: ['sarcasm', 'enthusiasm'],
                weight: 0.5
            },
            {
                pattern: /what a surprise/i,
                context: ['sarcasm', 'surprise'],
                weight: 0.4
            },
            {
                pattern: /nothing screams.*like/i,
                context: ['sarcasm', 'comparison'],
                weight: 0.5
            },
            {
                pattern: /so clear.*more confused/i,
                context: ['sarcasm', 'clarity'],
                weight: 0.5
            }
        ];

        // Enhanced exaggeration patterns with intensity levels
        this.exaggerationPatterns = [
            {
                words: ['totally', 'completely', 'absolutely'],
                intensity: 0.8,
                context: ['emphasis', 'hyperbole']
            },
            {
                words: ['literally', 'definitely', 'perfectly'],
                intensity: 0.7,
                context: ['certainty', 'emphasis']
            },
            {
                words: ['most', 'best', 'greatest', 'worst'],
                intensity: 0.9,
                context: ['superlative', 'extreme']
            },
            {
                words: ['never', 'always', 'every', 'all'],
                intensity: 0.8,
                context: ['absolute', 'universal']
            },
            {
                words: ['favorite', 'love', 'thrilled', 'excited'],
                intensity: 0.9,
                context: ['enthusiasm', 'sarcasm']
            }
        ];

        // Enhanced irony indicators with context
        this.ironyIndicators = [
            {
                phrase: 'of course',
                context: ['obviousness', 'sarcasm'],
                weight: 0.3
            },
            {
                phrase: 'naturally',
                context: ['obviousness', 'sarcasm'],
                weight: 0.3
            },
            {
                phrase: 'obviously',
                context: ['obviousness', 'sarcasm'],
                weight: 0.3
            },
            {
                phrase: 'clearly',
                context: ['obviousness', 'sarcasm'],
                weight: 0.3
            },
            {
                phrase: 'as expected',
                context: ['predictability', 'sarcasm'],
                weight: 0.4
            }
        ];

        // Enhanced temporal patterns with context
        this.temporalPatterns = [
            {
                pattern: /still living in/i,
                context: ['outdated', 'anachronism'],
                weight: 0.4
            },
            {
                pattern: /back in/i,
                context: ['nostalgia', 'outdated'],
                weight: 0.3
            },
            {
                pattern: /in this day and age/i,
                context: ['modern', 'contemporary'],
                weight: 0.3
            },
            {
                pattern: /in the 21st century/i,
                context: ['modern', 'contemporary'],
                weight: 0.3
            }
        ];

        // Enhanced contradiction patterns with context
        this.contradictionPatterns = [
            {
                pattern: /but.*actually/i,
                context: ['correction', 'contradiction'],
                weight: 0.4
            },
            {
                pattern: /except.*not/i,
                context: ['negation', 'contradiction'],
                weight: 0.4
            },
            {
                pattern: /unless.*you.*don't/i,
                context: ['condition', 'contradiction'],
                weight: 0.3
            }
        ];

        // Enhanced sentiment analysis with context
        this.sentimentContext = {
            positive: {
                words: ['good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic', 'perfect',
                       'love', 'like', 'enjoy', 'thrilled', 'excited', 'favorite', 'brilliant',
                       'clear', 'productive', 'helpful', 'useful'],
                context: ['praise', 'approval', 'enthusiasm'],
                weight: 0.8
            },
            negative: {
                words: ['bad', 'terrible', 'awful', 'horrible', 'dislike', 'hate', 'worst',
                       'poor', 'suck', 'stupid', 'outdated', 'old', 'ancient', 'primitive',
                       'archaic', 'useless', 'pointless', 'waste', 'failure', 'confused',
                       'crashed', 'broke', 'cut', 'ignore'],
                context: ['criticism', 'disapproval', 'frustration'],
                weight: 0.8
            },
            neutral: {
                words: ['interesting', 'fascinating', 'curious', 'notable', 'remarkable',
                       'surprise', 'wait', 'hope', 'plan'],
                context: ['observation', 'neutral', 'anticipation'],
                weight: 0.5
            }
        };

        // Enhanced semantic patterns with context and weights
        this.semanticPatterns = [
            {
                pattern: /(?:very|extremely|incredibly|unbelievably)\s+(?:helpful|useful|productive)/i,
                context: ['exaggeration', 'sarcasm'],
                weight: 0.4
            },
            {
                pattern: /(?:just|exactly|precisely)\s+(?:what|the thing)\s+(?:i|we)\s+(?:needed|wanted)/i,
                context: ['sarcasm', 'frustration'],
                weight: 0.5
            },
            {
                pattern: /(?:because|since)\s+(?:that|this)\s+(?:makes|made)\s+(?:perfect|total)\s+sense/i,
                context: ['sarcasm', 'logic'],
                weight: 0.5
            },
            {
                pattern: /(?:in|during)\s+(?:the|this)\s+(?:21st|modern)\s+(?:century|era|age)/i,
                context: ['temporal', 'sarcasm'],
                weight: 0.4
            },
            {
                pattern: /(?:nothing|nothing else)\s+(?:screams|says)\s+(?:productivity|efficiency|success)\s+(?:like|more than)/i,
                context: ['sarcasm', 'comparison'],
                weight: 0.6
            },
            {
                pattern: /(?:so|very)\s+(?:clear|obvious|simple)\s+(?:that|,)\s+(?:i|we|you)\s+(?:am|are|is)\s+(?:even|now)\s+(?:more|still)\s+(?:confused|lost|puzzled)/i,
                context: ['sarcasm', 'clarity'],
                weight: 0.6
            },
            {
                pattern: /(?:can't|cannot)\s+wait\s+(?:for|to)/i,
                context: ['sarcasm', 'anticipation'],
                weight: 0.5
            },
            {
                pattern: /(?:just|really)\s+love\s+(?:when|it when)/i,
                context: ['sarcasm', 'enthusiasm'],
                weight: 0.5
            }
        ];
    }

    // Calculate cosine similarity between two vectors
    cosineSimilarity(vec1, vec2) {
        const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
        const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
        const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magnitude1 * magnitude2);
    }

    // Enhanced sentiment analysis with context
    analyzeSentiment(text) {
        let score = 0;
        let contextScore = 0;
        const words = text.toLowerCase().split(/\s+/);
        
        words.forEach(word => {
            if (this.sentimentContext.positive.words.includes(word)) {
                score += this.sentimentContext.positive.weight;
                contextScore += 0.2;
            }
            if (this.sentimentContext.negative.words.includes(word)) {
                score -= this.sentimentContext.negative.weight;
                contextScore -= 0.2;
            }
            if (this.sentimentContext.neutral.words.includes(word)) {
                contextScore += 0.1;
            }
        });
        
        return { 
            score: score / words.length,
            contextScore: contextScore / words.length
        };
    }

    // Enhanced context analysis with semantic understanding
    analyzeContext(text) {
        const context = {
            hasPositiveWords: false,
            hasNegativeWords: false,
            hasContradiction: false,
            hasTemporalReference: false,
            semanticScore: 0,
            contextScore: 0
        };

        // Analyze word embeddings for semantic understanding
        const words = text.toLowerCase().split(/\s+/);
        let embeddingScore = 0;
        let validEmbeddings = 0;

        words.forEach(word => {
            if (this.wordEmbeddings[word]) {
                const embedding = this.wordEmbeddings[word];
                embeddingScore += embedding[0]; // Use first dimension for sentiment
                validEmbeddings++;
            }
        });

        if (validEmbeddings > 0) {
            context.semanticScore = embeddingScore / validEmbeddings;
        }

        // Enhanced pattern matching with context
        this.sarcasmPatterns.forEach(pattern => {
            if (pattern.pattern.test(text)) {
                context.semanticScore += pattern.weight;
                context.contextScore += 0.2;
            }
        });

        // Enhanced contradiction detection
        this.contradictionPatterns.forEach(pattern => {
            if (pattern.pattern.test(text)) {
                context.hasContradiction = true;
                context.semanticScore += pattern.weight;
                context.contextScore += 0.3;
            }
        });

        // Enhanced temporal reference detection
        this.temporalPatterns.forEach(pattern => {
            if (pattern.pattern.test(text)) {
                context.hasTemporalReference = true;
                context.semanticScore += pattern.weight;
                context.contextScore += 0.2;
            }
        });

        return context;
    }

    // Enhanced sarcasm detection with improved accuracy
    detectSarcasm(text) {
        const sentiment = this.analyzeSentiment(text);
        const context = this.analyzeContext(text);
        const tokens = text.toLowerCase().split(/\s+/);
        
        // Enhanced pattern matching
        const patternMatches = this.sarcasmPatterns.some(pattern => 
            pattern.pattern.test(text)
        );
        
        // Enhanced exaggeration detection
        const hasExaggeration = this.exaggerationPatterns.some(pattern =>
            pattern.words.some(word => tokens.includes(word))
        );
        
        // Enhanced irony detection
        const hasIrony = this.ironyIndicators.some(indicator =>
            text.toLowerCase().includes(indicator.phrase)
        );

        // Enhanced temporal phrase detection
        const hasTemporalPhrase = context.hasTemporalReference;
        
        // Enhanced contradiction detection
        const hasContradiction = context.hasContradiction;
        
        // Enhanced positive sentiment with negative context detection
        const hasPositiveSentimentWithNegativeContext = 
            (sentiment.score > 0 && context.hasNegativeWords) ||
            (context.hasPositiveWords && context.hasNegativeWords) ||
            (text.toLowerCase().includes('not') && sentiment.score > 0) ||
            (text.toLowerCase().includes('never') && sentiment.score > 0) ||
            (text.toLowerCase().includes('nothing') && sentiment.score > 0);
        
        // Calculate enhanced sarcasm probability
        const sarcasmScore = this.calculateSarcasmScore({
            patternMatches,
            hasExaggeration,
            hasIrony,
            hasTemporalPhrase,
            hasContradiction,
            hasPositiveSentimentWithNegativeContext,
            semanticScore: context.semanticScore,
            contextScore: context.contextScore,
            sentimentScore: sentiment.score
        });
        
        return {
            isSarcastic: sarcasmScore > 0.35,
            confidence: sarcasmScore,
            sentiment: sentiment.score,
            indicators: {
                patternMatches,
                hasExaggeration,
                hasIrony,
                hasTemporalPhrase,
                hasContradiction,
                hasPositiveSentimentWithNegativeContext,
                semanticScore: context.semanticScore,
                contextScore: context.contextScore
            }
        };
    }

    // Enhanced sarcasm score calculation
    calculateSarcasmScore(indicators) {
        let score = 0;
        
        // Pattern matches with context
        if (indicators.patternMatches) score += 0.3;
        
        // Exaggeration with intensity
        if (indicators.hasExaggeration) score += 0.25;
        
        // Irony with context
        if (indicators.hasIrony) score += 0.25;

        // Temporal phrases with context
        if (indicators.hasTemporalPhrase) score += 0.2;

        // Contradiction with context
        if (indicators.hasContradiction) score += 0.3;
        
        // Positive sentiment with negative context
        if (indicators.hasPositiveSentimentWithNegativeContext) score += 0.4;

        // Semantic score with context
        score += indicators.semanticScore;
        score += indicators.contextScore;
        
        // Normalize score to 0-1 range
        return Math.min(1, score);
    }

    // Enhanced tone detection with context
    detectTone(text) {
        const sentiment = this.analyzeSentiment(text);
        const sarcasm = this.detectSarcasm(text);
        const context = this.analyzeContext(text);
        
        let tone = 'neutral';
        let confidence = 0;
        
        if (sarcasm.isSarcastic) {
            tone = 'sarcastic';
            confidence = sarcasm.confidence;
        } else if (sentiment.score > 2) {
            tone = 'positive';
            confidence = Math.min(1, sentiment.score / 5);
        } else if (sentiment.score < -2) {
            tone = 'negative';
            confidence = Math.min(1, Math.abs(sentiment.score) / 5);
        } else if (context.hasContradiction) {
            tone = 'ironic';
            confidence = context.semanticScore;
        }
        
        return {
            tone,
            confidence: confidence,
            sentiment: sentiment.score,
            contextScore: context.contextScore
        };
    }
} 