import { Marker, Popup } from 'react-map-gl/maplibre'
import type { Place, PinnedPlace } from '../../types/places'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { ExternalLink } from 'lucide-react'

function dotStyle(confidence: Place['confidence'], isHighlighted?: boolean): React.CSSProperties {
  const size = isHighlighted ? 16 : 12
  const highlightShadow = '0 0 0 5px rgba(108,47,0,0.35), 0 1px 4px rgba(0,0,0,0.4)'
  const baseShadow = '0 1px 4px rgba(0,0,0,0.3)'

  // high: primary (burnt sienna); medium: tertiary (deep blue); low: hollow (parchment fill, outline border)
  let bg: string, borderColor: string
  if (confidence === 'high') {
    bg = '#6c2f00'; borderColor = '#fcf9f0'
  } else if (confidence === 'medium') {
    bg = '#00446c'; borderColor = '#fcf9f0'
  } else {
    bg = '#fcf9f0'; borderColor = '#877369'
  }

  return {
    width: size,
    height: size,
    borderRadius: '50%',
    background: bg,
    border: `${isHighlighted ? 3 : 2}px solid ${borderColor}`,
    boxShadow: isHighlighted ? highlightShadow : baseShadow,
    opacity: confidence === 'low' ? 0.85 : 1,
    cursor: 'pointer',
  }
}

interface Props {
  place: PinnedPlace
  showLabel?: boolean
  isHighlighted?: boolean
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  entranceIndex?: number
  entranceKey?: string
}

export function PlaceMarker({
  place,
  showLabel,
  isHighlighted,
  isOpen,
  onOpen,
  onClose,
  entranceIndex = 0,
  entranceKey = '',
}: Props) {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const openPlacePanel = useAppStore((s) => s.openPlacePanel)

  // Resolve parsha IDs to names, excluding the currently selected one
  const otherParshas = place.parshas
    .filter((id) => id !== selectedParshaId)
    .map((id) => getParshaById(id))
    .filter(Boolean)

  return (
    <>
      <Marker
        longitude={place.longitude}
        latitude={place.latitude}
        anchor="center"
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          onOpen()
        }}
      >
        <div
          key={entranceKey}
          className="marker-entrance flex flex-col items-center"
          style={{ animationDelay: `${Math.min(entranceIndex * 45, 1200)}ms` }}
          title={place.name}
        >
          <div style={dotStyle(place.confidence, isHighlighted)} />
          {showLabel && (
            <div
              className="mt-0.5 px-1 rounded bg-[#fcf9f0]/85 text-[10px] font-medium text-stone-700 whitespace-nowrap pointer-events-none"
              style={{ textShadow: '0 0 2px #fcf9f0' }}
            >
              {place.name}
            </div>
          )}
        </div>
      </Marker>

      {isOpen && (
        <Popup
          longitude={place.longitude}
          latitude={place.latitude}
          anchor="bottom"
          offset={12}
          maxWidth="280px"
          onClose={onClose}
          closeButton
          closeOnClick={false}
        >
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
      )}
    </>
  )
}
