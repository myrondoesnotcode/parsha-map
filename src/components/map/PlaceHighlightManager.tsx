import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import { useAppStore } from '../../store/useAppStore'
import placesData from '../../data/places.json'
import { isPinned, type Place, type PinnedPlace } from '../../types/places'

// The map can only show places with a known site; unpinned ones carry a locationNote instead.
const allPlaces: PinnedPlace[] = (placesData as Place[]).filter(isPinned)

export function PlaceHighlightManager() {
  const map = useMap()
  const highlightedPlaceId = useAppStore((s) => s.highlightedPlaceId)

  useEffect(() => {
    if (!highlightedPlaceId) return

    const place = allPlaces.find((p) => p.id === highlightedPlaceId)
    if (!place) return

    map.flyTo([place.latitude, place.longitude], 9, { duration: 1.2 })
  }, [highlightedPlaceId, map])

  return null
}
