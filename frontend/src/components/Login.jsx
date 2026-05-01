import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/chat'); // Simulating a successful login
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl border border-dark-border bg-dark-surface">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand mb-2">Sign In</h2>
          <p className="text-gray-400 text-sm">Welcome back! Please sign in to continue.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input type="email" placeholder="Enter your email" className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input type="password" placeholder="Enter your password" className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand" required />
            </div>
          </div>

          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-brand text-[#0c1a2e] font-semibold hover:bg-brand-light transition-colors">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account? <Link to="/register" className="text-white hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
