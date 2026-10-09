"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const steps = [
  { n: "01", title: "Scan QR", text: "Point any phone camera at the code on the table." },
  { n: "02", title: "Explore Menu", text: "Browse dishes with photos, prices and veg markers." },
  { n: "03", title: "Add to Cart", text: "Pick items, change quantities and check the bill." },
  { n: "04", title: "Place Order", text: "Send it to the kitchen and follow it live." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-ink-950 py-20 text-white sm:py-28">
      <Container>
        <h2 className="max-w-xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
          Four taps from hungry to ordered.
        </h2>

        <div className="relative mt-14">
          {/* Connector: horizontal on desktop, vertical on mobile */}
          <div aria-hidden="true" className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px bg-white/15 lg:left-0 lg:top-[27px] lg:h-px lg:w-full" />
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0, scaleX: 0 }}
            whileInView={{ scaleY: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-sun-400 lg:left-0 lg:top-[27px] lg:h-px lg:w-full lg:origin-left"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <li key={step.n} className="flex gap-5 lg:block">
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-sun-400 font-display text-lg font-extrabold text-ink-950 ring-8 ring-ink-950">
                  {step.n}
                </span>
                <div className="lg:mt-7">
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 max-w-[16rem] text-base leading-relaxed text-white/70">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-[2rem] bg-white/6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-2xl font-bold">See what your guests see.</p>
            <p className="mt-1 text-white/70">Open the live customer menu for Table 5.</p>
          </div>
          <Button href="https://qr-ordering-c305.onrender.com/" variant="yellow" size="lg">
            Open guest demo
          </Button>
        </div>
      </Container>
    </section>
  );
}
