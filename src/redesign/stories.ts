// Parsha Stories — tap-through cards that drive the map camera.
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Lech Lecha: Genesis 12–17. Vayikra: Leviticus 1–5, 7:8, 7:38; Exodus 26–27, 40;
// Numbers 1:1, 23:4; Kitzur Baal HaTurim on Leviticus 1:1; Rashi on Exodus 26:32, 27:18;
// Rashi on Leviticus 1:1 and 2:13 (citing Menachot 20a).

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
  // A question the reader answers before the story continues.
  | 'guess'

export interface StoryItem {
  he?: string
  en: string
  note?: string
}

export interface GuessOption {
  label: string
  he?: string
  /** Map pin for the option, when the guess is about a place. */
  at?: LngLat
  correct?: boolean
}

export interface TableQuestion {
  audience: 'Kids' | 'Everyone' | 'Deeper'
  text: string
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
  /** Starts a new part of the story, e.g. "The journey". */
  act?: string
  /** Choices on a guess card. */
  options?: GuessOption[]
  /** Shown once the reader has answered a guess card. */
  reveal?: string
}

export interface RouteStop {
  name: string
  at: LngLat
  /** An unnumbered point the leg into this stop passes through (e.g. the Negev on the way back from Egypt). */
  via?: LngLat
  /** Second line under the label while this is the current stop: the caveat for an uncertain site. */
  hedge?: string
}

export interface ParshaStory {
  parshaId: string
  tagline: string
  /** Numbered journey stops, in travel order. Empty for weeks with no journey. */
  route: RouteStop[]
  /** Where the story stays when there is no journey (e.g. the camp at Sinai). */
  anchor?: RouteStop
  cards: StoryCard[]
  /** Questions to bring to the table; the reader picks one at the end. */
  questions: TableQuestion[]
}

/** Cards whose visual rises into the space above the card instead of pointing at the map. */
export function isStageCard(card: StoryCard): boolean {
  if (card.kind === 'guess') return !card.options?.some((o) => o.at)
  return card.kind === 'letter' || card.kind === 'scale' || card.kind === 'quote' || card.kind === 'name'
}

/** Cards with their own content (no map subject): the camera aims at the strip above them. */
export function isPageCard(card: StoryCard): boolean {
  return isStageCard(card) || card.kind === 'offerings'
}

/** Seconds a card stays up: long enough to read it at a relaxed pace (~190 words a minute). */
export function cardSeconds(card: StoryCard): number {
  if (card.kind === 'cover') return 6
  const text = [card.title, card.body, card.reveal, ...(card.items ?? []).flatMap((i) => [i.en, i.note])].filter(Boolean).join(' ')
  const words = text.split(/\s+/).length
  const floor = card.kind === 'stars' || card.kind === 'name' || card.kind === 'quote' ? 8 : 6
  return Math.min(24, Math.max(floor, Math.round(3 + words / 3.2)))
}

/** Rough running time for the Today screen, counting the cards that advance on their own. */
export function storyMinutes(story: ParshaStory): number {
  const secs = story.cards.filter((c) => c.kind !== 'talk' && c.kind !== 'guess').reduce((t, c) => t + cardSeconds(c), 0)
  return Math.max(1, Math.round(secs / 60))
}

const HARAN: LngLat = [39.03, 36.86]
const SHECHEM: LngLat = [35.28, 32.21]
const BETHEL: LngLat = [35.24, 31.92]
const EGYPT: LngLat = [31.31, 30.13]
const HEBRON: LngLat = [35.1, 31.53]
const DAMASCUS: LngLat = [36.29, 33.51]
/** The Negeb (places.json), a region; an unnumbered waypoint on both Egypt legs (Genesis 12:9, 13:1). Its exact point is illustrative. */
const NEGEV: LngLat = [34.84, 31.24]

const lechLecha: ParshaStory = {
  parshaId: 'lech-lecha',
  tagline: 'Leave home. Go.',
  route: [
    { name: 'Haran', at: HARAN, hedge: 'usual identification' },
    { name: 'Shechem', at: SHECHEM, hedge: 'usual site' },
    { name: 'Bethel', at: BETHEL, hedge: 'usual site · tent to its east' },
    // Via the Negev both ways: toward the Negev before the famine (12:9), back up through it after (13:1).
    { name: 'Egypt', at: EGYPT, via: NEGEV, hedge: 'a region; where he stayed isn’t said' },
    // Back up through the Negev to the tent between Bethel and Ai (Genesis 13:1–4).
    { name: 'Bethel', at: BETHEL, via: NEGEV, hedge: 'usual site · tent to its east' },
    { name: 'Hebron', at: HEBRON, hedge: 'usual site' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Lech Lecha',
      body: 'Leave home. Go.',
      ref: 'Genesis 12:1 – 17:27',
      camera: { center: [36.2, 33.4], zoom: 4.7, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Go forth.',
      body: 'God tells Abram to leave his land, his birthplace and his father’s house for a land he will be shown. At 75, he sets out from Haran with Sarai, Lot and everything they own.',
      ref: 'Genesis 12:1–5',
      note: 'Genesis 12 doesn’t say where God first spoke to Abram (in 15:7 God says He brought Abram out from Ur); it says he set out from Haran (12:4). The pin marks Harran in southern Turkey, the site usually identified with Haran. Lines on the map join the stops in order; the roads Abram took aren’t known.',
      act: 'The journey',
      camera: { center: HARAN, zoom: 6.4, pitch: 45, bearing: -18 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Abram’s first altar',
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
      note: 'Bethel is usually identified with Beitin, north of Jerusalem. The pin marks Bethel; the tent stood east of it, between Bethel and Ai. The Torah uses the later name: Genesis 28:19 says the town was first called Luz.',
      camera: { center: BETHEL, zoom: 9.4, pitch: 58, bearing: 12 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'guess',
      title: 'A famine hits the land. Where does Abram take his household?',
      ref: 'Genesis 12:10',
      options: [
        { label: 'Back to Haran', at: HARAN },
        { label: 'Down to Egypt', at: EGYPT, correct: true },
        { label: 'North to Damascus', at: DAMASCUS },
      ],
      camera: { center: [35.3, 32.9], zoom: 4.4, pitch: 30, bearing: 0 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Famine. Down to Egypt.',
      body: 'A severe famine grips the land, and Abram goes down to Egypt to stay there for a while.',
      ref: 'Genesis 12:10',
      note: 'Before the famine Abram had moved south, toward the Negev (12:9); the line bends at an illustrative point there. The verses don’t say where in Egypt he stayed; the pin just marks Egypt.',
      camera: { center: [32.6, 30.6], zoom: 6.2, pitch: 42, bearing: 12 },
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'Lot chooses the plain',
      body: 'Back at the tent between Bethel and Ai, Abram’s and Lot’s flocks and herds are too many for the land to hold them both, and their herders quarrel. Lot picks the well-watered Jordan plain and pitches his tents near Sodom.',
      ref: 'Genesis 13:1–12',
      note: 'From Egypt they went back up through the Negev to the old tent site (13:1–3). Where Sodom stood isn’t known; the pin follows one disputed proposal, Tall el-Hammam, north-east of the Dead Sea, and others place it elsewhere. The numbered pin marks Bethel; the tent site was east of it, toward Ai.',
      camera: { center: [35.44, 31.9], zoom: 8.6, pitch: 55, bearing: -40 },
      routeTo: 4,
      stop: 5,
      spot: { name: 'Sodom (site unknown)', at: [35.67, 31.84] },
    },
    {
      kind: 'chapter',
      title: 'Settling in Hebron',
      body: 'Abram moves his tent to the terebinths of Mamre, in Hebron, and builds an altar there.',
      ref: 'Genesis 13:18',
      note: 'The pin marks Hebron, at its usual site. Where the terebinths of Mamre stood isn’t known. The Torah uses the later name: Genesis 23:2 says Hebron was once called Kiriath-arba.',
      camera: { center: HEBRON, zoom: 9.6, pitch: 58, bearing: -10 },
      routeTo: 5,
      stop: 6,
    },
    {
      kind: 'chapter',
      title: 'The rescue',
      body: 'When Lot is taken captive in a war between kings, Abram musters 318 men, pursues the raiders as far as Dan, defeats them at night, chases them as far as Hobah, north of Damascus, and brings Lot back.',
      ref: 'Genesis 14:1–16',
      note: 'Dan is most likely the town’s later name (Judges 18:29; Joshua 19:47). Radak on 14:14 says so, though he allows that a place may already have been called Dan then. The pin marks Tel Dan, its usual identification. Where Hobah was is unknown (Rashi, following a midrash, reads it as another name for Dan), so it isn’t pinned; Damascus (not shown) lies east-north-east of Dan.',
      camera: { center: [35.8, 33.0], zoom: 6.6, pitch: 50, bearing: -8 },
      routeTo: 5,
      spot: { name: 'Dan (usual site: Tel Dan)', at: [35.65, 33.25] },
    },
    {
      kind: 'stars',
      title: 'Look toward heaven and count the stars, if you are able to count them.',
      body: 'So shall your offspring be.',
      ref: 'Genesis 15:5',
      note: 'The verse doesn’t say what time it was, and the night sky here is an illustration. On the plain meaning, say Rashi and Ramban, God took Abram out of his tent to see the stars (both also quote a midrash reading it differently). Ibn Ezra reads it as a vision Abram woke from; on his reading, Abram took the animals by day, after he woke, since the chapter goes on to the sun going down (15:12) and then, after sunset, darkness, when the covenant was made (15:17–18). Radak says the going outside was part of the vision. Genesis 15 doesn’t say where this happened; it says only that it came “after these things” (15:1). In the order of the verses Abram was last living by the terebinths of Mamre, in Hebron (13:18; 14:13), and the map follows that. Later in the same chapter God makes a covenant with Abram (15:18). A tradition in Seder Olam dates that covenant earlier, when Abram was 70; only afterward, it says, did he spend five years in Haran before setting out at 75, so on that reckoning it was not at Hebron. Rashi (on Exodus 12:40) likewise counts 30 years from it to Isaac’s birth.',
      act: 'The covenant',
      camera: { center: HEBRON, zoom: 7.4, pitch: 76, bearing: 0 },
      routeTo: 5,
    },
    {
      kind: 'chapter',
      title: 'Hagar and Ishmael',
      body: 'Sarai gives her servant Hagar to Abram, hoping for a child through her. When Hagar conceives, she looks down on Sarai; Sarai treats her harshly, and Hagar runs away. An angel finds her by a spring in the wilderness and sends her back; the well there is named Beer-lahai-roi. She bears Abram a son, Ishmael. Abram is 86.',
      ref: 'Genesis 16:1–16',
      note: 'Its site is unknown. The verses put the spring on the road to Shur (16:7) and the well between Kadesh and Bered (16:14); the pin is only a rough guess in that direction (the Map tab’s place list uses another guess, further north). Chapters 16–17 say only that Abram had lived ten years in the land of Canaan (16:3), not in which town; the line stays at Hebron, his last stated home (13:18; 14:13).',
      camera: { center: [34.6, 30.95], zoom: 7.6, pitch: 50, bearing: 24 },
      routeTo: 5,
      spot: { name: 'Beer-lahai-roi (site unknown)', at: [34.45, 30.75] },
    },
    {
      kind: 'name',
      title: 'Abram becomes Abraham',
      body: 'When Abram is 99, God makes a covenant with him and gives him a new name, Abraham, for “I make you the father of a multitude of nations” (17:5). Circumcision becomes the sign of the covenant.',
      ref: 'Genesis 17:1–11',
      note: 'God first made a covenant with Abram in Genesis 15:18; here He makes a covenant with him again, this time with the new name and circumcision as its sign.',
      camera: { center: [35.6, 33.2], zoom: 4.9, pitch: 20, bearing: 0 },
      routeTo: 5,
    },
    {
      kind: 'talk',
      title: 'God told Abram to leave his land and his father’s house for “the land that I will show you,” without naming it. What would be hardest for you to leave behind?',
      note: 'Numbered pins mark usual identifications (Haran = Harran, Shechem = Tell Balata, Bethel = Beitin); none is certain, and Egypt is a region. Zoomed out this far, stops close together share one pin, numbered for each stop in it (for example 2·3·5·6 for Shechem, Bethel twice and Hebron). God’s words don’t name the land (12:1), though 12:5 says they set out for the land of Canaan. Lines join the stops in order; the roads Abram took aren’t known.',
      camera: { center: [35.6, 33.2], zoom: 4.9, pitch: 20, bearing: 0 },
      routeTo: 5,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'God added a letter to Abram’s name and made it Abraham. If you got a new name that said something about you, what would it be?',
    },
    {
      audience: 'Everyone',
      text: 'God told Abram to leave his land and his father’s house for “the land that I will show you,” without naming it. What would be hardest for you to leave behind?',
    },
    {
      audience: 'Deeper',
      text: 'Abram let Lot choose first, and Lot took the well-watered plain. Later Abram went after Lot’s captors with the 318 men of his household. Why do you think he did?',
    },
  ],
}

// ─── Vayikra: no journey. The camp stays at Sinai; the story is about the
// Tabernacle and what people bring to it. Sources: see the file header.

/** Jebel Musa summit (OSM peak). One of several proposed sites for Sinai. */
const SINAI: LngLat = [33.9752, 28.5388]
/** Illustrative, locally near-flat spot about 3.1 km north-west (bearing ≈327°) of the Jebel Musa pin (today inside the town of Saint Catherine), used only to place the to-scale plan. */
export const MISHKAN_AT: LngLat = [33.958, 28.562]

const vayikra: ParshaStory = {
  parshaId: 'vayikra',
  tagline: 'He called.',
  route: [],
  anchor: { name: 'in the wilderness of Sinai', at: SINAI },
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
      body: 'No journey this week. The people are camped in the wilderness of Sinai, the Tabernacle has just been set up, and God calls to Moses and speaks to him from the Tent of Meeting.',
      ref: 'Leviticus 1:1, 7:38 · Exodus 40:17 · Numbers 1:1',
      note: 'The pin marks Jebel Musa, one of several proposed sites; no one knows for sure where Sinai was.',
      act: 'The call',
      camera: { center: SINAI, zoom: 9.2, pitch: 58, bearing: -20 },
      routeTo: 0,
      spot: { name: 'Jebel Musa (a proposed Mount Sinai)', at: SINAI },
    },
    {
      kind: 'letter',
      title: 'A small aleph',
      hebrew: 'וַיִּקְרָא',
      body: 'The book’s first word, “He called,” ends with an aleph that, by scribal tradition, is written small in the Torah scroll. The Kitzur Baal HaTurim explains: Moses wanted to write וַיִּקָּר, “He happened upon,” as if God had met him only by chance, the word used for Bilaam. God told him to include the aleph, but Moses wrote it small.',
      ref: 'Leviticus 1:1 · Kitzur Baal HaTurim',
      note: 'Rashi on Leviticus 1:1 calls “He called” a word of affection, unlike the “chance” word used for Bilaam (Numbers 23:4). The ratio of the small letter in the drawing is illustrative.',
      camera: { center: MISHKAN_AT, zoom: 10.4, pitch: 62, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'plan',
      title: 'The Tabernacle courtyard, to scale',
      body: 'A courtyard 100 cubits by 50: about 50 by 25 metres if a cubit is half a metre, roughly an Olympic pool. The altar of burnt offering stands at the Tabernacle’s entrance, and offerings are brought there.',
      ref: 'Exodus 27:1, 18; 40:29–30 · Leviticus 1:3',
      act: 'The offerings',
      note: 'Tent placement and the 10 × 10 cubit Holy of Holies follow Rashi (Exodus 26:32, 27:18). The altar’s exact spot is schematic and the laver (Exodus 40:30) is not shown. Posts are drawn evenly every 5 cubits, so the 20-cubit gate shows five dots from edge to edge. The text gives each 15-cubit flank three posts and the gate four (Exodus 27:14–16); the drawing’s even spacing cannot show that split exactly. Where it all stood is unknown; the location is illustrative and lies in today’s town of Saint Catherine.',
      // Camera is set per ground treatment in DaylightMap's cameraFor().
      camera: { center: MISHKAN_AT, zoom: 18.4, pitch: 48, bearing: -24 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'Five kinds of offering',
      ref: 'Leviticus 1–5',
      note: '“Purgation” and “well-being” follow the JPS Tanakh: Gender-Sensitive Edition, which calls the אָשָׁם the reparation offering; here it keeps its familiar name, guilt offering. Older translations say sin offering and peace offering. The priest keeps the burnt offering’s hide (7:8).',
      items: [
        { he: 'עֹלָה', en: 'Burnt offering', note: 'An unblemished male from the herd or flock is skinned and cut up, and all of it goes up in smoke on the altar; the priest keeps the hide. A bird may be brought instead.' },
        { he: 'מִנְחָה', en: 'Grain offering', note: 'Usually choice flour with oil and frankincense. Always salted.' },
        { he: 'שְׁלָמִים', en: 'Well-being offering', note: 'From the herd or the flock, male or female.' },
        { he: 'חַטָּאת', en: 'Purgation offering', note: 'Mostly for a wrong done without meaning to.' },
        { he: 'אָשָׁם', en: 'Guilt offering', note: 'Among its cases: misusing holy things by mistake, or cheating someone and swearing falsely. Then you pay it back, plus a fifth.' },
      ],
      camera: { center: MISHKAN_AT, zoom: 17.9, pitch: 40, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'scale',
      title: 'A sliding scale',
      body: 'For some purgation offerings, the Torah sets a sliding scale: if a sheep or goat is too much, bring two birds, one as a purgation offering and one as a burnt offering. If birds are too much, a tenth of an ephah of flour is enough.',
      ref: 'Leviticus 5:6–7, 5:11',
      items: [
        { en: 'A ewe', note: 'or a she-goat' },
        { en: 'Two birds', note: 'turtledoves or pigeons' },
        { en: 'A tenth of an ephah', note: 'of choice flour' },
      ],
      camera: { center: MISHKAN_AT, zoom: 11, pitch: 50, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'guess',
      title: 'The Torah says one of these goes with all your offerings. Which one?',
      ref: 'Leviticus 2:11–13',
      options: [
        { label: 'Honey', he: 'דְּבַשׁ' },
        { label: 'Salt', he: 'מֶלַח', correct: true },
        { label: 'Leaven', he: 'שְׂאֹר' },
      ],
      reveal: 'The Torah says, “with all your offerings you shall offer salt” (2:13). Honey and leaven may never be burned on the altar (2:11).',
      camera: { center: MISHKAN_AT, zoom: 10.8, pitch: 64, bearing: -30 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'With all your offerings you shall offer salt.',
      hebrew: 'עַל כׇּל־קׇרְבָּנְךָ תַּקְרִיב מֶלַח',
      body: 'The verse first speaks of grain offerings, then all offerings. Rashi, following the Talmud, reads it as covering animal and bird offerings too (the parts burned on the altar).',
      ref: 'Leviticus 2:13 · Rashi',
      camera: { center: MISHKAN_AT, zoom: 11.5, pitch: 70, bearing: 40 },
      routeTo: 0,
    },
    {
      kind: 'talk',
      title: 'Vayikra makes room for a little flour when even two birds are out of reach. What small thing has someone given you that meant a lot?',
      camera: { center: SINAI, zoom: 8, pitch: 30, bearing: 0 },
      routeTo: 0,
      spot: { name: 'Jebel Musa (a proposed Mount Sinai)', at: SINAI },
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'The Torah says, “with all your offerings you shall offer salt.” What small thing makes a big difference, the way a pinch of salt does in food?',
    },
    {
      audience: 'Everyone',
      text: 'Vayikra makes room for a little flour when even two birds are out of reach. What small thing has someone given you that meant a lot?',
    },
    {
      audience: 'Deeper',
      text: 'In the Kitzur Baal HaTurim, Moses would have written the word without the aleph, as if God met him only by chance, and even when God told him to include it, he wrote it small. Why do you think Moses wanted it to look like chance?',
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
