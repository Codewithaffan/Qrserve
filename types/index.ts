/**
 * Domain types. They mirror the shape we expect from MongoDB documents later,
 * so swapping `lib/services.ts` for real API calls should not touch any UI code.
 */

export type OrderStatus = "new" | "preparing" | "ready" | "completed";
export type TableStatus = "available" | "occupied";

export interface Restaurant {
  id: string;
  /** Extra path segments that resolve to this restaurant (e.g. /restaurant/demo/...). */
  aliases: string[];
  name: string;
  tagline: string;
  cuisine: string;
  location: string;
  /** Cloudinary URL later. Falls back to a monogram when missing. */
  logo?: string;
  tableCount: number;
  openingHours: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  /** Price in INR (whole rupees). */
  price: number;
  /** Cloudinary URL later. */
  image: string;
  isVeg: boolean;
  isAvailable: boolean;
  isBestseller?: boolean;
}

export interface Table {
  id: string;
  restaurantId: string;
  number: number;
  seats: number;
  status: TableStatus;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  number: number;
  restaurantId: string;
  tableNumber: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  /** ISO timestamp. */
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DashboardStats {
  totalTables: number;
  activeOrders: number;
  todaysOrders: number;
  todaysRevenue: number;
}
