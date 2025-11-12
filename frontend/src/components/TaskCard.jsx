import React from 'react';
import { Calendar, Flag } from 'lucide-react';

const TaskCard = ({ task, status }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-500 bg-red-100',
      medium: 'text-amber-500 bg-amber-100',
      low: 'text-green-500 bg-green-100'
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    };
    return icons[priority] || icons.medium;
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <div className="task-meta">
          <div className="due-date">
            <Calendar size={14} />
            <span>{task.dueDate}</span>
          </div>
          <div className={`priority-tag ${getPriorityColor(task.priority)}`}>
            <Flag size={14} />
            <span className="capitalize">{task.priority}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;