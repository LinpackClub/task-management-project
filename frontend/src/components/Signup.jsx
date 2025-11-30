import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await auth.signup({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        <div className="bg-sky-100 p-10 flex flex-col justify-center gap-6">
          <div className="text-sky-700 font-extrabold text-xl">Task Manager</div>
          <h3 className="text-2xl font-bold text-slate-800">Create your account</h3>
          <p className="text-slate-600">Start organizing tasks and collaborating with your team.</p>
          <div className="mt-6 rounded-lg bg-white/20 h-36 flex items-center justify-center text-3xl">🗂️</div>
        </div>

        <div className="p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Create account</h2>
          <div className="text-sm text-slate-500 mb-6">Use your email to register</div>

          <form className="space-y-4" onSubmit={handleSubmit} aria-describedby={error ? 'signup-error' : undefined}>
            {error && <div id="signup-error" className="text-red-600 font-semibold" role="alert">{error}</div>}

            <div>
              <label htmlFor="signup-name" className="block text-sm font-semibold text-slate-700">Full name</label>
              <input id="signup-name" className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" aria-required="true" />
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-semibold text-slate-700">Email</label>
              <input id="signup-email" className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" aria-required="true" />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-semibold text-slate-700">Password</label>
              <input id="signup-password" className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" aria-required="true" />
            </div>

            <div>
              <label htmlFor="signup-confirm" className="block text-sm font-semibold text-slate-700">Confirm password</label>
              <input id="signup-confirm" className="w-full mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-200" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" aria-required="true" />
            </div>

            <button type="submit" className="w-full py-3 rounded-lg font-extrabold text-white bg-gradient-to-r from-sky-500 to-cyan-400 disabled:opacity-60" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
          </form>

          <div className="text-sm text-slate-500 mt-4">Already have an account? <Link to="/login" className="text-sky-600">Sign in</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
