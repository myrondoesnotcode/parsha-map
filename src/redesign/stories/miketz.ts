// Miketz — Genesis 41:1 – 44:17
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
//
// No journey line. Joseph never leaves Egypt (he goes from the dungeon to Pharaoh, 41:14, and travels through all
// the land of Egypt, 41:46); the journeys between lands are the brothers': down from Canaan and back, then down
// again. A route would need two endpoints the text doesn't give: it never says which Egyptian city Pharaoh's court
// or Joseph's house was in, nor where in Canaan Jacob's family was living. So `route` is empty and the map holds on
// Egypt (anchor: places.json Egypt, whose pin is the same point as Heliopolis). Pins shown, both linked to miketz in
// places.json: On (Heliopolis, in Ain Shams / El Matareya, north-east Cairo) and Canaan (a region, shown at an
// illustrative point in the hill country, not the gazetteer's point in the Galilee; see CANAAN below). The dream cards aim the camera at the Nile at today's Cairo but
// draw no pin (the stars and list cards hide spots), so the Nile isn't marked in this story.
// Verses quote THE JPS TANAKH: Gender-Sensitive Edition (Sefaria); Hebrew is Miqra according to the Masorah
// without cantillation marks. Claim table: docs/plans/2026-09-28-miketz-story-factcheck.md.
import type { LngLat, ParshaStory } from '../story'

/** Egypt (places.json af301ca, a region), pinned on the same point as Heliopolis. Used only as the anchor. */
const EGYPT: LngLat = [31.3075, 30.129444]
/** On = Heliopolis (places.json acd9137), at the site of the ancient city in Ain Shams / El Matareya, Cairo (Wikipedia 30.1293 N, 31.3075 E). */
const ON: LngLat = [31.3075, 30.129444]
/** A point on the Nile at today's Cairo, used only to aim the camera on the dream cards; no pin is drawn. */
const NILE: LngLat = [31.2296, 30.0437]
/**
 * Canaan (places.json a581f0c, a region). Deliberately NOT the gazetteer's point (35.333, 32.767, in the Galilee):
 * an illustrative point in the central hill country, in the Judean hills west of Bethlehem. The verses of Miketz
 * don't say where in Canaan Jacob's family lived; the last hint is the valley of Hebron (37:14). Not a location claim.
 */
const CANAAN: LngLat = [35.1, 31.75]

/**
 * Camera on a pin, with the pin moved about 95 px left of centre so its label fits on a phone.
 * Moves the centre along the screen's x-axis for the given bearing (Web Mercator, 512 px tiles).
 */
const onPin = (p: LngLat, zoom: number, pitch: number, bearing: number) => {
  const deg = (95 * 360) / (512 * 2 ** zoom)
  const b = (bearing * Math.PI) / 180
  const center: LngLat = [p[0] + deg * Math.cos(b), p[1] - deg * Math.sin(b) * Math.cos((p[1] * Math.PI) / 180)]
  return { center, zoom, pitch, bearing }
}

/** Egypt's delta and the Nile valley at Cairo, as a backdrop when the text names no place. */
const EGYPT_VIEW = { center: [31.25, 30.3] as LngLat, zoom: 7.2, pitch: 40, bearing: 0 }
/** Egypt and Canaan together, for the brothers' trips. */
const BOTH_VIEW = { center: [35.2, 31.2] as LngLat, zoom: 4.9, pitch: 25, bearing: 0 }

const miketz: ParshaStory = {
  parshaId: 'miketz',
  tagline: 'Dreams, grain and brothers.',
  sources: [
    'Genesis 41:1 – 44:17',
    'Genesis 37:5–10, 37:14, 40:23',
    'Rashi on Genesis 40:23, 41:1, 41:16, 41:45, 42:8, 42:24, 43:34, 44:15, 44:16',
    'Targum Onkelos on Genesis 41:45',
    'Ibn Ezra on Genesis 41:1',
    'THE JPS TANAKH: Gender-Sensitive Edition (translation and notes), Sefaria',
    'Wikipedia, “Heliopolis (ancient Egypt)”',
  ],
  route: [],
  anchor: { name: 'in Egypt', at: EGYPT, place: 'af301ca' },
  cards: [
    {
      kind: 'cover',
      title: 'Miketz',
      body: 'Dreams, grain and brothers.',
      ref: 'Genesis 41:1 – 44:17',
      camera: { center: [33.2, 30.9], zoom: 5.5, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Still in Egypt',
      body: 'No journey line this week. Joseph never leaves Egypt: he is in the dungeon, where the chief cupbearer has forgotten him, and later travels through all the land of Egypt. The journeys between lands are his brothers’: down from Canaan and back, then down again.',
      ref: 'Genesis 40:23, 41:14, 41:46, 42:3, 42:29, 43:15',
      note: 'The verses don’t say which Egyptian city Pharaoh’s court or Joseph’s house was in, so no journey line is drawn; the view of Egypt is a backdrop, not a location.',
      act: 'Pharaoh’s dreams',
      camera: EGYPT_VIEW,
      routeTo: 0,
    },
    {
      kind: 'stars',
      title: 'Pharaoh dreamed that he was standing by the Nile',
      body: '“After two years’ time,” Pharaoh has two dreams, waking after each one. Next morning his spirit is agitated.',
      ref: 'Genesis 41:1–8 · Rashi · Ibn Ezra',
      note: 'The parsha’s name, מִקֵּץ, is the verse’s word for “at the end”: Rashi on 41:1 reads it “at the end,” as the Targum renders it. The verse doesn’t say two years after what: Ibn Ezra on 41:1 says the count may run from the cupbearer’s release or from the day Joseph was put in prison, and Rashi on 40:23 says that because Joseph put his trust in the cupbearer, he had to stay imprisoned two years. Rashi on 41:1 also says no river but the Nile is called יְאֹר, because it rises into the canals that water the land, where rain does not fall as regularly as in other lands. The night sky is an illustration: the verses say Pharaoh awoke, slept and dreamed again, and was agitated the next morning. The view of the Nile is a backdrop; the verses don’t say where Pharaoh was.',
      camera: onPin(NILE, 7.6, 70, 0),
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'Two dreams, four sevens',
      ref: 'Genesis 41:2–7, 41:19–21',
      note: 'The Hebrew beside each row is the verse’s word for it: “handsome” (41:2), “ugly” (41:3), “solid” (41:5), “thin” (41:6). The handsome, sturdy cows graze in the reed grass; the ugly, gaunt cows come up close behind them (41:2–3). The verses say the seven healthy ears grew on a single stalk (41:5); they don’t say how the thin ears grew. The thin ears are “scorched by the east wind” (41:6). Telling Joseph the dream, Pharaoh adds that after eating the others, the lean cows looked just as bad as before (41:19–21).',
      items: [
        { he: 'יְפוֹת מַרְאֶה', en: 'Seven cows, handsome and sturdy', note: 'come up out of the Nile' },
        { he: 'רָעוֹת מַרְאֶה', en: 'Seven cows, ugly and gaunt', note: 'eat up the first seven' },
        { he: 'בְּרִיאוֹת', en: 'Seven ears of grain, solid and healthy', note: 'on a single stalk' },
        { he: 'דַּקּוֹת', en: 'Seven ears, thin and scorched', note: 'swallow up the first seven' },
      ],
      camera: onPin(NILE, 7.4, 40, 0),
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'None could interpret them',
      body: 'Pharaoh sends for all the magicians and sages of Egypt, but none can interpret his dreams. Then the chief cupbearer speaks up. In custody, he says, a Hebrew youth, a servant of the prefect, told him and the chief baker the meaning of their dreams, and it came to pass: the cupbearer was restored to his post, and the baker was impaled.',
      ref: 'Genesis 41:8–13',
      camera: EGYPT_VIEW,
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Out of the dungeon',
      body: 'Pharaoh sends for Joseph, and he is rushed from the dungeon. He has his hair cut, changes his clothes, and comes before Pharaoh. “I have heard it said of you,” says Pharaoh, “that for you to hear a dream is to tell its meaning.”',
      ref: 'Genesis 41:14–15',
      camera: { ...EGYPT_VIEW, zoom: 7.8, pitch: 50, bearing: 15 },
      routeTo: 0,
    },
    {
      kind: 'quote',
      title: 'Not I! God will see to Pharaoh’s welfare.',
      hebrew: 'בִּלְעָדָי אֱלֹהִים יַעֲנֶה אֶת־שְׁלוֹם פַּרְעֹה',
      body: 'Joseph’s answer to Pharaoh. Rashi on 41:16 explains: the wisdom is not his own; God will put in his mouth an answer for Pharaoh’s welfare.',
      ref: 'Genesis 41:16 · Rashi',
      note: 'The map is a backdrop; the verses don’t say where Pharaoh’s court was.',
      camera: { center: [31.25, 30.3], zoom: 7.4, pitch: 40, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Seven and seven',
      body: 'Pharaoh tells his dreams, and Joseph answers that they are one: God has told Pharaoh what God is about to do. The seven healthy cows and ears are seven years of great abundance in Egypt. The seven lean cows and empty ears are seven years of famine, so severe that the abundance will be forgotten. The dream came twice because God has determined it and will soon carry it out.',
      ref: 'Genesis 41:17–32',
      camera: { ...EGYPT_VIEW, zoom: 7.4, pitch: 45, bearing: -10 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Discerning and wise',
      body: 'Let Pharaoh find someone discerning and wise to set over Egypt, Joseph says, and appoint overseers, and let the grain of the good years be stored in the cities as a reserve for the famine. “Could we find another like him,” Pharaoh asks his courtiers, “a man with the divine spirit?” He puts Joseph in charge of his court: “only with respect to the throne shall I be superior to you.”',
      ref: 'Genesis 41:33–40',
      note: 'In 41:34 Joseph advises that Pharaoh “organize” the land of Egypt in the seven years of plenty (so JPS); the JPS note says others translate “take a fifth part of,” and that the meaning of the Hebrew is uncertain.',
      act: 'Joseph over Egypt',
      camera: { ...EGYPT_VIEW, zoom: 7.6, pitch: 50, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Over all the land of Egypt',
      body: 'Pharaoh puts his signet ring on Joseph’s hand, dresses him in robes of fine linen, and puts a gold chain around his neck. He has him ride in the chariot of his second-in-command, and they cry before him, “Abrek!” “I am Pharaoh,” he says; “yet without you, no one shall lift up hand or foot in all the land of Egypt.”',
      ref: 'Genesis 41:41–44',
      note: 'JPS notes that others translate “Abrek” as “Bow the knee,” as though from the Hebrew barakh, “to kneel”; perhaps it is from an Egyptian word of unknown meaning.',
      camera: { ...EGYPT_VIEW, zoom: 7.2, pitch: 45, bearing: -15 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Zaphenath-paneah',
      body: 'Pharaoh gives Joseph the name Zaphenath-paneah, צָפְנַת פַּעְנֵחַ, and gives him Asenath daughter of Poti-phera, priest of On, for a wife.',
      ref: 'Genesis 41:45 · Rashi · Targum Onkelos',
      note: 'What the name means is disputed. The JPS note gives it as Egyptian for “God speaks; he lives,” or “creator of life.” Rashi on 41:45 explains it as “explainer of hidden things,” and says the word פַּעְנֵחַ has no other example in Scripture; Targum Onkelos renders the name “the man to whom hidden things are revealed.” On is the Egyptian city the Greeks called Heliopolis; the pin marks its site, in the Ain Shams and El Matareya districts of north-east Cairo. The verses don’t say where Joseph lived.',
      camera: onPin(ON, 9.2, 55, 0),
      routeTo: 0,
      spot: { name: 'On (usual identification: Heliopolis)', at: ON, place: 'acd9137' },
    },
    {
      kind: 'guess',
      title: 'How old was Joseph when he entered the service of Pharaoh?',
      ref: 'Genesis 41:46',
      options: [{ label: '20' }, { label: '30', correct: true }, { label: '40' }],
      reveal: '“Joseph was thirty years old when he entered the service of Pharaoh king of Egypt” (41:46).',
      camera: { center: [31.3, 30.3], zoom: 7.4, pitch: 45, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Like the sands of the sea',
      body: 'Joseph travels through all the land of Egypt. In the seven years of plenty the land produces in abundance, and he stores the grain in the cities, putting in each city the grain of the fields around it. He gathers so much, like the sands of the sea, that he stops measuring it.',
      ref: 'Genesis 41:46–49',
      act: 'Plenty and famine',
      camera: { ...EGYPT_VIEW, zoom: 6.9, pitch: 40, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'offerings',
      title: 'Joseph names his sons',
      ref: 'Genesis 41:50–52',
      note: 'Asenath bore both sons before the years of famine came (41:50). The JPS notes connect נַשַּׁנִי, “has made me forget,” with Manasseh (Menashsheh), and הִפְרַנִי, “has made me fertile,” with Ephraim. The words beside each name are Joseph’s, in the JPS translation.',
      items: [
        { he: 'מְנַשֶּׁה', en: 'Manasseh, the first-born', note: '“God has made me forget completely my hardship and my parental home”' },
        { he: 'אֶפְרָיִם', en: 'Ephraim, the second', note: '“God has made me fertile in the land of my affliction”' },
      ],
      camera: { center: [31.3, 30.3], zoom: 7.4, pitch: 40, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Famine in all lands',
      body: 'The seven years of abundance end, and the seven years of famine begin, just as Joseph foretold. There is famine in all lands, but in Egypt there is bread. When the Egyptians cry out to Pharaoh for bread, he tells them, “Go to Joseph; whatever he tells you, you shall do.” Joseph lays open all that was within and rations out grain, and all the world comes to Joseph in Egypt.',
      ref: 'Genesis 41:53–57',
      camera: { ...EGYPT_VIEW, zoom: 6.6, pitch: 35, bearing: -10 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Ten brothers go down',
      body: 'Jacob sees that there are rations to be had in Egypt. “Why do you keep looking at one another?” he asks his sons, and sends them down. Ten of Joseph’s brothers go to get grain rations; Jacob does not send Joseph’s brother Benjamin, fearing he might meet with disaster. The famine has reached the land of Canaan.',
      ref: 'Genesis 42:1–5, 43:29 · 37:14',
      note: 'Canaan is a region; its pin is only an illustrative point in the hill country, not a place the text names, and it differs on purpose from the gazetteer’s point in the Galilee. The verses don’t say where in Canaan Jacob’s family was living. Joseph had last been sent out from the valley of Hebron (37:14). Benjamin is Joseph’s brother, “his mother’s son” (43:29).',
      act: 'The brothers',
      camera: BOTH_VIEW,
      routeTo: 0,
      spot: { name: 'Canaan (a region; point illustrative)', at: CANAAN, place: 'a581f0c' },
    },
    {
      kind: 'chapter',
      title: 'They bow low',
      body: 'Joseph is vizier of the land, and he dispenses the rations. His brothers come and bow low to him, their faces to the ground. Joseph recognizes them, but they don’t recognize him. He acts like a stranger and speaks harshly to them, and, recalling the dreams he had dreamed about them, he says: “You are spies.”',
      ref: 'Genesis 42:6–9 · 37:5–10 · Rashi',
      note: 'Joseph’s dreams, of his brothers’ sheaves bowing low to his sheaf and of the sun, the moon and eleven stars bowing down to him, are told in 37:5–10. Rashi on 42:8 says they didn’t recognize him because he had left them without a beard and now had one, while they had already been bearded. Where Joseph dispensed the rations isn’t said.',
      camera: { ...EGYPT_VIEW, zoom: 7.4, pitch: 50, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Three days',
      body: 'They protest that they are honest: twelve brothers, sons of a certain man in Canaan. “The youngest, however, is now with our father, and one is no more.” Joseph confines them for three days. On the third day he says, “I fear God”: one brother will be held, the rest may take rations home, but they must bring him their youngest brother.',
      ref: 'Genesis 42:10–20',
      camera: { ...EGYPT_VIEW, zoom: 7.6, pitch: 50, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'He turned away and wept',
      body: '“We are being punished on account of our brother,” they say to one another: they saw his anguish and paid no heed as he pleaded. Reuben: “Did I not tell you, ‘Do no wrong to the boy’?” They don’t know Joseph understands, for there is an interpreter between them. He turns away and weeps, then takes Simeon and has him bound before their eyes.',
      ref: 'Genesis 42:21–24 · Rashi',
      note: 'Rashi on 42:24 says Joseph wept because he heard that they regretted what they had done. He chose Simeon because Simeon had cast him into the pit; another explanation: to separate him from Levi, lest the two of them conspire to kill him. He kept Simeon bound only before their eyes, and once they had gone he freed him and gave him food and drink.',
      camera: { ...EGYPT_VIEW, zoom: 7.2, pitch: 45, bearing: 5 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Money in the sacks',
      body: 'Joseph orders their bags filled with grain, each one’s money returned to his sack, and provisions given them for the journey. At the night encampment one brother opens his sack to feed his donkey and finds his money at the mouth of his bag. Trembling, they turn to one another: “What is this that God has done to us?”',
      ref: 'Genesis 42:25–28',
      note: 'The verses don’t say where the night encampment was, so no place is marked.',
      camera: BOTH_VIEW,
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“It is always me that you bereave”',
      body: 'Back with their father Jacob in Canaan, they tell him all that happened. As they empty their sacks, each finds his money-bag, and they and their father are dismayed. “Joseph is no more and Simeon is no more,” says Jacob, “and now you would take away Benjamin.” Reuben says, “You may kill my two sons if I do not bring him back to you,” but Jacob answers, “My son must not go down with you.”',
      ref: 'Genesis 42:29–38',
      note: 'Canaan is a region; its pin is only an illustrative point in the hill country, not a place the text names, and it differs on purpose from the gazetteer’s point in the Galilee. The verses don’t say where in Canaan Jacob’s family was living.',
      camera: onPin(CANAAN, 6.8, 40, 0),
      routeTo: 0,
      spot: { name: 'Canaan (a region; point illustrative)', at: CANAAN, place: 'a581f0c' },
    },
    {
      kind: 'chapter',
      title: 'Judah’s surety',
      body: 'The famine is severe, and when the rations are eaten up, their father tells them to go again. Judah reminds him that the man warned, “Do not let me see your faces unless your brother is with you.” “Send the boy in my care,” Judah says. “I myself will be surety for him.”',
      ref: 'Genesis 43:1–10',
      note: 'JPS notes that “Do not let me see your faces” is literally “Do not see my face.” In this chapter the Torah calls their father Israel (43:6, 43:8, 43:11); in the chapter before, he is Jacob (42:1, 42:29, 42:36). Canaan is a region; its pin is only an illustrative point in the hill country, not a place the text names, and it differs on purpose from the gazetteer’s point in the Galilee. The verses don’t say where in Canaan Jacob’s family was living.',
      act: 'Benjamin',
      camera: onPin(CANAAN, 7.0, 45, 15),
      routeTo: 0,
      spot: { name: 'Canaan (a region; point illustrative)', at: CANAAN, place: 'a581f0c' },
    },
    {
      kind: 'offerings',
      title: 'A gift for the man',
      ref: 'Genesis 43:11–14',
      note: '“Take some of the choice products of the land in your baggage, and carry them down as a gift for the man” (43:11). Israel also tells them to take double the money and to carry back the money returned in their bags: “perhaps it was a mistake.” And he sends Benjamin: “May El Shaddai dispose the man to mercy toward you… As for me, if I am to be bereaved, I shall be bereaved” (43:12–14). The Hebrew beside each row is the verse’s word, without the “and” two of them carry. Canaan is a region; its pin is only an illustrative point in the hill country, not a place the text names, and it differs on purpose from the gazetteer’s point in the Galilee. The verses don’t say where in Canaan Jacob’s family was living.',
      items: [
        { he: 'צֳרִי', en: 'Some balm' },
        { he: 'דְּבַשׁ', en: 'Some honey' },
        { he: 'נְכֹאת', en: 'Gum' },
        { he: 'לֹט', en: 'Ladanum' },
        { he: 'בׇּטְנִים', en: 'Pistachio nuts' },
        { he: 'שְׁקֵדִים', en: 'Almonds' },
      ],
      camera: onPin(CANAAN, 6.8, 35, 0),
      routeTo: 0,
      spot: { name: 'Canaan (a region; point illustrative)', at: CANAAN, place: 'a581f0c' },
    },
    {
      kind: 'chapter',
      title: 'To Joseph’s house',
      body: 'The brothers go down to Egypt with the gift, double the money and Benjamin, and stand before Joseph. Seeing Benjamin, Joseph has his steward bring them to his house to dine with him at noon. Afraid it is because of the money, they tell the steward they have brought it back. “All is well with you; do not be afraid,” he answers, and brings Simeon out to them.',
      ref: 'Genesis 43:15–25',
      note: 'The men feared they had been brought in “as a pretext to attack us and seize us as slaves” (43:18). The steward told them, “Your God, the God of your father, must have put treasure in your bags for you. I got your payment” (43:23). Where Joseph’s house was isn’t said.',
      camera: { ...EGYPT_VIEW, zoom: 7.4, pitch: 50, bearing: -10 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“May God be gracious to you, my boy”',
      body: 'Joseph comes home, and they bow low and present their gift. He asks after their aged father, then sees his brother Benjamin, his mother’s son: “May God be gracious to you, my boy.” Overcome with feeling toward his brother, Joseph hurries out, goes into a room and weeps there. Then he washes his face, comes back in control of himself, and says, “Serve the meal.”',
      ref: 'Genesis 43:26–31',
      camera: { ...EGYPT_VIEW, zoom: 7.8, pitch: 55, bearing: 15 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Seated by age',
      body: 'Joseph is served by himself, the brothers by themselves, and the Egyptians by themselves, for the Egyptians could not dine with the Hebrews. The brothers are seated from the oldest to the youngest, and look at one another in astonishment. Benjamin’s portion is several times anyone else’s, and they drink their fill with him.',
      ref: 'Genesis 43:32–34 · Rashi',
      note: 'The Hebrew says Benjamin’s portion was “five” times as much (חָמֵשׁ יָדוֹת); JPS translates “several” and notes that it is literally “five.” Rashi on 43:34 counts the five: his own share, and shares from Joseph, Asenath, Manasseh and Ephraim. He also says that from the day they sold Joseph, neither they nor he had drunk wine; that day they drank.',
      camera: { ...EGYPT_VIEW, zoom: 7.4, pitch: 50, bearing: -20 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'The silver goblet',
      body: 'Joseph tells his steward to fill the men’s bags with food, put each one’s money back, and put his silver goblet in the bag of the youngest. At first light the men are sent off. They have not gone far from the city when the steward, sent after them, overtakes them: “Why did you repay good with evil?” It is the goblet, he says, that his master drinks from and uses for divination.',
      ref: 'Genesis 44:1–6 · Rashi',
      note: 'The Hebrew for divining in 44:5 and 44:15 is נַחֵשׁ יְנַחֵשׁ. The verses give the claim in the steward’s words and in Joseph’s own (44:15, “a man like me practices divination”); they don’t say whether Joseph ever used the goblet that way. Rashi on 44:15 reads Joseph’s words as: an important man like me knows how to divine, and to work out by reasoning that you stole the goblet.',
      act: 'The goblet',
      camera: { ...EGYPT_VIEW, zoom: 7.2, pitch: 45, bearing: 10 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'In Benjamin’s bag',
      body: '“Far be it from your servants!” say the brothers. They brought back the money from Canaan; how could they steal silver or gold? Whoever has the goblet shall die, and the rest will be slaves. Only that one shall be my slave, the steward answers. He searches from the oldest to the youngest, and the goblet turns up in Benjamin’s bag. They rend their clothes and return to the city.',
      ref: 'Genesis 44:7–13',
      camera: { ...EGYPT_VIEW, zoom: 7.6, pitch: 50, bearing: -5 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: '“What can we say to my lord?”',
      body: 'Judah and his brothers come back to Joseph’s house and throw themselves on the ground before him. “God has uncovered the crime of your servants,” says Judah; they will all be his slaves. But Joseph answers that only the man who had the goblet shall be his slave: “the rest of you go back in peace to your father.”',
      ref: 'Genesis 44:14–17 · Rashi',
      note: 'Rashi on 44:16 reads Judah’s words as: we know we did no wrong here, but this has come upon us from God; the Creditor has found an opportunity to collect His debt. The parsha ends here, with Benjamin to be kept as a slave.',
      camera: { ...EGYPT_VIEW, zoom: 7.8, pitch: 55, bearing: 20 },
      routeTo: 0,
    },
    {
      kind: 'talk',
      title: 'Standing before Pharaoh, Joseph said, “Not I! God will see to Pharaoh’s welfare.” When has someone praised you for something that wasn’t only your doing?',
      note: 'The story stays in Egypt, and no journey line is drawn: the verses don’t say which city Pharaoh’s court or Joseph’s house was in, nor where in Canaan Jacob’s family lived, nor where the brothers camped on the way. Pins on the cards: On, at the site of ancient Heliopolis in north-east Cairo, and Canaan, a region, at an illustrative point in the hill country (not the gazetteer’s point in the Galilee). Joseph never leaves Egypt; the journeys between lands are his brothers’.',
      camera: BOTH_VIEW,
      routeTo: 0,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'Joseph stored grain in the seven good years so there would be food in the seven years of famine. What is something you could save now for later?',
    },
    {
      audience: 'Everyone',
      text: 'Standing before Pharaoh, Joseph said, “Not I! God will see to Pharaoh’s welfare.” When has someone praised you for something that wasn’t only your doing?',
    },
    {
      audience: 'Deeper',
      text: 'On their first trip the brothers said, “we are being punished on account of our brother” (42:21). Before the goblet is found they are sure they are innocent (44:7–9), yet Judah then says, “God has uncovered the crime of your servants” (44:16). Which crime do you think Judah means?',
    },
  ],
}

export default miketz
