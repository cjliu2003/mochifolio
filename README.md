# Mochifolio

Landing page for **Mochi OS** (a $49 one-time starter system for money, AI, and habits) and two smaller products. It's a React (Vite) port of the approved prototype, plus a small Express + Stripe backend that stays off until the keys are added.

## Run it

```bash
npm install
npm run dev                  # http://localhost:5173, demo checkout, collects nothing
npm run build && npm start   # production server on :3000 (serves dist/ + /api)
```

Copy `.env.example` to `.env`. With `VITE_CHECKOUT_MODE=demo` (the default), every buy button opens a labeled checkout preview. Set it to `stripe` and fill in the server keys to use Stripe Checkout.

## Layout

- `src/products.js`: display names and prices for the three products. Change them here only.
- `src/components/Checkout.jsx`: `<BuyButton>`, the checkout-preview dialog, and the "policy pending" dialog.
- `src/components/Sections.jsx`: the page sections, in page order.
- `src/components/Layout.jsx`: nav, footer, and the sticky mobile buy bar.
- `art-source/`: the original illustration PNGs. After changing one, run `python3 scripts/optimize-images.py` to regenerate the WebP files in `public/assets/`.
- `server/index.js`: `POST /api/create-checkout-session` (maps an allowlisted product to a server-held Price ID) and `POST /api/stripe-webhook` (verifies the signature and fulfills only on `checkout.session.completed`).
- `server/fulfill.js`: delivery stub. It still needs a durable idempotency store, a file host, and an email provider.

## Deploying

- **Static (demo checkout):** `.github/workflows/pages.yml` builds and deploys `dist/` to GitHub Pages on every push to `main`, at https://cjliu2003.github.io/mochifolio/. Any static host (Netlify, Vercel, Cloudflare Pages) works the same way: build command `npm run build`, output directory `dist`.
- **With Stripe:** run `npm run build && npm start` on a Node host so the `/api` endpoints are available.

## Before launch (owner)

- [ ] Confirm or replace the provisional Mochi OS contents.
- [ ] Decide the refund policy, and write the Privacy, Terms, and Refund pages. The footer buttons open a "pending" note until then.
- [ ] Create the Stripe products and one-time prices ($49 / $27 / $39) in test mode, and put the Price IDs in env vars.
- [ ] Implement delivery in `server/fulfill.js`.
- [ ] Deploy, point the domain, run a test purchase to your own email, then switch to live keys.
- [ ] Leave the customer-proof slot empty until you have verified testimonials.
