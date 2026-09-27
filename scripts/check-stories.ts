// Checks every Parsha Story file in src/redesign/stories/ without AI: structure, fields, verse
// references, places and cover art. It does not judge whether a claim is true; that is the
// parsha-fact-check workflow's job, and Myron's review.
//
//   npm run check:stories                    all stories
//   npm run check:stories -- bereshit noach  only these
//   npm run check:stories -- --strict        warnings fail too (use for new stories)
//
// Errors fail the run (exit 1). Warnings point at things a person should look at.
// The rules are listed in docs/plans/story-authoring.md ("What check:stories checks").
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import parshaList from '../src/data/parshaList.json'
import { BRIEF_BY_ID } from '../src/redesign/art/briefs'
import { displayName, parshaDisplayName, verseRange } from '../src/redesign/placeText'
import type { LngLat, ParshaStory, StoryCard, StoryCardKind } from '../src/redesign/story'
import { STORY_DIR, allStoryDirFiles, isStoryFile } from './storyFiles'

type Place = { id: string; name: string; alternateNames?: string[]; latitude: number | null; longitude: number | null; parshas?: string[] }
const PLACES = new Map<string, Place>(
  (JSON.parse(readFileSync(new URL('../src/data/places.json', import.meta.url), 'utf8')) as Place[]).map((p) => [p.id, p]),
)
const PARSHAS = new Map(parshaList.map((p) => [p.id, p]))

// ─── Rules ────────────────────────────────────────────────────────────────

const KINDS: StoryCardKind[] = ['cover', 'chapter', 'stars', 'name', 'talk', 'letter', 'plan', 'offerings', 'scale', 'quote', 'guess']
/** Every kind except the closing talk card must cite a verse. */
const NEEDS_REF = new Set<StoryCardKind>(KINDS.filter((k) => k !== 'talk'))
const NEEDS_BODY = new Set<StoryCardKind>(['cover', 'chapter', 'stars', 'name', 'letter', 'plan', 'scale', 'quote'])
const NEEDS_HEBREW = new Set<StoryCardKind>(['letter', 'quote'])
const NEEDS_ITEMS = new Set<StoryCardKind>(['offerings', 'scale'])
const AUDIENCES = ['Kids', 'Everyone', 'Deeper'] as const

const STORY_KEYS = ['parshaId', 'tagline', 'sources', 'route', 'anchor', 'cards', 'questions']
const CARD_KEYS = ['kind', 'title', 'body', 'ref', 'camera', 'routeTo', 'stop', 'spot', 'items', 'hebrew', 'note', 'image', 'act', 'options', 'reveal']
const CAMERA_KEYS = ['center', 'zoom', 'pitch', 'bearing']
const STOP_KEYS = ['name', 'at', 'place', 'via', 'hedge']
const SPOT_KEYS = ['name', 'at', 'place']
const ITEM_KEYS = ['he', 'en', 'note']
const OPTION_KEYS = ['label', 'he', 'at', 'place', 'correct']
const QUESTION_KEYS = ['audience', 'text']

/** A route stop or anchor must sit this close to its places.json pin. */
const MAX_STOP_KM = 10
/** Everything the stories show lies in this box; a point outside it is usually a swapped [lng, lat]. */
const REGION = { lng: [20, 60], lat: [10, 45] }

const TANAKH = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'I Samuel', 'II Samuel', '1 Samuel', '2 Samuel',
  'I Kings', 'II Kings', '1 Kings', '2 Kings', 'Isaiah', 'Jeremiah', 'Ezekiel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
  'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Psalms', 'Proverbs', 'Job', 'Song of Songs', 'Ruth',
  'Lamentations', 'Ecclesiastes', 'Esther', 'Daniel', 'Ezra', 'Nehemiah', 'I Chronicles', 'II Chronicles', '1 Chronicles', '2 Chronicles',
]
/** Named works a note or body may cite; each one named must appear in the story's `sources`. */
const WORKS = [
  'Rashi', 'Ramban', 'Nachmanides', 'Ibn Ezra', 'Radak', 'Rashbam', 'Sforno', 'Chizkuni', 'Or HaChaim', 'Onkelos', 'Targum',
  'Baal HaTurim', 'Seder Olam', 'Mekhilta', 'Sifra', 'Sifrei', 'Tanchuma', 'Bereshit Rabbah', 'Shemot Rabbah', 'Vayikra Rabbah',
  'Bamidbar Rabbah', 'Devarim Rabbah', 'Maimonides', 'Rambam', 'Mishnah', 'Menachot', 'Bava Batra', 'Berakhot', 'Sanhedrin',
]

// ─── Verse references ─────────────────────────────────────────────────────

const bookAt = (s: string) => [...TANAKH].sort((a, b) => b.length - a.length).find((b) => s === b || s.startsWith(b + ' '))

/** "12:1 – 17:27", "1–5, 7:8", "27:1, 18; 40:29–30", "1:1 and 2:13" → the chapters it touches, or null if unreadable. */
function chaptersIn(rest: string): number[] | null {
  const out: number[] = []
  let cur: number | null = null
  const pieces = rest.replace(/\s*[–—-]\s*/g, '-').split(/\s*(?:[;,]|\band\b)\s*/).filter(Boolean)
  for (const p of pieces) {
    let m = p.match(/^(\d+):(\d+)(?:-(?:(\d+):)?(\d+))?$/)
    if (m) {
      const a = Number(m[1])
      const b = m[3] ? Number(m[3]) : a
      if (b < a) return null
      for (let c = a; c <= b; c++) out.push(c)
      cur = b
      continue
    }
    m = p.match(/^(\d+)(?:-(\d+))?$/)
    if (!m) return null
    if (cur !== null) continue // a verse in the chapter already named ("27:1, 18")
    const a = Number(m[1])
    const b = m[2] ? Number(m[2]) : a
    if (b < a) return null
    for (let c = a; c <= b; c++) out.push(c)
  }
  return out.length ? out : null
}

type VerseRef = { book: string; chapters: number[] }
/** A citation that starts with a book name ("Leviticus 1:1, 7:38"), or null if it names a work ("Rashi"). */
function verseRef(segment: string): VerseRef | null | 'unreadable' {
  const s = segment.replace(/\s*\(.*?\)\s*/g, ' ').trim()
  const book = bookAt(s)
  if (!book) return null
  const chapters = chaptersIn(s.slice(book.length).trim())
  return chapters ? { book, chapters } : 'unreadable'
}

/** Verse citations inside running text: "Judges 18:29", "Rashi (on Exodus 12:40)", "Exodus 26:32, 27:18". */
function citationsIn(text: string): VerseRef[] {
  const books = [...TANAKH].sort((a, b) => b.length - a.length).map((b) => b.replace(/ /g, '\\s'))
  const re = new RegExp(`\\b(${books.join('|')})\\s+(\\d+:\\d+(?:\\s*[–-]\\s*\\d+(?::\\d+)?)?(?:\\s*[,;]\\s*\\d+:\\d+(?:\\s*[–-]\\s*\\d+)?)*)`, 'g')
  const out: VerseRef[] = []
  for (const m of text.matchAll(re)) {
    const chapters = chaptersIn(m[2])
    if (chapters) out.push({ book: m[1], chapters })
  }
  return out
}

// ─── Checking one story ───────────────────────────────────────────────────

const km = (a: LngLat, b: LngLat) => {
  const r = Math.PI / 180
  const dLat = (b[1] - a[1]) * r
  const dLng = (b[0] - a[0]) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
const text = (v: unknown) => typeof v === 'string' && v.trim().length > 0
const HEBREW = /[֐-׿]/

interface Report {
  errors: string[]
  warnings: string[]
}

function checkStory(file: string, story: ParshaStory, source: string, hasEmblem: (id: string) => boolean): Report {
  const errors: string[] = []
  const warnings: string[] = []
  const err = (where: string, msg: string) => errors.push(`${where}: ${msg}`)
  const warn = (where: string, msg: string) => warnings.push(`${where}: ${msg}`)
  const keys = (where: string, o: Record<string, unknown>, allowed: string[]) => {
    for (const k of Object.keys(o)) if (!allowed.includes(k)) err(where, `unknown field "${k}" (allowed: ${allowed.join(', ')})`)
  }
  const lngLat = (where: string, v: unknown): v is LngLat => {
    if (!Array.isArray(v) || v.length !== 2 || !v.every((n) => typeof n === 'number' && Number.isFinite(n))) {
      err(where, 'must be [longitude, latitude]')
      return false
    }
    const [lng, lat] = v as LngLat
    if (lng < REGION.lng[0] || lng > REGION.lng[1] || lat < REGION.lat[0] || lat > REGION.lat[1]) {
      err(where, `[${lng}, ${lat}] is outside the region the stories cover (did you swap longitude and latitude?)`)
      return false
    }
    return true
  }
  const unlinked = new Set<string>()
  const place = (where: string, id: unknown, required: boolean): Place | null => {
    if (id === undefined) {
      if (required) err(where, 'needs `place`, the places.json id of this stop')
      return null
    }
    if (typeof id !== 'string' || !PLACES.has(id)) {
      err(where, `place "${String(id)}" is not an id in src/data/places.json`)
      return null
    }
    const p = PLACES.get(id)!
    if (!p.parshas?.includes(story.parshaId) && !unlinked.has(id)) {
      unlinked.add(id)
      warn(where, `${p.name} (${id}) is not linked to ${story.parshaId} in places.json (its verses there are in other parshiot); make sure the story says why it is shown`)
    }
    return p
  }
  /** A stop or anchor must resolve: a pinned place, and `at` on that pin. */
  const resolves = (where: string, at: LngLat, p: Place | null) => {
    if (!p) return
    if (p.latitude == null || p.longitude == null) {
      err(where, `${p.name} (${p.id}) has no pin in places.json (site unknown); it can't be a numbered stop or anchor`)
      return
    }
    const pin: LngLat = [p.longitude, p.latitude]
    const d = km(at, pin)
    const swapped = km([at[1], at[0]], pin) <= MAX_STOP_KM ? '; longitude and latitude look swapped' : ''
    if (d > MAX_STOP_KM) err(where, `at [${at}] is ${d.toFixed(1)} km from ${p.name}'s pin [${pin}] (limit ${MAX_STOP_KM} km${swapped})`)
  }

  // File and story.
  if (!isObj(story)) return { errors: [`${file}: no default export (end the file with \`export default <story>\`)`], warnings }
  keys('story', story as unknown as Record<string, unknown>, STORY_KEYS)
  const parsha = PARSHAS.get(story.parshaId)
  if (!parsha) err('story', `parshaId "${story.parshaId}" is not in src/data/parshaList.json`)
  if (file !== `${story.parshaId}.ts`) err('story', `file name ${file} must be ${story.parshaId}.ts`)
  if (!text(story.tagline)) err('story', 'tagline is missing')
  if (parsha) {
    const header = `// ${parshaDisplayName(parsha.name)} — ${verseRange(parsha.seferiaUrl)}`
    if (!source.startsWith(header)) err('header', `the file must open with a header comment starting "${header}"`)
  }
  if (!source.includes('run the parsha-fact-check workflow')) err('header', 'the header must say to run the parsha-fact-check workflow on any change (copy it from _template.ts)')
  if (!hasEmblem(story.parshaId) || !BRIEF_BY_ID[story.parshaId]) err('cover', `no papercut emblem for "${story.parshaId}" in src/redesign/art/ (SCENES + briefs.ts)`)

  // Sources.
  const plainSources: VerseRef[] = []
  if (!Array.isArray(story.sources) || !story.sources.length || !story.sources.every(text)) err('sources', 'needs a non-empty list of sources (verse ranges and named works)')
  else
    for (const s of story.sources) {
      const v = verseRef(s)
      if (v === 'unreadable') err('sources', `can't read the verses in "${s}"`)
      else if (v) plainSources.push(v)
    }
  const sources = Array.isArray(story.sources) ? story.sources.filter(text) : []
  const covered = (v: VerseRef) => v.chapters.filter((c) => !plainSources.some((s) => s.book === v.book && s.chapters.includes(c)))
  const namesWork = (name: string) => sources.some((s) => s.includes(name))

  // Route and anchor.
  const route = Array.isArray(story.route) ? story.route : (err('route', 'must be an array (empty when there is no journey)'), [])
  route.forEach((s, i) => {
    const where = `route[${i}] ${s?.name ?? ''}`.trim()
    if (!isObj(s)) return err(where, 'must be an object')
    keys(where, s as unknown as Record<string, unknown>, STOP_KEYS)
    if (!text(s.name)) err(where, 'name is missing')
    const ok = lngLat(`${where} at`, s.at)
    if (s.via !== undefined) lngLat(`${where} via`, s.via)
    const p = place(where, s.place, true)
    if (p && text(s.name) && displayName(p.name) !== s.name && !(p.alternateNames ?? []).includes(s.name))
      err(where, `name "${s.name}" doesn't match places.json ${p.id} "${p.name}"`)
    if (ok) resolves(where, s.at, p)
  })
  if (story.anchor !== undefined) {
    const a = story.anchor
    if (!isObj(a)) err('anchor', 'must be an object')
    else {
      keys('anchor', a as unknown as Record<string, unknown>, STOP_KEYS)
      if (!text(a.name)) err('anchor', 'name is missing')
      const ok = lngLat('anchor at', a.at)
      const p = place('anchor', a.place, true)
      if (ok) resolves('anchor', a.at, p)
    }
  } else if (!route.length) warn('story', 'no route and no anchor: the cover has no place line, and the map has nothing to hold on')

  // Cards.
  const cards = Array.isArray(story.cards) ? story.cards : (err('cards', 'must be an array'), [])
  if (cards.length < 3) err('cards', 'a story needs at least a cover, one card and a talk card')
  if (cards[0]?.kind !== 'cover') err('cards', 'the first card must be the cover')
  if (cards.at(-1)?.kind !== 'talk') err('cards', 'the last card must be the talk card (the finale)')
  if (cards.filter((c) => c?.kind === 'cover').length > 1) err('cards', 'only one cover card')
  if (cards.filter((c) => c?.kind === 'talk').length > 1) err('cards', 'only one talk card')
  const maxRoute = Math.max(0, route.length - 1)

  cards.forEach((c: StoryCard, i) => {
    const where = `card ${i} (${c?.kind ?? '?'})`
    if (!isObj(c)) return err(where, 'must be an object')
    keys(where, c as unknown as Record<string, unknown>, CARD_KEYS)
    if (!KINDS.includes(c.kind)) err(where, `unknown kind "${c.kind}" (one of ${KINDS.join(', ')})`)
    if (!text(c.title)) err(where, 'title is missing')
    if (NEEDS_BODY.has(c.kind) && !text(c.body)) err(where, `the ${c.kind} card needs a body`)
    for (const f of ['body', 'note', 'act', 'reveal', 'image'] as const) if (c[f] !== undefined && !text(c[f])) err(where, `${f} is empty`)

    // Verse reference.
    if (NEEDS_REF.has(c.kind)) {
      if (!text(c.ref)) err(where, `the ${c.kind} card needs a verse reference (ref)`)
      else {
        const segs = c.ref!.split(' · ').map((s) => s.trim())
        const refs = segs.map(verseRef)
        if (!refs.some((r) => r && r !== 'unreadable')) err(where, `ref "${c.ref}" has no verse reference (it must name a book, chapter and verse, e.g. "Genesis 12:1–5")`)
        segs.forEach((seg, k) => {
          const r = refs[k]
          if (r === 'unreadable') err(where, `can't read the verses in ref "${seg}"`)
          else if (r) {
            const missing = covered(r)
            if (missing.length) err(where, `ref "${seg}": ${r.book} ${missing.join(', ')} not covered by the story's sources`)
          } else if (!namesWork(seg)) err(where, `ref "${seg}" is not in the story's sources`)
        })
      }
    } else if (c.ref !== undefined && !text(c.ref)) err(where, 'ref is empty')

    // Citations inside the text: warn when the sources list doesn't carry them.
    const prose = [c.body, c.note, c.reveal, ...(c.items ?? []).map((it) => it?.note)].filter(text).join(' ')
    for (const v of citationsIn(prose)) {
      const missing = covered(v)
      if (missing.length) warn(where, `the text cites ${v.book} ${missing.join(', ')}, which is not in sources`)
    }
    for (const w of WORKS) if (new RegExp(`\\b${w}\\b`).test(prose) && !namesWork(w)) warn(where, `the text cites ${w}, which is not in sources`)

    // Camera and map.
    if (!isObj(c.camera)) err(where, 'camera is missing')
    else {
      keys(`${where} camera`, c.camera as unknown as Record<string, unknown>, CAMERA_KEYS)
      lngLat(`${where} camera.center`, c.camera.center)
      const { zoom, pitch = 0, bearing = 0 } = c.camera
      if (typeof zoom !== 'number' || zoom < 0 || zoom > 22) err(where, `camera.zoom ${zoom} must be 0–22`)
      if (typeof pitch !== 'number' || pitch < 0 || pitch > 85) err(where, `camera.pitch ${pitch} must be 0–85`)
      if (typeof bearing !== 'number' || bearing < -360 || bearing > 360) err(where, `camera.bearing ${bearing} must be -360–360`)
    }
    if (typeof c.routeTo !== 'number' || c.routeTo < 0 || c.routeTo > maxRoute) err(where, `routeTo ${c.routeTo} must be 0–${maxRoute} (an index along the route)`)
    if (c.stop !== undefined && (!Number.isInteger(c.stop) || c.stop < 1 || c.stop > route.length))
      err(where, route.length ? `stop ${c.stop} must be 1–${route.length} (a numbered route stop)` : `stop ${c.stop}: this story has no route`)
    if (c.spot !== undefined) {
      if (!isObj(c.spot)) err(where, 'spot must be { name, at, place? }')
      else {
        keys(`${where} spot`, c.spot as unknown as Record<string, unknown>, SPOT_KEYS)
        if (!text(c.spot.name)) err(where, 'spot.name is missing')
        lngLat(`${where} spot.at`, c.spot.at)
        place(`${where} spot`, c.spot.place, false)
      }
    }

    // Kind-specific content.
    if (NEEDS_HEBREW.has(c.kind) && !(text(c.hebrew) && HEBREW.test(c.hebrew!))) err(where, `the ${c.kind} card needs a Hebrew line (hebrew)`)
    if (c.hebrew !== undefined && !NEEDS_HEBREW.has(c.kind)) warn(where, '`hebrew` is only shown on letter and quote cards')
    if (NEEDS_ITEMS.has(c.kind) && !(Array.isArray(c.items) && c.items.length)) err(where, `the ${c.kind} card needs items`)
    if (c.items !== undefined && !NEEDS_ITEMS.has(c.kind)) warn(where, '`items` are only shown on offerings and scale cards')
    ;(c.items ?? []).forEach((it, k) => {
      if (!isObj(it)) return err(`${where} item ${k}`, 'must be an object')
      keys(`${where} item ${k}`, it as unknown as Record<string, unknown>, ITEM_KEYS)
      if (!text(it.en)) err(`${where} item ${k}`, 'en is missing')
      if (it.he !== undefined && !HEBREW.test(it.he)) err(`${where} item ${k}`, `he "${it.he}" has no Hebrew letters`)
    })
    if (c.kind === 'guess') {
      const opts = Array.isArray(c.options) ? c.options : []
      if (opts.length < 2 || opts.length > 4) err(where, 'a guess card needs 2–4 options')
      if (opts.filter((o) => o?.correct === true).length !== 1) err(where, 'exactly one option must be correct')
      const pinned = opts.filter((o) => o?.at !== undefined).length
      if (pinned && pinned !== opts.length) err(where, 'pin every option (at) or none')
      if (new Set(opts.map((o) => o?.label)).size !== opts.length) err(where, 'option labels must be different')
      opts.forEach((o, k) => {
        const ow = `${where} option ${k}`
        if (!isObj(o)) return err(ow, 'must be an object')
        keys(ow, o as unknown as Record<string, unknown>, OPTION_KEYS)
        if (!text(o.label)) err(ow, 'label is missing')
        if (o.he !== undefined && !HEBREW.test(o.he)) err(ow, `he "${o.he}" has no Hebrew letters`)
        if (o.at !== undefined) lngLat(`${ow} at`, o.at)
        place(ow, o.place, false)
      })
    } else {
      if (c.options !== undefined) err(where, '`options` belong on guess cards only')
      if (c.reveal !== undefined) err(where, '`reveal` belongs on guess cards only')
    }

    // Cover: everything on it comes from the parsha record, so it can't drift.
    if (c.kind === 'cover' && parsha) {
      if (c.title !== parshaDisplayName(parsha.name)) err(where, `title must be "${parshaDisplayName(parsha.name)}"`)
      if (c.body !== story.tagline) err(where, 'body must be the story tagline')
      if (c.ref !== verseRange(parsha.seferiaUrl)) err(where, `ref must be the parsha's range "${verseRange(parsha.seferiaUrl)}"`)
      if (c.image !== undefined && hasEmblem(story.parshaId)) warn(where, '`image` is ignored: the papercut emblem is the cover')
      if (c.routeTo !== 0) err(where, 'the cover shows no route yet (routeTo 0)')
    }
    if (c.image !== undefined && c.kind !== 'cover') warn(where, '`image` is only shown on the cover')
  })

  // Questions for the table.
  const qs = Array.isArray(story.questions) ? story.questions : []
  if (qs.length !== 3) err('questions', 'needs exactly three questions: Kids, Everyone, Deeper')
  qs.forEach((q, k) => {
    if (!isObj(q)) return err(`question ${k}`, 'must be an object')
    keys(`question ${k}`, q as unknown as Record<string, unknown>, QUESTION_KEYS)
    if (q.audience !== AUDIENCES[k]) err(`question ${k}`, `audience must be "${AUDIENCES[k]}" (order: ${AUDIENCES.join(', ')})`)
    if (!text(q.text)) err(`question ${k}`, 'text is missing')
  })

  return { errors, warnings }
}

// ─── Run ──────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const strict = args.includes('--strict')
  const only = args.filter((a) => !a.startsWith('--'))

  // The same function the app uses to decide whether a parsha has cover art.
  const art = await import(pathToFileURL(join(STORY_DIR, '../art/EmblemArt.tsx')).href)
  const hasEmblem = art.hasEmblem as (id: string) => boolean

  const files = allStoryDirFiles()
  let errors = 0
  let warnings = 0
  for (const f of files) {
    if (!isStoryFile(f) && !f.startsWith('_') && f !== 'index.ts') {
      console.log(`✗ ${f}: not a story file (stories are src/redesign/stories/<parshaId>.ts); it is not registered`)
      errors++
    }
  }
  const storyFiles = files.filter(isStoryFile).filter((f) => !only.length || only.includes(f.slice(0, -3)))
  for (const id of only) if (!storyFiles.includes(`${id}.ts`)) (errors++, console.log(`✗ no story file src/redesign/stories/${id}.ts`))

  const seen = new Map<string, string>()
  for (const f of storyFiles) {
    const path = join(STORY_DIR, f)
    let story: ParshaStory
    try {
      story = (await import(pathToFileURL(path).href)).default
    } catch (e) {
      console.log(`\n✗ ${f}: failed to load: ${(e as Error).message}`)
      errors++
      continue
    }
    const report = checkStory(f, story, readFileSync(path, 'utf8'), hasEmblem)
    if (story?.parshaId && seen.has(story.parshaId)) report.errors.push(`story: parshaId "${story.parshaId}" is also used by ${seen.get(story.parshaId)}`)
    if (story?.parshaId) seen.set(story.parshaId, f)

    const cards = Array.isArray(story?.cards) ? story.cards.length : 0
    const mark = report.errors.length ? '✗' : report.warnings.length ? '!' : '✓'
    console.log(`\n${mark} ${f}: ${cards} cards, ${report.errors.length} error(s), ${report.warnings.length} warning(s)`)
    for (const e of report.errors) console.log(`  ✗ ${e}`)
    for (const w of report.warnings) console.log(`  ! ${w}`)
    errors += report.errors.length
    warnings += report.warnings.length
  }

  console.log(`\n${storyFiles.length} stor${storyFiles.length === 1 ? 'y' : 'ies'} checked: ${errors} error(s), ${warnings} warning(s)${strict ? ' (strict: warnings fail)' : ''}.`)
  process.exit(errors || (strict && warnings) ? 1 : 0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
