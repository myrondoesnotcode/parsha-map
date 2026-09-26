import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useParshaPlaces } from '../hooks/useParshaPlaces'
import { getParshaById } from '../utils/parshaUtils'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'
import { useDaylight, haptic } from './useDaylight'
import { getStory } from './stories'
import { RevealText } from './Chrome'
import { C, FONT, SPRING, SHADOW } from './theme'
import { parshaDisplayName } from './placeText'
import { isStoryComplete } from './progress'

const parshas = parshaList as ParshaListItem[]
const PEEK = 196 // visible height when collapsed, including the tab bar zone

export function verseRange(seferiaUrl: string): string {
  const m = seferiaUrl.match(/^([^.]+)\.(\d+)\.(\d+)-(\d+)\.(\d+)$/)
  if (!m) return seferiaUrl.replace(/\./g, ' ')
  return `${m[1]} ${m[2]}:${m[3]} – ${m[4]}:${m[5]}`
}

export function TodaySheet() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const { openStory, setTab } = useDaylight()
  const parsha = parshaId ? getParshaById(parshaId) : undefined
  const story = getStory(parshaId)
  const places = useParshaPlaces(parshaId)

  const ref = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(420)
  const [collapsed, setCollapsed] = useState(false)
  useLayoutEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight)
  }, [parshaId])
  const offset = collapsed ? Math.max(0, h - PEEK) : 0

  if (!parsha) return null
  const n = parsha.number
  const go = (delta: number) => {
    const next = parshas.find((p) => p.number === n + delta)
    if (!next) return
    haptic('light')
    setSelectedParsha(next.id)
  }
  const name = parshaDisplayName(parsha.name)
  const done = story ? isStoryComplete(story.parshaId) : false

  return (
    <motion.section
      ref={ref}
      className="dl-sheet"
      initial={{ y: '100%' }}
      animate={{ y: offset }}
      exit={{ y: '100%' }}
      transition={SPRING.sheet}
      drag="y"
      dragConstraints={{ top: offset, bottom: offset }}
      dragElastic={{ top: 0.12, bottom: 0.5 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 50 || info.velocity.y > 400) setCollapsed(true)
        else if (info.offset.y < -30 || info.velocity.y < -400) setCollapsed(false)
      }}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 104px)' }}
    >
      <button type="button" aria-label={collapsed ? 'Expand' : 'Collapse'} className="dl-handle" onClick={() => setCollapsed((c) => !c)} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <motion.button whileTap={{ scale: 0.9 }} type="button" aria-label="Previous parsha" className="dl-round-sm" onClick={() => go(-1)} disabled={n <= 1}>
          <ChevronLeft size={18} strokeWidth={2.6} />
        </motion.button>
        <div key={parsha.id} style={{ textAlign: 'center', minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ font: `600 12px ${FONT.display}`, letterSpacing: '0.06em', color: C.blue, textTransform: 'uppercase' }}
          >
            Parsha {n} of 54 · {verseRange(parsha.seferiaUrl)}
          </motion.div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10, marginTop: 2 }}>
            <RevealText text={name} delay={0.25} style={{ font: `800 34px ${FONT.display}`, letterSpacing: '-0.035em', color: C.ink, whiteSpace: 'nowrap' }} />
            <motion.span
              lang="he"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...SPRING.snappy, delay: 0.55 }}
              style={{ font: `24px ${FONT.hebrew}`, color: C.warm, whiteSpace: 'nowrap' }}
            >
              {parsha.hebrewName.replace('-', '־')}
            </motion.span>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} type="button" aria-label="Next parsha" className="dl-round-sm" onClick={() => go(1)} disabled={n >= 54}>
          <ChevronRight size={18} strokeWidth={2.6} />
        </motion.button>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          haptic('medium')
          if (story) openStory(0)
          else setTab('map')
        }}
        className="dl-story-btn"
        style={{ background: story ? C.blue : C.ink }}
      >
        <span className="dl-story-ring" data-live={story && !done ? 'true' : 'false'}>
          <span className="dl-story-ring-inner">
            <Play size={15} fill={C.sand} color={C.sand} />
          </span>
        </span>
        <span style={{ flexGrow: 1, textAlign: 'left' }}>
          <span style={{ display: 'block', font: `800 17px ${FONT.display}` }}>
            {story ? (done ? 'Watch the story again' : 'Watch the story') : 'Story coming soon'}
          </span>
          <span style={{ display: 'block', font: `500 13px ${FONT.display}`, color: story ? C.blueSoft : '#a3a5bd', marginTop: 2 }}>
            {story ? `${story.cards.length} cards · about 2 minutes` : 'Explore this parsha on the map'}
          </span>
        </span>
      </motion.button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 10 }}>
        <Chip big={String(places.length)} label="Places" onClick={() => setTab('map')} />
        <Chip
          big={parsha.approximateDateBCE?.start != null ? `${parsha.approximateDateBCE.start}` : '—'}
          label="BCE, approx."
          onClick={() => setTab('read')}
        />
        <Chip
          big="?"
          label="Table talk"
          accent
          onClick={() => (story ? openStory(story.cards.length - 1) : setTab('read'))}
        />
      </div>
    </motion.section>
  )
}

function Chip({ big, label, onClick, accent }: { big: string; label: string; onClick: () => void; accent?: boolean }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        haptic('light')
        onClick()
      }}
      className="dl-chip-card"
      style={{ background: accent ? C.warm : C.white, boxShadow: accent ? 'none' : SHADOW.float }}
    >
      <span style={{ font: `800 19px ${FONT.display}`, lineHeight: 1 }}>{big}</span>
      <span style={{ font: `600 12px ${FONT.display}`, marginTop: 4 }}>{label}</span>
    </motion.button>
  )
}
