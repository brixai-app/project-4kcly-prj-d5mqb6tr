import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[75vh] bg-gray-50 flex items-center justify-center px-6 py-16 font-sans">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xs space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-tight text-black">CUSTOMER SIGN IN</h1>
          <p className="text-xs text-gray-500 mt-1">Access your account and order history.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/profile'); }}>
          <input type="email" placeholder="Email Address" required className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-black bg-white" />
          <input type="password" placeholder="Password" required className="w-full px-4 py-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-black bg-white" />
          <button type="submit" className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg cursor-pointer hover:bg-gray-800">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
