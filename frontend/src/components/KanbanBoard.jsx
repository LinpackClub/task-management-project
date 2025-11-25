import React from 'react';
import { Link } from 'react-router-dom';

const KanbanBoard = () => {
  const columns = [
    {
      title: 'To-Do',
      tasks: [
        {
          id: 1,
          title: 'Finalize Q3 marketing strategy',
          date: 'Oct 15',
          priority: 'High',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwslW3cG0Dsuaba08JCAdlr0yAXrKXTPElSLLYZK6BaHK4ryw7AuUAhA8S-iT-kuf5e-TZK_U8Nh__TnIgbOcwkqUuAhlm2i-KAJsyamI_utIKWAX_Dg3fOyh0n86C1hnvq40bGsgEHmf2D_1CSYfo2V6mvHpi8jbbSsMGbcKBgn8vxp58bIm6H5MaSxCNngCuP5TaBNpWVlAIMfE4N_CFvnCJ2oDQCbVURNXDbGa--oBPn4oSciVVW5lcqc9R_Ateb_Wh8207O_8'
        },
        {
          id: 2,
          title: 'Draft blog post on new feature',
          date: 'Oct 20',
          priority: 'Medium',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk32M2TWGm5SXNOZsKQgbyaV_UElD1IaBIlA-s5xF7cx4SG1FJiTct04VNvnXDmkmnH6h85A4jJT563amJliIZlGjSFy1xFuLZhRtvNvwYSMgY9uS77cMeCs5MO1Pn5VtnJe9AtGaGZC9Z__3pUN4Kqu_W0OefL4qf61B250RRsTs__lh_jBf4j7dZ0PWC9akIqrkJkN4ravO012qUG4KK-QVHljfRtvVGp_HuPsdkSgTcvmkMTZsNXOcbaQDDdbahoowlTtrGGY0'
        }
      ]
    },
    {
      title: 'In Progress',
      tasks: [
        {
          id: 3,
          title: 'Design new onboarding flow',
          date: 'Oct 12',
          priority: 'High',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5_fxj9DbirQHWVyLiSC-AE8Jb-mg_IIfw-hBK-UFLe5pbe9N7zz_43sF-73mG6Zo4SIwv8void2yX1YsvOgHWmLFeULVWC_HUtttvRpYwQfYsBCYqaL9LWAzekTCZcYkvICzR_KfQOjSPfWxQM7uCknruYtQqDupnEA3TwYcvGjHYw4vxsT_M6m5Ql6gY2g0_089vGFgrQI9W2Awgoo2ywJ2c9jkfnNu31Lj4vNMVKA97x_cxYKfp78Pv01tsQSN_XZyY6BTIx2k'
        },
        {
          id: 4,
          title: 'Refactor user authentication',
          date: 'Oct 25',
          priority: 'Low',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxZaeKz4OsXAlOYO-J0Ij25IXWsRlf6oIDbSp1KN3DgBNGKTZTcmizYObYqzJoaNrQiHhgBGWqysFNS-hdRt7gVwflFtbiFT-p6d_GiXy1njgf0RXaBX1HBMFkpagZEp1oZ_vOlmDES--NjIFX3zF-A6RaTJ5OoDjiDY6yU9XCpQT8GGX1EWl3c1D4i3QWphoJNyk4iv_RD7euCMKC4Quf805J-1WSOCX-e9ANUBIuhzPk503BaYOcHYxPHOzuEUTV8Lnv92a7mVc'
        }
      ]
    },
    {
      title: 'Completed',
      tasks: [
        {
          id: 5,
          title: 'Fix mobile layout bugs',
          date: 'Oct 05',
          priority: 'Medium',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_C6ILlrog1YcGhNaUEMqwhzPoJOCuK_m4Z-pBO60DqkLdNelp9s7NQlBofsDfC16Clk4PEGSilBNoi_IuzUubSDmYz0al3cgbERTrLq8RmUbOIWr2_Iev67g2oM7mAbjYbkgHnEJODGUzKpqpVrsAdSZCNTcFRDT0fx_mPaHImo6lK2gZZKBqNKIfWUGA6gWalz5QR9kuFhX1B1eXvd9SR8DVkQ-hjrRFhNR39AUbcO-touLoKVIkTvBNORr2GjNzrhOR2wvL3BI'
        }
      ]
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
      Medium: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
      Low: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
    };
    return colors[priority] || colors.Medium;
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {columns.map((column, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {/* Column Header */}
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {column.title}
            </h3>
            <span className="rounded-full bg-slate-200 dark:bg-slate-700 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
              {column.tasks.length}
            </span>
          </div>

          {/* Tasks */}
          <div className="flex flex-col gap-4">
            {column.tasks.map((task) => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-soft hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {task.title}
                  </p>
                  <button className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full bg-cover"
                      style={{ backgroundImage: `url(${task.avatar})` }}
                    />
                    <span className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {task.date}
                    </span>
                  </div>
                  <div className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
