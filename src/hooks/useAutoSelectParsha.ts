import { useEffect } from 'react'
import { useCurrentParsha } from './useCurrentParsha'
import { useAppStore } from '../store/useAppStore'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '')
}

/** Parse a Sefaria URL like "Exodus.30.11-34.35" into book + chapter range. */
function parseSefariaUrlRange(url: string): { book: string; startChapter: number; endChapter: number } | null {
  // "Book.startChap.startVerse-endChap.endVerse"
  const rangeMatch = url.match(/^([^.]+)\.(\d+)\.\d+-(\d+)\.\d+$/)
  if (rangeMatch) {
    return { book: rangeMatch[1], startChapter: parseInt(rangeMatch[2], 10), endChapter: parseInt(rangeMatch[3], 10) }
  }
  // "Book.chap.verse" (no range)
  const singleMatch = url.match(/^([^.]+)\.(\d+)\.\d+$/)
  if (singleMatch) {
    const ch = parseInt(singleMatch[2], 10)
    return { book: singleMatch[1], startChapter: ch, endChapter: ch }
  }
  return null
}

export function useAutoSelectParsha() {
  const { data: currentParsha } = useCurrentParsha()
  const parshaInitialized = useAppStore((s) => s.parshaInitialized)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const setParshaInitialized = useAppStore((s) => s.setParshaInitialized)

  useEffect(() => {
    if (parshaInitialized || !currentParsha) return

    const displayName = currentParsha.displayValue?.en ?? ''

    // Try exact normalized match first, then partial match
    const normalized = normalize(displayName)
    let match: ParshaListItem | undefined =
      parshas.find((p) => normalize(p.name) === normalized) ??
      parshas.find(
        (p) =>
          normalize(p.name).includes(normalized) ||
          normalized.includes(normalize(p.name))
      )

    // Fallback: match by passage reference (handles holiday readings like
    // "Pesach Shabbat Chol haMoed" where url = "Exodus.33.12-34.26")
    if (!match && currentParsha.url) {
      const calRef = parseSefariaUrlRange(currentParsha.url)
      if (calRef) {
        match = parshas.find((p) => {
          if (!p.seferiaUrl || p.book !== calRef.book) return false
          const parshaRange = parseSefariaUrlRange(p.seferiaUrl)
          if (!parshaRange) return false
          return calRef.startChapter === parshaRange.startChapter
        })
      }
    }

    if (match) {
      setSelectedParsha(match.id)
    }
    // Always mark initialized so we don't keep retrying on non-matching weeks
    setParshaInitialized()
  }, [currentParsha, parshaInitialized, setSelectedParsha, setParshaInitialized])
}
