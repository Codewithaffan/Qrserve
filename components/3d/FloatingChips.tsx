"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BellRing, CircleCheck } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChipProps {
  className: string;
  depth: number;
  delay: number;
  dark?: boolean;
  reducedMotion?: boolean;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  children: React.ReactNode;
}

function Chip({ className, depth, delay, dark, reducedMotion, px, py, children }: ChipProps) {
  const x = useTransform(px, [-1, 1], [-16 * depth, 16 * depth]);
  const y = useTransform(py, [-1, 1], [-10 * depth, 10 * depth]);
  return (
    <motion.div style={{ x, y }} className={cn("absolute z-10", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -9, 0] }}
        transition={
          reducedMotion
            ? { duration: 0.4, delay }
            : { opacity: { delay, duration: 0.5 }, scale: { delay, duration: 0.5 }, y: { delay, duration: 5.5, repeat: Infinity, ease: "easeInOut" } }
        }
        className={cn(
          "flex select-none items-center gap-2 whitespace-nowrap rounded-full py-2 pl-2.5 pr-4 text-[13px] font-semibold shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]",
          dark ? "bg-black text-white" : "bg-white text-black",
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Floating UI labels layered over the 3D scene (DOM, so they stay crisp and never clip). */
export function FloatingChips({ reducedMotion, tableNumber }: { reducedMotion?: boolean; tableNumber: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      mx.set((event.clientX / window.innerWidth) * 2 - 1);
      my.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Chip className="right-[3%] top-[13%]" depth={1.2} delay={0.9} px={px} py={py} reducedMotion={reducedMotion}>
        <CircleCheck className="size-5 text-leaf-500" />
        Order #1045 placed
      </Chip>
      <Chip className="left-[2%] top-[30%]" depth={0.8} delay={1.1} dark px={px} py={py} reducedMotion={reducedMotion}>
        <span className="grid size-5 place-items-center rounded-full bg-sun-400 text-black">
          <BellRing className="size-3" />
        </span>
        Table {tableNumber} · ₹580
      </Chip>
    </div>
  );
}
