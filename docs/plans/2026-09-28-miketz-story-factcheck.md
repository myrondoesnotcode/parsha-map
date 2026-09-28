# Miketz story: self fact-check

Story: `src/redesign/stories/miketz.ts` (Genesis 41:1 – 44:17), 30 cards. Checked 2026-09-28 by the author, before review.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.41.1-44.17`) before writing: English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah (cantillation stripped, vowels kept). Cross-references fetched the same way: Genesis 37:2, 37:5–10, 37:14, 40:23. Rashi = Rosenbaum–Silbermann (Sefaria), Hebrew and English, on 41:1, 41:16, 41:45 (English also checked in the Metsudah edition), 42:8, 42:24, 43:34, 44:15, 44:16. Sefaria has no Rashi on 44:5. Targum Onkelos on 41:45 = Aramaic (Sifsei Chachomim) and Metsudah English. Ramban on 42:9 (Chavel) was read but is not cited. The site of On = Wikipedia "Heliopolis (ancient Egypt)" (raw wikitext) and `src/data/places.json`.

**Read tab respected** (`parshaList.json` miketz): Joseph is thirty at 41:46. The name Zaphenath-paneah is given as disputed. The Onkelos rendering matches the Read tab's "the man to whom hidden things are revealed". The story makes no claims about Asenath's name, the Hyksos, the Famine Stela, or Ramban's reading.

**Verdicts:** ✅ verified against the source named. ⚠️ verified, with a caveat stated. No claim is left unverified.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| No journey line; `route: []`, anchor "in Egypt" (places.json af301ca, a region, pin [31.3075, 30.1294], the same point as Heliopolis) | The verses name no Egyptian city for Pharaoh's court or Joseph's house (41–44), and no place in Canaan for Jacob (42:29, 43:1–14) | ✅ |
| Joseph never leaves Egypt (dungeon to Pharaoh, 41:14; through all the land of Egypt, 41:46); the journeys between lands are the brothers': down (42:3), back to Canaan (42:29), down again (43:15) | Verses | ✅ (reworded in pass 1) |
| On = Heliopolis; site in the Ain Shams and El Matareya districts of north-east Cairo; pin acd9137 at 30.1294 N, 31.3075 E | Wikipedia "Heliopolis (ancient Egypt)": Hebrew אֹן in Gen 41:45, 50; site "within the boundaries of Ain Shams and El Matareya … in northeastern Cairo"; coord 30.129333 N 31.307528 E | ✅ spot "On (usual identification: Heliopolis)" |
| "the Egyptian city the Greeks called Heliopolis" | Wikipedia: Greek Hēlioúpolis, "City of the Sun" | ✅ |
| Canaan is a region; shown at an illustrative point in the hill country, [35.1, 31.75], not the gazetteer's point in the Galilee (a581f0c kept as `place`) | places.json type "region"; 37:14 (valley of Hebron is the last hint) | ✅ spot "Canaan (a region; point illustrative)"; all four Canaan cards carry the note |
| The Nile isn't marked in this story. The dream cards aim the camera at the river at today's Cairo ([31.2296, 30.0437]), but the stars and list cards don't draw spots, so no Nile pin is shown | Screenshots of cards 2 and 3 | ✅ (the stars card's note no longer mentions a river point) |
| The night encampment (42:27) isn't located | 42:27, 43:21 | ✅ no pin; note says so |
| Every place shown is linked to miketz in places.json | `check:stories --strict`: 0 warnings | ✅ |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Miketz, tagline "Dreams, grain and brothers.", range 41:1 – 44:17 | parshaList.json; checker | ✅ |
| 1 | No journey line; Joseph never leaves Egypt: in the dungeon, forgotten by the chief cupbearer; later travels through all the land of Egypt | 40:23; 41:14; 41:46 | ✅ |
| 1 | The journeys between lands are the brothers': down, back, down again | 42:3, 42:29, 43:15 | ✅ |
| 2 | Stars title "Pharaoh dreamed that he was standing by the Nile": a part of the JPS verse | 41:1 (JPS) | ✅ |
| 2 | "After two years' time"; two dreams, waking after each; "next morning" his spirit agitated | 41:1, 41:4–5, 41:7–8 (JPS) | ✅ |
| 2 note | מִקֵּץ; Rashi on 41:1: "at the end", as the Targum renders it | Rashi on 41:1 (names the Targum) | ✅ |
| 2 note | The verse doesn't say two years after what | 41:1 | ✅ |
| 2 note | Rashi on 41:1: no other river is called יְאֹר but the Nile, because it rises into the canals that water the land, where rain does not fall as regularly as in other lands | Rashi on 41:1 (Heb. and Rosenbaum) | ✅ |
| 2 note | Sky illustrative: he awoke, slept and dreamed again, and was agitated in the morning | 41:4–8 | ✅ |
| 3 | Seven cows, "handsome and sturdy", came up out of the Nile | 41:2 (JPS) | ✅ |
| 3 | Seven cows, "ugly and gaunt", ate up the first seven | 41:3–4 | ✅ |
| 3 | Seven ears of grain, "solid and healthy", on a single stalk | 41:5 (JPS; בְּקָנֶה אֶחָד) | ✅ |
| 3 | Seven ears "thin and scorched" (by the east wind, in the note), swallowed up the first seven | 41:6–7 | ✅ |
| 3 | Hebrew per row: יְפוֹת מַרְאֶה (41:2), רָעוֹת מַרְאֶה (41:3), בְּרִיאוֹת (41:5), דַּקּוֹת (41:6) | Hebrew text | ✅ |
| 3 note | The text doesn't say the thin ears share a stalk | 41:6, 41:23 (no stalk mentioned) | ✅ (matches the emblem brief) |
| 3 note | The cows graze in the reed grass; the ugly cows come up close behind them | 41:2–3 | ✅ |
| 3 note | Pharaoh, retelling, adds that the lean cows looked just as bad as before | 41:19–21 | ✅ |
| 4 | All the magicians and sages of Egypt; none can interpret | 41:8 | ✅ |
| 4 | Cupbearer: in custody with the chief baker; a Hebrew youth, a servant of the prefect, interpreted; it came to pass; cupbearer restored, baker impaled | 41:9–13 (JPS "the other was impaled") | ✅ |
| 5 | Sent for Joseph; rushed from the dungeon; hair cut; clothes changed; came before Pharaoh; Pharaoh's words quoted | 41:14–15 (JPS; quote is exact from "I have heard it said of you") | ✅ |
| 6 | Quote "Not I! God will see to Pharaoh's welfare." / בִּלְעָדָי אֱלֹהִים יַעֲנֶה אֶת־שְׁלוֹם פַּרְעֹה | 41:16 (JPS; Hebrew) | ✅ |
| 6 | Rashi on 41:16: the wisdom is not his own; God will put in his mouth an answer for Pharaoh's welfare | Rashi on 41:16 | ✅ |
| 7 | Dreams are one; God has told Pharaoh what God is about to do; healthy cows and ears = seven years of great abundance in Egypt; lean cows and empty ears = seven years of famine; abundance forgotten; very severe; repeated twice because determined by God, who will soon carry it out | 41:25–32 (JPS) | ✅ |
| 8 | Find someone discerning and wise; appoint overseers; grain of the good years stored in the cities as a reserve for the famine | 41:33–36 | ✅ |
| 8 | "Could we find another like him—a man with the divine spirit?"; in charge of his court; "only with respect to the throne shall I be superior to you" | 41:38–40 (JPS; the dash is rendered as a comma inside the split quote) | ✅ |
| 8 note | JPS: "organize"; others "take a fifth part of"; meaning of Heb. uncertain | JPS note on 41:34 | ✅ |
| 9 | Signet ring on Joseph's hand; robes of fine linen; gold chain; chariot of his second-in-command; "Abrek!"; "I am Pharaoh; yet without you…" | 41:42–44 (JPS) | ✅ |
| 9 note | JPS: others "Bow the knee," as though from barakh "to kneel"; perhaps from an Egyptian word of unknown meaning | JPS note on 41:43 | ✅ |
| 10 | Pharaoh names him Zaphenath-paneah (צָפְנַת פַּעְנֵחַ); gives him Asenath daughter of Poti-phera, priest of On, for a wife | 41:45 (JPS; Hebrew) | ✅ |
| 10 note | Meaning disputed. JPS: Egyptian for "God speaks; he lives," or "creator of life" | JPS note on 41:45 | ✅ (attributed) |
| 10 note | Rashi on 41:45: "explainer of hidden things"; פַּעְנֵחַ has no other example in Scripture | Rashi on 41:45 (Heb. מפרש הצפונות; ואין לפענח דמיון במקרא) | ✅ |
| 10 note | Targum Onkelos: "the man to whom hidden things are revealed" | Onkelos 41:45 (Aramaic גַּבְרָא דְמִטַּמְרָן גָּלְיָן לֵיהּ; Metsudah English) | ✅ |
| 10 note | The verses don't say where Joseph lived | 41–44 | ✅ |
| 11 | Guess: 30; the reveal quotes 41:46 exactly | 41:46 (JPS; בֶּן־שְׁלֹשִׁים שָׁנָה) | ✅ |
| 12 | Travelled through all the land of Egypt; seven years of plenty, abundant produce; grain stored in the cities, each city with the grain of the fields around it; like the sands of the sea; he stopped measuring | 41:46–49 (JPS) | ✅ |
| 13 | Manasseh the first-born: "God has made me forget completely my hardship and my parental home"; Ephraim the second: "God has made me fertile in the land of my affliction" | 41:51–52 (JPS) | ✅ |
| 13 note | Born to Asenath before the years of famine; JPS notes: nashshani ↔ Manasseh (Menashsheh), hiphrani ↔ Ephraim | 41:50; JPS notes f, g | ✅ |
| 14 | Plenty ends; famine begins as Joseph foretold; famine in all lands, bread in Egypt; the Egyptians cry to Pharaoh; "Go to Joseph; whatever he tells you, you shall do"; Joseph lays open all that was within, rations grain; all the world comes to Joseph in Egypt | 41:53–57 (JPS; 41:55 "the people", "all the land of Egypt felt the hunger") | ✅ |
| 15 | Jacob sees there are rations in Egypt; "Why do you keep looking at one another?"; ten of Joseph's brothers go to get grain rations; Jacob does not send Joseph's brother Benjamin, fearing disaster; famine in Canaan | 42:1–5 (JPS) | ✅ |
| 15 note | Where in Canaan isn't said; Joseph was last sent out from the valley of Hebron | 37:14 | ✅ |
| 15 note | Benjamin, "his mother's son" | 43:29 | ✅ |
| 16 | Joseph the vizier, dispensing rations; brothers bow low, faces to the ground; he recognizes them, they don't recognize him; acts like a stranger, speaks harshly; recalling the dreams he had dreamed about them: "You are spies" | 42:6–9 (JPS) | ✅ |
| 16 note | Dreams: sheaves bowed low to his sheaf; sun, moon and eleven stars bowing down | 37:7, 37:9 (JPS) | ✅ |
| 16 note | Rashi on 42:8: he left them without a beard and now had one; they had already been bearded | Rashi on 42:8 (first two comments) | ✅ |
| 17 | Honest; twelve brothers, sons of a certain man in Canaan; quote "The youngest, however, is now with our father, and one is no more."; three days confined; "I fear God"; one held, the rest take rations; bring the youngest | 42:11, 42:13, 42:17–20 (JPS; the quote is exact from "the youngest") | ✅ |
| 18 | "we are being punished on account of our brother"; saw his anguish, paid no heed as he pleaded; Reuben's quote; did not know Joseph understood, interpreter between them; turned away and wept; took Simeon, bound before their eyes | 42:21–24 (JPS) | ✅ |
| 18 note | Rashi on 42:24: wept because they regretted; Simeon cast him into the pit; another explanation: to separate him from Levi, lest they conspire to kill him; bound only before their eyes, then freed and fed | Rashi on 42:24 | ✅ |
| 19 | Bags filled with grain; money returned to each sack; provisions; at the night encampment one opens his sack to feed his donkey and finds the money at the mouth of his bag; trembling: "What is this that God has done to us?" | 42:25–28 (JPS) | ✅ |
| 20 | Title "It is always me that you bereave" | 42:36 (JPS) | ✅ |
| 20 | Told Jacob in Canaan all that happened; each money-bag in his sack; they and their father dismayed; Jacob's and Reuben's quotes; "My son must not go down with you." | 42:29, 42:35–38 (JPS) | ✅ |
| 21 | Famine severe; rations eaten up; "Go again"; Judah: the man warned "Do not let me see your faces unless your brother is with you"; "Send the boy in my care"; "I myself will be surety for him" | 43:1–3, 43:8–9 (JPS) | ✅ |
| 21 note | JPS: literally "Do not see my face"; chapter 43 calls the father Israel (43:6, 43:8, 43:11); chapter 42 calls him Jacob (42:1, 42:29, 42:36) | JPS note on 43:3; Genesis 42–43 (Hebrew and JPS) | ✅ (corrected in pass 1) |
| 22 | Gift: balm, honey, gum, ladanum, pistachio nuts, almonds (צֳרִי, דְּבַשׁ, נְכֹאת, לֹט, בׇּטְנִים, שְׁקֵדִים) | 43:11 (JPS; Hebrew; וָלֹט and וּשְׁקֵדִים shown without the "and") | ✅ |
| 22 note | Quote 43:11; double the money; carry back the returned money, "perhaps it was a mistake"; Benjamin; El Shaddai quote; "if I am to be bereaved, I shall be bereaved" | 43:11–14 (JPS) | ✅ |
| 23 | Went down with the gift, double money and Benjamin; stood before Joseph; steward to bring them home to dine at noon; afraid over the money; told the steward they had brought it back; "All is well with you; do not be afraid"; Simeon brought out | 43:15–23 (JPS) | ✅ |
| 23 note | Quotes of 43:18 and 43:23 | JPS | ✅ |
| 24 | Joseph comes home; they present the gift, bowing; asks after their aged father; sees Benjamin, his mother's son; "May God be gracious to you, my boy"; overcome with feeling toward his brother; hurried out, into a room, wept; washed his face, in control of himself, "Serve the meal" | 43:26–31 (JPS) | ✅ |
| 25 | Served separately; Egyptians could not dine with the Hebrews; seated oldest to youngest; looked at one another in astonishment; Benjamin's portion several times; drank their fill | 43:32–34 (JPS) | ✅ |
| 25 note | Hebrew חָמֵשׁ יָדוֹת, "five"; JPS "several", note "Lit. five" | 43:34 Hebrew; JPS note d | ✅ |
| 25 note | Rashi on 43:34: the five are his share and those of Joseph, Asenath, Manasseh, Ephraim; from the day they sold him, neither they nor he drank wine; that day they drank | Rashi on 43:34 | ✅ |
| 26 | Fill bags with food, money back, silver goblet in the youngest's bag; sent off at first light; not far from the city, the steward overtakes them: "Why did you repay good with evil?"; it's the goblet his master drinks from and uses for divination | 44:1–6 (JPS) | ✅ presented as the steward's words |
| 26 note | נַחֵשׁ יְנַחֵשׁ in 44:5 and 44:15; the claim is given in the steward's words and Joseph's; the verses don't say whether Joseph ever used it that way | Hebrew 44:5, 44:15 | ✅ neutral |
| 26 note | Rashi on 44:15: an important man like me knows how to divine, and to work out by reasoning that you stole the goblet | Rashi on 44:15 | ✅ |
| 27 | "Far be it from your servants"; brought back the money from Canaan; how could they steal silver or gold; whoever has it shall die, the rest slaves; only that one my slave; searched oldest to youngest; goblet in Benjamin's bag; rent clothes; returned to the city | 44:7–13 (JPS) | ✅ |
| 28 | Title "What can we say to my lord?"; Judah and his brothers come back to Joseph's house, throw themselves on the ground; "God has uncovered the crime of your servants"; all will be slaves; only the one with the goblet; "the rest of you go back in peace to your father" | 44:14–17 (JPS) | ✅ |
| 28 note | Rashi on 44:16: we know we did no wrong, but it came from God; the Creditor has found an opportunity to collect His debt | Rashi on 44:16 (Rosenbaum) | ✅ |
| 28 note | The parsha ends here, with Benjamin to be kept as a slave | 44:17; parsha range | ✅ |
| 29 | Talk = Everyone question; quotes 41:16 exactly | 41:16 | ✅ |
| Q Kids | Stored grain in the seven good years for the famine | 41:35–36, 41:48 | ✅ |
| Q Deeper | Quotes of 42:21 and 44:16; brothers sure of their innocence (44:7–9) | JPS | ✅ |

## Independent fact-check, pass 1 (wf_02d2dc32-bd3)

Findings in `fc1-miketz.json` / `.txt`: 325 claims, 303 verified, 22 problems, 18 missed. Every story finding on `miketz.ts` is fixed below, each re-checked on Sefaria (JPS and Hebrew of Genesis 42–43; Ibn Ezra on 41:1, Strickman–Silver; Rashi on 40:23, Rosenbaum–Silbermann) before the edit. The R* items (Read tab, parshaList.json), the cover and other files belong to the coordinator and are unchanged here.

| Finding | Fix | Re-verified against |
|---|---|---|
| c010, c013, missed (header comment) | "No journey for Joseph… Only his brothers travel" became "No journey line this week. Joseph never leaves Egypt: he is in the dungeon… and later travels through all the land of Egypt. The journeys between lands are his brothers'…"; 41:46 added to the ref; the header comment and talk note were aligned | 41:14, 41:46, 42:3, 42:29, 43:15 |
| c129, c171, missed (Judah's surety pin) | CANAAN moved from the gazetteer's Galilee point to an illustrative hill-country point [35.1, 31.75], with a comment saying so; `place: 'a581f0c'` kept; every spot now reads "Canaan (a region; point illustrative)" | places.json a581f0c; 37:14 |
| c130, missed (Judah's surety note) | All four Canaan cards (Ten brothers go down, "It is always me that you bereave", Judah's surety, A gift for the man) carry the note: a region, illustrative point, differs on purpose from the gazetteer's point, the verses don't say where the family lived | the same |
| c176 | "calls their father both Jacob and Israel (43:6, 43:8)" became "calls their father Israel (43:6, 43:8, 43:11); in the chapter before, he is Jacob (42:1, 42:29, 42:36)" | Genesis 43 has no יַעֲקֹב; 42:1, 42:4, 42:29, 42:36 have Jacob |
| c248 | Sources now include "THE JPS TANAKH: Gender-Sensitive Edition (translation and notes), Sefaria", plus "Ibn Ezra on Genesis 41:1" and Rashi on 40:23 | — |
| missed: Ten brothers ref | ref became "Genesis 42:1–5, 43:29 · 37:14" | 43:29 |
| missed: dreams ref | ref became "Genesis 41:2–7, 41:19–21" | 41:19–21 |
| missed: "organize" note | Now "In 41:34 Joseph advises that Pharaoh 'organize' the land of Egypt in the seven years of plenty (so JPS)…" | 41:33–34 and JPS note |
| missed: stars note, "two years after what" | Attributed: Ibn Ezra on 41:1 (the count may run from the cupbearer's release or from Joseph's imprisonment); Rashi on 40:23 (having trusted the cupbearer, Joseph had to stay imprisoned two years); "Ibn Ezra" added to the ref | Ibn Ezra 41:1 (לא פירש הכתוב תחלת זה החשבון… ליציאת שר המשקים… או לשבת יוסף שם); Rashi 40:23 (הֻזְקַק לִהְיוֹת אָסוּר שְׁתֵּי שָׁנִים) |
| missed: close-ups near Memphis | The quote, guess and sons cameras went from zoom 9.2–9.5 to 7.4, centred on [31.25–31.3, 30.3]. The quote card gained the note "The map is a backdrop; the verses don't say where Pharaoh's court was." The stars card note gained "The view of the Nile is a backdrop…". The dream cameras were lowered to 7.6 / 7.4 | screenshots |
| Screen-only (no text change) | BOTH_VIEW re-centred ([35.2, 31.2], z4.9) so the longer Canaan label fits on a phone | screenshots of cards 15, 19, 29 |
| Out of scope here | R3, R9, R10, R14, R18, R19, R26, R33, R34, R36, R38, R39, R40, R41 (Read tab / parshaList.json); R70 and the date bar (MapChrome.tsx); the Nile / Canaan / Heliopolis dots on the Map tab (processGeodata.ts); the cover emblem's east wind (scenes-genesis.tsx); the History-tab note | coordinator's branch |

After the fixes: `check:stories -- miketz --strict` gives 0 errors and 0 warnings, and `npm run build` passes. Changed cards 1, 2, 3, 6, 8, 11, 13, 15, 19, 20, 21, 22 and 29 were re-screenshotted at phone size.

## Not claimed, on purpose

- No gloss of Zaphenath-paneah is given as plain fact; all three readings are attributed.
- No claim that the thin ears shared one stalk.
- "Grain" throughout, never "corn".
- No claim that Joseph practiced divination, or that he didn't.
- No gloss of "Asenath", no historical setting (Hyksos), and no Famine Stela.
- Rashi's identification of Poti-phera with Potiphar (41:45) is left out.
