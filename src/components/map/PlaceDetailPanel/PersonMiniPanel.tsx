import { X, ExternalLink } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchSefariaTopicBySlug } from '../../../api/sefaria'
import { queryKeys } from '../../../api/queryKeys'
import type { SefariaTopicLink } from '../../../types/sefaria'

const FAMILY_TYPES = ['child-of', 'parent-of', 'spouse-of', 'sibling-of']
const FAMILY_LABELS: Record<string, string> = {
  'child-of': 'Child of',
  'parent-of': 'Parent of',
  'spouse-of': 'Spouse of',
  'sibling-of': 'Sibling of',
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

  const familyLinks =
    person?.links?.filter((l: SefariaTopicLink) => FAMILY_TYPES.includes(l.type)) ?? []

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
              {person && (
                <>
                  <h4 className="font-headline text-sm font-semibold text-on-surface">
                    {person.primaryTitle.en}
                  </h4>
                  <p className="font-hebrew text-xs text-on-surface-variant mt-0.5" dir="rtl">
                    {person.primaryTitle.he}
                  </p>
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

          {person?.description?.en?.value && (
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
              {person.description.en.value}
            </p>
          )}

          {familyLinks.length > 0 && (
            <div className="pt-1">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-1.5">
                Family
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {familyLinks.map((link: SefariaTopicLink, i: number) => (
                  <span key={i} className="font-label text-xs text-on-surface-variant">
                    <span className="text-primary">{FAMILY_LABELS[link.type] ?? link.type}</span>{' '}
                    {link.toTopic.primaryTitle.en}
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
