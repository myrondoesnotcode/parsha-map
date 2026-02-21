import { useCallback } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { useParshaText } from '../../hooks/useParshaText'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { flattenSefariaText } from '../../api/sefaria'
import { highlightPlaceNames } from '../../utils/textUtils'

export function ParshaTextViewer() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setHighlightedPlace = useAppStore((s) => s.setHighlightedPlace)
  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null
  const { data, isLoading, isError } = useParshaText(parsha?.seferiaUrl ?? null)
  const places = useParshaPlaces(selectedParshaId)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      const placeId = target.dataset?.placeId
      if (placeId) {
        setHighlightedPlace(placeId)
      }
    },
    [setHighlightedPlace]
  )

  if (!parsha) {
    return (
      <div className="flex-1 flex items-center justify-center text-stone-300 text-sm p-4">
        <div className="text-center">
          <div className="text-4xl mb-3">📖</div>
          <p>Select a Parsha from the dropdown above</p>
          <p className="mt-1 text-xs text-stone-300">to read the text and see its places on the map</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-3 bg-stone-100 rounded animate-pulse"
            style={{ width: `${70 + Math.random() * 30}%` }}
          />
        ))}
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-sm text-red-500">
        Failed to load text. Check your connection.
      </div>
    )
  }

  const englishVerses = flattenSefariaText(data.text)
  const hebrewVerses = flattenSefariaText(data.he)

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
      {/* Hebrew text block */}
      {hebrewVerses.length > 0 && (
        <div dir="rtl" className="font-hebrew text-right space-y-1 pb-3 border-b border-stone-100">
          {hebrewVerses.slice(0, 20).map((verse, i) => (
            <p key={i} className="text-sm text-stone-700 leading-relaxed">
              <span className="text-stone-400 text-xs ml-1">{i + 1}</span>{' '}
              <span dangerouslySetInnerHTML={{ __html: verse }} />
            </p>
          ))}
          {hebrewVerses.length > 20 && (
            <p className="text-xs text-stone-400 text-center pt-1">
              Showing first 20 verses
            </p>
          )}
        </div>
      )}

      {/* English text block with place highlighting */}
      {englishVerses.length > 0 && (
        <div className="space-y-1" onClick={handleClick}>
          {englishVerses.slice(0, 20).map((verse, i) => (
            <p key={i} className="text-sm text-stone-700 leading-relaxed">
              <span className="text-stone-400 text-xs mr-1">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: highlightPlaceNames(verse, places) }} />
            </p>
          ))}
          {englishVerses.length > 20 && (
            <p className="text-xs text-stone-400 text-center pt-2">
              Showing first 20 verses of {englishVerses.length} total
            </p>
          )}
        </div>
      )}

      <p className="text-xs text-stone-300 text-center pt-2 border-t border-stone-50">
        Text provided by{' '}
        <a
          href="https://www.sefaria.org"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-stone-500"
        >
          Sefaria
        </a>
      </p>
    </div>
  )
}
