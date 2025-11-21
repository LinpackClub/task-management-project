import React, { useState } from 'react';

const NewTaskModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: 'Select a member',
    team: 'Select a team',
    priority: 'Medium',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task created:', formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-gray-900/40 dark:bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 p-6 border-b border-slate-200 dark:border-slate-800">
            <p className="text-xl font-bold text-slate-900 dark:text-white">Create New Task</p>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
            {/* Title */}
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                Task Title
              </label>
              <input
                type="text"
                placeholder="e.g., Design the new dashboard"
                className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 dark:placeholder:text-slate-400 px-4 text-base font-normal"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                Description
              </label>
              <textarea
                placeholder="Add a more detailed description..."
                className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 min-h-28 placeholder:text-slate-500 dark:placeholder:text-slate-400 p-4 text-base font-normal resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Assign & Team */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Assign To
                </label>
                <div className="relative">
                  <select
                    className="appearance-none flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 px-4 pr-10 text-base font-normal"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  >
                    <option>Select a member</option>
                    <option>Olivia Rhye</option>
                    <option>Phoenix Baker</option>
                    <option>Lana Steiner</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">Team</label>
                <div className="relative">
                  <select
                    className="appearance-none flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 px-4 pr-10 text-base font-normal"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  >
                    <option>Select a team</option>
                    <option>Design</option>
                    <option>Engineering</option>
                    <option>Marketing</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Priority
                </label>
                <div className="flex h-12 items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                  {['Low', 'Medium', 'High'].map((level) => (
                    <label
                      key={level}
                      className={`flex cursor-pointer h-full grow items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
                        formData.priority === level
                          ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <span>{level}</span>
                      <input
                        type="radio"
                        name="priority"
                        value={level}
                        checked={formData.priority === level}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="invisible w-0"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Deadline
                </label>
                <div className="relative">
                  <input
                    type="date"
                    placeholder="Set a date"
                    className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 px-4 pr-11 text-base font-normal"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
                      calendar_month
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={onClose}
              className="flex items-center justify-center text-center font-medium px-5 py-2.5 rounded-lg h-12 w-full sm:w-auto text-slate-900 dark:text-white bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center text-center font-medium px-5 py-2.5 rounded-lg h-12 w-full sm:w-auto text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTaskModal;
