import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import './components/styles.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <nav className="app-nav" style={{padding:12, display:'flex', justifyContent:'flex-end', gap:8}}>
          <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
          <Link to="/signup" style={{textDecoration:'none'}}>Sign Up</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;