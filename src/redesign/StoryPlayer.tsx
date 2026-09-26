import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { X, Share2, Check } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getParshaById } from '../utils/parshaUtils'
import { useDaylight, haptic } from './useDaylight'
import { getStory } from './stories'
import type { StoryCard, ParshaStory } from './stories'
import { RevealText } from './Chrome'
import { C, FONT, SPRING } from './theme'
import { parshaDisplayName } from './placeText'
import { markStoryComplete } from './progress'

const CARD_SECONDS = 9

/** Cards that carry their own content rather than pointing at the map. */
const PAGE_KINDS = new Set(['letter', 'offerings', 'scale', 'quote'])

/**
 * Design exploration: how a card with no map subject uses the screen.
 * a = panel over the live map · b = paper page · c = map in a window above the card
 * s = stage: the card's hero visual rises into the space above, over the terrain
 * f = full page: the card fills the screen and everything scales up to match.
 */
type Frame = 'a' | 'b' | 'c' | 's' | 'f'
/** Review links: ?hold=1 stops auto-advance so a card can be inspected. */
const HOLD = new URLSearchParams(window.location.search).has('hold')
const FRAME: Frame = ((new URLSearchParams(window.location.search).get('frame') ?? 's') as Frame)
/** Which layout the page cards use: text-only card with a hero above it, full page, or everything in the card. */
const LAYOUT: 'stage' | 'full' | 'card' = FRAME === 's' ? 'stage' : FRAME === 'f' ? 'full' : 'card'

export function StoryPlayer() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const { storyIndex, setStoryIndex, closeStory } = useDaylight()
  const story = getStory(parshaId)
  const parsha = parshaId ? getParshaById(parshaId) : undefined
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const progress = useMotionValue(0)
  // Frame c sizes the map window to whatever space the card leaves above it.
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver(() => {
      const wrap = root.querySelector('.dl-story-card-wrap') as HTMLElement | null
      if (wrap) root.style.setProperty('--card-top', `${wrap.getBoundingClientRect().top - root.getBoundingClientRect().top}px`)
    })
    const watch = () => root.querySelectorAll('.dl-story-card-wrap').forEach((el) => ro.observe(el))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [])

  const count = story?.cards.length ?? 0
  const card = story?.cards[storyIndex]
  const isLast = storyIndex === count - 1

  const go = (delta: number) => {
    const next = useDaylight.getState().storyIndex + delta
    if (next < 0) {
      progress.set(0)
      return
    }
    if (next >= count) return
    haptic('light')
    setDir(delta)
    setStoryIndex(next)
  }

  // Auto-advance; the last card (table talk) waits for the reader.
  useEffect(() => {
    progress.set(0)
    if (isLast || paused || HOLD) return
    const controls = animate(progress, 1, {
      duration: CARD_SECONDS,
      ease: 'linear',
      onComplete: () => go(1),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex, paused])

  useEffect(() => {
    if (isLast && story) {
      markStoryComplete(story.parshaId)
      haptic('medium')
    }
  }, [isLast, story])

  if (!story || !card || !parsha) return null

  const holdStart = () => setPaused(true)
  const holdEnd = () => setPaused(false)

  return (
    <motion.div ref={rootRef} className="dl-story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <AnimatePresence>
        {PAGE_KINDS.has(card.kind) && (FRAME === 'b' || FRAME === 'c') && (
          <motion.div
            key="page"
            className={FRAME === 'b' ? 'dl-page-paper' : 'dl-page-window'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {LAYOUT === 'stage' && PAGE_KINDS.has(card.kind) && card.kind !== 'offerings' && (
          <motion.div key={`stage-${storyIndex}`} className="dl-stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <Hero card={card} size="stage" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {card.kind === 'cover' && card.image && <CoverArt key="art" src={card.image} />}
      </AnimatePresence>
      <div className="dl-story-scrim-top" />
      <AnimatePresence>{card.kind === 'stars' && <StarSky key="sky" />}</AnimatePresence>
      <AnimatePresence>
        {(card.kind === 'cover' || card.kind === 'talk' || card.kind === 'name') && (
          <motion.div key="scrim" className="dl-story-scrim-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        )}
      </AnimatePresence>

      {/* Tap zones: back on the left third, forward elsewhere; press and hold pauses. */}
      <div
        className="dl-story-taps"
        onPointerDown={holdStart}
        onPointerUp={holdEnd}
        onPointerCancel={holdEnd}
        onPointerLeave={holdEnd}
      >
        <button type="button" aria-label="Previous card" onClick={() => go(-1)} style={{ width: '33%' }} />
        <button type="button" aria-label="Next card" onClick={() => go(1)} style={{ flexGrow: 1 }} />
      </div>

      <div className="dl-story-head">
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`, gap: 4 }}>
          {story.cards.map((_, i) => (
            <Segment key={i} state={i < storyIndex ? 'done' : i === storyIndex ? 'active' : 'todo'} progress={progress} dark={card.kind === 'stars'} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <div style={{ font: `600 14px ${FONT.display}`, color: card.kind === 'stars' ? C.sand : C.ink }}>
            {parshaDisplayName(parsha.name)}{' '}
            <span style={{ opacity: 0.6 }}>
              · {storyIndex + 1} of {count}
            </span>
            {paused && <span style={{ opacity: 0.6 }}> · paused</span>}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label="Close story"
            onClick={closeStory}
            className="dl-round-sm"
            style={{ background: card.kind === 'stars' ? 'rgba(244,236,220,0.16)' : C.white, color: card.kind === 'stars' ? C.sand : C.ink }}
          >
            <X size={18} strokeWidth={2.6} />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="popLayout" custom={dir} initial={false}>
        <motion.div
          key={storyIndex}
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={SPRING.soft}
          className="dl-story-card-wrap"
          data-page={PAGE_KINDS.has(card.kind) ? (FRAME === 'b' ? 'paper' : LAYOUT === 'full' ? 'full' : undefined) : undefined}
        >
          <CardBody card={card} story={story} hebrew={parsha.hebrewName} onClose={closeStory} />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

function Segment({ state, progress, dark }: { state: 'done' | 'active' | 'todo'; progress: MotionValue<number>; dark: boolean }) {
  const width = useTransform(progress, (p) => `${p * 100}%`)
  return (
    <div style={{ height: 4, borderRadius: 2, overflow: 'hidden', background: dark ? 'rgba(244,236,220,0.25)' : 'rgba(23,24,43,0.14)' }}>
      <motion.div
        style={{
          height: '100%',
          borderRadius: 2,
          background: dark ? C.sand : C.ink,
          width: state === 'done' ? '100%' : state === 'active' ? width : '0%',
        }}
      />
    </div>
  )
}

function CardBody({ card, story, hebrew, onClose }: { card: StoryCard; story: ParshaStory; hebrew: string; onClose: () => void }) {
  switch (card.kind) {
    case 'cover':
      return (
        <div className="dl-story-cover">
          <motion.div
            lang="he"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ...SPRING.soft, delay: 0.2 }}
            style={{ font: `96px/1 ${FONT.hebrew}`, color: C.warm }}
          >
            {hebrew.replace('-', '־')}
          </motion.div>
          <RevealText text={card.title} delay={0.5} style={{ font: `800 56px/0.95 ${FONT.display}`, letterSpacing: '-0.04em', color: C.ink, marginTop: 8 }} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ font: `500 19px ${FONT.display}`, color: C.body, marginTop: 10 }}>
            {card.body}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="dl-cover-meta">
            {card.ref} · {story.route.length ? `${story.route.length} stops` : `at ${story.anchor?.name ?? 'home'}`} · tap to begin
          </motion.div>
        </div>
      )
    case 'stars':
      return (
        <div className="dl-story-stars">
          <div style={{ font: `600 13px ${FONT.display}`, color: C.blueSoft }}>{card.ref}</div>
          <RevealText text={`“${card.title}”`} delay={0.3} style={{ font: `800 36px/1.05 ${FONT.display}`, letterSpacing: '-0.03em', color: C.sand, marginTop: 12 }} />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} style={{ font: `600 22px ${FONT.display}`, color: C.warm, marginTop: 14 }}>
            {card.body}
          </motion.div>
        </div>
      )
    case 'name':
      return (
        <div className="dl-story-panel">
          <div style={{ font: `600 13px ${FONT.display}`, color: C.blue }}>{card.ref}</div>
          <NameMorph />
          <div style={{ font: `800 30px/1.05 ${FONT.display}`, letterSpacing: '-0.03em', color: C.ink }}>{card.title}</div>
          <p style={{ margin: '10px 0 0', font: `400 17px/1.45 ${FONT.display}`, color: C.body }}>{card.body}</p>
        </div>
      )
    case 'letter':
    case 'offerings':
    case 'scale':
    case 'quote':
      return <PageCard card={card} />
    case 'plan':
      return (
        <div className="dl-story-panel">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', font: `600 13px ${FONT.display}`, color: C.blue }}>
            <span style={{ font: `800 11px ${FONT.display}`, letterSpacing: '0.08em', background: C.ink, color: C.sand, padding: '3px 7px', borderRadius: 7, whiteSpace: 'nowrap' }}>COURTYARD TO SCALE</span>
            {card.ref}
          </div>
          <div style={{ font: `800 30px/1.02 ${FONT.display}`, letterSpacing: '-0.035em', color: C.ink, marginTop: 10 }}>{card.title}</div>
          <p style={{ margin: '10px 0 0', font: `400 17px/1.45 ${FONT.display}`, color: C.body }}>{card.body}</p>
          {card.note && <p style={{ margin: '10px 0 0', font: `500 12px/1.4 ${FONT.display}`, color: C.muted }}>{card.note}</p>}
        </div>
      )
    case 'talk':
      return <TalkCard card={card} story={story} onClose={onClose} />
    default:
      return (
        <div className="dl-story-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {card.stop && (
              <span style={{ width: 24, height: 24, borderRadius: 12, background: C.warm, color: C.ink, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: `800 12px ${FONT.display}` }}>
                {card.stop}
              </span>
            )}
            <span style={{ font: `600 13px ${FONT.display}`, color: C.blue }}>{card.ref}</span>
          </div>
          <div style={{ font: `800 34px/1 ${FONT.display}`, letterSpacing: '-0.035em', color: C.ink, marginTop: 10 }}>{card.title}</div>
          <p style={{ margin: '12px 0 0', font: `400 17px/1.45 ${FONT.display}`, color: C.body }}>{card.body}</p>
        </div>
      )
  }
}

/** Full-bleed public-domain art with a slow Ken Burns drift. */
function CoverArt({ src }: { src: string }) {
  return (
    <motion.div className="dl-cover-art" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <motion.img
        src={src}
        alt=""
        initial={{ scale: 1.08, x: 0, y: 0 }}
        animate={{ scale: 1.22, x: -14, y: 10 }}
        transition={{ duration: CARD_SECONDS + 2, ease: 'linear' }}
      />
    </motion.div>
  )
}

type HeroSize = 'card' | 'stage' | 'full'

/**
 * The visual half of a page card. In the card layout it sits inside the panel;
 * on the stage it rises into the space above the card; on a full page it fills the middle.
 */
function Hero({ card, size }: { card: StoryCard; size: HeroSize }) {
  switch (card.kind) {
    case 'letter':
      return <SmallAleph word={card.hebrew ?? ''} size={size} />
    case 'scale':
      return <Staircase card={card} size={size} />
    case 'quote':
      return (
        <motion.div
          lang="he"
          dir="rtl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING.soft, delay: 0.2 }}
          className={size === 'stage' ? 'dl-hero-halo' : undefined}
          style={{
            font: `${size === 'card' ? 34 : size === 'stage' ? 50 : 54}px/1.2 ${FONT.hebrew}`,
            color: size === 'stage' ? C.ink : C.warm,
            textAlign: size === 'card' ? 'right' : 'center',
            margin: size === 'card' ? '12px 0 0' : 0,
          }}
        >
          {card.hebrew}
        </motion.div>
      )
    default:
      return null
  }
}

/** Page cards: letter, offerings, scale, quote. The layout decides where the hero goes. */
function PageCard({ card }: { card: StoryCard }) {
  const dark = card.kind === 'quote'
  const full = LAYOUT === 'full'
  const heroInCard = LAYOUT !== 'stage'
  const head = (
    <>
      <div style={{ font: `600 13px ${FONT.display}`, color: dark ? C.blueSoft : C.blue }}>{card.ref}</div>
      {card.kind !== 'quote' && (
        <div style={{ font: `800 ${full ? 34 : 30}px/1.02 ${FONT.display}`, letterSpacing: '-0.035em', color: C.ink, marginTop: 8 }}>{card.title}</div>
      )}
    </>
  )
  const body =
    card.kind === 'quote' ? (
      <>
        <RevealText text={`“${card.title}”`} delay={0.8} style={{ font: `italic 400 ${full ? 28 : 24}px/1.25 ${FONT.reading}`, color: C.sand, marginTop: 14 }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ margin: '14px 0 0', font: `500 15px/1.4 ${FONT.display}`, color: C.blueSoft }}>
          {card.body}
        </motion.p>
      </>
    ) : card.kind === 'offerings' ? (
      <ol className="dl-offerings" data-full={full || undefined}>
        {card.items?.map((it, i) => (
          <motion.li key={it.en} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ ...SPRING.soft, delay: 0.35 + i * 0.22 }}>
            <span className="dl-off-num">{i + 1}</span>
            <span style={{ minWidth: 0, flexGrow: 1 }}>
              <span style={{ display: 'block', font: `700 ${full ? 18 : 16}px/1.2 ${FONT.display}`, color: C.ink }}>{it.en}</span>
              <span style={{ display: 'block', font: `400 14px/1.35 ${FONT.display}`, color: C.body, marginTop: 1 }}>{it.note}</span>
            </span>
            <span lang="he" dir="rtl" style={{ font: `${full ? 28 : 22}px/1 ${FONT.hebrew}`, color: C.blue, flexShrink: 0 }}>{it.he}</span>
          </motion.li>
        ))}
      </ol>
    ) : (
      <p style={{ margin: '10px 0 0', font: `400 ${full ? 18 : 17}px/1.45 ${FONT.display}`, color: C.body }}>{card.body}</p>
    )
  return (
    <div className={`dl-story-panel${dark ? ' dl-quote' : ''}`}>
      {head}
      {heroInCard && card.kind !== 'offerings' && (full ? <div className="dl-hero"><Hero card={card} size="full" /></div> : <Hero card={card} size="card" />)}
      {body}
      {card.note && <p style={{ margin: '10px 0 0', font: `500 12px/1.4 ${FONT.display}`, color: dark ? C.blueSoft : C.muted }}>{card.note}</p>}
    </div>
  )
}

/** The word written out, then its final letter shrinks to the size it has in the scroll. */
function SmallAleph({ word, size }: { word: string; size: HeroSize }) {
  const [small, setSmall] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => {
      setSmall(true)
      haptic('light')
    }, 1300)
    return () => clearTimeout(t)
  }, [])
  const big = size === 'card' ? 76 : 132
  // Split off the final aleph so it can be sized on its own.
  const base = word.slice(0, -1)
  const last = word.slice(-1)
  return (
    <div
      lang="he"
      dir="rtl"
      className={size === 'stage' ? 'dl-hero-halo' : undefined}
      style={{ display: 'flex', alignItems: 'baseline', justifyContent: size === 'card' ? 'flex-end' : 'center', margin: size === 'card' ? '12px 0 14px' : 0, font: `${big}px/1.1 ${FONT.hebrew}`, color: C.ink }}
    >
      <span>{base}</span>
      <span style={{ display: 'inline-block', fontSize: small ? big * 0.4 : big, color: small ? C.warm : C.ink, transition: 'font-size 0.7s cubic-bezier(0.3, 1.4, 0.5, 1), color 0.4s' }}>
        {last}
      </span>
    </div>
  )
}

/** A descending staircase: each step is what you can bring if the one above is too much. */
function Staircase({ card, size }: { card: StoryCard; size: HeroSize }) {
  const items = card.items ?? []
  const fill = size !== 'card'
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: fill ? 0 : 16, height: size === 'stage' ? 'min(100%, 300px)' : fill ? '100%' : 176, width: '100%', maxWidth: size === 'stage' ? 330 : undefined }}>
      {items.map((it, i) => (
        <motion.div
          key={it.en}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: `${100 - i * (fill ? 28 : 23)}%`, opacity: 1 }}
          transition={{ ...SPRING.soft, delay: 0.4 + i * 0.35 }}
          className="dl-step"
          style={{ background: [C.blue, '#5563d6', C.warm][i] ?? C.warm, color: i === 2 ? C.ink : C.white, boxShadow: size === 'stage' ? '0 10px 30px rgba(23,24,43,0.18)' : undefined }}
        >
          <span style={{ font: `800 ${fill ? 19 : 16}px/1.1 ${FONT.display}` }}>{it.en}</span>
          <span style={{ font: `500 ${fill ? 13 : 12}px/1.2 ${FONT.display}`, opacity: 0.8, marginTop: 3 }}>{it.note}</span>
        </motion.div>
      ))}
    </div>
  )
}

/** אברם → אברהם: the hei slides into the name. */
function NameMorph() {
  const [added, setAdded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => {
      setAdded(true)
      haptic('medium')
    }, 1100)
    return () => clearTimeout(t)
  }, [])
  const letters = added ? ['א', 'ב', 'ר', 'ה', 'ם'] : ['א', 'ב', 'ר', 'ם']
  return (
    <div lang="he" dir="rtl" style={{ display: 'flex', justifyContent: 'flex-end', gap: 2, margin: '10px 0 12px', font: `72px/1 ${FONT.hebrew}` }}>
      {letters.map((l, i) => (
        <motion.span
          key={l === 'ה' ? 'hei' : `${l}-${i < 3 ? i : 'end'}`}
          layout
          initial={l === 'ה' ? { scale: 0, y: -40, opacity: 0 } : false}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={SPRING.snappy}
          style={{ color: l === 'ה' ? C.warm : C.ink, display: 'inline-block' }}
        >
          {l}
        </motion.span>
      ))}
    </div>
  )
}

function TalkCard({ card, story, onClose }: { card: StoryCard; story: ParshaStory; onClose: () => void }) {
  const [shared, setShared] = useState(false)
  const share = async () => {
    haptic('medium')
    const text = `Table talk — ${parshaDisplayName(story.parshaId.replace(/-/g, ' '))}\n\n${card.title}\n\nparshamap.com`
    try {
      if (navigator.share) await navigator.share({ text })
      else await navigator.clipboard.writeText(text)
      setShared(true)
    } catch {
      /* share sheet dismissed */
    }
  }
  return (
    <div style={{ position: 'relative' }}>
      <Burst />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING.snappy, delay: 0.1 }}
        className="dl-complete"
      >
        <Check size={16} strokeWidth={3} /> Story complete
      </motion.div>
      <div className="dl-story-panel" style={{ background: C.sand }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 30, height: 30, borderRadius: 15, background: C.warm, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: `800 16px ${FONT.display}`, color: C.ink }}>?</span>
          <span style={{ font: `800 13px ${FONT.display}`, letterSpacing: '0.1em', color: C.ink }}>TABLE TALK</span>
        </div>
        <div style={{ font: `600 23px/1.22 ${FONT.display}`, letterSpacing: '-0.01em', color: C.ink, marginTop: 12 }}>{card.title}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, position: 'relative', zIndex: 3 }}>
          <motion.button whileTap={{ scale: 0.96 }} type="button" onClick={share} className="dl-primary">
            {shared ? <Check size={18} /> : <Share2 size={18} />}
            {shared ? 'Sent' : 'Send to the family chat'}
          </motion.button>
          <motion.button whileTap={{ scale: 0.92 }} type="button" onClick={onClose} className="dl-secondary">
            Done
          </motion.button>
        </div>
      </div>
    </div>
  )
}

/** A small, one-shot celebration when the story is finished. */
function Burst() {
  const bits = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => {
        const a = (i / 22) * Math.PI * 2
        const r = 90 + (i % 5) * 26
        return { x: Math.cos(a) * r, y: Math.sin(a) * r * 0.7 - 40, c: [C.warm, C.blue, C.ink][i % 3], s: 6 + (i % 3) * 3 }
      }),
    []
  )
  return (
    <div aria-hidden style={{ position: 'absolute', left: '50%', top: 0, pointerEvents: 'none', zIndex: 2 }}>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: b.x, y: b.y, scale: 1, opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.3, 1], delay: 0.15 }}
          style={{ position: 'absolute', width: b.s, height: b.s, borderRadius: i % 2 ? 2 : b.s, background: b.c }}
        />
      ))}
    </div>
  )
}

function StarSky() {
  const stars = useMemo(
    () => Array.from({ length: 90 }, () => ({ x: Math.random() * 100, y: Math.random() * 62, r: Math.random() * 2 + 0.6, d: Math.random() * 2.5 })),
    []
  )
  return (
    <motion.div className="dl-sky" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
      {stars.map((s, i) => (
        <motion.span
          key={i}
          style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.r * 2, height: s.r * 2, borderRadius: s.r, background: C.sand }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.35, 1], scale: 1 }}
          transition={{ delay: 0.3 + s.d * 0.5, duration: 2.4, repeat: Infinity, repeatType: 'mirror' }}
        />
      ))}
    </motion.div>
  )
}
