import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-sun-400 px-6 text-center">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />
      <div className="relative">
        <Logo className="mb-10" />
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">Table not found</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-950/80">
          This page or QR code doesn&apos;t point to a table we know. Check the link, or start from the homepage.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg" variant="dark">Go home</Button>
          <Button href="/restaurant/demo/table/5" size="lg" variant="outline" className="border-transparent">Open the demo menu</Button>
        </div>
      </div>
    </main>
  );
}
