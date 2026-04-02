import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { fetchVerseLinks } from '../../../api/sefaria'
import { queryKeys } from '../../../api/queryKeys'
import type { SefariaLink } from '../../../types/sefaria'

interface Props {
  verse: string
}

function groupByCategory(links: SefariaLink[]): Record<string, SefariaLink[]> {
  return links.reduce<Record<string, SefariaLink[]>>((acc, link) => {
    const cat = link.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(link)
    return acc
  }, {})
}

export function VerseChip({ verse }: Props) {
  const [expanded, setExpanded] = useState(false)

  const { data: links, isFetching } = useQuery({
    queryKey: queryKeys.verseLinks(verse),
    queryFn: () => fetchVerseLinks(verse),
    enabled: expanded,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    retry: false,
  })

  const grouped = links ? groupByCategory(links) : null
  const totalCount = links?.length ?? 0
  const sefariaRef = verse.replace(' ', '.').replace(':', '.')

  return (
    <div className="text-[10px]">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-secondary-container font-label text-on-surface rounded hover:bg-primary-container hover:text-on-primary-container transition-colors"
      >
        {verse}
        {expanded ? <ChevronUp size={9} /> : <ChevronDown size={9} />}
      </button>

      {expanded && (
        <div className="mt-1.5 ml-1 border-l-2 border-outline/20 pl-2 space-y-2">
          {isFetching && (
            <div className="animate-pulse space-y-1">
              <div className="h-2.5 bg-surface-container rounded w-1/2" />
              <div className="h-2.5 bg-surface-container rounded w-3/4" />
            </div>
          )}

          {grouped && Object.keys(grouped).length === 0 && (
            <p className="text-on-surface-variant italic">No cross-references found.</p>
          )}

          {grouped &&
            Object.entries(grouped).map(([cat, catLinks]) => (
              <div key={cat}>
                <p className="font-medium text-on-surface-variant uppercase tracking-widest text-[9px] mb-0.5">
                  {cat}
                </p>
                {catLinks.slice(0, 3).map((link, i) => (
                  <a
                    key={i}
                    href={`https://www.sefaria.org/${encodeURIComponent(link.sourceRef)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-tertiary hover:text-tertiary/80 transition-colors"
                  >
                    <ExternalLink size={9} className="shrink-0" />
                    {link.sourceRef}
                  </a>
                ))}
              </div>
            ))}

          {totalCount > 0 && (
            <a
              href={`https://www.sefaria.org/${sefariaRef}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <ExternalLink size={9} />
              View all {totalCount} references on Sefaria
            </a>
          )}
        </div>
      )}
    </div>
  )
}
