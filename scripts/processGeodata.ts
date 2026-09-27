/**
 * processGeodata.ts
 *
 * Downloads the OpenBible Bible-Geocoding-Data ancient.jsonl,
 * cross-references verse OSISes with parshaList.json,
 * and writes src/data/places.json.
 *
 * Run with: npx tsx scripts/processGeodata.ts
 * Or:       npm run geodata
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT_PATH = path.join(ROOT, 'src', 'data', 'places.json')

// ---------------------------------------------------------------------------
// OSIS book name to canonical name map
// OSIS format: Gen, Exod, Lev, Num, Deut, ...
// ---------------------------------------------------------------------------
const OSIS_TO_BOOK: Record<string, string> = {
  Gen: 'Genesis',
  Exod: 'Exodus',
  Lev: 'Leviticus',
  Num: 'Numbers',
  Deut: 'Deuteronomy',
  Josh: 'Joshua',
  Judg: 'Judges',
  Ruth: 'Ruth',
  '1Sam': '1 Samuel',
  '2Sam': '2 Samuel',
  '1Kgs': '1 Kings',
  '2Kgs': '2 Kings',
  '1Chr': '1 Chronicles',
  '2Chr': '2 Chronicles',
  Ezra: 'Ezra',
  Neh: 'Nehemiah',
  Esth: 'Esther',
  Job: 'Job',
  Ps: 'Psalms',
  Prov: 'Proverbs',
  Eccl: 'Ecclesiastes',
  Song: 'Song of Songs',
  Isa: 'Isaiah',
  Jer: 'Jeremiah',
  Lam: 'Lamentations',
  Ezek: 'Ezekiel',
  Dan: 'Daniel',
  Hos: 'Hosea',
  Joel: 'Joel',
  Amos: 'Amos',
  Obad: 'Obadiah',
  Jonah: 'Jonah',
  Mic: 'Micah',
  Nah: 'Nahum',
  Hab: 'Habakkuk',
  Zeph: 'Zephaniah',
  Hag: 'Haggai',
  Zech: 'Zechariah',
  Mal: 'Malachi',
}

// ---------------------------------------------------------------------------
// Versification. OpenBible's OSIS refs use English (KJV-style) verse numbers;
// parshaList.json's seferiaUrl ranges and Sefaria's links use the Hebrew
// (Masoretic) numbers. Where the two differ, a place tagged by its English
// number can land in the wrong parsha: English Genesis 32:3 (Esau in Seir) is
// Hebrew 32:4, the first verse of Vayishlach, not the last of Vayetze. Every
// English→Hebrew shift in the Torah is listed here (checked against Sefaria's
// Hebrew chapter lengths); refs are converted before tagging and display.
// Each rule: English chapter + verse span → Hebrew chapter, verse = v + shift
// (or a fixed verse when several English verses make one Hebrew verse).
// ---------------------------------------------------------------------------
type Shift = { ch: number; from: number; to: number; hebCh: number; shift?: number; verse?: number }
const ENGLISH_TO_HEBREW: Record<string, Shift[]> = {
  Gen: [
    { ch: 31, from: 55, to: 55, hebCh: 32, verse: 1 },
    { ch: 32, from: 1, to: 32, hebCh: 32, shift: 1 },
  ],
  Exod: [
    { ch: 8, from: 1, to: 4, hebCh: 7, shift: 25 },
    { ch: 8, from: 5, to: 32, hebCh: 8, shift: -4 },
    // "You shall not murder / commit adultery / steal / bear false witness" are one Hebrew verse, 20:13.
    { ch: 20, from: 14, to: 16, hebCh: 20, verse: 13 },
    { ch: 20, from: 17, to: 26, hebCh: 20, shift: -3 },
    { ch: 22, from: 1, to: 1, hebCh: 21, verse: 37 },
    { ch: 22, from: 2, to: 31, hebCh: 22, shift: -1 },
  ],
  Lev: [
    { ch: 6, from: 1, to: 7, hebCh: 5, shift: 19 },
    { ch: 6, from: 8, to: 30, hebCh: 6, shift: -7 },
  ],
  Num: [
    { ch: 16, from: 36, to: 50, hebCh: 17, shift: -35 },
    { ch: 17, from: 1, to: 13, hebCh: 17, shift: 15 },
    { ch: 29, from: 40, to: 40, hebCh: 30, verse: 1 },
    { ch: 30, from: 1, to: 16, hebCh: 30, shift: 1 },
  ],
  Deut: [
    { ch: 5, from: 18, to: 20, hebCh: 5, verse: 17 },
    { ch: 5, from: 21, to: 33, hebCh: 5, shift: -3 },
    { ch: 12, from: 32, to: 32, hebCh: 13, verse: 1 },
    { ch: 13, from: 1, to: 18, hebCh: 13, shift: 1 },
    { ch: 22, from: 30, to: 30, hebCh: 23, verse: 1 },
    { ch: 23, from: 1, to: 25, hebCh: 23, shift: 1 },
    { ch: 29, from: 1, to: 1, hebCh: 28, verse: 69 },
    { ch: 29, from: 2, to: 29, hebCh: 29, shift: -1 },
  ],
}

// "Gen.32.3" (English numbering) → "Gen.32.4" (Hebrew numbering)
function toHebrewVersification(osis: string): string {
  const [book, chStr, vStr] = osis.split('.')
  const ch = Number(chStr)
  const v = Number(vStr)
  if (!vStr) return osis
  for (const r of ENGLISH_TO_HEBREW[book] ?? []) {
    if (r.ch === ch && v >= r.from && v <= r.to) {
      return `${book}.${r.hebCh}.${r.verse ?? v + (r.shift ?? 0)}`
    }
  }
  return osis
}

// Convert OSIS ref "Gen.12.4" → "Genesis 12:4"
function osisToVerseRef(osis: string): string {
  const parts = osis.split('.')
  const bookOsis = parts[0]
  const chapter = parts[1]
  const verse = parts[2]
  const book = OSIS_TO_BOOK[bookOsis] ?? bookOsis
  if (chapter && verse) return `${book} ${chapter}:${verse}`
  if (chapter) return `${book} ${chapter}`
  return book
}

// Canonical order for OSIS refs within the Torah books (used when adding verses).
function sortOsises(osises: string[]): string[] {
  const books = Object.keys(OSIS_TO_BOOK)
  const key = (o: string) => {
    const [b, c, v] = o.split('.')
    return books.indexOf(b) * 1e6 + Number(c ?? 0) * 1e3 + Number(v ?? 0)
  }
  return [...osises].sort((a, b) => key(a) - key(b))
}

// OpenBible disambiguates homonyms with a numeric suffix ("Bethel 1") and its descriptions refer to places that
// way ("another name for Bethel 1"). Readers should see only the name, so the suffix is stripped from any
// gazetteer name inside a description. A description that then only restates the place's own name
// ("Gilead 1" on Gilead 1, "another name for Timnah 2" on Timnah 3) is dropped.
function descriptionCleaner(allNames: string[]) {
  const suffixed = [...new Set(allNames.filter((n) => /\s\d+$/.test(n)))].sort((a, b) => b.length - a.length)
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = suffixed.length ? new RegExp(`(?<![\\w-])(${suffixed.map(escape).join('|')})(?![\\w:-])`, 'g') : null
  const bare = (n: string) => n.replace(/\s+\d+$/, '')
  return (description: string, ownName: string): string | undefined => {
    const cleaned = pattern ? description.replace(pattern, (m) => bare(m)) : description
    const own = bare(ownName)
    if (cleaned === own || cleaned === `another name for ${own}`) return undefined
    return cleaned
  }
}

// ---------------------------------------------------------------------------
// Load parshaList and build verse-range lookup
// ---------------------------------------------------------------------------
interface ParshaEntry {
  id: string
  seferiaUrl: string
  book: string
}

const parshaList: ParshaEntry[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'data', 'parshaList.json'), 'utf8')
)

function parseSeferiaUrl(url: string): {
  book: string
  startChapter: number
  startVerse: number
  endChapter: number
  endVerse: number
} {
  // "Genesis.12.1-17.27" or "Genesis.12.1"
  const dotParts = url.split('.')
  const book = dotParts[0].replace(/_/g, ' ')
  const rest = dotParts.slice(1).join('.')
  const [startStr, endStr] = rest.split('-')

  function parseCV(s: string) {
    const [ch, v] = s.split('.').map(Number)
    return { chapter: ch ?? 1, verse: v ?? 1 }
  }

  const start = parseCV(startStr)
  const end = endStr ? parseCV(endStr) : start

  return {
    book,
    startChapter: start.chapter,
    startVerse: start.verse,
    endChapter: end.chapter,
    endVerse: end.verse,
  }
}

interface VerseRange {
  parshaId: string
  book: string
  startChapter: number
  startVerse: number
  endChapter: number
  endVerse: number
}

const parshaRanges: VerseRange[] = parshaList.map((p) => ({
  parshaId: p.id,
  ...parseSeferiaUrl(p.seferiaUrl),
}))

function getParshasForOsises(osises: string[]): string[] {
  const ids = new Set<string>()
  for (const osis of osises) {
    const parts = osis.split('.')
    const bookOsis = parts[0]
    const chapter = parseInt(parts[1] ?? '0')
    const verse = parseInt(parts[2] ?? '0')
    const book = OSIS_TO_BOOK[bookOsis]
    if (!book) continue

    for (const range of parshaRanges) {
      if (range.book !== book) continue
      const vNum = chapter * 1000 + verse
      const startNum = range.startChapter * 1000 + range.startVerse
      const endNum = range.endChapter * 1000 + range.endVerse
      if (vNum >= startNum && vNum <= endNum) {
        ids.add(range.parshaId)
      }
    }
  }
  return Array.from(ids)
}

// ---------------------------------------------------------------------------
// Main processing
// ---------------------------------------------------------------------------

const ANCIENT_JSONL_URL =
  'https://raw.githubusercontent.com/openbibleinfo/Bible-Geocoding-Data/master/data/ancient.jsonl'

// ---------------------------------------------------------------------------
// Places whose site is unknown: listed with no pin.
// OpenBible resolves these to another place's exact point, which the verse
// contradicts. Keyed by OpenBible id; `note` replaces the description.
// ---------------------------------------------------------------------------
const UNPINNED: Record<string, { name: string; note: string }> = {
  // Genesis 14:15: "Hobah, which is on the left hand (north) of Damascus". OpenBible pins it on Damascus itself.
  a6779cd: { name: 'Hobah', note: 'north of Damascus; site unknown' },
  // Genesis 16:14: Beer-lahai-roi is "between Kadesh and Bered", so Bered can't share the well's point.
  aa3ff18: { name: 'Bered', note: 'site unknown' },
  // Genesis 22:14 names the site of the binding "Adonai-yireh"; 22:2 puts it in the land of Moriah. OpenBible pins it on Mamre.
  a559399: { name: 'The Lord Will Provide', note: 'in the land of Moriah (Genesis 22:2, 14); site unknown' },
  // Genesis 14:1: "Tidal king of Goiim". OpenBible pins it on Damascus.
  a9796ee: { name: 'Goiim 1', note: 'site unknown' },
  // Numbers 34:4: the border runs south of Kadesh-barnea, then to Hazar-addar. OpenBible pins it on Kadesh-barnea itself.
  a3f301c: { name: 'Hazar-addar', note: 'on the southern border, past Kadesh-barnea (Numbers 34:4); site unknown' },

  // Genesis 2:8-14 places Eden only "in the east"; of its four rivers only the Tigris and Euphrates can be
  // identified. OpenBible pins Eden, Cush and Havilah on Babylon, Gihon in Uganda and Pishon on the Karun.
  af3daeb: { name: 'Eden 1', note: 'the garden "in Eden, in the east" (Genesis 2:8); site unknown — of its four rivers only the Tigris and Euphrates can be identified' },
  a74ee0d: { name: 'Cush 2', note: 'the land the Gihon winds through (Genesis 2:13); identification uncertain' },
  ad7e819: { name: 'Havilah 1', note: 'the land the Pishon winds through, where there is gold (Genesis 2:11-12); identification uncertain' },
  a71d79b: { name: 'Gihon 1', note: 'a river of Eden that winds through the land of Cush (Genesis 2:13); unidentified' },
  a19b076: { name: 'Pishon', note: 'a river of Eden that winds through Havilah (Genesis 2:11); unidentified — Rashi identifies it with the Nile' },
  // Genesis 10:11 lists Rehoboth-ir as a city in its own right, beside Nineveh and Calah. OpenBible pins it on Nineveh.
  a260ff1: { name: 'Rehoboth-Ir', note: 'listed with Nineveh and Calah (Genesis 10:11); site unknown' },
  // The cities of the Plain (Genesis 13:10-12; 14:2-3, "the Valley of Siddim, now the Dead Sea"). OpenBible's best
  // scores mix rival theories: Sodom at Tall el-Hammam (north), Admah at Tall Nimrin, Gomorrah and Zeboiim in the south.
  a0aa664: { name: 'Sodom', note: 'one of the cities of the Plain near the Dead Sea (Genesis 13:10-12; 14:2-3); site unknown — proposals include Bab edh-Dhra (south) and Tall el-Hammam (north), both disputed' },
  aa572e2: { name: 'Gomorrah', note: 'one of the cities of the Plain near the Dead Sea (Genesis 14:2-3); site unknown' },
  a41a054: { name: 'Admah', note: 'one of the cities of the Plain near the Dead Sea (Genesis 14:2-3); site unknown' },
  abfbfb9: { name: 'Zeboiim', note: 'one of the cities of the Plain near the Dead Sea (Genesis 14:2-3); site unknown' },
  // Genesis 26:19-21: wells Isaac's servants dug "in the wadi" of Gerar. OpenBible pins both on one point north of Gerar.
  a43608b: { name: 'Esek', note: "a well Isaac's servants dug in the wadi of Gerar (Genesis 26:19-20); site unknown" },
  aa454f7: { name: 'Sitnah', note: "a second well Isaac's servants dug near Gerar (Genesis 26:21); site unknown" },
  // Genesis 29:1-4: "the land of the Easterners", where the shepherds are from Haran. OpenBible pins "the East" on Amman.
  ab0b2dd: { name: 'East', note: '"the East" (Kedem): a general term for the lands east of Canaan (Genesis 25:6; 29:1), not one site' },
  // Genesis 36:37 "Rehoboth-on-the-river": Onkelos reads the river as the Euphrates; others place the town in Edom.
  a17e154: { name: 'Rehoboth 2', note: 'Rehoboth-on-the-river (Genesis 36:37); site unknown — Onkelos puts it on the Euphrates, others in Edom' },
  // Genesis 50:10-11: Goren ha-Atad / Abel-mizraim is "beyond the Jordan". OpenBible pins both on the west bank.
  a70ac98: { name: 'Abel-mizraim', note: '"beyond the Jordan" (Genesis 50:10-11); site unknown' },
  a2f186d: { name: 'Atad', note: 'Goren ha-Atad, "the threshing floor of Atad", "beyond the Jordan" (Genesis 50:10-11); site unknown' },
}

// ---------------------------------------------------------------------------
// OpenBible entries that are not places at all. Dropped from places.json.
// ---------------------------------------------------------------------------
const EXCLUDED: Record<string, { name: string }> = {
  // Genesis 36:39 "Mehetabel daughter of Matred daughter of Me-zahab": a person (OpenBible's own top reading).
  a3498b5: { name: 'Mezahab' },
  // Genesis 36:37 "Rehoboth-on-the-river": the common noun "river" in that name, not a separate place.
  a3bb384: { name: 'River 3' },
}

// ---------------------------------------------------------------------------
// Places where a lower-scored OpenBible identification fits the text better than
// the top-scored one. `match` selects the identification by its description.
// ---------------------------------------------------------------------------
const PICKED: Record<string, { name: string; match: string; note: string; confidence?: PlaceOutput['confidence'] }> = {
  // Genesis 22:2 "the land of Moriah"; 2 Chronicles 3:1 puts Solomon's Temple "on Mount Moriah". The top score is
  // Al-Eizariya, 2 km east of the Temple Mount.
  adaf385: { name: 'Moriah', match: 'Mount Moriah', note: 'the land of Moriah (Genesis 22:2); tradition identifies it with the Temple Mount (2 Chronicles 3:1)', confidence: 'low' },
  // Byzantine Zoara (the Madaba Map's "Segor") is at Ghor es-Safi. The top score is the Valley of Siddim point.
  aacfcda: { name: 'Zoar', match: 'Al Safi', note: 'traditional site: Byzantine Zoara, at Ghor es-Safi south-east of the Dead Sea', confidence: 'low' },
}

// ---------------------------------------------------------------------------
// Descriptions that are wrong, unclear or self-referential in OpenBible.
// ---------------------------------------------------------------------------
const DESCRIBED: Record<string, { name: string; description: string }> = {
  a60f092: { name: 'Goshen 1', description: 'a region in the eastern Nile Delta; exact extent uncertain' },
  a079b21: { name: 'Rameses', description: "Pi-Ramesses, Ramesses II's Delta capital (13th century BCE), at Qantir beside Tell el-Dab'a (ancient Avaris); Genesis 47:11 speaks of \"the region of Rameses\"" },
  ab89be9: { name: 'Ararat', description: 'Urartu: Genesis 8:4 names only "the mountains of Ararat"; the pin shows the peak now called Mount Ararat' },
  aff43ac: { name: 'Nahor', description: '"the city of Nahor" (Genesis 24:10): probably Haran itself, where Laban lives (27:43), or the nearby town of Nahur' },
  a98e4d7: { name: 'Sidon', description: 'Saida, Lebanon' },
  // Genesis 2:14: the Tigris "flows east of Asshur". Assur lies on the Tigris's west bank, so the verse is tied to it (below).
  a874951: { name: 'Asshur', description: 'the city of Assur, on the west bank of the Tigris; Genesis 2:14 says the Tigris flows east of Asshur, which may mean the city or the land of Assyria' },
  a38ebfd: { name: 'Tigris', description: 'the Tigris, Hebrew Hiddekel (Genesis 2:14); the pin marks al-Qurnah, where it meets the Euphrates today. It does not mark Eden' },
}

// ---------------------------------------------------------------------------
// Verses OpenBible misses or mis-assigns (OSIS, English numbering).
// ---------------------------------------------------------------------------
const EXTRA_VERSES: Record<string, { name: string; osises: string[] }> = {
  // "the terebinths of Mamre, which are in Hebron" (Genesis 13:18); "by the terebinths of Mamre" (18:1), Vayera's opening verse.
  aeb9e97: { name: 'Mamre', osises: ['Gen.13.18', 'Gen.18.1'] },
  a874951: { name: 'Asshur', osises: ['Gen.2.14'] },
}
const DROPPED_VERSES: Record<string, { name: string; osises: string[] }> = {
  // Genesis 49:10 "until Shiloh comes" is read by Rashi and Onkelos as a title of the Messiah, and by JPS as
  // "tribute to him" — not usually as the town.
  aa4680a: { name: 'Shiloh', osises: ['Gen.49.10'] },
  // OpenBible's Assyria pin is Nineveh, on the Tigris's EAST bank, which contradicts "flows east of Asshur"; 2:14 moves to Asshur (Assur).
  a3d1321: { name: 'Assyria', osises: ['Gen.2.14'] },
}

// ---------------------------------------------------------------------------
// Confidence overrides. OpenBible gives a lone identification a default vote of 500, which reads as
// "medium" however vague the site is; and an alias can outrank the place it is an alias of.
// ---------------------------------------------------------------------------
const RATED: Record<string, { name: string; confidence: PlaceOutput['confidence']; why: string }> = {}

// ---------------------------------------------------------------------------
// Place types OpenBible gets wrong.
// ---------------------------------------------------------------------------
const TYPED: Record<string, { name: string; type: string }> = {}

// ---------------------------------------------------------------------------
// Places OpenBible pins on the wrong point, moved onto another place's point.
// `to` is the OpenBible id of the place whose coordinates they take.
// ---------------------------------------------------------------------------
const MOVED: Record<string, { name: string; to: string; toName: string; note: string; confidence?: PlaceOutput['confidence'] }> = {
  // Exodus 17:1-7: at Rephidim "the place was named Massah and Meribah". OpenBible pins Massah on Kadesh-barnea.
  a296e06: { name: 'Massah', to: 'a65db0f', toName: 'Meribah 2', note: 'at Rephidim, the place also named Meribah (Exodus 17:7)' },
  // OpenBible pins the Euphrates at its mouth on the Shatt al-Arab, ~1,000 km from Jacob's crossing between Haran and
  // Gilead (Genesis 31:21) and from Balaam's Pethor (Numbers 22:5). Pin the upper river at Carchemish instead.
  a62dec4: { name: 'Euphrates', to: 'af6c730', toName: 'Carchemish', note: 'the Euphrates; the pin marks the upper river at Carchemish, west of Haran' },
  a669096: { name: 'River 2', to: 'af6c730', toName: 'Carchemish', note: 'the Euphrates ("the River", Numbers 22:5); the pin marks the upper river at Carchemish' },
  // Genesis 38:14 "the entrance to Enaim, which is on the road to Timnah"; JPS compares Enam (Joshua 15:34).
  // OpenBible describes Enaim as Enam but pins it on a different candidate site.
  a59fdf2: { name: 'Enaim', to: 'a26921e', toName: 'Enam', note: 'on the road to Timnah (Genesis 38:14); probably Enam (Joshua 15:34); location uncertain' },
}

interface PlaceOutput {
  id: string
  name: string
  alternateNames: string[]
  /** null when the site is unknown (no pin); see locationNote. */
  latitude: number | null
  longitude: number | null
  locationNote?: string
  confidence: 'high' | 'medium' | 'low'
  type: string
  verses: string[]
  parshas: string[]
  description?: string
  modernName?: string
}

interface AncientEntry {
  id: string
  friendly_id: string
  url_slug: string
  types: string[]
  extra: string // JSON string
  identifications: Array<{
    score: { vote_average: number }
    resolutions: Array<{ lonlat?: string }>
    description?: string
  }>
}

async function main() {
  console.log('Fetching OpenBible Bible-Geocoding-Data ancient.jsonl...')
  const res = await fetch(ANCIENT_JSONL_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  const raw = await res.text()

  const lines = raw.split('\n').filter((l) => l.trim())
  console.log(`Total entries: ${lines.length}`)

  const places: PlaceOutput[] = []
  let parsed = 0
  let skipped = 0

  const entries: AncientEntry[] = []
  for (const line of lines) {
    try {
      entries.push(JSON.parse(line))
    } catch {
      skipped++
    }
  }
  const cleanDescription = descriptionCleaner(entries.map((e) => e.friendly_id))

  const seenOverrides = new Set<string>()
  const checkName = (table: string, id: string, expected: string, actual: string) => {
    if (actual !== expected) throw new Error(`${table} id ${id} is now "${actual}", expected "${expected}"`)
    seenOverrides.add(`${table}:${id}`)
  }

  for (const entry of entries) {
    if (EXCLUDED[entry.id]) {
      checkName('EXCLUDED', entry.id, EXCLUDED[entry.id].name, entry.friendly_id)
      skipped++
      continue
    }

    // Extract osises from the extra field
    let osises: string[] = []
    try {
      const extra = JSON.parse(entry.extra)
      osises = extra.osises ?? []
    } catch {
      skipped++
      continue
    }

    const dropped = DROPPED_VERSES[entry.id]
    if (dropped) {
      checkName('DROPPED_VERSES', entry.id, dropped.name, entry.friendly_id)
      for (const o of dropped.osises) {
        if (!osises.includes(o)) throw new Error(`DROPPED_VERSES: ${entry.friendly_id} has no ${o}`)
      }
      osises = osises.filter((o) => !dropped.osises.includes(o))
    }
    const extraVerses = EXTRA_VERSES[entry.id]
    if (extraVerses) {
      checkName('EXTRA_VERSES', entry.id, extraVerses.name, entry.friendly_id)
      osises = sortOsises([...osises, ...extraVerses.osises.filter((o) => !osises.includes(o))])
    }
    // English → Hebrew verse numbers, so tags match parshaList ranges and links open the right verse.
    osises = [...new Set(osises.map(toHebrewVersification))]

    if (osises.length === 0) {
      skipped++
      continue
    }

    // Get best location from identifications
    let lonlat: string | null = null
    let bestScore = 0
    let modernDescription: string | undefined

    for (const ident of entry.identifications) {
      const score = ident.score?.vote_average ?? 0
      if (score >= bestScore) {
        for (const res of ident.resolutions ?? []) {
          if (res.lonlat) {
            lonlat = res.lonlat
            bestScore = score
            modernDescription = ident.description
              ?.replace(/<[^>]+>/g, '') // strip HTML tags
              .trim()
            break
          }
        }
      }
    }

    if (!lonlat) {
      skipped++
      continue
    }

    const [lngStr, latStr] = lonlat.split(',')
    const lng = parseFloat(lngStr)
    const lat = parseFloat(latStr)

    if (isNaN(lat) || isNaN(lng)) {
      skipped++
      continue
    }

    const parshas = getParshasForOsises(osises)
    const verses = osises.map(osisToVerseRef)

    // Confidence based on score
    const confidence: PlaceOutput['confidence'] =
      bestScore >= 750 ? 'high' : bestScore >= 400 ? 'medium' : 'low'

    // Type from entry.types
    const type = entry.types?.[0] ?? 'settlement'

    const place: PlaceOutput = {
      id: entry.id,
      name: entry.friendly_id,
      alternateNames: [],
      latitude: lat,
      longitude: lng,
      confidence,
      type,
      verses,
      parshas,
    }

    if (modernDescription) {
      const cleaned = cleanDescription(modernDescription, entry.friendly_id)
      if (cleaned) place.description = cleaned
    }

    const picked = PICKED[entry.id]
    if (picked) {
      checkName('PICKED', entry.id, picked.name, entry.friendly_id)
      const ident = entry.identifications.find((i) => i.description?.replace(/<[^>]+>/g, '').includes(picked.match))
      const ll = ident?.resolutions?.find((r) => r.lonlat)?.lonlat
      if (!ll) throw new Error(`PICKED: ${entry.friendly_id} has no identification matching "${picked.match}"`)
      const [pLng, pLat] = ll.split(',').map(parseFloat)
      place.latitude = pLat
      place.longitude = pLng
      place.description = picked.note
      if (picked.confidence) place.confidence = picked.confidence
    }

    const described = DESCRIBED[entry.id]
    if (described) {
      checkName('DESCRIBED', entry.id, described.name, entry.friendly_id)
      place.description = described.description
    }

    const rated = RATED[entry.id]
    if (rated) {
      checkName('RATED', entry.id, rated.name, entry.friendly_id)
      place.confidence = rated.confidence
    }

    const typed = TYPED[entry.id]
    if (typed) {
      checkName('TYPED', entry.id, typed.name, entry.friendly_id)
      place.type = typed.type
    }

    const unpinned = UNPINNED[entry.id]
    if (unpinned) {
      checkName('UNPINNED', entry.id, unpinned.name, entry.friendly_id)
      place.latitude = null
      place.longitude = null
      place.locationNote = unpinned.note
      place.description = unpinned.note
    }

    // Only include places in the broader Near East / biblical region
    const inRegion = lat > 15 && lat < 50 && lng > 20 && lng < 60
    if (!inRegion && parshas.length === 0) {
      skipped++
      continue
    }

    places.push(place)
    parsed++
  }

  console.log(`Processed ${parsed} places, skipped ${skipped}`)
  console.log(
    `Places with Parsha links: ${places.filter((p) => p.parshas.length > 0).length}`
  )

  const tables = { UNPINNED, EXCLUDED, PICKED, DESCRIBED, EXTRA_VERSES, DROPPED_VERSES, RATED, TYPED }
  const missing = Object.entries(tables).flatMap(([t, table]) =>
    Object.keys(table).filter((id) => !seenOverrides.has(`${t}:${id}`)).map((id) => `${t}:${id}`)
  )
  if (missing.length) throw new Error(`override ids not found in the data: ${missing.join(', ')}`)

  for (const [id, move] of Object.entries(MOVED)) {
    const place = places.find((p) => p.id === id)
    const target = places.find((p) => p.id === move.to)
    if (!place || place.name !== move.name) throw new Error(`MOVED id ${id} is not "${move.name}"`)
    if (!target || target.name !== move.toName) throw new Error(`MOVED target ${move.to} is not "${move.toName}"`)
    place.latitude = target.latitude
    place.longitude = target.longitude
    place.description = move.note
    if (move.confidence) place.confidence = move.confidence
  }

  // Sort: places with parsha links first
  places.sort((a, b) => {
    if (a.parshas.length > 0 && b.parshas.length === 0) return -1
    if (a.parshas.length === 0 && b.parshas.length > 0) return 1
    return a.name.localeCompare(b.name)
  })

  fs.writeFileSync(OUT_PATH, JSON.stringify(places, null, 2))
  console.log(`Written ${places.length} places to ${OUT_PATH}`)

  reportSharedCoordinates(places)

  // Print parsha coverage stats
  const parshaStats: Record<string, number> = {}
  for (const p of places) {
    for (const pid of p.parshas) {
      parshaStats[pid] = (parshaStats[pid] ?? 0) + 1
    }
  }
  const topParshas = Object.entries(parshaStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
  console.log('\nTop parshas by place count:')
  for (const [id, count] of topParshas) {
    console.log(`  ${id}: ${count} places`)
  }
}

// Pins that sit exactly on another pin. Often an alias (Luz = Bethel), but sometimes
// OpenBible falling back to a nearby known site, which the verse may contradict.
// Printed for review only; check the verse before changing anything.
function reportSharedCoordinates(places: PlaceOutput[]) {
  const groups = new Map<string, PlaceOutput[]>()
  for (const p of places) {
    if (p.latitude == null || p.longitude == null) continue
    const key = `${p.latitude},${p.longitude}`
    groups.set(key, [...(groups.get(key) ?? []), p])
  }
  const shared = [...groups.entries()].filter(([, g]) => g.length > 1 && g.some((p) => p.parshas.length > 0))
  console.log(`\nShared coordinates involving a parsha-linked place: ${shared.length} points`)
  for (const [key, g] of shared) {
    console.log(`  ${key}: ${g.map((p) => `${p.name}${p.parshas.length ? '' : ' (no parsha)'}`).join(' | ')}`)
  }
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
