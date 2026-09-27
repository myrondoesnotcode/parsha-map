// Lech Lecha — Genesis 12:1 – 17:27. A journey: Haran to Canaan, Egypt and back, Hebron.
// Text is paraphrased from the sources cited on each card; run the parsha-fact-check workflow on any change.
// Sources: see `sources` below. Authoring guide: docs/plans/story-authoring.md.
import type { LngLat, ParshaStory } from '../story'

const HARAN: LngLat = [39.03, 36.86]
const SHECHEM: LngLat = [35.28, 32.21]
const BETHEL: LngLat = [35.24, 31.92]
const EGYPT: LngLat = [31.31, 30.13]
const HEBRON: LngLat = [35.1, 31.53]
const DAMASCUS: LngLat = [36.29, 33.51]
/** The Negeb (places.json), a region; an unnumbered waypoint on both Egypt legs (Genesis 12:9, 13:1). Its exact point is illustrative. */
const NEGEV: LngLat = [34.84, 31.24]

const lechLecha: ParshaStory = {
  parshaId: 'lech-lecha',
  tagline: 'Leave home. Go.',
  sources: ['Genesis 12–17'],
  route: [
    { name: 'Haran', at: HARAN, place: 'a6d9af3', hedge: 'usual identification' },
    { name: 'Shechem', at: SHECHEM, place: 'adf74d4', hedge: 'usual site' },
    { name: 'Bethel', at: BETHEL, place: 'a64f355', hedge: 'usual site · tent to its east' },
    // Via the Negev both ways: toward the Negev before the famine (12:9), back up through it after (13:1).
    { name: 'Egypt', at: EGYPT, place: 'af301ca', via: NEGEV, hedge: 'a region; where he stayed isn’t said' },
    // Back up through the Negev to the tent between Bethel and Ai (Genesis 13:1–4).
    { name: 'Bethel', at: BETHEL, place: 'a64f355', via: NEGEV, hedge: 'usual site · tent to its east' },
    { name: 'Hebron', at: HEBRON, place: 'a85151a', hedge: 'usual site' },
  ],
  cards: [
    {
      kind: 'cover',
      title: 'Lech Lecha',
      body: 'Leave home. Go.',
      ref: 'Genesis 12:1 – 17:27',
      camera: { center: [36.2, 33.4], zoom: 4.7, pitch: 0, bearing: 0 },
      routeTo: 0,
    },
    {
      kind: 'chapter',
      title: 'Go forth.',
      body: 'God tells Abram to leave his land, his birthplace and his father’s house for a land he will be shown. At 75, he sets out from Haran with Sarai, Lot and everything they own.',
      ref: 'Genesis 12:1–5',
      note: 'Genesis 12 doesn’t say where God first spoke to Abram (in 15:7 God says He brought Abram out from Ur); it says he set out from Haran (12:4). The pin marks Harran in southern Turkey, the site usually identified with Haran. Lines on the map join the stops in order; the roads Abram took aren’t known.',
      act: 'The journey',
      camera: { center: HARAN, zoom: 6.4, pitch: 45, bearing: -18 },
      routeTo: 0,
      stop: 1,
    },
    {
      kind: 'chapter',
      title: 'Abram’s first altar',
      body: 'At the terebinth of Moreh near Shechem, God promises this land to Abram’s offspring. Abram builds an altar there.',
      ref: 'Genesis 12:6–7',
      camera: { center: SHECHEM, zoom: 8.6, pitch: 55, bearing: -28 },
      routeTo: 1,
      stop: 2,
    },
    {
      kind: 'chapter',
      title: 'A tent between two towns',
      body: 'In the hill country, with Bethel to the west and Ai to the east, Abram pitches his tent and builds another altar.',
      ref: 'Genesis 12:8',
      note: 'Bethel is usually identified with Beitin, north of Jerusalem. The pin marks Bethel; the tent stood east of it, between Bethel and Ai. The Torah uses the later name: Genesis 28:19 says the town was first called Luz.',
      camera: { center: BETHEL, zoom: 9.4, pitch: 58, bearing: 12 },
      routeTo: 2,
      stop: 3,
    },
    {
      kind: 'guess',
      title: 'A famine hits the land. Where does Abram take his household?',
      ref: 'Genesis 12:10',
      options: [
        { label: 'Back to Haran', at: HARAN, place: 'a6d9af3' },
        { label: 'Down to Egypt', at: EGYPT, place: 'af301ca', correct: true },
        { label: 'North to Damascus', at: DAMASCUS, place: 'a69c1d4' },
      ],
      camera: { center: [35.3, 32.9], zoom: 4.4, pitch: 30, bearing: 0 },
      routeTo: 2,
    },
    {
      kind: 'chapter',
      title: 'Famine. Down to Egypt.',
      body: 'A severe famine grips the land, and Abram goes down to Egypt to stay there for a while.',
      ref: 'Genesis 12:10',
      note: 'Before the famine Abram had moved south, toward the Negev (12:9); the line bends at an illustrative point there. The verses don’t say where in Egypt he stayed; the pin just marks Egypt.',
      camera: { center: [32.6, 30.6], zoom: 6.2, pitch: 42, bearing: 12 },
      routeTo: 3,
      stop: 4,
    },
    {
      kind: 'chapter',
      title: 'Lot chooses the plain',
      body: 'Back at the tent between Bethel and Ai, Abram’s and Lot’s flocks and herds are too many for the land to hold them both, and their herders quarrel. Lot picks the well-watered Jordan plain and pitches his tents near Sodom.',
      ref: 'Genesis 13:1–12',
      note: 'From Egypt they went back up through the Negev to the old tent site (13:1–3). Where Sodom stood isn’t known, so it has no pin; proposals put it north or south of the Dead Sea, and none is proven. The numbered pin marks Bethel; the tent site was east of it, toward Ai.',
      camera: { center: [35.44, 31.9], zoom: 8.6, pitch: 55, bearing: -40 },
      routeTo: 4,
      stop: 5,
    },
    {
      kind: 'chapter',
      title: 'Settling in Hebron',
      body: 'Abram moves his tent to the terebinths of Mamre, in Hebron, and builds an altar there.',
      ref: 'Genesis 13:18',
      note: 'The pin marks Hebron, at its usual site. Where the terebinths of Mamre stood isn’t known. The Torah uses the later name: Genesis 23:2 says Hebron was once called Kiriath-arba.',
      camera: { center: HEBRON, zoom: 9.6, pitch: 58, bearing: -10 },
      routeTo: 5,
      stop: 6,
    },
    {
      kind: 'chapter',
      title: 'The rescue',
      body: 'When Lot is taken captive in a war between kings, Abram musters 318 men, pursues the raiders as far as Dan, defeats them at night, chases them as far as Hobah, north of Damascus, and brings Lot back.',
      ref: 'Genesis 14:1–16',
      note: 'Dan is most likely the town’s later name (Judges 18:29; Joshua 19:47). Radak on 14:14 says so, though he allows that a place may already have been called Dan then. The pin marks Tel Dan, its usual identification. Where Hobah was is unknown (Rashi, following a midrash, reads it as another name for Dan), so it isn’t pinned; Damascus (not shown) lies east-north-east of Dan.',
      camera: { center: [35.8, 33.0], zoom: 6.6, pitch: 50, bearing: -8 },
      routeTo: 5,
      spot: { name: 'Dan (usual site: Tel Dan)', at: [35.65, 33.25], place: 'a513646' },
    },
    {
      kind: 'stars',
      title: 'Look toward heaven and count the stars, if you are able to count them.',
      body: 'So shall your offspring be.',
      ref: 'Genesis 15:5',
      note: 'The verse doesn’t say what time it was, and the night sky here is an illustration. On the plain meaning, say Rashi and Ramban, God took Abram out of his tent to see the stars (both also quote a midrash reading it differently). Ibn Ezra reads it as a vision Abram woke from; on his reading, Abram took the animals by day, after he woke, since the chapter goes on to the sun going down (15:12) and then, after sunset, darkness, when the covenant was made (15:17–18). Radak says the going outside was part of the vision. Genesis 15 doesn’t say where this happened; it says only that it came “after these things” (15:1). In the order of the verses Abram was last living by the terebinths of Mamre, in Hebron (13:18; 14:13), and the map follows that. Later in the same chapter God makes a covenant with Abram (15:18). A tradition in Seder Olam dates that covenant earlier, when Abram was 70; only afterward, it says, did he spend five years in Haran before setting out at 75, so on that reckoning it was not at Hebron. Rashi (on Exodus 12:40) likewise counts 30 years from it to Isaac’s birth.',
      act: 'The covenant',
      camera: { center: HEBRON, zoom: 7.4, pitch: 76, bearing: 0 },
      routeTo: 5,
    },
    {
      kind: 'chapter',
      title: 'Hagar and Ishmael',
      body: 'Sarai gives her servant Hagar to Abram, hoping for a child through her. When Hagar conceives, she looks down on Sarai; Sarai treats her harshly, and Hagar runs away. An angel finds her by a spring in the wilderness and sends her back; the well there is named Beer-lahai-roi. She bears Abram a son, Ishmael. Abram is 86.',
      ref: 'Genesis 16:1–16',
      note: 'Its site is unknown. The verses put the spring on the road to Shur (16:7) and the well between Kadesh and Bered (16:14); the pin is only a rough guess in that direction (the Map tab’s place list uses another guess, further north). Chapters 16–17 say only that Abram had lived ten years in the land of Canaan (16:3), not in which town; the line stays at Hebron, his last stated home (13:18; 14:13).',
      camera: { center: [34.6, 30.95], zoom: 7.6, pitch: 50, bearing: 24 },
      routeTo: 5,
      spot: { name: 'Beer-lahai-roi (site unknown)', at: [34.45, 30.75], place: 'a70e842' },
    },
    {
      kind: 'name',
      title: 'Abram becomes Abraham',
      body: 'When Abram is 99, God makes a covenant with him and gives him a new name, Abraham, for “I make you the father of a multitude of nations” (17:5). Circumcision becomes the sign of the covenant.',
      ref: 'Genesis 17:1–11',
      note: 'God first made a covenant with Abram in Genesis 15:18; here He makes a covenant with him again, this time with the new name and circumcision as its sign.',
      camera: { center: [35.6, 33.2], zoom: 4.9, pitch: 20, bearing: 0 },
      routeTo: 5,
    },
    {
      kind: 'talk',
      title: 'God told Abram to leave his land and his father’s house for “the land that I will show you,” without naming it. What would be hardest for you to leave behind?',
      note: 'Numbered pins mark usual identifications (Haran = Harran, Shechem = Tell Balata, Bethel = Beitin); none is certain, and Egypt is a region. Zoomed out this far, stops close together share one pin, numbered for each stop in it (for example 2·3·5·6 for Shechem, Bethel twice and Hebron). God’s words don’t name the land (12:1), though 12:5 says they set out for the land of Canaan. Lines join the stops in order; the roads Abram took aren’t known.',
      camera: { center: [35.6, 33.2], zoom: 4.9, pitch: 20, bearing: 0 },
      routeTo: 5,
    },
  ],
  questions: [
    {
      audience: 'Kids',
      text: 'God added a letter to Abram’s name and made it Abraham. If you got a new name that said something about you, what would it be?',
    },
    {
      audience: 'Everyone',
      text: 'God told Abram to leave his land and his father’s house for “the land that I will show you,” without naming it. What would be hardest for you to leave behind?',
    },
    {
      audience: 'Deeper',
      text: 'Abram let Lot choose first, and Lot took the well-watered plain. Later Abram went after Lot’s captors with the 318 men of his household. Why do you think he did?',
    },
  ],
}

export default lechLecha
