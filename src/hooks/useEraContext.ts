import { useMemo } from 'react'
import timeline from '../data/timeline.json'
import materialCulture from '../data/materialCulture.json'
import type { Era, MaterialCultureEntry } from '../types/timeline'

const eras = timeline as Era[]
const culture = materialCulture as Record<string, MaterialCultureEntry>

export function useEraContext(yearBCE: number) {
  return useMemo(() => {
    const era = eras.find((e) => yearBCE <= e.startBCE && yearBCE >= e.endBCE) ?? null
    const cultureEntry = era ? (culture[era.id] ?? null) : null
    return { era, cultureEntry }
  }, [yearBCE])
}
