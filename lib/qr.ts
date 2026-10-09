import QRCode from "qrcode";

/** Boolean module matrix of a QR code (true = dark). Used by the 3D scene. */
export function getQrMatrix(text: string): boolean[][] {
  const qr = QRCode.create(text, { errorCorrectionLevel: "M" });
  const size = qr.modules.size;
  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => Boolean(qr.modules.get(row, col))),
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

/**
 * Downloads a print-ready PNG for a table: QR code plus table number and caption.
 * Fully client-side; no backend involved.
 */
export async function downloadTableQr(url: string, tableNumber: number, restaurantName: string) {
  const qrDataUrl = await QRCode.toDataURL(url, {
    width: 900,
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#000000", light: "#ffffff" },
  });
  const qrImage = await loadImage(qrDataUrl);

  const width = 1200;
  const height = 1600;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffc700";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(100, 300, 1000, 1000, 48);
  ctx.fill();
  ctx.drawImage(qrImage, 150, 350, 900, 900);

  ctx.textAlign = "center";
  ctx.fillStyle = "#000000";
  ctx.font = "800 84px sans-serif";
  ctx.fillText(restaurantName, width / 2, 190);
  ctx.font = "700 150px sans-serif";
  ctx.fillText(`Table ${tableNumber}`, width / 2, 1450);
  ctx.font = "500 52px sans-serif";
  ctx.fillText("Scan to view menu and order", width / 2, 1530);

  const link = document.createElement("a");
  link.download = `table-${tableNumber}-qr.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
