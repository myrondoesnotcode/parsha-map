import { useEffect } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import { useAppStore } from '../../store/useAppStore'
import placesData from '../../data/places.json'
import { isPinned, type Place } from '../../types/places'

const allPlaces = placesData as Place[]

export function PlaceHighlightManager() {
  const { current: map } = useMap()
  const highlightedPlaceId = useAppStore((s) => s.highlightedPlaceId)

  useEffect(() => {
    if (!map || !highlightedPlaceId) return

    const place = allPlaces.find((p) => p.id === highlightedPlaceId)
    if (!place || !isPinned(place)) return

    map.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 9,
      duration: 1200,
      essential: true,
    })
  }, [highlightedPlaceId, map])

  return null
}
