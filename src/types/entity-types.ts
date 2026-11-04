/**
 * BRIX AI — AUTOMATICALLY GENERATED APPLICATION TYPES
 * Contract Version: 1
 * App ID: dkd-fashions
 * Contract Hash: 3dc61cbcd7887dcef3bb2d0ca8b38bdf09c0accccce549d92cef5869561ff92d
 * Generated deterministically from Application Data Contract.
 * DO NOT EDIT DIRECTLY.
 */

// ============================================================================
// SHARED JSON VALUE TYPE
// ============================================================================
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

// ----------------------------------------------------------------------------
// Entity: Category (Table: "categories")
// Product taxonomy categories
// ----------------------------------------------------------------------------
export interface Category {
  id: string;
  name: string;
}

export interface CreateCategoryInput {
  name: string;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

// ----------------------------------------------------------------------------
// Entity: OrderItem (Table: "order_items")
// Items in customer orders
// ----------------------------------------------------------------------------
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderItemInput {
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export type UpdateOrderItemInput = Partial<CreateOrderItemInput>;

// ----------------------------------------------------------------------------
// Entity: Order (Table: "orders")
// Placed customer orders and shipment tracking
// ----------------------------------------------------------------------------
export interface Order {
  id: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  customerName?: string | null;
  customerEmail?: string | null;
  items?: JsonValue | null;
  createdAt: string;
}

export interface CreateOrderInput {
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  customerName?: string | null;
  customerEmail?: string | null;
  items?: JsonValue | null;
}

export type UpdateOrderInput = Partial<CreateOrderInput>;

// ----------------------------------------------------------------------------
// Entity: Product (Table: "products")
// Retail products and catalogue items
// ----------------------------------------------------------------------------
export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  image?: string | null;
  tag?: string | null;
}

export interface CreateProductInput {
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  image?: string | null;
  tag?: string | null;
}

export type UpdateProductInput = Partial<CreateProductInput>;
