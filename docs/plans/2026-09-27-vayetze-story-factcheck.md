# Vayetze story: self fact-check

Story: `src/redesign/stories/vayetze.ts` (Genesis 28:10 – 32:3), 23 cards. Checked 2026-09-27 by the author, before review.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.28.10-32.3`): English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah. Cross-references fetched the same way: Genesis 22:4 (via Rashi), 27:35, 27:43–45, 28:2, 28:9, 35:16–19. Rashi = Rosenbaum–Silbermann (Sefaria) on 28:10, 11, 12, 13, 17, 21; 29:11, 17, 25; 30:21; 31:7, 19, 32; 32:2, 3. Kitzur Baal HaTurim on 28:10 = Sefaria ("On Your Way", Hebrew). Talmud and Midrash passages (Chullin 91b, Megillah 13b, Berakhot 60a, Bereshit Rabbah 68:12, 74:3, 74:9, Pirkei DeRabbi Eliezer 35) are cited only as Rashi cites them, and the story says so. Site identifications = Wikipedia ("Bethel", "Harran", "Mahanaim", "Tulul adh-Dhahab", "Mizpah in Gilead (Genesis)") and `src/data/places.json`. Large/small letters = Hebrew Wikipedia, "אותיות גדולות וקטנות בתנ"ך".

**Verse numbering.** Hebrew (Sefaria, `seferiaUrl`) numbering throughout: the parsha ends at 32:3; Hebrew 32:1 = 31:55 in many English Bibles (JPS footnote on 32:1). Said on card 21.

**Read tab respected** (`parshaList.json` vayetze): "ladder — or stairway"; Leah brought in the evening, discovered in the morning; eleven sons and a daughter, Benjamin next portion; the Torah never says why Rachel took the terafim; no Nuzi claims.

**Verdicts:** ✅ verified against the source named. No claim is left unverified.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Route Beersheba → Bethel → Haran → Mizpah → Mahanaim, in that order | 28:10, 28:19, 29:4, 31:21–25, 31:49, 32:3 | ✅ |
| Beersheba pin = Tel Be'er Sheva, usual identification | places.json a075d61 [34.8408, 31.2447]; same pin and wording as Toldot/Vayera (Wikipedia "Tel Be'er Sheva") | ✅ |
| Bethel pin = Beitin, "usual site"; "most scholars identify Bethel with … Beitin", north of Jerusalem | places.json a64f355 [35.2414, 31.9228]; Wikipedia "Bethel" ("Most scholars identify Bethel with the modern-day village of Beitin", coordinates 31.9226, 35.245) | ✅ |
| Luz shares the Bethel pin | places.json a397042 (same coordinates, "another name for Bethel") | ✅ |
| Haran pin = Harran, southern Turkey, usual identification | places.json a6d9af3 ("Harran"); Wikipedia "Harran" (36.871, 39.025) | ✅ |
| Mizpah (the heap, 31:47–49): site unknown, pin illustrative | places.json a694ea2 "Mizpah 4", type "stone heap", confidence low; Wikipedia "Mizpah in Gilead (Genesis)" gives no location | ✅ |
| Laban caught up where the mound was built | 31:25 (Jacob's tent "on the Height"), 31:46 (meal by the mound), 31:54 (sacrifice and night "on the Height"); story says the verses don't say where in Gilead | ✅ |
| Gilead is a region east of the Jordan | places.json ae73b90 type "region"; Wikipedia "Mahanaim" ("beyond the Jordan River"); Gilead not pinned in the story (its gazetteer pin sits on Mahanaim) | ✅ |
| Mahanaim pin = Tell edh-Dhahab el-Gharbi on the Jabbok; site uncertain; one of two proposals | places.json ae5bfe9 [35.6867, 32.1858] "Tell edh Dhahab el Gharbi"; Wikipedia "Mahanaim" ("two possible sites … precise location … uncertain. Tell edh-Dhahab el-Gharbi … is one proposed identification"); "Tulul adh-Dhahab" (32.1856, 35.6866; on the Zarqa, the biblical Jabbok) | ✅ |
| Euphrates crossing point not stated; no crossing marked | 31:21 (Hebrew הַנָּהָר "the River"; JPS "the Euphrates") | ✅ |
| All places used are linked to vayetze in places.json | `check:stories --strict` 0 warnings | ✅ |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Vayetze, tagline "A dream, a family, a flight.", range 28:10 – 32:3 | parshaList.json; checker | ✅ |
| 1 | Jacob leaves Beer-sheba for Haran | 28:10 (JPS "Jacob left Beer-sheba, and set out for Haran") | ✅ |
| 1 | Mother: flee to Haran, to her brother Laban, until Esau's fury subsides | 27:43–44 (JPS) | ✅ |
| 1 | Father sent him to take a wife from Laban's daughters | 28:2 (JPS "take a wife there from among the daughters of Laban") | ✅ |
| 1 note | Rashi on 28:10: departure of a righteous person makes an impression; glory, splendor, beauty leave | Rashi on 28:10 | ✅ |
| 1 note | No paragraph break in the parsha: the Masoretic text has {ס} after 28:9 and the next break {פ} after 32:3 | Sefaria Miqra according to the Masorah, 28:9 and 28:10–32:3 (grep: no {ס}/{פ} before 32:3) | ✅ |
| 1 note | Kitzur Baal HaTurim on 28:10: reason, he left in secret and fled in hiding | Kitzur Baal HaTurim on 28:10 ("י"א שפרשה זו סתומה … לפי שיצא בסתר וברח בהחבא") | ✅ |
| 2 | "a certain place"; stopped for the night because the sun had set; "Taking one of the stones of that place, he put it under his head and lay down" | 28:11 (JPS) | ✅ |
| 2 note | Hebrew "from the stones of the place" (מֵאַבְנֵי הַמָּקוֹם); morning: "the stone" | 28:11, 28:18 (Hebrew) | ✅ |
| 2 note | Rashi on 28:11: stones arranged around his head against wild beasts; stones quarreled, God made them one (Chullin 91b) | Rashi on 28:11 | ✅ |
| 2 note | Rashi on 28:11: "the place" = Mount Moriah (22:4); Rabbis read the verb as prayer, Jacob began the evening prayer | Rashi on 28:11 | ✅ |
| 2 note | Place named only later: Bethel, once Luz | 28:19 | ✅ |
| 3 | Quote: "A stairway was set on the ground and its top reached to the sky, and angels of God were going up and down on it." | 28:12 (JPS) | ✅ |
| 3 | God beside him; "I am with you… and will bring you back to this land." | 28:13, 28:15 (JPS; ellipsis omits "I will protect you wherever you go") | ✅ |
| 3 note | סֻלָּם often "ladder"; JPS "stairway", note "Or 'ramp'"; "angels" lit. "messengers" | 28:12 JPS footnotes | ✅ |
| 3 note | Rashi on 28:12: up first, then down; angels of the Land went up, angels for outside came down (Bereshit Rabbah 68:12) | Rashi on 28:12 | ✅ |
| 3 note | Rashi on 28:13: "stood above him" to guard him | Rashi on 28:13 | ✅ |
| 3 note | Promise of the land he lies on and offspring as the dust of the earth | 28:13–14 (JPS) | ✅ |
| 3 note | The stars are illustrative: the sun had set and he stayed the night, but no sky is described | 28:11 ("stopped there for the night, for the sun had set") | ✅ |
| 4 | Quote card (moved before the pillar card, verse order): "Surely GOD is present in this place, and I did not know it!"; "Shaken"; quote of 28:17 (JPS) and Hebrew (cantillation removed, vowels kept) | 28:16–17 (JPS, Masorah) | ✅ |
| 4 | Rashi on 28:17: gateway = a place of prayer where prayers ascend to heaven (Pirkei DeRabbi Eliezer 35) | Rashi on 28:17 | ✅ |
| 4 note | "GOD" = JPS GSE rendering of the four-letter name; Rashi's reading from Pirkei DeRabbi Eliezer 35 | JPS text; Rashi on 28:17 | ✅ |
| 5 | Pillar card: early morning; stone under his head set up as a pillar; oil on top; named Bethel; previously Luz | 28:18–19 (JPS) | ✅ |
| 5 note | "House of God" = JPS note on Bethel | 28:19 footnote | ✅ |
| 5 note | Rashi on 28:17: Mount Moriah (the site of the Temple) moved to meet Jacob at Luz; this is the "shrinking" of Chullin 91b. A passage marked as from a corrected Rashi text: this Bethel not the one near Ai but one near Jerusalem | Rashi on 28:17 ("Mount Moriah was forcibly removed from its locality and came hither (to Luz) … the site of the Temple came towards him as far as Bethel"; "This Bethel is not the Bethel that is near Ai … (To here from 'This Bethel' is to be found in a certain correct Rashi-text)") | ✅ |
| 6 | Vow: if God remains with him, protects him on this journey, bread to eat and clothing to wear, returns safe to his father's house; this stone God's abode; a tithe of all God gives him | 28:20–22 (JPS) | ✅ |
| 6 note | "the ETERNAL shall be my God": JPS reads it as the promise; Rashi on 28:21 as part of the condition (God's name rest on him, no unworthy one among his descendants) | 28:21 (JPS punctuation); Rashi on 28:21 ("AND IF THE LORD WILL BE MY GOD, in that His Name shall rest upon me … no unworthy person … in my descendants") | ✅ |
| 7 | Land of the Easterners; well with a large stone on its mouth; shepherds from Haran; know Laban; Rachel comes with her father's flock; Jacob rolls the stone off, waters the flock, kisses Rachel, weeps | 29:1–11 (JPS) | ✅ |
| 7 note | Stone rolled only once all flocks gathered | 29:3, 29:8 | ✅ |
| 7 note | Well's location not given beyond its shepherds being from Haran | 29:1–4 | ✅ |
| 7 note | Rashi on 29:11: wept because Rachel would not be buried with him; because he came empty-handed | Rashi on 29:11 | ✅ |
| 8 | Laban runs to greet his sister's son, takes him home; after a month asks his wages; Jacob loves Rachel, the younger; seven years; "they seemed to him but a few days because of his love for her" | 29:13–20 (JPS) | ✅ |
| 8 note | Leah older, Rachel younger; JPS "Leah had weak eyes" | 29:16–17 (JPS) | ✅ |
| 8 note | Rashi on 29:17: rakkot "tender", from weeping; people said older daughter for older son (Esau) | Rashi on 29:17 | ✅ |
| 9 | Guess: whom Laban brings in the evening → Leah | 29:22–23, 29:25 (JPS "When morning came, there was Leah!") | ✅ |
| 9 note | Zilpah, Laban's maidservant, given to Leah | 29:24 | ✅ |
| 10 | "It is not the practice in our place to marry off the younger before the older"; after the bridal week Rachel given as wife; another seven years; loved Rachel more than Leah | 29:26–30 (JPS). Order: Rachel given after the week, then the seven years (29:28, 30) | ✅ |
| 10 note | Zilpah to Leah, Bilhah to Rachel | 29:24, 29:29 | ✅ |
| 10 note | Rashi on 29:25 (Megillah 13b): secret signs; Rachel gave them to Leah so she would not be put to shame | Rashi on 29:25 | ✅ |
| 11 | GOD sees Leah unloved, opens her womb; Rachel infertile; "Give me children, or I shall die"; Rachel gives Bilhah; Leah later gives Zilpah | 29:31, 30:1–4, 30:9 (JPS) | ✅ |
| 11 note | Every name explained except Dinah's | 29:32–35, 30:6, 8, 11, 13, 18, 20, 21, 24 | ✅ |
| 12 | Reuben (Leah) "GOD has seen my affliction"; Simeon "GOD heard that I was unloved"; Levi "This time my husband will become attached to me"; Judah "This time I will praise GOD" | 29:32–35 (JPS) | ✅ |
| 12 | Dan (Bilhah) Rachel: "God has vindicated me"; Naphtali (Bilhah) Rachel: "A fateful contest I waged with my sister" | 30:5–8 (JPS) | ✅ |
| 12 note | Words spoken at the birth, JPS; its notes say which Hebrew word each name is "connected with", and explain Reuben as "See a son"; "Now my husband will love me"; Rachel named Bilhah's sons | 29:32 and footnotes ("Reuben Understood as 'See a son'"); 30:6, 30:8 ("she named him") | ✅ |
| 13 | Numbered 7–11 (`numberFrom: 7`), continuing card 12: Gad 7 (Zilpah) Leah: "Luck has come" (qere); Asher 8 (Zilpah) Leah: "What fortune!"; Issachar 9 (Leah) "God has given me my reward"; Zebulun 10 (Leah) "This time my husband will exalt me"; Joseph 11 (Rachel) "May GOD add another son for me". Dinah, the only daughter, unnumbered in Zebulun's row: born after him and before Joseph; no reason given for her name | 30:10–24 (JPS); 30:11 JPS note; Hebrew 30:11 "(בגד) [בָּא גָד]"; order 30:19–24 | ✅ |
| 13 note | Leah named Zilpah's sons | 30:11, 30:13 ("she named him") | ✅ |
| 13 note | Issachar born after the mandrakes exchange | 30:14–18 | ✅ |
| 13 note | Rashi on 30:21 (Berakhot 60a): Leah judged herself; if a son, Rachel not even equal to a maid; prayed; sex changed | Rashi on 30:21 | ✅ |
| 13 note | Benjamin, twelfth son, born next week | 35:16–18 (Vayishlach); eleven sons here: Reuben … Joseph | ✅ |
| 14 | Jacob asks to go home; Laban wants him to stay ("If you will indulge me … GOD has blessed me on your account"); wages the speckled, spotted, dark-colored; same day Laban removes them; peeled rods at the troughs; goats bear streaked, speckled, spotted young; exceedingly prosperous | 30:25–43 (JPS) | ✅ |
| 14 note | Laban left the removed animals with his sons, and put three days' journey between himself and Jacob | 30:35–36 (JPS) | ✅ |
| 14 note | Verses don't explain the rods; dream of the angel, he-goats streaked, speckled, mottled; "for I have noted all that Laban has been doing to you" | 31:10–12 (JPS) | ✅ |
| 15 | Laban's sons' complaint; Laban's manner changed; GOD tells Jacob to return; wages changed "time and again"; "do just as God has told you" | 31:1–16 (JPS) | ✅ |
| 15 note | "Time and again" lit. "ten times" (31:7, 31:41) | JPS footnotes on 31:7 and 31:41 | ✅ |
| 15 note | Rashi on 31:7: מנים a count of tens, a hundred times (Bereshit Rabbah 74:3) | Rashi on 31:7 | ✅ |
| 15 note | "I am the God of Bethel, where you anointed a pillar and where you made a vow to Me" | 31:13 (JPS) | ✅ |
| 16 | Laban away shearing; wives and children on camels; all livestock; to his father Isaac in Canaan; without telling Laban; Rachel stole the terafim; across the Euphrates, toward the hill country of Gilead | 31:17–21 (JPS; Hebrew אֶת־הַתְּרָפִים) | ✅ |
| 16 note | JPS "oracle idols": figurines, apparently of human form, used in divination | 31:19 JPS footnote | ✅ |
| 16 note | Torah gives no reason; Jacob didn't know | 31:19; 31:32 ("Jacob, of course, did not know that Rachel had stolen them") | ✅ |
| 16 note | Rashi on 31:19: to wean her father from idol worship (Bereshit Rabbah 74:5) | Rashi on 31:19 | ✅ |
| 17 | Third day; pursued seven days; caught up in the hill country of Gilead; God's warning in a dream; Laban reproaches the secret flight; "Why did you steal my gods?" | 31:22–30 (JPS) | ✅ |
| 17 note | Not known which side of the Jabbok the mound stood on; Jacob crosses the Jabbok only later; the pin (south of the river) is illustrative | 32:23 (JPS "he crossed the ford of the Jabbok"); places.json a694ea2 [32.1185 N] vs the Zarqa/Jabbok at Tulul adh-Dhahab (32.186 N) | ✅ |
| 18 | Jacob, not knowing, says whoever has the gods shall not live; Laban searches the tents; idols in the camel cushion, Rachel sits on them; cannot rise before him; not found | 31:32–35 (JPS) | ✅ |
| 18 note | Rashi on 31:32: because of this curse Rachel died on the journey (Bereshit Rabbah 74:9) | Rashi on 31:32 | ✅ |
| 18 note | Rachel dies giving birth to Benjamin on the road to Ephrath, next week | 35:16–19 (JPS) | ✅ |
| 19 | Jacob incensed; twenty years; fourteen for two daughters, six for flocks; made good out of his own pocket every animal torn by beasts ("I myself made good the loss"); heat by day, frost by night; wages changed time and again | 31:36–41 (JPS) | ✅ |
| 20 | Laban proposes a pact; Jacob sets up a stone as a pillar; kinsmen gather stones into a mound and eat there; Yegar-sahadutha (Laban), Gal-ed (Jacob); also Mizpah, "May GOD watch between you and me, when we are out of sight of each other" | 31:44–49 (JPS) | ✅ |
| 20 note | Both names = "the mound of witness", Aramaic and Hebrew; Gal-ed reflects Gilead; Mizpah associated with yiṣeph "watch" | JPS footnotes on 31:47, 31:49 | ✅ |
| 20 note | Neither to cross the mound with hostile intent; sacrifice on the Height; night there | 31:52, 31:54 | ✅ |
| 21 | Early morning Laban kisses his family, bids good-by, goes home; angels of God meet Jacob; "This is God's camp"; named Mahanaim | 32:1–3 (JPS, Hebrew numbering) | ✅ |
| 21 note | Hebrew 32:1 = 31:55 in many English Bibles | JPS footnote on 32:1 | ✅ |
| 21 note | Hebrew verb in 32:1 is "blessed" (וַיְבָרֶךְ); JPS "bade them good-by" | 32:1 Hebrew and JPS | ✅ |
| 21 note | JPS: Mahanaim connected with maḥaneh "camp"; Rashi on 32:3: two camps, angels of outside the Land and of the Land (32:2) | 32:3 JPS footnote; Rashi on 32:2, 32:3 | ✅ |
| 22 | Talk card: quotes 28:16 (JPS); "About the map" note | 28:16; map table above | ✅ |
| Q | Kids: seven years felt like a few days | 29:20 | ✅ |
| Q | Deeper: 27:35 "Your brother came with guile" (בְּמִרְמָה); 29:25 "Why did you deceive me?" (רִמִּיתָנִי); same root (ר־מ־ה); younger for older in ch. 27, older for younger in Haran | 27:35, 29:25 (JPS and Hebrew), 29:26 | ✅ |

## Deliberate choices

- **Ladder / stairway.** The stars card quotes JPS ("stairway"); the note gives "ladder" and JPS's "ramp", and the Hebrew סֻלָּם.
- **Stone(s).** Body follows JPS ("one of the stones"); the note gives the Hebrew plural, 28:18's singular and Rashi's midrash, attributed.
- **Terafim.** "Rachel steals" is the verse's own verb (וַתִּגְנֹב, JPS "stole"). No motive is stated as fact; Rashi's is attributed.
- **Ten times.** On screen only "time and again" (JPS); "ten times" and Rashi's "a hundred" are in the note, attributed.
- **Children.** Eleven sons and Dinah, in birth order as narrated; Benjamin flagged as next week. Dinah: "No reason is given"; Rashi's reading only in the note.
- **Ages and years.** None computed. Only the text's own numbers: seven years (29:20, 27), a month (29:14), three days' journey (30:36), third day and seven days (31:22–23), twenty / fourteen / six years (31:38, 41).
- **No `letter` card.** No small or large letter in this parsha appears in the common Masoretic lists. One list, Rabbi Yosef Tov Elem's in Machzor Vitry (per Hebrew Wikipedia), has a large final pe in וּבְהַעֲטִיף (30:42); the other list (Meiri, Kiryat Sefer; Masorah Gedolah) does not. With the lists disagreeing, it is too weak to show as "the scroll writes it large" (not checked against current scribal practice).
- **No `name` card.** Luz → Bethel is a place renaming written as two words (בֵּית־אֵל); Jacob → Israel is next week.
- **No Euphrates pin.** The gazetteer's Euphrates pin is at Carchemish, which the verse doesn't imply; the crossing point is unknown.
- **Divine names in Hebrew.** The quote card uses 28:17 (אֱלֹהִים, as Bereshit does) rather than 28:16, which has the four-letter name.

## Independent fact-check (workflow wf_b44fdf5b-6e8)

345 claims checked, 306 verified. Each finding and what was done (card numbers are the new ones: the 28:16–17 quote is now card 4, the pillar card 5):

| Finding | What it said | Done |
|---|---|---|
| c019 | Route tag showed on card 5 with no line on screen | Applied via c264: the quote card's camera now frames the Bethel pin and the line. The rest describes the app, not the story |
| c021 | Leg-fit happens on cards 2, 7, 21 only | Not needed: describes app behaviour; no story claim depends on it |
| c022 / c061 | Stars card had no stop badge, and the sky hides the pin | Out of scope: app fix on `lane/name-letter-cards` (stars cards now show the badge; seen on card 3) |
| c059 | Note said the verses say "only" that the sun had set | Applied: "the verses say the sun had set and he stayed the night (28:11), but describe no sky" |
| c072 | Rashi on 28:17 misattributed: "not near Ai but near Jerusalem" is a passage from a corrected Rashi text; his main comment moves Moriah to Luz | Applied, after re-reading Rashi on 28:17 (Rosenbaum–Silbermann) |
| c079 | Quote of 28:17 came after the pillar card (28:18–19) | Applied: the quote card moved before the pillar card and now carries 28:16 too (ref 28:16–17); the pillar card is "A pillar at Bethel", ref 28:18–19 |
| c140 | JPS explains Reuben as "See a son", not "connected with" | Applied |
| c166 | The three days' journey is between Laban and Jacob, not where the animals were | Applied (30:35–36) |
| c193 / c254 | Merged overview pins sat at Beersheba | Out of scope: app fix on the lane (pins now at their centroid; seen on cards 16 and 22) |
| c219 | "He paid himself" reversed 31:39 | Applied: "He made good out of his own pocket every animal torn by beasts" |
| c264 (+ missed) | Card 5's camera left Bethel off-screen | Applied: quote card camera now centered north of Bethel so the pin sits between the Hebrew and the card |
| Missed: numbering | Card 13 restarted at 1 | Applied: `numberFrom: 7`. Dinah is no longer a numbered row: she is mentioned in Zebulun's row (born after him, before Joseph), so the numbers are sons only (Gad 7 … Joseph 11). Order checked against 29:32–30:24 |
| Missed: guess stop | Guess card had `stop: 3`, which has no effect while pins are hidden | Applied: removed |
| Missed: Mizpah vs Jabbok | The pin is south of the Jabbok, but Jacob crosses it only afterwards (32:23) | Applied: Laban-gives-chase note says the side of the Jabbok isn't known and the pin is illustrative; 32:23 added to sources |
| Missed: card 14 "removes them all" | Optional | Not needed: the finding itself says it is close enough to 30:35 |
| Missed: Rashi on 28:17, Jacob had reached Haran and turned back | Not an error | Not needed: the note now gives Rashi's main comment (Moriah moved to Luz) |
| Missed: Euphrates dot at Carchemish on the Map tab | places.json data | Out of scope: reported by the coordinator; not changed |
| R5–R77, parshaList / timeline / parshaDates / Screens / MapChrome items | Read-tab data | Out of scope for this lane: not edited |

## Second pass (workflow wf_d1178d60-9c9)

243 claims checked, 213 verified. Rebased on `lane/name-letter-cards` (a merged overview pin now sits on its first stop).

**Map change.** Mizpah is no longer a numbered stop. The route is Beersheba → Bethel → Haran → Mahanaim (4 stops). The mound is an unnumbered spot "Gal-ed / Mizpah (site unknown)", `place` a694ea2, at [35.8708, 32.3369]. The spot's note says it differs from the gazetteer's pin on purpose, and why. Why the move:
- The gazetteer pin (32.119 N) lies south of the Zarqa (the Jabbok), which runs at about 32.19 N here (Wikipedia "Zarqa River" 32.19 N, 35.80 E; "King Talal Dam" 32.19 N).
- Mahanaim's pin (Tell edh-Dhahab el-Gharbi) is on the north side of the Zarqa's meander (Wikipedia "Tulul adh-Dhahab").
- Jacob crosses the Jabbok only in 32:23 ("he crossed the ford of the Jabbok", JPS), so the old line crossed twice.

The new point:
- It is in the hills of Gilead: Wikipedia "Gilead" puts the region in the Irbid, Ajloun, Jerash and Balqa governorates. It is about 6 km north-west of Jerash (32.28 N, 35.90 E) and some 16 km north of the river.
- It lies on the drawn Haran → Mahanaim arc at `routeTo` 2.96 (computed from DaylightMap's `arc`, bow 0.14), so the head of the line ends on the spot.
- The flight card and all four Gilead cards use `routeTo` 2.96. The Mahanaim card is stop 4 with `routeTo` 3.

Option (a), moving the numbered stop, was not clearly right. The river runs about 8 km north of the a694ea2 pin, so a stop kept within the checker's 10 km could sit only a kilometre or two north of the bank, not clearly in the hills. So option (b) was taken.

| Finding | What it said | Done |
|---|---|---|
| c127 / c149 / missed (history, visual) | Mizpah pin south of the Jabbok; route crosses it twice before 32:23 | Applied as option (b), above. Card 17's note now says the spot is drawn north of the river because Jacob crosses the Jabbok only later (32:23), that it is illustrative and differs from the Map tab's Mizpah pin, and that the line stops short of Mahanaim. Card 21's note says the verses tell of one crossing of the Jabbok, after Mahanaim. Screenshots 16–22 checked |
| c128 | Name the mound as the text does | Applied: the spot is "Gal-ed / Mizpah (site unknown)" (31:47–49) |
| c35 | 28:12 does mention the sky | Applied: "but mention no stars" |
| c47 | "Corrected" Rashi text | Applied: "marked as found in an accurate Rashi text (עַ״כַּ פֵּרַשִׁ״י מְדֻיָּק)", checked against the Sefaria Hebrew of Rashi on 28:17 |
| Missed: Rashi "I say" | Rashi frames the Moriah point as his own suggestion | Applied: "Rashi on 28:17 suggests (“I say”)…", checked against the Hebrew (אֲנִי אוֹמֵר שֶׁנֶּעֱקַר הַר הַמּוֹרִיָה) |
| c90 | "Only daughter" is loaded (37:35, 46:7 mention daughters) | Applied: "Dinah, the only daughter the Torah names" |
| Missed: Kitzur Baal HaTurim | Introduced with י״א, "some say" | Applied: "brings a reason some give (י״א)", checked against Sefaria |
| c152 / c156 / missed (finale) | "One of two proposals" is wrong; the finale merges pins | Applied. Mahanaim's hedge and notes say "one of several proposed sites": OpenBible.info lists six possible identifications (Tell edh-Dhahab el-Gharbi 65%, the rest under 10%). Wikipedia says "two possible sites", so "several" covers both. The talk note says stops close together share one pin, drawn on the first of them (1·2·4 on Beersheba, confirmed in the card 22 screenshot); each stop's card shows its own pin; the mound isn't shown in the finale |
| Missed: card 3 / 15 "GOD" may be an angel (JPS notes) | Optional | Not needed: the text matches JPS |
| c48, c73, c118, c119, c156 | Descriptions only | Not needed |
| R*, parshaList, parshaDates, Luz confidence (places.json), Screens, MapChrome, timeline | Read-tab and gazetteer data | Out of scope for this lane: not edited |

## Third pass (workflow wf_5829c5d6-62d)

328 claims, 298 verified. Story findings applied (each re-checked on Sefaria):

| Finding | Change |
|---|---|
| c055 | Card 4 note: "GOD" (in some phrases "the ETERNAL") is how JPS renders the four-letter name (28:13, 28:21 use "the ETERNAL") |
| c056 | Rashi on 28:17 names no source for "place of prayer". Now: "A similar reading appears in Pirkei DeRabbi Eliezer 35: the gate of heaven is there, open to hear prayers" (PdRE 35, Friedlander: "the gate of heaven is there, and it is open to hear the prayers of Israel"). Sources entry no longer says "as cited by Rashi" |
| c066 | The "accurate Rashi" marker (עַ״כַּ פֵּרַשִׁ״י מְדֻיָּק) closes the whole long comment, so the "not near Ai" line is no longer singled out: "His comment goes on to say…" |
| c093 | Rashi on 29:17 explains why Leah's eyes were rakkot ("weak" or "tender"); "tender" is the translator's headword, not Rashi's gloss |
| c130 | "the only one of Jacob's daughters the Torah names" |
| c194 | Code comment: about 7 km north-north-west of Jerash |
| Missed, card 3 body | "God, standing beside him (so JPS; Rashi reads “above him”)" (Rashi on 28:13: "stood above him to guard him") |
| Missed, talk camera | Comment: the finale ignores the card camera (fitBounds) |
| c244 / missed, traveller | App fix on `lane/name-letter-cards` (`48c1cc4`): no traveller dot once the line rests on the card's spot, so the hollow Gal-ed ring is the only marker |

Not changed: c241 (description only); optional JPS "may be an angel" note (the text follows JPS); optional merge hint on the finale tag (the talk note explains it); Read-tab, History and date-bar items (outside this lane, reported to Myron).

## Fourth pass (workflow wf_7ea6ae7a-3a8)

307 claims, 273 verified; one claim (c166, "Gilead is a region east of the Jordan") went unchecked by the lenses and was checked by hand against Wikipedia "Gilead". Applied:

| Finding | Change |
|---|---|
| c43 / missed | Card 3 body writes the four-letter name as "GOD", like the rest of the story |
| c68 | "In some texts, his comment goes on to say…" (the passage is marked as found in an accurate Rashi text) |
| c78 | Card 7 note: the verses don't name the well's town; they say it was in the land of the Easterners (29:1) and its shepherds were from Haran (29:4) |
| c126 | "Dinah, the only daughter of Jacob whom the Torah names" |
| c160 / c213 | Cards 16 and 22: where the drawn line meets the Euphrates is not a claim |
| c211 | Finale note: "on a phone, 1·2·4 sits on Beersheba" (clustering depends on screen size) |
| c17 / c20 / missed | App fixes on `lane/name-letter-cards` (`781dbf4`): the traveller shows only while a leg is drawn, so no dot rests in Gilead on card 16; a line that ends between stops is tagged "the line ends at an illustrative point" |

## Fifth pass (workflow wf_d984dfa2-43f)

331 claims, 307 verified. Applied (each checked on Sefaria):

| Finding | Change |
|---|---|
| c147 / c148 / missed | Card 14 no longer casts the removal as cheating: "that same day Laban removes the ones already in the flock and leaves them with his sons". Note: Jacob had proposed setting them apart (30:32); Rashi on 30:32 reads his wages as the ones born from then on. JPS 30:35 does open with "But" |
| c020 | Kitzur Baal HaTurim's "some say … left in secret" is given as its reason for why the parsha has no breaks |
| c164 | Card 16 note: Jacob set out from the pastures, three days' journey from Laban (30:36, 31:22); the line starts at the Haran pin |
| c187 | "no site for it has been identified" (cards 17 and 20) |
| Missed, card 2 | "the verb 'came upon' (vayifga)" |

Not changed: c058 (card 4's camera): the screenshot shows the Bethel pin and its hedge between the Hebrew and the card, so the projected position in the finding was wrong. Optional: Joseph's and Zebulun's second naming phrases (30:20, 30:23); the dream card's pin under the night sky (the stop badge carries the place).

## Sixth pass (workflow wf_cf32c01b-b2b; three lenses re-run after an API outage)

278 claims, 271 verified. No story-card findings. Applied on `lane/name-letter-cards` (`4461b5b` content; app fixes in the commit before it):

| Finding | Change |
|---|---|
| R45 | Read tab: Chullin 91b says only that the angels gazed at Jacob's "image above"; the Throne of Glory is the Targum attributed to Jonathan on 28:12 ("whose likeness is inlaid in the throne of glory") |
| R44 | Edom "which the Rabbis identified with Rome" (not "later tradition") |
| R63 | Teraphim as JPS renders them ("oracle idols"; Laban's "my gods," 31:30) |
| c7 / c8 | Cover brief: the stone's place relative to the stairway and the stars are illustrative |
| Missed, stars card | The route tag now shows on stars cards too |
| Missed, merged pins | Merged overview pins off the finale add "sites uncertain" |

Not changed: R86 (a fading "or later" tail on the date band; the label says "or later"); approximateDateBCE and timeline.json fields the Daylight UI doesn't render; the Map-tab Mizpah pin (places.json).

## Final pass (workflow wf_6b2dc982-d88, 2026-09-28)

309 claims (220 story, 89 Read tab / history), 302 verified, 5 problems, 12 "missed" items. Status INCOMPLETE: C159 and C162 were checked by no lens; both are checked by hand below. Every finding was re-checked against the source named (Sefaria API v3 unless stated). Shared-file proposals: `docs/plans/2026-09-28-vayetze-shared-fixes.md`.

| Finding | Decision | Evidence | Change |
|---|---|---|---|
| C99 card 12 note: JPS notes say which word each name is "connected with" | Accept, modified | JPS notes on 29:32–30:8 say "connected with" for all six names on card 12 (Reuben: "connected with the first part … the end of 'Reuben'"). Zebulun's notes (30:20: "Heb. *zebadani…zebed*"; "Heb. *yizbeleni*") have no "connected with", so the sentence must not read as covering card 13 | "each of these names" |
| C151 card 16 note: Jacob set out from the pastures three days from Laban | Accept (cut) | 30:36 puts the three days between Laban and Jacob when the six years begin; 31:22 says only "On the third day, Laban was told"; 31:4 "to the field, where his flock was" names no place. The three-day gap at the flight is Rashi's reading of 31:22 ("for there was a journey of three days between them"), not the verses' | Sentence replaced by "Where Jacob set out from isn’t said, so the line starts at the Haran pin." (30:36 stays on card 14) |
| C219 header comment: "the ETERNAL" only in "I am the ETERNAL" | Accept (code comment) | JPS 28:13 "I am the ETERNAL"; 28:21 "the ETERNAL shall be my God" | Comment names both. No user-facing change |
| R14 Read tab: "Laban, in turn, deceives Jacob" | Accept, modified | The summary never tells of Jacob's deception, so "in turn" asserts a link the text does not draw (27:35 בְּמִרְמָה, 29:25 רִמִּיתָנִי share a root; the Deeper question asks about the echo) | "Laban deceives Jacob:" (parshaList.json). The checker's longer fix was not taken: it adds an interpretation the Deeper question already raises |
| R46 History tab eyebrow "In history" | Accept → shared fix | Screens.tsx:166; McCarter/Hendel "The Patriarchal Age" on disputed parallels | Shared-fixes §1 |
| Missed: card 14 quotes Rashi on 30:32 but its ref and `sources` don't | Accept | Rashi on 30:32: אוֹתָן שֶׁיִּוָּלְדוּ מִכָּאן וּלְהַבָּא … יִהְיוּ שֶׁלִּי | Ref "Genesis 30:25–43 · Rashi"; 30:32 added to the Rashi line in `sources` |
| Missed: Joseph's and Zebulun's first sayings | Accept | JPS 30:20 "God has given me a choice gift"; 30:23 "God has taken away my disgrace" (note: *ʼasaph*, "connected with 'Joseph'") | Card 13 note adds both, like Reuben's second saying on card 12 |
| Missed: card 1 break types | No change | Sefaria Hebrew: {ס} after 28:9, {פ} after 32:3; the note doesn't name the kinds | — |
| Missed: route tag not shown outside the story | Accept → shared fix | DaylightMap.tsx:417 draws the full route when the story is closed; tag only in StoryPlayer.tsx:219 | Shared-fixes §2 |
| Missed: Luz "medium" vs Bethel "low" at the same point | Accept → shared fix | places.json a397042 / a64f355 | Shared-fixes §3 |
| Missed: Euphrates as one dot | Accept → shared fix | places.json a62dec4 (36.8297 N, 38.015 E); sheet shows its description (MapChrome.tsx:248) | Shared-fixes §4 |
| Missed: finale note "on a phone, 1·2·4 sits on Beersheba" | Accept (cut) | Merging depends on screen size (threshold 34 px, DaylightMap.tsx:406; checker measured 27 px at 390×844, 33 px at 430×932); a merged pin stays on its first stop (line 713) | "stops close together can share one numbered pin, drawn on the first of them"; the phone parenthetical removed |
| Missed: Read tab credits the Throne of Glory only to the Targum | Reject | Chullin 91b Aramaic: עוֹלִין וּמִסְתַּכְּלִין בִּדְיוֹקְנוֹ שֶׁל מַעְלָה, no כסא הכבוד. In the Davidson English, "engraved on the Throne of Glory" is unbolded, i.e. Steinsaltz's explanation, not the Talmud's words. The sixth-pass wording (R45) stands | — |
| Missed: approximateDateBCE 1850–1650 | Accept → shared fix | Unsourced; parshaDates patriarchs 2000–1550 "or later"; shown only in the classic UI (ParshaSelector.tsx:10) | Shared-fixes §6 (all patriarchal parshiot) |
| Missed: timeline.json Execration texts "the earliest" | Shared (not verified here) | Rendered only in the classic UI (PrimarySourcesCard via ContextPanel) | Shared-fixes §7 |
| Missed: date bar "Tradition:" | Accept → shared fix | MapChrome.tsx:49; the date is Seder Olam's (buildParshaDates.mjs `SOR(2)`) | Shared-fixes §5 |
| C159 (unchecked) "Gilead is a region east of the Jordan" | Verified by hand | Wikipedia "Gilead": the mountainous northern part of Transjordan, "bounded in the west by the Jordan River" | — |
| C162 (unchecked) "no site for the mound has been identified" | Modified | OpenBible.info "Mizpah 4" (Galeed): "another name for Mizpah 1 (ancient): 50% confidence. It may be: Jel‘ad, Tall er Rumeith, Khirbet er Rasuni, Suf"; "the modern location is uncertain". Wikipedia "Mizpah in Gilead (Genesis)" gives no location. So sites have been proposed; none is established | Cards 17 and 20: "where that was is unknown" / "where the mound stood is unknown", matching the spot label "(site unknown)" |
