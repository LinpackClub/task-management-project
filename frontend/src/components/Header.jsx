import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
          />
        </div>
        
        <button className="icon-button">
          <Bell size={20} />
        </button>
        
        <div className="user-profile">
          <div className="user-avatar">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
              alt="Alex Turner" 
              className="avatar-image"
            />
          </div>
          <div className="user-info">
            <span className="user-name">Alex Turner</span>
            <span className="user-email">alex.t@example.com</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;