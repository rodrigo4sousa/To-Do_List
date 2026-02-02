const { verifyToken } = require('../../../Infrastructure/Auth/jwt');


module.exports = async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing auth token' });
  }

  const token = header.split(' ')[1];

  try {
    // Verify JWT token
    const decoded = verifyToken(token);

    req.user = {
      uid: decoded.userId,
      email: decoded.email,
    };
    
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
