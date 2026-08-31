import express from 'express';
import { analyzeSentiment } from '../services/sentimentService.js';
const router = express.Router();
router.post('/', (req, res) => {
  const text = String(req.body.text || '').trim();
  if (!text) return res.status(400).json({ message: 'text is required' });
  res.json(analyzeSentiment(text));
});
export default router;
