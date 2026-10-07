// Production server: serves the built site and the two Stripe endpoints.
// Price IDs and the secret key stay here, never in the browser bundle.
import express from 'express'
import Stripe from 'stripe'
import { fileURLToPath } from 'node:url'
import { fulfill } from './fulfill.js'

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  STRIPE_PRICE_MOCHI_OS,
  STRIPE_PRICE_MOCHIS_21,
  STRIPE_PRICE_SAME_FACE,
  SITE_URL = 'http://localhost:3000',
  PORT = 3000,
} = process.env

// Allowlist: the only products the endpoint will sell, mapped to server-held prices.
const PRICES = {
  mochiOS: STRIPE_PRICE_MOCHI_OS,
  mochis21: STRIPE_PRICE_MOCHIS_21,
  sameFace: STRIPE_PRICE_SAME_FACE,
}

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null
const app = express()

// The webhook needs the raw body for signature verification, so it's
// registered before express.json().
app.post('/api/stripe-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) return res.status(503).send('Stripe not configured')
  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    return res.status(400).send(`Webhook signature verification failed: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.payment_status === 'paid') {
      try {
        await fulfill(session)
      } catch (err) {
        // Non-2xx makes Stripe retry; fulfill() is idempotent per session ID.
        console.error('Fulfillment failed', session.id, err)
        return res.status(500).send('Fulfillment failed')
      }
    }
  }
  res.json({ received: true })
})

app.use(express.json())

app.post('/api/create-checkout-session', async (req, res) => {
  const product = req.body?.product
  if (!Object.hasOwn(PRICES, product)) return res.status(400).json({ error: 'Unknown product' })
  if (!stripe || !PRICES[product]) return res.status(503).json({ error: 'Checkout not configured' })

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: PRICES[product], quantity: 1 }],
      metadata: { product },
      success_url: `${SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/?checkout=cancelled`,
    })
    res.json({ url: session.url })
  } catch (err) {
    console.error('Checkout session failed', err)
    res.status(500).json({ error: 'Could not start checkout' })
  }
})

const dist = fileURLToPath(new URL('../dist', import.meta.url))
app.use(express.static(dist))

app.listen(PORT, () => console.log(`mochifolio listening on :${PORT}`))
