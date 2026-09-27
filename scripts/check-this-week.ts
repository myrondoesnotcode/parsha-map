// Checks the "this week" rules in src/redesign/weekRules.ts against Hebcal.
//
//   npm run check:week            (network: calls hebcal.com)
//
// The app builds its calendar from one Hebcal range request (/hebcal?start=…&end=…).
// This script checks it against a second, independent Hebcal endpoint: /shabbat?gy=&gm=&gd=,
// which returns the parsha (or holidays) for the Shabbat of the week containing a date.
// Nothing here is a hand-written calendar: every expected value comes from Hebcal.
import {
  PLACES,
  addDays,
  buildYear,
  fromYmd,
  hebcalWindow,
  hebcalYearUrl,
  parshaForWeek,
  parshaIdsFromTitle,
  pickParsha,
  upcomingShabbat,
  weekPlan,
  ymd,
  type HebcalItem,
  type YearData,
} from '../src/redesign/weekRules'
import parshaList from '../src/data/parshaList.json'
import { storyFileIds } from './storyFiles'

const TODAY = fromYmd(process.env.CHECK_TODAY ?? '2026-09-27')
// The parshiot with stories (one file each in src/redesign/stories/, as the app registers them), for rule 2.
const STORIES = new Set(storyFileIds())
const hasStory = (id: string) => STORIES.has(id)
// Rule 2 unit checks use a fixed set, so they don't change as stories are added.
const FIXED_STORIES = new Set(['lech-lecha', 'vayikra'])
const fixedHasStory = (id: string) => FIXED_STORIES.has(id)

type Region = 'diaspora' | 'israel'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function getJson(url: string) {
  for (let i = 0; i < 3; i++) {
    const res = await fetch(url)
    if (res.ok) return res.json()
    await sleep(1000 * (i + 1))
  }
  throw new Error(`fetch failed: ${url}`)
}

async function year(region: Region): Promise<YearData> {
  const json = await getJson(hebcalYearUrl(region === 'israel', TODAY))
  return buildYear(json.items as HebcalItem[], json.range)
}

/** The oracle: Hebcal /shabbat for the week containing `day`. */
async function oracle(region: Region, day: Date) {
  const place = region === 'israel' ? PLACES.israel : PLACES.diaspora
  const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=${place.geonameid}&gy=${day.getFullYear()}&gm=${day.getMonth() + 1}&gd=${day.getDate()}&M=on&i=${region === 'israel' ? 'on' : 'off'}`
  const items = (await getJson(url)).items as HebcalItem[]
  await sleep(150)
  const sat = items.find((i) => i.category === 'parashat')?.date.slice(0, 10)
  const par = items.find((i) => i.category === 'parashat')
  return { parsha: par ? par.title : null, parshaDate: sat ?? null, items }
}

/** Oracle for a holiday week: walk Hebcal /shabbat week by week until a Shabbat has a parsha. */
async function oracleNext(region: Region, holidayShabbat: string) {
  let d = addDays(fromYmd(holidayShabbat), 1)
  for (let i = 0; i < 4; i++) {
    const o = await oracle(region, d)
    if (o.parsha) return o
    d = addDays(d, 7)
  }
  return null
}

const names = (ids: string[]) => ids.join('+') || '—'
const rows: string[][] = []
let failures = 0

async function check(region: Region, data: YearData, day: Date, label: string, expect?: (plan: ReturnType<typeof weekPlan>) => string | null) {
  const plan = weekPlan(data, day)
  const opens = parshaForWeek(data, day, hasStory)
  const o = await oracle(region, day)
  const problems: string[] = []
  const expectedSat = ymd(upcomingShabbat(day))
  if (plan.shabbat !== expectedSat) problems.push(`shabbat ${plan.shabbat} ≠ ${expectedSat}`)
  let shows: string
  if (plan.parshaIds.length) {
    const oIds = o.parsha ? parshaIdsFromTitle(o.parsha) : []
    if (o.parshaDate !== plan.shabbat) problems.push(`Hebcal /shabbat has parsha on ${o.parshaDate}, not ${plan.shabbat}`)
    if (names(oIds) !== names(plan.parshaIds)) problems.push(`Hebcal says ${o.parsha}`)
    if (!oIds.length) problems.push(`title "${o.parsha}" did not map to a parsha`)
    shows = `${names(plan.parshaIds)}${plan.parshaIds.length > 1 ? ` (double; map opens on ${opens})` : ''}`
  } else {
    // Holiday Shabbat: Hebcal /shabbat must also have no parsha that day, and name the holiday.
    if (o.parshaDate === plan.shabbat) problems.push(`Hebcal /shabbat has ${o.parsha} on ${plan.shabbat}`)
    const oHol = o.items.filter((i) => i.category === 'holiday' && i.date.slice(0, 10) === plan.shabbat).map((i) => i.title)
    if (!plan.holiday) problems.push('no holiday named')
    else if (!oHol.includes(plan.holiday.title)) problems.push(`holiday ${plan.holiday.title} not in Hebcal /shabbat [${oHol.join(', ')}]`)
    const n = await oracleNext(region, plan.shabbat)
    const nIds = n?.parsha ? parshaIdsFromTitle(n.parsha) : []
    if (!plan.next || plan.next.date !== n?.parshaDate || names(plan.next.parshaIds) !== names(nIds))
      problems.push(`next ${plan.next?.date} ${names(plan.next?.parshaIds ?? [])} ≠ Hebcal ${n?.parshaDate} ${n?.parsha}`)
    shows = `HOLIDAY "${plan.holiday?.name}" [${plan.holiday?.torah?.split(';')[0] ?? 'no reading'}] → next ${names(plan.next?.parshaIds ?? [])} ${plan.next?.date} (opens ${opens})`
  }
  const extra = expect?.(plan)
  if (extra) problems.push(extra)
  if (problems.length) failures++
  rows.push([region === 'israel' ? 'IL' : 'DI', `${ymd(day)} ${day.toLocaleDateString('en-US', { weekday: 'short' })}`, label, plan.shabbat, shows, problems.length ? `FAIL: ${problems.join('; ')}` : 'ok'])
}

async function main() {
  const [di, il] = await Promise.all([year('diaspora'), year('israel')])
  const win = hebcalWindow(TODAY)
  console.log(`Hebcal window requested ${win.start} → ${win.end}; received DI ${di.range.start} → ${di.range.end}, IL ${il.range.start} → ${il.range.end}`)
  if (di.range.end < '2029-12-01' || il.range.end < '2029-12-01') {
    console.log('FAIL: data does not reach the end of 2029')
    failures++
  }

  // Every Saturday in the window has either a parsha or a named holiday; every parsha title maps to ids.
  for (const [region, data] of [['DI', di], ['IL', il]] as const) {
    let sats = 0
    for (let d = upcomingShabbat(fromYmd(data.range.start)); ymd(d) <= data.range.end; d = addDays(d, 7)) {
      sats++
      const p = weekPlan(data, d)
      if (!p.parshaIds.length && !p.holiday) {
        console.log(`FAIL ${region} ${ymd(d)}: no parsha and no holiday`)
        failures++
      }
    }
    console.log(`${region}: ${sats} Saturdays checked for a parsha or holiday`)
    // Every Hebcal title maps: each of the 53 weekly parshiot (all but V'Zot HaBerachah) is read in the window.
    const missing = parshaList.filter((p) => p.id !== 'vzot-habracha' && !data.readOn[p.id]).map((p) => p.id)
    if (missing.length) (failures++, console.log(`FAIL ${region}: never read in window: ${missing.join(', ')}`))
    else console.log(`${region}: all 53 weekly parshiot mapped from Hebcal titles`)
  }

  // Rule 2 unit checks: story half wins, otherwise the first half.
  const pickCases: [string[], string | null][] = [
    [['vayakhel', 'pekudei'], 'vayakhel'],
    [['matot', 'masei'], 'matot'],
    [['lech-lecha'], 'lech-lecha'],
    [[], null],
  ]
  for (const [ids, want] of pickCases) if (pickParsha(ids, fixedHasStory) !== want) (failures++, console.log(`FAIL pickParsha ${ids}`))
  if (pickParsha(['vayikra-x', 'vayikra'], fixedHasStory) !== 'vayikra') (failures++, console.log('FAIL pickParsha prefers story half'))

  // Named cases. Dates chosen from Hebcal's own calendar output; the oracle re-checks each.
  const D = fromYmd
  const named: [Region, YearData, Date, string][] = [
    ['diaspora', di, D('2026-03-10'), 'double: Vayakhel-Pekudei'],
    ['diaspora', di, D('2026-06-23'), 'double: Chukat-Balak (Diaspora only)'],
    ['israel', il, D('2026-06-23'), 'same week in Israel (single)'],
    ['diaspora', di, D('2026-07-07'), 'double: Matot-Masei'],
    ['diaspora', di, D('2026-09-01'), 'double: Nitzavim-Vayeilech'],
    ['diaspora', di, D('2026-03-31'), 'Pesach on Shabbat (Chol HaMoed)'],
    ['diaspora', di, D('2029-03-27'), 'Pesach I on Shabbat, then Pesach VIII'],
    ['diaspora', di, D('2029-04-03'), 'Pesach VIII on Shabbat (Diaspora)'],
    ['israel', il, D('2029-04-03'), 'same week in Israel'],
    ['diaspora', di, D('2027-06-08'), 'Shavuot II on Shabbat (Diaspora)'],
    ['israel', il, D('2027-06-08'), 'same week in Israel'],
    ['diaspora', di, D('2026-09-08'), 'Rosh Hashana on Shabbat'],
    ['diaspora', di, D('2028-09-26'), 'Yom Kippur on Shabbat'],
    ['diaspora', di, D('2025-10-07'), 'Sukkot Chol HaMoed on Shabbat'],
    ['diaspora', di, D('2026-09-22'), 'Sukkot I on Shabbat'],
    ['diaspora', di, D('2026-10-03'), 'Sat: Shmini Atzeret (still this week)'],
    ['israel', il, D('2026-10-03'), 'Sat: Shmini Atzeret/Simchat Torah, Israel'],
    ['diaspora', di, D('2026-10-04'), 'Sun: Simchat Torah → Bereshit'],
    ['diaspora', di, D('2026-10-10'), 'Sat: Bereshit read today'],
    ['diaspora', di, D('2026-10-11'), 'Sun: rolled over to Noach'],
    ['diaspora', di, D('2027-10-25'), 'Bereshit 2027 (past old Oct-2027 window)'],
    ['diaspora', di, D('2029-12-25'), 'end of 2029'],
  ]
  for (const [r, data, d, label] of named) await check(r, data, d, label)

  // What the app shows today and on each of the next 8 Shabbatot (checked on the Sunday that opens each week).
  for (const [r, data] of [['diaspora', di], ['israel', il]] as const) {
    await check(r, data, TODAY, 'TODAY')
    for (let w = 1; w <= 8; w++) {
      const sunday = addDays(upcomingShabbat(TODAY), 7 * w - 6)
      await check(r, data, sunday, `week +${w}`)
    }
  }

  // Rollover happens at local midnight whatever the time zone (run with TZ=… to see).
  const late = new Date(2026, 9, 10, 23, 59)
  const early = new Date(2026, 9, 11, 0, 1)
  const a = parshaForWeek(di, fromYmd(ymd(late)), hasStory)
  const b = parshaForWeek(di, fromYmd(ymd(early)), hasStory)
  console.log(`Rollover in ${Intl.DateTimeFormat().resolvedOptions().timeZone}: Sat 23:59 → ${a}; Sun 00:01 → ${b}`)
  if (a === b) (failures++, console.log('FAIL rollover did not advance at midnight'))

  const w = [2, 13, 42, 22, 0, 0]
  for (const r of rows) w.forEach((_, i) => (w[i] = Math.max(w[i], r[i].length)))
  const line = (r: string[]) => r.map((c, i) => c.padEnd(w[i])).join(' | ')
  console.log('\n' + line(['Rg', 'Date', 'Case', 'Shabbat', 'App shows', 'vs Hebcal /shabbat']))
  console.log(w.map((n) => '-'.repeat(n)).join('-|-'))
  for (const r of rows) console.log(line(r))
  console.log(`\n${rows.length} dated checks, ${failures} failure(s).`)
  process.exit(failures ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
