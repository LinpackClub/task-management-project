import React from 'react';

const SummaryCard = ({ title, value, change, color }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white dark:bg-slate-900 p-6 shadow-soft border border-slate-200 dark:border-slate-800">
      <p className="text-base font-medium text-slate-600 dark:text-slate-400">{title}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className={`text-sm font-medium ${color}`}>{change}</p>
    </div>
  );
};

export default SummaryCard;
