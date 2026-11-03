import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Wishlist() {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tight border-b border-gray-200 pb-4">MY WISHLIST</h1>
        <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-4 max-w-md mx-auto">
          <Heart size={40} className="mx-auto text-gray-300" />
          <h3 className="font-bold text-sm text-black uppercase">YOUR WISHLIST IS EMPTY</h3>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-lg cursor-pointer hover:bg-gray-800"
          >
            EXPLORE CATALOGUE
          </button>
        </div>
      </div>
    </div>
  );
}
