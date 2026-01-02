import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react'; // Import LogOut icon

const Sidebar = ({ isMobileOpen, onClose }) => {
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user and logout function

  // Helper to get display name safely
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || 'User';
  const displayEmail = user?.email || '';
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

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
        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
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

      {/* Bottom Section: Profile + Logout */}
      <div className="flex flex-col gap-4">
        <div className="h-px bg-slate-200 dark:bg-slate-700" />
        
        <div className="flex items-center justify-between gap-2 px-2">
          {/* Profile Link */}
          <Link 
            to="/settings"
            onClick={onClose}
            className="flex flex-1 items-center gap-3 p-2 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 overflow-hidden group"
          >
            {avatarUrl ? (
              <div
                className="w-9 h-9 flex-shrink-0 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700"
                style={{ backgroundImage: `url("${avatarUrl}")` }}
              />
            ) : (
              <div className="w-9 h-9 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold border border-blue-200 dark:border-blue-800">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div className="flex flex-col overflow-hidden">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {displayName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                View Profile
              </p>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
            title="Sign Out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;