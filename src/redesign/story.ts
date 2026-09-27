// Parsha Stories: the shared model. Each story lives in its own file, stories/<parshaId>.ts,
// and is registered automatically by stories/index.ts. How to write one: docs/plans/story-authoring.md.
// Check with `npm run check:stories`; run the parsha-fact-check workflow on any change to story text.

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
  /** places.json id of the option's place, when it has a pin. Checked by `npm run check:stories`. */
  place?: string
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
  /**
   * Extra place (not a numbered stop) to spotlight. `place` is its places.json id, when it has one;
   * the pin may differ from the gazetteer's on purpose (say why in the card's note).
   */
  spot?: { name: string; at: LngLat; place?: string }
  /** Rows for list-style cards (offerings, scale). */
  items?: StoryItem[]
  /** Hebrew line for quote and letter cards. */
  hebrew?: string
  /**
   * Letter cards: which letter of `hebrew` the scroll writes differently, counting letters from the
   * start of the line (0-based; vowel marks don't count). Defaults to the last letter.
   */
  letterAt?: number
  /** Letter cards: whether the scroll writes that letter small (the default) or large. */
  letterSize?: 'small' | 'large'
  /**
   * Name cards: the name before and after, in Hebrew (Lech Lecha: אברם → אברהם). Letters the two
   * share stay in place; the rest fall away and the new ones drop in.
   */
  names?: { from: string; to: string }
  /** Stars cards: the sky drawn behind them. 'dawn' warms the lower sky for a scene at daybreak (Genesis 32:27). */
  sky?: 'night' | 'dawn'
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
  /** places.json id of this stop. `npm run check:stories` requires it and checks `at` sits on that place's pin. */
  place: string
  /** An unnumbered point the leg into this stop passes through (e.g. the Negev on the way back from Egypt). */
  via?: LngLat
  /** Second line under the label while this is the current stop: the caveat for an uncertain site. */
  hedge?: string
}

export interface ParshaStory {
  parshaId: string
  tagline: string
  /**
   * Every source the story's cards cite: verse ranges ("Leviticus 1–5, 7:8") and named works
   * ("Rashi on Exodus 26:32"). `npm run check:stories` checks each card's `ref` against this list.
   */
  sources: string[]
  /** Numbered journey stops, in travel order. Empty for weeks with no journey. */
  route: RouteStop[]
  /** Where the story stays when there is no journey (e.g. the camp at Sinai). */
  anchor?: RouteStop
  cards: StoryCard[]
  /** Questions to bring to the table; the reader picks one at the end. */
  questions: TableQuestion[]
}

/**
 * A Hebrew line split into letters, each with its vowel and cantillation marks. Anything that isn't a
 * Hebrew letter (a space, a maqaf) comes back as its own piece with `letter: false`.
 */
export function hebrewLetters(line: string): { text: string; letter: boolean }[] {
  return (line.match(/\P{M}\p{M}*/gu) ?? []).map((text) => ({ text, letter: /[\u05D0-\u05EA]/.test(text) }))
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

/** Illustrative, locally near-flat spot about 3.1 km north-west (bearing ≈327°) of the Jebel Musa pin (today inside the town of Saint Catherine), used only to place the to-scale plan. */
export const MISHKAN_AT: LngLat = [33.958, 28.562]
