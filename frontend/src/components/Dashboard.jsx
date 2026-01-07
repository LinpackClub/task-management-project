import React, { useState } from 'react';
import { Plus, Calendar, Filter } from 'lucide-react';
import NewTaskModal from './NewTaskModal';
// Importing standard dashboard widgets
import SummaryCard from './SummaryCard';
import KanbanBoard from './KanbanBoard';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  // Format current date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Page Specific Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mt-1">
            <Calendar size={14} />
            <span>{today}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Button (Optional Placeholder) */}
          <button className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors shadow-sm">
            <Filter size={18} />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            <Plus size={18} />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Tasks" count={24} icon="task" color="blue" />
        <SummaryCard title="In Progress" count={12} icon="pending" color="orange" />
        <SummaryCard title="Completed" count={8} icon="check_circle" color="green" />
        <SummaryCard title="Teams" count={4} icon="group" color="purple" />
      </div>

      {/* Task Board */}
      <div className="mt-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Task Overview</h2>
        </div>
        <KanbanBoard />
      </div>

      {/* Task Creation Modal */}
      {showModal && <NewTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Dashboard;