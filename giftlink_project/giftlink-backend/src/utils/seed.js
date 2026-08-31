import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db.js';
import User from '../models/User.js';
import Gift from '../models/Gift.js';

const gifts = [
  { title: 'Lamp', category: 'Kitchen', condition: 'New', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80', location: 'Islamabad', description: 'A clean decorative table lamp that adds a warm touch to a room.', dateAdded: '2022-11-04' },
  { title: 'Curtain', category: 'Living', condition: 'Older', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80', location: 'Rawalpindi', description: 'These curtains have been the backdrop of my study and are ready for a new home.', dateAdded: '2020-12-31' },
  { title: 'Bookshelf', category: 'Living', condition: 'Like New', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=80', location: 'Islamabad', description: 'Spacious bookshelf with a modern design. Great for books, plants and decor.', dateAdded: '2021-01-20' },
  { title: 'Blue Curtains', category: 'Living', condition: 'Good', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80', location: 'Islamabad', description: 'A pair of blue curtains in good condition.', dateAdded: '2022-06-12' },
  { title: 'Storage Shelf', category: 'Furniture', condition: 'Like New', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=900&q=80', location: 'Rawalpindi', description: 'Compact wooden storage shelf for books and household items.', dateAdded: '2023-02-08' },
  { title: 'Wall Shelf', category: 'Furniture', condition: 'Good', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=900&q=80', location: 'Islamabad', description: 'Simple wall shelf that is easy to install.', dateAdded: '2022-08-15' }
];

await connectDB(process.env.MONGODB_URI);
let demo = await User.findOne({ email: 'demo@giftlink.local' });
if (!demo) {
  demo = await User.create({ name: 'Demo User', email: 'demo@giftlink.local', password: await bcrypt.hash('Demo@12345', 12), city: 'Islamabad', bio: 'I enjoy giving useful things a second life.' });
}
if (await Gift.countDocuments() === 0) {
  await Gift.insertMany(gifts.map(g => ({ ...g, owner: demo._id })));
  console.log(`Seeded ${gifts.length} gifts.`);
} else console.log('Gifts already exist; skipping gift seed.');
await disconnectDB();
