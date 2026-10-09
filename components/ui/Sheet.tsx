"use client";

import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useDialog } from "@/hooks/useDialog";
import { useIsClient } from "@/hooks/useIsClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Show the title bar. When false only a floating close button is rendered. */
  showHeader?: boolean;
  footer?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}

/**
 * Bottom sheet on phones (drag the handle to dismiss), side drawer from `md` up.
 */
export function Sheet({ open, onClose, title, showHeader = true, footer, children, bodyClassName }: SheetProps) {
  const isClient = useIsClient();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const panelRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const titleId = useId();
  useDialog(open, onClose, panelRef);

  if (!isClient) return null;

  const hidden = isDesktop ? { x: "100%", y: 0 } : { x: 0, y: "100%" };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
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
            initial={hidden}
            animate={{ x: 0, y: 0 }}
            exit={hidden}
            transition={{ type: "spring", damping: 34, stiffness: 340 }}
            drag={isDesktop ? false : "y"}
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className={cn(
              "absolute flex flex-col bg-white outline-none shadow-lift",
              "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-[28px]",
              "md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[440px] md:rounded-l-[28px] md:rounded-tr-none",
            )}
          >
            {/* Drag handle (phones) */}
            <div
              className="flex shrink-0 touch-none justify-center pb-1 pt-3 md:hidden"
              onPointerDown={(event) => controls.start(event)}
            >
              <span className="h-1.5 w-11 rounded-full bg-ink-200" />
            </div>

            {!showHeader && (
              <h2 id={titleId} className="sr-only">
                {title}
              </h2>
            )}

            {showHeader ? (
              <div className="flex shrink-0 items-center justify-between px-5 pb-3 pt-2 md:pt-5">
                <h2 id={titleId} className="font-display text-xl font-bold">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="grid size-9 place-items-center rounded-full bg-ink-100 text-ink-700 transition-colors hover:bg-ink-200"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/95 text-ink-950 shadow-card transition-transform hover:scale-105"
              >
                <X className="size-4" />
              </button>
            )}

            <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", bodyClassName)}>{children}</div>
            {footer && <div className="shrink-0 border-t border-ink-100 bg-white px-5 pb-safe pt-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
