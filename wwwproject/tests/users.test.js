const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

describe('Users API', () => {
  let adminToken;
  let adminId;

  beforeAll(async () => {
    await User.deleteMany();

    // Create test admin
    const admin = await User.create({
      username: 'testadmin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });

    adminId = admin._id;
    adminToken = jwt.sign({ id: adminId, role: 'admin' }, config.secret);
  });

  test('Admin can get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});