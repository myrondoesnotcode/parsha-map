import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { PersonMiniPanel } from './PersonMiniPanel'
import type { SefariaTopicLink } from '../../../types/sefaria'

const PERSON_TYPES = ['people', 'biblical-figures', 'person']
const LINK_TYPE_LABELS: Record<string, string> = {
  'person-participates-in-event': 'Was present',
  'leader-of': 'Led people here',
  'lived-in': 'Lived here',
  'born-in': 'Born here',
  'died-in': 'Died here',
  'buried-in': 'Buried here',
}

interface Props {
  links: SefariaTopicLink[]
}

export function PeopleEventsTab({ links }: Props) {
  const [selectedPersonSlug, setSelectedPersonSlug] = useState<string | null>(null)

  const people = links.filter((l) => PERSON_TYPES.includes(l.toTopic.type))
  const events = links.filter((l) => l.toTopic.type === 'biblical-event')

  return (
    <div className="space-y-4 relative">
      {people.length > 0 && (
        <div>
          <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
            People
          </p>
          <div className="space-y-1.5">
            {people.map((link, i) => (
              <button
                key={i}
                onClick={() => setSelectedPersonSlug(link.toTopic.slug)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-surface-container hover:bg-primary-container hover:text-on-primary-container transition-colors group text-left"
              >
                <span className="font-label text-xs font-medium text-on-surface group-hover:text-on-primary-container">
                  {link.toTopic.primaryTitle.en}
                </span>
                {link.type && (
                  <span className="font-label text-[10px] text-on-surface-variant group-hover:text-on-primary-container/80 shrink-0 ml-2">
                    {LINK_TYPE_LABELS[link.type] ?? link.type.replace(/-/g, ' ')}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div>
          <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-2">
            Events
          </p>
          <div className="space-y-1.5">
            {events.map((link, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-2 py-1.5 rounded bg-surface-container"
              >
                <span className="font-label text-xs text-on-surface">
                  {link.toTopic.primaryTitle.en}
                </span>
                {link.ref && (
                  <a
                    href={`https://www.sefaria.org/${encodeURIComponent(link.ref)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-label text-[10px] text-tertiary hover:text-tertiary/80 shrink-0 ml-2"
                  >
                    <ExternalLink size={9} />
                    {link.ref}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {people.length === 0 && events.length === 0 && (
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
