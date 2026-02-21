import type { Era } from '../../types/timeline'

interface Props {
  era: Era
}

export function HistoricalEventsTicker({ era }: Props) {
  if (!era.events || era.events.length === 0) return null

  const sorted = [...era.events].sort((a, b) => b.yearBCE - a.yearBCE)

  return (
    <div className="px-4 py-3 border-t border-stone-100">
      <p className="text-[10px] uppercase font-medium text-stone-400 tracking-wide mb-2">
        Historical Events
      </p>
      <div className="space-y-2">
        {sorted.map((event, i) => (
          <div key={i} className="flex gap-3 text-xs">
            <span className="flex-shrink-0 w-16 text-right font-mono text-amber-600 font-medium">
              {event.yearBCE} BCE
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-stone-700 leading-snug">{event.description}</p>
              {event.significance && (
                <p className="text-stone-400 text-[11px] mt-0.5 leading-snug">
                  {event.significance}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
