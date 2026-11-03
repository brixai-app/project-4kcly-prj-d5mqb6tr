import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminSignInProps {
  setIsAdminMode: (val: boolean) => void;
}

export default function AdminSignIn({ setIsAdminMode }: AdminSignInProps) {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('admin@store.com');
  const [adminPassword, setAdminPassword] = useState('password123');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!adminEmail.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim())) {
      setEmailError('Enter a valid email address.');
      valid = false;
    }

    if (!adminPassword) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (adminPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    }

    if (valid) {
      setIsAdminMode(true);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] rounded-2xl p-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-black">Admin Sign In</h1>
            <p className="mt-2 text-sm text-gray-600">Restricted access for administrators only</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-800">Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@store.com"
                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors bg-white ${
                  emailError ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
                }`}
              />
              {emailError ? <p className="mt-2 text-xs text-red-600">{emailError}</p> : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className={`mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors bg-white ${
                  passwordError ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
                }`}
              />
              {passwordError ? <p className="mt-2 text-xs text-red-600">{passwordError}</p> : null}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors bg-black text-white hover:bg-gray-900 cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-black transition-colors cursor-pointer"
          >
            Back to website
          </button>
        </div>
      </div>
    </div>
  );
}
