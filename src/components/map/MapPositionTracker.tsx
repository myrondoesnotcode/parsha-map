import { useEffect } from 'react'
import { useMapEvents } from 'react-leaflet'
import { useAppStore } from '../../store/useAppStore'

export interface SavedMapPos { lat: number; lng: number; zoom: number }

export function getParshaMapPos(parshaId: string): SavedMapPos | null {
  try {
    const raw = localStorage.getItem(`parsha-map-pos-${parshaId}`)
    return raw ? (JSON.parse(raw) as SavedMapPos) : null
  } catch {
    return null
  }
}

function setParshaMapPos(parshaId: string, pos: SavedMapPos) {
  try {
    localStorage.setItem(`parsha-map-pos-${parshaId}`, JSON.stringify(pos))
  } catch { /* quota exceeded, ignore */ }
}

export function MapPositionTracker() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  const map = useMapEvents({
    moveend() {
      if (!selectedParshaId) return
      const c = map.getCenter()
      setParshaMapPos(selectedParshaId, { lat: c.lat, lng: c.lng, zoom: map.getZoom() })
    },
  })

  // Clear saved "you are here" dot position on first visit to a new parsha
  // (handled in MapBoundsManager — nothing extra needed here)

  useEffect(() => {
    // When parsha changes, the MapBoundsManager decides whether to restore or fit.
    // This component only writes on moveend.
  }, [selectedParshaId])

  return null
}
