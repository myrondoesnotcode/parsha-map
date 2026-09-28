// Vayeshev — Genesis 37:1 – 40:23
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A journey: the valley of Hebron → Shechem → Dothan → Egypt. The verses name Jacob's home only when he sends
// Joseph "from the valley of Hebron" (37:14), so the cards before that light no pin, nor does the card where the
// tunic is brought to Jacob (the verses don't say where he was). The Valley of Hebron's gazetteer pin is the same
// point as Hebron's (Tel Rumeida). Judah's story (ch. 38) is framed on the Shephelah around Adullam, shown as a hedged
// spot; Chezib, Timnah and Enaim are not marked, since the Timnah of Genesis 38 and Enaim can't be located with any
// confidence. Egypt is a region; its pin is an illustrative point near today's Cairo, and the verses don't say where
// in Egypt Potiphar's house or the prison was. Gilead (the caravan's starting point, 37:25) is a region; its
// gazetteer point is shown only as an illustrative spot. The line to Egypt bends through an inland point in the
// western Negev ([34.6, 31.1]) only so that it doesn't cross the Mediterranean; the caravan's road isn't known. The cards before
// 37:14 and the dream card use a regional camera on the land of Canaan (37:1), not a town. Verses quote THE JPS TANAKH: Gender-Sensitive Edition
// (Sefaria), which writes God's four-letter name as GOD; Hebrew is Miqra according to the Masorah without
// cantillation marks. Claim table: docs/plans/2026-09-28-vayeshev-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Valley of Hebron (places.json a375f5a), pinned at the same point as Hebron (Tel Rumeida, the usual site of ancient Hebron). */
const HEBRON: LngLat = [35.10222, 31.525087]
/** Shechem (places.json adf74d4), pinned at Tell Balata by Nablus, its usual identification. */
const SHECHEM: LngLat = [35.281944, 32.213611]
/** Dothan (places.json ab635e4), pinned at Tel Dothan, near Jenin: the identification most scholars accept, though places.json rates it low-confidence. */
const DOTHAN: LngLat = [35.239861, 32.413528]
/** Egypt (places.json af301ca), a region: the gazetteer's point, near today's Cairo, is illustrative only. */
const EGYPT: LngLat = [31.3075, 30.129444]
/** Gilead (places.json ae73b90 "Gilead 1"), a region east of the Jordan; the gazetteer's point is illustrative only. */
const GILEAD: LngLat = [35.69211, 32.187016]
/** Adullam (places.json af82614), pinned at Khirbet esh-Sheikh Madhkur, thought to be "upper Adullam", above Kh. ʿId el-Minya, the ruin identified as Adullam itself; the identification is inconclusive. */
const ADULLAM: LngLat = [35.001667, 31.651667]
/** An inland point in the western Negev, so the drawn line to Egypt doesn't cross the Mediterranean. Not a claim about the caravan's road. */
const NEGEV: LngLat = [34.6, 31.1]

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

const vayeshev: ParshaStory = {
  parshaId: 'vayeshev',
  tagline: 'Joseph and his dreams.',
  sources: [
    'Genesis 37:1 – 40:23',
    'Genesis 15:13, 35:19, 35:27, 41:1, 45:4–5, 46:12',
    'Deuteronomy 25:5–6',
    'Judges 8:24',
    'Daniel 9:21',
    '2 Samuel 13:18',
    'Ruth 4:18–22',
    'Rashi on Genesis 37:2, 37:3, 37:10, 37:14, 37:15, 37:24, 37:25, 37:28, 38:1, 38:14, 38:25, 39:1, 40:1, 40:23',
    'Rashbam on Genesis 37:28, 37:36',
    'Ibn Ezra on Genesis 37:25, 37:28, 38:1',
    'Bekhor Shor on Genesis 37:25 (as cited by the JPS note)',
    'Bereshit Rabbah 85:11',
    'Shabbat 10b',
    'Sotah 10b',
    'Wikipedia, “Tel Dothan”, “Adullam”, “Timnah”, “Tell Balata”, “Tel Rumeida”',
  ],
  route: [
    { name: 'Valley of Hebron', at: HEBRON, place: 'a375f5a', hedge: 'pin marks Hebron (Tel Rumeida)' },
    { name: 'Shechem', at: SHECHEM, place: 'adf74d4', hedge: 'usual site: Tell Balata' },
    { name: 'Dothan', at: DOTHAN, place: 'ab635e4', hedge: 'likely site: Tel Dothan' },
    { name: 'Egypt', at: EGYPT, place: 'af301ca', via: NEGEV, hedge: 'a region; point illustrative' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Vayeshev',
      body: 'Joseph and his dreams.',
      ref: 'Genesis 37:1 – 40:23',
      camera: { center: [33.3, 31.2], zoom: 5.3, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Joseph at seventeen',
      body: 'Jacob is settled in the land of Canaan, where his father had sojourned. Joseph, seventeen years old, tends the flocks with his brothers, as a helper to the sons of Bilhah and Zilpah, and he brings bad reports of them to their father.',
      ref: 'Genesis 37:1–2 · Genesis 35:27 · Rashi',
      note: 'The verses say Jacob lived in the land of Canaan (37:1), but don’t name the town until he sends Joseph “from the valley of Hebron” (37:14); last week Jacob came to his father Isaac “at Mamre, at Kiriath-arba—now Hebron” (35:27). So the map shows the land, and no stop is highlighted. Rashi on 37:2 says Joseph told his father whatever wrong he saw in his brothers, the sons of Leah.',
      act: 'The dreamer',
      camera: { center: [35.2, 31.85], zoom: 7.6, pitch: 40, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'Now Israel loved Joseph best of all his sons—he was the child of his old age; and he had made him an ornamented tunic.',
      hebrew: 'וְיִשְׂרָאֵל אָהַב אֶת־יוֹסֵף מִכׇּל־בָּנָיו כִּי־בֶן־זְקֻנִים הוּא לוֹ וְעָשָׂה לוֹ כְּתֹנֶת פַּסִּים',
      body: 'When his brothers see that their father loves him more than any of them, they hate him so that they cannot speak a friendly word to him.',
      ref: 'Genesis 37:3–4 · Rashi · 2 Samuel 13:18 · Shabbat 10b',
      note: 'The Hebrew is kethoneth passim. The JPS note gives “a coat of many colors” as another rendering and says the meaning of the Hebrew is uncertain. Rashi on 37:3 reads passim as fine wool, and points to the same garment in the story of Tamar and Amnon (2 Samuel 13:18). In Shabbat 10b, Rava bar Meḥasseya, in the name of Rav Ḥama bar Gurya in the name of Rav, teaches that a person should never single out one child above the others: because of two sela’s weight of fine wool that Jacob gave Joseph beyond his brothers, they grew jealous, and in the end our ancestors went down to Egypt.',
      // Page card: the land of Canaan (37:1) as a backdrop; no town is named yet.
      camera: { center: [35.2, 31.7], zoom: 7.8, pitch: 35, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'The sheaves',
      body: 'Joseph tells his brothers a dream: they were binding sheaves in the field, his sheaf stood up and stayed upright, and their sheaves gathered around and bowed low to it. “Do you mean to reign over us?” they answer, and they hate him even more.',
      ref: 'Genesis 37:5–8',
      note: 'The verses don’t say where in Canaan the family was living when Joseph told his dreams, so the map shows the land and no stop is highlighted.',
      camera: { center: [35.2, 31.85], zoom: 7.8, pitch: 45, bearing: 15 },
      routeTo: 0,
    },
    {
      kind: 'stars',
      title: 'And this time, the sun, the moon, and eleven stars were bowing down to me.',
      body: 'Joseph dreams again. His father scolds him: “Are we to come, I and your mother and your brothers, and bow low to you to the ground?” His brothers are wrought up at him, and his father keeps the matter in mind.',
      ref: 'Genesis 37:9–11 · Rashi · Genesis 35:19',
      note: 'The sky is an illustration of the dream as Joseph tells it: the sun, the moon and eleven stars; the verses don’t say when it was dreamed or where the family was living. Joseph’s mother Rachel had already died (35:19); Rashi on 37:10 has Jacob ask, “Is not your mother long since dead?”, not knowing that the dream meant Bilhah, who raised Joseph like a mother. Rashi adds that Jacob meant to make his sons forget the dream, so that they would not envy Joseph.',
      camera: { center: [35.2, 31.85], zoom: 7.8, pitch: 72, bearing: 0 },
      routeTo: 0,
      sky: 'dream',
    },
    {
      kind: 'chapter',
      title: '“I am ready”',
      body: 'Joseph’s brothers have gone to pasture their father’s flock at Shechem. “Come, I will send you to them,” Israel tells Joseph. “I am ready,” he answers. Go and see how your brothers and the flocks are faring, says his father, and bring me back word; and he sends him from the valley of Hebron.',
      ref: 'Genesis 37:12–14 · Rashi · Genesis 15:13',
      note: 'Rashi on 37:14 asks why the verse says “valley,” when Hebron stands on a hill; he reads ‘emeq (“valley,” from the root for “deep”) as the deep counsel of “that righteous one buried in Hebron,” so that what God had told Abraham would come true: “your offspring shall be strangers in a land not theirs” (15:13). The gazetteer pins the valley of Hebron at the same point as Hebron itself, Tel Rumeida.',
      act: 'To Shechem and Dothan',
      camera: onPin(HEBRON, 9.4, 55, -15),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'A man in the fields',
      body: 'At Shechem a man finds Joseph wandering in the fields. “What are you looking for?” “I am looking for my brothers.” “They have gone from here,” says the man; “I heard them say: Let us go to Dothan.”',
      ref: 'Genesis 37:14–17 · Rashi',
      note: 'The verses call him only “a man”; Rashi on 37:15 says he was the angel Gabriel, pointing to Daniel 9:21, where the Hebrew calls Gabriel “the man.” The pin marks Tell Balata, by Nablus, usually identified with Shechem.',
      camera: onPin(SHECHEM, 9.6, 55, -20),
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: '“Here comes that dreamer!”',
      body: 'Joseph finds his brothers at Dothan. They see him from afar and plot to kill him and throw him into a pit. Reuben says, “Shed no blood! Cast him into that pit,” meaning to save him and bring him back to his father. They strip Joseph of his ornamented tunic and cast him into the pit; it is empty, with no water in it.',
      ref: 'Genesis 37:17–24 · Rashi',
      note: 'Their plan was to say “A savage beast devoured him” (37:20). Rashi on 37:24 asks why the verse adds “no water in it” after “empty”: there was no water, he says, but there were snakes and scorpions. The pin marks Tel Dothan, near Jenin, which most scholars today identify with Dothan, though it isn’t certain.',
      camera: onPin(DOTHAN, 9.8, 58, 10),
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'offerings',
      title: 'A caravan from Gilead',
      ref: 'Genesis 37:25 · Rashi · Ibn Ezra',
      note: 'They sit down to a meal and, looking up, see a caravan of Ishmaelites coming from Gilead, their camels carrying these goods to Egypt. The JPS note, citing Bekhor Shor, says “they” means the brothers other than those tending the flock, who included Reuben; Bekhor Shor on 37:25 says shepherds eat in turns, so Reuben, away with the flock, didn’t know of the sale. Ibn Ezra on 37:25 says only “the nine brothers,” so two besides Joseph were not there; he doesn’t say which (Reuben, by 37:29, was one). Rashi on 37:25 asks why the verse tells what the camels carried: Arab traders usually carried foul-smelling naphtha and tar, but for Joseph they carried fragrant spices. Gilead is a region east of the Jordan; its pin is only an illustrative point in it.',
      items: [
        { he: 'נְכֹאת', en: 'Gum', note: 'Rashi: a gathering of many spices' },
        { he: 'צְרִי', en: 'Balm', note: 'Rashi: a resin that drips from the balsam tree' },
        { he: 'לֹט', en: 'Ladanum', note: 'Rashi: the Rabbis explained it as a root' },
      ],
      camera: { center: [35.6, 32.32], zoom: 8.2, pitch: 30, bearing: -35 },
      routeTo: 2,
      spot: { name: 'Gilead (a region; point illustrative)', at: GILEAD, place: 'ae73b90' },
    },
    {
      kind: 'chapter',
      title: '“What do we gain?”',
      body: 'Judah says to his brothers: “What do we gain by killing our brother and covering up his blood? Come, let us sell him to the Ishmaelites, but let us not do away with him ourselves. After all, he is our brother, our own flesh.” His brothers agree.',
      ref: 'Genesis 37:26–27',
      note: 'Reuben had proposed casting Joseph into the pit, meaning to bring him back to his father (37:22); Judah proposes selling him.',
      camera: onPin(DOTHAN, 10.2, 60, -15),
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'guess',
      title: 'Joseph is pulled up out of the pit and sold. For how many pieces of silver?',
      ref: 'Genesis 37:28',
      options: [{ label: '5 pieces' }, { label: '20 pieces', correct: true }, { label: '100 pieces' }],
      reveal: '“They sold Joseph for twenty pieces of silver to the Ishmaelites, who brought Joseph to Egypt” (37:28).',
      camera: onPin(DOTHAN, 10.2, 60, -15),
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Midianites and Ishmaelites',
      body: 'Midianite traders pass by, Joseph is pulled up out of the pit, and he is sold to the Ishmaelites, who bring him to Egypt. When Reuben comes back to the pit, Joseph is gone. He tears his clothes, goes back to his brothers and says, “The boy is gone! Now, what am I to do?”',
      ref: 'Genesis 37:28–30, 37:36, 39:1 · Genesis 45:4 · Rashi · Rashbam · Ibn Ezra · Judges 8:24',
      note: 'The Hebrew says only that “they” pulled Joseph up and sold him; JPS translates “the brothers”; its note points to 45:4–5 and to Bekhor Shor. In 45:4 Joseph says, “I am your brother Joseph, he whom you sold into Egypt.” Later, “the Midianites” (in the Hebrew, Medanites) sell him to Potiphar (37:36), yet Potiphar buys him “from the Ishmaelites” (39:1). Commentators read this differently. Rashi on 37:28: the Midianites were another caravan; the brothers pulled Joseph up and sold him to the Ishmaelites, the Ishmaelites to the Midianites, and the Midianites to the Egyptians. Rashbam on 37:28: while the brothers sat eating, Midianites passing by found Joseph, pulled him up and sold him to the Ishmaelites, and the brothers may not have known. Ibn Ezra on 37:28 says Midianites are also called Ishmaelites, as in Judges 8:24; Rashbam on 37:36 says that by the plain sense the Medanites and the Ishmaelites are the same people.',
      camera: onPin(DOTHAN, 9.8, 56, 20),
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: '“Please examine it”',
      body: 'The brothers dip Joseph’s tunic in the blood of a kid and have it taken to their father: “We found this. Please examine it; is it your son’s tunic or not?” Jacob recognizes it: “A savage beast devoured him!” He tears his clothes, mourns many days, and refuses to be comforted.',
      ref: 'Genesis 37:31–35',
      note: 'He says, “No, I will go down mourning to my son in Sheol” (37:35). The verses don’t say where Jacob was when the tunic reached him; he had sent Joseph from the valley of Hebron (37:14). So no stop is highlighted here; the numbered pins only show Joseph’s route so far.',
      camera: { center: [35.19, 31.87], zoom: 8.6, pitch: 45, bearing: -10 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Judah’s sons',
      body: 'Judah leaves his brothers and camps near an Adullamite named Hirah. He marries the daughter of a Canaanite named Shua, and they have three sons: Er, Onan and Shelah. Er marries Tamar, but he displeases GOD and dies; Onan, told to provide offspring for his brother, makes sure he will not, and dies too. Judah sends Tamar back to her father’s house, to wait for Shelah.',
      ref: 'Genesis 38:1–11 · Rashi · Ibn Ezra · Genesis 46:12 · Deuteronomy 25:5–6',
      note: 'Where the verse says Judah “left” his brothers, the Hebrew says he “went down” from them. Rashi on 38:1 asks why this story interrupts Joseph’s: his brothers brought Judah down from his high standing when they saw their father’s grief, saying: you told us to sell him; had you told us to bring him back, we would have listened. Ibn Ezra on 38:1 reads “about that time” differently: this story began before Joseph was sold, since only twenty-two years passed between the sale and the family’s going down to Egypt, yet Perez came down with sons of his own (46:12); he says the chapter is set here to contrast Judah with Joseph and his master’s wife. Judah told Onan to do “your duty by her as a brother-in-law”; the JPS note points to Deuteronomy 25:5, the law that a man’s brother marries his widow when he dies without offspring. Judah held back Shelah, thinking, “He too might die like his brothers” (38:11). When Shelah was born, “he was at Chezib” (38:5); Chezib isn’t marked in this story. Adullam’s site is proposed, not certain; the verse says only that Hirah was an Adullamite.',
      act: 'Judah and Tamar',
      camera: { center: [35.04, 31.74], zoom: 9.8, pitch: 35, bearing: 0 },
      routeTo: 2,
      spot: { name: 'Adullam (proposed site)', at: ADULLAM, place: 'af82614' },
    },
    {
      kind: 'chapter',
      title: 'On the road to Timnah',
      body: 'A long time afterward, Judah goes up to Timnah for his sheepshearing. Tamar, seeing that Shelah is grown and she has not been given to him as wife, takes off her widow’s garb, veils her face, and sits by the road at the entrance to Enaim. Judah does not recognize her and takes her for a prostitute; she becomes pregnant by him, and keeps his seal, cord and staff as a pledge.',
      ref: 'Genesis 38:12–23 · Rashi',
      note: 'By then Judah’s wife, Shua’s daughter, had died (38:12). The pledge was until he sent her a kid from his flock (38:17–18); when his friend Hirah the Adullamite came with the kid, no one there knew of her, and Judah said, “Let her keep them, lest we become a laughingstock” (38:20–23). Rashi on 38:14 says she veiled her face so that he would not recognize her. Where Enaim and this Timnah were isn’t known: scholars differ on which of the Bible’s Timnahs this is, so neither is marked in this story. Adullam, Hirah’s town, isn’t marked on this card either: the verses don’t place the meeting there.',
      camera: { center: [35.03, 31.64], zoom: 9.6, pitch: 38, bearing: 10 },
      routeTo: 2,
    },
    {
      kind: 'quote',
      title: 'She is more in the right than I, inasmuch as I did not give her to my son Shelah.',
      hebrew: 'צָדְקָה מִמֶּנִּי כִּי־עַל־כֵּן לֹא־נְתַתִּיהָ לְשֵׁלָה בְנִי',
      body: 'About three months later Judah is told Tamar is pregnant, and he orders her brought out to be burned. She sends him his seal, cord and staff: “Examine these: whose seal and cord and staff are these?” Judah recognizes them, and says this.',
      ref: 'Genesis 38:24–26 · Rashi · Sotah 10b · Bereshit Rabbah 85:11',
      note: 'The JPS note says “Bring her out” means for a hearing in court. Tamar’s message said only, “It’s by the man to whom these belong that I’m pregnant” (38:25). Rashi on 38:25 says she did not want to shame Judah openly: if he would admit it, let him admit it himself; if not, let them burn her. From here, he writes, it was taught that it is better to be thrown into a fiery furnace than to shame another person in public; Sotah 10b learns this from Tamar. “Examine” (הַכֶּר־נָא) are the words the brothers said to Jacob over the tunic (37:32); in Bereshit Rabbah 85:11 Rabbi Yoḥanan says God told Judah: you said to your father “Identify, please”; Tamar will say to you “Identify, please.”',
      // Page card: a Shephelah backdrop about 22 km north-north-west of the Adullam spot (not marked on this card).
      camera: { center: [34.95, 31.85], zoom: 9.8, pitch: 35, bearing: 0 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Perez and Zerah',
      body: 'Tamar gives birth to twins. One puts out a hand, and the midwife ties a crimson thread on it: “This one came out first.” But the hand draws back and his brother comes out, and he is named Perez; then the one with the thread, Zerah.',
      ref: 'Genesis 38:27–30 · Ruth 4:18–22',
      note: 'The JPS notes connect Perez with pereṣ, “breach” (the midwife says, “What a breach you have made for yourself!”), and explain Zerah as “brightness,” perhaps alluding to the crimson thread. The book of Ruth traces the line of Perez to King David: Perez, Hezron, Ram, Amminadab, Nahshon, Salmon, Boaz, Obed, Jesse, David (Ruth 4:18–22).',
      camera: { center: [34.99, 31.64], zoom: 9.7, pitch: 36, bearing: -8 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'In Potiphar’s house',
      body: 'In Egypt, Potiphar, a courtier of Pharaoh, buys Joseph. GOD is with Joseph and he succeeds; his master sees it, makes him his personal attendant and puts all that he owns in his hands. GOD blesses the house for Joseph’s sake.',
      ref: 'Genesis 37:36, 39:1–6 · Rashi',
      note: 'Potiphar is “a courtier of Pharaoh and his prefect”; the JPS note says the precise force of the Hebrew sar haṭṭabaḥim is uncertain. Chapter 37 ends with “the Midianites” selling Joseph to Potiphar (37:36); chapter 39 says Potiphar bought him “from the Ishmaelites who had brought him there” (39:1). Rashi on 39:1 says the story now returns to Joseph, and that Judah’s story was set between to connect Judah’s being brought down from his high standing with the sale of Joseph. Egypt is a region; its pin is only an illustrative point near today’s Cairo. The verses don’t say where in Egypt Potiphar lived. The line to Egypt bends inland only so that it doesn’t cross the Mediterranean; the caravan’s road isn’t known.',
      act: 'In Egypt',
      camera: onPin(EGYPT, 7.2, 45, 0),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'quote',
      title: 'How then could I do this most wicked thing, and sin before God?',
      hebrew: 'וְאֵיךְ אֶעֱשֶׂה הָרָעָה הַגְּדֹלָה הַזֹּאת וְחָטָאתִי לֵאלֹהִים',
      body: 'Joseph is well built and handsome, and his master’s wife asks him to be with her. He refuses: his master has placed everything in his hands and withheld nothing from him except her, “since you are his wife.” Day after day she presses him, and he does not give in.',
      ref: 'Genesis 39:6–10',
      // Page card: the Nile Delta as a backdrop; the Egypt pin sits under the card.
      camera: { center: [31.3, 31.25], zoom: 8.2, pitch: 35, bearing: 0 },
      routeTo: 3,
    },
    {
      kind: 'chapter',
      title: 'The garment',
      body: 'One day, with none of the household inside, she catches hold of Joseph’s garment; he leaves it in her hand and flees outside. She keeps the garment. She tells the servants that the Hebrew came to lie with her, and tells his master that “the Hebrew slave” came “to dally with” her; both times she says he fled when she screamed. His master is furious and has Joseph put in the prison where the king’s prisoners are held.',
      ref: 'Genesis 39:11–20',
      note: 'The verses have told us that Joseph refused her (39:8–10) and fled (39:12). They say his master “was furious” (39:19), but not at whom.',
      camera: onPin(EGYPT, 7.6, 50, -15),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'GOD was with Joseph',
      body: 'Even in prison, GOD is with Joseph, extending kindness to him and disposing the chief jailer favorably toward him. The jailer puts all the prisoners in Joseph’s charge, and whatever Joseph does, GOD makes it succeed.',
      ref: 'Genesis 39:20–23',
      note: 'The verses don’t say where in Egypt the prison was; the pin is only an illustrative point in the region.',
      camera: onPin(EGYPT, 7.4, 50, 15),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'Two dreams in one night',
      body: 'Pharaoh’s chief cupbearer and chief baker offend him and are put in the same prison, and Joseph attends them. One night each dreams his own dream. In the morning Joseph sees they are downcast: “We had dreams, and there is no one to interpret them.” “Surely God can interpret!” says Joseph. “Tell me.”',
      ref: 'Genesis 40:1–8 · Rashi',
      note: 'The verses don’t say how they offended the king. Rashi on 40:1 says a fly was found in the cupbearer’s cup, and a pebble in the baker’s bread.',
      camera: onPin(EGYPT, 7.6, 55, -5),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'The cupbearer’s dream',
      body: 'The cupbearer saw a vine with three branches; it budded, blossomed and ripened into grapes, and he pressed them into Pharaoh’s cup. The three branches are three days, says Joseph: in three days Pharaoh will restore you to your post. “But think of me,” he asks, and mention me to Pharaoh: “I was kidnapped from the land of the Hebrews.”',
      ref: 'Genesis 40:9–15',
      note: 'Joseph adds, “nor have I done anything here that they should have put me in the dungeon” (40:15). For “pardon you” (40:13) the Hebrew says “lift up your head,” as the JPS note says; the same phrase comes back in 40:19 and 40:20.',
      camera: onPin(EGYPT, 7.8, 55, 10),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'The baker’s dream',
      body: 'The baker saw three baskets on his head, the top one holding all kinds of baked food for Pharaoh, and birds eating from it. The three baskets are three days, says Joseph: in three days Pharaoh will put him to death.',
      ref: 'Genesis 40:16–19',
      note: 'Joseph’s words are, “Pharaoh will lift off your head and impale you upon a pole; and the birds will pick off your flesh” (40:19); the JPS note says the Hebrew is literally “lift up your head,” the same words he used for the cupbearer (40:13). JPS calls the baskets “openwork”; its note says the meaning of the Hebrew ḥori is uncertain, and others render “baskets with white bread” or “white baskets.”',
      camera: onPin(EGYPT, 7.6, 55, -20),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'quote',
      title: 'Yet the chief cupbearer did not think of Joseph; he forgot him.',
      hebrew: 'וְלֹא־זָכַר שַׂר־הַמַּשְׁקִים אֶת־יוֹסֵף וַיִּשְׁכָּחֵהוּ',
      body: 'On the third day, Pharaoh’s birthday, he makes a banquet. He restores the cupbearer to his post and puts the baker to death, just as Joseph had said. And the parsha ends with this verse.',
      ref: 'Genesis 40:20–23 · Rashi · Genesis 41:1',
      note: 'JPS says Pharaoh “impaled” the baker (40:22). Rashi on 40:23 reads “did not think of” as on that day, and “forgot him” as afterward; because Joseph had put his trust in the cupbearer, Rashi says, he had to stay in prison two more years. Next week begins “After two years’ time” (41:1).',
      // Page card: the Nile Delta as a backdrop; the Egypt pin sits under the card.
      camera: { center: [31.3, 31.25], zoom: 8.2, pitch: 35, bearing: 0 },
      routeTo: 3,
    },
    {
      kind: 'talk',
      title: 'Judah said of Tamar, “She is more in the right than I.” Why is it hard to say “I was wrong,” and what makes it easier?',
      note: 'Numbered pins: the valley of Hebron (the gazetteer pins it at Hebron itself, Tel Rumeida), Shechem = Tell Balata, Dothan = Tel Dothan (usual or likely identifications, not certain). Egypt and Gilead are regions; their points are illustrative. Adullam’s site isn’t certain: its pin is at Khirbet esh-Sheikh Madhkur, thought to be “upper Adullam”, above Khirbet ʿId el-Minya, the ruin identified as Adullam itself. Chezib, Timnah and Enaim can’t be located with confidence and aren’t marked in this story. Stops close together on screen may share one numbered pin, drawn on the first of them; which ones merge depends on the screen size. Lines join the stops in order; the roads Joseph and the caravan took aren’t known, and the line to Egypt bends through the Negev only so that it doesn’t cross the Mediterranean.',
      // Not used on screen: the finale fits the whole route into the strip above the card (DaylightMap fitBounds).
      camera: { center: [33.3, 31.2], zoom: 5.3, pitch: 20, bearing: 0 },
      routeTo: 3,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Jacob loved Joseph best and made him an ornamented tunic, and his brothers came to hate him (37:3–4). What can a family do so that everyone feels loved?',
    },
    {
      audience: 'Everyone',
      text: 'Judah said of Tamar, “She is more in the right than I.” Why is it hard to say “I was wrong,” and what makes it easier?',
    },
    {
      audience: 'Deeper',
      text: 'The brothers bring Jacob the bloodied tunic and say, “Please examine it” (הַכֶּר־נָא, 37:32). Tamar sends Judah his seal, cord and staff with the same words (38:25). Bereshit Rabbah 85:11 connects the two. What might the echo teach?',
    },
  ],
}

export default vayeshev
