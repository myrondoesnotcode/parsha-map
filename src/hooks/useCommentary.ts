import { useQuery } from '@tanstack/react-query'
import { fetchCommentaryForParsha } from '../api/sefaria'
import { queryKeys } from '../api/queryKeys'

export function useCommentary(
  seferiaUrl: string | null,
  commentator: string,
  enabled: boolean
) {
  return useQuery({
    queryKey: queryKeys.commentary(seferiaUrl ?? '', commentator),
    queryFn: () => fetchCommentaryForParsha(seferiaUrl!, commentator),
    enabled: !!seferiaUrl && enabled,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    retry: false,
  })
}
