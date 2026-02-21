import { Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import type { Place } from '../../types/places'

// Fix Leaflet's default icon paths broken by bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createPlaceIcon(confidence: Place['confidence'], isHighlighted?: boolean) {
  const colors: Record<Place['confidence'], string> = {
    high: '#D97706',
    medium: '#6B7280',
    low: '#9CA3AF',
  }
  const color = colors[confidence]
  const size = isHighlighted ? 16 : 12
  const border = isHighlighted ? 3 : 2
  const shadow = isHighlighted
    ? '0 0 0 5px rgba(251,191,36,0.5), 0 1px 4px rgba(0,0,0,0.4)'
    : '0 1px 4px rgba(0,0,0,0.4)'
  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      border: ${border}px solid white;
      box-shadow: ${shadow};
    "></div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -8],
  })
}

interface Props {
  place: Place
  showLabel?: boolean
  isHighlighted?: boolean
}

export function PlaceMarker({ place, showLabel, isHighlighted }: Props) {
  const icon = createPlaceIcon(place.confidence, isHighlighted)

  return (
    <Marker
      position={[place.latitude, place.longitude]}
      icon={icon}
      title={place.name}
    >
      <Popup maxWidth={260}>
        <div className="text-xs space-y-1.5">
          <div>
            <p className="font-semibold text-stone-900 text-sm">{place.name}</p>
            {place.alternateNames.length > 0 && (
              <p className="text-stone-400">
                Also: {place.alternateNames.join(', ')}
              </p>
            )}
            {place.modernName && (
              <p className="text-stone-400">Modern: {place.modernName}</p>
            )}
          </div>

          {place.description && (
            <p className="text-stone-600 leading-relaxed">{place.description}</p>
          )}

          {place.verses.length > 0 && (
            <div>
              <p className="font-medium text-stone-500 uppercase tracking-wide text-[10px] mb-1">
                Verse references
              </p>
              <div className="flex flex-wrap gap-1">
                {place.verses.slice(0, 6).map((v) => (
                  <span
                    key={v}
                    className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px]"
                  >
                    {v}
                  </span>
                ))}
                {place.verses.length > 6 && (
                  <span className="text-stone-400 text-[10px]">
                    +{place.verses.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="pt-1 flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{
                backgroundColor:
                  place.confidence === 'high'
                    ? '#D97706'
                    : place.confidence === 'medium'
                    ? '#6B7280'
                    : '#9CA3AF',
              }}
            />
            <span className="text-stone-400 capitalize">{place.confidence} confidence</span>
          </div>
        </div>
      </Popup>
      {showLabel && (
        <Tooltip permanent direction="top" offset={[0, -8]} opacity={0.9}>
          <span className="text-[10px] font-medium text-stone-700">{place.name}</span>
        </Tooltip>
      )}
    </Marker>
  )
}
