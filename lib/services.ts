import type { Category, DashboardStats, Order, Product, Restaurant, Table } from "@/types";
import {
  categories,
  dashboardStats,
  NEXT_ORDER_NUMBER,
  orders,
  products,
  restaurants,
  tables,
} from "./data";

/**
 * Data access layer.
 *
 * Every function is async and returns plain serialisable objects so the UI never
 * knows where data comes from. To go live, replace the bodies with MongoDB /
 * Firebase / fetch calls; signatures and consumers stay the same.
 */

export async function getRestaurant(idOrSlug: string): Promise<Restaurant | null> {
  return restaurants.find((r) => r.id === idOrSlug || r.aliases.includes(idOrSlug)) ?? null;
}

export async function getCategories(_restaurantId: string): Promise<Category[]> {
  return categories;
}

export async function getProducts(restaurantId: string): Promise<Product[]> {
  return products.filter((p) => p.restaurantId === restaurantId);
}

export async function getTables(restaurantId: string): Promise<Table[]> {
  return tables.filter((t) => t.restaurantId === restaurantId);
}

export async function getOrders(restaurantId: string): Promise<Order[]> {
  return orders
    .filter((o) => o.restaurantId === restaurantId)
    .sort((a, b) => b.number - a.number);
}

export async function getDashboardStats(_restaurantId: string): Promise<DashboardStats> {
  return dashboardStats;
}

export async function getNextOrderNumber(_restaurantId: string): Promise<number> {
  return NEXT_ORDER_NUMBER;
}
