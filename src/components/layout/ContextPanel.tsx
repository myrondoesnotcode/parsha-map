import { useAppStore } from '../../store/useAppStore'
import { useEraContext } from '../../hooks/useEraContext'
import { EraCard } from '../context/EraCard'
import { MaterialCultureCard } from '../context/MaterialCultureCard'
import { HistoricalNote } from '../context/HistoricalNote'
import { HistoricalEventsTicker } from '../context/HistoricalEventsTicker'
import { PowerDetailPanel } from '../context/PowerDetailPanel'
import { PlaceDetailPanel } from '../map/PlaceDetailPanel'
import { formatYearBCE } from '../../utils/yearUtils'

export function ContextPanel() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const { era, cultureEntry } = useEraContext(currentYearBCE)

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 py-3 border-b border-stone-100 shrink-0">
        <h2 className="text-sm font-semibold text-stone-700">Historical Context</h2>
        <p className="text-xs text-stone-400 mt-0.5">{formatYearBCE(currentYearBCE)}</p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {era ? (
          <>
            <EraCard era={era} />
            {cultureEntry && <MaterialCultureCard entry={cultureEntry} />}
            <HistoricalEventsTicker era={era} />
          </>
        ) : (
          <div className="flex items-center justify-center h-32 text-stone-300 text-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">🏺</div>
              <p>Select a Parsha to see its historical context</p>
            </div>
          </div>
        )}

        <HistoricalNote />
      </div>

      {/* Slide-in overlays */}
      <PowerDetailPanel />
      <PlaceDetailPanel />
    </div>
  )
}
