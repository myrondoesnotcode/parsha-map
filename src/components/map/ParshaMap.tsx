import { MapContainer, TileLayer } from 'react-leaflet'
import { useAppStore } from '../../store/useAppStore'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { useEraContext } from '../../hooks/useEraContext'
import { useArchaeologicalSites } from '../../hooks/useArchaeologicalSites'
import { PlaceMarker } from './PlaceMarker'
import { TradeRouteLayer } from './TradeRouteLayer'
import { TerritoryLayer } from './TerritoryLayer'
import { ArchaeologicalSiteMarker } from './ArchaeologicalSiteMarker'
import { PlaceHighlightManager } from './PlaceHighlightManager'
import { MapBoundsManager } from './MapBoundsManager'
import { MapLegend } from './MapLegend'
import { filterPlacesByType } from '../../utils/placeUtils'
import { Navigation, Eye, EyeOff, Layers, Pickaxe, Globe } from 'lucide-react'

const DEFAULT_CENTER: [number, number] = [31.5, 35.5]
const DEFAULT_ZOOM = 6

interface ControlButtonProps {
  onClick: () => void
  active: boolean
  activeColor?: string
  title: string
  icon: React.ReactNode
  label: string
}

function ControlButton({ onClick, active, activeColor = 'text-amber-500', title, icon, label }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition-all duration-150 shadow-sm backdrop-blur-sm ${
        active
          ? 'bg-white/95 border-amber-200 shadow-amber-100/50'
          : 'bg-white/80 border-white/60 hover:bg-white/95 hover:border-stone-200'
      }`}
    >
      <span className={active ? activeColor : 'text-stone-400'}>{icon}</span>
      <span className={`hidden sm:inline font-medium ${active ? 'text-stone-700' : 'text-stone-400'}`}>{label}</span>
    </button>
  )
}

export function ParshaMap() {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const showTradeRoutes = useAppStore((s) => s.showTradeRoutes)
  const showPlaceLabels = useAppStore((s) => s.showPlaceLabels)
  const showTerritories = useAppStore((s) => s.showTerritories)
  const showArchaeologicalSites = useAppStore((s) => s.showArchaeologicalSites)
  const placeTypeFilter = useAppStore((s) => s.placeTypeFilter)
  const highlightedPlaceId = useAppStore((s) => s.highlightedPlaceId)
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const toggleTradeRoutes = useAppStore((s) => s.toggleTradeRoutes)
  const togglePlaceLabels = useAppStore((s) => s.togglePlaceLabels)
  const toggleTerritories = useAppStore((s) => s.toggleTerritories)
  const toggleArchaeologicalSites = useAppStore((s) => s.toggleArchaeologicalSites)
  const basemapStyle = useAppStore((s) => s.basemapStyle)
  const toggleBasemap = useAppStore((s) => s.toggleBasemap)

  const allPlaces = useParshaPlaces(selectedParshaId)
  const places = filterPlacesByType(allPlaces, placeTypeFilter)

  const { era } = useEraContext(currentYearBCE)
  const archaeologicalSites = useArchaeologicalSites(era?.id ?? null)

  return (
    <div className="relative h-full w-full">
      {/* Map controls overlay */}
      <div className="absolute top-10 right-3 z-[1000] flex flex-col gap-1.5">
        <ControlButton
          onClick={toggleTradeRoutes}
          active={showTradeRoutes}
          title="Toggle trade routes"
          icon={<Navigation size={13} />}
          label="Routes"
        />
        <ControlButton
          onClick={togglePlaceLabels}
          active={showPlaceLabels}
          title="Toggle place labels"
          icon={showPlaceLabels ? <Eye size={13} /> : <EyeOff size={13} />}
          label="Labels"
        />
        <ControlButton
          onClick={toggleTerritories}
          active={showTerritories}
          title="Toggle territory overlays"
          icon={<Layers size={13} />}
          label="Territories"
        />
        <ControlButton
          onClick={toggleArchaeologicalSites}
          active={showArchaeologicalSites}
          activeColor="text-purple-500"
          title="Toggle archaeological sites"
          icon={<Pickaxe size={13} />}
          label="Sites"
        />
        <button
          onClick={toggleBasemap}
          title="Toggle satellite view"
          className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition-all duration-150 shadow-sm backdrop-blur-sm ${
            basemapStyle === 'satellite'
              ? 'bg-stone-800/90 border-stone-700 text-amber-400'
              : 'bg-white/80 border-white/60 hover:bg-white/95 hover:border-stone-200 text-stone-400'
          }`}
        >
          <Globe size={13} />
          <span className={`hidden sm:inline font-medium ${basemapStyle === 'satellite' ? 'text-stone-200' : 'text-stone-400'}`}>
            Satellite
          </span>
        </button>
      </div>

      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        zoomControl={false}
      >
        {basemapStyle === 'satellite' ? (
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
            maxZoom={18}
          />
        ) : (
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={18}
            subdomains="abcd"
          />
        )}

        {showTerritories && <TerritoryLayer />}
        {showTradeRoutes && <TradeRouteLayer />}

        {showArchaeologicalSites &&
          archaeologicalSites.map((site) => (
            <ArchaeologicalSiteMarker key={site.id} site={site} />
          ))}

        {places.map((place) => (
          <PlaceMarker
            key={place.id}
            place={place}
            showLabel={showPlaceLabels}
            isHighlighted={place.id === highlightedPlaceId}
          />
        ))}

        <MapBoundsManager places={places} parshaId={selectedParshaId} />
        <PlaceHighlightManager />
      </MapContainer>

      <MapLegend />

      {!selectedParshaId && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[300]">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-7 py-6 text-center max-w-xs border border-white/80">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-3">
              <svg width="22" height="26" viewBox="0 0 20 24" fill="none" aria-hidden="true">
                <path
                  d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
                  fill="#F59E0B"
                />
                <circle cx="10" cy="10" r="3.5" fill="#1C1917" />
              </svg>
            </div>
            <p className="text-stone-700 font-semibold text-sm">Choose a Torah portion</p>
            <p className="text-stone-400 text-xs mt-1 leading-relaxed">
              Biblical places mentioned in the text will appear on the map
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
