import { useMemo } from 'react'
import timeline from '../data/timeline.json'
import materialCulture from '../data/materialCulture.json'
import type { Era, MaterialCultureEntry } from '../types/timeline'

const eras = timeline as Era[]
const culture = materialCulture as Record<string, MaterialCultureEntry>

/** The archaeological era for a year; no era for null (an undated parsha). */
export function useEraContext(yearBCE: number | null) {
  return useMemo(() => {
    const era = yearBCE == null ? null : eras.find((e) => yearBCE <= e.startBCE && yearBCE >= e.endBCE) ?? null
    const cultureEntry = era ? (culture[era.id] ?? null) : null
    return { era, cultureEntry }
  }, [yearBCE])
}
