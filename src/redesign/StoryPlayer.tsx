import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { X, Share2, Check, Pause, Info, BookOpen, ArrowRight } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getParshaById } from '../utils/parshaUtils'
import { useDaylight, haptic } from './useDaylight'
import { getStory, isStageCard, isPageCard, cardSeconds } from './stories'
import type { StoryCard, ParshaStory, TableQuestion } from './stories'
import { RevealText } from './Chrome'
import { C, FONT, SPRING } from './theme'
import { parshaDisplayName, verseRange } from './placeText'
import { markStoryComplete, useWeekProgress, useSteps } from './progress'
import { useWeek, usePrototypeToday, useNextReading, formatDay } from './week'

/** How long an act title holds before its first card takes over. */
const ACT_MS = 1500

/**
 * Design exploration: how a card with no map subject uses the screen.
 * s = stage: the card's hero visual rises into the space above, over the terrain (chosen)
 * f = full page: the card fills the screen and everything scales up to match.
 */
type Frame = 's' | 'f'
/** Review links: ?hold=1 stops auto-advance so a card can be inspected. */
const HOLD = new URLSearchParams(window.location.search).has('hold')
const FRAME: Frame = new URLSearchParams(window.location.search).get('frame') === 'f' ? 'f' : 's'
const LAYOUT: 'stage' | 'full' = FRAME === 's' ? 'stage' : 'full'

export function StoryPlayer() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const { storyIndex, setStoryIndex, closeStory, guessPick } = useDaylight()
  const story = getStory(parshaId)
  const parsha = parshaId ? getParshaById(parshaId) : undefined
  const updateSteps = useWeekProgress((s) => s.update)
  const [dir, setDir] = useState(1)
  const [held, setHeld] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [actShowing, setActShowing] = useState<string | null>(null)
  const progress = useMotionValue(0)

  // The stage sizes itself to whatever space the card leaves above it.
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
  const waitsForAnswer = card?.kind === 'guess' && guessPick === null
  const paused = held || sourcesOpen

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

  // Remember where the reader is, so reopening picks up at the same card.
  useEffect(() => {
    if (story && !isLast && storyIndex > 0) updateSteps(story.parshaId, { resumeAt: storyIndex })
  }, [story, storyIndex, isLast, updateSteps])

  // Act titles: a short beat when a new part of the story begins (going forward only).
  useEffect(() => {
    if (!card?.act || dir < 0) return
    setActShowing(card.act)
    const t = setTimeout(() => setActShowing(null), ACT_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex])

  // Auto-advance, paced to how long the card takes to read. The last card and an unanswered guess wait.
  useEffect(() => {
    progress.set(0)
    if (!card || isLast || paused || HOLD || waitsForAnswer) return
    const controls = animate(progress, 1, {
      duration: card.kind === 'guess' ? 5 : cardSeconds(card),
      delay: card.act && dir > 0 ? ACT_MS / 1000 : 0,
      ease: 'linear',
      onComplete: () => go(1),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex, paused, waitsForAnswer])

  useEffect(() => {
    if (isLast && story) {
      markStoryComplete(story.parshaId)
      haptic('medium')
    }
  }, [isLast, story])

  // Swipe down anywhere to close; press and hold to pause.
  const press = useRef<{ y: number; t: number } | null>(null)
  const swiped = useRef(false)
  const onDown = (e: React.PointerEvent) => {
    press.current = { y: e.clientY, t: Date.now() }
    swiped.current = false
    setHeld(true)
  }
  const onUp = (e: React.PointerEvent) => {
    setHeld(false)
    if (press.current && e.clientY - press.current.y > 90) {
      swiped.current = true
      closeStory()
    }
    press.current = null
  }
  const tap = (delta: number) => {
    if (swiped.current) return
    go(delta)
  }

  if (!story || !card || !parsha) return null
  const dark = card.kind === 'stars'
  const stage = LAYOUT === 'stage' && isStageCard(card)
  // The first segment of each act sits a little apart, so the parts of the story show in the bar.
  const actStarts = new Set(story.cards.map((c, i) => (c.act ? i : -1)).filter((i) => i > 0))
  const actNow = [...story.cards.slice(0, storyIndex + 1)].reverse().find((c) => c.act)?.act

  return (
    <motion.div ref={rootRef} className="dl-story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <AnimatePresence>
        {stage && (
          <motion.div key={`stage-${storyIndex}`} className="dl-stage" data-kind={card.kind} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
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
        {card.kind === 'cover' && (
          <motion.div key="scrim" className="dl-story-scrim-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        )}
      </AnimatePresence>

      {/* Tap zones: back on the left third, forward elsewhere. Cards let taps through to them. */}
      <div className="dl-story-taps" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => setHeld(false)} onPointerLeave={() => setHeld(false)}>
        <button type="button" aria-label="Previous card" onClick={() => tap(-1)} style={{ width: '33%' }} />
        <button type="button" aria-label="Next card" onClick={() => tap(1)} style={{ flexGrow: 1 }} />
      </div>

      <div className="dl-story-head">
        <div style={{ display: 'flex', gap: 4 }}>
          {story.cards.map((_, i) => (
            <Segment
              key={i}
              state={i < storyIndex ? 'done' : i === storyIndex ? 'active' : 'todo'}
              progress={progress}
              dark={dark}
              gapBefore={actStarts.has(i)}
            />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <div style={{ font: `600 14px ${FONT.display}`, color: dark ? C.sand : C.ink, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {parshaDisplayName(parsha.name)}
            <span style={{ opacity: 0.6 }}>{actNow ? ` · ${actNow}` : ` · ${storyIndex + 1} of ${count}`}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label="Close story"
            onClick={closeStory}
            className="dl-round-sm"
            style={{ background: dark ? 'rgba(244,236,220,0.16)' : C.white, color: dark ? C.sand : C.ink }}
          >
            <X size={18} strokeWidth={2.6} />
          </motion.button>
        </div>
      </div>

      {/* A drawn route is a sketch of the order of places, not the roads: say so while it's on screen. */}
      {story.route.length > 0 && card.kind !== 'cover' && card.kind !== 'guess' && card.kind !== 'stars' && (
        <div className="dl-route-tag">
          {card.kind === 'talk' ? 'Route illustrative · pins are usual sites, none certain' : 'Route illustrative · lines join the stops in order'}
        </div>
      )}

      {/* Holding a finger down pauses; say so where the eye already is. */}
      <AnimatePresence>
        {held && !isLast && !HOLD && (
          <motion.div key="paused" className="dl-paused" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15, delay: 0.25 }}>
            <Pause size={16} fill={C.sand} strokeWidth={0} /> Paused
          </motion.div>
        )}
      </AnimatePresence>

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
          data-page={card.kind === 'talk' ? 'finale' : isPageCard(card) && LAYOUT === 'full' ? 'full' : undefined}
        >
          <CardBody card={card} story={story} hebrew={parsha.hebrewName} onClose={closeStory} onSources={() => setSourcesOpen(true)} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>{actShowing && <ActTitle key={actShowing} story={story} act={actShowing} />}</AnimatePresence>
      <AnimatePresence>{sourcesOpen && <SourcesSheet key="sources" card={card} onClose={() => setSourcesOpen(false)} />}</AnimatePresence>
    </motion.div>
  )
}

function Segment({ state, progress, dark, gapBefore }: { state: 'done' | 'active' | 'todo'; progress: MotionValue<number>; dark: boolean; gapBefore: boolean }) {
  const width = useTransform(progress, (p) => `${p * 100}%`)
  return (
    <div style={{ flex: '1 1 0', height: 4, borderRadius: 2, overflow: 'hidden', marginLeft: gapBefore ? 6 : 0, background: dark ? 'rgba(244,236,220,0.25)' : 'rgba(23,24,43,0.14)' }}>
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

/** A beat between parts of the story: "Part 2 · The covenant". */
function ActTitle({ story, act }: { story: ParshaStory; act: string }) {
  const n = story.cards.filter((c) => c.act).findIndex((c) => c.act === act) + 1
  return (
    <motion.div className="dl-act" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.45 } }} transition={{ duration: 0.25 }}>
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ ...SPRING.soft, delay: 0.05 }} style={{ font: `800 13px ${FONT.display}`, letterSpacing: '0.14em', color: C.blue }}>
        PART {n}
      </motion.div>
      <RevealText text={act} delay={0.15} style={{ font: `800 46px/1 ${FONT.display}`, letterSpacing: '-0.04em', color: C.ink, marginTop: 8 }} />
    </motion.div>
  )
}

/** The verse reference on every card; tapping it opens the sources and notes. */
function RefButton({ card, onSources, dark, stop }: { card: StoryCard; onSources: () => void; dark?: boolean; stop?: number }) {
  if (!card.ref) return null
  return (
    <button type="button" className="dl-ref" onClick={onSources} style={{ color: dark ? C.blueSoft : C.blue }} aria-label={`Sources for ${card.ref}`}>
      {stop && <span className="dl-stop-badge">{stop}</span>}
      <span style={{ minWidth: 0 }}>{card.ref}</span>
      <Info size={13} strokeWidth={2.4} style={{ flexShrink: 0, opacity: card.note ? 1 : 0.55 }} />
    </button>
  )
}

function SourcesSheet({ card, onClose }: { card: StoryCard; onClose: () => void }) {
  const { closeStory, setTab } = useDaylight()
  return (
    <>
      <motion.div className="dl-sources-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.section
        className="dl-sources"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={SPRING.sheet}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => info.offset.y > 60 && onClose()}
        aria-label="Sources"
      >
        <button type="button" aria-label="Close sources" className="dl-handle" onClick={onClose} />
        <div className="dl-eyebrow" style={{ color: C.muted }}>
          Sources
        </div>
        <div style={{ font: `800 22px/1.2 ${FONT.display}`, letterSpacing: '-0.02em', color: C.ink, marginTop: 6 }}>{card.ref ?? 'About the map'}</div>
        {card.note && <p style={{ margin: '10px 0 0', font: `400 16px/1.5 ${FONT.display}`, color: C.body }}>{card.note}</p>}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          className="dl-primary"
          style={{ width: '100%', marginTop: 18 }}
          onClick={() => {
            closeStory()
            setTab('read', 'text')
          }}
        >
          <BookOpen size={18} /> Read the verses
        </motion.button>
      </motion.section>
    </>
  )
}

function CardBody({ card, story, hebrew, onClose, onSources }: { card: StoryCard; story: ParshaStory; hebrew: string; onClose: () => void; onSources: () => void }) {
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
            {card.ref}
            {story.anchor ? ` · ${story.anchor.name}` : ''}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} style={{ font: `500 13px ${FONT.display}`, color: C.muted, marginTop: 12 }}>
            Tap to go on · hold to pause · swipe down to close
          </motion.div>
        </div>
      )
    case 'stars':
      return (
        <div className="dl-story-stars">
          <RefButton card={card} onSources={onSources} dark />
          <RevealText text={`“${card.title}”`} delay={0.3} style={{ font: `800 36px/1.05 ${FONT.display}`, letterSpacing: '-0.03em', color: C.sand, marginTop: 12 }} />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} style={{ font: `600 22px ${FONT.display}`, color: C.warm, marginTop: 14 }}>
            {card.body}
          </motion.div>
        </div>
      )
    case 'name':
      return (
        <div className="dl-story-panel">
          <RefButton card={card} onSources={onSources} />
          <div style={{ font: `800 30px/1.05 ${FONT.display}`, letterSpacing: '-0.03em', color: C.ink, marginTop: 8 }}>{card.title}</div>
          <p style={{ margin: '10px 0 0', font: `400 17px/1.45 ${FONT.display}`, color: C.body }}>{card.body}</p>
        </div>
      )
    case 'letter':
    case 'offerings':
    case 'scale':
    case 'quote':
      return <PageCard card={card} onSources={onSources} />
    case 'guess':
      return <GuessCard card={card} onSources={onSources} />
    case 'plan':
      return (
        <div className="dl-story-panel">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span style={{ font: `800 11px ${FONT.display}`, letterSpacing: '0.08em', background: C.ink, color: C.sand, padding: '3px 7px', borderRadius: 7, whiteSpace: 'nowrap' }}>COURTYARD TO SCALE (1 CUBIT ≈ ½ M)</span>
            {/* The location caveat stays on screen: a drawing placed near a named mountain would otherwise read as where it stood. */}
            <span style={{ font: `800 11px ${FONT.display}`, letterSpacing: '0.08em', background: C.sand, color: C.ink, padding: '3px 7px', borderRadius: 7, whiteSpace: 'nowrap' }}>LOCATION ILLUSTRATIVE</span>
            <RefButton card={card} onSources={onSources} />
          </div>
          <div style={{ font: `800 30px/1.02 ${FONT.display}`, letterSpacing: '-0.035em', color: C.ink, marginTop: 10 }}>{card.title}</div>
          <p style={{ margin: '10px 0 0', font: `400 17px/1.45 ${FONT.display}`, color: C.body }}>{card.body}</p>
        </div>
      )
    case 'talk':
      return <Finale story={story} card={card} onClose={onClose} onSources={onSources} />
    default:
      return (
        <div className="dl-story-panel">
          <RefButton card={card} onSources={onSources} stop={card.stop} />
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
      <motion.img src={src} alt="" initial={{ scale: 1.08, x: 0, y: 0 }} animate={{ scale: 1.22, x: -14, y: 10 }} transition={{ duration: 10, ease: 'linear' }} />
    </motion.div>
  )
}

type HeroSize = 'card' | 'stage' | 'full'

/**
 * The visual half of a page card. On the stage it rises into the space above the card;
 * on a full page it fills the middle.
 */
function Hero({ card, size }: { card: StoryCard; size: HeroSize }) {
  switch (card.kind) {
    case 'letter':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <SmallAleph word={card.hebrew ?? ''} size={size} />
          {size !== 'card' && <span style={{ font: `800 11px ${FONT.display}`, letterSpacing: '0.08em', color: C.muted }}>SIZE ILLUSTRATIVE</span>}
        </div>
      )
    case 'scale':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%', height: size === 'stage' ? '100%' : undefined, justifyContent: 'center' }}>
          <Staircase card={card} size={size} />
          {size !== 'card' && <span style={{ font: `800 11px ${FONT.display}`, letterSpacing: '0.08em', color: C.muted }}>STEP HEIGHTS ILLUSTRATIVE</span>}
        </div>
      )
    case 'name':
      return <NameMorph size={size} />
    case 'guess':
      return <GuessTokens card={card} />
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
function PageCard({ card, onSources }: { card: StoryCard; onSources: () => void }) {
  const dark = card.kind === 'quote'
  const full = LAYOUT === 'full'
  const head = (
    <>
      <RefButton card={card} onSources={onSources} dark={dark} />
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
      {full && card.kind !== 'offerings' && (
        <div className="dl-hero">
          <Hero card={card} size="full" />
        </div>
      )}
      {body}
    </div>
  )
}

/** A question the reader answers before the story goes on. Place guesses also light up on the map. */
function GuessCard({ card, onSources }: { card: StoryCard; onSources: () => void }) {
  const { guessPick, setGuessPick } = useDaylight()
  const options = card.options ?? []
  const answered = guessPick !== null
  const right = answered && options[guessPick]?.correct
  const answer = options.find((o) => o.correct)
  return (
    <div className="dl-story-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="dl-guess-tag">YOUR GUESS</span>
        <RefButton card={card} onSources={onSources} />
      </div>
      <div style={{ font: `800 26px/1.08 ${FONT.display}`, letterSpacing: '-0.03em', color: C.ink, marginTop: 10 }}>{card.title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
        {options.map((o, i) => {
          const state = !answered ? 'open' : o.correct ? 'right' : i === guessPick ? 'wrong' : 'dim'
          return (
            <motion.button
              key={o.label}
              type="button"
              whileTap={!answered ? { scale: 0.97 } : undefined}
              disabled={answered}
              className="dl-option"
              data-state={state}
              animate={state === 'wrong' ? { x: [0, -6, 6, -4, 0] } : {}}
              transition={{ duration: 0.35 }}
              onClick={() => {
                setGuessPick(i)
                haptic(o.correct ? 'medium' : 'light')
              }}
            >
              <span className="dl-option-letter">{state === 'right' ? <Check size={14} strokeWidth={3.4} /> : String.fromCharCode(65 + i)}</span>
              <span style={{ flexGrow: 1, textAlign: 'left' }}>{o.label}</span>
              {o.he && (
                <span lang="he" dir="rtl" style={{ font: `20px/1 ${FONT.hebrew}` }}>
                  {o.he}
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
      <AnimatePresence>
        {answered && (
          <motion.p key="reveal" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ margin: '12px 0 0', font: `600 16px/1.4 ${FONT.display}`, color: C.ink }}>
            <span style={{ color: right ? C.blue : '#c2491d' }}>{right ? 'Right.' : `It was ${answer ? answer.label.charAt(0).toLowerCase() + answer.label.slice(1) : ''}.`}</span> {card.reveal ?? 'Tap to see what happens.'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Stage visual for a guess with no map: the choices as big tokens that react to the answer. */
function GuessTokens({ card }: { card: StoryCard }) {
  const guessPick = useDaylight((s) => s.guessPick)
  const options = card.options ?? []
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      {options.map((o, i) => {
        const answered = guessPick !== null
        const lit = answered && o.correct
        const faded = answered && !o.correct
        return (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: faded ? 0.35 : 1, y: 0, scale: lit ? 1.12 : faded ? 0.9 : 1 }}
            transition={{ ...SPRING.soft, delay: answered ? 0 : 0.3 + i * 0.15 }}
            className="dl-token"
            data-lit={lit || undefined}
          >
            <span lang="he" dir="rtl" style={{ font: `40px/1 ${FONT.hebrew}` }}>
              {o.he}
            </span>
            <span style={{ font: `700 13px ${FONT.display}`, marginTop: 8 }}>{answered ? o.label : '?'}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

/** The word written out, then its final letter shrinks to show it is written small in the scroll (ratio illustrative). */
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
function NameMorph({ size }: { size: HeroSize }) {
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
    <div
      lang="he"
      dir="rtl"
      className={size === 'stage' ? 'dl-hero-halo' : undefined}
      style={{ display: 'flex', justifyContent: 'center', gap: 2, font: `${size === 'card' ? 72 : 118}px/1 ${FONT.hebrew}` }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={l === 'ה' ? 'hei' : `${l}-${i < 3 ? i : 'end'}`}
          layout
          initial={l === 'ה' ? { scale: 0, y: -60, opacity: 0 } : false}
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

/**
 * The end of the story: pick a question for the table, send it, and see where to go next.
 * Fills the lower two-thirds; the whole journey stays visible above it.
 */
function Finale({ story, card, onClose, onSources }: { story: ParshaStory; card: StoryCard; onClose: () => void; onSources: () => void }) {
  const parsha = getParshaById(story.parshaId)
  const steps = useSteps(story.parshaId)
  const update = useWeekProgress((s) => s.update)
  const { setTab } = useDaylight()
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const today = usePrototypeToday()
  const week = useWeek(story.parshaId, today)
  const readOn = week.kind === 'this-week' || week.kind === 'other-week' ? week.shabbat : null
  const next = useNextReading(story.parshaId, readOn)
  const nextParsha = next ? getParshaById(next.parshaId) : undefined
  const picked = steps.question ?? 1
  const q: TableQuestion | undefined = story.questions[picked]
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (steps.question === undefined) update(story.parshaId, { question: 1 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const share = async () => {
    if (!q) return
    haptic('medium')
    const text = `Table talk · ${parshaDisplayName(parsha?.name ?? story.parshaId)}\n\n${q.text}\n\nparshamap.com`
    try {
      if (navigator.share) await navigator.share({ text })
      else await navigator.clipboard.writeText(text)
      setSent(true)
      update(story.parshaId, { shared: true })
    } catch {
      /* share sheet dismissed */
    }
  }

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Burst />
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...SPRING.snappy, delay: 0.1 }} className="dl-complete">
        <Check size={16} strokeWidth={3} /> Story complete
      </motion.div>
      <div className="dl-story-panel dl-finale">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div className="dl-eyebrow" style={{ color: C.blue }}>
            {/* Only this week's parsha is "for Shabbat"; any other week just gets a question for the table. */}
            {week.kind === 'this-week' ? 'Ready for Shabbat' : 'For your table'}
          </div>
          {card.note && (
            <button type="button" onClick={onSources} className="dl-about-map">
              <Info size={13} strokeWidth={2.4} /> About the map
            </button>
          )}
        </div>
        <div style={{ font: `800 25px/1.1 ${FONT.display}`, letterSpacing: '-0.03em', color: C.ink, marginTop: 6 }}>Bring one question to the table</div>
        <div className="dl-audience" role="tablist" aria-label="Who is it for">
          {story.questions.map((qq, i) => (
            <button
              key={qq.audience}
              type="button"
              role="tab"
              aria-selected={i === picked}
              onClick={() => {
                haptic('light')
                setSent(false)
                update(story.parshaId, { question: i })
              }}
            >
              {i === picked && <motion.span layoutId="dl-aud-pill" className="dl-filter-pill" transition={SPRING.snappy} />}
              <span style={{ position: 'relative', color: i === picked ? C.sand : C.ink }}>{qq.audience}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={picked} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="dl-question">
            {q?.text}
          </motion.div>
        </AnimatePresence>
        <motion.button whileTap={{ scale: 0.97 }} type="button" onClick={share} className="dl-primary" style={{ width: '100%', flexGrow: 0, marginTop: 12 }}>
          {sent ? <Check size={18} /> : <Share2 size={18} />}
          {sent ? 'Sent' : 'Send to the family chat'}
        </motion.button>
        <div className="dl-next-row">
          <motion.button
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => {
              onClose()
              setTab('read', 'text')
            }}
          >
            <BookOpen size={17} />
            <span>
              <b>Read the verses</b>
              <small>{parsha ? verseRange(parsha.seferiaUrl) : ''}</small>
            </span>
          </motion.button>
          {nextParsha && next && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => {
                onClose()
                setSelectedParsha(nextParsha.id)
                setTab('today')
              }}
            >
              <ArrowRight size={17} />
              <span>
                <b>Next: {parshaDisplayName(nextParsha.name)}</b>
                <small>{formatDay(next.date)}</small>
              </span>
            </motion.button>
          )}
        </div>
        <button type="button" onClick={onClose} className="dl-done">
          Done
        </button>
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
