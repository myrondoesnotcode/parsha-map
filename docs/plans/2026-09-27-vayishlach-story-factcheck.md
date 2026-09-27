# Vayishlach story: self fact-check

Story: `src/redesign/stories/vayishlach.ts` (Genesis 32:4 – 36:43), 24 cards. Checked 2026-09-27 by the author, before review.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.32.4-36.43`): English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah (cantillation stripped, vowels kept). Chapter 32 uses the Hebrew verse numbers, as `seferiaUrl` does (Hebrew 32:4 = English 32:3). Cross-references fetched the same way: Genesis 27:41–45, 28:19, 31:41, 46:2, 49:5–7, 49:29–31; Joshua 24:32; Hosea 12:4–5; Jeremiah 31:14–15; Obadiah 1:21. Rashi = Rosenbaum–Silbermann (Sefaria) on Genesis 32:9, 32:16, 32:25, 32:29, 32:30, 32:33, 33:4, 33:14, 33:18, 35:8, 35:10, 35:29, 48:7. Ibn Ezra on 35:26 = Strickman–Silver; Radak on 35:26 = Munk. Bereshit Rabbah 77:3 and 81:5 = Sefaria Midrash Rabbah (2022). Sifrei Bamidbar 69:2 = Silverstein. Mishnah Chullin 7:1, 7:6 and Berakhot 13a = William Davidson edition. Sites = Wikipedia ("Penuel", "Deir Alla", "Jabbok" → "Zarqa River", "Tell Balata", "Bethel", "Rachel's Tomb", "Tel Rumeida", "Mount Seir"), OpenBible.info ("Eder 1"), and `src/data/places.json`.

**Read tab respected** (`parshaList.json` vayishlach): the wrestler is "a man" in the text, and "Esau's guardian angel" is given as Bereshit Rabbah 77:3 via Rashi; the gid hanasheh law is attributed to Chullin 7:6 (Rabbis: given at Sinai, written here; Rabbi Yehuda: Jacob's sons kept it); Jabbok = Zarqa; Shechem = Tell Balata.

**Verdicts:** ✅ verified against the source named. ⚠️ = verified, with a caveat stated. No claim is left unverified.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Route Jabbok → Penuel → Succoth → Shechem → Bethel → Ephrath → Hebron, in that order | 32:23, 32:32, 33:17, 33:18, 35:6, 35:16–19, 35:27 | ✅ |
| Jabbok pin (aca7bd9) is a point on the Zarqa River near the Jordan; the Zarqa is identified with the Jabbok; where the ford was is unknown | places.json [35.543, 32.115] "Zarqa River"; Wikipedia "Zarqa River" ("identified with the biblical river Jabbok") | ✅ |
| Hedge "the ford's site unknown" | The verses name no spot on the river (32:23) | ✅ |
| Penuel pin (a8a9ff9) = Tell edh-Dhahab el-Sharqi, the eastern of the twin hills; Israel Finkelstein's proposal; not certain | places.json "Tell edh Dhahab esh Sherqiyeh" [35.692, 32.187]; Wikipedia "Penuel" (Identification: Finkelstein identifies the eastern Tell edh-Dhahab el-Sharqi with Penuel; earlier identification questioned) | ⚠️ proposal, hedged "proposed" |
| Succoth pin (a0905b5) = Tell Deir Alla, a suggested identification not confirmed by an inscription | places.json [35.621, 32.197]; Wikipedia "Deir Alla" ("has been suggested to be the biblical Sukkot"; "not confirmed by any inscription at the site") | ⚠️ hedged "proposed" |
| Shechem pin (adf74d4) = Tell Balata by Nablus, usual identification | places.json; Wikipedia "Tell Balata" ("associated since 1913 with the Biblical city of Shechem"; other sites proposed) | ✅ hedged "usual site" |
| Bethel pin (a64f355) = Beitin, identified by most scholars | places.json; Wikipedia "Bethel" ("Most scholars identify Bethel with … Beitin") | ✅ hedged "usual site" |
| Ephrath pin (af4e985) = Bethlehem; Rachel died "some distance short of Ephrath" | places.json ("another name for Bethlehem"); 35:16, 35:19 | ✅ hedge "now Bethlehem"; card body says she died short of it |
| Hebron pin (a85151a) = Tel Rumeida, the usual site of ancient Hebron; Mamre's site unknown | places.json; Wikipedia "Tel Rumeida" ("Tel Rumeida is the site of the ancient city of Hebron"); places.json Mamre (aeb9e97) confidence low | ✅ |
| Seir is a region between the Dead Sea and the Gulf of Aqaba; pin (ae981db) an illustrative point in the range around Jebel esh-Shera | Wikipedia "Mount Seir"; places.json "region around Jebel esh Shera" | ✅ spot named "Seir (a region)" |
| The verses don't say where Jacob was when he sent the messengers; Vayetze ends at Mahanaim (32:3) | 32:3–4 | ✅ |
| The camp of 32:14/32:22 is the one left that night to cross the Jabbok, so the prayer, gift and camp cards use the Jabbok stop | 32:14 ("spending the night there"), 32:22 ("remained in camp that night"), 32:23 ("That same night he arose … crossed the ford of the Jabbok") | ✅ |
| Where the brothers met isn't said; after Penuel, before Succoth | 32:32, 33:1, 33:17 | ✅ |
| Migdal-eder not pinned: site unknown | OpenBible "Eder 1": three proposals, Khirbet el Bira < 10% confidence, Khirbet es Siyar el Ghanam highest; "the modern location is uncertain" | ✅ (see data note below) |
| Allon-bacuth not separately pinned; "below Bethel" | 35:8; places.json af9a894 = same point as Bethel | ✅ |
| All places used are linked to vayishlach in places.json | `check:stories --strict` 0 warnings | ✅ |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Vayishlach, tagline "Jacob becomes Israel.", range 32:4 – 36:43 | parshaList.json; checker | ✅ |
| 1 | Messengers ahead to Esau "in the land of Seir, the country of Edom"; message: stayed with Laban until now; cattle, donkeys, sheep, male and female slaves ("servants"); hopes to gain favor | 32:4–6 (JPS) | ✅ |
| 1 note | Esau lived in the hill country of Seir | 36:8–9 | ✅ |
| 2 | Guess: 400 men; reveal quotes 32:7 exactly | 32:7 (JPS) | ✅ |
| 3 | Greatly frightened; divided people, flocks, herds, camels into two camps; if Esau attacks one, the other may escape | 32:8–9 (JPS) | ✅ |
| 3 note | Rashi on 32:9: prepared for gift, prayer, battle | Rashi on 32:9 | ✅ |
| 4 | Quote "with my staff alone I crossed this Jordan, and now I have become two camps" (JPS; Hebrew from כִּי בְמַקְלִי, no divine name) | 32:11 | ✅ |
| 4 | "I am unworthy of all the kindness"; save me from my brother; promise of offspring as the sands of the sea | 32:11–13 (JPS) | ✅ |
| 5 | 200 she-goats, 20 he-goats; 200 ewes, 20 rams; 30 milch camels with their young; 40 cows, 10 bulls; 20 she-donkeys ("jennies"), 10 male donkeys ("jackasses") | 32:15–16 (JPS); Hebrew עִזִּים, רְחֵלִים, גְּמַלִּים, פָּרוֹת, אֲתֹנֹת | ✅ |
| 5 note | Numbers given add up to 550: 200+20+200+20+30+40+10+20+10 = 550 | arithmetic checked | ✅ |
| 5 note | Rashi on 32:16: thirty milch camels "and their colts with them" | Rashi on 32:16 | ✅ |
| 5 note | Drove by drove, distance between droves; "your servant Jacob … is right behind us"; "If I propitiate him … perhaps he will show me favor" | 32:17–21 (JPS) | ✅ |
| 6 | That night; wives, maidservants, children across the ford of the Jabbok; sends over his possessions; left alone; a man wrestles until the break of dawn; seeing he had not prevailed, wrenches Jacob's hip at its socket | 32:23–26 (JPS; Hebrew אִישׁ, יְלָדָיו). "Children", not "eleven sons", because the Hebrew is "children" (JPS note) | ✅ |
| 6 note | Hebrew ’ish; JPS "a figure"; he won't give his name | 32:25 (Hebrew, JPS + note), 32:30 | ✅ |
| 6 note | Hosea: "He strove with an angel and prevailed" | Hosea 12:5 (JPS) | ✅ |
| 6 note | Rashi on 32:25 brings the Rabbis' teaching (Bereshit Rabbah 77:3, R. Ḥama bar Ḥanina): Esau's guardian angel | Rashi on 32:25; Bereshit Rabbah 77:3 | ✅ |
| 6 note | JPS: meaning of "wrestled" uncertain; Rashi reads it as clasping/intertwining | JPS note on 32:25; Rashi on 32:25 | ✅ |
| 7 | Stars title quotes "I will not let you go, unless you bless me."; "Let me go … dawn is breaking" | 32:27 (JPS) | ✅ |
| 7 note | "until the break of dawn"; sky illustrative | 32:25 | ✅ |
| 8 | Name card יעקב → ישראל; dialogue quoted exactly | 32:28–29 (JPS; Hebrew spellings from 32:28–29) | ✅ |
| 8 note | JPS notes: saritha ↔ first part of Israel, ’Elohim ↔ second part | JPS notes on 32:29 | ✅ |
| 8 note | Rashi on 32:29: no longer said the blessings came through supplanting, but openly; "with men" = Esau and Laban | Rashi on 32:29 | ✅ |
| 8 note | "You must not ask my name!"; Rashi on 32:30: no fixed names | 32:30 (JPS); Rashi on 32:30 | ✅ |
| 8 note | 32:30 ends וַיְבָרֶךְ אֹתוֹ שָׁם ("he blessed him there"); JPS renders "he took leave of him there" | 32:30 Hebrew and JPS | ✅ |
| 9 | Names the place Peniel; quote; sun rises as he passes Penuel, limping; children of Israel to this day do not eat the gid hanasheh on the socket of the hip | 32:31–33 (JPS; Hebrew גִּיד הַנָּשֶׁה) | ✅ |
| 9 note | Peniel understood as "face of God" | JPS note on 32:31 | ✅ |
| 9 note | JPS "thigh muscle"; William Davidson Mishnah "sciatic nerve"; not for birds (no "spoon of the thigh") | 32:33 (JPS); Mishnah Chullin 7:1 | ✅ |
| 9 note | Chullin 7:6: Rabbis — stated at Sinai, written in its place; Rabbi Yehuda — forbidden to the children of Jacob | Mishnah Chullin 7:6 | ✅ |
| 10 | Esau with 400 men; maids and children first, Leah and hers next, Rachel and Joseph last; Jacob goes ahead, bows to the ground seven times; Esau runs, embraces, falls on his neck, kisses; they weep | 33:1–4 (JPS) | ✅ |
| 10 note | Dots over every letter of וַיִּשָּׁקֵהוּ (33:4 in both numberings) | Masorah text (six upper dots, U+05C4); Sifrei Bamidbar 69:2 ("dots above (all the letters in) 'vayishakehu'") | ✅ Not a letter card: the dots aren't a small or large letter |
| 10 note | Two views: not with all his heart; R. Shimon bar Yoḥai: Esau hated Jacob, but his compassion was stirred and he kissed him wholeheartedly | Sifrei Bamidbar 69:2; Rashi on 33:4 | ✅ |
| 11 | "What do you mean by all this company that I have met?"; "To gain my lord's favor"; "I have enough, my brother; let what you have remain yours"; "to see your face is like seeing the face of God"; he accepted | 33:8–11 (JPS) | ✅ |
| 11 note | Bereshit Rabbah 77:3: R. Ḥama bar Ḥanina — Esau's guardian angel, citing 33:10 | Bereshit Rabbah 77:3 | ✅ |
| 12 | Esau offers to travel along; children frail, nursing flocks die if driven hard; "until I come to my lord in Seir"; Esau back to Seir; Jacob to Succoth, builds a house, stalls for cattle | 33:12–17 (JPS) | ✅ |
| 12 note | Succoth = "stalls," "huts," "booths" | JPS note on 33:17 | ✅ |
| 12 note | Rashi on 33:14: meant only as far as Succoth; will go to Seir in the days of the Messiah (Obadiah 1:21) | Rashi on 33:14; Obadiah 1:21 | ✅ |
| 13 | Arrived safe in the city of Shechem in Canaan; encamped before the city; bought the parcel from the kin of Hamor, Shechem's father, for 100 kesitahs; altar El-elohe-yisrael, "El, God of Israel" | 33:18–20 (JPS + notes) | ✅ |
| 13 note | Kesitah of unknown value | JPS note on 33:19 | ✅ |
| 13 note | Rashi on 33:18: whole in body (lameness cured), possessions, Torah | Rashi on 33:18 | ✅ |
| 13 note | Joseph's bones buried in that plot | Joshua 24:32 | ✅ |
| 14 | Dinah, daughter Leah bore to Jacob, goes out to visit the daughters of the land; Shechem son of Hamor, chief of the country, seizes and violates her; asks for her as a wife; Hamor proposes intermarriage and settling | 34:1–12 (JPS; "violated" is the JPS note's literal rendering) | ✅ Told briefly and soberly |
| 14 note | Quote of 34:2; Jacob kept silent till his sons came from the field; they were distressed and very angry | 34:2, 34:5–7 (JPS) | ✅ |
| 15 | Sons answer with guile; condition: every male circumcised; third day, in pain; Simeon and Levi kill all the males, Hamor and Shechem included, take Dinah out; the other sons plunder; Jacob: made him odious among the inhabitants; their answer paraphrased ("harlot" for JPS "whore") | 34:13–31 (JPS) | ✅ |
| 15 note | Quote of 49:5 and 49:7 | Genesis 49:5–7 (JPS) | ✅ |
| 16 | God: go up to Bethel, build an altar; household and all with him give up alien gods and earrings; buried under the terebinth near Shechem; Luz—that is, Bethel; altar; El-bethel, "The God of Bethel" | 35:1–7 (JPS + note) | ✅ |
| 16 note | Purify, change clothes (35:2); God appeared when fleeing from Esau (35:1, 35:7); his dream there (28:10–22); terror from God, not pursued (35:5) | 35:1–7; 28:10–22 | ✅ |
| 17 | Deborah, Rebekah's nurse, died, buried under the oak below Bethel; named Allon-bacuth, understood as "the oak of the weeping" | 35:8 (JPS + note) | ✅ |
| 17 note | Rashi on 35:8 (from R. Moses Ha-darshan): Rebekah sent Deborah to tell Jacob to leave | Rashi on 35:8 | ✅ |
| 17 note | Bereshit Rabbah 81:5, R. Shmuel bar Naḥman: allon = "other" in Greek; news of his mother's death came while mourning Deborah | Bereshit Rabbah 81:5 | ✅ |
| 17 note | The Torah never narrates Rebekah's death; 49:31 mentions her burial | 49:31; Rashi on 35:8 ("Scripture also does not make open mention of her death") | ✅ |
| 18 | Quote 35:10 (JPS), Hebrew from שִׁמְךָ יַעֲקֹב (no divine name) | 35:10 | ✅ |
| 18 | The name given a second time at Bethel; the Torah keeps calling him Jacob; Berakhot 13a: Israel primary, Jacob secondary | 32:29, 35:10, 35:22, 35:27; Berakhot 13a | ✅ |
| 18 note | "I am El Shaddai. Be fertile and increase"; the land assigned to Abraham and Isaac; stone pillar, libation, oil; named Bethel | 35:11–15 (JPS) | ✅ |
| 18 note | "Israel journeyed on" (35:21), "Jacob came to his father Isaac" (35:27); God calls "Jacob! Jacob!" (46:2), noted in Berakhot 13a | 35:21, 35:27, 46:2; Berakhot 13a | ✅ |
| 19 | Set out from Bethel; some distance short of Ephrath; hard labor; dying, names him Ben-oni; his father calls him Benjamin; buried on the road to Ephrath—now Bethlehem; pillar over her grave | 35:16–20 (JPS) | ✅ |
| 19 note | Midwife's words; Ben-oni "son of my suffering (or, strength)"; Benjamin "son of the right hand" or "son of the south"; "the pillar at Rachel's grave to this day" | 35:17, 35:20; JPS notes on 35:18 | ✅ |
| 19 note | Rashi on 48:7: buried by the road by God's command so she could plead for her children going into exile; "Rachel weeping for her children" | Rashi on 48:7; Jeremiah 31:15 (Sefaria numbering, JPS) | ✅ |
| 19 note | Rachel's Tomb at Bethlehem's northern entrance is the traditional site; described as her grave in records from the early 4th century CE; some scholars propose sites further north | Wikipedia "Rachel's Tomb" | ⚠️ tradition, stated as such |
| 20 | Title quotes "Now the sons of Jacob were twelve"; Leah: Reuben (first-born), Simeon, Levi, Judah, Issachar, Zebulun; Rachel: Joseph, Benjamin; Bilhah, Rachel's maid: Dan, Naphtali; Zilpah, Leah's maid: Gad, Asher | 35:22–26 (JPS; Hebrew names of the mothers from 35:23–26) | ✅ |
| 20 note | Pitched his tent beyond Migdal-eder; site unknown | 35:21; OpenBible "Eder 1" | ✅ |
| 20 note | "born to him in Paddan-aram" though Benjamin was born near Ephrath; Ibn Ezra and Radak: the verse speaks of the majority | 35:26; Ibn Ezra on 35:26; Radak on 35:26 | ✅ |
| 21 | Came to Isaac at Mamre, at Kiriath-arba—now Hebron, where Abraham and Isaac had sojourned ("lived"); 180; ripe old age; buried by Esau and Jacob | 35:27–29 (JPS) | ✅ |
| 21 note | Burial place not given here; Isaac and Rebekah buried in the cave of Machpelah facing Mamre | 49:29–31 | ✅ |
| 21 note | Rashi on 35:29: no chronological order; Isaac died twelve years after Joseph was sold | Rashi on 35:29 | ✅ |
| 22 | Esau took household and livestock to another land because of Jacob; possessions too many to dwell together; settled in the hill country of Seir; sons, grandsons incl. Amalek, clans of Edom; kings "before any king reigned over the Israelites" | 36:1–43 (JPS) | ✅ |
| 22 note | Amalek son of Timna, concubine of Eliphaz; eight kings Bela, Jobab, Husham, Hadad, Samlah, Saul, Baal-hanan, Hadar; Horites "sons of Seir … settled in the land" | 36:12, 36:20–30, 36:32–39 (counted: 8) | ✅ |
| 23 | Talk card = Everyone question; "About the map" note | as above; Wikipedia "Zarqa River" for "the river's identification is the accepted one" | ✅ |
| Q | Kids: goats, sheep, camels, cows, donkeys, hoping to win his favor | 32:15–16, 32:21 | ✅ |
| Q | Everyone: Esau ran, embraced, wept; they had parted in anger | 33:4; 27:41–45 | ✅ |
| Q | Deeper: named Israel at 32:29 and 35:10; still called Jacob | 32:29, 35:10, 35:27 | ✅ |

## Deliberate choices

- **Dinah (34)**: two cards, told in the verses' own terms ("seizes her and violates her"), no further detail; Jacob's rebuke and his last words on Simeon and Levi (49:5–7) are included so the violence isn't left as the last word.
- **Reuben and Bilhah (35:22a)**: left out of the story, as the brief allowed. The twelve-sons card cites 35:21–26 but draws only on 35:21, 22b–26.
- **The dots over וַיִּשָּׁקֵהוּ (33:4)**: in a note, not a `letter` card (that card only shrinks or grows one letter).
- **No `via` points**: the verses give no roads; lines join the stops in order ("Route illustrative").
- **Page cards** (the two quotes, the name card) aim the camera at terrain beside the pin so no pin label sits under the Hebrew.
- The wrestler is "a man" on screen; angel/Esau's angel only as Hosea's and Bereshit Rabbah's (via Rashi) readings.
- The gift total (550) is stated only in the note, with the camels' young explicitly excluded, per Rashi on 32:16.

## For code or data (not changed here)

1. **places.json `Eder 1` (ab80fa1)**: pinned at Khirbet el Bira, which OpenBible rates below 10% confidence; OpenBible's leading identification is Khirbet es Siyar el Ghanam (east of Bethlehem, [35.2301, 31.7073]). Its display name is "Eder" with no alternate "Migdal-eder" (the verse's name, 35:21). Suggest `MOVED` or `UNPINNED` in `scripts/processGeodata.ts` plus an alternate name, then `npm run geodata`. Until then the story doesn't pin it.
2. **Finale map (talk card)**: at the end-of-story overview the cluster labels "1·2·3" and "4" overlap (Shechem's label sits over "Jabbok"). The talk card's camera doesn't seem to change the overview, so this needs an app-side fix (label collision), not a story change.

## Checks

- `npm run check:stories -- vayishlach --strict`: ✓ 24 cards, 0 errors, 0 warnings.
- `npm run build`: ✓ built.
- Every card screenshotted at 390×844 (CDP, GPU); the name card morphs יעקב → ישראל, keeping the shared י.
