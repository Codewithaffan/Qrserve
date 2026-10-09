import { useCallback, useMemo, useState } from "react";
import type { CartItem, Product } from "@/types";

/**
 * In-memory guest cart keyed by product id. Later this can be mirrored to
 * localStorage or the backend without changing the components using it.
 */
export function useCart(products: Product[]) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setQuantities((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[productId];
      else next[productId] = Math.min(quantity, 20);
      return next;
    });
  }, []);

  const increment = useCallback((productId: string) => {
    setQuantities((current) => ({ ...current, [productId]: Math.min((current[productId] ?? 0) + 1, 20) }));
  }, []);

  const decrement = useCallback((productId: string) => {
    setQuantities((current) => {
      const next = { ...current };
      const value = (next[productId] ?? 0) - 1;
      if (value <= 0) delete next[productId];
      else next[productId] = value;
      return next;
    });
  }, []);

  const clear = useCallback(() => setQuantities({}), []);

  const items: CartItem[] = useMemo(
    () => products.filter((p) => quantities[p.id]).map((product) => ({ product, quantity: quantities[product.id] })),
    [products, quantities],
  );
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return { quantities, items, count, subtotal, setQuantity, increment, decrement, clear };
}
