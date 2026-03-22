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
import { YouAreHereMarker } from './YouAreHereMarker'
import { MapLegend } from './MapLegend'
import { filterPlacesByType } from '../../utils/placeUtils'
import { Navigation, Eye, EyeOff, Layers, Pickaxe, Globe, Crosshair } from 'lucide-react'

const DEFAULT_CENTER: [number, number] = [31.5, 35.5]
const DEFAULT_ZOOM = 6

// ─── Map control pill ─────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-stone-200 mx-2" />
}

interface IconBtnProps {
  onClick: () => void
  active: boolean
  activeColor?: string
  title: string
  icon: React.ReactNode
}

function IconBtn({ onClick, active, activeColor = 'text-amber-500', title, icon }: IconBtnProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2.5 transition-colors ${
        active ? 'bg-stone-100/70' : 'hover:bg-stone-50'
      }`}
    >
      <span className={active ? activeColor : 'text-stone-400'}>{icon}</span>
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

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
  const triggerFitBounds = useAppStore((s) => s.triggerFitBounds)

  const allPlaces = useParshaPlaces(selectedParshaId)
  const places = filterPlacesByType(allPlaces, placeTypeFilter)
  const { era } = useEraContext(currentYearBCE)
  const archaeologicalSites = useArchaeologicalSites(era?.id ?? null)

  return (
    <div className="relative h-full w-full">

      {/* ── Map layer controls — icon-only pill, top-right ── */}
      <div className="absolute top-3 right-3 z-[1000]
        flex flex-col bg-white/90 backdrop-blur-md rounded-xl
        border border-white/70 shadow-md overflow-hidden">

        <IconBtn
          onClick={triggerFitBounds}
          active={false}
          title="Zoom to parsha area"
          icon={<Crosshair size={15} />}
        />
        <Divider />
        <IconBtn
          onClick={toggleTradeRoutes}
          active={showTradeRoutes}
          title="Toggle trade routes"
          icon={<Navigation size={15} />}
        />
        <Divider />
        <IconBtn
          onClick={togglePlaceLabels}
          active={showPlaceLabels}
          title="Toggle place labels"
          icon={showPlaceLabels ? <Eye size={15} /> : <EyeOff size={15} />}
        />
        <Divider />
        <IconBtn
          onClick={toggleTerritories}
          active={showTerritories}
          title="Toggle territory overlays"
          icon={<Layers size={15} />}
        />
        <Divider />
        <IconBtn
          onClick={toggleArchaeologicalSites}
          active={showArchaeologicalSites}
          activeColor="text-purple-500"
          title="Toggle archaeological sites"
          icon={<Pickaxe size={15} />}
        />
        <Divider />
        <button
          onClick={toggleBasemap}
          title="Toggle satellite imagery"
          className={`p-2.5 transition-colors ${
            basemapStyle === 'satellite'
              ? 'bg-stone-800 hover:bg-stone-700'
              : 'hover:bg-stone-50'
          }`}
        >
          <Globe
            size={15}
            className={basemapStyle === 'satellite' ? 'text-amber-400' : 'text-stone-400'}
          />
        </button>
      </div>

      {/* ── Leaflet map ── */}
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
        <YouAreHereMarker places={places} />
        <PlaceHighlightManager />
      </MapContainer>

      {/* ── Legend ── */}
      <MapLegend />

      {/* ── Empty state ── */}
      {!selectedParshaId && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[300]">
          <div className="bg-white/92 backdrop-blur-md rounded-2xl shadow-xl px-7 py-6 text-center max-w-xs border border-white/80">
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
              Select a portion in the <span className="font-medium text-stone-500">sidebar</span> to get started
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
