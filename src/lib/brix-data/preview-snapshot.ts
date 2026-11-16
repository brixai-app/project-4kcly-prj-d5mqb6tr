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
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  tags?: string[];
};

export type PreviewSnapshot = {
  meta: PreviewSnapshotMeta;
  products: PreviewSnapshotRecord[];
};

const now = new Date().toISOString();

export const previewSnapshot: PreviewSnapshot = {
  meta: {
    id: 'preview-snapshot-dkd-fashions',
    title: 'DKD Fashions Preview Snapshot',
    description:
      'A lightweight preview dataset used to bootstrap the app when live Brix data is unavailable.',
    createdAt: now,
    updatedAt: now,
    version: '1.0.0',
  },
  products: [
    {
      id: 'prd-001',
      name: 'Classic Linen Shirt',
      category: 'Tops',
      price: 49.99,
      image:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
      rating: 4.8,
      reviews: 124,
      featured: true,
      tags: ['linen', 'summer', 'best-seller'],
    },
    {
      id: 'prd-002',
      name: 'Tailored Wide-Leg Trousers',
      category: 'Bottoms',
      price: 69.0,
      image:
        'https://images.unsplash.com/photo-1506629905607-d9b0b8f6b0f0?auto=format&fit=crop&w=900&q=80',
      rating: 4.6,
      reviews: 88,
      featured: true,
      tags: ['tailored', 'office', 'minimal'],
    },
    {
      id: 'prd-003',
      name: 'Everyday Crossbody Bag',
      category: 'Accessories',
      price: 39.5,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
      rating: 4.7,
      reviews: 203,
      tags: ['bag', 'daily', 'compact'],
    },
    {
      id: 'prd-004',
      name: 'Relaxed Knit Dress',
      category: 'Dresses',
      price: 84.99,
      image:
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
      rating: 4.9,
      reviews: 67,
      featured: true,
      tags: ['knit', 'elegant', 'seasonal'],
    },
  ],
};

export function getPreviewProducts(): PreviewSnapshotRecord[] {
  return previewSnapshot.products.slice();
}

export function getPreviewProductById(id: string): PreviewSnapshotRecord | undefined {
  return previewSnapshot.products.find((product) => product.id === id);
}

export function getPreviewFeaturedProducts(): PreviewSnapshotRecord[] {
  return previewSnapshot.products.filter((product) => product.featured);
}

export function getPreviewSnapshotMeta(): PreviewSnapshotMeta {
  return previewSnapshot.meta;
}

export default previewSnapshot;