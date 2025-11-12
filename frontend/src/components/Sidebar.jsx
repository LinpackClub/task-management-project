import React from 'react';
import { LayoutDashboard, Users, FileText, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Teams' },
    { icon: FileText, label: 'Tasks' },
    { icon: BarChart3, label: 'Reports' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">FlowTask</h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <a 
              key={index}
              href="#" 
              className={`nav-item ${item.active ? 'nav-item-active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;