// Digital delivery after a verified, paid checkout.session.completed event.
//
// TODO before launch:
//  - Replace the in-memory set with a durable store (DB table keyed by session ID)
//    so retried webhooks never double-fulfill across restarts.
//  - Choose a file host (S3/R2 signed URLs, gated download page, etc.) and an
//    email provider, then send the buyer a time-limited download link.
//  - Record purchase_complete analytics here (server-side).
const processed = new Set()

export async function fulfill(session) {
  if (processed.has(session.id)) return
  const email = session.customer_details?.email
  const product = session.metadata?.product
  console.log(`[fulfill] ${session.id}: deliver ${product} to ${email}`)
  processed.add(session.id)
}
