import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/giftlink';

export async function connectDB(uri) {
  const connectionString = uri || MONGODB_URI;
  if (!connectionString) throw new Error('MONGODB_URI is not configured');
  mongoose.set('strictQuery', true);
  await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 8000 });
  console.log('MongoDB connected:', connectionString);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
