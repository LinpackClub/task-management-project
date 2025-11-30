import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      await auth.login({ email, password });
      if (!remember) {
        // if user doesn't want to persist, clear stored auth after set
        const stored = localStorage.getItem('auth');
        if (stored) localStorage.removeItem('auth');
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        <div className="bg-sky-100 p-10 flex flex-col justify-center gap-6">
          <div className="text-sky-700 font-extrabold text-xl">Task Manager</div>
          <h3 className="text-2xl font-bold text-slate-800">Welcome back</h3>
          <p className="text-slate-600">Organize tasks, track progress, and collaborate with your team.</p>
          <div className="mt-6 rounded-lg bg-white/20 h-36 flex items-center justify-center text-3xl">✨</div>
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Sign in to your account</h2>
          <div className="text-sm text-slate-500 mb-6">Continue with your email</div>

          <form className="space-y-4" onSubmit={handleSubmit} aria-describedby={error ? 'login-error' : undefined}>
            {error && <div id="login-error" className="text-red-600 font-semibold" role="alert">{error}</div>}

            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700">Email</label>
              <input id="login-email" className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" aria-required="true" />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700">Password</label>
              <input id="login-password" className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" aria-required="true" />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="w-4 h-4" /> Remember me</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-500 text-sm">Forgot?</a>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg font-extrabold text-white bg-gradient-to-r from-sky-500 to-cyan-400 disabled:opacity-60" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
          </form>

          <div className="text-sm text-slate-500 mt-4">Don’t have an account? <Link to="/signup" className="text-sky-600">Create one</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
