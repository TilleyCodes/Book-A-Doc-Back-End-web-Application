const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  try {
    // Get authorization header from request
    const authHeader = req.headers.authorization;

    // Check authorization header is present, if not, throw 401 error
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Authentication failed. No token provided.' });
    }

  // Extract second element in token
  const token = authHeader.split(' ')[1];

  // Attempt token verification and make payload available to next function
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret' );
    req.patient = decoded;
    next();
  } catch (err) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token has expired. Please log in again.' 
      });
    }
    return res.status(401).json({ 
      error: 'Authentication failed - Invalid token' 
    });
  }
} catch (error) {
  return res.status(500).json({ 
    error: 'Internal server error during authentication' 
  });
}
};

module.exports = auth;