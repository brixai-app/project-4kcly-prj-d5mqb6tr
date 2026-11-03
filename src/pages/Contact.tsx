import React from 'react';

export default function Contact() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tight border-b border-gray-200 pb-4">CONTACT US</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <form className="space-y-4 border border-gray-200 rounded-2xl p-6 bg-gray-50" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Name" className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none" />
            <input type="email" placeholder="Email" className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none" />
            <textarea rows={4} placeholder="Message" className="w-full px-4 py-2.5 text-xs border border-gray-300 rounded-lg bg-white outline-none" />
            <button className="w-full py-3 bg-black text-white text-xs font-bold uppercase rounded-lg cursor-pointer hover:bg-gray-800">Send Message</button>
          </form>
          <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
            <p><strong className="text-black">Email:</strong> concierge@brand.com</p>
            <p><strong className="text-black">Hours:</strong> Mon - Fri, 9am - 6pm EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
