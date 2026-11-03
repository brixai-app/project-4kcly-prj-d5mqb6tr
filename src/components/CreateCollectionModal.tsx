import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collectionData: any) => void;
}

export default function CreateCollectionModal({
  isOpen,
  onClose,
  onSave,
}: CreateCollectionModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    season: 'SUMMER 2024',
    bannerImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: 'col_' + Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-zinc-950 border border-zinc-800 max-w-md w-full p-8 shadow-2xl relative text-white space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">ADMIN SUITE</span>
            <h2 className="text-lg font-bold uppercase text-white tracking-tight">CREATE COLLECTION</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">COLLECTION TITLE</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white outline-none"
              placeholder="e.g. ARCHIVAL CAPSULE N° 04"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">SEASON / TAGLINE</label>
            <input
              type="text"
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white outline-none"
              placeholder="e.g. AUTUMN/WINTER 2024"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">BANNER IMAGE URL</label>
            <input
              type="url"
              value={formData.bannerImage}
              onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white outline-none"
              placeholder="https://..."
              required
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              <span>PUBLISH COLLECTION</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3.5 px-6 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider hover:text-white transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
