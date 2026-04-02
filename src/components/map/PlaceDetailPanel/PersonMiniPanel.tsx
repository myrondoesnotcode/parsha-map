import { X, ExternalLink } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchSefariaTopicBySlug } from '../../../api/sefaria'
import { queryKeys } from '../../../api/queryKeys'

const FAMILY_LINK_TYPES = ['child-of', 'parent-of', 'spouse-of', 'sibling-of']
const FAMILY_LABELS: Record<string, string> = {
  'child-of': 'Child of',
  'parent-of': 'Parent of',
  'spouse-of': 'Spouse of',
  'sibling-of': 'Sibling of',
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

interface FamilyRelation {
  label: string
  name: string
  slug: string
}

interface Props {
  slug: string | null
  onClose: () => void
}

export function PersonMiniPanel({ slug, onClose }: Props) {
  const { data: person, isLoading } = useQuery({
    queryKey: queryKeys.sefariaTopics(slug ?? ''),
    queryFn: () => fetchSefariaTopicBySlug(slug!),
    enabled: !!slug,
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  })

  const familyRelations: FamilyRelation[] = []
  if (person?.links) {
    for (const [linkType, linkGroup] of Object.entries(person.links)) {
      if (FAMILY_LINK_TYPES.includes(linkType)) {
        for (const entry of linkGroup.links) {
          familyRelations.push({
            label: FAMILY_LABELS[linkType] ?? linkType,
            name: slugToTitle(entry.topic),
            slug: entry.topic,
          })
        }
      }
    }
  }

  return (
    <div
      className={`absolute inset-0 bg-surface z-20 overflow-y-auto transition-transform duration-200 rounded-tl rounded-bl ${
        slug ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {slug && (
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              {isLoading && (
                <div className="animate-pulse h-4 bg-surface-container rounded w-32" />
              )}
              {person && person.primaryTitle && (
                <>
                  <h4 className="font-headline text-sm font-semibold text-on-surface">
                    {person.primaryTitle.en}
                  </h4>
                  <p className="font-hebrew text-xs text-on-surface-variant mt-0.5" dir="rtl">
                    {person.primaryTitle.he}
                  </p>
                  {person.numSources != null && person.numSources > 0 && (
                    <p className="font-label text-[10px] text-on-surface-variant/70 mt-0.5">
                      {person.numSources} sources on Sefaria
                    </p>
                  )}
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close person panel"
            >
              <X size={14} />
            </button>
          </div>

          {familyRelations.length > 0 && (
            <div className="pt-1">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-1.5">
                Family
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {familyRelations.map((rel, i) => (
                  <span key={i} className="font-label text-xs text-on-surface-variant">
                    <span className="text-primary">{rel.label}</span>{' '}
                    {rel.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {person && (
            <a
              href={`https://www.sefaria.org/topics/${person.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-label text-[11px] text-tertiary hover:text-tertiary/80 transition-colors"
            >
              <ExternalLink size={11} />
              View on Sefaria
            </a>
          )}
        </div>
      )}
    </div>
  )
}
