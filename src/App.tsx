import { Sidebar } from './components/layout/Sidebar'
import { ContextPanel } from './components/layout/ContextPanel'
import { ParshaMap } from './components/map/ParshaMap'
import { TimelineSlider } from './components/timeline/TimelineSlider'
import { useAppStore } from './store/useAppStore'
import { useAutoSelectParsha } from './hooks/useAutoSelectParsha'

export default function App() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  useAutoSelectParsha()

  return (
    <div className="flex flex-col h-screen bg-stone-50 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 bg-stone-900 text-stone-100 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-wide">Parsha Map</span>
          <span className="text-stone-400 text-sm hidden sm:inline">
            Historical Context &amp; Ancient Near East
          </span>
        </div>
        {selectedParshaId && (
          <span className="text-xs text-stone-400">
            Scroll the timeline to explore eras
          </span>
        )}
      </header>

      {/* Main 3-column layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left sidebar: parsha selector + text */}
        <aside className="w-72 shrink-0 flex flex-col border-r border-stone-200 bg-white overflow-hidden">
          <Sidebar />
        </aside>

        {/* Center: map + timeline */}
        <main className="flex flex-col flex-1 min-w-0">
          {/* Map takes most space */}
          <div className="flex-1 relative min-h-0">
            <ParshaMap />
          </div>
          {/* Timeline slider at bottom */}
          <div className="shrink-0 border-t border-stone-200 bg-white px-4 py-3">
            <TimelineSlider />
          </div>
        </main>

        {/* Right panel: era context */}
        <aside className="w-80 shrink-0 flex flex-col border-l border-stone-200 bg-white overflow-hidden">
          <ContextPanel />
        </aside>
      </div>
    </div>
  )
}
