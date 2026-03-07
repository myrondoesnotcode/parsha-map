import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { ExternalLink } from 'lucide-react'
import type { ArchaeologicalSite } from '../../hooks/useArchaeologicalSites'
import { useAppStore } from '../../store/useAppStore'

function createDiamondIcon() {
  return L.divIcon({
    html: `<div style="
      width: 12px;
      height: 12px;
      background: #7C3AED;
      border: 2px solid white;
      box-shadow: 0 1px 4px rgba(0,0,0,0.5);
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
            <p className="font-semibold text-stone-900 text-sm">{site.name}</p>
            {site.alternateNames.length > 0 && (
              <p className="text-stone-400">
                Also: {site.alternateNames.join(', ')}
              </p>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed">{site.description}</p>

          {site.significance && (
            <div className="pt-1 border-t border-stone-100">
              <p className="text-[10px] uppercase font-medium text-stone-400 mb-0.5">
                Significance
              </p>
              <p className="text-amber-700 text-[11px]">{site.significance}</p>
            </div>
          )}

          <div className="flex items-center justify-between gap-1 pt-0.5">
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: '#7C3AED',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                }}
              />
              <span className="text-stone-400 text-[10px]">Archaeological Site</span>
            </div>
            <button
              onClick={() => openPlacePanel(site.id, 'site')}
              className="flex items-center gap-1 text-[10px] text-amber-700 hover:text-amber-900 transition-colors"
            >
              <ExternalLink size={10} />
              Details
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
