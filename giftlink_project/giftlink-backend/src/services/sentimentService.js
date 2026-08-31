const positiveWords = new Set([
  'amazing','awesome','beautiful','best','brilliant','clean','comfortable','excellent','fantastic',
  'free','friendly','good','great','happy','helpful','love','lovely','nice','perfect','thank','thanks',
  'useful','wonderful','fresh','easy','kind','generous'
]);
const negativeWords = new Set([
  'bad','broken','dirty','disappointed','hate','horrible','poor','problem','sad','terrible','ugly',
  'unusable','waste','damaged','rude','worst','missing','hard','difficult'
]);

export function analyzeSentiment(text = '') {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  let score = 0;
  for (const word of words) {
    if (positiveWords.has(word)) score += 1;
    if (negativeWords.has(word)) score -= 1;
  }
  const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
  return { sentiment, score, positive: Math.max(score, 0), negative: Math.max(-score, 0), words: words.length };
}
