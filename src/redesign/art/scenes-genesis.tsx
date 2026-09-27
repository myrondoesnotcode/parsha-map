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


// ——— Shared local pieces ————————————————————————————————————————————————

const at = (x: number, y: number) => ({ originX: `${x}px`, originY: `${y}px`, transformBox: 'view-box' as const })

/** Four-point sparkle, the same star shape Lech Lecha uses. */
const sparkle = (x: number, y: number, s: number) =>
  `M${x} ${y - s * 2} Q${x} ${y} ${x + s * 2} ${y} Q${x} ${y} ${x} ${y + s * 2} Q${x} ${y} ${x - s * 2} ${y} Q${x} ${y} ${x} ${y - s * 2} Z`

/** Crescent lit on its left side. */
const crescent = (cx: number, cy: number, r: number, k = 0.5) =>
  `M${cx} ${cy - r} A${r} ${r} 0 1 0 ${cx} ${cy + r} A${r * k} ${r} 0 1 1 ${cx} ${cy - r} Z`

function Sky({ id, stops }: { id: string; stops: [number, string][] }) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
    </>
  )
}

// ——— Bereshit: the two great lights over sea, seed plants and fruit trees ———————————

function FruitTree({ x, base, s, seed }: { x: number; base: number; s: number; seed: number }) {
  const fruit = useMemo(() => {
    const r = rng(seed)
    return Array.from({ length: 9 }, () => {
      const a = r() * Math.PI * 2
      const d = Math.sqrt(r()) * 30
      return { x: Math.cos(a) * d * 1.2, y: -78 + Math.sin(a) * d * 0.8 }
    })
  }, [seed])
  return (
    <g transform={`translate(${x} ${base}) scale(${s})`}>
      <path d="M-5 0 L-3 -50 L-14 -66 L-10 -68 L0 -56 L10 -70 L14 -67 L4 -50 L6 0 Z" fill="#8a5a3c" />
      <circle cx="-22" cy="-70" r="24" fill="#7d9a5a" />
      <circle cx="22" cy="-72" r="24" fill="#5f7d45" />
      <circle cx="0" cy="-88" r="28" fill="#7d9a5a" />
      <path d="M0 -116 A28 28 0 0 1 28 -88 A24 24 0 0 1 22 -48 L10 -52 Z" fill="#5f7d45" opacity="0.7" />
      {fruit.map((f, i) => <circle key={i} cx={f.x} cy={f.y} r="4.2" fill="#e8573a" />)}
    </g>
  )
}

function SeedTuft({ x, base, s, flip }: { x: number; base: number; s: number; flip?: boolean }) {
  const stems: [number, number][] = [[-14, -34], [-5, -46], [5, -40], [14, -30]]
  return (
    <g transform={`translate(${x} ${base}) scale(${flip ? -s : s} ${s})`}>
      {stems.map(([dx, h], i) => (
        <g key={i}>
          <path d={`M0 0 Q${dx * 0.3} ${h * 0.5} ${dx} ${h}`} fill="none" stroke="#5f7d45" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx={dx} cy={h - 6} rx="3.2" ry="8" fill="#e2b04a" transform={`rotate(${dx * 1.4} ${dx} ${h - 6})`} />
        </g>
      ))}
      <path d="M-10 0 Q-16 -14 -24 -16 Q-12 -12 -4 0 Z M10 0 Q16 -12 24 -14 Q12 -10 4 0 Z" fill="#7d9a5a" />
    </g>
  )
}

export function Bereshit() {
  const { tilt, still } = useArtMotion()
  const stars = useMemo(() => {
    const r = rng(1116)
    return Array.from({ length: 70 }, () => ({ x: 400 - Math.pow(r(), 1.4) * 230, y: 10 + Math.pow(r(), 1.2) * 250, s: r() * 1.3 + 0.6, t: r() }))
      .filter((s) => (s.x - 170) / 230 > s.y / 300 - 0.05)
  }, [])
  return (
    <>
      <defs>
        <linearGradient id="bereshit-sky" x1="0" y1="0.62" x2="1" y2="0.08">
          <stop offset="0.18" stopColor="#f4b27c" />
          <stop offset="0.5" stopColor={C.blueSoft} />
          <stop offset="0.78" stopColor="#6f7be6" />
          <stop offset="1" stopColor={C.blue} />
        </linearGradient>
        <radialGradient id="bereshit-moonglow">
          <stop offset="0.3" stopColor="#fff7e6" stopOpacity="0.4" />
          <stop offset="1" stopColor="#fff7e6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bereshit-sea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8fb3d4" />
          <stop offset="1" stopColor="#5d86b8" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#bereshit-sky)" />
      <Layer depth={0.08} tilt={tilt}>
        {/* the lesser light, and the stars */}
        {stars.map((s, i) => (
          <motion.circle
            key={i} cx={s.x} cy={s.y} r={s.s} fill="#fff7e6"
            initial={still ? false : { opacity: 0 }}
            animate={still ? { opacity: 0.85 } : { opacity: [0, 1, 0.45, 1] }}
            transition={{ delay: 1.2 + i * 0.05, duration: 2.8 + s.t * 2, repeat: Infinity, repeatType: 'mirror' }}
          />
        ))}
        <motion.g initial={still ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2.4, delay: 0.4, ease: 'easeOut' }}>
          <circle cx="306" cy="150" r="64" fill="url(#bereshit-moonglow)" />
          <path d={crescent(306, 150, 28, 0.42)} fill={C.sand} />
        </motion.g>
      </Layer>
      <Layer depth={0.12} tilt={tilt}>
        {/* the greater light */}
        <motion.g initial={still ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2.4, ease: 'easeOut' }}>
          <circle cx="104" cy="214" r="92" fill="url(#glow)" />
          <motion.g style={at(104, 214)} animate={still ? undefined : { rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d="M104 154 L98 170 L110 170 Z" fill="#fff7e6" opacity="0.8" transform={`rotate(${i * 30} 104 214)`} />
            ))}
          </motion.g>
          <circle cx="104" cy="214" r="38" fill="#f1cf7a" />
          <circle cx="98" cy="208" r="28" fill="#ffe2b8" opacity="0.7" />
        </motion.g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        {/* the sea, gathered into one place */}
        <rect x="-40" y="352" width="480" height="140" fill="url(#bereshit-sea)" />
        <path d="M-40 356 C40 342 90 336 140 352 L140 360 L-40 360 Z" fill="#e6cfa8" />
        {[[80, 372, 60], [150, 384, 44], [250, 368, 70], [320, 392, 50], [60, 404, 40], [200, 402, 56]].map(([x, y, w], i) => (
          <motion.rect
            key={i} x={x} y={y} width={w} height="2.4" rx="1.2" fill="#fff7e6"
            initial={false}
            animate={still ? { opacity: 0.7 } : { opacity: [0.3, 0.9, 0.3], x: [x, x + 8, x] }}
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 432 C30 408 110 404 180 420 C240 434 300 442 460 432 L460 560 L-40 560 Z" fill={C.land} />
        <FruitTree x={196} base={428} s={0.62} seed={7} />
        <SeedTuft x={60} base={424} s={0.8} />
        <SeedTuft x={130} base={418} s={0.7} flip />
        <SeedTuft x={250} base={436} s={0.7} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 492 C80 470 200 474 280 482 C340 488 400 480 460 476 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <FruitTree x={300} base={490} s={1.05} seed={3} />
        <FruitTree x={82} base={486} s={0.86} seed={11} />
        <SeedTuft x={170} base={488} s={1.1} />
        <SeedTuft x={214} base={486} s={0.9} flip />
        <SeedTuft x={366} base={484} s={0.9} />
      </Layer>
    </>
  )
}

// ——— Noach: the ark come to rest on the mountains, the bow in the cloud, the dove ————————

function Dove({ still }: { still: boolean }) {
  return (
    <g>
      {/* far wing */}
      <motion.path
        d="M2 -4 C8 -26 24 -34 36 -34 C26 -22 18 -10 12 -2 Z" fill="#e2d2b2"
        style={at(6, -3)} animate={still ? undefined : { scaleY: [1, -0.5, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
      />
      <path d="M16 -2 L38 -10 L40 6 L16 4 Z" fill="#e2d2b2" />
      <path d="M-22 2 C-12 -9 12 -9 22 0 C14 9 -8 11 -22 2 Z" fill="#f6f0e2" />
      <circle cx="-21" cy="-3" r="7.5" fill="#f6f0e2" />
      <path d="M-28 -4 L-35 -1 L-28 0 Z" fill="#e59b62" />
      <circle cx="-23" cy="-5" r="1.3" fill={C.ink} />
      {/* the olive leaf, freshly plucked */}
      <path d="M-33 -1 L-38 3" stroke="#5f7d45" strokeWidth="1.4" />
      <ellipse cx="-44" cy="6" rx="8" ry="3" fill="#7d9a5a" transform="rotate(28 -44 6)" />
      <path d="M-50 2 L-38 9" stroke="#5f7d45" strokeWidth="0.8" />
      {/* near wing */}
      <motion.path
        d="M-8 -3 C-4 -30 14 -40 30 -40 C18 -26 10 -12 6 -1 Z" fill="#f6f0e2"
        style={at(-1, -2)} animate={still ? undefined : { scaleY: [1, -0.55, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  )
}

export function Noach() {
  const { tilt, still } = useArtMotion()
  const bow = ['#e8573a', C.warm, '#f1cf7a', '#a9bf7e', '#8fb3d4', '#6a3d9a']
  // Ark side: 300 × 30 cubits → 300 × 30 px here, 10 : 1.
  const ax = 50, ay = 352, aw = 300, ah = 30
  return (
    <>
      <Sky id="noach-sky" stops={[[0, C.blueSoft], [0.7, C.sand]]} />
      <Layer depth={0.08} tilt={tilt}>
        {/* the bow in the cloud */}
        {bow.map((c, i) => {
          const r = 190 - i * 9
          return (
            <motion.path
              key={c} d={`M${200 - r} 380 A${r} ${r} 0 0 1 ${200 + r} 380`} fill="none" stroke={c} strokeWidth="9.5" opacity="0.8"
              initial={still ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.6, delay: 0.4 + i * 0.08, ease: 'easeInOut' }}
            />
          )
        })}
        <g fill={C.sand}>
          <ellipse cx="34" cy="250" rx="62" ry="24" />
          <ellipse cx="74" cy="232" rx="40" ry="24" />
          <ellipse cx="370" cy="236" rx="70" ry="26" />
          <ellipse cx="326" cy="220" rx="38" ry="22" />
        </g>
        <g fill="#f6f0e2" opacity="0.9">
          <ellipse cx="-4" cy="258" rx="44" ry="16" />
          <ellipse cx="400" cy="246" rx="44" ry="16" />
        </g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 400 L10 340 L50 300 L84 324 L130 258 L176 312 L222 262 L266 318 L318 272 L362 330 L460 372 L460 560 L-40 560 Z" fill="#e6cfa8" />
        <path d="M130 258 L176 312 L160 400 L118 400 Z M222 262 L266 318 L250 400 L214 400 Z M318 272 L362 330 L346 400 L310 400 Z" fill="#d9c3a5" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        {/* the mountain the ark came to rest on */}
        <path d="M-40 470 C0 440 30 408 70 386 C110 378 290 378 330 386 C370 404 410 440 460 460 L460 560 L-40 560 Z" fill={C.land} />
        <path d="M330 386 C370 404 410 440 460 460 L460 560 L300 560 C320 500 330 440 330 386 Z" fill="#d9ccb1" />
        <path d="M70 386 C60 420 50 470 30 560 L-40 560 L-40 470 C0 440 30 408 70 386 Z" fill="#f1e6d0" />
        <path d="M330 386 C370 404 410 440 460 460 L460 560 L300 560 C320 500 330 440 330 386 Z" fill="#e2d2b2" />
        <path d="M70 386 C40 420 10 450 -40 470 L-40 560 L10 560 C20 480 50 420 70 386 Z" fill="#e6cfa8" />
        {/* the ark: a long box, a daylight opening a cubit below the top, the door in its side */}
        <ellipse cx={W / 2} cy={ay + ah + 2} rx={aw / 2 + 8} ry="7" fill={C.ink} opacity="0.12" />
        <rect x={ax} y={ay} width={aw} height={ah} fill="#c9773f" />
        <rect x={ax} y={ay + ah * 0.55} width={aw} height={ah * 0.45} fill="#b0612f" />
        <rect x={ax} y={ay} width={aw} height="3" fill="#8a5a3c" />
        <rect x={ax + 10} y={ay + 5} width={aw - 20} height="4.5" fill="#3b2a24" />
        {Array.from({ length: 13 }, (_, i) => <rect key={i} x={ax + 10 + i * ((aw - 22) / 12)} y={ay + 5} width="2" height="4.5" fill="#c9773f" />)}
        {[0.42, 0.72].map((f) => <rect key={f} x={ax} y={ay + ah * f} width={aw} height="1" fill="#8a5a3c" opacity="0.6" />)}
        <rect x={ax + 196} y={ay + 12} width="16" height="18" fill="#3b2a24" />
        <rect x={ax + aw - 18} y={ay} width="18" height={ah} fill="#8a5a3c" opacity="0.35" />
      </Layer>
      <Layer depth={0.8} tilt={tilt}>
        <motion.g
          initial={false}
          animate={still ? undefined : { x: [0, -16, 0], y: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect width={W} height={H} fill="none" />
          <g transform="translate(270 262) scale(1.35)"><Dove still={still} /></g>
        </motion.g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 520 C60 494 160 492 240 502 C320 512 390 500 460 496 L460 560 L-40 560 Z" fill="#d9ccb1" />
      </Layer>
    </>
  )
}

// ——— Vayera: on the mountain, the altar with its wood, the ram caught by its horns ———————

function Ram() {
  return (
    <g>
      {/* legs */}
      {[[-28, 0], [-14, 2], [18, 0], [30, 2]].map(([x, d]) => <rect key={x} x={x - 3.5} y={12} width="7" height={32 - d} rx="3" fill="#3b2a24" />)}
      {/* fleece */}
      <path d="M-40 0 C-44 -14 -34 -26 -22 -24 C-18 -34 -4 -34 2 -28 C8 -36 24 -34 28 -26 C40 -30 50 -18 46 -6 C54 4 46 18 34 18 C28 26 14 24 8 20 C0 26 -16 26 -20 20 C-32 26 -46 16 -40 0 Z" fill="#f6f0e2" />
      <path d="M-40 6 C-36 18 -24 22 -20 18 C-12 24 0 24 8 18 C16 24 30 24 34 16 C44 18 50 8 48 2 C40 12 10 14 -40 6 Z" fill="#e2d2b2" />
      <path d="M46 -8 C56 -8 58 4 50 6 Z" fill="#e2d2b2" />
      {/* neck and head, stretched toward the thicket */}
      <path d="M-30 -20 C-40 -30 -48 -34 -56 -34 C-66 -34 -76 -26 -80 -14 C-82 -8 -78 -4 -72 -6 C-64 -8 -56 -10 -48 -8 C-40 -6 -34 -4 -30 0 Z" fill="#3b2a24" />
      <ellipse cx="-44" cy="-36" rx="7" ry="3.2" fill="#3b2a24" transform="rotate(-30 -44 -36)" />
      <circle cx="-62" cy="-24" r="2" fill="#f6f0e2" />
      {/* the great curled horn */}
      <path d="M-50 -32 C-44 -52 -18 -54 -14 -34 C-11 -18 -30 -12 -36 -24 C-39 -31 -30 -36 -26 -30" fill="none" stroke="#cfae98" strokeWidth="8" strokeLinecap="round" />
      <path d="M-50 -32 C-44 -52 -18 -54 -14 -34" fill="none" stroke="#e6cfa8" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

export function Vayera() {
  const { tilt, still } = useArtMotion()
  const tug = { duration: 3.6, repeat: Infinity, ease: 'easeInOut' as const }
  return (
    <>
      <Sky id="vayera-sky" stops={[[0, '#f4b27c'], [0.72, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="300" cy="190" r="70" fill="url(#glow)" opacity="0.6" />
        <circle cx="300" cy="190" r="30" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 400 L10 370 L60 382 L110 352 L160 376 L220 356 L280 380 L340 360 L460 392 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* the mountain top: the land drops away on every side */}
        <path d="M-40 500 C10 440 60 400 130 386 C180 378 240 378 290 390 C350 406 410 450 460 490 L460 560 L-40 560 Z" fill={C.land} />
        <path d="M290 390 C350 406 410 450 460 490 L460 560 L340 560 C340 490 322 430 290 390 Z" fill="#e2d2b2" />
        <path d="M-40 500 C10 440 60 400 110 390 C70 430 40 480 30 560 L-40 560 Z" fill="#e2d2b2" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 530 C60 490 180 482 260 488 C330 494 400 488 460 482 L460 560 L-40 560 Z" fill="#d9ccb1" />
        {/* the altar, the wood laid in order on it (not burning) */}
        <g transform="translate(110 492) scale(1.15)">
          <ellipse cx="0" cy="2" rx="66" ry="6" fill={C.ink} opacity="0.1" />
          <rect x="-58" y="-22" width="40" height="22" rx="5" fill={C.land} />
          <rect x="-18" y="-21" width="36" height="21" rx="5" fill="#e6cfa8" />
          <rect x="18" y="-22" width="40" height="22" rx="5" fill="#d9ccb1" />
          <rect x="-52" y="-42" width="34" height="21" rx="5" fill="#e6cfa8" />
          <rect x="-18" y="-43" width="38" height="22" rx="5" fill={C.land} />
          <rect x="20" y="-42" width="32" height="21" rx="5" fill="#d9ccb1" />
          <rect x="-44" y="-62" width="44" height="21" rx="5" fill={C.land} />
          <rect x="0" y="-62" width="44" height="21" rx="5" fill="#e6cfa8" />
          {/* wood */}
          <rect x="-52" y="-72" width="104" height="11" rx="5.5" fill="#b0612f" />
          <rect x="-46" y="-82" width="92" height="11" rx="5.5" fill="#c9773f" />
          <rect x="-38" y="-92" width="76" height="11" rx="5.5" fill="#b0612f" />
          {[[-52, -66.5], [-46, -76.5], [-38, -86.5]].map(([x, y]) => <circle key={y} cx={x + 5.5} cy={y} r="4" fill="#e59b62" />)}
        </g>
        {/* the thicket: a bush rising behind the ram, above and behind its head, so the face stays clear */}
        <motion.g style={at(290, 420)} animate={still ? undefined : { rotate: [0, -2.2, 0, -1.4, 0] }} transition={tug}>
          <path d="M236 398 C222 380 234 352 258 352 C266 334 296 330 310 344 C330 340 346 360 338 378 C350 394 338 416 318 414 C300 426 256 424 236 398 Z" fill="#5f7d45" />
          <path d="M246 372 C250 352 270 344 284 352 C296 340 318 346 318 362 C302 358 272 362 246 372 Z" fill="#7d9a5a" />
          {/* a branch passing behind the horn, so the thicket weaves over and under it */}
          <path d="M232 374 C256 380 282 390 314 398" stroke="#8a5a3c" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </motion.g>
        {/* the ram, pulling back */}
        <motion.g animate={still ? undefined : { x: [0, 5, 0, 3, 0] }} transition={tug}>
          <g transform="translate(318 452) scale(1.45)"><Ram /></g>
        </motion.g>
        {/* branches wound through the curled horn only (Genesis 22:13, "caught in the thicket by its horns") */}
        <motion.g style={at(290, 420)} animate={still ? undefined : { rotate: [0, -2.2, 0, -1.4, 0] }} transition={tug}>
          <path d="M308 346 C298 362 286 378 274 392 M338 384 C320 396 300 408 284 420 M290 340 C288 360 285 380 280 398" stroke="#8a5a3c" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          {[[308, 346], [338, 384], [290, 340], [232, 374]].map(([x, y]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx="4" ry="2.6" fill="#a9bf7e" transform={`rotate(-30 ${x} ${y})`} />)}
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Chayei Sarah: ten camels kneeling by the well at evening, a jar by the spring ———————

function KneelingCamel({ x, y, s, delay, near }: { x: number; y: number; s: number; delay: number; near?: boolean }) {
  const { still } = useArtMotion()
  const fill = near ? '#b77b4d' : '#cfae98'
  const shade = near ? '#8a6a58' : '#b77b4d'
  // Drawn facing right, then mirrored so every camel faces the well.
  return (
    <g transform={`translate(${x} ${y}) scale(${-s} ${s})`}>
      <ellipse cx="-2" cy="0" rx="42" ry="4" fill={C.ink} opacity="0.12" />
      <path d="M-40 -14 C-46 -10 -46 -4 -43 -1" fill="none" stroke={shade} strokeWidth="3" strokeLinecap="round" />
      <path d="M-38 -4 C-42 -18 -32 -28 -20 -30 C-14 -48 6 -50 12 -32 C18 -28 26 -24 28 -14 C30 -6 28 0 24 0 L-34 0 C-38 0 -38 -2 -38 -4 Z" fill={fill} />
      <path d="M-36 0 C-38 -9 -28 -12 -18 -8 L-12 0 Z" fill={shade} />
      <path d="M6 0 C6 -8 18 -11 28 -5 L30 0 Z" fill={shade} />
      <motion.g
        style={at(20, -24)}
        animate={still ? undefined : { rotate: [0, 0, 30, 30, 0] }}
        transition={{ duration: 6, times: [0, 0.35, 0.5, 0.75, 0.9], repeat: Infinity, delay, ease: 'easeInOut' }}
      >
        <path d="M12 -28 C24 -30 30 -40 34 -50 C36 -57 44 -61 52 -59 L63 -55 C66 -52 64 -47 59 -47 L50 -47 C46 -42 40 -28 30 -12 Z" fill={fill} />
        <path d="M41 -59 L42 -66 L46 -60 Z" fill={shade} />
        <circle cx="50" cy="-54" r="1.6" fill={C.ink} />
      </motion.g>
    </g>
  )
}

export function ChayeiSarah() {
  const { tilt, still } = useArtMotion()
  // Four far, three middle, three near: ten.
  const camels: [number, number, number, boolean][] = [
    [176, 408, 0.44, false], [224, 408, 0.44, false], [272, 408, 0.44, false], [320, 408, 0.44, false],
    [200, 446, 0.58, false], [262, 446, 0.58, false], [324, 446, 0.58, false],
    [196, 500, 0.74, true], [272, 500, 0.74, true], [348, 500, 0.74, true],
  ]
  return (
    <>
      <Sky id="chayei-sarah-sky" stops={[[0, C.blueSoft], [0.45, '#f4b27c'], [0.72, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        <motion.circle cx="296" cy="332" r="110" fill="url(#glow)" animate={still ? undefined : { opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="296" cy="336" r="40" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 380 C60 360 140 366 220 372 C300 378 380 364 460 368 L460 560 L-40 560 Z" fill="#e6cfa8" />
        {/* the city, kept plain */}
        <g fill="#d9ccb1">
          <rect x="238" y="352" width="120" height="22" />
          <rect x="250" y="336" width="30" height="20" />
          <rect x="286" y="328" width="36" height="28" />
          <rect x="328" y="340" width="24" height="16" />
        </g>
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 420 C80 400 220 398 460 410 L460 560 L-40 560 Z" fill={C.land} />
        {camels.slice(0, 7).map(([x, y, sc], i) => <KneelingCamel key={i} x={x} y={y} s={sc} delay={i * 0.55} />)}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 486 C80 472 240 474 460 482 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* the well, and the jar set down by it */}
        <ellipse cx="88" cy="504" rx="58" ry="7" fill={C.ink} opacity="0.12" />
        <ellipse cx="88" cy="462" rx="48" ry="13" fill="#d9ccb1" />
        <ellipse cx="88" cy="464" rx="37" ry="8" fill="#5d86b8" />
        <motion.ellipse cx="88" cy="464" rx="20" ry="3.5" fill="#8fb3d4" style={at(88, 464)} animate={still ? undefined : { scale: [0.4, 1.4], opacity: [0.9, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }} />
        <path d="M40 462 L40 494 C40 506 136 506 136 494 L136 462 C136 478 40 478 40 462 Z" fill={C.land} />
        <path d="M112 474 C124 471 136 468 136 462 L136 494 C136 500 126 503 112 504 Z" fill="#e6cfa8" />
        <path d="M40 484 C60 492 116 492 136 484" fill="none" stroke="#d9ccb1" strokeWidth="2" />
        {[62, 88, 114].map((x) => <line key={x} x1={x} y1={x === 88 ? 475 : 473} x2={x} y2={488} stroke="#d9ccb1" strokeWidth="2" />)}
        {[50, 76, 100, 126].map((x) => <line key={x} x1={x} y1={489} x2={x} y2={501} stroke="#d9ccb1" strokeWidth="2" />)}
        <g transform="translate(146 506)">
          <path d="M-9 0 C-18 -8 -18 -26 -9 -34 L-7 -42 L7 -42 L9 -34 C18 -26 18 -8 9 0 Z" fill="#c9773f" />
          <path d="M4 -34 C14 -26 14 -8 7 0 L9 0 C18 -8 18 -26 9 -34 Z" fill="#b0612f" />
          <rect x="-9" y="-45" width="18" height="4" rx="2" fill="#b0612f" />
        </g>
        {camels.slice(7).map(([x, y, sc, near], i) => <KneelingCamel key={i} x={x} y={y} s={sc} near={near} delay={3.9 + i * 0.55} />)}
      </Layer>
    </>
  )
}

// ——— Toldot: the red lentil stew and bread; the quiver and bow beside them ———————

export function Toldot() {
  const { tilt, still } = useArtMotion()
  const lentils = useMemo(() => {
    const r = rng(2530)
    return Array.from({ length: 26 }, () => {
      const a = r() * Math.PI * 2
      const d = Math.sqrt(r())
      return { x: 180 + Math.cos(a) * d * 54, y: 452 + Math.sin(a) * d * 9 }
    })
  }, [])
  return (
    <>
      <Sky id="toldot-sky" stops={[[0, '#f4b27c'], [0.75, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="96" cy="200" r="28" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 390 C40 370 100 360 170 372 C240 384 300 356 360 360 C400 362 430 372 460 378 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        {/* the open field */}
        <path d="M-40 430 C80 412 240 414 460 424 L460 560 L-40 560 Z" fill="#a9bf7e" />
        <path d="M-40 446 C100 432 260 434 460 442 L460 560 L-40 560 Z" fill="#7d9a5a" opacity="0.5" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 470 C80 460 280 460 460 468 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* steam off the stew */}
        {[0, 1, 2].map((i) => {
          const x = 160 + i * 20
          return still ? (
            <path key={i} d={`M${x} 440 c-8 -14 10 -24 2 -40`} fill="none" stroke="#fff7e6" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
          ) : (
            <motion.path
              key={i} d={`M${x} 440 c-8 -14 10 -24 2 -40 c-6 -12 8 -20 2 -34`} fill="none" stroke="#fff7e6" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.8, 0], strokeWidth: [5, 8, 12], y: [0, -14, -30] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: 'easeOut', times: [0, 0.5, 1] }}
            />
          )
        })}
        {/* the bowl of red lentil stew */}
        <ellipse cx="180" cy="506" rx="74" ry="7" fill={C.ink} opacity="0.14" />
        <path d="M108 452 C112 490 146 506 180 506 C214 506 248 490 252 452 Z" fill="#c9773f" />
        <path d="M214 504 C236 496 250 478 252 452 L234 452 C232 478 224 494 206 505 Z" fill="#b0612f" />
        <ellipse cx="180" cy="452" rx="72" ry="15" fill="#e59b62" />
        <ellipse cx="180" cy="453" rx="63" ry="11" fill="#b3263a" />
        <ellipse cx="170" cy="451" rx="40" ry="6" fill="#e8573a" opacity="0.7" />
        {lentils.map((l, i) => <circle key={i} cx={l.x} cy={l.y} r="1.8" fill="#e59b62" opacity="0.8" />)}
        {/* bread */}
        <g transform="translate(78 500)">
          <ellipse cx="0" cy="5" rx="50" ry="7" fill={C.ink} opacity="0.12" />
          <ellipse cx="0" cy="-2" rx="48" ry="14" fill="#c9773f" />
          <ellipse cx="0" cy="-7" rx="45" ry="12" fill="#e2b04a" />
          <ellipse cx="-6" cy="-9" rx="30" ry="7" fill="#f1cf7a" />
          {[[-20, -8], [4, -12], [18, -5], [-6, -3], [26, -10]].map(([x, y]) => <ellipse key={`${x}${y}`} cx={x} cy={y} rx="3" ry="1.6" fill="#b0612f" opacity="0.7" />)}
        </g>
        {/* the quiver, and the bow leaning on it */}
        <g transform="translate(300 506) rotate(-8)">
          <ellipse cx="0" cy="2" rx="24" ry="5" fill={C.ink} opacity="0.14" />
          {[-8, 0, 8].map((dx, i) => (
            <g key={dx}>
              <rect x={dx - 1.3} y={-162 + i * 6} width="2.6" height="50" fill="#8a5a3c" />
              <path d={`M${dx} ${-168 + i * 6} L${dx - 5} ${-156 + i * 6} L${dx - 5} ${-142 + i * 6} L${dx} ${-148 + i * 6} L${dx + 5} ${-142 + i * 6} L${dx + 5} ${-156 + i * 6} Z`} fill={i === 1 ? '#b3263a' : '#f6f0e2'} />
            </g>
          ))}
          <rect x="-17" y="-122" width="34" height="124" rx="9" fill="#8a5a3c" />
          <rect x="6" y="-122" width="11" height="124" rx="5" fill="#3b2a24" opacity="0.25" />
          <rect x="-17" y="-112" width="34" height="9" fill="#b0612f" />
          <rect x="-17" y="-22" width="34" height="9" fill="#b0612f" />
        </g>
        <g>
          <line x1="306" y1="346" x2="350" y2="506" stroke="#f6f0e2" strokeWidth="1.4" />
          <path d="M304 344 C360 380 372 452 352 508 L346 506 C364 454 352 386 300 350 Z" fill="#b0612f" />
          <path d="M346 414 L360 418 L360 436 L346 434 Z" fill="#8a5a3c" />
        </g>
      </Layer>
    </>
  )
}

// ——— Vayetze: a stairway set on the earth, its top reaching the sky ———————————————

export function Vayetze() {
  const { tilt, still } = useArtMotion()
  const stars = useMemo(() => {
    const r = rng(2811)
    return Array.from({ length: 120 }, () => ({ x: r() * W, y: r() * 360, s: r() * 1.2 + 0.4, t: r() }))
  }, [])
  // The stair: wide at its foot, narrowing as it climbs out of sight.
  const foot = { x: 196, y: 508, hw: 34 }
  const top = { x: 246, y: -30, hw: 3 }
  const pt = (t: number) => {
    const e = 1 - Math.pow(1 - t, 1.9)
    return { x: foot.x + (top.x - foot.x) * e, y: foot.y + (top.y - foot.y) * e, hw: foot.hw + (top.hw - foot.hw) * e }
  }
  const steps = Array.from({ length: 22 }, (_, i) => pt(i / 22))
  const lane = (t: number, side: number) => { const p = pt(t); return { x: p.x + side * p.hw * 0.42, y: p.y - 8 * (1 - t), r: 1 - t * 0.6 } }
  const samples = Array.from({ length: 9 }, (_, i) => i / 8)
  const lights = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({ up: i % 2 === 0, delay: i * 0.8 }))
  return (
    <>
      <defs>
        <linearGradient id="vayetze-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.12" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.6" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.9" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="vayetze-mask" maskUnits="userSpaceOnUse" x="0" y="-40" width={W} height={H + 40}>
          <rect x="0" y="-40" width={W} height={H + 40} fill="url(#vayetze-fade)" />
        </mask>
      </defs>
      <Sky id="vayetze-sky" stops={[[0, '#0e1554'], [0.62, C.blue], [0.8, '#6f7be6']]} />
      <Layer depth={0.1} tilt={tilt}>
        {stars.map((s, i) => (
          <motion.circle
            key={i} cx={s.x} cy={s.y} r={s.s} fill={C.sand}
            initial={false}
            animate={still ? { opacity: 0.8 } : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3 + s.t * 3, delay: s.t * 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <ellipse cx="200" cy="-20" rx="120" ry="90" fill="url(#glow)" opacity="0.35" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <ellipse cx="80" cy="392" rx="160" ry="26" fill={C.warm} opacity="0.35" filter="url(#soft)" />
        <path d="M-40 404 C40 376 110 370 170 386 C240 404 300 370 360 368 C400 367 430 380 460 388 L460 560 L-40 560 Z" fill="#4a5ad6" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 448 C40 422 120 420 190 436 C260 452 320 426 460 430 L460 560 L-40 560 Z" fill="#2b39b8" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C60 482 160 492 240 500 C320 508 390 494 460 490 L460 560 L-40 560 Z" fill="#141c6e" />
        <ellipse cx="190" cy="496" rx="110" ry="40" fill="url(#glow)" opacity="0.55" />
        {/* the stairway */}
        <g mask="url(#vayetze-mask)">
          <path d={`M${foot.x - foot.hw} ${foot.y} L${top.x - top.hw} ${top.y} L${top.x + top.hw} ${top.y} L${foot.x + foot.hw} ${foot.y} Z`} fill="#e6cfa8" />
          <path d={`M${foot.x + foot.hw * 0.62} ${foot.y} L${top.x + top.hw * 0.62} ${top.y} L${top.x + top.hw} ${top.y} L${foot.x + foot.hw} ${foot.y} Z`} fill="#d9ccb1" />
          {steps.map((p, i) => (
            <rect key={i} x={p.x - p.hw} y={p.y - Math.max(1, 5 * (1 - i / 22))} width={p.hw * 2} height={Math.max(0.8, 4 * (1 - i / 22))} fill="#b77b4d" opacity="0.55" />
          ))}
          <path d={`M${foot.x - foot.hw - 5} ${foot.y} L${top.x - top.hw - 1} ${top.y} L${top.x - top.hw} ${top.y} L${foot.x - foot.hw + 3} ${foot.y} Z`} fill={C.sand} />
          <path d={`M${foot.x + foot.hw - 3} ${foot.y} L${top.x + top.hw} ${top.y} L${top.x + top.hw + 1} ${top.y} L${foot.x + foot.hw + 5} ${foot.y} Z`} fill="#cfae98" />
        </g>
        {/* lights going up and coming down on it */}
        {lights.map((l, i) => {
          const pts = samples.map((t) => lane(l.up ? t : 1 - t, l.up ? -1 : 1))
          if (still) {
            const p = lane(0.18 + i * 0.12, l.up ? -1 : 1)
            return (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={16 * p.r} fill="url(#glow)" />
                <circle cx={p.x} cy={p.y} r={4.6 * p.r} fill="#fff7e6" />
              </g>
            )
          }
          return (
            <motion.g
              key={i} style={at(0, 0)}
              initial={{ opacity: 0 }}
              animate={{ x: pts.map((p) => p.x), y: pts.map((p) => p.y), scale: pts.map((p) => p.r), opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0] }}
              transition={{ duration: 6.4, delay: l.delay, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="0" cy="0" r="16" fill="url(#glow)" />
              <circle cx="0" cy="0" r="4.6" fill="#fff7e6" />
            </motion.g>
          )
        })}
        {/* the stone Jacob put under his head (28:11), on the ground apart from the stairway */}
        <g transform="translate(-50 0)">
          <path d="M112 508 C106 496 116 484 134 484 C150 484 160 492 158 504 C156 510 118 512 112 508 Z" fill={C.land} />
          <path d="M140 485 C152 487 160 494 158 504 C156 508 146 510 138 510 C146 500 146 492 140 485 Z" fill="#d9ccb1" />
        </g>
      </Layer>
    </>
  )
}

// ——— Vayishlach: the ford of the Jabbok as the sun rises ———————————————————————

export function Vayishlach() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="vayishlach-sky" stops={[[0, C.blueSoft], [0.5, '#f4b27c'], [0.7, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        {/* the sun coming up */}
        <motion.g initial={still ? false : { y: 46 }} animate={{ y: 0 }} transition={{ duration: 7, ease: 'easeOut' }}>
          <motion.g style={at(210, 356)} animate={still ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            {Array.from({ length: 11 }, (_, i) => (
              <path key={i} d="M210 356 L204 250 L216 250 Z" fill="#fff7e6" opacity="0.4" transform={`rotate(${-75 + i * 15} 210 356)`} />
            ))}
          </motion.g>
          <circle cx="210" cy="356" r="80" fill="url(#glow)" />
          <circle cx="210" cy="356" r="36" fill="#f1cf7a" />
          <circle cx="205" cy="351" r="26" fill="#ffe2b8" opacity="0.7" />
        </motion.g>
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 380 L20 352 L70 364 L120 340 L166 366 L196 372 L226 370 L262 346 L310 360 L360 338 L460 370 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 420 C40 404 120 396 190 392 L230 392 C300 398 380 410 460 420 L460 560 L-40 560 Z" fill={C.land} />
        {/* the Jabbok, running across the valley */}
        <path d="M-40 436 C60 424 140 442 220 448 C300 454 380 440 460 446 L460 500 C380 492 300 508 220 502 C140 496 60 480 -40 490 Z" fill="#8fb3d4" />
        <path d="M-40 446 C60 436 140 452 220 458 C300 464 380 452 460 458 L460 488 C380 482 300 496 220 490 C140 484 60 470 -40 478 Z" fill={C.water} />
        {/* the ford: a shallow crossing, the stream bed showing through */}
        <path d="M168 452 C186 448 232 450 250 456 L262 498 C240 504 190 504 162 496 Z" fill="#dfe8ee" opacity="0.85" />
        {[[172, 462, 70], [168, 474, 84], [164, 486, 92]].map(([x, y, w], i) => (
          <motion.path
            key={i} d={`M${x} ${y} q${w / 12} -4 ${w / 6} 0 t${w / 6} 0 t${w / 6} 0 t${w / 6} 0 t${w / 6} 0 t${w / 6} 0`} fill="none" stroke="#fff7e6" strokeWidth="2" strokeLinecap="round"
            initial={false}
            animate={still ? { opacity: 0.7 } : { opacity: [0.25, 0.85, 0.25], x: [0, 4, 0] }}
            transition={{ duration: 3 + i * 0.6, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* the sun on the water */}
        {[[60, 458, 16], [120, 466, 12], [214, 470, 22], [300, 472, 14], [370, 466, 18]].map(([x, y, w], i) => (
          <motion.rect
            key={i} x={x - w / 2} y={y} width={w} height="2.6" rx="1.3" fill="#fff7e6"
            initial={false}
            animate={still ? { opacity: 0.8 } : { opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.6 + i * 0.4, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C60 490 140 506 220 512 C300 518 380 504 460 508 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {[[40, 506], [84, 512], [320, 518], [362, 510]].map(([x, y]) => (
          <path key={x} d={`M${x} ${y} q-4 -18 -12 -24 q10 6 13 20 q1 -18 6 -28 q-2 14 0 28 q4 -12 12 -18 q-8 8 -10 22 Z`} fill="#7d9a5a" />
        ))}
      </Layer>
    </>
  )
}

// ——— Vayeshev: one sheaf standing upright; sun, moon and eleven stars bowing to it ———————

export function Vayeshev() {
  const { tilt, still } = useArtMotion()
  // Sun, eleven stars, moon — spread along one arc over the sheaf.
  const sheaf = { x: 200, y: 390 }
  const bodies = Array.from({ length: 13 }, (_, i) => {
    const a = ((198 + (144 * i) / 12) * Math.PI) / 180
    const x = 200 + 160 * Math.cos(a)
    const y = 468 + 236 * Math.sin(a)
    const dx = sheaf.x - x
    const dy = sheaf.y - y
    const d = Math.hypot(dx, dy)
    const lean = ((Math.atan2(dy, dx) * 180) / Math.PI - 90) * 0.55
    return { x, y, ux: dx / d, uy: dy / d, lean }
  })
  const bowT = (i: number) => ({ duration: 5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' as const, times: [0, 0.3, 0.55, 1] })
  const heads = Array.from({ length: 13 }, (_, i) => -36 + (72 * i) / 12)
  return (
    <>
      <Sky id="vayeshev-sky" stops={[[0, '#0e1554'], [0.62, C.blue], [0.82, '#6f7be6']]} />
      <Layer depth={0.1} tilt={tilt}>
        {bodies.map((b, i) => {
          const inner =
            i === 0 ? (
              <g>
                <circle cx={b.x} cy={b.y} r="56" fill="url(#glow)" />
                {Array.from({ length: 10 }, (_, k) => (
                  <path key={k} d={`M${b.x} ${b.y - 38} L${b.x - 5} ${b.y - 28} L${b.x + 5} ${b.y - 28} Z`} fill="#f1cf7a" transform={`rotate(${k * 36} ${b.x} ${b.y})`} />
                ))}
                <circle cx={b.x} cy={b.y} r="24" fill="#f1cf7a" />
                <circle cx={b.x - 4} cy={b.y - 4} r="16" fill="#ffe2b8" opacity="0.7" />
              </g>
            ) : i === 12 ? (
              <g>
                <circle cx={b.x} cy={b.y} r="40" fill="url(#glow)" opacity="0.5" />
                <path d={crescent(b.x, b.y, 24, 0.4)} fill={C.sand} transform={`rotate(${b.lean} ${b.x} ${b.y})`} />
              </g>
            ) : (
              <g>
                <circle cx={b.x} cy={b.y} r="16" fill="url(#glow)" opacity="0.6" />
                <path d={sparkle(b.x, b.y, 6.5)} fill="#fff7e6" transform={`rotate(${b.lean} ${b.x} ${b.y})`} />
              </g>
            )
          return (
            <motion.g
              key={i} style={at(b.x, b.y)}
              initial={false}
              animate={still ? undefined : { x: [0, 0, b.ux * 12, 0], y: [0, 0, b.uy * 12, 0], rotate: [0, 0, b.lean * 0.5, 0], scale: [1, 1, 0.9, 1] }}
              transition={bowT(i)}
            >
              {inner}
            </motion.g>
          )
        })}
      </Layer>
      <Layer depth={0.35} tilt={tilt}>
        <path d="M-40 452 C40 430 110 424 180 438 C250 452 320 424 460 428 L460 560 L-40 560 Z" fill="#2b39b8" />
      </Layer>
      <Layer depth={0.65} tilt={tilt}>
        <path d="M-40 486 C60 468 160 470 240 478 C320 486 390 472 460 470 L460 560 L-40 560 Z" fill="#1a2280" />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 512 C80 500 280 500 460 506 L460 560 L-40 560 Z" fill="#141c6e" />
        {/* the sheaf that arose and stood upright */}
        <ellipse cx="200" cy="470" rx="120" ry="100" fill="url(#glow)" opacity="0.45" />
        <g transform="translate(200 512) scale(1.12)">
          <ellipse cx="0" cy="0" rx="44" ry="6" fill="#0e1554" opacity="0.5" />
          <path d="M-12 -62 L-44 -118 C-20 -132 20 -132 44 -118 L12 -62 Z" fill="#e2b04a" />
          <path d="M6 -62 L12 -62 L44 -118 C38 -122 30 -125 22 -127 Z" fill="#c9773f" opacity="0.5" />
          {heads.map((a) => (
            <ellipse key={a} cx={Math.sin((a * Math.PI) / 180) * 108} cy={-18 - Math.cos((a * Math.PI) / 180) * 112} rx="5.5" ry="15" fill={a % 12 === 0 ? '#f1cf7a' : '#e2b04a'} transform={`rotate(${a} ${Math.sin((a * Math.PI) / 180) * 108} ${-18 - Math.cos((a * Math.PI) / 180) * 112})`} />
          ))}
          <path d="M-30 0 L-12 -62 L12 -62 L30 0 Z" fill="#e2b04a" />
          <path d="M6 -62 L12 -62 L30 0 L14 0 Z" fill="#c9773f" opacity="0.5" />
          {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map((k) => <line key={k} x1={k * 6.4} y1={0} x2={k * 2.2} y2={-60} stroke="#c9773f" strokeWidth="1.2" />)}
          <rect x="-16" y="-70" width="32" height="11" rx="3" fill="#b0612f" />
        </g>
      </Layer>
    </>
  )
}

// ——— Miketz: seven full ears on one stalk, seven thin ones scorched by the east wind ————————

function FullEar({ x, y, a, s }: { x: number; y: number; a: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      {[0, 1, 2, 3, 4, 5].map((k) => {
        const ky = -10 - k * 7.5
        return (
          <g key={k}>
            <path d={`M-5 ${ky - 3} L-13 ${ky - 18} M5 ${ky - 3} L13 ${ky - 18}`} stroke="#e2b04a" strokeWidth="1" />
            <ellipse cx="-4.4" cy={ky} rx="5.2" ry="6.6" fill="#e2b04a" transform={`rotate(-16 -4.4 ${ky})`} />
            <ellipse cx="4.4" cy={ky} rx="5.2" ry="6.6" fill="#f1cf7a" transform={`rotate(16 4.4 ${ky})`} />
          </g>
        )
      })}
      <ellipse cx="0" cy="-57" rx="4.4" ry="7" fill="#f1cf7a" />
      <path d="M0 -62 L0 -80" stroke="#e2b04a" strokeWidth="1" />
    </g>
  )
}

export function Miketz() {
  const { tilt, still } = useArtMotion()
  // [attach on stalk x, y, ear base x, y, angle]
  const ears: [number, number, number, number, number][] = [
    [201, 302, 201, 302, 0],
    [200, 336, 178, 320, -36],
    [201, 352, 224, 336, 36],
    [199, 374, 170, 362, -54],
    [200, 390, 230, 378, 54],
    [198, 410, 168, 404, -68],
    [199, 426, 232, 420, 68],
  ]
  // The seven thin ears, sprouting close behind: [base x, tip x, tip y]
  const thin: [number, number, number][] = [[104, 76, 372], [130, 106, 350], [156, 132, 366], [246, 262, 380], [268, 290, 356], [292, 316, 372], [316, 342, 392]]
  return (
    <>
      <Sky id="miketz-sky" stops={[[0, '#f4b27c'], [0.72, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="330" cy="170" r="80" fill="url(#glow)" opacity="0.7" />
        <circle cx="330" cy="170" r="26" fill="#fbe6c8" />
        {/* the east wind */}
        {[250, 300, 350, 280].map((y, i) =>
          still ? null : (
            <motion.path
              key={i} d={`M0 ${y} q30 -8 60 0 t60 0 t40 -4`} fill="none" stroke="#fff7e6" strokeWidth="2.4" strokeLinecap="round"
              initial={{ x: 420, opacity: 0 }}
              animate={{ x: [420, -200], opacity: [0, 0.55, 0] }}
              transition={{ duration: 4.2, delay: i * 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          )
        )}
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 420 C60 404 160 400 240 408 C320 416 400 404 460 400 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 470 C80 458 280 456 460 462 L460 560 L-40 560 Z" fill={C.land} />
        {thin.map(([bx, tx, ty], i) => (
          <motion.g
            key={i} style={at(bx, 510)}
            animate={still ? undefined : { rotate: [-2, -8, -3, -7, -2] }}
            transition={{ duration: 4.5, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d={`M${bx} 510 Q${bx + (tx - bx) * 0.2} ${ty + 70} ${tx} ${ty}`} fill="none" stroke="#b0612f" strokeWidth="2.4" strokeLinecap="round" />
            <g transform={`translate(${tx} ${ty}) rotate(-58)`}>
              {[0, 1, 2, 3, 4].map((k) => <ellipse key={k} cx={k % 2 ? 1.4 : -1.4} cy={-5 - k * 6} rx="2.4" ry="4" fill={k % 2 ? '#8a5a3c' : '#b0612f'} />)}
              <path d="M0 -34 L-2 -44" stroke="#8a5a3c" strokeWidth="1" />
            </g>
          </motion.g>
        ))}
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 510 C80 500 280 500 460 506 L460 560 L-40 560 Z" fill="#d9ccb1" />
        {/* one stalk, seven ears, solid and good */}
        <motion.g style={at(196, 516)} animate={still ? undefined : { rotate: [0, -1.2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M194 516 C198 460 196 400 201 302" fill="none" stroke="#7d9a5a" strokeWidth="5" strokeLinecap="round" />
          <path d="M196 480 C180 450 160 440 140 438 C160 450 176 462 194 490 Z" fill="#7d9a5a" />
          <path d="M197 460 C214 430 234 420 256 418 C236 430 218 446 198 474 Z" fill="#5f7d45" />
          {ears.slice(1).map(([sx, sy, ex, ey], i) => <line key={i} x1={sx} y1={sy} x2={ex} y2={ey} stroke="#7d9a5a" strokeWidth="3" strokeLinecap="round" />)}
          {ears.map(([, , ex, ey, a], i) => <FullEar key={i} x={ex} y={ey} a={a} s={0.78} />)}
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Vayigash: the wagons Joseph sent to bring Jacob and the families ————————————————

function Wagon({ still }: { still: boolean }) {
  const wheel = (cx: number) => (
    <motion.g key={cx} animate={still ? undefined : { rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}>
      <circle cx={cx} cy="-19" r="19" fill="#8a5a3c" />
      <circle cx={cx} cy="-19" r="15" fill="#b0612f" />
      <rect x={cx - 15} y="-24" width="30" height="2" fill="#8a5a3c" />
      <rect x={cx - 15} y="-16" width="30" height="2" fill="#8a5a3c" />
      <circle cx={cx} cy="-19" r="4.5" fill="#e59b62" />
    </motion.g>
  )
  return (
    <g>
      <ellipse cx="0" cy="1" rx="74" ry="5" fill={C.ink} opacity="0.13" />
      {/* the pole, resting forward */}
      <path d="M-58 -34 L-104 -20 L-104 -15 L-58 -28 Z" fill="#8a5a3c" />
      {/* sent empty, to carry the children, the wives and Jacob (45:19): no load drawn */}
      <rect x="-62" y="-66" width="3" height="10" fill="#8a5a3c" />
      <rect x="63" y="-66" width="3" height="10" fill="#8a5a3c" />
      {/* the bed */}
      <rect x="-62" y="-58" width="128" height="22" rx="2" fill="#c9773f" />
      <rect x="-62" y="-58" width="128" height="4" fill="#e59b62" />
      <rect x="-62" y="-40" width="128" height="5" fill="#b0612f" />
      {[-30, 2, 34].map((x) => <rect key={x} x={x} y="-54" width="2" height="14" fill="#b0612f" />)}
      {wheel(-36)}
      {wheel(40)}
    </g>
  )
}

export function Vayigash() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="vayigash-sky" stops={[[0, C.blueSoft], [0.72, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="96" cy="180" r="70" fill="url(#glow)" opacity="0.6" />
        <circle cx="96" cy="180" r="28" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 392 C40 374 100 368 160 378 C230 390 290 366 360 364 C400 364 430 372 460 378 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.55} tilt={tilt}>
        <path d="M-40 420 C80 404 240 402 460 414 L460 560 L-40 560 Z" fill={C.land} />
        {/* the road, running off toward the hills */}
        <path d="M44 420 L60 420 C120 440 220 470 360 500 L110 500 C90 470 70 440 44 420 Z" fill="#e6cfa8" />
        <g transform="translate(112 452) scale(0.5)"><Wagon still={still} /></g>
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C80 486 200 488 300 494 C360 498 420 496 460 494 L460 560 L-40 560 Z" fill="#e2d2b2" />
        <path d="M100 496 C200 490 300 494 380 500 C420 520 440 540 450 560 L150 560 C140 540 120 516 100 496 Z" fill="#e6cfa8" />
        {/* dust off the wheels */}
        {still ? null : [0, 1, 2].map((i) => (
          <motion.circle
            key={i} cx="344" cy="502" r="8" fill="#fff7e6"
            initial={{ opacity: 0 }}
            animate={{ x: [0, 36], y: [0, -10], scale: [0.5, 1.6], opacity: [0, 0.45, 0] }}
            transition={{ duration: 3, delay: i, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.g animate={still ? undefined : { y: [0, -1.5, 0, -1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <g transform="translate(244 512) scale(1.28)"><Wagon still={still} /></g>
        </motion.g>
      </Layer>
    </>
  )
}

// ——— Vayechi: the lion couching; the foal tethered to the vine heavy with grapes ———————

function Grapes({ x, y, s }: { x: number; y: number; s: number }) {
  const rows = [4, 3, 3, 2, 1]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -6 L0 2" stroke="#5f7d45" strokeWidth="2" />
      {rows.map((n, r) =>
        Array.from({ length: n }, (_, k) => (
          <g key={`${r}-${k}`}>
            <circle cx={(k - (n - 1) / 2) * 8 + (r % 2 ? 1 : 0)} cy={6 + r * 7} r="4.6" fill="#6a3d9a" />
            {(r + k) % 3 === 0 && <circle cx={(k - (n - 1) / 2) * 8 + (r % 2 ? 1 : 0)} cy={6 + r * 7} r="4.6" fill="#1a2280" opacity="0.35" />}
          </g>
        ))
      )}
      <circle cx="-8" cy="4" r="1.4" fill={C.blueSoft} opacity="0.7" />
      <circle cx="2" cy="11" r="1.4" fill={C.blueSoft} opacity="0.7" />
    </g>
  )
}

function VineLeaf({ x, y, a, s }: { x: number; y: number; a: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d="M0 0 C-10 -2 -16 -10 -12 -16 C-18 -20 -14 -30 -6 -28 C-4 -36 6 -36 8 -28 C16 -30 20 -20 14 -16 C18 -10 12 -2 0 0 Z" fill="#7d9a5a" />
      <path d="M0 0 L0 -26 M0 -12 L-10 -18 M0 -12 L10 -18" stroke="#5f7d45" strokeWidth="1.2" />
    </g>
  )
}

function Foal({ still }: { still: boolean }) {
  return (
    <g>
      <ellipse cx="0" cy="1" rx="34" ry="4" fill={C.ink} opacity="0.13" />
      {[-22, -14, 14, 22].map((x, i) => (
        <g key={x}>
          <rect x={x - 3} y="-32" width="6" height="30" rx="2.5" fill="#8a6a58" />
          {(i === 1 || i === 3) && <rect x={x - 3} y="-32" width="6" height="30" rx="2.5" fill="#3b2a24" opacity="0.3" />}
          <rect x={x - 3} y="-5" width="6" height="5" rx="1.5" fill="#3b2a24" />
        </g>
      ))}
      <path d="M26 -44 C34 -40 36 -30 34 -18" fill="none" stroke="#8a6a58" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M32 -22 L34 -14 L37 -22 Z" fill="#3b2a24" />
      <ellipse cx="2" cy="-40" rx="30" ry="15" fill="#8a6a58" />
      <ellipse cx="2" cy="-32" rx="22" ry="7" fill="#cfae98" />
      {/* head: nibbling toward the vine */}
      <motion.g
        style={at(-20, -46)}
        animate={still ? undefined : { rotate: [0, 0, -14, -14, 0] }}
        transition={{ duration: 5, times: [0, 0.3, 0.45, 0.7, 0.85], repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M-16 -50 L-30 -76 L-42 -70 L-26 -40 Z" fill="#8a6a58" />
        <path d="M-18 -52 L-30 -75 L-26 -77 L-14 -52 Z" fill="#3b2a24" />
        <ellipse cx="-30" cy="-88" rx="3.6" ry="12" fill="#8a6a58" transform="rotate(-14 -30 -88)" />
        <ellipse cx="-38" cy="-86" rx="3.6" ry="12" fill="#8a6a58" transform="rotate(-30 -38 -86)" />
        <ellipse cx="-38" cy="-86" rx="3.6" ry="12" fill="#3b2a24" opacity="0.3" transform="rotate(-30 -38 -86)" />
        <path d="M-28 -80 C-40 -84 -52 -76 -56 -64 C-58 -58 -52 -54 -46 -58 L-30 -66 Z" fill="#8a6a58" />
        <ellipse cx="-52" cy="-61" rx="7" ry="6" fill="#cfae98" />
        <circle cx="-38" cy="-73" r="1.8" fill={C.ink} />
      </motion.g>
    </g>
  )
}

function Lion({ still }: { still: boolean }) {
  return (
    <g>
      <ellipse cx="4" cy="1" rx="70" ry="5" fill={C.ink} opacity="0.13" />
      {/* tail, its tuft flicking */}
      <motion.g style={at(60, -6)} animate={still ? undefined : { rotate: [0, 0, -18, 6, 0] }} transition={{ duration: 4, times: [0, 0.5, 0.65, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M60 -6 C76 -4 84 -10 92 -20" fill="none" stroke="#c9773f" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="94" cy="-23" rx="5" ry="7" fill="#b0612f" transform="rotate(30 94 -23)" />
      </motion.g>
      {/* body, lying down */}
      <path d="M-34 0 C-38 -22 -18 -36 12 -36 C42 -36 64 -26 66 -10 C67 -4 64 0 58 0 Z" fill="#e2b04a" />
      <path d="M22 -2 C18 -24 30 -34 46 -32 C62 -28 68 -14 64 -2 Z" fill="#c9773f" />
      <path d="M40 0 C38 -6 48 -8 56 -4 L58 0 Z" fill="#b0612f" />
      {/* forepaws stretched out */}
      <path d="M-64 0 C-70 -2 -70 -10 -62 -11 L-20 -11 L-20 0 Z" fill="#e2b04a" />
      <path d="M-62 -6 L-20 -6" stroke="#c9773f" strokeWidth="1.4" />
      {/* mane and head, raised */}
      <path d="M-4 -30 C0 -52 -12 -70 -30 -72 C-40 -80 -56 -74 -58 -62 C-68 -54 -64 -36 -54 -30 C-50 -18 -34 -12 -22 -16 C-10 -12 -2 -20 -4 -30 Z" fill="#b0612f" />
      <path d="M-26 -62 C-36 -64 -50 -60 -58 -52 C-66 -48 -68 -40 -62 -36 C-56 -30 -46 -30 -36 -32 C-28 -34 -22 -40 -20 -48 Z" fill="#e2b04a" />
      <ellipse cx="-60" cy="-40" rx="8" ry="6.5" fill="#f1cf7a" />
      <path d="M-68 -44 L-64 -46 L-64 -41 Z" fill="#3b2a24" />
      <circle cx="-44" cy="-51" r="2" fill={C.ink} />
      <path d="M-30 -64 C-30 -72 -22 -74 -20 -66 Z" fill="#c9773f" />
    </g>
  )
}

export function Vayechi() {
  const { tilt, still } = useArtMotion()
  return (
    <>
      <Sky id="vayechi-sky" stops={[[0, C.blueSoft], [0.72, C.sand]]} />
      <Layer depth={0.1} tilt={tilt}>
        <circle cx="300" cy="170" r="70" fill="url(#glow)" opacity="0.6" />
        <circle cx="300" cy="170" r="28" fill="#fbe6c8" />
      </Layer>
      <Layer depth={0.3} tilt={tilt}>
        <path d="M-40 396 C40 372 110 364 180 378 C250 392 310 362 380 362 C410 362 440 372 460 378 L460 560 L-40 560 Z" fill="#e6cfa8" />
      </Layer>
      <Layer depth={0.6} tilt={tilt}>
        <path d="M-40 440 C80 424 240 422 460 432 L460 560 L-40 560 Z" fill={C.land} />
      </Layer>
      <Layer depth={1} tilt={tilt}>
        <path d="M-40 500 C80 486 280 486 460 494 L460 560 L-40 560 Z" fill="#e2d2b2" />
        {/* the vine, heavy with grapes */}
        <motion.g style={at(84, 506)} animate={still ? undefined : { rotate: [0, 0.8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M76 508 C70 470 92 450 80 420 C72 396 88 372 92 350 C120 340 150 332 180 336 C150 338 124 348 98 362 C92 390 90 410 96 430 C104 456 84 476 90 508 Z" fill="#8a5a3c" />
          <path d="M86 360 C70 350 56 346 42 350 C56 352 70 358 84 370 Z" fill="#8a5a3c" />
          <path d="M150 336 C156 330 162 318 158 306" fill="none" stroke="#5f7d45" strokeWidth="1.6" />
          <VineLeaf x={60} y={352} a={-40} s={1.1} />
          <VineLeaf x={104} y={350} a={-10} s={1.2} />
          <VineLeaf x={140} y={338} a={10} s={1.1} />
          <VineLeaf x={176} y={338} a={50} s={1} />
          <VineLeaf x={84} y={404} a={-60} s={0.9} />
          <Grapes x={56} y={354} s={1.1} />
          <Grapes x={118} y={350} s={1.35} />
          <Grapes x={164} y={340} s={1.15} />
          <Grapes x={98} y={410} s={1} />
        </motion.g>
        {/* the tether */}
        <path d="M88 452 C112 470 138 470 164 450" fill="none" stroke="#b77b4d" strokeWidth="2" />
        <g transform="translate(190 506)"><Foal still={still} /></g>
        <g transform="translate(306 512) scale(0.88)"><Lion still={still} /></g>
      </Layer>
    </>
  )
}

export const SCENES: Record<string, () => ReactElement> = {
  bereshit: () => <Bereshit />,
  noach: () => <Noach />,
  'lech-lecha': () => <LechLecha />,
  vayera: () => <Vayera />,
  'chayei-sarah': () => <ChayeiSarah />,
  toldot: () => <Toldot />,
  vayetze: () => <Vayetze />,
  vayishlach: () => <Vayishlach />,
  vayeshev: () => <Vayeshev />,
  miketz: () => <Miketz />,
  vayigash: () => <Vayigash />,
  vayechi: () => <Vayechi />,
}
