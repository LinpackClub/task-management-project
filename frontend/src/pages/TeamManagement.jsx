import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

const TeamManagement = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPvMwrfnTirEtnW6Ok9DygiKPp8QxbMfoHxQ-RfRpJ3fWHud6XVjGyPN80_nl82_9obIDZFF3lybxLpW8DoM9mNxXpcJ4yNvHO8PHArqXKQthq34lwE8qXG2ZFuNv-lMPrD45RAJ1VRPFIPbJuNtbhuwaF4a8VPnd9VbKE_mwRYI-XyhQ7Vk4bwxThqy1UPvaVZxFZaiU-9ROugxivlvnN7Q9zBvyU0c7JGXIPfCwioJCXAMi-surJFSyeu099I9KFK86sd1cwX4'
    },
    {
      id: 2,
      name: 'Bob Williams',
      role: 'Member',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6dOr9hlGlv6FpW3vRCTMY0Bgw0gPs23O_oV6ZWNQJZkyZWVFqDVSswRD_Oc5EOw9SwWBn9e4K2s4k2GceYsSF_GdOjaJ9wo3H0YbBBL49DilRPSm8gzwy4AdAU-jMRoVFB0bHgLip8bk3YyYWkAkRzJtDJ3-fCee-XpJ8o6taP2co2ytKMofma8pSkdZRt-hnFuSLhCwXrvMsa8DV8n9cZknXDnXUyD0MxaYOYSLcfUs19DkS394VzkzTontpr2NPH3nfUaf4_jw'
    },
    {
      id: 3,
      name: 'Charlie Brown',
      role: 'Member',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-Vqlh6Ng_mwF4WfSq2J4gePhfOe3f2-7NOSk1bvM1uxHKzJBEVeBBiIGJX2FTKQc7qCPMTDpJE-QKVsX35w1iNx2RZLlsSXP8Mgkg3xce_chVah1IfacANzsGPTMzT-AMFw5vJNSZ0FGVwQJNmfvVTvbMkxTH6Hf0I7kHbG-0QA6nnDmGkx-oHGOpnbk-8SI7WWg8v0Yb6NeafoHIImokOj5Ksj4r8wfKhNHIH9i09y9YnOGB24ljxpVevDbbI4nT-yRUc4rnkbI'
    },
    {
      id: 4,
      name: 'Diana Prince',
      role: 'Member',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQf9PRJ9RKv6NKWgqIilGXO_R9HorxX2OKWBr9pgvkcc_uK-0LXniRhTRGAoJRg1hrbBaRrFVEToPV3lKLH--wG1wh4PiTzQuGk08IY5XsYfvJbNoXSRanZIGbbnaQYBghxQANNBUbTbek2sYc5BrWtQXIZXEXIFipXwuptlAA6273ymB9t_hqHoC-FX60T8kjhESxT2x662mfux7VCWXKI2ee6rxwgg--9PIIgpAOON-IvWGTIRuAxAYBQ-0QT8OsJn35NKPaNxo'
    }
  ]);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <TopHeader />
        <div className="max-w-4xl mx-auto p-8">
          {/* Page Heading */}
          <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-[-0.033em]">
              Project Phoenix Team
            </h1>
            <button className="flex items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
              <span className="material-symbols-outlined mr-2">person_add</span>
              <span>Add Member</span>
            </button>
          </header>

          {/* Member List */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="rounded-full w-12 h-12 bg-cover"
                      style={{ backgroundImage: `url(${member.avatar})` }}
                    />
                    <div className="flex flex-col">
                      <p className="text-slate-900 dark:text-white text-base font-medium">
                        {member.name}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamManagement;
