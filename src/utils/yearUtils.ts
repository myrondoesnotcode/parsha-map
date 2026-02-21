import timeline from '../data/timeline.json'
import type { Era } from '../types/timeline'

const eras = timeline as Era[]

export function formatYearBCE(year: number): string {
  return `c. ${year.toLocaleString()} BCE`
}

export function getEraForYear(yearBCE: number): Era | null {
  return eras.find((era) => yearBCE <= era.startBCE && yearBCE >= era.endBCE) ?? null
}

// Slider stores year as BCE positive integer (3300 = oldest, 400 = most recent)
// The Radix slider itself is inverted so left = oldest, right = most recent
export const SLIDER_MIN = 400
export const SLIDER_MAX = 4500
