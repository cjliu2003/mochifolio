import { useEffect, useState } from 'react'
import { BuyButton, PolicyButton } from './Checkout.jsx'

export function SiteNav() {
  return (
    <header className="nav" aria-label="Main navigation">
      <div className="shell nav-inner">
        <a className="brand" href="#top">
          🐼 Mochi
        </a>
        <nav className="nav-links" aria-label="Page sections">
          <a href="#inside">What's inside</a>
          <a href="#peek">Peek inside</a>
          <a href="#faq">FAQ</a>
        </nav>
        <BuyButton variant="small" section="nav" />
      </div>
    </header>
  )
}

export function StickyBuy() {
  const [heroVisible, setHeroVisible] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.08 })
    io.observe(hero)
    return () => io.disconnect()
  }, [])

  const show = !heroVisible && !dismissed
  return (
    <div className={`sticky-buy${show ? ' show' : ''}`} role="region" aria-label="Mochi OS purchase shortcut" inert={!show}>
      <div className="sticky-copy">
        <strong>Mochi OS · $49</strong>
        <span>One time · No subscription</span>
      </div>
      <BuyButton section="sticky" />
      <button type="button" className="sticky-dismiss" aria-label="Dismiss purchase shortcut" onClick={() => setDismissed(true)}>
        ×
      </button>
    </div>
  )
}

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer>
      <div className="shell">
        <div className="footer-top">
          <div>
            <div className="footer-brand">🐼 Mochi · @mochifreedom</div>
            <div>One-time digital products. No subscriptions, ever.</div>
          </div>
          <div className="footer-links">
            {/* Policy pages are owner-supplied; until then these open a "pending" note. */}
            <PolicyButton name="Privacy" />
            <PolicyButton name="Terms" />
            <PolicyButton name="Refund policy" />
          </div>
        </div>
        <p className="disclaimer">
          Mochi OS is educational content about money, AI, and habits — not personalized financial advice.
          <br />© {YEAR} Mochi.
        </p>
      </div>
    </footer>
  )
}
