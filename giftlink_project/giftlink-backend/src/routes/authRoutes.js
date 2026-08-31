import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { registerUser, loginUser } from '../services/authService.js';
import User from '../models/User.js';

const router = express.Router();
const publicUser = user => ({ id: user._id, name: user.name, email: user.email, phone: user.phone, city: user.city, bio: user.bio, avatar: user.avatar });

async function register(req, res) {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Registration successful', user: publicUser(user) });
  } catch (e) { res.status(e.status || 500).json({ message: e.message }); }
}
async function login(req, res) {
  try { res.json(await loginUser(req.body)); }
  catch (e) { res.status(e.status || 500).json({ message: e.message }); }
}

router.post('/register', register);
router.post('/login', login);
router.post('/register/', register);
router.post('/login/', login);
router.get('/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
router.put('/update', requireAuth, async (req, res) => {
  try {
    const allowed = ['name','phone','city','bio','avatar'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password');
    res.json({ message: 'Profile updated', user: publicUser(user) });
  } catch (e) { res.status(400).json({ message: e.message }); }
});
export default router;
