import { createContext, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { C } from '../theme'

/**
 * The emblem kit: canvas size, motion plumbing and the pieces several scenes share.
 * Scenes are drawn in a 400×560 box, anchored to the bottom (the top may be cropped
 * on tall screens, the sides on narrow ones), so keep the subject inside x 40–360.
 */
export const W = 400
export const H = 560
export { C }

// ——— Motion plumbing ———————————————————————————————————————————————

/** Pointer position as -1…1, sprung so layers glide rather than snap. */
export function usePointerTilt() {
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

export type Tilt = { x: MotionValue<number>; y: MotionValue<number> } | null

/** One paper layer. `depth` 0 is the far sky, 1 the foreground. */
export function Layer({ depth, tilt, children }: { depth: number; tilt: Tilt; children: ReactNode }) {
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

export const MotionCtx = createContext<{ tilt: Tilt; still: boolean }>({ tilt: null, still: true })
export const useArtMotion = () => useContext(MotionCtx)

// ——— Shared pieces ——————————————————————————————————————————————————

export function rng(seed: number) {
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
export function TentEntrance({ x, y, w }: { x: number; y: number; w: number }) {
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

export function Flame({ cx, base, s, delay }: { cx: number; base: number; s: number; delay: number }) {
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

export function Smoke({ cx, base, delay }: { cx: number; base: number; delay: number }) {
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

