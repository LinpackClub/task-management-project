import React, { useState } from 'react';
import TeamCard from '../components/TeamCard';

const initialTeams = [
    { name: 'Marketing Team', members: 8, icon: 'rocket_launch' },
    { name: 'Engineering Squad', members: 12, icon: 'code' },
    { name: 'Design Crew', members: 5, icon: 'palette' },
    { name: 'Product Vanguard', members: 10, icon: 'widgets' },
];

const TeamManagement = () => {
    const [teams, setTeams] = useState(initialTeams);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* REMOVED: <Sidebar /> and <TopHeader /> */}
            
            {/* Page Content Header */}
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
    );
};

export default TeamManagement;