import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface ShopProps {
  products?: any[];
  categories?: any[];
}

export default function Shop({ products = [], categories = [] }: ShopProps) {
  const navigate = useNavigate();
  const { category: paramCategory } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const categoryNames = ['ALL', ...categories.map((c: any) => typeof c === 'string' ? c : c.name)];
  const [activeCategory, setActiveCategory] = useState('ALL');

  useEffect(() => {
    if (paramCategory) {
      const match = categoryNames.find(c => c.toLowerCase() === paramCategory.toLowerCase());
      if (match) setActiveCategory(match);
    } else {
      setActiveCategory('ALL');
    }
  }, [paramCategory]);

  const filtered = products.filter(p => {
    const pCat = (p.category || p.displayCategory || '').toUpperCase();
    const matchCat = activeCategory === 'ALL' || pCat === activeCategory.toUpperCase();
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">
              CURATED CATALOGUE
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
              {activeCategory === 'ALL' ? 'STORE CATALOGUE' : activeCategory}
            </h1>
            {searchQuery && (
              <p className="text-xs font-mono text-zinc-500 mt-1">
                SEARCH RESULTS FOR: "{searchQuery.toUpperCase()}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 font-sans">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  if (cat === 'ALL') navigate('/shop');
                  else navigate('/shop/' + cat.toLowerCase());
                }}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-lg border cursor-pointer ${
                  activeCategory.toUpperCase() === cat.toUpperCase()
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 border border-zinc-200 space-y-3">
            <h3 className="text-sm font-bold uppercase text-zinc-800">NO PRODUCTS FOUND</h3>
            <p className="text-xs text-zinc-500 font-mono">TRY SELECTING A DIFFERENT CATEGORY OR CLEARING SEARCH.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((product) => (
              <div key={product.id} className="group flex flex-col space-y-3">
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-xl border border-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <button
                      onClick={() => navigate('/product/' + product.id)}
                      className="w-full bg-white text-black hover:bg-gray-100 text-xs font-bold uppercase tracking-widest py-3 transition-colors text-center rounded-lg cursor-pointer"
                    >
                      VIEW PRODUCT
                    </button>
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <span className="text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
                    {product.category || product.displayCategory}
                  </span>
                  <Link
                    to={'/product/' + product.id}
                    className="text-xs font-bold uppercase tracking-wider text-black hover:opacity-60 transition-opacity line-clamp-1"
                  >
                    {product.title}
                  </Link>
                  <span className="text-xs font-bold font-mono text-black">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
