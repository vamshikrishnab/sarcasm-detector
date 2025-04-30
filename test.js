const SarcasmDetector = require('./index');

const detector = new SarcasmDetector();

// Test cases
const testCases = [
    "Wow, you really nailed it. Just like last time 🙄",
    "Oh great, another meeting that could have been an email",
    "Wow, I just love it when my computer crashes",
    "This is exactly what I needed today",
    "I'm so happy to be working on a Saturday",
    "The weather is absolutely perfect for a picnic",
    "This is a genuine compliment, I really appreciate your help",
    "I'm really disappointed with the service",
    "The movie was fantastic, I loved every minute of it"
];

console.log("Sarcasm Detection Results:\n");
testCases.forEach(text => {
    const sarcasmResult = detector.detectSarcasm(text);
    const toneResult = detector.detectTone(text);
    
    console.log(`Text: "${text}"`);
    console.log(`Sarcasm Detection:`);
    console.log(`- Is Sarcastic: ${sarcasmResult.isSarcastic}`);
    console.log(`- Confidence: ${sarcasmResult.confidence.toFixed(2)}`);
    console.log(`- Sentiment Score: ${sarcasmResult.sentiment}`);
    console.log(`Tone Detection:`);
    console.log(`- Tone: ${toneResult.tone}`);
    console.log(`- Confidence: ${toneResult.confidence.toFixed(2)}`);
    console.log('----------------------------------------');
}); 