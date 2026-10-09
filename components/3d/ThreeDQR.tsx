"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FloatingChips } from "./FloatingChips";
import { StaticQrFallback } from "./StaticQrFallback";

const QRScene = dynamic(() => import("./QRScene"), {
  ssr: false,
  loading: () => <StaticQrFallback />,
});

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D scene failed, showing static fallback.", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

let webglSupport: boolean | null = null;
function hasWebGL() {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement("canvas");
    webglSupport = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

interface ThreeDQRProps {
  className?: string;
  tableNumber?: number;
  /** Force the lightweight scene (used in the small login visual). */
  simple?: boolean;
  /** Show the floating order chips. Always hidden on phones. */
  chips?: boolean;
}

/**
 * Interactive 3D hero object: QR table card, phone, burger and floating order chips.
 * Handles SSR, WebGL failure, phone-friendly simplification, reduced motion and
 * pauses rendering when scrolled out of view.
 */
export function ThreeDQR({ className, tableNumber = 5, simple, chips = true }: ThreeDQRProps) {
  const isClient = useIsClient();
  const isPhone = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const canRender3D = isClient && hasWebGL();

  return (
    <div ref={ref} className={cn("relative", className)}>
      {canRender3D ? (
        <SceneBoundary fallback={<StaticQrFallback />}>
          <QRScene
            simple={simple || isPhone}
            reducedMotion={reducedMotion}
            paused={!visible}
            tableNumber={tableNumber}
            className="!absolute inset-0 touch-pan-y"
          />
        </SceneBoundary>
      ) : (
        <StaticQrFallback />
      )}
      {canRender3D && chips && !isPhone && <FloatingChips reducedMotion={reducedMotion} tableNumber={tableNumber} />}
    </div>
  );
}
