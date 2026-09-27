// Vayikra — Leviticus 1:1 – 5:26. No journey: the camp stays at Sinai; the story is about the
// Tabernacle and what people bring to it.
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
import { MISHKAN_AT } from '../story'
import type { LngLat, ParshaStory } from '../story'

/** Jebel Musa summit (OSM peak). One of several proposed sites for Sinai. */
const SINAI: LngLat = [33.9752, 28.5388]
/** places.json: Mount Sinai (pinned at Jebel Musa). */
const SINAI_PLACE = 'abfba2a'

const vayikra: ParshaStory = {
  parshaId: 'vayikra',
  tagline: 'He called.',
  sources: [
    'Leviticus 1–5, 7:8, 7:38',
    'Exodus 26–27, 40',
    'Numbers 1:1, 23:4',
    'Kitzur Baal HaTurim on Leviticus 1:1',
    'Rashi on Exodus 26:32, 27:18',
    'Rashi on Leviticus 1:1 and 2:13 (citing Menachot 20a)',
  ],
  route: [],
  anchor: { name: 'in the wilderness of Sinai', at: SINAI, place: SINAI_PLACE },
  cards: [
    {
      kind: 'cover',
      title: 'Vayikra',
      body: 'He called.',
      ref: 'Leviticus 1:1 – 5:26',
      // Cover art is the parsha's papercut emblem (src/redesign/art/), picked by parshaId. No `image`:
      // the parsha's image in parshaList.json is a 15th-century Christian typological panel
      // (with Cain and Abel), not right for this cover.
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
      spot: { name: 'Jebel Musa (a proposed Mount Sinai)', at: SINAI, place: SINAI_PLACE },
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
      spot: { name: 'Jebel Musa (a proposed Mount Sinai)', at: SINAI, place: SINAI_PLACE },
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

export default vayikra
