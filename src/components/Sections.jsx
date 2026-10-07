import { useState } from 'react'
import Art from './Art.jsx'
import { BuyButton } from './Checkout.jsx'

function Micro() {
  return <p className="micro">One-time payment · No subscription</p>
}

export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy reveal">
          <div className="eyebrow">🐼 MOCHI OS · by Mochi</div>
          <h1>A simple operating system for money, AI, and habits.</h1>
          <p className="sub">
            Mochi OS organizes the useful parts of the internet — the workflows, the checklists, the “where do I even
            start” — into one beginner-friendly system you'll actually open.
          </p>
          <div className="price-row">
            <span className="price">$49 one time</span>
            <span className="dot" />
            <span className="no-sub">No subscription · Digital access after checkout launches</span>
          </div>
          <div className="hero-actions">
            <BuyButton section="hero" />
            <a className="text-link" href="#inside">
              See what's inside ↓
            </a>
          </div>
          <Micro />
        </div>
        <div className="hero-art reveal">
          <Art
            name="hero-mochi"
            width={2048}
            height={1152}
            priority
            alt="Mochi, a panda in black-rimmed glasses, working at a cozy desk with a laptop and notebook"
          />
          <div className="product-float" aria-label="Mochi OS digital playbook preview">
            <div className="top">
              <strong>Mochi OS</strong>
              <span className="chip">Digital playbook</span>
            </div>
            <div className="fake-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PROBLEMS = [
  'AI advice, scattered everywhere',
  'Money, explained like a textbook',
  'Habit advice that becomes another chore',
  '200 saved posts. Zero system.',
]

export function Recognition() {
  return (
    <section className="section alt" aria-labelledby="problem-title">
      <div className="shell recognition">
        <div className="problem-art reveal">
          <Art
            name="problem-mochi"
            width={1920}
            height={1280}
            alt="Mochi surrounded by too many browser tabs, notes, and bits of advice"
          />
          <div className="speech">I read all of it so you don't have to. (It took a while. I needed snacks.)</div>
        </div>
        <div className="reveal">
          <div className="eyebrow">The internet, currently</div>
          <h2 id="problem-title">400 tools. 900 opinions. Zero idea where to start.</h2>
          <div className="problem-list">
            {PROBLEMS.map((text, i) => (
              <div className="problem-card" data-num={String(i + 1).padStart(2, '0')} key={text}>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Provisional — owner to confirm or replace before launch.
const MODULES = [
  ['Start Here: The 7-Day Setup', 'The exact first-week sequence, about 20 minutes a day, so you never stare at a blank page.'],
  ['The Money Map', 'Spending snapshot, autopilot savings setup, and the “extra cash” decision tree. Educational, not financial advice.'],
  ['The AI Toolkit', '40+ copy-paste workflows for everyday tasks, written for free AI tools, with zero jargon.'],
  ['The Habits Engine', 'A 5-minute daily check-in, a 20-minute weekly review, and a restart-without-guilt protocol.'],
  ['The Prompt Library', '60+ ready-to-use prompts across money, AI, and habits. Adapt them once; reuse them whenever.'],
  ['Templates & Trackers', 'Weekly planner, money snapshot, habit tracker, and workflow cards — printable and fillable.'],
]

export function PackageModules() {
  return (
    <section className="section" id="inside" aria-labelledby="inside-title">
      <div className="shell">
        <div className="section-head center reveal">
          <div className="eyebrow">
            A practical package <span className="provisional">Provisional contents</span>
          </div>
          <h2 id="inside-title">Here's what's in the box.</h2>
          <p className="kicker">
            Built for doing, not binge-watching. Start with the setup, borrow a workflow, then come back when life gets
            messy again.
          </p>
          <div className="format-strip">
            <span>Illustrated digital playbook (PDF)</span>
            <span>60+ prompt library</span>
            <span>Printable trackers</span>
            <span>Digital delivery when live</span>
          </div>
        </div>
        <div className="modules">
          {MODULES.map(([title, body], i) => (
            <article className="module reveal" key={title}>
              <div className="module-num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="contents-cta reveal">
          <p className="note">Not a 40-hour course. Something you open every day.</p>
          <BuyButton section="inside" />
          <Micro />
        </div>
      </div>
    </section>
  )
}

export function BeforeAfter() {
  return (
    <section className="section alt" aria-labelledby="outcome-title">
      <div className="shell">
        <div className="section-head center reveal">
          <div className="eyebrow">The practical change</div>
          <h2 id="outcome-title">Less tab-hoarding. More actually-doing.</h2>
        </div>
        <div className="transformation reveal">
          <div className="side before">
            <div className="label">Before</div>
            <ul className="clean-list">
              <li>Saved posts you'll never reopen</li>
              <li>Scattered tools</li>
              <li>47 open tabs</li>
              <li>No idea where to begin</li>
            </ul>
          </div>
          <div className="arrow" aria-hidden="true">
            →
          </div>
          <div className="side after">
            <div className="label">After</div>
            <ul className="clean-list">
              <li>One starting point</li>
              <li>Workflows you reuse</li>
              <li>Clearer priorities</li>
              <li>Something you return to every week</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function PreviewCard({ kind, tag, title, children }) {
  return (
    <article className="preview reveal">
      <div className="preview-top">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>Preview · {kind}</span>
      </div>
      <div className="preview-body">
        <span className="preview-tag">{tag}</span>
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  )
}

const WEEK = [
  ['M', true],
  ['T', true],
  ['W', false],
  ['T', true],
  ['F', true],
  ['S', false],
  ['S', false],
]

export function ProductPreviews() {
  return (
    <section className="section" id="peek" aria-labelledby="peek-title">
      <div className="shell">
        <div className="section-head center reveal">
          <div className="eyebrow">Product evidence</div>
          <h2 id="peek-title">Don't take my word for it. Take the pages'.</h2>
          <p className="kicker">A look at how the system turns ideas into small, usable next steps.</p>
        </div>
        <div className="preview-grid">
          <PreviewCard kind="Playbook" tag="The 7-Day Setup" title="Day 1: The 20-minute money snapshot">
            <p>See what is happening before trying to optimize it. Numbers first; judgment can wait.</p>
            <div className="money-snapshot">
              <div className="snapshot-row">
                <span>Money in</span>
                <b>Write the real number</b>
              </div>
              <div className="snapshot-row">
                <span>Fixed costs</span>
                <b>Circle the automatic</b>
              </div>
              <div className="snapshot-row">
                <span>Flexible spending</span>
                <b>Estimate, then check</b>
              </div>
            </div>
          </PreviewCard>
          <PreviewCard kind="Prompt" tag="AI Toolkit" title="The “smart but busy” prompt">
            <div className="prompt-box">
              Explain this like I'm smart but busy. Start with the one-sentence answer, then give me the three details
              that would change my decision. Skip background I don't need.
              <span className="copy-pill">Copy prompt</span>
            </div>
          </PreviewCard>
          <PreviewCard kind="Tracker" tag="Habits Engine" title="One tiny week, visible.">
            <p>A lightweight check-in — useful enough to return to, small enough not to become its own project.</p>
            <div className="week" aria-label="Example weekly tracker">
              {WEEK.map(([day, done], i) => (
                <div className={`day${done ? ' done' : ''}`} key={i}>
                  {day}
                </div>
              ))}
            </div>
          </PreviewCard>
        </div>
        <p className="caption">Previews of the provisional package — final pages may vary.</p>
      </div>
    </section>
  )
}

export function Qualification() {
  return (
    <section className="section alt" aria-labelledby="for-title">
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow">No universal solutions here</div>
          <h2 id="for-title">Probably for you if…</h2>
        </div>
        <div className="qual-grid">
          <article className="qual-card positive reveal">
            <h3>You want the useful version.</h3>
            <ul className="clean-list">
              <li>You've saved 200 posts and read 3.</li>
              <li>AI feels useful, but you only use it for… that one thing.</li>
              <li>Money advice either scares you or bores you.</li>
              <li>You want systems, not motivation.</li>
            </ul>
          </article>
          <article className="qual-card negative reveal">
            <h3>Probably not for you if…</h3>
            <ul className="clean-list">
              <li>You want someone to promise investment returns.</li>
              <li>You want a 40-hour course.</li>
              <li>You expect AI to do everything for you.</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

export function SystemDiagram() {
  return (
    <section className="section system-section" aria-labelledby="system-title">
      <div className="shell">
        <div className="system-stage reveal">
          <Art
            name="system-diagram-bg"
            width={2048}
            height={1152}
            sizes="(max-width: 1160px) 100vw, 1120px"
            alt="Warm illustrated workspace surrounding an open center for the Mochi OS system diagram"
          />
          <div className="system-copy">
            <h2 id="system-title">Why money, AI, and habits live together.</h2>
            <div className="nodes">
              <div className="node">
                <strong>AI is leverage.</strong>
                <p>It multiplies what you do.</p>
              </div>
              <div className="node">
                <strong>Money is direction.</strong>
                <p>It's what you're steering.</p>
              </div>
              <div className="node">
                <strong>Habits are repetition.</strong>
                <p>They decide whether any of it happens twice.</p>
              </div>
            </div>
            <p className="system-close">Most advice treats them as three separate hobbies. They're one system.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Proof() {
  return (
    <section className="section alt" aria-labelledby="proof-title">
      <div className="shell">
        <div className="section-head center reveal">
          <div className="eyebrow">Transparent by design</div>
          <h2 id="proof-title">Proof, not promises.</h2>
          <p className="kicker">
            There are no testimonials yet. So the evidence is the product itself: organized pages, usable sequences, and
            clear next steps.
          </p>
        </div>
        <div className="proof-grid">
          <article className="proof-card reveal">
            <span className="preview-tag">Example workflow</span>
            <h3>From “I should” to “it's scheduled”</h3>
            <div className="flow">
              {['Capture', 'Choose', 'Schedule', 'Review'].map((step, i) => (
                <FlowStep key={step} step={step} first={i === 0} />
              ))}
            </div>
          </article>
          <article className="proof-card reveal">
            <span className="preview-tag">Example checklist</span>
            <h3>The weekly reset</h3>
            <div className="check-preview">
              <div className="check-line">Check the money snapshot</div>
              <div className="check-line">Reuse one AI workflow</div>
              <div className="check-line">Choose one habit to keep tiny</div>
            </div>
          </article>
          {/* Stays empty until verified buyer proof exists. Never backfill with invented quotes. */}
          <div className="proof-slot reveal">
            <strong>🔒 REAL CUSTOMER PROOF SLOT</strong>
            Real customer proof goes here — this slot stays empty until verified buyers exist.
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowStep({ step, first }) {
  return (
    <>
      {!first && <span className="flow-arrow">→</span>}
      <div className="flow-step">{step}</div>
    </>
  )
}

const FAQS = [
  ['Is this a course?', "No. It's an illustrated playbook plus prompts, trackers, and reusable workflows. There are no hours of video to finish before it becomes useful."],
  ['Do I need to know AI already?', 'No. The system assumes zero prior knowledge and explains how to use each workflow without technical jargon.'],
  ['Do I need paid AI tools?', "No. The workflows are designed around free AI tools. Paid upgrades can be useful, but they aren't required to start."],
  ['Is this financial advice?', 'No. Mochi OS provides educational organization of general money concepts, not personalized investment, tax, or financial advice.'],
  ['Is there a subscription?', 'No. One $49 payment, yours forever. No membership, community fee, continuity billing, or recurring charge.'],
  ['What exactly do I receive?', 'The provisional package includes the illustrated PDF playbook, a 60+ prompt library, printable and fillable trackers, and reusable workflow cards. Final contents will be confirmed before launch.'],
  ['How is it delivered?', "Once checkout is live, you'll receive a download link by email right after a successful purchase."],
  ['What if I only care about one of the three?', 'Each pillar stands alone. Start with the part you need now, then use the others when they become relevant.'],
]

export function Faq() {
  const [open, setOpen] = useState(() => new Set())
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="shell">
        <div className="section-head center reveal">
          <div className="eyebrow">Questions, answered plainly</div>
          <h2 id="faq-title">Before you buy.</h2>
        </div>
        <div className="faq reveal">
          {FAQS.map(([q, a], i) => {
            const isOpen = open.has(i)
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span>{q}</span>
                  <span aria-hidden="true">+</span>
                </button>
                <div className="faq-a" id={`faq-a-${i}`} inert={!isOpen}>
                  <div>
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="faq-cta reveal">
          <BuyButton section="faq" />
          <Micro />
        </div>
      </div>
    </section>
  )
}

export function SecondaryProducts() {
  return (
    <section className="section alt" aria-labelledby="specific-title">
      <div className="shell">
        <div className="section-head reveal">
          <div className="eyebrow">Smaller, standalone tools</div>
          <h2 id="specific-title">Need something more specific?</h2>
          <p className="kicker">
            Two narrower products for one narrower problem. Still one-time purchases. Still no subscription.
          </p>
        </div>
        <div className="mini-grid">
          <article className="mini-product reveal">
            <Art
              name="mochi-small-21"
              width={1600}
              height={1600}
              sizes="180px"
              alt="Mochi marking a small daily win on a 21-day plan"
            />
            <div className="mini-copy">
              <h3>
                Mochi's 21 <span className="price-mini">— $27</span>
              </h3>
              <p>A 21-day starter sprint: one small money, AI, or habit win per day.</p>
              <BuyButton product="mochis21" variant="subordinate" section="secondary" />
            </div>
          </article>
          <article className="mini-product reveal">
            <Art
              name="mochi-small-face"
              width={1600}
              height={1600}
              sizes="180px"
              alt="Mochi comparing consistent character reference images"
            />
            <div className="mini-copy">
              <h3>
                Same Face Every Time <span className="price-mini">— $39</span>
              </h3>
              <p>The character-consistency kit: keep one character looking like itself across every AI image you make.</p>
              <BuyButton product="sameFace" variant="subordinate" section="secondary" />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="section" aria-labelledby="final-title">
      <div className="shell">
        <div className="final-panel reveal">
          <div>
            <div className="eyebrow" style={{ color: '#f6d4bc' }}>
              Mochi OS
            </div>
            <h2 id="final-title">One system. $49 once. Yours.</h2>
            <p>Mochi OS — the beginner-friendly system for money, AI, and habits. One-time payment. No subscription.</p>
            <BuyButton section="final" />
            <Micro />
          </div>
          <div className="final-art">
            <Art name="final-cta-mochi" width={2048} height={1152} alt="Mochi waving beside an organized desk" />
          </div>
        </div>
      </div>
    </section>
  )
}
