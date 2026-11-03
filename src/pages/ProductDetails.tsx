import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Check, ArrowLeft } from 'lucide-react';

interface ProductDetailProps {
  products?: any[];
  onAddToCart?: (item: any) => void;
}

export default function ProductDetail({ products = [], onAddToCart }: ProductDetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('BLACK');
  const [added, setAdded] = useState(false);

  const matchedProduct = products.find(p => p.id === id);

  const product = matchedProduct || {
    id: id || 'p1',
    title: 'ARCHITECTURAL TRENCH COAT',
    price: 480,
    category: 'OUTERWEAR',
    description: 'Constructed from Japanese double-face cotton gabardine, engineered with an exaggerated silhouette and raglan sleeve detailing. Features storm flaps and unlined interior with bound seam finishes.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['BLACK', 'SLATE', 'STONE'],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
  };

  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const colors = product.colors || ['BLACK', 'SLATE', 'STONE'];

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
        image: product.image,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="bg-white text-zinc-900 min-h-screen font-sans py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={16} /> BACK TO CATALOGUE
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">
                {product.category || product.displayCategory}
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-black mt-1">
                {product.title}
              </h1>
              <p className="text-xl font-bold font-mono text-black mt-2">${Number(product.price).toFixed(2)}</p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              {product.description || 'Architectural garment engineered with premium fabrications.'}
            </p>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-black block">COLOR</label>
              <div className="flex gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-bold uppercase border rounded-lg cursor-pointer ${
                      selectedColor === color ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-black block">SIZE</label>
              <div className="flex gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 text-xs font-bold uppercase border rounded-lg cursor-pointer ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-black text-white hover:bg-gray-800 text-xs font-bold uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              <span>{added ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
