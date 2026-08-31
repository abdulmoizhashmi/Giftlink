import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  phone: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  bio: { type: String, trim: true, maxlength: 500, default: '' },
  avatar: { type: String, trim: true, default: '' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
