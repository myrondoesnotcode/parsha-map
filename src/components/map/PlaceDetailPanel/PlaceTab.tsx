import { ExternalLink, Navigation, AlertTriangle, BookOpen, Youtube } from 'lucide-react'
import { VerseChip } from './VerseChip'
import type { Place } from '../../../types/places'
import type { ArchaeologicalSite } from '../../../hooks/useArchaeologicalSites'
import type { SefariaTopicResponse } from '../../../types/sefaria'
import type { WikipediaSummary } from '../../../api/wikipedia'
import type { ParshaListItem } from '../../../types/parsha'

interface Props {
  item: Place | ArchaeologicalSite
  place: Place | null
  isPlace: boolean
  topicData: SefariaTopicResponse | null
  topicLoading: boolean
  wiki: WikipediaSummary | null | undefined
  wikiLoading: boolean
  verseText: string | null | undefined
  otherParshas: ParshaListItem[]
  onNavigateParsha: (id: string) => void
}

export function PlaceTab({
  item,
  place,
  isPlace,
  topicData,
  topicLoading,
  wiki,
  wikiLoading,
  verseText,
  otherParshas,
  onNavigateParsha,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Google Maps / directions */}
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

      {/* Sefaria topic block */}
      {topicLoading && (
        <div className="animate-pulse space-y-1.5">
          <div className="h-3 bg-surface-container rounded w-1/2" />
          <div className="h-2.5 bg-surface-container rounded w-full" />
          <div className="h-2.5 bg-surface-container rounded w-4/5" />
        </div>
      )}
      {topicData && (
        <div className="space-y-2 border-l-2 border-primary/30 pl-3">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="font-headline text-sm font-semibold text-on-surface">
              {topicData.primaryTitle.en}
            </p>
            <p className="font-hebrew text-xs text-on-surface-variant" dir="rtl">
              {topicData.primaryTitle.he}
            </p>
            {topicData.numSources != null && topicData.numSources > 0 && (
              <p className="font-label text-[10px] text-on-surface-variant/70">
                {topicData.numSources} sources
              </p>
            )}
          </div>
          {topicData.refs && topicData.refs.length > 0 && (
            <div className="space-y-0.5">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest">
                Key sources
              </p>
              {topicData.refs.slice(0, 5).map((r, i) => (
                <a
                  key={i}
                  href={`https://www.sefaria.org/${encodeURIComponent(r.ref)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-label text-[11px] text-tertiary hover:text-tertiary/80 transition-colors"
                >
                  <ExternalLink size={9} className="shrink-0" />
                  {r.ref}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wikipedia section */}
      {wikiLoading && (
        <div className="animate-pulse space-y-2">
          <div className="h-32 bg-surface-container rounded" />
          <div className="h-3 bg-surface-container rounded w-3/4" />
          <div className="h-3 bg-surface-container rounded w-full" />
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

      {/* Local description fallback */}
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

      {/* Further Reading */}
      {!isPlace && (item as ArchaeologicalSite).paperLinks && (item as ArchaeologicalSite).paperLinks!.length > 0 && (
        <div className="pt-1 space-y-1.5">
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
              <span className="font-body text-xs text-on-surface-variant group-hover:text-on-primary-container leading-snug">
                {paper.title}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* YouTube links */}
      {!isPlace && (item as ArchaeologicalSite).youtubeLinks && (item as ArchaeologicalSite).youtubeLinks!.length > 0 && (
        <div className="pt-1 space-y-1.5">
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
              <Youtube size={11} className="text-on-surface-variant mt-0.5 shrink-0" />
              <span className="font-body text-xs text-on-surface-variant leading-snug">{video.title}</span>
            </a>
          ))}
        </div>
      )}

      {/* Cross-parsha connections */}
      {otherParshas.length > 0 && (
        <div className="pt-1">
          <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
            Also appears in
          </p>
          <div className="flex flex-wrap gap-1.5">
            {otherParshas.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigateParsha(p.id)}
                className="px-2 py-1 bg-surface-container font-label text-on-surface rounded text-[11px] hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Verse references with lazy cross-refs */}
      {place && place.verses.length > 0 && (
        <div className="pt-1 space-y-2">
          <div>
            <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-0.5">
              Verse references
            </p>
            <p className="font-body text-[10px] text-on-surface-variant/60 italic">
              All Torah references — click any verse for cross-references
            </p>
          </div>
          {verseText && place.verses[0] && (
            <div className="bg-primary-container rounded p-3 border-l-2 border-primary/40">
              <p className="font-body text-xs text-on-primary-container leading-relaxed italic">
                "{verseText}"
              </p>
              <p className="font-label text-[10px] text-primary mt-1 font-medium">{place.verses[0]}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {place.verses.slice(0, 12).map((v) => (
              <VerseChip key={v} verse={v} />
            ))}
            {place.verses.length > 12 && (
              <span className="font-label text-on-surface-variant text-[10px] self-center">
                +{place.verses.length - 12} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Powered by Sefaria */}
      {topicData && (
        <div className="pt-2 border-t border-outline/20">
          <a
            href="https://www.sefaria.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-label text-[10px] text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <ExternalLink size={9} />
            Powered by Sefaria
          </a>
        </div>
      )}
    </div>
  )
}
