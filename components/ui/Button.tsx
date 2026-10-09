"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type Variant = "primary" | "dark" | "yellow" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

type ButtonElementProps = SharedProps & HTMLMotionProps<"button"> & { href?: undefined };
type LinkElementProps = SharedProps & ComponentProps<typeof MotionLink> & { href: string };

const variants: Record<Variant, string> = {
  primary: "bg-chili-500 text-white shadow-red hover:bg-chili-600",
  dark: "bg-ink-950 text-white hover:bg-ink-800",
  yellow: "bg-sun-400 text-ink-950 hover:bg-sun-300",
  outline: "border border-ink-950/15 bg-white text-ink-950 hover:border-ink-950/50",
  ghost: "text-ink-950 hover:bg-ink-950/5",
  danger: "border border-chili-500/25 bg-white text-chili-600 hover:bg-chili-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 rounded-xl px-3.5 text-sm",
  md: "h-11 gap-2 rounded-xl px-5 text-[15px]",
  lg: "h-14 gap-2.5 rounded-full px-7 text-base",
};

/** Button that renders a Next.js <Link> when `href` is provided. */
export function Button(props: ButtonElementProps | LinkElementProps) {
  const {
    variant = "primary",
    size = "md",
    loading,
    fullWidth,
    iconLeft,
    iconRight,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "inline-flex select-none items-center justify-center whitespace-nowrap font-semibold transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : iconLeft}
      {children}
      {!loading && iconRight}
    </>
  );

  if (typeof (rest as LinkElementProps).href === "string") {
    return (
      <MotionLink whileTap={{ scale: 0.97 }} className={classes} {...(rest as Omit<LinkElementProps, keyof SharedProps>)}>
        {content}
      </MotionLink>
    );
  }

  const buttonProps = rest as HTMLMotionProps<"button">;
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      {...buttonProps}
      disabled={loading || buttonProps.disabled}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
