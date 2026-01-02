import React from 'react';
import SummaryCard from '../components/SummaryCard';
import KanbanBoard from '../components/KanbanBoard';

const Dashboard = () => {
  const summaryData = [
    { title: 'Total Tasks', value: 124, change: '+5% this week', color: 'text-green-500' },
    { title: 'In Progress', value: 12, change: '+2% this week', color: 'text-green-500' },
    { title: 'Completed', value: 86, change: '-1% this week', color: 'text-red-500' },
    { title: 'Pending Review', value: 4, change: '+8% this week', color: 'text-green-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((stat, idx) => (
          <SummaryCard key={idx} {...stat} />
        ))}
      </div>

      {/* Kanban Board */}
      <h2 className="mt-8 sm:mt-10 text-[22px] font-bold tracking-tight text-slate-900 dark:text-slate-50">
        Tasks Board
      </h2>
      <div className="mt-4">
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Dashboard;