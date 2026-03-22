import { Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import type { Place } from '../../types/places'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { ExternalLink } from 'lucide-react'

// Fix Leaflet's default icon paths broken by bundlers
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createPlaceIcon(confidence: Place['confidence'], isHighlighted?: boolean) {
  const size = isHighlighted ? 16 : 12
  const highlightShadow = '0 0 0 5px rgba(108,47,0,0.35), 0 1px 4px rgba(0,0,0,0.4)'
  const baseShadow = '0 1px 4px rgba(0,0,0,0.3)'
  const shadow = isHighlighted ? highlightShadow : baseShadow

  // high: primary (burnt sienna); medium: tertiary (deep blue); low: hollow (parchment fill, outline border)
  let bg: string, borderColor: string, borderWidth: number
  if (confidence === 'high') {
    bg = '#6c2f00'; borderColor = '#fcf9f0'; borderWidth = isHighlighted ? 3 : 2
  } else if (confidence === 'medium') {
    bg = '#00446c'; borderColor = '#fcf9f0'; borderWidth = isHighlighted ? 3 : 2
  } else {
    bg = '#fcf9f0'; borderColor = '#877369'; borderWidth = isHighlighted ? 3 : 2
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
            <p className="font-headline font-semibold text-on-surface text-sm">{place.name}</p>
            {place.alternateNames.length > 0 && (
              <p className="font-label text-on-surface-variant">
                Also: {place.alternateNames.join(', ')}
              </p>
            )}
            {place.modernName && (
              <p className="font-label text-on-surface-variant">Modern: {place.modernName}</p>
            )}
          </div>

          {place.description && (
            <p className="font-body text-on-surface-variant leading-relaxed">{place.description}</p>
          )}

          {place.verses.length > 0 && (
            <div>
              <p className="font-label font-medium text-on-surface-variant uppercase tracking-widest text-[10px] mb-0.5">
                Verse references
              </p>
              <p className="font-label text-on-surface-variant/60 text-[10px] mb-1 italic">
                All Torah references to this location
              </p>
              <div className="flex flex-wrap gap-1">
                {place.verses.slice(0, 6).map((v) => (
                  <span
                    key={v}
                    className="px-1.5 py-0.5 bg-secondary-container font-label text-on-surface rounded text-[10px]"
                  >
                    {v}
                  </span>
                ))}
                {place.verses.length > 6 && (
                  <span className="font-label text-on-surface-variant text-[10px]">
                    +{place.verses.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          {otherParshas.length > 0 && (
            <div className="pt-0.5">
              <p className="font-label font-medium text-on-surface-variant uppercase tracking-widest text-[10px] mb-1.5">
                Also appears in
              </p>
              <div className="flex flex-wrap gap-1">
                {otherParshas.slice(0, 8).map((p) => (
                  <button
                    key={p!.id}
                    onClick={() => setSelectedParsha(p!.id)}
                    className="px-1.5 py-0.5 bg-surface-container font-label text-on-surface rounded text-[10px] hover:bg-primary-container hover:text-on-primary-container transition-colors text-left"
                  >
                    {p!.name}
                  </button>
                ))}
                {otherParshas.length > 8 && (
                  <span className="font-label text-on-surface-variant text-[10px] self-center">
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
                      ? '#6c2f00'
                      : place.confidence === 'medium'
                      ? '#00446c'
                      : '#fcf9f0',
                  border: place.confidence === 'low' ? '1.5px solid #877369' : 'none',
                }}
              />
              <span className="font-label text-on-surface-variant capitalize">{place.confidence} confidence</span>
            </div>
            <button
              onClick={() => openPlacePanel(place.id, 'place')}
              className="flex items-center gap-1 font-label text-[10px] text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink size={10} />
              Details
            </button>
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
