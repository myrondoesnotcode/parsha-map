import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ExternalLink, Navigation } from 'lucide-react'
import type { ArchaeologicalSite } from '../../hooks/useArchaeologicalSites'
import { useAppStore } from '../../store/useAppStore'

function googleMapsUrl(site: ArchaeologicalSite) {
  const query = site.alternateNames[0]
    ? encodeURIComponent(`${site.name}, ${site.alternateNames[0]}`)
    : `${site.latitude},${site.longitude}`
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

function createDiamondIcon() {
  return L.divIcon({
    html: `<div style="
      width: 12px;
      height: 12px;
      background: #2d6a4f;
      border: 2px solid #fcf9f0;
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
      transform: rotate(45deg);
    "></div>`,
    className: '',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -10],
  })
}

const diamondIcon = createDiamondIcon()

interface Props {
  site: ArchaeologicalSite
}

export function ArchaeologicalSiteMarker({ site }: Props) {
  const openPlacePanel = useAppStore((s) => s.openPlacePanel)

  return (
    <Marker
      position={[site.latitude, site.longitude]}
      icon={diamondIcon}
      title={site.name}
    >
      <Popup maxWidth={280}>
        <div className="text-xs space-y-1.5">
          <div>
            <p className="font-headline font-semibold text-on-surface text-sm">{site.name}</p>
            {site.alternateNames.length > 0 && (
              <p className="font-label text-on-surface-variant">
                Also: {site.alternateNames.join(', ')}
              </p>
            )}
          </div>

          <p className="font-body text-on-surface-variant leading-relaxed">{site.description}</p>

          {site.significance && (
            <div className="pt-1">
              <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest mb-0.5">
                Significance
              </p>
              <p className="font-body text-primary text-[11px]">{site.significance}</p>
            </div>
          )}

          <div className="flex items-center justify-between gap-1 pt-0.5 flex-wrap">
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: '#2d6a4f',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                }}
              />
              <span className="font-label text-on-surface-variant text-[10px]">Archaeological Site</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={googleMapsUrl(site)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-label text-[10px] text-tertiary hover:text-tertiary/80 transition-colors"
              >
                <Navigation size={10} />
                Directions
              </a>
              <button
                onClick={() => openPlacePanel(site.id, 'site')}
                className="flex items-center gap-1 font-label text-[10px] text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink size={10} />
                Details
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
