// The week around Shabbat: which parsha is read when, candle lighting, holiday weeks.
// Every date, time and holiday name comes from the Hebcal API (hebcal.com, CC BY 4.0);
// nothing here is computed by hand. The rules themselves (rollover, double parshiot,
// holiday weeks) live in ./weekRules.ts and are checked by scripts/check-this-week.ts.
import { useEffect } from 'react'
import { create } from 'zustand'
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/useAppStore'
import { getStory } from './stories'
import {
  PLACES,
  addDays,
  buildYear,
  dayDiff,
  fromYmd,
  hebcalWindow,
  hebcalYearUrl,
  nextParshaSaturday,
  parshaForWeek as parshaForWeekRule,
  pickParsha,
  upcomingShabbat,
  weekPlan,
  ymd,
  type HebcalItem,
  type YearData,
} from './weekRules'

export { PLACES, addDays, fromYmd, upcomingShabbat, ymd, parshaIdsFromTitle, holidayName, mainReading } from './weekRules'
export type { YearData, WeekPlan } from './weekRules'

export function formatDay(s: string, withYear = false) {
  return fromYmd(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', ...(withYear ? { year: 'numeric' } : {}) })
}

/** A parsha has a finished story: used to pick the half of a double week (rule 2 in weekRules). */
const hasStory = (id: string) => !!getStory(id)
export const parshaForWeek = (data: YearData, today: Date) => parshaForWeekRule(data, today, hasStory)
export const pickForShabbat = (ids: string[]) => pickParsha(ids, hasStory)

// ── The clock ──
// "Today" is the reader's local calendar day. It is re-read every minute and whenever the
// app comes back to the foreground, so the week rolls over at local midnight Saturday→Sunday
// even if the app stays open. Review links: ?today=YYYY-MM-DD pins it to that day.
const PARAMS = new URLSearchParams(window.location.search)
const TODAY_PARAM = PARAMS.get('today')
export const hasTodayParam = !!TODAY_PARAM

const useClock = create<{ day: string; tick: () => void }>((set, get) => ({
  day: TODAY_PARAM ?? ymd(new Date()),
  tick: () => {
    if (TODAY_PARAM) return
    const d = ymd(new Date())
    if (d !== get().day) set({ day: d })
  },
}))
let clockStarted = false
function startClock() {
  if (clockStarted || TODAY_PARAM) return
  clockStarted = true
  const tick = () => useClock.getState().tick()
  window.setInterval(tick, 60_000)
  document.addEventListener('visibilitychange', tick)
  window.addEventListener('focus', tick)
}

/** Today's local date (or the ?today= review date). Re-renders when the day changes. */
export function useToday(): Date {
  useEffect(startClock, [])
  const day = useClock((s) => s.day)
  return fromYmd(day)
}

// ── Hebcal year data ──

// Cache the last good calendar per region so the app still opens on the right week offline.
const cacheKey = (isIsrael: boolean) => `dl-hebcal-${isIsrael ? 'israel' : 'diaspora'}`
function readCache(isIsrael: boolean, today: Date): YearData | undefined {
  try {
    const raw = localStorage.getItem(cacheKey(isIsrael))
    if (!raw) return undefined
    const data = JSON.parse(raw) as YearData
    // Only trust a cache that still covers this week.
    const sat = ymd(upcomingShabbat(today))
    return data.range && sat >= data.range.start && sat <= data.range.end ? data : undefined
  } catch {
    return undefined
  }
}
function writeCache(isIsrael: boolean, data: YearData) {
  try {
    localStorage.setItem(cacheKey(isIsrael), JSON.stringify(data))
  } catch {
    /* storage full or blocked: the live fetch still works */
  }
}

async function fetchYear(isIsrael: boolean, today: Date): Promise<YearData> {
  const res = await fetch(hebcalYearUrl(isIsrael, today))
  if (!res.ok) throw new Error(`Hebcal ${res.status}`)
  const json = (await res.json()) as { items: HebcalItem[]; range?: { start: string; end: string } }
  const data = buildYear(json.items, json.range)
  writeCache(isIsrael, data)
  return data
}

export function useYear() {
  const isIsrael = useAppStore((s) => s.isIsrael)
  const today = useToday()
  const { start, end } = hebcalWindow(today)
  return useQuery({
    queryKey: ['dl-year', isIsrael, start, end],
    queryFn: () => fetchYear(isIsrael, today),
    initialData: () => readCache(isIsrael, today),
    // A cached calendar is shown at once, then refreshed from Hebcal.
    initialDataUpdatedAt: 0,
    staleTime: Infinity,
  })
}

// ── Shabbat times ──

interface ShabbatTimes {
  candles?: { date: string; time: string }
  havdalah?: { date: string; time: string }
}

async function fetchShabbat(isIsrael: boolean, day: Date): Promise<ShabbatTimes> {
  const place = isIsrael ? PLACES.israel : PLACES.diaspora
  const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=${place.geonameid}&gy=${day.getFullYear()}&gm=${day.getMonth() + 1}&gd=${day.getDate()}&M=on&i=${isIsrael ? 'on' : 'off'}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Hebcal ${res.status}`)
  const items: HebcalItem[] = (await res.json()).items
  // First candle lighting of the week (Friday, or a holiday eve) and the last havdalah.
  const candles = items.find((i) => i.category === 'candles')
  const havdalah = [...items].reverse().find((i) => i.category === 'havdalah')
  const time = (i: HebcalItem) => new Date(i.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: isIsrael ? 'Asia/Jerusalem' : 'America/New_York' }).replace(' ', ' ').toLowerCase()
  return {
    candles: candles ? { date: candles.date.slice(0, 10), time: time(candles) } : undefined,
    havdalah: havdalah ? { date: havdalah.date.slice(0, 10), time: time(havdalah) } : undefined,
  }
}

export type WeekState =
  | { kind: 'loading' }
  | {
      kind: 'this-week'
      shabbat: string
      daysToFriday: number
      times?: ShabbatTimes
      city: string
      /** Every parsha read this Shabbat, in order: two on a double week. */
      parshaIds: string[]
    }
  | { kind: 'other-week'; shabbat: string; past: boolean; parshaIds: string[] }
  | { kind: 'unscheduled' }

/** Where the selected parsha sits relative to this week. */
export function useWeek(parshaId: string | null, today: Date | null): WeekState {
  const isIsrael = useAppStore((s) => s.isIsrael)
  const { data } = useYear()
  const sat = today ? upcomingShabbat(today) : null
  const thisWeekIds = (data && sat && data.bySaturday[ymd(sat)]) || []
  const thisWeek = !!parshaId && thisWeekIds.includes(parshaId)
  const times = useQuery({
    queryKey: ['dl-shabbat', isIsrael, sat && ymd(sat)],
    queryFn: () => fetchShabbat(isIsrael, sat!),
    enabled: thisWeek,
    staleTime: Infinity,
  })
  if (!data || !today || !sat || !parshaId) return { kind: 'loading' }
  const city = (isIsrael ? PLACES.israel : PLACES.diaspora).city
  if (thisWeek) return { kind: 'this-week', shabbat: ymd(sat), daysToFriday: dayDiff(today, addDays(sat, -1)), times: times.data, city, parshaIds: thisWeekIds }
  const days = data.readOn[parshaId] ?? []
  if (days.length === 0) return { kind: 'unscheduled' }
  // The reading nearest to today, before or after.
  const t = ymd(today)
  const next = days.find((d) => d >= t)
  const prev = [...days].reverse().find((d) => d < t)
  const pick = !prev ? next! : !next ? prev : dayDiff(fromYmd(prev), today) <= dayDiff(today, fromYmd(next)) ? prev : next
  return { kind: 'other-week', shabbat: pick, past: pick < t, parshaIds: data.bySaturday[pick] ?? [parshaId] }
}

/** If the coming Shabbat has no weekly parsha: the holiday, its Torah reading, and the next weekly parsha. */
export function useHolidayWeek(today: Date | null) {
  const { data } = useYear()
  if (!data || !today) return null
  const plan = weekPlan(data, today)
  if (plan.parshaIds.length || !plan.known) return null
  return { shabbat: plan.shabbat, holiday: plan.holiday, next: plan.next }
}

export function daysLabel(n: number) {
  if (n < 0) return 'Shabbat'
  if (n === 0) return 'Tonight'
  if (n === 1) return 'Tomorrow'
  return `In ${n} days`
}

/** The next weekly reading after the Shabbat this parsha is read, with the day it is read. */
export function useNextReading(parshaId: string | null, readOnDay: string | null) {
  const { data } = useYear()
  if (!data || !parshaId || !readOnDay) return null
  const next = nextParshaSaturday(data, readOnDay)
  return next ? { date: next.date, parshaId: pickForShabbat(next.parshaIds)!, parshaIds: next.parshaIds } : null
}
