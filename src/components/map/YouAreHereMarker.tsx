import { Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { useAppStore } from '../../store/useAppStore'
import { getParshaMapPos } from './MapPositionTracker'

const youAreHereIcon = L.divIcon({
  html: `
    <div style="position:relative;width:20px;height:20px;">
      <div style="
        position:absolute;inset:0;border-radius:50%;
        background:rgba(59,130,246,0.25);
        animation:yah-pulse 2s ease-out infinite;
      "></div>
      <div style="
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        width:12px;height:12px;border-radius:50%;
        background:#3B82F6;
        border:2.5px solid white;
        box-shadow:0 1px 4px rgba(0,0,0,0.4);
      "></div>
    </div>
    <style>
      @keyframes yah-pulse {
        0%   { transform:scale(0.6); opacity:0.9; }
        100% { transform:scale(2.2); opacity:0; }
      }
    </style>
  `,
  className: '',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  tooltipAnchor: [0, -12],
})

export function YouAreHereMarker() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  if (!selectedParshaId) return null
  const pos = getParshaMapPos(selectedParshaId)
  if (!pos) return null

  return (
    <Marker position={[pos.lat, pos.lng]} icon={youAreHereIcon} zIndexOffset={500}>
      <Tooltip direction="top" offset={[0, -12]} opacity={0.95} permanent={false}>
        <span style={{ fontSize: 11, fontWeight: 600 }}>You were here</span>
      </Tooltip>
    </Marker>
  )
}
