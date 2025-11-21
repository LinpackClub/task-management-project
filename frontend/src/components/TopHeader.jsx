import React from 'react';

const TopHeader = ({ onAddTask }) => {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-8 backdrop-blur-sm">
      <h1 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onAddTask}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors shadow-soft"
        >
          <span className="material-symbols-outlined text-base">add</span>
          Add New Task
        </button>
        <div
          className="w-10 h-10 rounded-full bg-cover"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_d4i69nbk4ZFmn7p3aC_dXW47dMRWSJnlDDTWA8OzrMYQuikPT23OwIMoaDd03xlE3J2q4r_833_QAekmj0rUo4L4JHkfJA2zx6Q2vS6rS7qsmg0pQW9AvcTcaF_xh9K4doTF-2TajjAq2PL0MgT1ER60tP2K7GqUaGIf8TqERDTJtDUt2yQIBlI9zhFXvhojTUf27J1qmg4LGiQZe6ji65p7VV2sDqJrisaVUPL41iDES0Pv5SNUeeYKO9eFBIlw55-DgMwWE8M")'
          }}
        />
      </div>
    </header>
  );
};

export default TopHeader;
