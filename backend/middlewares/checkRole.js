const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Please login.' 
      });
    }

    // 2. Get role from Supabase user metadata
    const userRole = req.user.user_metadata?.role || 'MEMBER'; 

    // 3. Check if user's role is in the allowed list
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. You do not have permission. Required: ${allowedRoles.join(' or ')}` 
      });
    }

    next();
  };
};

module.exports = checkRole;