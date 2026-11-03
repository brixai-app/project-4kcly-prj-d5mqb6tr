import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import CreateCollectionModal from '../components/CreateCollectionModal';

interface AdminCollectionsProps {
  collections?: any[];
  onCreateCollection?: (collectionData: any) => void;
  onDeleteCollection?: (id: string) => void;
}

export default function AdminCollections({
  collections = [],
  onCreateCollection,
  onDeleteCollection,
}: AdminCollectionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveCollection = (collectionData: any) => {
    if (onCreateCollection) onCreateCollection(collectionData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Collections Management</h1>
            <p className="text-xs text-gray-500 mt-1">Curate featured product groupings.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-gray-800 cursor-pointer flex items-center gap-2"
          >
            <Plus size={14} />
            <span>Create Collection</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((col: any, idx: number) => (
            <div key={col.id || col.title || idx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm text-black uppercase">{col.title || col.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{col.description || col.season || 'Curated seasonal grouping'}</p>
                <span className="inline-block mt-3 px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-mono rounded">
                  {col.itemCount || (col.productIds ? col.productIds.length : 0)} Products
                </span>
              </div>
              <button
                onClick={() => onDeleteCollection && onDeleteCollection(col.id || col.title)}
                className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {collections.length === 0 && (
            <div className="col-span-2 p-8 text-center text-gray-400 text-xs bg-white border border-gray-200 rounded-2xl">
              No collections created yet.
            </div>
          )}
        </div>

        <CreateCollectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCollection}
        />
      </div>
    </div>
  );
}
