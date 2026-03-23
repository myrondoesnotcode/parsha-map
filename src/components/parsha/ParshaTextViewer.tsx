import { useCallback, useState, useEffect, useRef } from 'react'
import { ScrollText, ChevronDown } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { useParshaText } from '../../hooks/useParshaText'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { useCommentaryText } from '../../hooks/useCommentaryText'
import { flattenSefariaText } from '../../api/sefaria'
import { highlightPlaceNames } from '../../utils/textUtils'
import { useTranslation } from '../../i18n/useTranslation'

const COMMENTATORS = ['Rashi', 'Ramban', 'Ibn Ezra', 'Sforno'] as const
type Commentator = (typeof COMMENTATORS)[number]
type TextMode = 'english' | 'hebrew'

const PAGE_SIZE = 20

export function ParshaTextViewer({ onScrollStart }: { onScrollStart?: () => void }) {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setHighlightedPlace = useAppStore((s) => s.setHighlightedPlace)
  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null
  const { data, isLoading, isError } = useParshaText(parsha?.seferiaUrl ?? null)
  const places = useParshaPlaces(selectedParshaId)
  const t = useTranslation()

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [textMode, setTextMode] = useState<TextMode>('english')
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
      <div className="flex-1 flex items-center justify-center text-on-surface-variant font-label text-sm p-4">
        <div className="text-center">
          <div className="text-4xl mb-3">📖</div>
          <p>{t.viewer.selectToRead}</p>
          <p className="mt-1 font-label text-xs text-on-surface-variant/60">{t.viewer.placesOnMap}</p>
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
            className="h-3 bg-surface-container rounded animate-pulse"
            style={{ width: `${70 + (i * 7) % 30}%` }}
          />
        ))}
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 font-label text-sm text-error">
        {t.viewer.loadError}
      </div>
    )
  }

  const englishVerses = flattenSefariaText(data.text)
  const hebrewVerses = flattenSefariaText(data.he)
  const verses = textMode === 'hebrew' ? hebrewVerses : englishVerses
  const totalVerses = verses.length
  const hasMore = visibleCount < totalVerses

  return (
    <div
      className="md:flex-1 md:min-h-0 md:overflow-y-auto md:scrollbar-thin"
      onScroll={(e) => { if (e.currentTarget.scrollTop > 0) onScrollStart?.() }}
    >
      {/* Controls bar */}
      <div className="sticky top-0 z-10 bg-surface-container-low px-4 py-2 flex items-center justify-between gap-2">
        {/* Language mode toggle */}
        <div className="flex items-center gap-1 bg-surface-container rounded p-0.5">
          <button
            onClick={() => setTextMode('english')}
            className={`font-label text-xs px-2.5 py-1 rounded transition-colors ${
              textMode === 'english'
                ? 'bg-on-surface text-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.viewer.englishMode}
          </button>
          <button
            onClick={() => setTextMode('hebrew')}
            className={`font-label text-xs px-2.5 py-1 rounded transition-colors font-hebrew ${
              textMode === 'hebrew'
                ? 'bg-on-surface text-surface'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.viewer.hebrewMode}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {commentaryOpen && (
            <div className="relative">
              <button
                onClick={() => setCommentatorMenuOpen((v) => !v)}
                className="flex items-center gap-1 font-label text-xs text-on-surface-variant bg-surface-container hover:bg-surface-container-high px-2.5 py-1 rounded transition-colors"
              >
                {selectedCommentator}
                <ChevronDown size={11} />
              </button>
              {commentatorMenuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-surface shadow-ambient rounded z-20 py-1 min-w-[100px]">
                  {COMMENTATORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCommentator(c)
                        setCommentatorMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-1.5 font-label text-xs hover:bg-surface-container transition-colors ${
                        c === selectedCommentator ? 'text-primary font-medium' : 'text-on-surface'
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
            className={`flex items-center gap-1.5 font-label text-xs px-2.5 py-1 rounded transition-colors ${
              commentaryOpen
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <ScrollText size={12} />
            {t.viewer.commentary}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Verse list: single language at a time */}
        <div
          className="space-y-3"
          onClick={handleClick}
          dir={textMode === 'hebrew' ? 'rtl' : 'ltr'}
        >
          {Array.from({ length: Math.min(visibleCount, totalVerses) }, (_, i) => {
            const verse = verses[i] ?? ''
            return (
              <div key={i} className="space-y-0.5">
                <span className="font-label text-[10px] text-on-surface-variant/40 select-none block">{i + 1}</span>
                {textMode === 'hebrew' ? (
                  <p
                    className="font-hebrew text-right text-sm text-on-surface leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: verse }}
                  />
                ) : (
                  <p
                    className="font-body text-sm text-on-surface-variant leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: highlightPlaceNames(verse, places) }}
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
              className="flex-1 font-label text-xs text-primary hover:text-primary/80 bg-primary-container hover:bg-primary-container/80 py-2 rounded transition-colors font-medium"
            >
              {t.viewer.showNext(Math.min(PAGE_SIZE, totalVerses - visibleCount))}
              <span className="text-on-surface-variant/50 font-normal ml-1">
                ({visibleCount} of {totalVerses})
              </span>
            </button>
            <button
              onClick={() => setVisibleCount(totalVerses)}
              className="font-label text-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {t.viewer.showAll}
            </button>
          </div>
        )}

        {!hasMore && totalVerses > PAGE_SIZE && (
          <p className="font-label text-xs text-on-surface-variant/40 text-center pt-1">
            {t.viewer.allShown(totalVerses)}
          </p>
        )}

        {/* Commentary section */}
        {commentaryOpen && (
          <div ref={commentaryRef} className="pt-4 mt-2 bg-surface-container rounded p-3">
            <div className="flex items-center gap-2 mb-3">
              <ScrollText size={13} className="text-primary" />
              <h3 className="font-label text-xs font-semibold text-primary uppercase tracking-widest">
                {selectedCommentator} on {parsha.name}
              </h3>
            </div>

            {commentaryLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-2.5 w-12 bg-primary-container rounded animate-pulse" />
                    <div className="h-3 bg-surface-container-high rounded animate-pulse" style={{ width: '90%' }} />
                    <div className="h-3 bg-surface-container-high rounded animate-pulse" style={{ width: '75%' }} />
                  </div>
                ))}
              </div>
            ) : commentaryPairs.length === 0 ? (
              <p className="font-body text-xs text-on-surface-variant italic">
                {t.viewer.noCommentary(selectedCommentator)}
              </p>
            ) : (
              <div className="space-y-5">
                {commentaryPairs.slice(0, commentaryLimit).map(({ en, he }, i) => (
                  <div key={i} className="space-y-1.5">
                    <span className="inline-block font-label text-primary font-medium text-[10px]">
                      {i + 1}
                    </span>
                    {textMode === 'hebrew' && he && (
                      <p
                        dir="rtl"
                        className="font-hebrew text-right text-sm text-on-surface leading-relaxed"
                      >
                        {he}
                      </p>
                    )}
                    {textMode === 'english' && en && (
                      <p className="font-body text-xs text-on-surface-variant leading-relaxed">{en}</p>
                    )}
                    {textMode === 'english' && !en && he && (
                      <p
                        dir="rtl"
                        className="font-hebrew text-right text-xs text-on-surface-variant leading-relaxed"
                      >
                        {he}
                      </p>
                    )}
                  </div>
                ))}
                {commentaryPairs.length > commentaryLimit && (
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setCommentaryLimit((n) => n + 40)}
                      className="flex-1 font-label text-xs text-primary hover:text-primary/80 bg-primary-container hover:bg-primary-container/80 py-2 rounded transition-colors font-medium"
                    >
                      {t.viewer.showMoreComments(Math.min(40, commentaryPairs.length - commentaryLimit))}
                      <span className="text-on-surface-variant/50 font-normal ml-1">
                        ({commentaryLimit} of {commentaryPairs.length})
                      </span>
                    </button>
                    <button
                      onClick={() => setCommentaryLimit(commentaryPairs.length)}
                      className="font-label text-xs text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      {t.viewer.showAll}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <p className="font-label text-xs text-on-surface-variant/40 text-center pt-2">
          {t.viewer.providedBy}{' '}
          <a
            href="https://www.sefaria.org"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-on-surface-variant"
          >
            Sefaria
          </a>
        </p>
      </div>
    </div>
  )
}
