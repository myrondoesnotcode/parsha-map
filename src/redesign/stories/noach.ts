// Noach — Genesis 6:9 – 11:32. No single journey: the ark, the Flood, the rainbow, Babel, and the line to Abram.
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// The Torah doesn't say where Noah lived or built the ark, so the Flood cards use a regional backdrop.
// The places the parsha does name get a spot each, never a route: the mountains of Ararat (a range;
// the pin is today's Mount Ararat), Erech (Uruk), Babel (Babylon), Ur and Haran (usual sites). Ur → Haran
// is a real journey, but it is one leg at the very end; Lech Lecha's route starts from Haran.
// Verses quote THE JPS TANAKH: Gender-Sensitive Edition (Sefaria). Claim table:
// docs/plans/2026-09-27-noach-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Ararat (places.json ab89be9): pinned on the peak now called Mount Ararat; Genesis 8:4 names only "the mountains of Ararat". */
const ARARAT: LngLat = [44.300381, 39.702761]
const ARARAT_PLACE = 'ab89be9'
/** Babel (places.json ab8fdbc): the ruins of Babylon. JPS on 11:9: Babel is "Babylon". Not the tower's site, which is unknown. */
const BABEL: LngLat = [44.422222, 32.543333]
/** Erech (places.json a5db1a6): Uruk, at Warka in southern Iraq. */
const ERECH: LngLat = [45.636111, 31.322222]
/** Ur (places.json a6cf75c "Ur 1"): the Sumerian city of Ur in southern Iraq, the usual identification of Ur of the Chaldeans. */
const UR: LngLat = [46.104444, 30.962222]
/** Haran (places.json a6d9af3): Harran in southern Turkey, its usual identification. */
const HARAN: LngLat = [39.032778, 36.864444]
/** A wide view from the Armenian highlands down to southern Iraq: a backdrop for the Flood cards, not a location claim. */
const REGION: LngLat = [44.2, 35.2]

const noach: ParshaStory = {
  parshaId: 'noach',
  tagline: 'A new beginning.',
  sources: [
    'Genesis 6–11, 12:1',
    'Genesis 2:16',
    '2 Kings 19:37',
    'Rashi on Genesis 6:9',
    'Rashi on Genesis 6:14, 6:16',
    'Rashi on Genesis 7:2',
    'Rashi on Genesis 7:11 (citing Rosh Hashanah 11b)',
    'Rashi on Genesis 8:14',
    'Rashi on Genesis 11:1',
    'Rashi on Genesis 11:28 (following Bereshit Rabbah 38:13)',
    'Sanhedrin 56a–b',
    'Sanhedrin 108a',
    'Sanhedrin 108b',
    'Berakhot 59a',
    'Shulchan Arukh, Orach Chayim 229:1',
    'Pirkei Avot 5:2',
    'Targum Onkelos on Genesis 8:4',
    'Scholarship: Epic of Gilgamesh, Tablet XI; Urartu; Etemenanki; Uruk; Ur of the Chaldees (Wikipedia summaries)',
  ],
  route: [],
  anchor: { name: 'the mountains of Ararat (8:4)', at: ARARAT, place: ARARAT_PLACE },
  cards: [
    {
      kind: 'cover',
      title: 'Noach',
      body: 'A new beginning.',
      ref: 'Genesis 6:9 – 11:32',
      camera: { center: REGION, zoom: 4.6, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Noah walked with God',
      body: 'No journey this week, and the Torah doesn’t say where Noah lived or built the ark. It opens: “Noah was a righteous man; he was blameless in his age; Noah walked with God.” But the earth is filled with lawlessness, and God tells Noah to build an ark.',
      ref: 'Genesis 6:9–14',
      note: 'The map is a backdrop for the lands this parsha names later: the mountains of Ararat, the land of Shinar, Ur and Haran. It doesn’t mark where Noah lived. “In his age” is literally “in his generations” (בְּדֹרֹתָיו). Rashi on 6:9 gives two readings from the Rabbis (Sanhedrin 108a): as praise, that he was righteous even in a wicked generation; or as a limit, that he was righteous only compared with it.',
      act: 'The Flood',
      camera: { center: REGION, zoom: 4.9, pitch: 30, bearing: -10 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'How to build the ark',
      ref: 'Genesis 6:14–16 · Rashi on Genesis 6:14, 6:16',
      note: 'The measurements are the Torah’s. How the top was finished, “within a cubit of the top,” is uncertain in the Hebrew (JPS note on 6:16); Rashi reads it as a roof sloping up to a cubit wide, so the rain would run off.',
      items: [
        { he: 'עֲצֵי־גֹפֶר', en: 'Gopher wood', note: '“Make yourself an ark of gopher wood.”' },
        { he: 'קִנִּים', en: 'Compartments', note: 'Rashi: a separate stall for each kind of animal.' },
        { he: 'כֹּפֶר', en: 'Pitch', note: 'To cover it inside and out.' },
        { he: 'ש׳ אַמָּה', en: '300 cubits long', note: '50 cubits wide and 30 high.' },
        { he: 'צֹהַר', en: 'An opening for daylight', note: 'Rashi: some say a window, others a precious stone that gave light.' },
        { he: 'פֶתַח', en: 'An entrance in its side', note: 'Rashi: so the rain wouldn’t come in.' },
        { en: 'Three decks', note: 'Bottom, second and third.' },
      ],
      camera: { center: REGION, zoom: 5.2, pitch: 40, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“Why are you building this ark?”',
      body: 'The Torah says only: “Noah did so; just as God commanded him, so he did.” The Talmud (Sanhedrin 108b) pictures the neighbors: Noah warned them, and they mocked him. Rashi on 6:14 says that was why God had him build an ark at all: people would see him at work, ask what it was for, and perhaps return to God.',
      ref: 'Genesis 6:22 · Sanhedrin 108b · Rashi on Genesis 6:14',
      note: 'In Sanhedrin 108b the neighbors ask, “Old man, why are you building this ark?” (William Davidson translation). Rashi says the building took 120 years; the Torah itself doesn’t say how long it took. The map is a backdrop.',
      camera: { center: REGION, zoom: 5.4, pitch: 50, bearing: 15 },
      routeTo: 0,
    },
    {
      kind: 'guess',
      title: 'Noah took two of every kind of animal. How many of every pure animal did he take?',
      ref: 'Genesis 6:19–20, 7:2–3 · Rashi on Genesis 7:2',
      options: [
        { label: 'One pair', he: 'שְׁנַיִם' },
        { label: 'Seven pairs', he: 'שִׁבְעָה שִׁבְעָה', correct: true },
        { label: 'Ten pairs', he: 'עֲשָׂרָה עֲשָׂרָה' },
      ],
      reveal: '“Of every pure animal you shall take seven pairs, male and female mates, and of every animal that is not pure, two” (7:2), and seven pairs of the birds too (7:3). Rashi on 7:2 says the extra ones were so Noah could bring offerings when he left the ark.',
      note: 'The Hebrew says “seven seven” (שִׁבְעָה שִׁבְעָה), which JPS translates “seven pairs.” God’s first instruction was two of each (6:19–20); the seven pairs come in chapter 7.',
      camera: { center: REGION, zoom: 5.4, pitch: 50, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Forty days and forty nights',
      body: 'In Noah’s six hundredth year, on the seventeenth day of the second month, the fountains of the great deep burst and the floodgates of the sky broke open. Noah’s family and the animals went in, and God shut him in. Rain fell forty days and forty nights, the highest mountains were covered, and only Noah and those with him in the ark were left.',
      ref: 'Genesis 7:6–23 · Rashi on Genesis 7:11',
      note: 'Which month is “the second”? Rashi on 7:11 brings a disagreement (Rosh Hashanah 11b): Rabbi Eliezer says Marcheshvan, counting from Tishrei; Rabbi Joshua says Iyar, counting from Nisan. The map is a backdrop; the Torah doesn’t say where the ark was during the Flood.',
      camera: { center: REGION, zoom: 5.0, pitch: 45, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'A year in the ark',
      ref: 'Genesis 7:11 – 8:16 · Rashi on Genesis 8:14',
      note: 'The months are numbered, not named. From the 17th of the second month to the 27th of the second month a year later: Rashi on 8:14 says the extra days are the difference between a lunar and a solar year, so the Flood lasted a full solar year.',
      items: [
        { he: 'חֹדֶשׁ ב׳', en: 'The Flood begins', note: 'Month 2, day 17, in Noah’s 600th year (7:11).' },
        { he: 'מ׳ יוֹם', en: 'Forty days of rain', note: 'Forty days and forty nights (7:12).' },
        { he: 'ק״נ יוֹם', en: 'The waters swell 150 days', note: 'Then God remembers Noah and sends a wind (7:24 – 8:1).' },
        { he: 'חֹדֶשׁ ז׳', en: 'The ark comes to rest', note: 'Month 7, day 17, on the mountains of Ararat (8:4).' },
        { he: 'חֹדֶשׁ י׳', en: 'Mountaintops appear', note: 'Month 10, day 1 (8:5).' },
        { he: 'חֹדֶשׁ א׳', en: 'The ground is drying', note: 'Month 1, day 1, of the 601st year (8:13).' },
        { he: 'חֹדֶשׁ ב׳', en: 'The earth is dry', note: 'Month 2, day 27. “Come out of the ark” (8:14–16).' },
      ],
      camera: { center: REGION, zoom: 5.2, pitch: 40, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'On the mountains of Ararat',
      body: 'God remembers Noah and all the animals with him and sends a wind, and the waters go down. On the seventeenth day of the seventh month, the ark comes to rest on “the mountains of Ararat.” The Torah names a range, not a single peak.',
      ref: 'Genesis 8:1–5',
      note: 'Ararat is also a land: Sennacherib’s sons flee “to the land of Ararat” (2 Kings 19:37). Historians generally take Ararat as the Hebrew name of Urartu, an ancient kingdom in the Armenian highlands. The pin shows the peak called Mount Ararat today, in eastern Turkey; linking that one peak with the ark is a later tradition, not the Torah’s. Targum Onkelos renders the phrase “the mountains of Kardu.”',
      camera: { center: ARARAT, zoom: 6.6, pitch: 55, bearing: -15 },
      routeTo: 0,
      spot: { name: 'Mount Ararat (today’s peak)', at: ARARAT, place: ARARAT_PLACE },
    },
    {
      kind: 'chapter',
      title: 'The raven and the dove',
      body: 'Noah opens the window and sends out a raven, then a dove. The dove finds nowhere to rest and comes back. Seven days later it returns toward evening with a plucked-off olive leaf in its bill, and Noah knows the waters have gone down. Seven days after that, it doesn’t come back.',
      ref: 'Genesis 8:6–12',
      note: 'Scholarship: in the flood story in the Babylonian Epic of Gilgamesh (Tablet XI), the survivor Utnapishtim also sends out birds: a dove and a swallow, which come back, then a raven, which doesn’t. Scholars debate how the two accounts are related.',
      camera: { center: ARARAT, zoom: 7.4, pitch: 62, bearing: 25 },
      routeTo: 0,
      spot: { name: 'Mount Ararat (today’s peak)', at: ARARAT, place: ARARAT_PLACE },
    },
    {
      kind: 'chapter',
      title: 'Seedtime and harvest',
      body: 'God tells Noah to come out with his family and every creature. Noah builds an altar and brings offerings. God resolves never again to destroy every living being: “So long as the earth endures, seedtime and harvest, cold and heat, summer and winter, day and night shall not cease.”',
      ref: 'Genesis 8:15–22',
      note: 'The Torah doesn’t say where Noah built the altar. The map is a backdrop.',
      act: 'After the Flood',
      camera: { center: REGION, zoom: 5.2, pitch: 45, bearing: -15 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'In the image of God',
      body: 'God blesses Noah and his sons: “Be fertile and increase, and fill the earth.” Now they may eat meat, but not flesh with its life-blood in it. And whoever sheds human blood must answer for it, “for in the image of God was humankind made.”',
      ref: 'Genesis 9:1–7 · Sanhedrin 56a–b',
      note: 'The Talmud (Sanhedrin 56a) lists seven commandments for “the descendants of Noah,” all humanity: to set up courts of justice, and not to curse God, worship idols, commit forbidden relations, shed blood, rob, or eat a limb torn from a living animal. Rabbi Yochanan derives them from God’s command to Adam (Genesis 2:16; Sanhedrin 56b), not from this chapter.',
      camera: { center: REGION, zoom: 5.0, pitch: 35, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'I have set My bow in the clouds, and it shall serve as a sign of the covenant between Me and the earth.',
      hebrew: 'אֶת־קַשְׁתִּי נָתַתִּי בֶּעָנָן וְהָיְתָה לְאוֹת בְּרִית בֵּינִי וּבֵין הָאָרֶץ',
      body: 'Never again a flood to destroy the earth. On seeing a rainbow, the Talmud (Berakhot 59a) gives the blessing: “Blessed… Who remembers the covenant and is faithful to His covenant and fulfills His word.”',
      ref: 'Genesis 9:8–17 · Berakhot 59a',
      note: 'The English of the blessing is the William Davidson translation. Berakhot 59a quotes two versions, and Rav Pappa says to say them both combined; the Shulchan Arukh (Orach Chayim 229:1) gives the blessing this way and adds that one shouldn’t keep gazing at the rainbow.',
      camera: { center: REGION, zoom: 5.6, pitch: 60, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Noah’s vineyard',
      body: 'Noah, the tiller of the soil, is the first to plant a vineyard. He drinks its wine and lies uncovered in his tent. His son Ham sees and tells his brothers; Shem and Japheth walk in backward with a cloth and cover their father without looking.',
      ref: 'Genesis 9:18–29',
      note: 'When Noah wakes, he curses Ham’s son Canaan and blesses Shem and Japheth (9:24–27). Noah lives 350 years after the Flood, 950 years in all (9:28–29). The map is a backdrop.',
      camera: { center: REGION, zoom: 5.0, pitch: 40, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'The nations branch out',
      body: 'Chapter 10 lists the families of Noah’s sons, Shem, Ham and Japheth, “by their lands—each with its language.” Among them is Nimrod, “a mighty hunter”: the mainstays of his kingdom are Babylon, Erech, Accad and Calneh, in the land of Shinar.',
      ref: 'Genesis 10:1–32',
      note: 'Erech is Uruk, whose ruins lie at Warka in southern Iraq; it was one of the first great cities of Sumer. From Shinar, Asshur goes on to build Nineveh and Calah in the north (10:11). JPS notes that “and Calneh” may be better read “all of them being” (10:10).',
      act: 'The nations',
      camera: { center: ERECH, zoom: 6.4, pitch: 45, bearing: -10 },
      routeTo: 0,
      spot: { name: 'Erech (Uruk)', at: ERECH, place: 'a5db1a6' },
    },
    {
      kind: 'chapter',
      title: 'A tower with its top in the sky',
      body: 'Everyone on earth speaks one language. In a valley in the land of Shinar, people bake bricks and say, “Come, let us build us a city, and a tower with its top in the sky, to make a name for ourselves.” God confounds their speech and scatters them over the whole earth, and the city is called Babel.',
      ref: 'Genesis 11:1–9 · Rashi on Genesis 11:1',
      note: 'JPS notes that Babel is “Babylon,” and that the name plays on balal, “confound” (11:9). The pin marks the ruins of Babylon, in Iraq; where the tower stood isn’t known. The builders used brick for stone and bitumen for mortar (11:3). Scholarship: some scholars think Babylon’s temple tower, Etemenanki, built of brick and bitumen, may have influenced the story. Rashi on 11:1 says the one language was the Holy Tongue, Hebrew.',
      camera: { center: BABEL, zoom: 7.4, pitch: 55, bearing: 15 },
      routeTo: 0,
      spot: { name: 'Babel (Babylon; tower site unknown)', at: BABEL, place: 'ab8fdbc' },
    },
    {
      kind: 'chapter',
      title: 'Ten generations to Abram',
      body: 'From Shem, the line runs ten generations to Abram, son of Terah. Abram’s brother Haran dies in his native land, Ur of the Chaldeans. Abram marries Sarai, who has no child.',
      ref: 'Genesis 11:10–30 · Pirkei Avot 5:2',
      note: 'Pirkei Avot 5:2 counts “ten generations from Noah to Abraham,” to show God’s patience. Ur is usually identified with the Sumerian city of Ur in southern Iraq, where the pin is; some Jewish traditions place it near Urfa, in Turkey. Rashi on 11:28, following Bereshit Rabbah 38:13, tells how Abram smashed his father’s idols, and Nimrod threw him into a fiery furnace, from which he was saved; Rashi says the name Ur (fire) alludes to that.',
      act: 'Toward Abram',
      camera: { center: UR, zoom: 6.8, pitch: 50, bearing: 10 },
      routeTo: 0,
      spot: { name: 'Ur of the Chaldeans (usual site)', at: UR, place: 'a6cf75c' },
    },
    {
      kind: 'chapter',
      title: 'As far as Haran',
      body: 'Terah takes Abram, Sarai and his grandson Lot and sets out from Ur of the Chaldeans for the land of Canaan. But they come only as far as Haran and settle there, and Terah dies in Haran. Next week, in Lech Lecha, God tells Abram to go.',
      ref: 'Genesis 11:31–32, 12:1',
      note: 'Haran is usually identified with Harran, in southern Turkey, where the pin is. In English the town and Abram’s brother share a name; in Hebrew they don’t: the town is חָרָן, the brother הָרָן. The Torah doesn’t give the road from Ur to Haran, so no line is drawn.',
      camera: { center: HARAN, zoom: 6.6, pitch: 50, bearing: -10 },
      routeTo: 0,
      spot: { name: 'Haran (usual site: Harran)', at: HARAN, place: 'a6d9af3' },
    },
    {
      kind: 'talk',
      title: 'The builders of Babel wanted “to make a name for ourselves.” The Torah remembers Noah as “a righteous man.” What would you like your name to stand for?',
      note: 'No journey this week, so no route is drawn. The pins mark usual identifications: today’s Mount Ararat stands in for a range the Torah doesn’t pin down; Babel is Babylon, Erech is Uruk; Ur and Haran are at their usual sites. Where Noah lived, and where the tower stood, aren’t known.',
      camera: { center: REGION, zoom: 4.6, pitch: 25, bearing: 0 },
      routeTo: 0,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Noah sent out the dove three times. What did it bring back the second time, and what did that tell Noah?',
    },
    {
      audience: 'Everyone',
      text: 'The builders of Babel wanted “to make a name for ourselves.” The Torah remembers Noah as “a righteous man.” What would you like your name to stand for?',
    },
    {
      audience: 'Deeper',
      text: 'Noah was “blameless in his age.” Rabbi Yochanan reads that as a limit: righteous only compared with his generation. Reish Lakish reads it as praise: righteous even then, so all the more in a better one (Sanhedrin 108a). Which reading convinces you, and why?',
    },
  ],
}

export default noach
