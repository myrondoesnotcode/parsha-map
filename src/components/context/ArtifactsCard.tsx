import { ExternalLink } from 'lucide-react'
import { useMuseumArtifacts } from '../../hooks/useMuseumArtifacts'
import type { Era } from '../../types/timeline'

interface Props {
  era: Era
}

export function ArtifactsCard({ era }: Props) {
  const { data: artifacts, isLoading } = useMuseumArtifacts(era.id)

  if (isLoading) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100">
        <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Artifacts from This Era
          </p>
        </div>
        <div className="p-3 grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="w-full aspect-square bg-stone-100 rounded animate-pulse" />
              <div className="h-2 bg-stone-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!artifacts || artifacts.length === 0) return null

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-stone-100">
      <div className="px-4 py-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between">
        <p className="text-xs font-semibold text-stone-600 uppercase tracking-wide">
          Artifacts from This Era
        </p>
        <a
          href="https://www.metmuseum.org"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-stone-400 hover:text-stone-600 flex items-center gap-0.5 transition-colors"
        >
          The Met
          <ExternalLink size={9} />
        </a>
      </div>
      <div className="p-3 grid grid-cols-3 gap-2">
        {artifacts.map((artifact) => (
          <a
            key={artifact.objectID}
            href={artifact.objectURL}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="w-full aspect-square bg-stone-100 rounded-xl overflow-hidden mb-1">
              <img
                src={artifact.primaryImageSmall}
                alt={artifact.title}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none'
                }}
              />
            </div>
            <p className="text-[10px] text-stone-600 leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors">
              {artifact.title}
            </p>
            {artifact.objectDate && (
              <p className="text-[9px] text-stone-400 mt-0.5 leading-tight">{artifact.objectDate}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
