module.exports = {
  secret: process.env.JWT_SECRET || 'secret-key',
  expiresIn: '24h'
};