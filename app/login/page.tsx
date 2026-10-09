"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThreeDQR } from "@/components/3d/ThreeDQR";
import { Logo } from "@/components/ui/Logo";

const WHATSAPP_NUMBER = "918793930643"; // country code + number, no +

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    number: "",
    email: "",
    restaurantName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message =
      `*New Enquiry*%0A` +
      `*Full Name:* ${encodeURIComponent(form.fullName)}%0A` +
      `*Number:* ${encodeURIComponent(form.number)}%0A` +
      `*E-Mail:* ${encodeURIComponent(form.email)}%0A` +
      `*Restaurant Name:* ${encodeURIComponent(form.restaurantName)}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <section className="relative flex flex-col overflow-hidden bg-sun-400 px-5 py-6 sm:px-10 lg:min-h-dvh lg:py-10">
        <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />
        <div className="relative flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 lg:hidden"
          >
            <ArrowLeft className="size-4" /> Back
          </Link>
        </div>

        <div className="relative hidden flex-1 lg:block">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[46%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun-300"
          />
          <ThreeDQR className="absolute inset-0" chips={false} simple />
        </div>

        <div className="relative mt-8 hidden max-w-md lg:block">
          <p className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight">
            Every table, menu and order in one calm place.
          </p>
          <p className="mt-3 text-ink-950/75">
            Sign in to see what your kitchen is cooking right now.
          </p>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center px-5 py-12 sm:px-10">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-950">
              Get started
            </h1>
            <p className="mt-1 text-sm text-ink-950/70">
              Fill in your details and we&apos;ll reach out.
            </p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-sm font-semibold text-ink-950">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-950/40 focus:ring-2 focus:ring-ink-950/10"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="number" className="block text-sm font-semibold text-ink-950">
              Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              value={form.number}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-950/40 focus:ring-2 focus:ring-ink-950/10"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-ink-950">
              E-Mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-950/40 focus:ring-2 focus:ring-ink-950/10"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="restaurantName" className="block text-sm font-semibold text-ink-950">
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              name="restaurantName"
              type="text"
              value={form.restaurantName}
              onChange={handleChange}
              placeholder="Enter your restaurant name"
              required
              className="w-full rounded-xl border border-ink-950/15 bg-white px-4 py-3 text-sm text-ink-950 outline-none transition focus:border-ink-950/40 focus:ring-2 focus:ring-ink-950/10"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-950/90 focus:outline-none focus:ring-2 focus:ring-ink-950/30"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}