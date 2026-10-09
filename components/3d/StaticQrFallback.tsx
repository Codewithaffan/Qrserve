import { QRCodeSVG } from "qrcode.react";

/**
 * Lightweight 2D stand-in shown while the 3D scene loads, when WebGL is
 * unavailable, or if the scene throws.
 */
export function StaticQrFallback() {
  return (
    <div className="flex size-full items-center justify-center" role="img" aria-label="QR code on a restaurant table card">
      <div className="w-[min(64%,300px)] -rotate-3 overflow-hidden rounded-[28px] bg-white shadow-lift">
        <div className="bg-chili-500 py-3.5 text-center font-display text-lg font-extrabold text-white">SCAN TO ORDER</div>
        <div className="p-6">
          <QRCodeSVG value="https://qrserve.app/restaurant/demo/table/5" size={512} className="h-auto w-full" />
          <p className="mt-4 text-center font-display text-2xl font-extrabold">Table 5</p>
        </div>
      </div>
    </div>
  );
}
