import express from 'express';
import Gift from '../models/Gift.js';
import { requireAuth } from '../middleware/auth.js';
import { analyzeSentiment } from '../services/sentimentService.js';

const router = express.Router();
const populate = q => q.populate('owner', 'name email city avatar').populate('comments.user', 'name avatar');

router.get('/', async (req, res) => {
  try {
    const { category, condition, q, maxAge } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
    if (condition && condition !== 'All') filter.condition = condition;
    if (q) filter.$or = [{ title: new RegExp(escapeRegex(q), 'i') }, { description: new RegExp(escapeRegex(q), 'i') }, { category: new RegExp(escapeRegex(q), 'i') }];
    if (maxAge && !Number.isNaN(Number(maxAge))) {
      const date = new Date(); date.setFullYear(date.getFullYear() - Number(maxAge));
      filter.dateAdded = { $gte: date };
    }
    const gifts = await populate(Gift.find(filter).sort({ createdAt: -1 })).lean();
    res.json(gifts);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const gift = await populate(Gift.findById(req.params.id)).lean();
    if (!gift) return res.status(404).json({ message: 'Gift not found' });
    res.json(gift);
  } catch (e) { res.status(400).json({ message: 'Invalid gift id' }); }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, category, condition, image, location } = req.body;
    const gift = await Gift.create({ title, description, category, condition, image, location, owner: req.user._id });
    res.status(201).json(await populate(Gift.findById(gift._id)));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ message: 'Gift not found' });
    if (gift.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'You can only edit your own gifts' });
    const allowed = ['title','description','category','condition','image','location'];
    Object.assign(gift, Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k))));
    await gift.save();
    res.json(await populate(Gift.findById(gift._id)));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ message: 'Gift not found' });
    if (gift.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'You can only delete your own gifts' });
    await gift.deleteOne(); res.json({ message: 'Gift deleted' });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.post('/:id/comments', requireAuth, async (req, res) => {
  try {
    const text = String(req.body.text || '').trim();
    if (!text) return res.status(400).json({ message: 'Comment text is required' });
    const analysis = analyzeSentiment(text);
    const gift = await Gift.findById(req.params.id);
    if (!gift) return res.status(404).json({ message: 'Gift not found' });
    gift.comments.push({ user: req.user._id, text, ...analysis });
    await gift.save();
    res.status(201).json(await populate(Gift.findById(gift._id)));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

function escapeRegex(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
export default router;
