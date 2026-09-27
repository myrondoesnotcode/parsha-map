# Vayera story: self fact-check

Story: `src/redesign/stories/vayera.ts` (17 cards). Checked 2026-09-27 by the story author, before review.

**Sources fetched.** Verses: Sefaria API v3, `Genesis.18`–`Genesis.22`, plus Genesis 12:4, 13:10, 14:3, 17:17, 17:19, 21:31, 22:13–14 and II Chronicles 3:1 (THE JPS TANAKH: Gender-Sensitive Edition; Hebrew: Miqra according to the Masorah; JPS footnotes read with the text). Rashi on Genesis 18:1, 18:2, 18:32, 21:33, 22:2, 22:8, 25:20 (Rosenbaum–Silbermann, English and Hebrew). Talmud, Shabbat 127a, Rosh Hashanah 16a, Megillah 31a (William Davidson edition, English and vocalized Aramaic). Scholarship on sites: Wikipedia pages "Mamre", "Gerar", "Sodom and Gomorrah", "Tall el-Hammam", "Bab edh-Dhra", "Tel Be'er Sheva". Pins: `src/data/places.json`. Traditional date: `src/data/parshaDates.json` (vayera: AM 2048 = c. 1713 BCE, Isaac born).

**Honoured from the Genesis fact-check** (`factcheck-genesis-1.md`, Vayera section): the meal is cakes, a tender calf, curds and milk, not "roasted"; the Akedah is "on one of the heights" in "the land of Moriah", not "Mount Moriah" (the Temple Mount is given only as tradition, with 2 Chronicles 3:1); the angel's words are "now I know that you fear God"; Rashi's reason for stopping at ten is Noah's eight (not Lot's household); the shofar link is sourced to Rosh Hashanah 16a; the retracted 2021 Tall el-Hammam airburst paper is not mentioned at all, and no Sodom site is pinned or implied.

Verdicts: **verified** = matches the fetched source; **fixed** = was wrong or loose in the draft and was corrected before commit.

## Cover and map

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0.1 | Title Vayera, range Genesis 18:1 – 22:24, tagline "He appeared." (וַיֵּרָא, first word of 18:1) | parshaList.json; Genesis 18:1 Hebrew | verified (checker enforces title/range) |
| 0.2 | Route: Mamre → Gerar → Beersheba → Moriah → Beersheba | 18:1; 20:1–2; 21:31–33; 22:2–9; 22:19 | verified; the departure point for Moriah is not stated, the note says so (see 11.6) |
| 0.3 | Mamre pin = Ramat el-Khalil, about 4 km north of old Hebron, "traditional site"; tradition goes back to Herod's time | places.json aeb9e97; Wikipedia "Mamre" ("4 km north of historical Hebron"; Christian tradition "connects to a tradition from the time of Herod") | verified |
| 0.4 | Gerar pin = Tel Haror, "usual site", not certain | places.json a3f5814; Wikipedia "Gerar" ("Most commentators see the mound of Tel Haror … as representing the ancient Gerar"; alternatives listed) | verified |
| 0.5 | Beersheba pin = Tel Be'er Sheva, east of the modern city, usually identified with biblical Beersheba | places.json a075d61; Wikipedia "Tel Be'er Sheva" ("east of modern Beersheba"; "believed to be the site of … Beer-sheba") | verified |
| 0.6 | Moriah pin = Temple Mount, labelled "traditional site" | places.json adaf385; 2 Chronicles 3:1; Rashi on 22:2 | verified |
| 0.7 | Sodom, Gomorrah not pinned; no Sodom spot | places.json a0aa664, aa572e2 (latitude null) | verified |

## Cards

| Card | Claim | Source | Verdict |
|---|---|---|---|
| 1 | God appears by the terebinths of Mamre; Abraham sits at the tent entrance as the day grew hot | 18:1 | verified |
| 1 | He looks up, sees three figures, runs to greet them | 18:2 (JPS "three figures") | verified |
| 1 | Offers water to bathe their feet and a little bread | 18:4–5 ("a little water", "a morsel of bread") | verified |
| 1 | Hurries Sarah to bake cakes | 18:6 | verified. **Fixed**: draft said he set cakes before them; 18:8 lists only curds, milk and the calf as served |
| 1 | Sets curds, milk and a tender calf before them; waits on them under the tree as they eat | 18:7–8 | verified |
| 1 note | Rashi on 18:1 (Bava Metzia 86b): God came to visit the sick, third day after the circumcision | Rashi on 18:1 | verified |
| 1 note | Circumcision in 17:24–26 | Genesis 17:24–26 | verified |
| 1 note | Shabbat 127a: hospitality is greater than receiving the Divine Presence, learned from 18:3 (Abraham asked God to wait) | Shabbat 127a (Rav Yehuda in the name of Rav) | verified |
| 1 note | The Torah calls them men (18:2); two are called angels in 19:1 | 18:2 אֲנָשִׁים; 19:1 "The two angels" | verified |
| 2 | "Where is your wife Sarah?" | 18:9 | verified |
| 2 | One says she will have a son by this time next year | 18:10 ("I will return to you next year… your wife Sarah shall have a son"), 18:14 ("at the same season next year") | verified |
| 2 | Sarah, listening at the tent entrance, laughs to herself; she and Abraham are old | 18:10–12 | verified |
| 2 | God asks Abraham why she laughed: "Is anything too wondrous for GOD?" | 18:13–14 | verified (JPS wording) |
| 2 note | "Laugh" is צחק; Isaac, Yitzḥak, comes from it | JPS note on 17:19 ("Heb. Yiṣḥaq, from ṣaḥaq, 'laugh'") | verified |
| 2 note | Abraham laughed too when first told | 17:17 | verified |
| 3 | Visitors set out and look down toward Sodom | 18:16 | verified |
| 3 | God tells Abraham of the outcry against Sodom and Gomorrah | 18:20–21 | verified (wording per Genesis fact-check fix) |
| 3 | "Will You sweep away the innocent along with the guilty?" | 18:23 | verified (JPS) |
| 3 title | "Shall not the Judge of all the earth deal justly?" | 18:25 | verified (JPS) |
| 3 note | Cities of the Plain in the plain of the Jordan (13:10); Valley of Siddim "now the Dead Sea" (14:3) | 13:10; 14:3 | verified |
| 4 | Fifty, forty-five, forty, thirty, twenty, ten, with the quoted asks | 18:24, 28, 29, 30, 31, 32 | verified (each quote JPS) |
| 4 | Hebrew numbers חֲמִשִּׁים, אַרְבָּעִים וַחֲמִשָּׁה, אַרְבָּעִים, שְׁלֹשִׁים, עֶשְׂרִים, עֲשָׂרָה | 18:24, 28, 29, 30, 31, 32 Hebrew | verified |
| 4 | Each time, God agrees | 18:26, 28, 29, 30, 31, 32 | verified. **Fixed**: draft said "the answer is yes" |
| 4 note | "but dust and ashes" | 18:27 | verified |
| 4 note | Rashi on 18:32 (Bereshit Rabbah 49:13): eight in Noah's generation could not save it | Rashi on 18:32 | verified |
| 5 | Two angels reach Sodom in the evening; Lot takes them into his house | 19:1–3 | verified |
| 5 | That night the men of the city surround it | 19:4 | verified |
| 5 | At dawn the angels lead Lot, his wife and two daughters out | 19:15–16 | verified |
| 5 | Sulfurous fire rains on Sodom and Gomorrah | 19:24 | verified |
| 5 | Lot's wife looks back and becomes a pillar of salt | 19:26 | verified |
| 5 | Next morning Abraham looks toward the Plain, sees smoke rising like the smoke of a kiln | 19:27–28 | verified |
| 5 note | Little town spared, called Zoar | 19:20–23 | verified |
| 5 note | God was mindful of Abraham and removed Lot from the upheaval | 19:29 | verified |
| 5 note | Southern theory: Early Bronze Age ruins near the south-east of the Dead Sea, such as Bab edh-Dhra; northern: Tall el-Hammam, north-east of the Dead Sea; neither accepted as proven | Wikipedia "Bab edh-Dhra" (EB, near the Dead Sea, "Other archaeologists disagree"); "Tall el-Hammam" (12.6 km NE of the Dead Sea; identification rejected by mainstream); "Sodom and Gomorrah" ("archaeological evidence is inconclusive") | verified. **Fixed**: "by the south-east shore" softened to "near the south-east of" |
| 5 note | Chapter ends with Lot and daughters in a cave; births of Moab and Ben-ammi, fathers of the Moabites and Ammonites | 19:30, 37–38 | verified (told without the details, for a family audience) |
| 5 note | Abraham looked from "the place where he had stood before God" | 19:27 | verified |
| 6 | Abraham moves to the Negeb, stays for a time in Gerar | 20:1 | verified |
| 6 | Says of Sarah "She is my sister"; King Abimelech has her brought to him | 20:2 | verified |
| 6 | God warns Abimelech in a dream | 20:3 | verified |
| 6 | He returns Sarah to Abraham, with gifts of sheep, oxen and servants | 20:14 | verified. **Fixed**: draft implied the gifts went with Sarah |
| 6 | Abraham prays for him | 20:17 | verified |
| 6 note | In Egypt he had asked Sarah to say the same | 12:13 ("Please say that you are my sister") | verified. **Fixed**: draft said Abraham "had said the same" |
| 6 note | Sarah his father's daughter, not his mother's | 20:12 | verified |
| 6 note | God calls Abraham a prophet who will pray for Abimelech | 20:7 | verified |
| 6 note | Between Kadesh and Shur | 20:1 | verified |
| 7 | Abraham was 100 when Isaac was born | 21:5 (quoted, JPS) | verified |
| 7 | 75 when he left Haran; 99 when his name changed | 12:4; 17:1–5 | verified |
| 7 | Tokens: ע״ה = 75, צ״ט = 99, ק׳ = 100 | Hebrew numerals (ע 70 + ה 5; צ 90 + ט 9; ק 100) | verified |
| 7 note | Sarah was 90 | 17:17 | verified |
| 8 | Just as God promised, Sarah bears Abraham a son | 21:1–2 | verified |
| 8 | Abraham names him Isaac, circumcises him at eight days | 21:3–4 | verified |
| 8 | "God has brought me laughter; everyone who hears will laugh with me." | 21:6 | verified (JPS) |
| 8 note | God had told him to name him Isaac | 17:19 | verified |
| 8 note | Great feast on the day Isaac was weaned | 21:8 | verified |
| 8 note | Birthplace not stated; last place named Gerar; lived in land of the Philistines a long time | 20:1; 21:34 | verified |
| 9 | Sarah sees Hagar's son playing, tells Abraham to send them away | 21:9–10 | verified |
| 9 | Name Ishmael | 16:15 (ch. 21 doesn't use it; the note says so) | verified. **Fixed**: added the note |
| 9 | Abraham deeply distressed; God: listen to Sarah; a nation of Ishmael too | 21:11–13 | verified |
| 9 | Wilderness of Beersheba; water runs out; Hagar weeps | 21:14–16 | verified |
| 9 | God hears the boy's cry; Hagar sees a well of water | 21:17, 19 | verified |
| 9 note | Bread and a skin of water; angel of God calls from heaven, "Fear not"; Ishmael in the wilderness of Paran, a bowman | 21:14, 17, 20–21 | verified |
| 9 note | The Torah uses the name Beersheba before telling how it got it | 21:14 vs 21:31 | verified |
| 10 | Abimelech and Phicol, his army chief, ask for a pact | 21:22–23 | verified |
| 10 | Seven ewes as proof he dug the well; the two swear an oath | 21:28–31 | verified |
| 10 | Place called Beersheba; tamarisk; calls on the name of the Everlasting God | 21:31, 33 | verified |
| 10 note | Beersheba = "well of seven" or "well of oath" | JPS note on 21:31 | verified |
| 10 note | Rashi on 21:33 (Sotah 10a): אֵשֶׁל an orchard for guests, or an inn | Rashi on 21:33 | verified |
| 10 note | Abraham complained the servants seized the well | 21:25 | verified |
| 11 | God puts Abraham to the test; "Abraham." "Here I am." | 22:1 | verified |
| 11 | "Take your son, your favored one, Isaac, whom you love," to the land of Moriah, burnt offering | 22:2 (JPS) | verified |
| 11 | Early next morning, sets out with Isaac and two servants | 22:3 | verified |
| 11 | On the third day sees the place from afar | 22:4 | verified |
| 11 note | Rashi on 22:2 (Bereshit Rabbah 56:8): "bring him up", not "slay him"; God did not desire that he slay him | Rashi on 22:2 | verified |
| 11 note | Rashi on 25:20, following Seder Olam, counts Isaac 37 | Rashi on 25:20 | verified (an age, not a date; the date bar is untouched) |
| 11 note | 2 Chronicles 3:1: Solomon built the Temple on Mount Moriah; Rashi on 22:2: the land of Moriah is Jerusalem | 2 Chr 3:1 (JPS "the House of GOD in Jerusalem on Mount Moriah"); Rashi on 22:2 | verified |
| 11 note | Departure point not stated; line starts at Beersheba, last place named (21:33) | 21:33–34; 22:1–3 | verified |
| 12 | "And the two of them walked on together." / וַיֵּלְכוּ שְׁנֵיהֶם יַחְדָּו | 22:8 (JPS, Hebrew) | verified |
| 12 | Isaac: "Where is the sheep for the burnt offering?"; Abraham: "It is God who will see to the sheep for this burnt offering, my son." | 22:7–8 | verified |
| 12 | Rashi: "with the same ready heart" | Rashi on 22:8 (Rosenbaum–Silbermann; Hebrew בְּלֵב שָׁוֶה) | verified |
| 12 note | Same Hebrew words twice (22:6, 22:8); JPS renders 22:6 "and the two walked off together" | 22:6, 22:8 | verified. **Fixed**: draft said "the same words" (English differs) |
| 12 note | Rashi reads the answer as hinting "my son" would be the offering if there were no sheep; though Isaac understood, they went on together | Rashi on 22:8 (Hebrew ואף על פי שהבין יצחק שהוא הולך להשחט) | verified |
| 13 | Builds an altar, lays out the wood, binds Isaac and lays him on the altar | 22:9 | verified. **Fixed**: draft "binds Isaac upon it" |
| 13 | As he takes up the knife, an angel of God calls from heaven, "Abraham! Abraham!" | 22:10–11 | verified |
| 13 | "Do not raise your hand against the boy." | 22:12 | verified (JPS) |
| 13 | Ram caught in a thicket by its horns, offered in place of his son | 22:13 | verified |
| 13 note | "now I know that you fear God" | 22:12 | verified |
| 13 note | Adonai-yireh, "GOD will see" | 22:14 and JPS note | verified (transliteration only; the Hebrew with the Tetragrammaton is not shown) |
| 13 note | The Talmud calls it עֲקֵידַת יִצְחָק (Rosh Hashanah 16a), from וַיַּעֲקֹד "he bound" (22:9) | RH 16a Hebrew; 22:9 Hebrew | verified |
| 14 | Angel calls a second time; descendants as the stars of heaven and the sands on the seashore; because he did not withhold his son | 22:15–17 | verified |
| 14 | Returns to his servants; they set out together for Beersheba, where he stays | 22:19 | verified |
| 14 note | Nahor has sons; Bethuel father of Rebekah | 22:20–23 | verified. **Fixed**: removed "news from far away" (not in the text) |
| 14 note | Her story is next week's parsha, Chayei Sarah | parshaList.json (Chayei Sarah, Genesis 23–25:18); Genesis 24 | verified |
| 15 | "Sound a blast before Me with a shofar made from a ram's horn, so that I will remember for you the binding of Isaac" | Rosh Hashanah 16a (Davidson), Rabbi Abbahu | verified (shortened; note gives the rest) |
| 15 | Hebrew שֶׁאֶזְכּוֹר לָכֶם עֲקֵידַת יִצְחָק | RH 16a vocalized text | verified (the note says the Hebrew is the last words) |
| 15 | Second day of Rosh Hashanah reads Genesis 22; first day Genesis 21 | Megillah 31a | verified |
| 16 | Talk: Abraham spoke up for the people of Sodom; quote 18:25 | 18:23–25 | verified |
| 16 note | Pins are usual/traditional identifications; Sodom and Gomorrah unpinned; Beersheba is stops 3 and 5; roads unknown | as 0.3–0.7 | verified |

## Questions

| Audience | Claim | Source | Verdict |
|---|---|---|---|
| Kids | Abraham ran to bring water, bread and a meal to three strangers on a hot day | 18:1–8 | verified |
| Everyone | as card 16 | 18:23–25 | verified |
| Deeper | Hebrew "and the two of them walked on together" twice, before and after Isaac's question; Rashi "with the same ready heart" | 22:6–8; Rashi on 22:8 | verified |

## Not claimed, on purpose

- No Sodom, Gomorrah or Zoar pin (Zoar's pinned Byzantine site would imply the southern theory).
- No date other than the automatic traditional date bar (c. 1713 BCE, Isaac born).
- No depiction of God or angels; the Tetragrammaton appears in no Hebrew line.
- The retracted Tall el-Hammam airburst study is not mentioned.

## Unverified

Nothing left unverified. The parsha-fact-check workflow (`.claude/workflows/parsha-fact-check.js`) was not run by this agent; it should be run before Myron's review, per `story-authoring.md` step 5.
