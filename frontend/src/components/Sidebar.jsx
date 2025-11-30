import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isMobileOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/teams', label: 'Teams', icon: 'group' },
    { path: '/tasks', label: 'Tasks', icon: 'task_alt' },
    { path: '/reports', label: 'Reports', icon: 'bar_chart' },
    { path: '/settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 h-full
        border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 
        flex flex-col justify-between overflow-y-auto
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:border-r
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="flex flex-col gap-8">
        {/* Logo (Updated: Hidden on mobile since TopHeader now displays it) */}
        <div className="hidden lg:flex items-center gap-2 px-3">
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
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose} // Close sidebar on nav item click
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <p className="text-sm font-medium">{item.label}</p>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-4">
        <div className="h-px bg-slate-200 dark:bg-slate-700" />
        <div className="flex items-center gap-3 px-3">
          <div
            className="w-10 h-10 rounded-full bg-cover"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAk7knAm4JPHfFIktcugd4z5lCBtLD2vtJnmjsyH5lMaVFRZitkdWADzwFiV74jrtLYnFD6I0xkHbasJEz0tX5Qc4u3cxNwDTON9aSJ6UivTolOyTSJnDj1-jLea6dJ9o2v8v065WWbwnfaC7rbyc21bMujOKG8vByQqOVcvLq0JjMtp9L_bhGcL9W10MG6Bttoif1rYymoIcluxwr-1eDfUPa4pPtFugEMaK_64zufBVjgzhtSjsqbqCi_XSFqMeS4DMZ5Z1CMO7o")'
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Alex Turner</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">alex.t@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;