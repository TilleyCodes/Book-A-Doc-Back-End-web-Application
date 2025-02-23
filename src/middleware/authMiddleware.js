const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Get authorization header from request
  const authHeader = req.headers.authorization;

  // Check authorization header is present, if not, throw 401 error
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Extract second element in token
  const token = authHeader.split(' ')[1];

  // Attempt token verification and make payload available to next function
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret' );
    req.patient = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;