// Vayera — Genesis 18:1 – 22:24
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A journey in the south of the land: Mamre, Gerar, Beer-sheba, the land of Moriah and back to Beer-sheba.
// Sodom and Gomorrah are deliberately NOT pinned: their site is unknown (rival southern and northern
// theories), so the Sodom cards look east from Mamre toward the Dead Sea and say so. Moriah is pinned at
// the Temple Mount as the traditional identification (2 Chronicles 3:1; Rashi on 22:2), and says so.
// Verses quote THE JPS TANAKH: Gender-Sensitive Edition (Sefaria), which writes God's four-letter name
// as GOD. Claim table: docs/plans/2026-09-27-vayera-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Mamre (places.json aeb9e97), pinned at Ramat el-Khalil, about 4 km north of old Hebron: the traditional site. */
const MAMRE: LngLat = [35.105336, 31.556536]
/** Gerar (places.json a3f5814), pinned at Tel Haror, its most common identification. */
const GERAR: LngLat = [34.6065, 31.3821]
/** Beer-sheba (places.json a075d61, "Beersheba 2"), pinned at Tel Be'er Sheva, east of the modern city. */
const BEERSHEBA: LngLat = [34.840833, 31.244722]
/** Moriah (places.json adaf385), pinned at the Temple Mount: the traditional identification (2 Chronicles 3:1). */
const MORIAH: LngLat = [35.235556, 31.777778]
/** A camera point between Mamre and the Dead Sea, for looking east toward the Plain. Not a location claim. */
const TOWARD_DEAD_SEA: LngLat = [35.3, 31.5]
/** A camera point over the western Negeb, between Gerar and Beer-sheba. Not a location claim. */
const NEGEB: LngLat = [34.72, 31.31]
/** The whole week at once: Gerar in the west, Moriah in the north, the Dead Sea in the east. */
const REGION: LngLat = [35.0, 31.5]

const vayera: ParshaStory = {
  parshaId: 'vayera',
  tagline: 'He appeared.',
  sources: [
    'Genesis 18–22',
    'Genesis 12:4, 12:13, 13:10, 14:3, 16:15, 17',
    '2 Chronicles 3:1',
    'Rashi on Genesis 18:1',
    'Rashi on Genesis 18:32',
    'Rashi on Genesis 21:33',
    'Rashi on Genesis 22:2',
    'Rashi on Genesis 22:8',
    'Rashi on Genesis 25:20 (citing Seder Olam)',
    'Bereshit Rabbah 49:13, 56:8 (as cited by Rashi on Genesis 18:32, 22:2)',
    'Talmud, Shabbat 127a',
    'Talmud, Rosh Hashanah 16a',
    'Talmud, Megillah 31a',
  ],
  route: [
    { name: 'Mamre', at: MAMRE, place: 'aeb9e97', hedge: 'traditional site' },
    { name: 'Gerar', at: GERAR, place: 'a3f5814', hedge: 'usual site: Tel Haror' },
    { name: 'Beersheba', at: BEERSHEBA, place: 'a075d61', hedge: 'usual site' },
    { name: 'Moriah', at: MORIAH, place: 'adaf385', hedge: 'traditional site' },
    { name: 'Beersheba', at: BEERSHEBA, place: 'a075d61', hedge: 'usual site' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Vayera',
      body: 'He appeared.',
      ref: 'Genesis 18:1 – 22:24',
      camera: { center: REGION, zoom: 7.2, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Guests in the heat of the day',
      body: 'God appears to Abraham by the terebinths of Mamre as he sits at the entrance of his tent in the heat of the day. Looking up, he sees three figures and runs to greet them. He offers water to bathe their feet and a little bread, hurries Sarah to bake cakes, and sets curds, milk and a tender calf before them, waiting on them under the tree as they eat.',
      ref: 'Genesis 18:1–8 · Rashi on Genesis 18:1 · Talmud, Shabbat 127a',
      note: 'Rashi on 18:1 (from the Talmud, Bava Metzia 86b) says God came to visit Abraham as one visits the sick, on the third day after his circumcision (17:24–26). The Talmud (Shabbat 127a) learns from 18:3 that welcoming guests is greater than receiving the Divine Presence: Abraham asked God to wait while he greeted his guests. The Torah calls the visitors men (18:2); in 19:1 two of them are called angels. The pin marks Ramat el-Khalil, about 4 km north of old Hebron, identified with Mamre by a tradition going back to Herod’s time; where the terebinths stood isn’t known.',
      act: 'The visitors',
      camera: { center: MAMRE, zoom: 9.6, pitch: 58, bearing: -12 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Sarah laughs',
      body: '“Where is your wife Sarah?” the visitors ask. One says that by this time next year she will have a son. Sarah, listening at the tent entrance, laughs to herself: she and Abraham are old. God asks Abraham why she laughed: “Is anything too wondrous for GOD?”',
      ref: 'Genesis 18:9–15',
      note: 'In Hebrew, “laugh” is צחק, and Isaac’s name, Yitzḥak, comes from it (the JPS note on 17:19). When God first told Abraham that Sarah would bear a son, Abraham laughed too (17:17). The quotation is from 18:14 in the JPS translation.',
      camera: { center: MAMRE, zoom: 10.4, pitch: 62, bearing: 24 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Shall not the Judge of all the earth deal justly?',
      body: 'The visitors set out and look down toward Sodom, and God tells Abraham of the outcry against Sodom and Gomorrah. Abraham comes forward: “Will You sweep away the innocent along with the guilty?”',
      ref: 'Genesis 18:16–25',
      note: 'Where Sodom stood isn’t known, so the map doesn’t pin it. The Torah puts the cities of the Plain in the plain of the Jordan (13:10), by the Valley of Siddim, “now the Dead Sea” (14:3); the camera looks east from Mamre toward it. The numbered pin marks Mamre.',
      act: 'Sodom',
      camera: { center: TOWARD_DEAD_SEA, zoom: 8.6, pitch: 62, bearing: 80 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'offerings',
      title: 'From fifty down to ten',
      ref: 'Genesis 18:24–33 · Rashi on Genesis 18:32',
      note: 'Abraham calls himself “but dust and ashes” (18:27). Why stop at ten? Rashi on 18:32 (from Bereshit Rabbah 49:13) says Abraham knew that eight righteous people, Noah and his family, had not been enough to save their generation from the Flood.',
      items: [
        { he: 'חֲמִשִּׁים', en: 'Fifty', note: '“What if there should be fifty innocent within the city?”' },
        { he: 'אַרְבָּעִים וַחֲמִשָּׁה', en: 'Forty-five', note: '“What if the fifty innocent should lack five?”' },
        { he: 'אַרְבָּעִים', en: 'Forty', note: '“What if forty should be found there?”' },
        { he: 'שְׁלֹשִׁים', en: 'Thirty', note: '“Let not my Sovereign be angry if I go on.”' },
        { he: 'עֶשְׂרִים', en: 'Twenty', note: '“I venture again to speak to my Sovereign.”' },
        { he: 'עֲשָׂרָה', en: 'Ten', note: '“If I speak but this last time.” Each time, God agrees.' },
      ],
      camera: { center: TOWARD_DEAD_SEA, zoom: 8.8, pitch: 55, bearing: 70 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Lot is led out',
      body: 'Two angels reach Sodom in the evening, and Lot takes them into his house. That night the men of the city surround it. At dawn the angels lead Lot, his wife and his two daughters out of the city, and sulfurous fire rains on Sodom and Gomorrah. Lot’s wife looks back and becomes a pillar of salt. Next morning Abraham looks toward the Plain and sees smoke rising like the smoke of a kiln.',
      ref: 'Genesis 19:1–29',
      note: 'Lot fled to a little town nearby, which was spared and came to be called Zoar (19:20–23). The Torah says God was mindful of Abraham and removed Lot from the upheaval (19:29). Where Sodom and Gomorrah stood is unknown: some scholars look to Early Bronze Age ruins near the south-east of the Dead Sea, such as Bab edh-Dhra; others to Tall el-Hammam, north-east of the Dead Sea. Neither is accepted as proven, so neither is pinned. The chapter ends with Lot and his daughters living in a cave in the hills, and the births of Moab and Ben-ammi, fathers of the Moabites and the Ammonites (19:30–38). The numbered pin marks Mamre; the verses say only that Abraham looked from the place where he had stood before God (19:27–28).',
      camera: { center: TOWARD_DEAD_SEA, zoom: 8.2, pitch: 58, bearing: 95 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'In Gerar',
      body: 'Abraham moves to the Negeb and stays for a time in Gerar. He says of Sarah, “She is my sister,” and King Abimelech has her brought to him. God warns Abimelech in a dream, and he returns Sarah to Abraham with gifts of sheep, oxen and servants. Abraham prays for him.',
      ref: 'Genesis 20:1–18',
      note: 'In Egypt, he had asked Sarah to say the same (12:13). Here he explains that Sarah is his father’s daughter, though not his mother’s (20:12), and God calls Abraham a prophet who will pray for Abimelech (20:7). The verses place him between Kadesh and Shur (20:1). The pin marks Tel Haror, most often identified with Gerar; that isn’t certain.',
      act: 'In the Negeb',
      camera: { center: GERAR, zoom: 9.2, pitch: 55, bearing: -20 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'guess',
      title: 'How old is Abraham when Isaac is born?',
      ref: 'Genesis 21:5',
      options: [
        { label: '75', he: 'ע״ה' },
        { label: '99', he: 'צ״ט' },
        { label: '100', he: 'ק׳', correct: true },
      ],
      reveal: '“Abraham was a hundred years old when his son Isaac was born to him” (21:5). He was 75 when he left Haran (12:4) and 99 when God changed his name (17:1–5).',
      note: 'The tokens show each age in Hebrew letters used as numbers: ע״ה is 75, צ״ט is 99, ק׳ is 100. Sarah was 90 (17:17).',
      camera: { center: NEGEB, zoom: 9, pitch: 60, bearing: 10 },
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: 'Isaac is born',
      body: 'Just as God promised, Sarah bears Abraham a son. Abraham names him Isaac and circumcises him when he is eight days old. Sarah says, “God has brought me laughter; everyone who hears will laugh with me.”',
      ref: 'Genesis 21:1–8',
      note: 'God had told Abraham to name him Isaac (17:19). On the day Isaac was weaned, Abraham held a great feast (21:8). The verses don’t say where Isaac was born; the last place named is Gerar (20:1), and Abraham lived in the land of the Philistines a long time (21:34). The map holds over the Negeb.',
      camera: { center: NEGEB, zoom: 8.6, pitch: 50, bearing: 0 },
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: 'Hagar and Ishmael',
      body: 'Sarah sees Hagar’s son Ishmael playing, and tells Abraham to send them away. Abraham is deeply distressed, but God tells him to listen to Sarah and promises to make a nation of Ishmael too. In the wilderness of Beersheba their water runs out and Hagar weeps. God hears the boy’s cry, and Hagar sees a well of water.',
      ref: 'Genesis 21:9–21',
      note: 'Chapter 21 calls him only Hagar’s son or the boy; his name, Ishmael, was given at his birth (16:15). Abraham gave them bread and a skin of water (21:14). An angel of God called to Hagar from heaven: “Fear not” (21:17). Ishmael grew up in the wilderness of Paran and became a bowman (21:20–21). The spot marks Tel Be’er Sheva; where Hagar wandered in the wilderness around it isn’t known. The Torah uses the name Beersheba here, before the story of how it got that name (21:31).',
      camera: { center: BEERSHEBA, zoom: 8.8, pitch: 55, bearing: 30 },
      routeTo: 1,
      spot: { name: 'Wilderness of Beersheba', at: BEERSHEBA, place: 'a075d61' },
    },
    {
      kind: 'chapter',
      title: 'The well of the oath',
      body: 'Abimelech and Phicol, his army chief, ask Abraham for a pact. Abraham gives Abimelech seven ewes as proof that he dug a well there, and the two swear an oath. The place is called Beersheba, and Abraham plants a tamarisk and calls there on the name of the Everlasting God.',
      ref: 'Genesis 21:22–34 · Rashi on Genesis 21:33',
      note: 'Beersheba (בְּאֵר שָׁבַע; JPS spells it Beer-sheba) means “well of seven” or “well of oath” (JPS note on 21:31). Rashi on 21:33 (from the Talmud, Sotah 10a) gives two views of the tamarisk, אֵשֶׁל: an orchard to feed guests, or an inn for them. Abraham had complained that Abimelech’s servants seized the well (21:25). The pin marks Tel Be’er Sheva, east of today’s city, usually identified with biblical Beersheba.',
      camera: { center: BEERSHEBA, zoom: 9.8, pitch: 58, bearing: -15 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'The test',
      body: 'Some time later, God puts Abraham to the test. “Abraham.” “Here I am.” “Take your son, your favored one, Isaac, whom you love,” to the land of Moriah, and offer him there as a burnt offering. Early next morning Abraham sets out with Isaac and two servants, and on the third day he sees the place from afar.',
      ref: 'Genesis 22:1–4 · Rashi on Genesis 22:2 · 2 Chronicles 3:1',
      note: 'The Torah says from the first verse that this is a test. Rashi on 22:2 (from Bereshit Rabbah 56:8) notes that God said “bring him up,” not “slay him,” because God did not want Isaac killed. The verses don’t give Isaac’s age; Rashi on 25:20, following Seder Olam, counts him 37. The pin marks the Temple Mount in Jerusalem: 2 Chronicles 3:1 says Solomon built the Temple “on Mount Moriah,” and Rashi on 22:2 says the land of Moriah is Jerusalem. The verses don’t say where Abraham set out from; the line starts at Beersheba, the last place named (21:33).',
      act: 'The binding',
      camera: { center: [35.02, 31.5], zoom: 8.1, pitch: 50, bearing: 20 },
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'quote',
      title: 'And the two of them walked on together.',
      hebrew: 'וַיֵּלְכוּ שְׁנֵיהֶם יַחְדָּו',
      body: 'Isaac asks, “Where is the sheep for the burnt offering?” Abraham answers, “It is God who will see to the sheep for this burnt offering, my son.” Rashi on 22:8 says they walked on “with the same ready heart.”',
      ref: 'Genesis 22:6–8 · Rashi on Genesis 22:8',
      note: 'The same Hebrew words come twice, before and after Isaac’s question (22:6, 22:8); JPS translates the first “and the two walked off together.” Rashi reads Abraham’s answer as hinting that if there were no sheep, “my son” would be the offering; though Isaac understood, they went on together. The English is THE JPS TANAKH: Gender-Sensitive Edition; the Rashi translation is Rosenbaum and Silbermann’s.',
      camera: { center: MORIAH, zoom: 10.6, pitch: 66, bearing: -25 },
      routeTo: 3,
    },
    {
      kind: 'chapter',
      title: 'Do not raise your hand against the boy',
      body: 'Abraham builds an altar, lays out the wood, binds Isaac and lays him on the altar. As he takes up the knife, an angel of God calls from heaven, “Abraham! Abraham!” “Do not raise your hand against the boy.” Abraham looks up, sees a ram caught in a thicket by its horns, and offers it in place of his son.',
      ref: 'Genesis 22:9–14',
      note: 'The angel says, “now I know that you fear God” (22:12). Abraham names the place Adonai-yireh, “GOD will see” (22:14; JPS). The Talmud calls this story the binding of Isaac, עֲקֵידַת יִצְחָק (Rosh Hashanah 16a), from “he bound,” וַיַּעֲקֹד (22:9). The pin marks the traditional site, the Temple Mount.',
      camera: { center: MORIAH, zoom: 10.2, pitch: 62, bearing: 35 },
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'Back to Beersheba',
      body: 'The angel calls a second time: because Abraham has not withheld his son, his descendants will be as many as the stars of heaven and the sands on the seashore. Abraham returns to his servants, and they set out together for Beersheba, where he stays.',
      ref: 'Genesis 22:15–24',
      note: 'The parsha ends with news: Abraham’s brother Nahor has sons, and one of them, Bethuel, is the father of Rebekah (22:20–23). Her story is next week’s parsha, Chayei Sarah.',
      camera: { center: [35.03, 31.5], zoom: 8.1, pitch: 45, bearing: -30 },
      routeTo: 4,
      stop: 5,
    },
    {
      kind: 'quote',
      title: 'Sound a blast before Me with a shofar made from a ram’s horn, so that I will remember for you the binding of Isaac.',
      hebrew: 'שֶׁאֶזְכּוֹר לָכֶם עֲקֵידַת יִצְחָק',
      body: 'In the Talmud, Rabbi Abbahu explains why the Rosh Hashanah shofar is a ram’s horn. And on the second day of Rosh Hashanah, the Torah reading is this chapter.',
      ref: 'Genesis 22:13 · Talmud, Rosh Hashanah 16a · Talmud, Megillah 31a',
      note: 'The Hebrew shows the last words, “so that I will remember for you the binding of Isaac.” The English is the William Davidson translation of Rosh Hashanah 16a, shortened; the passage goes on, “…son of Abraham, in whose stead a ram was sacrificed.” Megillah 31a says that on the first day of Rosh Hashanah we read Genesis 21, and on the second day Genesis 22, “And God tested Abraham,” to recall the merit of the binding of Isaac.',
      camera: { center: [34.98, 31.8], zoom: 10.5, pitch: 60, bearing: 0 },
      routeTo: 4,
    },
    {
      kind: 'talk',
      title: 'Abraham spoke up for the people of Sodom: “Shall not the Judge of all the earth deal justly?” When have you spoken up for someone else, and what made it hard?',
      note: 'Numbered pins mark usual or traditional identifications (Mamre = Ramat el-Khalil, Gerar = Tel Haror, Beersheba = Tel Be’er Sheva, Moriah = the Temple Mount); none is certain. Sodom and Gomorrah aren’t pinned because their site is unknown. Beersheba is stops 3 and 5. Lines join the stops in the order of the verses; the roads Abraham took aren’t known.',
      camera: { center: REGION, zoom: 7.6, pitch: 30, bearing: 0 },
      routeTo: 4,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Abraham ran to bring water, bread and a meal to three strangers on a hot day. What can you do to make a guest feel welcome this Shabbat?',
    },
    {
      audience: 'Everyone',
      text: 'Abraham spoke up for the people of Sodom: “Shall not the Judge of all the earth deal justly?” When have you spoken up for someone else, and what made it hard?',
    },
    {
      audience: 'Deeper',
      text: 'The Hebrew words “and the two of them walked on together” come twice, before and after Isaac asks where the sheep is (22:6, 22:8). Rashi says they walked “with the same ready heart.” What might have changed between the first time and the second?',
    },
  ],
}

export default vayera
