// Vayetze — Genesis 28:10 – 32:3
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A journey: Beersheba → Bethel (the dream) → Haran (twenty years) → Mahanaim, with the mound in the
// hill country of Gilead (Gal-ed / Mizpah) shown as an unnumbered spot on the way. Verse numbers follow the Hebrew text (Sefaria), where the
// parsha ends at 32:3; many English Bibles number Hebrew 32:1 as 31:55. Verses quote THE JPS TANAKH:
// Gender-Sensitive Edition (Sefaria), which writes God's four-letter name as GOD (and as "the ETERNAL"
// in "I am the ETERNAL"). Where the heap stood is unknown. The gazetteer's pin for it (places.json
// "Mizpah 4") lies south of the Jabbok, but Jacob crosses the Jabbok only later (32:23), so the story
// draws the mound as an illustrative spot north of the river instead. Claim table: docs/plans/2026-09-27-vayetze-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Beersheba (places.json a075d61 "Beersheba 2"), pinned at Tel Be'er Sheva, its usual identification. */
const BEERSHEBA: LngLat = [34.840833, 31.244722]
/** Bethel (places.json a64f355 "Bethel 1"; Luz a397042 shares the pin), at Beitin, the usual identification. */
const BETHEL: LngLat = [35.241389, 31.922778]
/** Haran (places.json a6d9af3), pinned at Harran in southern Turkey, its usual identification. */
const HARAN: LngLat = [39.032778, 36.864444]
/**
 * Gal-ed / Mizpah, the mound of 31:47–49 (places.json a694ea2 "Mizpah 4"). Site unknown. Deliberately NOT the
 * gazetteer's pin (35.777, 32.119), which is south of the Zarqa (the Jabbok, at about 32.19 N here): Jacob,
 * coming from Haran, crosses the Jabbok only in 32:23. This illustrative point is in the hills of Gilead
 * north of the river: about 7 km north-north-west of Jerash (Wikipedia 32.28 N, 35.90 E) and some 16 km north of
 * the Zarqa at the King Talal Dam (32.19 N). It sits on the drawn Haran → Mahanaim arc at routeTo 2.96, so
 * the head of the line ends on it. Not a location claim.
 */
const GALED: LngLat = [35.8708, 32.3369]
/** Mahanaim (places.json ae5bfe9), pinned at Tell edh-Dhahab el-Gharbi on the Jabbok: one of several proposed sites, not certain. */
const MAHANAIM: LngLat = [35.68667, 32.18575]
/** Shift a camera east so a pin sits left of centre and its label fits on a phone. */
const eastOf = (p: LngLat, d: number): LngLat => [p[0] + d, p[1]]

const vayetze: ParshaStory = {
  parshaId: 'vayetze',
  tagline: 'A dream, a family, a flight.',
  sources: [
    'Genesis 28:10 – 32:3',
    'Genesis 22:4, 27:35, 27:43–45, 28:2, 32:23, 35:16–19',
    'Rashi on Genesis 28:10, 28:11, 28:12, 28:13, 28:17, 28:21, 29:11, 29:17, 29:25, 30:21, 31:7, 31:19, 31:32, 32:2, 32:3',
    'Kitzur Baal HaTurim on Genesis 28:10',
    'Talmud, Chullin 91b; Megillah 13b; Berakhot 60a (as cited by Rashi on Genesis 28:11, 29:25, 30:21)',
    'Bereshit Rabbah 68:12, 74:3, 74:9 (as cited by Rashi on Genesis 28:12, 31:7, 31:32)',
    'Pirkei DeRabbi Eliezer 35',
    'Wikipedia, “Bethel”, “Harran”, “Mahanaim”, “Tulul adh-Dhahab”, “Zarqa River”, “King Talal Dam”, “Gilead”, “Jerash”',
    'OpenBible.info, “Mahanaim” (six possible identifications)',
  ],
  route: [
    { name: 'Beersheba', at: BEERSHEBA, place: 'a075d61', hedge: 'usual site: Tel Be’er Sheva' },
    { name: 'Bethel', at: BETHEL, place: 'a64f355', hedge: 'usual site: Beitin' },
    { name: 'Haran', at: HARAN, place: 'a6d9af3', hedge: 'usual identification: Harran' },
    { name: 'Mahanaim', at: MAHANAIM, place: 'ae5bfe9', hedge: 'one of several proposed sites' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Vayetze',
      body: 'A dream, a family, a flight.',
      ref: 'Genesis 28:10 – 32:3',
      camera: { center: [37.1, 34.1], zoom: 4.6, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Jacob sets out',
      body: 'Jacob leaves Beer-sheba and sets out for Haran. His mother has told him to flee there, to her brother Laban, until Esau’s fury subsides; his father has sent him to take a wife from Laban’s daughters.',
      ref: 'Genesis 28:10 · 27:43–45, 28:2 · Rashi',
      note: 'The pin marks Tel Be’er Sheva, east of the modern city, the site usually identified with Beersheba. Rashi on 28:10 asks why the verse mentions leaving at all, and answers that when a righteous person leaves a town, its glory, splendor and beauty leave with him. In the Torah scroll the whole parsha runs without a single paragraph break (the Masoretic text has one before 28:10 and the next after 32:3). Kitzur Baal HaTurim on 28:10 brings a reason some give (י״א): Jacob left in secret and fled in hiding.',
      act: 'The dream',
      camera: { center: eastOf(BEERSHEBA, 0.08), zoom: 9.4, pitch: 50, bearing: -15 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'A stone under his head',
      body: 'He comes upon “a certain place” and stops there for the night, because the sun has set. Taking one of the stones of that place, he puts it under his head and lies down.',
      ref: 'Genesis 28:11 · Rashi',
      note: 'The Hebrew says he took “from the stones of the place”; in the morning it speaks of “the stone” (28:18). Rashi on 28:11 says he set several stones around his head against wild beasts, and brings the Talmud’s story (Chullin 91b): the stones quarreled over which would hold the righteous man’s head, and God made them one stone. Rashi also reads “the place” as Mount Moriah (22:4), and says the Rabbis learned from its verb that Jacob began the evening prayer. The verses name the place only later: Bethel, once called Luz (28:19). The pin marks Beitin, the usual identification of Bethel.',
      camera: { center: eastOf(BETHEL, 0.06), zoom: 9.2, pitch: 55, bearing: 10 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'stars',
      title: 'A stairway was set on the ground and its top reached to the sky, and angels of God were going up and down on it.',
      body: 'GOD, standing beside him (so JPS; Rashi reads “above him”), promises: “I am with you… and will bring you back to this land.”',
      ref: 'Genesis 28:12–15 · Rashi',
      note: 'The Hebrew סֻלָּם is often translated “ladder”; the JPS translation used here says “stairway,” and its note offers “ramp.” “Angels” is literally “messengers.” Rashi on 28:12 asks why they go up before they come down: the angels who had escorted Jacob in the Land could not leave it and went up, and the angels for outside the Land came down to escort him (Bereshit Rabbah 68:12). JPS reads God as “standing beside him”; Rashi on 28:13 reads “stood above him,” to guard him. God also promises him the land he is lying on and offspring as many as the dust of the earth (28:13–14). The stars are an illustration: the verses say the sun had set and he stayed the night (28:11), but mention no stars.',
      camera: { center: BETHEL, zoom: 7.6, pitch: 76, bearing: 0 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'quote',
      title: 'How awesome is this place! This is none other than the abode of God, and that is the gateway to heaven.',
      hebrew: 'מַה־נּוֹרָא הַמָּקוֹם הַזֶּה אֵין זֶה כִּי אִם־בֵּית אֱלֹהִים וְזֶה שַׁעַר הַשָּׁמָיִם',
      body: 'Jacob wakes: “Surely GOD is present in this place, and I did not know it!” Shaken, he says this. Rashi on 28:17 reads “gateway to heaven” as a place of prayer, where prayers go up to heaven.',
      ref: 'Genesis 28:16–17 · Rashi',
      note: '“GOD” (in some phrases “the ETERNAL”) is how the JPS Gender-Sensitive Edition renders God’s four-letter name. A similar reading appears in Pirkei DeRabbi Eliezer 35: the gate of heaven is there, open to hear prayers.',
      camera: { center: [BETHEL[0] + 0.02, BETHEL[1] + 0.19], zoom: 10.2, pitch: 40, bearing: 0 },
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: 'A pillar at Bethel',
      body: 'Early in the morning Jacob sets up the stone that was under his head as a pillar and pours oil on it. He names the place Bethel, “house of God”; the town had been called Luz.',
      ref: 'Genesis 28:18–19 · Rashi',
      note: '“House of God” is the JPS note on the name. Most scholars identify Bethel with the village of Beitin, north of Jerusalem; that is where the pin sits. Rashi on 28:17 suggests (“I say”) that Mount Moriah, the site of the Temple, was moved from its place to meet Jacob here at Luz, and that this is what the Talmud (Chullin 91b) means by the ground “shrinking” for him. In some texts, his comment goes on to say that this Bethel was not the one near Ai but one near Jerusalem.',
      camera: { center: eastOf(BETHEL, 0.06), zoom: 10, pitch: 58, bearing: -20 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'Jacob’s vow',
      body: 'Jacob makes a vow: if God stays with him and protects him on this journey, gives him bread to eat and clothing to wear, and he comes back safe to his father’s house, this stone will be God’s abode, and he will set aside a tenth of all God gives him.',
      ref: 'Genesis 28:20–22 · Rashi',
      note: 'Between the two halves stand the words “the ETERNAL shall be my God” (28:21). The JPS translation reads them as part of Jacob’s promise; Rashi on 28:21 reads them as part of the condition: that God’s name rest on him and on all his descendants.',
      camera: { center: eastOf(BETHEL, 0.06), zoom: 9.6, pitch: 55, bearing: 25 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'The well',
      body: 'Jacob comes to the land of the Easterners, to a well with a large stone on its mouth. The shepherds there are from Haran and know Laban. When Laban’s daughter Rachel comes with the flock, Jacob rolls the stone off the well, waters the flock, kisses Rachel, and weeps.',
      ref: 'Genesis 29:1–11 · Rashi',
      note: 'The shepherds rolled the stone off only once all the flocks had gathered (29:3, 8). The verses don’t name the well’s town; they say only that it was in the land of the Easterners (29:1) and that its shepherds were from Haran (29:4); the pin marks Harran in southern Turkey, the usual identification of Haran. Rashi on 29:11 gives two reasons Jacob wept: he foresaw that Rachel would not be buried with him, and he had come empty-handed.',
      act: 'In Haran',
      camera: { center: eastOf(HARAN, 0.12), zoom: 8.6, pitch: 50, bearing: -10 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Seven years for Rachel',
      body: 'Laban runs to greet his sister’s son and takes him home. After a month he asks what Jacob’s wages should be. Jacob loves Rachel, the younger daughter, and offers seven years’ work for her; “they seemed to him but a few days because of his love for her.”',
      ref: 'Genesis 29:12–20 · Rashi',
      note: 'Laban has two daughters: Leah, the older, and Rachel, the younger (29:16). JPS says “Leah had weak eyes” (29:17). Rashi on 29:17 explains why Leah’s eyes were rakkot (“weak” or “tender”): they were so from weeping, because people said the older daughter would marry Rebekah’s older son, Esau.',
      camera: { center: eastOf(HARAN, 0.12), zoom: 9.4, pitch: 55, bearing: 15 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'guess',
      title: 'The seven years are up, and Laban makes a wedding feast. Whom does he bring to Jacob that evening?',
      ref: 'Genesis 29:21–25',
      options: [
        { label: 'Rachel', he: 'רָחֵל' },
        { label: 'Leah', he: 'לֵאָה', correct: true },
        { label: 'Zilpah', he: 'זִלְפָּה' },
      ],
      reveal: 'Leah. Laban brought his daughter Leah to him in the evening (29:23), and “When morning came, there was Leah!” (29:25).',
      note: 'Zilpah was Laban’s maidservant, whom he gave to Leah as her maid (29:24).',
      camera: { center: eastOf(HARAN, 0.12), zoom: 9.8, pitch: 60, bearing: -25 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: '“Why did you deceive me?”',
      body: 'Laban answers: “It is not the practice in our place to marry off the younger before the older.” When Leah’s bridal week is over, Laban gives Jacob Rachel as his wife too, and Jacob serves him another seven years. He loves Rachel more than Leah.',
      ref: 'Genesis 29:25–30 · Rashi',
      note: 'Laban gave each daughter a maid: Zilpah to Leah, Bilhah to Rachel (29:24, 29). Rashi on 29:25, from the Talmud (Megillah 13b), says Jacob and Rachel had agreed on secret signs, and Rachel gave them to Leah so that her sister would not be put to shame.',
      camera: { center: eastOf(HARAN, 0.12), zoom: 9.4, pitch: 55, bearing: 5 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Two sisters',
      body: 'GOD sees that Leah is unloved and opens her womb; Rachel has no children. “Give me children, or I shall die,” Rachel tells Jacob. She gives him her maid Bilhah, and Leah later gives him her maid Zilpah.',
      ref: 'Genesis 29:31 – 30:13',
      note: 'Each child’s name comes with words that explain it, except Dinah’s (30:21).',
      act: 'The children',
      camera: { center: eastOf(HARAN, 0.12), zoom: 9.0, pitch: 52, bearing: -15 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'offerings',
      title: 'Sons of Leah and of Bilhah',
      ref: 'Genesis 29:32 – 30:8',
      note: 'The words after each name are the words spoken at the birth, in the JPS translation; its notes say which Hebrew word each name is “connected with,” and explain Reuben as “See a son.” Bilhah was Rachel’s maid, and Rachel named her sons. Leah also said at Reuben’s birth, “Now my husband will love me” (29:32).',
      items: [
        { he: 'רְאוּבֵן', en: 'Reuben · Leah', note: '“GOD has seen my affliction”' },
        { he: 'שִׁמְעוֹן', en: 'Simeon · Leah', note: '“GOD heard that I was unloved”' },
        { he: 'לֵוִי', en: 'Levi · Leah', note: '“This time my husband will become attached to me”' },
        { he: 'יְהוּדָה', en: 'Judah · Leah', note: '“This time I will praise GOD”' },
        { he: 'דָּן', en: 'Dan · Bilhah', note: 'Rachel: “God has vindicated me”' },
        { he: 'נַפְתָּלִי', en: 'Naphtali · Bilhah', note: 'Rachel: “A fateful contest I waged with my sister”' },
      ],
      camera: { center: HARAN, zoom: 8.4, pitch: 45, bearing: 0 },
      routeTo: 2,
    },
    {
      kind: 'offerings',
      title: 'Children of Zilpah, Leah and Rachel',
      numberFrom: 7,
      ref: 'Genesis 30:9–24, 35:16–19 · Rashi',
      note: 'The sons are numbered in the order the verses tell of their births, across both cards; Dinah, the only daughter of Jacob whom the Torah names, is in Zebulun’s row, since she was born after him and before Joseph (30:21). Zilpah was Leah’s maid, and Leah named her sons. Gad follows the qere, the way the verse is read (בָּא גָד, “luck has come”); it is written בגד, which JPS renders “What luck!” Issachar was born after Rachel traded Leah a night with Jacob for Reuben’s mandrakes (30:14–16). The verse gives no reason for Dinah’s name. Rashi on 30:21 brings the Talmud’s reading (Berakhot 60a): Leah passed judgment (dan) on herself and prayed, so that Rachel would not have fewer sons than a maid, and the child became a girl. Benjamin, Jacob’s twelfth son, is born next week (35:16–19).',
      items: [
        { he: 'גָּד', en: 'Gad · Zilpah', note: 'Leah: “Luck has come”' },
        { he: 'אָשֵׁר', en: 'Asher · Zilpah', note: 'Leah: “What fortune!”' },
        { he: 'יִשָּׂשכָר', en: 'Issachar · Leah', note: '“God has given me my reward”' },
        { he: 'זְבֻלוּן', en: 'Zebulun · Leah', note: '“This time my husband will exalt me.” Then Leah bears a daughter, Dinah; no reason is given for her name.' },
        { he: 'יוֹסֵף', en: 'Joseph · Rachel', note: '“May GOD add another son for me”' },
      ],
      camera: { center: HARAN, zoom: 8.4, pitch: 45, bearing: 20 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Speckled and spotted',
      body: 'Jacob asks leave to go home, but Laban wants him to stay. They agree that Jacob’s wages will be the speckled, spotted and dark-colored animals, yet that same day Laban removes them all. Jacob sets peeled rods by the watering troughs, the goats bear streaked, speckled and spotted young, and he grows exceedingly prosperous.',
      ref: 'Genesis 30:25–43',
      note: 'Laban left the animals he removed with his sons, and put three days’ journey between himself and Jacob (30:35–36). The verses don’t explain how the rods worked. Later Jacob tells of a dream in which an angel showed him that the mating he-goats were streaked, speckled and mottled: “for I have noted all that Laban has been doing to you” (31:10–12).',
      act: 'Going home',
      camera: { center: eastOf(HARAN, 0.12), zoom: 9.6, pitch: 58, bearing: 20 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: '“Return to your ancestors’ land”',
      body: 'Laban’s sons grumble that Jacob has taken their father’s wealth, and Laban’s manner toward him changes. GOD tells Jacob to go back. Jacob tells Rachel and Leah that their father has changed his wages “time and again,” and they answer: “do just as God has told you.”',
      ref: 'Genesis 31:1–16 · Rashi',
      note: '“Time and again” is literally “ten times,” says the JPS note (31:7; again in 31:41). Rashi on 31:7 reads the Hebrew word as a count of tens: a hundred times (Bereshit Rabbah 74:3). The angel in Jacob’s dream says, “I am the God of Bethel, where you anointed a pillar and where you made a vow to Me” (31:13).',
      camera: { center: eastOf(HARAN, 0.12), zoom: 9.0, pitch: 52, bearing: -5 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Away in secret',
      body: 'While Laban is off shearing his sheep, Jacob puts his wives and children on camels and sets out with all his livestock for his father Isaac in Canaan, without telling Laban. Rachel steals her father’s terafim. Jacob crosses the Euphrates and heads for the hill country of Gilead.',
      ref: 'Genesis 31:17–21 · Rashi',
      note: 'JPS calls the terafim “oracle idols”: figurines, apparently in human form, used in divination. The Torah doesn’t say why Rachel took them, and Jacob didn’t know she had (31:32). Rashi on 31:19 says she meant to wean her father from idol worship. The Hebrew says “the River,” which JPS renders as the Euphrates; where Jacob crossed isn’t said, and where the drawn line meets the river is not a claim.',
      camera: { center: [39.0, 34.3], zoom: 4.5, pitch: 20, bearing: 0 },
      routeTo: 2.96,
    },
    {
      kind: 'chapter',
      title: 'Laban gives chase',
      body: 'On the third day Laban hears that Jacob has fled. He pursues him for seven days and catches up with him in the hill country of Gilead. But God warns Laban in a dream: “Beware of attempting anything with Jacob, good or bad.” Laban scolds Jacob for fleeing in secret, and asks, “Why did you steal my gods?”',
      ref: 'Genesis 31:22–30',
      note: 'Gilead is a region east of the Jordan. The verses don’t say where in it Laban caught up; it was where they would pile the mound of 31:46–49, called Gal-ed and Mizpah, whose site is unknown. Jacob, coming from Haran in the north, crosses the Jabbok only later (32:23), so the spot is drawn north of the river, in the hills of Gilead. It is only illustrative, and it differs on purpose from the Map tab’s pin for Mizpah, which lies south of the Jabbok. The line stops short of Mahanaim, his next stop.',
      act: 'Gilead',
      camera: { center: eastOf(GALED, 0.1), zoom: 8.6, pitch: 52, bearing: -10 },
      routeTo: 2.96,
      spot: { name: 'Gal-ed / Mizpah (site unknown)', at: GALED, place: 'a694ea2' },
    },
    {
      kind: 'chapter',
      title: 'The search',
      body: 'Not knowing what Rachel has done, Jacob tells Laban that whoever has his gods shall not live. Laban searches tent after tent. Rachel has put the idols in the camel cushion and sits on them, and she tells her father she cannot rise before him. He finds nothing.',
      ref: 'Genesis 31:31–35 · Rashi',
      note: 'Rashi on 31:32 says that because of Jacob’s words Rachel died on the road (Bereshit Rabbah 74:9). Her death, giving birth to Benjamin on the road to Ephrath, comes next week (35:16–19).',
      camera: { center: eastOf(GALED, 0.1), zoom: 9.8, pitch: 58, bearing: 20 },
      routeTo: 2.96,
      spot: { name: 'Gal-ed / Mizpah (site unknown)', at: GALED, place: 'a694ea2' },
    },
    {
      kind: 'chapter',
      title: '“These twenty years”',
      body: 'Now Jacob is angry. Twenty years he has served Laban: fourteen for his two daughters and six for his flocks. He made good out of his own pocket every animal torn by beasts, he bore scorching heat by day and frost by night, and Laban changed his wages time and again.',
      ref: 'Genesis 31:36–42',
      camera: { center: eastOf(GALED, 0.1), zoom: 9.4, pitch: 55, bearing: -25 },
      routeTo: 2.96,
      spot: { name: 'Gal-ed / Mizpah (site unknown)', at: GALED, place: 'a694ea2' },
    },
    {
      kind: 'chapter',
      title: 'The mound of witness',
      body: 'Laban proposes a pact. Jacob sets up a stone as a pillar, and his kinsmen heap stones into a mound and eat there. Laban calls it Yegar-sahadutha, and Jacob calls it Gal-ed; it is also called Mizpah: “May GOD watch between you and me, when we are out of sight of each other.”',
      ref: 'Genesis 31:43–54',
      note: 'Both names mean “the mound of witness,” say the JPS notes: Yegar-sahadutha in Aramaic, Gal-ed in Hebrew, echoing the name Gilead. Mizpah is associated with yiṣeph, “watch.” Neither may cross the mound to harm the other (31:52). Jacob offers a sacrifice on the Height, and they spend the night there (31:54). The spot is illustrative; the site is unknown.',
      camera: { center: eastOf(GALED, 0.1), zoom: 10.2, pitch: 60, bearing: 10 },
      routeTo: 2.96,
      spot: { name: 'Gal-ed / Mizpah (site unknown)', at: GALED, place: 'a694ea2' },
    },
    {
      kind: 'chapter',
      title: 'God’s camp',
      body: 'Early in the morning Laban kisses his family good-by and goes home. Jacob goes on his way, and angels of God meet him. “This is God’s camp,” he says, and names the place Mahanaim.',
      ref: 'Genesis 32:1–3 · Rashi',
      note: 'Verse numbers follow the Hebrew; many English Bibles number 32:1 as 31:55. In 32:1 JPS says Laban “bade them good-by”; the Hebrew word is “blessed.” The JPS note connects Mahanaim with maḥaneh, “camp”; Rashi on 32:3 reads the name as two camps: the angels of outside the Land who had come with Jacob, and the angels of the Land who came to meet him (32:2). Mahanaim’s site is uncertain; the pin marks Tell edh-Dhahab el-Gharbi, on the north bank of the Jabbok, one of several proposed identifications. The verses tell of one crossing of the Jabbok, after this (32:23).',
      act: 'Mahanaim',
      camera: { center: eastOf(MAHANAIM, 0.08), zoom: 9.6, pitch: 56, bearing: -20 },
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'talk',
      title: 'Jacob woke and said, “Surely GOD is present in this place, and I did not know it!” When have you found something special in a place you didn’t expect?',
      note: 'Numbered pins mark usual or proposed identifications: Beersheba = Tel Be’er Sheva, Bethel = Beitin, Haran = Harran, Mahanaim = Tell edh-Dhahab el-Gharbi (one of several proposed sites). Zoomed out this far, stops close together share one numbered pin, drawn on the first of them (on a phone, 1·2·4 sits on Beersheba); each stop’s own card shows its own pin. Where the mound of Gal-ed and Mizpah stood is unknown; it is not shown here, and on its cards it is an illustrative spot. Lines join the stops in order; Jacob’s roads aren’t known, nor where he crossed the Euphrates; where the line meets the river is not a claim.',
      // Not used on screen: the finale fits the whole route into the strip above the card (DaylightMap fitBounds).
      camera: { center: [37.1, 34.1], zoom: 4.6, pitch: 20, bearing: 0 },
      routeTo: 3,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Jacob worked seven years for Rachel, and they felt like a few days because he loved her. What do you love doing so much that time flies?',
    },
    {
      audience: 'Everyone',
      text: 'Jacob woke and said, “Surely GOD is present in this place, and I did not know it!” When have you found something special in a place you didn’t expect?',
    },
    {
      audience: 'Deeper',
      text: 'In Genesis 27 the younger brother took the older one’s place, and Isaac said Jacob came “with guile” (בְּמִרְמָה, 27:35). In Haran the older sister takes the younger one’s place, and Jacob asks Laban, “Why did you deceive me?” (רִמִּיתָנִי, 29:25), a word from the same Hebrew root. What do you make of the echo?',
    },
  ],
}

export default vayetze
