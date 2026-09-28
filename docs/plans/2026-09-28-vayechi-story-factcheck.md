# Vayechi story: self fact-check

Story: `src/redesign/stories/vayechi.ts` (Genesis 47:28 – 50:26), 20 cards. Checked 2026-09-28 by the author, before review. The fact-check workflow has not been run yet.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.47.28-50.26`) before writing: English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah (cantillation stripped, vowels kept). Cross-references fetched the same way: Genesis 25:25–26, 27:1–4, 27:19, 27:30–35, 35:22, 47:9, 47:27; Exodus 13:19; Joshua 24:32; Jeremiah 31:15. Rashi = Rosenbaum–Silbermann (Sefaria, English and Hebrew) on Genesis 47:28, 47:29, 47:31, 48:7, 48:14, 48:20, 49:1, 50:3, 50:5, 50:10, 50:13, 50:16. Ibn Ezra on 50:10 (Strickman–Silver), Chizkuni on 50:10 (Munk), Bekhor Shor on 50:10, Rashbam on 50:11, Sotah 13a:4–5 (William Davidson) were read but are not cited. Steinsaltz on 50:10–11 (Koren Steinsaltz Tanakh, English and Hebrew) and Shadal on 50:10 (1st edition, Hebrew). Siddur Ashkenaz, Shabbat Evening, Blessing the Children (Metsudah, English and Hebrew). Sites = Wikipedia REST summaries ("Cave of the Patriarchs", "Land of Goshen", "Mamre", "Jordan River") and `src/data/places.json`.

**Read tab respected** (`parshaList.json` vayechi): 17 years in Egypt, 147 at death, Joseph 110; the parsha is "closed" (Rashi on 47:28, from Genesis Rabbah); embalming 40 days, mourning 70 (50:3); "God make you like Ephraim and Manasseh" spoken by parents on Friday night; the Hebrew of Joseph's blessing is uncertain; Joseph's bones taken by Moses (Exodus 13:19).

**Verdicts:** ✅ verified against the source named. ⚠️ verified, with a caveat stated. No claim is left unverified.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Two stops: Goshen, then the cave of Machpelah | 47:27 and 50:8 (Goshen); 50:13 (Machpelah) | ✅ |
| Goshen pin (a60f092) is an illustrative point in a region of the eastern Nile Delta whose extent is uncertain | places.json [31.834, 30.799] "exact extent uncertain", confidence low; Wikipedia "Land of Goshen" ("believed to have been located in the eastern Nile Delta") | ⚠️ hedge "a region; extent uncertain" |
| Goshen lit only on 47:27–28 and 50:4–9 | 47:27 "Israel settled … in the region of Goshen"; 50:8 children, flocks and herds "left in the region of Goshen" | ✅ |
| All other Egypt cards: no pin lit; the verses say only "in Egypt" | 47:28–29, 48:5, 50:14, 50:22, 50:26 | ✅ said in each note |
| Machpelah pin (ae00861) = Cave of the Patriarchs, Old City of Hebron, its traditional site | places.json [35.1108, 31.5247]; Wikipedia "Cave of the Patriarchs" (31.5247, 35.1107; "known to Jews by its Biblical name Cave of Machpelah") | ⚠️ hedge "traditional site: Hebron" |
| Mamre's site uncertain; not marked | Wikipedia "Mamre" (four candidate sites near Hebron); places.json aeb9e97 confidence low | ✅ |
| Ephrath spot = Bethlehem pin; Rachel died short of it | places.json af4e985 "another name for Bethlehem"; 48:7 "some distance short of Ephrath … now Bethlehem" | ✅ |
| Goren ha-Atad and Abel-mizraim have no pin; not marked | places.json a2f186d, a70ac98 (latitude null, "site unknown") | ✅ |
| "Beyond the Jordan" doesn't say from which side | 50:10–11; Steinsaltz on 50:10 (east side; "possible" they took the longer road east of the Jordan); Shadal on 50:10 (in the Land of Israel, called "beyond the Jordan" relative to where Moses and Israel were) | ✅ both views attributed |
| Jordan spot (ae686c9) at a point near where the river flows into the Dead Sea; marked "point illustrative" | places.json [35.558, 31.761]; Wikipedia "Jordan River" (drains to the Dead Sea); screenshot shows the point at the river mouth | ✅ |
| No line on the Atad card; line Goshen → cave drawn only from the burial card; the road isn't known, nor whether it crossed the Jordan | The verses give no road | ✅ said on the burial card and the finale |
| Luz, Sidon, Paddan-aram named, not marked ("isn't marked in this story") | Luz = Bethel (28:19); Sidon 49:13; Paddan 48:7 | ✅ |
| Machpelah shown as a spot (not the stop) on the 49:29–32 card, where the instruction is given in Egypt | 49:29–30; note says no numbered pin is lit | ✅ |
| All places used are linked to vayechi in places.json | `check:stories --strict` 0 warnings | ✅ |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Vayechi, tagline "Jacob blesses his family.", range 47:28 – 50:26 | parshaList.json; checker | ✅ tagline new; 48:9, 48:15, 48:20, 49:28 (Hebrew "blessed them") |
| 1 | Israel settled in Egypt, in the region of Goshen | 47:27 (JPS) | ✅ |
| 1 | Jacob lived 17 years in the land of Egypt; span of his life 147 years | 47:28 (JPS) | ✅ |
| 1 note | Parsha named for its first word וַיְחִי, "(Jacob) lived" | 47:28 Hebrew | ✅ |
| 1 note | 130 before Pharaoh; 130 + 17 = 147 | 47:9 (JPS "one hundred and thirty"); arithmetic | ✅ |
| 1 note | Rashi on 47:28: the parsha is "closed" (no break before it); two reasons, bondage/closed eyes and hearts; wished to reveal the End, closed from him; citing Bereshit Rabbah | Rashi on 47:28 (Hebrew ends "בב"ר"); Miqra text: 47:27 ends with no {פ}/{ס} | ✅ |
| 2 | When the time approached for Israel to die, he summoned Joseph; quotes "place your hand under my thigh… please do not bury me in Egypt. When I rest with my ancestors, take me up from Egypt and bury me in their burial-place"; "I will do as you have spoken"; "Swear to me"; he swore; Israel bowed at the head of the bed | 47:29–31 (JPS). "Joseph replies": JPS "He replied"; the speaker is Joseph by context | ✅ |
| 2 note | Rashi on 47:29: "and take an oath"; ḥesed ve'emet = kindness to the dead, "kindness of truth", no repayment expected; one reason: Egyptians should not make him an object of idol worship | Rashi on 47:29 (Hebrew וְהִשָּׁבַע; חֶסֶד שֶׁל אֱמֶת; שֶׁלֹּא יַעֲשׂוּנִי מִצְרַיִם עֲבוֹדָה זָרָה) | ✅ |
| 2 note | JPS renders "steadfast loyalty" | 47:29 (JPS) | ✅ |
| 3 | Joseph told his father is ill; took his two sons, Manasseh and Ephraim | 48:1 (JPS) | ✅ |
| 3 | El Shaddai appeared at Luz; assigned this land to his offspring; "Ephraim and Manasseh shall be mine no less than Reuben and Simeon" | 48:3–5 (JPS) | ✅ |
| 3 | Rachel died when he was returning from Paddan; buried on the road to Ephrath, now Bethlehem | 48:7 (JPS) | ✅ |
| 3 note | Israel summoned his strength and sat up in bed; later children recorded under their brothers' names | 48:2, 48:6 (JPS + note "Lit. 'under the name'") | ✅ |
| 3 note | Rashi on 48:7: Jacob knows Joseph may resent that he asks to be carried to Canaan yet did not bring Rachel even into Bethlehem; buried her there by God's command, so she would help her children when exiled (Nebuzaradan) along that road; Jeremiah 31:15 | Rashi on 48:7 (Hebrew: יָדַעְתִּי שֶׁיֵּשׁ בְּלִבְּךָ עָלַי; עַל פִּי הַדִּבּוּר); Jeremiah 31:15 (JPS "Rachel weeping for her children") | ✅ |
| 3 note | Luz is Bethel | 28:19; places.json Luz "another name for Bethel" | ✅ |
| 4 | "Who are these?"; "They are my sons, whom God has given me here"; eyes dim with age; brought them close; he kissed and embraced them; "I never expected to see you again, and here God has let me see your children as well"; Joseph sets Ephraim to Israel's left, Manasseh to his right | 48:8–13 (JPS) | ✅ Verse order kept, apart from 48:12 (in note) |
| 4 note | Joseph removed them from his knees, bowed low; Manasseh the first-born | 48:12–14, 48:18 | ✅ |
| 5 | Guess: Manasseh at Jacob's right hand; answer Ephraim; reveal quotes 48:14 exactly | 48:13–14 (JPS) | ✅ |
| 5 note | Rashi on 48:14 follows the Targum (כְּתַרְגּוּמוֹ, אַחְכִּימִינוּן): wisely, knowingly; he knew Manasseh was the first-born | Rashi on 48:14 | ✅ |
| 6 | Blessed Joseph; "the Angel who has redeemed me from all harm" bless the lads; his name and names of Abraham and Isaac recalled in them | 48:15–16 (JPS) | ✅ |
| 6 | Joseph thought it wrong; took hold of his father's hand to move it to Manasseh's head; "Not so, Father, for the other is the first-born"; father objected; "I know, my son, I know. He too shall become a people… Yet his younger brother shall be greater than he" | 48:17–19 (JPS; "objected" rendered "refuses", Hebrew וַיְמָאֵן) | ✅ |
| 6 note | "Angel" = Heb. "Messenger"; 48:15 quote | JPS note on 48:16; 48:15 | ✅ |
| 7 | Quote "By you shall Israel invoke blessings, saying: God make you like Ephraim and Manasseh." Hebrew from בְּךָ to וְכִמְנַשֶּׁה | 48:20 (JPS; Miqra) | ✅ |
| 7 | He blessed them that day; put Ephraim before Manasseh | 48:20 | ✅ |
| 7 | Rashi on 48:20: whoever wishes to bless his sons will bless them with these words | Rashi on 48:20 (הַבָּא לְבָרֵךְ אֶת בָּנָיו … יְשִׂימְךָ אֱלֹהִים כְּאֶפְרַיִם וְכִמְנַשֶּׁה) | ✅ |
| 7 | On Friday night many Jewish parents bless their sons with these words | Siddur Ashkenaz (Metsudah), Shabbat Evening, Blessing the Children: "widely accepted custom for parents to bless their children on the eve of Shabbos"; "For a boy: May God make you like Ephraim and Menashe" (Hebrew מנהג ישראל) | ✅ |
| 7 note | Rashi: Ephraim's precedence in the banners and in the chieftains' dedication gifts | Rashi on 48:20 (בִּדְגָלִים וּבַחֲנֻכַּת הַנְּשִׂיאִים) | ✅ |
| 7 note | 48:21–22 quotes; shekhem "portion" meaning uncertain | 48:21–22 (JPS + note) | ✅ |
| 8 | Jacob called his sons; quote 49:1 | 49:1 (JPS) | ✅ |
| 8 | Speaks to each in turn, in poetry; the Hebrew is often obscure; JPS notes mark several words uncertain | JPS formats 49:2–27 as poetry; notes "meaning of Heb. uncertain" at 49:10, 49:26, 49:27; "nuance … uncertain" at 49:9; also 48:22 | ✅ |
| 8 note | Rashi on 49:1: wished to reveal the End; the Divine Presence departed; he spoke of other things | Rashi on 49:1 | ✅ |
| 9 | Hebrew names, spelled as in 49:3, 5, 8, 13, 14 | Miqra (לֵוִי from וְלֵוִי) | ✅ |
| 9 | Row quotes: Reuben 49:4; Simeon 49:5; Levi 49:7; Judah 49:9, 49:10; Zebulun 49:13; Issachar 49:14–15 | JPS, cuts marked "…" | ✅ |
| 9 note | Words for Reuben, Simeon and Levi are rebukes; Reuben's begin "you are my first-born… Exceeding in rank"; compare 35:22; Judah's begin "You, O Judah, your brothers shall praise" | 49:3–8; 35:22 (Reuben lay with Bilhah, his father's concubine) | ✅ "compare" rather than asserting the link |
| 9 note | JPS notes: "maim an ox" or "overthrow a dignitary" (cf. chapter 34); "lioness" nuance uncertain; "So that tribute…" construes shiloh as shai loh following the Midrash; meaning uncertain, lit. "Until he comes to Shiloh" | JPS notes on 49:6, 49:9, 49:10 | ✅ |
| 10 | Row quotes: Dan 49:16–17; Gad 49:19; Asher 49:20; Naphtali 49:21; Joseph 49:22, 49:26; Benjamin 49:27 | JPS | ✅ |
| 10 note | 49:18 quote; JPS note gives others' "fruitful bough" rendering; 49:26 partly uncertain; ʻad uncertain, others "booty"; 49:28 quote; Hebrew "blessed them, each according to his blessing", JPS "bade them farewell…" | 49:18, JPS notes on 49:22, 49:26, 49:27; 49:28 Hebrew וַיְבָרֶךְ … כְּבִרְכָתוֹ | ✅ |
| 11 | Bury me in the cave in the field of Machpelah, facing Mamre, in Canaan, the field Abraham bought from Ephron the Hittite; quote 49:31 | 49:29–31 (JPS) | ✅ Who is buried there: Abraham, Sarah, Isaac, Rebekah, Leah, as listed |
| 12 | Finished; drew his feet into the bed; breathing his last, gathered to his kin | 49:33 (JPS) | ✅ |
| 12 | At 147 | 47:28 | ✅ |
| 12 | Joseph flung himself upon his father's face, wept, kissed him | 50:1 (JPS) | ✅ |
| 12 | Physicians embalmed Israel; forty days, "the full period of embalming"; the Egyptians bewailed him seventy days | 50:2–3 (JPS: "The Egyptians bewailed him seventy days") | ✅ JPS says "the Egyptians", not "all Egypt" |
| 12 note | The verse doesn't say whether the 40 fall within the 70; Rashi on 50:3: 40 for embalming, 30 for weeping | 50:3; Rashi on 50:3 (מ' לַחֲנִיטָה וְל' לִבְכִיָּה) | ✅ |
| 13 | When the wailing was over; Pharaoh: "Go up and bury your father, as he made you promise on oath" | 50:4–6 (JPS) | ✅ |
| 13 | Went up: Pharaoh's officials, Egypt's dignitaries, Joseph's household, his brothers, his father's household; chariots and charioteers; "a very large troop"; only children, flocks and herds left in the region of Goshen | 50:7–9 (JPS; "the senior members of his court" omitted) | ✅ |
| 13 note | 50:5 quote with cut | 50:5 (JPS) | ✅ |
| 14 | Goren ha-Atad, "the threshing floor of Atad", beyond the Jordan; very great and solemn lamentation; seven days of mourning for his father | 50:10 (JPS + note "Or 'the threshing floor of'"). "he keeps": JPS "he observed", subject not named | ✅ |
| 14 | Canaanite inhabitants: "This is a solemn mourning on the part of the Egyptians"; named Abel-mizraim, interpreted as "the mourning of the Egyptians" | 50:11 (JPS + note) | ✅ |
| 14 note | Rashi on 50:10: surrounded by thorn bushes (atad); the Rabbis' teaching: kings of Canaan and princes of Ishmael came to make war, saw Joseph's crown hanging on Jacob's coffin, hung their crowns on it | Rashi on 50:10 (מֻקָּף אֲטָדִין; מַלְכֵי כְנַעַן וּנְשְׂיאֵי יִשְׁמָעֵאל). Sotah 13a tells it with Esau, Ishmael and Keturah; not cited | ✅ attributed to Rashi only |
| 15 | His sons did as he instructed; carried him to Canaan; buried in the cave of the field of Machpelah, near Mamre, bought by Abraham from Ephron the Hittite; Joseph returned to Egypt with his brothers and all who went up | 50:12–14 (JPS "the field near Mamre") | ✅ |
| 15 note | Rashi on 50:13: sons, not grandsons; Levi (to carry the Ark) and Joseph (a king) did not carry; Manasseh and Ephraim in their places | Rashi on 50:13 | ✅ |
| 16 | Brothers: "What if Joseph still bears a grudge against us and pays us back for all the wrong that we did him!"; message: before his death your father said to ask you to forgive; Joseph in tears; flung themselves before him; "We are prepared to be your slaves" | 50:15–18 (JPS) | ✅ |
| 16 note | Rashi on 50:16: they changed the facts for the sake of peace; Jacob gave no such command | Rashi on 50:16 (שִׁנּוּ בַדָּבָר מִפְּנֵי הַשָּׁלוֹם) | ✅ |
| 17 | Quote "Although you intended me harm, God intended it for good, so as to bring about the present result—the survival of many people." (JPS begins "Besides, although"); Hebrew from וְאַתֶּם to עַם־רָב | 50:20 (JPS; Miqra) | ✅ |
| 17 | "Have no fear! Am I a substitute for God?"; "I will sustain you and your dependents"; reassured them, speaking kindly | 50:19, 50:21 (JPS) | ✅ |
| 18 | Joseph and his father's household remained in Egypt; "God will surely take notice of you and bring you up from this land"; made the sons of Israel swear; "you shall carry up my bones from here"; died at 110; embalmed, placed in a coffin in Egypt | 50:22–26 (JPS) | ✅ |
| 18 note | Third generation of Ephraim; Machir's children born upon Joseph's knees; land promised to Abraham, Isaac, Jacob | 50:23–24 (JPS) | ✅ |
| 18 note | Moses took Joseph's bones; buried at Shechem in the plot Jacob bought | Exodus 13:19; Joshua 24:32 (JPS) | ✅ |
| 19 | Talk card = Everyone question | 50:15–17, 50:21 | ✅ |

## Questions

| Audience | Claim | Source | Verdict |
|---|---|---|---|
| Kids | Jacob blessed his grandsons Ephraim and Manasseh | 48:20 | ✅ |
| Everyone | Brothers feared a grudge; Joseph wept, spoke kindly | 50:15, 50:17, 50:21 | ✅ |
| Deeper | Jacob the younger twin took the blessing Isaac meant for Esau, the first-born; puts younger Ephraim before first-born Manasseh; "I know, my son, I know" | 25:25–26; 27:1–4, 27:19, 27:30–35; 48:14, 48:19–20 | ✅ |

## Screens

All 20 cards screenshotted at iPhone size (390 × 844) with `.claude/cdp-shot.mjs`. Fixed during the walk: the Ephrath and Machpelah cards were reframed on their own pins (a wide view put the Ephrath label off screen and hid stop 2, which isn't drawn before `routeTo` reaches it); the Jordan label was cut off at the right edge; page cards (quote, lists) put the Goshen pin under the Hebrew or the card, so their camera now keeps it off screen; the first list card was too tall to show its reference, so its rows were shortened (the cut text moved to the note).

## Independent fact-check, pass 1 (wf_d291ac8a-044)

291 claims, 259 verified. The 32 problems and 16 missed items include Read-tab (R*), cover (C006), DaylightMap and parshaList items, which are handled on the code branch and not listed here. Each story item below was re-checked on Sefaria (or the named source) before the fix.

| Id | Finding | Fix | Re-verified against |
|---|---|---|---|
| C057, C072, C088 (and the same wording on cards 2 and 12) | "The verses say only that this was in Egypt" overstates: 48:8–13, 48:15–19, 49:1–2 and 49:33–50:3 don't name Egypt | "The verses don't say where in Egypt this was, so no pin is lit." | Genesis 47:28 – 50:3 (JPS): Egypt is named in 47:28–30, 48:5, not in those ranges |
| C090 + missed (Simeon) | Rows stop mid-verse without "…" | Trailing "…" added to Reuben, Levi, Judah, Issachar, Dan, Joseph; leading "…" to Simeon ("Simeon and Levi are a pair;" cut) | 49:4, 49:5, 49:7, 49:10, 49:15, 49:17, 49:26 (JPS). Gad, Asher, Naphtali, Zebulun and Benjamin end where their verses end |
| C099 | "Sidon, named for Zebulun" reads as "named after" | "Sidon, named in Zebulun's blessing (49:13), isn't marked in this story." | 49:13 (JPS) |
| C140 | 50:5 quote dropped "My father made me swear, saying, 'I am about to die.'" so Jacob's words read as Joseph's | Quoted in full with nested quotation marks | 50:5 (JPS) |
| C160 | "His sons, not his grandsons" clashed with Manasseh and Ephraim taking places | Rashi's reason given: not an Egyptian, not one of their sons, born of Canaanite women; Levi and Joseph excluded; Joseph's sons Manasseh and Ephraim took their places | Rashi on 50:13 (Hebrew: לֹא אִישׁ מִצְרִי וְלֹא אֶחָד מִבְּנֵיכֶם, שֶׁהֵם מִבְּנוֹת כְּנַעַן … מְנַשֶּׁה וְאֶפְרַיִם יִהְיוּ תַחְתֵּיהֶם) |
| C163, C164, C190, C193 + missed (line over the sea) | The Goshen → Machpelah arc (bow 0.14, no via) ran up to ~30 km over the Mediterranean | Machpelah stop gets `via: [33.8, 30.85]`, an illustrative inland point in northern Sinai (~30 km south of the coast at El Arish). Computed samples of the second leg: 34.10E 31.07N, 34.26E 31.16N, 34.42E 31.25N, 34.59E 31.33N, all inland of the Sinai–Gaza coast. Card 15 and finale notes now say the line bends inland through an illustrative point and that the road isn't known | densify()/arc() in DaylightMap.tsx; screenshots of cards 15–19 and a zoomed crop of the finale show the line on land |
| Missed (Deeper question) | "twins" is in 25:24, not 25:25–26 | Cited as Genesis 25:24–26 in the question and in sources | 25:24 (JPS "there were twins in her womb") |
| Missed (card 1 note) | Rashi's "bondage that began" when Jacob died, stated without the Torah's own timing | "…the bondage, which in this reading began then (the Torah tells of the oppression only after Joseph and his generation had died, Exodus 1:6–11)"; Exodus 1:6–11 added to sources | Rashi on 47:28; Exodus 1:6–11 (JPS) |
| Missed (card 14, Rashi on 50:10) | Confirmed; optional "(Sotah 13a)" | Not added: Sotah 13a names the children of Esau, Ishmael and Keturah, not Rashi's kings of Canaan and princes of Ishmael, so the card keeps Rashi's version under his name | Rashi on 50:10; Sotah 13a:4–5 |
| Missed (card 13 body) | No change beyond C140 | None | — |

Re-screenshotted at 390 × 844: cards 1, 2, 4, 6, 8, 9, 10, 12, 13, 15, 16, 17, 18, 19. `check:stories -- vayechi --strict`: 0 errors, 0 warnings; `npm run build` passes.
