# Sarcasm Detector

A sophisticated library for detecting sarcasm and tone in text using pattern matching, linguistic rules, and contextual analysis.

## Features

- Detects sarcasm using multiple indicators:
  - Pattern matching
  - Exaggeration detection
  - Irony indicators
  - Temporal references
  - Contradiction detection
  - Contextual analysis
  - Semantic patterns
- Sentiment analysis
- Tone detection
- Browser and Node.js support

## Installation

```bash
npm install sarcasm-detector
```

## Usage

### In Node.js

```javascript
const SarcasmDetector = require('sarcasm-detector');

const detector = new SarcasmDetector();
const result = detector.detectSarcasm("Well, that was the most groundbreaking idea I've ever heard — if we were still living in 2005");

console.log(result);
// {
//   isSarcastic: true,
//   confidence: 0.85,
//   sentiment: 2,
//   indicators: {
//     patternMatches: true,
//     hasExaggeration: true,
//     hasIrony: true,
//     hasTemporalPhrase: true,
//     hasContradiction: false,
//     hasPositiveSentimentWithNegativeContext: true,
//     semanticScore: 0.3
//   }
// }
```

### In Browser

```html
<script src="node_modules/sarcasm-detector/demo/sarcasm-detector.js"></script>
<script>
    const detector = new SarcasmDetector();
    const result = detector.detectSarcasm("That's exactly what we needed");
    console.log(result);
</script>
```

## API

### `detectSarcasm(text)`

Analyzes text for sarcasm and returns detailed results.

**Parameters:**
- `text` (string): The text to analyze

**Returns:**
```javascript
{
    isSarcastic: boolean,
    confidence: number, // 0-1
    sentiment: number,
    indicators: {
        patternMatches: boolean,
        hasExaggeration: boolean,
        hasIrony: boolean,
        hasTemporalPhrase: boolean,
        hasContradiction: boolean,
        hasPositiveSentimentWithNegativeContext: boolean,
        semanticScore: number
    }
}
```

### `detectTone(text)`

Analyzes the overall tone of the text.

**Parameters:**
- `text` (string): The text to analyze

**Returns:**
```javascript
{
    tone: string, // 'sarcastic', 'positive', 'negative', 'neutral', etc.
    confidence: number,
    sentiment: number,
    isSarcastic: boolean,
    context: object
}
```

## Demo

Try the live demo at: https://vamshikrishnab.github.io/sarcasm-detector/demo/

## License

MIT 