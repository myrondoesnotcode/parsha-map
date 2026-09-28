// Builds src/data/parshaDates.json (run: node scripts/buildParshaDates.mjs). Anno Mundi years are derived step by step from the verses and
// Seder Olam Rabbah; BCE = 3761 − AM (Chabad's conversion: 2448 → 1313 BCE, 1948 → 1813, 2488 → 1273).
import { writeFileSync } from 'node:fs'

const SEF = (ref) => ({ title: ref, url: `https://www.sefaria.org/${ref.replace(/ /g, '_').replace(/:/g, '.')}` })
const SOR = (ch) => ({ title: `Seder Olam Rabbah ${ch}`, url: `https://www.sefaria.org/Seder_Olam_Rabbah.${ch}` })
const CHABAD_EXODUS = { title: 'Chabad.org, "The Exodus" (2448 = 1313 BCE, after Seder Olam)', url: 'https://www.chabad.org/library/article_cdo/aid/1663/jewish/The-Exodus.htm' }
const CHABAD_TIMELINE = { title: 'Chabad.org, "Timeline of Jewish History" (Flood 1656 = 2105 BCE; Abraham born 1948 = 1813 BCE; Moses died 2488 = 1273 BCE)', url: 'https://www.chabad.org/library/article_cdo/aid/3915966/jewish/Timeline-of-Jewish-History.htm' }
const CHABAD_PATRIARCHS = { title: 'Chabad.org, "Is It Known When the Patriarchs & Matriarchs Were Born and Died?" (Isaac born 2048; Jacob born 2108, died 2255)', url: 'https://www.chabad.org/library/article_cdo/aid/595482/jewish/Is-it-known-when-the-Patriarchs-Matriarchs-were-born-and-died.htm' }

// Anchors (AM), each with how it is reached.
const FLOOD = 1656 // SOR 1: "From Adam to the Flood, 1656 years"
const ABRAHAM = FLOOD + 340 - 48 // SOR 1: Flood → dispersion 340 years; Abraham was 48 at the dispersion → 1948
const ISAAC = ABRAHAM + 100 // Gen 21:5 → 2048
const JACOB = ISAAC + 60 // Gen 25:26 → 2108
const JOSEPH = JACOB + 130 - 39 // Gen 47:9 Jacob 130 at the descent; SOR 2: Joseph was then 39 → Jacob 91 → 2199
const EXODUS = ISAAC + 400 // SOR 3: the 400 years of Gen 15:13 count from Isaac's birth → 2448
const YEAR2 = EXODUS + 1 // "second year" after the Exodus → 2449
const YEAR40 = EXODUS + 39 // fortieth year (Nisan-based) → 2487
if (ABRAHAM !== 1948 || EXODUS !== 2448 || JACOB + 147 !== 2255) throw new Error('chain broken')

const bce = (am) => 3761 - am

const t = (am, event, sources, endAm) => ({
  am,
  yearBCE: bce(am),
  ...(endAm ? { endAm, endBCE: bce(endAm) } : {}),
  event,
  sources,
})

const EXODUS_CHAIN = [SOR(1), SOR(3), CHABAD_EXODUS]
const GEN_CHAIN = [SOR(1), CHABAD_TIMELINE]

const parshiot = {
  // Year 1 is the Hebrew calendar's epoch (6 Oct 3761 BCE), so it is set explicitly rather than by 3761 − AM.
  bereshit: {
    scholarly: 'primeval',
    traditional: {
      am: 1,
      yearBCE: 3761,
      event: 'Creation, year 1 of the Hebrew calendar',
      sources: [SOR(1), { title: 'Wikipedia, "Anno Mundi" (Hebrew calendar epoch: 6 October 3761 BCE)', url: 'https://en.wikipedia.org/wiki/Anno_Mundi' }],
    },
  },
  noach: { scholarly: 'primeval', traditional: t(FLOOD, 'The Flood (Noah is 600)', [SEF('Genesis 7:11'), SOR(1), CHABAD_TIMELINE]) },
  'lech-lecha': { scholarly: 'patriarchs', traditional: t(ABRAHAM + 75, 'Abram leaves Haran, aged 75', [SEF('Genesis 12:4'), ...GEN_CHAIN]) },
  vayera: { scholarly: 'patriarchs', traditional: t(ISAAC, 'Isaac is born; Abraham is 100', [SEF('Genesis 21:5'), SOR(1), CHABAD_PATRIARCHS]) },
  'chayei-sarah': {
    scholarly: 'patriarchs',
    traditional: t(ISAAC + 37, 'Sarah dies at 127, when Isaac is 37', [SEF('Genesis 23:1'), SEF('Genesis 17:17'), SOR(1)]),
    note: 'Sarah was 90 at Isaac\'s birth (17:17, 21:5) and died at 127 (23:1), so Isaac was 37; Seder Olam 1 also gives 37 for the binding. Chabad.org lists her death as 2084, a year earlier; the "c." covers it.',
  },
  toldot: { scholarly: 'patriarchs', traditional: t(JACOB, 'Jacob and Esau are born; Isaac is 60', [SEF('Genesis 25:26'), SOR(1), CHABAD_PATRIARCHS]) },
  vayetze: { scholarly: 'patriarchs', traditional: t(JACOB + 77, 'Jacob comes to the well, aged 77', [SOR(2), SEF('Genesis 29:2')]) },
  vayishlach: { scholarly: 'patriarchs', traditional: t(JACOB + 97, 'Jacob returns after 20 years with Laban', [SEF('Genesis 31:41'), SOR(2)]) },
  vayeshev: { scholarly: 'patriarchs', traditional: t(JOSEPH + 17, 'Joseph is 17', [SEF('Genesis 37:2'), SEF('Genesis 47:9'), SOR(2)]) },
  miketz: { scholarly: 'patriarchs', traditional: t(JOSEPH + 30, 'Joseph, 30, stands before Pharaoh', [SEF('Genesis 41:46'), SOR(2)]) },
  vayigash: { scholarly: 'patriarchs', traditional: t(JACOB + 130, 'Jacob, 130, comes to Egypt', [SEF('Genesis 47:9'), SOR(2), SOR(3)]) },
  vayechi: { scholarly: 'patriarchs', traditional: t(JACOB + 147, 'Jacob dies at 147', [SEF('Genesis 47:28'), CHABAD_PATRIARCHS]) },

  shemot: { scholarly: 'exodus', traditional: t(EXODUS - 1, 'Moses at the burning bush, a year before the Exodus', [SOR(5), ...EXODUS_CHAIN]) },
  vaera: { scholarly: 'exodus', traditional: t(EXODUS - 1, 'The plagues, in the 12 months before the Exodus', [SOR(3), CHABAD_EXODUS], EXODUS) },
  bo: { scholarly: 'exodus', traditional: t(EXODUS, 'The Exodus, 15 Nisan 2448', [SEF('Numbers 33:3'), ...EXODUS_CHAIN]) },
  beshalach: { scholarly: 'exodus', traditional: t(EXODUS, 'The sea crossing, on the seventh day of Passover', [SOR(5), CHABAD_EXODUS]) },
  yitro: { scholarly: 'exodus', traditional: t(EXODUS, 'Sinai, in the third month after the Exodus', [SEF('Exodus 19:1'), SOR(5), CHABAD_EXODUS]) },
  mishpatim: { scholarly: 'exodus', traditional: t(EXODUS, 'Laws given at Sinai, the year of the Exodus', [SEF('Exodus 24:16'), CHABAD_EXODUS]) },
  terumah: { scholarly: 'exodus', traditional: t(EXODUS, 'Moses on the mountain, the year of the Exodus', [SEF('Exodus 24:18'), CHABAD_EXODUS]) },
  tetzaveh: { scholarly: 'exodus', traditional: t(EXODUS, 'Moses on the mountain, the year of the Exodus', [SEF('Exodus 24:18'), CHABAD_EXODUS]) },
  'ki-tisa': { scholarly: 'exodus', traditional: t(EXODUS, 'The golden calf, the year of the Exodus', [SEF('Mishnah Taanit 4:6'), CHABAD_EXODUS]) },
  vayakhel: {
    scholarly: 'exodus',
    // Rashi: Moses assembles the people the day after Yom Kippur, 10 Tishrei 2449, which fell in autumn 1313 BCE;
    // the work is finished by 1 Nisan 2449 (spring 1312 BCE). The plain formula would give 1312 for both.
    traditional: { am: YEAR2, yearBCE: 1313, endAm: YEAR2, endBCE: 1312, event: 'Building the Tabernacle, from the day after Yom Kippur', sources: [SEF('Rashi on Exodus 35:1'), SEF('Exodus 40:17'), CHABAD_EXODUS] },
  },
  pekudei: { scholarly: 'exodus', traditional: t(YEAR2, 'The Tabernacle is set up, 1 Nisan of the second year', [SEF('Exodus 40:17'), CHABAD_EXODUS]) },

  vayikra: { scholarly: 'exodus', traditional: t(YEAR2, 'God calls from the Tabernacle, set up 1 Nisan of the second year', [SEF('Exodus 40:17'), SEF('Leviticus 1:1'), CHABAD_EXODUS]) },
  tzav: { scholarly: 'exodus', traditional: t(YEAR2, 'The seven days of ordination, before 1 Nisan of the second year', [SEF('Leviticus 8:33'), SEF('Rashi on Leviticus 9:1'), CHABAD_EXODUS]) },
  shemini: { scholarly: 'exodus', traditional: t(YEAR2, 'The eighth day, 1 Nisan of the second year', [SEF('Leviticus 9:1'), SEF('Rashi on Leviticus 9:1'), SEF('Exodus 40:17')]) },
  tazria: { scholarly: 'exodus', note: 'Laws with no dated event; no traditional year given.' },
  metzora: { scholarly: 'exodus', note: 'Laws with no dated event; no traditional year given.' },
  'acharei-mot': { scholarly: 'exodus', traditional: t(YEAR2, "After the death of Aaron's sons on the eighth day", [SEF('Leviticus 16:1'), SEF('Rashi on Leviticus 9:1'), SEF('Exodus 40:17')]) },
  kedoshim: { scholarly: 'exodus', note: 'Laws with no dated event; no traditional year given.' },
  emor: { scholarly: 'exodus', note: 'Laws and one undated incident; no traditional year given.' },
  behar: { scholarly: 'exodus', note: 'Given "at Mount Sinai" (25:1), with no year; no traditional year given.' },
  bechukotai: { scholarly: 'exodus', note: 'No dated event; no traditional year given.' },

  bamidbar: { scholarly: 'exodus', traditional: t(YEAR2, 'The census, 1 Iyar of the second year', [SEF('Numbers 1:1'), CHABAD_EXODUS]) },
  nasso: { scholarly: 'exodus', traditional: t(YEAR2, "The chieftains' gifts, from the day the Tabernacle was set up", [SEF('Numbers 7:1'), SEF('Exodus 40:17')]) },
  behaalotecha: { scholarly: 'exodus', traditional: t(YEAR2, 'Leaving Sinai, 20 Iyar of the second year', [SEF('Numbers 10:11'), CHABAD_EXODUS]) },
  shelach: { scholarly: 'exodus', traditional: t(YEAR2, 'The spies, in the second year', [SEF('Taanit 29a'), SEF('Numbers 10:11'), CHABAD_EXODUS]) },
  korach: { scholarly: 'exodus', note: 'The Torah does not date the rebellion. Seder Olam Rabbah 8 places it after the spies ("After the spies was the strife of Korah") but gives no year; no traditional year given.' },
  chukat: { scholarly: 'exodus', traditional: t(YEAR40, 'Miriam and Aaron die, in the 40th year', [SEF('Numbers 20:1'), SOR(9), SEF('Numbers 33:38'), CHABAD_EXODUS]) },
  // Year 40 runs Nisan to Nisan: Aaron dies 1 Av (33:38), Moses speaks on 1 Shevat (Deut 1:3), so the plains of Moab span AM 2487–2488.
  balak: { scholarly: 'exodus', traditional: t(YEAR40, 'On the plains of Moab, in the 40th year', [SEF('Numbers 33:38'), SOR(9), SEF('Deuteronomy 1:3'), CHABAD_EXODUS], YEAR40 + 1) },
  pinchas: { scholarly: 'exodus', traditional: t(YEAR40, 'On the plains of Moab, in the 40th year', [SEF('Numbers 33:38'), SOR(9), SEF('Deuteronomy 1:3'), CHABAD_EXODUS], YEAR40 + 1) },
  matot: { scholarly: 'exodus', traditional: t(YEAR40, 'On the plains of Moab, in the 40th year', [SEF('Numbers 33:38'), SOR(9), SEF('Deuteronomy 1:3'), CHABAD_EXODUS], YEAR40 + 1) },
  masei: { scholarly: 'exodus', traditional: t(YEAR40, 'On the plains of Moab, in the 40th year', [SEF('Numbers 33:38'), SOR(9), SEF('Deuteronomy 1:3'), CHABAD_EXODUS], YEAR40 + 1) },
}

const DEUT = ['devarim', 'vaetchanan', 'ekev', 'reeh', 'shoftim', 'ki-teitzei', 'ki-tavo', 'nitzavim', 'vayeilech', 'haazinu']
for (const id of DEUT) {
  parshiot[id] = { scholarly: 'exodus', traditional: t(YEAR40 + 1, "Moses' last speeches, from 1 Shevat of the 40th year", [SEF('Deuteronomy 1:3'), SEF('Rashi on Deuteronomy 1:3'), CHABAD_TIMELINE]) }
}
parshiot['vzot-habracha'] = { scholarly: 'exodus', traditional: t(YEAR40 + 1, 'Moses dies at 120', [SEF('Deuteronomy 34:7'), CHABAD_TIMELINE]) }

const scholarly = {
  primeval: {
    label: 'Not datable by historians',
    sources: [
      { title: 'Wikipedia, "Genesis creation narrative" (scholars read Genesis 1–2 as a creation account drawn from two sources, shaped by ancient Near Eastern cosmology)', url: 'https://en.wikipedia.org/wiki/Genesis_creation_narrative' },
      { title: 'Wikipedia, "Genesis flood narrative" (historicity)', url: 'https://en.wikipedia.org/wiki/Genesis_flood_narrative' },
    ],
  },
  patriarchs: {
    label: 'Date unknown · often c. 2000–1550 BCE, or later',
    startBCE: 2000,
    endBCE: 1550,
    // Rendsburg favours the Late Bronze Age (c. 1550–c. 1150) for "the patriarchal age": the band fades out to there.
    laterToBCE: 1150,
    sources: [
      { title: 'Gary A. Rendsburg, "The Ancestral Narratives," in Ancient Israel, ed. H. Shanks (Biblical Archaeology Society): proposals for Abraham run "anywhere from c. 2100 to c. 1400"; he describes the Middle Bronze Age dating (c. 2000–c. 1550) and favours the later, Late Bronze Age date', url: 'https://jewishstudies.rutgers.edu/images/documents/faculty/Rendsburg/ch.%201%20text%20%20notes.pdf' },
      { title: 'P. Kyle McCarter Jr., rev. Ronald S. Hendel, "The Patriarchal Age," in Ancient Israel (1999): Middle Bronze Age texts "dating to about 2000–1550 B.C.E."', url: 'http://cojs.org/wp-content/uploads/Patriarchal_Age.pdf' },
      { title: 'Wikipedia, "Abraham" (historicity: by the 21st century archaeologists had stopped trying to fix a context)', url: 'https://en.wikipedia.org/wiki/Abraham' },
    ],
  },
  exodus: {
    label: 'Date unknown · often placed c. 1300–1200 BCE',
    startBCE: 1300,
    endBCE: 1200,
    sources: [
      { title: 'Wikipedia, "The Exodus": most scholars who accept a historical core date it "to the thirteenth century BCE at the time of Ramses II", some to the twelfth; most doubt the account is historical', url: 'https://en.wikipedia.org/wiki/The_Exodus' },
    ],
  },
}

const out = {
  _about:
    'Generated by scripts/buildParshaDates.mjs; edit that, not this file. Per-parsha dates for the map date bar. "scholarly" names a shared entry in "scholarly" (the hedged range historians use, with sources). "traditional" is the year in the traditional Jewish count (Anno Mundi, from Seder Olam Rabbah and the ages in the verses) of the event named, converted as BCE = 3761 − AM. A Jewish year runs Tishrei to Elul, so its autumn months fall in the BCE year before; every traditional date is shown with "c.". A parsha with no traditional entry has no dated event in the Torah or the chronology; the bar shows only the hedged scholarly label.',
  _conversion: [CHABAD_EXODUS, CHABAD_TIMELINE],
  scholarly,
  parshiot,
}

const path = process.argv[2] ?? new URL('../src/data/parshaDates.json', import.meta.url).pathname
writeFileSync(path, JSON.stringify(out, null, 2) + '\n')
console.log('wrote', Object.keys(parshiot).length, 'parshiot')
for (const [id, p] of Object.entries(parshiot)) console.log(id.padEnd(14), p.scholarly.padEnd(10), p.traditional ? `AM ${p.traditional.am}${p.traditional.endAm ? '–' + p.traditional.endAm : ''} = c. ${p.traditional.yearBCE}${p.traditional.endBCE ? '–' + p.traditional.endBCE : ''} BCE · ${p.traditional.event}` : '— ' + (p.note ?? ''))
