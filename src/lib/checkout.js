// "demo" (default) opens the labeled demo modal and collects nothing.
// "stripe" posts to the backend and redirects to Stripe-hosted Checkout.
export const CHECKOUT_MODE = import.meta.env.VITE_CHECKOUT_MODE === 'stripe' ? 'stripe' : 'demo'

export function track(event, props = {}) {
  // Hook up your analytics provider here. purchase_complete is emitted server-side.
  if (import.meta.env.DEV) console.debug('[analytics]', event, props)
}

export async function startCheckout(product) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product }),
  })
  if (!res.ok) throw new Error('Could not start checkout')
  const { url } = await res.json()
  window.location.assign(url)
}
