import { useQuery } from '@tanstack/react-query'
import { fetchLinksForParsha } from '../api/sefaria'
import type { SefariaLink } from '../types/sefaria'
import { queryKeys } from '../api/queryKeys'

export function useSefariaLinks(ref: string | null, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.sefariaLinks(ref ?? ''),
    queryFn: () => fetchLinksForParsha(ref!),
    enabled: !!ref && enabled,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week — commentaries don't change
    retry: false,
    select: (data: SefariaLink[]) =>
      data.filter(
        (link) => link.type === 'commentary' && link.category === 'Commentary'
      ),
  })
}
