import { MapContainer, TileLayer } from 'react-leaflet'
import { useAppStore } from '../../store/useAppStore'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { useEraContext } from '../../hooks/useEraContext'
import { useArchaeologicalSites } from '../../hooks/useArchaeologicalSites'
import { PlaceMarker } from './PlaceMarker'
import { TradeRouteLayer } from './TradeRouteLayer'
import { TerritoryLayer } from './TerritoryLayer'
import { ArchaeologicalSiteMarker } from './ArchaeologicalSiteMarker'
import { PlaceTypeFilter } from './PlaceTypeFilter'
import { PlaceHighlightManager } from './PlaceHighlightManager'
import { MapBoundsManager } from './MapBoundsManager'
import { MapLegend } from './MapLegend'
import { filterPlacesByType } from '../../utils/placeUtils'
import { Map as MapIcon, Navigation, Eye, EyeOff, Layers, Pickaxe } from 'lucide-react'

// Center on ancient Near East
const DEFAULT_CENTER: [number, number] = [31.5, 35.5]
const DEFAULT_ZOOM = 6

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

  const allPlaces = useParshaPlaces(selectedParshaId)
  const places = filterPlacesByType(allPlaces, placeTypeFilter)

  const { era } = useEraContext(currentYearBCE)
  const archaeologicalSites = useArchaeologicalSites(era?.id ?? null)

  return (
    <div className="relative h-full w-full">
      {/* Map controls overlay */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-2">
        <button
          onClick={toggleTradeRoutes}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg shadow-sm hover:bg-stone-50 transition-colors"
          title="Toggle trade routes"
        >
          <Navigation size={12} className={showTradeRoutes ? 'text-amber-600' : 'text-stone-400'} />
          <span className={showTradeRoutes ? 'text-stone-700' : 'text-stone-400'}>Routes</span>
        </button>
        <button
          onClick={togglePlaceLabels}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg shadow-sm hover:bg-stone-50 transition-colors"
          title="Toggle place labels"
        >
          {showPlaceLabels ? (
            <Eye size={12} className="text-amber-600" />
          ) : (
            <EyeOff size={12} className="text-stone-400" />
          )}
          <span className={showPlaceLabels ? 'text-stone-700' : 'text-stone-400'}>Labels</span>
        </button>
        <button
          onClick={toggleTerritories}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg shadow-sm hover:bg-stone-50 transition-colors"
          title="Toggle territory overlays"
        >
          <Layers size={12} className={showTerritories ? 'text-amber-600' : 'text-stone-400'} />
          <span className={showTerritories ? 'text-stone-700' : 'text-stone-400'}>Territories</span>
        </button>
        <button
          onClick={toggleArchaeologicalSites}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white border border-stone-200 rounded-lg shadow-sm hover:bg-stone-50 transition-colors"
          title="Toggle archaeological sites"
        >
          <Pickaxe size={12} className={showArchaeologicalSites ? 'text-purple-600' : 'text-stone-400'} />
          <span className={showArchaeologicalSites ? 'text-stone-700' : 'text-stone-400'}>Sites</span>
        </button>
      </div>

      {/* Place count badge + type filter */}
      <div className="absolute top-3 left-3 z-[400] flex flex-col gap-2">
        {allPlaces.length > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg shadow-sm text-xs text-stone-600">
            <MapIcon size={12} className="text-amber-600" />
            <span>{places.length} place{places.length !== 1 ? 's' : ''} mapped</span>
          </div>
        )}
        {allPlaces.length > 0 && (
          <div className="bg-white bg-opacity-95 border border-stone-200 rounded-lg shadow-sm px-2 py-1.5">
            <PlaceTypeFilter />
          </div>
        )}
      </div>

      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          maxZoom={18}
          subdomains="abcd"
        />

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
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-5 text-center max-w-xs border border-stone-200">
            <div className="text-4xl mb-3">🗺️</div>
            <p className="text-stone-700 font-medium">Select a Parsha</p>
            <p className="text-stone-400 text-sm mt-1">
              Biblical places will appear on the map
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
