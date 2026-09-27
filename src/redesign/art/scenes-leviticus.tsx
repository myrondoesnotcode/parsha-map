import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import { C, W, H, Layer, useArtMotion, TentEntrance, Flame, Smoke, rng } from './kit'

// ——— Vayikra: the altar before the Tent, its fire always burning ———————————————

export function Vayikra() {
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

export function Tazria() {
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


// ——— Shared pieces for the scenes below —————————————————————————————————

function DaySky({ id, top }: { id: string; top: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="0.72" stopColor={C.sand} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    </>
  )
}

/** Four-point sparkle, like the ones in Lech Lecha's sky. */
function Sparkle({ x, y, s, delay, color = '#fff7e6' }: { x: number; y: number; s: number; delay: number; color?: string }) {
  const { still } = useArtMotion()
  return (
    <motion.path
      d={`M${x} ${y - s * 2} Q${x} ${y} ${x + s * 2} ${y} Q${x} ${y} ${x} ${y + s * 2} Q${x} ${y} ${x - s * 2} ${y} Q${x} ${y} ${x} ${y - s * 2} Z`}
      fill={color}
      style={{ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' }}
      initial={false}
      animate={still ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0], scale: [0.2, 1, 0.2], rotate: [0, 45, 90] }}
      transition={{ duration: 3.2, repeat: Infinity, delay, ease: 'easeInOut', repeatDelay: 0.6 }}
    />
  )
}

/** A ram, side view, facing right; (x, y) is the ground under its middle. */
const FLEECE = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2
  return [Math.cos(a) * 38, -48 + Math.sin(a) * 17, Math.sin(a)] as const
})
function Ram({ x, y, s, flip, delay }: { x: number; y: number; s: number; flip?: boolean; delay: number }) {
  const { still } = useArtMotion()
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="4" cy="0" rx="52" ry="5" fill={C.ink} opacity="0.13" />
      {/* far legs */}
      <rect x="-20" y="-36" width="7" height="36" rx="3" fill="#3b2a24" />
      <rect x="28" y="-36" width="7" height="36" rx="3" fill="#3b2a24" />
      {/* fleece: a scalloped body, lighter on the back */}
      <ellipse cx="-42" cy="-50" rx="8" ry="12" fill="#e2d2b2" />
      <ellipse cx="0" cy="-48" rx="40" ry="19" fill="#e2d2b2" />
      {FLEECE.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="9.5" fill="#e2d2b2" />)}
      <ellipse cx="-2" cy="-54" rx="38" ry="14" fill="#f6f0e2" />
      {FLEECE.filter(([, , sn]) => sn < 0.1).map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy - 1} r="8.5" fill="#f6f0e2" />)}
      {/* near legs */}
      <rect x="-30" y="-34" width="8" height="34" rx="3" fill="#3b2a24" />
      <rect x="18" y="-34" width="8" height="34" rx="3" fill="#3b2a24" />
      {/* head, dipping now and then to graze */}
      <motion.g
        style={{ originX: '32px', originY: '-58px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 0, 16, 16, 0] }}
        transition={{ duration: 7, times: [0, 0.35, 0.5, 0.82, 1], repeat: Infinity, delay, ease: 'easeInOut' }}
      >
        <path d="M28 -62 C32 -76 50 -80 58 -72 L76 -50 C79 -43 73 -38 67 -41 L44 -52 C34 -54 28 -56 28 -62 Z" fill="#8a6a58" />
        <ellipse cx="72" cy="-45" rx="5" ry="4.5" fill="#3b2a24" />
        <circle cx="56" cy="-66" r="2.4" fill={C.ink} />
        {/* the curled horn, ridged */}
        <path d="M46 -72 C42 -90 18 -90 16 -70 C14 -54 30 -48 37 -55 C42 -60 38 -67 32 -64" fill="none" stroke="#cfae98" strokeWidth="12" strokeLinecap="round" />
        <path d="M46 -72 C42 -90 18 -90 16 -70 C14 -54 30 -48 37 -55" fill="none" stroke="#b77b4d" strokeWidth="12" strokeDasharray="1.6 5.5" />
        <circle cx="28" cy="-67" r="7" fill="#b77b4d" />
        <circle cx="29" cy="-66" r="3.5" fill="#8a6a58" />
        <path d="M44 -82 C36 -90 22 -86 19 -76" fill="none" stroke="#f6f0e2" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      </motion.g>
    </g>
  )
}

/** A he-goat, side view, facing right; (x, y) is the ground under its middle. */
function Goat({ x, y, s, flip, delay }: { x: number; y: number; s: number; flip?: boolean; delay: number }) {
  const { still } = useArtMotion()
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="4" cy="0" rx="50" ry="5" fill={C.ink} opacity="0.13" />
      {/* far legs */}
      <path d="M-26 -40 L-18 -40 L-19 -6 L-24 -6 Z" fill="#3b2a24" />
      <path d="M28 -40 L36 -40 L35 -6 L30 -6 Z" fill="#3b2a24" />
      <path d="M-26 -6 L-17 -6 L-17 0 L-26 0 Z M29 -6 L36 -6 L36 0 L29 0 Z" fill={C.ink} />
      {/* short tail, flicking up */}
      <motion.path
        d="M-40 -62 C-48 -68 -52 -78 -48 -84 C-42 -78 -38 -72 -34 -66 Z"
        fill="#3b2a24"
        style={{ originX: '-38px', originY: '-64px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 0, -16, 8, 0] }}
        transition={{ duration: 3.6, times: [0, 0.6, 0.7, 0.8, 1], repeat: Infinity, delay }}
      />
      {/* body, with long hair hanging from the belly */}
      <path d="M-44 -58 C-38 -74 24 -76 40 -66 C50 -58 48 -40 38 -36 C14 -30 -24 -30 -40 -38 C-50 -44 -52 -52 -44 -58 Z" fill="#8a6a58" />
      <path d="M-42 -42 C-24 -32 16 -32 40 -40 L38 -34 L34 -26 L30 -33 L24 -24 L20 -32 L12 -24 L8 -31 L0 -24 L-4 -31 L-12 -24 L-16 -32 L-24 -25 L-28 -33 L-36 -27 L-38 -36 Z" fill="#3b2a24" />
      <path d="M-42 -58 C-34 -70 22 -72 38 -64 C20 -66 -20 -64 -42 -54 Z" fill="#b77b4d" />
      {/* near legs */}
      <path d="M-36 -40 L-27 -40 L-28 -6 L-35 -6 Z" fill="#3b2a24" />
      <path d="M18 -40 L27 -40 L26 -6 L19 -6 Z" fill="#3b2a24" />
      <path d="M-36 -6 L-27 -6 L-27 0 L-36 0 Z M18 -6 L27 -6 L27 0 L18 0 Z" fill={C.ink} />
      {/* neck and head, lifting now and then */}
      <motion.g
        style={{ originX: '34px', originY: '-62px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 0, -7, -7, 0] }}
        transition={{ duration: 6.5, times: [0, 0.4, 0.52, 0.85, 1], repeat: Infinity, delay, ease: 'easeInOut' }}
      >
        <path d="M22 -66 C26 -80 32 -92 42 -98 C52 -104 60 -98 64 -90 L74 -72 C76 -66 70 -62 64 -66 L54 -72 C48 -64 44 -52 40 -44 Z" fill="#8a6a58" />
        <path d="M24 -66 C28 -80 34 -90 42 -96 C38 -86 34 -76 32 -62 Z" fill="#b77b4d" />
        {/* beard */}
        <path d="M58 -70 L68 -68 C66 -60 64 -54 60 -48 C58 -56 58 -62 58 -70 Z" fill="#3b2a24" />
        {/* horns: long, ridged, sweeping back */}
        <path d="M36 -96 C34 -116 22 -132 2 -136 C0 -134 2 -132 6 -130 C20 -124 28 -110 28 -94 Z" fill="#cfae98" />
        {[[30, -104], [27, -112], [22, -120], [15, -127]].map(([rx, ry]) => (
          <path key={rx} d={`M${rx - 4} ${ry + 1} L${rx + 5} ${ry - 2}`} stroke="#b77b4d" strokeWidth="1.6" />
        ))}
        {/* ear, hanging sideways */}
        <path d="M40 -90 C32 -90 22 -86 18 -80 C26 -80 34 -82 42 -84 Z" fill="#3b2a24" />
        <ellipse cx="53" cy="-90" rx="3" ry="2.4" fill="#f1cf7a" />
        <rect x="51.4" y="-90.8" width="3.4" height="1.6" fill={C.ink} />
        <ellipse cx="71" cy="-71" rx="2" ry="1.4" fill={C.ink} />
      </motion.g>
    </g>
  )
}

function VineLeaf({ x, y, r, rot, fill }: { x: number; y: number; r: number; rot: number; fill: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${r})`}
      d="M0 1 C-0.5 0.8 -1.05 0.3 -0.95 -0.25 C-0.9 -0.55 -0.6 -0.5 -0.42 -0.38 C-0.5 -0.8 -0.25 -1.05 0 -1.05 C0.25 -1.05 0.5 -0.8 0.42 -0.38 C0.6 -0.5 0.9 -0.55 0.95 -0.25 C1.05 0.3 0.5 0.8 0 1 Z"
      fill={fill}
    />
  )
}

/** A low bush vine: gnarled stock, arms spread wide. `wild` lets unpruned runners sprawl. */
function Vine({ x, y, s, grapes, wild, seed = 3 }: { x: number; y: number; s: number; grapes?: boolean; wild?: boolean; seed?: number }) {
  const leaves = useMemo(() => {
    const r = rng(seed)
    const base = [[-48, -42], [-34, -46], [-20, -40], [-40, -56], [-22, -56], [48, -42], [34, -46], [20, -40], [40, -56], [22, -56], [0, -64], [-10, -52], [10, -52], [0, -44]]
    const extra = [[-66, -44], [-82, -30], [-92, -12], [66, -48], [84, -32], [92, -12], [-56, -66], [58, -68], [0, -80], [-16, -76], [18, -78], [-30, -78], [32, -82], [-74, -60], [74, -62]]
    return (wild ? [...base, ...extra] : base).map(([lx, ly]) => ({ x: lx + (r() - 0.5) * 4, y: ly + (r() - 0.5) * 4, r: 10 + r() * 4, rot: (r() - 0.5) * 70, dark: r() < 0.45 }))
  }, [seed, wild])
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx={wild ? 70 : 44} ry="4" fill={C.ink} opacity="0.12" />
      <g fill="none" stroke="#8a5a3c" strokeLinecap="round">
        <path d="M0 -22 C-14 -30 -30 -34 -48 -42" strokeWidth="5" />
        <path d="M0 -22 C14 -30 30 -34 48 -42" strokeWidth="5" />
        <path d="M0 -22 C-4 -36 2 -46 0 -60" strokeWidth="4" />
        {wild && (
          <>
            <path d="M-46 -42 C-66 -50 -84 -40 -92 -22 C-96 -12 -96 -4 -88 -1" strokeWidth="3" />
            <path d="M46 -42 C66 -52 86 -42 92 -22 C95 -12 92 -4 86 -1" strokeWidth="3" />
            <path d="M0 -58 C-6 -72 -20 -82 -34 -80" strokeWidth="2.6" />
            <path d="M0 -58 C8 -74 22 -84 36 -84" strokeWidth="2.6" />
          </>
        )}
      </g>
      <path d="M-6 0 C-8 -10 -3 -16 -6 -24 L6 -24 C3 -16 8 -10 7 0 Z" fill="#8a5a3c" />
      {leaves.map((l, i) => (
        <VineLeaf key={i} x={l.x} y={l.y} r={l.r} rot={l.rot} fill={l.dark ? '#5f7d45' : '#7d9a5a'} />
      ))}
      {wild && (
        <g fill="none" stroke="#5f7d45" strokeWidth="1.6" strokeLinecap="round">
          <path d="M-100 -20 c-6 -6 -2 -14 4 -12 c4 2 2 8 -2 6" />
          <path d="M100 -24 c6 -6 2 -14 -4 -12 c-4 2 -2 8 2 6" />
          <path d="M-40 -88 c-4 -8 4 -14 8 -10 c3 3 0 7 -3 5" />
          <path d="M44 -92 c4 -8 -4 -14 -8 -10 c-3 3 0 7 3 5" />
        </g>
      )}
      {grapes && [[-30, -34], [28, -32], [-2, -38]].map(([gx, gy], i) => <Cluster key={i} x={gx} y={gy} />)}
    </g>
  )
}

function Cluster({ x, y, r = 3.4 }: { x: number; y: number; r?: number }) {
  const pts = [[-1.5, 0], [0, 0], [1.5, 0], [-1, 1], [1, 1], [0, 2]]
  return (
    <g>
      {pts.map(([px, py], i) => (
        <circle key={i} cx={x + px * r * 1.3} cy={y + py * r * 1.5} r={r} fill={i % 2 ? '#6a3d9a' : '#6a3d9a'} />
      ))}
    </g>
  )
}

/** One stalk of ripe grain: stem and a bearded ear. */
function Stalk({ x, y, h, lean, dark }: { x: number; y: number; h: number; lean: number; dark?: boolean }) {
  const tx = x + lean
  const ty = y - h
  const a = (Math.atan2(ty - y, tx - x) * 180) / Math.PI + 90
  return (
    <g>
      <path d={`M${x} ${y} Q${x + lean * 0.3} ${y - h * 0.5} ${tx} ${ty}`} fill="none" stroke={dark ? '#c9773f' : '#e2b04a'} strokeWidth="2.6" />
      <g transform={`translate(${tx} ${ty}) rotate(${a})`}>
        <path d="M0 -4 L-4 -22 L0 -30 L4 -22 Z" fill={dark ? '#e2b04a' : '#f1cf7a'} />
        {[-24, -18, -12].map((yy) => (
          <path key={yy} d={`M-3 ${yy} L-8 ${yy - 10} M3 ${yy} L8 ${yy - 10}`} stroke={dark ? '#c9773f' : '#e2b04a'} strokeWidth="1" />
        ))}
        <path d="M0 -30 L0 -42" stroke={dark ? '#c9773f' : '#e2b04a'} strokeWidth="1" />
      </g>
    </g>
  )
}

// ——— Tzav: for the ordination, the basket of unleavened bread, the oil and two rams —————

export function Tzav() {
  const { tilt, still } = useArtMotion()
  const bx = 176
  const fx = 296
  return (
    <>
      <DaySky id="tzav" top="#f4b27c" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="306" cy="112" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 350 L30 320 L90 296 L140 312 L200 280 L256 300 L320 284 L380 312 L460 330 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 390 C80 378 300 376 460 386 L460 560 L-40 560 Z" fill={C.land} />
        <Ram x={84} y={462} s={1.34} delay={0} />
        <Ram x={318} y={468} s={1.34} flip delay={3.2} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 482 C100 470 300 470 460 478 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <ellipse cx={bx} cy="510" rx="80" ry="7" fill={C.ink} opacity="0.13" />
        <ellipse cx={fx} cy="510" rx="36" ry="5" fill={C.ink} opacity="0.13" />
        {/* the breads, standing in the basket: an unleavened cake, oil bread, a wafer */}
        <circle cx={bx - 32} cy="448" r="27" fill="#f6f0e2" />
        <circle cx={bx - 32} cy="448" r="27" fill="none" stroke="#e6cfa8" strokeWidth="4" />
        {[[-10, -10], [4, -12], [-14, 4], [0, 2], [14, -2], [-4, 14], [10, 12]].map(([dx, dy]) => (
          <circle key={`${dx}${dy}`} cx={bx - 32 + dx} cy={448 + dy} r="1.8" fill="#c9773f" />
        ))}
        <ellipse cx={bx + 20} cy="446" rx="31" ry="22" fill="#e2b04a" />
        <ellipse cx={bx + 14} cy="440" rx="19" ry="10" fill="#f1cf7a" />
        <ellipse cx={bx + 8} cy="437" rx="6" ry="3" fill="#fff7e6" />
        <ellipse cx={bx + 50} cy="452" rx="25" ry="6" fill="#f6f0e2" transform={`rotate(-38 ${bx + 50} 452)`} />
        <ellipse cx={bx + 50} cy="452" rx="25" ry="6" fill="none" stroke="#e6cfa8" strokeWidth="2" transform={`rotate(-38 ${bx + 50} 452)`} />
        {/* woven basket */}
        <path d={`M${bx - 68} 460 L${bx + 68} 460 L${bx + 54} 510 L${bx - 54} 510 Z`} fill="#c9773f" />
        <path d={`M${bx - 68} 460 L${bx - 44} 460 L${bx - 34} 510 L${bx - 54} 510 Z`} fill="#e59b62" />
        <path d={`M${bx + 44} 460 L${bx + 68} 460 L${bx + 54} 510 L${bx + 36} 510 Z`} fill="#b0612f" />
        {[472, 484, 496].map((yy, r) =>
          Array.from({ length: 11 }, (_, k) => (
            <path key={`${yy}-${k}`} d={`M${bx - 58 + k * 11.5 + (r % 2) * 5} ${yy - 4} l6 8`} stroke="#8a5a3c" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
          ))
        )}
        <rect x={bx - 74} y="454" width="148" height="11" rx="5.5" fill="#b0612f" />
        <rect x={bx - 74} y="454" width="148" height="4" rx="2" fill="#c9773f" />
        {/* the flask of anointing oil, catching the light */}
        <motion.ellipse
          cx={fx}
          cy={466}
          rx="60"
          ry="54"
          fill="url(#glow)"
          animate={still ? { opacity: 0.7 } : { opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <path d={`M${fx - 26} 508 C${fx - 40} 494 ${fx - 36} 468 ${fx - 14} 460 L${fx - 9} 440 L${fx + 9} 440 L${fx + 14} 460 C${fx + 36} 468 ${fx + 40} 494 ${fx + 26} 508 Z`} fill="#8a5a3c" />
        <path d={`M${fx + 6} 460 L${fx + 14} 460 C${fx + 36} 468 ${fx + 40} 494 ${fx + 26} 508 L${fx + 12} 508 C${fx + 24} 494 ${fx + 24} 470 ${fx + 6} 460 Z`} fill="#8a5a3c" />
        <path d={`M${fx - 22} 476 C${fx - 24} 488 ${fx - 20} 496 ${fx - 14} 500`} fill="none" stroke="#b0612f" strokeWidth="5" strokeLinecap="round" />
        <rect x={fx - 13} y="433" width="26" height="9" rx="4" fill="#b0612f" />
        <ellipse cx={fx} cy="434" rx="9" ry="2.6" fill="#e2b04a" />
        <Sparkle x={fx - 16} y={478} s={7} delay={0.4} />
        <Sparkle x={fx + 2} y={436} s={4.5} delay={2.1} color="#ffe2b8" />
      </Layer>
    </>
  )
}

// ——— Shemini: signs of what may be eaten — an ox, a fish with fins and scales, a locust —————

/** An ox, side view, facing right; each hoof split in two. */
function Ox({ x, y, s, delay }: { x: number; y: number; s: number; delay: number }) {
  const { still } = useArtMotion()
  const hoof = (hx: number, fill: string) => (
    <path d={`M${hx - 8} 0 L${hx - 7} -9 L${hx + 7} -9 L${hx + 8} 0 L${hx + 1.8} 0 L${hx} -6 L${hx - 1.8} 0 Z`} fill={fill} />
  )
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="6" cy="1" rx="90" ry="6" fill={C.ink} opacity="0.13" />
      {/* far legs */}
      <path d="M-50 -52 L-38 -52 L-40 -9 L-50 -9 Z" fill="#8a6a58" />
      {hoof(-45, '#3b2a24')}
      <path d="M40 -52 L52 -52 L50 -9 L41 -9 Z" fill="#8a6a58" />
      {hoof(46, '#3b2a24')}
      {/* tail, swishing */}
      <motion.path
        d="M-72 -92 C-84 -80 -82 -60 -82 -40"
        fill="none"
        stroke="#8a6a58"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ originX: '-72px', originY: '-92px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 12, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
      />
      {/* body */}
      <path d="M-74 -96 C-44 -106 26 -110 52 -100 C68 -92 72 -64 64 -50 C40 -40 -40 -40 -68 -48 C-80 -60 -82 -88 -74 -96 Z" fill="#b77b4d" />
      <path d="M-68 -50 C-40 -42 40 -42 64 -50 C60 -44 50 -40 30 -38 C-10 -36 -50 -38 -68 -50 Z" fill="#8a6a58" />
      <path d="M-72 -94 C-44 -104 24 -108 50 -100 C20 -102 -40 -98 -72 -86 Z" fill="#cfae98" />
      {/* near legs */}
      <path d="M-66 -56 L-50 -56 L-54 -9 L-66 -9 Z" fill="#b77b4d" />
      {hoof(-60, '#3b2a24')}
      <path d="M28 -56 L44 -56 L42 -9 L30 -9 Z" fill="#b77b4d" />
      {hoof(36, '#3b2a24')}
      {/* head, chewing the cud */}
      <motion.g
        style={{ originX: '56px', originY: '-92px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 3, 0, 3, 0, 0] }}
        transition={{ duration: 5, times: [0, 0.12, 0.24, 0.36, 0.48, 1], repeat: Infinity, delay: delay + 1, ease: 'easeInOut' }}
      >
        <path d="M50 -100 C62 -108 80 -104 88 -94 L100 -66 C102 -58 94 -54 88 -58 L66 -66 C56 -72 50 -86 50 -100 Z" fill="#b77b4d" />
        <path d="M54 -76 C58 -64 64 -58 74 -58 L66 -66 C60 -70 56 -74 54 -76 Z" fill="#8a6a58" />
        <ellipse cx="95" cy="-61" rx="8" ry="7" fill="#cfae98" />
        <circle cx="97" cy="-63" r="1.6" fill="#3b2a24" />
        <path d="M74 -102 C68 -114 72 -124 82 -126 C78 -118 80 -108 86 -100 Z" fill="#f6f0e2" />
        <path d="M70 -94 L52 -100 L60 -88 Z" fill="#8a6a58" />
        <circle cx="82" cy="-88" r="2.6" fill={C.ink} />
      </motion.g>
    </g>
  )
}

/** A fish with fins and scales, facing left, centred on (0, 0). */
function Fish() {
  const scales: [number, number][] = []
  for (let sx = -20; sx <= 16; sx += 7) for (let sy = -7; sy <= 7; sy += 6) scales.push([sx, sy])
  return (
    <g>
      <path d="M-10 -14 L0 -28 L16 -14 Z" fill="#c9773f" />
      <path d="M-4 13 L4 22 L10 12 Z" fill="#c9773f" />
      <path d="M26 -4 L46 -18 L42 0 L46 18 L26 4 Z" fill="#c9773f" />
      <path d="M-42 0 C-28 -17 10 -19 28 -6 L28 6 C10 19 -28 17 -42 0 Z" fill="#e59b62" />
      <path d="M-40 3 C-26 14 10 16 28 5 C10 12 -24 12 -40 3 Z" fill="#ffe2b8" />
      {scales.map(([sx, sy]) => (
        <path key={`${sx}${sy}`} d={`M${sx} ${sy - 3.5} A3.5 3.5 0 0 1 ${sx} ${sy + 3.5}`} fill="none" stroke="#b0612f" strokeWidth="1.3" />
      ))}
      <path d="M-26 -9 C-22 -3 -22 3 -26 9" fill="none" stroke="#b0612f" strokeWidth="1.6" />
      <path d="M-16 2 L-6 10 L-6 2 Z" fill="#c9773f" />
      <circle cx="-33" cy="-3" r="2.8" fill={C.ink} />
    </g>
  )
}

/** A locust facing right: long wings and the big jumping legs; (0, 0) is where it stands. */
function Locust() {
  return (
    <g>
      {/* far hind leg */}
      <path d="M2 -6 C-8 -14 -18 -22 -24 -22 C-20 -16 -10 -8 0 -2 Z" fill="#5f7d45" />
      <path d="M-23 -21 L-6 0" stroke="#5f7d45" strokeWidth="2" strokeLinecap="round" />
      {/* legs in front */}
      <path d="M14 -6 L18 0 M20 -6 L26 0" stroke="#5f7d45" strokeWidth="2" strokeLinecap="round" />
      <path d="M-32 -9 C-28 -18 -4 -18 8 -16 L8 -3 C-6 -1 -26 -1 -32 -9 Z" fill="#7d9a5a" />
      {[-24, -16, -8, 0].map((sx) => (
        <path key={sx} d={`M${sx} -15 L${sx} -3`} stroke="#5f7d45" strokeWidth="1.2" />
      ))}
      <path d="M8 -17 C10 -21 20 -21 22 -16 L22 -5 L8 -5 Z" fill="#5f7d45" />
      <ellipse cx="27" cy="-11" rx="7" ry="7.5" fill="#7d9a5a" />
      <ellipse cx="28" cy="-13" rx="2.6" ry="3" fill="#3b2a24" />
      <path d="M29 -17 C32 -26 38 -32 46 -34 M27 -18 C28 -28 32 -36 38 -40" fill="none" stroke="#5f7d45" strokeWidth="1.3" strokeLinecap="round" />
      {/* long wing along the back */}
      <path d="M12 -19 L-40 -18 C-45 -16 -44 -12 -39 -12 L12 -14 Z" fill="#a9bf7e" />
      <path d="M8 -17 L-36 -16 M4 -15 L-32 -14" stroke="#7d9a5a" strokeWidth="0.8" />
      {/* the near jumping leg: a big thigh, and the shin folded under it */}
      <path d="M12 -8 C4 -20 -12 -34 -26 -35 C-31 -35 -31 -29 -26 -27 C-14 -21 -2 -10 6 -3 Z" fill="#7d9a5a" />
      {[[2, -12], [-6, -19], [-14, -25]].map(([cx, cy]) => (
        <path key={cx} d={`M${cx - 3} ${cy - 4} L${cx + 1} ${cy} L${cx - 4} ${cy + 3}`} fill="none" stroke="#5f7d45" strokeWidth="1.3" />
      ))}
      <path d="M-28 -31 L-8 0 L0 0" fill="none" stroke="#5f7d45" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}

export function Shemini() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <DaySky id="shemini" top={C.blueSoft} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="96" cy="120" r="28" fill="#fff7e6" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 350 C30 320 90 300 150 318 C210 336 260 296 330 300 C380 302 420 326 460 336 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 400 C80 386 300 386 460 396 L460 560 L-40 560 Z" fill={C.land} />
        <Ox x={148} y={452} s={1.12} delay={0} />
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        {/* a pool, and a fish turning in it */}
        <clipPath id="shemini-pool">
          <path d="M176 530 C170 486 240 456 320 456 C380 456 440 470 460 480 L460 560 L176 560 Z" />
        </clipPath>
        <path d="M176 530 C170 486 240 456 320 456 C380 456 440 470 460 480 L460 560 L176 560 Z" fill="#5d86b8" />
        <g clipPath="url(#shemini-pool)">
          <path d="M190 510 C200 480 250 466 320 466 C380 466 430 476 460 488 L460 560 L190 560 Z" fill="#8fb3d4" />
          <motion.g
            animate={still ? undefined : { x: [0, -26, 0], y: [0, 3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.g
              style={{ originX: '306px', originY: '494px', transformBox: 'view-box' }}
              animate={still ? undefined : { rotate: [0, -3, 2, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <g transform="translate(306 494) scale(1.45)"><Fish /></g>
            </motion.g>
          </motion.g>
          {[[240, 476, 22], [372, 482, 26]].map(([rx, ry, w]) => (
            <path key={rx} d={`M${rx - w} ${ry} Q${rx} ${ry - 4} ${rx + w} ${ry}`} fill="none" stroke="#bcd3e6" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 492 C40 482 120 484 170 498 C196 506 204 526 196 560 L-40 560 Z" fill="#e2d2b2" />
        {[[26, 494], [150, 500], [178, 512]].map(([gx, gy]) => (
          <path key={gx} d={`M${gx - 8} ${gy} L${gx - 10} ${gy - 18} L${gx - 3} ${gy} L${gx} ${gy - 24} L${gx + 3} ${gy} L${gx + 10} ${gy - 16} L${gx + 8} ${gy} Z`} fill="#7d9a5a" />
        ))}
        <ellipse cx="86" cy="506" rx="40" ry="4" fill={C.ink} opacity="0.12" />
        {/* the locust springs on its jumping legs */}
        <motion.g
          animate={still ? undefined : { y: [0, 0, -46, 0, 0], rotate: [0, 0, -8, 0, 0] }}
          transition={{ duration: 3.4, times: [0, 0.5, 0.64, 0.78, 1], repeat: Infinity, ease: ['linear', 'easeOut', 'easeIn', 'linear'] }}
          style={{ originX: '86px', originY: '504px', transformBox: 'view-box' }}
        >
          <g transform="translate(86 504) scale(1.7)"><Locust /></g>
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Metzora: the live bird set free over the open country ———————————————

function Bird({ still }: { still: boolean }) {
  const wing = (fill: string, d: number) => (
    <motion.path
      d="M-6 -3 C-12 -26 6 -40 20 -38 C8 -28 6 -16 6 -3 Z"
      fill={fill}
      style={{ originX: '0px', originY: '-3px', transformBox: 'view-box' }}
      animate={still ? undefined : { scaleY: [1, -0.7, 1] }}
      transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay: d }}
    />
  )
  return (
    <g>
      {wing('#8a6a58', 0.05)}
      <path d="M-14 0 L-34 -8 L-30 0 L-34 8 Z" fill="#8a6a58" />
      <ellipse cx="0" cy="0" rx="18" ry="8" fill="#b77b4d" />
      <path d="M-14 2 C-4 9 10 8 16 2 C8 6 -4 6 -14 2 Z" fill="#f6f0e2" />
      <circle cx="17" cy="-4" r="7.5" fill="#b77b4d" />
      <path d="M23 -6 L31 -3 L23 -1 Z" fill="#3b2a24" />
      <circle cx="19" cy="-6" r="1.6" fill={C.ink} />
      {wing('#cfae98', 0)}
    </g>
  )
}

export function Metzora() {
  const { tilt, still } = useArtMotion()
  const vx = 124
  return (
    <>
      <DaySky id="metzora" top={C.blueSoft} />
      <Layer depth={0.08} tilt={tilt}>
        <circle cx="300" cy="104" r="30" fill="#fff7e6" />
        <ellipse cx="200" cy="340" rx="300" ry="22" fill="#fff7e6" opacity="0.35" filter="url(#soft)" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 360 C40 344 100 336 160 346 C220 356 270 330 340 334 C390 337 430 350 460 356 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        {/* the open country, wide and empty */}
        <path d="M-40 396 C100 384 300 382 460 390 L460 560 L-40 560 Z" fill={C.land} />
        {[[40, 400], [230, 392], [350, 398]].map(([sx, sy]) => (
          <g key={sx}>
            <ellipse cx={sx} cy={sy} rx="14" ry="7" fill="#7d9a5a" />
            <ellipse cx={sx - 3} cy={sy - 2} rx="8" ry="4" fill="#a9bf7e" />
          </g>
        ))}
        <path d="M-40 440 C100 428 300 426 460 436 L460 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
      <Layer depth={0.7} tilt={tilt}>
        {/* set free: it rises from the field and away over the country */}
        {still ? (
          <g transform="translate(250 262) rotate(-18) scale(2.1)"><Bird still /></g>
        ) : (
          <motion.g
            initial={{ x: 90, y: 440, opacity: 0, rotate: -26, scale: 1.2 }}
            animate={{ x: [90, 190, 290, 370], y: [440, 330, 236, 176], opacity: [0, 1, 1, 0], rotate: [-30, -22, -14, -10], scale: [1.6, 2.2, 2, 1.7] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.75, 1], repeatDelay: 0.8 }}
          >
            <Bird still={false} />
          </motion.g>
        )}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 486 C100 474 300 476 460 482 L460 560 L-40 560 Z" fill="#d9ccb1" />
        {/* earthen vessel of fresh water */}
        <ellipse cx={vx} cy="512" rx="54" ry="6" fill={C.ink} opacity="0.13" />
        <path d={`M${vx - 36} 432 C${vx - 32} 446 ${vx - 62} 456 ${vx - 60} 478 C${vx - 58} 500 ${vx - 38} 512 ${vx} 512 C${vx + 38} 512 ${vx + 58} 500 ${vx + 60} 478 C${vx + 62} 456 ${vx + 32} 446 ${vx + 36} 432 Z`} fill="#c9773f" />
        <path d={`M${vx + 16} 446 C${vx + 40} 454 ${vx + 50} 466 ${vx + 50} 480 C${vx + 50} 498 ${vx + 36} 508 ${vx + 12} 511 C${vx + 38} 512 ${vx + 58} 500 ${vx + 60} 478 C${vx + 62} 456 ${vx + 32} 446 ${vx + 36} 432 Z`} fill="#b0612f" />
        <path d={`M${vx - 42} 462 C${vx - 50} 474 ${vx - 48} 492 ${vx - 34} 500`} fill="none" stroke="#e59b62" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx={vx} cy="432" rx="39" ry="10" fill="#b0612f" />
        <ellipse cx={vx} cy="433" rx="32" ry="7" fill="#5d86b8" />
        <ellipse cx={vx} cy="434" rx="28" ry="5" fill="#8fb3d4" />
        <motion.ellipse
          cx={vx}
          cy={434}
          rx="10"
          ry="2"
          fill="none"
          stroke="#bcd3e6"
          strokeWidth="1.6"
          style={{ originX: `${vx}px`, originY: '434px', transformBox: 'view-box' }}
          animate={still ? { scale: 1.8, opacity: 0.8 } : { scale: [0.6, 2.6], opacity: [0.9, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* cedar wood */}
        <g transform="rotate(-12 284 486)">
          <ellipse cx="284" cy="506" rx="70" ry="5" fill={C.ink} opacity="0.12" transform="rotate(12 284 486)" />
          <rect x="216" y="474" width="138" height="22" rx="4" fill="#b0612f" />
          <rect x="216" y="474" width="138" height="7" rx="3" fill="#c9773f" />
          <path d="M232 488 L262 488 M280 484 L318 484 M300 491 L336 491" stroke="#8a5a3c" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="354" cy="485" rx="6" ry="11" fill="#e59b62" />
          <ellipse cx="354" cy="485" rx="3" ry="6" fill="none" stroke="#c9773f" strokeWidth="1.4" />
        </g>
        {/* hyssop, a sprig of small grey-green leaves */}
        <g>
          <path d="M218 514 C250 500 290 486 330 452" fill="none" stroke="#5f7d45" strokeWidth="2.6" strokeLinecap="round" />
          {[[256, 497], [276, 489], [294, 478], [308, 468], [320, 459], [331, 450]].map(([hx, hy], i) => (
            <g key={i}>
              <ellipse cx={hx - 4} cy={hy - 6} rx="5" ry="3" fill="#7d9a5a" transform={`rotate(-50 ${hx - 4} ${hy - 6})`} />
              <ellipse cx={hx + 5} cy={hy + 2} rx="5" ry="3" fill="#a9bf7e" transform={`rotate(-10 ${hx + 5} ${hy + 2})`} />
            </g>
          ))}
          <ellipse cx="336" cy="444" rx="7" ry="5" fill="#a9bf7e" />
        </g>
        {/* crimson yarn, a loose skein */}
        <g fill="none" stroke="#b3263a" strokeWidth="3" strokeLinecap="round">
          <ellipse cx="228" cy="506" rx="22" ry="8" />
          <ellipse cx="230" cy="505" rx="17" ry="6" transform="rotate(-8 230 505)" />
          <ellipse cx="226" cy="507" rx="25" ry="7" transform="rotate(6 226 507)" />
          <path d="M250 506 C262 510 270 512 282 508" />
        </g>
      </Layer>
    </>
  )
}

// ——— Acharei Mot: two he-goats at the Tent's entrance, a lot beside each —————————

function Lot({ x, y, delay }: { x: number; y: number; delay: number }) {
  const { still } = useArtMotion()
  return (
    <g>
      <motion.ellipse
        cx={x}
        cy={y - 14}
        rx="30"
        ry="30"
        fill="url(#glow)"
        animate={still ? { opacity: 0.6 } : { opacity: [0.1, 0.9, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, delay, ease: 'easeInOut' }}
      />
      <ellipse cx={x + 3} cy={y} rx="16" ry="3" fill={C.ink} opacity="0.15" />
      <path d={`M${x - 11} ${y} L${x - 11} ${y - 20} Q${x - 11} ${y - 30} ${x} ${y - 30} Q${x + 11} ${y - 30} ${x + 11} ${y - 20} L${x + 11} ${y} Z`} fill="#f6f0e2" />
      <path d={`M${x + 4} ${y} L${x + 4} ${y - 29} Q${x + 11} ${y - 27} ${x + 11} ${y - 20} L${x + 11} ${y} Z`} fill="#d9ccb1" />
    </g>
  )
}

export function AchareiMot() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <DaySky id="acharei-mot" top="#f4b27c" />
      <Layer depth={0.12} tilt={tilt}>
        <motion.g animate={still ? undefined : { opacity: [0.35, 0.6, 0.35] }} transition={{ duration: 6, repeat: Infinity }}>
          {[-16, -5, 6, 17].map((a) => (
            <path key={a} d="M200 -20 L186 380 L214 380 Z" fill="#fff7e6" opacity="0.45" transform={`rotate(${a} 200 -20)`} />
          ))}
        </motion.g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 340 L40 310 L100 290 L150 250 L196 276 L240 246 L290 282 L350 300 L460 320 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        <path d="M-40 376 C80 364 300 360 460 370 L460 560 L-40 560 Z" fill={C.land} />
        <TentEntrance x={145} y={254} w={110} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C100 458 300 458 460 466 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <Goat x={96} y={494} s={1.3} delay={0} />
        <Goat x={304} y={496} s={1.3} flip delay={2.2} />
        <Lot x={178} y={508} delay={0} />
        <Lot x={222} y={510} delay={2.5} />
      </Layer>
    </>
  )
}

// ——— Kedoshim: the field reaped but its edges left standing; fallen grapes left —————

export function Kedoshim() {
  const { tilt, still } = useArtMotion()
  const edge = useMemo(() => {
    const r = rng(1909)
    const side = (x0: number, x1: number) =>
      Array.from({ length: 20 }, (_, i) => ({ x: x0 + ((x1 - x0) * (i + r() * 0.8)) / 20, h: 120 + r() * 50, lean: (r() - 0.5) * 20, dark: r() < 0.4 }))
    return { left: side(10, 104), right: side(298, 396) }
  }, [])
  const stubble = useMemo(() => {
    const r = rng(1910)
    const out: [number, number][] = []
    for (let row = 0; row < 5; row++) for (let k = 0; k < 15; k++) out.push([110 + k * 13 + (row % 2) * 6 + r() * 3, 458 + row * 12 + r() * 2])
    return out
  }, [])
  const sway = (ox: number, d: number) => ({
    style: { originX: `${ox}px`, originY: '520px', transformBox: 'view-box' as const },
    animate: still ? undefined : { rotate: [-1.8, 2, -1.8] },
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay: d },
  })
  return (
    <>
      <DaySky id="kedoshim" top="#f4b27c" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="200" cy="110" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 C40 300 110 290 170 306 C230 322 280 288 340 290 C390 292 430 312 460 320 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* the vineyard, some grapes left where they fell */}
        <path d="M-40 396 C60 380 200 370 460 380 L460 560 L-40 560 Z" fill={C.land} />
        <Vine x={148} y={414} s={0.95} grapes seed={11} />
        <Vine x={258} y={410} s={0.95} grapes seed={12} />
        <Cluster x={134} y={420} r={2.8} />
        <Cluster x={270} y={416} r={2.8} />
        {[[166, 418], [174, 421], [236, 414], [244, 417], [288, 418]].map(([gx, gy]) => (
          <circle key={`${gx}${gy}`} cx={gx} cy={gy} r="3" fill="#6a3d9a" />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        {/* the reaped field: stubble, with gleanings lying on it */}
        <path d="M-40 444 C80 434 300 434 460 442 L460 560 L-40 560 Z" fill="#f1cf7a" />
        <path d="M-40 504 C80 496 300 496 460 504 L460 560 L-40 560 Z" fill="#e2b04a" opacity="0.45" />
        {stubble.map(([sx, sy], i) => (
          <path key={i} d={`M${sx} ${sy} l0.5 -6`} stroke="#c9773f" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        ))}
        {[[146, 482, -20], [196, 470, 16], [252, 490, -8], [176, 504, 30], [228, 508, -32]].map(([gx, gy, a]) => (
          <g key={gx} transform={`translate(${gx} ${gy}) rotate(${80 + a})`}>
            <Stalk x={0} y={0} h={30} lean={0} dark />
          </g>
        ))}
        {/* the edges of the field, left standing */}
        <motion.g {...sway(56, 0)}>
          <path d="M6 522 L8 470 C40 462 80 462 108 470 L110 522 Z" fill="#e2b04a" />
          {edge.left.map((s, i) => <Stalk key={i} x={s.x} y={522} h={s.h} lean={s.lean} dark={s.dark} />)}
        </motion.g>
        <motion.g {...sway(346, 0.8)}>
          <path d="M292 522 L294 470 C330 462 370 462 400 470 L402 522 Z" fill="#e2b04a" />
          {edge.right.map((s, i) => <Stalk key={i} x={s.x} y={522} h={s.h} lean={s.lean} dark={s.dark} />)}
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Emor: the four kinds and a booth ———————————————————————————————

function PalmFrond() {
  return (
    <g>
      {Array.from({ length: 22 }, (_, i) => {
        const t = i / 21
        const y = -40 - t * 186
        const len = 72 - t * 44
        return (
          <g key={i} strokeLinecap="round" fill="none" strokeWidth="4.4">
            <path d={`M0 ${y} Q${-len * 0.55} ${y - len * 0.35} ${-len * 0.9} ${y - len * 0.55}`} stroke={i % 2 ? '#5f7d45' : '#7d9a5a'} />
            <path d={`M0 ${y} Q${len * 0.55} ${y - len * 0.35} ${len * 0.9} ${y - len * 0.55}`} stroke={i % 2 ? '#7d9a5a' : '#5f7d45'} />
          </g>
        )
      })}
      <path d="M0 0 L0 -236" stroke="#8a5a3c" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M0 -226 L0 -254" stroke="#5f7d45" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

export function Emor() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <DaySky id="emor" top="#f4b27c" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="304" cy="116" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 340 C30 316 90 296 150 312 C210 328 250 300 320 296 C380 294 420 316 460 326 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 392 C80 380 300 378 460 386 L460 560 L-40 560 Z" fill={C.land} />
        {/* the brook, and willows on its bank */}
        <path d="M-40 446 C80 430 200 440 300 426 C360 418 420 414 460 410 L460 432 C400 436 360 440 300 448 C200 462 80 452 -40 468 Z" fill="#8fb3d4" />
        <path d="M40 448 C100 440 160 446 220 440 M300 434 C340 428 380 426 420 424" fill="none" stroke="#bcd3e6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M352 420 C350 400 356 384 352 360 L362 360 C364 384 360 402 364 420 Z" fill="#8a5a3c" />
        <motion.g
          style={{ originX: '358px', originY: '346px', transformBox: 'view-box' }}
          animate={still ? undefined : { rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse cx="358" cy="344" rx="40" ry="22" fill="#7d9a5a" />
          {Array.from({ length: 12 }, (_, i) => {
            const sx = 324 + i * 6
            const d = sx - 358
            return <path key={i} d={`M${sx} 338 C${sx + d * 0.3} 362 ${sx + d * 0.4} 384 ${sx + d * 0.35} ${404 - Math.abs(d) * 0.5}`} fill="none" stroke={i % 2 ? '#a9bf7e' : '#7d9a5a'} strokeWidth="4" strokeLinecap="round" />
          })}
        </motion.g>
        {/* the booth: poles, and a roof of leafy branches */}
        <g>
          <ellipse cx="190" cy="438" rx="84" ry="6" fill={C.ink} opacity="0.12" />
          {[132, 238].map((px) => (
            <rect key={px} x={px} y="330" width="6" height="96" rx="2" fill="#8a5a3c" />
          ))}
          {[112, 186, 260].map((px) => (
            <rect key={px} x={px} y="322" width="9" height="116" rx="2" fill="#8a5a3c" />
          ))}
          <rect x="106" y="322" width="164" height="7" rx="3" fill="#8a5a3c" />
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse key={i} cx={104 + i * 15} cy={316 - (i % 2) * 6} rx="15" ry="11" fill={i % 3 ? '#5f7d45' : '#7d9a5a'} />
          ))}
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M${104 + i * 15} 318 l-6 14 l10 -5 Z`} fill={i % 2 ? '#5f7d45' : '#7d9a5a'} />
          ))}
        </g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 478 C100 466 300 466 460 474 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* palm branch, swaying */}
        <motion.g
          style={{ originX: '70px', originY: '514px', transformBox: 'view-box' }}
          animate={still ? undefined : { rotate: [-3, 4, -3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <g transform="translate(70 514) rotate(-6) scale(1)"><PalmFrond /></g>
        </motion.g>
        {/* boughs of a leafy tree (myrtle, traditionally) */}
        <motion.g
          style={{ originX: '296px', originY: '514px', transformBox: 'view-box' }}
          animate={still ? undefined : { rotate: [2, -2.5, 2] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          <g transform="translate(-48 0)">
          <path d="M344 514 C344 470 340 420 336 360" fill="none" stroke="#8a5a3c" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M342 452 C352 440 362 430 372 414 M340 420 C330 408 322 398 314 384" fill="none" stroke="#8a5a3c" strokeWidth="2.5" strokeLinecap="round" />
          {[
            ...Array.from({ length: 10 }, (_, i) => [344 - (i / 9) * 8, 500 - (i / 9) * 140]),
            [352, 438], [360, 428], [368, 418], [330, 404], [322, 394], [316, 386],
          ].map(([cx, cy], i) => (
            <g key={i}>
              {[-58, 0, 58].map((a) => (
                <ellipse key={a} cx={cx} cy={cy - 8} rx="4.2" ry="9" fill={a === 0 ? '#5f7d45' : '#7d9a5a'} transform={`rotate(${a + (i % 2) * 12} ${cx} ${cy})`} />
              ))}
            </g>
          ))}
          </g>
        </motion.g>
        {/* the fruit of the hadar tree (a citron, traditionally) */}
        <ellipse cx="196" cy="512" rx="42" ry="6" fill={C.ink} opacity="0.13" />
        <g transform="rotate(-14 196 486)">
          <ellipse cx="196" cy="486" rx="40" ry="26" fill="#e2b04a" />
          <ellipse cx="188" cy="478" rx="28" ry="15" fill="#f1cf7a" />
          <ellipse cx="180" cy="473" rx="9" ry="4" fill="#fff7e6" opacity="0.8" />
          {[[204, 494], [216, 484], [190, 498], [210, 474], [226, 494]].map(([dx, dy]) => (
            <circle key={`${dx}${dy}`} cx={dx} cy={dy} r="1.4" fill="#c9773f" opacity="0.6" />
          ))}
          <path d="M236 484 L242 482 L242 488 Z" fill="#8a5a3c" />
          <path d="M156 486 L148 484 M152 486 C150 478 154 474 160 476" fill="none" stroke="#5f7d45" strokeWidth="3" strokeLinecap="round" />
        </g>
      </Layer>
    </>
  )
}

// ——— Behar: the land at rest in the seventh year, and the horn sounded ———————————

/** A ram's horn: a tapered, curving tube built along a bezier centreline. */
const SHOFAR = (() => {
  const P = [[-112, -6], [-40, 44], [44, 36], [86, -46]]
  const at = (t: number) => {
    const u = 1 - t
    const b = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t]
    return [b.reduce((a, k, i) => a + k * P[i][0], 0), b.reduce((a, k, i) => a + k * P[i][1], 0)]
  }
  const width = (t: number) => 4 + Math.pow(t, 1.5) * 34
  const N = 40
  const top: number[][] = []
  const bot: number[][] = []
  const hi: number[][] = []
  const rib: { a: number[]; b: number[] }[] = []
  for (let i = 0; i <= N; i++) {
    const t = i / N
    const [x0, y0] = at(Math.max(0, t - 0.01))
    const [x1, y1] = at(Math.min(1, t + 0.01))
    const len = Math.hypot(x1 - x0, y1 - y0)
    const nx = -(y1 - y0) / len
    const ny = (x1 - x0) / len
    const [cx, cy] = at(t)
    const w = width(t) / 2
    top.push([cx - nx * w, cy - ny * w])
    bot.push([cx + nx * w, cy + ny * w])
    hi.push([cx - nx * w * 0.35, cy - ny * w * 0.35])
    if (i % 5 === 0 && i > 3 && i < N - 2) rib.push({ a: [cx - nx * w, cy - ny * w], b: [cx + nx * w, cy + ny * w] })
  }
  const pts = (a: number[][]) => a.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
  const [mx, my] = at(1)
  const [px, py] = at(0.98)
  const ang = (Math.atan2(my - py, mx - px) * 180) / Math.PI
  return {
    body: `M${pts(top)} L${pts([...bot].reverse())} Z`,
    light: `M${pts(top)} L${pts([...hi].reverse())} Z`,
    tip: `M${pts(top.slice(0, 8))} L${pts(bot.slice(0, 8).reverse())} Z`,
    rib,
    mouth: { x: mx, y: my, r: width(1) / 2, ang },
  }
})()

export function Behar() {
  const { tilt, still } = useArtMotion()
  // the horn lies on the ground, mouth raised; the sound comes from its mouth
  const ox = 236
  const oy = 450
  const m = SHOFAR.mouth
  const k = 1.25
  const mx = ox - m.x * k
  const my = oy + m.y * k
  return (
    <>
      <DaySky id="behar" top={C.blueSoft} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="90" cy="116" r="30" fill="#fff7e6" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 340 C30 316 90 300 150 316 C210 332 260 298 330 300 C380 302 420 324 460 332 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 384 C80 372 300 370 460 380 L460 560 L-40 560 Z" fill={C.land} />
        {/* unsown field: bare earth, no furrows, a few wild tufts */}
        <path d="M-40 396 C40 388 130 386 196 392 L214 446 C130 440 40 442 -40 448 Z" fill="#e2d2b2" />
        {[[22, 420], [74, 408], [130, 426], [170, 408], [52, 438], [186, 434]].map(([gx, gy]) => (
          <path key={gx} d={`M${gx - 7} ${gy} L${gx - 9} ${gy - 9} L${gx - 2} ${gy} L${gx} ${gy - 13} L${gx + 2} ${gy} L${gx + 9} ${gy - 8} L${gx + 7} ${gy} Z`} fill="#a9bf7e" />
        ))}
        {/* the vineyard left unpruned: its runners sprawl */}
        <Vine x={290} y={420} s={0.82} wild seed={21} />
        <Vine x={378} y={428} s={0.82} wild seed={22} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 476 C60 466 160 462 240 466 C320 470 400 476 460 478 L460 560 L-40 560 Z" fill="#d9ccb1" />
        {/* the horn sounded: its call rings out over the land */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${mx} ${my}) rotate(${180 - m.ang})`}>
            <motion.path
              d="M22 -34 A40 40 0 0 1 22 34"
              fill="none"
              stroke={C.warm}
              strokeWidth="5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ originX: '0px', originY: '0px', transformBox: 'view-box' }}
              initial={false}
              animate={still ? { scale: 1 + i * 0.8, opacity: 0.85 - i * 0.25 } : { scale: [0.7, 3.4], opacity: [0, 0.9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.5, ease: 'easeOut', times: [0, 0.25, 1] }}
            />
          </g>
        ))}
        <ellipse cx={ox + 10} cy={oy + 50} rx="116" ry="7" fill={C.ink} opacity="0.15" />
        <g transform={`translate(${ox} ${oy}) scale(${-k} ${k})`}>
          <path d={SHOFAR.body} fill="#cfae98" />
          <path d={SHOFAR.light} fill="#f6f0e2" />
          <path d={SHOFAR.tip} fill="#8a6a58" />
          {SHOFAR.rib.map((r, i) => (
            <path key={i} d={`M${r.a[0]} ${r.a[1]} L${r.b[0]} ${r.b[1]}`} stroke="#b77b4d" strokeWidth="1.8" opacity="0.8" />
          ))}
          <ellipse cx={m.x} cy={m.y} rx={m.r} ry={m.r * 0.45} transform={`rotate(${m.ang + 90} ${m.x} ${m.y})`} fill="#b77b4d" />
          <ellipse cx={m.x} cy={m.y} rx={m.r * 0.78} ry={m.r * 0.3} transform={`rotate(${m.ang + 90} ${m.x} ${m.y})`} fill="#3b2a24" />
        </g>
      </Layer>
    </>
  )
}

// ——— Bechukotai: rain in its season, fruitful land, and the yoke's bars broken ————————

export function Bechukotai() {
  const { tilt, still } = useArtMotion()
  const rain = useMemo(() => {
    const r = rng(2604)
    return Array.from({ length: 60 }, () => ({ x: 30 + r() * 350, y: 196 + r() * 130, d: r() * 1.6, l: 16 + r() * 12 }))
  }, [])
  const ears = useMemo(() => {
    const r = rng(2605)
    return Array.from({ length: 84 }, (_, i) => ({ x: -12 + (i % 28) * 15.5 + (Math.floor(i / 28) % 2) * 7 + r() * 5, y: 436 + Math.floor(i / 28) * 16 + r() * 4, a: (r() - 0.5) * 24, dark: r() < 0.35 }))
  }, [])
  const tree = (tx: number, ty: number, s: number, seed: number) => {
    const r = rng(seed)
    const fruit = Array.from({ length: 16 }, () => {
      const a = r() * Math.PI * 2
      const d = Math.sqrt(r()) * 34
      return [Math.cos(a) * d * 1.2, -70 + Math.sin(a) * d * 0.8]
    })
    return (
      <g transform={`translate(${tx} ${ty}) scale(${s})`}>
        <ellipse cx="0" cy="0" rx="34" ry="4" fill={C.ink} opacity="0.12" />
        <path d="M-6 0 C-4 -20 -6 -34 -2 -50 L6 -50 C8 -34 6 -20 8 0 Z" fill="#8a5a3c" />
        <ellipse cx="0" cy="-70" rx="50" ry="36" fill="#5f7d45" />
        <ellipse cx="-8" cy="-78" rx="38" ry="26" fill="#7d9a5a" />
        {fruit.map(([fx, fy], i) => (
          <g key={i}>
            <circle cx={fx} cy={fy} r="5.2" fill={i % 3 ? '#e8573a' : C.warm} />
            <circle cx={fx - 1.5} cy={fy - 1.5} r="1.6" fill="#ffe2b8" opacity="0.8" />
          </g>
        ))}
      </g>
    )
  }
  return (
    <>
      <DaySky id="bechukotai" top={C.blueSoft} />
      <Layer depth={0.08} tilt={tilt}>
        {/* the rain, falling in its season */}
        {rain.map((d, i) => (
          <motion.path
            key={i}
            d={`M${d.x} ${d.y} l-4 ${d.l}`}
            stroke="#5d86b8"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={false}
            animate={still ? { opacity: 0.55 } : { y: [0, 90], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: d.d, ease: 'linear', times: [0, 0.3, 1] }}
          />
        ))}
        <g>
          {[[110, 168, 70, 26], [170, 150, 60, 30], [240, 162, 70, 28], [300, 176, 56, 22], [70, 186, 44, 18]].map(([cx, cy, rx, ry], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#e9e4f2" />
          ))}
          {[[110, 160, 58, 20], [172, 142, 48, 24], [236, 154, 58, 22], [296, 170, 44, 16]].map(([cx, cy, rx, ry], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#fbf7ef" />
          ))}
        </g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 350 C30 324 90 310 150 324 C210 338 260 308 330 310 C380 312 420 332 460 340 L460 560 L-40 560 Z" fill="#a9bf7e" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 392 C80 380 300 378 460 388 L460 560 L-40 560 Z" fill={C.land} />
        {tree(82, 420, 1.05, 31)}
        {tree(316, 416, 1.12, 47)}
        {tree(200, 398, 0.72, 59)}
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        {/* the land yielding its produce */}
        <path d="M-40 424 C80 414 300 414 460 422 L460 560 L-40 560 Z" fill="#e2b04a" />
        <path d="M-40 452 C80 444 300 444 460 450 L460 560 L-40 560 Z" fill="#f1cf7a" opacity="0.7" />
        {ears.map((e, i) => (
          <g key={i} transform={`translate(${e.x} ${e.y}) rotate(${e.a}) scale(1.25)`}>
            <path d="M0 6 L0 -4" stroke="#c9773f" strokeWidth="1.6" />
            <path d="M0 -2 L-4.5 -12 L0 -21 L4.5 -12 Z" fill={e.dark ? '#c9773f' : '#f1cf7a'} />
            <path d="M-3 -10 L-7 -18 M3 -10 L7 -18 M0 -21 L0 -28" stroke="#c9773f" strokeWidth="1" />
          </g>
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 482 C100 472 300 472 460 480 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* the yoke, its bars broken, lying on the ground */}
        <ellipse cx="200" cy="510" rx="120" ry="7" fill={C.ink} opacity="0.13" />
        <g transform="rotate(8 140 494)">
          <path d="M64 488 C80 482 120 482 150 486 L162 482 L156 492 L166 496 L150 502 C120 504 80 504 64 500 Z" fill="#b0612f" />
          <path d="M64 488 C80 482 120 482 150 486 L162 482 L158 488 C120 486 84 486 64 492 Z" fill="#c9773f" />
          <rect x="80" y="468" width="7" height="36" rx="3" fill="#8a5a3c" />
          <rect x="112" y="468" width="7" height="36" rx="3" fill="#8a5a3c" />
        </g>
        <g transform="rotate(-10 260 498)">
          <path d="M196 494 L206 488 L200 484 L214 486 C250 482 290 482 322 488 L322 500 C290 504 250 504 214 502 Z" fill="#b0612f" />
          <path d="M200 484 L214 486 C250 482 290 482 322 488 L322 492 C290 488 250 488 210 490 Z" fill="#c9773f" />
          <rect x="290" y="468" width="7" height="36" rx="3" fill="#8a5a3c" />
        </g>
        <g transform="rotate(-70 250 512)">
          <rect x="232" y="508" width="36" height="7" rx="3" fill="#8a5a3c" />
        </g>
      </Layer>
    </>
  )
}


export const SCENES: Record<string, () => ReactElement> = {
  vayikra: () => <Vayikra />,
  tzav: () => <Tzav />,
  shemini: () => <Shemini />,
  tazria: () => <Tazria />,
  metzora: () => <Metzora />,
  'acharei-mot': () => <AchareiMot />,
  kedoshim: () => <Kedoshim />,
  emor: () => <Emor />,
  behar: () => <Behar />,
  bechukotai: () => <Bechukotai />,
}
