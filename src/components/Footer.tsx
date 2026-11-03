import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {
  isAdminMode?: boolean;
  setIsAdminMode?: (val: boolean) => void;
}

export default function Footer({ isAdminMode = false, setIsAdminMode }: FooterProps) {
  const navigate = useNavigate();
  const [footerTaps, setFooterTaps] = useState(0);

  // Handle secret 25 footer taps silently -> navigates to admin signin
  const handleFooterLogoTap = () => {
    const next = footerTaps + 1;
    setFooterTaps(next);
    if (next >= 25) {
      navigate('/admin');
      setFooterTaps(0);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-20 font-sans select-none">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Column 1: Logo & About */}
          <div>
            <div
              className="inline-flex items-center mb-6 select-none cursor-default"
              onClick={handleFooterLogoTap}
              title="Brand Logo"
            >
              <span className="font-semibold text-xl tracking-[0.2em] uppercase text-black font-sans">DKD Fashions</span>
            </div>
            <h3 className="font-medium text-sm mb-4 tracking-wide text-black">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:opacity-60 transition-opacity cursor-pointer">Our Story</Link></li>
              <li><Link to="/about" className="hover:opacity-60 transition-opacity cursor-pointer">Careers</Link></li>
              <li><Link to="/about" className="hover:opacity-60 transition-opacity cursor-pointer">Sustainability</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h3 className="font-medium text-sm mb-4 tracking-wide text-black">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/contact" className="hover:opacity-60 transition-opacity cursor-pointer">Contact Us</Link></li>
              <li><Link to="/contact" className="hover:opacity-60 transition-opacity cursor-pointer">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:opacity-60 transition-opacity cursor-pointer">FAQ</Link></li>
              <li><Link to="/about" className="hover:opacity-60 transition-opacity cursor-pointer">Size Guide</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-medium text-sm mb-4 tracking-wide text-black">LEGAL</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:opacity-60 transition-opacity cursor-pointer">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-60 transition-opacity cursor-pointer">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-medium text-sm mb-4 tracking-wide text-black">STAY CONNECTED</h3>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }} className="flex flex-col gap-3 mb-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              >
                SIGN UP
              </button>
            </form>

            {isAdminMode && (
              <button
                onClick={() => {
                  if (setIsAdminMode) setIsAdminMode(false);
                  navigate('/');
                }}
                className="text-sm text-red-600 hover:opacity-60 font-medium transition-opacity cursor-pointer"
              >
                Admin Sign Out
              </button>
            )}
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
          <p className="text-center">&copy; 2026 DKD Fashions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
