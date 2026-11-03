import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface AdminProductNewProps {
  products?: any[];
  onAddProduct?: (product: any) => void;
  onEditProduct?: (product: any) => void;
  categories?: any[];
}

export default function AdminProductNew({ products = [], onAddProduct, onEditProduct, categories = [] }: AdminProductNewProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const editingProduct = id ? products.find(p => p.id === id) : null;
  const isEditing = !!editingProduct;

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image: '',
    stockQuantity: 10,
    visible: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        title: editingProduct.title || editingProduct.name || '',
        description: editingProduct.description || '',
        category: getPrimaryCategory(editingProduct) || '',
        price: String(editingProduct.price || ''),
        image: editingProduct.images?.[0] || editingProduct.image || '',
        stockQuantity: editingProduct.stockQuantity ?? 10,
        visible: editingProduct.visible ?? true,
      });
    }
  }, [editingProduct]);

  const getPrimaryCategory = (p: any) => {
    if (Array.isArray(p.categories) && p.categories.length > 0) return p.categories[0];
    if (typeof p.category === 'string') return p.category;
    return '';
  };

  const save = () => {
    setSaving(true);
    setTimeout(() => {
      const payload = {
        ...form,
        id: isEditing ? editingProduct.id : `prod-${Date.now()}`,
        price: Number(form.price),
        categories: [form.category],
      };
      
      if (isEditing) {
        onEditProduct && onEditProduct(payload);
      } else {
        onAddProduct && onAddProduct(payload);
      }
      
      navigate('/admin/products');
    }, 400);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 font-sans bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-wide uppercase text-black">{isEditing ? 'EDIT PRODUCT' : 'ADD PRODUCT'}</h1>
          <p className="mt-2 text-sm text-gray-600">{isEditing ? 'Update your product details.' : 'Create a new product with a clean, admin-only workflow.'}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors uppercase"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-black text-white px-5 py-3 text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-60 uppercase"
          >
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <div className="text-sm font-medium tracking-wide uppercase text-black">BASIC PRODUCT DETAILS</div>
            <div className="mt-6 grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 uppercase tracking-widest font-mono">Product Name</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  placeholder="e.g. Premium Linen Overshirt"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 uppercase tracking-widest font-mono">Product Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors min-h-[140px]"
                  placeholder="Write a clear, premium product description."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 uppercase tracking-widest font-mono">Image URL</label>
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
            <div className="text-sm font-medium tracking-wide uppercase text-black">PRICING & ORG</div>
            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 uppercase tracking-widest font-mono">Selling Price (USD)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 uppercase tracking-widest font-mono">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-black transition-colors"
                >
                  <option value="">Select Category</option>
                  {(categories || []).map((c: any) => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                  <option value="new-arrivals">New Arrivals</option>
                  <option value="catalog">Catalog</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 uppercase tracking-widest font-mono">Stock Quantity</label>
                <input
                  type="number"
                  value={form.stockQuantity}
                  onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={form.visible}
                    onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                  />
                  <span className="text-sm font-medium text-gray-800">Visible on Storefront</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
