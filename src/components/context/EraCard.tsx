import type { Era } from '../../types/timeline'
import { formatYearBCE } from '../../utils/yearUtils'

interface Props {
  era: Era
}

export function EraCard({ era }: Props) {
  return (
    <div
      className="rounded overflow-hidden shadow-ambient"
      style={{ borderTopColor: era.color, borderTopWidth: 3 }}
    >
      <div className="px-4 py-3" style={{ backgroundColor: `${era.color}18` }}>
        <h3 className="font-headline font-semibold text-on-surface text-sm">{era.name}</h3>
        <p className="font-label text-xs text-on-surface-variant mt-0.5">
          {formatYearBCE(era.startBCE)} – {formatYearBCE(era.endBCE)}
        </p>
      </div>
      <div className="px-4 py-3 space-y-2 bg-surface-container">
        <p className="font-body text-xs text-on-surface-variant leading-relaxed">{era.shortDesc}</p>
        <div className="pt-2">
          <p className="font-label text-[10px] font-medium text-on-surface-variant uppercase tracking-widest mb-1">
            Biblical Context
          </p>
          <p className="font-body text-xs text-on-surface-variant">{era.biblicalContext}</p>
        </div>
      </div>
    </div>
  )
}
