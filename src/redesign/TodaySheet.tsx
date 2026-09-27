import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Play, BookOpen, MessageCircleQuestion, Share2, Check, MapPin, RotateCcw, CalendarDays } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { getParshaById } from '../utils/parshaUtils'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'
import { useDaylight, haptic } from './useDaylight'
import { getStory, storyMinutes } from './stories'
import { RevealText } from './Chrome'
import { C, FONT, SPRING } from './theme'
import { parshaDisplayName, verseRange } from './placeText'
import { useSteps, useWeekProgress } from './progress'
import { useWeek, useHolidayWeek, usePrototypeToday, useYear, parshaForWeek, formatDay, daysLabel } from './week'

const parshas = parshaList as ParshaListItem[]
const PEEK = 250 // visible height when collapsed, including the tab bar zone

// V'Zot HaBerachah has no Shabbat of its own; it is read on Simchat Torah.
const VZOT = 'vzot-habracha'

export function TodaySheet() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const { openStory, setTab } = useDaylight()
  const parsha = parshaId ? getParshaById(parshaId) : undefined
  const story = getStory(parshaId)
  const steps = useSteps(parshaId)
  const update = useWeekProgress((s) => s.update)

  const ref = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(420)
  const [collapsed, setCollapsed] = useState(false)
  useLayoutEffect(() => {
    if (ref.current) setH(ref.current.offsetHeight)
  }, [parshaId, steps.watched])
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
  const question = story && steps.question !== undefined ? story.questions[steps.question] : undefined

  const share = async () => {
    if (!story || !question) return
    haptic('medium')
    const text = `Table talk · ${name}\n\n${question.text}\n\nparshamap.com`
    try {
      if (navigator.share) await navigator.share({ text })
      else await navigator.clipboard.writeText(text)
      update(story.parshaId, { shared: true })
    } catch {
      /* share sheet dismissed */
    }
  }

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

      <ShabbatStrip parshaId={parsha.id} ready={!!steps.watched} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 12 }}>
        <motion.button whileTap={{ scale: 0.9 }} type="button" aria-label="Previous parsha" className="dl-round-sm" onClick={() => go(-1)} disabled={n <= 1}>
          <ChevronLeft size={18} strokeWidth={2.6} />
        </motion.button>
        <div key={parsha.id} style={{ textAlign: 'center', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
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
          <div style={{ font: `600 12px ${FONT.display}`, color: C.muted, marginTop: 1 }}>
            Parsha {n} of 54 · {verseRange(parsha.seferiaUrl)}
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} type="button" aria-label="Next parsha" className="dl-round-sm" onClick={() => go(1)} disabled={n >= 54}>
          <ChevronRight size={18} strokeWidth={2.6} />
        </motion.button>
      </div>

      {/* Step 1: the story. Once watched, the chosen question takes its place. */}
      {story && steps.watched && question ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="dl-for-table">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="dl-eyebrow" style={{ color: C.ink }}>
              <span className="dl-q-dot">?</span> For the table · {question.audience}
            </span>
            <button type="button" className="dl-link" onClick={() => openStory(0)}>
              <RotateCcw size={13} strokeWidth={2.6} /> Watch again
            </button>
          </div>
          <div style={{ font: `600 17px/1.3 ${FONT.display}`, color: C.ink, marginTop: 8 }}>{question.text}</div>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            haptic('medium')
            if (story) openStory(steps.resumeAt ?? 0)
            else setTab('map')
          }}
          className="dl-story-btn"
          style={{ background: story ? C.blue : C.ink }}
        >
          <span className="dl-story-ring" data-live={story && !steps.watched ? 'true' : 'false'}>
            <span className="dl-story-ring-inner">
              <Play size={15} fill={C.sand} color={C.sand} />
            </span>
          </span>
          <span style={{ flexGrow: 1, textAlign: 'left' }}>
            <span style={{ display: 'block', font: `800 17px ${FONT.display}` }}>
              {!story ? 'Story coming soon' : steps.resumeAt ? 'Continue the story' : steps.watched ? 'Watch the story again' : 'Watch this week’s story'}
            </span>
            <span style={{ display: 'block', font: `500 13px ${FONT.display}`, color: story ? C.blueSoft : '#a3a5bd', marginTop: 2 }}>
              {!story
                ? 'Explore this parsha on the map'
                : steps.resumeAt
                  ? `Card ${steps.resumeAt + 1} of ${story.cards.length}`
                  : `${story.cards.length} cards · about ${storyMinutes(story)} min`}
            </span>
          </span>
        </motion.button>
      )}

      {/* The rest of the week, in order. */}
      <div className="dl-steps">
        <Step
          Icon={BookOpen}
          label="Read the verses"
          done={!!steps.read}
          onClick={() => {
            update(parsha.id, { read: true })
            setTab('read', 'text')
          }}
        />
        <Step
          Icon={MessageCircleQuestion}
          label={question ? 'Question picked' : 'Pick a question'}
          done={!!question}
          disabled={!story}
          onClick={() => story && openStory(story.cards.length - 1)}
        />
        <Step Icon={Share2} label={steps.shared ? 'Shared' : 'Share it'} done={!!steps.shared} disabled={!question} onClick={share} />
      </div>
    </motion.section>
  )
}

function Step({ Icon, label, done, disabled, onClick }: { Icon: typeof BookOpen; label: string; done: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      disabled={disabled}
      onClick={() => {
        haptic('light')
        onClick()
      }}
      className="dl-step-tile"
      data-done={done || undefined}
    >
      <span className="dl-step-icon">{done ? <Check size={15} strokeWidth={3} /> : <Icon size={16} strokeWidth={2.4} />}</span>
      <span>{label}</span>
    </motion.button>
  )
}

/** When this parsha is read, relative to this week: date, countdown, candle lighting, holiday weeks. */
function ShabbatStrip({ parshaId, ready }: { parshaId: string; ready: boolean }) {
  const isIsrael = useAppStore((s) => s.isIsrael)
  const toggleRegion = useAppStore((s) => s.toggleRegion)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const today = usePrototypeToday()
  const week = useWeek(parshaId, today)
  const holiday = useHolidayWeek(today)
  const { data: year } = useYear()
  const city = isIsrael ? 'Jerusalem' : 'New York'
  const place = (
    <motion.button
      whileTap={{ scale: 0.94 }}
      type="button"
      className="dl-place-chip"
      aria-label={`Candle times for ${city}. Switch to ${isIsrael ? 'New York (Diaspora reading)' : 'Jerusalem (Israel reading)'}`}
      onClick={() => {
        haptic('light')
        toggleRegion()
      }}
    >
      <MapPin size={13} strokeWidth={2.6} /> {city}
    </motion.button>
  )

  // A holiday week: no weekly parsha this Shabbat, and this is the one after it.
  if (holiday && holiday.next?.parshaId === parshaId) {
    return (
      <div className="dl-strip">
        <div style={{ minWidth: 0 }}>
          <div className="dl-strip-eyebrow">This Shabbat · {formatDay(holiday.shabbat)}</div>
          <div className="dl-strip-line" style={{ display: 'block' }}>
            <b>{holiday.holiday ?? 'A holiday'}</b>, so no weekly parsha.
            <br />
            Next parsha: <b>{formatDay(holiday.next.date)}</b>
          </div>
        </div>
        {place}
      </div>
    )
  }

  if (week.kind === 'this-week') {
    const c = week.times?.candles
    return (
      <div className="dl-strip">
        <div style={{ minWidth: 0 }}>
          <div className="dl-strip-eyebrow">
            {ready ? (
              <span style={{ color: C.blue }}>
                <Check size={12} strokeWidth={3.4} style={{ verticalAlign: '-1px' }} /> Ready for Shabbat
              </span>
            ) : (
              'This Shabbat'
            )}{' '}
            · {formatDay(week.shabbat)}
          </div>
          <div className="dl-strip-line">
            {c ? (
              <>
                Candles <b>{formatDay(c.date).split(',')[0]} {c.time}</b>
              </>
            ) : (
              'Candle lighting…'
            )}
            <span className="dl-countdown">{daysLabel(week.daysToFriday)}</span>
          </div>
        </div>
        {place}
      </div>
    )
  }

  if (week.kind === 'other-week' && today && year) {
    const thisWeeks = parshaForWeek(year, today)
    return (
      <div className="dl-strip">
        <div style={{ minWidth: 0 }}>
          <div className="dl-strip-eyebrow" style={{ color: C.muted }}>
            {week.past ? 'Read on' : 'Coming up'} · {formatDay(week.shabbat, true)}
          </div>
          {thisWeeks && thisWeeks !== parshaId && (
            <button
              type="button"
              className="dl-link"
              style={{ marginTop: 3 }}
              onClick={() => {
                haptic('light')
                setSelectedParsha(thisWeeks)
              }}
            >
              <CalendarDays size={13} strokeWidth={2.6} /> Back to this week
            </button>
          )}
        </div>
        {place}
      </div>
    )
  }

  return (
    <div className="dl-strip">
      <div className="dl-strip-eyebrow" style={{ color: C.muted }}>
        {week.kind === 'unscheduled' && parshaId === VZOT ? 'Read on Simchat Torah' : 'This Shabbat'}
      </div>
      {place}
    </div>
  )
}

