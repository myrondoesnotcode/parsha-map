import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api/queryKeys'

interface WikimediaImageInfoPage {
  imageinfo?: { url: string }[]
}

/**
 * Resolves a Wikimedia Commons Special:FilePath URL to a direct
 * upload.wikimedia.org URL via the Commons API.
 */
export function useWikimediaImage(specialFilepathUrl: string | null | undefined) {
  const filename = specialFilepathUrl?.split('/Special:FilePath/')[1] ?? null

  return useQuery<string | null>({
    queryKey: queryKeys.wikimediaImage(filename ?? ''),
    queryFn: async () => {
      const res = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename!)}&prop=imageinfo&iiprop=url&format=json&origin=*`
      )
      if (!res.ok) return null
      const data = await res.json()
      const pages: Record<string, WikimediaImageInfoPage> = data?.query?.pages
      if (!pages) return null
      const page = Object.values(pages)[0]
      return page?.imageinfo?.[0]?.url ?? null
    },
    enabled: !!filename,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    retry: false,
  })
}
