import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../api/queryKeys'

interface WikimediaImageInfoPage {
  imageinfo?: { url: string }[]
}

/**
 * Resolves an image URL from either:
 * 1. A Wikimedia Commons Special:FilePath URL → calls Commons API for the direct URL
 * 2. A Wikipedia article title (plain string, no "https://") → calls Wikipedia REST API
 *    for the article's thumbnail image (e.g. "Bereshit_(parasha)", "Noah's_Ark")
 */
export function useWikimediaImage(specialFilepathOrWikiTitle: string | null | undefined) {
  const isSpecialFilePath = specialFilepathOrWikiTitle?.includes('/Special:FilePath/')

  const filename = isSpecialFilePath
    ? (specialFilepathOrWikiTitle?.split('/Special:FilePath/')[1] ?? null)
    : null
  const decodedFilename = filename ? decodeURIComponent(filename) : null

  const wikiTitle = !isSpecialFilePath ? (specialFilepathOrWikiTitle ?? null) : null

  return useQuery<string | null>({
    queryKey: isSpecialFilePath
      ? queryKeys.wikimediaImage(decodedFilename ?? '')
      : ['wikipedia-page-image', wikiTitle ?? ''],
    queryFn: async () => {
      if (isSpecialFilePath && decodedFilename) {
        // Call Wikimedia Commons API to resolve Special:FilePath → direct upload URL
        const res = await fetch(
          `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(decodedFilename)}&prop=imageinfo&iiprop=url&format=json&origin=*&redirects`
        )
        if (!res.ok) {
          console.warn(`[useWikimediaImage] Commons API error ${res.status} for "${decodedFilename}"`)
          return null
        }
        const data = await res.json()
        const pages: Record<string, WikimediaImageInfoPage> = data?.query?.pages
        if (!pages) return null
        const url = Object.values(pages)
          .map((p) => p?.imageinfo?.[0]?.url)
          .find((u) => !!u)
        if (!url) {
          console.warn(`[useWikimediaImage] No imageinfo found for "${decodedFilename}" — file may be missing or renamed on Commons`)
        }
        return url ?? null
      } else if (wikiTitle) {
        // Call Wikipedia REST API to get the article's thumbnail image
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`
        )
        if (!res.ok) {
          console.warn(`[useWikimediaImage] Wikipedia API error ${res.status} for article "${wikiTitle}"`)
          return null
        }
        const data = await res.json()
        return (data?.thumbnail?.source as string) ?? null
      }
      return null
    },
    enabled: !!(decodedFilename ?? wikiTitle),
    staleTime: 1000 * 60 * 60 * 24 * 7,
    retry: 1,
    // Only use the Special:FilePath URL as placeholder (it redirects); Wikipedia titles are not valid img srcs
    placeholderData: isSpecialFilePath ? (specialFilepathOrWikiTitle ?? null) : null,
  })
}
