import type { Era } from '../../types/timeline'

interface Props {
  era: Era
}

export function HistoricalEventsTicker({ era }: Props) {
  if (!era.events || era.events.length === 0) return null

  const sorted = [...era.events].sort((a, b) => b.yearBCE - a.yearBCE)

  return (
    <div className="bg-surface-container rounded px-4 py-3">
      <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
        Historical Events
      </p>
      <div className="space-y-2">
        {sorted.map((event, i) => (
          <div key={i} className="flex gap-3 text-xs">
            <span className="flex-shrink-0 w-16 text-right font-label text-primary font-medium">
              {event.yearBCE} BCE
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-body text-on-surface leading-snug">{event.description}</p>
              {event.significance && (
                <p className="font-body text-on-surface-variant text-[11px] mt-0.5 leading-snug">
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
