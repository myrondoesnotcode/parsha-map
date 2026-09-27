import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { C, W, H, Layer, useArtMotion, TentEntrance, Flame, Smoke } from './kit'

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


export const SCENES: Record<string, () => ReactElement> = {
  vayikra: () => <Vayikra />,
  tazria: () => <Tazria />,
}
