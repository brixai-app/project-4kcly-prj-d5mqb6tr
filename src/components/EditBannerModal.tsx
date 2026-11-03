import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bannerKey: 'banner1' | 'banner2' | null;
  currentData: {
    title: string;
    subtitle: string;
    image: string;
    ctaText: string;
  };
  onSave: (key: 'banner1' | 'banner2', updatedData: any) => void;
}

export default function EditBannerModal({
  isOpen,
  onClose,
  bannerKey,
  currentData,
  onSave,
}: EditBannerModalProps) {
  const [formData, setFormData] = useState(currentData);

  useEffect(() => {
    setFormData(currentData);
  }, [currentData, isOpen]);

  if (!isOpen || !bannerKey) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(bannerKey, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 py-10">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 cursor-auto"
        onClick={onClose}
        aria-label="Close editor"
      />
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium tracking-wide text-black">EDIT CONTENT ({bannerKey === 'banner1' ? 'LEFT' : 'RIGHT'})</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-200 p-2 hover:bg-gray-50 transition-colors cursor-pointer text-black"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800">Title</label>
            <input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors text-black bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Subtitle / Season</label>
            <input
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors text-black bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">Image URL</label>
            <input
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors text-black bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800">CTA Link / Button Text</label>
            <input
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors text-black bg-white"
              required
            />
          </div>
          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-black text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-900 transition-colors cursor-pointer"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer text-black"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
