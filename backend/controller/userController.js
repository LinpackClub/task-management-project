const supabase = require('../config/supabase');

exports.getAllUsers = async (req, res, next) => {
  try {
    // Fetch users from Supabase Auth (requires Service Role Key)
    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    if (error) throw error;

    const formattedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email.split('@')[0],
      avatar: user.user_metadata?.avatar_url || null,
      role: user.user_metadata?.role || 'MEMBER',
      lastSignIn: user.last_sign_in_at
    }));

    res.json(formattedUsers);
  } catch (error) {
    next(error);
  }
};

// Get profile of the currently logged-in user
exports.getMe = async (req, res, next) => {
  try {
    // req.user is already set in 'requireAuth' middleware
    const user = req.user;
    
    res.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name,
      role: user.user_metadata?.role
    });
  } catch (error) {
    next(error);
  }
};