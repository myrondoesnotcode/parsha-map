import { useState, useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { ParshaMap } from './components/map/ParshaMap'
import { TimelineSlider } from './components/timeline/TimelineSlider'
import { TutorialOverlay } from './components/TutorialOverlay'
import { NewsletterModal } from './components/NewsletterModal'
import { ParshaLibrary } from './components/parsha/ParshaLibrary'
import { ParshaLoadingScreen } from './components/parsha/ParshaLoadingScreen'
import { useAppStore } from './store/useAppStore'
import { useAutoSelectParsha } from './hooks/useAutoSelectParsha'
import { useCurrentParsha } from './hooks/useCurrentParsha'
import { useAutoSelectParshaByYear } from './hooks/useAutoSelectParshaByYear'
import { getParshaById } from './utils/parshaUtils'
import { useTranslation } from './i18n/useTranslation'
import {
  Map,
  BookOpen,
  Globe,
  HelpCircle,
  Mail,
  Library,
  CalendarSearch,
} from 'lucide-react'

// Inline X (Twitter) logo SVG
function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

type MobileTab = 'map' | 'text' | 'context' | 'library'

const TUTORIAL_KEY = 'parshamap_tutorial_seen_v1'

// ─── Logo ──────────────────────────────────────────────────────────────────────

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <svg width="16" height="20" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#6c2f00"
        />
        <circle cx="10" cy="10" r="3.5" fill="#fcf9f0" />
      </svg>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-hebrew font-medium text-on-surface text-lg tracking-wide">Parsha</span>
        <span className="font-label text-primary text-[10px] tracking-widest uppercase">Map</span>
      </span>
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const setParshaInitialized = useAppStore((s) => s.setParshaInitialized)
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)
  const t = useTranslation()

  const [mobileTab, setMobileTab] = useState<MobileTab>('text')

  // On mobile: auto-switch to context tab when a place is selected from the map
  useEffect(() => {
    if (selectedPlacePanel) setMobileTab('context')
  }, [selectedPlacePanel])
  const [showTutorial, setShowTutorial] = useState(false)
  const [newsletterOpen, setNewsletterOpen] = useState(false)
  const [showLibrary, setShowLibrary] = useState(false)

  // On load: read ?parsha= from URL and select it (mark initialized so auto-select doesn't override)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const parshaId = params.get('parsha')
    if (parshaId) {
      setSelectedParsha(parshaId)
      setParshaInitialized()
    }
  }, [setSelectedParsha, setParshaInitialized])

  // Browser back/forward navigation
  useEffect(() => {
    const handlePop = () => {
      const params = new URLSearchParams(window.location.search)
      const parshaId = params.get('parsha')
      if (parshaId) setSelectedParsha(parshaId)
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [setSelectedParsha])

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

  const { isLoading: parshaLoading } = useCurrentParsha()
  const showParshaLoading = mobileTab === 'text' && parshaLoading && !selectedParshaId

  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  function reopenTutorial() {
    localStorage.removeItem(TUTORIAL_KEY)
    setShowTutorial((v) => !v)
  }

  return (
    <div className="h-[100dvh] overflow-hidden bg-surface">
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
        <header className="shrink-0 z-[1100] h-11 flex items-center gap-1 px-3 bg-surface-container-low">

          <LogoLockup />

          <div className="w-px h-5 bg-outline-variant mx-2" />

          {/* Parsha name pill */}
          {parsha && (
            <span className="font-label text-xs text-primary truncate max-w-[200px]">
              {parsha.hebrewName}
            </span>
          )}

          <div className="flex-1" />

          {/* Library */}
          <button
            onClick={() => setShowLibrary((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-label text-xs font-medium transition-all ${
              showLibrary
                ? 'text-primary bg-surface-container'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
            title={t.library.title}
          >
            <Library size={13} />
            <span className="hidden lg:inline">{t.header.library}</span>
          </button>

          {/* Date Lookup */}
          <a
            href="/parsha-lookup.html"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-label text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
            title="What was your Bar/Bat Mitzvah parsha?"
          >
            <CalendarSearch size={13} />
            <span className="hidden lg:inline">Date Lookup</span>
          </a>

          {/* Subscribe */}
          <button
            onClick={() => setNewsletterOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded font-label text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
            title="Get weekly parsha by email"
          >
            <Mail size={13} />
            <span className="hidden lg:inline">{t.header.subscribe}</span>
          </button>

          <div className="w-px h-5 bg-outline-variant mx-1" />

          {/* X / Twitter */}
          <a
            href="https://x.com/Mshneider"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            title="@Mshneider on X"
          >
            <XLogo size={14} />
          </a>

          {/* Help */}
          <button
            onClick={reopenTutorial}
            className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
            title={t.header.showTutorial}
          >
            <HelpCircle size={15} />
          </button>
        </header>

        {/* ── Three columns ── */}
        <div className="flex-1 flex min-h-0">

          {/* Left: Sidebar or Library */}
          <div className="w-72 h-full shrink-0 bg-surface-container-low overflow-y-auto">
            {showLibrary ? (
              <ParshaLibrary onSelect={() => setShowLibrary(false)} />
            ) : (
              <Sidebar />
            )}
          </div>

          {/* Center: Map + Timeline */}
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 relative min-h-0">
              <ParshaMap />
            </div>
            <div className="shrink-0 bg-surface px-5 py-2.5 h-[72px]">
              <TimelineSlider />
            </div>
          </div>

          {/* Right: ContextPanel */}
          <div className="w-80 h-full shrink-0 bg-surface-container overflow-y-auto">
            <ContextPanel />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE  (< md)  — header + tabs + slim timeline
          ══════════════════════════════════════════════════════ */}
      <div className="flex md:hidden flex-col h-full">

        {/* Mobile header */}
        <header className="shrink-0 h-11 flex items-center justify-between px-4 bg-surface-container-low">
          <LogoLockup />
          <div className="flex items-center gap-2">
            {parsha && (
              <span className="font-label text-xs text-primary truncate max-w-[100px]">
                {parsha.name}
              </span>
            )}
            <a
              href="/parsha-lookup.html"
              className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
              title="Date Lookup"
            >
              <CalendarSearch size={15} />
            </a>
            <button
              onClick={() => setNewsletterOpen(true)}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
              title="Subscribe"
            >
              <Mail size={15} />
            </button>
            <a
              href="https://x.com/Mshneider"
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
              title="@Mshneider on X"
            >
              <XLogo size={14} />
            </a>
            <button
              onClick={reopenTutorial}
              className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
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
            <div className="shrink-0 bg-surface px-4 py-2.5">
              <TimelineSlider />
            </div>
          </div>

          {/* Text tab */}
          <div className={`absolute inset-0 overflow-y-auto bg-surface-container-low ${mobileTab === 'text' ? '' : 'hidden'}`}>
            {showParshaLoading ? <ParshaLoadingScreen /> : <Sidebar />}
          </div>

          {/* History tab */}
          <div className={`absolute inset-0 bg-surface-container ${mobileTab === 'context' ? '' : 'hidden'}`}>
            <ContextPanel />
          </div>

          {/* Library tab */}
          <div className={`absolute inset-0 ${mobileTab === 'library' ? '' : 'hidden'}`}>
            <ParshaLibrary onSelect={() => setMobileTab('map')} />
          </div>
        </div>

        {/* Bottom tab bar */}
        <nav className="shrink-0 flex h-16 bg-surface-container-low">
          {(
            [
              { id: 'map' as MobileTab, label: t.tabs.map, Icon: Map },
              { id: 'text' as MobileTab, label: t.tabs.text, Icon: BookOpen },
              { id: 'context' as MobileTab, label: t.tabs.history, Icon: Globe },
              { id: 'library' as MobileTab, label: t.tabs.library, Icon: Library },
            ]
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setMobileTab(id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors ${
                mobileTab === id ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              {mobileTab === id && (
                <span className="absolute top-0 left-4 right-4 h-0.5 bg-primary" />
              )}
              <Icon
                size={22}
                strokeWidth={mobileTab === id ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-label font-semibold tracking-widest uppercase ${mobileTab === id ? 'text-primary' : 'text-on-surface-variant'}`}>
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
