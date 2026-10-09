"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Store } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Form";

type Mode = "login" | "signup";

/**
 * Simulated authentication. Swap `handleSubmit` for Firebase Auth later;
 * the rest of the form stays as is.
 */
export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);

  const isSignup = mode === "signup";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const restaurant = String(data.get("restaurant") ?? "").trim();

    const next: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 4) next.password = "Password must be at least 4 characters.";
    if (isSignup && !restaurant) next.restaurant = "Enter your restaurant name.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setNotice(null);
    // Fake network delay, then straight into the dashboard.
    window.setTimeout(() => router.push("/dashboard"), 900);
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-extrabold tracking-tight">{isSignup ? "Create your account" : "Welcome Back"}</h1>
      <p className="mt-2 text-ink-600">
        {isSignup ? "Set up your restaurant in a couple of minutes." : "Log in to manage your tables, menu and orders."}
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <AnimatePresence initial={false}>
          {isSignup && (
            <motion.div
              key="restaurant"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden px-1 -mx-1"
            >
              <TextField
                name="restaurant"
                label="Restaurant name"
                placeholder="ABC Restaurant"
                autoComplete="organization"
                icon={<Store className="size-[18px]" />}
                error={errors.restaurant}
                wrapperClassName="pb-1 pt-1"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <TextField
          name="email"
          type="email"
          label="Email"
          placeholder="you@restaurant.com"
          autoComplete="email"
          icon={<Mail className="size-[18px]" />}
          error={errors.email}
        />

        <div className="relative">
          <TextField
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="••••••••"
            autoComplete={isSignup ? "new-password" : "current-password"}
            icon={<Lock className="size-[18px]" />}
            error={errors.password}
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-[31px] grid size-9 place-items-center rounded-lg text-ink-500 hover:bg-ink-100 hover:text-ink-950"
          >
            {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
          </button>
        </div>

        {!isSignup && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex cursor-pointer items-center gap-2.5 font-medium text-ink-800">
              <input type="checkbox" name="remember" defaultChecked className="size-[18px] rounded accent-black" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => setNotice("Password reset is not connected yet. Any password works in this demo.")}
              className="font-semibold text-chili-600 underline-offset-4 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {notice && (
          <p role="status" className="rounded-xl bg-sun-100 px-4 py-3 text-sm text-ink-800">
            {notice}
          </p>
        )}

        <Button type="submit" size="lg" fullWidth loading={loading} className="rounded-2xl">
          {loading ? (isSignup ? "Creating account" : "Logging in") : isSignup ? "Create account" : "Login"}
        </Button>
      </form>

      <p className="mt-7 text-center text-[15px] text-ink-600">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(isSignup ? "login" : "signup");
            setErrors({});
            setNotice(null);
          }}
          className="font-bold text-ink-950 underline decoration-2 underline-offset-4 hover:decoration-chili-500"
        >
          {isSignup ? "Log in" : "Create one"}
        </button>
      </p>
      <p className="mt-3 text-center text-sm text-ink-500">Demo only. Use any valid email and a password of 4+ characters.</p>
    </div>
  );
}
