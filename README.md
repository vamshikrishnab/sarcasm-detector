# Sarcasm Detector

A JavaScript library for detecting sarcasm and tone in text using pattern matching and linguistic rules.

## Installation

```bash
npm install sarcasm-detector
```

## Usage

```javascript
const SarcasmDetector = require('sarcasm-detector');

const detector = new SarcasmDetector();

// Detect sarcasm
const sarcasmResult = detector.detectSarcasm("Oh great, another meeting that could have been an email");
console.log(sarcasmResult);
// {
//   isSarcastic: true,
//   confidence: 0.8,
//   sentiment: 2,
//   indicators: {
//     patternMatches: true,
//     hasExaggeration: false,
//     hasIrony: false,
//     hasPositiveSentimentWithNegativeContext: true
//   }
// }

// Detect tone
const toneResult = detector.detectTone("I'm really disappointed with the service");
console.log(toneResult);
// {
//   tone: 'negative',
//   confidence: 0.6,
//   sentiment: -3,
//   isSarcastic: false
// }
```

## Features

- Sarcasm detection using multiple indicators:
  - Common sarcasm patterns
  - Exaggeration words
  - Irony indicators
  - Sentiment analysis
- Tone detection:
  - Positive
  - Negative
  - Neutral
  - Sarcastic
  - Slightly positive/negative
- Confidence scoring for both sarcasm and tone detection

## How It Works

The library uses a combination of techniques to detect sarcasm and tone:

1. Pattern matching for common sarcastic phrases
2. Detection of exaggeration words
3. Identification of irony indicators
4. Sentiment analysis to detect positive statements with negative context
5. A weighted scoring system to determine the likelihood of sarcasm

## Limitations

- This is a rule-based approach and may not catch all instances of sarcasm
- Performance depends on the quality of the input text
- May produce false positives in some cases
- Works best with clear, well-structured sentences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 