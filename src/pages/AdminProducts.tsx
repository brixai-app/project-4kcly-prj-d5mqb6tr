import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Pencil, EyeOff, Eye, Trash2, Package, Copy } from 'lucide-react';

interface AdminProductsProps {
  products?: any[];
  onEditProduct?: (product: any) => void;
  onDeleteProduct?: (id: string) => void;
  onDuplicateProduct?: (product: any) => void;
  onUpdateVisibility?: (id: string, visible: boolean) => void;
  categories?: any[];
}

export default function AdminProductsList({
  products = [],
  onEditProduct,
  onDeleteProduct,
  onDuplicateProduct,
  onUpdateVisibility,
  categories = []
}: AdminProductsProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const getVisibilityLabel = (p: any) => {
    if (p.visible === false) return 'Hidden';
    if (p.status === 'draft') return 'Draft';
    if (Number(p.stockQuantity || 0) <= 0) return 'Out of Stock';
    return 'Active';
  };

  const getPrimaryCategory = (p: any) => {
    if (Array.isArray(p.categories) && p.categories.length > 0) return p.categories[0];
    if (typeof p.category === 'string') return p.category;
    return '';
  };

  const categoryOptions = useMemo(() => {
    const base = categories.map((c: any) => ({ slug: c.slug, name: c.name }));
    const extras = new Map();
    products.forEach((p) => {
      if (p.category && !base.find((c: any) => c.slug === p.category)) extras.set(p.category, String(p.category).toUpperCase());
    });
    return [...base, ...Array.from(extras.entries()).map(([slug, name]) => ({ slug, name }))];
  }, [products, categories]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products
      .filter((p) => {
        if (!term) return true;
        return (p.title || '').toLowerCase().includes(term) || (p.name || '').toLowerCase().includes(term);
      })
      .filter((p) => {
        if (category === 'all') return true;
        return p.category === category;
      })
      .filter((p) => {
        if (status === 'all') return true;
        const label = getVisibilityLabel(p);
        return label.toLowerCase().replace(/\s+/g, '_') === status;
      });
  }, [products, search, category, status]);

  const allVisibleChecked = filtered.length > 0 && filtered.every((p) => selectedIds.has(p.id));
  const selectedCount = selectedIds.size;

  const toggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (allVisibleChecked) {
        filtered.forEach((p) => next.delete(p.id));
      } else {
        filtered.forEach((p) => next.add(p.id));
      }
      return next;
    });
  };

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 font-sans bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-wide uppercase text-black">LISTED PRODUCTS</h1>
          <p className="mt-2 text-sm text-gray-600">Central control panel for products.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center justify-center rounded-lg border border-black px-5 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors cursor-pointer uppercase text-black"
          >
            ADD PRODUCT
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className="lg:col-span-5">
            <label className="block text-xs text-gray-600 uppercase tracking-widest font-mono">Search</label>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2">
              <SearchIcon size={16} className="text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name"
                className="w-full text-sm outline-none bg-white text-black"
              />
            </div>
          </div>

          <div className="lg:col-span-4">
            <label className="block text-xs text-gray-600 uppercase tracking-widest font-mono">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black transition-colors text-black"
            >
              <option value="all">All categories</option>
              {categoryOptions.map((c: any) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <label className="block text-xs text-gray-600 uppercase tracking-widest font-mono">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black transition-colors text-black"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div className="text-sm text-gray-700 font-mono">
              <span className="font-medium text-black">{selectedCount}</span> selected
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors uppercase">
                Bulk Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-left text-xs tracking-widest text-gray-600 uppercase font-mono">
                <th className="px-4 py-4 w-10 border-r border-gray-100">
                  <input type="checkbox" checked={allVisibleChecked} onChange={toggleSelectAllVisible} />
                </th>
                <th className="px-4 py-4 border-r border-gray-100">Product</th>
                <th className="px-4 py-4 border-r border-gray-100">Category</th>
                <th className="px-4 py-4 border-r border-gray-100">Price</th>
                <th className="px-4 py-4 border-r border-gray-100">Stock</th>
                <th className="px-4 py-4 border-r border-gray-100">Visibility</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-600 uppercase font-mono">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => {
                  const cat = getPrimaryCategory(p);
                  const label = getVisibilityLabel(p);
                  const stockQty = Number(p.stockQuantity || 10);
                  const image = p.images?.[0] || p.image || '';
                  const price = Number(p.price || 0).toFixed(2);

                  return (
                    <tr key={p.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 align-middle border-r border-gray-100">
                        <input type="checkbox" checked={selectedIds.has(p.id)} onChange={() => toggleSelected(p.id)} />
                      </td>
                      <td className="px-4 py-4 align-middle border-r border-gray-100">
                        <div className="flex items-center gap-4 min-w-[260px]">
                          <div className="w-14 h-14 rounded bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                            {image ? (
                              <img src={image} alt={p.title || p.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package size={18} className="text-gray-400 m-auto mt-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-black uppercase tracking-tight leading-tight">{p.title || p.name || 'Untitled product'}</div>
                            <div className="mt-1 text-[10px] uppercase font-mono text-gray-500">ID: {p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle border-r border-gray-100">
                        <div className="text-xs font-medium text-gray-800 uppercase tracking-wider">{cat ? cat.replace(/-/g, ' ') : '-'}</div>
                      </td>
                      <td className="px-4 py-4 align-middle border-r border-gray-100">
                        <div className="text-sm font-mono font-bold text-gray-900">${price}</div>
                      </td>
                      <td className="px-4 py-4 align-middle border-r border-gray-100">
                        <div className={`text-xs font-bold uppercase ${stockQty > 0 ? 'text-black' : 'text-red-600'}`}>{stockQty > 0 ? `${stockQty} IN STOCK` : 'OUT OF STOCK'}</div>
                      </td>
                      <td className="px-4 py-4 align-middle border-r border-gray-100">
                        <div
                          className={`inline-flex items-center px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${
                            label === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : label === 'Hidden'
                                ? 'bg-gray-200 text-gray-700'
                                : label === 'Out of Stock'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {label}
                        </div>
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <div className="flex justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => {
                              onEditProduct && onEditProduct(p);
                              navigate(`/admin/products/${p.id}/edit`);
                            }}
                            className="inline-flex items-center gap-1.5 rounded bg-white px-2.5 py-1.5 text-xs font-bold uppercase text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-200 cursor-pointer transition-colors"
                          >
                            <Pencil size={12} />
                            EDIT
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateVisibility && onUpdateVisibility(p.id, p.visible === false)}
                            className="inline-flex items-center rounded bg-white px-2 py-1.5 text-gray-500 hover:text-black hover:bg-gray-100 border border-gray-200 cursor-pointer transition-colors"
                            title={p.visible === false ? 'Show' : 'Hide'}
                          >
                            {p.visible === false ? <Eye size={12} /> : <EyeOff size={12} />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const ok = window.confirm(`Delete "${p.title || p.name}"?`);
                              if (ok && onDeleteProduct) onDeleteProduct(p.id);
                            }}
                            className="inline-flex items-center rounded bg-white px-2 py-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 border border-red-100 cursor-pointer transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
