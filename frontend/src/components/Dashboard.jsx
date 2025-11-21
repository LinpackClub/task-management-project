import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import SummaryCard from './SummaryCard';
import KanbanColumn from './KanbanColumn';

const Dashboard = () => {
  const summaryData = {
    todo: 4,
    inProgress: 12,
    completed: 86,
    pendingReview: 4
  };

  const tasks = {
    todo: [
      {
        id: 1,
        title: 'Finalize Q3 marketing strategy',
        dueDate: 'Oct 15',
        priority: 'high',
        description: 'Complete the marketing strategy for Q3 including budget allocation'
      },
      {
        id: 2,
        title: 'Draft blog post on new feature',
        dueDate: 'Oct 20',
        priority: 'medium',
        description: 'Write a comprehensive blog post about the latest feature release'
      }
    ],
    inProgress: [
      {
        id: 3,
        title: 'Design new onboarding flow',
        dueDate: 'Oct 12',
        priority: 'high',
        description: 'Create user-friendly onboarding experience for new users'
      },
      {
        id: 4,
        title: 'Refactor user authentication',
        dueDate: 'Oct 25',
        priority: 'low',
        description: 'Improve authentication system security and performance'
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Fix mobile layout bugs',
        dueDate: 'Oct 05',
        priority: 'medium',
        description: 'Resolve responsive design issues on mobile devices'
      }
    ],
    pendingReview: []
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-content">
          {/* Summary Cards */}
          <div className="summary-grid">
            <SummaryCard 
              title="To-Do" 
              count={summaryData.todo} 
              type="todo" 
            />
            <SummaryCard 
              title="In Progress" 
              count={summaryData.inProgress} 
              change="+2% this week"
              type="inProgress"
            />
            <SummaryCard 
              title="Completed" 
              count={summaryData.completed} 
              change="-1% this week"
              type="completed"
            />
            <SummaryCard 
              title="Pending Review" 
              count={summaryData.pendingReview} 
              change="+8% this week"
              type="review"
            />
          </div>

          {/* Kanban Board */}
          <div className="kanban-section">
            <h2 className="section-title">Task Board</h2>
            <div className="kanban-board">
              <KanbanColumn 
                title="To-Do" 
                tasks={tasks.todo} 
                status="todo"
              />
              <KanbanColumn 
                title="In Progress" 
                tasks={tasks.inProgress} 
                status="inProgress"
              />
              <KanbanColumn 
                title="Completed" 
                tasks={tasks.completed} 
                status="completed"
              />
              <KanbanColumn 
                title="Pending Review" 
                tasks={tasks.pendingReview} 
                status="review"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;