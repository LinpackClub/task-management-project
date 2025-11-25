const supabase = require('../config/supabase');
const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token.' 
      });
    }

    req.user = user;
    
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err);
    res.status(500).json({ success: false, message: 'Server authentication error' });
  }
};

module.exports = requireAuth;