import type {
  Category,
  DashboardStats,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  Restaurant,
  Table,
} from "@/types";
import { DEMO_RESTAURANT_ID } from "./constants";

/**
 * Local dummy data.
 * Everything here is read through `lib/services.ts`, which is the only file that
 * needs to change when MongoDB / Firebase / Cloudinary get connected.
 */

const RID = DEMO_RESTAURANT_ID;

/** Demo photos. Replace with Cloudinary URLs once uploads are wired up. */
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`;

export const restaurants: Restaurant[] = [
  {
    id: RID,
    aliases: ["demo", "demo-restaurant", "abc"],
    name: "ABC Restaurant",
    tagline: "Tandoor, pizza & burgers",
    cuisine: "North Indian · Pizza · Burgers",
    location: "Bandra West, Mumbai",
    tableCount: 10,
    openingHours: "11:00 AM – 11:30 PM",
  },
];

export const categories: Category[] = [
  { id: "starters", name: "Starters" },
  { id: "main-course", name: "Main Course" },
  { id: "pizza", name: "Pizza" },
  { id: "burgers", name: "Burgers" },
  { id: "drinks", name: "Drinks" },
  { id: "desserts", name: "Desserts" },
];

type ProductSeed = Omit<Product, "restaurantId" | "isAvailable"> & { isAvailable?: boolean };

const productSeeds: ProductSeed[] = [
  // Starters
  {
    id: "p_chicken_tikka",
    categoryId: "starters",
    name: "Chicken Tikka",
    description: "Charcoal-grilled chicken marinated in yoghurt, kashmiri chilli and ajwain.",
    price: 280,
    image: photo("photo-1599487488170-d11ec9c172f0"),
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "p_paneer_tikka",
    categoryId: "starters",
    name: "Paneer Tikka",
    description: "Cottage cheese, peppers and onions, tandoor-smoked with mint chutney.",
    price: 240,
    image: photo("photo-1567188040759-fb8a883dc6d8"),
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "p_masala_fries",
    categoryId: "starters",
    name: "Masala Fries",
    description: "Crisp fries tossed in chaat masala, lime and fresh coriander.",
    price: 150,
    image: photo("photo-1573080496219-bb080dd4f877"),
    isVeg: true,
  },
  {
    id: "p_french_fries",
    categoryId: "starters",
    name: "French Fries",
    description: "Golden shoestring fries with sea salt and a peri-peri dip.",
    price: 120,
    image: photo("photo-1576107232684-1279f390859f"),
    isVeg: true,
  },
  {
    id: "p_hara_bhara",
    categoryId: "starters",
    name: "Hara Bhara Kebab",
    description: "Spinach, peas and potato patties, pan-seared until crisp.",
    price: 210,
    image: photo("photo-1601050690597-df0568f70950"),
    isVeg: true,
  },
  // Main course
  {
    id: "p_butter_chicken",
    categoryId: "main-course",
    name: "Butter Chicken",
    description: "Tandoori chicken in a slow-cooked tomato and cashew gravy.",
    price: 360,
    image: photo("photo-1603894584373-5ac82b2ae398"),
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "p_dal_makhani",
    categoryId: "main-course",
    name: "Dal Makhani",
    description: "Black lentils simmered overnight with butter and cream.",
    price: 260,
    image: photo("photo-1585937421612-70a008356fbe"),
    isVeg: true,
  },
  {
    id: "p_paneer_butter_masala",
    categoryId: "main-course",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in a velvety tomato-butter gravy.",
    price: 300,
    image: photo("photo-1631452180519-c014fe946bc7"),
    isVeg: true,
  },
  {
    id: "p_chicken_biryani",
    categoryId: "main-course",
    name: "Chicken Biryani",
    description: "Dum-cooked basmati layered with saffron, fried onions and raita.",
    price: 340,
    image: photo("photo-1589302168068-964664d93dc0"),
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "p_garlic_naan",
    categoryId: "main-course",
    name: "Garlic Butter Naan",
    description: "Tandoor-baked naan brushed with garlic butter.",
    price: 60,
    image: photo("photo-1626074353765-517a681e40be"),
    isVeg: true,
  },
  // Pizza
  {
    id: "p_margherita",
    categoryId: "pizza",
    name: "Margherita Pizza",
    description: "San Marzano tomato, fior di latte and basil on a 48-hour dough.",
    price: 320,
    image: photo("photo-1574071318508-1cdbab80d002"),
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "p_farmhouse",
    categoryId: "pizza",
    name: "Farmhouse Pizza",
    description: "Mushrooms, capsicum, olives, sweet corn and mozzarella.",
    price: 380,
    image: photo("photo-1513104890138-7c749659a591"),
    isVeg: true,
  },
  {
    id: "p_pepperoni",
    categoryId: "pizza",
    name: "Pepperoni Pizza",
    description: "Cured pepperoni, mozzarella and a chilli-honey drizzle.",
    price: 420,
    image: photo("photo-1565299624946-b28f40a0ae38"),
    isVeg: false,
    isAvailable: false,
  },
  {
    id: "p_paneer_tikka_pizza",
    categoryId: "pizza",
    name: "Paneer Tikka Pizza",
    description: "Tandoori paneer, red onion and mint mayo on a thin crust.",
    price: 390,
    image: photo("photo-1571407970349-bc81e7e96d47"),
    isVeg: true,
  },
  // Burgers
  {
    id: "p_chicken_burger",
    categoryId: "burgers",
    name: "Chicken Burger",
    description: "Crispy chicken thigh, pickled slaw and smoky mayo in a brioche bun.",
    price: 220,
    image: photo("photo-1568901346375-23c9450c58cd"),
    isVeg: false,
    isBestseller: true,
  },
  {
    id: "p_aloo_tikki_burger",
    categoryId: "burgers",
    name: "Aloo Tikki Burger",
    description: "Spiced potato patty, tamarind chutney, onions and lettuce.",
    price: 160,
    image: photo("photo-1550547660-d9450f859349"),
    isVeg: true,
  },
  {
    id: "p_double_cheese_burger",
    categoryId: "burgers",
    name: "Double Cheese Burger",
    description: "Two smashed patties, melted cheddar, pickles and house sauce.",
    price: 260,
    image: photo("photo-1571091718767-18b5b1457add"),
    isVeg: false,
  },
  {
    id: "p_crispy_veg_burger",
    categoryId: "burgers",
    name: "Crispy Veg Burger",
    description: "Panko-crusted veggie patty with jalapeño mayo and cheese.",
    price: 180,
    image: photo("photo-1551782450-a2132b4ba21d"),
    isVeg: true,
  },
  // Drinks
  {
    id: "p_cold_coffee",
    categoryId: "drinks",
    name: "Cold Coffee",
    description: "Cold-brewed coffee blended with milk and a scoop of vanilla ice cream.",
    price: 140,
    image: photo("photo-1517701604599-bb29b565090c"),
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "p_coke",
    categoryId: "drinks",
    name: "Coke",
    description: "Chilled 300 ml bottle.",
    price: 80,
    image: photo("photo-1622483767028-3f66f32aef97"),
    isVeg: true,
  },
  {
    id: "p_lime_soda",
    categoryId: "drinks",
    name: "Fresh Lime Soda",
    description: "Sweet, salted or masala. Squeezed to order.",
    price: 90,
    image: photo("photo-1523677011781-c91d1bbe2f9e"),
    isVeg: true,
  },
  {
    id: "p_mango_lassi",
    categoryId: "drinks",
    name: "Mango Lassi",
    description: "Thick yoghurt blended with Alphonso mango pulp.",
    price: 120,
    image: photo("photo-1626200419199-391ae4be7a41"),
    isVeg: true,
  },
  // Desserts
  {
    id: "p_brownie",
    categoryId: "desserts",
    name: "Brownie with Ice Cream",
    description: "Warm walnut brownie, vanilla ice cream and hot fudge.",
    price: 180,
    image: photo("photo-1606313564200-e75d5e30476c"),
    isVeg: true,
    isBestseller: true,
  },
  {
    id: "p_gulab_jamun",
    categoryId: "desserts",
    name: "Gulab Jamun",
    description: "Two khoya dumplings soaked in cardamom syrup.",
    price: 120,
    image: photo("photo-1666190092689-e3968aa0c32c"),
    isVeg: true,
  },
  {
    id: "p_sundae",
    categoryId: "desserts",
    name: "Kulfi Sundae",
    description: "Pistachio kulfi, rose syrup, vermicelli and crushed nuts.",
    price: 150,
    image: photo("photo-1563805042-7684c019e1cb"),
    isVeg: true,
    isAvailable: false,
  },
];

export const products: Product[] = productSeeds.map((seed) => ({
  restaurantId: RID,
  isAvailable: true,
  ...seed,
}));

export const tables: Table[] = Array.from({ length: 10 }, (_, index) => {
  const number = index + 1;
  const occupied = [2, 5, 8, 9].includes(number);
  return {
    id: `t_${number}`,
    restaurantId: RID,
    number,
    seats: number % 3 === 0 ? 6 : number % 2 === 0 ? 4 : 2,
    status: occupied ? "occupied" : "available",
  };
});

const findProduct = (id: string) => {
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Unknown product in seed data: ${id}`);
  return product;
};

function seedOrder(
  number: number,
  tableNumber: number,
  status: OrderStatus,
  minutesAgo: number,
  lines: [productId: string, quantity: number][],
): Order {
  const items: OrderItem[] = lines.map(([productId, quantity]) => {
    const product = findProduct(productId);
    return { productId, name: product.name, price: product.price, quantity };
  });
  return {
    id: `o_${number}`,
    number,
    restaurantId: RID,
    tableNumber,
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status,
    createdAt: new Date(Date.now() - minutesAgo * 60_000).toISOString(),
  };
}

export const orders: Order[] = [
  seedOrder(1044, 8, "ready", 24, [
    ["p_chicken_biryani", 1],
    ["p_dal_makhani", 1],
    ["p_garlic_naan", 2],
    ["p_mango_lassi", 1],
    ["p_coke", 1],
  ]),
  seedOrder(1043, 2, "new", 2, [
    ["p_chicken_burger", 1],
    ["p_mango_lassi", 1],
  ]),
  seedOrder(1042, 5, "preparing", 9, [
    ["p_chicken_burger", 1],
    ["p_chicken_tikka", 1],
    ["p_coke", 1],
  ]),
  seedOrder(1041, 9, "preparing", 15, [
    ["p_margherita", 1],
    ["p_paneer_tikka", 1],
    ["p_lime_soda", 2],
  ]),
  seedOrder(1040, 4, "completed", 52, [
    ["p_butter_chicken", 1],
    ["p_garlic_naan", 3],
    ["p_cold_coffee", 2],
  ]),
  seedOrder(1039, 1, "completed", 74, [
    ["p_double_cheese_burger", 2],
    ["p_french_fries", 1],
    ["p_coke", 2],
  ]),
  seedOrder(1038, 7, "completed", 96, [
    ["p_farmhouse", 1],
    ["p_brownie", 2],
  ]),
];

export const dashboardStats: DashboardStats = {
  totalTables: tables.length,
  activeOrders: orders.filter((o) => o.status !== "completed").length,
  todaysOrders: 32,
  todaysRevenue: 8450,
};

/** The next order number a guest receives (dummy counter). */
export const NEXT_ORDER_NUMBER = 1045;
