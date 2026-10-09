import * as THREE from "three";

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export const CARD_W = 1.7;
export const CARD_H = 2.1;
/** Side of the 3D QR code on the card, in scene units. */
export const QR_SIZE = 1.1;

/** Printed table card: red header, quiet-zone frame for the 3D QR, table number. */
export function createCardTexture(tableNumber: number) {
  const scale = 400;
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W * scale;
  canvas.height = CARD_H * scale;
  const ctx = canvas.getContext("2d")!;
  const { width: w, height: h } = canvas;

  roundRectPath(ctx, 0, 0, w, h, 36);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#e3261c";
  ctx.fillRect(0, 0, w, 150);
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "800 50px system-ui, sans-serif";
  ctx.fillText("SCAN TO ORDER", w / 2, 78);

  // Frame around the QR (QR itself is real 3D geometry).
  const qr = QR_SIZE * scale;
  roundRectPath(ctx, w / 2 - qr / 2 - 22, h / 2 - qr / 2 - 22, qr + 44, qr + 44, 26);
  ctx.strokeStyle = "#f1efe6";
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.fillStyle = "#000000";
  ctx.font = "800 74px system-ui, sans-serif";
  ctx.fillText(`Table ${tableNumber}`, w / 2, 742);
  ctx.fillStyle = "#7d7a70";
  ctx.font = "500 30px system-ui, sans-serif";
  ctx.fillText("qrserve.app", w / 2, 802);

  return toTexture(canvas);
}

export const PHONE_SCREEN_W = 0.85;
export const PHONE_SCREEN_H = 1.78;

/** Miniature of the customer menu, drawn to a canvas so it stays crisp and asset-free. */
export function createPhoneTexture() {
  const scale = 600;
  const canvas = document.createElement("canvas");
  canvas.width = PHONE_SCREEN_W * scale;
  canvas.height = PHONE_SCREEN_H * scale;
  const ctx = canvas.getContext("2d")!;
  const { width: w, height: h } = canvas;

  roundRectPath(ctx, 0, 0, w, h, 52);
  ctx.clip();
  ctx.fillStyle = "#fffdf2";
  ctx.fillRect(0, 0, w, h);

  // Header
  ctx.fillStyle = "#ffc700";
  ctx.fillRect(0, 0, w, 330);
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.roundRect(w / 2 - 55, 22, 110, 30, 15);
  ctx.fill();

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#000";
  ctx.font = "800 40px system-ui, sans-serif";
  ctx.fillText("ABC Restaurant", 34, 130);
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.roundRect(34, 150, 128, 44, 22);
  ctx.fill();
  ctx.fillStyle = "#ffc700";
  ctx.font = "700 24px system-ui, sans-serif";
  ctx.fillText("Table 5", 56, 181);

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.roundRect(34, 232, w - 68, 60, 30);
  ctx.fill();
  ctx.fillStyle = "#a3a094";
  ctx.font = "500 24px system-ui, sans-serif";
  ctx.fillText("Search the menu", 76, 270);

  // Category pills
  const pills: [string, number, boolean][] = [
    ["All", 34, true],
    ["Burgers", 128, false],
    ["Pizza", 268, false],
  ];
  pills.forEach(([label, x, active]) => {
    const pw = label === "All" ? 76 : label === "Burgers" ? 126 : 96;
    ctx.fillStyle = active ? "#000" : "#fff";
    ctx.beginPath();
    ctx.roundRect(x, 362, pw, 48, 24);
    ctx.fill();
    if (!active) {
      ctx.strokeStyle = "#e6e3d7";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.fillStyle = active ? "#fff" : "#2a2925";
    ctx.font = "700 22px system-ui, sans-serif";
    ctx.fillText(label, x + 20, 393);
  });

  // Menu rows
  const rows: [string, string, string, string][] = [
    ["Chicken Burger", "₹220", "#f3a83b", "#c9711c"],
    ["Masala Fries", "₹150", "#ffd83d", "#e0a300"],
    ["Cold Coffee", "₹140", "#b98a63", "#6b4428"],
    ["Margherita", "₹320", "#ff7a59", "#c81d14"],
  ];
  rows.forEach(([name, price, c1, c2], i) => {
    const y = 448 + i * 128;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.roundRect(24, y, w - 48, 112, 28);
    ctx.fill();
    const g = ctx.createLinearGradient(40, y + 12, 130, y + 100);
    g.addColorStop(0, c1);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(38, y + 14, 84, 84, 20);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = "700 27px system-ui, sans-serif";
    ctx.fillText(name, 142, y + 54);
    ctx.fillStyle = "#5f5c54";
    ctx.font = "600 24px system-ui, sans-serif";
    ctx.fillText(price, 142, y + 90);
    ctx.fillStyle = "#e3261c";
    ctx.beginPath();
    ctx.arc(w - 68, y + 56, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "700 34px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("+", w - 68, y + 68);
    ctx.textAlign = "left";
  });

  // Cart bar
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.roundRect(24, h - 128, w - 48, 88, 44);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "700 26px system-ui, sans-serif";
  ctx.fillText("View cart · 3 items", 58, h - 76);
  ctx.fillStyle = "#ffc700";
  ctx.textAlign = "right";
  ctx.fillText("₹510", w - 58, h - 76);

  return toTexture(canvas);
}
