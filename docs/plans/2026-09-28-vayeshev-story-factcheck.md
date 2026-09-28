# Vayeshev story: self fact-check

Story: `src/redesign/stories/vayeshev.ts` (Genesis 37:1 – 40:23), 26 cards. Checked 2026-09-28 by the author, before review. The fact-check workflow has not been run yet.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.37.1-40.23`): English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah (cantillation stripped, vowels kept). Cross-references fetched the same way: Genesis 15:13, 35:19, 35:27, 41:1, 41:46, 45:4–5; Deuteronomy 25:5–6; Judges 8:24; 2 Samuel 13:18; Ruth 4:18–22. Rashi = Rosenbaum–Silbermann (Sefaria), checked against the Hebrew, on Genesis 37 (2, 3, 10, 14, 15, 24, 25, 28, 36), 38 (1, 5, 14, 24–26, 29–30), 39 (1, 6, 9), 40 (1, 16, 20, 23). Rashbam on 37:28, 37:36 = Munk (HaChut Hameshulash) + Hebrew. Ibn Ezra on 37:25, 37:28 = Strickman–Silver + Hebrew. Ramban on 37:25 was read but is not cited. Bereshit Rabbah 85:11 = Sefaria Midrash Rabbah (2022) + Hebrew. Shabbat 10b and Sotah 10b = William Davidson edition. Sites = Wikipedia ("Tel Dothan", "Adullam", "Timnah"), the Vayishlach claim table (Shechem = Tell Balata, Hebron = Tel Rumeida), and `src/data/places.json`.

**Rule applied to Rashi.** The Rosenbaum–Silbermann English adds source citations in parentheses (e.g. "(Shabbat 10b)", "(Midrash Tanchuma …)") that are not in Rashi's Hebrew. The story says Rashi cites a source only where his Hebrew names it (e.g. Daniel on 37:15). Where Rashi says "וְאוֹמֵר אֲנִי" (38:5) it would be "Rashi suggests"; that comment is not used.

**Read tab respected** (`parshaList.json` vayeshev): ketonet passim meaning uncertain, "coat of many colors" from the Septuagint (the story says only what the JPS note says), Rashi = fine wool, 2 Samuel 13:18; Shabbat 10b on favoritism; Bereshit Rabbah 85:11 linking haker na; twenty pieces of silver; both Midianites and Ishmaelites named.

**Verdicts:** ✅ verified against the source named. ⚠️ = verified, with a caveat stated.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Route: valley of Hebron → Shechem → Dothan → Egypt, in that order | 37:14, 37:17, 37:28, 39:1 | ✅ |
| Valley of Hebron (a375f5a) pinned at the same point as Hebron (Tel Rumeida); hedge "pin marks Hebron (Tel Rumeida)" | places.json a375f5a [35.10222, 31.525087] = Hebron a85151a | ✅ |
| Shechem pin (adf74d4) = Tell Balata; hedge "usual site" | places.json "Tell Balatah"; Vayishlach table (Wikipedia "Tell Balata") | ✅ |
| Dothan pin (ab635e4) = Tel Dothan, near Jenin; "the modern consensus" | places.json "Tel Dotan"; Wikipedia "Tel Dothan" ("The modern consensus is that the archaeological site of Tell Dothan corresponds to ancient Dothan"; ~10 km SW of Jenin) | ✅ hedged "usual site" |
| Egypt pin (af301ca) is a region; point illustrative, "near today's Cairo" | places.json [31.3075, 30.129444], type region; about 12 km NE of central Cairo (30.044 N, 31.236 E) | ✅ |
| Gilead (ae73b90) is a region east of the Jordan; point illustrative | places.json type region; 37:25; Vayetze/Vayishlach tables | ✅ spot "Gilead (a region)" |
| Adullam (af82614) proposed at Khirbet esh-Sheikh Madhkur, not certain | places.json; Wikipedia "Adullam" ("The identification … is still inconclusive") | ✅ spot "Adullam (proposed: …)" |
| The verse says only that Hirah was an Adullamite | 38:1 | ✅ |
| Timnah of Genesis 38 uncertain (scholars differ which Timnah); Enaim's site unknown; neither marked | Wikipedia "Timnah" (Gen 38 Timnah: Tibna or Khirbet et-Tibbaneh proposed; hill-country Timnah "as yet unidentified"); places.json Enaim "location uncertain", Timnah 3 confidence low | ✅ |
| Chezib not marked | 38:5 | ✅ |
| No pin lit where the verses don't place the event (cards 1, 3, 4, 13) | 37:1–11, 37:31–35 name no place; 37:14 first names the valley of Hebron | ✅ |
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
| 4 note | Night sky illustrative; the verses don't say when the dream came | 37:9 | ✅ |
| 5 | Brothers pasturing at Shechem; go see how brothers and flocks fare, bring back word; "I am ready"; sent from the valley of Hebron | 37:12–14 (JPS; Hebrew מֵעֵמֶק חֶבְרוֹן) | ✅ |
| 5 note | Rashi: Hebron is on a hill; ‘emeq read as the deep counsel of "that righteous one buried in Hebron", to fulfill what was said to Abraham, "your offspring shall be strangers in a land not theirs" | Rashi on 37:14; Genesis 15:13 (JPS) | ✅ "from the root for deep": Rashi links עמק / עמוקה |
| 6 | At Shechem a man finds him wandering in the fields; dialogue; "Let us go to Dothan" | 37:14b–17 (JPS). Ref 37:14–17 covers the half-verse | ✅ |
| 6 note | Rashi: the man was Gabriel, citing Daniel ("the man Gabriel") | Rashi on 37:15 Hebrew (שֶׁנֶּאֱמַר וְהָאִישׁ גַּבְרִיאֵל) | ✅ |
| 7 | Found them at Dothan; saw him from afar, conspired to kill him, throw into a pit; Reuben: "Shed no blood! Cast him into that pit", intending to restore him to his father; stripped of the ornamented tunic; cast into pit; empty, no water | 37:17–24 (JPS) | ✅ |
| 7 note | "A savage beast devoured him" as their plan | 37:20 | ✅ |
| 7 note | Rashi: no water, but snakes and scorpions | Rashi on 37:24 | ✅ |
| 8 | Caravan of Ishmaelites from Gilead; camels bearing gum, balm, ladanum to Egypt; they sat down to a meal | 37:25 (JPS; Hebrew נְכֹאת, צְרִי, לֹט) | ✅ |
| 8 note | JPS note: "they" = aside from those who tended the flock, including Reuben | JPS note on 37:25 | ✅ |
| 8 note | Ibn Ezra: the nine brothers, neither Reuben nor Benjamin | Ibn Ezra on 37:25 (התשעה אחים; translator's note names Reuben and Benjamin) | ⚠️ "without Reuben or Benjamin" is the translator's gloss of "the nine"; arithmetically 12 − Joseph − Reuben − Benjamin = 9 |
| 8 note | Rashi: Arabs usually carry foul-smelling naphtha and tar; for the righteous one, spices | Rashi on 37:25 (עַרְבִיִּים … נֵפְטְ וְעִטְרָן) | ✅ |
| 8 items | Rashi: nekhot = gathering of many spices; tzeri = resin dripping from the balsam tree; lot = the Rabbis: a plant root | Rashi on 37:25 | ✅ |
| 9 | Judah's words quoted exactly; brothers agreed | 37:26–27 (JPS) | ✅ |
| 9 note | Reuben proposed the pit to bring him back; Judah proposes selling | 37:22, 37:27 | ✅ |
| 10 | Guess: 20 pieces; reveal quotes 37:28 exactly (second sentence) | 37:28 (JPS; Hebrew בְּעֶשְׂרִים כָּסֶף) | ✅ |
| 11 | Midianite traders pass by; Joseph pulled up, sold to Ishmaelites, who bring him to Egypt (subject left open, as in the Hebrew) | 37:28 | ✅ |
| 11 | Reuben returns, Joseph gone, rends clothes; "The boy is gone! Now, what am I to do?" | 37:29–30 (JPS) | ✅ |
| 11 note | Hebrew "they"; JPS "the brothers", note cites 45:4–5; 45:4 quoted exactly | JPS note on 37:28; 45:4 (JPS) | ✅ |
| 11 note | 37:36 "Midianites" (Heb. Medanites) sold him to Potiphar; 39:1 Potiphar bought him from the Ishmaelites | 37:36 + JPS note; 39:1 (JPS) | ✅ |
| 11 note | Rashi: another caravan; the sons of Jacob pulled him up, sold him to Ishmaelites → Midianites → Egyptians | Rashi on 37:28 Hebrew (וְהַמִּדְיָנִים לַמִּצְרִים) | ✅ |
| 11 note | Rashbam: while the brothers sat eating, Midianites passing by found him, pulled him up, sold him to the Ishmaelites; the brothers may not have known | Rashbam on 37:28 (ויש לומר שהאחים לא ידעו) | ✅ He also offers that the brothers may have told the Midianites to pull him up; not stated, the note says "may not have known" |
| 11 note | Ibn Ezra: Midianites are called Ishmaelites, as Judges 8:24 | Ibn Ezra on 37:28; Judges 8:24 | ✅ |
| 11 note | Rashbam on 37:36: by the plain sense, Medanites and Ishmaelites are the same | Rashbam on 37:36 (ומדן וישמעאלים אחד הם לפי הפשט) | ✅ |
| 12 | Took the tunic, slaughtered a kid, dipped it in the blood; had it taken to father; quote of 37:32 exact; recognized; "A savage beast devoured him!"; rent clothes; mourned many days; refused to be comforted | 37:31–35 (JPS) | ✅ |
| 12 note | "No, I will go down mourning to my son in Sheol"; place not given | 37:35; 37:14 | ✅ |
| 13 | Judah left his brothers, camped near an Adullamite named Hirah; married daughter of a Canaanite named Shua; sons Er, Onan, Shelah; Er married Tamar, displeased GOD, died; Onan told to provide offspring, acted so as not to, died; Tamar sent to her father's house until Shelah grows up | 38:1–11 (JPS) | ✅ Told soberly; 38:9's detail not described |
| 13 note | Hebrew וַיֵּרֶד = "went down" | 38:1 Hebrew | ✅ |
| 13 note | Rashi on 38:1: why placed here; brothers lowered Judah from his greatness on seeing their father's grief: "you said to sell him; had you said to return him we'd have listened" | Rashi on 38:1 | ✅ |
| 13 note | "your duty by her as a brother-in-law"; JPS note Cf. Deut 25:5; that law paraphrased | 38:8 + JPS note; Deuteronomy 25:5–6 (JPS) | ✅ |
| 13 note | "He too might die like his brothers"; Shelah born at Chezib | 38:11, 38:5 | ✅ |
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
| 19 | One day, none of the household inside; she caught his garment; he left it in her hand and fled outside; she kept it; told servants, then master: the Hebrew slave came "to dally with" her, fled when she screamed; master furious; put in prison where the king's prisoners were confined | 39:11–20 (JPS) | ✅ |
| 19 note | He refused (39:8–10) and fled (39:12); "was furious" without saying at whom | 39:19 Hebrew וַיִּחַר אַפּוֹ (no object) | ✅ |
| 20 | GOD with Joseph, kindness, chief jailer favorable; all prisoners in his charge; whatever he did GOD made successful | 39:21–23 (JPS) | ✅ |
| 21 | Cupbearer and baker gave offense; same prison; Joseph attended them; each dreamed his own dream the same night; morning, downcast; "We had dreams, and there is no one to interpret them"; "Surely God can interpret! Tell me" | 40:1–8 (JPS) | ✅ |
| 21 note | Rashi: a fly in the cupbearer's cup, a pebble in the baker's bread | Rashi on 40:1 | ✅ |
| 22 | Vine with three branches, budded, blossomed, ripened; pressed grapes into Pharaoh's cup; three branches = three days; restored to post; "But think of me"; mention me to Pharaoh; "I was kidnapped from the land of the Hebrews" | 40:9–15 (JPS) | ✅ |
| 22 note | "nor have I done anything here…" exact; "pardon you" lit. "lift up your head", cf. vv. 19, 20 | 40:15; JPS note on 40:13 | ✅ |
| 23 | Three baskets on his head; top one with Pharaoh's baked foods; birds eating; three days; Pharaoh will put him to death | 40:16–19 (JPS) | ✅ |
| 23 note | 40:19 quoted exactly; lit. "lift up your head"; "openwork" and note on ḥori | 40:19 + JPS notes on 40:16, 40:19 | ✅ |
| 24 | Quote 40:23 exact; Hebrew וְלֹא־זָכַר … וַיִּשְׁכָּחֵהוּ; last verse of the parsha | 40:23; parsha range ends 40:23 | ✅ |
| 24 | Third day, Pharaoh's birthday, banquet; cupbearer restored; baker put to death ("impaled"), as Joseph had interpreted | 40:20–22 (JPS) | ✅ |
| 24 note | Rashi: "did not remember" that day, "forgot" afterward; because Joseph trusted in him he had to stay imprisoned two years | Rashi on 40:23 | ✅ |
| 24 note | Next week begins "After two years' time" | 41:1 (JPS) | ✅ |
| 25 | Talk card = Everyone question; map note (see Map table) | 38:26 | ✅ |
| Q Kids | Jacob made Joseph an ornamented tunic; brothers jealous | 37:3–4, 37:11 ("wrought up", Hebrew וַיְקַנְאוּ) | ✅ |
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
