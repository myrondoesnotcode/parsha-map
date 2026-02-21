import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

export function getParshaById(id: string): ParshaListItem | undefined {
  return parshas.find((p) => p.id === id)
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
