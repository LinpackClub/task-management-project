const supabase = require('../config/supabase');

exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assignee:users(name, avatar_url),
        comments(*)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST Create a Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignee_id, priority } = req.body;

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        { 
          title, 
          description, 
          assignee_id, 
          priority, 
          status: 'TODO' 
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};