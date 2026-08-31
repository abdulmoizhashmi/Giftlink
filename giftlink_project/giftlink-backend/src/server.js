import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import giftRoutes from './routes/giftRoutes.js';
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import sentimentRoutes from './routes/sentimentRoutes.js';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors({ origin: process.env.CLIENT_URL?.split(',').map(s => s.trim()) || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'giftlink-backend', time: new Date().toISOString() }));
app.use('/api/gift', giftRoutes);
app.use('/api/auths', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/sentiment', sentimentRoutes);
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: 'Internal server error' }); });

if (process.env.NODE_ENV !== 'test') {
  connectDB(process.env.MONGODB_URI)
    .then(() => app.listen(port, () => console.log(`GiftLink API listening on http://localhost:${port}`)))
    .catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
}

export default app;
