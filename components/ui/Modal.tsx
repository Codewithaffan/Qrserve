"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "@/hooks/useDialog";
import { useIsClient } from "@/hooks/useIsClient";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Visually hide the title (it stays available to screen readers). */
  hideTitle?: boolean;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

const widths = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-xl" };

export function Modal({ open, onClose, title, hideTitle, size = "md", children, className }: ModalProps) {
  const isClient = useIsClient();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialog(open, onClose, panelRef);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-ink-950/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            className={cn(
              "relative max-h-[92dvh] w-full overflow-y-auto rounded-[28px] bg-white shadow-lift outline-none",
              widths[size],
              className,
            )}
          >
            <div className={cn("flex items-start justify-between gap-4 px-6 pt-6", hideTitle && "absolute right-0 top-0 z-10 p-4")}>
              <h2 id={titleId} className={cn("font-display text-xl font-bold", hideTitle && "sr-only")}>
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-100 text-ink-700 transition-colors hover:bg-ink-200"
              >
                <X className="size-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
