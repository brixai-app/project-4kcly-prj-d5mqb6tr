import React from 'react';

export default function About() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">OUR STORY & VISION</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight">OUR BRAND PHILOSOPHY</h1>
          <p className="text-xs text-gray-600 leading-relaxed">
            Founded with a commitment to architectural silhouettes, minimalist tailoring, and sustainable craftsmanship built to transcend seasonal trends.
          </p>
        </div>

        <div className="aspect-[21/9] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
            alt="Studio Atelier"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
