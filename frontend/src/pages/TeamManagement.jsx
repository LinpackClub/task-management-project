// frontend/src/pages/TeamManagement.jsx

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';
import TeamCard from '../components/TeamCard'; // Import the new card component

// Define static team data based on the screenshot
const initialTeams = [
    { name: 'Marketing Team', members: 8, icon: 'rocket_launch' },
    { name: 'Engineering Squad', members: 12, icon: 'code' },
    { name: 'Design Crew', members: 5, icon: 'palette' },
    { name: 'Product Vanguard', members: 10, icon: 'widgets' },
];

const TeamManagement = () => {
    // We keep the isSidebarOpen state for mobile responsiveness from the previous steps
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [teams, setTeams] = useState(initialTeams); // Use team list state
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            
            <Sidebar 
                isMobileOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
            <main className="flex-1 overflow-y-auto">
                <TopHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="max-w-7xl mx-auto p-4 sm:p-8">
                    {/* Page Heading */}
                    <header className="flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-[-0.033em]">
                                Teams
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">
                                Manage and organize your teams.
                            </p>
                        </div>
                        <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors shrink-0">
                            <span className="material-symbols-outlined mr-2">group_add</span>
                            <span>Add New Team</span>
                        </button>
                    </header>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search for a team..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Team List Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeams.map((team, index) => (
                            <TeamCard key={index} team={team} />
                        ))}
                        {filteredTeams.length === 0 && (
                            <p className="text-slate-500 dark:text-slate-400">No teams match your search.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TeamManagement;