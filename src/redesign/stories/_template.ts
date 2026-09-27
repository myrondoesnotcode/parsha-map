// <Display Name> — <Book C:V – C:V>. <One line: what this story is about.>
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// HOW TO USE THIS TEMPLATE (delete this block when done)
// 1. Copy to src/redesign/stories/<parshaId>.ts (the id from src/data/parshaList.json). Files starting
//    with `_` are not registered, so this template never shows in the app.
// 2. The first line must read exactly "// <name> — <range>" as `npm run check:stories` prints it,
//    e.g. "// Bereshit — Genesis 1:1 – 6:8".
// 3. The cover's title, body and ref come from the parsha record (the checker says what they must be).
//    The cover art is the parsha's papercut emblem, picked by parshaId: nothing to add.
// 4. Pick a shape: a journey (fill `route`, number the stops) or a week that stays put (empty `route`,
//    set `anchor`). Most weeks with 0–3 places stay put; see the guide.
// 5. Every `place` is an id from src/data/places.json. Every card's `ref` must be covered by `sources`.
// 6. Run: npm run check:stories -- <parshaId> --strict, npm run build, then the fact-check workflow.
import type { LngLat, ParshaStory } from '../story'

/** <Place> (places.json <id>): why this point. Say "usual site" / "proposed" when it isn't certain. */
const HERE: LngLat = [35.0, 31.0]

const story: ParshaStory = {
  parshaId: 'parsha-id',
  tagline: 'Two to four words.',
  sources: [
    // Verse ranges first, then named works with where they comment, e.g.
    // 'Genesis 1–6', 'Rashi on Genesis 1:1', 'Bereshit Rabbah 1:1'.
    'Genesis 1–6',
  ],
  // A journey: numbered stops in travel order. Leave empty for a week that stays put.
  // { name: 'Haran', at: [39.03, 36.86], place: 'a6d9af3', hedge: 'usual identification' },
  route: [],
  // A week that stays put: where the map holds. Its name shows on the cover ("… · in the wilderness of Sinai").
  anchor: { name: 'in the land of Canaan', at: HERE, place: 'places-json-id' },
  cards: [
    {
      kind: 'cover',
      title: 'Display Name',
      body: 'Two to four words.',
      ref: 'Genesis 1:1 – 6:8',
      camera: { center: HERE, zoom: 5.6, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'A short headline',
      body: 'Two or three sentences, each one traceable to the verses in ref.',
      ref: 'Genesis 1:1–5',
      note: 'What the verses leave open, what is illustrative on the map, and who says what (by name).',
      act: 'Part one',
      camera: { center: HERE, zoom: 8.6, pitch: 55, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'The verse in English, exactly as the translation you cite has it.',
      hebrew: 'בְּרֵאשִׁית',
      body: 'One line on why this verse matters, with the commentator named.',
      ref: 'Genesis 1:1',
      camera: { center: HERE, zoom: 11, pitch: 64, bearing: 30 },
      routeTo: 0,
    },
    {
      kind: 'guess',
      title: 'A question the verses answer.',
      ref: 'Genesis 1:3',
      options: [
        { label: 'Right answer', correct: true },
        { label: 'Plausible wrong answer' },
        { label: 'Another wrong answer' },
      ],
      reveal: 'Quote the verse that answers it (1:3).',
      camera: { center: HERE, zoom: 10.8, pitch: 64, bearing: -30 },
      routeTo: 0,
    },
    {
      kind: 'talk',
      title: 'The Everyone question again, as the closing card.',
      camera: { center: HERE, zoom: 8, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
  ],
  questions: [
    { audience: 'Kids', text: 'A question a child can answer from the story.' },
    { audience: 'Everyone', text: 'The closing talk card’s question.' },
    { audience: 'Deeper', text: 'A question that needs the commentary or a close reading.' },
  ],
}

export default story
