// frontend/src/components/TeamCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// Utility to get a random pastel background color for the icon/icon container
const getPastelClasses = (icon) => {
    switch (icon) {
        case 'rocket_launch':
            return { iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' };
        case 'code':
            return { iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' };
        case 'palette':
            return { iconBg: 'bg-fuchsia-100', iconColor: 'text-fuchsia-600' };
        case 'widgets':
            return { iconBg: 'bg-amber-100', iconColor: 'text-amber-600' };
        default:
            return { iconBg: 'bg-slate-100', iconColor: 'text-slate-600' };
    }
};

const TeamCard = ({ team }) => {
    const { iconBg, iconColor } = getPastelClasses(team.icon);

    return (
        // Link wraps the card to navigate to the team detail page
        <Link 
            to={`/teams/${team.name.replace(/\s+/g, '-')}`} 
            className="flex flex-col p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-soft hover:shadow-lg transition-shadow duration-200"
        >
            <div className="flex justify-between items-center mb-4">
                <div className={`p-2 rounded-lg ${iconBg}`}>
                    <span className={`material-symbols-outlined text-2xl ${iconColor}`}>
                        {team.icon}
                    </span>
                </div>
                <button 
                    type="button" 
                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); // FIX: Prevents navigation when clicking options button
                        /* Handle options click */ 
                    }}
                >
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {team.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                {team.members} members
            </p>
        </Link>
    );
};

export default TeamCard;