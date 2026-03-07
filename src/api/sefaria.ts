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

export interface CommentaryEntry {
  chapter: number
  verse: number
  en: string
  he: string
}

function extractCommentaryText(raw: unknown): string {
  if (!raw) return ''
  if (typeof raw === 'string') return raw.replace(/<[^>]+>/g, '').trim()
  if (Array.isArray(raw)) {
    return (raw as unknown[]).map(extractCommentaryText).filter(Boolean).join(' ')
  }
  return ''
}

/**
 * Fetch classical commentary for a parsha by requesting each chapter separately
 * via the Sefaria texts API (e.g. "Rashi on Exodus 30").
 * More reliable than the links endpoint for multi-chapter ranges.
 */
export async function fetchCommentaryForParsha(
  seferiaUrl: string,
  commentator: string
): Promise<CommentaryEntry[]> {
  // Parse "Exodus.30.11-34.35" → book="Exodus", chapters=[30..34]
  const match = seferiaUrl.match(/^([A-Za-z]+)\.(\d+)\.\d+-(\d+)\.\d+$/)
  if (!match) return []
  const [, book, startStr, endStr] = match
  const start = parseInt(startStr)
  const end = parseInt(endStr)

  const chapters: number[] = []
  for (let ch = start; ch <= end; ch++) chapters.push(ch)

  const results = await Promise.all(
    chapters.map(async (ch) => {
      const ref = `${commentator} on ${book} ${ch}`
      try {
        const res = await fetch(
          `${BASE}/texts/${encodeURIComponent(ref)}?context=0&pad=0`
        )
        if (!res.ok) return []
        const data = await res.json()
        const rawEn = data.text
        const rawHe = data.he
        if (!Array.isArray(rawEn)) return []
        const entries: CommentaryEntry[] = []
        for (let i = 0; i < (rawEn as unknown[]).length; i++) {
          const en = extractCommentaryText((rawEn as unknown[])[i])
          const he = Array.isArray(rawHe)
            ? extractCommentaryText((rawHe as unknown[])[i])
            : ''
          if (en || he) {
            entries.push({ chapter: ch, verse: i + 1, en, he })
          }
        }
        return entries
      } catch {
        return []
      }
    })
  )

  return results.flat()
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
