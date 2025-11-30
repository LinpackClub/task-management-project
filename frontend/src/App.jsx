import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import TeamManagement from './pages/TeamManagement';
import TeamDetail from './pages/TeamDetail';
import './App.css';
import './components/styles.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
        <Route path="/teams" element={<TeamManagement />} />
        <Route path="/teams/:teamName" element={<TeamDetail />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;