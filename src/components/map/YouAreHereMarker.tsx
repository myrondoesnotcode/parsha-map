import { Marker } from 'react-leaflet'
import L from 'leaflet'
import type { Place } from '../../types/places'
import { getCentroidOfPlaces } from '../../utils/placeUtils'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'

function makeYouAreHereIcon(parshaName: string) {
  return L.divIcon({
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
        <div style="position:relative;width:24px;height:24px;">
          <div style="
            position:absolute;inset:0;border-radius:50%;
            background:rgba(245,158,11,0.35);
            animation:parsha-pulse 2s ease-out infinite;
          "></div>
          <div style="
            position:absolute;top:50%;left:50%;
            transform:translate(-50%,-50%);
            width:14px;height:14px;border-radius:50%;
            background:#F59E0B;
            border:2.5px solid white;
            box-shadow:0 1px 6px rgba(0,0,0,0.4);
          "></div>
        </div>
        <div style="
          background:rgba(255,255,255,0.92);
          border:1px solid rgba(245,158,11,0.4);
          border-radius:999px;
          padding:2px 8px;
          white-space:nowrap;
          font-size:10px;
          font-weight:700;
          font-family:Inter,system-ui,sans-serif;
          color:#92400E;
          box-shadow:0 1px 4px rgba(0,0,0,0.15);
          letter-spacing:0.02em;
        ">${parshaName} · Israelites are here</div>
      </div>
      <style>
        @keyframes parsha-pulse {
          0%   { transform:scale(0.5); opacity:1; }
          100% { transform:scale(2.5); opacity:0; }
        }
      </style>
    `,
    className: '',
    iconSize: [160, 52],
    iconAnchor: [80, 12],
    tooltipAnchor: [0, -14],
  })
}

interface Props {
  places: Place[]
}

export function YouAreHereMarker({ places }: Props) {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const centroid = getCentroidOfPlaces(places)
  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  if (!centroid || !parsha) return null

  const icon = makeYouAreHereIcon(parsha.name)

  return (
    <Marker position={[centroid.lat, centroid.lng]} icon={icon} zIndexOffset={600} />
  )
}
