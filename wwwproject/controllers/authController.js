const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/jwt');

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: '24h'
    });
    
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, config.secret, {
      expiresIn: '24h'
    });
    
    res.json({ token });
  } catch (err) {
    next(err);
  }
};