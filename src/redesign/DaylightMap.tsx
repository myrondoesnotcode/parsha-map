import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Map, { Source, Layer, Marker } from 'react-map-gl/maplibre'
import type { MapLayerMouseEvent, MapRef } from 'react-map-gl/maplibre'
import type { GeoJSONSource } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { animate, motion, AnimatePresence } from 'motion/react'
import { useAppStore } from '../store/useAppStore'
import { useParshaPlaces } from '../hooks/useParshaPlaces'
import { filterPlacesByType } from '../utils/placeUtils'
import { TradeRouteLayer } from '../components/map/TradeRouteLayer'
import { TerritoryLayer } from '../components/map/TerritoryLayer'
import { daylightStyle } from './daylightMapStyle'
import { getStory } from './stories'
import type { LngLat } from './stories'
import { useDaylight, mapHandle, haptic } from './useDaylight'
import { C, FONT, SPRING, SHADOW } from './theme'
import { displayName } from './placeText'

// ─── Journey line geometry ────────────────────────────────────────────────────

/**
 * Join the stops with gentle travel arcs (quadratic curves bowed to one side),
 * and remember where each stop lands. Arcs never overshoot, and a there-and-back
 * leg bows the other way on the return, so both directions stay visible.
 */
function densify(points: LngLat[], samples = 32) {
  const coords: LngLat[] = []
  const stopIndex: number[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay] = points[i]
    const [bx, by] = points[i + 1]
    const dx = bx - ax
    const dy = by - ay
    const bow = 0.14
    const cx = (ax + bx) / 2 - dy * bow
    const cy = (ay + by) / 2 + dx * bow
    stopIndex.push(coords.length)
    for (let s = 0; s < samples; s++) {
      const t = s / samples
      const u = 1 - t
      coords.push([u * u * ax + 2 * u * t * cx + t * t * bx, u * u * ay + 2 * u * t * cy + t * t * by])
    }
  }
  stopIndex.push(coords.length)
  coords.push(points[points.length - 1])
  return { coords, stopIndex }
}

/** The part of the journey drawn so far, where `d` counts stops (fractions allowed). */
function lineUpTo(coords: LngLat[], stopIndex: number[], d: number): LngLat[] {
  if (coords.length === 0) return []
  if (d <= 0) return [coords[0], coords[0]]
  const last = stopIndex.length - 1
  if (d >= last) return coords
  const k = Math.floor(d)
  const pos = stopIndex[k] + (stopIndex[k + 1] - stopIndex[k]) * (d - k)
  const i = Math.floor(pos)
  const frac = pos - i
  const a = coords[i]
  const b = coords[i + 1] ?? a
  return [...coords.slice(0, i + 1), [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]]
}

function lineFeature(coords: LngLat[]) {
  return { type: 'Feature' as const, properties: {}, geometry: { type: 'LineString' as const, coordinates: coords } }
}

// ─── Camera padding per screen (keeps the subject clear of sheets and chrome) ──

const PAD_TODAY = { top: 120, bottom: 420, left: 48, right: 90 }
const PAD_MAP = { top: 230, bottom: 130, left: 40, right: 90 }
const PAD_STORY = { top: 90, bottom: 320, left: 30, right: 30 }

export function DaylightMap() {
  const mapRef = useRef<MapRef | null>(null)
  const [loaded, setLoaded] = useState(false)

  const parshaId = useAppStore((s) => s.selectedParshaId)
  const placeTypeFilter = useAppStore((s) => s.placeTypeFilter)
  const { tab, storyOpen, storyIndex, selectedPlaceId, showTrade, showEmpires, selectPlace, setTab } = useDaylight()

  const story = getStory(parshaId)
  const card = storyOpen && story ? story.cards[storyIndex] : null

  const allPlaces = useParshaPlaces(parshaId)
  const places = useMemo(() => filterPlacesByType(allPlaces, placeTypeFilter), [allPlaces, placeTypeFilter])
  const selectedPlace = allPlaces.find((p) => p.id === selectedPlaceId) ?? null

  const geometry = useMemo(() => (story ? densify(story.route.map((s) => s.at)) : null), [story])

  // Stops that sit on top of an earlier stop at the current zoom get a compact marker and no label.
  const [crowded, setCrowded] = useState<boolean[]>([])
  const measure = useCallback(() => {
    const map = mapRef.current
    if (!map || !story) return
    const pts = story.route.map((s) => map.project(s.at))
    setCrowded(pts.map((p, i) => pts.slice(0, i).some((q) => Math.hypot(p.x - q.x, p.y - q.y) < 34)))
  }, [story])
  useEffect(() => measure(), [measure, loaded])

  // ── Journey drawing: animate how many stops the line has reached ──
  const drawnRef = useRef(0)
  const [drawn, setDrawn] = useState(0)
  const target = !story ? 0 : card ? card.routeTo : story.route.length - 1

  const pushLine = useCallback(
    (d: number) => {
      const src = mapRef.current?.getSource('dl-route') as GeoJSONSource | undefined
      if (src && geometry) src.setData(lineFeature(lineUpTo(geometry.coords, geometry.stopIndex, d)))
    },
    [geometry]
  )

  // Restart the drawing from the first stop whenever the parsha changes.
  useEffect(() => {
    drawnRef.current = 0
    setDrawn(0)
    pushLine(0)
  }, [parshaId, pushLine])

  useEffect(() => {
    if (!loaded || !geometry) return
    const from = drawnRef.current
    const delta = Math.abs(target - from)
    if (delta < 0.001) return
    const opening = !storyOpen && from === 0
    const controls = animate(from, target, {
      duration: target < from ? 0.5 : Math.min(2.6, 0.7 + delta * 0.55),
      delay: opening ? 1.6 : storyOpen ? 0.45 : 0,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => {
        drawnRef.current = v
        setDrawn(v)
        pushLine(v)
      },
    })
    return () => controls.stop()
  }, [loaded, geometry, target, storyOpen, pushLine])

  // A small tap each time the line reaches a new stop.
  const reached = Math.floor(drawn + 0.02)
  const lastReached = useRef(-1)
  useEffect(() => {
    if (reached > lastReached.current && drawn > 0.02) haptic('light')
    lastReached.current = reached
  }, [reached, drawn])

  // ── Camera ──
  const bounds = useMemo(() => {
    const pts: LngLat[] = story
      ? story.route.map((s) => s.at)
      : (allPlaces.filter((p) => p.confidence !== 'low').length ? allPlaces.filter((p) => p.confidence !== 'low') : allPlaces).map(
          (p) => [p.longitude, p.latitude] as LngLat
        )
    if (pts.length === 0) return null
    const lngs = pts.map((p) => p[0])
    const lats = pts.map((p) => p[1])
    return [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ] as [LngLat, LngLat]
  }, [story, allPlaces])

  useEffect(() => {
    const map = mapRef.current
    if (!loaded || !map) return
    if (card) {
      if ((card.kind === 'name' || card.kind === 'talk') && bounds) {
        map.fitBounds(bounds, { padding: { top: 110, bottom: card.kind === 'talk' ? 440 : 400, left: 50, right: 50 }, pitch: 20, bearing: 0, duration: 2400, essential: true })
      } else {
        map.flyTo({ ...card.camera, duration: 2400, curve: 1.35, padding: PAD_STORY, essential: true })
      }
      return
    }
    if (selectedPlace) {
      map.flyTo({
        center: [selectedPlace.longitude, selectedPlace.latitude],
        zoom: Math.max(map.getZoom(), 8.2),
        pitch: 45,
        padding: { top: 200, bottom: 340, left: 30, right: 30 },
        duration: 1600,
        essential: true,
      })
      return
    }
    if (!bounds || (tab !== 'today' && tab !== 'map')) return
    map.fitBounds(bounds, {
      padding: tab === 'today' ? PAD_TODAY : PAD_MAP,
      pitch: tab === 'today' ? 38 : 20,
      bearing: tab === 'today' ? -8 : 0,
      maxZoom: 8.5,
      duration: 2600,
      essential: true,
    })
  }, [loaded, card, selectedPlace, bounds, tab])

  // ── Place dots (all places in the parsha) ──
  const stopNames = useMemo(() => new Set(story?.route.map((s) => s.name) ?? []), [story])
  const dots = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: places
        .filter((p) => !stopNames.has(displayName(p.name)))
        .map((p) => ({
          type: 'Feature' as const,
          properties: { id: p.id, name: displayName(p.name), selected: p.id === selectedPlaceId ? 1 : 0 },
          geometry: { type: 'Point' as const, coordinates: [p.longitude, p.latitude] },
        })),
    }),
    [places, stopNames, selectedPlaceId]
  )

  const onClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const f = e.features?.[0]
      if (!f) {
        if (!storyOpen) selectPlace(null)
        return
      }
      haptic('light')
      selectPlace(String(f.properties?.id))
      if (tab === 'today') setTab('map')
    },
    [storyOpen, selectPlace, tab, setTab]
  )

  const onMapTab = tab === 'map' && !storyOpen

  useEffect(() => {
    const m = mapRef.current?.getMap()
    if (!loaded || !m?.getLayer('label-places')) return
    m.setLayoutProperty('label-places', 'visibility', onMapTab ? 'visible' : 'none')
  }, [loaded, onMapTab])
  const dotsVisible = !storyOpen

  return (
    <Map
      ref={(r) => {
        mapRef.current = r
        mapHandle.current = r
      }}
      initialViewState={{ longitude: 38.5, latitude: 32.5, zoom: 3.1, pitch: 0 }}
      mapStyle={daylightStyle}
      style={{ position: 'absolute', inset: 0 }}
      attributionControl={{ compact: true }}
      interactiveLayerIds={dotsVisible ? ['dl-dots'] : []}
      onClick={onClick}
      onLoad={(e) => {
        setLoaded(true)
        // Start with the attribution collapsed to its (i) button.
        e.target.getContainer().querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show')
      }}
      onMoveEnd={measure}
      dragRotate={false}
    >
      {showEmpires && <TerritoryLayer />}
      {showTrade && <TradeRouteLayer />}

      <Source id="dl-dots-src" type="geojson" data={dots}>
        <Layer
          id="dl-dots"
          type="circle"
          paint={{
            'circle-radius': ['case', ['==', ['get', 'selected'], 1], 9, onMapTab ? 6 : 4.5],
            'circle-color': ['case', ['==', ['get', 'selected'], 1], C.warm, C.white],
            'circle-stroke-color': C.blue,
            'circle-stroke-width': onMapTab ? 2.5 : 2,
            'circle-opacity': dotsVisible ? 1 : 0,
            'circle-stroke-opacity': dotsVisible ? (onMapTab ? 1 : 0.6) : 0,
          }}
        />
        <Layer
          id="dl-dot-labels"
          type="symbol"
          minzoom={onMapTab ? 5.5 : 22}
          layout={{
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans Regular'],
            'text-size': 12,
            'text-offset': [0.9, 0],
            'text-anchor': 'left',
            'text-optional': true,
          }}
          paint={{ 'text-color': C.ink, 'text-halo-color': 'rgba(255,255,255,0.9)', 'text-halo-width': 1.6 }}
        />
      </Source>

      {geometry && (
        <Source id="dl-route" type="geojson" data={lineFeature(lineUpTo(geometry.coords, geometry.stopIndex, drawnRef.current))}>
          <Layer
            id="dl-route-casing"
            type="line"
            layout={{ 'line-cap': 'round', 'line-join': 'round' }}
            paint={{ 'line-color': C.white, 'line-width': 9, 'line-opacity': 0.85 }}
          />
          <Layer
            id="dl-route-line"
            type="line"
            layout={{ 'line-cap': 'round', 'line-join': 'round' }}
            paint={{ 'line-color': C.blue, 'line-width': 4.5 }}
          />
        </Source>
      )}

      {story?.route.map((stop, i) => {
        const visible = drawn >= i - 0.02
        const active = card?.stop === i + 1
        const small = !!crowded[i] && !active
        const showLabel = (!storyOpen && !crowded[i]) || active
        return (
          <Marker key={stop.name} longitude={stop.at[0]} latitude={stop.at[1]} anchor="center">
            <AnimatePresence>
              {visible && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: active ? 1.25 : small ? 0.55 : 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={SPRING.snappy}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                >
                  {active && (
                    <motion.span
                      style={{ position: 'absolute', left: -12, top: -12, width: 56, height: 56, borderRadius: 28, background: C.warm }}
                      initial={{ scale: 0.4, opacity: 0.5 }}
                      animate={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <span
                    style={{
                      position: 'relative',
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      background: active ? C.warm : C.blue,
                      color: active ? C.ink : C.white,
                      border: `3px solid ${C.white}`,
                      boxShadow: SHADOW.float,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      font: `800 13px ${FONT.display}`,
                      boxSizing: 'border-box',
                    }}
                  >
                    {i + 1}
                  </span>
                  <AnimatePresence>
                    {showLabel && (
                      <motion.span
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.15 }}
                        style={{
                          position: 'absolute',
                          left: 38,
                          whiteSpace: 'nowrap',
                          background: 'rgba(255,255,255,0.92)',
                          padding: '3px 9px',
                          borderRadius: 10,
                          font: `${active ? 800 : 600} 13px ${FONT.display}`,
                          color: C.ink,
                        }}
                      >
                        {stop.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </Marker>
        )
      })}

      {card?.spot && (
        <Marker key={card.spot.name} longitude={card.spot.at[0]} latitude={card.spot.at[1]} anchor="center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...SPRING.snappy, delay: 1.4 }}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <motion.span
              style={{ position: 'absolute', left: -14, top: -14, width: 48, height: 48, borderRadius: 24, border: `2px solid ${C.warm}` }}
              animate={{ scale: [0.6, 1.3], opacity: [0.9, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <span style={{ width: 20, height: 20, borderRadius: 10, background: C.warm, border: `3px solid ${C.white}`, boxShadow: SHADOW.float, boxSizing: 'border-box' }} />
            <span
              style={{
                position: 'absolute',
                left: 28,
                whiteSpace: 'nowrap',
                background: 'rgba(255,255,255,0.92)',
                padding: '3px 9px',
                borderRadius: 10,
                font: `800 13px ${FONT.display}`,
                color: C.ink,
              }}
            >
              {card.spot.name}
            </span>
          </motion.div>
        </Marker>
      )}
    </Map>
  )
}
