import type { ParshaListItem } from '../types/parsha'
import { getParshaDate } from './parshaDates'

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

/** The name of one Shabbat's reading: "Lech Lecha", or both halves of a double, "Vayakhel–Pekudei". */
export function readingName(names: string[]): string {
  return names.map(parshaDisplayName).join('–')
}

/**
 * The middle of the scholarly range historians use for a parsha (src/data/parshaDates.json), for picking
 * its archaeological era. Null when historians give it no date (Creation, the Flood): those parshiot
 * get no era card rather than being pinned to an arbitrary age.
 */
export function eraYear(parsha: ParshaListItem | undefined): number | null {
  const s = getParshaDate(parsha?.id)?.scholarly
  if (s?.startBCE == null || s.endBCE == null) return null
  return Math.round((s.startBCE + s.endBCE) / 2)
}

/** "Genesis.12.1-17.27" → "Genesis 12:1 – 17:27". */
export function verseRange(seferiaUrl: string): string {
  const m = seferiaUrl.match(/^([^.]+)\.(\d+)\.(\d+)-(\d+)\.(\d+)$/)
  if (!m) return seferiaUrl.replace(/\./g, ' ')
  return `${m[1]} ${m[2]}:${m[3]} – ${m[4]}:${m[5]}`
}
