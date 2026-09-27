import type { ParshaListItem } from '../types/parsha'

// The gazetteer disambiguates homonyms with a numeric suffix ("Bethel 1");
// readers should only ever see the name itself.
export function displayName(name: string): string {
  return name.replace(/\s+\d+$/, '')
}

export function prettyType(type: string): string {
  const t = type.toLowerCase()
  if (t === 'settlement') return 'City'
  if (t === 'body of water') return 'Water'
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export function parshaDisplayName(name: string): string {
  return name.replace(/-/g, ' ')
}

/** The middle of a parsha's date range, for picking its archaeological era. */
export function eraYear(parsha: ParshaListItem | undefined): number {
  const d = parsha?.approximateDateBCE
  if (d?.start == null) return 1900
  return d.end == null ? d.start : Math.round((d.start + d.end) / 2)
}

/** "Genesis.12.1-17.27" → "Genesis 12:1 – 17:27". */
export function verseRange(seferiaUrl: string): string {
  const m = seferiaUrl.match(/^([^.]+)\.(\d+)\.(\d+)-(\d+)\.(\d+)$/)
  if (!m) return seferiaUrl.replace(/\./g, ' ')
  return `${m[1]} ${m[2]}:${m[3]} – ${m[4]}:${m[5]}`
}
