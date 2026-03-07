import { useEffect, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'
import { getParshaForYear } from '../utils/parshaUtils'

/**
 * When the user drags the timeline slider, auto-selects the parsha whose
 * date range best matches the current year. Debounced to avoid flickering
 * while scrubbing.
 *
 * Guards against infinite loops: `yearSource` in the store is set to 'parsha'
 * whenever `setSelectedParsha` updates `currentYearBCE`, so we skip auto-
 * selection in that case.
 */
export function useAutoSelectParshaByYear() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const yearSource = useAppStore((s) => s.yearSource)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)

  // Track latest yearSource in a ref so the debounce callback reads the
  // value at fire-time rather than at schedule-time.
  const yearSourceRef = useRef(yearSource)
  yearSourceRef.current = yearSource

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      // Only act when the year change originated from the slider
      if (yearSourceRef.current !== 'slider') return

      const parsha = getParshaForYear(currentYearBCE)
      if (parsha) {
        setSelectedParsha(parsha.id)
      }
    }, 350)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentYearBCE, setSelectedParsha])
}
