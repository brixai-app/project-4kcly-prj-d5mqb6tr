// ============================================================================
// BRIX AI CONTRACT-DRIVEN FRONTEND ENTITY HOOKS
// Auto-generated from Application Data Contract
// Contract Hash: dkd-fashions
// ============================================================================

import { createEntityHooks } from './use-entity';
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
  OrderItem,
  CreateOrderItemInput,
  UpdateOrderItemInput,
  Order,
  CreateOrderInput,
  UpdateOrderInput,
  Product,
  CreateProductInput,
  UpdateProductInput
} from '../types';

export const APP_ID = 'dkd-fashions';

// --- Categories Hooks ---
const categoriesHooks = createEntityHooks<Category, CreateCategoryInput, UpdateCategoryInput>(APP_ID, 'categories');

export function useCategories(options?: Parameters<typeof categoriesHooks.useList>[0]) {
  return categoriesHooks.useList(options);
}

export function useCategory(id: string | null | undefined, options?: Parameters<typeof categoriesHooks.useDetail>[1]) {
  return categoriesHooks.useDetail(id, options);
}

export function useCreateCategory() {
  return categoriesHooks.useCreate();
}

export function useUpdateCategory() {
  return categoriesHooks.useUpdate();
}

export function useDeleteCategory() {
  return categoriesHooks.useDelete();
}


// --- Order Line Items Hooks ---
const order_itemsHooks = createEntityHooks<OrderItem, CreateOrderItemInput, UpdateOrderItemInput>(APP_ID, 'order_items');

export function useOrderItems(options?: Parameters<typeof order_itemsHooks.useList>[0]) {
  return order_itemsHooks.useList(options);
}

export function useOrderItem(id: string | null | undefined, options?: Parameters<typeof order_itemsHooks.useDetail>[1]) {
  return order_itemsHooks.useDetail(id, options);
}

export function useCreateOrderItem() {
  return order_itemsHooks.useCreate();
}

export function useUpdateOrderItem() {
  return order_itemsHooks.useUpdate();
}

export function useDeleteOrderItem() {
  return order_itemsHooks.useDelete();
}


// --- Customer Orders Hooks ---
const ordersHooks = createEntityHooks<Order, CreateOrderInput, UpdateOrderInput>(APP_ID, 'orders');

export function useOrders(options?: Parameters<typeof ordersHooks.useList>[0]) {
  return ordersHooks.useList(options);
}

export function useOrder(id: string | null | undefined, options?: Parameters<typeof ordersHooks.useDetail>[1]) {
  return ordersHooks.useDetail(id, options);
}

export function useCreateOrder() {
  return ordersHooks.useCreate();
}

export function useUpdateOrder() {
  return ordersHooks.useUpdate();
}

export function useDeleteOrder() {
  return ordersHooks.useDelete();
}


// --- Products Hooks ---
const productsHooks = createEntityHooks<Product, CreateProductInput, UpdateProductInput>(APP_ID, 'products');

export function useProducts(options?: Parameters<typeof productsHooks.useList>[0]) {
  return productsHooks.useList(options);
}

export function useProduct(id: string | null | undefined, options?: Parameters<typeof productsHooks.useDetail>[1]) {
  return productsHooks.useDetail(id, options);
}

export function useCreateProduct() {
  return productsHooks.useCreate();
}

export function useUpdateProduct() {
  return productsHooks.useUpdate();
}

export function useDeleteProduct() {
  return productsHooks.useDelete();
}


// Auto-synthesized missing export
export const createEntityHooks: any = {};
