import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** `dark` = black mark for light/yellow backgrounds. `light` = yellow mark for black backgrounds. */
  tone?: "dark" | "light";
  href?: string;
  className?: string;
  showWordmark?: boolean;
}

export function LogoMark({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const bg = tone === "dark" ? "#000" : "#ffc700";
  const fg = tone === "dark" ? "#ffc700" : "#000";
  return (
    <svg viewBox="0 0 32 32" className={cn("size-9 shrink-0", className)} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill={bg} />
      <g fill="none" stroke={fg} strokeWidth="2.4">
        <rect x="6.2" y="6.2" width="7.6" height="7.6" rx="1.6" />
        <rect x="18.2" y="6.2" width="7.6" height="7.6" rx="1.6" />
        <rect x="6.2" y="18.2" width="7.6" height="7.6" rx="1.6" />
      </g>
      <g fill={fg}>
        <rect x="9" y="9" width="2" height="2" />
        <rect x="21" y="9" width="2" height="2" />
        <rect x="9" y="21" width="2" height="2" />
        <rect x="18.5" y="18.5" width="3.2" height="3.2" />
        <rect x="22.8" y="22.8" width="3.2" height="3.2" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark", href = "/", className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="QRServe home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark tone={tone} />
      {showWordmark && (
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-tight",
            tone === "dark" ? "text-ink-950" : "text-white",
          )}
        >
          QRServe
        </span>
      )}
    </Link>
  );
}
