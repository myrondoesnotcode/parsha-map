import { useState, useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { ParshaMap } from './components/map/ParshaMap'
import { TimelineSlider } from './components/timeline/TimelineSlider'
import { TutorialOverlay } from './components/TutorialOverlay'
import { NewsletterModal } from './components/NewsletterModal'
import { useAppStore } from './store/useAppStore'
import { useAutoSelectParsha } from './hooks/useAutoSelectParsha'
import { useAutoSelectParshaByYear } from './hooks/useAutoSelectParshaByYear'
import { getParshaById } from './utils/parshaUtils'
import {
  Map,
  BookOpen,
  Globe,
  HelpCircle,
  X,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

// Inline X (Twitter) logo SVG
function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

type MobileTab = 'map' | 'text' | 'context'

const TUTORIAL_KEY = 'parshamap_tutorial_seen_v1'

// ─── Logo ──────────────────────────────────────────────────────────────────────

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <svg width="16" height="20" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#F59E0B"
        />
        <circle cx="10" cy="10" r="3.5" fill="#1C1917" />
      </svg>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-hebrew font-medium text-stone-100 text-lg tracking-wide">Parsha</span>
        <span className="font-sans font-light text-amber-400 text-[10px] tracking-widest uppercase">Map</span>
      </span>
    </div>
  )
}

// ─── Panel wrapper with close button ──────────────────────────────────────────

function PanelShell({
  open,
  side,
  onClose,
  children,
}: {
  open: boolean
  side: 'left' | 'right'
  onClose: () => void
  children: React.ReactNode
}) {
  const translate = open
    ? 'translate-x-0'
    : side === 'left'
    ? '-translate-x-full'
    : 'translate-x-full'

  return (
    <div
      className={`absolute top-11 ${side}-0 bottom-[72px] z-[1000] w-[340px] max-w-[calc(100vw-48px)]
        bg-white shadow-2xl flex flex-col
        transition-transform duration-300 ease-in-out ${translate}`}
    >
      {/* Close tab on the exposed edge */}
      <button
        onClick={onClose}
        className={`absolute top-4 ${side === 'left' ? '-right-9' : '-left-9'} z-10
          w-9 h-9 flex items-center justify-center
          bg-white border border-stone-200 shadow-md
          ${side === 'left' ? 'rounded-r-xl' : 'rounded-l-xl'}
          text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors`}
        aria-label="Close panel"
      >
        <X size={14} />
      </button>
      {children}
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)

  const [mobileTab, setMobileTab] = useState<MobileTab>('map')
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [newsletterOpen, setNewsletterOpen] = useState(false)

  // Auto-show newsletter popup after 50s, once per 30 days
  useEffect(() => {
    const NEWSLETTER_KEY = 'newsletter-last-shown'
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
    const lastShown = localStorage.getItem(NEWSLETTER_KEY)
    if (lastShown && Date.now() - Number(lastShown) < THIRTY_DAYS) return
    const timer = setTimeout(() => {
      setNewsletterOpen(true)
      localStorage.setItem(NEWSLETTER_KEY, String(Date.now()))
    }, 50_000)
    return () => clearTimeout(timer)
  }, [])

  useAutoSelectParsha()
  useAutoSelectParshaByYear()

  // When a place panel opens, jump to the context tab on mobile
  useEffect(() => {
    if (selectedPlacePanel) setMobileTab('context')
  }, [selectedPlacePanel])

  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  function reopenTutorial() {
    localStorage.removeItem(TUTORIAL_KEY)
    setShowTutorial((v) => !v)
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-stone-900">
      <TutorialOverlay
        key={showTutorial ? 'open' : 'auto'}
        forceOpen={showTutorial}
        onDismiss={() => setShowTutorial(false)}
      />
      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />

      {/* ══════════════════════════════════════════════════════
          DESKTOP  (md +)  — map fills full screen, panels overlay
          ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block h-full relative">

        {/* Map — base layer, true full-screen */}
        <div className="absolute inset-0">
          <ParshaMap />
        </div>

        {/* ── Floating header ── */}
        <header className="absolute top-0 inset-x-0 z-[1100] h-11 flex items-center gap-1 px-3
          bg-stone-900/95 backdrop-blur-sm border-b border-stone-800/60">

          <LogoLockup />

          <div className="w-px h-5 bg-stone-700 mx-2" />

          {/* Text / Parsha panel toggle */}
          <button
            onClick={() => setLeftOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              leftOpen
                ? 'bg-stone-700 text-stone-100'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <BookOpen size={13} />
            <span className="hidden lg:inline">
              {parsha ? parsha.name : 'Torah Text'}
            </span>
            <span className="lg:hidden">Text</span>
            {leftOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>

          {/* Parsha name pill (when selected, visible at all widths) */}
          {parsha && !leftOpen && (
            <span className="hidden xl:inline text-xs text-amber-400/80 truncate max-w-[200px]">
              {parsha.hebrewName}
            </span>
          )}

          <div className="flex-1" />

          {/* History panel toggle */}
          <button
            onClick={() => setRightOpen((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              rightOpen
                ? 'bg-stone-700 text-stone-100'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            <Globe size={13} />
            <span>History</span>
            {rightOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>

          {/* Subscribe */}
          <button
            onClick={() => setNewsletterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-all"
            title="Get weekly parsha by email"
          >
            <Mail size={13} />
            <span className="hidden lg:inline">Subscribe</span>
          </button>

          <div className="w-px h-5 bg-stone-700 mx-1" />

          {/* X / Twitter */}
          <a
            href="https://x.com/Mshneider"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="@Mshneider on X"
          >
            <XLogo size={14} />
          </a>

          {/* Help */}
          <button
            onClick={reopenTutorial}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            title="Show tutorial"
          >
            <HelpCircle size={15} />
          </button>
        </header>

        {/* ── Slide-in panels ── */}
        <PanelShell open={leftOpen} side="left" onClose={() => setLeftOpen(false)}>
          <Sidebar />
        </PanelShell>

        <PanelShell open={rightOpen} side="right" onClose={() => setRightOpen(false)}>
          <ContextPanel />
        </PanelShell>

        {/* ── Floating timeline bar ── */}
        <div className="absolute bottom-0 inset-x-0 z-[900] bg-white/95 backdrop-blur-md
          border-t border-stone-200/70 px-5 py-2.5 h-[72px]">
          <TimelineSlider />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE  (< md)  — header + tabs + slim timeline
          ══════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col h-full">

        {/* Mobile header */}
        <header className="shrink-0 h-11 flex items-center justify-between px-4
          bg-stone-900 border-b border-stone-800/60">
          <LogoLockup />
          <div className="flex items-center gap-2">
            {parsha && (
              <span className="text-xs text-amber-400/80 font-medium truncate max-w-[100px]">
                {parsha.name}
              </span>
            )}
            <button
              onClick={() => setNewsletterOpen(true)}
              className="p-1 rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
              title="Subscribe"
            >
              <Mail size={15} />
            </button>
            <a
              href="https://x.com/Mshneider"
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
              title="@Mshneider on X"
            >
              <XLogo size={14} />
            </a>
            <button
              onClick={reopenTutorial}
              className="p-1 rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
            >
              <HelpCircle size={15} />
            </button>
          </div>
        </header>

        {/* Tab content */}
        <div className="flex-1 min-h-0 relative overflow-hidden">

          {/* Map tab */}
          <div className={`absolute inset-0 flex flex-col ${mobileTab === 'map' ? '' : 'hidden'}`}>
            <div className="flex-1 relative min-h-0">
              <ParshaMap />
            </div>
            {/* Slim timeline strip above tab bar */}
            <div className="shrink-0 bg-white border-t border-stone-200 px-4 py-2.5">
              <TimelineSlider />
            </div>
          </div>

          {/* Text tab */}
          <div className={`absolute inset-0 bg-white ${mobileTab === 'text' ? '' : 'hidden'}`}>
            <Sidebar />
          </div>

          {/* History tab */}
          <div className={`absolute inset-0 bg-white ${mobileTab === 'context' ? '' : 'hidden'}`}>
            <ContextPanel />
          </div>
        </div>

        {/* Bottom tab bar */}
        <nav className="shrink-0 flex h-16 border-t border-stone-200 bg-white">
          {(
            [
              { id: 'map' as MobileTab, label: 'Map', Icon: Map },
              { id: 'text' as MobileTab, label: 'Torah', Icon: BookOpen },
              { id: 'context' as MobileTab, label: 'World', Icon: Globe },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setMobileTab(id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors ${
                mobileTab === id ? 'text-amber-600' : 'text-stone-400'
              }`}
            >
              {mobileTab === id && (
                <span className="absolute top-0 left-4 right-4 h-0.5 rounded-full bg-amber-500" />
              )}
              <Icon
                size={22}
                strokeWidth={mobileTab === id ? 2.5 : 1.8}
              />
              <span className={`text-[11px] font-semibold tracking-wide ${mobileTab === id ? 'text-amber-600' : 'text-stone-400'}`}>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
