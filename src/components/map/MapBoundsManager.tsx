import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import type { Place } from '../../types/places'
import { getBoundsForPlaces } from '../../utils/placeUtils'
import { useAppStore } from '../../store/useAppStore'
import { getParshaMapPos } from './MapPositionTracker'

interface Props {
  places: Place[]
  parshaId: string | null
}

export function MapBoundsManager({ places, parshaId }: Props) {
  const map = useMap()
  const fitBoundsKey = useAppStore((s) => s.fitBoundsKey)
  // Track which parshaIds we've already visited this session
  const visitedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!parshaId || places.length === 0) return

    const savedPos = getParshaMapPos(parshaId)
    const isReturn = visitedRef.current.has(parshaId)

    if (savedPos && isReturn) {
      // Returning to a parsha — fly back to where the user was
      map.flyTo([savedPos.lat, savedPos.lng], savedPos.zoom, { animate: true, duration: 1.2 })
    } else {
      // First visit this session — fit all places into view
      visitedRef.current.add(parshaId)
      const bounds = getBoundsForPlaces(places)
      if (bounds) {
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: 12, animate: true, duration: 1.2 })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, places, parshaId, fitBoundsKey])

  return null
}
