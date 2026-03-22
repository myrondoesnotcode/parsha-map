import { Info } from 'lucide-react'

export function HistoricalNote() {
  return (
    <div className="flex gap-2 px-3 py-2.5 bg-tertiary-container rounded">
      <Info size={14} className="text-on-tertiary-container shrink-0 mt-0.5" />
      <p className="font-body text-xs text-on-tertiary-container leading-relaxed">
        Dates shown represent traditional and broadly accepted scholarly estimates.
        Ancient chronology involves uncertainty; ranges reflect the span of current
        scholarly opinion.
      </p>
    </div>
  )
}
