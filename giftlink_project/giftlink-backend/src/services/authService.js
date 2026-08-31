import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) throw Object.assign(new Error('Name, email and password are required'), { status: 400 });
  if (password.length < 8) throw Object.assign(new Error('Password must contain at least 8 characters'), { status: 400 });
  const normalized = email.toLowerCase().trim();
  if (await User.exists({ email: normalized })) throw Object.assign(new Error('Email is already registered'), { status: 409 });
  const hash = await bcrypt.hash(password, 12);
  return User.create({ name: name.trim(), email: normalized, password: hash });
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw Object.assign(new Error('Invalid email or password'), { status: 401 });
  }
  const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '2h' });
  return { token, user: user.toJSON() };
}
