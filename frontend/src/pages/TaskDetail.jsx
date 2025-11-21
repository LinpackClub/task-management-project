import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const [comments, setComments] = useState('');

  const task = {
    id: 'PROJ-123',
    title: 'Implement New Dashboard Widgets',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Sarah Anderson',
    createdBy: 'Alex Johnson',
    dueDate: 'Dec 15',
    description: `The main objective is to design and implement three new widgets for the main dashboard. This includes a 'Recent Activity' feed, a 'Project Progress' donut chart, and a 'Team Performance' bar chart.

**Key Requirements:**
- Recent Activity Feed: Show the last 5 updates across all projects.
- Project Progress Chart: A donut chart showing the percentage of completed tasks.
- Team Performance Chart: A bar chart comparing tasks completed by team members this week.

Acceptance Criteria: All widgets must be responsive and update in real-time without a page refresh.`,
    comments: [
      {
        id: 1,
        author: 'Jane Doe',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxtLvRhV0ZdoHtPf8jjbePOyRpW7un_KRBChCYi9EFsSzXcB2X0YQbXaBJH4v_DnRB1rTMxI2wlS86X8n09kVoadleboDe0atP1PA16FyPcORMX_UR6nGl0LnJ6tKywgVZTDX8PgGueYxKBlgjSBtydCL-fMw2HTEi3OHjZhDHv0wAWO5dGFe3Gnn1V1p46eKqoQH7NxBMEKAKEevcrTrlv8jaZdmJDjgcKiEhzrNK4_tu_hE3oouzCMVs_HzAV2Shw_tEDvzbbug',
        text: "I've attached the latest mockups for the donut chart. Let me know what you think of the color palette.",
        timestamp: '2 days ago'
      }
    ],
    attachments: [
      { name: 'dashboard-mockup-v2.png', icon: 'image' },
      { name: 'project-brief.pdf', icon: 'description' }
    ],
    labels: ['Bug', 'Feature', 'UI/UX'],
    activity: [
      { user: 'Alex Johnson', action: 'changed the status to In Progress', time: '1 hour ago' },
      { user: 'Sarah Lee', action: 'added the Bug label', time: '3 hours ago' },
      { user: 'Alex Johnson', action: 'created this task', time: '1 day ago' }
    ]
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-slate-800 dark:text-slate-200">
              task_alt
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">TaskFlow</h2>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Heading */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">{task.title}</h1>
                <p className="text-3xl font-light text-slate-500 dark:text-slate-400">#{task.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex h-8 items-center justify-center gap-2 rounded-lg bg-blue-600/10 dark:bg-blue-400/20 px-3">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                  autorenew
                </span>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{task.status}</p>
              </button>
              <div className="flex h-8 items-center justify-center gap-2 rounded-lg bg-orange-500/10 dark:bg-orange-400/20 px-3">
                <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">{task.priority} Priority</p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-6 mt-4 flex-wrap">
            <div className="flex items-center gap-2">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Assignee:</p>
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium">{task.assignee}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Created by:</p>
              <p className="text-slate-800 dark:text-slate-200 text-sm font-medium hover:text-primary cursor-pointer">
                {task.createdBy}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400 text-base">
                calendar_today
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Due: {task.dueDate}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Description</h2>
              </div>
              <div className="p-6 prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                {task.description.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Comments</h2>
              <div className="space-y-4">
                {task.comments.map(comment => (
                  <div key={comment.id} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full bg-cover shrink-0 mt-2"
                      style={{ backgroundImage: `url(${comment.avatar})` }}
                    />
                    <div className="flex-1 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                        <p className="text-slate-800 dark:text-slate-200 text-sm font-semibold">
                          {comment.author}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">{comment.timestamp}</p>
                      </div>
                      <div className="p-4 text-slate-700 dark:text-slate-300 text-sm">
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* New Comment Form */}
                <div className="flex items-start gap-4 mt-6">
                  <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0 mt-2" />
                  <div className="flex-1 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
                    <textarea
                      className="w-full min-h-[100px] rounded-lg border-none bg-transparent text-slate-800 dark:text-slate-200 p-4 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      placeholder="Leave a comment..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                    <div className="flex justify-end p-2 border-t border-slate-200 dark:border-slate-800">
                      <button className="flex items-center justify-center rounded-lg h-9 bg-primary text-white px-4 text-sm font-bold hover:bg-primary/90 transition-colors">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Labels */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Labels</h3>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined">settings</span>
                </button>
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {task.labels.map((label, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Attachments */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Attachments</h3>
                <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <div className="p-4 space-y-3">
                {task.attachments.map((att, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                      <span className="material-symbols-outlined">{att.icon}</span>
                    </div>
                    <a className="text-sm text-slate-700 dark:text-slate-300 hover:text-primary">
                      {att.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity History */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
                  Activity History
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {task.activity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.user}
                      </span>
                      {' '}{item.action}
                      <span className="block text-slate-500 dark:text-slate-500">{item.time}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskDetail;
