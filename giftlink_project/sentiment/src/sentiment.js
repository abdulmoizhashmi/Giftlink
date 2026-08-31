import express from 'express';
const app = express();
const port = Number(process.env.PORT || 5100);
app.use(express.json());
const positive = new Set(['amazing','awesome','beautiful','best','brilliant','clean','comfortable','excellent','fantastic','free','friendly','good','great','happy','helpful','love','lovely','nice','perfect','thank','thanks','useful','wonderful']);
const negative = new Set(['bad','broken','dirty','disappointed','hate','horrible','poor','problem','sad','terrible','ugly','unusable','waste','damaged','rude','worst']);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'giftlink-sentiment' }));
app.post('/sentiment', (req, res) => {
  const words = String(req.body.text || '').toLowerCase().match(/[a-z']+/g) || [];
  const score = words.reduce((n, w) => n + (positive.has(w) ? 1 : negative.has(w) ? -1 : 0), 0);
  res.json({ sentiment: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral', score });
});
app.listen(port, () => console.log(`Sentiment service listening on ${port}`));
