import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Map, BookOpen, Clock, Navigation, Layers, Pickaxe } from 'lucide-react'

const STORAGE_KEY = 'parshamap_tutorial_seen_v1'

interface TutorialStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  tip?: string
}

const STEPS: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Parsha Map',
    description:
      'Explore the Torah portion geographically — see biblical places on an interactive map, travel through history with the timeline, and discover the archaeological and historical context of each story.',
    icon: (
      <svg width="40" height="48" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#F59E0B"
        />
        <circle cx="10" cy="10" r="3.5" fill="#1C1917" />
      </svg>
    ),
  },
  {
    id: 'parsha',
    title: 'Choose a Torah Portion',
    description:
      'Use the left sidebar to search and select any of the 54 weekly Torah portions (Parshiyot). The map instantly updates to show all biblical places mentioned in that portion.',
    icon: <BookOpen size={36} className="text-amber-500" />,
    tip: 'Try searching "Bereishit" or "Lech Lecha" — or browse by book.',
  },
  {
    id: 'map',
    title: 'Interactive Map',
    description:
      'Pins mark every biblical location in the selected portion. Click any pin to see its name, description, and the verses that mention it. Amber pins = high-confidence locations; gray = uncertain.',
    icon: <Map size={36} className="text-amber-500" />,
    tip: 'Click a pin to open a detail panel with Wikipedia summaries and cross-parsha links.',
  },
  {
    id: 'timeline',
    title: 'Travel Through History',
    description:
      'The timeline at the bottom spans from the Chalcolithic period through the Biblical age. Drag the slider to change the year — territories, powers, and archaeological layers all update dynamically.',
    icon: <Clock size={36} className="text-amber-500" />,
    tip: 'Use the era jump buttons to leap between major historical periods instantly.',
  },
  {
    id: 'layers',
    title: 'Map Layers & Controls',
    description:
      "Toggle overlays from the controls on the map's top-right corner: ancient trade routes (Via Maris, King's Highway), territory boundaries, place-name labels, archaeological sites, and satellite imagery.",
    icon: (
      <div className="flex gap-3 items-center justify-center">
        <Navigation size={28} className="text-amber-500" />
        <Layers size={28} className="text-amber-500" />
        <Pickaxe size={28} className="text-purple-500" />
      </div>
    ),
    tip: 'Purple diamond markers show real excavation sites that match the selected era.',
  },
  {
    id: 'context',
    title: 'Historical Context Panel',
    description:
      'The right panel shows rich historical context for the current era: ruling powers, material culture, primary sources, museum artifacts, and world events happening at the same time.',
    icon: <Clock size={36} className="text-amber-500" />,
    tip: 'Context updates automatically as you move the timeline slider.',
  },
]

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

export function TutorialOverlay({ forceOpen = false, onDismiss }: Props) {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (forceOpen) {
      setStep(0)
      setVisible(true)
    } else {
      const seen = localStorage.getItem(STORAGE_KEY)
      if (!seen) setVisible(true)
    }
  }, [forceOpen])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
    onDismiss?.()
  }

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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[2000] transition-opacity duration-300"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[2001] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Amber accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400" />

          {/* Header row */}
          <div className="flex items-center justify-between px-5 pt-4 pb-0">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
              Step {step + 1} of {STEPS.length}
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
