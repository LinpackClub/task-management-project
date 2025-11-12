import React from 'react';
import TaskCard from './TaskCard';

const KanbanColumn = ({ title, tasks, status }) => {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <h3 className="column-title">{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      
      <div className="tasks-list">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            status={status}
          />
        ))}
        {tasks.length === 0 && (
          <div className="empty-state">
            <p>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;