import { useState } from 'react'
import { Scroll, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import type { Era, PrimarySource } from '../../types/timeline'

interface Props {
  era: Era
}

function SourceItem({ source }: { source: PrimarySource }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border border-stone-100 rounded-lg overflow-hidden">
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
            <p className="text-xs font-semibold text-stone-800 leading-snug">{source.name}</p>
            <p className="text-[10px] text-amber-700 mt-0.5">{source.dateLabel}</p>
          </div>
          {source.wikiUrl && (
            <a
              href={source.wikiUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 text-stone-400 hover:text-amber-600 transition-colors mt-0.5"
              title="Wikipedia"
            >
              <ExternalLink size={11} />
            </a>
          )}
        </div>

        <p className="text-xs text-stone-500 leading-relaxed mt-1.5">{source.description}</p>

        {source.excerpt && (
          <>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 mt-2 text-[10px] text-amber-600 hover:text-amber-800 transition-colors font-medium"
            >
              {expanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              {expanded ? 'Hide excerpt' : 'Read excerpt'}
            </button>
            {expanded && (
              <blockquote className="mt-2 pl-2.5 border-l-2 border-amber-200 text-[11px] text-stone-600 italic leading-relaxed">
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
    <div className="rounded-xl border border-stone-200 overflow-hidden">
      <div className="px-4 py-3 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
        <Scroll size={13} className="text-amber-700" />
        <h3 className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
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
