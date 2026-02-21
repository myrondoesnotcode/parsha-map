import powersData from '../data/powers.json'
import type { HistoricalPower } from '../types/powers'

const powers = powersData as HistoricalPower[]

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, '')
}

export function getPowerByLabel(label: string): HistoricalPower | undefined {
  const normalizedLabel = normalize(label)
  return powers.find(
    (p) =>
      normalize(p.name) === normalizedLabel ||
      p.alternateNames.some((a) => normalize(a) === normalizedLabel) ||
      normalize(p.name).includes(normalizedLabel) ||
      normalizedLabel.includes(normalize(p.name))
  )
}

export function getPowerById(id: string): HistoricalPower | undefined {
  return powers.find((p) => p.id === id)
}

export { powers as allPowers }
