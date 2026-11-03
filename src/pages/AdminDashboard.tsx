import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
            <p className="text-xs text-gray-500 mt-1">Overview of store metrics, inventory, and recent transactions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">TOTAL REVENUE</span>
            <p className="text-2xl font-bold text-black font-mono">$24,850.00</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">TOTAL ORDERS</span>
            <p className="text-2xl font-bold text-black font-mono">142</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">PRODUCTS</span>
            <p className="text-2xl font-bold text-black font-mono">38</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">VISITORS</span>
            <p className="text-2xl font-bold text-black font-mono">4,210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
