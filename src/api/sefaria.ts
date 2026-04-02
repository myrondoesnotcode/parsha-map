import type { SefariaCalendarItem, SefariaCalendarResponse, SefariaTextResponse, SefariaLink, SefariaTopicResponse } from '../types/sefaria'

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
 * Fetch commentary text directly for a specific commentator and parsha.
 * Converts dotted Sefaria URL format (e.g. "Exodus.30.11-34.35") to
 * human ref format ("Exodus 30:11-34:35") and prefixes the commentator name.
 */
export async function fetchCommentaryText(
  commentator: string,
  seferiaUrl: string
): Promise<SefariaTextResponse> {
  // "Exodus.30.11-34.35" → "Exodus 30:11-34:35"
  const humanRef = seferiaUrl.replace('.', ' ').replace(/\./g, ':')
  const ref = encodeURIComponent(`${commentator} on ${humanRef}`)
  const res = await fetch(`${BASE}/texts/${ref}?context=0&pad=0`)
  if (!res.ok) throw new Error(`Sefaria commentary error: ${res.status}`)
  return res.json()
}

/**
 * Fetch the English text of a single verse reference (e.g. "Numbers 27:12").
 * Returns the plain-text string of the verse, or null if unavailable.
 */
export async function fetchVerseText(ref: string): Promise<string | null> {
  // "Numbers 27:12" → "Numbers.27.12"
  const sefariaRef = ref.replace(' ', '.').replace(':', '.')
  const res = await fetch(`${BASE}/texts/${encodeURIComponent(sefariaRef)}?context=0&pad=0`)
  if (!res.ok) return null
  const data: SefariaTextResponse = await res.json()
  const texts = flattenSefariaText(data.text)
  if (!texts.length) return null
  // Strip HTML tags returned by Sefaria
  return texts[0].replace(/<[^>]+>/g, '').trim() || null
}

export async function fetchSefariaTopicBySlug(slug: string): Promise<SefariaTopicResponse | null> {
  const res = await fetch(`${BASE}/topics/${encodeURIComponent(slug)}?with_refs=1`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Sefaria topics error: ${res.status}`)
  return res.json()
}

export async function fetchVerseLinks(ref: string): Promise<SefariaLink[]> {
  const res = await fetch(`${BASE}/links/${encodeURIComponent(ref)}`)
  if (!res.ok) throw new Error(`Sefaria links error: ${res.status}`)
  return res.json()
}

/**
 * Flatten Sefaria text arrays (can be arbitrarily nested) into a flat string[].
 * Each element is one verse or chunk of text.
 */
export function flattenSefariaText(raw: unknown): string[] {
  if (raw == null) return []
  if (typeof raw === 'string') return [raw]
  if (Array.isArray(raw)) {
    const result: string[] = []
    for (const item of raw) {
      if (typeof item === 'string') {
        result.push(item)
      } else if (Array.isArray(item)) {
        result.push(...flattenSefariaText(item))
      }
    }
    return result
  }
  return []
}
