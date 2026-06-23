const { verifyToken } = require('../config/jwt');
const User = require('../models/User');



const protect = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN',
      });
    }

    const token = authHeader.split(' ')[1]; 

    if (!token || token === 'null' || token === 'undefined') {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Invalid token format.',
        code: 'INVALID_TOKEN_FORMAT',
      });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Session expired. Please log in again.',
          code: 'TOKEN_EXPIRED',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Authentication failed.',
        code: 'INVALID_TOKEN',
      });
    }

   
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user associated with this token no longer exists.',
        code: 'USER_NOT_FOUND',
      });
    }

   
    req.user = user.toSafeObject();
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
};

module.exports = { protect };
