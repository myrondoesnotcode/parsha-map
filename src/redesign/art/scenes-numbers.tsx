import { useMemo } from 'react'
import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { C, W, H, Layer, useArtMotion, TentEntrance, rng } from './kit'

// ——— Shared pieces for Numbers (local helpers) ——————————————————————————————

function DaySky({ id, top = C.blueSoft, stop = 0.75 }: { id: string; top?: string; stop?: number }) {
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

/** A plain camp tent, bottom-centre at (x, y). */
function CampTent({ x, y, s = 1, tone = 0 }: { x: number; y: number; s?: number; tone?: number }) {
  const body = ['#e59b62', '#cfae98'][tone]
  const shade = ['#c9773f', '#b77b4d'][tone]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 0 L0 -28 L22 0 Z" fill={body} />
      <path d="M0 -28 L22 0 L11 0 Z" fill={shade} />
      <path d="M0 -13 L-7 0 L7 0 Z" fill="#8a5a3c" />
    </g>
  )
}

/** A banner on a pole; plain cloth, waving. (x, y) is the foot of the pole. */
function Banner({ x, y, h, fill = C.warm, delay = 0, s = 1, flip }: { x: number; y: number; h: number; fill?: string; delay?: number; s?: number; flip?: boolean }) {
  const { still } = useArtMotion()
  const t = y - h
  const fw = 30 * s * (flip ? -1 : 1)
  const fh = 20 * s
  const a = `M${x} ${t} C${x + fw * 0.35} ${t - 5 * s} ${x + fw * 0.65} ${t + 5 * s} ${x + fw} ${t} L${x + fw} ${t + fh} C${x + fw * 0.65} ${t + fh + 5 * s} ${x + fw * 0.35} ${t + fh - 5 * s} ${x} ${t + fh} Z`
  const b = `M${x} ${t} C${x + fw * 0.35} ${t + 5 * s} ${x + fw * 0.65} ${t - 5 * s} ${x + fw} ${t + 2 * s} L${x + fw} ${t + fh + 2 * s} C${x + fw * 0.65} ${t + fh - 5 * s} ${x + fw * 0.35} ${t + fh + 5 * s} ${x} ${t + fh} Z`
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={t - 3 * s} stroke="#8a5a3c" strokeWidth={2.4 * s} strokeLinecap="round" />
      <motion.path
        d={a}
        fill={fill}
        animate={still ? undefined : { d: [a, b, a] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </g>
  )
}

/** An ox in side view facing left, feet on y=0 at the origin. */
function Ox({ fill = '#b77b4d', shade = '#8a6a58', drink = false }: { fill?: string; shade?: string; drink?: boolean }) {
  return (
    <g>
      {/* legs */}
      {[-17, -10, 13, 20].map((lx, i) => (
        <rect key={lx} x={lx} y={-16} width={4.4} height={16} rx={1.5} fill={i % 2 ? shade : fill} />
      ))}
      {/* tail */}
      <path d="M27 -30 C32 -24 31 -16 30 -10" fill="none" stroke={shade} strokeWidth="2" strokeLinecap="round" />
      {/* body */}
      <path d="M-22 -30 C-22 -40 -6 -42 8 -40 C20 -40 28 -38 28 -28 C28 -20 26 -14 20 -14 L-18 -14 C-24 -15 -24 -24 -22 -30 Z" fill={fill} />
      <path d="M-20 -18 C-8 -14 10 -14 26 -18 C26 -15 22 -13 20 -13 L-18 -13 Z" fill={shade} />
      {/* head: bowed to the water, or held forward */}
      <g transform={drink ? 'rotate(-38 -20 -32)' : undefined}>
        <path d="M-18 -38 C-26 -40 -32 -36 -36 -28 C-38 -24 -36 -20 -32 -20 C-28 -20 -24 -24 -18 -28 Z" fill={fill} />
        <path d="M-36 -27 C-38 -23 -36 -20 -32 -20 L-31 -24 Z" fill={shade} />
        <path d="M-24 -38 C-26 -44 -22 -48 -18 -48" fill="none" stroke="#f6f0e2" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M-22 -37 L-16 -40 L-18 -35 Z" fill={shade} />
        <circle cx="-29" cy="-31" r="1.3" fill="#3b2a24" />
      </g>
    </g>
  )
}

/** A sheep facing left, feet on y=0. */
function Sheep({ graze = false, face = '#3b2a24', wool = '#f6f0e2' }: { graze?: boolean; face?: string; wool?: string }) {
  return (
    <g>
      {[-10, -5, 6, 11].map((lx) => (
        <rect key={lx} x={lx} y={-9} width={2.6} height={9} rx={1} fill="#3b2a24" />
      ))}
      <ellipse cx="1" cy="-15" rx="17" ry="9" fill={wool} />
      {[-9, -1, 7, 13].map((cx, i) => (
        <circle key={cx} cx={cx} cy={-20 + (i % 2) * 2} r={7} fill={wool} />
      ))}
      <path d="M-15 -11 C-6 -6 10 -6 17 -11 C14 -7 8 -5 1 -5 C-6 -5 -12 -7 -15 -11 Z" fill="#e6cfa8" />
      <g transform={graze ? 'rotate(-55 -14 -18)' : undefined}>
        <ellipse cx="-20" cy="-20" rx="5" ry="6.5" fill={face} transform="rotate(30 -20 -20)" />
        <ellipse cx="-16" cy="-24" rx="4" ry="2" fill={face} transform="rotate(-20 -16 -24)" />
      </g>
    </g>
  )
}

/** A rough altar of stacked stones, bottom-centre at (x, y). */
function StoneAltar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-19" y="-14" width="19" height="14" rx="4" fill={C.land} />
      <rect x="0.5" y="-14" width="18.5" height="14" rx="4" fill="#e2d2b2" />
      <rect x="-15" y="-27.5" width="30" height="14" rx="4" fill="#e6cfa8" />
      <rect x="-10" y="-41" width="20" height="14" rx="4" fill={C.land} />
    </g>
  )
}

function Palm({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  const { still } = useArtMotion()
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-2 0 C-1 -16 2 -30 5 -42 L8 -42 C5 -30 3 -16 3 0 Z" fill="#8a5a3c" />
      <motion.g
        style={{ originX: '6.5px', originY: '-42px' }}
        animate={still ? undefined : { rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {[-150, -110, -70, -30, 10].map((a, i) => (
          <path key={a} d="M6.5 -42 C12 -50 22 -50 28 -44 C20 -46 12 -44 6.5 -42 Z" fill={i % 2 ? '#5f7d45' : '#7d9a5a'} transform={`rotate(${a + 60} 6.5 -42)`} />
        ))}
      </motion.g>
    </g>
  )
}

// ——— Bamidbar: the camp around the Tent, each group by its banner ——————————————

export function Bamidbar() {
  const { tilt } = useArtMotion()
  // Groups of tents all round the Tent of Meeting, set back from it (Num 2:2).
  const back = [104, 136, 264, 296]
  const side: [number, number][] = [[0, 0], [34, 4], [8, 26], [42, 30]]
  const front = [96, 166, 236, 306]
  return (
    <>
      <DaySky id="bmd" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="318" cy="92" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 312 C40 290 110 294 170 284 C240 274 300 290 360 286 C400 284 430 294 460 298 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        <path d="M-40 332 C100 322 300 320 460 328 L460 560 L-40 560 Z" fill={C.land} />
        {/* the far group, beyond the Tent */}
        <Banner x={200} y={336} h={52} s={0.75} delay={0.2} />
        {back.map((x, i) => (
          <CampTent key={x} x={x} y={352} s={0.72} tone={i % 2} />
        ))}
        {/* the Tent of Meeting in the middle, with open ground all round it */}
        <TentEntrance x={160} y={300} w={80} />
      </Layer>
      <Layer depth={0.7} tilt={tilt}>
        {/* the groups on either flank */}
        <Banner x={50} y={410} h={66} s={0.9} delay={0.9} />
        {side.map(([dx, dy], i) => (
          <CampTent key={`l${i}`} x={64 + dx} y={420 + dy} s={0.95} tone={(i + 1) % 2} />
        ))}
        <Banner x={350} y={410} h={66} s={0.9} flip delay={1.5} />
        {side.map(([dx, dy], i) => (
          <CampTent key={`r${i}`} x={336 - dx} y={420 + dy} s={0.95} tone={i % 2} />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C100 460 300 460 460 468 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* the near group */}
        <Banner x={202} y={486} h={74} s={1.2} delay={0.5} />
        {front.map((x, i) => (
          <CampTent key={x} x={x} y={512 - (i === 1 || i === 2 ? 4 : 0)} s={1.45} tone={i % 2} />
        ))}
      </Layer>
    </>
  )
}

// ——— Nasso: six carts and twelve oxen brought before the Tabernacle ——————————

function CartTeam({ x, y, s, delay }: { x: number; y: number; s: number; delay: number }) {
  const { still } = useArtMotion()
  return (
    <motion.g
      initial={still ? false : { x: 70, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 2.6, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="4" cy="1" rx="66" ry="4" fill={C.ink} opacity="0.1" />
        {/* the pair: far ox a step behind and above the near one */}
        <g transform="translate(-47 -12)"><Ox fill="#8a6a58" shade="#3b2a24" /></g>
        <g transform="translate(-40 0)"><Ox fill="#cfae98" shade="#b77b4d" /></g>
        {/* yoke over both necks, and the pole back to the cart */}
        <rect x="-58" y="-60" width="5" height="32" rx="2" fill="#8a5a3c" />
        <line x1="-60" y1="-34" x2="4" y2="-26" stroke="#8a5a3c" strokeWidth="3" strokeLinecap="round" />
        {/* the cart */}
        <rect x="2" y="-40" width="60" height="18" rx="2" fill="#c9773f" />
        <rect x="2" y="-40" width="60" height="5" fill="#e59b62" />
        <rect x="50" y="-40" width="12" height="18" fill="#b0612f" />
        <motion.g
          style={{ originX: '32px', originY: '-14px' }}
          initial={still ? false : { rotate: -200 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 2.6, delay, ease: [0.2, 0.7, 0.3, 1] }}
        >
          <circle cx="32" cy="-14" r="14" fill="#8a5a3c" />
          <circle cx="32" cy="-14" r="10" fill="#b0612f" />
          <path d="M22 -14 L42 -14 M32 -24 L32 -4" stroke="#8a5a3c" strokeWidth="3" />
          <circle cx="32" cy="-14" r="3.5" fill="#e59b62" />
        </motion.g>
      </g>
    </motion.g>
  )
}

export function Nasso() {
  const { tilt } = useArtMotion()
  return (
    <>
      <DaySky id="nso" top="#f4b27c" stop={0.7} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="300" cy="100" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 320 L30 300 L90 268 L140 240 L178 262 L220 236 L270 270 L340 292 L460 312 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        <path d="M-40 348 C80 340 300 336 460 344 L460 560 L-40 560 Z" fill={C.land} />
        <TentEntrance x={155} y={262} w={90} />
      </Layer>
      <Layer depth={0.75} tilt={tilt}>
        <path d="M-40 402 C100 394 300 392 460 400 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {[110, 212, 314].map((x, i) => (
          <CartTeam key={x} x={x} y={430} s={0.78} delay={0.3 + i * 0.35} />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 462 C100 452 300 452 460 460 L460 560 L-40 560 Z" fill="#d9ccb1" />
        {[98, 212, 326].map((x, i) => (
          <CartTeam key={x} x={x} y={506} s={0.92} delay={1.4 + i * 0.35} />
        ))}
      </Layer>
    </>
  )
}

// ——— Behaalotecha: the cloud lifts from the Tent; two silver trumpets —————————

function Trumpet({ x, y, len, flip }: { x: number; y: number; len: number; flip?: boolean }) {
  const { still } = useArtMotion()
  // a straight tube with a mouthpiece and a flared bell; the exact shape is not given
  const b = len
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx={b / 2} cy="16" rx={b / 2 + 10} ry="6" fill={C.ink} opacity="0.1" />
      <rect x="-6" y="-7" width="12" height="14" rx="3" fill="#a9a7b8" />
      <rect x="4" y="-4.5" width={b - 40} height="9" fill="#e9e4f2" />
      <rect x="4" y="1.5" width={b - 40} height="3" fill="#a9a7b8" />
      <rect x={b * 0.3} y="-7" width="8" height="14" rx="2" fill="#cfcbe0" />
      <rect x={b * 0.62} y="-7" width="8" height="14" rx="2" fill="#cfcbe0" />
      <path d={`M${b - 38} -4.5 C${b - 16} -6 ${b - 6} -14 ${b} -22 L${b} 22 C${b - 6} 14 ${b - 16} 6 ${b - 38} 4.5 Z`} fill="#e9e4f2" />
      <path d={`M${b - 38} 1.5 C${b - 16} 4 ${b - 6} 12 ${b} 22 L${b} 22 C${b - 6} 14 ${b - 16} 6 ${b - 38} 4.5 Z`} fill="#a9a7b8" />
      <ellipse cx={b} cy="0" rx="5" ry="22" fill="#cfcbe0" />
      <ellipse cx={b + 1} cy="0" rx="2.5" ry="16" fill="#8f8ca6" />
      {/* a glint running along the hammered silver */}
      <motion.rect
        y="-4"
        width="14"
        height="3"
        rx="1.5"
        fill="#ffffff"
        initial={still ? false : { x: 0, opacity: 0 }}
        animate={still ? { x: b * 0.45, opacity: 0.8 } : { x: [0, b - 40, b - 40], opacity: [0, 0.95, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut', delay: flip ? 1.6 : 0 }}
      />
    </g>
  )
}

export function Behaalotecha() {
  const { tilt, still } = useArtMotion()
  const puffs = [[0, -6, 44], [-50, 8, 34], [50, 6, 36], [-24, -34, 32], [26, -36, 34], [-86, 24, 22], [88, 24, 22]]
  return (
    <>
      <DaySky id="bha" />
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 C60 300 120 312 170 296 C230 278 300 300 360 296 C400 294 430 304 460 308 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 380 C80 370 300 366 460 376 L460 560 L-40 560 Z" fill={C.land} />
        <TentEntrance x={140} y={262} w={120} />
        {/* the cloud over the Tent: lifting (the signal to set out) and settling again */}
        <motion.g
          initial={still ? false : { y: 0 }}
          animate={still ? { y: -40 } : { y: [0, 0, -86, -86, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.15, 0.5, 0.7, 1] }}
        >
          <g transform="translate(200 244)">
            <ellipse cx="0" cy="30" rx="112" ry="14" fill="#e9e4f2" />
            {puffs.map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={i % 3 === 1 ? '#e9e4f2' : '#fbf7ef'} />
            ))}
            <path d="M-104 34 C-60 48 60 48 106 34 C84 42 44 46 0 46 C-44 46 -80 42 -104 34 Z" fill="#cfcbe0" />
          </g>
        </motion.g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 448 C100 436 300 436 460 446 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <g transform="translate(40 468) scale(1.35)"><Trumpet x={0} y={0} len={200} /></g>
        <g transform="translate(360 508) scale(1.35)"><Trumpet x={0} y={0} len={200} flip /></g>
      </Layer>
    </>
  )
}

// ——— Shelach: the great cluster of Eshcol on its carrying frame ——————————————

export function Shelach() {
  const { tilt, still } = useArtMotion()
  const grapes = useMemo(() => {
    // rows of one long, tapering cluster hanging below the pole
    const out: { x: number; y: number; r: number; d: number }[] = []
    const r = rng(1323)
    const rows = 9
    for (let i = 0; i < rows; i++) {
      const w = 70 - i * 7
      const n = Math.max(1, Math.round(w / 13))
      for (let k = 0; k < n; k++) {
        const x = n === 1 ? 200 : 200 - w / 2 + (w / (n - 1)) * k + (r() - 0.5) * 4 + (i % 2 ? 3 : -3)
        out.push({ x, y: 382 + i * 12.5 + (r() - 0.5) * 3, r: 10.5 + r() * 2, d: r() })
      }
    }
    return out
  }, [])
  return (
    <>
      <DaySky id="shl" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="90" cy="92" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* the wadi: slopes falling to a valley floor, vines on them */}
        <path d="M-40 236 C40 248 100 290 160 320 L240 320 C300 290 360 248 460 236 L460 560 L-40 560 Z" fill="#e6cfa8" />
        {[[34, 270], [70, 288], [104, 306], [296, 304], [330, 286], [366, 268]].map(([x, y]) => (
          <ellipse key={x} cx={x} cy={y} rx="14" ry="7" fill="#7d9a5a" />
        ))}
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 320 C60 326 120 348 170 360 L230 360 C280 348 340 326 460 320 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 400 C100 390 300 390 460 398 L460 560 L-40 560 Z" fill={C.land} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 486 C100 476 300 476 460 484 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* the carrying frame, set down: its pole resting across two rocks */}
        <path d="M22 520 L30 440 L46 396 L70 372 L98 378 L114 410 L122 470 L118 520 Z" fill="#cfae98" />
        <path d="M98 378 L114 410 L122 470 L118 520 L94 520 L100 450 Z" fill="#b77b4d" />
        <path d="M30 440 L46 396 L70 372 L98 378 L64 392 Z" fill="#e6cfa8" />
        <path d="M378 520 L372 446 L356 398 L330 372 L302 380 L286 414 L278 470 L282 520 Z" fill="#cfae98" />
        <path d="M378 520 L372 446 L356 398 L330 372 L344 420 L350 520 Z" fill="#b77b4d" />
        <path d="M286 414 L302 380 L330 372 L312 392 Z" fill="#e6cfa8" />
        <rect x="30" y="366" width="340" height="10" rx="5" fill="#8a5a3c" />
        <rect x="30" y="366" width="340" height="3.5" rx="1.75" fill="#b0612f" />
        {/* the branch lashed to the pole, and the single cluster hanging from it */}
        <motion.g
          style={{ originX: '200px', originY: '372px', transformBox: 'view-box' }}
          animate={still ? undefined : { rotate: [-2.4, 2.4, -2.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M138 364 C160 358 240 358 262 364" fill="none" stroke="#5f7d45" strokeWidth="4" strokeLinecap="round" />
          <path d="M200 362 L200 386" stroke="#8a5a3c" strokeWidth="6" strokeLinecap="round" />
          <path d="M150 362 C136 342 116 340 104 348 C112 362 134 368 150 362 Z" fill="#7d9a5a" />
          <path d="M246 362 C262 340 286 340 296 350 C286 364 262 368 246 362 Z" fill="#5f7d45" />
          <path d="M176 360 C170 344 176 332 186 330 C190 342 186 354 176 360 Z" fill="#5f7d45" />
          <path d="M222 360 C230 346 244 342 250 348 C244 358 232 362 222 360 Z" fill="#7d9a5a" />
          {grapes.map((g, i) => (
            <g key={i}>
              <circle cx={g.x} cy={g.y} r={g.r} fill={g.d < 0.5 ? '#6a3d9a' : '#56307f'} />
              <circle cx={g.x - g.r * 0.35} cy={g.y - g.r * 0.35} r={g.r * 0.28} fill="#b9a0d8" opacity="0.7" />
            </g>
          ))}
        </motion.g>
        {/* pomegranates and figs, set down beside it */}
        {[[140, 512, 15], [166, 518, 11]].map(([x, y, r]) => (
          <g key={x}>
            <circle cx={x} cy={y} r={r} fill="#b3263a" />
            <path d={`M${x - r * 0.9} ${y + 2} A${r} ${r} 0 0 0 ${x + r * 0.9} ${y + 2} Z`} fill="#8e1e2e" opacity="0.5" />
            <path d={`M${x - 4} ${y - r - 5} L${x - 2} ${y - r + 2} L${x + 2} ${y - r + 2} L${x + 4} ${y - r - 5} L${x} ${y - r - 1} Z`} fill="#8e1e2e" />
            <circle cx={x - r * 0.4} cy={y - r * 0.4} r={r * 0.22} fill="#e8573a" opacity="0.8" />
          </g>
        ))}
        {[[238, 516], [262, 518]].map(([x, y]) => (
          <g key={x}>
            <path d={`M${x} ${y - 16} C${x + 4} ${y - 10} ${x + 12} ${y - 6} ${x + 12} ${y + 2} C${x + 12} ${y + 8} ${x + 6} ${y + 11} ${x} ${y + 11} C${x - 6} ${y + 11} ${x - 12} ${y + 8} ${x - 12} ${y + 2} C${x - 12} ${y - 6} ${x - 4} ${y - 10} ${x} ${y - 16} Z`} fill="#8a6a58" />
            <path d={`M${x} ${y - 16} C${x + 4} ${y - 10} ${x + 12} ${y - 6} ${x + 12} ${y + 2} C${x + 12} ${y + 8} ${x + 6} ${y + 11} ${x} ${y + 11} Z`} fill="#6a3d9a" opacity="0.55" />
            <path d={`M${x} ${y - 16} L${x} ${y - 21}`} stroke="#5f7d45" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        ))}
      </Layer>
    </>
  )
}

// ——— Korach: Aaron's staff, sprouted, blossomed and bearing almonds ———————————

export function Korach() {
  const { tilt, still } = useArtMotion()
  // Twigs from the upper staff; each carries a bud → blossom and an almond.
  const twigs = [
    { d: 'M200 300 C186 290 176 282 164 266', tip: [164, 266], blossom: [170, 272], almond: [182, 292] },
    { d: 'M201 262 C214 250 226 244 242 236', tip: [242, 236], blossom: [238, 240], almond: [218, 256] },
    { d: 'M200 226 C190 212 184 200 180 186', tip: [180, 186], blossom: [180, 190], almond: [192, 212] },
    { d: 'M200 340 C216 330 230 326 248 322', tip: [248, 322], blossom: [244, 322], almond: [224, 334] },
    { d: 'M200 202 C208 192 214 184 222 176', tip: [222, 176], blossom: [220, 180], almond: [208, 196] },
  ]
  const blossoms = [
    [170, 272], [238, 240], [180, 190], [244, 322], [220, 180], [150, 318], [202, 164], [262, 280],
  ]
  const leaves = [
    [176, 280, -40], [228, 246, 30], [186, 204, -60], [236, 328, 20], [212, 186, 40], [190, 294, 30], [214, 256, -20],
  ]
  const almonds = [[182, 292], [218, 256], [192, 212], [224, 334], [208, 196], [160, 330]]
  const grow = (i: number) => ({ delay: 0.4 + i * 0.25, duration: 1.4, ease: 'easeOut' as const })
  return (
    <>
      <DaySky id="krc" top="#f4b27c" stop={0.72} />
      <Layer depth={0.1} tilt={tilt}>
        <motion.circle
          cx="200"
          cy="270"
          r="150"
          fill="url(#glow)"
          animate={still ? undefined : { opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 380 C60 360 140 364 200 354 C270 344 340 362 460 368 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 460 C100 450 300 448 460 458 L460 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <ellipse cx="206" cy="506" rx="46" ry="6" fill={C.ink} opacity="0.12" />
        {/* the staff */}
        <path d="M194 506 L196 172 C196 160 206 160 206 172 L208 506 Z" fill="#8a5a3c" />
        <path d="M201 506 L201 162 C204 162 206 166 206 172 L208 506 Z" fill="#6e4630" />
        <ellipse cx="201" cy="164" rx="8" ry="7" fill="#8a5a3c" />
        <path d="M201 157 C206 157 209 160 209 164 C209 168 206 171 201 171 Z" fill="#6e4630" />
        {/* shoots */}
        {twigs.map((t, i) => (
          <motion.path
            key={i}
            d={t.d}
            fill="none"
            stroke="#8a5a3c"
            strokeWidth="3.4"
            strokeLinecap="round"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={grow(i)}
          />
        ))}
        <motion.path d="M200 318 C188 322 170 322 150 318" fill="none" stroke="#8a5a3c" strokeWidth="3" strokeLinecap="round" initial={still ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={grow(2)} />
        <motion.path d="M201 280 C220 282 240 282 262 280" fill="none" stroke="#8a5a3c" strokeWidth="3" strokeLinecap="round" initial={still ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={grow(3)} />
        <motion.path d="M200 196 L202 164" fill="none" stroke="#8a5a3c" strokeWidth="3" strokeLinecap="round" initial={still ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={grow(4)} />
        {/* leaves */}
        {leaves.map(([x, y, a], i) => (
          <motion.path
            key={`l${i}`}
            d={`M${x} ${y} C${x + 6} ${y - 10} ${x + 18} ${y - 12} ${x + 24} ${y - 8} C${x + 18} ${y} ${x + 6} ${y + 2} ${x} ${y} Z`}
            fill="#5f7d45"
            transform={`rotate(${a} ${x} ${y})`}
            style={{ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' }}
            initial={still ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + i * 0.18, duration: 0.9, ease: 'easeOut' }}
          />
        ))}
        {/* almonds */}
        {almonds.map(([x, y], i) => (
          <motion.g
            key={`a${i}`}
            style={{ originX: `${x}px`, originY: `${y - 6}px`, transformBox: 'view-box' }}
            initial={still ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3.4 + i * 0.2, duration: 1, ease: 'easeOut' }}
          >
            <line x1={x} y1={y - 16} x2={x} y2={y - 8} stroke="#8a5a3c" strokeWidth="2" />
            <ellipse cx={x} cy={y + 3} rx="10" ry="13" fill="#a9bf7e" />
            <path d={`M${x} ${y - 10} C${x + 10} ${y - 8} ${x + 11} ${y + 10} ${x} ${y + 16} C${x + 5} ${y + 8} ${x + 5} ${y - 4} ${x} ${y - 10} Z`} fill="#7d9a5a" />
            <ellipse cx={x - 4} cy={y - 1} rx="2.4" ry="4" fill="#f6f0e2" opacity="0.7" />
          </motion.g>
        ))}
        {/* blossoms: five pale petals round a warm heart */}
        {blossoms.map(([x, y], i) => (
          <motion.g
            key={`b${i}`}
            style={{ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' }}
            initial={still ? false : { scale: 0, rotate: -40 }}
            animate={still ? { scale: 1 } : { scale: [0, 1, 1, 1.08, 1], rotate: [-40, 0, 0, 0, 0] }}
            transition={{ delay: 2 + i * 0.22, duration: 1.4, ease: 'easeOut', times: [0, 0.5, 0.7, 0.85, 1] }}
          >
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx={x} cy={y - 8} rx="6" ry="8.5" fill={i % 3 === 0 ? '#ffe2b8' : '#fbf7ef'} transform={`rotate(${a} ${x} ${y})`} />
            ))}
            <circle cx={x} cy={y} r="4.6" fill="#e8573a" opacity="0.85" />
            <circle cx={x} cy={y} r="2" fill="#e2b04a" />
          </motion.g>
        ))}
      </Layer>
    </>
  )
}

// ——— Chukat: water pouring from the rock; the flocks and herds drinking ———————

export function Chukat() {
  const { tilt, still } = useArtMotion()
  const streams = [
    { d: 'M218 350 C212 380 204 414 198 454', w: 16, t: 1.1 },
    { d: 'M226 352 C234 384 240 418 244 454', w: 12, t: 1.3 },
    { d: 'M212 352 C198 378 182 412 170 454', w: 11, t: 1.5 },
  ]
  return (
    <>
      <DaySky id="chk" top="#f4b27c" stop={0.7} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="94" cy="96" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 C40 310 90 316 140 300 C190 286 240 304 290 296 C350 288 400 304 460 310 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 410 C100 400 300 398 460 408 L460 560 L-40 560 Z" fill={C.land} />
        {/* the rock, and the cleft the water breaks from */}
        <path d="M112 452 C104 410 116 360 144 326 L170 300 L204 288 L236 282 L270 292 L304 318 L326 356 L338 404 L334 452 Z" fill="#b77b4d" />
        <path d="M270 292 L304 318 L326 356 L338 404 L334 452 L290 452 C300 410 300 340 270 292 Z" fill="#8a6a58" />
        <path d="M144 326 L170 300 L204 288 L236 282 L270 292 C236 292 200 302 170 330 Z" fill="#cfae98" />
        <path d="M200 350 L212 332 L230 336 L238 354 L220 364 Z" fill="#5c4538" />
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        {/* the pool the water fills, spilling wide */}
        <ellipse cx="200" cy="470" rx="190" ry="32" fill="#5d86b8" />
        <ellipse cx="200" cy="468" rx="178" ry="26" fill="#8fb3d4" />
        <ellipse cx="206" cy="466" rx="120" ry="15" fill={C.water} />
        {/* the fall: narrow at the cleft, widening as it pours down */}
        <path d="M206 344 C214 338 230 340 238 348 C252 380 262 420 270 462 L136 462 C150 420 178 378 206 344 Z" fill="#8fb3d4" />
        <path d="M212 348 C218 344 228 346 232 350 C242 384 248 420 252 460 L158 460 C168 420 190 382 212 348 Z" fill={C.water} />
        {streams.map((st, i) => (
          <motion.path
            key={i}
            d={st.d}
            fill="none"
            stroke="#f4f8fc"
            strokeWidth={st.w * 0.3}
            strokeLinecap="round"
            strokeDasharray="30 26"
            initial={false}
            animate={still ? undefined : { strokeDashoffset: [0, -112] }}
            transition={{ duration: st.t, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {/* ripples spreading where the water lands */}
        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={i}
            cx="200"
            cy="458"
            rx="34"
            ry="6"
            fill="none"
            stroke="#f4f8fc"
            strokeWidth="2.2"
            style={{ originX: '200px', originY: '458px', transformBox: 'view-box' }}
            initial={still ? false : { scale: 0.5, opacity: 0 }}
            animate={still ? { scale: 1 + i * 1.1, opacity: 0.7 - i * 0.2 } : { scale: [0.5, 4.2], opacity: [0.9, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.2, ease: 'easeOut' }}
          />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C60 492 120 496 200 504 C280 496 340 492 460 500 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* livestock at the water's edge, heads down */}
        <g transform="translate(346 504) scale(1.45)"><Ox drink /></g>
        <g transform="translate(46 510) scale(-1.35 1.35)"><Sheep graze /></g>
        <g transform="translate(96 514) scale(-1.3 1.3)"><Sheep graze face="#8a6a58" /></g>
        <g transform="translate(290 512) scale(1.3)"><Sheep graze /></g>
      </Layer>
    </>
  )
}

// ——— Balak: seven altars on the peak of Peor; Israel's tents spread below ————————

export function Balak() {
  const { tilt, still } = useArtMotion()
  const tents = useMemo(() => {
    const r = rng(2405)
    const out: { x: number; y: number; s: number; t: number }[] = []
    for (let row = 0; row < 4; row++) {
      for (let k = 0; k < 11; k++) {
        const x = 30 + k * 34 + (row % 2) * 16 + (r() - 0.5) * 6
        out.push({ x, y: 330 + row * 16 - Math.sin(x / 80) * 4, s: 0.34 + row * 0.05, t: r() })
      }
    }
    return out
  }, [])
  // exactly seven altars (Num 23:29)
  const altars = [50, 100, 150, 200, 250, 300, 350]
  return (
    <>
      <DaySky id="blk" top="#f4b27c" stop={0.66} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="318" cy="96" r="28" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 312 C40 296 110 300 180 290 C250 282 320 294 460 300 L460 560 L-40 560 Z" fill="#e6cfa8" />
        {/* the river, and the palms beside it */}
        <path d="M-40 404 C60 396 120 410 200 404 C280 398 340 410 460 402 L460 416 C340 424 280 412 200 418 C120 424 60 410 -40 418 Z" fill="#8fb3d4" />
        <motion.path
          d="M-40 410 C60 402 120 416 200 410 C280 404 340 416 460 408"
          fill="none"
          stroke="#eef5fb"
          strokeWidth="2"
          strokeOpacity="0.6"
          strokeDasharray="10 26"
          animate={still ? undefined : { strokeDashoffset: [0, -72] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        <path d="M-40 318 C100 310 300 310 460 318 L460 400 C340 406 280 396 200 400 C120 404 60 392 -40 400 Z" fill="#a9bf7e" opacity="0.35" />
        {[10, 52, 96, 144, 186, 232, 278, 320, 368].map((x, i) => (
          <Palm key={x} x={x} y={400 + (i % 2) * 3} s={0.7} delay={i * 0.4} />
        ))}
        {/* the tents, spread in ordered rows; they appear across the plain */}
        {tents.map((t, i) => (
          <motion.g
            key={i}
            initial={still ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (t.x / 400) * 2.6 + t.t * 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            <CampTent x={t.x} y={t.y} s={t.s} tone={i % 3 === 0 ? 1 : 0} />
          </motion.g>
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        {/* the peak of Peor */}
        <path d="M-40 520 C20 480 120 452 200 450 C280 452 380 480 460 520 L460 560 L-40 560 Z" fill="#cfae98" />
        {altars.map((x) => (
          <StoneAltar key={x} x={x} y={456 + ((x - 200) / 240) ** 2 * 64} s={1.1} />
        ))}
      </Layer>
    </>
  )
}

// ——— Pinchas: the two daily lambs, morning and twilight ————————————————————

function Lamb({ x, y, s, flip, delay }: { x: number; y: number; s: number; flip?: boolean; delay: number }) {
  const { still } = useArtMotion()
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <ellipse cx="2" cy="1" rx="34" ry="4" fill={C.ink} opacity="0.12" />
      {[-15, -8, 11, 18].map((lx, i) => (
        <rect key={lx} x={lx} y={-16} width={4.2} height={16} rx={1.6} fill={i % 2 ? '#8a6a58' : '#cfae98'} />
      ))}
      <motion.g
        style={{ originX: '0px', originY: '-24px' }}
        animate={still ? undefined : { scaleY: [1, 1.03, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <ellipse cx="3" cy="-26" rx="26" ry="14" fill="#f6f0e2" />
        {[-16, -6, 4, 14, 24].map((cx, i) => (
          <circle key={cx} cx={cx} cy={-34 + (i % 2) * 3} r={9} fill="#f6f0e2" />
        ))}
        {[-12, 0, 12, 22].map((cx) => (
          <circle key={cx} cx={cx} cy={-16} r={7} fill="#f6f0e2" />
        ))}
        <path d="M-20 -18 C-8 -10 14 -10 28 -18 C24 -12 14 -9 4 -9 C-8 -9 -16 -12 -20 -18 Z" fill="#e6cfa8" />
        <circle cx="30" cy="-30" r="5" fill="#f6f0e2" />
      </motion.g>
      <motion.g
        style={{ originX: '-18px', originY: '-34px' }}
        animate={still ? undefined : { rotate: [0, 0, -6, 0, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
      >
        <path d="M-16 -42 C-24 -48 -34 -44 -36 -36 C-38 -28 -34 -24 -28 -24 C-22 -24 -16 -30 -14 -36 Z" fill="#f6f0e2" />
        <path d="M-36 -34 C-37 -29 -34 -25 -29 -25 L-31 -30 Z" fill="#cfae98" />
        <path d="M-18 -42 C-12 -46 -6 -44 -4 -40 C-8 -38 -14 -38 -18 -40 Z" fill="#cfae98" />
        <circle cx="-27" cy="-37" r="1.8" fill="#3b2a24" />
      </motion.g>
    </g>
  )
}

export function Pinchas() {
  const { tilt, still } = useArtMotion()
  const stars = useMemo(() => {
    const r = rng(2803)
    return Array.from({ length: 28 }, () => ({ x: 236 + r() * 170, y: 20 + r() * 250, s: 0.8 + r() * 1.4, t: r() }))
  }, [])
  return (
    <>
      <defs>
        {/* a split sky: dawn on the left, dusk on the right */}
        <linearGradient id="pnc-dawn" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={C.blueSoft} />
          <stop offset="0.5" stopColor="#fbe6c8" />
          <stop offset="0.7" stopColor="#f4b27c" />
        </linearGradient>
        <linearGradient id="pnc-dusk" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0e1554" />
          <stop offset="0.38" stopColor={C.blue} />
          <stop offset="0.56" stopColor="#6f7be6" />
          <stop offset="0.7" stopColor={C.warm} />
        </linearGradient>
        <linearGradient id="pnc-split" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0.44" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.56" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="pnc-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} fill="url(#pnc-split)" />
        </mask>
      </defs>
      <rect width={W} height={H} fill="url(#pnc-dawn)" />
      <rect width={W} height={H} fill="url(#pnc-dusk)" mask="url(#pnc-mask)" />
      <Layer depth={0.08} tilt={tilt}>
        {/* morning light gathering on the left horizon */}
        <motion.ellipse
          cx="30"
          cy="360"
          rx="190"
          ry="120"
          fill="url(#glow)"
          animate={still ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* the last light on the right, and the first stars coming out above it */}
        <motion.ellipse
          cx="380"
          cy="370"
          rx="150"
          ry="80"
          fill="url(#glow)"
          animate={still ? undefined : { opacity: [0.8, 0.35, 0.8] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        {stars.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.s}
            fill={C.sand}
            initial={still ? false : { opacity: 0 }}
            animate={still ? { opacity: 0.85 } : { opacity: [0, 1, 0.5, 1, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: s.t * 1.5 }}
          />
        ))}
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 350 C40 330 110 336 170 326 C240 314 300 332 360 328 C400 326 430 334 460 338 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 420 C100 408 300 406 460 416 L460 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 486 C100 476 300 476 460 484 L460 560 L-40 560 Z" fill="#d9ccb1" />
        <Lamb x={116} y={494} s={1.9} flip delay={0} />
        <Lamb x={286} y={494} s={1.9} delay={0.8} />
      </Layer>
      <rect width={W} height={H} fill="#1a2280" opacity="0.16" mask="url(#pnc-mask)" />
    </>
  )
}

// ——— Matot: good cattle land of Jazer and Gilead; sheepfolds built ————————————

/** A point on the fold's ellipse (centre 160,462; y grows downward). */
const foldPt = (deg: number) => {
  const a = (deg * Math.PI) / 180
  return [160 + 104 * Math.cos(a), 462 + 40 * Math.sin(a)] as const
}
const foldArc = (from: number, to: number) => {
  const pts = Array.from({ length: 25 }, (_, i) => foldPt(from + ((to - from) * i) / 24))
  return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
}

export function Matot() {
  const { tilt, still } = useArtMotion()
  // sheep walking in at the fold's gap
  const walkers = [
    { x: 272, y: 470, s: 1.15, d: 0.4 },
    { x: 314, y: 482, s: 1.2, d: 1.0 },
    { x: 356, y: 494, s: 1.25, d: 1.6 },
  ]
  const penned = [[118, 450, 0.95], [162, 444, 0.92], [206, 452, 0.95], [100, 476, 1.05], [148, 480, 1.05], [196, 478, 1.02]] as const
  const back = foldArc(160, 345)
  const front = foldArc(165, 48)
  return (
    <>
      <DaySky id="mtt" />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="300" cy="92" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* the high, rolling pasture land */}
        <path d="M-40 316 C30 290 90 286 150 304 C210 320 260 280 330 282 C380 284 420 300 460 306 L460 560 L-40 560 Z" fill="#a9bf7e" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 384 C60 356 140 350 220 366 C290 380 360 360 460 356 L460 560 L-40 560 Z" fill="#7d9a5a" />
        {/* cattle at pasture */}
        <g transform="translate(78 372) scale(0.85)"><Ox fill="#8a6a58" shade="#3b2a24" drink /></g>
        <g transform="translate(250 376) scale(-0.8 0.8)"><Ox drink /></g>
        <g transform="translate(330 370) scale(0.8)"><Ox fill="#cfae98" shade="#b77b4d" /></g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 424 C100 408 300 408 460 418 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 510 C100 500 300 500 460 508 L460 560 L-40 560 Z" fill="#7d9a5a" opacity="0.5" />
        {/* the fold: a low round wall, open on the right; its far side behind the flock */}
        <path d={back} fill="none" stroke="#d9ccb1" strokeWidth="15" strokeLinecap="round" />
        <path d={back} fill="none" stroke={C.land} strokeWidth="6" strokeLinecap="round" transform="translate(0 -5)" />
        {penned.map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}><Sheep face={i % 2 ? '#8a6a58' : '#3b2a24'} graze={i === 1 || i === 5} /></g>
        ))}
        <path d={front} fill="none" stroke="#d9ccb1" strokeWidth="15" strokeLinecap="round" />
        <path d={front} fill="none" stroke={C.land} strokeWidth="6" strokeLinecap="round" transform="translate(0 -5)" />
        {walkers.map((w, i) => (
          <motion.g
            key={i}
            initial={still ? false : { x: 70, y: 12, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: w.d, duration: 3.2, ease: 'easeOut' }}
          >
            <motion.g
              animate={still ? undefined : { y: [0, -1.5, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: w.d, ease: 'easeInOut' }}
            >
              <g transform={`translate(${w.x} ${w.y}) scale(${w.s})`}><Sheep face={i === 1 ? '#8a6a58' : '#3b2a24'} /></g>
            </motion.g>
          </motion.g>
        ))}
      </Layer>
    </>
  )
}

// ——— Masei: the journey, forty-two stops, from Rameses to the Jordan ——————————

/** Sample `n` evenly spaced points along a smooth curve through `pts` (Catmull-Rom). */
function routeStops(pts: [number, number][], n: number) {
  const dense: [number, number][] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    for (let k = 0; k < 40; k++) {
      const t = k / 40
      const t2 = t * t
      const t3 = t2 * t
      const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3)
      dense.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])])
    }
  }
  dense.push(pts[pts.length - 1])
  const cum = [0]
  for (let i = 1; i < dense.length; i++) cum.push(cum[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]))
  const total = cum[cum.length - 1]
  const out: [number, number][] = []
  let j = 0
  for (let s = 0; s < n; s++) {
    const target = (total * s) / (n - 1)
    while (j < cum.length - 2 && cum[j + 1] < target) j++
    const seg = cum[j + 1] - cum[j] || 1
    const u = Math.min(1, Math.max(0, (target - cum[j]) / seg))
    out.push([dense[j][0] + (dense[j + 1][0] - dense[j][0]) * u, dense[j][1] + (dense[j + 1][1] - dense[j][1]) * u])
  }
  return { dense, out }
}

// A symbolic winding route, not a map: from Rameses (lower left) to the Jordan (right).
const MASEI_WAY: [number, number][] = [
  [52, 506], [140, 508], [230, 500], [300, 486], [334, 464], [304, 446], [220, 444], [140, 440], [80, 428],
  [62, 406], [100, 388], [170, 384], [240, 388], [292, 392], [334, 394],
]
const MASEI_STOPS = routeStops(MASEI_WAY, 42).out // Rameses + the 41 camps after it

export function Masei() {
  const { tilt, still } = useArtMotion()
  const stars = useMemo(() => {
    const r = rng(3349)
    return Array.from({ length: 150 }, () => ({ x: r() * W, y: r() * 300, s: r() < 0.08 ? r() * 1.3 + 1.4 : r() * 1.1 + 0.4, t: r() }))
  }, [])
  const { dense } = useMemo(() => routeStops(MASEI_WAY, 42), [])
  const line = 'M' + dense.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
  const cycle = 16
  const step = 0.22
  return (
    <>
      <defs>
        <linearGradient id="msi-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#0e1554" />
          <stop offset="0.6" stopColor={C.blue} />
          <stop offset="0.78" stopColor="#6f7be6" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#msi-sky)" />
      <Layer depth={0.12} tilt={tilt}>
        {stars.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.s}
            fill={C.sand}
            initial={still ? false : { opacity: 0.2 }}
            animate={still ? { opacity: 0.7 } : { opacity: [0.2, 0.85, 0.35] }}
            transition={{ duration: 3 + s.t * 3, repeat: Infinity, repeatType: 'mirror', delay: s.t * 2 }}
          />
        ))}
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 C40 300 110 296 170 312 C230 326 280 290 340 292 C380 294 420 306 460 312 L460 560 L-40 560 Z" fill="#4a5ad6" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 386 C40 368 120 360 200 368 C270 376 320 354 380 356 C410 357 440 364 460 370 L460 560 L-40 560 Z" fill="#2b39b8" />
        {/* the Jordan, coming down from the north on the right */}
        <path d="M366 290 C356 306 346 320 352 338 C358 356 344 374 342 392 C340 410 350 426 354 444 L372 444 C366 426 356 410 358 392 C360 374 374 356 368 338 C362 320 370 306 378 292 Z" fill="#8fb3d4" />
        <path d="M366 290 C356 306 346 320 352 338 C358 356 344 374 342 392 C340 410 350 426 354 444 L360 444 C354 426 348 410 350 392 C352 374 364 356 358 338 C352 320 362 306 372 291 Z" fill="#5d86b8" />
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        <path d="M-40 452 C60 436 150 428 240 440 C310 450 380 436 460 438 L460 560 L-40 560 Z" fill="#1a2280" />
        <path d="M-40 492 C80 480 200 478 290 486 C360 492 410 484 460 482 L460 560 L-40 560 Z" fill="#141c6e" />
        {/* the way, drawn faintly, and its forty-two stops arriving one by one */}
        <path d={line} fill="none" stroke={C.warm} strokeOpacity="0.35" strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" />
        {MASEI_STOPS.map(([x, y], i) => {
          const at = (0.6 + i * step) / cycle
          const first = i === 0
          return (
            <motion.g
              key={i}
              style={{ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' }}
              initial={still ? false : { opacity: 0, scale: 0.2 }}
              animate={still ? { opacity: 1, scale: 1 } : first ? { opacity: 1, scale: [1, 1.2, 1] } : { opacity: [0, 0, 1, 1, 0], scale: [0.2, 0.2, 1, 1, 0.6] }}
              transition={
                still
                  ? undefined
                  : first
                    ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: cycle, repeat: Infinity, times: [0, at, Math.min(at + 0.03, 0.9), 0.93, 0.99], ease: 'easeOut' }
              }
            >
              {first ? (
                <>
                  <circle cx={x} cy={y} r="11" fill={C.warm} opacity="0.3" />
                  <circle cx={x} cy={y} r="7" fill="none" stroke="#ffe2b8" strokeWidth="2" />
                  <circle cx={x} cy={y} r="4.2" fill={C.warm} />
                </>
              ) : (
                <circle cx={x} cy={y} r={i === 41 ? 4.4 : 3.3} fill={i === 41 ? '#ffe2b8' : C.warm} />
              )}
            </motion.g>
          )
        })}
      </Layer>
    </>
  )
}

export const SCENES: Record<string, () => ReactElement> = {
  bamidbar: () => <Bamidbar />,
  nasso: () => <Nasso />,
  behaalotecha: () => <Behaalotecha />,
  shelach: () => <Shelach />,
  korach: () => <Korach />,
  chukat: () => <Chukat />,
  balak: () => <Balak />,
  pinchas: () => <Pinchas />,
  matot: () => <Matot />,
  masei: () => <Masei />,
}
