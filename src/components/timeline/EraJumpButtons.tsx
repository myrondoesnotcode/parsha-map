import timeline from '../../data/timeline.json'
import type { Era } from '../../types/timeline'
import { useAppStore } from '../../store/useAppStore'
import { useEraContext } from '../../hooks/useEraContext'
import { SLIDER_MIN, SLIDER_MAX } from '../../utils/yearUtils'

const eras = timeline as Era[]
const totalSpan = SLIDER_MAX - SLIDER_MIN

export function EraJumpButtons() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const setCurrentYear = useAppStore((s) => s.setCurrentYear)
  const { era: currentEra } = useEraContext(currentYearBCE)

  return (
    <div className="flex w-full gap-px">
      {eras.map((era) => {
        const eraSpan = era.startBCE - era.endBCE
        const widthPct = (eraSpan / totalSpan) * 100
        const isActive = currentEra?.id === era.id
        const midpoint = Math.round((era.startBCE + era.endBCE) / 2)
        // First word of era name as label
        const shortLabel = era.name.split(' ')[0]

        return (
          <button
            key={era.id}
            onClick={() => setCurrentYear(midpoint)}
            title={`${era.name} — click to jump to ${midpoint} BCE`}
            style={{
              width: `${widthPct}%`,
              backgroundColor: era.color,
              opacity: isActive ? 1 : 0.4,
            }}
            className="h-5 text-[9px] text-white font-medium overflow-hidden truncate px-0.5
              hover:opacity-80 transition-opacity rounded"
          >
            {shortLabel}
          </button>
        )
      })}
    </div>
  )
}
