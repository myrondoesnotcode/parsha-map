import { Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import type { Place } from '../../types/places'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { ExternalLink, Navigation } from 'lucide-react'

function googleMapsUrl(place: Place) {
  const query = place.modernName
    ? encodeURIComponent(place.modernName)
    : `${place.latitude},${place.longitude}`
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

// Fix Leaflet's default icon paths broken by bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createPlaceIcon(confidence: Place['confidence'], isHighlighted?: boolean) {
  const size = isHighlighted ? 16 : 12
  const highlightShadow = '0 0 0 5px rgba(251,191,36,0.5), 0 1px 4px rgba(0,0,0,0.4)'
  const baseShadow = '0 1px 4px rgba(0,0,0,0.3)'
  const shadow = isHighlighted ? highlightShadow : baseShadow

  // high: filled amber; medium: filled blue; low: hollow (white fill, grey border)
  let bg: string, borderColor: string, borderWidth: number
  if (confidence === 'high') {
    bg = '#D97706'; borderColor = 'white'; borderWidth = isHighlighted ? 3 : 2
  } else if (confidence === 'medium') {
    bg = '#60A5FA'; borderColor = 'white'; borderWidth = isHighlighted ? 3 : 2
  } else {
    bg = 'white'; borderColor = '#9CA3AF'; borderWidth = isHighlighted ? 3 : 2
  }

  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${bg};
      border: ${borderWidth}px solid ${borderColor};
      box-shadow: ${shadow};
      opacity: ${confidence === 'low' ? 0.85 : 1};
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
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const openPlacePanel = useAppStore((s) => s.openPlacePanel)

  // Resolve parsha IDs to names, excluding the currently selected one
  const otherParshas = place.parshas
    .filter((id) => id !== selectedParshaId)
    .map((id) => getParshaById(id))
    .filter(Boolean)

  return (
    <Marker
      position={[place.latitude, place.longitude]}
      icon={icon}
      title={place.name}
    >
      <Popup maxWidth={280}>
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
              <p className="font-medium text-stone-500 uppercase tracking-wide text-[10px] mb-0.5">
                Verse references
              </p>
              <p className="text-stone-400 text-[10px] mb-1 italic">
                All Torah references to this location
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

          {otherParshas.length > 0 && (
            <div className="pt-0.5 border-t border-stone-100">
              <p className="font-medium text-stone-500 uppercase tracking-wide text-[10px] mb-1.5">
                Also appears in
              </p>
              <div className="flex flex-wrap gap-1">
                {otherParshas.slice(0, 8).map((p) => (
                  <button
                    key={p!.id}
                    onClick={() => setSelectedParsha(p!.id)}
                    className="px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded text-[10px] hover:bg-amber-100 hover:text-amber-800 transition-colors text-left"
                  >
                    {p!.name}
                  </button>
                ))}
                {otherParshas.length > 8 && (
                  <span className="text-stone-400 text-[10px] self-center">
                    +{otherParshas.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="pt-1 flex items-center justify-between gap-1 flex-wrap">
            <div className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{
                  backgroundColor:
                    place.confidence === 'high'
                      ? '#D97706'
                      : place.confidence === 'medium'
                      ? '#60A5FA'
                      : 'white',
                  border: place.confidence === 'low' ? '1.5px solid #9CA3AF' : 'none',
                }}
              />
              <span className="text-stone-400 capitalize">{place.confidence} confidence</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={googleMapsUrl(place)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Navigation size={10} />
                Directions
              </a>
              <button
                onClick={() => openPlacePanel(place.id, 'place')}
                className="flex items-center gap-1 text-[10px] text-amber-700 hover:text-amber-900 transition-colors"
              >
                <ExternalLink size={10} />
                Details
              </button>
            </div>
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
