// Bereshit — Genesis 1:1 – 6:8. No journey: creation, the garden, Cain and Abel, ten generations to Noah.
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A thin-map week. Eden, the Pishon, the Gihon, Havilah, Cush and Nod can't be located, so none is
// pinned. The only real geography the text names is the Tigris and the Euphrates (2:14); the one map
// moment marks where they meet today, and says it is not Eden. Verses quote THE JPS TANAKH:
// Gender-Sensitive Edition (Sefaria). Claim table: docs/plans/2026-09-27-bereshit-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/**
 * Tigris (places.json a38ebfd), pinned at al-Qurnah in southern Iraq, where the Tigris and Euphrates join
 * today to form the Shatt al-Arab. A river mouth, not a claim about Eden.
 */
const RIVERS_MEET: LngLat = [47.4421, 31.0043]
const TIGRIS_PLACE = 'a38ebfd'
/** A wide view over the two rivers, used as a backdrop for the page cards. Not a location claim. */
const REGION: LngLat = [44.4, 33.2]

const bereshit: ParshaStory = {
  parshaId: 'bereshit',
  tagline: 'In the beginning.',
  sources: [
    'Genesis 1–6',
    'Exodus 12:2',
    'Rashi on Genesis 1:1, 2:11, 3:9',
    'Bereshit Rabbah 1:10',
    'Pirkei Avot 5:2',
    'Siddur Ashkenaz, Kiddush (Shabbat Evening; Metsudah translation)',
    'Siddur Edot HaMizrach, Shabbat Evening, Kiddush',
  ],
  route: [],
  anchor: { name: 'the Tigris and Euphrates (2:14)', at: RIVERS_MEET, place: TIGRIS_PLACE },
  cards: [
    {
      kind: 'cover',
      title: 'Bereshit',
      body: 'In the beginning.',
      ref: 'Genesis 1:1 – 6:8',
      camera: { center: REGION, zoom: 4.6, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Before any map',
      body: 'No journey this week, and hardly a map. Bereshit begins with heaven and earth themselves. It puts the garden of Eden only “in the east,” and no one knows where Cain’s land of Nod was. But two rivers it names still flow today.',
      ref: 'Genesis 1:1, 2:8, 2:14, 4:16',
      note: 'The map is a backdrop for the region of the two named rivers, the Tigris and the Euphrates (2:14); it doesn’t mark where anything in the story happened. Genesis 2:14 also names Asshur (Assyria), saying the Tigris flows east of it.',
      act: 'Creation',
      camera: { center: REGION, zoom: 4.9, pitch: 30, bearing: -10 },
      routeTo: 0,
    },
    {
      kind: 'guess',
      title: 'Which letter does the whole Torah begin with?',
      ref: 'Genesis 1:1 · Bereshit Rabbah 1:10',
      options: [
        { label: 'Aleph', he: 'א' },
        { label: 'Bet', he: 'ב', correct: true },
        { label: 'Shin', he: 'ש' },
      ],
      reveal: 'Its first word, בְּרֵאשִׁית, starts with bet (1:1). Bereshit Rabbah 1:10 asks why not aleph, the first letter, and one answer it gives is that bet begins the word for blessing, berakhah.',
      note: 'Bereshit Rabbah 1:10 gives several answers. Another: bet is closed on three sides and open only in front, teaching that we may ask only from the day the world was created onward, not what is above, below or before.',
      camera: { center: REGION, zoom: 5.4, pitch: 50, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'When God began to create heaven and earth—',
      hebrew: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ',
      body: 'Seven Hebrew words. Rashi on Genesis 1:1 reads the first as “at the beginning of God’s creating,” and says the verse doesn’t come to teach what was created first.',
      ref: 'Genesis 1:1 · Rashi on Genesis 1:1',
      note: 'The English is THE JPS TANAKH: Gender-Sensitive Edition. Rashi’s commentary actually opens with another question, from Rabbi Isaac: why does the Torah begin with creation and not with the first commandment given to Israel (Exodus 12:2)? His answer: the whole earth is God’s, to give to whom God pleases.',
      camera: { center: REGION, zoom: 5.6, pitch: 55, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'Seven days',
      ref: 'Genesis 1:1 – 2:3',
      note: 'Day one in Hebrew is יוֹם אֶחָד, literally “one day”; the JPS translation says “a first day.” The Torah doesn’t name the sun and moon here: it calls them the greater and lesser lights (1:16).',
      items: [
        { he: 'אֶחָד', en: 'Light', note: 'Separated from darkness: Day and Night.' },
        { he: 'שֵׁנִי', en: 'Sky', note: 'An expanse between the waters.' },
        { he: 'שְׁלִישִׁי', en: 'Land, seas, plants', note: 'Dry land appears; fruit trees sprout.' },
        { he: 'רְבִיעִי', en: 'Great lights and stars', note: 'To rule day and night, and mark set times.' },
        { he: 'חֲמִישִׁי', en: 'Sea creatures and birds', note: 'Swarms in the water, birds in the sky.' },
        { he: 'הַשִּׁשִּׁי', en: 'Animals and humankind', note: 'Humankind in the divine image. All “very good.”' },
        { he: 'הַשְּׁבִיעִי', en: 'The seventh day', note: 'God ceases from the work and makes it holy.' },
      ],
      camera: { center: REGION, zoom: 5.2, pitch: 40, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'stars',
      title: 'God made the two great lights, … the lesser light to dominate the night, and the stars.',
      body: 'The fourth day.',
      ref: 'Genesis 1:16–19',
      note: 'The verse calls them the greater and lesser lights and doesn’t name the sun and moon. The night sky here is an illustration.',
      camera: { center: REGION, zoom: 5.4, pitch: 76, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'And God blessed the seventh day and declared it holy',
      hebrew: 'וַיְבָרֶךְ אֱלֹהִים אֶת־יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ',
      body: 'On Friday night, Kiddush recites these verses (2:1–3), and its blessing calls Shabbat “a commemoration of the work of creation.”',
      ref: 'Genesis 2:1–3 · Siddur Ashkenaz, Kiddush',
      note: 'Both the Ashkenazi siddur and the Edot HaMizrach siddur say Genesis 2:1–3 in Friday-night Kiddush, just after the words “the sixth day” from 1:31. The phrase “a commemoration of the work of creation” (זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית) is in the Kiddush blessing in both; the English is the Metsudah siddur’s.',
      camera: { center: REGION, zoom: 5.8, pitch: 62, bearing: -30 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Two rivers you can still find',
      body: 'A river flows out of Eden to water the garden, then branches into four. Two of them are the Tigris and the Euphrates, which still meet today in southern Iraq. The Torah puts the garden “in the east” and no more; no one knows where it was.',
      ref: 'Genesis 2:8–14',
      note: 'In Hebrew the Tigris is חִדֶּקֶל (Hiddekel) and the Euphrates פְרָת (Perat). The other two rivers, the Pishon and the Gihon, and the lands they wind through, Havilah and Cush, can’t be identified with certainty; Rashi on Genesis 2:11 says the Pishon is the Nile. The pin marks al-Qurnah, where the two rivers join to form the Shatt al-Arab. Local folklore there says the garden was at al-Qurnah; the Torah doesn’t say so, and the pin does not mark Eden.',
      act: 'The garden',
      camera: { center: RIVERS_MEET, zoom: 6.4, pitch: 45, bearing: -15 },
      routeTo: 0,
      spot: { name: 'Tigris and Euphrates (where they meet today)', at: RIVERS_MEET, place: TIGRIS_PLACE },
    },
    {
      kind: 'chapter',
      title: '“Where are you?”',
      body: 'God settles the first human in the garden to till it and tend it, and forbids the fruit of the tree of knowledge of good and bad. The serpent persuades the woman to eat it; she gives some to her husband, and he eats too. They hide, and God calls out, “Where are you?” In the end, they are sent out of the garden.',
      ref: 'Genesis 2:15–17, 3:1–24',
      note: '“Good and bad” is the JPS rendering; many translations say “good and evil.” The Torah doesn’t say what kind of fruit it was. After they leave, cherubim and a fiery ever-turning sword guard the way to the tree of life (3:24). The map is a backdrop only.',
      camera: { center: REGION, zoom: 5.6, pitch: 50, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Am I my brother’s keeper?',
      body: 'Cain brings an offering from the fruit of the soil, and Abel the choicest of the firstlings of his flock. God pays heed to Abel and his offering, but not to Cain and his. Cain kills his brother. Asked “Where is your brother Abel?” he answers, “I do not know. Am I my brother’s keeper?”',
      ref: 'Genesis 4:1–16',
      note: 'God puts a mark on Cain, so that no one who meets him will kill him (4:15), and Cain settles in the land of Nod, east of Eden (4:16). Where Nod was is unknown, so it isn’t pinned.',
      act: 'Outside the garden',
      camera: { center: REGION, zoom: 5.2, pitch: 45, bearing: -25 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Ten generations',
      body: 'Chapter 5 lists ten generations, from Adam to Noah. Methuselah lives longest, 969 years. Of Enoch it says, “Enoch walked with God; then he was no more, for God took him.”',
      ref: 'Genesis 5:1–32 · Pirkei Avot 5:2',
      note: 'The ten: Adam, Seth, Enosh, Kenan, Mahalalel, Jared, Enoch, Methuselah, Lamech, Noah. Pirkei Avot 5:2 counts “ten generations from Adam to Noah,” to show how patient God was with them.',
      camera: { center: REGION, zoom: 5.0, pitch: 35, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'But Noah found favor',
      body: 'God sees how great human wickedness has become on earth and regrets having made humankind. The parsha ends: “But Noah found favor with GOD.” His story is next week’s parsha, Noach.',
      ref: 'Genesis 6:5–8',
      note: '“GOD” is how the JPS Gender-Sensitive Edition renders God’s four-letter name in this verse.',
      camera: { center: REGION, zoom: 4.8, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'talk',
      title: 'When God asked Cain where his brother was, Cain answered, “Am I my brother’s keeper?” Who do you look out for, and who looks out for you?',
      note: 'No journey this week, so no route is drawn. The one pin in the story marks where the Tigris and Euphrates meet today, not Eden; the other places Bereshit names can’t be located.',
      camera: { center: REGION, zoom: 4.6, pitch: 25, bearing: 0 },
      routeTo: 0,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'God blessed the seventh day and made it holy. What is your favorite thing about Shabbat in your home?',
    },
    {
      audience: 'Everyone',
      text: 'When God asked Cain where his brother was, Cain answered, “Am I my brother’s keeper?” Who do you look out for, and who looks out for you?',
    },
    {
      audience: 'Deeper',
      text: 'Rashi on Genesis 3:9 says God knew where the first human was, and asked “Where are you?” to open a conversation. Why ask a question when you already know the answer?',
    },
  ],
}

export default bereshit
