import React, { useState } from 'react';

// Hardcoded data structure mapping teams to their members for filtering
const TEAM_MEMBERS = {
  'Design': ['Olivia Rhye', 'Drew Cano'],
  'Engineering': ['Phoenix Baker', 'Lana Steiner'],
  'Marketing': ['Candice Wu', 'Orlando Diggs'],
};

const NewTaskModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: 'Select a member', // Default assignee
    team: 'Select a team', // Default team
    priority: 'Medium',
    deadline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task created:', formData);
    onClose();
  };

  // Function to handle team change and reset assignee if needed
  const handleTeamChange = (e) => {
    const newTeam = e.target.value;
    let newAssignee = formData.assignee;

    // Reset assignee if the currently selected one is not in the new team
    if (newTeam !== 'Select a team' && newTeam in TEAM_MEMBERS) {
      const members = TEAM_MEMBERS[newTeam];
      if (!members.includes(formData.assignee)) {
        newAssignee = 'Select a member';
      }
    } else {
        newAssignee = 'Select a member';
    }

    setFormData({
      ...formData,
      team: newTeam,
      assignee: newAssignee,
    });
  };

  // Helper function to return conditional classes for pastel priority coloring
  const getPriorityClasses = (level, isActive) => {
    if (!isActive) {
      // Inactive state
      return 'text-slate-500 dark:text-slate-400';
    }

    // Active state with pastel colors based on level
    switch (level) {
      case 'High':
        // Soft red/pink
        return 'bg-rose-200 text-rose-900 shadow-md';
      case 'Medium':
        // Soft amber/yellow
        return 'bg-amber-200 text-amber-900 shadow-md';
      case 'Low':
        // Soft green/mint
        return 'bg-emerald-200 text-emerald-900 shadow-md';
      default:
        return 'bg-primary/50 text-white shadow-md';
    }
  };


  // Determine which assignees to display
  const getFilteredAssignees = () => {
    const selectedTeam = formData.team;
    if (selectedTeam !== 'Select a team' && selectedTeam in TEAM_MEMBERS) {
      return TEAM_MEMBERS[selectedTeam];
    }
    // If no valid team is selected, show no members initially
    return [];
  };
  
  const filteredAssignees = getFilteredAssignees();

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-gray-900/40 dark:bg-black/60" onClick={onClose} />

      {/* Modal (FIXED: Added overflow-y-auto and items-start for mobile scrolling) */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6 lg:p-8 py-8">
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
              {/* START: Team section */}
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">Team</label>
                <div className="relative">
                  <select
                    className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 px-4 text-base font-normal"
                    value={formData.team}
                    onChange={handleTeamChange} // Using the new handler
                  >
                    <option>Select a team</option>
                    {Object.keys(TEAM_MEMBERS).map((teamName) => (
                        <option key={teamName}>{teamName}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* END: Team section */}
              
              {/* START: Assign To section */}
              <div className="flex flex-col">
                <label className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Assign To
                </label>
                <div className="relative">
                  <select
                    className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 px-4 text-base font-normal"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  >
                    <option>Select a member</option>
                    {filteredAssignees.map((member) => (
                       <option key={member}>{member}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* END: Assign To section */}
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
                        getPriorityClasses(level, formData.priority === level)
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
                    className="flex w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-500 px-4 text-base font-normal"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
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