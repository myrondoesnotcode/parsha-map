// Vayigash — Genesis 44:18 – 47:27
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A short journey: Beersheba → Goshen. The parsha opens in Egypt, in Joseph's house (44:14), which the
// verses don't locate; those cards show Egypt as a region (its places.json point, which is the Heliopolis
// pin, is only a point in it). The brothers go up to Jacob "in the land of Canaan" (45:25), a region; where
// in it Jacob was isn't said here, so that card shows the region with no pin (the gazetteer's Canaan point
// is in the Galilee, far from Hebron, where the verses last place Jacob: 35:27, 37:14). Jacob's journey is numbered from Beersheba (46:1), the first place the
// verses name. Where Pharaoh received Joseph's family isn't said, so those cards light no stop. Goshen is a
// region whose extent is uncertain; its places.json point lies at Qantir (about 0.2 km from Wikipedia's
// Pi-Ramesses coordinates, beside Avaris), which is one of the proposed areas; the western Wadi Tumilat, the other,
// lies about 30 km south and isn't pinned. The gazetteer's Rameses pin (a079b21) is about 1.8 km south-west of
// the Goshen point, so the "region of Rameses" card (47:11) is shown at the Goshen pin and says so. Verses quote
// THE JPS TANAKH: Gender-Sensitive Edition (Sefaria); Hebrew is Miqra according to the Masorah without
// cantillation marks (the meteg, a vowel-stress mark, is kept; a verse-final silluq is dropped). Claim table: docs/plans/2026-09-28-vayigash-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Beersheba (places.json a075d61 "Beersheba 2"), pinned at Tel Be'er Sheva, its usual identification. */
const BEERSHEBA: LngLat = [34.840833, 31.244722]
/**
 * Goshen (places.json a60f092 "Goshen 1"), "a region in the eastern Nile Delta; exact extent uncertain". Its point
 * lies at Qantir by Avaris (0.16 km from Wikipedia's Pi-Ramesses point, 0.53 km from Qantir's), one proposed area;
 * the gazetteer's Rameses pin (a079b21) is 1.84 km south-west. It doesn't mark the region's extent.
 */
const GOSHEN: LngLat = [31.834217, 30.79937]
/** Egypt (places.json af301ca), a region; its point is the same as the Heliopolis pin. Only a point in it. */
const EGYPT: LngLat = [31.3075, 30.129444]

/**
 * Camera on a pin, with the pin moved about 95 px left of centre so its label and hedge fit on a phone.
 * Moves the centre along the screen's x-axis for the given bearing (Web Mercator, 512 px tiles).
 */
const onPin = (p: LngLat, zoom: number, pitch: number, bearing: number) => {
  const deg = (95 * 360) / (512 * 2 ** zoom)
  const b = (bearing * Math.PI) / 180
  const center: LngLat = [p[0] + deg * Math.cos(b), p[1] - deg * Math.sin(b) * Math.cos((p[1] * Math.PI) / 180)]
  return { center, zoom, pitch, bearing }
}

const EGYPT_SPOT = { name: 'Egypt (a region, not a site)', at: EGYPT, place: 'af301ca' }

const vayigash: ParshaStory = {
  parshaId: 'vayigash',
  tagline: 'Joseph reveals himself.',
  sources: [
    'Genesis 44:18 – 47:27',
    'Genesis 25:7, 26:23–25, 35:27–28, 37:14, 41:29–30, 42:8, 44:12, 44:16–17',
    'Exodus 1:5',
    'Deuteronomy 10:22',
    'Rashi on Genesis 44:32, 45:1, 45:3, 45:6, 45:12, 45:24, 45:27, 46:1, 46:2, 46:3, 46:4, 46:15, 46:26, 46:28, 46:29, 47:7, 47:9, 47:10, 47:11, 47:19, 47:21',
    'Ibn Ezra on Genesis 46:27',
    'Bereshit Rabbah 93:10',
    'Bereshit Rabbah 94:3',
    'Tosefta Sotah 10:3',
    'Wikipedia, “Land of Goshen”, “Pi-Ramesses”, “Qantir”, “Tel Be’er Sheva”',
  ],
  route: [
    { name: 'Beersheba', at: BEERSHEBA, place: 'a075d61', hedge: 'usual site: Tel Be’er Sheva' },
    { name: 'Goshen', at: GOSHEN, place: 'a60f092', hedge: 'a region; extent uncertain' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Vayigash',
      body: 'Joseph reveals himself.',
      ref: 'Genesis 44:18 – 47:27',
      camera: { center: [33.3, 31.3], zoom: 5.7, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Judah steps forward',
      body: 'Judah goes up to Joseph, though the brothers still don’t know who he is: “do not be impatient with your servant, you who are the equal of Pharaoh.” He retells what their father said about sending Benjamin: one son “was torn by a beast,” and if this one meets disaster, “you will send my white head down to Sheol in sorrow.”',
      ref: 'Genesis 44:18–29 · Genesis 42:8, 44:12, 44:16–17',
      note: 'The silver goblet had turned up in Benjamin’s bag (44:12), and Joseph had said that only the one who had it would be his slave, while the rest could go back in peace to their father (44:17). The brothers had not recognized Joseph since they came to Egypt (42:8). The verses don’t say where in Egypt Joseph’s house was; the hollow pin only marks Egypt, a region.',
      act: 'Judah’s plea',
      camera: onPin(EGYPT, 6.6, 30, 0),
      routeTo: 0,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'quote',
      title: 'For how can I go back to my father unless the boy is with me?',
      hebrew: 'כִּי־אֵיךְ אֶֽעֱלֶה אֶל־אָבִי וְהַנַּעַר אֵינֶנּוּ אִתִּי',
      body: 'Judah had pledged himself to his father for the boy. Now he asks to stay behind as Joseph’s slave instead of the boy, and let the boy go back with his brothers.',
      ref: 'Genesis 44:30–34 · Rashi',
      note: 'The verse goes on: “Let me not be witness to the woe that would overtake my father!” (44:34). Judah says their father’s “own life is so bound up with his” (44:30). Rashi on 44:32 has Judah explain why he, more than his brothers, pleads for the boy: he had bound himself by a pledge.',
      // Page card: the Delta as a backdrop.
      camera: { center: [31.3, 30.6], zoom: 7.2, pitch: 35, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“Have everyone withdraw from me!”',
      body: 'Joseph can no longer control himself before his attendants. He sends everyone out, and with no one else there he makes himself known to his brothers. His sobs are so loud that the Egyptians hear, and the news reaches Pharaoh’s palace.',
      ref: 'Genesis 45:1–2 · Rashi',
      note: 'Rashi on 45:1 says Joseph could not bear to have the Egyptians stand by and see his brothers put to shame when he made himself known. The verses don’t say where in Egypt this happened; the hollow pin only marks Egypt, a region.',
      act: 'I am Joseph',
      camera: onPin(EGYPT, 7.0, 40, -15),
      routeTo: 0,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'quote',
      title: 'I am Joseph. Is my father still well?',
      hebrew: 'אֲנִי יוֹסֵף הַעוֹד אָבִי חָי',
      body: 'His brothers cannot answer him, “so dumfounded were they on account of him.”',
      ref: 'Genesis 45:3 · Rashi · Bereshit Rabbah 93:10',
      note: 'The Hebrew חָי means “alive”; this JPS translation has “well.” Rashi on 45:3 says they were dumfounded out of shame. In Bereshit Rabbah 93:10, Abba Kohen Bardela draws a lesson: the midrash calls Joseph קְטַנָּן שֶׁל שְׁבָטִים, “the youngest of the tribes” in Sefaria’s translation (Benjamin was in fact younger), and his brothers could not stand up to his rebuke; how much less will anyone stand up when the Holy One comes to rebuke each person.',
      // Page card: the Delta as a backdrop.
      camera: { center: [31.3, 30.6], zoom: 7.2, pitch: 35, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'God sent me ahead of you',
      body: '“I am your brother Joseph, he whom you sold into Egypt. Now, do not be distressed or reproach yourselves… it was to save life that God sent me ahead of you.” Two years of famine have passed, Joseph says, and five more are to come. “So, it was not you who sent me here, but God.”',
      ref: 'Genesis 45:4–8 · Genesis 41:29–30 · Rashi',
      note: 'Two years gone and five to come make the seven years of famine foretold in Pharaoh’s dream (41:30); Rashi on 45:6 reads “two years” as two of the famine years that have passed. God “has made me a father to Pharaoh,” Joseph says (45:8); JPS notes this means Pharaoh’s chancellor. The hollow pin only marks Egypt, a region.',
      camera: onPin(EGYPT, 7.0, 45, 10),
      routeTo: 0,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'chapter',
      title: '“Come down to me without delay”',
      body: 'Joseph sends word to his father: “You will dwell in the region of Goshen, where you will be near me,” and there Joseph will provide for them, for five years of famine are still to come. He embraces his brother Benjamin and weeps, and kisses all his brothers and weeps upon them; only then can they talk to him.',
      ref: 'Genesis 45:9–15 · Rashi',
      note: '“Embraced” is literally “fell on” (JPS note). Joseph says, “You can see for yourselves, and my brother Benjamin for himself, that it is indeed I who am speaking to you” (45:12); Rashi there reads it as: I speak to you in the Holy Language, Hebrew, and just as I bear no hatred to Benjamin, who had no part in selling me, so I bear none to you. Goshen is a region; its pin appears later in the story.',
      camera: onPin(EGYPT, 7.0, 45, -10),
      routeTo: 0,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'chapter',
      title: 'Wagons from Egypt',
      body: 'Pharaoh and his courtiers are pleased, and Pharaoh has the brothers take wagons from Egypt for their children and wives, and bring their father. Joseph gives each brother a change of clothing, and Benjamin three hundred pieces of silver and several changes. To his father he sends ten male donkeys laden with the best things of Egypt, and ten female donkeys with grain, bread and provisions.',
      ref: 'Genesis 45:16–24 · Rashi',
      note: 'Joseph also gives them provisions for the journey (45:21). “Several” is literally “five” (JPS note). As he sends them off he tells them, “Do not be quarrelsome on the way” (45:24); Rashi on 45:24, after two other readings, gives the plain sense: he feared they would argue on the way over which of them was to blame for selling him. The hollow pin only marks Egypt, a region.',
      camera: onPin(EGYPT, 6.8, 40, 20),
      routeTo: 0,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'chapter',
      title: 'The spirit of Jacob revives',
      body: 'The brothers go up to their father Jacob in the land of Canaan: “Joseph is still alive; yes, he is ruler over the whole land of Egypt.” His heart goes numb; he does not believe them. But when they tell him all that Joseph said, and he sees the wagons Joseph sent to carry him, Jacob’s spirit revives. “Enough!” says Israel. “My son Joseph is still alive! I must go and see him before I die.”',
      ref: 'Genesis 45:25–28 · Genesis 35:27, 37:14 · Rashi · Bereshit Rabbah 94:3',
      note: 'Rashi on 45:27 brings a midrashic reading, found in Bereshit Rabbah 94:3 in the name of Rabbi Levi citing Rabbi Yoḥanan bar Shaul, that reads the wagons (עֲגָלוֹת, agalot) as a sign: Joseph reminded his father of what they had been studying together when they parted, the law of the heifer (eglah) whose neck is broken. Rashi points out that the verse says “the wagons that Joseph had sent,” not “that Pharaoh had sent.” Rashi also says Jacob’s spirit revived because the Divine Presence, which had left him, rested on him again. Canaan is a region; where in it Jacob was isn’t said here, so no pin is shown. The last specific places the verses name for him are Hebron (35:27) and the valley of Hebron (37:14).',
      act: 'Down to Egypt',
      // Canaan and the way down to Egypt; no pin, since where Jacob was isn't said.
      camera: { center: [33.6, 31.0], zoom: 6.0, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Sacrifices to the God of Isaac',
      body: 'Israel sets out with all that is his and comes to Beer-sheba, where he offers sacrifices to the God of his father Isaac.',
      ref: 'Genesis 46:1 · Genesis 26:23–25, 37:14 · Rashi · Wikipedia',
      note: 'The verse doesn’t say where Jacob set out from; the last specific place named for him is the valley of Hebron, from which he sent Joseph to his brothers (37:14). Isaac had built an altar at Beer-sheba (26:23–25). Rashi on 46:1 says the sacrifices are named for Isaac rather than Abraham because honoring a father comes before honoring a grandfather. The pin marks Tel Be’er Sheva, the usual site of ancient Beersheba; excavations there found its earliest occupation in Iron Age I (Wikipedia, “Tel Be’er Sheva”).',
      camera: onPin(BEERSHEBA, 9.2, 50, 0),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'stars',
      title: 'Fear not to go down to Egypt, for I will make you there into a great nation.',
      body: 'God calls to Israel in a vision by night: “Jacob! Jacob!” “Here.” “I Myself will go down with you to Egypt, and I Myself will also bring you back.”',
      ref: 'Genesis 46:2–4 · Rashi',
      note: 'The Hebrew בְּמַרְאֹת הַלַּיְלָה is plural, “in visions of the night”; this JPS translation has “in a vision by night.” The promise ends, “and Joseph’s hand shall close your eyes” (46:4). Rashi on 46:2 says the doubled name is a sign of affection; on 46:3, that God said “fear not” because Jacob was grieved at having to leave the land; on 46:4, that “bring you back” promised he would be buried in the land. The stars are an illustration: the verse says it was night, but mentions no stars.',
      camera: onPin(BEERSHEBA, 9.6, 72, 0),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Into the wagons',
      body: 'Jacob sets out from Beer-sheba. His sons put their father, their children and their wives in the wagons Pharaoh had sent, and take their livestock and the wealth they had gained in Canaan. Jacob brings all his offspring with him to Egypt: sons and grandsons, daughters and granddaughters.',
      ref: 'Genesis 46:5–7',
      note: 'The verses don’t say which way they went from Beer-sheba to Egypt.',
      camera: onPin(BEERSHEBA, 8.6, 45, -20),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'offerings',
      title: 'Jacob and his descendants who came to Egypt',
      ref: 'Genesis 46:8–25 · Rashi · Ibn Ezra',
      note: 'The numbers are the verses’ own. The names given for Leah’s line come to 34; less Er and Onan, who “had died in the land of Canaan” (46:12), that leaves 32, yet the verse says 33. JPS notes that the 33 includes Jacob, and Ibn Ezra on 46:27 reads it the same way (“Jacob and his descendants,” 46:8). Rashi on 46:15 says the one not named is Jochebed, Levi’s daughter, born “between the walls” as they entered Egypt. Dan’s line reads “sons” but names only Hushim (JPS note). Joseph’s sons were born in Egypt to Asenath, daughter of Poti-phera, priest of On (46:20).',
      items: [
        { he: 'לֵאָה', en: 'Leah’s line · 33', note: 'Reuben, Simeon, Levi, Judah, Issachar and Zebulun with their sons, Judah’s grandsons Hezron and Hamul, and Dinah' },
        { he: 'זִלְפָּה', en: 'Zilpah’s line · 16', note: 'Gad and Asher with their sons, Asher’s daughter Serah, and Beriah’s sons Heber and Malchiel. Zilpah is Leah’s maid.' },
        { he: 'רָחֵל', en: 'Rachel’s line · 14', note: 'Joseph and his sons Manasseh and Ephraim; Benjamin and his ten sons' },
        { he: 'בִּלְהָה', en: 'Bilhah’s line · 7', note: 'Dan and Hushim; Naphtali and his four sons. Bilhah is Rachel’s maid.' },
      ],
      // Page card: the way down toward Egypt as a backdrop.
      camera: { center: [33.4, 30.6], zoom: 6.4, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'Thus the total of Jacob’s household who came to Egypt was seventy persons.',
      hebrew: 'כׇּל־הַנֶּפֶשׁ לְבֵֽית־יַעֲקֹב הַבָּאָה מִצְרַיְמָה שִׁבְעִים',
      body: 'The four lines add up to 70: 33 + 16 + 14 + 7. Verse 26 counts 66, Jacob’s own issue who came with him; JPS notes that leaves out Joseph and his two sons. With the two sons (verse 27) and, JPS notes, Jacob and Joseph: 66 + 2 + 2 = 70.',
      ref: 'Genesis 46:26–27 · Rashi · Exodus 1:5 · Deuteronomy 10:22',
      note: 'Verse 26 also leaves out “the wives of Jacob’s sons.” Rashi on 46:26 counts differently: 66 set out from Canaan, and they were 70 once they came, finding Joseph and his two sons there, with Jochebed born as they entered. The Torah gives the number seventy again in Exodus 1:5 and Deuteronomy 10:22.',
      // Page card: the way down toward Egypt as a backdrop.
      camera: { center: [33.4, 30.6], zoom: 6.4, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Judah goes ahead',
      body: 'Jacob had sent Judah ahead to Joseph, to point the way to Goshen. When they reach the region of Goshen, Joseph orders his chariot and goes to meet his father Israel, embraces him around the neck, and weeps on his neck a good while. “Now I can die,” says Israel, “having seen for myself that you are still alive.”',
      ref: 'Genesis 46:28–30 · Rashi · Wikipedia',
      note: '“Ordered” is literally “hitched” (JPS note); Rashi on 46:29 says Joseph harnessed the horses himself, eager to honor his father, and that Jacob did not fall on Joseph’s neck or kiss him: the Rabbis say he was reciting the Shema. Rashi on 46:28 reads “to point the way” as to prepare a place for him, and brings a midrash: to set up a house of study. Goshen is a region whose extent is uncertain. It is usually placed in the eastern Nile Delta; scholars have proposed the western Wadi Tumilat, or an area at or near Avaris (Wikipedia, “Land of Goshen”). The pin is the gazetteer’s point for Goshen, at Qantir by Avaris, one of the proposed areas; the western Wadi Tumilat, the other, lies about 30 km to the south and isn’t pinned. The pin doesn’t mark the region’s extent. Lines join the stops in order; the road isn’t known.',
      act: 'In Goshen',
      camera: onPin(GOSHEN, 8.2, 45, 0),
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'Shepherds',
      body: 'Joseph tells his family to say they have always bred livestock, “so that you may stay in the region of Goshen. For all shepherds are abhorrent to Egyptians.” He presents a few of his brothers to Pharaoh, and they ask to stay in Goshen: there is no pasture for their flocks, the famine being severe in Canaan. Pharaoh tells Joseph to settle them in the best part of the land, in Goshen, and to put any capable men among them in charge of his livestock.',
      ref: 'Genesis 46:31 – 47:6',
      note: '“A few” is literally “five” (JPS note). The verses don’t say where Pharaoh received them. The Goshen pin shows where the family was staying (47:1), not where Pharaoh received them; the hollow pin marks Egypt, a region.',
      camera: { center: [31.75, 30.3], zoom: 7.4, pitch: 40, bearing: 0 },
      routeTo: 1,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'guess',
      title: 'Joseph presents his father Jacob to Pharaoh. “How many are the years of your life?” Pharaoh asks. What does Jacob answer?',
      ref: 'Genesis 47:7–9',
      options: [{ label: '100 years' }, { label: '130 years', correct: true }, { label: '180 years' }],
      reveal: '“The years of my sojourn [on earth] are one hundred and thirty” (47:9).',
      camera: { center: [31.75, 30.3], zoom: 7.4, pitch: 35, bearing: 0 },
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: 'Few and hard',
      body: 'Jacob greets Pharaoh. “Few and hard have been the years of my life,” he says, “nor do they come up to the life spans of my ancestors during their sojourns.” Then he bids Pharaoh farewell and leaves his presence.',
      ref: 'Genesis 47:7–10 · Genesis 25:7, 35:28 · Rashi',
      note: 'JPS notes that the ancestors are Terah, Abraham and Isaac; Abraham lived 175 years (25:7), Isaac 180 (35:28). “Greeted” (47:7) and “bade farewell” (47:10) are both וַיְבָרֶךְ, literally “blessed”; Rashi reads it as a greeting of peace, as people do before kings, and on 47:10 brings a midrash that Jacob blessed Pharaoh that the Nile would rise at his approach. Rashi on 47:9 reads “sojourn” as: all my days I have been a stranger in other people’s lands. Where Pharaoh received Jacob isn’t said; the Goshen pin shows where the family was staying (47:1), and the hollow pin marks Egypt, a region.',
      camera: { center: [31.75, 30.3], zoom: 7.4, pitch: 45, bearing: 0 },
      routeTo: 1,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'chapter',
      title: 'In the region of Rameses',
      body: 'As Pharaoh had commanded, Joseph settles his father and brothers, giving them holdings in the choicest part of the land of Egypt, in the region of Rameses. He sustains his father, his brothers and all his father’s household with bread, down to the little ones.',
      ref: 'Genesis 47:11–12 · Rashi · Wikipedia',
      note: 'Rashi on 47:11 says Rameses is part of the land of Goshen. The name is linked with Pi-Ramesses, the capital Ramesses II (reigned 1279–1213 BCE) built at Qantir in the eastern Delta; the Goshen pin already stands at Qantir, so the region of Rameses is shown at the same pin. Wikipedia (“Pi-Ramesses”) reports that some scholars see the Bible’s Rameses place names as memories of that era, and others as anachronisms from the 7th century BCE, when they date the text’s composition.',
      camera: onPin(GOSHEN, 9.0, 50, 20),
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'offerings',
      title: 'Bread, in exchange for…',
      ref: 'Genesis 47:13–22 · Rashi · Tosefta Sotah 10:3',
      note: '“There was no bread in all the world, for the famine was very severe” (47:13). The money went into Pharaoh’s palace (47:14). Joseph gained all the farmland of Egypt for Pharaoh, except the land of the priests, who lived off an allotment from Pharaoh (47:20, 47:22). Joseph had spoken of five more years of famine (45:6); Rashi on 47:19 says that once Jacob came to Egypt they began to sow and the famine ended, as taught in the Tosefta (Sotah 10:3). The verses name no place for this; the hollow pin marks Egypt, a region.',
      items: [
        { he: 'כֶּסֶף', en: 'Money', note: 'All the money found in Egypt and Canaan, as payment for the rations. When it gave out: “Give us bread… for the money is gone!”' },
        { he: 'מִקְנֵיכֶם', en: 'Livestock', note: 'Horses, sheep, cattle and donkeys: bread for that year' },
        { he: 'אַדְמָתֵנוּ', en: 'Their land, and themselves', note: 'The next year: “Take us and our land in exchange for bread… provide the seed, that we may live”' },
      ],
      act: 'The famine',
      camera: { center: [31.5, 29.9], zoom: 6.6, pitch: 35, bearing: 0 },
      routeTo: 1,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'chapter',
      title: 'A fifth for Pharaoh',
      body: 'Joseph gives the people seed: at harvest a fifth goes to Pharaoh, and four-fifths are theirs, for seed and for food. “You have saved our lives!” they say. Joseph makes it a land law in Egypt, “still valid,” that a fifth should be Pharaoh’s; only the land of the priests did not become Pharaoh’s.',
      ref: 'Genesis 47:20–26 · Rashi',
      note: 'Joseph also “removed the population town by town, from one end of Egypt’s border to the other” (47:21); JPS notes that the meaning of the Hebrew for “town by town” is uncertain. Rashi on 47:21 says he moved them from city to city as a reminder that the land was no longer theirs, and that the verse tells it to Joseph’s credit: he meant to spare his brothers the shame of being called exiles. The hollow pin marks Egypt, a region.',
      camera: onPin(EGYPT, 7.4, 45, -20),
      routeTo: 1,
      spot: EGYPT_SPOT,
    },
    {
      kind: 'chapter',
      title: 'Fertile and increasing',
      body: 'Israel settles in the country of Egypt, in the region of Goshen. They acquire holdings there, and are fertile and increase greatly. At Beer-sheba God had said, “I will make you there into a great nation.”',
      ref: 'Genesis 47:27 · Genesis 46:3',
      note: 'Goshen is a region whose extent is uncertain; the pin, at Qantir by Avaris, is the gazetteer’s point and one of the proposed areas, not the region’s extent (see the Judah goes ahead card).',
      camera: onPin(GOSHEN, 8.4, 50, -15),
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'talk',
      title: 'Judah asked to stay as a slave in Benjamin’s place, so that their father would not lose another son. When have you seen someone put another person first?',
      note: 'Numbered pins: Beersheba at Tel Be’er Sheva, its usual site; Goshen, a region whose extent is uncertain, at the gazetteer’s point by Qantir and Avaris, one of the proposed areas (the western Wadi Tumilat, about 30 km south, is another). The “region of Rameses” (47:11) is shown at the Goshen pin, which stands at Qantir, the proposed site of Pi-Ramesses. Egypt is a region; on earlier cards a hollow pin stands for it and doesn’t mark a site. Canaan is a region and isn’t pinned: where Jacob lived in it isn’t said here, and the verses last place him at Hebron (35:27, 37:14). Where Joseph’s house was and where Pharaoh received the family aren’t said. Stops close together on screen may share one numbered pin, drawn on the first of them; which ones merge depends on the screen size. The line joins the stops in order; Jacob’s road isn’t known.',
      // Not used on screen: the finale fits the whole route into the strip above the card (DaylightMap fitBounds).
      camera: { center: [33.3, 31.0], zoom: 6.2, pitch: 30, bearing: 0 },
      routeTo: 1,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'When Jacob heard that Joseph was alive, he didn’t believe it, until he heard all Joseph had said and saw the wagons. What helps you believe surprising news?',
    },
    {
      audience: 'Everyone',
      text: 'Judah asked to stay as a slave in Benjamin’s place, so that their father would not lose another son. When have you seen someone put another person first?',
    },
    {
      audience: 'Deeper',
      text: 'Joseph tells his brothers, “it was not you who sent me here, but God” (45:8), yet also, “he whom you sold into Egypt” (45:4). How can both be true, and why might Joseph say both?',
    },
  ],
}

export default vayigash
