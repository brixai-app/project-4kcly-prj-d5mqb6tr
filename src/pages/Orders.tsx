import React from 'react';

export default function Orders() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-black uppercase tracking-tight text-black">MY ORDERS</h1>
          <p className="text-xs text-gray-500 mt-1">Track your recent orders and receipts.</p>
        </div>
        <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-2xl p-8 space-y-3">
          <h3 className="font-bold text-sm text-gray-800 uppercase">NO ORDERS FOUND</h3>
          <p className="text-xs text-gray-500">You have no recent order transactions.</p>
        </div>
      </div>
    </div>
  );
}
