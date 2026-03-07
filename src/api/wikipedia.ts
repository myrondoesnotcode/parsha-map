export interface WikipediaSummary {
  title: string
  extract: string
  thumbnail?: {
    source: string
    width: number
    height: number
  }
  content_urls?: {
    desktop: { page: string }
  }
  type: string // 'standard', 'disambiguation', 'no-extract'
}

export async function fetchWikipediaSummary(title: string): Promise<WikipediaSummary | null> {
  const encoded = encodeURIComponent(title.replace(/ /g, '_'))
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`

  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  })

  if (!res.ok) return null

  const data: WikipediaSummary = await res.json()

  // Disambiguations and missing extracts aren't useful
  if (data.type === 'disambiguation' || !data.extract) return null

  return data
}
