import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Lightbulb, Landmark, Sparkles, Check, Play } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useEraContext } from '../hooks/useEraContext'
import { eraYear } from './placeText'
import { getParshaById, getParshasGroupedByBook, BOOKS_ORDER } from '../utils/parshaUtils'
import { ParshaTextViewer } from '../components/parsha/ParshaTextViewer'
import { useDaylight, haptic } from './useDaylight'
import type { ReadSegment } from './useDaylight'
import { getStory } from './stories'
import { C, FONT, SPRING, SHADOW } from './theme'
import { parshaDisplayName, verseRange } from './placeText'
import { getParshaDate, getParshaWorld, formatBCE } from './parshaDates'
import { isStoryComplete, completedCount, useWeekProgress } from './progress'
import { useYear, useToday, upcomingShabbat, ymd, fromYmd, formatDay } from './week'

const screen = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
  transition: SPRING.soft,
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { ...SPRING.soft, delay: 0.06 * i },
})

type Segment = ReadSegment

/** Typographic quotes and apostrophes; the words themselves are untouched. */
function smartQuotes(t: string): string {
  return t.replace(/(^|[\s(\[—–-])'/g, '$1‘').replace(/'/g, '’').replace(/(^|[\s(\[—–-])"/g, '$1“').replace(/"/g, '”')
}

/** Breaks a long summary into short paragraphs at sentence ends, so it reads in steps rather than one block. */
function paragraphs(text: string): string[] {
  const sentences = smartQuotes(text).split(/(?<=[.!?][’”)]?)\s+(?=[A-Z‘“])/)
  const out: string[] = []
  for (const sentence of sentences) {
    const last = out[out.length - 1]
    if (last !== undefined && last.length < 200) out[out.length - 1] = `${last} ${sentence}`
    else out.push(sentence)
  }
  return out
}

function Segmented<T extends string>({ value, options, onChange, id }: { value: T; options: [T, string][]; onChange: (v: T) => void; id: string }) {
  return (
    <div className="dl-chips" role="tablist" style={{ padding: 0 }}>
      {options.map(([v, label]) => {
        const active = v === value
        return (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => {
              haptic('light')
              onChange(v)
            }}
            style={{ color: active ? C.sand : C.ink }}
          >
            {active && <motion.span layoutId={id} className="dl-filter-pill" transition={SPRING.snappy} />}
            <span style={{ position: 'relative' }}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function ReadScreen() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const parsha = parshaId ? getParshaById(parshaId) : undefined
  const { era } = useEraContext(eraYear(parsha))
  const world = getParshaWorld(parshaId)
  const date = getParshaDate(parshaId)
  const seg = useDaylight((s) => s.readSeg)
  const setReadSeg = useDaylight((s) => s.setReadSeg)
  const markRead = useWeekProgress((s) => s.update)
  const setSeg = (v: Segment) => setReadSeg(v)
  // Opening the text counts as this week's "read the verses" step, however you got here.
  useEffect(() => {
    if (seg === 'text' && parshaId) markRead(parshaId, { read: true })
  }, [seg, parshaId, markRead])
  if (!parsha) return null
  const rc = parsha.richContent

  return (
    <motion.main className="dl-screen" {...screen}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <div style={{ font: `600 13px ${FONT.display}`, color: C.muted }}>{verseRange(parsha.seferiaUrl)}</div>
          <h1 className="dl-h1">{parshaDisplayName(parsha.name)}</h1>
        </div>
        <div lang="he" style={{ font: `34px/1 ${FONT.hebrew}`, color: C.blue }}>
          {parsha.hebrewName.replace('-', '־')}
        </div>
      </header>

      <Segmented<Segment>
        id="dl-read-seg"
        value={seg}
        onChange={setSeg}
        options={[
          ['overview', 'Overview'],
          ['text', 'Text'],
          ['history', 'History'],
        ]}
      />

      {seg === 'overview' && (
        <div key="overview" className="dl-stack">
          <motion.article {...rise(0)} className="dl-card">
            <div className="dl-eyebrow" style={{ color: C.blue, marginBottom: 10 }}>In brief</div>
            {paragraphs(rc?.narrativeSummary ?? parsha.summary ?? '').map((para, i) => (
              <p key={i} style={{ margin: i ? '12px 0 0' : 0, font: `400 18px/1.55 ${FONT.reading}`, color: '#2a2c42' }}>
                {para}
              </p>
            ))}
          </motion.article>
          {rc?.didYouKnow && (
            <motion.article {...rise(1)} className="dl-card" style={{ background: C.warm }}>
              <div className="dl-eyebrow">
                <Lightbulb size={16} strokeWidth={2.4} /> Did you know
              </div>
              <p style={{ margin: '8px 0 0', font: `600 18px/1.35 ${FONT.display}`, color: C.ink }}>{rc.didYouKnow}</p>
            </motion.article>
          )}
          {rc?.jewishTradition && (
            <motion.article {...rise(2)} className="dl-card">
              <div className="dl-eyebrow" style={{ color: C.blue }}>
                <Sparkles size={16} strokeWidth={2.4} /> In Jewish tradition
              </div>
              <p style={{ margin: '8px 0 0', font: `400 16px/1.5 ${FONT.display}`, color: C.body }}>{rc.jewishTradition}</p>
            </motion.article>
          )}
          {rc?.themes && rc.themes.length > 0 && (
            <motion.div {...rise(3)} className="dl-row-chips">
              {rc.themes.map((t) => (
                <span key={t} className="dl-mini-chip" style={{ background: C.white }}>
                  {t}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {seg === 'text' && (
        <motion.div key="text" {...rise(0)} className="dl-card dl-text-host">
          <ParshaTextViewer />
        </motion.div>
      )}

      {seg === 'history' && (
        <div key="history" className="dl-stack">
          {rc?.historicalContext && (
            <motion.article {...rise(0)} className="dl-card" style={{ background: C.blue, color: C.sand }}>
              <div className="dl-eyebrow" style={{ color: C.blueSoft }}>
                <Landmark size={16} strokeWidth={2.2} />{' '}
                {eraYear(parsha) === null ? 'Other ancient stories' : 'Historical background'}
              </div>
              <p style={{ margin: '8px 0 0', font: `400 16px/1.5 ${FONT.display}` }}>{rc.historicalContext}</p>
            </motion.article>
          )}
          {world ? (
            // Dated events chosen for this parsha's own window (src/data/worldEvents.json).
            <motion.article {...rise(1)} className="dl-card">
              <div className="dl-eyebrow" style={{ color: C.blue }}>
                Around this time · {formatBCE(world.windowStartBCE, world.windowEndBCE)}
              </div>
              <p style={{ margin: '8px 0 12px', font: `400 15px/1.5 ${FONT.display}`, color: C.muted }}>{world.note}</p>
              <ol className="dl-timeline">
                {[...world.events].sort((a, b) => b.yearBCE - a.yearBCE).map((e) => (
                  <li key={e.description}>
                    <span style={{ font: `800 13px ${FONT.display}`, color: C.blue }}>{formatBCE(e.yearBCE, e.endBCE, e.approx)}</span>
                    <span style={{ font: `500 15px/1.35 ${FONT.display}`, color: C.ink }}>{e.description}</span>
                    <span style={{ font: `400 14px/1.4 ${FONT.display}`, color: C.body }}>{e.significance}</span>
                  </li>
                ))}
              </ol>
            </motion.article>
          ) : era ? (
            <motion.article {...rise(1)} className="dl-card">
              <div className="dl-eyebrow" style={{ color: C.blue }}>
                Across the {era.name} · c. {era.startBCE}–{era.endBCE} BCE
              </div>
              <p style={{ margin: '8px 0 12px', font: `400 16px/1.5 ${FONT.display}`, color: C.body }}>{era.shortDesc}</p>
              {/* The era list is a fallback for parshiot without dated events of their own: say what it is and isn't. */}
              <p style={{ margin: '0 0 12px', font: `500 13px/1.45 ${FONT.display}`, color: C.muted }}>
                No one knows when this parsha’s events happened, or whether they can be dated; some scholars place them in
                this era, others later. The events below show that era’s world. The Torah names none of them.
              </p>
              <ol className="dl-timeline">
                {[...(era.events ?? [])].sort((a, b) => b.yearBCE - a.yearBCE).map((e) => (
                  <li key={e.description}>
                    <span style={{ font: `800 13px ${FONT.display}`, color: C.blue }}>c. {e.yearBCE} BCE</span>
                    <span style={{ font: `500 15px/1.35 ${FONT.display}`, color: C.ink }}>{e.description}</span>
                  </li>
                ))}
              </ol>
            </motion.article>
          ) : (
            date && (
              // No historical date (Creation, the Flood): no era card, only the two labelled dates.
              <motion.article {...rise(1)} className="dl-card">
                <div className="dl-eyebrow" style={{ color: C.blue }}>When</div>
                <p style={{ margin: '8px 0 0', font: `600 16px/1.45 ${FONT.display}`, color: C.ink }}>{date.scholarly.label}</p>
                {date.traditional && (
                  <p style={{ margin: '4px 0 0', font: `400 15px/1.45 ${FONT.display}`, color: C.body }}>
                    Traditional Jewish chronology: {formatBCE(date.traditional.yearBCE, date.traditional.endBCE)} · {date.traditional.event}
                  </p>
                )}
              </motion.article>
            )
          )}
        </div>
      )}
    </motion.main>
  )
}

const grouped = getParshasGroupedByBook()

export function LibraryScreen() {
  const parshaId = useAppStore((s) => s.selectedParshaId)
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const setTab = useDaylight((s) => s.setTab)
  const current = parshaId ? getParshaById(parshaId) : undefined
  const [book, setBook] = useState<string>(current?.book ?? 'Genesis')
  const done = completedCount()
  const { data: year } = useYear()
  const today = useToday()
  const thisSat = today ? ymd(upcomingShabbat(today)) : null
  /** The reading nearest to today, before or after, for each parsha. */
  const readingFor = (id: string) => {
    const days = year?.readOn[id]
    if (!days?.length || !today) return null
    const t = today.getTime()
    return days.reduce((best, d) => (Math.abs(fromYmd(d).getTime() - t) < Math.abs(fromYmd(best).getTime() - t) ? d : best))
  }

  return (
    <motion.main className="dl-screen" {...screen}>
      <header>
        <h1 className="dl-h1">All 54</h1>
        <div style={{ font: `500 15px ${FONT.display}`, color: C.muted, marginTop: 4 }}>
          {done > 0 ? `${done} ${done === 1 ? 'story' : 'stories'} finished · ` : ''}A new story each week
        </div>
      </header>

      <Segmented<string>
        id="dl-book-seg"
        value={book}
        onChange={setBook}
        options={BOOKS_ORDER.map((b) => [b, b === 'Deuteronomy' ? 'Deut.' : b === 'Leviticus' ? 'Lev.' : b === 'Numbers' ? 'Num.' : b] as [string, string])}
      />

      <div key={book} className="dl-grid">
        {(grouped[book] ?? []).map((p, i) => {
          const hasStory = !!getStory(p.id)
          const reading = readingFor(p.id)
          const thisWeek = !!reading && reading === thisSat
          const isCurrent = p.id === parshaId
          const complete = hasStory && isStoryComplete(p.id)
          const bg = isCurrent ? C.warm : hasStory ? C.blue : C.white
          const fg = hasStory && !isCurrent ? C.sand : C.ink
          return (
            <motion.button
              key={p.id}
              type="button"
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ...SPRING.snappy, delay: i * 0.025 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                haptic('light')
                setSelectedParsha(p.id)
                setTab('today')
              }}
              className="dl-tile"
              style={{ background: bg, color: fg, boxShadow: bg === C.white ? SHADOW.float : 'none' }}
            >
              <span lang="he" dir="rtl" className="dl-tile-he" style={{ color: hasStory && !isCurrent ? 'rgba(244,236,220,0.55)' : isCurrent ? 'rgba(23,24,43,0.45)' : 'rgba(23,24,43,0.28)' }}>
                {p.hebrewName}
              </span>
              {complete ? (
                <span className="dl-tile-check">
                  <Check size={11} strokeWidth={3.5} color={C.sand} />
                </span>
              ) : (
                hasStory && (
                  <span className="dl-tile-play" style={{ background: isCurrent ? C.ink : C.warm }} aria-label="Story">
                    <Play size={9} fill={isCurrent ? C.sand : C.ink} color={isCurrent ? C.sand : C.ink} />
                  </span>
                )
              )}
              <span style={{ position: 'relative', font: `600 11px ${FONT.display}`, opacity: 0.7 }}>{String(p.number).padStart(2, '0')}</span>
              <span style={{ position: 'relative', font: `800 15px/1.05 ${FONT.display}`, letterSpacing: '-0.01em' }}>{parshaDisplayName(p.name)}</span>
              {thisWeek ? (
                <span style={{ position: 'relative', font: `800 11px ${FONT.display}`, marginTop: 3 }}>This Shabbat</span>
              ) : (
                reading && <span style={{ position: 'relative', font: `600 11px ${FONT.display}`, opacity: 0.65, marginTop: 3 }}>{formatDay(reading).replace(/^\w+, /, '')}</span>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.main>
  )
}
