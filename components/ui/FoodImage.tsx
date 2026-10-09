"use client";

import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FoodImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Food photo with a graceful fallback. `src` can be any remote URL now and a
 * Cloudinary URL later; blob/data URLs (local upload previews) skip the optimiser.
 */
export function FoodImage({ src, alt, sizes = "(min-width: 1024px) 320px, 50vw", priority, className }: FoodImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = !src || failedSrc === src;
  const unoptimized = src.startsWith("blob:") || src.startsWith("data:");

  return (
    <div className={cn("relative overflow-hidden bg-sun-100", className)}>
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-sun-200 to-sun-400">
          <UtensilsCrossed className="size-9 text-ink-950/25" aria-hidden="true" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized={unoptimized}
          onError={() => setFailedSrc(src)}
          className="object-cover"
        />
      )}
    </div>
  );
}
