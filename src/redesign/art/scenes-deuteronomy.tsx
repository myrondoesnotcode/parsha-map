import type { ReactElement, ReactNode } from 'react'
import { motion } from 'motion/react'
import { C, W, H, Layer, useArtMotion } from './kit'

// ——— Local helpers ——————————————————————————————————————————————————

/** Day sky: a warm or blue top fading into sand. */
function Sky({ id, from }: { id: string; from: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="0.72" stopColor={C.sand} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
    </>
  )
}

function Sun({ cx, cy, r = 28 }: { cx: number; cy: number; r?: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r * 2.4} fill="url(#glow)" opacity="0.55" />
      <circle cx={cx} cy={cy} r={r} fill="#fff7e6" />
    </>
  )
}

/** Rocks gently about a point (a trunk base, a stem foot). */
function Sway({ x, y, deg = 1.5, dur = 5, delay = 0, children }: { x: number; y: number; deg?: number; dur?: number; delay?: number; children: ReactNode }) {
  const { still } = useArtMotion()
  return (
    <motion.g
      style={{ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' }}
      animate={still ? undefined : { rotate: [-deg, deg, -deg] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.g>
  )
}

/** Running water: dashes that travel along a path. */
function Flow({ d, color = '#fbf7ef', width = 3, dash = '16 24', dur = 3, delay = 0, opacity = 0.85 }: { d: string; color?: string; width?: number; dash?: string; dur?: number; delay?: number; opacity?: number }) {
  const { still } = useArtMotion()
  const period = dash.split(' ').reduce((a, b) => a + Number(b), 0)
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      opacity={opacity}
      animate={still ? undefined : { strokeDashoffset: [0, -period * 2] }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear', delay }}
    />
  )
}

/** A date palm: curved trunk and a crown of drooping fronds. */
function Palm({ x, y, h, lean = 0, s = 1 }: { x: number; y: number; h: number; lean?: number; s?: number }) {
  const tx = x + lean
  const ty = y - h
  const fronds = [-150, -115, -80, -45, -10, 25]
  return (
    <g>
      <path d={`M${x - 3 * s} ${y} Q${x + lean * 0.2} ${y - h * 0.5} ${tx - 1.5 * s} ${ty} L${tx + 1.5 * s} ${ty} Q${x + lean * 0.2 + 5 * s} ${y - h * 0.5} ${x + 3 * s} ${y} Z`} fill="#8a5a3c" />
      {fronds.map((a) => {
        const rad = (a * Math.PI) / 180
        const ex = tx + Math.cos(rad) * 22 * s
        const ey = ty + Math.sin(rad) * 10 * s + 9 * s
        return <path key={a} d={`M${tx} ${ty} Q${tx + Math.cos(rad) * 14 * s} ${ty + Math.sin(rad) * 14 * s - 4 * s} ${ex} ${ey} Q${tx + Math.cos(rad) * 10 * s} ${ty + Math.sin(rad) * 8 * s} ${tx} ${ty + 2 * s} Z`} fill={a < -60 ? '#7d9a5a' : '#5f7d45'} />
      })}
    </g>
  )
}

// ——— Devarim: across the Jordan, in the land of Moab ———————————————

export function Devarim() {
  const { tilt } = useArtMotion()
  return (
    <>
      <Sky id="devarim" from={C.blueSoft} />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={296} cy={206} r={24} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* the land beyond the river, hills rising west */}
        <path d="M-40 338 C20 312 70 300 120 312 C170 324 200 294 250 288 C300 282 340 304 460 312 L460 560 L-40 560 Z" fill="#e6cfa8" />
        <path d="M250 288 C300 282 340 304 460 312 L460 330 C380 318 320 300 250 288 Z" fill="#d9ccb1" />
      </Layer>
      <Layer depth={0.45} tilt={tilt}>
        <path d="M-40 366 C40 344 100 338 160 350 C220 362 280 334 340 332 C390 332 430 346 460 352 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 390 C60 376 140 380 220 386 C300 392 380 376 460 380 L460 560 L-40 560 Z" fill="#7d9a5a" />
        {[-10, 40, 96, 150, 206, 262, 318, 372, 420].map((x, i) => (
          <ellipse key={x} cx={x} cy={398 - (i % 2) * 4} rx={20 + (i % 3) * 5} ry="11" fill="#5f7d45" />
        ))}
      </Layer>
      <Layer depth={0.7} tilt={tilt}>
        {/* the Jordan */}
        <path d="M-40 402 C60 394 140 404 220 410 C300 416 380 404 460 408 L460 478 C380 470 300 482 220 472 C140 462 60 448 -40 450 Z" fill={C.water} />
        <path d="M-40 432 C60 430 140 446 220 454 C300 462 380 456 460 462 L460 478 C380 470 300 482 220 472 C140 462 60 448 -40 450 Z" fill="#8fb3d4" />
        <Flow d="M-30 414 C60 410 140 420 220 426 C300 432 380 424 450 426" dash="28 44 10 56" dur={9} width={2.6} />
        <Flow d="M-30 428 C60 426 140 438 220 442 C300 448 380 440 450 444" dash="8 60 30 70" dur={7} delay={0.6} width={2} opacity={0.7} />
        <Flow d="M-30 444 C60 446 140 456 220 462 C300 466 380 462 450 466" dash="18 52 6 40" dur={6} delay={1.2} width={2} opacity={0.55} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        {/* the near bank: the plains of Moab */}
        <path d="M-40 448 C60 446 140 460 220 470 C300 480 380 468 460 476 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <path d="M-40 508 C80 494 220 498 300 506 C360 512 420 506 460 502 L460 560 L-40 560 Z" fill="#d9ccb1" />
        <path d="M56 494 C62 480 88 478 96 492 Z M316 500 C322 488 344 488 350 500 Z M250 530 C254 522 268 522 272 530 Z" fill="#e6cfa8" />
      </Layer>
    </>
  )
}

// ——— Va'etchanan: the doorpost of a house, and the gate ———————————————

export function Vaetchanan() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="vaetchanan" from="#f4b27c" />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={96} cy={170} r={24} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 C40 300 120 296 200 310 C280 322 360 300 460 310 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* the town wall and its gate */}
        <path d="M-40 384 C60 370 200 372 460 380 L460 560 L-40 560 Z" fill={C.land} />
        <rect x="-40" y="318" width="220" height="62" fill="#d9ccb1" />
        {Array.from({ length: 11 }, (_, i) => (
          <rect key={i} x={-36 + i * 20} y="310" width="12" height="12" rx="4" fill="#d9ccb1" />
        ))}
        {[46, 128].map((x) => (
          <g key={x}>
            <rect x={x} y="296" width="30" height="86" fill="#e6cfa8" />
            <rect x={x + 20} y="296" width="10" height="86" fill="#d9ccb1" />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x - 2 + k * 12} y="288" width="8" height="12" rx="3" fill="#e6cfa8" />
            ))}
          </g>
        ))}
        <path d="M76 382 L76 336 Q102 312 128 336 L128 382 Z" fill="#3b2a24" />
        <path d="M76 382 L76 338 L88 344 L88 380 Z M128 382 L128 338 L116 344 L116 380 Z" fill="#8a5a3c" />
        {/* the small case on the gate's right post */}
        <rect x="131" y="334" width="4" height="15" rx="1.5" fill="#c9773f" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        {/* a house of stone, flat-roofed */}
        <rect x="166" y="262" width="300" height="298" fill="#e6cfa8" />
        <rect x="166" y="252" width="300" height="14" fill="#e2d2b2" />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={176 + i * 30} y="268" width="10" height="7" fill="#8a5a3c" />
        ))}
        {[300, 336, 372, 408, 444, 480].map((y, r) =>
          Array.from({ length: 6 }, (_, k) => (
            <rect key={`${y}-${k}`} x={170 + k * 54 + (r % 2) * 27} y={y} width="50" height="32" fill="#e2d2b2" opacity="0.6" />
          ))
        )}
        {/* doorway: stone jambs, a wooden lintel */}
        <rect x="186" y="314" width="112" height="210" fill="#3b2a24" />
        <motion.ellipse cx="244" cy="470" rx="70" ry="70" fill="url(#glow)" animate={still ? undefined : { opacity: [0.45, 0.75, 0.45] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <path d="M200 324 L226 336 L226 506 L200 520 Z" fill="#8a5a3c" />
        <path d="M200 324 L208 328 L208 516 L200 520 Z" fill="#b0612f" />
        <rect x="176" y="314" width="26" height="212" fill="#d9ccb1" />
        <rect x="282" y="314" width="26" height="212" fill="#d9ccb1" />
        {[0, 1, 2, 3, 4].map((k) => (
          <g key={k}>
            <rect x="176" y={318 + k * 42} width="26" height="40" fill={k % 2 ? C.land : '#f4ecdc'} />
            <rect x="282" y={318 + k * 42} width="26" height="40" fill={k % 2 ? '#f4ecdc' : C.land} />
            <rect x="302" y={318 + k * 42} width="6" height="40" fill="#d9ccb1" />
          </g>
        ))}
        <rect x="166" y="296" width="152" height="22" fill="#8a5a3c" />
        <rect x="166" y="296" width="152" height="6" fill="#b0612f" />
        <rect x="170" y="522" width="144" height="10" fill="#d9ccb1" />
        {/* the case on the right doorpost */}
        <defs>
          <clipPath id="vaetchanan-case">
            <rect x="287" y="352" width="15" height="52" rx="4" />
          </clipPath>
        </defs>
        <rect x="287" y="352" width="15" height="52" rx="4" fill="#c9773f" />
        <rect x="295" y="352" width="7" height="52" fill="#b0612f" clipPath="url(#vaetchanan-case)" />
        <rect x="289" y="356" width="3" height="44" rx="1.5" fill="#e59b62" />
        <motion.rect
          x="285"
          width="20"
          height="10"
          fill="#fff7e6"
          clipPath="url(#vaetchanan-case)"
          initial={{ y: 344, opacity: 0 }}
          animate={still ? { opacity: 0 } : { y: [344, 404, 404], opacity: [0, 0.8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.35, 1], repeatDelay: 1 }}
        />
        <path d="M-40 520 C40 516 120 520 180 526 L460 530 L460 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
    </>
  )
}

// ——— Ekev: a land of streams and springs, and its seven kinds ———————————————

function Wheat({ x, y, n = 5 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i - (n - 1) / 2) * 7
        const len = 96 + (i % 2) * 14
        const rad = ((a - 90) * Math.PI) / 180
        const tx = x + Math.cos(rad) * len
        const ty = y + Math.sin(rad) * len
        return (
          <Sway key={i} x={x} y={y} deg={1.6} dur={4.5} delay={i * 0.3}>
            <line x1={x} y1={y} x2={tx} y2={ty} stroke="#c9773f" strokeWidth="2.2" />
            <g transform={`rotate(${a} ${tx} ${ty})`}>
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <g key={k}>
                  <ellipse cx={tx - 3.6} cy={ty - 2 - k * 6.4} rx="3" ry="5" fill="#e2b04a" transform={`rotate(-32 ${tx - 3.6} ${ty - 2 - k * 6.4})`} />
                  <ellipse cx={tx + 3.6} cy={ty - 2 - k * 6.4} rx="3" ry="5" fill="#c9773f" transform={`rotate(32 ${tx + 3.6} ${ty - 2 - k * 6.4})`} />
                </g>
              ))}
              <ellipse cx={tx} cy={ty - 38} rx="3" ry="5" fill="#e2b04a" />
            </g>
          </Sway>
        )
      })}
    </g>
  )
}

function Barley({ x, y, n = 5 }: { x: number; y: number; n?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = (i - (n - 1) / 2) * 8
        const len = 90 + (i % 2) * 12
        const rad = ((a - 90) * Math.PI) / 180
        const tx = x + Math.cos(rad) * len
        const ty = y + Math.sin(rad) * len
        const dir = 1
        return (
          <Sway key={i} x={x} y={y} deg={1.8} dur={5} delay={i * 0.35}>
            <line x1={x} y1={y} x2={tx} y2={ty} stroke="#e2b04a" strokeWidth="2" />
            {/* a nodding ear with long awns */}
            <g transform={`rotate(${dir * 55} ${tx} ${ty})`}>
              {[0, 1, 2, 3, 4].map((k) => (
                <g key={k}>
                  <ellipse cx={tx} cy={ty - 3 - k * 6} rx="3" ry="4.4" fill="#f1cf7a" />
                  <line x1={tx - 2} y1={ty - 4 - k * 6} x2={tx - 12} y2={ty - 30 - k * 6} stroke="#e2b04a" strokeWidth="1" />
                  <line x1={tx + 2} y1={ty - 4 - k * 6} x2={tx + 12} y2={ty - 30 - k * 6} stroke="#e2b04a" strokeWidth="1" />
                </g>
              ))}
            </g>
          </Sway>
        )
      })}
    </g>
  )
}

function GrapeCluster({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const rows = [4, 3, 3, 2, 1]
  return (
    <g>
      <path d={`M${x} ${y - 6 * s} q2 -8 8 -10`} stroke="#8a5a3c" strokeWidth="2" fill="none" />
      {rows.map((n, r) =>
        Array.from({ length: n }, (_, k) => (
          <circle key={`${r}-${k}`} cx={x + (k - (n - 1) / 2) * 7 * s} cy={y + r * 6.4 * s} r={4 * s} fill={k % 2 ? '#6a3d9a' : '#58327f'} />
        ))
      )}
    </g>
  )
}

function Pomegranate({ x, y, r = 7 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#b3263a" />
      <path d={`M${x - r * 0.45} ${y - r * 0.8} L${x - r * 0.3} ${y - r * 1.35} L${x} ${y - r * 1.05} L${x + r * 0.3} ${y - r * 1.35} L${x + r * 0.45} ${y - r * 0.8} Z`} fill="#8e1e2e" />
      <circle cx={x - r * 0.35} cy={y - r * 0.2} r={r * 0.28} fill="#e8573a" opacity="0.7" />
    </g>
  )
}

function Fig({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path d={`M${x} ${y - 7 * s} C${x + 2 * s} ${y - 3 * s} ${x + 6 * s} ${y} ${x + 5 * s} ${y + 4 * s} C${x + 4 * s} ${y + 8 * s} ${x - 4 * s} ${y + 8 * s} ${x - 5 * s} ${y + 4 * s} C${x - 6 * s} ${y} ${x - 2 * s} ${y - 3 * s} ${x} ${y - 7 * s} Z`} fill="#6a3d9a" />
}

function HoneyJar({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="30" ry="5" fill={C.ink} opacity="0.12" />
      {/* clay jar */}
      <path d="M-14 -58 L14 -58 L12 -48 C30 -40 34 -14 22 -2 C14 4 -14 4 -22 -2 C-34 -14 -30 -40 -12 -48 Z" fill="#c9773f" />
      <path d="M8 -48 C26 -40 30 -14 18 -2 C14 2 8 3 4 3 C14 -8 16 -34 8 -48 Z" fill="#b0612f" />
      <path d="M-22 -40 C-34 -34 -32 -22 -24 -20" stroke="#b0612f" strokeWidth="4" fill="none" />
      <rect x="-17" y="-62" width="34" height="7" rx="3" fill="#e59b62" />
      {/* honey over the lip */}
      <path d="M-14 -58 L14 -58 L14 -54 C12 -50 10 -44 8 -44 C6 -44 6 -50 4 -52 C2 -52 0 -38 -3 -38 C-6 -38 -6 -50 -8 -52 C-10 -50 -11 -48 -12 -48 C-14 -48 -14 -52 -14 -54 Z" fill="#e2b04a" />
      <ellipse cx="0" cy="-60" rx="13" ry="3" fill="#f1cf7a" />
    </g>
  )
}

export function Ekev() {
  const { tilt, still } = useArtMotion()
  const stream = 'M262 426 C240 436 224 442 200 450 C170 460 150 462 128 476 C104 492 96 520 74 560'
  return (
    <>
      <Sky id="ekev" from={C.blueSoft} />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={320} cy={170} r={22} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 330 C20 300 80 290 140 306 C200 322 250 288 310 290 C370 292 420 314 460 320 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 346 C60 330 120 332 180 342 M200 330 C260 316 330 318 460 334" stroke="#7d9a5a" strokeWidth="3" fill="none" opacity="0.6" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 380 C80 368 300 366 460 376 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* olive tree */}
        <path d="M72 404 C76 384 64 372 74 352 L84 348 C82 366 96 380 92 404 Z" fill="#8a6a58" />
        <path d="M78 360 L60 342 M84 356 L104 340" stroke="#8a6a58" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="80" cy="330" rx="54" ry="26" fill="#7d9a5a" />
        <ellipse cx="62" cy="320" rx="30" ry="16" fill="#a9bf7e" />
        <ellipse cx="100" cy="322" rx="28" ry="15" fill="#a9bf7e" />
        {[[52, 334], [70, 340], [96, 338], [110, 330], [84, 344], [60, 328]].map(([cx, cy]) => (
          <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="3" ry="4" fill="#3b2a24" />
        ))}
        {/* fig tree */}
        <path d="M194 404 C196 380 190 366 196 346 L206 346 C206 366 212 380 208 404 Z" fill="#8a6a58" />
        <ellipse cx="200" cy="326" rx="50" ry="32" fill="#5f7d45" />
        {[[164, 318], [186, 302], [214, 300], [236, 318], [176, 338], [224, 340], [200, 322]].map(([cx, cy], i) => (
          <path key={i} d={`M${cx} ${cy + 12} C${cx - 16} ${cy + 6} ${cx - 14} ${cy - 10} ${cx - 6} ${cy - 8} C${cx - 6} ${cy - 16} ${cx + 6} ${cy - 16} ${cx + 6} ${cy - 8} C${cx + 14} ${cy - 10} ${cx + 16} ${cy + 6} ${cx} ${cy + 12} Z`} fill={i % 2 ? '#7d9a5a' : '#a9bf7e'} />
        ))}
        {[[174, 330], [196, 344], [220, 330], [208, 312], [184, 314]].map(([x, y]) => (
          <Fig key={`${x}-${y}`} x={x} y={y} />
        ))}
        {/* pomegranate tree */}
        <path d="M314 404 L318 360 L322 360 L326 404 Z M306 404 L300 370 L304 368 L312 404 Z M334 404 L340 372 L344 374 L338 404 Z" fill="#8a6a58" />
        <ellipse cx="322" cy="332" rx="46" ry="34" fill="#5f7d45" />
        <ellipse cx="306" cy="322" rx="26" ry="18" fill="#7d9a5a" />
        {[[296, 340], [318, 314], [344, 330], [330, 352], [306, 358], [350, 350]].map(([x, y]) => (
          <Pomegranate key={`${x}-${y}`} x={x} y={y} />
        ))}
      </Layer>
      <Layer depth={0.75} tilt={tilt}>
        {/* the spring rising from the rocks, and its stream */}
        <path d="M226 434 C230 410 252 400 280 404 C306 406 318 422 312 438 Z" fill="#d9ccb1" />
        <path d="M226 434 C230 410 252 400 280 404 C262 408 246 420 244 434 Z" fill="#e6cfa8" />
        <path d={stream} stroke={C.water} strokeWidth="26" fill="none" strokeLinecap="round" />
        <path d={stream} stroke="#8fb3d4" strokeWidth="10" fill="none" strokeLinecap="round" transform="translate(3 4)" />
        <Flow d={stream} dash="12 22" dur={2.6} width={2.6} />
        <ellipse cx="264" cy="428" rx="22" ry="8" fill={C.water} />
        {[0, 1.3].map((d) => (
          <motion.ellipse
            key={d}
            cx="264"
            cy="428"
            fill="none"
            stroke="#fbf7ef"
            strokeWidth="1.6"
            initial={{ rx: 4, ry: 1.5, opacity: 0.8 }}
            animate={still ? { rx: 12, ry: 4, opacity: 0.6 } : { rx: [4, 20], ry: [1.5, 7], opacity: [0.9, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: d, ease: 'easeOut' }}
          />
        ))}
        {/* the vine on its stake */}
        <path d="M134 452 L136 372" stroke="#8a5a3c" strokeWidth="4" />
        <path d="M130 452 C120 430 150 420 136 400 C126 386 146 378 140 366" stroke="#8a5a3c" strokeWidth="5" fill="none" strokeLinecap="round" />
        {[[118, 384], [152, 378], [126, 404], [156, 410], [138, 362]].map(([cx, cy], i) => (
          <path key={i} d={`M${cx} ${cy + 11} C${cx - 14} ${cy + 4} ${cx - 12} ${cy - 8} ${cx - 5} ${cy - 6} C${cx - 5} ${cy - 13} ${cx + 5} ${cy - 13} ${cx + 5} ${cy - 6} C${cx + 12} ${cy - 8} ${cx + 14} ${cy + 4} ${cx} ${cy + 11} Z`} fill={i % 2 ? '#5f7d45' : '#7d9a5a'} />
        ))}
        <GrapeCluster x={116} y={400} s={1.1} />
        <GrapeCluster x={158} y={422} s={1.1} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 516 C80 506 300 504 460 512 L460 560 L-40 560 Z" fill="#d9ccb1" />
        <Wheat x={66} y={532} />
        <HoneyJar x={206} y={536} s={1.35} />
        <Barley x={338} y={532} />
      </Layer>
    </>
  )
}

// ——— Re'eh: Mount Gerizim and Mount Ebal, the terebinths between ———————————————

/** A broad, spreading terebinth: a short trunk forking low, a wide flat crown. */
function Terebinth({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  const p = (dx: number, dy: number) => `${x + dx * s} ${y + dy * s}`
  return (
    <g>
      <ellipse cx={x} cy={y + 2 * s} rx={56 * s} ry={6 * s} fill={C.ink} opacity="0.12" />
      <g stroke="#8a5a3c" strokeLinecap="round" fill="none">
        <path d={`M${p(0, 0)} C${p(0, -12)} ${p(-2, -20)} ${p(0, -26)}`} strokeWidth={13 * s} />
        <path d={`M${p(0, -24)} C${p(-10, -34)} ${p(-24, -40)} ${p(-40, -46)}`} strokeWidth={7 * s} />
        <path d={`M${p(0, -24)} C${p(10, -34)} ${p(24, -42)} ${p(38, -48)}`} strokeWidth={7 * s} />
        <path d={`M${p(0, -24)} C${p(2, -34)} ${p(0, -42)} ${p(4, -52)}`} strokeWidth={6 * s} />
      </g>
      <Sway x={x} y={y} deg={1} dur={6} delay={delay}>
        <ellipse cx={x} cy={y - 66 * s} rx={68 * s} ry={34 * s} fill="#5f7d45" />
        <ellipse cx={x - 30 * s} cy={y - 76 * s} rx={34 * s} ry={22 * s} fill="#7d9a5a" />
        <ellipse cx={x + 24 * s} cy={y - 82 * s} rx={34 * s} ry={22 * s} fill="#7d9a5a" />
        <ellipse cx={x - 8 * s} cy={y - 92 * s} rx={26 * s} ry={14 * s} fill="#7d9a5a" />
        <ellipse cx={x - 24 * s} cy={y - 90 * s} rx={16 * s} ry={8 * s} fill="#a9bf7e" />
        <ellipse cx={x + 22 * s} cy={y - 96 * s} rx={12 * s} ry={6 * s} fill="#a9bf7e" />
      </Sway>
    </g>
  )
}

export function Reeh() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="reeh" from="#f4b27c" />
      <Layer depth={0.08} tilt={tilt}>
        <motion.circle cx="200" cy="250" r="90" fill="url(#glow)" animate={still ? undefined : { opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="200" cy="250" r="22" fill="#fff7e6" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 380 C60 362 140 370 200 376 C260 370 340 360 460 374 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* two mountains, facing each other across the valley */}
        <path d="M-40 470 L-40 318 C0 300 50 262 100 236 C112 230 120 232 130 240 C170 280 206 370 232 470 Z" fill="#e2d2b2" />
        <path d="M100 236 C112 230 120 232 130 240 C170 280 206 370 232 470 L140 470 C150 390 132 300 100 236 Z" fill="#cdb998" />
        <path d="M460 470 L460 306 C420 290 360 250 312 224 C300 218 292 220 282 228 C240 270 200 370 172 470 Z" fill="#e2d2b2" />
        <path d="M312 224 C300 218 292 220 282 228 C240 270 200 370 172 470 L270 470 C262 380 280 290 312 224 Z" fill="#ecdcbd" />
        <path d="M-40 424 C40 414 110 424 190 444 C260 424 360 412 460 418 L460 470 L-40 470 Z" fill="#a9bf7e" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C80 456 300 454 460 466 L460 560 L-40 560 Z" fill="#7d9a5a" />
        <path d="M-40 516 C100 506 300 504 460 512 L460 560 L-40 560 Z" fill="#5f7d45" />
        {/* the terebinths of Moreh, a grove in the valley between */}
        <Terebinth x={112} y={490} s={0.8} delay={0.8} />
        <Terebinth x={298} y={492} s={0.85} delay={1.6} />
        <Terebinth x={204} y={512} s={1.15} delay={0} />
      </Layer>
    </>
  )
}

// ——— Shoftim: fruit trees left standing outside a besieged city ———————————————

function FruitTree({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  const fruit = [[-30, -62], [-10, -80], [16, -66], [34, -86], [-26, -94], [8, -100], [30, -58], [-40, -80]]
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={40 * s} ry={6 * s} fill={C.ink} opacity="0.1" />
      <path d={`M${x - 7 * s} ${y} C${x - 5 * s} ${y - 30 * s} ${x - 8 * s} ${y - 44 * s} ${x - 20 * s} ${y - 60 * s} L${x - 14 * s} ${y - 62 * s} C${x - 4 * s} ${y - 50 * s} ${x + 2 * s} ${y - 50 * s} ${x + 12 * s} ${y - 64 * s} L${x + 18 * s} ${y - 60 * s} C${x + 8 * s} ${y - 46 * s} ${x + 6 * s} ${y - 30 * s} ${x + 8 * s} ${y} Z`} fill="#8a5a3c" />
      <Sway x={x} y={y} deg={1.4} dur={5.5} delay={delay}>
        <ellipse cx={x} cy={y - 80 * s} rx={56 * s} ry={42 * s} fill="#5f7d45" />
        <ellipse cx={x - 14 * s} cy={y - 90 * s} rx={38 * s} ry={28 * s} fill="#7d9a5a" />
        <ellipse cx={x - 22 * s} cy={y - 98 * s} rx={18 * s} ry={12 * s} fill="#a9bf7e" />
        {fruit.map(([fx, fy], i) => (
          <circle key={i} cx={x + fx * s} cy={y + fy * s} r={5.5 * s} fill="#b3263a" />
        ))}
      </Sway>
    </g>
  )
}

export function Shoftim() {
  const { tilt } = useArtMotion()
  const houses = [[74, 286, 30, 20], [102, 278, 26, 28], [132, 290, 34, 16], [238, 284, 30, 22], [270, 276, 26, 30], [300, 288, 32, 18]]
  return (
    <>
      <Sky id="shoftim" from={C.blueSoft} />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={316} cy={196} r={22} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 360 C40 340 120 336 200 344 C280 352 360 332 460 344 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* the city on its mound: flat roofs behind a towered wall, the gate shut */}
        <path d="M-40 420 C20 410 40 382 70 374 L330 374 C360 382 380 410 460 420 L460 560 L-40 560 Z" fill="#e6cfa8" />
        <path d="M330 374 C360 382 380 410 460 420 L460 440 C380 432 350 400 322 380 Z" fill="#d9ccb1" />
        {houses.map(([x, y, w, h]) => (
          <g key={x}>
            <rect x={x} y={y} width={w} height={h + 20} fill={C.land} />
            <rect x={x + w * 0.7} y={y} width={w * 0.3} height={h + 20} fill="#e2d2b2" />
            <rect x={x + w * 0.3} y={y + 6} width="5" height="7" fill="#8a5a3c" />
          </g>
        ))}
        <rect x="64" y="306" width="272" height="72" fill="#d9ccb1" />
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={66 + i * 19.4} y="298" width="11" height="12" rx="4" fill="#d9ccb1" />
        ))}
        {[50, 150, 214, 314].map((x) => (
          <g key={x}>
            <rect x={x} y="290" width="36" height="88" fill="#e6cfa8" />
            <rect x={x + 24} y="290" width="12" height="88" fill="#d0bf9c" />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x + k * 14} y="282" width="8" height="12" rx="3" fill={k === 2 ? '#d0bf9c' : '#e6cfa8'} />
            ))}
          </g>
        ))}
        {/* gate, closed */}
        <path d="M186 378 L186 340 Q200 324 214 340 L214 378 Z" fill="#8a5a3c" />
        <rect x="199" y="332" width="2" height="46" fill="#3b2a24" opacity="0.6" />
        <rect x="186" y="356" width="28" height="3" fill="#3b2a24" opacity="0.4" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C80 458 300 456 460 466 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <path d="M-40 520 C100 510 300 508 460 516 L460 560 L-40 560 Z" fill="#d9ccb1" />
        {/* a row of fruit trees, left standing, running off both edges */}
        <FruitTree x={24} y={524} s={1.05} delay={0.6} />
        <FruitTree x={126} y={512} s={1} delay={0} />
        <FruitTree x={276} y={512} s={1} delay={1.2} />
        <FruitTree x={378} y={524} s={1.05} delay={1.8} />
      </Layer>
    </>
  )
}

// ——— Ki Teitzei: a nest by the road, the mother bird flying off ———————————————

function Bird({ still }: { still: boolean }) {
  // Seen from the side, heading up and left; a generic bird.
  return (
    <g>
      <motion.path
        d="M2 -2 C-6 -22 -2 -38 16 -48 C14 -30 18 -14 12 -2 Z"
        fill="#8a6a58"
        style={{ originX: '6px', originY: '-2px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 70, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M22 2 L40 -4 L42 4 L24 8 Z" fill="#8a6a58" />
      <ellipse cx="4" cy="2" rx="22" ry="9" fill="#b77b4d" transform="rotate(-12 4 2)" />
      <circle cx="-18" cy="-4" r="8" fill="#b77b4d" />
      <path d="M-25 -6 L-33 -3 L-25 -1 Z" fill="#3b2a24" />
      <circle cx="-20" cy="-6" r="1.8" fill="#3b2a24" />
      <motion.path
        d="M6 0 C0 -24 8 -42 30 -50 C24 -32 26 -14 18 2 Z"
        fill="#cfae98"
        style={{ originX: '10px', originY: '0px', transformBox: 'view-box' }}
        animate={still ? undefined : { rotate: [0, 80, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  )
}

export function KiTeitzei() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="ki-teitzei" from={C.blueSoft} />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={90} cy={180} r={22} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 350 C40 326 120 322 180 336 C240 350 320 318 460 330 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 392 C80 376 300 372 460 384 L460 560 L-40 560 Z" fill="#a9bf7e" />
        {/* the road, winding in from the hills */}
        <path d="M150 380 C160 380 176 382 180 386 C190 400 130 414 136 440 C142 470 230 486 250 560 L90 560 C92 500 60 470 84 438 C100 414 150 400 142 386 Z" fill={C.sand} />
        <path d="M150 380 C160 380 176 382 180 386 C190 400 130 414 136 440 C142 470 230 486 250 560 L226 560 C206 494 126 474 120 440 C116 414 172 400 150 380 Z" fill="#efe3cb" />
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        {/* the tree by the road */}
        <path d="M318 540 C320 480 310 440 314 400 C316 370 326 350 330 330 L342 332 C336 356 330 380 332 410 C334 450 344 490 346 540 Z" fill="#8a5a3c" />
        <path d="M316 410 C296 400 270 404 246 398 L246 390 C270 394 296 390 318 398 Z" fill="#8a5a3c" />
        <Sway x={330} y={330} deg={1} dur={6}>
          <ellipse cx="330" cy="300" rx="80" ry="54" fill="#5f7d45" />
          <ellipse cx="306" cy="286" rx="50" ry="34" fill="#7d9a5a" />
          <ellipse cx="290" cy="276" rx="24" ry="14" fill="#a9bf7e" />
          <ellipse cx="376" cy="322" rx="36" ry="22" fill="#7d9a5a" />
        </Sway>
        {/* the nest, with eggs */}
        <g transform="translate(258 398) scale(1.45) translate(-258 -398)">
          <ellipse cx="248" cy="388" rx="8" ry="10" fill="#f4ecdc" transform="rotate(-14 248 388)" />
          <ellipse cx="266" cy="387" rx="8" ry="10" fill="#f6f0e2" transform="rotate(12 266 387)" />
          <ellipse cx="257" cy="392" rx="8" ry="10" fill="#fff7e6" />
          <path d="M228 390 C230 406 244 412 258 412 C274 412 286 404 288 390 C278 396 238 396 228 390 Z" fill="#8a5a3c" />
          <path d="M232 396 C246 402 270 402 284 396 M236 403 C250 408 268 408 280 403" stroke="#b77b4d" strokeWidth="1.4" fill="none" />
        </g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 520 C60 510 180 512 240 520 C320 530 400 516 460 512 L460 560 L-40 560 Z" fill="#7d9a5a" />
        {/* the mother bird, sent off from the nest, flying away */}
        <motion.g
          initial={still ? false : { x: 120, y: 90 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 2.6, delay: 0.3, ease: 'easeOut' }}
        >
          <motion.g animate={still ? undefined : { x: [0, -8, 0], y: [0, -6, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.9 }}>
            <g transform="translate(124 292) scale(1.35)">
              <Bird still={still} />
            </g>
          </motion.g>
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Ki Tavo: a basket of first fruits ———————————————

export function KiTavo() {
  const { tilt, still } = useArtMotion()
  const drop = (i: number) =>
    still
      ? {}
      : { initial: { y: -70, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { type: 'spring' as const, stiffness: 120, damping: 14, delay: 0.4 + i * 0.28 } }
  return (
    <>
      <Sky id="ki-tavo" from="#f4b27c" />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={300} cy={176} r={24} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 344 C40 322 130 318 200 330 C270 342 340 318 460 326 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* fields of the land */}
        <path d="M-40 376 C80 360 300 358 460 368 L460 560 L-40 560 Z" fill="#f1cf7a" />
        <path d="M-40 402 C100 390 260 390 460 398 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 432 C120 422 280 424 460 430 L460 560 L-40 560 Z" fill="#e2b04a" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C80 490 300 488 460 496 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <motion.ellipse cx="200" cy="420" rx="170" ry="110" fill="url(#glow)" animate={still ? { opacity: 0.6 } : { opacity: [0.45, 0.75, 0.45] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
        <ellipse cx="200" cy="522" rx="110" ry="9" fill={C.ink} opacity="0.12" />
        {/* first fruits of the land (8:8): wheat, dates, pomegranates, figs, grapes, olives */}
        <motion.g {...drop(0)}>
          {[-28, -14, 0, 14, 28].map((a) => (
            <g key={a} transform={`rotate(${a} 200 430)`}>
              <line x1="200" y1="430" x2="200" y2="336" stroke="#c9773f" strokeWidth="2.4" />
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <g key={k}>
                  <ellipse cx="196.5" cy={338 - k * 7} rx="3.8" ry="5.4" fill="#e2b04a" transform={`rotate(-18 196.5 ${338 - k * 7})`} />
                  <ellipse cx="203.5" cy={338 - k * 7} rx="3.8" ry="5.4" fill="#c9773f" transform={`rotate(18 203.5 ${338 - k * 7})`} />
                </g>
              ))}
              <ellipse cx="200" cy="296" rx="3" ry="5" fill="#e2b04a" />
            </g>
          ))}
        </motion.g>
        <motion.g {...drop(1)}>
          {/* a cluster of dates */}
          <path d="M268 360 C272 370 280 380 292 384 M268 360 C270 374 272 386 276 398 M268 360 C262 372 258 384 256 396" stroke="#e2b04a" strokeWidth="2" fill="none" />
          {[[292, 388], [284, 394], [298, 398], [276, 402], [288, 406], [262, 400], [270, 410], [280, 414], [256, 408]].map(([x, y]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5.5" ry="8" fill={(x + y) % 3 ? '#b0612f' : '#8a5a3c'} />
          ))}
        </motion.g>
        <motion.g {...drop(2)}>
          <Pomegranate x={214} y={396} r={27} />
        </motion.g>
        <motion.g {...drop(3)}>
          <Fig x={160} y={400} s={2.6} />
          <Pomegranate x={262} y={412} r={19} />
        </motion.g>
        <motion.g {...drop(4)}>
          <Fig x={184} y={414} s={2.2} />
        </motion.g>
        {/* the woven basket */}
        <defs>
          <clipPath id="ki-tavo-basket">
            <path d="M104 432 L296 432 L276 514 Q200 526 124 514 Z" />
          </clipPath>
        </defs>
        <path d="M104 432 L296 432 L276 514 Q200 526 124 514 Z" fill="#c9773f" />
        <g clipPath="url(#ki-tavo-basket)">
          {[0, 1, 2, 3, 4, 5].map((r) =>
            Array.from({ length: 12 }, (_, k) => (
              <rect key={`${r}-${k}`} x={100 + k * 18 + (r % 2) * 9} y={440 + r * 14} width="10" height="14" fill="#b0612f" />
            ))
          )}
          <path d="M240 432 L296 432 L276 520 L230 520 Z" fill="#8a5a3c" opacity="0.25" />
        </g>
        <rect x="96" y="424" width="208" height="14" rx="7" fill="#e59b62" />
        <rect x="96" y="432" width="208" height="6" rx="3" fill="#c9773f" />
        {/* grapes and olives spilling over the rim */}
        <motion.g {...drop(5)}>
          <path d="M104 398 C112 390 128 388 136 396 C128 394 116 396 110 404 Z" fill="#7d9a5a" />
          <GrapeCluster x={128} y={406} s={2} />
        </motion.g>
        <motion.g {...drop(6)}>
          <path d="M296 412 C306 404 320 406 326 414 M300 414 C306 420 316 424 324 422" stroke="#5f7d45" strokeWidth="2" fill="none" />
          <path d="M306 408 C312 400 322 400 326 404 C320 408 312 410 306 408 Z M304 420 C312 426 322 428 328 424 C322 420 312 418 304 420 Z" fill="#a9bf7e" />
          {[[292, 426], [302, 420], [306, 432], [294, 438], [284, 432]].map(([x, y]) => (
            <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="5.5" ry="7" fill="#5f7d45" transform={`rotate(-20 ${x} ${y})`} />
          ))}
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Nitzavim: not in the heavens, not beyond the sea — close at hand ———————————————

export function Nitzavim() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="nitzavim" from={C.blueSoft} />
      <Layer depth={0.06} tilt={tilt}>
        {/* a wide sky */}
        <motion.g animate={still ? undefined : { x: [0, 14, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M40 200 C44 184 66 180 76 190 C84 174 112 176 116 192 C130 188 142 200 134 208 L40 208 Z" fill="#fbf7ef" opacity="0.8" />
          <path d="M260 250 C264 236 282 232 292 242 C300 228 326 230 330 244 C344 242 352 252 346 258 L260 258 Z" fill="#fbf7ef" opacity="0.7" />
        </motion.g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* the sea, to the horizon */}
        <rect x="-40" y="330" width="500" height="120" fill={C.water} />
        <rect x="-40" y="360" width="500" height="90" fill="#8fb3d4" />
        <rect x="-40" y="394" width="500" height="60" fill="#5d86b8" />
        <Flow d="M-40 344 L460 344" dash="8 46 20 70" dur={14} width={1.6} opacity={0.7} />
        <Flow d="M-40 372 L460 372" dash="26 64 10 50" dur={11} width={2} delay={1} opacity={0.6} />
        <Flow d="M-40 404 C60 400 140 408 240 404 C320 400 400 408 460 404" dash="34 58 14 44" dur={9} width={2.4} delay={0.5} opacity={0.5} />
        <path d="M-40 424 C40 416 120 428 200 422 C280 416 360 428 460 420 L460 440 L-40 440 Z" fill="#fbf7ef" opacity="0.5" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 430 C60 420 160 426 240 434 C320 442 400 430 460 428 L460 560 L-40 560 Z" fill={C.land} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C60 486 130 470 200 470 C270 470 340 486 460 500 L460 560 L-40 560 Z" fill="#d9ccb1" />
        <path d="M140 480 C160 468 240 468 260 480 C236 488 164 488 140 480 Z" fill="#b77b4d" opacity="0.55" />
        {/* a young green shoot */}
        <motion.g
          style={{ originX: '200px', originY: '478px', transformBox: 'view-box' }}
          initial={still ? false : { scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.5, ease: 'easeOut' }}
        >
          <g transform="translate(200 478) scale(1.35) translate(-200 -478)">
          <Sway x={200} y={478} deg={2} dur={5} delay={2.7}>
            <path d="M197 478 C194 450 206 420 200 388 L206 388 C212 420 202 452 205 478 Z" fill="#5f7d45" />
            <path d="M201 400 C180 402 150 392 132 360 C160 352 190 366 201 400 Z" fill="#a9bf7e" />
            <path d="M201 400 C180 402 150 392 132 360 C160 376 184 388 201 400 Z" fill="#7d9a5a" />
            <path d="M204 394 C222 392 252 378 266 344 C238 340 210 360 204 394 Z" fill="#a9bf7e" />
            <path d="M204 394 C222 392 252 378 266 344 C244 364 222 380 204 394 Z" fill="#7d9a5a" />
            <path d="M203 390 C196 374 198 360 206 350 C212 362 212 376 203 390 Z" fill="#7d9a5a" />
          </Sway>
          </g>
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Vayeilech: the book of Teaching, written to the end ———————————————

/** One rolled side of the scroll, on its wooden roller; `w` is how much parchment it holds. */
function Roll({ cx, w }: { cx: number; w: number }) {
  const x = cx - w / 2
  return (
    <g>
      {/* wooden roller, top and bottom */}
      <rect x={cx - 6} y="286" width="12" height="44" rx="5" fill="#8a5a3c" />
      <circle cx={cx} cy="286" r="8" fill="#b0612f" />
      <rect x={cx - 6} y="468" width="12" height="48" rx="5" fill="#8a5a3c" />
      <ellipse cx={cx} cy="330" rx={w / 2 + 8} ry="6" fill="#b0612f" />
      <ellipse cx={cx} cy="468" rx={w / 2 + 8} ry="6" fill="#b0612f" />
      {/* the rolled parchment */}
      <rect x={x} y="330" width={w} height="138" fill="#f6f0e2" />
      <rect x={x} y="330" width={w * 0.18} height="138" fill="#efe3cb" />
      <rect x={x + w * 0.78} y="330" width={w * 0.22} height="138" fill="#efe3cb" />
      <rect x={x + w * 0.3} y="330" width={w * 0.14} height="138" fill="#fff7e6" />
    </g>
  )
}

export function Vayeilech() {
  const { tilt, still } = useArtMotion()
  const lines = Array.from({ length: 12 }, (_, i) => ({ y: 348 + i * 9.5, w: i === 11 ? 24 : 56 }))
  return (
    <>
      <Sky id="vayeilech" from="#f4b27c" />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={96} cy={176} r={22} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 360 C40 340 120 336 200 348 C280 360 360 334 460 344 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 420 C80 406 300 404 460 414 L460 560 L-40 560 Z" fill={C.land} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C80 490 300 488 460 496 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <motion.ellipse cx="200" cy="400" rx="160" ry="130" fill="url(#glow)" animate={still ? { opacity: 0.6 } : { opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <ellipse cx="200" cy="532" rx="116" ry="8" fill={C.ink} opacity="0.12" />
        <g transform="translate(200 404) scale(1.14) translate(-200 -404)">
        {/* the open span between the rolls: the last column, written to its end */}
        <rect x="158" y="334" width="84" height="130" fill="#fff7e6" />
        <rect x="158" y="334" width="84" height="4" fill="#efe3cb" />
        <rect x="158" y="460" width="84" height="4" fill="#efe3cb" />
        {lines.map((l, i) => (
          <motion.line
            key={i}
            x1="228"
            x2={228 - l.w}
            y1={l.y}
            y2={l.y}
            stroke={C.ink}
            strokeOpacity="0.28"
            strokeWidth="2"
            strokeLinecap="round"
            initial={still ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.22, ease: 'easeInOut' }}
          />
        ))}
        {/* at the end of the book: little left on the left roller, the rest wound on the right */}
        <Roll cx={144} w={30} />
        <Roll cx={270} w={56} />
        </g>
      </Layer>
    </>
  )
}

// ——— Ha'azinu: rain and dew on young growth; the eagle over its nest ———————————————

function Eagle({ still }: { still: boolean }) {
  // Front view, wings spread wide, hovering over the nest.
  const wing = 'M0 0 C-26 -24 -60 -38 -104 -34 L-110 -26 L-98 -22 L-106 -12 L-92 -10 L-98 0 L-82 0 L-86 10 L-68 6 C-48 14 -24 14 0 14 Z'
  return (
    <g>
      {[1, -1].map((side) => (
        <motion.g
          key={side}
          style={{ originX: '0px', originY: '4px', transformBox: 'view-box' }}
          animate={still ? undefined : { rotate: side === 1 ? [0, -9, 0] : [0, 9, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <g transform={`scale(${side} 1) translate(-6 0)`}>
            <path d={wing} fill="#8a6a58" />
            <path d="M0 4 C-26 -14 -60 -24 -96 -22 L-92 -10 L-98 0 L-82 0 L-86 10 L-68 6 C-48 14 -24 14 0 14 Z" fill="#3b2a24" opacity="0.5" />
            <path d="M0 0 C-22 -18 -48 -28 -74 -28 C-52 -20 -30 -10 -6 6 Z" fill="#b77b4d" />
          </g>
        </motion.g>
      ))}
      <path d="M-12 -4 C-14 16 -10 34 0 44 C10 34 14 16 12 -4 Z" fill="#8a6a58" />
      <path d="M-8 38 L-14 58 L0 54 L14 58 L8 38 Z" fill="#8a6a58" />
      <circle cx="0" cy="-12" r="11" fill="#b77b4d" />
      <path d="M-4 -8 C-2 0 2 2 4 -2 C4 -6 2 -8 0 -8 Z" fill="#e2b04a" />
      <circle cx="-4.5" cy="-14" r="1.6" fill="#3b2a24" />
      <circle cx="4.5" cy="-14" r="1.6" fill="#3b2a24" />
    </g>
  )
}

export function Haazinu() {
  const { tilt, still } = useArtMotion()
  const blades = Array.from({ length: 22 }, (_, i) => ({ x: 22 + i * 8.5, h: 26 + ((i * 37) % 26), lean: ((i * 13) % 13) - 6 }))
  return (
    <>
      <Sky id="haazinu" from={C.blueSoft} />
      <Layer depth={0.1} tilt={tilt}>
        {/* the rain cloud */}
        <path d="M30 262 C28 240 52 228 70 238 C76 214 118 208 130 232 C150 222 176 236 172 256 C184 258 186 272 176 276 L36 276 C22 274 20 264 30 262 Z" fill="#8fb3d4" />
        <path d="M30 262 C28 240 52 228 70 238 C76 214 118 208 130 232 C120 226 86 226 80 250 C66 242 44 248 44 262 Z" fill={C.water} />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 390 C60 370 160 374 240 384 C320 394 400 376 460 380 L460 560 L-40 560 Z" fill="#e6cfa8" />
        {/* rain falling on the growth */}
        {[44, 66, 88, 110, 132, 154].map((x, i) => (
          <Flow key={x} d={`M${x} 280 L${x - 18} 470`} color="#5d86b8" dash="10 22" width={2.2} dur={1.6 + (i % 3) * 0.3} delay={i * 0.2} opacity={0.7} />
        ))}
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        {/* the crag and the nest on it */}
        <g transform="translate(-34 0)">
          <path d="M216 560 L224 470 L238 440 L234 414 L256 404 L338 404 L356 420 L352 450 L372 490 L380 560 Z" fill="#e2d2b2" />
          <path d="M338 404 L356 420 L352 450 L372 490 L380 560 L330 560 L324 470 L336 440 Z" fill="#d0bf9c" />
          {/* the young, downy, beaks open to the parent above */}
          {[[282, -1], [312, 1]].map(([x, dir], i) => (
            <motion.g key={x} animate={still ? undefined : { y: [0, -4, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}>
              <ellipse cx={x} cy="400" rx="14" ry="12" fill="#f6f0e2" />
              <path d={`M${x + dir * 6} 396 C${x + dir * 16} 394 ${x + dir * 18} 402 ${x + dir * 12} 408 Z`} fill="#e2d2b2" />
              <circle cx={x + dir * 2} cy="384" r="9.5" fill="#f6f0e2" />
              <path d={`M${x + dir * 7} 380 L${x + dir * 12} 371 L${x + dir * 11} 382 Z`} fill="#8a6a58" />
              <path d={`M${x + dir * 8} 384 L${x + dir * 16} 378 L${x + dir * 10} 386 Z`} fill="#b77b4d" />
              <circle cx={x + dir * 1} cy="381" r="1.7" fill="#3b2a24" />
            </motion.g>
          ))}
          <path d="M248 398 C250 414 270 422 296 422 C322 422 342 414 344 398 C322 408 270 408 248 398 Z" fill="#8a5a3c" />
          <path d="M256 406 C278 414 316 414 336 406 M262 413 C282 419 312 419 330 413" stroke="#b77b4d" strokeWidth="1.6" fill="none" />
        </g>
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        <motion.g animate={still ? undefined : { y: [0, -6, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
          <g transform="translate(262 300)">
            <Eagle still={still} />
          </g>
        </motion.g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 488 C40 478 140 478 220 486 C300 494 380 494 460 490 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 520 C80 512 300 512 460 518 L460 560 L-40 560 Z" fill="#7d9a5a" />
        {/* young growth, beaded with dew */}
        {blades.map((b, i) => (
          <g key={i}>
            <path d={`M${b.x - 3} 494 Q${b.x + b.lean * 0.4} ${494 - b.h * 0.6} ${b.x + b.lean} ${494 - b.h} Q${b.x + b.lean * 0.4 + 3} ${494 - b.h * 0.6} ${b.x + 3} 494 Z`} fill={i % 2 ? '#5f7d45' : '#7d9a5a'} />
            {i % 3 === 0 && (
              <motion.circle
                cx={b.x + b.lean * 0.8}
                cy={494 - b.h * 0.85}
                r="2.6"
                fill="#fbf7ef"
                animate={still ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              />
            )}
          </g>
        ))}
      </Layer>
    </>
  )
}

// ——— V'zot Habracha: the land seen from Mount Nebo ———————————————

export function VzotHabracha() {
  const { tilt } = useArtMotion()
  const palms = [[82, 474, 36, -4], [104, 464, 46, 2], [128, 476, 34, 5], [150, 460, 50, -3], [176, 472, 40, 4], [200, 462, 48, -2], [226, 474, 36, 3], [250, 464, 44, -4], [274, 474, 34, 2], [296, 468, 40, 4]]
  return (
    <>
      <Sky id="vzot-habracha" from="#f4b27c" />
      <Layer depth={0.08} tilt={tilt}>
        <Sun cx={96} cy={214} r={22} />
      </Layer>
      <Layer depth={0.16} tilt={tilt}>
        {/* the Western Sea, on the far horizon */}
        <rect x="-40" y="286" width="500" height="28" fill="#8fb3d4" />
        <rect x="-40" y="286" width="500" height="6" fill={C.water} />
        <Flow d="M-40 300 L460 300" dash="6 38 16 52" dur={12} width={1.8} opacity={0.9} />
        <path d="M-40 312 C40 300 100 304 160 308 C230 312 300 298 360 302 C400 304 430 308 460 310 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.32} tilt={tilt}>
        {/* the land spread out: hill country, ridge behind ridge */}
        <path d="M-40 350 C30 326 90 322 150 334 C210 346 270 318 330 318 C380 318 420 332 460 338 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M150 334 C210 346 270 318 330 318 C300 334 240 350 190 348 Z" fill="#7d9a5a" />
      </Layer>
      <Layer depth={0.5} tilt={tilt}>
        <path d="M-40 384 C40 368 120 364 190 374 C260 384 330 360 460 370 L460 560 L-40 560 Z" fill="#7d9a5a" />
        <path d="M190 374 C260 384 330 360 460 370 L460 384 C360 378 280 394 190 374 Z" fill="#5f7d45" />
      </Layer>
      <Layer depth={0.68} tilt={tilt}>
        {/* the Valley of Jericho, green with palms */}
        <path d="M-40 420 C60 408 180 408 260 414 C340 420 400 410 460 412 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <path d="M40 480 C56 452 130 440 196 442 C262 444 318 454 330 478 C270 492 100 494 40 480 Z" fill="#a9bf7e" />
        {palms.map(([x, y, h, lean], i) => (
          <Sway key={i} x={x} y={y} deg={1.6} dur={4 + (i % 3)} delay={i * 0.4}>
            <Palm x={x} y={y} h={h} lean={lean} s={1.2} />
          </Sway>
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        {/* the top of Nebo, where the view is taken from */}
        <path d="M-40 500 C40 490 120 492 190 502 C260 512 340 498 460 488 L460 560 L-40 560 Z" fill="#d9ccb1" />
        <path d="M24 496 C30 482 56 480 64 494 Z M300 504 C308 490 334 488 342 502 Z M380 496 C386 486 404 486 408 494 Z" fill="#e2d2b2" />
        <path d="M-40 532 C80 524 260 528 460 520 L460 560 L-40 560 Z" fill="#cdb998" />
      </Layer>
    </>
  )
}

export const SCENES: Record<string, () => ReactElement> = {
  devarim: () => <Devarim />,
  vaetchanan: () => <Vaetchanan />,
  ekev: () => <Ekev />,
  reeh: () => <Reeh />,
  shoftim: () => <Shoftim />,
  'ki-teitzei': () => <KiTeitzei />,
  'ki-tavo': () => <KiTavo />,
  nitzavim: () => <Nitzavim />,
  vayeilech: () => <Vayeilech />,
  haazinu: () => <Haazinu />,
  'vzot-habracha': () => <VzotHabracha />,
}
