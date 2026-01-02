import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import { supabase } from "../utils/supabaseClient";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else {
      setTasks(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto text-slate-500">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        Tasks
      </h1>

      {tasks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center border-dashed">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            No tasks available
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Tasks assigned to you or your team will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tasks.map(task => (
            <div
              key={task.id}
              onClick={() => navigate(`/tasks/${task.id}`)}
              className="cursor-pointer"
            >
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
