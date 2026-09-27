// The week around Shabbat: which parsha is read when, candle lighting, holiday weeks.
// Every date, time and holiday name comes from the Hebcal API (hebcal.com, CC BY 4.0);
// nothing here is computed by hand.
import { useQuery } from '@tanstack/react-query'
import { useAppStore } from '../store/useAppStore'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

/** Prototype locations until the app asks for the reader's own: one city per calendar. */
export const PLACES = {
  diaspora: { geonameid: 5128581, city: 'New York' },
  israel: { geonameid: 281184, city: 'Jerusalem' },
} as const

const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')
// Hebcal spells a few names differently from parshaList.
const ALIAS: Record<string, string> = {
  chayeisara: 'chayeisarah',
  vayetzei: 'vayetze',
  shmini: 'shemini',
  achreimot: 'achareimot',
  behaalotcha: 'behaalotecha',
  shlach: 'shelach',
  eikev: 'ekev',
}
const BY_NAME = new Map(parshas.map((p) => [norm(p.name), p.id]))
const idFor = (name: string) => BY_NAME.get(ALIAS[norm(name)] ?? norm(name))

/** "Parashat Lech-Lecha" → ['lech-lecha']; "Parashat Vayakhel-Pekudei" → both halves. */
export function parshaIdsFromTitle(title: string): string[] {
  const full = title.replace(/^Parashat\s+/, '')
  const whole = idFor(full)
  if (whole) return [whole]
  return full.split('-').map(idFor).filter((x): x is string => !!x)
}

// ── Dates (all as local calendar days, YYYY-MM-DD) ──

const pad = (n: number) => String(n).padStart(2, '0')
export const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const fromYmd = (s: string) => {
  const [y, m, d] = s.slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d)
}
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const dayDiff = (a: Date, b: Date) => Math.round((fromYmd(ymd(b)).getTime() - fromYmd(ymd(a)).getTime()) / 86400000)

/** The coming Saturday (today, if today is Saturday). */
export const upcomingShabbat = (today: Date) => addDays(today, (6 - today.getDay() + 7) % 7)

export function formatDay(s: string, withYear = false) {
  return fromYmd(s).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', ...(withYear ? { year: 'numeric' } : {}) })
}

// ── Prototype clock ──
// Review links: ?today=YYYY-MM-DD pretends it is that day. Without it, the prototype
// pretends it is the Monday of the week the opening parsha is read, so the weekly loop reads naturally.
const PARAMS = new URLSearchParams(window.location.search)
const TODAY_PARAM = PARAMS.get('today')
export const hasTodayParam = !!TODAY_PARAM
/** Prototype: open on the parsha that has a finished story, unless a link names one. */
export const OPENING_PARSHA = PARAMS.get('parsha') ?? 'lech-lecha'

interface HebcalItem {
  title: string
  date: string
  category: string
  subcat?: string
  memo?: string
}

interface YearData {
  /** parsha id → every Shabbat in the window it is read (a double parsha lists both ids). */
  readOn: Record<string, string[]>
  /** Saturday → parsha ids read that day (empty on holiday Shabbatot). */
  bySaturday: Record<string, string[]>
  /** date → holiday titles (major holidays). */
  holidays: Record<string, string[]>
}

async function fetchYear(isIsrael: boolean): Promise<YearData> {
  const place = isIsrael ? PLACES.israel : PLACES.diaspora
  const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&s=on&maj=on&min=off&mod=off&nx=off&ss=off&mf=off&c=off&start=2026-03-01&end=2027-10-31&i=${isIsrael ? 'on' : 'off'}&geonameid=${place.geonameid}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Hebcal ${res.status}`)
  const items: HebcalItem[] = (await res.json()).items
  const readOn: YearData['readOn'] = {}
  const bySaturday: YearData['bySaturday'] = {}
  const holidays: YearData['holidays'] = {}
  for (const it of items) {
    const day = it.date.slice(0, 10)
    if (it.category === 'parashat') {
      const ids = parshaIdsFromTitle(it.title)
      bySaturday[day] = ids
      for (const id of ids) (readOn[id] ??= []).push(day)
    } else if (it.category === 'holiday') {
      ;(holidays[day] ??= []).push(it.title)
    }
  }
  return { readOn, bySaturday, holidays }
}

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
  const time = (i: HebcalItem) => new Date(i.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: isIsrael ? 'Asia/Jerusalem' : 'America/New_York' }).replace(' ', ' ').toLowerCase()
  return {
    candles: candles ? { date: candles.date.slice(0, 10), time: time(candles) } : undefined,
    havdalah: havdalah ? { date: havdalah.date.slice(0, 10), time: time(havdalah) } : undefined,
  }
}

export function useYear() {
  const isIsrael = useAppStore((s) => s.isIsrael)
  return useQuery({ queryKey: ['dl-year', isIsrael], queryFn: () => fetchYear(isIsrael), staleTime: Infinity })
}

/** The prototype's "today": the ?today link, or the Monday of the opening parsha's Shabbat. */
export function usePrototypeToday(): Date | null {
  const { data } = useYear()
  if (TODAY_PARAM) return fromYmd(TODAY_PARAM)
  if (!data) return null
  const first = data.readOn[OPENING_PARSHA]?.find((d) => d >= '2026-09-01')
  return first ? addDays(fromYmd(first), -5) : new Date()
}

export type WeekState =
  | { kind: 'loading' }
  | { kind: 'this-week'; shabbat: string; daysToFriday: number; times?: ShabbatTimes; city: string }
  | { kind: 'other-week'; shabbat: string; past: boolean }
  | { kind: 'unscheduled' }

/** Where the selected parsha sits relative to this week. */
export function useWeek(parshaId: string | null, today: Date | null): WeekState {
  const isIsrael = useAppStore((s) => s.isIsrael)
  const { data } = useYear()
  const sat = today ? upcomingShabbat(today) : null
  const thisWeek = !!(data && sat && parshaId && data.bySaturday[ymd(sat)]?.includes(parshaId))
  const times = useQuery({
    queryKey: ['dl-shabbat', isIsrael, sat && ymd(sat)],
    queryFn: () => fetchShabbat(isIsrael, sat!),
    enabled: thisWeek,
    staleTime: Infinity,
  })
  if (!data || !today || !sat || !parshaId) return { kind: 'loading' }
  const city = (isIsrael ? PLACES.israel : PLACES.diaspora).city
  if (thisWeek) return { kind: 'this-week', shabbat: ymd(sat), daysToFriday: dayDiff(today, addDays(sat, -1)), times: times.data, city }
  const days = data.readOn[parshaId] ?? []
  if (days.length === 0) return { kind: 'unscheduled' }
  // The reading nearest to today, before or after.
  const t = ymd(today)
  const next = days.find((d) => d >= t)
  const prev = [...days].reverse().find((d) => d < t)
  const pick = !prev ? next! : !next ? prev : dayDiff(fromYmd(prev), today) <= dayDiff(today, fromYmd(next)) ? prev : next
  return { kind: 'other-week', shabbat: pick, past: pick < t }
}

/** If the coming Shabbat has no weekly parsha, what it is instead and what comes next. */
export function useHolidayWeek(today: Date | null) {
  const { data } = useYear()
  if (!data || !today) return null
  const sat = ymd(upcomingShabbat(today))
  if (data.bySaturday[sat]?.length) return null
  const nextSat = Object.keys(data.bySaturday).sort().find((d) => d > sat && data.bySaturday[d].length)
  return {
    shabbat: sat,
    holiday: data.holidays[sat]?.[0] ?? null,
    next: nextSat ? { date: nextSat, parshaId: data.bySaturday[nextSat][0] } : null,
  }
}

/** The weekly parsha for a given day (first half of a double), or the next one after a holiday week. */
export function parshaForWeek(data: YearData, today: Date): string | null {
  const sat = ymd(upcomingShabbat(today))
  if (data.bySaturday[sat]?.length) return data.bySaturday[sat][0]
  const nextSat = Object.keys(data.bySaturday).sort().find((d) => d > sat && data.bySaturday[d].length)
  return nextSat ? data.bySaturday[nextSat][0] : null
}

export function daysLabel(n: number) {
  if (n < 0) return 'Shabbat'
  if (n === 0) return 'Tonight'
  if (n === 1) return 'Tomorrow'
  return `In ${n} days`
}

/** The parsha after this one in the reading order, with the day it is read. */
export function useNextReading(parshaId: string | null, readOnDay: string | null) {
  const { data } = useYear()
  if (!data || !parshaId || !readOnDay) return null
  const mine = readOnDay
  const nextSat = Object.keys(data.bySaturday).sort().find((d) => d > mine && data.bySaturday[d].length && !data.bySaturday[d].includes(parshaId))
  return nextSat ? { date: nextSat, parshaId: data.bySaturday[nextSat][0] } : null
}
