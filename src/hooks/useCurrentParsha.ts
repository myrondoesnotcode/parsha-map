import { useQuery } from '@tanstack/react-query'
import { fetchCurrentParsha } from '../api/sefaria'
import { queryKeys } from '../api/queryKeys'
import { useAppStore } from '../store/useAppStore'

export function useCurrentParsha() {
  const isIsrael = useAppStore((s) => s.isIsrael)
  return useQuery({
    queryKey: queryKeys.currentParsha(isIsrael),
    queryFn: () => fetchCurrentParsha(isIsrael),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours — parsha changes weekly
  })
}
