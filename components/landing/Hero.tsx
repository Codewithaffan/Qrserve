"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThreeDQR } from "@/components/3d/ThreeDQR";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const proof = ["No app to download", "Works on any phone", "Live in minutes"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden rounded-b-[2.5rem] bg-sun-400 md:rounded-b-[4rem]">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <Container className="relative grid items-center gap-2 pb-14 pt-28 lg:grid-cols-12 lg:gap-6 lg:pb-20 lg:pt-32">
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6">
          <motion.h1
            variants={item}
            className="text-balance text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.035em] text-ink-950 sm:text-[4rem] xl:text-[4.9rem]"
          >
            Turn Every Table Into a Digital Ordering Experience
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-950/80">
            Simple QR ordering for modern restaurants. Let guests scan, browse, order, and enjoy — without waiting.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/login" size="lg">
              Get Started
            </Button>
            <Button href="#how-it-works" size="lg" variant="outline" className="border-transparent">
              See How It Works
            </Button>
          </motion.div>

          <motion.ul variants={item} className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-semibold text-ink-950">
            {proof.map((text) => (
              <li key={text} className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-ink-950 text-sun-400">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </motion.ul>

          <motion.p variants={item} className="mt-7 text-sm text-ink-950/75">
            Just curious?{" "}
            <Link href="https://qr-ordering-c305.onrender.com/" className="font-bold text-ink-950 underline decoration-2 underline-offset-4 hover:decoration-chili-500">
              Try the guest demo
            </Link>{" "}
            as if you had scanned Table 5.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[430px] sm:h-[520px] lg:col-span-6 lg:h-[640px]"
        >
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[82%] -translate-x-1/2 -translate-y-[46%] rounded-full bg-sun-300" />
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[96%] -translate-x-1/2 -translate-y-[46%] rounded-full border border-dashed border-ink-950/20" />
          <ThreeDQR className="absolute inset-y-[-4%] -inset-x-[6%] lg:-inset-x-[10%]" />
        </motion.div>
      </Container>
    </section>
  );
}
