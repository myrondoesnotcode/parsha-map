export interface Place {
  id: string
  name: string
  alternateNames: string[]
  /** null when the site is unknown: listed, but not pinned (see locationNote). */
  latitude: number | null
  longitude: number | null
  locationNote?: string
  confidence: 'high' | 'medium' | 'low'
  type: string
  verses: string[]
  parshas: string[]
  description?: string
  modernName?: string
}

export type PinnedPlace = Place & { latitude: number; longitude: number }

export function isPinned(p: Place): p is PinnedPlace {
  return p.latitude != null && p.longitude != null
}
