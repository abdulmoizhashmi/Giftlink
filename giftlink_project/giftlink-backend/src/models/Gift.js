import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, trim: true, maxlength: 500 },
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
  score: { type: Number, default: 0 }
}, { timestamps: true });

const giftSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  category: { type: String, required: true, trim: true },
  condition: { type: String, required: true, enum: ['New', 'Like New', 'Good', 'Older'] },
  image: { type: String, required: true, trim: true },
  location: { type: String, trim: true, default: 'Islamabad' },
  dateAdded: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
}, { timestamps: true });

giftSchema.index({ title: 'text', description: 'text', category: 'text' });

export default mongoose.model('Gift', giftSchema);
