import type { OrderStatus } from "@/types";

export const DEMO_RESTAURANT_ID = "rest_demo";
/** Slug used in QR codes and demo links. */
export const DEMO_RESTAURANT_SLUG = "demo";

export const ORDER_FLOW: OrderStatus[] = ["new", "preparing", "ready", "completed"];

export const ORDER_STATUS_META: Record<
  OrderStatus,
  {
    /** Label shown to restaurant staff. */
    label: string;
    /** Label shown to the guest who placed the order. */
    guestLabel: string;
    /** Short line under the guest tracker. */
    guestHint: string;
    /** Label of the staff action that moves an order forward from this status. */
    nextAction?: string;
  }
> = {
  new: {
    label: "New",
    guestLabel: "Received",
    guestHint: "Your order has been sent to the kitchen.",
    nextAction: "Start preparing",
  },
  preparing: {
    label: "Preparing",
    guestLabel: "Preparing",
    guestHint: "The kitchen is cooking your order.",
    nextAction: "Mark ready",
  },
  ready: {
    label: "Ready",
    guestLabel: "Ready",
    guestHint: "Your order is on its way to your table.",
    nextAction: "Mark served",
  },
  completed: {
    label: "Completed",
    guestLabel: "Completed",
    guestHint: "Enjoy your meal!",
  },
};

export function nextStatus(status: OrderStatus): OrderStatus | null {
  const index = ORDER_FLOW.indexOf(status);
  return index >= 0 && index < ORDER_FLOW.length - 1 ? ORDER_FLOW[index + 1] : null;
}
