const User = require('../models/User');
const Article = require('../models/Article');

const seedDatabase = async () => {
  // Clear existing data
  await User.deleteMany();
  await Article.deleteMany();

  // Create test users
  const admin = await User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  });

  // Create test articles
  await Article.create([
    { title: 'First Article', content: 'Content 1', author: admin._id },
    { title: 'Second Article', content: 'Content 2', author: admin._id }
  ]);

  console.log('Database seeded!');
};

module.exports = seedDatabase;
