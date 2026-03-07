import { useEffect } from 'react'
import { useCurrentParsha } from './useCurrentParsha'
import { useAppStore } from '../store/useAppStore'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '')
}

export function useAutoSelectParsha() {
  const { data: currentParsha } = useCurrentParsha()
  const parshaInitialized = useAppStore((s) => s.parshaInitialized)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const setParshaInitialized = useAppStore((s) => s.setParshaInitialized)

  useEffect(() => {
    if (parshaInitialized || !currentParsha) return

    const displayName = currentParsha.displayValue?.en ?? ''
    if (!displayName) return

    const normalized = normalize(displayName)

    // Try exact normalized match first, then partial match
    const match =
      parshas.find((p) => normalize(p.name) === normalized) ??
      parshas.find(
        (p) =>
          normalize(p.name).includes(normalized) ||
          normalized.includes(normalize(p.name))
      )

    if (match) {
      setSelectedParsha(match.id)
      setParshaInitialized()
    }
  }, [currentParsha, parshaInitialized, setSelectedParsha, setParshaInitialized])
}
