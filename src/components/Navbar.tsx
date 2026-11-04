import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, ChevronDown, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  user?: any;
  isAdminMode?: boolean;
  onSignOut?: () => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenRegion: () => void;
  selectedRegion?: { country: string; currency: string; code: string };
}

export default function Navbar({
  cartCount,
  wishlistCount,
  user,
  isAdminMode = false,
  onSignOut,
  onOpenCart,
  onOpenSearch,
  onOpenRegion,
  selectedRegion,
}: NavbarProps) {
  const navigate = useNavigate();
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  const categories = ["New Arrivals","Tops","Outerwear","Pants","Accessories","Footwear"];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* Top Black Announcement Banner */}
      <div className="bg-black text-white px-6 py-2.5 text-center text-xs tracking-widest uppercase font-medium flex items-center justify-between">
        <span className="hidden sm:inline text-zinc-400 font-sans">DKD FASHIONS OFFICIAL</span>
        <span className="mx-auto sm:mx-0 font-sans">Free shipping on orders over $75!</span>
        <button
          onClick={onOpenRegion}
          className="hidden sm:flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer uppercase"
        >
          <MapPin size={13} />
          <span>{(selectedRegion?.country || 'UNITED STATES').toUpperCase()} / {selectedRegion?.code || 'USD'}</span>
        </button>
      </div>

      {/* Main Navbar */}
      <div className="px-6 py-4 flex items-center justify-between w-full">
        {/* Brand Logo & Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="cursor-pointer text-left flex items-center">
            <span className="font-bold text-xl md:text-2xl tracking-[0.2em] uppercase text-black font-sans">DKD Fashions</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm uppercase tracking-wider font-medium text-gray-800 whitespace-nowrap font-sans">
            <div
              className="relative"
              onMouseEnter={() => setIsShopMenuOpen(true)}
              onMouseLeave={() => setIsShopMenuOpen(false)}
            >
              <button
                onClick={() => navigate('/shop')}
                className="flex items-center gap-1 cursor-pointer hover:opacity-60 transition-opacity whitespace-nowrap"
              >
                SHOP <ChevronDown size={14} className={isShopMenuOpen ? "transition-transform duration-200 rotate-180" : "transition-transform duration-200"} />
              </button>

              {isShopMenuOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-3 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 mb-2">
                    CATEGORIES
                  </div>
                  {categories.map((cat: string) => (
                    <Link
                      key={cat}
                      to={'/shop/' + cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
                      className="block text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="cursor-pointer hover:opacity-60 transition-opacity whitespace-nowrap">ABOUT</Link>
            <Link to="/contact" className="cursor-pointer hover:opacity-60 transition-opacity whitespace-nowrap">CONTACT</Link>
            <Link to="/orders" className="cursor-pointer hover:opacity-60 transition-opacity whitespace-nowrap">ORDERS</Link>
          </nav>
        </div>

        {/* Right Header Action Icons & Admin Controls */}
        <div className="flex items-center gap-4 text-gray-800">
          {isAdminMode && (
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-[11px] tracking-widest font-medium text-gray-600 border border-gray-200 rounded-full px-3 py-1 select-none whitespace-nowrap">
                ADMIN MODE
              </span>
              <button
                onClick={() => navigate('/admin/products?new=true')}
                className="text-[11px] font-medium tracking-wider border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                ADD PRODUCT
              </button>
              <button
                onClick={() => navigate('/admin/products')}
                className="text-[11px] font-medium tracking-wider border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                LISTED PRODUCTS
              </button>
              <button
                onClick={() => navigate('/admin/categories')}
                className="text-[11px] font-medium tracking-wider border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                CATEGORIES
              </button>
              <button
                onClick={() => navigate('/admin/collections')}
                className="text-[11px] font-medium tracking-wider border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                COLLECTIONS
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="text-[11px] font-medium tracking-wider border border-gray-300 px-3 py-1.5 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                ORDERS
              </button>
            </div>
          )}

          <button
            onClick={onOpenSearch}
            className="hidden md:inline-flex text-sm font-medium tracking-wide hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap"
          >
            SEARCH
          </button>

          <Link
            to="/wishlist"
            className="flex items-center gap-1.5 text-sm font-medium tracking-wide hover:opacity-60 transition-opacity relative cursor-pointer whitespace-nowrap"
          >
            <Heart size={20} className={wishlistCount > 0 ? "fill-black text-black" : ""} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 text-sm font-medium tracking-wide hover:opacity-60 transition-opacity relative cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag size={20} />
            <span className="hidden md:inline whitespace-nowrap">BAG</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/signin"
            className="flex items-center gap-1.5 text-sm font-medium tracking-wide hover:opacity-60 transition-opacity cursor-pointer whitespace-nowrap"
          >
            <User size={20} />
            <span className="hidden md:inline whitespace-nowrap">{user ? 'PROFILE' : 'SIGN IN'}</span>
          </Link>
        </div>
      </div>

      {/* Sub-Header Category Bar */}
      <div className="hidden lg:block border-t border-gray-200">
        <div className="px-6 py-3 flex items-center gap-6 overflow-x-auto scrollbar-none text-xs font-medium tracking-wider uppercase text-gray-600 font-sans">
          {categories.map((cat: string) => (
            <Link
              key={cat}
              to={'/shop/' + cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}
              className="cursor-pointer hover:opacity-60 transition-opacity whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
