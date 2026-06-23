const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { signToken } = require('../config/jwt');
const { protect } = require('../middleware/auth');

const sendTokenResponse = (res, statusCode, user) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: user.toSafeObject(),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};



router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters.',
      });
    }


    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
        code: 'EMAIL_TAKEN',
      });
    }

   
    const user = await User.create({ name, email, password });

    console.log(`New user registered: ${user.email} (id: ${user._id})`);
    sendTokenResponse(res, 201, user);
  } catch (error) {

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. '),
      });
    }

    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
    });
  }
});


 
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      '+password'
    );

   
    const isValidPassword =
      user && (await user.comparePassword(password));

    if (!user || !isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
        code: 'INVALID_CREDENTIALS',
      });
    }

    console.log(` User logged in: ${user.email}`);
    sendTokenResponse(res, 200, user);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
    });
  }
});


router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.post('/logout', protect, (req, res) => {
  
  res.json({
    success: true,
    message: 'Logged out successfully. Remove the token from localStorage.',
  });
});

module.exports = router;
