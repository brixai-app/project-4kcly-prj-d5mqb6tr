import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: any | null;
  onSave: (categoryData: any) => void;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  categoryToEdit,
  onSave,
}: EditCategoryModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    status: 'VISIBLE',
  });

  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        id: categoryToEdit.id || String(Date.now()),
        name: categoryToEdit.name || '',
        description: categoryToEdit.description || '',
        status: categoryToEdit.status || 'VISIBLE',
      });
    } else {
      setFormData({
        id: 'cat_' + Date.now(),
        name: '',
        description: '',
        status: 'VISIBLE',
      });
    }
  }, [categoryToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-zinc-950 border border-zinc-800 max-w-md w-full p-8 shadow-2xl relative text-white space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block">ADMIN SUITE</span>
            <h2 className="text-lg font-bold uppercase text-white tracking-tight">
              {categoryToEdit ? 'EDIT CATEGORY' : 'ADD CATEGORY'}
            </h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">CATEGORY NAME</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white outline-none"
              placeholder="e.g. KNITWEAR"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">DESCRIPTION</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white outline-none h-24"
              placeholder="Category overview..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">VISIBILITY STATUS</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-800 p-3 text-sm text-white focus:border-white outline-none"
            >
              <option value="VISIBLE">VISIBLE</option>
              <option value="HIDDEN">HIDDEN</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {categoryToEdit ? <Save size={14} /> : <Plus size={14} />}
              <span>{categoryToEdit ? 'SAVE CATEGORY' : 'CREATE CATEGORY'}</span>
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
