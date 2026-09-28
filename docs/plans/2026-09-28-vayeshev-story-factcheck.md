# Vayeshev story: self fact-check

Story: `src/redesign/stories/vayeshev.ts` (Genesis 37:1 – 40:23), 26 cards. Checked 2026-09-28 by the author, before review; then corrected after the independent fact-check, pass 1 (see the last section). Rows below are updated to the current wording.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.37.1-40.23`): English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah (cantillation stripped, vowels kept). Cross-references fetched the same way: Genesis 15:13, 35:19, 35:27, 41:1, 41:46, 45:4–5; Deuteronomy 25:5–6; Judges 8:24; 2 Samuel 13:18; Ruth 4:18–22. Rashi = Rosenbaum–Silbermann (Sefaria), checked against the Hebrew, on Genesis 37 (2, 3, 10, 14, 15, 24, 25, 28, 36), 38 (1, 5, 14, 24–26, 29–30), 39 (1, 6, 9), 40 (1, 16, 20, 23). Rashbam on 37:28, 37:36 = Munk (HaChut Hameshulash) + Hebrew. Ibn Ezra on 37:25, 37:28 = Strickman–Silver + Hebrew. Ramban on 37:25 was read but is not cited. Bereshit Rabbah 85:11 = Sefaria Midrash Rabbah (2022) + Hebrew. Shabbat 10b and Sotah 10b = William Davidson edition. Sites = Wikipedia ("Tel Dothan", "Adullam", "Timnah"), the Vayishlach claim table (Shechem = Tell Balata, Hebron = Tel Rumeida), and `src/data/places.json`.

**Rule applied to Rashi.** The Rosenbaum–Silbermann English adds source citations in parentheses (e.g. "(Shabbat 10b)", "(Midrash Tanchuma …)") that are not in Rashi's Hebrew. The story says Rashi cites a source only where his Hebrew names it (e.g. Daniel on 37:15). Where Rashi says "וְאוֹמֵר אֲנִי" (38:5) it would be "Rashi suggests"; that comment is not used.

**Read tab respected** (`parshaList.json` vayeshev): ketonet passim meaning uncertain, "coat of many colors" from the Septuagint (the story says only what the JPS note says), Rashi = fine wool, 2 Samuel 13:18; Shabbat 10b on favoritism; Bereshit Rabbah 85:11 linking haker na; twenty pieces of silver; both Midianites and Ishmaelites named.

**Verdicts:** ✅ verified against the source named. ⚠️ = verified, with a caveat stated.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Route: valley of Hebron → Shechem → Dothan → Egypt, in that order | 37:14, 37:17, 37:28, 39:1 | ✅ |
| The Dothan → Egypt line bends through an inland point in the western Negev ([34.6, 31.1], as Lech Lecha does) only so that it stays on land; the caravan's road isn't known (said in the Potiphar note and the finale) | fact-check c216: the plain arc ran offshore from Ashdod to El Arish | ✅ |
| Cards 1, 3, 4 (and page card 2) use a regional camera on the land of Canaan (37:1), not Hebron; the notes say the town isn't named until 37:14 | 37:1, 37:14 | ✅ |
| Judah cards (13, 14, 16) are centred near Adullam ([35.03, 31.64]); the 38:26 quote backdrop is the Shephelah about 22 km north-north-west of the Adullam spot ([34.95, 31.85]; pass 3) | places.json Adullam; screenshots | ✅ |
| Valley of Hebron (a375f5a) pinned at the same point as Hebron (Tel Rumeida); hedge "pin marks Hebron (Tel Rumeida)" | places.json a375f5a [35.10222, 31.525087] = Hebron a85151a | ✅ |
| Shechem pin (adf74d4) = Tell Balata; hedge "usual site" | places.json "Tell Balatah"; Vayishlach table (Wikipedia "Tell Balata") | ✅ |
| Dothan pin (ab635e4) = Tel Dothan, near Jenin; "the modern consensus" | places.json "Tel Dotan"; Wikipedia "Tel Dothan" ("The modern consensus is that the archaeological site of Tell Dothan corresponds to ancient Dothan"; ~10 km SW of Jenin) | ✅ hedged "usual site" |
| Egypt pin (af301ca) is a region; point illustrative, "near today's Cairo" | places.json [31.3075, 30.129444], type region; about 12 km NE of central Cairo (30.044 N, 31.236 E) | ✅ |
| Gilead (ae73b90) is a region east of the Jordan; point illustrative | places.json type region; 37:25; Vayetze/Vayishlach tables | ✅ spot "Gilead (a region; point illustrative)" |
| Adullam (af82614): pin at Khirbet esh-Sheikh Madhkur ("upper Adullam"), above Kh. ʿId el-Minya ("Adullam proper"); not certain | places.json; Wikipedia "Adullam" ("thought … to be the “upper Adullam”"; "the site recognised as Adullam proper"; "still inconclusive") | ✅ spot "Adullam (proposed site)" (pass 3) |
| The verse says only that Hirah was an Adullamite | 38:1 | ✅ |
| Timnah of Genesis 38 uncertain (scholars differ which Timnah); Enaim's site unknown; neither marked | Wikipedia "Timnah" (Gen 38 Timnah: Tibna or Khirbet et-Tibbaneh proposed; hill-country Timnah "as yet unidentified"); places.json Enaim "location uncertain", Timnah 3 confidence low | ✅ |
| Chezib not marked | 38:5 | ✅ |
| No stop highlighted where the verses don't place the event (cards 1, 3, 4, 12); on card 12 the overview pins 1–3 show, and the note says they only show the route so far | 37:1–11, 37:31–35 name no town; 37:14 first names the valley of Hebron | ✅ |
| Where in Egypt Potiphar's house / the prison was isn't said | 39:1, 39:20, 40:3 | ✅ |
| All places used are linked to vayeshev in places.json | `check:stories --strict` 0 warnings | ✅ |
| Finale: close stops may merge into one pin, which depends on screen size | observed at 390 px: 1·2 merged | ✅ worded generically |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Vayeshev, tagline "Joseph and his dreams.", range 37:1 – 40:23 | parshaList.json; checker | ✅ |
| 1 | Jacob settled in the land where his father had sojourned, Canaan; Joseph 17, tends flocks with brothers, helper to sons of Bilhah and Zilpah; bad reports to their father | 37:1–2 (JPS; Hebrew בֶּן־שְׁבַע־עֶשְׂרֵה שָׁנָה) | ✅ |
| 1 note | "at Mamre, at Kiriath-arba—now Hebron" | 35:27 (JPS) | ✅ |
| 1 note | Rashi: whatever wrong he saw in his brothers, the sons of Leah, he told his father | Rashi on 37:2 (כָּל רָעָה שֶׁהָיָה רוֹאֶה בְאֶחָיו בְנֵי לֵאָה) | ✅ |
| 2 | Quote of 37:3 (JPS exact); Hebrew וְיִשְׂרָאֵל … כְּתֹנֶת פַּסִּים | 37:3 | ✅ |
| 2 | Brothers saw father loved him more than any of them; could not speak a friendly word | 37:4 (JPS) | ✅ |
| 2 note | JPS note: Or "a coat of many colors"; meaning of Heb. uncertain | JPS note on 37:3 | ✅ |
| 2 note | Rashi: passim = fine wool (כְּלִי מֵילָת); same garment in the story of Tamar and Amnon | Rashi on 37:3; 2 Samuel 13:18 (כְּתֹנֶת פַּסִּים) | ✅ |
| 2 note | Shabbat 10b: Rava bar Meḥasseya / Rav Ḥama bar Gurya / Rav; never single out one son; two sela of fine wool; jealousy; ancestors went down to Egypt | Shabbat 10b | ✅ |
| 3 | Sheaves dream told to brothers; his sheaf stood up and remained upright; theirs gathered and bowed low; "Do you mean to reign over us?"; hated him even more | 37:5–8 (JPS) | ✅ |
| 4 | Stars title = JPS 37:9 "And this time, the sun, the moon, and eleven stars were bowing down to me." | 37:9 | ✅ |
| 4 | Father berated ("scolds") him; quote of 37:10 exact; brothers wrought up; father kept the matter in mind | 37:10–11 (JPS) | ✅ |
| 4 note | Rachel had already died | 35:19 | ✅ |
| 4 note | Rashi: "Is not your mother long since dead?"; didn't know it meant Bilhah who raised him like a mother; Jacob meant to make his sons forget it so they wouldn't envy | Rashi on 37:10 | ✅ |
| 4 | `sky: 'dream'`: the sun, the moon and exactly eleven stars, as 37:9 gives them | 37:9; StoryPlayer (lane/name-letter-cards) | ✅ |
| 4 note | The sky illustrates the dream as told; when and where it was dreamed isn't said | 37:9 | ✅ |
| 5 | Brothers pasturing at Shechem; go see how brothers and flocks fare, bring back word; "I am ready"; sent from the valley of Hebron | 37:12–14 (JPS; Hebrew מֵעֵמֶק חֶבְרוֹן) | ✅ |
| 5 note | Rashi: Hebron is on a hill; ‘emeq read as the deep counsel of "that righteous one buried in Hebron", to fulfill what was said to Abraham, "your offspring shall be strangers in a land not theirs" | Rashi on 37:14; Genesis 15:13 (JPS) | ✅ "from the root for deep": Rashi links עמק / עמוקה |
| 6 | At Shechem a man finds him wandering in the fields; dialogue; "Let us go to Dothan" | 37:14b–17 (JPS). Ref 37:14–17 covers the half-verse | ✅ |
| 6 note | Rashi: the man was Gabriel, citing Daniel ("the man Gabriel") | Rashi on 37:15 Hebrew (שֶׁנֶּאֱמַר וְהָאִישׁ גַּבְרִיאֵל) | ✅ |
| 7 | Found them at Dothan; saw him from afar, conspired to kill him, throw into a pit; Reuben: "Shed no blood! Cast him into that pit", intending to restore him to his father; stripped of the ornamented tunic; cast into pit; empty, no water | 37:17–24 (JPS) | ✅ |
| 7 note | "A savage beast devoured him" as their plan | 37:20 | ✅ |
| 7 note | Rashi: no water, but snakes and scorpions | Rashi on 37:24 | ✅ |
| 8 | Caravan of Ishmaelites from Gilead; camels bearing gum, balm, ladanum to Egypt; they sat down to a meal | 37:25 (JPS; Hebrew נְכֹאת, צְרִי, לֹט) | ✅ |
| 8 note | JPS note, citing Bekhor Shor: "they" = the brothers other than those tending the flock, who included Reuben | JPS note on 37:25 ("Aside from those who tended the flock, including Reuben; cf. Bekhor Shor") | ✅ |
| 8 note | Bekhor Shor: shepherds eat in turns; Reuben, away with the flock, didn't know of the sale | Bekhor Shor on 37:25 (Sefaria, Leipzig 1856: …וראובן ומקצת אחיו היו שומרים הצאן ולפיכך לא ידע ראובן במכירתו) | ✅ |
| 8 note | Ibn Ezra says only "the nine brothers"; the card marks as inference that this would leave out Reuben and Benjamin as well as Joseph | Ibn Ezra on 37:25 (התשעה אחים) | ✅ |
| 8 note | Rashi: Arabs usually carry foul-smelling naphtha and tar; for the righteous one, spices | Rashi on 37:25 (עַרְבִיִּים … נֵפְטְ וְעִטְרָן) | ✅ |
| 8 items | Rashi: nekhot = gathering of many spices; tzeri = resin dripping from the balsam tree; lot = the Rabbis: a plant root | Rashi on 37:25 | ✅ |
| 9 | Judah's words quoted exactly; brothers agreed | 37:26–27 (JPS) | ✅ |
| 9 note | Reuben proposed the pit to bring him back; Judah proposes selling | 37:22, 37:27 | ✅ |
| 10 | Guess: 20 pieces; reveal quotes 37:28 exactly (second sentence) | 37:28 (JPS; Hebrew בְּעֶשְׂרִים כָּסֶף) | ✅ |
| 11 | Midianite traders pass by; Joseph pulled up, sold to Ishmaelites, who bring him to Egypt (subject left open, as in the Hebrew) | 37:28 | ✅ |
| 11 | Reuben returns to the pit, Joseph gone, rends clothes; goes back to his brothers and says "The boy is gone! Now, what am I to do?" | 37:29–30 (JPS: "Returning to his brothers, he said") | ✅ |
| 11 note | Hebrew "they"; JPS "the brothers", its note points to 45:4–5 and Bekhor Shor; 45:4 quoted exactly | JPS note on 37:28 ("Heb. 'they.' Cf. 45.4–5; Bekhor Shor."); 45:4 (JPS) | ✅ |
| 11 note | 37:36 "Midianites" (Heb. Medanites) sold him to Potiphar; 39:1 Potiphar bought him from the Ishmaelites | 37:36 + JPS note; 39:1 (JPS) | ✅ |
| 11 note | Rashi: another caravan; the sons of Jacob pulled him up, sold him to Ishmaelites → Midianites → Egyptians | Rashi on 37:28 Hebrew (וְהַמִּדְיָנִים לַמִּצְרִים) | ✅ |
| 11 note | Rashbam: while the brothers sat eating, Midianites passing by found him, pulled him up, sold him to the Ishmaelites; the brothers may not have known | Rashbam on 37:28 (ויש לומר שהאחים לא ידעו) | ✅ He also offers that the brothers may have told the Midianites to pull him up; not stated, the note says "may not have known" |
| 11 note | Ibn Ezra: Midianites are called Ishmaelites, as Judges 8:24 | Ibn Ezra on 37:28; Judges 8:24 | ✅ |
| 11 note | Rashbam on 37:36: by the plain sense, Medanites and Ishmaelites are the same | Rashbam on 37:36 (ומדן וישמעאלים אחד הם לפי הפשט) | ✅ |
| 12 | Took the tunic, slaughtered a kid, dipped it in the blood; had it taken to father; quote of 37:32 exact; recognized; "A savage beast devoured him!"; rent clothes; mourned many days; refused to be comforted | 37:31–35 (JPS) | ✅ |
| 12 note | "No, I will go down mourning to my son in Sheol"; place not given; no stop highlighted, the numbered pins only show the route so far | 37:35; 37:14; screenshot (pins 1–3 in overview) | ✅ |
| 13 | Judah left his brothers, camped near an Adullamite named Hirah; married daughter of a Canaanite named Shua; sons Er, Onan, Shelah; Er married Tamar, displeased GOD, died; Onan told to provide offspring, acted so as not to, died; Tamar sent to her father's house until Shelah grows up | 38:1–11 (JPS) | ✅ Told soberly; 38:9's detail not described |
| 13 note | Hebrew וַיֵּרֶד = "went down" | 38:1 Hebrew | ✅ |
| 13 note | Rashi on 38:1: why placed here; brothers lowered Judah from his greatness on seeing their father's grief: "you said to sell him; had you said to return him we'd have listened" | Rashi on 38:1 | ✅ |
| 13 note | "your duty by her as a brother-in-law"; JPS note Cf. Deut 25:5; that law paraphrased | 38:8 + JPS note; Deuteronomy 25:5–6 (JPS) | ✅ |
| 13 note | "He too might die like his brothers"; when Shelah was born "he was at Chezib" (the verse's "he" is left as the verse has it) | 38:11, 38:5 (JPS; Hebrew וְהָיָה בִכְזִיב) | ✅ |
| 13 note | Rashi on 38:1 includes the brothers' words "you told us to sell him" | Rashi on 38:1 (אַתָּה אָמַרְתָּ לְמָכְרוֹ) | ✅ |
| 14 | A long time afterward; to Timnah for sheepshearing; Tamar saw Shelah grown and she not given to him as wife; took off widow's garb, covered face with veil, sat at the entrance to Enaim on the road to Timnah; Judah took her for a prostitute, did not know she was his daughter-in-law; seal, cord, staff as pledge; she conceived | 38:12–18 (JPS) | ✅ Told briefly |
| 14 note | Shua's daughter died; pledge until he sent a kid; Hirah couldn't find her; "Let her keep them, lest we become a laughingstock" | 38:12, 38:17–23 (JPS) | ✅ |
| 14 note | Rashi: veiled her face so he would not recognize her | Rashi on 38:14 (כִּסְּתָה פָנֶיהָ, שֶׁלֹּא יַכִּיר בָּהּ) | ✅ |
| 15 | Quote of 38:26 (JPS exact, first sentence); Hebrew צָדְקָה מִמֶּנִּי … לְשֵׁלָה בְנִי | 38:26 | ✅ |
| 15 | About three months later told she is pregnant; orders her brought out, "She should be burned!"; sends seal, cord and staff; "Examine these: whose seal and cord and staff are these?" (exact); recognized them | 38:24–26 (JPS) | ✅ Accusation wording of 38:24 not repeated |
| 15 note | JPS: "Bring her out" = for a hearing in court; her message quoted exactly | JPS note on 38:24; 38:25 | ✅ |
| 15 note | Rashi: didn't want to shame him openly; if he admits, let him admit himself, if not let them burn me; "from here they said" better to be thrown into a fiery furnace than shame another in public | Rashi on 38:25 (מִכָּאן אָמְרוּ) | ✅ |
| 15 note | Sotah 10b learns this from Tamar | Sotah 10b ("From where do we derive this? From Tamar") | ✅ |
| 15 note | Same words הַכֶּר־נָא said to Jacob (37:32); Bereshit Rabbah 85:11, Rabbi Yoḥanan: God told Judah "You said to your father 'Identify, please'… Tamar will say to you 'Identify, please'" | 37:32 Hebrew; Bereshit Rabbah 85:11 (Sefaria 2022 English) | ✅ |
| 16 | Twins; one put out a hand, midwife tied a crimson thread: "This one came out first"; drew back, brother came out, named Perez; then Zerah with the thread | 38:27–30 (JPS) | ✅ |
| 16 note | JPS notes: pereṣ "breach" connected with Perez; Zerah "brightness," perhaps alluding to the thread; midwife's words quoted | JPS notes on 38:29–30 | ✅ |
| 16 note | Line of Perez to David, ten names in order | Ruth 4:18–22 (JPS) | ✅ |
| 17 | Potiphar, a courtier of Pharaoh, bought him; GOD with Joseph, he succeeded; master saw; personal attendant; all he owned in his hands; GOD blessed the house for Joseph's sake | 39:1–5 (JPS) | ✅ |
| 17 note | "a courtier of Pharaoh and his prefect"; JPS: precise force of sar haṭṭabaḥim uncertain | 37:36, 39:1 + JPS note on 37:36 | ✅ |
| 17 note | Rashi on 39:1: returns to the first subject; interrupted to connect Judah's descent with Joseph's sale | Rashi on 39:1 (לִסְמֹךְ יְרִידָתוֹ שֶׁל יְהוּדָה לִמְכִירָתוֹ שֶׁל יוֹסֵף … הוֹרִידוּהוּ מִגְּדֻלָּתוֹ) | ✅ Rashi's second reason not cited |
| 18 | Quote of 39:9 end (JPS exact); Hebrew וְאֵיךְ … לֵאלֹהִים | 39:9 | ✅ |
| 18 | Well built and handsome; master's wife asks him to "be with her" (39:10 wording); refuses; master put everything in his hands, withheld nothing except her, "since you are his wife"; day after day, he did not yield | 39:6–10 (JPS) | ✅ Told delicately |
| 19 | One day, none of the household inside; she caught his garment; he left it and fled outside; she kept it; to the servants: the Hebrew came to lie with her (39:14 "This one came to lie with me"); to the master: "the Hebrew slave" came "to dally with" her (39:17); both times, he fled when she screamed (39:15, 39:18); master furious; prison where the king's prisoners were confined | 39:11–20 (JPS) | ✅ |
| 19 note | He refused (39:8–10) and fled (39:12); "was furious" without saying at whom | 39:19 Hebrew וַיִּחַר אַפּוֹ (no object) | ✅ |
| 20 | GOD with Joseph, kindness, chief jailer favorable; all prisoners in his charge; whatever he did GOD made successful | 39:21–23 (JPS) | ✅ |
| 21 | Cupbearer and baker gave offense; same prison; Joseph attended them; each dreamed his own dream the same night; morning, downcast; "We had dreams, and there is no one to interpret them"; "Surely God can interpret! Tell me" | 40:1–8 (JPS) | ✅ |
| 21 note | Rashi: a fly in the cupbearer's cup, a pebble in the baker's bread | Rashi on 40:1 | ✅ |
| 22 | Vine with three branches, budded, blossomed, ripened; pressed grapes into Pharaoh's cup; three branches = three days; restored to post; "But think of me"; mention me to Pharaoh; "I was kidnapped from the land of the Hebrews" | 40:9–15 (JPS) | ✅ |
| 22 note | "nor have I done anything here…" exact; "pardon you" lit. "lift up your head", cf. vv. 19, 20 | 40:15; JPS note on 40:13 | ✅ |
| 23 | Three baskets on his head; the top one holding all kinds of baked food for Pharaoh (not "full"); birds eating; three days; Pharaoh will put him to death | 40:16–19 (JPS) | ✅ |
| 23 note | 40:19 quoted exactly; lit. "lift up your head"; "openwork" and note on ḥori | 40:19 + JPS notes on 40:16, 40:19 | ✅ |
| 24 | Quote 40:23 exact; Hebrew וְלֹא־זָכַר … וַיִּשְׁכָּחֵהוּ; last verse of the parsha | 40:23; parsha range ends 40:23 | ✅ |
| 24 | Third day, Pharaoh's birthday, banquet; cupbearer restored; baker put to death ("impaled"), as Joseph had interpreted | 40:20–22 (JPS) | ✅ |
| 24 note | Rashi: "did not remember" that day, "forgot" afterward; because Joseph trusted in him he had to stay imprisoned two years | Rashi on 40:23 | ✅ |
| 24 note | Next week begins "After two years' time" | 41:1 (JPS) | ✅ |
| 25 | Talk card = Everyone question; map note (see Map table) | 38:26 | ✅ |
| Q Kids | Jacob loved Joseph best and made him an ornamented tunic; his brothers came to hate him (37:3–4) | 37:3–4 (JPS) | ✅ Hatred tied to the father's love, as 37:4 has it |
| Q Deeper | "Please examine it" (37:32) and the same words to Judah (38:25); Bereshit Rabbah 85:11 connects them | 37:32, 38:25 Hebrew הַכֶּר־נָא; Bereshit Rabbah 85:11 | ✅ |

## Known traps

| Trap | Handling |
|---|---|
| Who sold Joseph | The body leaves the subject open, as the Hebrew does ("they"); the note gives JPS's rendering, 37:36 vs 39:1, and Rashi, Rashbam and Ibn Ezra, each attributed. |
| "Coat of many colors" | The story uses JPS "ornamented tunic", and the Hebrew is כְּתֹנֶת פַּסִּים; the JPS note gives "a coat of many colors" and says the meaning is uncertain. |
| Reuben vs Judah | Reuben: the pit, to restore him (37:22). Judah: selling (37:26–27). Separate cards. |
| Joseph's age | 17 (37:2). |
| Hebron | The text says "valley of Hebron" (37:14), the stop name. The hedge says the pin marks Hebron itself. |
| Dothan | Tel Dothan, hedged "usual site". |

## Unverified / left open

- Nothing in the cards is unverified. Two things rest on secondary summaries: the Timnah identification debate (Wikipedia only) and "near today's Cairo" (coordinates compared by hand).
- The emblem cover says "ILLUSTRATIVE · GENESIS 37:7, 37:9" (from `briefs.ts`). It was not part of this story file and was not re-checked here.

## Independent fact-check, pass 1 (wf_5e59c24a-d50)

376 claims, 344 verified. Every story finding was re-checked on Sefaria (JPS + notes, Hebrew, Rashi, Ibn Ezra, and Bekhor Shor on 37:25, fetched for this pass) and fixed in `vayeshev.ts`:

| Id | Finding | Fix |
|---|---|---|
| c018 | "names Jacob's home only later" ignored 37:1 (the land of Canaan) | Card 1 note: the verses say he lived in Canaan (37:1) but name no town until 37:14; the map shows the land, and no stop is highlighted |
| c048 | Stars card drew ~90 random stars, no sun or moon | `sky: 'dream'` (the sun, the moon and exactly eleven stars); the note describes it as an illustration of the dream as told |
| c095 | Reuben was among those tending the flock, not the eaters | Card 8 note: "The JPS note, citing Bekhor Shor, says 'they' means the brothers other than those tending the flock, who included Reuben"; adds Bekhor Shor's own reason (shepherds eat in turns, so Reuben didn't know of the sale). Bekhor Shor added to `sources` |
| c096 | Ibn Ezra says only "the nine brothers" | Quoted as such; "would leave out Reuben and Benjamin as well as Joseph" marked as inference |
| c105 | Gilead sublabel lacked "point illustrative" | Spot renamed "Gilead (a region; point illustrative)"; camera re-framed (bearing −35) so the longer label fits |
| c122 | Reuben's words said to his brothers, not at the pit | "goes back to his brothers and says…" (37:30) |
| c141, c142 | "no pin is lit" while overview pins show | "no stop is highlighted here; the numbered pins only show Joseph's route so far" (card 12). Cards 1 and 3 say "no stop is highlighted" (no pins show there) |
| c143 | Tunic-card camera east of Jerusalem | Moved to the Hebron–Shechem midpoint [35.19, 31.87]; the note makes no claim about the camera |
| c158 | 38:5 says "he was at Chezib", not that Shelah was born there | Quoted: "When Shelah was born, 'he was at Chezib'" |
| c164, c165 | Judah cards centred near Hebron, not the Shephelah | Cards 13, 14, 16 centred near Adullam; the header comment says the story is framed on the Shephelah around Adullam |
| c193 | 38:26 quote backdrop was the coastal plain | Centre [34.95, 31.85], the Shephelah just north of Adullam, with the Hebron pin under the card; the comment matches |
| c216 | Dothan → Egypt arc ran over the sea | Route stop Egypt gets `via: NEGEV` [34.6, 31.1]; the Potiphar note and the finale say the line bends inland only to stay on land |
| c228 | Master's words put in both speeches | Servants: "the Hebrew came to lie with her" (39:14); master: "the Hebrew slave" came "to dally with" her (39:17) |
| c256 | "full" not in 40:17 | "holding all kinds of baked food for Pharaoh" |
| c272 | Kids premise tied hatred to the tunic | "Jacob loved Joseph best and made him an ornamented tunic, and his brothers came to hate him (37:3–4)" |
| c287 | Mis-describes the screen (spots also pulse) | No story change needed |
| missed | JPS note on 37:28 cites 45:4–5 and Bekhor Shor | Card 11 note says so |
| missed | Rashi on 38:1 dropped "you told us to sell him" | Added |
| missed | Dream and early cards centred on Hebron though the town isn't named | Regional camera on the land of Canaan (37:1) for cards 1–4 |
| missed | Gilead label might clip at 390 px | Checked in a screenshot after the re-frame: it fits |

Not changed here (handled on the code branch or outside the story file): c005 (cover emblem), R5–R83 (Read and History tabs, date bar), and the parshaList.json summary items.

**Rendering note for the code branch.** On the dream card at 390 px, the drawn sun, moon and stars arc sits behind the ref line and the top of the quoted title (screenshot `shots2/c4.png`). This is StoryPlayer layout; the story file can't move it.

## Independent fact-check, pass 3 (wf_e3eb356b-2b9)

376 claims, 368 verified; 8 problems and 10 "missed" notes. Each was re-checked here: Sefaria API v3 (Genesis 37:8, 37:11, 38:14 with the JPS note, 38:16, 38:26; Rashi on 37:24 and 39:1, English and Hebrew); Wikipedia "Adullam", "Middle Kingdom of Egypt", "Second Intermediate Period of Egypt", "Ten Martyrs" (raw wikitext). The Read-tab checker read the pass-2 `parshaList.json` text (on `redesign/daylight`, commit 42f4f1c), which this branch doesn't have yet; so the Read-tab fixes are written up in `2026-09-28-vayeshev-shared-fixes.md`, not applied here.

| Id | Finding | Decision | Evidence | Change |
|---|---|---|---|---|
| c154 | Spot label named only Kh. esh-Sheikh Madhkur | Accept, modified | Wikipedia "Adullam": Madhkur "is thought … to be the 'upper Adullam'"; Kh. ʿId el-Minya, "lying directly below it", "is the site recognised as Adullam proper"; "still inconclusive" | Card 14 spot: "Adullam (proposed site)" |
| c260 | Finale note: "Adullam is a proposed site (Khirbet esh-Sheikh Madhkur)" | Accept, modified | As c154 | Card 26 note: "Adullam's site isn't certain: its pin is at Khirbet esh-Sheikh Madhkur, thought to be 'upper Adullam', above Khirbet ʿId el-Minya, the ruin identified as Adullam itself." |
| missed | `ADULLAM` doc comment names Madhkur only | Accept | As c154 | Comment rewritten the same way (not user-facing) |
| c184 + missed | Card 16 comment: "just north of Adullam", "Hebron pin kept under the card" | Accept, modified (code comment only) | Centre [34.95, 31.85] is 22.6 km from the Adullam spot at bearing 347° (computed); the checker's "north-west" would be wrong too | Comment: "a Shephelah backdrop about 22 km north-north-west of the Adullam spot (not marked on this card)"; the Map row above updated |
| c264 | "all four pins" in the finale; on a phone Shechem and Dothan merge | No user-facing change | The claim is the extractor's wording; the card 26 note already says "Stops close together on screen may share one numbered pin … which ones merge depends on the screen size" | None |
| missed | Card 12 ref line lacks 37:36 and 39:1, which the note quotes | Accept | Note quotes 37:36 ("the Midianites") and 39:1 ("from the Ishmaelites") | ref: "Genesis 37:28–30, 37:36, 39:1 · Genesis 45:4 · …" |
| missed | Enaim: the JPS note compares Enam (Joshua 15:34) | Reject (optional; no error) | 38:14 JPS note: "Enaim Cf. Enam, Josh. 15.34." A "cf." is not a location; "Where Enaim … was isn't known" stands | None |
| missed | Rashi on 37:24 (snakes and scorpions) is from Shabbat 22a | Reject | Rashi's Hebrew gives no source in his words; the parenthesis "(בראשית רבה, שבת כ"ב)" is the edition's reference. Per the Rashi rule above, the story credits a source only where Rashi names it | None |
| R25 | narrativeSummary "who does not know her" | Accept | 38:16 JPS "he did not know that she was his daughter-in-law"; 38:26 "he was not intimate with her again" (לְדַעְתָּהּ) | Shared-fixes doc, item 2 |
| missed ×2 | `summary` puts Judah and Tamar after Potiphar and prison | Accept | Rashi on 39:1: "It (Scripture) now reverts to the original subject" | Shared-fixes doc, item 1 |
| R60 | "the sources disagree on who the ten were and how some of them died" unsupported | Reject | Wikipedia "Ten Martyrs": the poem has Rabbi Yishmael's skin flayed from his head, while "The Avot of Rabbi Natan states that … he was quickly decapitated as well"; Judah ben Baba was killed by soldiers' javelins per Sanhedrin 14a, not executed by the emperor; "The identities of some of the lesser known martyrs are also inconsistently reported" | None |
| R74 | "Middle Kingdom gave way in the 18th century BCE" | Accept, modified | Wikipedia "Middle Kingdom of Egypt": "2040 to 1782 or 1700 BC (depending on the definition)", or "around 1650 BC" if the 13th Dynasty is included | Shared-fixes doc, item 3 |
| R97 | The shared patriarchs label reads as a date for Vayeshev's events | Accept in part; shared | The band's sources date "the patriarchal age" as a whole | Shared-fixes doc, item 4 (shared band, not edited) |
| missed | `approximateDateBCE` 1750–1550 unhedged (legacy UI) | Accept; shared | No source in the data; differs from the date bar | Shared-fixes doc, item 5 |
| missed | historicalContext leaves out Hendel's conclusion (first-millennium price) | Not decided | Hendel's article was not read in this pass (pass 2: the BAR articles are paywalled) | None |
| missed | Nuzi/Ugarit "15th–13th centuries" vs Kitchen BAR 1995 "14th and 13th" | Reject (optional) | The checker says the span is supported (Kitchen's book: "later 15th-century Nuzi"); not re-read here | None |

**Note on this branch's copy of `parshaList.json`.** It still has the pre-pass-2 Vayeshev text ("Meanwhile, Judah's story with Tamar is told"; "only about six of them seem to have been martyred"; "comes from the Greek Septuagint"). Those were fixed on `redesign/daylight` in 42f4f1c; this branch doesn't touch that record, so a merge keeps the daylight text.
