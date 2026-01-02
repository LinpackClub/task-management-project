import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import SummaryCard from "./SummaryCard";
import KanbanColumn from "./KanbanColumn";

const Dashboard = () => {
  const summaryData = {
    todo: 4,
    inProgress: 12,
    completed: 86,
    pendingReview: 4
  };

  const moveTask = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const todo = tasks.filter(t => t.status === "todo");
  const inProgress = tasks.filter(t => t.status === "inProgress");
  const completed = tasks.filter(t => t.status === "completed");

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Header />

        <div className="dashboard-content">
          <h1 className="page-title">Dashboard</h1>

          <div className="summary-grid">
            <SummaryCard title="Total Tasks" count={tasks.length} />
            <SummaryCard title="To Do" count={todo.length} />
            <SummaryCard title="In Progress" count={inProgress.length} />
            <SummaryCard title="Completed" count={completed.length} />
          </div>

          <div className="kanban-section">
            <h2 className="section-title">Task Board</h2>

            <div className="kanban-board">
              <KanbanColumn
                title="To Do"
                status="todo"
                tasks={todo}
                moveTask={moveTask}
              />
              <KanbanColumn
                title="In Progress"
                status="inProgress"
                tasks={inProgress}
                moveTask={moveTask}
              />
              <KanbanColumn
                title="Completed"
                status="completed"
                tasks={completed}
                moveTask={moveTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
