import type { Place } from '../types/places'

export function getPlacesForParsha(places: Place[], parshaId: string): Place[] {
  return places.filter((p) => p.parshas.includes(parshaId))
}

export function getBoundsForPlaces(
  places: Place[]
): [[number, number], [number, number]] | null {
  if (places.length === 0) return null

  const lats = places.map((p) => p.latitude)
  const lngs = places.map((p) => p.longitude)

  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ]
}

export interface PlaceTypeFilter {
  id: string
  label: string
  match: string[]
}

export const PLACE_TYPE_FILTERS: PlaceTypeFilter[] = [
  { id: 'all', label: 'All', match: [] },
  {
    id: 'settlement',
    label: 'Cities',
    match: ['city', 'town', 'village', 'settlement', 'ruins', 'tell', 'camp'],
  },
  {
    id: 'water',
    label: 'Waters',
    match: ['river', 'sea', 'lake', 'well', 'spring', 'brook', 'stream', 'ford', 'pool'],
  },
  {
    id: 'mountain',
    label: 'Mountains',
    match: ['mountain', 'hill', 'mount', 'peak', 'ridge', 'valley', 'pass', 'plateau'],
  },
  {
    id: 'region',
    label: 'Regions',
    match: ['region', 'land', 'wilderness', 'desert', 'plain', 'field', 'country'],
  },
]

export function filterPlacesByType(places: Place[], filterId: string): Place[] {
  if (filterId === 'all') return places
  const filter = PLACE_TYPE_FILTERS.find((f) => f.id === filterId)
  if (!filter || filter.match.length === 0) return places

  return places.filter((p) => {
    const type = (p.type ?? '').toLowerCase()
    const name = p.name.toLowerCase()
    return filter.match.some((keyword) => type.includes(keyword) || name.includes(keyword))
  })
}
