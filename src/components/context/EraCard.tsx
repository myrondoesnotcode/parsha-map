import type { Era } from '../../types/timeline'
import { formatYearBCE } from '../../utils/yearUtils'

interface Props {
  era: Era
}

export function EraCard({ era }: Props) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100"
      style={{ borderTopColor: era.color, borderTopWidth: 4 }}
    >
      <div className="px-4 py-3" style={{ backgroundColor: `${era.color}18` }}>
        <h3 className="font-semibold text-stone-900 text-sm">{era.name}</h3>
        <p className="text-xs text-stone-500 mt-0.5">
          {formatYearBCE(era.startBCE)} – {formatYearBCE(era.endBCE)}
        </p>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-xs text-stone-600 leading-relaxed">{era.shortDesc}</p>
        <div className="pt-1 border-t border-stone-100">
          <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-1">
            Biblical Context
          </p>
          <p className="text-xs text-stone-600">{era.biblicalContext}</p>
        </div>
      </div>
    </div>
  )
}
