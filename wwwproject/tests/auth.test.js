const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth API', () => {
  beforeAll(async () => {
    await User.deleteMany();
  });

  test('Register new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser', 
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('Login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toBe(401);
  });
});