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
}

// ---------------------------------------------------------------------------
// Places OpenBible pins on the wrong point, moved onto another place's point.
// `to` is the OpenBible id of the place whose coordinates they take.
// ---------------------------------------------------------------------------
const MOVED: Record<string, { name: string; to: string; toName: string; note: string }> = {
  // Exodus 17:1-7: at Rephidim "the place was named Massah and Meribah". OpenBible pins Massah on Kadesh-barnea.
  a296e06: { name: 'Massah', to: 'a65db0f', toName: 'Meribah 2', note: 'at Rephidim, the place also named Meribah (Exodus 17:7)' },
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

  for (const line of lines) {
    let entry: AncientEntry
    try {
      entry = JSON.parse(line)
    } catch {
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
      place.description = modernDescription
    }

    const unpinned = UNPINNED[entry.id]
    if (unpinned) {
      if (entry.friendly_id !== unpinned.name) {
        throw new Error(`UNPINNED id ${entry.id} is now "${entry.friendly_id}", expected "${unpinned.name}"`)
      }
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

  const missing = Object.keys(UNPINNED).filter((id) => !places.some((p) => p.id === id))
  if (missing.length) throw new Error(`UNPINNED ids not found in the data: ${missing.join(', ')}`)

  for (const [id, move] of Object.entries(MOVED)) {
    const place = places.find((p) => p.id === id)
    const target = places.find((p) => p.id === move.to)
    if (!place || place.name !== move.name) throw new Error(`MOVED id ${id} is not "${move.name}"`)
    if (!target || target.name !== move.toName) throw new Error(`MOVED target ${move.to} is not "${move.toName}"`)
    place.latitude = target.latitude
    place.longitude = target.longitude
    place.description = move.note
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
