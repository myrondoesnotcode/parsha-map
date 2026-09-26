// Parsha Stories — tap-through cards that drive the map camera.
// Text is paraphrased from the verses cited on each card (checked against
// Sefaria's English of Genesis 12–17).

export type LngLat = [number, number]

export interface StoryCamera {
  center: LngLat
  zoom: number
  pitch?: number
  bearing?: number
}

export type StoryCardKind = 'cover' | 'chapter' | 'stars' | 'name' | 'talk'

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
}

export interface RouteStop {
  name: string
  at: LngLat
}

export interface ParshaStory {
  parshaId: string
  tagline: string
  /** Numbered journey stops, in travel order. */
  route: RouteStop[]
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

const STORIES: Record<string, ParshaStory> = {
  [lechLecha.parshaId]: lechLecha,
}

export function getStory(parshaId: string | null): ParshaStory | null {
  return parshaId ? STORIES[parshaId] ?? null : null
}
