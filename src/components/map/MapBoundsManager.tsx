import { useEffect } from 'react'
import { useMap } from 'react-map-gl/maplibre'
import type { LngLatBoundsLike } from 'maplibre-gl'
import type { PinnedPlace } from '../../types/places'
import { getBoundsForPlaces } from '../../utils/placeUtils'
import { useAppStore } from '../../store/useAppStore'

interface Props {
  places: PinnedPlace[]
  parshaId: string | null
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function MapBoundsManager({ places, parshaId }: Props) {
  const { current: map } = useMap()
  const fitBoundsKey = useAppStore((s) => s.fitBoundsKey)

  useEffect(() => {
    if (!map || !parshaId || places.length === 0) return
    const bounds = getBoundsForPlaces(places)
    if (!bounds) return

    // getBoundsForPlaces returns [[minLat,minLng],[maxLat,maxLng]]; MapLibre wants lng,lat
    const llBounds: LngLatBoundsLike = [
      [bounds[0][1], bounds[0][0]],
      [bounds[1][1], bounds[1][0]],
    ]

    if (prefersReducedMotion()) {
      map.fitBounds(llBounds, { padding: 40, maxZoom: 12, animate: false })
      return
    }

    // Cinematic fly-in: compute the camera for the bounds, then fly to it
    // with a gentle pitch so the terrain hillshade reads as relief
    const camera = map.getMap().cameraForBounds(llBounds, {
      padding: { top: 60, bottom: 60, left: 40, right: 40 },
      maxZoom: 12,
    })
    if (!camera) return

    map.flyTo({
      center: camera.center,
      zoom: camera.zoom,
      pitch: 32,
      bearing: 0,
      duration: 2400,
      curve: 1.42,
      essential: true,
    })
  }, [map, places, parshaId, fitBoundsKey])

  return null
}

// Mobile tabs hide the map container; MapLibre needs an explicit resize when
// it becomes visible again, plus a re-fit so the parsha stays framed
export function MapResizeHandler() {
  const { current: map } = useMap()
  const triggerFitBounds = useAppStore((s) => s.triggerFitBounds)

  useEffect(() => {
    if (!map) return
    const container = map.getMap().getContainer()
    let wasHidden = container.offsetWidth === 0
    const observer = new ResizeObserver(() => {
      const isNowVisible = container.offsetWidth > 0
      map.getMap().resize()
      if (wasHidden && isNowVisible) {
        triggerFitBounds()
        wasHidden = false
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [map, triggerFitBounds])

  return null
}
