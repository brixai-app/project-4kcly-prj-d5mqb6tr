import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import EditCategoryModal from '../components/EditCategoryModal';

interface AdminCategoriesProps {
  categories?: any[];
  onAddCategory?: (category: any) => void;
  onEditCategory?: (category: any) => void;
  onDeleteCategory?: (id: string) => void;
}

export default function AdminCategories({
  categories = [],
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: AdminCategoriesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<any | null>(null);

  const handleOpenAdd = () => {
    setCategoryToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setCategoryToEdit(cat);
    setIsModalOpen(true);
  };

  const handleSaveModal = (categoryData: any) => {
    if (categoryToEdit) {
      if (onEditCategory) onEditCategory(categoryData);
    } else {
      if (onAddCategory) onAddCategory(categoryData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Categories Management</h1>
            <p className="text-xs text-gray-500 mt-1">Reorder navigation categories and toggle visibility.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-black text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 cursor-pointer flex items-center gap-2"
          >
            <Plus size={14} />
            <span>Add Category</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-gray-100">
          {categories.map((cat: any, idx: number) => {
            const catObj = typeof cat === 'string' ? { id: 'cat_' + idx, name: cat, status: 'VISIBLE' } : cat;
            return (
              <div key={catObj.id || catObj.name || idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <span className="font-bold text-sm text-black">{catObj.name || catObj}</span>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded uppercase ${
                    catObj.status === 'HIDDEN' ? 'bg-gray-200 text-gray-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {catObj.status || 'VISIBLE'}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(catObj)}
                    className="p-1 text-gray-600 hover:text-black cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteCategory && onDeleteCategory(catObj.id || catObj.name)}
                    className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {categories.length === 0 && (
            <div className="p-8 text-center text-gray-400 text-xs">
              No categories found.
            </div>
          )}
        </div>

        <EditCategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          categoryToEdit={categoryToEdit}
          onSave={handleSaveModal}
        />
      </div>
    </div>
  );
}
