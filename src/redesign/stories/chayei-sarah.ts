// Chayei Sarah — Genesis 23:1 – 25:18
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A journey, but not Abraham's: his servant goes from Canaan to "the city of Nahor" in Aram-naharaim
// and brings Rebekah back to Isaac in the Negev. The verse says only "the city of Nahor": the town where
// Abraham's brother Nahor lived, or possibly a town of that name (Nahur); the pin sits on Harran because
// Laban later lives in Haran (27:43; 29:4–5). Genesis 24 doesn't say where Abraham
// sent the servant from; the line starts at Hebron, where chapter 23 leaves him. Verses quote THE JPS
// TANAKH: Gender-Sensitive Edition (Sefaria). Claim table: docs/plans/2026-09-27-chayei-sarah-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Hebron (places.json a85151a), pinned at Tel Rumeida, the tell usually taken to be ancient Hebron. */
const HEBRON: LngLat = [35.10222, 31.525087]
/** Machpelah (places.json ae00861), pinned at the Cave of the Patriarchs, its traditional site. */
const MACHPELAH: LngLat = [35.110758, 31.524672]
/**
 * Nahor (places.json aff43ac): "the city of Nahor" (24:10), pinned at Harran, on the reading that it was
 * Haran, where Laban lives (27:43). The verse says only "the city of Nahor", which may mean Nahor's town
 * or a town of that name.
 */
const NAHOR: LngLat = [39.032778, 36.864444]
/** The Negeb (places.json a1cb244), a region; the point is illustrative. Where Isaac met Rebekah isn't said. */
const NEGEB: LngLat = [34.840833, 31.244722]
/** Beer-lahai-roi (places.json a70e842): site unknown. The gazetteer's guess (Haluza), shown hedged. */
const BEER_LAHAI_ROI: LngLat = [34.652, 31.097]
/** A wide view over the whole journey, for the cover and the last card. Not a location claim. */
const REGION: LngLat = [37.0, 34.2]

const chayeiSarah: ParshaStory = {
  parshaId: 'chayei-sarah',
  tagline: 'The life of Sarah.',
  sources: [
    'Genesis 23–25, 11:27, 12:7, 15:2, 16:14, 22:19–23, 27:43, 29:4–5, 49:29–32, 50:13',
    'Rashi on Genesis 23:4',
    'Rashi on Genesis 24:57',
    'Rashi on Genesis 24:67',
    'Rashi on Genesis 23:1, 23:2, 23:16, 24:10, 24:39, 24:42, 25:1, 25:9',
    'Rashbam on Genesis 25:1',
    'Ibn Ezra on Genesis 25:1',
    'Bereshit Rabbah 58:1, 58:6, 59:9, 60:8, 60:12, 60:16 (as quoted by Rashi)',
    'Pirkei DeRabbi Eliezer 32 (as quoted by Rashi on Genesis 23:2)',
    'Bava Metzia 87a (as quoted by Rashi on Genesis 23:16)',
    'Sanhedrin 95a',
    'Berakhot 26b',
    'JPS translators’ note on Genesis 24:63',
    'Wikipedia, “Cave of the Patriarchs” and “Tel Rumeida”',
  ],
  route: [
    { name: 'Hebron', at: HEBRON, place: 'a85151a', hedge: 'usual site' },
    { name: 'Nahor', at: NAHOR, place: 'aff43ac', hedge: 'probably Haran' },
    { name: 'Negeb', at: NEGEB, place: 'a1cb244', hedge: 'a region' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Chayei Sarah',
      body: 'The life of Sarah.',
      ref: 'Genesis 23:1 – 25:18',
      camera: { center: REGION, zoom: 4.6, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'The life of Sarah',
      body: 'Sarah lives to 127. She dies in Kiriath-arba, now Hebron, in the land of Canaan, and Abraham mourns and weeps for her. The parsha called “the life of Sarah” begins with her death.',
      ref: 'Genesis 23:1–2',
      note: 'The Hebrew counts her years as “a hundred years and twenty years and seven years.” Rashi on 23:1, from Bereshit Rabbah 58:1, reads each part on its own: at 100 she was as free of sin as at 20, and at 20 as beautiful as at 7. On 23:2 Rashi says Abraham came from Beer-sheba (where 22:19 last left him). He also says her death is told right after the binding of Isaac because the news of it was too great a shock for her, a teaching found in Pirkei DeRabbi Eliezer 32. The pin marks Tel Rumeida, the tell usually identified with ancient Hebron.',
      act: 'Sarah',
      camera: { center: HEBRON, zoom: 9.6, pitch: 55, bearing: -12 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'quote',
      title: 'I am a resident alien among you; sell me a burial site among you',
      hebrew: 'גֵּר־וְתוֹשָׁב אָנֹכִי עִמָּכֶם תְּנוּ לִי אֲחֻזַּת־קֶבֶר עִמָּכֶם',
      body: 'Abraham asks the Hittites for a place to bury Sarah. Rashi on 23:4 reads it: a stranger from another land, who has settled among you.',
      ref: 'Genesis 23:3–4 · Rashi on Genesis 23:4',
      note: 'The Hebrew says literally “give me”; the JPS translation has “sell me.” Rashi also quotes a midrash (Bereshit Rabbah 58:6): if you will sell, I am a stranger and will pay; if not, I am a settler, and will claim it by right, since God promised this land to my offspring (12:7).',
      camera: { center: HEBRON, zoom: 10.4, pitch: 60, bearing: 18 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'At the full price',
      body: 'Abraham asks for the cave of Machpelah, at the edge of Ephron’s field, at the full price. Ephron offers it as a gift, but Abraham insists on paying and weighs out 400 shekels of silver. The field, its cave and its trees pass to him before the assembly at the town gate.',
      ref: 'Genesis 23:5–20',
      note: 'When Abraham pays, Ephron’s name is spelled without its vav (23:16). Rashi, following Bava Metzia 87a, says it shows he promised much and didn’t do even a little. The pin marks the Cave of the Patriarchs in Hebron, the traditional site of Machpelah. Over it stands a stone enclosure built by Herod the Great, the only Herodian building still standing almost whole. Under Mamluk rule Jews were barred from entering and could go no further than the seventh step of the stairway outside; after 1967 part of the building became a synagogue.',
      camera: { center: [35.1065, 31.5249], zoom: 14, pitch: 30, bearing: 90 },
      routeTo: 0,
      stop: 1,
      spot: { name: 'Machpelah (traditional site)', at: MACHPELAH, place: 'ae00861' },
    },
    {
      kind: 'chapter',
      title: 'A wife for Isaac',
      body: 'Abraham is old now. He makes his senior servant, who has charge of all he owns, swear not to take a wife for Isaac from the Canaanites around them, but to go to Abraham’s homeland and his family. And on no account, Abraham says, may he take Isaac back there.',
      ref: 'Genesis 24:1–9, 24:38',
      note: 'The servant is never named in this chapter; the verses call him “the senior servant of his household” (24:2). Rashi on 24:39, following Bereshit Rabbah 59:9, calls him Eliezer, the name of the one in charge of Abram’s household in 15:2. Genesis 24 doesn’t say where Abraham was living when he sent him; the line starts at Hebron, where chapter 23 leaves him.',
      act: 'The journey',
      camera: { center: HEBRON, zoom: 8.4, pitch: 50, bearing: 10 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Ten camels to the city of Nahor',
      body: 'The servant sets out with ten of his master’s camels and “all the bounty of his master,” to Aram-naharaim, to the city of Nahor. At evening, when the women come out to draw water, he makes the camels kneel by the well outside the city, and prays.',
      ref: 'Genesis 24:10–12',
      note: 'Aram-naharaim means “Aram of the two rivers” (Rashi on 24:10: it lies between two rivers). The verse calls it only “the city of Nahor”: the town where Abraham’s brother Nahor (11:27) lived, or possibly a town named Nahor. Later, Rebekah’s brother Laban lives in Haran (27:43; 29:4–5), so the pin marks Harran in southern Turkey, the usual site of Haran. From Hebron that is about 700 km in a straight line; the verses don’t say how long the trip took. Rashi on 24:42, following Sanhedrin 95a, reads the servant’s “I came today” as: he set out and arrived the same day, the road shrinking for him. Lines join the stops in order; the road he took isn’t known.',
      camera: { center: [39.6, 36.8], zoom: 6.4, pitch: 45, bearing: -15 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'guess',
      title: 'The servant prays for a sign. What will the right young woman do?',
      ref: 'Genesis 24:12–14',
      options: [
        { label: 'Tell him her father’s name' },
        { label: 'Water his camels too', correct: true },
        { label: 'Invite him home' },
      ],
      reveal: '“Let the maiden to whom I say, ‘Please, lower your jar that I may drink,’ and who replies, ‘Drink, and I will also water your camels’—let her be the one whom You have decreed for Your servant Isaac” (24:14).',
      camera: { center: NAHOR, zoom: 7.4, pitch: 55, bearing: 12 },
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: 'Before he finished speaking',
      body: 'He has scarcely finished speaking when Rebekah comes out, her jar on her shoulder. He asks for a sip; she gives him a drink, then runs back to the well and draws for all his camels. She is the granddaughter of Nahor, Abraham’s brother: Abraham’s own family.',
      ref: 'Genesis 24:15–27',
      note: 'The servant watches her in silence, wondering whether his errand has succeeded (24:21). Then he gives her a gold nose-ring and two gold bands for her arms, asks whose daughter she is, and bows in thanks for being guided “to the house of my master’s kin” (24:22–27). Her father is Bethuel, son of Nahor and Milcah (24:15, 24; 22:20–23).',
      camera: { center: [39.2, 36.84], zoom: 8.6, pitch: 58, bearing: -24 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'The story told twice',
      body: 'Her brother Laban welcomes the servant in. Food is set before him, but he won’t eat until he has told his tale, and he tells the whole story over again, from Abraham’s oath to the well. Laban and Bethuel answer: “The matter was decreed by GOD.”',
      ref: 'Genesis 24:28–51',
      note: 'Rashi on 24:42 quotes Rabbi Acha (Bereshit Rabbah 60:8): the ordinary conversation of the patriarchs’ servants is more pleasing to God than even the Torah of their children, for the servant’s story is told twice in the Torah, while many important laws are given only by a hint. “GOD” is one of the ways the JPS Gender-Sensitive Edition renders God’s four-letter name (it also uses “the ETERNAL”).',
      camera: { center: [39.25, 36.84], zoom: 8.0, pitch: 50, bearing: 20 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'quote',
      title: 'Will you go with this man? And she said, ‘I will.’',
      hebrew: 'הֲתֵלְכִי עִם־הָאִישׁ הַזֶּה וַתֹּאמֶר אֵלֵךְ',
      body: 'Her family wanted her to stay some ten days; the servant asked to leave at once. So they asked Rebekah herself. Rashi on 24:57 learns from this that a woman may be married only with her consent.',
      ref: 'Genesis 24:52–61 · Rashi on Genesis 24:57',
      note: 'Rashi’s source is Bereshit Rabbah 60:12, which says it of a girl whose father has died: the same midrash, asking why only her brother and mother speak in 24:55, says Bethuel was struck down in the night. As she leaves with her nurse and her maids, her family blesses her: “O sister! May you grow into thousands of myriads” (24:59–61).',
      camera: { center: NAHOR, zoom: 7.6, pitch: 60, bearing: -8 },
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: 'In the field, toward evening',
      body: 'Isaac, who now lives in the Negev, has just come back from near Beer-lahai-roi. Toward evening he goes out walking in the field and sees camels coming. Rebekah sees him and gets down from her camel. “That is my master,” the servant tells her, and she covers herself with her veil.',
      ref: 'Genesis 24:62–66 · Berakhot 26b',
      note: '“Walking” translates לָשׂוּחַ, whose meaning is uncertain (JPS note); others translate “to meditate.” The Talmud (Berakhot 26b) reads it as prayer, and says Isaac instituted the afternoon prayer, Minchah. The verses don’t say where they met; the numbered pin marks the Negev, a region, at an illustrative point. No one knows where Beer-lahai-roi was: the verses put it between Kadesh and Bered (16:14), and its pin, at Haluza, follows the map’s place list and is only a guess.',
      act: 'Home',
      camera: { center: [34.82, 31.15], zoom: 8.8, pitch: 55, bearing: 15 },
      routeTo: 2,
      stop: 3,
      spot: { name: 'Beer-lahai-roi (site unknown)', at: BEER_LAHAI_ROI, place: 'a70e842' },
    },
    {
      kind: 'quote',
      title: 'Isaac loved her, and thus found comfort after his mother’s death.',
      hebrew: 'וַיֶּאֱהָבֶהָ וַיִּנָּחֵם יִצְחָק אַחֲרֵי אִמּוֹ',
      body: 'Isaac brings Rebekah into his mother Sarah’s tent. Rashi on 24:67 says that while Sarah lived, a light burned in her tent from one Shabbat eve to the next; it stopped when she died, and came back with Rebekah.',
      ref: 'Genesis 24:67 · Rashi on Genesis 24:67',
      note: 'The Hebrew says literally “after his mother.” Rashi, from Bereshit Rabbah 60:16, adds a blessing in the dough and a cloud over the tent: all three stopped at her death and returned when Rebekah came. The verses don’t say where the tent stood; the numbered pin marks the Negev, a region, where Isaac was living (24:62).',
      camera: { center: [34.98, 31.3], zoom: 9.0, pitch: 60, bearing: -10 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Abraham is gathered to his kin',
      body: 'Abraham marries Keturah, who bears him six sons. He leaves all he owns to Isaac and sends his other sons east with gifts. He dies at 175, “old and contented,” and his sons Isaac and Ishmael bury him in the cave of Machpelah, with Sarah.',
      ref: 'Genesis 25:1–11',
      note: 'Rashi on 25:1, following Bereshit Rabbah, says Keturah is Hagar; Rashbam and Ibn Ezra on 25:1 say she was not. On 25:9 he says Isaac is named before Ishmael because Ishmael had repented and let Isaac go first. After Abraham’s death God blesses Isaac, who settles near Beer-lahai-roi (25:11). The parsha ends with Ishmael’s line: twelve chieftains, and his death at 137 (25:12–18). Later the Torah says Isaac, Rebekah and Leah were buried in the same cave (49:31), and Jacob too (50:13).',
      act: 'Abraham',
      camera: { center: [35.1065, 31.5249], zoom: 13.6, pitch: 35, bearing: 90 },
      routeTo: 2,
      spot: { name: 'Machpelah (traditional site)', at: MACHPELAH, place: 'ae00861' },
    },
    {
      kind: 'talk',
      title: 'Rebekah was asked, “Will you go with this man?” She said, “I will.” When have you said yes to something new without knowing how it would turn out?',
      note: 'Numbered pins: Hebron (usual site, Tel Rumeida); the city of Nahor, pinned at Harran on the reading that it was Haran (it may instead have been a town named Nahor); and the Negev, a region. Lines join the stops in order; the servant’s road isn’t known, and Genesis 24 doesn’t say where Abraham sent him from.',
      camera: { center: REGION, zoom: 4.8, pitch: 25, bearing: 0 },
      routeTo: 2,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'The servant asked Rebekah for a sip of water, and she watered all his camels too. When did you help someone with more than they asked for?',
    },
    {
      audience: 'Everyone',
      text: 'Rebekah was asked, “Will you go with this man?” She said, “I will.” When have you said yes to something new without knowing how it would turn out?',
    },
    {
      audience: 'Deeper',
      text: 'The servant’s story is told twice. Rashi quotes Rabbi Acha: the everyday talk of the patriarchs’ servants is dearer to God than their descendants’ Torah. Why?',
    },
  ],
}

export default chayeiSarah
