# QRServe — restaurant QR ordering (frontend)

A frontend-only build of a SaaS-style QR ordering product: landing page, login, restaurant dashboard,
table QR management, menu management, live orders, and the guest ordering flow. Everything runs on
local dummy data. No Firebase, MongoDB, Cloudinary, payments or API routes yet.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Landing page with the interactive 3D QR table hero |
| `/login` | Simulated login / sign-up (any valid email + 4+ char password) |
| `/dashboard` | Overview, live orders, table overview |
| `/dashboard/tables` | 10 tables, QR modal, PNG download |
| `/dashboard/menu` | Menu manager: filter, add, edit, delete, availability |
| `/dashboard/orders` | Orders by status, advance an order through the kitchen flow |
| `/dashboard/settings` | Restaurant profile form |
| `/restaurant/demo/table/5` | What a guest sees after scanning (`demo`, `demo-restaurant` and `abc` all resolve) |

## Structure

```
app/            routes (App Router)
components/
  ui/           Button, Modal, Sheet, Badge, Form, Toast, FoodImage, Logo…
  landing/      Navbar, Hero, Features, HowItWorks, Footer
  3d/           ThreeDQR (wrapper), QRScene, parts, textures, FloatingChips
  dashboard/    Shell, Sidebar, StatCard, OrderCard, TableCard, QRModal…
  menu/         CategoryTabs, MenuItemCard, MenuManager, ItemFormModal
  customer/     CustomerMenu, FoodCard, CartDrawer, OrderConfirmation…
  auth/         LoginForm
hooks/          useCart, useOrders, useDialog, useBaseUrl…
lib/            data.ts (dummy data), services.ts (data layer), utils, qr, constants
types/          shared TypeScript types
```

## Connecting a backend later

- **Data:** every read goes through `lib/services.ts`. Replace those function bodies with MongoDB
  queries; pages and components keep working because they only receive props.
- **Writes:** each mutation is a clearly named handler with a comment: `handlePlaceOrder`
  (`CustomerMenu`), `useOrders.advance`, `MenuManager.handleSave/confirmDelete`, `SettingsForm`.
- **Auth:** `LoginForm.handleSubmit` is the only place that fakes authentication. The dashboard layout
  has a comment where the session's restaurant should be read.
- **Images:** `Product.image` and `Restaurant.logo` are plain URLs. `next.config.ts` already allows
  `res.cloudinary.com`, and `ItemFormModal` marks where the upload goes.
- **Real-time order status:** `OrderConfirmation` uses a timer; swap it for a Firestore `onSnapshot`
  or similar subscription.
- **QR codes:** they encode `window.location.origin` + `/restaurant/<slug>/table/<n>`. Set
  `NEXT_PUBLIC_APP_URL` for a fixed production domain.

## Notes

- The 3D scene renders offline (no HDR/CDN downloads), pauses when scrolled out of view, is
  simplified on phones, respects `prefers-reduced-motion`, and falls back to a 2D card without WebGL.
- Demo food photos come from Unsplash. If one fails to load, a branded placeholder is shown instead.
