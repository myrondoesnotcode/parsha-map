import type { SefariaCalendarItem, SefariaCalendarResponse, SefariaTextResponse, SefariaLink } from '../types/sefaria'

const BASE = 'https://www.sefaria.org/api'

export async function fetchCurrentParsha(): Promise<SefariaCalendarItem | null> {
  const res = await fetch(`${BASE}/calendars?diaspora=1`)
  if (!res.ok) throw new Error(`Sefaria calendars error: ${res.status}`)
  const data: SefariaCalendarResponse = await res.json()
  const item = data.calendar_items.find(
    (c) => c.title.en === 'Parashat Hashavua'
  )
  return item ?? null
}

export async function fetchParshaText(seferiaUrl: string): Promise<SefariaTextResponse> {
  const res = await fetch(`${BASE}/texts/${seferiaUrl}?context=0&pad=0`)
  if (!res.ok) throw new Error(`Sefaria texts error: ${res.status}`)
  return res.json()
}

export async function fetchLinksForParsha(ref: string): Promise<SefariaLink[]> {
  const res = await fetch(`${BASE}/links/${encodeURIComponent(ref)}?with_text=1`)
  if (!res.ok) throw new Error(`Sefaria links error: ${res.status}`)
  return res.json()
}

/**
 * Flatten Sefaria text arrays (can be nested string[][]) into a flat string[].
 * Each element is one verse or chunk of text.
 */
export function flattenSefariaText(raw: string | string[] | string[][]): string[] {
  if (typeof raw === 'string') return [raw]
  if (raw.length === 0) return []
  if (typeof raw[0] === 'string') return raw as string[]
  // string[][]
  return (raw as string[][]).flat()
}
