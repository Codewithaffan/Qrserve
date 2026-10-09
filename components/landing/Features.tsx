"use client";

import { motion } from "framer-motion";
import { ChefHat, LayoutDashboard, QrCode, ShoppingBag, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  text: string;
  icon: LucideIcon;
  span: string;
  surface: string;
  iconTile: string;
  muted: string;
}

const features: Feature[] = [
  {
    title: "Scan",
    text: "Customers scan the QR at their table. No app, no sign-up, no waiting for a menu.",
    icon: QrCode,
    span: "lg:col-span-5",
    surface: "bg-sun-400 text-ink-950",
    iconTile: "bg-ink-950 text-sun-400",
    muted: "text-ink-950/75",
  },
  {
    title: "Browse",
    text: "They instantly see the restaurant menu with photos, prices and categories, made for thumbs.",
    icon: ChefHat,
    span: "lg:col-span-7",
    surface: "bg-ink-50 text-ink-950",
    iconTile: "bg-white text-chili-500 shadow-card",
    muted: "text-ink-600",
  },
  {
    title: "Order",
    text: "Customers add items and place their order. It reaches the kitchen the second they tap.",
    icon: ShoppingBag,
    span: "lg:col-span-7",
    surface: "bg-chili-500 text-white",
    iconTile: "bg-white text-chili-500",
    muted: "text-white/85",
  },
  {
    title: "Manage",
    text: "Restaurant staff manage tables, menu and incoming orders from one calm dashboard.",
    icon: LayoutDashboard,
    span: "lg:col-span-5",
    surface: "bg-ink-950 text-white",
    iconTile: "bg-sun-400 text-ink-950",
    muted: "text-white/70",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 bg-white py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            From scan to served, without the wait.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-ink-600">
            One QR code per table replaces printed menus, flagged-down waiters and forgotten orders.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {features.map(({ title, text, icon: Icon, span, surface, iconTile, muted }) => (
            <motion.article
              key={title}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className={cn("group flex min-h-[15rem] flex-col justify-between rounded-[2rem] p-7 sm:p-8", span, surface)}
            >
              <span
                className={cn(
                  "grid size-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105",
                  iconTile,
                )}
              >
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <div className="mt-10">
                <h3 className="text-3xl font-extrabold">{title}</h3>
                <p className={cn("mt-2 max-w-md text-[17px] leading-relaxed", muted)}>{text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
