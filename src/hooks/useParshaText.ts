import { useQuery } from '@tanstack/react-query'
import { fetchParshaText } from '../api/sefaria'
import { queryKeys } from '../api/queryKeys'

export function useParshaText(seferiaUrl: string | null) {
  return useQuery({
    queryKey: queryKeys.parshaText(seferiaUrl ?? ''),
    queryFn: () => fetchParshaText(seferiaUrl!),
    enabled: !!seferiaUrl,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week — text never changes
  })
}
