import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock } from 'lucide-react';

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
      if (!remember) localStorage.removeItem('auth');
      navigate('/dashboard');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-100 to-white p-6" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2" style={{width:'100%',maxWidth:980,display:'grid',gridTemplateColumns:'1fr 1fr',borderRadius:24,overflow:'hidden',boxShadow:'0 20px 40px rgba(2,6,23,0.12)'}}>
        {/* Left visual */}
        <div className="hidden md:flex relative flex-col justify-center items-start gap-6 p-10 text-white" style={{background:'linear-gradient(135deg,var(--accent) 0%, var(--accent-3) 50%, #0f172a 100%)'}}>
          <div className="flex items-center gap-3 z-10">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-lg font-bold">TM</div>
            <div className="text-white font-extrabold text-lg">Task Manager</div>
          </div>
          <h3 className="text-4xl font-extrabold leading-tight z-10">Welcome back</h3>
          <p className="text-slate-300 max-w-sm z-10">Organize tasks, track progress, and collaborate with your team — all in one place.</p>

          <div className="mt-4 w-full max-w-xs rounded-lg p-6 z-10" style={{background:'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',backdropFilter:'blur(6px)'}}>
            <div className="h-40 rounded-md flex items-center justify-center text-4xl" style={{background:'linear-gradient(135deg,var(--accent-2), var(--accent))'}}>🗂️</div>
          </div>

          {/* decorative circles */}
          <div className="absolute -right-20 -bottom-10 w-72 h-72 rounded-full blur-3xl" style={{background:'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.18), rgba(6,182,212,0.06))'}} />
          <div className="absolute -left-16 top-10 w-48 h-48 rounded-full blur-2xl" style={{background:'radial-gradient(circle at 50% 50%, rgba(255,122,182,0.08), rgba(124,58,237,0.04))'}} />
        </div>

        {/* Right form */}
        <div className="p-8 md:p-12 flex items-center justify-center bg-white md:bg-transparent" style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'32px'}}>
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-gray-600">Use your email and password to sign in securely.</p>
              </div>
              
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
