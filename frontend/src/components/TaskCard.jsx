import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const TaskCard = ({ task }) => {
  const { user } = useAuth();
  const role = user?.role || "member";
  const isDone = task.status === "completed";

  return (
    <Link 
      to={`/tasks/${task.id}`}
      className="block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
            {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isDone 
            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
        }`}>
            {isDone ? "Done" : "Pending"}
        </span>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* MEMBER NOTE */}
      {role === "member" && task.note && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-sm">
          <strong className="text-slate-900 dark:text-slate-200">Note:</strong> 
          <span className="text-slate-600 dark:text-slate-400 ml-1">{task.note}</span>
        </div>
      )}
    </Link>
  );
};

export default TaskCard;