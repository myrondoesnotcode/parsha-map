import { useState } from 'react'
import { Scroll, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import type { Era, PrimarySource } from '../../types/timeline'

interface Props {
  era: Era
}

function SourceItem({ source }: { source: PrimarySource }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded overflow-hidden shadow-ambient-md bg-surface-container">
      {source.imageUrl && (
        <img
          src={source.imageUrl}
          alt={source.name}
          className="w-full h-28 object-cover object-top"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      )}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-label text-xs font-semibold text-on-surface leading-snug">{source.name}</p>
            <p className="font-label text-[10px] text-primary mt-0.5">{source.dateLabel}</p>
          </div>
          {source.wikiUrl && (
            <a
              href={source.wikiUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-on-surface-variant hover:text-tertiary transition-colors mt-0.5"
              title="Wikipedia"
            >
              <ExternalLink size={11} />
            </a>
          )}
        </div>

        <p className="font-body text-xs text-on-surface-variant leading-relaxed mt-1.5">{source.description}</p>

        {source.excerpt && (
          <>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 mt-2 font-label text-[10px] text-primary hover:text-primary/80 transition-colors font-medium"
            >
              {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              {expanded ? 'Hide excerpt' : 'Read excerpt'}
            </button>
            {expanded && (
              <blockquote className="mt-2 pl-2.5 border-l-2 border-primary/20 font-body text-[11px] text-on-surface-variant italic leading-relaxed">
                {source.excerpt}
              </blockquote>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export function PrimarySourcesCard({ era }: Props) {
  if (!era.primarySources || era.primarySources.length === 0) return null

  return (
    <div className="rounded overflow-hidden shadow-ambient">
      <div className="px-4 py-3 bg-secondary-container/40 flex items-center gap-2">
        <Scroll size={13} className="text-primary" />
        <h3 className="font-label text-xs font-semibold text-primary uppercase tracking-widest">
          Primary Sources
        </h3>
      </div>
      <div className="p-3 space-y-3">
        {era.primarySources.map((source, i) => (
          <SourceItem key={i} source={source} />
        ))}
      </div>
    </div>
  )
}
