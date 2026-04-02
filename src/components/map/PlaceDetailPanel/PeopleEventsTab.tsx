import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { PersonMiniPanel } from './PersonMiniPanel'

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

interface Props {
  peopleSlugs: string[]
  eventSlugs: string[]
}

export function PeopleEventsTab({ peopleSlugs, eventSlugs }: Props) {
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(null)

  return (
    <div className="space-y-4 relative">
      {peopleSlugs.length > 0 && (
        <div>
          <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
            People
          </p>
          <div className="space-y-1.5">
            {peopleSlugs.map((slug, i) => (
              <button
                key={i}
                onClick={() => setSelectedPersonSlug(slug)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-colors group text-left"
              >
                <span className="font-label text-xs font-medium text-on-surface group-hover:text-on-primary-container">
                  {slugToTitle(slug)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {eventSlugs.length > 0 && (
        <div>
          <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
            Events
          </p>
          <div className="space-y-1.5">
            {eventSlugs.map((slug, i) => (
              <a
                key={i}
                href={`https://www.sefaria.org/topics/${encodeURIComponent(slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-2 py-1.5 rounded bg-surface-container hover:bg-surface-container-high transition-colors"
              >
                <span className="font-label text-xs text-on-surface">{slugToTitle(slug)}</span>
                <ExternalLink size={9} className="text-tertiary shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}

      {peopleSlugs.length === 0 && eventSlugs.length === 0 && (
        <p className="font-body text-xs text-on-surface-variant italic text-center py-4">
          No connected people or events found.
        </p>
      )}

      <PersonMiniPanel
        slug={selectedPersonSlug}
        onClose={() => setSelectedPersonSlug(null)}
      />
    </div>
  )
}
