// Vayishlach — Genesis 32:4 – 36:43
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// A journey: Penuel → Succoth → Shechem → Bethel → the road to Ephrath → Hebron.
// Chapter 32 doesn't say where Jacob was when he sent the messengers (last week ended at Mahanaim, 32:3);
// the camp he prays in is the one he leaves that night to cross the Jabbok (32:14, 32:22–23), so those cards
// show the Jabbok as a river (a spot, not a stop): where the ford was isn't known. Jacob named the place of
// the wrestling Peniel (32:31); the verses don't say how far it was from the ford. The wrestling cards use the
// Penuel stop, and no trek between a ford and Penuel is drawn. The river spot is an illustrative point on the
// Zarqa beside the Penuel pin, not the gazetteer's point (which marks the river's mouth). Where the brothers met isn't said; it comes after
// Penuel (32:32) and before Succoth (33:17), so the map stays near Penuel with no pin lit. Migdal-eder (35:21) is not a stop: its site is unknown, and the
// places.json pin (Khirbet el-Bira) is OpenBible's least-favoured proposal. Allon-bacuth has no pin of its own.
// Verses quote THE JPS TANAKH: Gender-Sensitive Edition (Sefaria); Hebrew is Miqra according to the Masorah
// without cantillation marks. Chapter 32 uses the Hebrew verse numbers (English Bibles number it one lower).
// Claim table: docs/plans/2026-09-27-vayishlach-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/**
 * Jabbok (places.json aca7bd9, whose point marks the river's mouth at the Jordan). Shown as a river spot, not a stop,
 * at an illustrative point on the Zarqa beside the Penuel pin, where Jacob wrestled (he named the place Peniel, 32:31). Where the ford was isn't known.
 */
const JABBOK: LngLat = [35.681, 32.1861]
/** Penuel (places.json a8a9ff9), pinned at Tell edh-Dhahab el-Sharqi (the eastern of two hills), Israel Finkelstein's proposal. Not certain. */
const PENUEL: LngLat = [35.69211, 32.187016]
/** Succoth (places.json a0905b5), pinned at Tell Deir Alla: a suggested identification, not confirmed by any inscription. */
const SUCCOTH: LngLat = [35.62118, 32.1966]
/** Shechem (places.json adf74d4), pinned at Tell Balata by Nablus, its usual identification. */
const SHECHEM: LngLat = [35.281944, 32.213611]
/** Bethel (places.json a64f355), pinned at Beitin, its usual identification. */
const BETHEL: LngLat = [35.241389, 31.922778]
/** Hebron (places.json a85151a), pinned at Tel Rumeida, its usual identification. */
/** Rachel's Tomb, the traditional site of her grave at Bethlehem's northern entrance (Wikipedia "Rachel's Tomb": 31.7193 N, 35.2021 E). Only a bend in the Bethel → Hebron line. */
const RACHELS_TOMB: LngLat = [35.2021, 31.7193]
const HEBRON: LngLat = [35.10222, 31.525087]
/** Seir (places.json ae981db "Mount Seir 1"), a region: an illustrative point in the range around Jebel esh-Shera, south of the Dead Sea and east of the Arabah. */
const SEIR: LngLat = [35.3166, 30.1843]

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

const vayishlach: ParshaStory = {
  parshaId: 'vayishlach',
  tagline: 'Jacob becomes Israel.',
  sources: [
    'Genesis 32:4 – 36:43',
    'Genesis 27:41–45, 28:10–22, 46:2, 49:5–7, 49:29–31',
    'Joshua 24:32',
    'Hosea 12:4–5',
    'Jeremiah 31:15',
    'Obadiah 1:21',
    'Rashi on Genesis 32:9, 32:16, 32:25, 32:29, 32:30, 33:4, 33:14, 33:18, 35:8, 35:29, 48:7',
    'Ibn Ezra on Genesis 35:26',
    'Radak on Genesis 35:26',
    'Bereshit Rabbah 77:3',
    'Bereshit Rabbah 81:5',
    'Sifrei Bamidbar 69:2',
    'Mishnah Chullin 7:1, 7:6',
    'Berakhot 13a',
    'Wikipedia, “Penuel”, “Deir Alla”, “Zarqa River” (Jabbok), “Tell Balata”, “Bethel”, “Rachel’s Tomb”, “Tel Rumeida”, “Mamre”, “Mount Seir”, “Migdal Eder (biblical location)”',
  ],
  route: [
    { name: 'Penuel', at: PENUEL, place: 'a8a9ff9', hedge: 'proposed: Tell edh-Dhahab el-Sharqi' },
    { name: 'Succoth', at: SUCCOTH, place: 'a0905b5', hedge: 'proposed: Tell Deir Alla' },
    { name: 'Shechem', at: SHECHEM, place: 'adf74d4', hedge: 'usual site: Tell Balata' },
    { name: 'Bethel', at: BETHEL, place: 'a64f355', hedge: 'usual site: Beitin' },
    // Ephrath is not a stop: Rachel died short of it and the text doesn't say Jacob reached the town (35:16–19).
    { name: 'Hebron', at: HEBRON, via: RACHELS_TOMB, place: 'a85151a', hedge: 'usual site: Tel Rumeida' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Vayishlach',
      body: 'Jacob becomes Israel.',
      ref: 'Genesis 32:4 – 36:43',
      camera: { center: [35.4, 31.25], zoom: 6.2, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Word to Esau',
      body: 'Jacob sends messengers ahead to his brother Esau, in the land of Seir, the country of Edom. Their message: your servant Jacob has been staying with Laban until now; he has cattle, donkeys, sheep and servants, and hopes to gain your favor.',
      ref: 'Genesis 32:4–6',
      note: 'The verses don’t say where Jacob was when he sent them; last week’s parsha ended at Mahanaim (32:3). Seir is a region, the hill country where Esau lived (36:8–9), between the Dead Sea and the Gulf of Aqaba; its pin is only an illustrative point in it.',
      act: 'Facing Esau',
      camera: { center: [35.45, 31.15], zoom: 6.3, pitch: 30, bearing: 0 },
      routeTo: 0,
      spot: { name: 'Seir (a region; point illustrative)', at: SEIR, place: 'ae981db' },
    },
    {
      kind: 'guess',
      title: 'The messengers come back. Esau is coming to meet Jacob. How many men are with him?',
      ref: 'Genesis 32:7',
      options: [{ label: '4 men' }, { label: '40 men' }, { label: '400 men', correct: true }],
      reveal: '“He himself is coming to meet you, and there are four hundred men with him” (32:7).',
      camera: { center: [35.45, 31.15], zoom: 6.3, pitch: 30, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Two camps',
      body: 'Jacob is greatly frightened. He divides the people with him, and the flocks, herds and camels, into two camps: if Esau attacks one, the other may yet escape.',
      ref: 'Genesis 32:8–9 · Rashi',
      note: 'Rashi on 32:9 says Jacob prepared for three things: a gift, prayer, and battle. The verses don’t name the place of the camp, but it is the one Jacob leaves that same night to cross the ford of the Jabbok (32:22–23), so the map shows the Jabbok, today’s Zarqa River in Jordan. Where the ford was isn’t known. The point on the river is illustrative: it is drawn beside Penuel, where Jacob wrestled (he named the place Peniel, 32:31; its pin appears later), not at the gazetteer’s point for the Jabbok, which marks the river’s mouth.',
      camera: onPin(JABBOK, 9.4, 55, -15),
      routeTo: 0,
      spot: { name: 'Jabbok (river; point illustrative)', at: JABBOK, place: 'aca7bd9' },
    },
    {
      kind: 'quote',
      title: 'With my staff alone I crossed this Jordan, and now I have become two camps.',
      hebrew: 'כִּי בְמַקְלִי עָבַרְתִּי אֶת־הַיַּרְדֵּן הַזֶּה וְעַתָּה הָיִיתִי לִשְׁנֵי מַחֲנוֹת',
      body: 'From Jacob’s prayer: “I am unworthy of all the kindness” You have shown me. Save me from my brother, he asks, and recalls God’s promise to make his offspring like the sands of the sea.',
      ref: 'Genesis 32:10–13',
      // Page card: terrain south of the Jabbok as a backdrop, the pin kept out from under the Hebrew.
      camera: { center: [35.55, 31.96], zoom: 10.5, pitch: 35, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'A gift for Esau',
      ref: 'Genesis 32:14–22 · Rashi',
      note: 'The numbers given add up to 550 animals. The camels’ young aren’t numbered: Rashi on 32:16 reads the thirty as the mother camels, with their colts beside them. Jacob sends them ahead drove by drove, with a space between the droves, and tells each driver to say they are a gift from “your servant Jacob,” who “is right behind us” (32:17–21): “If I propitiate him with presents in advance, and then face him, perhaps he will show me favor.” The Hebrew beside each row names the first animal in it. The Jabbok point is illustrative (see the Two camps card).',
      items: [
        { he: 'עִזִּים', en: '200 she-goats and 20 he-goats' },
        { he: 'רְחֵלִים', en: '200 ewes and 20 rams' },
        { he: 'גְּמַלִּים', en: '30 milch camels with their young' },
        { he: 'פָּרוֹת', en: '40 cows and 10 bulls' },
        { he: 'אֲתֹנֹת', en: '20 she-donkeys and 10 male donkeys' },
      ],
      camera: onPin(JABBOK, 9.4, 55, -15),
      routeTo: 0,
      spot: { name: 'Jabbok (river; point illustrative)', at: JABBOK, place: 'aca7bd9' },
    },
    {
      kind: 'chapter',
      title: 'Jacob is left alone',
      body: 'That night Jacob takes his wives, his maidservants and his children across the ford of the Jabbok, and sends over all he owns. Jacob is left alone, and a man wrestles with him until the break of dawn. Seeing he cannot win, the man wrenches Jacob’s hip at its socket.',
      ref: 'Genesis 32:23–26 · Hosea 12:4–5 · Rashi · Bereshit Rabbah 77:3',
      note: 'The Hebrew says only ’ish, “a man” (this JPS translation has “a figure”), and he won’t give his name (32:30). The prophet Hosea says Jacob “strove with an angel and prevailed” (Hosea 12:5). Rashi on 32:25 brings the teaching of Bereshit Rabbah 77:3 (Rabbi Ḥama son of Rabbi Ḥanina) that it was Esau’s guardian angel. The JPS note says the meaning of the Hebrew for “wrestled” is uncertain; Rashi reads it as two people clasping each other. Jacob named the place of the wrestling Peniel (32:31); the verses don’t say how far it was from the ford. The pin marks the proposed site of Penuel, Tell edh-Dhahab el-Sharqi, just south of the Jabbok; where the ford was isn’t known. Rashi on 32:25 says Jacob was left alone because he had gone back for some small jars he had forgotten; the verses don’t say on which bank of the river he wrestled.',
      act: 'The night at the Jabbok',
      camera: onPin(PENUEL, 10.2, 62, -30),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'stars',
      title: 'I will not let you go, unless you bless me.',
      body: 'Dawn is breaking. “Let me go,” says the man. Jacob holds on.',
      ref: 'Genesis 32:25–27',
      note: 'The verses say the wrestling lasted “until the break of dawn” (32:25); the dawn sky here is an illustration.',
      camera: onPin(PENUEL, 10.6, 70, 180),
      routeTo: 0,
      stop: 1,
      sky: 'dawn',
    },
    {
      kind: 'name',
      title: 'Jacob becomes Israel',
      names: { from: 'יעקב', to: 'ישראל' },
      body: '“What is your name?” “Jacob.” “Your name shall no longer be Jacob, but Israel, for you have striven with beings divine and human, and have prevailed.”',
      ref: 'Genesis 32:28–30 · Rashi',
      note: 'The JPS notes connect “striven” (saritha) with the first part of Israel, and ’Elohim (“God,” “divine beings”) with the second. Rashi on 32:29 reads the change as: no longer will it be said that the blessings came to you by trickery, but openly; “with human beings” means Esau and Laban. When Jacob asks the man’s name, he answers, “You must not ask my name!” (32:30); Rashi there says angels have no fixed names. That verse ends וַיְבָרֶךְ אֹתוֹ שָׁם, literally “he blessed him there”; this JPS translation has “he took leave of him there.”',
      // Stage card: terrain south of Penuel as a backdrop, the pin kept out from under the name.
      camera: { center: [35.69, 32.0], zoom: 10.5, pitch: 35, bearing: 0 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Face to face',
      body: 'Jacob names the place Peniel: “I have seen a divine being face to face, yet my life has been preserved.” The sun rises as he passes Penuel, limping on his hip. That is why the children of Israel, to this day, do not eat the gid hanasheh, the sinew on the socket of the hip.',
      ref: 'Genesis 32:31–33 · Mishnah Chullin 7:1, 7:6',
      note: 'Peniel (32:31) and Penuel (32:32) name the same place; JPS notes that Peniel is understood as “face of God.” This JPS translation calls the gid hanasheh “the thigh muscle”; the Sefaria (William Davidson) translation of the Mishnah calls it the sciatic nerve. The Mishnah (Chullin 7:1) says the law doesn’t apply to birds, since the verse speaks of the “socket of the hip” (32:33), which a bird doesn’t have. In Chullin 7:6 the Rabbis say the law was given at Sinai and written here, in its place in the story; Rabbi Yehuda holds that Jacob’s sons already kept it. The pin marks Tell edh-Dhahab el-Sharqi, where the archaeologist Israel Finkelstein places Penuel; the site isn’t certain. Since Jacob named the place of the wrestling Peniel (32:31), the night’s cards use this pin too.',
      camera: onPin(PENUEL, 10.2, 58, -20),
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Esau runs to meet him',
      body: 'Jacob sees Esau coming with four hundred men. He puts the maids and their children in front, Leah and her children next, Rachel and Joseph last, and goes ahead himself, bowing to the ground seven times. Esau runs to greet him, embraces him, falls on his neck and kisses him, and they weep.',
      ref: 'Genesis 33:1–7 · Sifrei Bamidbar 69:2 · Rashi',
      note: 'In the Hebrew text the word וַיִּשָּׁקֵהוּ, “and kissed him” (33:4), has a dot over each letter. Sifrei Bamidbar 69:2, quoted by Rashi on 33:4, records two views of what the dots mean: one says Esau didn’t kiss him with all his heart; Rabbi Shimon bar Yoḥai says that Esau hated Jacob, but at that moment his compassion was stirred and he kissed him with all his heart. Where they met isn’t said; it was after Penuel (32:32) and before Succoth (33:17), so the map stays near Penuel with no pin lit.',
      act: 'Two brothers',
      camera: onPin(PENUEL, 10.0, 56, 15),
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“I have enough, my brother”',
      body: '“What do you mean by all this company that I have met?” Esau asks. “To gain my lord’s favor,” says Jacob. “I have enough, my brother; let what you have remain yours.” Jacob urges him, “to see your face is like seeing the face of God,” and Esau accepts.',
      ref: 'Genesis 33:8–11 · Bereshit Rabbah 77:3',
      note: 'In Bereshit Rabbah 77:3, Rabbi Ḥama son of Rabbi Ḥanina says the one Jacob wrestled was Esau’s guardian angel, and brings these very words as his proof, reading them “I have seen your face, as the sight of the face of angels.”',
      camera: onPin(PENUEL, 10.4, 60, -10),
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Stalls at Succoth',
      body: 'Esau offers to travel alongside. Jacob asks him to go on ahead: the children are frail and the nursing flocks can’t be driven hard, so he will follow slowly “until I come to my lord in Seir.” Esau heads back to Seir, but Jacob journeys on to Succoth, builds a house, and makes stalls for his cattle.',
      ref: 'Genesis 33:12–17 · Rashi · Obadiah 1:21',
      note: 'Succoth means “stalls,” “huts,” “booths” (JPS note). Rashi on 33:14 says Jacob meant to go only as far as Succoth, and will come to Seir in the days of the Messiah, as in Obadiah 1:21. The pin marks Tell Deir Alla, a suggested site for Succoth that no inscription there confirms.',
      camera: onPin(SUCCOTH, 10.0, 55, 80),
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'Safe at Shechem',
      body: 'Jacob arrives safe in the city of Shechem, in the land of Canaan, and camps before the city. He buys the parcel of land where he pitched his tent from the family of Hamor, Shechem’s father, for a hundred kesitahs, and sets up an altar there: El-elohe-yisrael, “El, God of Israel.”',
      ref: 'Genesis 33:18–20 · Rashi · Joshua 24:32',
      note: 'The kesitah is a unit of unknown value (JPS note). Rashi on 33:18 reads “safe” (shalem, “whole”) as whole in body, since his limp was healed; in his possessions; and in the Torah he had learned. Joseph’s bones would later be buried in this same plot (Joshua 24:32). The pin marks Tell Balata, by Nablus, usually identified with Shechem.',
      act: 'Shechem',
      camera: onPin(SHECHEM, 9.6, 55, -20),
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Dinah',
      body: 'Dinah, Jacob and Leah’s daughter, goes out to visit the daughters of the land. Shechem son of Hamor the Hivite, chief of the country, seizes her and violates her. Then he asks for her as his wife, and Hamor asks Jacob’s family to marry into his people and settle among them.',
      ref: 'Genesis 34:1–12',
      note: 'The verse says Shechem “took her and lay with her and disgraced her” (34:2; the JPS note gives “violated”). Jacob heard and kept silent until his sons came home from the field; they were distressed and very angry (34:5–7).',
      camera: onPin(SHECHEM, 10.2, 58, 10),
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Simeon and Levi',
      body: 'Jacob’s sons answer with guile: only if every male in the city is circumcised. On the third day, while the men are in pain, Simeon and Levi kill all the males, Hamor and Shechem among them, and take Dinah away; the other brothers plunder the town. Jacob rebukes the two for making him hated in the land; they answer that their sister must not be treated like a harlot (34:31).',
      ref: 'Genesis 34:13–31 · Genesis 49:5–7',
      note: 'Jacob comes back to this at the end of his life: “Simeon and Levi are a pair; Their weapons are tools of lawlessness… Cursed be their anger so fierce” (49:5–7).',
      camera: onPin(SHECHEM, 10.0, 56, -5),
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'chapter',
      title: 'Up to Bethel',
      body: 'God tells Jacob to go up to Bethel and build an altar there. His household and all who are with him hand over their alien gods and their earrings, and he buries them under the terebinth near Shechem. At Luz, that is Bethel, he builds an altar and names the site El-bethel, “the God of Bethel.”',
      ref: 'Genesis 35:1–7 · Genesis 28:10–22',
      note: 'He had told them to purify themselves and change their clothes (35:2). Bethel is where God appeared to Jacob as he fled from Esau (35:1, 35:7; his dream there, 28:10–22). As they set out, a terror from God fell on the towns around, and no one pursued them (35:5). The pin marks Beitin, the site most scholars identify with Bethel.',
      act: 'The road home',
      camera: onPin(BETHEL, 9.6, 55, 10),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'The oak of weeping',
      body: 'Deborah, Rebekah’s nurse, dies and is buried under the oak below Bethel. It is named Allon-bacuth, understood as “the oak of the weeping.”',
      ref: 'Genesis 35:8 · Rashi · Bereshit Rabbah 81:5',
      note: 'The Torah doesn’t say how Rebekah’s nurse came to be with Jacob; Rashi on 35:8, citing Rabbi Moses Ha-darshan, says Rebekah had sent her to tell Jacob to come home. In Bereshit Rabbah 81:5, Rabbi Shmuel bar Naḥman says allon means “another” in Greek: while mourning Deborah, Jacob heard that his mother had died. The Torah never tells of Rebekah’s death; 49:31 mentions only her burial. Allon-bacuth’s site isn’t known; the pin marks Bethel.',
      camera: onPin(BETHEL, 10.4, 60, -25),
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'quote',
      title: 'You whose name is Jacob, You shall be called Jacob no more, But Israel shall be your name.',
      hebrew: 'שִׁמְךָ יַעֲקֹב לֹא־יִקָּרֵא שִׁמְךָ עוֹד יַעֲקֹב כִּי אִם־יִשְׂרָאֵל יִהְיֶה שְׁמֶךָ',
      body: 'At Bethel God gives the name a second time. Yet the Torah goes on calling him Jacob too; the Talmud (Berakhot 13a) says Israel became his main name, and Jacob a second one.',
      ref: 'Genesis 35:9–15 · Berakhot 13a',
      note: 'God blesses him: “I am El Shaddai. Be fertile and increase,” and gives him the land promised to Abraham and Isaac (35:11–12). Jacob sets up a stone pillar, pours a libation and oil on it, and names the place Bethel (35:14–15). A few verses on, “Israel journeyed on” (35:21), and “Jacob came to his father Isaac” (35:27). Berakhot 13a notes that God Himself later calls him “Jacob! Jacob!” (46:2).',
      // Page card: terrain just south of Bethel as a backdrop, with the Bethel pin in view above the card.
      camera: { center: [35.24, 31.88], zoom: 10.5, pitch: 35, bearing: 0 },
      routeTo: 3,
    },
    {
      kind: 'chapter',
      title: 'Rachel',
      body: 'On the road from Bethel, still some distance short of Ephrath, Rachel has a hard labor. As she is dying she names her son Ben-oni; his father calls him Benjamin. She is buried on the road to Ephrath, now Bethlehem, and Jacob sets up a pillar over her grave.',
      ref: 'Genesis 35:16–20 · Rashi · Jeremiah 31:15',
      note: 'The midwife tells her, “Have no fear, for it is another boy for you” (35:17). The JPS notes: Ben-oni is understood as “son of my suffering (or, strength),” Benjamin as “son of the right hand” or “son of the south.” The verse calls it “the pillar at Rachel’s grave to this day” (35:20). Rashi on 48:7 says Jacob buried her by the road at God’s command, so that she could plead for her children when they were driven into exile: “Rachel weeping for her children” (Jeremiah 31:15). The ring marks Rachel’s Tomb, at Bethlehem’s northern entrance, the traditional site, named as her grave in writings since the early 4th century CE; some scholars propose sites further north. The line stops at that traditional site, short of the town; where on the road she died isn’t said.',
      // The line stops at the traditional grave (the bend of the Bethel → Hebron leg), short of Ephrath: she died "some distance short of Ephrath" (35:16).
      camera: { center: [35.225, 31.79], zoom: 10.2, pitch: 45, bearing: 0 },
      routeTo: 3.5,
      spot: { name: 'Rachel’s Tomb (traditional site)', at: RACHELS_TOMB },
    },
    {
      kind: 'offerings',
      title: 'Now the sons of Jacob were twelve in number',
      ref: 'Genesis 35:21–26 · Ibn Ezra · Radak',
      note: 'Israel journeyed on and pitched his tent beyond Migdal-eder (35:21). The story puts it after Rachel’s grave near Bethlehem, but early sources differ on where it stood, so it isn’t marked in this story, and no pin is lit here. The list ends “These are the sons of Jacob who were born to him in Paddan-aram” (35:26), though Benjamin has just been born near Ephrath; Ibn Ezra and Radak on 35:26 say the verse speaks of most of them. The first half of 35:22, about Reuben, is not told here.',
      items: [
        { he: 'לֵאָה', en: 'Leah’s sons', note: 'Reuben, Jacob’s first-born; Simeon, Levi, Judah, Issachar and Zebulun' },
        { he: 'רָחֵל', en: 'Rachel’s sons', note: 'Joseph and Benjamin' },
        { he: 'בִּלְהָה', en: 'Bilhah’s sons', note: 'Dan and Naphtali. Bilhah is Rachel’s maid.' },
        { he: 'זִלְפָּה', en: 'Zilpah’s sons', note: 'Gad and Asher. Zilpah is Leah’s maid.' },
      ],
      // Page card: the hill country between Ephrath and Hebron as a backdrop; no pin is active, since the family had moved on beyond Migdal-eder (site unknown).
      camera: { center: [35.16, 31.61], zoom: 9.6, pitch: 30, bearing: 0 },
      routeTo: 3.5,
    },
    {
      kind: 'chapter',
      title: 'Isaac',
      body: 'Jacob comes to his father Isaac at Mamre, at Kiriath-arba, now Hebron, where Abraham and Isaac had lived. Isaac dies at 180, in ripe old age, and his sons Esau and Jacob bury him.',
      ref: 'Genesis 35:27–29 · Genesis 49:29–31 · Rashi',
      note: 'The verses here don’t say where he was buried; Genesis 49:29–31 says Isaac and Rebekah were buried in the cave of Machpelah, facing Mamre. Rashi on 35:29 says the Torah doesn’t always tell events in order: by his count Isaac died twelve years after Joseph was sold, a story still to come. The pin marks Tel Rumeida, the usual site of ancient Hebron. Mamre has been placed since Herod’s time (1st century BCE) at Ramat el-Khalil, about 4 km north of Hebron, but that identification isn’t certain; scholars have proposed other sites nearby.',
      camera: onPin(HEBRON, 9.8, 55, 10),
      routeTo: 4,
      stop: 5,
    },
    {
      kind: 'chapter',
      title: 'Esau’s line',
      body: 'Esau takes his household and herds to another land, because of his brother Jacob: they have too much to live together. He settles in the hill country of Seir. The chapter lists his sons and grandsons, among them Amalek, the clans of Edom, and eight kings who reigned in Edom “before any king reigned over the Israelites.”',
      ref: 'Genesis 36:1–43',
      note: 'Amalek was the son of Timna, a concubine of Esau’s son Eliphaz (36:12). The eight kings are Bela, Jobab, Husham, Hadad, Samlah, Saul, Baal-hanan and Hadar (36:32–39). The chapter also lists the Horites, “the sons of Seir,” who were settled in the land (36:20–30). Seir is a region; its pin is only an illustrative point in it. The Torah doesn’t say when Esau moved away; he was already in Seir when Jacob came back (32:4, 33:16).',
      act: 'Esau’s line',
      camera: { center: [35.35, 29.95], zoom: 8, pitch: 40, bearing: 0 },
      routeTo: 4,
      spot: { name: 'Seir (a region; point illustrative)', at: SEIR, place: 'ae981db' },
    },
    {
      kind: 'talk',
      title: 'Esau, who had once resolved to kill Jacob, ran to meet him, and the brothers embraced and wept. What helps people make peace after a long rift?',
      note: 'Numbered pins mark usual or proposed identifications: Penuel = Tell edh-Dhahab el-Sharqi, Succoth = Tell Deir Alla, Shechem = Tell Balata, Bethel = Beitin, Hebron = Tel Rumeida. None of these sites is certain. The Jabbok is today’s Zarqa River; where Jacob crossed it isn’t known, and it is shown only as a river. Seir is a region. Migdal-eder (somewhere past Rachel’s grave; early sources differ on where) and Allon-bacuth (“below Bethel,” 35:8) can’t be located exactly and aren’t marked in this story. Stops close together on screen may share one numbered pin, drawn on the first of them; which ones merge depends on the screen size. Ephrath (Bethlehem) is not a numbered stop: Rachel died some distance short of it, and the text doesn’t say Jacob reached the town (35:16–19); the line bends at the traditional site of Rachel’s Tomb. Lines join the stops in order; Jacob’s roads aren’t known.',
      // Not used on screen: the finale fits the whole route into the strip above the card (DaylightMap fitBounds).
      camera: { center: [35.42, 31.85], zoom: 7.9, pitch: 30, bearing: 0 },
      routeTo: 4,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Jacob sent Esau goats, sheep, camels, cows and donkeys, hoping to win his favor. If you wanted to make up with someone, what would you give or do?',
    },
    {
      audience: 'Everyone',
      text: 'Esau, who had once resolved to kill Jacob, ran to meet him, and the brothers embraced and wept. What helps people make peace after a long rift?',
    },
    {
      audience: 'Deeper',
      text: 'Jacob is named Israel twice, at Peniel by the Jabbok (32:29–31) and at Bethel (35:10), yet the Torah keeps calling him Jacob too. Why might he need both names?',
    },
  ],
}

export default vayishlach
