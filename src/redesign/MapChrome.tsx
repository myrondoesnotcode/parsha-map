import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Layers, X, Clock } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useParshaPlaces } from '../hooks/useParshaPlaces'
import { getParshaDate, formatBCE } from './parshaDates'
import { PLACE_TYPE_FILTERS } from '../utils/placeUtils'
import { getParshaById } from '../utils/parshaUtils'
import placesData from '../data/places.json'
import type { Place } from '../types/places'
import { useDaylight, haptic, EMPIRES_LAYER_ENABLED } from './useDaylight'
import { C, FONT, SPRING } from './theme'
import { displayName, prettyType, parshaDisplayName } from './placeText'

const allPlaces = placesData as Place[]
const TIMELINE_START = 2100
const TIMELINE_END = 400

export function MapChrome({ searchRef }: { searchRef: React.RefObject<HTMLInputElement | null> }) {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const placeTypeFilter = useAppStore((s) => s.placeTypeFilter)
  const setPlaceTypeFilter = useAppStore((s) => s.setPlaceTypeFilter)
  const { layersOpen, toggleLayers, showTrade, showEmpires, toggleTrade, toggleEmpires, selectPlace } = useDaylight()
  const date = getParshaDate(parshaId)

  const [q, setQ] = useState('')
  const results = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (s.length < 2) return []
    return allPlaces.filter((p) => p.name.toLowerCase().includes(s) || p.alternateNames.some((a) => a.toLowerCase().includes(s))).slice(0, 6)
  }, [q])

  const pick = (p: Place) => {
    haptic('light')
    if (parshaId && !p.parshas.includes(parshaId) && p.parshas[0]) setSelectedParsha(p.parshas[0])
    selectPlace(p.id)
    setQ('')
    searchRef.current?.blur()
  }

  // The bar shows both dates, each labelled: the hedged range historians use (a band) and the
  // traditional Jewish date (a dot). Values and sources live in src/data/parshaDates.json.
  const span = TIMELINE_START - TIMELINE_END
  const pct = (y: number) => ((TIMELINE_START - y) / span) * 100
  const sch = date?.scholarly
  const band = sch?.startBCE != null && sch.endBCE != null ? { left: pct(sch.startBCE), width: Math.max(3, pct(sch.endBCE) - pct(sch.startBCE)) } : null
  const trad = date?.traditional
  const tradText = trad ? `Tradition: ${formatBCE(trad.yearBCE, trad.endBCE)}` : null
  const tradYear = trad ? (trad.endBCE != null ? (trad.yearBCE + trad.endBCE) / 2 : trad.yearBCE) : null
  const dot = tradYear != null && tradYear <= TIMELINE_START && tradYear >= TIMELINE_END ? pct(tradYear) : null

  return (
    <motion.div
      className="dl-mapchrome"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={SPRING.soft}
    >
      <div style={{ display: 'flex', gap: 8 }}>
        <label className="dl-search">
          <Search size={18} strokeWidth={2.4} color={C.ink} />
          <input
            ref={searchRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Search ${allPlaces.length.toLocaleString()} places`}
            aria-label="Search places"
          />
          {q && (
            <button type="button" aria-label="Clear search" onClick={() => setQ('')} style={{ color: C.muted }}>
              <X size={16} />
            </button>
          )}
        </label>
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          aria-label="Map layers"
          aria-expanded={layersOpen}
          className="dl-pill dl-round"
          style={{ width: 48, height: 48, background: layersOpen ? C.ink : C.white, color: layersOpen ? C.sand : C.ink }}
          onClick={toggleLayers}
        >
          <Layers size={19} />
        </motion.button>
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.ul
            className="dl-results"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={SPRING.snappy}
          >
            {results.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => pick(p)}>
                  <span style={{ font: `700 15px ${FONT.display}` }}>{displayName(p.name)}</span>
                  <span style={{ font: `500 12px ${FONT.display}`, color: C.muted }}>
                    {prettyType(p.type)} · {p.parshas.length} parsh{p.parshas.length === 1 ? 'a' : 'iot'}
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
        {layersOpen && (
          <motion.div
            className="dl-layers"
            initial={{ opacity: 0, scale: 0.9, originX: 1, originY: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={SPRING.snappy}
          >
            <Toggle label="Trade routes" on={showTrade} onClick={toggleTrade} />
            {EMPIRES_LAYER_ENABLED && <Toggle label="Empires & borders" on={showEmpires} onClick={toggleEmpires} />}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="dl-chips" role="radiogroup" aria-label="Place type">
        {PLACE_TYPE_FILTERS.map((f) => {
          const active = placeTypeFilter === f.id
          return (
            <button
              key={f.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                haptic('light')
                setPlaceTypeFilter(f.id)
              }}
              style={{ color: active ? C.sand : C.ink }}
            >
              {active && <motion.span layoutId="dl-filter-pill" className="dl-filter-pill" transition={SPRING.snappy} />}
              <span style={{ position: 'relative' }}>{f.label}</span>
            </button>
          )
        })}
      </div>

      {sch && (
        <div
          className="dl-era"
          role="group"
          aria-label={[sch.label, tradText && trad ? `${tradText}, ${trad.event}` : null].filter(Boolean).join('. ')}
        >
          <Clock size={18} color={C.blue} strokeWidth={2.2} style={{ flexShrink: 0 }} />
          <div style={{ flexGrow: 1, minWidth: 0 }}>
            <div className="dl-era-line" style={{ font: `600 12px ${FONT.display}`, color: C.ink }}>
              {sch.label}
            </div>
            {tradText && trad && (
              <div style={{ font: `500 12px/1.3 ${FONT.display}`, color: C.muted, marginTop: 2 }}>
                <span style={{ fontWeight: 700, color: C.ink }}>{tradText}</span> · {trad.event}
              </div>
            )}
            {(band || dot != null) && (
              <div aria-hidden style={{ position: 'relative', height: 5, borderRadius: 3, background: C.land, marginTop: 7 }}>
                {band && (
                  <motion.div
                    initial={false}
                    animate={{ left: `${band.left}%`, width: `${band.width}%` }}
                    transition={SPRING.soft}
                    style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 3, background: C.blue, opacity: 0.35 }}
                  />
                )}
                {dot != null && (
                  <motion.div
                    initial={false}
                    animate={{ left: `${dot}%` }}
                    transition={SPRING.soft}
                    style={{ position: 'absolute', top: -2.5, width: 10, height: 10, marginLeft: -5, borderRadius: 5, background: C.blue, boxShadow: `0 0 0 2px ${C.white}` }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => {
        haptic('light')
        onClick()
      }}
      className="dl-toggle"
    >
      <span>{label}</span>
      <span className="dl-switch" style={{ background: on ? C.blue : C.hairline }}>
        <motion.span layout transition={SPRING.snappy} className="dl-knob" style={{ marginLeft: on ? 18 : 0 }} />
      </span>
    </button>
  )
}

export function PlaceCard() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const { selectedPlaceId, selectPlace } = useDaylight()
  const places = useParshaPlaces(parshaId)
  const place = places.find((p) => p.id === selectedPlaceId) ?? allPlaces.find((p) => p.id === selectedPlaceId)
  if (!place) return null
  const others = place.parshas.filter((id) => id !== parshaId).map((id) => getParshaById(id)).filter(Boolean)

  return (
    <motion.section
      key={place.id}
      className="dl-placecard"
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 400, opacity: 0 }}
      transition={SPRING.sheet}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0.05, bottom: 0.6 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 80 || info.velocity.y > 500) selectPlace(null)
      }}
    >
      <div className="dl-handle" aria-hidden />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: `700 12px ${FONT.display}`, color: C.blue, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {prettyType(place.type)} · {place.locationNote ? 'not on the map' : `${place.confidence} confidence`}
          </div>
          <h2 style={{ margin: 0, font: `800 32px ${FONT.display}`, letterSpacing: '-0.03em', lineHeight: 1.05, color: C.ink }}>
            {displayName(place.name)}
          </h2>
        </div>
        <button type="button" aria-label="Close place" className="dl-round-sm" onClick={() => selectPlace(null)}>
          <X size={16} strokeWidth={2.6} />
        </button>
      </div>
      {place.description && (
        <p style={{ margin: '8px 0 0', font: `400 15px/1.45 ${FONT.display}`, color: C.body }}>{place.description}</p>
      )}
      <div className="dl-row-chips">
        {place.verses.slice(0, 4).map((v) => (
          <a key={v} href={`https://www.sefaria.org/${encodeURIComponent(v.replace(/ /g, '_'))}`} target="_blank" rel="noreferrer" className="dl-mini-chip">
            {v}
          </a>
        ))}
      </div>
      {others.length > 0 && (
        <div className="dl-row-chips">
          <span style={{ font: `600 12px ${FONT.display}`, color: C.muted, alignSelf: 'center' }}>Also in</span>
          {others.slice(0, 5).map((p) => (
            <button
              key={p!.id}
              type="button"
              className="dl-mini-chip"
              onClick={() => {
                haptic('light')
                setSelectedParsha(p!.id)
                selectPlace(place.id)
              }}
            >
              {parshaDisplayName(p!.name)}
            </button>
          ))}
        </div>
      )}
    </motion.section>
  )
}
