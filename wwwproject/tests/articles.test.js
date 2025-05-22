const request = require('supertest');
const app = require('../app');
const User = require('../models/User'); 
const Article = require('../models/Article');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

describe('Articles API', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await Article.deleteMany();
    
    // Create test user if not exists
    const user = await User.findOne({ email: 'test@example.com' }) || 
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    userId = user._id;
    token = jwt.sign({ id: userId }, config.secret, { expiresIn: '1h' });
  });

  test('Create article', async () => {
    const res = await request(app)
      .post('/api/articles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Article',
        content: 'Test content',
        tags: ['tech']
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });
});