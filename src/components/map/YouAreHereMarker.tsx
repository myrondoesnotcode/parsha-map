import { Marker } from 'react-map-gl/maplibre'
import type { PinnedPlace } from '../../types/places'
import { getCentroidOfPlaces } from '../../utils/placeUtils'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'

interface Props {
  places: PinnedPlace[]
}

export function YouAreHereMarker({ places }: Props) {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const centroid = getCentroidOfPlaces(places)
  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  if (!centroid || !parsha) return null

  return (
    <Marker
      longitude={centroid.lng}
      latitude={centroid.lat}
      anchor="top"
      style={{ zIndex: 600 }}
    >
      <div className="flex flex-col items-center gap-1 pointer-events-none" style={{ transform: 'translateY(-12px)' }}>
        <div className="relative w-6 h-6">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'rgba(245,158,11,0.35)',
              animation: 'parsha-pulse 2s ease-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-3.5 h-3.5 rounded-full"
            style={{
              transform: 'translate(-50%,-50%)',
              background: '#F59E0B',
              border: '2.5px solid white',
              boxShadow: '0 1px 6px rgba(0,0,0,0.4)',
            }}
          />
        </div>
        <div
          className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(245,158,11,0.4)',
            color: '#92400E',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            letterSpacing: '0.02em',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {parsha.name} · Israelites are here
        </div>
      </div>
    </Marker>
  )
}
