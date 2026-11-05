import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const searchSuggestions = ["denim jacket","graphic tee","chino trousers","leather watch","sneakers"];

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/shop');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-md z-50 flex flex-col p-6 animate-in fade-in duration-200 font-sans">
      <div className="flex justify-end max-w-4xl w-full mx-auto">
        <button onClick={onClose} className="p-2 text-gray-400 hover:text-black transition-colors cursor-pointer">
          <X size={28} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto space-y-8">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH PRODUCTS..."
            autoFocus
            className="w-full border-b-2 border-black py-4 text-2xl md:text-4xl font-semibold uppercase placeholder:text-gray-300 outline-none bg-transparent"
          />
          <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-black cursor-pointer">
            <Search size={28} />
          </button>
        </form>

        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">POPULAR SEARCHES</span>
          <div className="flex flex-wrap gap-2">
            {searchSuggestions.map((sug: string, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  navigate('/shop');
                  onClose();
                }}
                className="px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white transition-colors text-xs font-medium uppercase rounded-full cursor-pointer text-gray-700"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
