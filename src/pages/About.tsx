import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans">
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-end">
          <div className="space-y-5 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">Our Story & Vision</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">A brand built on precision, texture, and longevity.</h1>
            <p className="text-sm md:text-base text-zinc-600 leading-7 max-w-xl">
              DKD Fashions blends editorial styling with practical wardrobe systems, creating collections that feel sharp in motion and durable in daily wear.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800">Shop Edit</Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400">Contact Studio</Link>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
              alt="Studio Atelier"
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Design Language</div>
            <p className="mt-3 text-sm leading-7 text-zinc-700">Tailored silhouettes, restrained palettes, and tactile materials that hold up across seasons.</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:translate-y-4">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Production Ethos</div>
            <p className="mt-3 text-sm leading-7 text-zinc-700">Small-batch thinking with a focus on fit, finish, and a premium customer experience.</p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:translate-y-8">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Retail Experience</div>
            <p className="mt-3 text-sm leading-7 text-zinc-700">A storefront and admin system designed to feel editorial, responsive, and operationally complete.</p>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 text-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white">DKD Fashions</div>
            <p className="mt-3 text-sm leading-7 text-zinc-400">Editorial commerce for modern wardrobes.</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Explore</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <div><Link to="/shop">Shop</Link></div>
              <div><Link to="/about">About</Link></div>
              <div><Link to="/contact">Contact</Link></div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Support</div>
            <div className="mt-3 space-y-2 text-sm text-zinc-300">
              <div><Link to="/orders">Orders</Link></div>
              <div><Link to="/signin">Sign In</Link></div>
              <div><Link to="/wishlist">Wishlist</Link></div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">Visit</div>
            <p className="mt-3 text-sm leading-7 text-zinc-300">New York, Los Angeles, London</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export { About };
