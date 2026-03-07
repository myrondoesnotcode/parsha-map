import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { Place } from '../../types/places'
import { getBoundsForPlaces } from '../../utils/placeUtils'
import { useAppStore } from '../../store/useAppStore'

interface Props {
  places: Place[]
  parshaId: string | null
}

export function MapBoundsManager({ places, parshaId }: Props) {
  const map = useMap()
  const fitBoundsKey = useAppStore((s) => s.fitBoundsKey)

  useEffect(() => {
    if (!parshaId || places.length === 0) return

    const bounds = getBoundsForPlaces(places)
    if (!bounds) return

    // Pad bounds and fit
    map.fitBounds(bounds, { padding: [20, 20], maxZoom: 12, animate: true, duration: 1.2 })
  }, [map, places, parshaId, fitBoundsKey])

  return null
}
