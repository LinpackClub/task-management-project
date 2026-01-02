import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Component for FlowTask Logo and Name (Now wraps content in a Link)
const FlowTaskBranding = () => (
  // FIX: Wrapped branding in a Link to redirect to the dashboard
  <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
    <div className="w-6 h-6 text-primary">
      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
          fill="currentColor"
        />
        <path
          clipRule="evenodd"
          d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
    <h1 className="text-xl font-bold text-slate-900 dark:text-white">FlowTask</h1>
  </Link>
);


const TopHeader = ({ onAddTask, onMenuClick, showBackButton = false, title = "Dashboard" }) => {
  const navigate = useNavigate();

  const renderTitleContent = () => {
    // For deep navigation pages (Task Detail, Team Detail)
    if (showBackButton) {
      return (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          {FlowTaskBranding()}
        </div>
      );
    } 
    
    // Default Dashboard/List Header
    return (
        <div className="flex items-center gap-4"> 
            {/* Menu Button (Visible only on Mobile) */}
            <button
              onClick={onMenuClick}
              className="p-1 rounded-full lg:hidden text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            
            {/* Show FlowTask branding on mobile screens (where title is usually hidden) */}
            <div className="lg:hidden"> 
                {FlowTaskBranding()}
            </div>
            
            {/* Standard Title (Visible only on Desktop) */}
            <h1 className="text-xl font-bold text-slate-900 dark:text-white hidden lg:block">
                {title}
            </h1>
        </div>
    );
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-4 sm:px-8 backdrop-blur-sm">
      
      <div className="flex items-center gap-4">
        {renderTitleContent()}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onAddTask}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-soft 
             h-10 w-10 p-0 sm:w-auto sm:px-4 sm:py-2"
        >
          <span className="material-symbols-outlined text-base">add</span>
          
          {/* Text is now hidden on mobile (default screen size) */}
          <span className="hidden sm:inline">Add New Task</span> 
        </button>
        <div
          className="w-10 h-10 rounded-full bg-cover shrink-0" 
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