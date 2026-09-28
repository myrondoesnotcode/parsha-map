import datesData from '../data/parshaDates.json'
import eventsData from '../data/worldEvents.json'

export interface Source {
  title: string
  url: string
}

/** The hedged range historians use for a block of parshiot ("often placed c. 2000–1550 BCE"). */
export interface ScholarlyDate {
  label: string
  startBCE?: number
  endBCE?: number
  /** Later dates some scholars give: drawn as a fading tail after the band (the "or later" of the label). */
  laterToBCE?: number
  sources: Source[]
}

/** A year in the traditional Jewish count (Anno Mundi), converted to BCE, for one named event. */
export interface TraditionalDate {
  am: number
  yearBCE: number
  endAm?: number
  endBCE?: number
  event: string
  sources: Source[]
}

export interface ParshaDate {
  scholarly: ScholarlyDate
  traditional: TraditionalDate | null
}

export interface WorldEvent {
  yearBCE: number
  endBCE?: number
  approx: boolean
  description: string
  significance: string
  sources: Source[]
}

export interface ParshaWorld {
  windowStartBCE: number
  windowEndBCE: number
  note: string
  events: WorldEvent[]
}

const dates = datesData as unknown as {
  scholarly: Record<string, ScholarlyDate>
  parshiot: Record<string, { scholarly: string; traditional?: TraditionalDate }>
}
const world = eventsData as unknown as Record<string, ParshaWorld | string>

export function getParshaDate(parshaId: string | null | undefined): ParshaDate | null {
  const p = parshaId ? dates.parshiot[parshaId] : undefined
  const scholarly = p ? dates.scholarly[p.scholarly] : undefined
  if (!p || !scholarly) return null
  return { scholarly, traditional: p.traditional ?? null }
}

/** Dated events for "World around it", or null when the parsha falls back to the era list. */
export function getParshaWorld(parshaId: string | null | undefined): ParshaWorld | null {
  const w = parshaId && !parshaId.startsWith('_') ? world[parshaId] : undefined
  return w && typeof w === 'object' ? w : null
}

/** "c. 1738 BCE", "c. 1314–1313 BCE", "1274 BCE". */
export function formatBCE(start: number, end?: number, approx = true): string {
  const span = end != null && end !== start ? `${start}–${end}` : `${start}`
  return `${approx ? 'c. ' : ''}${span} BCE`
}
