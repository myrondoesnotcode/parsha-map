import { useAppStore } from '../../store/useAppStore'
import { useEraContext } from '../../hooks/useEraContext'
import { useTranslation } from '../../i18n/useTranslation'
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
  const t = useTranslation()

  return (
    <div className="flex flex-col h-full relative">
      <div className="px-4 py-3 bg-surface-container-low shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-sm font-semibold text-on-surface">{t.context.title}</h2>
          <span className="font-label text-[11px] font-medium text-primary bg-secondary-container px-2 py-0.5 rounded-full">
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
          <div className="flex items-center justify-center h-32 text-on-surface-variant font-label text-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">🏺</div>
              <p>{t.context.selectParsha}</p>
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
