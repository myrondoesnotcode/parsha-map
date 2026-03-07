import { Globe } from 'lucide-react'
import type { Era } from '../../types/timeline'

interface Props {
  era: Era
}

export function WorldContextCard({ era }: Props) {
  if (!era.worldEvents || era.worldEvents.length === 0) return null

  return (
    <div className="rounded-xl border border-stone-200 overflow-hidden">
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 flex items-center gap-2">
        <Globe size={13} className="text-stone-500" />
        <h3 className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
          Meanwhile, Elsewhere in the World
        </h3>
      </div>
      <div className="divide-y divide-stone-50">
        {era.worldEvents.map((event, i) => (
          <div key={i} className="px-4 py-2.5">
            <span className="inline-block text-[10px] font-medium text-stone-400 uppercase tracking-wide mb-0.5">
              {event.region}
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
