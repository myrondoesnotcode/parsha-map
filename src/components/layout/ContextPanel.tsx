import { useAppStore } from '../../store/useAppStore'
import { useEraContext } from '../../hooks/useEraContext'
import { EraCard } from '../context/EraCard'
import { MaterialCultureCard } from '../context/MaterialCultureCard'
import { HistoricalNote } from '../context/HistoricalNote'
import { HistoricalEventsTicker } from '../context/HistoricalEventsTicker'
import { WorldContextCard } from '../context/WorldContextCard'
import { PrimarySourcesCard } from '../context/PrimarySourcesCard'
import { ArtifactsCard } from '../context/ArtifactsCard'
import { PowerDetailPanel } from '../context/PowerDetailPanel'
import { PlaceDetailPanel } from '../map/PlaceDetailPanel'
import { formatYearBCE } from '../../utils/yearUtils'

export function ContextPanel() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const { era, cultureEntry } = useEraContext(currentYearBCE)

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 py-3 border-b border-stone-100 bg-gradient-to-b from-stone-50 to-white shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-stone-800">Historical Context</h2>
          <span className="text-[11px] font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
            {formatYearBCE(currentYearBCE)}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        {era ? (
          <>
            <EraCard era={era} />
            {cultureEntry && <MaterialCultureCard entry={cultureEntry} era={era} />}
            <HistoricalEventsTicker era={era} />
            <WorldContextCard era={era} />
            <PrimarySourcesCard era={era} />
            <ArtifactsCard era={era} />
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
