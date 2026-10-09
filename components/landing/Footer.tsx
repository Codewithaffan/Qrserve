import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer>
      <section className="bg-sun-400 py-16 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <h2 className="max-w-xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Give every table a QR code today.
          </h2>
          <Button href="/login" size="lg" variant="dark">
            Get Started
          </Button>
        </Container>
      </section>
      <div className="bg-white py-8">
        <Container className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <Logo />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-600">
            <Link href="/#home" className="hover:text-ink-950">Home</Link>
            <Link href="/#features" className="hover:text-ink-950">Features</Link>
            <Link href="https://qr-ordering-c305.onrender.com/" className="hover:text-ink-950">Guest demo</Link>
          </nav>
          <p className="text-sm text-ink-500">© 2026 QRServe.</p>
        </Container>
      </div>
    </footer>
  );
}
