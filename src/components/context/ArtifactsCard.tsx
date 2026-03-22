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
      <div className="rounded overflow-hidden shadow-ambient">
        <div className="px-4 py-3 bg-surface-container-high">
          <p className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
            Artifacts from This Era
          </p>
        </div>
        <div className="p-3 grid grid-cols-3 gap-2 bg-surface-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="w-full aspect-square bg-surface-container-high rounded animate-pulse" />
              <div className="h-2 bg-surface-container-high rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!artifacts || artifacts.length === 0) return null

  return (
    <div className="rounded overflow-hidden shadow-ambient">
      <div className="px-4 py-3 bg-surface-container-high flex items-center justify-between">
        <p className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
          Artifacts from This Era
        </p>
        <a
          href="https://www.metmuseum.org"
          target="_blank"
          rel="noreferrer"
          className="font-label text-[10px] text-on-surface-variant hover:text-tertiary flex items-center gap-0.5 transition-colors"
        >
          The Met
          <ExternalLink size={9} />
        </a>
      </div>
      <div className="p-3 grid grid-cols-3 gap-2 bg-surface-container">
        {artifacts.map((artifact) => (
          <a
            key={artifact.objectID}
            href={artifact.objectURL}
            target="_blank"
            rel="noreferrer"
            className="group block"
          >
            <div className="w-full aspect-square bg-surface-container-high rounded overflow-hidden mb-1">
              <img
                src={artifact.primaryImageSmall}
                alt={artifact.title}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                onError={(e) => {
                  (e.currentTarget.parentElement as HTMLElement).style.display = 'none'
                }}
              />
            </div>
            <p className="font-label text-[10px] text-on-surface-variant leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {artifact.title}
            </p>
            {artifact.objectDate && (
              <p className="font-label text-[9px] text-on-surface-variant/50 mt-0.5 leading-tight">{artifact.objectDate}</p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
