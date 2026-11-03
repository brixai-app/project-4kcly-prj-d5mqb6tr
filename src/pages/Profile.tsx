import React from 'react';

export default function Profile() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tight border-b border-gray-200 pb-4">ACCOUNT PROFILE</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-2">
          <p className="text-xs text-gray-600"><strong className="text-black">Client Name:</strong> Alex Morgan</p>
          <p className="text-xs text-gray-600"><strong className="text-black">Membership:</strong> VIP Client</p>
        </div>
      </div>
    </div>
  );
}
