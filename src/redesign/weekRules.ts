// The rules for "this week": which parsha the app opens on, and what a holiday or double week shows.
// Pure functions only (no React, no window), so scripts/check-this-week.ts can run them in Node
// against live Hebcal data. Every parsha, holiday and date comes from the Hebcal API
// (hebcal.com, CC BY 4.0); nothing here is computed from a hand-written calendar.
//
// THE THREE RULES
//
// 1. Rollover. "This week" is the Shabbat on or after today's date in the reader's own
//    time zone. On Saturday the app still shows the parsha being read that day; it moves to
//    the next Shabbat at local midnight between Saturday and Sunday. We do not roll over at
//    havdalah: the candle and havdalah times in the app are for a fixed prototype city
//    (New York / Jerusalem), not the reader's location, so a havdalah cut-off would be wrong
//    for most readers, and showing the next parsha during Shabbat afternoon would be worse
//    than showing the just-read one for a few hours on Saturday night. Hebcal's own
//    /shabbat endpoint also moves to the next week on Sunday.
//
// 2. Double parshiot (Vayakhel-Pekudei, Tazria-Metzora, Acharei Mot-Kedoshim, Behar-Bechukotai,
//    Chukat-Balak, Matot-Masei, Nitzavim-Vayeilech). The UI always names both halves. The map
//    and story open on ONE half, chosen by `pickParsha`: the first half (in reading order)
//    that has a finished story; if neither or both have one, the first half. The reader can
//    switch to the other half from the Shabbat strip.
//
// 3. Holiday Shabbatot (Pesach, Sukkot, Shavuot, Rosh Hashana, Yom Kippur, Shmini Atzeret,
//    Shabbat Chol HaMoed). Hebcal lists no weekly parsha for these days. The app names the
//    holiday and its Torah reading (both from Hebcal), says there is no weekly parsha, and
//    opens on the next weekly parsha with its date. It never shows a parsha as "this
//    Shabbat" when it is not read that Shabbat.
//
// Israel and Diaspora readings differ after some holidays; every function takes data for
// one calendar (fetched with Hebcal's i=on / i=off), so the rules are the same for both.
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

// ── Names: Hebcal title → parshaList id ──

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

/** "Parashat Lech-Lecha" → ['lech-lecha']; "Parashat Vayakhel-Pekudei" → both halves, in reading order. */
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
export const dayDiff = (a: Date, b: Date) => Math.round((fromYmd(ymd(b)).getTime() - fromYmd(ymd(a)).getTime()) / 86400000)

/** Rule 1: the coming Saturday in local time, or today if today is Saturday. */
export const upcomingShabbat = (today: Date) => addDays(today, (6 - today.getDay() + 7) % 7)

// ── Hebcal data ──

/**
 * The span of the calendar we fetch: 1 Jan of last year to 31 Dec three years ahead.
 * It moves with the clock, so it never runs out (in 2026 it covers 2025-01-01 → 2029-12-31).
 */
export function hebcalWindow(today: Date) {
  const y = today.getFullYear()
  return { start: `${y - 1}-01-01`, end: `${y + 3}-12-31` }
}

export const PLACES = {
  diaspora: { geonameid: 5128581, city: 'New York' },
  israel: { geonameid: 281184, city: 'Jerusalem' },
} as const

export function hebcalYearUrl(isIsrael: boolean, today: Date) {
  const place = isIsrael ? PLACES.israel : PLACES.diaspora
  const { start, end } = hebcalWindow(today)
  return `https://www.hebcal.com/hebcal?v=1&cfg=json&s=on&maj=on&min=off&mod=off&nx=off&ss=off&mf=off&c=off&start=${start}&end=${end}&i=${isIsrael ? 'on' : 'off'}&geonameid=${place.geonameid}`
}

export interface HebcalItem {
  title: string
  date: string
  category: string
  subcat?: string
  memo?: string
  leyning?: { torah?: string }
}

export interface HolidayReading {
  /** Hebcal's title, e.g. "Sukkot V (CH’’M)". */
  title: string
  /** Hebcal's Torah reading for the day, e.g. "Exodus 33:12-34:26; Numbers 29:26-31". */
  torah?: string
}

export interface YearData {
  /** First and last day Hebcal returned. Outside it we know nothing. */
  range: { start: string; end: string }
  /** parsha id → every Shabbat in the window it is read (a double parsha lists the day under both ids). */
  readOn: Record<string, string[]>
  /** Saturday → parsha ids read that day, in reading order (absent on holiday Shabbatot). */
  bySaturday: Record<string, string[]>
  /** date → major holidays that day, in Hebcal's order. */
  holidays: Record<string, HolidayReading[]>
}

export function buildYear(items: HebcalItem[], range?: { start: string; end: string }): YearData {
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
      ;(holidays[day] ??= []).push({ title: it.title, torah: it.leyning?.torah })
    }
  }
  const days = items.map((i) => i.date.slice(0, 10)).sort()
  return { range: range ?? { start: days[0] ?? '', end: days[days.length - 1] ?? '' }, readOn, bySaturday, holidays }
}

/**
 * A reader-facing name for a Hebcal holiday title. Only reshapes Hebcal's own words:
 * "Sukkot V (CH’’M)" → "Shabbat Chol HaMoed Sukkot" (CH’’M is Hebcal's mark for Chol HaMoed),
 * "Rosh Hashana 5787" → "Rosh Hashana". Everything else is Hebcal's title unchanged.
 */
export function holidayName(title: string): string {
  const chm = title.match(/^(.*?)\s+[IVX]+\s+\(CH[’']{2}M\)$/)
  if (chm) return `Shabbat Chol HaMoed ${chm[1]}`
  return title.replace(/\s+\d{4}$/, '')
}

/** The main Torah reading: the part of Hebcal's reading before the maftir ("Exodus 33:12-34:26; Numbers …" → "Exodus 33:12-34:26"). */
export const mainReading = (torah?: string) => torah?.split(';')[0].trim()

/** Rule 2: which half of a double parsha the map and story open on. */
export function pickParsha(ids: string[], hasStory: (id: string) => boolean): string | null {
  return ids.find(hasStory) ?? ids[0] ?? null
}

export interface WeekPlan {
  /** The Saturday this week points at (rule 1). */
  shabbat: string
  /** Parsha ids read that Shabbat, in order. Empty on a holiday Shabbat or outside the data. */
  parshaIds: string[]
  /** Rule 3: set only when no weekly parsha is read that Shabbat. */
  holiday: (HolidayReading & { name: string }) | null
  /** The next Shabbat with a weekly parsha, after a holiday Shabbat. */
  next: { date: string; parshaIds: string[] } | null
  /** False if the Shabbat falls outside the fetched Hebcal window (never guess). */
  known: boolean
}

export function nextParshaSaturday(data: YearData, after: string) {
  const d = Object.keys(data.bySaturday).sort().find((s) => s > after && data.bySaturday[s].length)
  return d ? { date: d, parshaIds: data.bySaturday[d] } : null
}

export function weekPlan(data: YearData, today: Date): WeekPlan {
  const shabbat = ymd(upcomingShabbat(today))
  const known = shabbat >= data.range.start && shabbat <= data.range.end
  const parshaIds = data.bySaturday[shabbat] ?? []
  if (parshaIds.length || !known) return { shabbat, parshaIds, holiday: null, next: null, known }
  // Hebcal lists no weekly parsha this Shabbat: name the holiday (prefer the entry with a reading).
  const hs = data.holidays[shabbat] ?? []
  const h = hs.find((x) => x.torah) ?? hs[0]
  return {
    shabbat,
    parshaIds,
    holiday: h ? { ...h, name: holidayName(h.title) } : null,
    next: nextParshaSaturday(data, shabbat),
    known,
  }
}

/** The parsha the app opens on for `today`: this Shabbat's (rule 2 on a double week), or the next one after a holiday (rule 3). */
export function parshaForWeek(data: YearData, today: Date, hasStory: (id: string) => boolean = () => false): string | null {
  const w = weekPlan(data, today)
  if (w.parshaIds.length) return pickParsha(w.parshaIds, hasStory)
  return w.next ? pickParsha(w.next.parshaIds, hasStory) : null
}
