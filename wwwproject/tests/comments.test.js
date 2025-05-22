const request = require('supertest');
const app = require('../app');
const User = require('../models/User'); 
const Article = require('../models/Article');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');

describe('Comments API', () => {
  let userToken;
  let articleId;

  beforeAll(async () => {
    await User.deleteMany();
    await Article.deleteMany();
    await Comment.deleteMany();
    
    const user = await User.create({
      username: 'commenter',
      email: 'comment@test.com',
      password: 'password123'
    });
    
    const article = await Article.create({
      title: 'Test Article',
      content: 'Test Content',
      author: user._id
    });
    
    userToken = jwt.sign({ id: user._id }, config.secret);
    articleId = article._id;
  });

  test('Create comment', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'Great article!',
        articleId: articleId
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('content', 'Great article!');
  });

  test('Get comments for article', async () => {
    const res = await request(app)
      .get(`/api/comments/article/${articleId}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});