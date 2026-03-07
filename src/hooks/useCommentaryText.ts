import { useQuery } from '@tanstack/react-query'
import { fetchCommentaryText } from '../api/sefaria'
import type { SefariaTextResponse } from '../types/sefaria'
import { queryKeys } from '../api/queryKeys'

export function useCommentaryText(
  seferiaUrl: string | null,
  commentator: string,
  enabled: boolean
) {
  return useQuery<SefariaTextResponse>({
    queryKey: queryKeys.sefariaCommentary(seferiaUrl ?? '', commentator),
    queryFn: () => fetchCommentaryText(commentator, seferiaUrl!),
    enabled: !!seferiaUrl && enabled,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    retry: false,
  })
}
