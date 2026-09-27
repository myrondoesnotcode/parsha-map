// Toldot — Genesis 25:19 – 28:9. Twins, a birthright, Isaac's wells from Gerar to Beersheba, and the blessing.
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// The route is Isaac's: Gerar → Rehoboth → Beersheba (Genesis 26). The verses don't say where the twins
// were born or where the stew was cooked, so the first act has no stop. Esek and Sitnah, the two disputed
// wells "in the wadi of Gerar" (26:19–21), have no known site and are not pinned. Chapter 27 names no
// place; the map stays at Beersheba, where Isaac last settled (26:23–33) and where Jacob sets out from
// next week (28:10). Verses quote THE JPS TANAKH: Gender-Sensitive Edition (Sefaria).
// Claim table: docs/plans/2026-09-27-toldot-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Gerar (places.json a3f5814), pinned at Tel Haror (Tell Abu Hureyra) on Nahal Gerar: the usual identification, not certain. */
const GERAR: LngLat = [34.6065, 31.3821]
/** Rehoboth (places.json ab1d954 "Rehoboth 1"), pinned at Ruheibeh: an old proposal (Easton's Bible Dictionary), not a known site. */
const REHOBOTH: LngLat = [34.5658, 31.0311]
/** Beersheba (places.json a075d61 "Beersheba 2"), pinned at Tel Be'er Sheva (Tell es-Seba), its usual identification. */
const BEERSHEBA: LngLat = [34.8408, 31.2447]
/** Haran (places.json a6d9af3), pinned at Harran in southern Turkey, its usual identification. */
const HARAN: LngLat = [39.0328, 36.8644]
/** A backdrop over the central Negev for cards with no stated place, framed so no route pin is in view. Not a location claim. */
const NEGEV: LngLat = [34.95, 30.25]
/** Shift a camera east so a pin sits left of centre and its label fits on a phone. */
const eastOf = (p: LngLat, d: number): LngLat => [p[0] + d, p[1]]

const toldot: ParshaStory = {
  parshaId: 'toldot',
  tagline: 'Two nations, one womb.',
  sources: [
    'Genesis 25:19 – 28:9',
    'Genesis 12:10, 20:1–2, 21:5, 21:31, 24:62, 25:7, 25:11, 28:10',
    'Rashi on Genesis 25:22, 25:23, 25:26, 25:27, 25:30, 25:31, 27:19, 27:22, 27:24, 27:33, 28:5',
    'Megillah 6a',
    'Bava Batra 16b',
    'Targum Onkelos on Genesis 27:13 (Metsudah translation)',
    'Ramban on Genesis 26:20',
    'Bereshit Rabbah 65:20',
    'Devarim Rabbah 1:15',
    'Easton’s Bible Dictionary, “Rehoboth” (via Wikipedia, “Rehoboth (Bible)”)',
  ],
  route: [
    { name: 'Gerar', at: GERAR, place: 'a3f5814', hedge: 'usual site: Tel Haror' },
    { name: 'Rehoboth', at: REHOBOTH, place: 'ab1d954', hedge: 'site unknown · a proposal' },
    { name: 'Beersheba', at: BEERSHEBA, place: 'a075d61', hedge: 'usual site: Tel Be’er Sheva' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Toldot',
      body: 'Two nations, one womb.',
      ref: 'Genesis 25:19 – 28:9',
      camera: { center: [35.0, 31.6], zoom: 5.8, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Twenty years of waiting',
      body: 'Isaac is 40 when he marries Rebekah, and she has no children. Isaac pleads with God for her, and she conceives twins, who struggle inside her. “If so, why do I exist?” she asks, and goes to inquire of God.',
      ref: 'Genesis 25:19–22, 25:26',
      note: 'Isaac is 60 when the twins are born (25:26), twenty years after the wedding. The verses don’t say where the family lived. Last week Isaac was “settled in the region of the Negeb” (24:62) and then near Beer-lahai-roi (25:11), whose site is unknown, so the map shows the Negev as a backdrop, not a location. Rashi on 25:22 brings two midrashic readings of the struggle: whenever Rebekah passed a house of Torah study, Jacob stirred to come out, and whenever she passed a place of idol worship, Esau did; or, the two were already quarreling over how to divide two worlds.',
      act: 'The twins',
      camera: { center: NEGEV, zoom: 8.4, pitch: 35, bearing: -10 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'Two nations are in your womb, … One people shall be mightier than the other, And the older shall serve the younger.',
      hebrew: 'שְׁנֵי גוֹיִם בְּבִטְנֵךְ … וּלְאֹם מִלְאֹם יֶאֱמָץ וְרַב יַעֲבֹד צָעִיר',
      body: 'The answer Rebekah receives. The Talmud (Megillah 6a), quoted by Rashi on 25:23, reads “mightier” to mean the two will never be great at the same time: when one rises, the other falls.',
      ref: 'Genesis 25:23 · Megillah 6a · Rashi',
      note: 'The English is THE JPS TANAKH: Gender-Sensitive Edition; the omitted line is “Two separate peoples shall issue from your body.” In Megillah 6a the reading is Rav Naḥman bar Yitzḥak’s.',
      camera: { center: NEGEV, zoom: 8.4, pitch: 35, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Red, hairy, and holding a heel',
      body: 'The first twin comes out red and hairy, and they name him Esau. His brother follows holding Esau’s heel, so they name him Jacob. Esau grows into a skillful hunter, a man of the outdoors; Jacob, a mild man who stays in camp. Isaac favors Esau, for he has a taste for game; Rebekah favors Jacob.',
      ref: 'Genesis 25:24–28',
      note: 'The JPS notes explain the names: Esau plays on se‘ar, “hair,” and Jacob on ‘aqeb, “heel.” “Stays in camp” is literally “a sitter in tents”; Rashi on 25:27 reads them as the tents of Shem and Eber, where Torah was studied. Rashi on 25:26 cites a midrash that Jacob held the heel with good reason: he had been conceived first, so the firstborn’s place was rightly his.',
      camera: { center: NEGEV, zoom: 8.4, pitch: 35, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'guess',
      title: 'Esau comes in famished and asks for “that red stuff.” What name does it give him?',
      ref: 'Genesis 25:29–30, 25:34',
      options: [
        { label: 'Aram', he: 'אֲרָם' },
        { label: 'Edom', he: 'אֱדוֹם', correct: true },
        { label: 'Gerar', he: 'גְּרָר' },
      ],
      reveal: 'Edom, from אָדֹם, “red”: “which is why he was named Edom” (25:30). The red stuff was lentils: Jacob gives him “bread and lentil stew” (25:34).',
      note: 'The JPS note calls Edom a play on the Hebrew ’adom, “red.” Aram is Rebekah’s family’s land (25:20); Gerar is where Isaac goes next (26:1).',
      camera: { center: NEGEV, zoom: 8.4, pitch: 35, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Sold for a bowl of stew',
      body: '“First sell me your birthright,” says Jacob. “I am at the point of death,” Esau answers, “so of what use is my birthright to me?” He swears, eats, drinks, gets up and goes. “Thus did Esau spurn the birthright.”',
      ref: 'Genesis 25:31–34 · Rashi · Bava Batra 16b',
      note: 'The verses don’t say what the birthright included; Rashi on 25:31 says it was the sacrificial service, then done by firstborn sons. The Talmud (Bava Batra 16b), brought by Rashi on 25:30, teaches that Abraham died that day, and Jacob cooked lentils to comfort his father Isaac, since lentils were the mourners’ meal. On that reading the twins were 15: Abraham was 100 when Isaac was born (21:5) and died at 175 (25:7), and Isaac was 60 when the twins were born (25:26).',
      camera: { center: NEGEV, zoom: 8.4, pitch: 35, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Isaac in Gerar',
      body: 'Famine strikes, and Isaac goes to Abimelech, king of the Philistines, in Gerar. God tells him not to go down to Egypt but to stay in the land. Afraid the locals will kill him for Rebekah’s sake, Isaac calls her his sister, until Abimelech sees they are husband and wife and orders that no one harm them.',
      ref: 'Genesis 26:1–11',
      note: 'The verse recalls the earlier famine in Abraham’s days, when Abram went down to Egypt (12:10). Abraham too said of Sarah, “She is my sister,” to a King Abimelech of Gerar (20:1–2); the Torah doesn’t say whether it was the same king. The pin marks Tel Haror, north-west of Beersheba, the site most often identified with Gerar; that isn’t certain.',
      act: 'Isaac’s wells',
      camera: { center: GERAR, zoom: 9.4, pitch: 55, bearing: -20 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'A hundredfold',
      body: 'Isaac sows and reaps a hundredfold that same year, and grows so wealthy that the Philistines envy him. They fill with earth the wells Abraham’s servants had dug. “Go away from us,” says Abimelech, and Isaac moves to the wadi of Gerar.',
      ref: 'Genesis 26:12–17',
      note: 'The pin marks Tel Haror, on the bank of Nahal Gerar (Wadi esh-Sheri‘a), a stream bed often taken to be the verse’s “wadi of Gerar.” Where along it Isaac camped isn’t said.',
      camera: { center: GERAR, zoom: 10.2, pitch: 60, bearing: 15 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'offerings',
      title: 'Isaac’s wells',
      ref: 'Genesis 26:18–22, 26:32–33 · Ramban on Genesis 26:20',
      note: 'The meanings follow the JPS notes. Esek and Sitnah were dug in the wadi of Gerar (26:19–21); their sites are unknown, so they aren’t pinned. Ramban on 26:20 reads the wells as a hint of the three Temples: Esek and Sitnah, fought over, are the first two, and Rehoboth is the third, to be built without strife.',
      items: [
        { en: 'Abraham’s wells', note: 'Stopped up by the Philistines. Isaac digs them anew and gives them his father’s names.' },
        { he: 'עֵשֶׂק', en: 'Esek, “contention”', note: 'The herdsmen of Gerar quarrel: “The water is ours.”' },
        { he: 'שִׂטְנָה', en: 'Sitnah, “harassment”', note: 'Another well, another dispute.' },
        { he: 'רְחֹבוֹת', en: 'Rehoboth, “ample space”', note: 'No quarrel this time.' },
        { he: 'שִׁבְעָה', en: 'Shibah, “oath”', note: 'As though “oath,” says the JPS note: found the day Isaac and Abimelech swore peace.' },
      ],
      camera: { center: GERAR, zoom: 9.6, pitch: 50, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Room at last',
      body: 'Isaac moves on and digs another well, and this time no one quarrels over it. He names it Rehoboth: “Now at last GOD has granted us ample space to increase in the land.”',
      ref: 'Genesis 26:22',
      note: '“GOD” is how the JPS Gender-Sensitive Edition renders God’s four-letter name. The verse says only that Isaac “moved from there.” Where Rehoboth was is unknown. The pin marks the ruins of Rehovot-in-the-Negev in Wadi er-Ruheibeh, following an old proposal (Easton’s Bible Dictionary); the town there is Nabatean and Byzantine, far later than Isaac.',
      camera: { center: eastOf(REHOBOTH, 0.16), zoom: 9.2, pitch: 55, bearing: 10 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'stars',
      title: 'Fear not, for I am with you, and I will bless you and increase your offspring for the sake of My servant Abraham.',
      body: 'That night, at Beer-sheba.',
      ref: 'Genesis 26:23–24',
      note: 'From Rehoboth Isaac “went up to Beer-sheba” (26:23), and God appeared to him that night. The night sky here is an illustration. The pin marks Tel Be’er Sheva (Tell es-Seba), east of the modern city, the site usually identified with biblical Beersheba.',
      camera: { center: BEERSHEBA, zoom: 8.4, pitch: 76, bearing: 0 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'A pact, and water',
      body: 'Isaac builds an altar and pitches his tent. Abimelech comes from Gerar with his councilor and his army chief: “We now see plainly that GOD has been with you.” They feast, swear a pact and part in peace. That same day Isaac’s servants report, “We have found water!” He names the well Shibah; so the city is called Beer-sheba.',
      ref: 'Genesis 26:25–33',
      note: 'The JPS note reads Shibah “as though ‘oath.’” Genesis 21:31 gives the name an earlier start: Abraham and Abimelech swore an oath at this place too.',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 9.8, pitch: 58, bearing: -15 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Isaac calls Esau',
      body: 'Isaac is old, and his eyes are too dim to see. He calls Esau: take your quiver and bow, hunt me some game, and prepare a dish I like, “so that I may give you my innermost blessing before I die.”',
      ref: 'Genesis 27:1–4',
      note: 'At the end of chapter 26, Esau, at 40, marries two Hittite women, Judith and Basemath, “a source of bitterness to Isaac and Rebekah” (26:34–35). Chapter 27 names no place. Isaac was last at Beersheba (26:23–33), and next week Jacob sets out from there (28:10), so the map stays there.',
      act: 'The blessing',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 10.4, pitch: 60, bearing: 25 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Rebekah’s plan',
      body: 'Rebekah overhears and tells Jacob to bring two kids from the flock; she will cook the dish, and he will take it in. Jacob fears his father will touch him and find a trickster. “Your curse, my son, be upon me!” she answers, and dresses him in Esau’s best clothes, with the kids’ skins on his hands and neck.',
      ref: 'Genesis 27:5–17 · Targum Onkelos on Genesis 27:13',
      note: 'The Torah doesn’t say why Rebekah acted. Targum Onkelos renders her answer in 27:13 as “It was said regarding me in a prophecy that curses will not come upon you” (Metsudah translation). Before the twins were born, she had been told “the older shall serve the younger” (25:23).',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 10.8, pitch: 62, bearing: -30 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: '“Which of my sons are you?”',
      body: 'Jacob brings the dish: “I am Esau, your first-born.” Isaac asks how he found game so quickly, then calls him close to feel him, to know whether he is really Esau.',
      ref: 'Genesis 27:18–21 · Rashi',
      note: 'Rashi on 27:19 reads Jacob’s words as two statements: “I am he that brings food to you, and Esau is your first-born.” When Isaac asks again, “Are you really my son Esau?”, Jacob answers only “I am” (27:24), and Rashi there notes that he didn’t say “I am Esau.”',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 10.4, pitch: 60, bearing: 10 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'quote',
      title: 'The voice is the voice of Jacob, yet the hands are the hands of Esau.',
      hebrew: 'הַקֹּל קוֹל יַעֲקֹב וְהַיָּדַיִם יְדֵי עֵשָׂו',
      body: 'Isaac feels him and wonders. Rashi on 27:22 hears it in the way each son speaks: Jacob asks gently, “Pray sit up,” while Esau will say, “Let my father sit up.”',
      ref: 'Genesis 27:22 · Rashi · Bereshit Rabbah 65:20',
      note: 'Compare 27:19 and 27:31. Bereshit Rabbah 65:20 reads the verse as a promise: when the voice of Jacob is heard in the synagogues and study halls, the hands of Esau do not prevail.',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 10.8, pitch: 64, bearing: -20 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'The smell of the fields',
      body: 'Isaac eats and drinks. His son kisses him, and Isaac smells his clothes: “the smell of my son is like the smell of the fields that GOD has blessed.” He blesses him with the dew of heaven and the fat of the earth: “Let peoples serve you, And nations bow to you; Be master over your brothers.”',
      ref: 'Genesis 27:23–29',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 10.2, pitch: 58, bearing: 30 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: '“Bless me too, Father!”',
      body: 'Esau comes back from his hunt with a dish. Isaac trembles: “I blessed him; now he must remain blessed!” Esau sobs, “Have you but one blessing, Father? Bless me too, Father!” Isaac answers: his home will enjoy the fat of the earth and the dew of heaven; he will live by his sword and serve his brother, but one day break his yoke.',
      ref: 'Genesis 27:30–40 · Rashi · Devarim Rabbah 1:15',
      note: 'Rashi on 27:33 reads “now he must remain blessed” as Isaac confirming the blessing of his own free will, so no one could say Jacob got it only by deceit. In Devarim Rabbah 1:15, Rabban Shimon ben Gamliel says Esau honored his father more than he himself did: Esau served his father in his finest clothes, the very clothes Rebekah put on Jacob.',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 10.0, pitch: 56, bearing: -10 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Flee to Haran',
      body: 'Esau resolves to kill Jacob once the days of mourning for their father come. Rebekah tells Jacob to flee to her brother Laban in Haran “until your brother’s fury subsides.” Isaac calls Jacob, blesses him with the blessing of Abraham, and sends him to Paddan-aram to find a wife.',
      ref: 'Genesis 27:41 – 28:5 · Rashi',
      note: 'Esau, seeing that Canaanite women displease his father, marries Mahalath, Ishmael’s daughter, as well (28:6–9). The journey itself is next week’s parsha, Vayetze: “Jacob left Beer-sheba, and set out for Haran” (28:10). The pin marks Harran in southern Turkey, the usual identification of Haran. At “mother of Jacob and Esau” (28:5), Rashi writes: “I do not know what the addition of these words is intended to tell us.”',
      camera: { center: [37.7, 34.0], zoom: 4.8, pitch: 25, bearing: 0 },
      routeTo: 2,
      spot: { name: 'Haran (usual site: Harran)', at: HARAN, place: 'a6d9af3' },
    },
    {
      kind: 'talk',
      title: 'Esau cried, “Bless me too, Father!” If you could give a blessing to each person at your table, what would it be?',
      note: 'Numbered pins mark usual or proposed identifications: Gerar = Tel Haror, Rehoboth = Ruheibeh (an old proposal; its site is unknown), Beersheba = Tel Be’er Sheva. None is certain. Esek and Sitnah, the two disputed wells, can’t be located and aren’t shown. Lines join the stops in order; Isaac’s roads aren’t known.',
      camera: { center: [34.72, 31.2], zoom: 8.2, pitch: 30, bearing: 0 },
      routeTo: 2,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Isaac named his wells after what happened at them: Esek for a quarrel, Rehoboth when there was room for everyone. If you named a place in your home after something that happened there, what would you call it?',
    },
    {
      audience: 'Everyone',
      text: 'Esau cried, “Bless me too, Father!” If you could give a blessing to each person at your table, what would it be?',
    },
    {
      audience: 'Deeper',
      text: 'Rebekah heard “the older shall serve the younger” before her sons were born (25:23). Does knowing the future justify how she got the blessing for Jacob? And why might Isaac bless Jacob again, by name, before sending him away (28:1–4)?',
    },
  ],
}

export default toldot
