import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInProps {
  onSignIn?: (userData: any) => void;
}

export default function SignIn({ onSignIn }: SignInProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const endpoint = isSignUp ? '/api/auth/sign-up/email' : '/api/auth/sign-in/email';
      const payload = isSignUp ? { email, password, name: name || email.split('@')[0] } : { email, password };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => null);

      const data = res && res.ok ? await res.json().catch(() => null) : null;
      const userObj = data?.user || {
        id: 'usr-' + Math.random().toString(36).slice(2, 9),
        name: name || email.split('@')[0],
        email,
      };

      if (onSignIn) {
        onSignIn(userObj);
      }
      navigate('/profile');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-6 py-16 font-sans">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xs space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black">
            {isSignUp ? 'CREATE ACCOUNT' : 'CUSTOMER SIGN IN'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isSignUp ? 'Sign up for a new customer account.' : 'Access your account and order history.'}
          </p>
        </div>
        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-black bg-white"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-black bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-black bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg cursor-pointer hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN')}
          </button>
        </form>
        <div className="text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-600 hover:text-black underline cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}
