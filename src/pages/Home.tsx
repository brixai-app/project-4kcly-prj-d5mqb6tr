import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Truck, RefreshCw, Pencil } from 'lucide-react';
import EditBannerModal from '../components/EditBannerModal';

interface HomeProps {
  products?: any[];
  siteContent?: any;
  onToggleWishlist: (product: any) => void;
  wishlistIds: string[];
  isAdminMode?: boolean;
  onUpdateBanner?: (key: 'banner1' | 'banner2', updatedData: any) => void;
}

export default function Home({
  products = [],
  siteContent,
  onToggleWishlist,
  wishlistIds,
  isAdminMode = false,
  onUpdateBanner,
}: HomeProps) {
  const navigate = useNavigate();
  const [editingBanner, setEditingBanner] = useState<'banner1' | 'banner2' | null>(null);
  const valuePillars = [{"title":"Fast Delivery","description":"Quick shipping to get your styles faster","icon":"truck"},{"title":"Quality Guarantee","description":"Premium materials, great durability","icon":"shield"},{"title":"Easy Returns","description":"Hassle-free returns within 30 days","icon":"refresh"}];

  const banner1 = siteContent?.banner1 || {
    title: 'DKD Fashions CLOTHING BRAND',
    subtitle: 'CATALOGUE N° 01 / EDITORIAL',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop',
    ctaText: 'SHOP NOW',
  };

  const banner2 = siteContent?.banner2 || {
    title: 'NEW ARRIVALS',
    subtitle: 'NEW ARRIVALS / SEASON 24',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop',
    ctaText: 'SHOP NOW',
  };

  const displayedProducts = products.length > 0 ? products.slice(0, 4) : [];

  const getPillarIcon = (iconType: string) => {
    switch (iconType) {
      case 'shield': return <Shield size={20} />;
      case 'refresh': return <RefreshCw size={20} />;
      default: return <Truck size={20} />;
    }
  };

  return (
    <div className="bg-white text-zinc-900 pb-20 font-sans relative">
      {/* 50/50 Dual Vertical Editorial Split Banner Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-black min-h-[85vh]">
        {/* Left Column: Hero Banner 1 */}
        <div className="relative min-h-[500px] md:min-h-[80vh] flex flex-col justify-end p-8 md:p-12 overflow-hidden group">
          <img
            src={banner1.image}
            alt={banner1.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          
          {isAdminMode && (
            <button
              onClick={() => setEditingBanner('banner1')}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110"
              title="Edit Left Hero Banner"
            >
              <Pencil size={18} />
            </button>
          )}

          <div className="relative z-10 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-300 uppercase block">
              {banner1.subtitle}
            </span>
            <h1 className="text-3xl md:text-5xl font-sans font-black uppercase text-white tracking-tight leading-none">
              {banner1.title}
            </h1>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-zinc-300 transition-colors"
              >
                <span>{banner1.ctaText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Banner 2 */}
        <div className="relative min-h-[500px] md:min-h-[80vh] flex flex-col justify-end p-8 md:p-12 overflow-hidden group">
          <img
            src={banner2.image}
            alt={banner2.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {isAdminMode && (
            <button
              onClick={() => setEditingBanner('banner2')}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110"
              title="Edit Right Hero Banner"
            >
              <Pencil size={18} />
            </button>
          )}

          <div className="relative z-10 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-300 uppercase block">
              {banner2.subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-sans font-black uppercase text-white tracking-tight leading-none">
              {banner2.title}
            </h2>
            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-zinc-300 transition-colors"
              >
                <span>{banner2.ctaText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-black uppercase tracking-tight text-zinc-900">
            FEATURED PRODUCTS
          </h2>
          <p className="text-xs uppercase tracking-widest text-zinc-500 font-sans">
            Craft Your Signature Look
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {displayedProducts.map((product: any) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div key={product.id} className="group flex flex-col space-y-3 relative">
                <div className="relative aspect-[3/4] bg-zinc-100 overflow-hidden rounded-none border border-zinc-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    crossOrigin="anonymous"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-black text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 font-mono">
                      {product.tag}
                    </span>
                  )}

                  {isAdminMode && (
                    <button
                      onClick={() => navigate('/admin/products')}
                      className="absolute top-3 right-12 z-10 bg-white/90 backdrop-blur p-1.5 rounded-full border border-gray-200 shadow-xs cursor-pointer hover:bg-black hover:text-white transition-colors"
                      title="Edit product"
                    >
                      <Pencil size={14} />
                    </button>
                  )}

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-zinc-900 transition-colors shadow-xs"
                    aria-label="Wishlist"
                  >
                    <Heart size={16} className={isWishlisted ? 'fill-black text-black' : ''} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <button
                      onClick={() => navigate('/product/' + product.id)}
                      className="w-full bg-white text-black hover:bg-zinc-100 text-xs font-bold uppercase tracking-widest py-3 transition-colors text-center"
                    >
                      QUICK VIEW
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-widest">
                    {product.category}
                  </span>
                  <Link
                    to={'/product/' + product.id}
                    className="text-xs font-bold uppercase tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors line-clamp-1"
                  >
                    {product.title}
                  </Link>
                  <span className="text-xs font-bold font-mono text-zinc-900">
                    ${product.price?.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value Pillars Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-b border-zinc-200 py-12">
          {valuePillars.map((pillar: any, idx: number) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="p-3 bg-zinc-100 text-zinc-900 rounded-none border border-zinc-200">
                {getPillarIcon(pillar.icon)}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Banner Modal */}
      <EditBannerModal
        isOpen={!!editingBanner}
        onClose={() => setEditingBanner(null)}
        bannerKey={editingBanner}
        currentData={editingBanner === 'banner1' ? banner1 : banner2}
        onSave={(key, data) => {
          if (onUpdateBanner) onUpdateBanner(key, data);
        }}
      />
    </div>
  );
}
