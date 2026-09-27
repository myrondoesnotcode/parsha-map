import type { ReactElement } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { C, FONT } from '../theme'
import { W, H, MotionCtx, usePointerTilt } from './kit'
import { BRIEFS, BRIEF_BY_ID } from './briefs'
import { SCENES as GENESIS } from './scenes-genesis'
import { SCENES as EXODUS } from './scenes-exodus'
import { SCENES as LEVITICUS } from './scenes-leviticus'
import { SCENES as NUMBERS } from './scenes-numbers'
import { SCENES as DEUTERONOMY } from './scenes-deuteronomy'

/**
 * Emblem covers: one papercut scene per parsha, drawn in the Daylight palette as
 * stacked SVG layers. Layers drift at different depths (and follow the pointer),
 * so the cover feels alive without being a video. What each scene may show, and
 * the verses behind it, live in `briefs.ts`.
 */
const SCENES: Record<string, () => ReactElement> = { ...GENESIS, ...EXODUS, ...LEVITICUS, ...NUMBERS, ...DEUTERONOMY }

export const hasEmblem = (parshaId: string | undefined) => !!parshaId && parshaId in SCENES
export const emblemTone = (parshaId: string | undefined) => (parshaId ? BRIEF_BY_ID[parshaId]?.tone : undefined)

export function EmblemArt({ parshaId, caption = true }: { parshaId: string; caption?: boolean }) {
  const reduce = useReducedMotion() ?? false
  const tilt = usePointerTilt()
  const scene = SCENES[parshaId]
  const brief = BRIEF_BY_ID[parshaId]
  if (!scene || !brief) return null
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
        <MotionCtx.Provider value={{ tilt: reduce ? null : tilt, still: reduce }}>{scene()}</MotionCtx.Provider>
        <rect width={W} height={H} filter="url(#grain)" opacity="0.07" style={{ mixBlendMode: 'multiply' }} />
      </svg>
      {caption && (
        <span
          style={{
            position: 'absolute', left: 16, top: 'calc(env(safe-area-inset-top, 0px) + 74px)', font: `800 10px ${FONT.display}`, letterSpacing: '0.08em',
            color: brief.tone === 'night' ? 'rgba(244,236,220,0.6)' : 'rgba(23,24,43,0.45)', textTransform: 'uppercase',
          }}
        >
          Illustrative · {brief.refs}
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

/**
 * Review pages. ?art=gallery shows every parsha (add &book=Exodus to narrow it);
 * ?art=<parsha-id> shows one scene full screen, for screenshots.
 */
export function ArtGallery() {
  const params = new URLSearchParams(window.location.search)
  const one = params.get('art')
  if (one && one !== 'gallery') {
    return (
      <div style={{ position: 'fixed', inset: 0, background: C.sand }}>
        {/* Same frame as a story cover: the top 60% of the screen. */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '60%' }}>
          <EmblemArt parshaId={one} caption={false} />
        </div>
      </div>
    )
  }
  const book = params.get('book')?.toLowerCase()
  const order = ['genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy']
  const shown = BRIEFS.filter((b) => !book || bookOf(b.id, order) === book)
  const done = BRIEFS.filter((b) => b.id in SCENES).length
  return (
    <div style={{ minHeight: '100vh', background: C.sand, padding: '24px 16px', boxSizing: 'border-box', font: `600 14px ${FONT.display}`, color: C.ink }}>
      <h1 style={{ font: `800 28px ${FONT.display}`, margin: '0 0 4px' }}>Emblem covers</h1>
      <p style={{ margin: '0 0 20px', color: C.muted }}>{done} of {BRIEFS.length} drawn · move the pointer to see the layers</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {shown.map((b) => (
          <figure key={b.id} style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: `${W} / ${H}`, borderRadius: 22, overflow: 'hidden', boxShadow: '0 6px 20px rgba(23,24,43,0.10)', background: C.land }}>
              {b.id in SCENES ? (
                <EmblemArt parshaId={b.id} caption={false} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted }}>not drawn yet</div>
              )}
            </div>
            <figcaption style={{ marginTop: 8 }}>
              <strong>{b.id}</strong>
              <span style={{ color: C.muted }}> · {b.refs}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

const bookOf = (id: string, order: string[]) => {
  const i = BRIEFS.findIndex((b) => b.id === id)
  const starts = ['bereshit', 'shemot', 'vayikra', 'bamidbar', 'devarim'].map((s) => BRIEFS.findIndex((b) => b.id === s))
  let k = 0
  starts.forEach((s, j) => { if (i >= s) k = j })
  return order[k]
}
