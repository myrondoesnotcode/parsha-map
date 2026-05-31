import { useEffect } from 'react'
import { useCurrentParsha } from './useCurrentParsha'
import { useAppStore } from '../store/useAppStore'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '')
}

interface SefariaRef {
  book: string
  startChapter: number
  startVerse: number
  endChapter: number
  endVerse: number
}

/** Parse a Sefaria URL like "Exodus.30.11-34.35" into book + chapter/verse range. */
function parseSefariaUrlRange(url: string): SefariaRef | null {
  // "Book.startChap.startVerse-endChap.endVerse"
  const rangeMatch = url.match(/^([^.]+)\.(\d+)\.(\d+)-(\d+)\.(\d+)$/)
  if (rangeMatch) {
    return {
      book: rangeMatch[1],
      startChapter: parseInt(rangeMatch[2], 10),
      startVerse: parseInt(rangeMatch[3], 10),
      endChapter: parseInt(rangeMatch[4], 10),
      endVerse: parseInt(rangeMatch[5], 10),
    }
  }
  // "Book.chap.verse" (no range)
  const singleMatch = url.match(/^([^.]+)\.(\d+)\.(\d+)$/)
  if (singleMatch) {
    const ch = parseInt(singleMatch[2], 10)
    const v = parseInt(singleMatch[3], 10)
    return { book: singleMatch[1], startChapter: ch, startVerse: v, endChapter: ch, endVerse: v }
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
    const normalized = normalize(displayName)

    // 1. Exact normalized name match.
    let match: ParshaListItem | undefined = parshas.find(
      (p) => normalize(p.name) === normalized
    )

    // 2. Match by passage reference. This is the canonical signal — Sefaria
    // names vary by apostrophe/spelling ("Sh'lach" vs "Shelach", "Beha'alotcha"
    // vs "Beha'alotecha"), and combined parshas ("Acharei Mot-Kedoshim") have
    // no single name entry. The URL range disambiguates all of these. Run this
    // BEFORE loose substring matching to avoid false positives like
    // "Sh'lach" → "Vayishlach" (substring of `vayishlach`).
    if (!match && currentParsha.url) {
      const calRef = parseSefariaUrlRange(currentParsha.url)
      if (calRef) {
        // Prefer an exact start-position match (same book, chapter, verse).
        // Combined parshas ("Acharei Mot-Kedoshim", "Nitzavim-Vayeilech")
        // always begin at the same place as their first half, so this
        // uniquely picks the first parsha of the pair — even when the
        // previous parsha ends in the same chapter (e.g. Ki Tavo ends at
        // Deut 29:8, Nitzavim starts at 29:9).
        match = parshas.find((p) => {
          if (!p.seferiaUrl || p.book !== calRef.book) return false
          const pr = parseSefariaUrlRange(p.seferiaUrl)
          if (!pr) return false
          return pr.startChapter === calRef.startChapter && pr.startVerse === calRef.startVerse
        })
        // Fallback: containment check for holiday readings whose range sits
        // inside a regular parsha (e.g. Pesach chol haMoed → Ki Tisa).
        if (!match) {
          match = parshas.find((p) => {
            if (!p.seferiaUrl || p.book !== calRef.book) return false
            const pr = parseSefariaUrlRange(p.seferiaUrl)
            if (!pr) return false
            const afterStart =
              calRef.startChapter > pr.startChapter ||
              (calRef.startChapter === pr.startChapter && calRef.startVerse >= pr.startVerse)
            const beforeEnd =
              calRef.startChapter < pr.endChapter ||
              (calRef.startChapter === pr.endChapter && calRef.startVerse <= pr.endVerse)
            return afterStart && beforeEnd
          })
        }
      }
    }

    // 3. Last-resort loose name match — only if both sides are long enough
    // that a substring hit is meaningful. Guards against short names like
    // "Tzav" appearing inside unrelated combined names.
    if (!match && normalized.length >= 5) {
      match = parshas.find((p) => {
        const pn = normalize(p.name)
        if (pn.length < 5) return false
        return pn.includes(normalized) || normalized.includes(pn)
      })
    }

    if (match) {
      setSelectedParsha(match.id)
    }
    // Always mark initialized so we don't keep retrying on non-matching weeks
    setParshaInitialized()
  }, [currentParsha, parshaInitialized, setSelectedParsha, setParshaInitialized])
}
