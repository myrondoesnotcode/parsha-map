import { useState, useEffect } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { ParshaMap } from './components/map/ParshaMap'
import { TimelineSlider } from './components/timeline/TimelineSlider'
import { useAppStore } from './store/useAppStore'
import { useAutoSelectParsha } from './hooks/useAutoSelectParsha'
import { useAutoSelectParshaByYear } from './hooks/useAutoSelectParshaByYear'
import { Map, BookOpen, Clock } from 'lucide-react'

type MobileTab = 'map' | 'text' | 'context'

function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Amber map-pin SVG */}
      <svg width="18" height="22" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#F59E0B"
        />
        <circle cx="10" cy="10" r="3.5" fill="#1C1917" />
      </svg>
      {/* "Parsha" in Frank Ruhl Libre serif, "Map" in Inter */}
      <span className="leading-none flex items-baseline gap-1.5">
        <span className="font-hebrew font-medium text-stone-100 text-xl tracking-wide">Parsha</span>
        <span className="font-sans font-light text-amber-400 text-xs tracking-widest uppercase">Map</span>
      </span>
    </div>
  )
}

export default function App() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)
  const [mobileTab, setMobileTab] = useState<MobileTab>('map')

  useAutoSelectParsha()
  useAutoSelectParshaByYear()

  // Auto-switch to History tab when a map pin is tapped on mobile
  useEffect(() => {
    if (selectedPlacePanel) setMobileTab('context')
  }, [selectedPlacePanel])

  return (
    <div className="flex flex-col h-[100dvh] bg-stone-50 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-stone-900 text-stone-100 shrink-0">
        <div className="flex items-center gap-3">
          <LogoLockup />
          <span className="text-stone-400 text-sm hidden sm:inline">
            Biblical geography &amp; historical context
          </span>
        </div>
        {selectedParshaId && (
          <span className="text-xs text-stone-400 hidden sm:inline">
            Drag the timeline to change the historical era
          </span>
        )}
      </header>

      {/* ── DESKTOP layout (md+): 3 columns side by side ── */}
      <div className="hidden md:flex flex-1 min-h-0">
        {/* Left sidebar */}
        <aside className="w-72 shrink-0 flex flex-col border-r border-stone-200 bg-white overflow-hidden shadow-sm">
          <Sidebar />
        </aside>

        {/* Center: map + timeline */}
        <main className="flex flex-col flex-1 min-w-0">
          <div className="flex-1 relative min-h-0">
            <ParshaMap />
          </div>
          <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-2">
            <TimelineSlider compact />
          </div>
        </main>

        {/* Right context panel */}
        <aside className="w-80 shrink-0 flex flex-col border-l border-stone-200 bg-white overflow-hidden shadow-sm">
          <ContextPanel />
        </aside>
      </div>

      {/* ── MOBILE layout (<md): tab-switched single pane ── */}
      <div className="flex md:hidden flex-1 min-h-0 flex-col">
        {/* Tab content */}
        <div className="flex-1 min-h-0 relative overflow-hidden">
          {/* Map tab */}
          <div className={`absolute inset-0 flex flex-col ${mobileTab === 'map' ? '' : 'hidden'}`}>
            <div className="flex-1 relative min-h-0">
              <ParshaMap />
            </div>
            {/* Compact timeline at bottom of map tab */}
            <div className="shrink-0 border-t border-stone-200 bg-white px-3 py-2">
              <TimelineSlider compact />
            </div>
          </div>

          {/* Text tab */}
          <div className={`absolute inset-0 bg-white ${mobileTab === 'text' ? '' : 'hidden'}`}>
            <Sidebar />
          </div>

          {/* Context tab */}
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
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                mobileTab === id
                  ? 'text-amber-600 border-t-2 border-amber-500 -mt-px'
                  : 'text-stone-400 border-t-2 border-transparent -mt-px'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
