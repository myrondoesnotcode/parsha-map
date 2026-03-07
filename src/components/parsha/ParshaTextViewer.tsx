import { useCallback, useState, useEffect, useRef } from 'react'
import { ScrollText, ChevronDown, BookOpen } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { useParshaText } from '../../hooks/useParshaText'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { useCommentaryText } from '../../hooks/useCommentaryText'
import { flattenSefariaText } from '../../api/sefaria'
import { highlightPlaceNames } from '../../utils/textUtils'

const COMMENTATORS = ['Rashi', 'Ramban', 'Ibn Ezra', 'Sforno'] as const
type Commentator = (typeof COMMENTATORS)[number]

const PAGE_SIZE = 20

export function ParshaTextViewer() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setHighlightedPlace = useAppStore((s) => s.setHighlightedPlace)
  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null
  const { data, isLoading, isError } = useParshaText(parsha?.seferiaUrl ?? null)
  const places = useParshaPlaces(selectedParshaId)

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [showHebrew, setShowHebrew] = useState(true)
  const [commentaryOpen, setCommentaryOpen] = useState(false)
  const [selectedCommentator, setSelectedCommentator] = useState<Commentator>('Rashi')
  const [commentatorMenuOpen, setCommentatorMenuOpen] = useState(false)
  const [commentaryLimit, setCommentaryLimit] = useState(40)
  const commentaryRef = useRef<HTMLDivElement>(null)

  // Reset pagination when parsha changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
    setCommentaryLimit(40)
  }, [selectedParshaId])

  const { data: commentaryData, isLoading: commentaryLoading } = useCommentaryText(
    parsha?.seferiaUrl ?? null,
    selectedCommentator,
    commentaryOpen
  )

  // Flatten English and Hebrew commentary arrays and pair non-empty entries
  const commentaryPairs = (() => {
    if (!commentaryData) return []
    const enFlat = flattenSefariaText(commentaryData.text)
    const heFlat = flattenSefariaText(commentaryData.he)
    const pairs: { en: string; he: string }[] = []
    const maxLen = Math.max(enFlat.length, heFlat.length)
    for (let i = 0; i < maxLen; i++) {
      const en = (enFlat[i] ?? '').replace(/<[^>]+>/g, '').trim()
      const he = (heFlat[i] ?? '').replace(/<[^>]+>/g, '').trim()
      if (en || he) pairs.push({ en, he })
    }
    return pairs
  })()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement
      const placeId = target.dataset?.placeId
      if (placeId) setHighlightedPlace(placeId)
    },
    [setHighlightedPlace]
  )

  if (!parsha) {
    return (
      <div className="flex-1 flex items-center justify-center text-stone-300 text-sm p-4">
        <div className="text-center">
          <div className="text-4xl mb-3">📖</div>
          <p>Select a Torah portion to read</p>
          <p className="mt-1 text-xs text-stone-300">Places mentioned in the text will light up on the map</p>
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
            style={{ width: `${70 + (i * 7) % 30}%` }}
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
  const totalVerses = Math.max(englishVerses.length, hebrewVerses.length)
  const hasMore = visibleCount < totalVerses

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {/* Controls bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-stone-100 px-4 py-2 flex items-center justify-between gap-2">
        {/* Hebrew toggle */}
        <button
          onClick={() => setShowHebrew((v) => !v)}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors ${
            showHebrew
              ? 'bg-stone-800 text-stone-100'
              : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
          }`}
        >
          <BookOpen size={12} />
          <span className="font-hebrew">עב</span>
          Hebrew
        </button>

        <div className="flex items-center gap-2">
          {commentaryOpen && (
            <div className="relative">
              <button
                onClick={() => setCommentatorMenuOpen((v) => !v)}
                className="flex items-center gap-1 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded transition-colors"
              >
                {selectedCommentator}
                <ChevronDown size={11} />
              </button>
              {commentatorMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded shadow-md z-20 py-1 min-w-[100px]">
                  {COMMENTATORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCommentator(c)
                        setCommentatorMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-50 transition-colors ${
                        c === selectedCommentator ? 'text-amber-700 font-medium' : 'text-stone-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => {
              const opening = !commentaryOpen
              setCommentaryOpen(opening)
              if (opening) setTimeout(() => commentaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
            }}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors ${
              commentaryOpen
                ? 'bg-amber-600 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <ScrollText size={12} />
            Commentary
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Interleaved verse list: Hebrew + English together per verse */}
        <div className="space-y-3" onClick={handleClick}>
          {Array.from({ length: Math.min(visibleCount, totalVerses) }, (_, i) => {
            const he = hebrewVerses[i] ?? ''
            const en = englishVerses[i] ?? ''
            return (
              <div key={i} className="space-y-0.5">
                <span className="text-[10px] text-stone-300 font-mono select-none">{i + 1}</span>
                {showHebrew && he && (
                  <p
                    dir="rtl"
                    className="font-hebrew text-right text-sm text-stone-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: he }}
                  />
                )}
                {en && (
                  <p
                    className="text-sm text-stone-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightPlaceNames(en, places) }}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Load more controls */}
        {hasMore && (
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => setVisibleCount((n) => Math.min(n + PAGE_SIZE, totalVerses))}
              className="flex-1 text-xs text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 py-2 rounded transition-colors font-medium"
            >
              Show next {Math.min(PAGE_SIZE, totalVerses - visibleCount)} verses
              <span className="text-stone-400 font-normal ml-1">
                ({visibleCount} of {totalVerses})
              </span>
            </button>
            <button
              onClick={() => setVisibleCount(totalVerses)}
              className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
            >
              Show all
            </button>
          </div>
        )}

        {!hasMore && totalVerses > PAGE_SIZE && (
          <p className="text-xs text-stone-300 text-center pt-1">
            All {totalVerses} verses shown
          </p>
        )}

        {/* Commentary section */}
        {commentaryOpen && (
          <div ref={commentaryRef} className="border-t border-amber-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText size={13} className="text-amber-600" />
              <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                {selectedCommentator} on {parsha.name}
              </h3>
            </div>

            {commentaryLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-2.5 w-12 bg-amber-100 rounded animate-pulse" />
                    <div className="h-3 bg-stone-100 rounded animate-pulse" style={{ width: '90%' }} />
                    <div className="h-3 bg-stone-100 rounded animate-pulse" style={{ width: '75%' }} />
                  </div>
                ))}
              </div>
            ) : commentaryPairs.length === 0 ? (
              <p className="text-xs text-stone-400 italic">
                No {selectedCommentator} commentary available for this portion.
              </p>
            ) : (
              <div className="space-y-5">
                {commentaryPairs.slice(0, commentaryLimit).map(({ en, he }, i) => (
                  <div key={i} className="space-y-1.5">
                    <span className="inline-block font-mono text-amber-600 font-medium text-[10px]">
                      {i + 1}
                    </span>
                    {he && (
                      <p
                        dir="rtl"
                        className="font-hebrew text-right text-sm text-stone-700 leading-relaxed"
                      >
                        {he}
                      </p>
                    )}
                    {en && (
                      <p className="text-xs text-stone-600 leading-relaxed">{en}</p>
                    )}
                  </div>
                ))}
                {commentaryPairs.length > commentaryLimit && (
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setCommentaryLimit((n) => n + 40)}
                      className="flex-1 text-xs text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 py-2 rounded transition-colors font-medium"
                    >
                      Show {Math.min(40, commentaryPairs.length - commentaryLimit)} more comments
                      <span className="text-stone-400 font-normal ml-1">
                        ({commentaryLimit} of {commentaryPairs.length})
                      </span>
                    </button>
                    <button
                      onClick={() => setCommentaryLimit(commentaryPairs.length)}
                      className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
                    >
                      Show all
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-stone-300 text-center pt-2 border-t border-stone-50">
          Text and commentary provided by{' '}
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
    </div>
  )
}
