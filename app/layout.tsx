import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource-variable/dm-sans/index.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "QRServe — QR ordering for restaurants",
    template: "%s · QRServe",
  },
  description:
    "Simple QR ordering for modern restaurants. Guests scan, browse, order and enjoy — without waiting.",
};

export const viewport: Viewport = {
  themeColor: "#ffc700",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
