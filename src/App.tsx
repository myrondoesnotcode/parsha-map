import { useState, useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { ParshaMap } from './components/map/ParshaMap'
import { TimelineSlider } from './components/timeline/TimelineSlider'
import { TutorialOverlay } from './components/TutorialOverlay'
import { useAppStore } from './store/useAppStore'
import { useAutoSelectParsha } from './hooks/useAutoSelectParsha'
import { useAutoSelectParshaByYear } from './hooks/useAutoSelectParshaByYear'
import { Map, BookOpen, Clock, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, HelpCircle } from 'lucide-react'

type MobileTab = 'map' | 'text' | 'context'

const TUTORIAL_KEY = 'parshamap_tutorial_seen_v1'

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="18" height="22" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#F59E0B"
        />
        <circle cx="10" cy="10" r="3.5" fill="#1C1917" />
      </svg>
      <span className="leading-none flex items-baseline gap-1.5">
        <span className="font-hebrew font-medium text-stone-100 text-xl tracking-wide">Parsha</span>
        <span className="font-sans font-light text-amber-400 text-xs tracking-widest uppercase">Map</span>
      </span>
    </div>
  )
}

export default function App() {
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)
  const [mobileTab, setMobileTab] = useState<MobileTab>('map')
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)
  const [showTutorial, setShowTutorial] = useState(false)

  useAutoSelectParsha()
  useAutoSelectParshaByYear()

  useEffect(() => {
    if (selectedPlacePanel) setMobileTab('context')
  }, [selectedPlacePanel])

  function reopenTutorial() {
    localStorage.removeItem(TUTORIAL_KEY)
    setShowTutorial((v) => !v)
    // Force remount by toggling — TutorialOverlay reads localStorage on mount
    // Instead, we'll just set a key to force re-render
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-stone-100 overflow-hidden">
      {/* Tutorial overlay — renders on first visit */}
      <TutorialOverlay key={showTutorial ? 'force-open' : 'normal'} forceOpen={showTutorial} onDismiss={() => setShowTutorial(false)} />

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 py-0 bg-stone-900 text-stone-100 shrink-0 border-b border-stone-800 h-11">
        {/* Left: logo + subtitle */}
        <div className="flex items-center gap-3">
          <LogoLockup />
          <span className="text-stone-500 text-xs hidden sm:inline select-none">|</span>
          <span className="text-stone-400 text-xs hidden sm:inline select-none">
            Biblical geography &amp; historical context
          </span>
        </div>

        {/* Right: help button */}
        <button
          onClick={reopenTutorial}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors text-xs"
          title="Show tutorial"
        >
          <HelpCircle size={14} />
          <span className="hidden sm:inline">Help</span>
        </button>
      </header>

      {/* ── DESKTOP layout (md+) ── */}
      <div className="hidden md:flex flex-1 min-h-0">
        {/* Left sidebar — collapsible */}
        <div
          className={`shrink-0 flex flex-col border-r border-stone-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ease-in-out ${
            leftOpen ? 'w-72' : 'w-0'
          }`}
        >
          {leftOpen && <Sidebar />}
        </div>

        {/* Center: map + timeline */}
        <main className="flex flex-col flex-1 min-w-0 relative">
          {/* Collapse toggles — float over map edges */}
          <button
            onClick={() => setLeftOpen((v) => !v)}
            className="absolute left-2 top-2 z-[1000] p-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-sm text-stone-500 hover:text-stone-800 hover:bg-white transition-colors"
            title={leftOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {leftOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
          </button>
          <button
            onClick={() => setRightOpen((v) => !v)}
            className="absolute right-2 top-2 z-[1000] p-1.5 rounded-lg bg-white/90 backdrop-blur-sm border border-stone-200/80 shadow-sm text-stone-500 hover:text-stone-800 hover:bg-white transition-colors"
            title={rightOpen ? 'Collapse context panel' : 'Expand context panel'}
          >
            {rightOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
          </button>

          <div className="flex-1 relative min-h-0">
            <ParshaMap />
          </div>
          <div className="shrink-0 border-t border-stone-200 bg-gradient-to-b from-white to-stone-50 px-4 py-2.5">
            <TimelineSlider compact />
          </div>
        </main>

        {/* Right context panel — collapsible */}
        <div
          className={`shrink-0 flex flex-col border-l border-stone-200 bg-white overflow-hidden shadow-sm transition-all duration-300 ease-in-out ${
            rightOpen ? 'w-80' : 'w-0'
          }`}
        >
          {rightOpen && <ContextPanel />}
        </div>
      </div>

      {/* ── MOBILE layout (<md) ── */}
      <div className="flex md:hidden flex-1 min-h-0 flex-col">
        <div className="flex-1 min-h-0 relative overflow-hidden">
          <div className={`absolute inset-0 flex flex-col ${mobileTab === 'map' ? '' : 'hidden'}`}>
            <div className="flex-1 relative min-h-0">
              <ParshaMap />
            </div>
            <div className="shrink-0 border-t border-stone-200 bg-gradient-to-b from-white to-stone-50 px-3 py-2.5">
              <TimelineSlider compact />
            </div>
          </div>

          <div className={`absolute inset-0 bg-white ${mobileTab === 'text' ? '' : 'hidden'}`}>
            <Sidebar />
          </div>

          <div className={`absolute inset-0 bg-white ${mobileTab === 'context' ? '' : 'hidden'}`}>
            <ContextPanel />
          </div>
        </div>

        {/* Bottom tab bar */}
        <nav className="shrink-0 flex border-t border-stone-200 bg-white shadow-[0_-1px_6px_rgba(0,0,0,0.06)]">
          {([
            { id: 'map' as MobileTab, label: 'Map', Icon: Map },
            { id: 'text' as MobileTab, label: 'Text', Icon: BookOpen },
            { id: 'context' as MobileTab, label: 'History', Icon: Clock },
          ] as const).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setMobileTab(id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-3 text-[11px] font-medium transition-colors ${
                mobileTab === id
                  ? 'text-amber-600 border-t-2 border-amber-500 -mt-px'
                  : 'text-stone-400 border-t-2 border-transparent -mt-px'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
