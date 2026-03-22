import { Globe } from 'lucide-react'
import type { Era } from '../../types/timeline'

interface Props {
  era: Era
}

export function WorldContextCard({ era }: Props) {
  if (!era.worldEvents || era.worldEvents.length === 0) return null

  return (
    <div className="rounded overflow-hidden shadow-ambient">
      <div className="px-4 py-3 bg-surface-container-high flex items-center gap-2">
        <Globe size={13} className="text-on-surface-variant" />
        <h3 className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
          Meanwhile, Elsewhere in the World
        </h3>
      </div>
      <div className="bg-surface-container">
        {era.worldEvents.map((event, i) => (
          <div key={i} className="px-4 py-2.5">
            <span className="font-label inline-block text-[10px] font-medium text-primary uppercase tracking-widest mb-0.5">
              {event.region}
            </span>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
