import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

export function getParshaById(id: string): ParshaListItem | undefined {
  return parshas.find((p) => p.id === id)
}

export function getParshaForYear(yearBCE: number): ParshaListItem | null {
  const dated = parshas.filter(
    (p) => p.approximateDateBCE.start !== null && p.approximateDateBCE.end !== null
  )
  if (dated.length === 0) return null

  // BCE: start > end numerically (e.g. start=2000, end=1800 = 2000 BCE to 1800 BCE)
  const inRange = dated.filter(
    (p) => yearBCE <= p.approximateDateBCE.start! && yearBCE >= p.approximateDateBCE.end!
  )

  if (inRange.length > 0) {
    // Multiple parshas can share the same date range — pick earliest in Torah sequence
    return inRange.reduce((a, b) => (a.number < b.number ? a : b))
  }

  // No exact range match — find closest parsha by midpoint distance
  return dated.reduce((closest, p) => {
    const mid = (p.approximateDateBCE.start! + p.approximateDateBCE.end!) / 2
    const closestMid = (closest.approximateDateBCE.start! + closest.approximateDateBCE.end!) / 2
    return Math.abs(yearBCE - mid) < Math.abs(yearBCE - closestMid) ? p : closest
  })
}

export function getParshasByBook(book: string): ParshaListItem[] {
  return parshas.filter((p) => p.book === book)
}

export const BOOKS_ORDER = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
] as const

export function getParshasGroupedByBook(): Record<string, ParshaListItem[]> {
  const grouped: Record<string, ParshaListItem[]> = {}
  for (const book of BOOKS_ORDER) {
    grouped[book] = parshas.filter((p) => p.book === book)
  }
  return grouped
}
