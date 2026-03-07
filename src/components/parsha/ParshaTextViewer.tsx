import { useCallback, useState } from 'react'
import { MessageSquare, ChevronDown } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { useParshaText } from '../../hooks/useParshaText'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { useSefariaLinks } from '../../hooks/useSefariaLinks'
import { flattenSefariaText } from '../../api/sefaria'
import { highlightPlaceNames } from '../../utils/textUtils'
import type { SefariaLink } from '../../types/sefaria'

const COMMENTATORS = ['Rashi', 'Ramban', 'Ibn Ezra', 'Sforno'] as const
type Commentator = (typeof COMMENTATORS)[number]

function getCommentaryText(link: SefariaLink): string {
  const raw = link.text?.en
  if (!raw) return ''
  const text = Array.isArray(raw) ? raw.join(' ') : raw
  // Strip HTML tags Sefaria sometimes includes
  return text.replace(/<[^>]+>/g, '').trim()
}

function shortVerseRef(anchorRef: string): string {
  // "Genesis 18:1" → "18:1", "Genesis 18:1-3" → "18:1-3"
  return anchorRef.split(' ').slice(-1)[0] ?? anchorRef
}

export function ParshaTextViewer() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setHighlightedPlace = useAppStore((s) => s.setHighlightedPlace)
  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null
  const { data, isLoading, isError } = useParshaText(parsha?.seferiaUrl ?? null)
  const places = useParshaPlaces(selectedParshaId)

  const [commentaryOpen, setCommentaryOpen] = useState(false)
  const [selectedCommentator, setSelectedCommentator] = useState<Commentator>('Rashi')
  const [commentatorMenuOpen, setCommentatorMenuOpen] = useState(false)

  const { data: links, isLoading: linksLoading } = useSefariaLinks(
    parsha?.seferiaUrl ?? null,
    commentaryOpen
  )

  const filteredCommentary = links?.filter(
    (link) => link.collectiveTitle?.en === selectedCommentator
  ) ?? []

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
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {/* Controls bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-stone-100 px-4 py-2 flex items-center justify-end gap-2">
        {/* Commentator selector — only visible when commentary is open */}
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

        {/* Commentary toggle */}
        <button
          onClick={() => setCommentaryOpen((v) => !v)}
          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors ${
            commentaryOpen
              ? 'bg-amber-600 text-white'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <MessageSquare size={12} />
          Commentary
        </button>
      </div>

      <div className="p-4 space-y-4">
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
                Displaying first 20 of {hebrewVerses.length} verses
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
                Displaying first 20 of {englishVerses.length} verses
              </p>
            )}
          </div>
        )}

        {/* Commentary section */}
        {commentaryOpen && (
          <div className="border-t border-amber-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={13} className="text-amber-600" />
              <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                {selectedCommentator} on {parsha.name}
              </h3>
            </div>

            {linksLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-2.5 w-12 bg-amber-100 rounded animate-pulse" />
                    <div className="h-3 bg-stone-100 rounded animate-pulse" style={{ width: '90%' }} />
                    <div className="h-3 bg-stone-100 rounded animate-pulse" style={{ width: '75%' }} />
                  </div>
                ))}
              </div>
            ) : filteredCommentary.length === 0 ? (
              <p className="text-xs text-stone-400 italic">
                No {selectedCommentator} commentary available for this portion.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredCommentary.slice(0, 40).map((link, i) => {
                  const text = getCommentaryText(link)
                  if (!text) return null
                  return (
                    <div key={i} className="text-xs">
                      <span className="font-mono text-amber-600 font-medium text-[10px] mr-2">
                        {shortVerseRef(link.anchorRef)}
                      </span>
                      <span className="text-stone-600 leading-relaxed">{text}</span>
                    </div>
                  )
                })}
                {filteredCommentary.length > 40 && (
                  <p className="text-xs text-stone-400 text-center">
                    Showing 40 of {filteredCommentary.length} comments
                  </p>
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
