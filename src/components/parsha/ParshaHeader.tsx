import { BookOpen, ExternalLink } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { formatYearBCE } from '../../utils/yearUtils'
import { useCurrentParsha } from '../../hooks/useCurrentParsha'
import parshaList from '../../data/parshaList.json'
import type { ParshaListItem } from '../../types/parsha'

const parshas = parshaList as ParshaListItem[]

function ParshaImage({ url, caption, name }: { url: string; caption?: string; name: string }) {
  return (
    <div className="mt-3 -mx-4 relative">
      <img
        src={url}
        alt={caption ?? `${name} illustration`}
        className="w-full object-cover max-h-52"
        onError={(e) => {
          (e.currentTarget.parentElement as HTMLElement).style.display = 'none'
        }}
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-2.5">
          <p className="text-[10px] text-white/90 italic leading-snug">{caption}</p>
        </div>
      )}
    </div>
  )
}

export function ParshaHeader() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const { data: currentParsha } = useCurrentParsha()

  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  const currentWeekParsha = currentParsha
    ? parshas.find(
        (p) =>
          p.name.toLowerCase().replace(/[^a-z]/g, '') ===
          currentParsha.displayValue.en.toLowerCase().replace(/[^a-z]/g, '')
      )
    : null

  if (!parsha) {
    return (
      <div className="p-4 border-b border-stone-100 shrink-0">
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
    <div className="border-b border-stone-100 bg-gradient-to-b from-amber-50 to-white shrink-0">
      <div className="p-4 pb-3">
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
          <span>Portion {parsha.number} of {parshas.length}</span>
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
            <span className="text-amber-600 font-medium">This week's portion</span>
          )}
        </div>

        {parsha.summary && (
          <p className="mt-2 text-xs text-stone-500 leading-relaxed">
            {parsha.summary}
          </p>
        )}
      </div>

      {parsha.doreImageUrl && (
        <ParshaImage
          url={parsha.doreImageUrl}
          caption={parsha.doreImageCaption}
          name={parsha.name}
        />
      )}

      {parsha.commentaryUrl && (
        <div className="px-4 py-2.5">
          <a
            href={parsha.commentaryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium"
          >
            Read commentary by Michael Eisenberg
            <ExternalLink size={10} />
          </a>
        </div>
      )}
    </div>
  )
}
