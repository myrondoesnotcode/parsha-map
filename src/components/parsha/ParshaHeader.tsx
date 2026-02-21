import { BookOpen } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { formatYearBCE } from '../../utils/yearUtils'
import { useCurrentParsha } from '../../hooks/useCurrentParsha'
import parshaList from '../../data/parshaList.json'
import type { ParshaListItem } from '../../types/parsha'

const parshas = parshaList as ParshaListItem[]

export function ParshaHeader() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const { data: currentParsha } = useCurrentParsha()

  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  // Find the current week's parsha in our list by matching name
  const currentWeekParsha = currentParsha
    ? parshas.find(
        (p) =>
          p.name.toLowerCase().replace(/[^a-z]/g, '') ===
          currentParsha.displayValue.en.toLowerCase().replace(/[^a-z]/g, '')
      )
    : null

  if (!parsha) {
    return (
      <div className="p-4 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-400 text-sm">
          <BookOpen size={16} />
          <span>Select a Parsha to begin</span>
        </div>
        {currentWeekParsha && (
          <p className="mt-2 text-xs text-stone-400">
            This week:{' '}
            <span className="font-medium text-amber-700">{currentWeekParsha.name}</span>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 border-b border-stone-100 bg-amber-50">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="font-semibold text-stone-900 text-base leading-tight">
            {parsha.name}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">{parsha.book}</p>
        </div>
        <span className="font-hebrew text-lg text-stone-700 leading-tight shrink-0">
          {parsha.hebrewName}
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
        <span>Parasha #{parsha.number}</span>
        {parsha.approximateDateBCE.start && (
          <span>
            {formatYearBCE(parsha.approximateDateBCE.start)}
            {parsha.approximateDateBCE.end &&
              parsha.approximateDateBCE.end !== parsha.approximateDateBCE.start
              ? ` – ${formatYearBCE(parsha.approximateDateBCE.end)}`
              : ''}
          </span>
        )}
        {currentWeekParsha?.id === parsha.id && (
          <span className="text-amber-600 font-medium">This week's Parsha</span>
        )}
      </div>
    </div>
  )
}
