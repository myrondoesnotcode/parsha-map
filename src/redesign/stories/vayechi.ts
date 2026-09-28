// Vayechi — Genesis 47:28 – 50:26
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// Two stops: Goshen (where Israel had settled, 47:27) and the cave of Machpelah (50:13). The verses say
// Jacob's last years, the oath, the blessings and his death happened "in the land of Egypt" (47:28–29) but
// not where in Egypt, so those cards keep the camera on Goshen with no pin lit. Goshen is lit only where the
// text names it (47:27, 50:8). The funeral's road isn't known. Goren ha-Atad and Abel-mizraim (50:10–11)
// are "beyond the Jordan", from a side the verse doesn't state, and have no pin: their card shows only the
// river (an illustrative point near its mouth) and no line; the line from Goshen to the cave is drawn only
// on the burial card, bent inland through an illustrative point in northern Sinai, and is not a route. Mamre, Luz, Sidon and Paddan are named but not marked.
// Verses quote THE JPS TANAKH: Gender-Sensitive Edition (Sefaria); Hebrew is Miqra according to the Masorah
// without cantillation marks. Claim table: docs/plans/2026-09-28-vayechi-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Goshen (places.json a60f092 "Goshen 1"), a region in the eastern Nile Delta whose extent is uncertain; the pin is an illustrative point in it. */
const GOSHEN: LngLat = [31.834217, 30.79937]
/** Machpelah (places.json ae00861), pinned at the Cave of the Patriarchs in the Old City of Hebron, its traditional site. */
const MACHPELAH: LngLat = [35.110758, 31.524672]
/** Ephrath (places.json af4e985) = Bethlehem (48:7), pinned at Bethlehem. Rachel died some distance short of it. */
const EPHRATH: LngLat = [35.207639, 31.704306]
/**
 * Not a place: an illustrative inland point in northern Sinai, about 30 km south of the coast, so the drawn
 * Goshen → Machpelah line stays on land. The procession's road isn't known.
 */
const SINAI_VIA: LngLat = [33.8, 30.85]
/** Jordan (places.json ae686c9), a point near where the river flows into the Dead Sea. Shown as a river, not as Goren ha-Atad. */
const JORDAN: LngLat = [35.558333, 31.761389]

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

/** Tanta (Wikipedia 30.783 N, 31.0 E), in the central Nile Delta between its branches, west of Goshen. */
const DELTA: LngLat = [31.0, 30.78]
/** Page cards (quote, list): the Nile Delta west of Goshen as a backdrop, with the Goshen pin kept off screen (east). */
const PAGE = { center: DELTA, zoom: 9.0, pitch: 35, bearing: 0 }
/**
 * Egypt cards whose place the verses don't give: the Delta as a backdrop, with the Goshen pin kept off screen,
 * so no pin suggests where the scene happened.
 */
const inEgypt = (zoom: number, pitch: number, bearing: number) => ({ center: DELTA, zoom, pitch, bearing })

const vayechi: ParshaStory = {
  parshaId: 'vayechi',
  tagline: 'Jacob blesses his family.',
  sources: [
    'Genesis 47:28 – 50:26',
    'Genesis 25:24–26, 27:1–35, 35:22, 47:9, 47:27',
    'Exodus 1:6–11',
    'Exodus 13:19',
    'Joshua 24:32',
    'Jeremiah 31:15',
    'Rashi on Genesis 47:28, 47:29, 48:7, 48:14, 48:20, 49:1, 50:3, 50:10, 50:13, 50:16',
    'Targum Onkelos on Genesis 48:14 (as cited by Rashi)',
    'Bereshit Rabbah 96:1',
    'Steinsaltz on Genesis 50:10',
    'Shadal on Genesis 50:10',
    'Ibn Ezra on Genesis 50:10',
    'Siddur Ashkenaz (Metsudah), Shabbat Evening, Blessing the Children',
    'Wikipedia, “Land of Goshen”, “Cave of the Patriarchs”, “Mamre”, “Jordan River”',
  ],
  route: [
    { name: 'Goshen', at: GOSHEN, place: 'a60f092', hedge: 'a region; extent uncertain' },
    { name: 'Machpelah', at: MACHPELAH, via: SINAI_VIA, place: 'ae00861', hedge: 'traditional site: Hebron' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Vayechi',
      body: 'Jacob blesses his family.',
      ref: 'Genesis 47:28 – 50:26',
      camera: { center: [33.55, 31.1], zoom: 5.9, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Seventeen years in Egypt',
      body: 'Israel has settled in Egypt, in the region of Goshen. Jacob lives seventeen years in the land of Egypt, and the span of his life comes to 147 years.',
      ref: 'Genesis 47:27–28 · 47:9 · Rashi · Bereshit Rabbah',
      note: 'The parsha is named for its first word, וַיְחִי, “(Jacob) lived.” When he came before Pharaoh, Jacob said he was 130 (47:9): 130 + 17 = 147. Rashi on 47:28 notes that this parsha is “closed”: in the Torah scroll no paragraph break comes before it. He gives two of the reasons found in Bereshit Rabbah 96:1: when Jacob died, the eyes and hearts of Israel were “closed” by the misery of the bondage, which in this reading began then (the Torah tells of the oppression only after Joseph and his generation had died, Exodus 1:6–11); or Jacob wished to reveal to his sons the End of Days, and it was closed off from him. A third reason there, which Rashi doesn’t bring: God shielded him from all the troubles of the world. Goshen was a region in the eastern Nile Delta; its extent is uncertain, and the pin is an illustrative point in it.',
      act: 'Jacob’s last days',
      camera: onPin(GOSHEN, 8.2, 45, -10),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: '“Swear to me”',
      body: 'When his time to die draws near, Israel summons Joseph: “place your hand under my thigh… please do not bury me in Egypt. When I rest with my ancestors, take me up from Egypt and bury me in their burial-place.” “I will do as you have spoken,” Joseph replies. “Swear to me,” says Jacob, and Joseph swears; then Israel bows at the head of the bed.',
      ref: 'Genesis 47:29–31 · Rashi',
      note: 'Placing the hand under the thigh goes with an oath: Rashi on 47:29 reads it as “and take an oath.” JPS renders ḥesed ve’emet as “steadfast loyalty”; Rashi reads it as the kindness shown to the dead, a “kindness of truth,” because no repayment is expected. Rashi gives reasons for “do not bury me in Egypt,” among them that the Egyptians should not make him an object of idol worship. The verses don’t say where in Egypt this was, so no pin is shown; the family had settled in Goshen (47:27).',
      camera: inEgypt(9.2, 50, 15),
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Mine, like Reuben and Simeon',
      body: 'Joseph hears that his father is ill and brings his two sons, Manasseh and Ephraim. Jacob recalls that El Shaddai appeared to him at Luz and promised this land to his offspring, and says: “Ephraim and Manasseh shall be mine no less than Reuben and Simeon.” He remembers Rachel, who died as he came back from Paddan, and whom he buried on the road to Ephrath, now Bethlehem.',
      ref: 'Genesis 48:1–7 · Rashi · Jeremiah 31:15',
      note: 'Israel “summoned his strength and sat up in bed” (48:2). Children born to Joseph after these two would be his own, and would be recorded under their brothers’ names in their inheritance (48:6). Rachel died “when still some distance short of Ephrath” (48:7). Rashi on 48:7 hears Jacob answering what Joseph might hold against him: he asks to be carried to Canaan, yet he did not bring Rachel even into Bethlehem. He buried her there at God’s command, Rashi says, so that she could plead for her children when they were led into exile along that road, as Jeremiah says: “Rachel weeping for her children” (Jeremiah 31:15). The map marks Ephrath at Bethlehem; she died short of it. Luz is Bethel; it isn’t marked in this story.',
      act: 'Ephraim and Manasseh',
      camera: onPin(EPHRATH, 7.8, 40, 0),
      routeTo: 0,
      spot: { name: 'Ephrath (now Bethlehem)', at: EPHRATH, place: 'af4e985' },
    },
    {
      kind: 'chapter',
      title: '“Who are these?”',
      body: '“Who are these?” Israel asks, seeing Joseph’s sons. “They are my sons, whom God has given me here,” says Joseph. Israel’s eyes are dim with age; Joseph brings them close, and he kisses and embraces them: “I never expected to see you again, and here God has let me see your children as well.” Then Joseph sets Ephraim at Israel’s left hand and Manasseh at his right.',
      ref: 'Genesis 48:8–13',
      note: 'Joseph removed them from his knees and bowed low with his face to the ground before bringing them close (48:12–13). Manasseh was the first-born (48:14, 48:18). The verses don’t say where in Egypt this was, so no pin is shown.',
      camera: inEgypt(9.2, 55, -20),
      routeTo: 0,
    },
    {
      kind: 'guess',
      title: 'Manasseh, the first-born, stands at Jacob’s right hand. On whose head does Jacob lay his right hand?',
      ref: 'Genesis 48:14 · Rashi · Targum Onkelos',
      options: [
        { label: 'Manasseh', he: 'מְנַשֶּׁה' },
        { label: 'Ephraim', he: 'אֶפְרַיִם', correct: true },
      ],
      reveal: 'Ephraim. “Israel stretched out his right hand and laid it on Ephraim’s head, though he was the younger, and his left hand on Manasseh’s head—thus crossing his hands—although Manasseh was the first-born” (48:14).',
      note: 'For the Hebrew שִׂכֵּל אֶת־יָדָיו (JPS: “thus crossing his hands”), Rashi on 48:14 follows the Targum’s rendering: he guided his hands wisely and knowingly, for he knew that Manasseh was the first-born.',
      camera: inEgypt(9.2, 55, -20),
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“I know, my son, I know”',
      body: 'Jacob blesses Joseph: may “the Angel who has redeemed me from all harm” bless the lads, and may his name and the names of Abraham and Isaac be recalled in them. Joseph thinks it wrong, and takes his father’s hand to move it to Manasseh’s head: “Not so, Father, for the other is the first-born.” His father refuses: “I know, my son, I know. He too shall become a people… Yet his younger brother shall be greater than he.”',
      ref: 'Genesis 48:15–19',
      note: '“Angel” is literally “Messenger” (JPS note). Jacob begins: “The God in whose ways my fathers Abraham and Isaac walked, The God who has been my shepherd from my birth to this day” (48:15). The verses don’t say where in Egypt this was, so no pin is shown.',
      camera: inEgypt(9.2, 52, 20),
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'By you shall Israel invoke blessings, saying: God make you like Ephraim and Manasseh.',
      hebrew: 'בְּךָ יְבָרֵךְ יִשְׂרָאֵל לֵאמֹר יְשִׂמְךָ אֱלֹהִים כְּאֶפְרַיִם וְכִמְנַשֶּׁה',
      body: 'So Jacob blesses them that day, putting Ephraim before Manasseh. Rashi on 48:20: whoever wishes to bless his sons will say these words. On Friday night many Jewish parents bless their sons with them.',
      ref: 'Genesis 48:20–22 · Rashi · Siddur Ashkenaz',
      note: 'The Metsudah Siddur (Ashkenaz, Shabbat evening) calls blessing the children on Friday night a widely accepted custom, and gives these words for a boy. Rashi on 48:20 reads “he put Ephraim before Manasseh” as giving Ephraim precedence later, in the order of the tribes’ banners and in the chieftains’ gifts at the altar’s dedication. Then Israel tells Joseph, “I am about to die; but God will be with you and bring you back to your ancestors’ land,” and gives him “one portion more than to your brothers” (48:21–22); JPS notes that the meaning of the Hebrew shekhem, “portion,” is uncertain.',
      camera: PAGE,
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“Come together”',
      body: 'Jacob calls his sons: “Come together that I may tell you what is to befall you in days to come.” Then he speaks to his sons in poetry, one by one (Simeon and Levi together). The Hebrew is often obscure, so the next two cards quote the JPS translation, whose notes mark several words as uncertain.',
      ref: 'Genesis 49:1–2 · Rashi',
      note: 'Rashi on 49:1 says Jacob wished to reveal to them the End, but the Divine Presence departed from him, and he began to speak of other things. The verses don’t say where in Egypt this was, so no pin is shown.',
      act: 'Jacob’s sons',
      camera: inEgypt(9.2, 50, -5),
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'From Reuben to Issachar',
      ref: 'Genesis 49:3–15 · 35:22',
      note: 'Each row quotes the JPS translation, shortened (… marks a cut). The words for Reuben, Simeon and Levi are rebukes. Reuben’s begin “you are my first-born… Exceeding in rank” (49:3); compare the rebuke with 35:22. Judah’s begin “You, O Judah, your brothers shall praise” (49:8). For “maim an ox” (49:6) the JPS note offers “overthrow a dignitary” (cf. chapter 34). For Judah, the JPS notes say the nuance of “lioness” (49:9) is uncertain, and that “So that tribute shall come to him” (49:10) construes shiloh as shai loh, “tribute to him,” following the Midrash; the meaning of the Hebrew is uncertain, literally “Until he comes to Shiloh.” Sidon, named in Zebulun’s blessing (49:13), isn’t marked in this story.',
      items: [
        { he: 'רְאוּבֵן', en: 'Reuben', note: '“Unstable as water, you shall excel no longer; For when you mounted your father’s bed, You brought disgrace…”' },
        { he: 'שִׁמְעוֹן', en: 'Simeon', note: 'With Levi: “…Their weapons are tools of lawlessness”' },
        { he: 'לֵוִי', en: 'Levi', note: 'With Simeon: “Cursed be their anger so fierce… I will divide them in Jacob…”' },
        { he: 'יְהוּדָה', en: 'Judah', note: '“Judah is a lion’s whelp… The scepter shall not depart from Judah…”' },
        { he: 'זְבוּלֻן', en: 'Zebulun', note: '“Zebulun shall dwell by the seashore… And his flank shall rest on Sidon”' },
        { he: 'יִשָּׂשכָר', en: 'Issachar', note: '“Issachar is a strong-boned donkey… He bent his shoulder to the burden…”' },
      ],
      camera: PAGE,
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'From Dan to Benjamin',
      numberFrom: 7,
      ref: 'Genesis 49:16–28',
      note: 'After Dan’s words comes one line: “I wait for Your deliverance, O ETERNAL One!” (49:18). For Joseph, the JPS note gives others’ rendering: “Joseph is a fruitful bough, A fruitful bough by a spring”; it also marks part of 49:26 as uncertain. For Benjamin, the meaning of ʻad, “foe,” is uncertain; others render “booty.” “All these were the tribes of Israel, twelve in number” (49:28). That verse’s Hebrew says he blessed them, each according to his blessing; JPS renders it “as he bade them farewell, addressing to each a parting word appropriate to him.”',
      items: [
        { he: 'דָּן', en: 'Dan', note: '“Dan shall govern his people… Dan shall be a serpent by the road…”' },
        { he: 'גָּד', en: 'Gad', note: '“Gad shall be raided by raiders, But he shall raid at their heels”' },
        { he: 'אָשֵׁר', en: 'Asher', note: '“Asher’s bread shall be rich, And he shall yield royal dainties”' },
        { he: 'נַפְתָּלִי', en: 'Naphtali', note: '“Naphtali is a hind let loose, Which yields lovely fawns”' },
        { he: 'יוֹסֵף', en: 'Joseph', note: '“Joseph is a wild ass, A wild ass by a spring… May they rest on the head of Joseph…”' },
        { he: 'בִּנְיָמִין', en: 'Benjamin', note: '“Benjamin is a ravenous wolf… in the evening he divides the spoil”' },
      ],
      camera: PAGE,
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“Bury me with my ancestors”',
      body: 'Then Jacob instructs them: bury me in the cave in the field of Machpelah, facing Mamre, in the land of Canaan, the field Abraham bought from Ephron the Hittite. “There Abraham and his wife Sarah were buried; there Isaac and his wife Rebekah were buried; and there I buried Leah.”',
      ref: 'Genesis 49:29–32',
      note: 'Jacob gives this instruction in Egypt, so no numbered pin is lit; the map looks ahead to the cave. The Machpelah pin marks the Cave of the Patriarchs in the Old City of Hebron, the cave’s traditional site. Mamre’s site is uncertain; it isn’t marked in this story.',
      camera: onPin(MACHPELAH, 7.8, 40, 0),
      routeTo: 0,
      spot: { name: 'Machpelah (traditional site: Hebron)', at: MACHPELAH, place: 'ae00861' },
    },
    {
      kind: 'chapter',
      title: 'Jacob dies',
      body: 'When he has finished, Jacob draws his feet into the bed and, breathing his last, is gathered to his kin, at 147. Joseph flings himself on his father’s face, weeps over him and kisses him. The physicians embalm Israel over forty days, “the full period of embalming,” and the Egyptians bewail him seventy days.',
      ref: 'Genesis 49:33 – 50:3 · 47:28 · Rashi',
      note: 'His age comes from 47:28. The verse doesn’t say whether the forty days of embalming fall within the seventy days of mourning; Rashi on 50:3 counts them together: forty for embalming and thirty for weeping. The verses don’t say where in Egypt this was, so no pin is shown.',
      act: 'The funeral',
      camera: inEgypt(9.2, 50, 5),
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Up to Canaan',
      body: 'When the wailing is over, Pharaoh gives Joseph leave: “Go up and bury your father, as he made you promise on oath.” With Joseph go Pharaoh’s officials and Egypt’s dignitaries, his own household, his brothers and his father’s household, with chariots and charioteers: “a very large troop.” Only their children, flocks and herds are left in the region of Goshen.',
      ref: 'Genesis 50:4–9',
      note: 'Joseph asked Pharaoh’s court to tell Pharaoh: “My father made me swear, saying, ‘I am about to die. Be sure to bury me in the grave that I made ready for myself in the land of Canaan.’ Now, therefore, let me go up and bury my father; then I shall return” (50:5). Goshen was a region in the eastern Nile Delta; its extent is uncertain, and the pin is an illustrative point in it.',
      camera: onPin(GOSHEN, 8.2, 45, -15),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Goren ha-Atad',
      body: 'They come to Goren ha-Atad, “the threshing floor of Atad,” beyond the Jordan, and hold a very great and solemn lamentation there; Joseph keeps seven days of mourning for his father. The Canaanites of the land say, “This is a solemn mourning on the part of the Egyptians,” so the place is named Abel-mizraim, interpreted as “the mourning of the Egyptians.”',
      ref: 'Genesis 50:10–11 · Steinsaltz · Shadal · Rashi',
      note: 'Where Goren ha-Atad and Abel-mizraim were isn’t known, and neither is marked in this story. “Beyond the Jordan” doesn’t say from which side. Steinsaltz on 50:10 reads it as east of the Jordan, and suggests the procession may have taken a longer road that way; Shadal on 50:10 says it was in the Land of Israel, called “beyond the Jordan” from the place where Moses and Israel were. Shadal adds that the seven days of mourning came before the burial; Ibn Ezra on 50:10 says, as the early sages taught, that they came after it. The verse says only “he” kept the mourning; the one who went up with the procession to bury his father is Joseph (50:7–9). The map shows only the river, at an illustrative point near where it flows into the Dead Sea; no road is drawn, since the procession’s road isn’t known. Rashi on 50:10 says the threshing floor was ringed with thorn bushes (atad), and brings the Rabbis’ teaching that kings of Canaan and princes of Ishmael came to make war, but on seeing Joseph’s crown hanging on Jacob’s coffin, hung their own crowns on it too.',
      camera: onPin(JORDAN, 9.0, 45, 0),
      routeTo: 0,
      spot: { name: 'Jordan (river; point illustrative)', at: JORDAN, place: 'ae686c9' },
    },
    {
      kind: 'chapter',
      title: 'The cave of Machpelah',
      body: 'His sons do for him as he instructed them. They carry him to the land of Canaan and bury him in the cave of the field of Machpelah, near Mamre, which Abraham had bought as a burial site from Ephron the Hittite. Then Joseph returns to Egypt, with his brothers and all who had gone up with him.',
      ref: 'Genesis 50:12–14 · Rashi',
      note: 'Rashi on 50:13 says Jacob’s own sons carried him, as he had commanded: not an Egyptian, and not one of their sons, who were born of Canaanite women. Levi, who would carry the Ark, and Joseph, a king, did not carry him; Joseph’s sons Manasseh and Ephraim took their places. The pin marks the Cave of the Patriarchs in the Old City of Hebron, the cave’s traditional site. The line only joins Goshen to the cave, bending inland through northern Sinai at an illustrative point: the procession’s road isn’t known, nor whether it crossed the Jordan.',
      camera: onPin(MACHPELAH, 9.4, 55, 10),
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'The brothers are afraid',
      body: 'Now that their father is dead, Joseph’s brothers say, “What if Joseph still bears a grudge against us and pays us back for all the wrong that we did him!” They send him word that before his death their father told them to ask him to forgive his brothers. Joseph is in tears as they speak, and the brothers fling themselves before him: “We are prepared to be your slaves.”',
      ref: 'Genesis 50:15–18 · Rashi',
      note: 'Rashi on 50:16 says they changed the facts for the sake of peace: Jacob had given no such instruction. They were back in Egypt (50:14); the verses don’t say where, so no pin is shown.',
      act: 'Joseph and his brothers',
      camera: inEgypt(9.2, 50, -10),
      routeTo: 1,
    },
    {
      kind: 'quote',
      title: 'Although you intended me harm, God intended it for good, so as to bring about the present result—the survival of many people.',
      hebrew: 'וְאַתֶּם חֲשַׁבְתֶּם עָלַי רָעָה אֱלֹהִים חֲשָׁבָהּ לְטֹבָה לְמַעַן עֲשֹׂה כַּיּוֹם הַזֶּה לְהַחֲיֹת עַם־רָב',
      body: '“Have no fear! Am I a substitute for God?” Joseph answers them. “I will sustain you and your dependents.” So he reassures them, speaking kindly to them.',
      ref: 'Genesis 50:19–21',
      camera: PAGE,
      routeTo: 1,
    },
    {
      kind: 'chapter',
      title: '“Carry up my bones”',
      body: 'Joseph and his father’s household remain in Egypt. “God will surely take notice of you and bring you up from this land,” he tells his brothers, and he makes the sons of Israel swear: “you shall carry up my bones from here.” Joseph dies at 110; he is embalmed and placed in a coffin in Egypt.',
      ref: 'Genesis 50:22–26 · Exodus 13:19 · Joshua 24:32',
      note: 'Joseph lived to see “children of the third generation of Ephraim,” and the children of Manasseh’s son Machir were born upon his knees (50:23). God will bring them to “the land promised on oath to Abraham, to Isaac, and to Jacob” (50:24). Moses takes Joseph’s bones with him out of Egypt (Exodus 13:19), and they are buried at Shechem, in the plot Jacob had bought (Joshua 24:32). The verses don’t say where in Egypt Joseph died, so no pin is shown.',
      camera: inEgypt(9.2, 50, 10),
      routeTo: 1,
    },
    {
      kind: 'talk',
      title: 'After their father died, Joseph’s brothers feared he still bore a grudge. Joseph wept, and spoke kindly to them. Why might they still have been afraid? What helps people trust each other again after a wrong?',
      note: 'Numbered pins: Goshen, a region in the eastern Nile Delta whose extent is uncertain (the pin is an illustrative point in it); and Machpelah, at the Cave of the Patriarchs in Hebron, its traditional site. The line joins the two stops through an illustrative point in northern Sinai; the funeral’s road isn’t known. Goren ha-Atad and Abel-mizraim, “beyond the Jordan” (50:10–11), can’t be located and aren’t marked, nor is Mamre. On the card about Ephrath, its pin marks Bethlehem; Rachel died some distance short of it (48:7).',
      // Not used on screen: the finale fits the whole route into the strip above the card (DaylightMap fitBounds).
      camera: { center: [33.55, 31.1], zoom: 6.2, pitch: 20, bearing: 0 },
      routeTo: 1,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Jacob blessed his grandsons, Ephraim and Manasseh. If you could give a blessing to someone in your family, what would you wish for them?',
    },
    {
      audience: 'Everyone',
      text: 'After their father died, Joseph’s brothers feared he still bore a grudge. Joseph wept, and spoke kindly to them. Why might they still have been afraid? What helps people trust each other again after a wrong?',
    },
    {
      audience: 'Deeper',
      text: 'Jacob, the younger twin, once took the blessing Isaac meant for Esau, the first-born (Genesis 25:24–26, 27:1–35). Now he puts the younger Ephraim before the first-born Manasseh, and tells Joseph, “I know, my son, I know” (48:19). What might Jacob know?',
    },
  ],
}

export default vayechi
