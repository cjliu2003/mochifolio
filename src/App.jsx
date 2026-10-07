import { useEffect } from 'react'
import { DialogProvider } from './components/Checkout.jsx'
import { Footer, SiteNav, StickyBuy } from './components/Layout.jsx'
import {
  BeforeAfter,
  Faq,
  FinalCta,
  Hero,
  PackageModules,
  ProductPreviews,
  Proof,
  Qualification,
  Recognition,
  SecondaryProducts,
  SystemDiagram,
} from './components/Sections.jsx'

// Fade sections in as they scroll into view. Content is fully visible if
// this never runs (no JS, reduced motion), because .reveal only hides
// under .motion-ready. Anything already on screen at load is shown at once
// so the first frame (and link previews) is never blank.
function useReveal() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const pending = [...document.querySelectorAll('.reveal')].filter((el) => {
      if (el.getBoundingClientRect().top < innerHeight) {
        el.classList.add('in')
        return false
      }
      return true
    })
    document.documentElement.classList.add('motion-ready')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    pending.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  const cancelled = new URLSearchParams(window.location.search).get('checkout') === 'cancelled'
  return (
    <DialogProvider>
      <SiteNav />
      <main id="top">
        {cancelled && (
          <p className="notice" role="status">
            Checkout closed — nothing was charged. Mochi OS is still here whenever you need it.
          </p>
        )}
        <Hero />
        <Recognition />
        <PackageModules />
        <BeforeAfter />
        <ProductPreviews />
        <Qualification />
        <SystemDiagram />
        <Proof />
        <Faq />
        <SecondaryProducts />
        <FinalCta />
      </main>
      <Footer />
      <StickyBuy />
    </DialogProvider>
  )
}
