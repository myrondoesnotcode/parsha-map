import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { Place } from '../../types/places'
import { getBoundsForPlaces } from '../../utils/placeUtils'

interface Props {
  places: Place[]
  parshaId: string | null
}

export function MapBoundsManager({ places, parshaId }: Props) {
  const map = useMap()

  useEffect(() => {
    if (!parshaId || places.length === 0) return

    const bounds = getBoundsForPlaces(places)
    if (!bounds) return

    // Pad bounds and fit
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 8 })
  }, [map, places, parshaId])

  return null
}
