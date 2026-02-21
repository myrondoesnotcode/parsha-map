import { useQuery } from '@tanstack/react-query'
import { fetchCurrentParsha } from '../api/sefaria'
import { queryKeys } from '../api/queryKeys'

export function useCurrentParsha() {
  return useQuery({
    queryKey: queryKeys.currentParsha,
    queryFn: fetchCurrentParsha,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours — parsha changes weekly
  })
}
