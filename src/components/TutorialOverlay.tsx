import { useState, useEffect, useCallback } from 'react'
import { X, ChevronRight, ChevronLeft, Map, BookOpen, Clock, Navigation, Layers, Pickaxe } from 'lucide-react'

const STORAGE_KEY = 'parshamap_tutorial_seen_v1'

// ─── Step definitions ──────────────────────────────────────────────────────────

interface Spotlight {
  /** percent of viewport width */
  x: number
  /** percent of viewport height */
  y: number
  rx?: string
  ry?: string
}

interface CardPos {
  left?: string
  right?: string
  top?: string
  bottom?: string
  transform?: string
}

interface Step {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  tip?: string
  /** Where to put the glowing spotlight (desktop) */
  spotlight?: Spotlight
  /** Spotlight override for mobile */
  spotlightMobile?: Spotlight
  /** Where to position the card on desktop */
  cardPos?: CardPos
  /** Card position override for mobile */
  cardPosMobile?: CardPos
}

const CENTER: CardPos = { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }

const STEPS: Step[] = [
  /* 0 — Welcome */
  {
    id: 'welcome',
    title: 'Welcome to Parsha Map',
    description:
      'Explore the Torah through geography. Pick a weekly Torah portion and every biblical place mentioned in it appears as a pin on the map — then travel through thousands of years of history with the timeline below.',
    icon: (
      <svg width="40" height="48" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#F59E0B"
        />
        <circle cx="10" cy="10" r="3.5" fill="#1C1917" />
      </svg>
    ),
    cardPos: CENTER,
    cardPosMobile: CENTER,
  },

  /* 1 — Parsha selector (LEFT sidebar on desktop, "Text" tab on mobile) */
  {
    id: 'parsha',
    title: 'Pick a Torah Portion',
    description:
      'The panel on the left is where you choose which Torah portion to explore. Search by name or browse all 54 portions grouped by book. As soon as you select one, the map fills in with every biblical place it mentions.',
    icon: <BookOpen size={36} className="text-amber-500" />,
    tip: 'On mobile, tap the "Text" tab at the bottom to open this panel.',
    spotlight: { x: 9, y: 46, rx: '200px', ry: '340px' },
    spotlightMobile: { x: 33, y: 94, rx: '70px', ry: '44px' },
    // card sits in the right half of the map so it doesn't cover the sidebar
    cardPos: { left: '42%', top: '50%', transform: 'translateY(-50%)' },
    cardPosMobile: CENTER,
  },

  /* 2 — Map (CENTER) */
  {
    id: 'map',
    title: 'The Map',
    description:
      'Pins appear right here in the center for every biblical location mentioned in the selected portion. Amber pins are high-confidence identifications; gray ones are uncertain. Click any pin to read its description and the exact verses that mention it.',
    icon: <Map size={36} className="text-amber-500" />,
    tip: 'Clicking a pin opens a detail panel with Wikipedia summaries and links to other portions that mention the same place.',
    spotlight: { x: 48, y: 44, rx: '340px', ry: '280px' },
    spotlightMobile: { x: 50, y: 44, rx: '260px', ry: '240px' },
    // card goes to bottom-left corner so it doesn't cover the map center
    cardPos: { left: '22%', bottom: '100px' },
    cardPosMobile: { left: '8px', bottom: '90px' },
  },

  /* 3 — Timeline (BOTTOM of map area) */
  {
    id: 'timeline',
    title: 'The Timeline',
    description:
      'The strip at the very bottom of the map is a timeline spanning from the Chalcolithic period to the Biblical age. Drag the slider left or right to change the year — the territory boundaries, ancient powers, and archaeological layers on the map all update in real time.',
    icon: <Clock size={36} className="text-amber-500" />,
    tip: 'Use the era jump buttons to leap between major periods (Bronze Age, Iron Age, etc.) in one click.',
    spotlight: { x: 48, y: 91, rx: '460px', ry: '56px' },
    spotlightMobile: { x: 50, y: 87, rx: '320px', ry: '52px' },
    // card goes near the top so it doesn't cover the timeline
    cardPos: { left: '42%', top: '80px' },
    cardPosMobile: { left: '50%', top: '80px', transform: 'translateX(-50%)' },
  },

  /* 4 — Map controls (TOP-RIGHT corner of the map) */
  {
    id: 'layers',
    title: 'Map Layers & Controls',
    description:
      'The buttons stacked in the top-right corner of the map let you toggle different overlays on and off: ancient trade routes (Via Maris, King\'s Highway), territory boundaries of kingdoms, place-name labels, archaeological dig sites, and satellite imagery.',
    icon: (
      <div className="flex gap-3 items-center justify-center">
        <Navigation size={28} className="text-amber-500" />
        <Layers size={28} className="text-amber-500" />
        <Pickaxe size={28} className="text-purple-500" />
      </div>
    ),
    tip: 'Purple diamond markers are real excavation sites — they appear and disappear as you move the timeline to match the current era.',
    spotlight: { x: 79, y: 20, rx: '120px', ry: '200px' },
    spotlightMobile: { x: 86, y: 20, rx: '80px', ry: '160px' },
    // card goes to the center-left so it doesn't cover the controls in the top-right
    cardPos: { left: '22%', top: '50%', transform: 'translateY(-50%)' },
    cardPosMobile: { left: '8px', top: '50%', transform: 'translateY(-50%)' },
  },

  /* 5 — Context panel (RIGHT side on desktop, "History" tab on mobile) */
  {
    id: 'context',
    title: 'Historical Context',
    description:
      'The panel on the right gives you rich context for whatever era the timeline is set to: the ruling powers of the time, material culture, primary sources, museum artifacts, and major world events — all tied to the current year.',
    icon: <Clock size={36} className="text-amber-500" />,
    tip: 'On mobile, tap the "History" tab at the bottom. Context updates automatically as you move the timeline.',
    spotlight: { x: 89, y: 44, rx: '200px', ry: '340px' },
    spotlightMobile: { x: 83, y: 94, rx: '70px', ry: '44px' },
    // card goes to the center of the map area (left of the right panel)
    cardPos: { left: '22%', top: '50%', transform: 'translateY(-50%)' },
    cardPosMobile: CENTER,
  },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

interface Props {
  forceOpen?: boolean
  onDismiss?: () => void
}

function StepDots({ current, total, onJump }: { current: number; total: number; onJump: (i: number) => void }) {
  return (
    <div className="flex gap-1.5 items-center justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          className={`h-2 rounded-full transition-all duration-200 ${
            i === current ? 'bg-amber-500 w-4' : 'w-2 bg-stone-300 hover:bg-stone-400'
          }`}
          aria-label={`Go to step ${i + 1}`}
        />
      ))}
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export function TutorialOverlay({ forceOpen = false, onDismiss }: Props) {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)
  const [mobile, setMobile] = useState(false)

  // Detect mobile breakpoint
  useEffect(() => {
    function check() { setMobile(window.innerWidth < 768) }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (forceOpen) {
      setStep(0)
      setVisible(true)
    } else {
      const seen = localStorage.getItem(STORAGE_KEY)
      if (!seen) setVisible(true)
    }
  }, [forceOpen])

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
    onDismiss?.()
  }, [onDismiss])

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
    else dismiss()
  }

  function prev() {
    setStep((s) => Math.max(0, s - 1))
  }

  if (!visible) return null

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const spot = mobile ? (current.spotlightMobile ?? current.spotlight) : current.spotlight
  const cardPos = (mobile ? (current.cardPosMobile ?? current.cardPos) : current.cardPos) ?? CENTER

  // Backdrop gradient — lighter "hole" at the spotlight location
  const backdropStyle: React.CSSProperties = spot
    ? {
        background: `radial-gradient(ellipse ${spot.rx ?? '260px'} ${spot.ry ?? '220px'} at ${spot.x}% ${spot.y}%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 65%)`,
      }
    : { background: 'rgba(0,0,0,0.52)' }

  return (
    <>
      {/* Backdrop with spotlight */}
      <div
        className="fixed inset-0 z-[2000] transition-all duration-500 backdrop-blur-[2px]"
        style={backdropStyle}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Pulsing spotlight ring (desktop only when spotlight defined) */}
      {spot && (
        <div
          className="fixed z-[2001] pointer-events-none rounded-[40%] tutorial-ring"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            width: spot.rx ?? '260px',
            height: spot.ry ?? '220px',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Card */}
      <div
        className="fixed z-[2002] pointer-events-none"
        style={{ ...cardPos, maxWidth: '380px', width: 'calc(100vw - 24px)' }}
      >
        <div
          className="pointer-events-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Amber accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />

          {/* Header row */}
          <div className="flex items-center justify-between px-5 pt-4 pb-0">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
              {step + 1} / {STEPS.length}
            </span>
            <button
              onClick={dismiss}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
              aria-label="Close tutorial"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="flex justify-center mb-4">{current.icon}</div>
            <h2 className="text-xl font-semibold text-stone-800 text-center mb-2">{current.title}</h2>
            <p className="text-stone-500 text-sm leading-relaxed text-center">{current.description}</p>

            {current.tip && (
              <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex gap-2 items-start">
                <span className="text-amber-500 text-[10px] font-bold uppercase tracking-wide shrink-0 mt-0.5">
                  Tip
                </span>
                <p className="text-amber-800 text-xs leading-relaxed">{current.tip}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 flex flex-col gap-3">
            <StepDots current={step} total={STEPS.length} onJump={setStep} />

            <div className="flex gap-2">
              {step > 0 && (
                <button
                  onClick={prev}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              )}
              <button
                onClick={next}
                className={`flex items-center justify-center gap-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  step === 0 ? 'flex-1' : 'flex-[2]'
                } bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-sm hover:shadow`}
              >
                {isLast ? 'Get started' : <>Next <ChevronRight size={16} /></>}
              </button>
            </div>

            <button
              onClick={dismiss}
              className="text-center text-xs text-stone-400 hover:text-stone-600 transition-colors py-1"
            >
              Skip tutorial
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
