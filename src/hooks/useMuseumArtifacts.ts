import { useQuery } from '@tanstack/react-query'
import { fetchMetArtifactsForEra } from '../api/museum'
import { queryKeys } from '../api/queryKeys'

export function useMuseumArtifacts(eraId: string | null) {
  return useQuery({
    queryKey: queryKeys.metArtifacts(eraId ?? ''),
    queryFn: () => fetchMetArtifactsForEra(eraId!),
    enabled: !!eraId,
    staleTime: 1000 * 60 * 60 * 24, // 24h
    retry: false,
  })
}
