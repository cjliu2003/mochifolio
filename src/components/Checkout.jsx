import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { PRODUCTS } from '../products.js'
import { CHECKOUT_MODE, startCheckout, track } from '../lib/checkout.js'

const DialogContext = createContext(null)

const VARIANT_CLASS = { primary: 'cta', small: 'cta small', subordinate: 'cta-secondary' }

// Owns the two dialogs (checkout preview, policy pending) so any button on
// the page can open them. Native <dialog> gives us ESC, focus trapping and
// the backdrop for free.
export function DialogProvider({ children }) {
  const checkoutRef = useRef(null)
  const policyRef = useRef(null)
  const trigger = useRef(null)
  const [checkout, setCheckout] = useState({ product: 'mochiOS', failed: false })
  const [policy, setPolicy] = useState('Privacy')

  const show = (dialog) => {
    trigger.current = document.activeElement
    document.body.classList.add('modal-open')
    dialog.showModal()
  }

  const onClose = () => {
    document.body.classList.remove('modal-open')
    trigger.current?.focus()
  }

  const buy = useCallback(async (product, section) => {
    track('cta_click', { product, section })
    if (CHECKOUT_MODE === 'stripe') {
      track('checkout_start', { product })
      try {
        await startCheckout(product)
        return
      } catch {
        track('checkout_error', { product })
        setCheckout({ product, failed: true })
        show(checkoutRef.current)
        return
      }
    }
    setCheckout({ product, failed: false })
    show(checkoutRef.current)
  }, [])

  const openPolicy = useCallback((name) => {
    setPolicy(name)
    show(policyRef.current)
  }, [])

  const p = PRODUCTS[checkout.product]

  return (
    <DialogContext.Provider value={{ buy, openPolicy }}>
      {children}

      <Dialog ref={checkoutRef} labelledBy="checkoutTitle" onClose={onClose} closeLabel="Close checkout preview">
        <p className="modal-kicker">{checkout.failed ? 'Checkout unavailable' : 'Checkout preview'}</p>
        <h2 id="checkoutTitle">{p.name}</h2>
        <div className="modal-price">${p.price} one time</div>
        {checkout.failed ? (
          <p>
            <strong>We couldn't reach checkout just now. Nothing was charged — please try again in a moment.</strong>
          </p>
        ) : (
          <>
            <p>
              <strong>Demo checkout — this is a design prototype. No payment is collected.</strong>
            </p>
            <div className="modal-note">
              To go live, connect this button to Stripe Checkout. The server creates the Checkout Session and controls
              the real Price ID; secret keys and trusted prices never live in the browser.
            </div>
          </>
        )}
      </Dialog>

      <Dialog ref={policyRef} labelledBy="policyTitle" onClose={onClose} closeLabel="Close policy note" className="policy-modal">
        <p className="modal-kicker">Launch requirement</p>
        <h2 id="policyTitle">{policy} pending</h2>
        <p>
          {policy} language must be supplied and approved by the owner before launch. This prototype does not invent
          policy terms.
        </p>
      </Dialog>
    </DialogContext.Provider>
  )
}

function Dialog({ ref, labelledBy, onClose, closeLabel, className, children }) {
  const close = () => ref.current.close()
  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
    >
      <div className="modal-inner">
        <button type="button" className="modal-close" aria-label={closeLabel} onClick={close}>
          ×
        </button>
        {children}
        <div className="modal-actions">
          <button type="button" className="cta-secondary modal-done" onClick={close}>
            Got it
          </button>
        </div>
      </div>
    </dialog>
  )
}

export function BuyButton({ product = 'mochiOS', variant = 'primary', label, section }) {
  const { buy } = useContext(DialogContext)
  const [busy, setBusy] = useState(false)
  const p = PRODUCTS[product]
  return (
    <button
      type="button"
      className={`${VARIANT_CLASS[variant]} buy-btn`}
      data-product={product}
      aria-busy={busy || undefined}
      onClick={async () => {
        setBusy(true)
        await buy(product, section)
        setBusy(false)
      }}
    >
      {label ?? `Get ${p.name} — $${p.price}`}
    </button>
  )
}

export function PolicyButton({ name }) {
  const { openPolicy } = useContext(DialogContext)
  return (
    <button type="button" onClick={() => openPolicy(name)}>
      {name}
    </button>
  )
}
