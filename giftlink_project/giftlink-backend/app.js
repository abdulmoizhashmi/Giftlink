/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./models/db');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'giftlink-backend', time: new Date().toISOString() });
});

// Gift routes
const giftRoutes = require('./routes/giftRoutes');
app.use('/api/gift', giftRoutes);

// Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auths', authRoutes);
app.use('/api/auth', authRoutes);

// Search route
const searchRoutes = require('./routes/searchRoutes');
app.use('/api/search', searchRoutes);

// Sentiment route
const sentimentRoutes = require('./routes/sentimentRoutes');
app.use('/sentiment', sentimentRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`GiftLink API listening on http://localhost:${port}`);
  });
}).catch(error => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
});

module.exports = app;
