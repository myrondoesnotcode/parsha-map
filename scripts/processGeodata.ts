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
  // Genesis 35:21: Jacob camps "beyond Migdal-eder". OpenBible's only pin (Khirbet el-Bira) is low-confidence; the site isn't known.
  ab80fa1: { name: 'Eder 1', note: 'Migdal-eder, "the tower of Eder" (Genesis 35:21); site unknown' },
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
  // Exodus 14:2 "before Pi-hahiroth, between Migdol and the sea, before Baal-zephon"; Numbers 33:7. The three are one camp by the sea, yet
  // OpenBible's pins scatter them 50-100 km apart and none is identified; each proposal depends on the route assumed. [EXO-72, P2-22, P2-9, P1-6]
  ababfd2: { name: 'Pi-hahiroth', note: 'where Israel camped by the sea before the crossing, "between Migdol and the sea, before Baal-zephon" (Exodus 14:2; Numbers 33:7); site unknown' },
  a411283: { name: 'Migdol 1', note: 'near the camp by the sea before the crossing (Exodus 14:2; Numbers 33:7); site unknown. "Migdol" means a fort, and several Egyptian border forts had the name' },
  a22663b: { name: 'Baal-zephon', note: 'faced the camp by the sea before the crossing (Exodus 14:2; Numbers 33:7); site unknown. Proposals range from the Mediterranean coast to the Gulf of Suez, depending on the route assumed' },
  // Exodus 13:20; Numbers 33:6 "Etham, on the edge of the wilderness". No accepted identification; OpenBible's candidates (Pithom, Tell Abu Sefeh,
  // el-Qantara, Tjaru, Ismailia) are route guesses. [EXO-79 (Etham), P1-15]
  a27d0e0: { name: 'Etham', note: 'a camp "on the edge of the wilderness" (Exodus 13:20; Numbers 33:6); site unknown' },
  // Deuteronomy 33:2 names Mount Paran beside Sinai and Seir; Rashi reads the three as separate places (Paran is where Ishmael's sons lived).
  // OpenBible pins it on Jebel Musa as "another name for Mount Sinai". [DEU-87]
  af693b8: { name: 'Mount Paran', note: 'named beside Sinai and Seir in Moses\'s blessing (Deuteronomy 33:2; also Habakkuk 3:3); site unknown' },
  // Numbers 33:30-31: a station between Hashmonah and Bene-jaakan, six stations before Mount Hor (33:37); Deuteronomy 10:6 says Aaron died at
  // Moserah. OpenBible's point is Mount Hor's own (with Hashmonah). [DEU-95, P2-12]
  a88331e: { name: 'Moseroth', note: 'a camp between Hashmonah and Bene-jaakan (Numbers 33:30-31); Deuteronomy 10:6 calls it Moserah and says Aaron died there. Site unknown' },
  // Numbers 33:29-30: the stop before Moseroth; OpenBible pins it on Moseroth's (and Mount Hor's) point. [P1-19]
  aaa8a88: { name: 'Hashmonah', note: 'a camp between Mithkah and Moseroth (Numbers 33:29-30); site unknown' },
  // Numbers 33:31-32; Deuteronomy 10:6 "Beeroth-bene-jaakan". OpenBible's only guess is Birein (score 13); both entries share it. [P1-10, DEU-97]
  a0fe2be: { name: 'Bene-jaakan', note: 'a camp between Moseroth and Hor-haggidgad (Numbers 33:31-32); Deuteronomy 10:6 calls it Beeroth-bene-jaakan. Site unknown' },
  a280f83: { name: 'Beeroth Bene-jaakan', note: '"the wells of Bene-jaakan", the camp before Moserah (Deuteronomy 10:6; Numbers 33:31-32); site unknown' },
  // Numbers 33:32-33; Deuteronomy 10:7 "Gudgod". OpenBible's three guesses score 9-10. [P1-22, DEU-97]
  a5e36e6: { name: 'Hor-haggidgad', note: 'a camp between Bene-jaakan and Jotbathah (Numbers 33:32-33), called Gudgod in Deuteronomy 10:7; site unknown' },
  // Numbers 11:1-3: the verse gives no location; OpenBible has only "within 50 km of Kibroth-hattaavah". [P2-30, DEU-97]
  a028191: { name: 'Taberah', note: 'where a fire of the LORD broke out against the people (Numbers 11:1-3; Deuteronomy 9:22); site unknown' },
  // Numbers 11:34-35; 33:16-17: between the wilderness of Sinai and Hazeroth. No identification: OpenBible's pin was a 1-vote Wadi Sa'l, its top
  // Erweis el-Ebeirig is a route guess (an Early Bronze Age camp on the traditional route). [DEU-97, P2-2]
  ae7836a: { name: 'Kibroth-hattaavah', note: '"the graves of craving", a camp between the wilderness of Sinai and Hazeroth (Numbers 11:34-35; 33:16-17); site unknown' },
  // Deuteronomy 1:1 "near Suph, between Paran and Tophel, Laban, Hazeroth, and Di-zahab". Rashi (after the Sifrei; Onkelos likewise) reads these
  // names as allusions to Israel's sins; Onkelos renders Suph as the Sea of Reeds. OpenBible's guesses score 7-17. [DEU-98]
  af725bb: { name: 'Suph', note: '"near Suph" (Deuteronomy 1:1); site unknown. Onkelos renders it "the Sea of Reeds"' },
  ad763b1: { name: 'Laban', note: 'named in Deuteronomy 1:1; site unknown. Rashi, following the Sifrei and Onkelos, reads the names in this verse as allusions to Israel\'s sins' },
  afcb77d: { name: 'Dizahab', note: 'Di-zahab (Deuteronomy 1:1); site unknown. Onkelos and Rashi read the name ("enough gold") as an allusion to the golden calf' },
  a7ecf6c: { name: 'Tophel', note: 'named in Deuteronomy 1:1; site unknown (Tafila in Edom has been proposed). Rashi, following the Sifrei and Onkelos, reads the names in this verse as allusions to Israel\'s sins' },
  // Deuteronomy 11:30 "near Gilgal, by the terebinths of Moreh"; Sotah 33b reads it loosely and puts the mountains at Shechem. OpenBible's
  // candidates score 8-16. [DEU-99]
  a84a509: { name: 'Gilgal 4', note: 'the Gilgal near Mount Gerizim and Mount Ebal, "by the terebinths of Moreh" (Deuteronomy 11:29-30); site unknown' },
  // Numbers 33:13-14: between Dophkah and Rephidim; OpenBible's only guess scores 10. [P1-12]
  a32397f: { name: 'Alush', note: 'a camp between Dophkah and Rephidim (Numbers 33:13-14); site unknown' },
  // Numbers 33:34-35: between Jotbathah and Ezion-geber; OpenBible's pin was a 1-vote guess. [P1-13]
  a7560c2: { name: 'Abronah', note: 'a camp between Jotbathah and Ezion-geber (Numbers 33:34-35); site unknown' },
  // Numbers 33:24-25: three OpenBible guesses at score 10, 150 km apart. [P1-18]
  a73af5f: { name: 'Haradah', note: 'a camp between Mount Shepher and Makheloth (Numbers 33:24-25); site unknown' },
  // Numbers 33:22-26: Kehelathah and Makheloth are separate stops (Mount Shepher and Haradah between them) but share Kuntillet Ajrud. [P1-29, P2-6]
  a32d25a: { name: 'Kehelathah', note: 'a camp between Rissah and Mount Shepher (Numbers 33:22-23); site unknown' },
  ac1fbba: { name: 'Makheloth', note: 'a camp between Haradah and Tahath (Numbers 33:25-26); site unknown' },
  // Numbers 33:23-24: OpenBible gives only "within 50 km of Haradah". [P2-15]
  a39fe14: { name: 'Mount Shepher', note: 'a camp between Kehelathah and Haradah (Numbers 33:23-24); site unknown' },
  // Numbers 33:26-29: Tahath, Terah and Mithkah share one proximity-guess point beside Kadesh, which the list reaches only at 33:36. [P2-31, P2-32, P2-10]
  abe40d1: { name: 'Tahath', note: 'a camp between Makheloth and Terah (Numbers 33:26-27); site unknown' },
  a944b90: { name: 'Terah', note: 'a camp between Tahath and Mithkah (Numbers 33:27-28); site unknown' },
  aa5f658: { name: 'Mithkah', note: 'a camp between Terah and Hashmonah (Numbers 33:28-29); site unknown' },
  // Numbers 33:20-21: OpenBible pins it on Laban (Tel Abu Seleimeh, north Sinai coast), far from both neighbours. [P2-5]
  a3e94bd: { name: 'Libnah 2', note: 'a camp between Rimmon-perez and Rissah (Numbers 33:20-21); site unknown' },
  // Numbers 33:21-22: OpenBible's 2-vote Sharma is on the Arabian coast, far from both neighbours. [P2-26]
  af04ad9: { name: 'Rissah', note: 'a camp between Libnah and Kehelathah (Numbers 33:21-22); site unknown' },
  // Numbers 33:43-44: between Punon and Iye-abarim. The pin was a 1-vote Telah; OpenBible's top, Ein Weibeh, lies west of Punon, back across the
  // Arabah from Iye-abarim, so it fits the order worse. No accepted identification. [P2-20]
  a0ef1e1: { name: 'Oboth', note: 'a camp between Punon and Iye-abarim (Numbers 21:10-11; 33:43-44); site unknown' },
  // Numbers 33:41-42: between Mount Hor and Punon. Both OpenBible candidates are name-echo guesses (1 and 8 votes). [P2-35]
  a1c6a50: { name: 'Zalmonah', note: 'a camp between Mount Hor and Punon (Numbers 33:41-42); site unknown' },
  // Numbers 22:39: the pin sits exactly on Dibon; OpenBible's candidates range from Dibon to Bamoth-baal. [P2-3]
  aeb19d6: { name: 'Kiriath-huzoth', note: 'a town of Moab where Balak brought Balaam (Numbers 22:39); site unknown' },
  // Numbers 34:7-8: on the northern border. OpenBible's three candidates tie; the pin took the lowest-ranked. [P2-14]
  a62fa2d: { name: 'Mount Hor 2', note: 'a mountain on the northern border, between the Great Sea and Lebo-hamath (Numbers 34:7-8); site unknown. Second Temple and rabbinic tradition identifies it with the Amanus (Amanah)' },
  // Numbers 21:30 (JPS: "Meaning of verse uncertain"), "Nophah, which is hard by Medeba"; the pin is the Moab region's label point. [P2-19]
  aed6b0e: { name: 'Nophah', note: 'named in the song over Moab, "hard by Medeba" (Numbers 21:30); the verse\'s meaning is uncertain and the site unknown' },
  // Numbers 13:21 "Rehob, at Lebo-hamath". The pin is Rehob of Asher near Acre; OpenBible's top (Beth-rehob) is only a Beqaa region point. [P2-24]
  ae4cd38: { name: 'Rehob 1', note: 'Rehob, at Lebo-hamath, the northern limit of the scouts\' route (Numbers 13:21); site unknown' },
  // Numbers 34:10-11: the border runs from Hazar-enan to Shepham, then "descends" to Riblah; OpenBible pins Shepham on Riblah itself. [P2-27]
  a9ba60c: { name: 'Shepham', note: 'on the eastern border, between Hazar-enan and Riblah (Numbers 34:10-11); site unknown' },
  // Numbers 32:3 ("Sebam"), 38. The pin was a 1-vote Sumia; OpenBible's top Qarn al-Qubish is an equal guess near Heshbon; neither fits better. [P2-29]
  aa10f27: { name: 'Sibmah', note: 'a town rebuilt by Reuben, listed with Heshbon and Nebo (Numbers 32:3, 38); site unknown' },
  // Numbers 21:14: named only in a quoted fragment ("its text and meaning are uncertain", JPS); Rashi reads "et vahev" as "what He gave". [P2-33]
  adec54b: { name: 'Waheb', note: '"Waheb in Suphah", quoted from the Book of the Wars of the LORD (Numbers 21:14); site unknown. Rashi reads the words as "what He gave", not a place name' },
  // Numbers 34:4: a point on the southern border between the ascent of Akrabbim and Kadesh-barnea; the Zin Desert point lies east of Akrabbim. [P2-36]
  a190097: { name: 'Zin 2', note: 'a point on the southern border between the ascent of Akrabbim and Kadesh-barnea (Numbers 34:4); site unknown' },
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
  // Numbers 33:8: Marah is "a three-days' journey" into the wilderness after the sea. Ain Hawarah is the traditional identification and
  // OpenBible's top; the pin was Uyun Musa, beside the Gulf of Suez (and a candidate for Elim). [P2-7, EXO-79 (Marah)]
  ad3970d: { name: 'Marah', match: 'Ain Hawarah', note: 'where the water was bitter, three days into the wilderness after the sea (Exodus 15:23; Numbers 33:8); site unknown — the pin marks the traditional identification, Ain Hawarah in western Sinai', confidence: 'low' },
  // Exodus 17:1-7; Numbers 33:14-15. Massah and Meribah (Exodus 17:7) are pinned at OpenBible's top Rephidim point, Wadi Rufaiyil; the Rephidim pin
  // was a 2-vote Wadi el-Sheikh 21 km away. Wadi Rufaiyil is also nearer the traditional Horeb (17:6). [P2-25, EXO-73, EXO-79 (Rephidim)]
  a05ebb7: { name: 'Rephidim', match: 'Wadi Rufaiyil', note: 'the last camp before the wilderness of Sinai, where there was no water (Exodus 17:1; 19:2); site unknown — the pin marks one proposal on the traditional route, Wadi Rufaiyil near Jebel Musa; Wadi Feiran is another', confidence: 'low' },
  // Deuteronomy 2:8 "away from Elath and Ezion-geber"; 1 Kings 9:26 "Ezion-geber, which is near Eloth": not Elath itself, so it can't share
  // Elath's Aqaba point. Tell el-Kheleifeh is the classic identification (Frank, Glueck); Pharaoh's Island is the other. [P1-16, DEU-94]
  a8e53d5: { name: 'Ezion-geber', match: 'Tell el Kheleifeh', note: 'a port at the head of the Gulf of Aqaba, listed beside Elath (Deuteronomy 2:8) and "near Eloth" (1 Kings 9:26); site debated — the pin marks Tell el-Kheleifeh; Pharaoh\'s Island is another proposal', confidence: 'low' },
  // Numbers 25:1; 33:49 "Abel-shittim". Abel-shittim is already pinned at Tall el-Hammam (Glueck's identification, OpenBible's top); the Shittim pin
  // was a 1-vote Tell Matabi. [P2-28]
  af64fb3: { name: 'Shittim', match: 'Tall el Hammam', note: 'Abel-shittim, the last camp in the steppes of Moab (Numbers 25:1; 33:49); site uncertain — the pin marks Tall el-Hammam, the usual identification; Tall Kafrayn is another proposal', confidence: 'low' },
  // Numbers 34:8-9: the border runs to Zedad, then Ziphron, then Hazar-enan. Huwwarin lies between the Zedad (Sadad) and Hazar-enan (Qaryatayn)
  // pins; the old pin, 1-vote Zifran, lies 50 km south-west of both. [P2-37]
  adf05b8: { name: 'Ziphron', match: 'Huwwarin', note: 'on the northern border, between Zedad and Hazar-enan (Numbers 34:8-9); site uncertain — the pin marks one proposal, Huwwarin', confidence: 'low' },
  // Numbers 20:22-28; 33:37-39: Mount Hor, "on the boundary of the land of Edom", where Aaron died. The customary identification (after Josephus) is
  // Jebel Harun near Petra; the pin was Har Zin (Jebel Madurah) in the Negev, the chief alternative. [DEU-96, P2-13]
  ad8027f: { name: 'Mount Hor 1', match: 'Jebel Nebi Harun', note: 'where Aaron died, "on the boundary of the land of Edom" (Numbers 20:23); location disputed — the pin marks the traditional site, Jebel Harun near Petra; others propose Jebel Madurah (Har Zin) in the Negev', confidence: 'low' },
}

// ---------------------------------------------------------------------------
// Descriptions that are wrong, unclear or self-referential in OpenBible.
// ---------------------------------------------------------------------------
const DESCRIBED: Record<string, { name: string; description: string }> = {
  // A region: the Map tab shows its dot, so the description says the point is only illustrative.
  a581f0c: { name: 'Canaan', description: 'the land of Canaan, a region; the pin marks only a point in it' },
  // OpenBible's point is on the Rosetta branch near the sea; the description says what it marks.
  a012705: { name: 'Nile', description: 'the Nile; the pin marks one point on the river, on its Rosetta branch near the sea' },
  a60f092: { name: 'Goshen 1', description: 'a region in the eastern Nile Delta; exact extent uncertain' },
  a079b21: { name: 'Rameses', description: "Pi-Ramesses, Ramesses II's Delta capital (13th century BCE), at Qantir beside Tell el-Dab'a (ancient Avaris); Genesis 47:11 speaks of \"the region of Rameses\"" },
  ab89be9: { name: 'Ararat', description: 'Urartu: Genesis 8:4 names only "the mountains of Ararat"; the pin shows the peak now called Mount Ararat' },
  aff43ac: { name: 'Nahor', description: '"the city of Nahor" (Genesis 24:10): probably Haran itself, where Laban lives (27:43), or the nearby town of Nahur' },
  a98e4d7: { name: 'Sidon', description: 'Saida, Lebanon' },
  // Genesis 2:14: the Tigris "flows east of Asshur". Assur lies on the Tigris's west bank, so the verse is tied to it (below).
  // Genesis 10:10: JPS notes that "and Calneh" (we-khalneh) is better vocalized we-khullanah, "all of them being".
  aee80af: { name: 'Calneh 1', description: 'Nippur, a proposed site; JPS notes that "and Calneh" (Genesis 10:10) may be better read "all of them being", so it may not be a place name' },
  a38ebfd: { name: 'Tigris', description: 'the Tigris, Hebrew Hiddekel (Genesis 2:14); the pin marks al-Qurnah, where it meets the Euphrates today. It does not mark Eden' },
  // Exodus 19; Leviticus 7:38; 25:1; Numbers 3:1; 28:6; Deuteronomy 33:2. Jebel Musa is the traditional site, not an established one. [EXO-75, LEV-66, DEU-86, P2-16]
  abfba2a: { name: 'Mount Sinai', description: 'location disputed; the pin marks the traditional site, Jebel Musa in southern Sinai, where Saint Catherine\'s Monastery was built in the 6th century CE. Other proposals are in northern Sinai, the Negev (Har Karkom) and north-west Arabia' },
  // Exodus 3:1; Deuteronomy 1:6; 5:2. [EXO-75, DEU-86]
  a9bb03e: { name: 'Mount Horeb', description: 'another name for Mount Sinai; the pin marks the traditional site, Jebel Musa. Location disputed' },
  // Exodus 19:1-2; Numbers 1:1. Placed only relative to Mount Sinai (confidence in RATED). [EXO-76, LEV-67, P2-34]
  ae50cf1: { name: 'Wilderness of Sinai', description: 'the wilderness around Mount Sinai, where Israel camped (Exodus 19:1-2; Numbers 1:1); shown around the traditional site, Jebel Musa. Location disputed' },
  // Exodus 1:11. Tell er-Retaba (Gardiner, Kitchen, Bietak) vs Tell el-Maskhuta. [EXO-77]
  a3870fe: { name: 'Pithom', description: 'one of the cities built for Pharaoh by Israelite labor (Exodus 1:11); the pin marks Tell er-Retaba in Wadi Tumilat, one of two proposed sites (the other is Tell el-Maskhuta)' },
  // Exodus 13:18; 15:4; Numbers 33:8; Deuteronomy 11:4. The crossing site is unknown; OpenBible scores the Gulf of Suez, Bitter Lakes, Lake Timsah
  // and Ballah Lakes close together. [EXO-78, DEU-102, P2-23]
  a3d18b2: { name: 'Red Sea 1', description: 'Yam Suf, the "Sea of Reeds" Israel crossed (Exodus 13:18; 15:4); site unknown — the pin marks one proposal, the Bitter Lakes; others include Lake Timsah, the Ballah Lakes and the Gulf of Suez' },
  // Exodus 15:27; Numbers 33:9. Wadi Gharandal is the usual identification; Uyun Musa has also been proposed. [EXO-79 (Elim)]
  a2410c1: { name: 'Elim', description: 'an oasis with twelve springs and seventy palms (Exodus 15:27); site uncertain — the pin marks the usual identification, Wadi Gharandal in western Sinai' },
  // Exodus 16:1 "the wilderness of Sin, between Elim and Sinai". [EXO-79 (Sin)]
  a0f54e4: { name: 'Sin', description: 'the wilderness "between Elim and Sinai" (Exodus 16:1); location depends on the route — the pin marks one proposal on the traditional route, Debbet er-Ramleh; the coastal plain of el-Markha is another' },
  // Numbers 33:12-13. Serabit el-Khadim rests on linking Dophkah with Egyptian mafkat (turquoise) and assumes the southern route. [P1-11]
  a070c7b: { name: 'Dophkah', description: 'a camp between the wilderness of Sin and Alush (Numbers 33:12-13); site unknown — the pin marks one proposal, the Egyptian turquoise mines at Serabit el-Khadim, which assumes a southern route through Sinai' },
  // Exodus 17:7 "Massah and Meribah" at Rephidim (now pinned at the same point); Rashi's second reading of Deuteronomy 33:8 refers it to Kadesh. [EXO-73, DEU-89]
  a65db0f: { name: 'Meribah 2', description: 'the waters of Meribah at Rephidim, the place also named Massah (Exodus 17:7); site unknown, shown at the Rephidim pin. Rashi also reads Deuteronomy 33:8 as the Meribah at Kadesh' },
  // Numbers 20:13; 27:14 "Meribath-kadesh". [DEU-89, P2-8]
  a505743: { name: 'Meribah 1', description: 'the waters of Meribah at Kadesh, in the wilderness of Zin (Numbers 20:13; 27:14); shown at the Kadesh-barnea pin, Ain el-Qudeirat, the most common identification' },
  // Numbers 13:26; 20:1. Also Genesis 14:7; 16:14; 20:1 (description only; the Genesis pin does not move). [P1-27]
  ac2cef0: { name: 'Kadesh-barnea', description: 'Kadesh, also Kadesh-barnea; the pin marks the most common identification, the oasis of Ain el-Qudeirat in north-eastern Sinai. The site is not certain, and a minority think the Bible speaks of two places named Kadesh' },
  // Numbers 13:29 "Amalekites dwell in the Negeb". A people; the pin is only a region point (Kadesh-barnea's). [DEU-100, P1-1]
  ab95484: { name: 'Amalek', description: 'the Amalekites, a people of the Negeb (Numbers 13:29), not one place; the pin marks only the general area, on the same point as Kadesh-barnea' },
  // Deuteronomy 4:3 "every person who followed Baal-peor"; Numbers 25:3. [DEU-101]
  a3d6e81: { name: 'Baal-peor', description: 'the Baal of Peor, the god Israel worshipped at Peor (Numbers 25:3), and the affair there, which Deuteronomy 4:3 recalls; the pin marks the Peor area' },
  // Deuteronomy 3:17 "from Chinnereth down to the sea of the Arabah". [DEU-103]
  a2bb265: { name: 'Chinnereth', description: 'Kinneret: in Deuteronomy 3:17 the Sea of Galilee or the town on its shore; the pin marks the town\'s mound, Tel Kinrot' },
  // Numbers 23:28 "the peak of Peor"; 25:18 and 31:16 "the affair of Peor". Placed only relative to Beth-peor (confidence in RATED). [P2-21, DEU-104]
  a9ef72b: { name: 'Peor', description: 'the peak of Peor, near Beth-peor (Numbers 23:28); site uncertain. In Numbers 25 and 31:16 "Peor" is the Baal of Peor and the affair there' },
  // Numbers 22:5 "in the land of his kinsfolk" (Hebrew b'nei ammo); RSV/NRSV revocalize it as the land of Amaw. [P1-2]
  ac5cab3: { name: 'Amaw', description: 'Amaw, a land between Aleppo and Carchemish known from the Idrimi inscription; some translations (RSV, NRSV) read it in Numbers 22:5, where the Hebrew is usually translated "the land of his kinsfolk"' },
  // Numbers 21:1; 33:40 "the Canaanite, king of Arad". Tel Arad lacks Middle and Late Bronze Age remains. [P1-3]
  abc358b: { name: 'Arad 1', description: 'the Canaanite city of Arad in the Negeb (Numbers 21:1); site debated — Tel Arad has no Middle or Late Bronze Age remains, so some place Canaanite Arad at Tel Malhata, shown here' },
  // REPLACES the existing DESCRIBED a874951 entry. Numbers 24:22, 24: in Balaam's oracle Asshur is the nation. Genesis 2:14 wording kept. [P1-5]
  a874951: { name: 'Asshur', description: 'the city of Assur, on the west bank of the Tigris, for a time the capital of Assyria. Genesis 2:14 says the Tigris flows east of Asshur, which may mean the city or the land of Assyria; in Balaam\'s oracle (Numbers 24:22, 24) Asshur is the nation, Assyria' },
  // Numbers 32:36 "Beth-haran"; Joshua 13:27 "Beth-haram". OpenBible scores Tall Iktanu and Tall er-Rama close. [P1-9]
  a4590cd: { name: 'Beth-haram', description: 'Beth-haran (Numbers 32:36), called Beth-haram in Joshua 13:27; site uncertain — the pin marks Tall er-Rama; Tall Iktanu is the other proposal' },
  // Numbers 33:33-34; Deuteronomy 10:7 "a region of running brooks". Ein Yotvata keeps the name; Taba is OpenBible's other candidate. [P1-26]
  a7384d7: { name: 'Jotbathah', description: 'a camp between Hor-haggidgad and Abronah (Numbers 33:33-34), "a region of running brooks" (Deuteronomy 10:7); site uncertain — the pin marks Ein Yotvata in the Arabah; Taba is another proposal' },
  // Numbers 24:24 "ships from the quarter of Kittim"; Onkelos (Rome) and Rashi ("these are the Romans"). [P2-4]
  aeb46a8: { name: 'Kittim', description: 'Kition on Cyprus, and by extension Cyprus and the western coastlands; Onkelos and Rashi read Kittim in Numbers 24:24 as Rome' },
  // Numbers 32:41; Deuteronomy 3:14 links the villages with Argob in Bashan. [P1-20]
  a26c8f2: { name: 'Havvoth-jair', description: 'the villages of Jair, in Gilead (Numbers 32:40-41); Deuteronomy 3:14 links them with Argob in Bashan. Exact area uncertain' },
}

// ---------------------------------------------------------------------------
// Verses OpenBible misses or mis-assigns (OSIS, English numbering).
// ---------------------------------------------------------------------------
const EXTRA_VERSES: Record<string, { name: string; osises: string[] }> = {
  // "the terebinths of Mamre, which are in Hebron" (Genesis 13:18); "by the terebinths of Mamre" (18:1), Vayera's opening verse.
  aeb9e97: { name: 'Mamre', osises: ['Gen.13.18', 'Gen.18.1'] },
  a874951: { name: 'Asshur', osises: ['Gen.2.14'] },
  // Exodus 13:17 "God did not lead them by way of the land of the Philistines". [EXO-80]
  ac71e65: { name: 'Philistia', osises: ['Exod.13.17'] },
  // Deuteronomy 34:1 "Gilead as far as Dan". [DEU-93]
  a513646: { name: 'Dan', osises: ['Deut.34.1'] },
  // Numbers 14:25, 43, 45 name the Amalekites. [P1-1]
  ab95484: { name: 'Amalek', osises: ['Num.14.25', 'Num.14.43', 'Num.14.45'] },
  // Numbers 33:3 "in plain view of all the Egyptians" (Hebrew kol Mitzrayim). [P1-14]
  af301ca: { name: 'Egypt', osises: ['Num.33.3'] },
  // Numbers 23:7 "From Aram has Balak brought me": Balaam's home is "Pethor of Aram-naharaim" (Deuteronomy 23:5 Hebrew = Deut.23.4 English). [P1-4]
  a3c7b44: { name: 'Aram-naharaim', osises: ['Num.23.7', 'Deut.23.4'] },
}
const DROPPED_VERSES: Record<string, { name: string; osises: string[] }> = {
  // Genesis 49:10 "until Shiloh comes" is read by Rashi and Onkelos as a title of the Messiah, and by JPS as
  // "tribute to him" — not usually as the town.
  aa4680a: { name: 'Shiloh', osises: ['Gen.49.10'] },
  // OpenBible's Assyria pin is Nineveh, on the Tigris's EAST bank, which contradicts "flows east of Asshur"; 2:14 moves to Asshur (Assur).
  a3d1321: { name: 'Assyria', osises: ['Gen.2.14'] },
  // Exodus 15:27 "And they came to Elim" does not name or refer to Marah (15:25 "there" is Marah, and stays). [EXO-74]
  ad3970d: { name: 'Marah', osises: ['Exod.15.27'] },
  // Deuteronomy 33:16 "the Presence in the Bush" (seneh), not Sinai. [DEU-85]
  abfba2a: { name: 'Mount Sinai', osises: ['Deut.33.16'] },
  // Deuteronomy 33:2 "Ribeboth-kodesh": Rashi reads "myriads of holy [angels]"; JPS only compares Meribath-kadesh. [DEU-88]
  a505743: { name: 'Meribah 1', osises: ['Deut.33.2'] },
  // Deuteronomy 2:12 speaks of Seir and "the land they were to possess"; Canaan is not named. [DEU-90]
  a581f0c: { name: 'Canaan', osises: ['Deut.2.12'] },
  // Deuteronomy 1:3, 7:19, 9:29 and Numbers 10:11, 11:4, 11:34 neither name nor refer to Egypt. (Deuteronomy 6:23 "from there" and Numbers 16:13
  // "a land flowing with milk and honey" do refer to Egypt and stay.) [DEU-91, P1-14]
  af301ca: { name: 'Egypt', osises: ['Deut.1.3', 'Deut.7.19', 'Deut.9.29', 'Num.10.11', 'Num.11.4', 'Num.11.34'] },
  // Deuteronomy 3:18, 21, 28; 4:14; 6:1; 11:8, 11 say "cross over" without naming the Jordan; Numbers 32:22 does not name it. [DEU-92, P1-25]
  ae686c9: { name: 'Jordan', osises: ['Num.32.22', 'Deut.3.18', 'Deut.3.21', 'Deut.3.28', 'Deut.4.14', 'Deut.6.1', 'Deut.11.8', 'Deut.11.11'] },
  // Numbers 24:24 ("Ships come from the quarter of Kittim... subject Asshur, subject Eber") does not name Amalek. [P1-1]
  ab95484: { name: 'Amalek', osises: ['Num.24.24'] },
  // Numbers 23:7: Balaam's Aram is Aram-naharaim (above), not Aram-Damascus. [P1-4]
  a3e66cd: { name: 'Aram', osises: ['Num.23.7'] },
  // Numbers 32:41 "captured their villages" does not name Gilead. [P1-17]
  ae73b90: { name: 'Gilead 1', osises: ['Num.32.41'] },
  // Numbers 12:1 (the Cushite woman) does not name Hazeroth; 11:35 and 12:16 do. [P1-21]
  a1b6474: { name: 'Hazeroth', osises: ['Num.12.1'] },
  // Numbers 21:24 Hebrew "ki az" ("for strong/Az was the boundary"); Jazer is the Septuagint reading. Jazer is named in 21:32. [P1-23]
  a095b6e: { name: 'Jazer', osises: ['Num.21.24'] },
  // Numbers 21:20; 23:28 "the wasteland" seen from Pisgah and Peor, north-east of the Dead Sea; the pin is the Judean Jeshimon of 1 Samuel 23. [P1-24]
  ad41f6e: { name: 'Jeshimon', osises: ['Num.21.20', 'Num.23.28'] },
  // Numbers 24:22 "Kain" is the Kenites of 24:21 (JPS note), not the town of Joshua 15:57 that the pin shows. [P1-28]
  a765bd8: { name: 'Kain', osises: ['Num.24.22'] },
  // Numbers 25:2 "their god" does not name Moab (25:1 does). [P2-11]
  aa0b1d6: { name: 'Moab 1', osises: ['Num.25.2'] },
}

// ---------------------------------------------------------------------------
// Confidence overrides. OpenBible gives a lone identification a default vote of 500, which reads as
// "medium" however vague the site is; and an alias can outrank the place it is an alias of.
// ---------------------------------------------------------------------------
const RATED: Record<string, { name: string; confidence: PlaceOutput['confidence']; why: string }> = {
  // Genesis 35:7-8: El-bethel and Allon-bacuth are placed only at or below Bethel, which is low.
  a30b045: { name: 'El-bethel', confidence: 'low', why: 'placed only at Bethel, which is low' },
  af9a894: { name: 'Allon-bacuth', confidence: 'low', why: 'placed only "below Bethel" (Genesis 35:8), which is low' },
  // Genesis 28:19: Luz is Bethel's earlier name and shares its pin, so it shares Bethel's confidence (low).
  a397042: { name: 'Luz 1', confidence: 'low', why: 'another name for Bethel (Genesis 28:19), which is low' },
  // Exodus 19:1-2: placed only relative to Mount Sinai, itself low; medium was OpenBible's default 500. [EXO-76, LEV-67, P2-34]
  ae50cf1: { name: 'Wilderness of Sinai', confidence: 'low', why: 'located only relative to the disputed Mount Sinai (low)' },
  // Exodus 17:7: at Rephidim, whose site is unknown (low). [EXO-73, DEU-89]
  a65db0f: { name: 'Meribah 2', confidence: 'low', why: 'at Rephidim, which is low; medium was the default 500' },
  // Numbers 20:13; 27:14: at Kadesh, which is low. [DEU-89, P2-8]
  a505743: { name: 'Meribah 1', confidence: 'low', why: 'at Kadesh-barnea, which is low; medium was the default 500' },
  // Numbers 13:29: a people of the Negeb; the pin is a region point. [DEU-100, P1-1]
  ab95484: { name: 'Amalek', confidence: 'low', why: 'a people, pinned only on a general-area point; medium was the default 500' },
  // Numbers 23:28: near Beth-peor, which is low. [P2-21, DEU-104]
  a9ef72b: { name: 'Peor', confidence: 'low', why: 'placed relative to Beth-peor, which is low; medium was the default 500' },
  // Numbers 22:41: alias of Bamoth, which is low. [P1-7]
  a577c27: { name: 'Bamoth-baal', confidence: 'low', why: 'alias of Bamoth, which is low; medium was the default 500' },
  // Numbers 32:3, 38: Beon = Baal-meon, which is low. [P1-8]
  a882ef5: { name: 'Beon', confidence: 'low', why: 'alias of Baal-meon, which is low; medium was the default 500' },
  // Numbers 32:3, 36: Nimrah = Beth-nimrah, which is low. [P2-17]
  a314731: { name: 'Nimrah', confidence: 'low', why: 'alias of Beth-nimrah, which is low; medium was the default 500' },
  // Numbers 32:42: Kenath renamed Nobah; Kenath is low. [P2-18]
  aa23a3e: { name: 'Nobah 1', confidence: 'low', why: 'alias of Kenath, which is low; medium was the default 500' },
  // Numbers 32:41; Deuteronomy 3:14: area uncertain (Gilead or Argob in Bashan). [P1-20]
  a26c8f2: { name: 'Havvoth-jair', confidence: 'low', why: 'area uncertain; medium was the default 500 for a single identification' },
}

// ---------------------------------------------------------------------------
// Place types OpenBible gets wrong.
// ---------------------------------------------------------------------------
const TYPED: Record<string, { name: string; type: string }> = {
  // Exodus 14:2: a camp; "mountain" is unsupported. [EXO-72]
  ababfd2: { name: 'Pi-hahiroth', type: 'campsite' },
  // "island" is OpenBible's first type, from the Pharaoh's Island proposal; the pins are on the mainland (Tell el-Kheleifeh; Aqaba). [DEU-94, P1-16]
  a8e53d5: { name: 'Ezion-geber', type: 'settlement' },
  af0ac29: { name: 'Elath', type: 'settlement' },
  // "Ur of the Chaldeans" (Genesis 11:28, 31) is a city; OpenBible lists it as ['region', 'settlement'].
  a6cf75c: { name: 'Ur 1', type: 'settlement' },
}

// ---------------------------------------------------------------------------
// Places OpenBible pins on the wrong point, moved onto another place's point.
// `to` is the OpenBible id of the place whose coordinates they take.
// ---------------------------------------------------------------------------
const MOVED: Record<string, { name: string; to: string; toName: string; note: string; confidence?: PlaceOutput['confidence'] }> = {
  // Exodus 17:1-7: at Rephidim "the place was named Massah and Meribah". OpenBible pins Massah on Kadesh-barnea.
  a296e06: { name: 'Massah', to: 'a65db0f', toName: 'Meribah 2', note: 'at Rephidim, the place also named Meribah (Exodus 17:7)' },
  // OpenBible pins the Euphrates at its mouth on the Shatt al-Arab, ~1,000 km from Jacob's crossing between Haran and
  // Gilead (Genesis 31:21) and from Balaam's Pethor (Numbers 22:5). Pin the upper river at Carchemish instead.
  a62dec4: { name: 'Euphrates', to: 'af6c730', toName: 'Carchemish', note: 'the Euphrates; the pin marks the upper river at Carchemish, west of Haran, not where Jacob crossed it (Genesis 31:21 doesn\'t say where)' },
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
