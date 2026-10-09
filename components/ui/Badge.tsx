import type { OrderStatus, TableStatus } from "@/types";
import { ORDER_STATUS_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Tone = "red" | "yellow" | "green" | "neutral" | "dark";

const tones: Record<Tone, { pill: string; dot: string }> = {
  red: { pill: "bg-chili-50 text-chili-600", dot: "bg-chili-500" },
  yellow: { pill: "bg-sun-100 text-sun-700", dot: "bg-sun-500" },
  green: { pill: "bg-leaf-50 text-leaf-700", dot: "bg-leaf-500" },
  neutral: { pill: "bg-ink-100 text-ink-600", dot: "bg-ink-400" },
  dark: { pill: "bg-ink-950 text-white", dot: "bg-sun-400" },
};

interface BadgeProps {
  tone?: Tone;
  children: React.ReactNode;
  pulse?: boolean;
  dot?: boolean;
  className?: string;
}

export function Badge({ tone = "neutral", children, pulse, dot = true, className }: BadgeProps) {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        t.pill,
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn("size-1.5 rounded-full", t.dot, pulse && "animate-pulse-dot text-chili-500/60")}
        />
      )}
      {children}
    </span>
  );
}

const orderTone: Record<OrderStatus, Tone> = {
  new: "red",
  preparing: "yellow",
  ready: "green",
  completed: "neutral",
};

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  return (
    <Badge tone={orderTone[status]} pulse={status === "new"} className={className}>
      {ORDER_STATUS_META[status].label}
    </Badge>
  );
}

export function TableStatusBadge({ status, className }: { status: TableStatus; className?: string }) {
  return (
    <Badge tone={status === "available" ? "green" : "yellow"} className={className}>
      {status === "available" ? "Available" : "Occupied"}
    </Badge>
  );
}

/** Indian-menu veg / non-veg marker. */
export function VegMark({ isVeg, className }: { isVeg: boolean; className?: string }) {
  return (
    <span
      role="img"
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-[4px] border-[1.5px]",
        isVeg ? "border-leaf-500" : "border-chili-500",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", isVeg ? "bg-leaf-500" : "bg-chili-500")} />
    </span>
  );
}
