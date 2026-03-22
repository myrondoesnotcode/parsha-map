import timeline from '../../data/timeline.json'
import type { Era } from '../../types/timeline'

const eras = timeline as Era[]
const TOTAL_SPAN = 4500 - 400 // 4100 years

export function TimelineTrack() {
  return (
    <div className="relative h-2 rounded-full overflow-hidden bg-surface-container-high">
      {eras.map((era) => {
        const leftPct = ((4500 - era.startBCE) / TOTAL_SPAN) * 100
        const widthPct = ((era.startBCE - era.endBCE) / TOTAL_SPAN) * 100
        return (
          <div
            key={era.id}
            className="absolute top-0 h-full opacity-80"
            style={{
              left: `${leftPct}%`,
              width: `${widthPct}%`,
              backgroundColor: era.color,
            }}
            title={`${era.name}: ${era.startBCE}–${era.endBCE} BCE`}
          />
        )
      })}
    </div>
  )
}
