"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Subtle entrance for route content. Used from `template.tsx` so it replays per navigation. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
