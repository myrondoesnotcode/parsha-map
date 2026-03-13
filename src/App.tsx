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
  Mail,
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

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)

  const [mobileTab, setMobileTab] = useState<MobileTab>('map')
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
          DESKTOP  (md +)  — permanent three-column layout
          ══════════════════════════════════════════════════════ */}
      <div className="hidden md:flex md:flex-col h-full">

        {/* ── Header ── */}
        <header className="shrink-0 z-[1100] h-11 flex items-center gap-1 px-3
          bg-stone-900/95 backdrop-blur-sm border-b border-stone-800/60">

          <LogoLockup />

          <div className="w-px h-5 bg-stone-700 mx-2" />

          {/* Parsha name pill */}
          {parsha && (
            <span className="text-xs text-amber-400/80 truncate max-w-[200px]">
              {parsha.hebrewName}
            </span>
          )}

          <div className="flex-1" />

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

        {/* ── Three columns ── */}
        <div className="flex-1 flex min-h-0">

          {/* Left: Sidebar */}
          <div className="w-72 h-full shrink-0 border-r border-stone-200 bg-white overflow-y-auto">
            <Sidebar />
          </div>

          {/* Center: Map + Timeline */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 relative min-h-0">
              <ParshaMap />
            </div>
            <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-stone-200/70 px-5 py-2.5 h-[72px]">
              <TimelineSlider />
            </div>
          </div>

          {/* Right: ContextPanel */}
          <div className="w-80 h-full shrink-0 border-l border-stone-200 bg-white overflow-y-auto">
            <ContextPanel />
          </div>
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
