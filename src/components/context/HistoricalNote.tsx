import { Info } from 'lucide-react'

export function HistoricalNote() {
  return (
    <div className="flex gap-2 px-3 py-2.5 bg-blue-50 rounded-lg border border-blue-100">
      <Info size={14} className="text-blue-400 shrink-0 mt-0.5" />
      <p className="text-xs text-blue-700 leading-relaxed">
        Dates shown represent traditional and broadly accepted scholarly estimates.
        Ancient chronology involves uncertainty; ranges reflect the span of current
        scholarly opinion.
      </p>
    </div>
  )
}
