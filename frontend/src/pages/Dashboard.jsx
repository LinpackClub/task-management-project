import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import SummaryCard from '../components/SummaryCard';
import KanbanBoard from '../components/KanbanBoard';
import NewTaskModal from '../components/NewTaskModal';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const summaryData = [
    { title: 'Total Tasks', value: 124, change: '+5% this week', color: 'text-green-500' },
    { title: 'In Progress', value: 12, change: '+2% this week', color: 'text-green-500' },
    { title: 'Completed', value: 86, change: '-1% this week', color: 'text-red-500' },
    { title: 'Pending Review', value: 4, change: '+8% this week', color: 'text-green-500' }
  ];

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <TopHeader onAddTask={() => setShowModal(true)} />
        <div className="p-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summaryData.map((stat, idx) => (
              <SummaryCard key={idx} {...stat} />
            ))}
          </div>

          {/* Kanban Board */}
          <h2 className="mt-10 text-[22px] font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Tasks Board
          </h2>
          <div className="mt-4">
            <KanbanBoard />
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && <NewTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;
