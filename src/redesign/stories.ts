// Parsha Stories — tap-through cards that drive the map camera.
// Text is paraphrased from the sources cited on each card, checked against Sefaria.
// Lech Lecha: Genesis 12–17. Vayikra: Leviticus 1–5, 7:38; Exodus 26–27, 40;
// Numbers 1:1, 23:4; Kitzur Baal HaTurim on Leviticus 1:1; Rashi on Exodus 26:32, 27:18.

export type LngLat = [number, number]

export interface StoryCamera {
  center: LngLat
  zoom: number
  pitch?: number
  bearing?: number
}

export type StoryCardKind =
  | 'cover'
  | 'chapter'
  | 'stars'
  | 'name'
  | 'talk'
  // Card types that don't need a route (weeks with 0–2 places).
  | 'letter'
  | 'plan'
  | 'offerings'
  | 'scale'
  | 'quote'

export interface StoryItem {
  he?: string
  en: string
  note?: string
}

export interface StoryCard {
  kind: StoryCardKind
  title: string
  body?: string
  ref?: string
  camera: StoryCamera
  /** How far the journey line is drawn: index along `route` (fractions allowed). */
  routeTo: number
  /** Numbered stop to spotlight (1-based), if any. */
  stop?: number
  /** Extra place (not a numbered stop) to spotlight. */
  spot?: { name: string; at: LngLat }
  /** Rows for list-style cards (offerings, scale). */
  items?: StoryItem[]
  /** Hebrew line for quote and letter cards. */
  hebrew?: string
  /** Small print shown on the card: sources for a drawing, what is illustrative. */
  note?: string
  /** Full-bleed art behind the cover (public domain). */
  image?: string
}

export interface RouteStop {
  name: string
  at: LngLat
}

export interface ParshaStory {
  parshaId: string
  tagline: string
  /** Numbered journey stops, in travel order. Empty for weeks with no journey. */
  route: RouteStop[]
  /** Where the story stays when there is no journey (e.g. the camp at Sinai). */
  anchor?: RouteStop
  cards: StoryCard[]
}

const HARAN: LngLat = [39.03, 36.86]
const SHECHEM: LngLat = [35.28, 32.21]
const BETHEL: LngLat = [35.24, 31.92]
const EGYPT: LngLat = [31.31, 30.13]
const HEBRON: LngLat = [35.1, 31.53]

const lechLecha: ParshaStory = {
  parshaId: 'lech-lecha',
  tagline: 'Leave everything. Go.',
  route: [
    { name: 'Haran', at: HARAN },
    { name: 'Shechem', at: SHECHEM },
    { name: 'Bethel', at: BETHEL },
    { name: 'Egypt', at: EGYPT },
    { name: 'Hebron', at: HEBRON },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Lech Lecha',
      body: 'Leave everything. Go.',
      ref: 'Genesis 12:1 – 17:27',
      camera: { center: [36.2, 33.4], zoom: 4.7, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Go forth.',
      body: 'God tells Abram to leave his land, his birthplace and his father’s house for a land he will be shown. At 75, he sets out from Haran with Sarai, Lot and everything they own.',
      ref: 'Genesis 12:1–5',
      camera: { center: HARAN, zoom: 6.4, pitch: 45, bearing: -18 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'The first altar',
      body: 'At the terebinth of Moreh near Shechem, God promises this land to Abram’s offspring. Abram builds an altar there.',
      ref: 'Genesis 12:6–7',
      camera: { center: SHECHEM, zoom: 8.6, pitch: 55, bearing: -28 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'A tent between two towns',
      body: 'In the hill country, with Bethel to the west and Ai to the east, Abram pitches his tent and builds another altar.',
      ref: 'Genesis 12:8',
      camera: { center: BETHEL, zoom: 9.4, pitch: 58, bearing: 12 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Famine. South to Egypt.',
      body: 'A severe famine grips the land, and Abram takes his household down to Egypt to survive it.',
      ref: 'Genesis 12:10',
      camera: { center: [32.6, 30.6], zoom: 6.2, pitch: 42, bearing: 12 },
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'Lot chooses the plain',
      body: 'Back in Canaan, the two households have grown too big to stay together. Lot picks the well-watered Jordan plain and pitches his tents near Sodom.',
      ref: 'Genesis 13:6–12',
      camera: { center: [35.55, 31.8], zoom: 8.5, pitch: 55, bearing: 8 },
      routeTo: 3.85,
      spot: { name: 'Sodom', at: [35.67, 31.84] },
    },
    {
      kind: 'chapter',
      title: 'Home in Hebron',
      body: 'Abram moves his tent to the terebinths of Mamre, in Hebron, and builds an altar there.',
      ref: 'Genesis 13:18',
      camera: { center: HEBRON, zoom: 9.6, pitch: 58, bearing: -10 },
      routeTo: 4,
      stop: 5,
    },
    {
      kind: 'chapter',
      title: 'The rescue',
      body: 'When Lot is taken captive in a war between kings, Abram musters 318 men, chases the raiders as far as Dan, and brings Lot home.',
      ref: 'Genesis 14:12–16',
      camera: { center: [35.5, 32.7], zoom: 7.1, pitch: 50, bearing: -8 },
      routeTo: 4,
      spot: { name: 'Dan', at: [35.65, 33.25] },
    },
    {
      kind: 'stars',
      title: 'Look up at the sky and count the stars, if you can.',
      body: 'So will your descendants be.',
      ref: 'Genesis 15:5',
      camera: { center: [35.1, 31.2], zoom: 7.4, pitch: 76, bearing: 0 },
      routeTo: 4,
    },
    {
      kind: 'chapter',
      title: 'Hagar and Ishmael',
      body: 'An angel finds Sarai’s servant Hagar by a spring in the wilderness, later called Beer-lahai-roi. She bears Abram a son, Ishmael. Abram is 86.',
      ref: 'Genesis 16:7–16',
      camera: { center: [34.7, 31.15], zoom: 8.3, pitch: 50, bearing: 24 },
      routeTo: 4,
      spot: { name: 'Beer-lahai-roi', at: [34.65, 31.1] },
    },
    {
      kind: 'name',
      title: 'Abram becomes Abraham',
      body: 'At 99, God makes a covenant with him and gives him a new name: “father of a multitude of nations.” Circumcision becomes the sign of the covenant.',
      ref: 'Genesis 17:1–10',
      camera: { center: [35.6, 33.2], zoom: 4.9, pitch: 20, bearing: 0 },
      routeTo: 4,
    },
    {
      kind: 'talk',
      title: 'Abram left home, family and everything familiar without knowing where he would end up. What would be hardest for you to leave behind?',
      camera: { center: [35.6, 33.2], zoom: 4.9, pitch: 20, bearing: 0 },
      routeTo: 4,
    },
  ],
}

// ─── Vayikra: no journey. The camp stays at Sinai; the story is about the
// Tabernacle and what people bring to it. Sources: see the file header.

/** Jebel Musa summit (OSM peak, ~2264 m SRTM). One of several proposed sites for Sinai. */
const SINAI: LngLat = [33.9752, 28.5388]
/** Illustrative spot on the flat er-Raha plain (~1545 m, SRTM) NW of Jebel Musa, for the to-scale plan. */
export const MISHKAN_AT: LngLat = [33.958, 28.562]

const vayikra: ParshaStory = {
  parshaId: 'vayikra',
  tagline: 'He called.',
  route: [],
  anchor: { name: 'Mount Sinai', at: SINAI },
  cards: [
    {
      kind: 'cover',
      title: 'Vayikra',
      body: 'He called.',
      ref: 'Leviticus 1:1 – 5:26',
      // No cover art yet: the parsha's current image is a 15th-century Christian
      // typological panel (with Cain and Abel), not right for this cover.
      camera: { center: [34.2, 29.6], zoom: 5.6, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Still at Sinai',
      body: 'No journey this week. The people are camped in the wilderness of Sinai, the Tabernacle has just been set up, and God calls to Moses from the Tent of Meeting. (The pin marks Jebel Musa, one of several proposed sites; no one knows for sure where Sinai was.)',
      ref: 'Leviticus 1:1, 7:38 · Exodus 40:17',
      camera: { center: SINAI, zoom: 9.2, pitch: 58, bearing: -20 },
      routeTo: 0,
      spot: { name: 'Jebel Musa (a proposed Mount Sinai)', at: SINAI },
    },
    {
      kind: 'letter',
      title: 'A small aleph',
      hebrew: 'וַיִּקְרָא',
      body: 'The book’s first word, “He called,” ends with an aleph that, by scribal tradition, is written small in the Torah scroll. The Baal HaTurim explains: Moses wanted to write וַיִּקָּר, “He happened upon,” as if God had met him only by chance, the word used for Bilaam. God told him to include the aleph, a sign of His love, so Moses wrote it small.',
      ref: 'Leviticus 1:1 · Kitzur Baal HaTurim',
      camera: { center: SINAI, zoom: 10.4, pitch: 62, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'plan',
      title: 'The Tabernacle courtyard, to scale',
      body: 'A courtyard 100 cubits by 50: about 50 by 25 metres if a cubit is half a metre, roughly an Olympic pool. The altar of burnt offering stands at the Tabernacle’s entrance, and offerings are brought there.',
      ref: 'Exodus 27:1, 18; 40:29–30 · Leviticus 1:3',
      note: 'Tent placement and the 10 × 10 cubit Holy of Holies follow Rashi (Exodus 26:32, 27:18). The altar’s exact spot is schematic and the laver (Exodus 40:30) is not shown. Where it all stood is unknown; the location is illustrative.',
      // Camera is set per ground treatment in DaylightMap's cameraFor().
      camera: { center: MISHKAN_AT, zoom: 18.4, pitch: 48, bearing: -24 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'Five kinds of offering',
      ref: 'Leviticus 1–5',
      note: 'Plan to scale; location illustrative.',
      items: [
        { he: 'עוֹלָה', en: 'Burnt offering', note: 'An animal is skinned, and the rest goes up in smoke on the altar.' },
        { he: 'מִנְחָה', en: 'Grain offering', note: 'Usually choice flour with oil and frankincense. Always salted.' },
        { he: 'שְׁלָמִים', en: 'Well-being offering', note: 'From the herd or the flock, male or female.' },
        { he: 'חַטָּאת', en: 'Purgation offering', note: 'Mostly for a wrong done without meaning to.' },
        { he: 'אָשָׁם', en: 'Guilt offering', note: 'For misusing holy things by mistake, or cheating someone and swearing falsely: pay it back, plus a fifth.' },
      ],
      camera: { center: MISHKAN_AT, zoom: 17.9, pitch: 40, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'scale',
      title: 'A price for every purse',
      body: 'For some purgation offerings, the Torah sets a sliding scale: if a sheep or goat is too much, bring two birds, one as a purgation offering and one as a burnt offering. If birds are too much, a tenth of an ephah of flour is enough.',
      ref: 'Leviticus 5:6–7, 5:11',
      items: [
        { en: 'A ewe', note: 'or a she-goat' },
        { en: 'Two birds', note: 'turtledoves or pigeons' },
        { en: 'A tenth of an ephah', note: 'of choice flour' },
      ],
      camera: { center: MISHKAN_AT, zoom: 16.8, pitch: 34, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'Do not leave out the salt of your covenant with God.',
      hebrew: 'וְלֹא תַשְׁבִּית מֶלַח בְּרִית אֱלֹהֶיךָ…',
      body: 'Salt goes with every offering, grain and animal alike.',
      ref: 'Leviticus 2:13',
      camera: { center: SINAI, zoom: 11.5, pitch: 70, bearing: 40 },
      routeTo: 0,
    },
    {
      kind: 'talk',
      title: 'Vayikra makes room for a little flour when even two birds are out of reach. What small thing has someone given you that meant a lot?',
      camera: { center: SINAI, zoom: 8, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
  ],
}

const STORIES: Record<string, ParshaStory> = {
  [lechLecha.parshaId]: lechLecha,
  [vayikra.parshaId]: vayikra,
}

export function getStory(parshaId: string | null): ParshaStory | null {
  return parshaId ? STORIES[parshaId] ?? null : null
}
