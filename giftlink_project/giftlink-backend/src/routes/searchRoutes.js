import express from 'express';
import Gift from '../models/Gift.js';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const { q = '', category = 'All', condition = 'All', maxAge = '10' } = req.query;
    const filter = {};
    if (category !== 'All') filter.category = new RegExp(`^${escapeRegex(category)}$`, 'i');
    if (condition !== 'All') filter.condition = condition;
    if (q.trim()) filter.$or = ['title','description','category'].map(field => ({ [field]: new RegExp(escapeRegex(q.trim()), 'i') }));
    if (maxAge !== 'all' && Number.isFinite(Number(maxAge))) {
      const cutoff = new Date(); cutoff.setFullYear(cutoff.getFullYear() - Number(maxAge));
      filter.dateAdded = { $gte: cutoff };
    }
    const gifts = await Gift.find(filter).populate('owner', 'name city avatar').sort({ dateAdded: -1 }).lean();
    res.json({ count: gifts.length, filters: { q, category, condition, maxAge }, results: gifts });
  } catch (e) { res.status(500).json({ message: e.message }); }
});
function escapeRegex(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
export default router;
