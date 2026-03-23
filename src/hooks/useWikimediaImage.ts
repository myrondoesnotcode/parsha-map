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

  // Decode the filename first — it may already be URL-encoded in the JSON (e.g. %27 → ')
  // so we avoid double-encoding when building the API query string.
  const decodedFilename = filename ? decodeURIComponent(filename) : null

  return useQuery<string | null>({
    queryKey: queryKeys.wikimediaImage(decodedFilename ?? ''),
    queryFn: async () => {
      // &redirects follows any file renames/redirects on Commons
      const res = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(decodedFilename!)}&prop=imageinfo&iiprop=url&format=json&origin=*&redirects`
      )
      if (!res.ok) {
        console.warn(`[useWikimediaImage] API error ${res.status} for "${decodedFilename}"`)
        return null
      }
      const data = await res.json()
      const pages: Record<string, WikimediaImageInfoPage> = data?.query?.pages
      if (!pages) return null
      // Find the first page that has imageinfo (skip redirect stubs / missing files)
      const url = Object.values(pages)
        .map((p) => p?.imageinfo?.[0]?.url)
        .find((u) => !!u)
      if (!url) {
        console.warn(`[useWikimediaImage] No imageinfo found for "${decodedFilename}" — file may be missing or renamed on Commons`)
      }
      return url ?? null
    },
    enabled: !!filename,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    retry: 1,
    // Use the Special:FilePath URL immediately while the API resolves so images
    // render right away instead of waiting for the API round-trip.
    placeholderData: specialFilepathUrl ?? null,
  })
}
