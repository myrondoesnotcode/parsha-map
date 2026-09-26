import { useEffect, useMemo, useState } from 'react'
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

export function StoryPlayer() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const { storyIndex, setStoryIndex, closeStory } = useDaylight()
  const story = getStory(parshaId)
  const parsha = parshaId ? getParshaById(parshaId) : undefined
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const progress = useMotionValue(0)

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
    if (isLast || paused) return
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
    <motion.div className="dl-story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
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
            {card.ref} · {story.route.length} stops · tap to begin
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
