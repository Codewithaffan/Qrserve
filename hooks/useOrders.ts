import { useCallback, useState } from "react";
import { nextStatus } from "@/lib/constants";
import type { Order } from "@/types";

/**
 * Local order state for the dashboard. `advance` moves an order one step forward;
 * replace its body with an API call (and optimistic update) once the backend exists.
 */
export function useOrders(initial: Order[]) {
  const [orders, setOrders] = useState(initial);

  const advance = useCallback((id: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;
        const next = nextStatus(order.status);
        return next ? { ...order, status: next } : order;
      }),
    );
  }, []);

  return { orders, advance };
}
