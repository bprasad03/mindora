import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login after successful registration
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl border border-dark-border bg-dark-surface">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Join us on your journey to better mental wellness.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input type="text" name="name" placeholder="Enter your full name" className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input type="email" name="email" placeholder="Enter your email" className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input type="password" name="password" placeholder="Create a password" className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-brand" required />
            </div>
          </div>

          <button type="submit" className="w-full py-3 mt-4 rounded-xl bg-brand text-[#0c1a2e] font-semibold hover:bg-brand-light transition-colors">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-white hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
