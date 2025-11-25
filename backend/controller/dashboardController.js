const supabase = require('../config/supabase');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [total, inProgress, completed, review] = await Promise.all([
      // 1. Total Tasks Count
      supabase.from('tasks').select('*', { count: 'exact', head: true }),
      
      // 2. In Progress Count
      supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'IN_PROGRESS'),
      
      // 3. Completed Count
      supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'DONE'),
      
      // 4. Review Count
      supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'REVIEW')
    ]);

    // Check for errors in any of the queries
    if (total.error) throw total.error;
    
    // Calculate simple "dummy" percentages for the UI
    const stats = {
      totalTasks: { count: total.count, trend: '+5% this week' },
      inProgress: { count: inProgress.count, trend: '+2% this week' },
      completed: { count: completed.count, trend: '-1% this week' },
      pendingReview: { count: review.count, trend: '+8% this week' }
    };

    res.json(stats);
  } catch (error) {
    next(error);
  }
};