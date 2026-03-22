import { X, ExternalLink, MapPin, Navigation, AlertTriangle, BookOpen, Youtube } from 'lucide-react'
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
      className={`absolute inset-y-0 right-0 left-8 bg-surface z-10 overflow-y-auto transition-transform duration-300 rounded-tl rounded-bl shadow-ambient ${
        item ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {item && (
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-headline text-base font-semibold text-on-surface">{item.name}</h3>
              {item.alternateNames.length > 0 && (
                <p className="font-label text-xs text-on-surface-variant mt-0.5">
                  Also: {item.alternateNames.slice(0, 4).join(', ')}
                </p>
              )}
              {place?.modernName && (
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} className="text-primary" />
                  <p className="font-label text-xs text-on-surface-variant">Modern: {place.modernName}</p>
                </div>
              )}
            </div>
            <button
              onClick={closePlacePanel}
              className="flex-shrink-0 p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Google Maps / directions */}
          {item && (
            <div className="bg-tertiary-container rounded p-3 space-y-1.5">
              <a
                href={
                  place?.modernName
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.modernName)}`
                    : `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-label text-xs text-on-tertiary-container hover:text-tertiary font-medium transition-colors"
              >
                <Navigation size={12} />
                Open in Google Maps
              </a>
              <div className="flex items-start gap-1.5">
                <AlertTriangle size={11} className="text-primary mt-0.5 shrink-0" />
                <p className="font-label text-[10px] text-on-tertiary-container/80 leading-relaxed">
                  Always check current travel advisories before visiting.{' '}
                  <a
                    href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories.html/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-tertiary hover:underline"
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
              <div className="h-32 bg-surface-container rounded" />
              <div className="h-3 bg-surface-container rounded w-3/4" />
              <div className="h-3 bg-surface-container rounded w-full" />
              <div className="h-3 bg-surface-container rounded w-5/6" />
            </div>
          )}

          {wiki && (
            <div className="space-y-3">
              {wiki.thumbnail && (
                <img
                  src={wiki.thumbnail.source}
                  alt={item.name}
                  className="w-full rounded object-cover max-h-48"
                />
              )}
              <p className="font-body text-xs text-on-surface-variant leading-relaxed">{wiki.extract}</p>
              {wiki.content_urls?.desktop.page && (
                <a
                  href={wiki.content_urls.desktop.page}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-label text-[11px] text-tertiary hover:text-tertiary/80 transition-colors"
                >
                  <ExternalLink size={11} />
                  Read more on Wikipedia
                </a>
              )}
            </div>
          )}

          {/* Local description (show if no Wikipedia extract or as supplement) */}
          {!wiki && !wikiLoading && item.description && (
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">{item.description}</p>
          )}

          {/* Archaeological site significance */}
          {!isPlace && (item as ArchaeologicalSite).significance && (
            <div className="bg-secondary-container/40 rounded p-3">
              <p className="font-label text-[10px] uppercase font-medium text-primary mb-1 tracking-widest">
                Archaeological Significance
              </p>
              <p className="font-body text-xs text-on-surface leading-relaxed">
                {(item as ArchaeologicalSite).significance}
              </p>
            </div>
          )}

          {/* Further Reading — academic / institutional links */}
          {!isPlace && (item as ArchaeologicalSite).paperLinks && (item as ArchaeologicalSite).paperLinks!.length > 0 && (
            <div className="pt-3 space-y-1.5">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest flex items-center gap-1.5">
                <BookOpen size={10} />
                Further Reading
              </p>
              {(item as ArchaeologicalSite).paperLinks!.map((paper, i) => (
                <a
                  key={i}
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-2 rounded bg-surface-container hover:bg-primary-container transition-colors group"
                >
                  <ExternalLink size={11} className="text-on-surface-variant group-hover:text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-xs text-on-surface-variant group-hover:text-on-primary-container leading-snug">{paper.title}</span>
                </a>
              ))}
            </div>
          )}

          {/* Watch — YouTube links */}
          {!isPlace && (item as ArchaeologicalSite).youtubeLinks && (item as ArchaeologicalSite).youtubeLinks!.length > 0 && (
            <div className="pt-3 space-y-1.5">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest flex items-center gap-1.5">
                <Youtube size={10} />
                Watch
              </p>
              {(item as ArchaeologicalSite).youtubeLinks!.map((video, i) => (
                <a
                  key={i}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-2 rounded bg-surface-container hover:bg-surface-container-high transition-colors group"
                >
                  <Youtube size={11} className="text-on-surface-variant group-hover:text-primary mt-0.5 shrink-0" />
                  <span className="font-body text-xs text-on-surface-variant leading-snug">{video.title}</span>
                </a>
              ))}
            </div>
          )}

          {/* Cross-parsha connections */}
          {otherParshas.length > 0 && (
            <div className="pt-3">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
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
                    className="px-2 py-1 bg-surface-container font-label text-on-surface rounded text-[11px] hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  >
                    {p!.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Verse references */}
          {place && place.verses.length > 0 && (
            <div className="pt-3 space-y-2">
              <div>
                <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-0.5">
                  Verse references
                </p>
                <p className="font-body text-[10px] text-on-surface-variant/60 italic">
                  All Torah references to this location — not just the current portion
                </p>
              </div>

              {/* First verse quote */}
              {verseText && firstVerse && (
                <div className="bg-primary-container rounded p-3 border-l-2 border-primary/40">
                  <p className="font-body text-xs text-on-primary-container leading-relaxed italic">"{verseText}"</p>
                  <p className="font-label text-[10px] text-primary mt-1 font-medium">{firstVerse}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {place.verses.slice(0, 12).map((v) => (
                  <span
                    key={v}
                    className="px-1.5 py-0.5 bg-secondary-container font-label text-on-surface rounded text-[10px]"
                  >
                    {v}
                  </span>
                ))}
                {place.verses.length > 12 && (
                  <span className="font-label text-on-surface-variant text-[10px] self-center">
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
