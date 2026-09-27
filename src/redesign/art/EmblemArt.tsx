import { createContext, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { C, FONT } from '../theme'

/**
 * Emblem covers: one papercut scene per parsha, drawn in the Daylight palette as
 * stacked SVG layers. Layers drift at different depths (and follow the pointer),
 * so the cover feels alive without being a video. Every element is checked against
 * the verses named in `refs`; anything the text doesn't specify is kept plain.
 */
type Emblem = {
  refs: string
  tone: 'night' | 'day'
  scene: () => ReactNode
}

const W = 400
const H = 560

const EMBLEMS: Record<string, Emblem> = {
  // Gen 12:8 — Abram pitches his tent and builds an altar. Gen 15:5 — "count the stars."
  'lech-lecha': { refs: 'Genesis 12:8 · 15:5', tone: 'night', scene: () => <LechLecha /> },
  // Lev 1 — burnt offerings. Ex 27:1–2 — square altar, horns on four corners, copper overlay.
  // Ex 40:6 — the altar stands before the Tent's entrance. Lev 6:6 — the fire never goes out.
  vayikra: { refs: 'Leviticus 1 · 6:6 · Exodus 27:1–2, 40:6', tone: 'day', scene: () => <Vayikra /> },
  // Lev 12:6–8 — at the Tent's entrance, two turtledoves when a lamb is beyond one's means.
  tazria: { refs: 'Leviticus 12:6–8', tone: 'day', scene: () => <Tazria /> },
}

export const hasEmblem = (parshaId: string | undefined) => !!parshaId && parshaId in EMBLEMS
export const emblemTone = (parshaId: string | undefined) => (parshaId ? EMBLEMS[parshaId]?.tone : undefined)

// ——— Motion plumbing ———————————————————————————————————————————————

/** Pointer position as -1…1, sprung so layers glide rather than snap. */
function usePointerTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return { x: useSpring(x, { stiffness: 40, damping: 18 }), y: useSpring(y, { stiffness: 40, damping: 18 }) }
}

type Tilt = { x: MotionValue<number>; y: MotionValue<number> } | null

/** One paper layer. `depth` 0 is the far sky, 1 the foreground. */
function Layer({ depth, tilt, children }: { depth: number; tilt: Tilt; children: ReactNode }) {
  const zero = useMotionValue(0)
  const tx = useTransform(tilt?.x ?? zero, (v) => -v * depth * 14)
  const ty = useTransform(tilt?.y ?? zero, (v) => -v * depth * 6)
  const still = !tilt
  return (
    <motion.g style={{ x: tx, y: ty }}>
      <motion.g
        filter={depth > 0.15 ? 'url(#paper)' : undefined}
        animate={still ? undefined : { x: [0, -depth * 10, 0] }}
        transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
      >
        {children}
      </motion.g>
    </motion.g>
  )
}

const MotionCtx = createContext<{ tilt: Tilt; still: boolean }>({ tilt: null, still: true })
const useArtMotion = () => useContext(MotionCtx)

export function EmblemArt({ parshaId, caption = true }: { parshaId: string; caption?: boolean }) {
  const reduce = useReducedMotion() ?? false
  const tilt = usePointerTilt()
  const emblem = EMBLEMS[parshaId]
  if (!emblem) return null
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
        <defs>
          {/* Paper edge: a soft drop shadow under each cut layer. */}
          <filter id="paper" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor={C.ink} floodOpacity="0.3" result="far" />
            <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor={C.ink} floodOpacity="0.28" />
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.09  0 0 0 0 0.09  0 0 0 0 0.17  0 0 0 0.55 0" />
          </filter>
          <filter id="soft"><feGaussianBlur stdDeviation="14" /></filter>
          <radialGradient id="glow">
            <stop offset="0" stopColor="#ffe2b8" stopOpacity="0.9" />
            <stop offset="1" stopColor={C.warm} stopOpacity="0" />
          </radialGradient>
        </defs>
        <MotionCtx.Provider value={{ tilt: reduce ? null : tilt, still: reduce }}>{emblem.scene()}</MotionCtx.Provider>
        <rect width={W} height={H} filter="url(#grain)" opacity="0.07" style={{ mixBlendMode: 'multiply' }} />
      </svg>
      {caption && (
        <span
          style={{
            position: 'absolute', left: 16, top: 'calc(env(safe-area-inset-top, 0px) + 74px)', font: `800 10px ${FONT.display}`, letterSpacing: '0.08em',
            color: emblem.tone === 'night' ? 'rgba(244,236,220,0.6)' : 'rgba(23,24,43,0.45)', textTransform: 'uppercase',
          }}
        >
          Illustrative · {emblem.refs}
        </span>
      )}
    </div>
  )
}

/** Story cover wrapper: fades in over the map like the old image cover. */
export function EmblemCover({ parshaId }: { parshaId: string }) {
  return (
    <motion.div className="dl-cover-art dl-emblem" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <EmblemArt parshaId={parshaId} />
    </motion.div>
  )
}

// ——— Shared pieces ——————————————————————————————————————————————————

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * The Tent's entrance, seen from the east: an embroidered screen of blue, purple and
 * crimson yarns with linen (Ex 26:36), hung on five gold-covered posts set in copper
 * sockets (Ex 26:37). The covering over the top is drawn plain; its look isn't given.
 */
function TentEntrance({ x, y, w }: { x: number; y: number; w: number }) {
  const h = w // front of the Tabernacle: 10 cubits wide, 10 high
  const bands = ['#2536c4', '#f6f0e2', '#6a3d9a', '#f6f0e2', '#b3263a', '#f6f0e2']
  const postW = w * 0.035
  const gap = (w - postW) / 4
  return (
    <g>
      {/* covering draped over the roof and down the sides */}
      <path d={`M${x - w * 0.06} ${y + h * 0.16} Q${x + w / 2} ${y - h * 0.06} ${x + w * 1.06} ${y + h * 0.16} L${x + w * 1.06} ${y + h} L${x - w * 0.06} ${y + h} Z`} fill="#3b3550" />
      {/* screen */}
      {bands.map((b, i) => (
        <rect key={i} x={x} y={y + h * 0.12 + ((h * 0.88) / bands.length) * i} width={w} height={(h * 0.88) / bands.length + 0.5} fill={b} />
      ))}
      {/* embroidery: a simple running pattern across the linen bands */}
      {[1, 3, 5].map((i) =>
        Array.from({ length: 10 }, (_, k) => (
          <circle key={`${i}-${k}`} cx={x + (w / 10) * (k + 0.5)} cy={y + h * 0.12 + ((h * 0.88) / bands.length) * (i + 0.5)} r={w * 0.012} fill={bands[i - 1]} opacity="0.7" />
        ))
      )}
      {/* five posts, gold, in copper sockets */}
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i}>
          <rect x={x + gap * i} y={y + h * 0.1} width={postW} height={h * 0.86} fill="#e2b04a" />
          <rect x={x + gap * i - postW * 0.35} y={y + h * 0.95} width={postW * 1.7} height={h * 0.05} fill="#b8683a" />
        </g>
      ))}
    </g>
  )
}

function Flame({ cx, base, s, delay }: { cx: number; base: number; s: number; delay: number }) {
  const { still } = useArtMotion()
  return (
    <motion.g
      style={{ originX: `${cx}px`, originY: `${base}px`, transformBox: 'view-box' }}
      animate={still ? undefined : { scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.94, 1.05, 0.97, 1] }}
      transition={{ duration: 1.6, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path d={`M${cx - 14 * s} ${base} C${cx - 18 * s} ${base - 22 * s} ${cx - 4 * s} ${base - 30 * s} ${cx} ${base - 52 * s} C${cx + 6 * s} ${base - 30 * s} ${cx + 18 * s} ${base - 22 * s} ${cx + 14 * s} ${base} Z`} fill="#e8573a" />
      <path d={`M${cx - 8 * s} ${base} C${cx - 10 * s} ${base - 14 * s} ${cx - 2 * s} ${base - 20 * s} ${cx} ${base - 34 * s} C${cx + 4 * s} ${base - 20 * s} ${cx + 10 * s} ${base - 14 * s} ${cx + 8 * s} ${base} Z`} fill={C.warm} />
      <path d={`M${cx - 4 * s} ${base} C${cx - 5 * s} ${base - 8 * s} ${cx} ${base - 12 * s} ${cx} ${base - 18 * s} C${cx + 2 * s} ${base - 12 * s} ${cx + 5 * s} ${base - 8 * s} ${cx + 4 * s} ${base} Z`} fill="#ffe2b8" />
    </motion.g>
  )
}

function Smoke({ cx, base, delay }: { cx: number; base: number; delay: number }) {
  const { still } = useArtMotion()
  if (still) {
    return <path d={`M${cx} ${base} c-16 -30 22 -50 4 -90 c-14 -30 18 -56 8 -96`} fill="none" stroke="#fbf7ef" strokeWidth="14" strokeLinecap="round" opacity="0.5" />
  }
  return (
    <motion.path
      d={`M${cx} ${base} c-16 -30 22 -50 4 -90 c-14 -30 18 -56 8 -96 c-10 -24 14 -40 6 -70`}
      fill="none"
      stroke="#e9e4f2"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0, strokeWidth: 10, y: 0 }}
      animate={{ pathLength: [0, 1, 1], opacity: [0, 0.85, 0], strokeWidth: [12, 22, 34], y: [0, -40, -90] }}
      transition={{ duration: 7, repeat: Infinity, delay, ease: 'easeOut', times: [0, 0.5, 1] }}
    />
  )
}

// ——— Lech Lecha: the tent and altar under a sky being counted ———————————————

function LechLecha() {
  const { tilt, still } = useArtMotion()
  const stars = useMemo(() => {
    const r = rng(1215)
    return Array.from({ length: 190 }, () => ({ x: r() * W, y: r() * 360, s: r() < 0.08 ? r() * 1.4 + 1.6 : r() * 1.2 + 0.4, t: r() }))
  }, [])
  const sparkles = useMemo(() => {
    const r = rng(155)
    return Array.from({ length: 9 }, () => ({ x: 20 + r() * (W - 40), y: 30 + r() * 240, s: 4 + r() * 5, t: r() }))
  }, [])
  return (
    <>
      <defs>
        <linearGradient id="ll-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0e1554" />
          <stop offset="0.62" stopColor={C.blue} />
          <stop offset="0.8" stopColor="#6f7be6" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#ll-sky)" />
      <Layer depth={0.06} tilt={tilt}>
        <ellipse cx="200" cy="170" rx="330" ry="46" fill={C.blueSoft} opacity="0.22" filter="url(#soft)" transform="rotate(-28 200 170)" />
      </Layer>
      <Layer depth={0.12} tilt={tilt}>
        {/* "Count the stars, if you are able" — they keep arriving */}
        {stars.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.s}
            fill={C.sand}
            initial={still ? false : { opacity: 0 }}
            animate={still ? { opacity: 0.85 } : { opacity: [0, 1, 0.4, 1] }}
            transition={{ delay: 0.3 + i * 0.035, duration: 2.6 + s.t * 2, repeat: Infinity, repeatType: 'mirror' }}
          />
        ))}
        {sparkles.map((s, i) => (
          <motion.path
            key={`k${i}`}
            d={`M${s.x} ${s.y - s.s * 2} Q${s.x} ${s.y} ${s.x + s.s * 2} ${s.y} Q${s.x} ${s.y} ${s.x} ${s.y + s.s * 2} Q${s.x} ${s.y} ${s.x - s.s * 2} ${s.y} Q${s.x} ${s.y} ${s.x} ${s.y - s.s * 2} Z`}
            fill="#fff7e6"
            style={{ originX: `${s.x}px`, originY: `${s.y}px`, transformBox: 'view-box' }}
            initial={still ? false : { opacity: 0, scale: 0.2 }}
            animate={still ? { opacity: 1 } : { opacity: [0, 1, 0.6, 1], scale: [0.2, 1, 0.8, 1] }}
            transition={{ delay: 1 + i * 0.5, duration: 3 + s.t * 2, repeat: Infinity, repeatType: 'mirror' }}
          />
        ))}
      </Layer>
      <Layer depth={0.35} tilt={tilt}>
        <path d="M-40 400 C40 350 90 330 150 356 C210 380 250 322 320 318 C370 316 410 350 460 360 L460 560 L-40 560 Z" fill="#4a5ad6" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 440 C30 400 110 392 170 414 C240 440 300 396 360 394 C400 393 430 410 460 420 L460 560 L-40 560 Z" fill="#2b39b8" />
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        {/* the way here: a route line like the map's, drawn in from the hills */}
        <mask id="ll-route-reveal" maskUnits="userSpaceOnUse" x="-60" y="0" width="520" height="560">
          <motion.path
            d="M-20 404 C40 396 70 420 110 428 C160 438 150 456 206 462 C240 466 262 470 290 474"
            fill="none"
            stroke="#fff"
            strokeWidth="12"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3.4, delay: 0.6, ease: 'easeInOut' }}
          />
        </mask>
        <path d="M-20 404 C40 396 70 420 110 428 C160 438 150 456 206 462 C240 466 262 470 290 474" fill="none" stroke={C.warm} strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 11" mask="url(#ll-route-reveal)" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 498 C60 470 170 462 250 472 C330 482 390 470 460 466 L460 560 L-40 560 Z" fill="#141c6e" />
        {/* the tent: pitched, flap open, lamp-lit inside */}
        <g transform="translate(300 482) scale(1.55) translate(-268 -462)">
          <motion.ellipse cx="268" cy="444" rx="80" ry="48" fill="url(#glow)" animate={still ? undefined : { opacity: [0.55, 0.9, 0.6] }} transition={{ duration: 3.2, repeat: Infinity, repeatType: 'mirror' }} />
          <line x1="190" y1="462" x2="232" y2="392" stroke={C.sand} strokeOpacity="0.5" strokeWidth="1" />
          <line x1="346" y1="462" x2="304" y2="392" stroke={C.sand} strokeOpacity="0.5" strokeWidth="1" />
          <path d="M214 462 L268 384 L322 462 Z" fill={C.warm} />
          <path d="M268 384 L322 462 L300 462 Z" fill="#d97d3c" />
          <path d="M268 406 L252 462 L284 462 Z" fill="#ffd9a8" />
          <path d="M268 406 L252 462 L243 462 Z" fill="#e8894a" />
          <line x1="268" y1="376" x2="268" y2="388" stroke="#d97d3c" strokeWidth="3" strokeLinecap="round" />
        </g>
        {/* the altar: built, not burning (the verse doesn't say) */}
        <g transform="translate(150 488) scale(1.5) translate(-131 -459)">
          <rect x="108" y="446" width="22" height="13" rx="4" fill={C.land} />
          <rect x="130" y="447" width="24" height="12" rx="4" fill="#d9ccb1" />
          <rect x="116" y="435" width="26" height="12" rx="4" fill="#e4d7bd" />
          <rect x="124" y="425" width="16" height="11" rx="4" fill={C.land} />
        </g>
      </Layer>
    </>
  )
}

// ——— Vayikra: the altar before the Tent, its fire always burning ———————————————

function Vayikra() {
  const { tilt } = useArtMotion()
  // Altar front: 5 cubits wide, 3 high (Ex 27:1).
  const aw = 220
  const ah = (aw * 3) / 5
  const ax = (W - aw) / 2
  const ay = 520 - ah
  return (
    <>
      <defs>
        <linearGradient id="vy-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f4b27c" />
          <stop offset="0.7" stopColor={C.sand} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#vy-sky)" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="86" cy="96" r="34" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 L40 300 L96 262 L150 214 L186 236 L226 204 L270 250 L330 280 L460 312 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 360 C80 350 300 346 460 356 L460 560 L-40 560 Z" fill={C.land} />
        <TentEntrance x={140} y={250} w={120} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C100 458 300 458 460 468 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <ellipse cx={W / 2} cy={ay - 10} rx="120" ry="60" fill="url(#glow)" opacity="0.7" />
        <Smoke cx={W / 2 - 10} base={ay - 20} delay={0} />
        <Smoke cx={W / 2 + 14} base={ay - 24} delay={2.4} />
        <Smoke cx={W / 2} base={ay - 18} delay={4.8} />
        <Flame cx={W / 2 - 48} base={ay + 2} s={1} delay={0.3} />
        <Flame cx={W / 2 + 46} base={ay + 2} s={1.05} delay={0.9} />
        <Flame cx={W / 2} base={ay + 2} s={1.5} delay={0} />
        {/* copper-covered altar with a horn on each corner */}
        <rect x={ax} y={ay} width={aw} height={ah} fill="#c9773f" />
        <rect x={ax} y={ay} width={aw * 0.18} height={ah} fill="#e59b62" />
        <rect x={ax + aw * 0.82} y={ay} width={aw * 0.18} height={ah} fill="#b0612f" />
        <rect x={ax - 4} y={ay - 6} width={aw + 8} height={8} fill="#b0612f" />
        {[ax - 4, ax + aw - 10].map((hx) => (
          <path key={hx} d={`M${hx} ${ay - 6} L${hx + 2} ${ay - 22} Q${hx + 7} ${ay - 26} ${hx + 12} ${ay - 22} L${hx + 14} ${ay - 6} Z`} fill="#c9773f" />
        ))}
        {/* the back two horns peek over the fire's base */}
        {[ax + 18, ax + aw - 30].map((hx) => (
          <path key={hx} d={`M${hx} ${ay - 6} L${hx + 2} ${ay - 16} Q${hx + 6} ${ay - 19} ${hx + 10} ${ay - 16} L${hx + 12} ${ay - 6} Z`} fill="#b0612f" />
        ))}
      </Layer>
    </>
  )
}

// ——— Tazria: two turtledoves brought to the Tent's entrance ———————————————

function Turtledove({ x, y, flip, delay }: { x: number; y: number; flip?: boolean; delay: number }) {
  const { still } = useArtMotion()
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="4" cy="44" rx="34" ry="5" fill={C.ink} opacity="0.12" />
      <motion.g animate={still ? undefined : { y: [0, -1.5, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay, ease: 'easeInOut' }}>
        {/* tail */}
        <path d="M-30 12 L-66 22 L-62 30 L-26 22 Z" fill="#8a6a58" />
        <path d="M-62 22 L-66 22 L-62 30 Z" fill="#f6f0e2" />
        {/* body */}
        <path d="M-34 14 C-30 -8 6 -14 26 -2 C36 6 34 26 18 32 C0 38 -28 32 -34 14 Z" fill="#cfae98" />
        <path d="M-10 36 C4 38 16 34 22 28 C14 36 0 40 -10 36 Z" fill="#e6d3c3" />
        {/* scalloped wing: rufous feathers with dark centres */}
        <path d="M-26 4 C-14 -8 10 -8 16 6 C12 18 -8 22 -28 16 Z" fill="#b77b4d" />
        {[[-16, 2], [-4, 0], [6, 4], [-10, 11], [2, 12]].map(([cx, cy]) => (
          <ellipse key={`${cx}${cy}`} cx={cx} cy={cy} rx="4.5" ry="3.2" fill="#3b2a24" opacity="0.75" />
        ))}
        {/* legs */}
        <path d="M2 34 L0 44 M10 34 L10 44" stroke="#c85a5a" strokeWidth="2.4" strokeLinecap="round" />
        {/* head, with the striped neck patch */}
        <motion.g
          style={{ originX: '24px', originY: '6px' }}
          animate={still ? undefined : { rotate: [0, 0, 8, -2, 0], x: [0, 0, 3, 0, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: delay + 1, ease: 'easeInOut' }}
        >
          <path d="M18 4 C18 -10 24 -20 34 -20 C44 -20 46 -10 42 -2 C38 4 30 8 18 4 Z" fill="#a9a7b8" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1={24 + i * 4} y1={-2} x2={26 + i * 4} y2={4} stroke={C.ink} strokeWidth="1.8" />
          ))}
          <circle cx="37" cy="-12" r="2.4" fill={C.ink} />
          <circle cx="37" cy="-12" r="3.6" fill="none" stroke="#c85a5a" strokeWidth="1" />
          <path d="M43 -11 L50 -9 L43 -7 Z" fill="#3b2a24" />
        </motion.g>
      </motion.g>
    </g>
  )
}

function Tazria() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <defs>
        <linearGradient id="tz-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C.blueSoft} />
          <stop offset="0.75" stopColor={C.sand} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#tz-sky)" />
      <Layer depth={0.12} tilt={tilt}>
        {/* morning light */}
        <motion.g animate={still ? undefined : { opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 6, repeat: Infinity }}>
          {[-18, -6, 6, 18].map((a) => (
            <path key={a} d="M200 -20 L186 360 L214 360 Z" fill="#fff7e6" opacity="0.45" transform={`rotate(${a} 200 -20)`} />
          ))}
        </motion.g>
      </Layer>
      <Layer depth={0.45} tilt={tilt}>
        <path d="M-40 380 C80 368 300 364 460 374 L460 560 L-40 560 Z" fill={C.land} />
        <TentEntrance x={150} y={262} w={100} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C100 456 300 458 460 466 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <g transform="translate(118 452) scale(1.7)"><Turtledove x={0} y={0} delay={0} /></g>
        <g transform="translate(290 458) scale(1.7)"><Turtledove x={0} y={0} flip delay={0.7} /></g>
      </Layer>
    </>
  )
}

// ——— Review page: ?art=gallery ————————————————————————————————————————

export function ArtGallery() {
  return (
    <div style={{ minHeight: '100vh', background: C.sand, padding: '24px 16px', boxSizing: 'border-box', font: `600 14px ${FONT.display}`, color: C.ink }}>
      <h1 style={{ font: `800 28px ${FONT.display}`, margin: '0 0 4px' }}>Emblem covers</h1>
      <p style={{ margin: '0 0 20px', color: C.muted }}>Prototype · move the pointer to see the layers</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {Object.keys(EMBLEMS).map((id) => (
          <figure key={id} style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: `${W} / ${H}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 6px 20px rgba(23,24,43,0.10)' }}>
              <EmblemArt parshaId={id} caption={false} />
            </div>
            <figcaption style={{ marginTop: 8 }}>
              <strong style={{ textTransform: 'capitalize' }}>{id.replace('-', ' ')}</strong>
              <span style={{ color: C.muted }}> · {EMBLEMS[id].refs}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
