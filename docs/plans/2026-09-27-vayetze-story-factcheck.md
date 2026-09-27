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
| 3 note | Night sky illustrative; the sun had set | 28:11 | ✅ |
| 4 | "Surely GOD is present in this place, and I did not know it!"; early morning; stone under his head set up as a pillar; oil on top; named Bethel; previously Luz | 28:16–19 (JPS) | ✅ |
| 4 note | "GOD" = JPS GSE rendering of the four-letter name; "house of God" = JPS note on Bethel | JPS text; 28:19 footnote | ✅ |
| 4 note | Rashi on 28:17: this Bethel not the one near Ai but near Jerusalem, and was Mount Moriah | Rashi on 28:17 ("This Bethel is not the Bethel that is near Ai … but that which is near Jerusalem … This, too, is Mount Moriah") | ✅ |
| 5 | Quote 28:17 (JPS) and Hebrew (cantillation removed, vowels kept) | 28:17 | ✅ |
| 5 | "Jacob, shaken" | 28:17 JPS "Shaken, he said" | ✅ |
| 5 | Rashi on 28:17: gateway = a place of prayer where prayers ascend to heaven (Pirkei DeRabbi Eliezer 35) | Rashi on 28:17 | ✅ |
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
| 12 note | Words spoken at the birth, JPS; its notes give the connected Hebrew words; Reuben "See a son"; "Now my husband will love me"; Rachel named Bilhah's sons | 29:32 and footnotes; 30:6, 30:8 ("she named him") | ✅ |
| 13 | Gad (Zilpah) Leah: "Luck has come" (qere); Asher (Zilpah) Leah: "What fortune!"; Issachar (Leah) "God has given me my reward"; Zebulun (Leah) "This time my husband will exalt me"; Dinah (Leah) a daughter, no reason; Joseph (Rachel) "May GOD add another son for me" | 30:10–24 (JPS); 30:11 JPS note (kethib begad, qere baʼ gad "luck has come"); Hebrew 30:11 "(בגד) [בָּא גָד]" | ✅ |
| 13 note | Leah named Zilpah's sons | 30:11, 30:13 ("she named him") | ✅ |
| 13 note | Issachar born after the mandrakes exchange | 30:14–18 | ✅ |
| 13 note | Rashi on 30:21 (Berakhot 60a): Leah judged herself; if a son, Rachel not even equal to a maid; prayed; sex changed | Rashi on 30:21 | ✅ |
| 13 note | Benjamin, twelfth son, born next week | 35:16–18 (Vayishlach); eleven sons here: Reuben … Joseph | ✅ |
| 14 | Jacob asks to go home; Laban wants him to stay ("If you will indulge me … GOD has blessed me on your account"); wages the speckled, spotted, dark-colored; same day Laban removes them; peeled rods at the troughs; goats bear streaked, speckled, spotted young; exceedingly prosperous | 30:25–43 (JPS) | ✅ |
| 14 note | Removed animals left with his sons, three days' journey away | 30:35–36 | ✅ |
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
| 18 | Jacob, not knowing, says whoever has the gods shall not live; Laban searches the tents; idols in the camel cushion, Rachel sits on them; cannot rise before him; not found | 31:32–35 (JPS) | ✅ |
| 18 note | Rashi on 31:32: because of this curse Rachel died on the journey (Bereshit Rabbah 74:9) | Rashi on 31:32 | ✅ |
| 18 note | Rachel dies giving birth to Benjamin on the road to Ephrath, next week | 35:16–19 (JPS) | ✅ |
| 19 | Jacob incensed; twenty years; fourteen for two daughters, six for flocks; made good animals torn by beasts; heat by day, frost by night; wages changed time and again | 31:36–41 (JPS) | ✅ |
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
