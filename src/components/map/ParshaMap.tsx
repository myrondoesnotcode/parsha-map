import { useCallback, useMemo, useState } from 'react'
import Map from 'react-map-gl/maplibre'
import type { MapLayerMouseEvent } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useAppStore } from '../../store/useAppStore'
import { useParshaPlaces } from '../../hooks/useParshaPlaces'
import { useEraContext } from '../../hooks/useEraContext'
import { useArchaeologicalSites } from '../../hooks/useArchaeologicalSites'
import { PlaceMarker } from './PlaceMarker'
import { TradeRouteLayer, TRADE_ROUTE_LAYER_ID } from './TradeRouteLayer'
import { TerritoryLayer, TERRITORY_FILL_LAYER_ID } from './TerritoryLayer'
import { ArchaeologicalSiteMarker } from './ArchaeologicalSiteMarker'
import { PlaceHighlightManager } from './PlaceHighlightManager'
import { MapBoundsManager, MapResizeHandler } from './MapBoundsManager'
import { YouAreHereMarker } from './YouAreHereMarker'
import { MapLegend } from './MapLegend'
import { MapHoverPopup } from './MapHoverPopup'
import type { HoverInfo } from './MapHoverPopup'
import { filterPlacesByType } from '../../utils/placeUtils'
import { isPinned } from '../../types/places'
import { parchmentStyle, satelliteStyle } from '../../map/mapStyles'
import { Navigation, Eye, EyeOff, Layers, Pickaxe, Globe, Crosshair } from 'lucide-react'

const DEFAULT_CENTER = { longitude: 35.5, latitude: 31.5 }
const DEFAULT_ZOOM = 6

export interface OpenPopup {
  kind: 'place' | 'site'
  id: string
}

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
  // Places with an unknown site stay in the text highlights but get no marker.
  const places = filterPlacesByType(allPlaces, placeTypeFilter).filter(isPinned)
  const { era } = useEraContext(currentYearBCE)
  const archaeologicalSites = useArchaeologicalSites(era?.id ?? null)

  const [openPopup, setOpenPopup] = useState<OpenPopup | null>(null)
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null)

  const interactiveLayerIds = useMemo(() => {
    const ids: string[] = []
    if (showTradeRoutes) ids.push(TRADE_ROUTE_LAYER_ID)
    if (showTerritories) ids.push(TERRITORY_FILL_LAYER_ID)
    return ids
  }, [showTradeRoutes, showTerritories])

  const onMouseMove = useCallback((e: MapLayerMouseEvent) => {
    const feature = e.features?.[0]
    if (!feature) {
      setHoverInfo(null)
      e.target.getCanvas().style.cursor = ''
      return
    }
    e.target.getCanvas().style.cursor = 'pointer'
    setHoverInfo({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
      layerId: feature.layer.id,
      properties: feature.properties as Record<string, string>,
    })
  }, [])

  const onMouseLeave = useCallback((e: MapLayerMouseEvent) => {
    setHoverInfo(null)
    e.target.getCanvas().style.cursor = ''
  }, [])

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

      {/* ── MapLibre map ── */}
      <Map
        initialViewState={{ ...DEFAULT_CENTER, zoom: DEFAULT_ZOOM }}
        mapStyle={basemapStyle === 'satellite' ? satelliteStyle : parchmentStyle}
        style={{ height: '100%', width: '100%' }}
        attributionControl={{ compact: true }}
        interactiveLayerIds={interactiveLayerIds}
        onMouseMove={interactiveLayerIds.length > 0 ? onMouseMove : undefined}
        onMouseLeave={interactiveLayerIds.length > 0 ? onMouseLeave : undefined}
        onClick={() => setOpenPopup(null)}
      >
        {showTerritories && <TerritoryLayer />}
        {showTradeRoutes && <TradeRouteLayer />}

        {showArchaeologicalSites &&
          archaeologicalSites.map((site) => (
            <ArchaeologicalSiteMarker
              key={site.id}
              site={site}
              isOpen={openPopup?.kind === 'site' && openPopup.id === site.id}
              onOpen={() => setOpenPopup({ kind: 'site', id: site.id })}
              onClose={() => setOpenPopup(null)}
            />
          ))}

        {places.map((place, i) => (
          <PlaceMarker
            key={place.id}
            place={place}
            entranceIndex={i}
            entranceKey={selectedParshaId ?? 'none'}
            showLabel={showPlaceLabels}
            isHighlighted={place.id === highlightedPlaceId}
            isOpen={openPopup?.kind === 'place' && openPopup.id === place.id}
            onOpen={() => setOpenPopup({ kind: 'place', id: place.id })}
            onClose={() => setOpenPopup(null)}
          />
        ))}

        {hoverInfo && <MapHoverPopup info={hoverInfo} />}

        <MapBoundsManager places={places} parshaId={selectedParshaId} />
        <YouAreHereMarker places={places} />
        <PlaceHighlightManager />
        <MapResizeHandler />
      </Map>

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
