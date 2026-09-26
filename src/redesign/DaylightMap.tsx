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
import { getStory, MISHKAN_AT } from './stories'
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

// ─── Tabernacle plan, drawn to scale on the ground (1 cubit ≈ 0.5 m) ──────────

function offset(at: LngLat, dx: number, dy: number): LngLat {
  return [at[0] + dx / (111320 * Math.cos((at[1] * Math.PI) / 180)), at[1] + dy / 110900]
}

/** Metres per CSS pixel at MapLibre zoom `z` (512 px tiles). */
function metresPerPx(z: number, lat: number) {
  return (40075016.686 * Math.cos((lat * Math.PI) / 180)) / (512 * 2 ** z)
}

/**
 * The courtyard drawn in metres (1 cubit ≈ 0.5 m), east to the right:
 * 100 × 50 cubits of hangings on posts every 5 cubits, a 20-cubit screen at the
 * east gate, the altar (5 × 5) inside the gate, and the tent (30 × 10) in the
 * western half with the Holy of Holies at its far end (Exodus 26–27).
 */
function TabernaclePlan({ zoom }: { zoom: number }) {
  // Size the SVG to its whole viewBox (52 × 27 m incl. margin) so 1 unit = 1 metre.
  const mpp = metresPerPx(zoom, MISHKAN_AT[1])
  // Posts are schematic (every 5 cubits); the text counts 20 per long side, 10 per short side.
  const posts: [number, number][] = []
  for (let x = 0; x <= 50; x += 2.5) posts.push([x, 0], [x, 25])
  for (let y = 2.5; y < 25; y += 2.5) posts.push([0, y], [50, y])
  return (
    <motion.svg
      width={52 / mpp}
      height={27 / mpp}
      viewBox="-1 -1 52 27"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.8 }}
      style={{ display: 'block', overflow: 'visible', filter: 'drop-shadow(0 1px 1.5px rgba(23,24,43,0.25))' }}
    >
      <rect x={0} y={0} width={50} height={25} fill={C.white} fillOpacity={0.82} stroke={C.blue} strokeWidth={0.35} strokeDasharray="1.2 0.6" />
      <rect x={50 - 0.35} y={7.5} width={0.7} height={10} fill={C.warm} />
      {/* Tent 30 × 10 cubits with 20 cubits clear behind it, entrance at the 50-cubit mark (Rashi on Exodus 27:18). */}
      <rect x={10} y={10} width={15} height={5} fill={C.blue} rx={0.2} />
      <rect x={10} y={10} width={5} height={5} fill={C.ink} rx={0.2} />
      <line x1={15} y1={10} x2={15} y2={15} stroke={C.white} strokeWidth={0.2} />
      {/* Altar before the entrance (Ex 40:29); its exact spot in the forecourt is not given, so it is placed schematically. */}
      <rect x={36.75} y={11.25} width={2.5} height={2.5} fill={C.warm} stroke={C.ink} strokeWidth={0.15} />
      {posts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={0.32} fill={C.blue} />
      ))}
    </motion.svg>
  )
}

/**
 * Design exploration: what surrounds the to-scale plan so the ground isn't empty.
 * camp = the camp of Numbers 2–3 around it · grid = a surveyor's grid with dimension lines.
 */
type PlanMode = 'camp' | 'grid'
// Vayikra uses the grid: the camp order is given a month later (Numbers 1:1, 2–3). The camp is for Bamidbar.
const PLAN_PARAM = new URLSearchParams(window.location.search).get('plan')
/** Camp only outside Vayikra (and only when asked for); it is for Bamidbar. */
function planModeFor(parshaId: string | null): PlanMode {
  return PLAN_PARAM === 'camp' && parshaId !== 'vayikra' ? 'camp' : 'grid'
}

/** The plan card's camera depends on the treatment; other cards use their own. */
function cameraFor(card: { kind: string; camera: { center: LngLat; zoom: number; pitch?: number; bearing?: number } }, mode: PlanMode) {
  if (card.kind !== 'plan') return card.camera
  if (mode === 'camp') return { center: MISHKAN_AT, zoom: 17.25, pitch: 52, bearing: -18 }
  return { center: MISHKAN_AT, zoom: 18.4, pitch: 48, bearing: -24 }
}

/** Deterministic scatter so the camp looks the same every time. */
function scatter(seed: number, n: number, x0: number, y0: number, w: number, h: number) {
  let t = seed
  const rnd = () => {
    t = (t * 16807) % 2147483647
    return t / 2147483647
  }
  return Array.from({ length: n }, () => ({ x: x0 + rnd() * w, y: y0 + rnd() * h, r: rnd() > 0.5 ? 0 : 90 }))
}

/**
 * The camp around the Tent of Meeting (Numbers 2–3), drawn in metres around the
 * courtyard, north up. Levites close in on all four sides, the four tribal
 * divisions beyond. Arrangement from the text; distances and tent counts are illustrative.
 */
const CAMP_EXTENT = 240
const CAMP_BANDS = [
  // Levites: Moses & Aaron east, Gershon west, Kohath south, Merari north.
  { x: 30, y: -14, w: 14, h: 28, n: 26, c: C.warm },
  { x: -46, y: -14, w: 14, h: 28, n: 26, c: C.blue },
  { x: -25, y: 17, w: 50, h: 12, n: 34, c: C.blue },
  { x: -25, y: -29, w: 50, h: 12, n: 34, c: C.blue },
  // Tribes: Judah east, Reuben south, Ephraim west, Dan north.
  { x: 58, y: -45, w: 52, h: 90, n: 150, c: C.ink },
  { x: -45, y: 40, w: 90, h: 52, n: 150, c: C.ink },
  { x: -110, y: -45, w: 52, h: 90, n: 150, c: C.ink },
  { x: -45, y: -92, w: 90, h: 52, n: 150, c: C.ink },
]
function Camp() {
  const tents = useMemo(() => CAMP_BANDS.flatMap((b, i) => scatter(i * 7919 + 13, b.n * 2, b.x, b.y, b.w, b.h).map((t) => ({ ...t, c: b.c }))), [])
  const px = CAMP_EXTENT / metresPerPx(17.25, MISHKAN_AT[1])
  const h = CAMP_EXTENT / 2
  return (
    <motion.svg width={px} height={px} viewBox={`${-h} ${-h} ${CAMP_EXTENT} ${CAMP_EXTENT}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 2.2 }} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="dl-camp-fade">
          <stop offset="0.55" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="dl-camp-mask">
          <rect x={-h} y={-h} width={CAMP_EXTENT} height={CAMP_EXTENT} fill="url(#dl-camp-fade)" />
        </mask>
      </defs>
      {/* Trodden ground under the camp, so it reads as a place rather than dots on sand. */}
      <circle cx={0} cy={0} r={h * 0.92} fill="#e6d3b0" fillOpacity={0.55} mask="url(#dl-camp-mask)" />
      <g mask="url(#dl-camp-mask)">
        {tents.map((t, i) => (
          <rect key={i} x={t.x} y={t.y} width={t.r ? 1.8 : 2.8} height={t.r ? 2.8 : 1.8} rx={0.5} fill={t.c === C.ink ? '#b08a57' : t.c} fillOpacity={t.c === C.ink ? 0.75 : 0.85} />
        ))}
      </g>
    </motion.svg>
  )
}

/** A surveyor's grid: 5-cubit squares, heavier every 25 cubits, fading out at the edges. */
function SurveyGrid() {
  const size = 200
  const h = size / 2
  const px = size / metresPerPx(18.4, MISHKAN_AT[1])
  const lines = []
  for (let v = -h; v <= h; v += 2.5) {
    const major = Math.abs(v % 12.5) < 0.01
    lines.push(<line key={`x${v}`} x1={v} y1={-h} x2={v} y2={h} stroke={C.blue} strokeOpacity={major ? 0.28 : 0.1} strokeWidth={major ? 0.18 : 0.08} />)
    lines.push(<line key={`y${v}`} x1={-h} y1={v} x2={h} y2={v} stroke={C.blue} strokeOpacity={major ? 0.28 : 0.1} strokeWidth={major ? 0.18 : 0.08} />)
  }
  const dim = { stroke: C.ink, strokeWidth: 0.2 }
  return (
    <motion.svg width={px} height={px} viewBox={`${-h} ${-h} ${size} ${size}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <radialGradient id="dl-grid-fade">
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="dl-grid-mask">
          <rect x={-h} y={-h} width={size} height={size} fill="url(#dl-grid-fade)" />
        </mask>
      </defs>
      <rect x={-h} y={-h} width={size} height={size} fill="#f7f1e4" mask="url(#dl-grid-mask)" />
      <g mask="url(#dl-grid-mask)">{lines}</g>
      {/* Dimension lines: 100 cubits along the north side, 50 along the west. */}
      <g {...dim}>
        <line x1={-25} y1={-17} x2={25} y2={-17} />
        <line x1={-25} y1={-18.5} x2={-25} y2={-15.5} />
        <line x1={25} y1={-18.5} x2={25} y2={-15.5} />
        <line x1={-31} y1={-12.5} x2={-31} y2={12.5} />
        <line x1={-32.5} y1={-12.5} x2={-29.5} y2={-12.5} />
        <line x1={-32.5} y1={12.5} x2={-29.5} y2={12.5} />
      </g>
      <text x={0} y={-18.6} textAnchor="middle" style={{ font: `700 2.4px ${FONT.display}`, fill: C.ink }}>100 cubits</text>
      <text x={-32.6} y={0} textAnchor="middle" transform="rotate(-90 -32.6 0)" style={{ font: `700 2.4px ${FONT.display}`, fill: C.ink }}>50 cubits</text>
    </motion.svg>
  )
}

const CAMP_LABELS = [
  // Each division is three tribes (Numbers 2).
  { text: 'Judah · Issachar · Zebulun', at: offset(MISHKAN_AT, 72, -10), strong: true },
  { text: 'Reuben · Simeon · Gad', at: offset(MISHKAN_AT, 0, -66), strong: true },
  { text: 'Ephraim · Manasseh · Benjamin', at: offset(MISHKAN_AT, -70, 8), strong: true },
  { text: 'Dan · Asher · Naphtali', at: offset(MISHKAN_AT, 0, 66), strong: true },
  { text: 'Moses, Aaron & sons', at: offset(MISHKAN_AT, 37, 0) },
  { text: 'Levites', at: offset(MISHKAN_AT, 0, 23) },
  { text: 'Tent of Meeting', at: offset(MISHKAN_AT, -7.5, 0), strong: true },
]

const PLAN_LABELS = [
  { text: 'Holy of Holies', at: offset(MISHKAN_AT, -12.5, 6.5), strong: true },
  { text: 'Tent', at: offset(MISHKAN_AT, -4, -5.5) },
  { text: 'Altar', at: offset(MISHKAN_AT, 13, 4), strong: true },
  { text: 'Gate · east', at: offset(MISHKAN_AT, 25, -7.6) },
  { text: '100 cubits ≈ 50 m', at: offset(MISHKAN_AT, 0, -14.5) },
]

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
  const planMode = planModeFor(parshaId)
  const card = storyOpen && story ? story.cards[storyIndex] : null

  const allPlaces = useParshaPlaces(parshaId)
  const places = useMemo(() => filterPlacesByType(allPlaces, placeTypeFilter), [allPlaces, placeTypeFilter])
  const selectedPlace = allPlaces.find((p) => p.id === selectedPlaceId) ?? null

  const geometry = useMemo(() => (story && story.route.length > 1 ? densify(story.route.map((s) => s.at)) : null), [story])
  const showPlan = !!card && (card.kind === 'plan' || card.kind === 'offerings')

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
      ? story.route.length
        ? story.route.map((s) => s.at)
        : story.anchor
          ? [story.anchor.at]
          : []
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
      if ((card.kind === 'name' || card.kind === 'talk') && bounds && story?.route.length) {
        map.fitBounds(bounds, { padding: { top: 110, bottom: card.kind === 'talk' ? 440 : 400, left: 50, right: 50 }, pitch: 20, bearing: 0, duration: 2400, essential: true })
      } else {
        // Content cards leave only the top of the screen for the map; aim the camera there.
        const page = card.kind === 'letter' || card.kind === 'offerings' || card.kind === 'scale' || card.kind === 'quote'
        const padding = page ? { top: 80, bottom: Math.round(window.innerHeight * 0.62), left: 30, right: 30 } : PAD_STORY
        map.flyTo({ ...cameraFor(card, planMode), duration: 2400, curve: 1.35, padding, essential: true })
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

  // 3D terrain while a story plays: mountains and valleys become physical when the camera pitches.
  useEffect(() => {
    const m = mapRef.current?.getMap()
    if (!loaded || !m?.getSource('terrain')) return
    // Off for close-ups: the DEM stops at z12, and drawn plans should lie flat.
    const on = storyOpen && (!card || cameraFor(card, planMode).zoom < 14)
    // True height: exaggerated relief would misrepresent real, named places.
    m.setTerrain(on ? { source: 'terrain', exaggeration: 1 } : null)
  }, [loaded, storyOpen, card, planMode])


  useEffect(() => {
    const m = mapRef.current?.getMap()
    if (!loaded || !m?.getLayer('label-places')) return
    m.setLayoutProperty('label-places', 'visibility', onMapTab ? 'visible' : 'none')
    // Basemap peak names (e.g. an unhedged "Mount Sinai") would contradict a story's own labels.
    if (m.getLayer('label-mountain-peaks')) m.setLayoutProperty('label-mountain-peaks', 'visibility', storyOpen ? 'none' : 'visible')
  }, [loaded, onMapTab, storyOpen])
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
      // Drawn plans are sized for the card's zoom; zooming during a story would break "to scale".
      scrollZoom={!storyOpen}
      touchZoomRotate={!storyOpen}
      doubleClickZoom={!storyOpen}
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

      {card?.kind === 'plan' && (
        <Marker longitude={MISHKAN_AT[0]} latitude={MISHKAN_AT[1]} anchor="center" pitchAlignment="map" rotationAlignment="map">
          {planMode === 'camp' ? <Camp /> : <SurveyGrid />}
        </Marker>
      )}

      {showPlan && card && (
        <Marker longitude={MISHKAN_AT[0]} latitude={MISHKAN_AT[1]} anchor="center" pitchAlignment="map" rotationAlignment="map">
          <TabernaclePlan zoom={cameraFor(card, planMode).zoom} />
        </Marker>
      )}

      {card?.kind === 'plan' &&
        (planMode === 'camp' ? CAMP_LABELS : PLAN_LABELS).map((l, i) => (
          <Marker key={l.text} longitude={l.at[0]} latitude={l.at[1]} anchor="center">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + i * 0.18 }}
              style={{
                display: 'block',
                whiteSpace: 'nowrap',
                background: l.strong ? C.ink : 'rgba(255,255,255,0.94)',
                color: l.strong ? C.sand : C.ink,
                padding: '3px 9px',
                borderRadius: 10,
                font: `700 12px ${FONT.display}`,
                boxShadow: SHADOW.float,
              }}
            >
              {l.text}
            </motion.span>
          </Marker>
        ))}

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
              {card.spot.name.split(' (')[0]}
              {card.spot.name.includes(' (') && (
                <span style={{ display: 'block', font: `600 11px ${FONT.display}`, color: C.muted }}>{card.spot.name.split(' (')[1].replace(')', '')}</span>
              )}
            </span>
          </motion.div>
        </Marker>
      )}
    </Map>
  )
}
