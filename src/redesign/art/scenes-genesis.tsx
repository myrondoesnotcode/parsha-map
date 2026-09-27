import { useMemo } from 'react'
import type { ReactElement } from 'react'
import { motion } from 'motion/react'
import { C, W, H, Layer, useArtMotion, rng } from './kit'

// ——— Lech Lecha: the tent and altar under a sky being counted ———————————————

export function LechLecha() {
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


export const SCENES: Record<string, () => ReactElement> = {
  'lech-lecha': () => <LechLecha />,
}
