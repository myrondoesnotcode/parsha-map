import { useMemo } from 'react'
import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { C, W, H, Layer, useArtMotion, rng, TentEntrance, Flame } from './kit'

// ——— Local helpers ———————————————————————————————————————————————————

function DaySky({ id, top = C.blueSoft, stop = 0.72 }: { id: string; top?: string; stop?: number }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset={stop} stopColor={C.sand} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    </>
  )
}

function NightSky({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0e1554" />
          <stop offset="0.62" stopColor={C.blue} />
          <stop offset="0.8" stopColor="#6f7be6" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    </>
  )
}

/** A quiet field of twinkling stars (a secondary loop, never the subject). */
function Stars({ seed, n, maxY }: { seed: number; n: number; maxY: number }) {
  const { still } = useArtMotion()
  const stars = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: n }, () => ({ x: r() * W, y: r() * maxY, s: r() < 0.1 ? r() * 1.2 + 1.4 : r() * 1 + 0.4, t: r() }))
  }, [seed, n, maxY])
  return (
    <>
      {stars.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.s}
          fill={C.sand}
          opacity={0.8}
          animate={still ? undefined : { opacity: [0.85, 0.35, 0.85] }}
          transition={{ duration: 3 + s.t * 3, delay: s.t * 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
  )
}

// ——— Shemot: the bush that burns and is not consumed ———————————————————

function Sheep({ x, y, s, flip, delay }: { x: number; y: number; s: number; flip?: boolean; delay: number }) {
  const { still } = useArtMotion()
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="14" rx="20" ry="3" fill={C.ink} opacity="0.12" />
      <rect x="-12" y="4" width="3.5" height="10" rx="1.5" fill="#3b2a24" />
      <rect x="-5" y="4" width="3.5" height="10" rx="1.5" fill="#3b2a24" />
      <rect x="6" y="4" width="3.5" height="10" rx="1.5" fill="#3b2a24" />
      <rect x="12" y="4" width="3.5" height="10" rx="1.5" fill="#3b2a24" />
      <path d="M-18 2 C-22 -6 -14 -14 -6 -12 C-2 -18 8 -18 12 -12 C20 -12 22 -4 18 2 C16 8 -14 9 -18 2 Z" fill="#f6f0e2" />
      <path d="M-18 2 C-16 7 14 8 18 2 C14 5 -12 6 -18 2 Z" fill={C.land} />
      {/* head down, grazing */}
      <motion.g
        style={{ originX: '16px', originY: '-6px' }}
        animate={still ? undefined : { rotate: [0, 0, -14, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
      >
        <path d="M12 -9 C19 -12 26 -5 27 4 C27 9 22 10 20 6 C18 2 13 -1 12 -9 Z" fill="#8a6a58" />
        <ellipse cx="14" cy="-7" rx="6" ry="2.4" fill="#8a6a58" transform="rotate(-24 14 -7)" />
        <circle cx="22" cy="0" r="1.2" fill="#3b2a24" />
      </motion.g>
    </g>
  )
}

function Sandal({ x, y, rot }: { x: number; y: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {/* sole (heel left, toe right), with its edge showing */}
      <path d="M-30 3 C-30 -6 -24 -9 -16 -8 C-6 -7 4 -12 16 -12 C28 -12 32 -5 32 1 C32 8 26 12 16 12 C4 12 -6 9 -16 11 C-24 12 -30 10 -30 3 Z" fill="#8a5a3c" />
      <path d="M-30 0 C-30 -9 -24 -12 -16 -11 C-6 -10 4 -15 16 -15 C28 -15 32 -8 32 -2 C32 5 26 9 16 9 C4 9 -6 6 -16 8 C-24 9 -30 7 -30 0 Z" fill="#e59b62" />
      <path d="M-24 -2 C-22 -6 -18 -7 -14 -6 M4 -8 C10 -10 18 -11 24 -8" fill="none" stroke="#c9773f" strokeWidth="2" strokeLinecap="round" />
      {/* straps, lying loose */}
      <path d="M-8 -10 C-4 -3 -4 3 -8 8 M4 -14 C9 -5 9 3 4 9 M20 -3 L8 -2" fill="none" stroke="#5f3f2a" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-8 8 C-14 14 -20 14 -26 18" fill="none" stroke="#5f3f2a" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  )
}

export function Shemot() {
  const { tilt, still } = useArtMotion()
  const bx = 142
  const by = 482
  return (
    <>
      <DaySky id="shemot" top="#f4b27c" />
      <Layer depth={0.1} tilt={tilt}>
        <ellipse cx="300" cy="150" rx="160" ry="26" fill={C.sand} opacity="0.5" filter="url(#soft)" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* Horeb */}
        <path d="M-40 360 L30 334 L110 272 L160 222 L206 176 L236 208 L262 200 L312 262 L370 304 L460 330 L460 560 L-40 560 Z" fill="#e6cfa8" />
        <path d="M206 176 L236 208 L262 200 L312 262 L370 304 L460 330 L460 380 L250 380 L224 262 Z" fill="#cfae98" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 408 C80 392 260 386 460 398 L460 560 L-40 560 Z" fill={C.land} />
        {/* the flock, grazing */}
        <Sheep x={248} y={418} s={0.8} delay={0} />
        <Sheep x={292} y={424} s={0.85} flip delay={1.3} />
        <Sheep x={336} y={416} s={0.75} delay={2.1} />
        <Sheep x={316} y={440} s={0.95} delay={0.6} />
        <Sheep x={262} y={446} s={0.95} flip delay={3} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 474 C100 460 300 462 460 472 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* fire rising through the bush: the leaves stay green */}
        <motion.ellipse
          cx={bx}
          cy={by - 70}
          rx="120"
          ry="100"
          fill="url(#glow)"
          animate={still ? undefined : { opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Flame cx={bx - 34} base={by - 50} s={1.3} delay={0.4} />
        <Flame cx={bx + 36} base={by - 48} s={1.25} delay={0.9} />
        <Flame cx={bx} base={by - 64} s={1.9} delay={0} />
        <ellipse cx={bx} cy={by + 2} rx="74" ry="7" fill={C.ink} opacity="0.12" />
        <path d={`M${bx - 4} ${by} L${bx - 8} ${by - 26} M${bx + 6} ${by} L${bx + 14} ${by - 22}`} stroke="#5f3f2a" strokeWidth="5" strokeLinecap="round" />
        {[
          [-50, -22, 22, '#5f7d45'],
          [48, -22, 22, '#5f7d45'],
          [-28, -44, 24, '#7d9a5a'],
          [26, -46, 25, '#7d9a5a'],
          [0, -30, 26, '#5f7d45'],
          [-8, -60, 18, '#a9bf7e'],
          [-58, -40, 15, '#7d9a5a'],
          [58, -42, 15, '#7d9a5a'],
          [-26, -18, 20, '#7d9a5a'],
          [28, -18, 20, '#7d9a5a'],
        ].map(([dx, dy, r, f], i) => (
          <circle key={i} cx={bx + (dx as number)} cy={by + (dy as number)} r={r as number} fill={f as string} />
        ))}
        <Flame cx={bx - 18} base={by - 30} s={0.8} delay={0.2} />
        <Flame cx={bx + 20} base={by - 34} s={0.9} delay={1.1} />
        <Flame cx={bx - 52} base={by - 20} s={0.6} delay={0.7} />
        <Flame cx={bx + 50} base={by - 22} s={0.65} delay={1.4} />
        {/* the sandals, taken off */}
        <g transform="translate(290 500) scale(1.25)">
          <Sandal x={-6} y={-14} rot={-16} />
          <Sandal x={6} y={12} rot={-10} />
        </g>
      </Layer>
    </>
  )
}

// ——— Vaera: frogs come up from the Nile and cover the land ————————————————

function Frog({ x, y, s, flip }: { x: number; y: number; s: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="0" cy="12" rx="22" ry="3" fill={C.ink} opacity="0.14" />
      <path d="M-18 11 C-22 0 -10 -10 4 -12 C12 -13 18 -10 21 -5 C23 -1 20 3 14 5 C8 8 0 11 -8 12 Z" fill="#7d9a5a" />
      <path d="M4 4 C10 4 16 2 20 -2 C20 3 14 7 6 9 Z" fill="#a9bf7e" />
      <ellipse cx="-9" cy="4" rx="11" ry="7" fill="#5f7d45" transform="rotate(-20 -9 4)" />
      <path d="M-20 12 L4 12 L0 9 L-14 8 Z" fill="#5f7d45" />
      <path d="M8 4 L9 12 L15 12 L12 3 Z" fill="#5f7d45" />
      <ellipse cx="-2" cy="-6" rx="3" ry="2" fill="#5f7d45" />
      <circle cx="12" cy="-11" r="4.6" fill="#7d9a5a" />
      <circle cx="13" cy="-11.5" r="2.3" fill="#3b2a24" />
    </g>
  )
}

function HoppingFrog({ fx, fy, tx, ty, s, delay }: { fx: number; fy: number; tx: number; ty: number; s: number; delay: number }) {
  const mx = (fx + tx) / 2
  const my = (fy + ty) / 2
  return (
    <motion.g
      initial={{ x: fx, y: fy, opacity: 0 }}
      animate={{
        x: [fx, (fx + mx) / 2, mx, (mx + tx) / 2, tx, tx, tx],
        y: [fy, (fy + my) / 2 - 26, my, (my + ty) / 2 - 26, ty, ty, ty],
        opacity: [0, 1, 1, 1, 1, 1, 0],
      }}
      transition={{ duration: 6, delay, repeat: Infinity, times: [0, 0.1, 0.2, 0.3, 0.4, 0.85, 1], ease: 'easeInOut' }}
    >
      <Frog x={0} y={0} s={s} />
    </motion.g>
  )
}

export function Vaera() {
  const { tilt, still } = useArtMotion()
  const frogs: [number, number, number, boolean?][] = [
    [70, 452, 0.9], [150, 446, 0.85, true], [236, 450, 0.9], [318, 444, 0.85, true],
    [110, 476, 1.1, true], [196, 480, 1.15], [282, 474, 1.1, true], [352, 478, 1.05],
    [58, 506, 1.35], [150, 512, 1.4, true], [248, 510, 1.4], [336, 512, 1.35, true],
  ]
  return (
    <>
      <DaySky id="vaera" />
      <Layer depth={0.12} tilt={tilt}>
        <circle cx="306" cy="110" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 350 C60 340 140 330 220 336 C300 342 380 330 460 336 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* the Nile */}
        <path d="M-40 360 C100 354 300 354 460 360 L460 428 C300 420 100 420 -40 428 Z" fill="#5d86b8" />
        <path d="M-40 366 C100 360 300 360 460 366 L460 380 C300 374 100 374 -40 380 Z" fill="#8fb3d4" />
        {[[40, 396], [140, 404], [260, 398], [350, 408], [90, 414], [210, 414]].map(([x, y], i) => (
          <motion.path
            key={i}
            d={`M${x - 16} ${y} Q${x} ${y - 4} ${x + 16} ${y}`}
            fill="none"
            stroke={C.water}
            strokeWidth="2"
            strokeLinecap="round"
            animate={still ? undefined : { x: [0, 8, 0], opacity: [0.9, 0.4, 0.9] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* frogs' heads breaking the surface */}
        {[[70, 392], [180, 388], [300, 394]].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x - 12} ${y + 3} C${x - 10} ${y - 6} ${x + 10} ${y - 6} ${x + 12} ${y + 3} Z`} fill="#7d9a5a" />
            <circle cx={x - 5} cy={y - 4} r="3.4" fill="#7d9a5a" />
            <circle cx={x + 5} cy={y - 4} r="3.4" fill="#7d9a5a" />
            <circle cx={x - 5} cy={y - 4.4} r="1.7" fill="#3b2a24" />
            <circle cx={x + 5} cy={y - 4.4} r="1.7" fill="#3b2a24" />
            <path d={`M${x - 16} ${y + 3} Q${x} ${y + 7} ${x + 16} ${y + 3}`} fill="none" stroke={C.water} strokeWidth="1.6" />
          </g>
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 424 C100 416 300 416 460 424 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* reeds along the bank (kept generic) */}
        {[20, 96, 172, 262, 330, 388].map((x, i) => (
          <g key={x}>
            {[-8, -3, 2, 7].map((d, k) => (
              <path key={k} d={`M${x + d} 428 Q${x + d * 1.6} ${412 - (k % 2) * 8} ${x + d * 2.6} ${392 - ((k + i) % 3) * 8}`} fill="none" stroke={k % 2 ? '#7d9a5a' : '#5f7d45'} strokeWidth="3" strokeLinecap="round" />
            ))}
          </g>
        ))}
        {frogs.map(([x, y, s, f], i) => (
          <Frog key={i} x={x} y={y} s={s} flip={f} />
        ))}
        {!still && (
          <>
            <HoppingFrog fx={120} fy={420} tx={176} ty={494} s={1.2} delay={0} />
            <HoppingFrog fx={300} fy={422} tx={236} ty={488} s={1.2} delay={2} />
            <HoppingFrog fx={220} fy={420} tx={300} ty={500} s={1.25} delay={4} />
          </>
        )}
      </Layer>
    </>
  )
}

// ——— Bo: the marked doorway, shut until morning ——————————————————————————

function Hyssop({ x, y }: { x: number; y: number }) {
  const stems: [number, number][] = [[-16, -40], [-6, -52], [4, -46], [14, -38], [-10, -30], [8, -58]]
  return (
    <g>
      {stems.map(([dx, dy], i) => (
        <g key={i}>
          <path d={`M${x} ${y} Q${x + dx * 0.4} ${y + dy * 0.5} ${x + dx} ${y + dy}`} fill="none" stroke="#5f7d45" strokeWidth="2" strokeLinecap="round" />
          {[0.45, 0.65, 0.85, 1].map((t, k) => (
            <ellipse key={k} cx={x + dx * t} cy={y + dy * t} rx="3.4" ry="1.8" fill={k % 2 ? '#7d9a5a' : '#a9bf7e'} transform={`rotate(${(k % 2 ? 40 : -40) + dx} ${x + dx * t} ${y + dy * t})`} />
          ))}
        </g>
      ))}
    </g>
  )
}

export function Bo() {
  const { tilt, still } = useArtMotion()
  // doorway
  const dx0 = 164
  const dx1 = 236
  const top = 350
  const ground = 500
  const mark = (d: string, delay: number) =>
    still ? (
      <path d={d} fill="none" stroke="#b3263a" strokeWidth="8" strokeLinecap="round" />
    ) : (
      <motion.path d={d} fill="none" stroke="#b3263a" strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay, ease: 'easeInOut' }} />
    )
  return (
    <>
      <NightSky id="bo" />
      <Layer depth={0.1} tilt={tilt}>
        <Stars seed={127} n={120} maxY={300} />
      </Layer>
      <Layer depth={0.35} tilt={tilt}>
        <path d="M-40 370 C60 330 120 322 200 344 C270 364 330 320 460 330 L460 560 L-40 560 Z" fill="#2b39b8" />
      </Layer>
      <Layer depth={0.7} tilt={tilt}>
        {/* the house: a plain flat-roofed wall of mud brick */}
        <rect x="46" y="282" width="308" height={ground - 282} fill="#4a5ad6" />
        <rect x="40" y="274" width="320" height="12" fill="#1a2280" />
        <clipPath id="bo-wall">
          <rect x="46" y="282" width="308" height={ground - 282} />
        </clipPath>
        <g clipPath="url(#bo-wall)">
          {Array.from({ length: 11 }, (_, row) =>
            Array.from({ length: 10 }, (_, k) => (
              <rect key={`${row}-${k}`} x={46 + k * 36 + (row % 2) * 18 - 18} y={290 + row * 19} width="32" height="15" rx="2" fill="#6f7be6" opacity="0.14" />
            ))
          )}
          <rect x="300" y="282" width="60" height={ground - 282} fill="#2b39b8" opacity="0.5" />
        </g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 496 C100 490 300 490 460 496 L460 560 L-40 560 Z" fill="#141c6e" />
        {/* the door, shut; lamplight at the sill */}
        <rect x={dx0} y={top} width={dx1 - dx0} height={ground - top} fill="#8a5a3c" />
        {[1, 2, 3].map((k) => (
          <rect key={k} x={dx0 + ((dx1 - dx0) / 4) * k - 1} y={top} width="2" height={ground - top} fill="#5f3f2a" />
        ))}
        <circle cx={dx1 - 12} cy={top + 80} r="3" fill="#5f3f2a" />
        <motion.rect
          x={dx0 + 2}
          y={ground - 4}
          width={dx1 - dx0 - 4}
          height="4"
          fill="#ffe2b8"
          animate={still ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse cx={W / 2} cy={ground + 4} rx="60" ry="10" fill="url(#glow)" animate={still ? undefined : { opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        {/* doorposts and lintel */}
        <rect x={dx0 - 16} y={top} width="16" height={ground - top} fill="#e59b62" />
        <rect x={dx1} y={top} width="16" height={ground - top} fill="#e59b62" />
        <rect x={dx1 + 10} y={top} width="6" height={ground - top} fill="#c9773f" />
        <rect x={dx0 - 26} y={top - 18} width={dx1 - dx0 + 52} height="18" fill="#e59b62" />
        <rect x={dx0 - 26} y={top - 5} width={dx1 - dx0 + 52} height="5" fill="#c9773f" />
        {/* the blood, struck on the lintel and the two doorposts */}
        {mark(`M${dx0 - 14} ${top - 9} C${dx0 + 20} ${top - 12} ${dx1 - 20} ${top - 6} ${dx1 + 14} ${top - 10}`, 0.6)}
        {mark(`M${dx0 - 8} ${top + 8} C${dx0 - 9} ${top + 40} ${dx0 - 7} ${top + 70} ${dx0 - 8} ${top + 104}`, 1.6)}
        {mark(`M${dx1 + 8} ${top + 8} C${dx1 + 7} ${top + 40} ${dx1 + 9} ${top + 70} ${dx1 + 8} ${top + 104}`, 2.6)}
        {/* the basin, and the bunch of hyssop dipped in it */}
        <g transform="translate(318 496) scale(1.5) translate(-318 -496)">
          <Hyssop x={318} y={496} />
        </g>
        <ellipse cx="318" cy="516" rx="40" ry="6" fill={C.ink} opacity="0.3" />
        <path d="M280 492 L356 492 C354 510 340 518 318 518 C296 518 282 510 280 492 Z" fill="#b77b4d" />
        <path d="M338 492 L356 492 C354 510 340 518 318 518 C334 514 340 504 338 492 Z" fill="#8a6a58" />
        <ellipse cx="318" cy="492" rx="38" ry="6" fill="#8a6a58" />
        <ellipse cx="318" cy="493" rx="32" ry="4" fill="#b3263a" />
      </Layer>
    </>
  )
}

// ——— Beshalach: the sea split, walls of water on the right and on the left ——————

// the pillar of cloud: a soft column, billowing a little wider at the top
const PILLAR: [number, number, number][] = [
  ...Array.from({ length: 16 }, (_, i): [number, number, number] => [200 + (i % 2 ? 4 : -4), 326 - i * 12, 17 + i * 0.35]),
  [200, 136, 26], [184, 144, 20], [216, 140, 22], [192, 120, 20], [210, 118, 18],
]

export function Beshalach() {
  const { tilt, still } = useArtMotion()
  const vx = 200
  const vy = 334
  const streaks = useMemo(() => {
    const r = rng(1421)
    return Array.from({ length: 8 }, () => ({ y: 60 + r() * 200, len: 40 + r() * 50, t: r() }))
  }, [])
  // the crest of each wall, from the near side down to the far end
  const crest = (side: 1 | -1) =>
    Array.from({ length: 8 }, (_, i) => {
      const t = i / 7
      const e = 1 - (1 - t) * (1 - t) * 0.15
      return { x: vx + side * (244 - 234 * t), y: 172 + (vy - 14 - 172) * (t * e), s: 6 + 20 * (1 - t) }
    })
  const wall = (side: 1 | -1) => {
    const pts = crest(side)
    const top = pts.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `Q${(p.x + pts[i - 1].x) / 2} ${(p.y + pts[i - 1].y) / 2 - pts[i - 1].s * 0.5} ${p.x} ${p.y}`)).join(' ')
    return `${top} L${vx + side * 6} ${vy + 6} L${vx + side * 84} 560 L${vx + side * 260} 560 Z`
  }
  return (
    <>
      <NightSky id="beshalach" />
      <defs>
        <linearGradient id="beshalach-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8fb3d4" />
          <stop offset="0.45" stopColor="#5d86b8" />
          <stop offset="1" stopColor="#2b39b8" />
        </linearGradient>
      </defs>
      <Layer depth={0.08} tilt={tilt}>
        <Stars seed={1419} n={80} maxY={260} />
      </Layer>
      <Layer depth={0.16} tilt={tilt}>
        {/* the strong east wind, blowing all night */}
        {!still &&
          streaks.map((s, i) => (
            <motion.path
              key={i}
              d={`M0 ${s.y} q${s.len / 2} -7 ${s.len} 0`}
              fill="none"
              stroke={C.water}
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ x: 460, opacity: 0 }}
              animate={{ x: [460, -120], opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: 2.6 + s.t * 1.4, repeat: Infinity, delay: s.t * 3, ease: 'easeInOut' }}
            />
          ))}
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* the far shore, and the pillar of cloud standing behind */}
        <path d="M-40 340 C80 330 320 330 460 340 L460 560 L-40 560 Z" fill="#1a2280" />
        <ellipse cx={vx} cy={230} rx="80" ry="150" fill={C.blueSoft} opacity="0.4" filter="url(#soft)" />
        <motion.g animate={still ? undefined : { y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <Puffs puffs={PILLAR} fill="#e9e4f2" shade={C.blueSoft} dx={4} dy={3} />
        </motion.g>
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        {/* dry ground through the middle of the sea */}
        <path d={`M${vx - 6} ${vy + 6} L${vx + 6} ${vy + 6} L${vx + 90} 560 L${vx - 90} 560 Z`} fill="#b77b4d" />
        <path d={`M${vx - 3} ${vy + 6} L${vx + 3} ${vy + 6} L${vx + 46} 560 L${vx - 46} 560 Z`} fill="#cfae98" />
        {[[0, 380, 8], [-12, 420, 12], [14, 452, 14], [-20, 494, 18], [18, 526, 20]].map(([dx, y, w], i) => (
          <path key={i} d={`M${vx + dx - w} ${y} q${w} -5 ${w * 2} 0`} fill="none" stroke="#8a6a58" strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        {([-1, 1] as const).map((side) => (
          <g key={side}>
            <clipPath id={`beshalach-wall-${side}`}>
              <path d={wall(side)} />
            </clipPath>
            <path d={wall(side)} fill="url(#beshalach-water)" />
            {/* the standing water's flow, running to the far end */}
            <g clipPath={`url(#beshalach-wall-${side})`}>
              {Array.from({ length: 11 }, (_, k) => {
                const y0 = 196 + k * 34
                return (
                  <path
                    key={k}
                    d={`M${vx + side * 260} ${y0} Q${vx + side * 120} ${y0 - 18 + k * 2} ${vx + side * 6} ${vy - 6 + k * 1.2}`}
                    fill="none"
                    stroke={C.water}
                    strokeWidth={2 + (k % 3)}
                    opacity={0.22}
                  />
                )
              })}
              <path d={`M${vx + side * 6} ${vy + 6} L${vx + side * 84} 560 L${vx + side * 110} 560 L${vx + side * 12} ${vy + 4} Z`} fill="#1a2280" opacity="0.35" />
            </g>
            {/* foam along the crest, curling over toward the path */}
            <path d={wall(side).split(' L')[0]} fill="none" stroke={C.water} strokeWidth="5" strokeLinecap="round" />
            {crest(side).slice(0, 7).map((p, i) => {
              const d = -side
              const q = p.s
              return (
                <motion.path
                  key={i}
                  d={`M${p.x - d * q * 0.3} ${p.y + 2} C${p.x} ${p.y - q * 1.2} ${p.x + d * q * 1.4} ${p.y - q * 1.2} ${p.x + d * q * 1.4} ${p.y - q * 0.1} C${p.x + d * q} ${p.y - q * 0.6} ${p.x + d * q * 0.4} ${p.y - q * 0.4} ${p.x + d * q * 0.5} ${p.y + q * 0.3} Z`}
                  fill={C.water}
                  style={{ originX: `${p.x}px`, originY: `${p.y}px`, transformBox: 'view-box' }}
                  animate={still ? undefined : { scale: [1, 1.1, 1], rotate: [0, d * 5, 0] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                />
              )
            })}
          </g>
        ))}
      </Layer>
    </>
  )
}

// ——— Yitro: Sinai in smoke like a kiln, at dawn ————————————————————————

function Billow({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  const { still } = useArtMotion()
  if (still) return null
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill="#e9e4f2"
      style={{ originX: `${cx}px`, originY: `${cy}px`, transformBox: 'view-box' }}
      initial={{ opacity: 0 }}
      animate={{ y: [0, -170], x: [0, 10], scale: [0.5, 1.7], opacity: [0, 0.9, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, delay, ease: 'easeOut' }}
    />
  )
}

/** A cloud cut from one sheet: same-colour circles, with a darker sheet under it. */
function Puffs({ puffs, fill, shade, dx = 4, dy = 6 }: { puffs: [number, number, number][]; fill: string; shade: string; dx?: number; dy?: number }) {
  return (
    <>
      <g fill={shade}>
        {puffs.map(([x, y, r], i) => (
          <circle key={i} cx={x + dx} cy={y + dy} r={r} />
        ))}
      </g>
      <g fill={fill}>
        {puffs.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
    </>
  )
}

export function Yitro() {
  const { tilt, still } = useArtMotion()
  const px = 206
  const py = 252
  // the smoke column, widening as it rises
  const column: [number, number, number][] = [
    [px - 6, 226, 24], [px + 12, 200, 28], [px - 14, 172, 32], [px + 16, 142, 36], [px - 18, 110, 40],
    [px + 22, 80, 44], [px - 26, 46, 48], [px + 30, 14, 52], [px - 30, -20, 56], [px + 40, -40, 56],
  ]
  return (
    <>
      <DaySky id="yitro" top="#f4b27c" stop={0.8} />
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 400 C60 390 340 390 460 400 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        {/* smoke going up like the smoke of a kiln */}
        <g opacity="0.85">
          <Puffs puffs={column} fill="#a9a7b8" shade={C.muted} dx={6} dy={4} />
        </g>
        <Billow cx={px - 10} cy={py - 20} r={22} delay={0} />
        <Billow cx={px + 12} cy={py - 26} r={20} delay={1.6} />
        <Billow cx={px} cy={py - 18} r={24} delay={3.2} />
        <Billow cx={px - 4} cy={py - 24} r={20} delay={4.8} />
        {/* the mountain */}
        <path d={`M-30 450 L60 390 L120 330 L170 282 L${px} ${py} L240 280 L290 324 L350 376 L440 440 L440 470 L-30 470 Z`} fill="#cfae98" />
        <path d={`M${px} ${py} L240 280 L290 324 L350 376 L440 440 L440 470 L260 470 L226 330 Z`} fill="#b39079" />
        <path d={`M${px} ${py} L170 282 L120 330 L60 390 L100 384 L150 330 Z`} fill="#e6cfa8" />
        {/* fire on the summit */}
        <ellipse cx={px} cy={py - 10} rx="60" ry="44" fill="url(#glow)" />
        <Flame cx={px - 18} base={py + 14} s={0.95} delay={0.3} />
        <Flame cx={px + 18} base={py + 14} s={0.9} delay={0.8} />
        <Flame cx={px} base={py + 10} s={1.35} delay={0} />
      </Layer>
      <Layer depth={0.7} tilt={tilt}>
        {/* the dense cloud on the mountain */}
        <motion.g animate={still ? undefined : { x: [0, 6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <Puffs
            puffs={[[px - 120, 330, 22], [px - 88, 312, 28], [px - 50, 300, 30], [px - 12, 296, 28], [px + 26, 300, 30], [px + 64, 306, 28], [px + 100, 318, 26], [px + 130, 332, 20], [px - 60, 330, 26], [px + 10, 326, 30], [px + 80, 332, 24]]}
            fill="#a9a7b8"
            shade={C.muted}
          />
        </motion.g>
        {/* lightning (fades in and out, never flashes) */}
        {[
          [px - 64, 298, 0],
          [px + 70, 304, 2.6],
        ].map(([x, y, d], i) => (
          <motion.path
            key={i}
            d={`M${x} ${y} l-12 28 l11 0 l-14 32 l30 -40 l-12 0 l11 -20 Z`}
            fill="#fff7e6"
            stroke="#f1cf7a"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ opacity: still ? 1 : 0 }}
            animate={still ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, delay: d, times: [0, 0.3, 0.45, 0.75, 1], ease: 'easeInOut' }}
          />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C100 462 300 462 460 470 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* the bounds set round about the foot of the mountain */}
        {Array.from({ length: 9 }, (_, i) => {
          const x = 36 + i * 41
          const y = 476 + Math.abs(i - 4) * 1.5
          return (
            <g key={i}>
              <ellipse cx={x} cy={y + 8} rx="14" ry="3" fill={C.ink} opacity="0.14" />
              <path d={roughStone(x - 12, y - 4, 24, 12, 40 + i)} fill="#b77b4d" transform="translate(1.5 1.5)" />
              <path d={roughStone(x - 12, y - 4, 24, 12, 40 + i)} fill="#cfae98" />
            </g>
          )
        })}
      </Layer>
    </>
  )
}

// ——— Mishpatim: an altar at the foot of the mountain, and twelve pillars ——————

/** An unhewn stone: a box with its corners knocked about a little. */
function roughStone(x: number, y: number, w: number, h: number, seed: number) {
  const r = rng(seed)
  const cx = x + w / 2
  const cy = y + h / 2
  const pts = Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2 + r() * 0.3
    const k = 0.86 + r() * 0.14
    // a squarish outline: push the points out toward the corners
    const c = Math.cos(a)
    const s = Math.sin(a)
    const m = 1 / Math.max(Math.abs(c), Math.abs(s)) ** 0.55
    return `${(cx + c * (w / 2) * k * m * 0.92).toFixed(1)} ${(cy + s * (h / 2) * k * m * 0.92).toFixed(1)}`
  })
  return `M${pts.join(' L')} Z`
}

// [x, y, w, h, colour]: four courses, widest at the bottom
const ALTAR_STONES: [number, number, number, number, string][] = [
  [132, 482, 34, 24, '#cfae98'], [166, 483, 34, 23, '#e6cfa8'], [200, 482, 36, 24, '#cfae98'], [236, 483, 32, 23, '#e6cfa8'],
  [142, 460, 32, 24, '#e6cfa8'], [174, 459, 36, 25, '#cfae98'], [210, 460, 34, 24, '#e6cfa8'], [244, 462, 22, 22, '#cfae98'],
  [156, 439, 32, 23, '#cfae98'], [188, 438, 34, 24, '#e6cfa8'], [222, 440, 28, 22, '#cfae98'],
]

export function Mishpatim() {
  const { tilt, still } = useArtMotion()
  // exactly twelve pillars, in one row behind the altar so every one can be counted
  const pillars = Array.from({ length: 12 }, (_, i) => {
    const x = 200 + (i - 5.5) * 27
    const y = 454 + Math.abs(i - 5.5) * 0.8
    const h = 84 + ((i * 5) % 7) - 3
    return { x, y, h, i }
  })
  return (
    <>
      <DaySky id="mishpatim" top="#f4b27c" />
      <Layer depth={0.08} tilt={tilt}>
        {/* early morning light over the mountain */}
        <circle cx="266" cy="232" r="26" fill="#fbe6c8" />
        <motion.g animate={still ? undefined : { opacity: [0.35, 0.65, 0.35] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          {[-50, -30, -10, 10, 30, 50].map((a) => (
            <path key={a} d="M266 232 L254 -40 L278 -40 Z" fill="#fff7e6" opacity="0.5" transform={`rotate(${a} 266 232)`} />
          ))}
        </motion.g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 390 L40 360 L110 300 L160 256 L196 228 L230 262 L300 318 L380 356 L460 380 L460 560 L-40 560 Z" fill="#e6cfa8" />
        <path d="M196 228 L230 262 L300 318 L380 356 L460 380 L460 420 L240 420 L214 300 Z" fill="#cfae98" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 420 C80 410 320 410 460 420 L460 560 L-40 560 Z" fill={C.land} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 456 C100 448 300 448 460 456 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {pillars.map((p) => (
          <motion.g
            key={p.i}
            style={{ originX: `${p.x}px`, originY: `${p.y}px`, transformBox: 'view-box' }}
            initial={still ? false : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + p.i * 0.16, ease: 'easeOut' }}
          >
            <ellipse cx={p.x} cy={p.y} rx="12" ry="3" fill={C.ink} opacity="0.15" />
            {/* an unhewn standing stone */}
            <path d={roughStone(p.x - 9, p.y - p.h + 5, 18, p.h, 90 + p.i)} fill="#8a6a58" transform="translate(2.5 0)" />
            <path d={roughStone(p.x - 9, p.y - p.h + 5, 18, p.h, 90 + p.i)} fill="#b77b4d" />
          </motion.g>
        ))}
        {/* the altar, of rough stones */}
        <ellipse cx="200" cy="506" rx="70" ry="5" fill={C.ink} opacity="0.16" />
        <g transform="translate(200 506) scale(1.15) translate(-200 -506)">
          {ALTAR_STONES.map(([x, y, w, h, c], i) => (
            <g key={i}>
              <path d={roughStone(x, y, w, h, i + 7)} fill="#b77b4d" transform="translate(2 2)" />
              <path d={roughStone(x, y, w, h, i + 7)} fill={c} />
            </g>
          ))}
        </g>
      </Layer>
    </>
  )
}

// ——— Terumah: the lampstand of pure gold, being made ————————————————————

const MEN = { cx: 200, top: 292, radii: [48, 94, 140], base: 482 }

/** Every part of the lampstand, painted in one colour or in gold. */
function Menorah({ mono }: { mono?: string }) {
  const g = mono ?? '#e2b04a'
  const hi = mono ?? '#f1cf7a'
  const sh = mono ?? '#c9773f'
  const { cx, top, radii, base } = MEN
  const cup = (x: number, y: number, rot: number, k: string) => (
    <g key={k} transform={`translate(${x} ${y}) rotate(${rot}) scale(1.25)`}>
      {/* an almond-blossom cup: narrow at the stem, opening upward */}
      <path d="M-6.5 -5 C-6 1 -2 5 0 6 C2 5 6 1 6.5 -5 C3 -3 -3 -3 -6.5 -5 Z" fill={g} />
      <path d="M-6.5 -5 C-3 -3 3 -3 6.5 -5 C3 -7 -3 -7 -6.5 -5 Z" fill={sh} />
      <path d="M-4 -3 C-3.5 1 -1.5 3 0 4" fill="none" stroke={hi} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
  const lamp = (x: number, k: string, dir: number) => (
    <g key={k} transform={`translate(${x} ${top - 6}) scale(${dir * 1.2} 1.2)`}>
      {/* a small oil lamp, unlit */}
      <path d="M-10 0 C-10 -6 6 -7 10 -4 L16 -6 C15 -2 12 1 8 2 C2 4 -10 4 -10 0 Z" fill={g} />
      <path d="M-10 0 C-10 3 2 4 8 2 C2 2 -6 2 -10 0 Z" fill={sh} />
      <ellipse cx="-1" cy="-4" rx="5" ry="1.6" fill={sh} />
    </g>
  )
  return (
    <g>
      {/* base */}
      <path d={`M${cx - 44} ${base + 26} L${cx - 30} ${base + 4} L${cx + 30} ${base + 4} L${cx + 44} ${base + 26} Z`} fill={g} />
      <path d={`M${cx + 8} ${base + 4} L${cx + 30} ${base + 4} L${cx + 44} ${base + 26} L${cx + 16} ${base + 26} Z`} fill={sh} />
      <rect x={cx - 50} y={base + 24} width="100" height="6" rx="2" fill={sh} />
      {/* six branches, three from each side of the shaft */}
      {radii.map((r) => (
        <path key={r} d={`M${cx - r} ${top} A${r} ${r} 0 0 0 ${cx} ${top + r} A${r} ${r} 0 0 0 ${cx + r} ${top}`} fill="none" stroke={g} strokeWidth="9" />
      ))}
      {radii.map((r) => (
        <path key={`h${r}`} d={`M${cx - r - 1.5} ${top} A${r + 1.5} ${r + 1.5} 0 0 0 ${cx - (r + 1.5) * 0.7} ${top + (r + 1.5) * 0.7}`} fill="none" stroke={hi} strokeWidth="1.6" strokeLinecap="round" />
      ))}
      {/* shaft */}
      <rect x={cx - 6.5} y={top} width="13" height={base - top + 6} fill={g} />
      <rect x={cx + 2} y={top} width="4.5" height={base - top + 6} fill={sh} />
      {/* four cups on the shaft */}
      {[top + 22, top + 71, top + 118, top + 166].map((y, i) => cup(cx, y, 0, `s${i}`))}
      {/* a calyx under each pair of branches */}
      {radii.map((r) => (
        <g key={`k${r}`}>
          <ellipse cx={cx} cy={top + r + 1} rx="12" ry="8" fill={g} />
          <ellipse cx={cx + 3} cy={top + r + 2} rx="6" ry="5" fill={sh} />
          <ellipse cx={cx - 4} cy={top + r - 1} rx="3" ry="2.4" fill={hi} />
        </g>
      ))}
      {/* three cups on each branch */}
      {radii.flatMap((r) =>
        [-1, 1].flatMap((side) =>
          [0, 1, 2].map((j) => {
            // spaced evenly along the branch, just below its lamp
            const f = (14 + j * 19) / r
            const x = cx + side * r * Math.cos(f)
            const y = top + r * Math.sin(f)
            return cup(x, y, (side * f * 180) / Math.PI, `b${r}${side}${j}`)
          })
        )
      )}
      {/* seven lamps */}
      {lamp(cx, 'l0', 1)}
      {radii.flatMap((r) => [lamp(cx - r, `l-${r}`, 1), lamp(cx + r, `l+${r}`, -1)])}
    </g>
  )
}

export function Terumah() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <DaySky id="terumah" />
      <Layer depth={0.12} tilt={tilt}>
        <ellipse cx="200" cy="380" rx="200" ry="150" fill="url(#glow)" opacity="0.55" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 380 C60 370 140 356 220 362 C300 368 380 358 460 364 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 470 C100 460 300 460 460 470 L460 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <ellipse cx="200" cy="512" rx="90" ry="7" fill={C.ink} opacity="0.14" />
        <Menorah />
        {/* a glint runs over the fresh gold */}
        <mask id="terumah-gold" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <Menorah mono="#fff" />
        </mask>
        {!still && (
          <g mask="url(#terumah-gold)">
            <motion.rect
              x="-80"
              y="200"
              width="44"
              height="360"
              fill="#fff7e6"
              opacity="0.85"
              transform="rotate(18 0 380)"
              initial={{ x: -60 }}
              animate={{ x: [-60, 520, 520] }}
              transition={{ duration: 5, repeat: Infinity, times: [0, 0.55, 1], ease: 'easeInOut', delay: 0.8 }}
            />
          </g>
        )}
      </Layer>
    </>
  )
}

// ——— Tetzaveh: the breastpiece, twelve stones in four rows ————————————————

// Ex 28:17–20 in the JPS order, row by row.
const STONES: { c: string; band?: string; fleck?: string }[] = [
  { c: '#e8573a' }, // carnelian
  { c: '#a9bf7e' }, // chrysolite
  { c: '#5f7d45' }, // emerald
  { c: '#8fb3d4' }, // turquoise
  { c: '#2536c4' }, // sapphire
  { c: '#6a3d9a' }, // amethyst
  { c: '#e59b62' }, // jacinth
  { c: '#8a6a58', band: '#cfae98' }, // agate
  { c: '#f6f0e2', band: C.water }, // crystal
  { c: '#7d9a5a' }, // beryl
  { c: '#1a2280', fleck: '#f1cf7a' }, // lapis lazuli
  { c: '#b3263a' }, // jasper
]

export function Tetzaveh() {
  const { tilt, still } = useArtMotion()
  const x0 = 72
  const y0 = 256
  const s = 256
  const inset = 32
  const cw = (s - inset * 2) / 3
  const ch = (s - inset * 2) / 4
  return (
    <>
      <DaySky id="tetzaveh" />
      <Layer depth={0.12} tilt={tilt}>
        <ellipse cx="200" cy="390" rx="210" ry="170" fill="url(#glow)" opacity="0.5" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 400 C60 390 160 378 240 384 C320 390 380 380 460 386 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 486 C100 476 300 476 460 486 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <ellipse cx="200" cy="522" rx="120" ry="8" fill={C.ink} opacity="0.12" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <motion.g animate={still ? undefined : { y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          {/* square: gold, with blue, purple and crimson yarns and fine linen */}
          <rect x={x0} y={y0} width={s} height={s} rx="6" fill="#e2b04a" />
          <rect x={x0 + 7} y={y0 + 7} width={s - 14} height={s - 14} fill="#2536c4" />
          <rect x={x0 + 12} y={y0 + 12} width={s - 24} height={s - 24} fill="#6a3d9a" />
          <rect x={x0 + 17} y={y0 + 17} width={s - 34} height={s - 34} fill="#b3263a" />
          <rect x={x0 + 22} y={y0 + 22} width={s - 44} height={s - 44} fill="#f1cf7a" />
          {/* the weave: gold thread through the linen */}
          {Array.from({ length: 30 }, (_, i) => (
            <rect key={i} x={x0 + 24 + i * 6} y={y0 + 22} width="1.4" height={s - 44} fill="#e2b04a" />
          ))}
          {Array.from({ length: 30 }, (_, i) => (
            <rect key={`h${i}`} x={x0 + 22} y={y0 + 24 + i * 6} width={s - 44} height="1.4" fill="#f6f0e2" opacity="0.6" />
          ))}
          {STONES.map((st, i) => {
            const col = i % 3
            const row = Math.floor(i / 3)
            const cx = x0 + inset + cw * (col + 0.5)
            const cy = y0 + inset + ch * (row + 0.5)
            return (
              <g key={i}>
                {/* gold setting */}
                <ellipse cx={cx + 1.5} cy={cy + 2.5} rx="27" ry="20" fill="#b0612f" opacity="0.5" />
                <ellipse cx={cx} cy={cy} rx="27" ry="20" fill="#e2b04a" />
                <path d={`M${cx - 25} ${cy - 5} A27 20 0 0 1 ${cx + 16} ${cy - 16}`} fill="none" stroke="#fff7e6" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
                <ellipse cx={cx} cy={cy} rx="23" ry="16" fill="#c9773f" />
                <ellipse cx={cx} cy={cy} rx="21.5" ry="14.8" fill={st.c} />
                {st.band && <path d={`M${cx - 16} ${cy - 3} Q${cx} ${cy + 6} ${cx + 16} ${cy - 3} M${cx - 13} ${cy + 5} Q${cx} ${cy + 12} ${cx + 13} ${cy + 5}`} fill="none" stroke={st.band} strokeWidth="2" />}
                {st.fleck && [[-7, 2], [5, -4], [9, 5], [-2, -6]].map(([dx, dy], k) => <circle key={k} cx={cx + dx} cy={cy + dy} r="1.2" fill={st.fleck} />)}
                <ellipse cx={cx - 6} cy={cy - 5} rx="6" ry="3" fill="#fff" opacity="0.45" />
                {/* the engraved name, as marks */}
                <path d={`M${cx - 8} ${cy + 3} l5 0 M${cx - 1} ${cy + 3} l3 0 M${cx + 4} ${cy + 3} l5 0`} stroke={C.ink} strokeWidth="1.3" opacity="0.4" strokeLinecap="round" />
                {/* a glint that travels from stone to stone, in order */}
                {!still && (
                  <motion.path
                    d={`M${cx + 8} ${cy - 16} Q${cx + 8} ${cy - 8} ${cx + 16} ${cy - 8} Q${cx + 8} ${cy - 8} ${cx + 8} ${cy} Q${cx + 8} ${cy - 8} ${cx} ${cy - 8} Q${cx + 8} ${cy - 8} ${cx + 8} ${cy - 16} Z`}
                    fill="#fff7e6"
                    style={{ originX: `${cx + 8}px`, originY: `${cy - 8}px`, transformBox: 'view-box' }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: [0, 1, 0, 0], scale: [0.3, 1, 0.3, 0.3] }}
                    transition={{ duration: 7.2, repeat: Infinity, delay: 0.6 + i * 0.5, times: [0, 0.06, 0.14, 1], ease: 'easeInOut' }}
                  />
                )}
              </g>
            )
          })}
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Ki Tisa: the two tablets of stone, inscribed ——————————————————————

function Tablet({ x, y, s, seed, delay }: { x: number; y: number; s: number; seed: number; delay: number }) {
  const { still } = useArtMotion()
  const depth = 8
  const rows = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: 10 }, () => {
      const marks: [number, number][] = []
      let px = s - 14
      while (px > 14) {
        const w = 5 + r() * 15
        if (px - w < 12) break
        marks.push([px - w, w])
        px -= w + 4
      }
      return marks
    })
  }, [seed, s])
  return (
    <g>
      {/* the stone's thickness: top and side */}
      <path d={`M${x} ${y} L${x + depth} ${y - depth * 0.8} L${x + s + depth} ${y - depth * 0.8} L${x + s} ${y} Z`} fill="#f6f0e2" />
      <path d={`M${x + s} ${y} L${x + s + depth} ${y - depth * 0.8} L${x + s + depth} ${y + s - depth * 0.8} L${x + s} ${y + s} Z`} fill="#b77b4d" />
      {/* front face, square */}
      <rect x={x} y={y} width={s} height={s} fill="#e6cfa8" />
      <rect x={x} y={y + s - 6} width={s} height="6" fill="#cfae98" />
      {rows.map((marks, row) =>
        marks.map(([mx, w], k) => {
          const yy = y + 13 + row * ((s - 24) / 9)
          const cut = (
            <>
              <rect x={x + mx} y={yy - 1.6} width={w} height="3.4" rx="1.4" fill="#8a6a58" />
              <rect x={x + mx + 0.5} y={yy + 1.8} width={w - 1} height="1.2" rx="0.6" fill="#f6f0e2" />
            </>
          )
          return still ? (
            <g key={`${row}-${k}`}>{cut}</g>
          ) : (
            <motion.g
              key={`${row}-${k}`}
              style={{ originX: `${x + mx + w}px`, originY: `${yy}px`, transformBox: 'view-box' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.22, delay: delay + row * 0.3 + k * 0.07, ease: 'easeOut' }}
            >
              {cut}
            </motion.g>
          )
        })
      )}
    </g>
  )
}

export function KiTisa() {
  const { tilt, still } = useArtMotion()
  const s = 128
  return (
    <>
      <DaySky id="ki-tisa" top="#f4b27c" />
      <Layer depth={0.1} tilt={tilt}>
        <motion.g
          style={{ originX: '200px', originY: '400px', transformBox: 'view-box' }}
          animate={still ? undefined : { opacity: [0.45, 0.8, 0.45], rotate: [0, 3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M200 400 L188 -60 L212 -60 Z" fill="#fff7e6" opacity="0.55" transform={`rotate(${-82 + i * 15} 200 400)`} />
          ))}
        </motion.g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 410 C60 400 150 392 220 396 C300 400 380 392 460 398 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <ellipse cx="200" cy="400" rx="190" ry="130" fill="url(#glow)" opacity="0.8" />
        <path d="M-40 496 C100 488 300 488 460 496 L460 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <ellipse cx="200" cy="504" rx="150" ry="8" fill={C.ink} opacity="0.15" />
        <Tablet x={200 - s - 10} y={500 - s} s={s} seed={3215} delay={0.6} />
        <Tablet x={200 + 6} y={500 - s} s={s} seed={3216} delay={0.6} />
      </Layer>
    </>
  )
}

// ——— Vayakhel: the gifts piled high, more than enough ——————————————————

function Skein({ x, y, c, shade, rot }: { x: number; y: number; c: string; shade: string; rot: number }) {
  // a hank of yarn: a loop of many strands, twisted where it is tied
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path fillRule="evenodd" d="M-28 0 A28 13 0 1 0 28 0 A28 13 0 1 0 -28 0 Z M-16 0 A16 4.5 0 1 0 16 0 A16 4.5 0 1 0 -16 0 Z" fill={c} />
      <path d="M-28 0 A28 13 0 0 0 28 0 A28 9 0 0 1 -28 0 Z" fill={shade} opacity="0.55" />
      {[18, 22, 25].map((rx) => (
        <ellipse key={rx} cx="0" cy="0" rx={rx} ry={rx * 0.38} fill="none" stroke={shade} strokeWidth="1" opacity="0.6" />
      ))}
      <path d="M18 -9 C22 -3 22 3 18 9 L25 10 C28 3 28 -3 25 -10 Z" fill={shade} />
    </g>
  )
}

function Ring({ x, y, r, w = 3 }: { x: number; y: number; r: number; w?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke="#c9773f" strokeWidth={w} transform={`translate(0.8 0.8)`} />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#e2b04a" strokeWidth={w} />
      <path d={`M${x - r * 0.7} ${y - r * 0.7} A${r} ${r} 0 0 1 ${x + r * 0.2} ${y - r}`} fill="none" stroke="#f1cf7a" strokeWidth={w * 0.5} strokeLinecap="round" />
    </g>
  )
}

function Brooch({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <circle cx={x + 1} cy={y + 1} r={r} fill="#c9773f" />
      <circle cx={x} cy={y} r={r} fill="#e2b04a" />
      <circle cx={x} cy={y} r={r * 0.55} fill="#f1cf7a" />
      <circle cx={x} cy={y} r={r * 0.22} fill="#c9773f" />
    </g>
  )
}

function Earring({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      <path d={`M${x} ${y - r} A${r} ${r} 0 1 0 ${x + r * 0.9} ${y - r * 0.4}`} fill="none" stroke="#e2b04a" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx={x} cy={y + r + 2} r="2.6" fill="#f1cf7a" />
    </g>
  )
}

export function Vayakhel() {
  const { tilt, still } = useArtMotion()
  const falling = [
    { x: 204, to: 350, kind: 'ring', d: 0 },
    { x: 192, to: 362, kind: 'ear', d: 1.8 },
    { x: 220, to: 360, kind: 'brooch', d: 3.6 },
  ]
  return (
    <>
      <DaySky id="vayakhel" top="#f4b27c" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="96" cy="110" r="28" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 380 C60 368 140 356 220 362 C300 368 380 356 460 362 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 470 C100 460 300 460 460 470 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <ellipse cx="200" cy="380" rx="170" ry="110" fill="url(#glow)" opacity="0.55" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <ellipse cx="200" cy="510" rx="170" ry="9" fill={C.ink} opacity="0.15" />
        {/* acacia wood */}
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={36 + k * 8} y={492 - k * 14} width={160 - k * 16} height="14" rx="3" fill={['#b0612f', '#c9773f', '#8a5a3c'][k]} />
            <rect x={36 + k * 8} y={492 - k * 14} width={160 - k * 16} height="3" rx="1.5" fill="#e59b62" opacity="0.6" />
            <ellipse cx={36 + k * 8} cy={499 - k * 14} rx="5" ry="7" fill="#e59b62" />
            <ellipse cx={36 + k * 8} cy={499 - k * 14} rx="2" ry="3" fill="#b0612f" />
          </g>
        ))}
        {/* ram skins, folded in a stack */}
        {[0, 1, 2].map((k) => {
          const yy = 500 - k * 13
          const c = ['#8a6a58', '#b77b4d', '#cfae98'][k]
          return (
            <path
              key={k}
              d={`M${206 + k * 6} ${yy + 8} C${204 + k * 6} ${yy - 4} ${214 + k * 6} ${yy - 8} ${230} ${yy - 7} C${270} ${yy - 10} ${310} ${yy - 6} ${344 - k * 6} ${yy - 8} C${360 - k * 6} ${yy - 6} ${362 - k * 6} ${yy + 4} ${356 - k * 6} ${yy + 8} L${350 - k * 6} ${yy + 16} L${342 - k * 6} ${yy + 9} L${226 + k * 6} ${yy + 9} L${218 + k * 6} ${yy + 16} Z`}
              fill={c}
            />
          )
        })}
        {/* goats' hair */}
        <path d="M54 466 C48 448 60 436 76 438 C84 426 108 424 118 436 C132 436 140 450 134 466 Z" fill="#3b2a24" />
        {[64, 76, 88, 100, 112, 124].map((x, i) => (
          <path key={x} d={`M${x} ${440 + (i % 2) * 3} q${i % 2 ? 5 : -5} 12 0 24`} fill="none" stroke="#8a6a58" strokeWidth="1.6" strokeLinecap="round" />
        ))}
        {/* silver and copper */}
        <path d="M270 462 L314 462 L308 450 L276 450 Z" fill="#e9e4f2" />
        <path d="M308 450 L314 462 L300 462 L298 450 Z" fill={C.muted} />
        <path d="M282 450 L306 450 L302 440 L286 440 Z" fill="#e9e4f2" />
        <path d="M302 440 L306 450 L298 450 L296 440 Z" fill={C.muted} />
        <path d="M312 466 L352 466 L346 454 L318 454 Z" fill="#c9773f" />
        <path d="M346 454 L352 466 L338 466 L336 454 Z" fill="#b0612f" />
        <path d="M322 454 L344 454 L340 444 L326 444 Z" fill="#e59b62" />
        <path d="M340 444 L344 454 L336 454 L334 444 Z" fill="#c9773f" />
        {/* yarn: blue, purple, crimson, and linen */}
        <Skein x={150} y={468} c="#b3263a" shade="#8a1c2c" rot={-4} />
        <Skein x={214} y={470} c="#2536c4" shade="#1a2280" rot={3} />
        <Skein x={268} y={476} c="#f6f0e2" shade="#cfae98" rot={-3} />
        <Skein x={180} y={446} c="#6a3d9a" shade="#4a2a70" rot={6} />
        <Skein x={244} y={448} c="#2536c4" shade="#1a2280" rot={-6} />
        {/* a heap of gold: brooches, earrings and rings */}
        <Puffs
          puffs={[[156, 434, 16], [180, 420, 20], [206, 410, 24], [234, 420, 20], [258, 436, 15], [190, 394, 18], [222, 394, 17], [204, 376, 17], [212, 358, 12], [198, 362, 11]]}
          fill="#e2b04a"
          shade="#c9773f"
          dx={3}
          dy={3}
        />
        <Brooch x={176} y={420} r={7} />
        <Brooch x={232} y={416} r={6} />
        <Brooch x={206} y={388} r={6} />
        <Ring x={198} y={408} r={6} />
        <Ring x={218} y={400} r={5} />
        <Ring x={160} y={434} r={5} />
        <Ring x={248} y={430} r={5} />
        <Earring x={190} y={394} r={5} />
        <Earring x={226} y={428} r={5} />
        <Ring x={206} y={364} r={5} />
        <Brooch x={218} y={378} r={5} />
        {/* more keeps coming, and a ring rolls off the top */}
        {!still &&
          falling.map((f, i) => (
            <motion.g
              key={i}
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: [-200, 0, 0, 0], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5.4, repeat: Infinity, delay: f.d, times: [0, 0.3, 0.8, 1], ease: 'easeIn' }}
            >
              {f.kind === 'ring' ? <Ring x={f.x} y={f.to} r={6} /> : f.kind === 'ear' ? <Earring x={f.x} y={f.to} r={5} /> : <Brooch x={f.x} y={f.to} r={6} />}
            </motion.g>
          ))}
        {!still && (
          <motion.g
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: [0, 30, 70, 96], y: [0, 16, 46, 84], rotate: [0, 120, 260, 380], opacity: [0, 1, 1, 0] }}
            style={{ originX: '252px', originY: '424px', transformBox: 'view-box' }}
            transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 2.4, delay: 1, ease: 'easeIn' }}
          >
            <Ring x={252} y={424} r={6} />
          </motion.g>
        )}
      </Layer>
    </>
  )
}

// ——— Pekudei: the cloud rests on the finished Tent, fire in it by night ——————————

export function Pekudei() {
  const { tilt, still } = useArtMotion()
  const puffs: [number, number, number][] = [
    [120, 316, 36], [160, 296, 44], [206, 286, 50], [252, 298, 44], [290, 318, 34],
    [140, 262, 34], [196, 244, 40], [248, 258, 36], [96, 336, 24], [312, 338, 24],
  ]
  return (
    <>
      <NightSky id="pekudei" />
      <Layer depth={0.1} tilt={tilt}>
        <Stars seed={4034} n={110} maxY={300} />
      </Layer>
      <Layer depth={0.35} tilt={tilt}>
        <path d="M-40 400 C60 372 130 364 200 380 C270 396 330 366 460 372 L460 560 L-40 560 Z" fill="#4a5ad6" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 470 C100 458 300 458 460 468 L460 560 L-40 560 Z" fill="#2b39b8" />
        <TentEntrance x={122} y={330} w={156} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C100 490 300 490 460 498 L460 560 L-40 560 Z" fill="#141c6e" />
        {/* the cloud, covering the Tent */}
        <motion.ellipse
          cx="204"
          cy="290"
          rx="170"
          ry="120"
          fill="url(#glow)"
          animate={still ? undefined : { opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.g animate={still ? undefined : { y: [0, -3, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <Puffs puffs={puffs} fill="#e9e4f2" shade={C.blueSoft} dx={-5} dy={-5} />
          {/* fire within the cloud */}
          <ellipse cx="204" cy="290" rx="70" ry="40" fill="#ffe2b8" opacity="0.55" filter="url(#soft)" />
          <Flame cx={176} base={318} s={0.9} delay={0.4} />
          <Flame cx={232} base={318} s={0.85} delay={0.9} />
          <Flame cx={204} base={320} s={1.3} delay={0} />
          <g fill="#e9e4f2">
            {[[150, 330, 26], [196, 336, 30], [246, 332, 28]].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} />
            ))}
          </g>
        </motion.g>
      </Layer>
    </>
  )
}

export const SCENES: Record<string, () => ReactElement> = {
  shemot: () => <Shemot />,
  vaera: () => <Vaera />,
  bo: () => <Bo />,
  beshalach: () => <Beshalach />,
  yitro: () => <Yitro />,
  mishpatim: () => <Mishpatim />,
  terumah: () => <Terumah />,
  tetzaveh: () => <Tetzaveh />,
  'ki-tisa': () => <KiTisa />,
  vayakhel: () => <Vayakhel />,
  pekudei: () => <Pekudei />,
}
