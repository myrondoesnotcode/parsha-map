import { X, ExternalLink, MapPin, Navigation, AlertTriangle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../../store/useAppStore'
import { fetchWikipediaSummary } from '../../api/wikipedia'
import { fetchVerseText } from '../../api/sefaria'
import { queryKeys } from '../../api/queryKeys'
import { getParshaById } from '../../utils/parshaUtils'
import placesData from '../../data/places.json'
import sitesData from '../../data/archaeologicalSites.json'
import type { Place } from '../../types/places'
import type { ArchaeologicalSite } from '../../hooks/useArchaeologicalSites'

const allPlaces = placesData as Place[]
const allSites = sitesData as ArchaeologicalSite[]

export function PlaceDetailPanel() {
  const selectedPlacePanel = useAppStore((s) => s.selectedPlacePanel)
  const closePlacePanel = useAppStore((s) => s.closePlacePanel)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  const item = selectedPlacePanel
    ? selectedPlacePanel.type === 'place'
      ? allPlaces.find((p) => p.id === selectedPlacePanel.id)
      : allSites.find((s) => s.id === selectedPlacePanel.id)
    : null

  const wikiTitle = item?.name ?? ''

  const { data: wiki, isLoading: wikiLoading } = useQuery({
    queryKey: queryKeys.wikipedia(wikiTitle),
    queryFn: () => fetchWikipediaSummary(wikiTitle),
    enabled: !!wikiTitle && !!selectedPlacePanel,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  })

  const isPlace = selectedPlacePanel?.type === 'place'
  const place = isPlace ? (item as Place) : null
  const otherParshas = place
    ? place.parshas
        .filter((id) => id !== selectedParshaId)
        .map((id) => getParshaById(id))
        .filter(Boolean)
    : []

  // Fetch text of first verse for this place
  const firstVerse = place?.verses?.[0] ?? null
  const { data: verseText } = useQuery({
    queryKey: queryKeys.verseText(firstVerse ?? ''),
    queryFn: () => fetchVerseText(firstVerse!),
    enabled: !!firstVerse && !!selectedPlacePanel,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    retry: false,
  })

  return (
    <div
      className={`absolute inset-y-0 right-0 left-8 bg-white z-10 overflow-y-auto transition-transform duration-300 rounded-tl-2xl rounded-bl-2xl shadow-xl ${
        item ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {item && (
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-stone-900">{item.name}</h3>
              {item.alternateNames.length > 0 && (
                <p className="text-xs text-stone-400 mt-0.5">
                  Also: {item.alternateNames.slice(0, 4).join(', ')}
                </p>
              )}
              {place?.modernName && (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-amber-600" />
                  <p className="text-xs text-stone-400">Modern: {place.modernName}</p>
                </div>
              )}
            </div>
            <button
              onClick={closePlacePanel}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Google Maps / directions */}
          {item && (
            <div className="bg-blue-50 rounded-lg p-3 space-y-1.5">
              <a
                href={
                  place?.modernName
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.modernName)}`
                    : `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-medium transition-colors"
              >
                <Navigation size={12} />
                Open in Google Maps
              </a>
              <div className="flex items-start gap-1.5">
                <AlertTriangle size={11} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-[10px] text-stone-500 leading-relaxed">
                  Always check current travel advisories before visiting.{' '}
                  <a
                    href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    U.S. Travel Advisories
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Wikipedia section */}
          {wikiLoading && (
            <div className="animate-pulse space-y-2">
              <div className="h-32 bg-stone-100 rounded-lg" />
              <div className="h-3 bg-stone-100 rounded w-3/4" />
              <div className="h-3 bg-stone-100 rounded w-full" />
              <div className="h-3 bg-stone-100 rounded w-5/6" />
            </div>
          )}

          {wiki && (
            <div className="space-y-3">
              {wiki.thumbnail && (
                <img
                  src={wiki.thumbnail.source}
                  alt={item.name}
                  className="w-full rounded-lg object-cover max-h-48"
                />
              )}
              <p className="text-xs text-stone-600 leading-relaxed">{wiki.extract}</p>
              {wiki.content_urls?.desktop.page && (
                <a
                  href={wiki.content_urls.desktop.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 transition-colors"
                >
                  <ExternalLink size={11} />
                  Read more on Wikipedia
                </a>
              )}
            </div>
          )}

          {/* Local description (show if no Wikipedia extract or as supplement) */}
          {!wiki && !wikiLoading && item.description && (
            <p className="text-xs text-stone-600 leading-relaxed">{item.description}</p>
          )}

          {/* Archaeological site significance */}
          {!isPlace && (item as ArchaeologicalSite).significance && (
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-[10px] uppercase font-medium text-purple-700 mb-1 tracking-wide">
                Archaeological Significance
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">
                {(item as ArchaeologicalSite).significance}
              </p>
            </div>
          )}

          {/* Cross-parsha connections */}
          {otherParshas.length > 0 && (
            <div className="border-t border-stone-100 pt-3">
              <p className="text-[10px] uppercase font-medium text-stone-400 tracking-wide mb-2">
                Also appears in
              </p>
              <div className="flex flex-wrap gap-1.5">
                {otherParshas.map((p) => (
                  <button
                    key={p!.id}
                    onClick={() => {
                      setSelectedParsha(p!.id)
                      closePlacePanel()
                    }}
                    className="px-2 py-1 bg-stone-100 text-stone-600 rounded text-[11px] hover:bg-amber-100 hover:text-amber-800 transition-colors"
                  >
                    {p!.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Verse references */}
          {place && place.verses.length > 0 && (
            <div className="border-t border-stone-100 pt-3 space-y-2">
              <div>
                <p className="text-[10px] uppercase font-medium text-stone-400 tracking-wide mb-0.5">
                  Verse references
                </p>
                <p className="text-[10px] text-stone-400 italic">
                  All Torah references to this location — not just the current portion
                </p>
              </div>

              {/* First verse quote */}
              {verseText && firstVerse && (
                <div className="bg-amber-50 rounded-lg p-3 border-l-2 border-amber-400">
                  <p className="text-xs text-stone-700 leading-relaxed italic">"{verseText}"</p>
                  <p className="text-[10px] text-amber-700 mt-1 font-medium">{firstVerse}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {place.verses.slice(0, 12).map((v) => (
                  <span
                    key={v}
                    className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px]"
                  >
                    {v}
                  </span>
                ))}
                {place.verses.length > 12 && (
                  <span className="text-stone-400 text-[10px] self-center">
                    +{place.verses.length - 12} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
