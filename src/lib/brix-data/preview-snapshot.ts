export type PreviewSnapshotMeta = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  version: string;
};

export type PreviewSnapshotRecord = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images?: string[];
  featured?: boolean;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  description?: string;
};

export type PreviewSnapshot = {
  meta: PreviewSnapshotMeta;
  products: PreviewSnapshotRecord[];
  categories: string[];
  collections: string[];
};

const now = new Date().toISOString();

export const previewSnapshot: PreviewSnapshot = {
  meta: {
    id: 'preview-snapshot-dkd-fashions',
    title: 'DKD Fashions Preview Snapshot',
    description: 'A lightweight in-memory snapshot used to bootstrap the app during preview and development.',
    createdAt: now,
    updatedAt: now,
    version: '1.0.0',
  },
  categories: ['New Arrivals', 'Women', 'Men', 'Accessories', 'Footwear'],
  collections: ['Summer Edit', 'Best Sellers', 'Essentials', 'Party Wear'],
  products: [
    {
      id: 'prd-001',
      name: 'Elegant Linen Co-ord Set',
      slug: 'elegant-linen-coord-set',
      category: 'Women',
      price: 89.99,
      compareAtPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
      ],
      featured: true,
      inStock: true,
      rating: 4.8,
      reviewCount: 124,
      tags: ['linen', 'summer', 'co-ord'],
      colors: ['Ivory', 'Sand'],
      sizes: ['XS', 'S', 'M', 'L'],
      description: 'A breathable linen co-ord set designed for effortless everyday elegance.',
    },
    {
      id: 'prd-002',
      name: 'Classic Tailored Shirt',
      slug: 'classic-tailored-shirt',
      category: 'Men',
      price: 54.0,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      inStock: true,
      rating: 4.6,
      reviewCount: 89,
      tags: ['shirt', 'formal', 'cotton'],
      colors: ['White', 'Sky Blue', 'Navy'],
      sizes: ['S', 'M', 'L', 'XL'],
      description: 'A crisp tailored shirt with a modern fit for work and weekend wear.',
    },
    {
      id: 'prd-003',
      name: 'Minimal Leather Tote',
      slug: 'minimal-leather-tote',
      category: 'Accessories',
      price: 74.5,
      compareAtPrice: 92.0,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
      inStock: true,
      rating: 4.9,
      reviewCount: 41,
      tags: ['bag', 'leather', 'tote'],
      colors: ['Black', 'Tan'],
      description: 'A versatile tote with clean lines and premium finish.',
    },
    {
      id: 'prd-004',
      name: 'Everyday Sneakers',
      slug: 'everyday-sneakers',
      category: 'Footwear',
      price: 68.0,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      inStock: false,
      rating: 4.4,
      reviewCount: 203,
      tags: ['sneakers', 'casual', 'comfort'],
      colors: ['White', 'Grey'],
      sizes: ['7', '8', '9', '10', '11'],
      description: 'Comfort-first sneakers built for all-day wear.',
    },
  ],
};

export function getPreviewSnapshot(): PreviewSnapshot {
  return previewSnapshot;
}

export function getPreviewProducts(): PreviewSnapshotRecord[] {
  return previewSnapshot.products.slice();
}

export function getPreviewProductBySlug(slug: string): PreviewSnapshotRecord | undefined {
  return previewSnapshot.products.find((product) => product.slug === slug);
}

export function getPreviewProductById(id: string): PreviewSnapshotRecord | undefined {
  return previewSnapshot.products.find((product) => product.id === id);
}

export function getPreviewCategories(): string[] {
  return previewSnapshot.categories.slice();
}

export function getPreviewCollections(): string[] {
  return previewSnapshot.collections.slice();
}

export default previewSnapshot;