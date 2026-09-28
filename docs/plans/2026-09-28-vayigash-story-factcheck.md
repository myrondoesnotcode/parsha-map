# Vayigash story: self fact-check

Story: `src/redesign/stories/vayigash.ts` (Genesis 44:18 – 47:27), 23 cards. Checked 2026-09-28 by the author, before review. The parsha-fact-check workflow has not been run yet.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/Genesis.44.18-47.27`): English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah (cantillation stripped, vowels kept). Cross-references fetched the same way: Genesis 25:7, 26:23–25, 35:28, 37:14, 41:29–30, 42:8, 44:12, 44:16–17; Exodus 1:5; Deuteronomy 10:22. Rashi = Rosenbaum–Silbermann English plus the Sefaria Hebrew, on the whole range; each Rashi claim below was checked against the Hebrew, and bracketed source citations in the English (e.g. "(Genesis Rabbah 93:10)") were treated as editorial and not attributed to Rashi. Ibn Ezra on 46:27 = Strickman–Silver. Bereshit Rabbah 93:10 = Sefaria Midrash Rabbah (2022) and Hebrew. Tosefta Sotah 10:3 = Hebrew (Machon Mamre) and Sefaria Community Translation. Sites = Wikipedia ("Land of Goshen", "Pi-Ramesses", "Qantir", "Wadi Tumilat") and `src/data/places.json`.

**Read tab respected** (`parshaList.json` vayigash): Rashi's "in Hebrew" (45:12) is attributed to Rashi; Bereshit Rabbah 93:10 is attributed to Abba Kohen Bardela; seventy (46:27) with Exodus 1:5 and Deuteronomy 10:22; Goshen in the eastern Delta, with the placement hedged.

**Verdicts:** ✅ verified against the source named. ⚠️ = verified, with a caveat stated.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Route: Beersheba (1) → Goshen (2), in that order | 46:1, 46:5, 46:28–29 | ✅ |
| Beersheba pin (a075d61) = Tel Be'er Sheva, hedge "usual site" | places.json; same pin and hedge as Vayetze | ✅ |
| Goshen pin (a60f092) is a region, "exact extent uncertain"; hedge "a region; extent uncertain" | places.json description | ✅ |
| Goshen usually placed in the eastern Nile Delta; proposals: western Wadi Tumilat (Naville; Groll, Bietak, Janzen), at or near Avaris | Wikipedia "Land of Goshen" | ✅ |
| Rameses pin (a079b21) at Qantir = Pi-Ramesses, capital built by Ramesses II (1279–1213 BCE) | places.json; Wikipedia "Pi-Ramesses", "Qantir" | ⚠️ Qantir "believed to mark" the site; the note says "proposed site" in the talk card |
| Rameses pin is about 2 km from the Goshen pin (so the map shows one pin) | haversine 1.84 km | ✅ |
| Some scholars see Rameses place names as memories of the Ramesside era, others as later names (anachronisms) | Wikipedia "Pi-Ramesses", Biblical Raamses section ("viewed by some as authentic cultural memories … also considered to be editorial choices and anachronisms") | ⚠️ Wikipedia says this of the Rameses/Raamses toponyms generally; the note attributes it to Wikipedia and says "the Bible's Rameses place names" |
| Egypt (af301ca) is a region; its point is the Heliopolis pin; where Joseph's house was isn't said | places.json (same coordinates as acd9137); 44:14 names no place | ✅ spot "Egypt (a region)" |
| Canaan is a region; where Jacob was isn't said in this parsha; the last specific places named for him are Hebron (35:27) and the valley of Hebron (37:14) | 45:25; 35:27; 37:14 | ✅ no pin (see pass 1, c096) |
| Where Pharaoh received the family isn't said, so no stop is lit on those cards | 47:1–10 | ✅ |
| Stops lit only where the text places the event: Beersheba 46:1–5 (the vision falls between arriving at 46:1 and setting out at 46:5); Goshen 46:28–29, 47:27; 47:11 shown at Goshen per Rashi on 47:11 | verses; Rashi on 47:11 ("מארץ גשן היא") | ⚠️ 47:11 at the Goshen stop rests on Rashi and the pins' proximity, stated in the note |
| All places used are linked to vayigash in places.json | `check:stories --strict` 0 warnings | ✅ |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Vayigash, tagline "Joseph reveals himself.", range 44:18 – 47:27 | parshaList.json; checker | ✅ |
| 1 | Judah goes up to Joseph; the brothers don't know who he is; quotes "do not be impatient with your servant, you who are the equal of Pharaoh" | 44:18 (JPS); 42:8; 45:3 | ✅ |
| 1 | Father: one son "was torn by a beast"; "you will send my white head down to Sheol in sorrow" | 44:28–29 (JPS) | ✅ |
| 1 note | Goblet in Benjamin's bag; only the one who had it would be his slave, the rest go back in peace | 44:12, 44:17 | ✅ |
| 2 | Quote "For how can I go back to my father unless the boy is with me?"; Hebrew כִּי־אֵיךְ … אִתִּי | 44:34 | ✅ first sentence of the verse; the rest in the note |
| 2 | Judah pledged himself for the boy; asks to remain as slave instead of the boy; boy goes back with his brothers | 44:32–33 | ✅ |
| 2 note | "his own life is so bound up with his" | 44:30 | ✅ |
| 2 note | Rashi on 44:32: why Judah more than the others: he bound himself by a pledge | Rashi on 44:32 | ✅ |
| 3 | Could no longer control himself before his attendants; everyone withdraws; no one else there; sobs heard by Egyptians; news reaches Pharaoh's palace | 45:1–2 (JPS) | ✅ |
| 3 note | Rashi on 45:1: couldn't bear Egyptians seeing his brothers' shame | Rashi on 45:1 | ✅ |
| 4 | Quote "I am Joseph. Is my father still well?"; Hebrew אֲנִי יוֹסֵף הַעוֹד אָבִי חָי; "so dumfounded were they on account of him" | 45:3 | ✅ |
| 4 note | חָי = "alive"; JPS "well" | 45:3 Hebrew/JPS | ✅ |
| 4 note | Rashi on 45:3: out of shame | Rashi on 45:3 | ✅ |
| 4 note | Bereshit Rabbah 93:10, Abba Kohen Bardela: Joseph youngest of the tribes, brothers couldn't withstand his rebuke; all the more when the Holy One rebukes each person | Bereshit Rabbah 93:10 | ✅ |
| 5 | Quotes of 45:4, 45:5, 45:8; two years of famine passed, five to come | 45:4–8 (JPS) | ✅ |
| 5 note | 2 + 5 = 7 years of famine foretold (41:30) | 41:30 "seven years of famine" | ✅ |
| 5 note | Rashi on 45:6: two of the famine years have passed | Rashi on 45:6 | ✅ |
| 5 note | "father to Pharaoh" = Pharaoh's chancellor | JPS note on 45:8 | ✅ |
| 6 | Message: dwell in Goshen, near me; he will provide for them; five years of famine still to come; embraces Benjamin, weeps; kisses all brothers, weeps; only then can they talk | 45:9–15 (JPS) | ✅ |
| 6 note | "Embraced" lit. "fell on" | JPS note on 45:14 | ✅ |
| 6 note | Rashi on 45:12: speaking in the Holy Language; no hatred for Benjamin, who had no part in the sale, so none for you | Rashi on 45:12 (Hebrew: בלשון הקדש; שלא היה במכירתי) | ✅ |
| 7 | Pharaoh and courtiers pleased; wagons from Egypt for children and wives; bring father; change of clothing to each; Benjamin 300 pieces of silver and several changes; 10 male donkeys with best things of Egypt, 10 female donkeys with grain, bread, provisions | 45:16–23 (JPS "jackasses", "jennies") | ✅ |
| 7 note | Provisions for the journey; "several" lit. "five"; "Do not be quarrelsome on the way" | 45:21, JPS note on 45:22, 45:24 | ✅ |
| 7 note | Rashi on 45:24, plain sense: feared they'd quarrel over the sale | Rashi on 45:24 ("ולפי פשוטו של מקרא") | ✅ |
| 8 | Up to Jacob in Canaan; quote 45:26; heart went numb, did not believe; told all Joseph's words, saw the wagons Joseph sent; spirit revived; quote 45:28 | 45:25–28 (JPS) | ✅ |
| 8 note | Rashi on 45:27: sign of what they'd been studying when they parted, egla arufa; verse says "which Joseph sent," not Pharaoh | Rashi on 45:27 | ✅ |
| 8 note | Rashi: the Divine Presence that had left him rested on him again | Rashi on 45:27 ("שרתה עליו שכינה שפירשה ממנו") | ✅ |
| 9 | Israel sets out with all his; comes to Beer-sheba; sacrifices to the God of his father Isaac | 46:1 (JPS) | ✅ |
| 9 note | Where he set out from isn't said; last named: sent Joseph from the valley of Hebron | 46:1; 37:14 | ✅ |
| 9 note | Isaac built an altar at Beer-sheba | 26:23–25 | ✅ |
| 9 note | Rashi on 46:1: honouring father before grandfather | Rashi on 46:1 | ✅ |
| 10 | Stars title quotes 46:3 (JPS) exactly | 46:3 | ✅ |
| 10 | "in a vision by night"; "Jacob! Jacob!" "Here."; quote of 46:4 first half | 46:2, 46:4 (JPS) | ✅ |
| 10 note | בְּמַרְאֹת הַלַּיְלָה is plural, "visions of the night" | 46:2 Hebrew (מַרְאֹת, plural construct) | ✅ The JPS singular is quoted as JPS |
| 10 note | "Joseph's hand shall close your eyes" | 46:4 | ✅ |
| 10 note | Rashi 46:2 affection; 46:3 grieved to leave the land; 46:4 promise of burial in the land | Rashi on 46:2, 46:3, 46:4 | ✅ |
| 10 note | Night stated, stars not | 46:2 | ✅ |
| 11 | Set out from Beer-sheba; sons put father, children, wives in the wagons Pharaoh sent; livestock and wealth gained in Canaan; sons, grandsons, daughters, granddaughters | 46:5–7 (JPS) | ✅ |
| 12 | Leah 33, Zilpah 16, Rachel 14, Bilhah 7 (the verses' own numbers) | 46:15, 18, 22, 25 | ✅ |
| 12 | Row contents: Leah: 6 sons, their sons, Hezron and Hamul, Dinah; Zilpah: Gad, Asher, their sons, "their sister Serah", Heber and Malchiel; Rachel: Joseph, Manasseh, Ephraim, Benjamin + 10 sons; Bilhah: Dan, Hushim, Naphtali + 4 | 46:8–25 | ✅ counts: Zilpah 2+7+4+1+2 = 16; Rachel 2+2+10 = 14; Bilhah 2+5 = 7 |
| 12 note | Leah's names come to 34 (6 sons + Dinah + 4+6+3+5+2+4+3); less Er and Onan = 32; verse says 33 | 46:8–15 | ✅ |
| 12 note | JPS note: 33 includes Jacob; Ibn Ezra on 46:27 the same, citing 46:8 | JPS note on 46:15; Ibn Ezra on 46:27 | ✅ |
| 12 note | Rashi on 46:15: the missing one is Jochebed, born "between the walls" as they entered | Rashi on 46:15 | ✅ |
| 12 note | Dan: Heb. "sons", one named | 46:23 + JPS note | ✅ |
| 12 note | Asenath daughter of Poti-phera priest of On | 46:20 | ✅ |
| 12 | Zilpah = Leah's maid, Bilhah = Rachel's maid | 46:18, 46:25 (given by Laban to Leah / Rachel) | ✅ |
| 13 | Quote 46:27b (JPS), Hebrew כׇּל־הַנֶּפֶשׁ … שִׁבְעִים | 46:27 | ✅ |
| 13 | 33 + 16 + 14 + 7 = 70 | arithmetic | ✅ |
| 13 | 46:26: 66, Jacob's own issue who came; JPS note: not including Joseph and his two sons; + 2 sons (46:27) + Jacob and Joseph (JPS note on 46:27) = 70 | 46:26–27 + JPS notes | ✅ 66 + 2 + 2 = 70; consistent with 69 listed descendants − 3 = 66 |
| 13 note | 46:26 excludes the wives of Jacob's sons | 46:26 | ✅ |
| 13 note | Rashi on 46:26: 66 set out; 70 on arrival with Joseph, two sons, Jochebed | Rashi on 46:26 | ✅ |
| 13 note | Seventy again in Exodus 1:5, Deuteronomy 10:22 | both verses (JPS) | ✅ |
| 14 | Jacob had sent Judah ahead to point the way to Goshen; came to the region of Goshen; Joseph ordered his chariot, went to meet Israel; embraced him around the neck; wept on his neck a good while; quote 46:30 | 46:28–30 (JPS) | ✅ |
| 14 note | "ordered" lit. "hitched" | JPS note on 46:29 | ✅ |
| 14 note | Rashi on 46:29: harnessed the horses himself; Jacob didn't fall on his neck or kiss him; "our Rabbis said" he was reciting the Shema | Rashi on 46:29 | ✅ |
| 14 note | Rashi on 46:28: prepare a place (as the Targum); a midrash: a house of study | Rashi on 46:28 ("ומדרש אגדה") | ✅ |
| 15 | Say they've always bred livestock, "so that you may stay…abhorrent to Egyptians"; presents a few (lit. five) brothers; they ask for Goshen: no pasture, famine severe in Canaan; Pharaoh: best part of the land, Goshen, any capable men over his livestock | 46:31 – 47:6 (JPS + note on 47:2) | ✅ |
| 16 | Guess: Joseph presents Jacob; Pharaoh's question quoted; answer 130; reveal quotes 47:9 exactly | 47:7–9 (JPS) | ✅ distractors 100 and 180 are not claims |
| 17 | Jacob greets Pharaoh; quote 47:9b; bids farewell, leaves | 47:7–10 (JPS) | ✅ |
| 17 note | JPS note: ancestors = Terah, Abraham, Isaac; Abraham 175, Isaac 180 | JPS note on 47:9; 25:7; 35:28 | ✅ |
| 17 note | "greeted"/"bade farewell" both וַיְבָרֶךְ, lit. "blessed"; Rashi 47:7 greeting of peace as before kings; Rashi 47:10 a midrash: the Nile rose at Pharaoh's approach | 47:7, 47:10 Hebrew; Rashi on 47:7, 47:10 | ✅ |
| 17 note | Rashi 47:9: all my days a stranger in others' lands | Rashi on 47:9 | ✅ |
| 18 | As Pharaoh commanded; holdings in the choicest part of Egypt, region of Rameses; sustained father, brothers, household with bread down to the little ones | 47:11–12 (JPS) | ✅ |
| 18 note | Rashi 47:11: Rameses is part of Goshen | Rashi on 47:11 | ✅ |
| 19 | Money: all the money in Egypt and Canaan as payment for rations; "Give us bread… for the money is gone!" | 47:14–15 (JPS) | ✅ "gathered in … as payment" — not a seizure |
| 19 | Livestock: horses, sheep, cattle, donkeys; bread that year | 47:16–17 | ✅ |
| 19 | Next year: themselves and their land; quote of 47:19 with ellipsis | 47:18–19 | ✅ |
| 19 note | Quote 47:13; money into Pharaoh's palace; all farmland to Pharaoh except priests' land; priests lived off Pharaoh's allotment | 47:13, 14, 20, 22 | ✅ |
| 19 note | Rashi 47:19: though Joseph said five more years (45:6), once Jacob came they sowed and the famine ended; names the Tosefta of Sotah | Rashi on 47:19; Tosefta Sotah 10:3 (before Jacob came, famine, 45:6; once he came, "here is seed," 47:23) | ✅ |
| 20 | Seed; a fifth to Pharaoh, four-fifths theirs for seed and food; "You have saved our lives!"; land law "still valid"; priests' land not Pharaoh's | 47:23–26 (JPS) | ✅ |
| 20 note | Quote 47:21; JPS: meaning of "town by town" uncertain | 47:21 + JPS note | ✅ |
| 20 note | Rashi 47:21: reminder the land was no longer theirs; to Joseph's credit, to spare his brothers being called exiles (גולים) | Rashi on 47:21 | ✅ |
| 21 | Israel settled in Egypt, in Goshen; acquired holdings; fertile, increased greatly; God had said at Beer-sheba "I will make you there into a great nation" | 47:27; 46:3 | ✅ |
| 22 | Talk = Everyone question; About the map note | this table (Map section) | ✅ |
| Q Kids | Jacob didn't believe until told all Joseph's words and saw the wagons | 45:26–27 | ✅ |
| Q Everyone | Judah offered to stay as a slave instead of Benjamin so his father wouldn't die of grief | 44:31–33 | ✅ |
| Q Deeper | 45:4 "he whom you sold"; 45:8 "not you who sent me here, but God" | 45:4, 45:8 | ✅ |

## Deliberately left out

- The Tosefta Berakhot 4 discussion of Judah's humility (Read tab): the speakers' attribution in the Tosefta is involved; not used.
- Rashi on 44:18's midrashic readings, Rashi on 46:34 (sheep as Egyptian deities), Rashi on 47:2 (which five brothers): not needed.
- No list of the 70 names in full: the card gives the four groups with the verses' counts, and the note shows how the names add up.

## Unverified

Nothing in the text is unverified. The site identifications (Tel Be'er Sheva, Qantir) and Goshen's placement are hedged on screen and in the notes.

## Independent fact-check, pass 1 (wf_e0bdaaef-f02)

348 claims, 324 verified. The fixes below are for the story findings. I re-checked each one on Sefaria or the named source before rewording. The R* Read-tab items and the cover (c005, and the missed item about the wagons moving with nothing pulling them) are being fixed by the coordinator on the code branch, so this branch doesn't change them.

| ID | Finding | Fix | Re-verified against |
|---|---|---|---|
| c033 | The quote cards' camera [31.3, 29.75] frames the Nile valley south of Cairo, not the Delta | Cards 2 and 4 now use center [31.3, 30.6]; the screenshot shows the Delta | screenshots |
| c049 (+ missed) | "Joseph was the youngest of the tribes" contradicts 44:20 | Now reads "Joseph was 'the young one of the tribes' (Benjamin was younger still)" | Bereshit Rabbah 93:10 Hebrew יוֹסֵף קְטַנָּן שֶׁל שְׁבָטִים; 44:20 |
| c093 | "not Pharaoh" was unattributed | Now reads "Rashi points out that the verse says 'the wagons that Joseph had sent,' not 'that Pharaoh had sent.'" | Rashi on 45:27 (וְלֹא נֶאֱמַר אֲשֶׁר שָׁלַח פַּרְעֹה) |
| c096 (+ missed) | A spot for Canaan in the Galilee, about 135 km north of Hebron | Spot removed; the CANAAN constant removed; regional camera [35.0, 31.6], zoom 6.8, with no pin. The note says the last specific places named for Jacob are Hebron (35:27) and the valley of Hebron (37:14). The header comment and the finale note are updated to match; 35:27 added to `sources` | 35:27 (JPS "Jacob came to his father Isaac at Mamre, at Kiriath-arba—now Hebron"); 37:14 |
| c101 (+ missed) | "the last place he is named": 42:29 and 45:25 name "the land of Canaan" after 37:14 | Now reads "the last specific place named for him is the valley of Hebron" | 37:14, 42:29, 45:25 |
| c129 (+ missed) | "their sister Serah" read as the sister of Gad and Asher | Now reads "Asher's daughter Serah" | 46:17 ("Asher's sons … and their sister Serah") |
| c183 (+ missed) | "no pin is lit; the pin marks Egypt": contradicts itself | Card 15 now reads "no numbered pin is lit; the hollow pin marks Egypt, a region" | on screen: Egypt spot plus the Goshen stop |
| c201, c226 (+ missed) | "the pin marks Egypt" is ambiguous with Goshen pin 2 on screen | Cards 17, 19 and 20 now say "the hollow pin". Cards 1, 3, 5, 6 and 7 are changed to match | screenshots |
| missed (Goshen pin) | The pin sits near Qantir/Avaris, one of the proposals the note lists | Card 14: "The pin, near Qantir by Avaris, is only a point in the eastern Delta, not a choice between the proposals." Card 21 and the finale note say the same | places.json a60f092; Wikipedia "Land of Goshen", "Qantir" (Avaris about 2 km south of Qantir) |
| missed (Tel Be'er Sheva, optional) | The pin could make readers picture a town there in Jacob's time | Card 9 note adds that excavations found the mound's earliest occupation in Iron Age I | Wikipedia "Tel Be'er Sheva" ("The earliest occupation at Beer-sheba during Iron Age I (Stratum IX)") |
| c184 | Describes the screen only (pin 1 is off-screen on card 15) | No change needed | — |

Checks after the fixes: `check:stories -- vayigash --strict` gives 0 errors and 0 warnings, and `npm run build` passes. I re-screenshotted every card at phone size (cards 1–22).

## Independent fact-check, pass 2 (wf_38a70ced-f79)

364 claims, 350 verified. Below are the fixes for every c-id and every "missed" item about vayigash.ts. I re-checked each before writing it. The cover items c005 and c006 only describe the art, so nothing changes for them; the R* items go to the code branch.

Distances are haversine, from the Goshen point (30.79937 N, 31.834217 E):
- Wikipedia's Pi-Ramesses (30.79888889, 31.83583333): 0.16 km.
- Wikipedia's Qantir (30.80305556, 31.83777778): 0.53 km.
- The gazetteer's Rameses pin a079b21: 1.84 km.
- The gazetteer's Pithom pin at Tell er-Retaba, in the western Wadi Tumilat: 30.6 km.
- Zagazig, at the valley's west end: about 39 km.

This supersedes the pass 1 wording "not a choice between the proposals" and the "about 2 km" claims in the Map section above.

| ID | Finding | Fix |
|---|---|---|
| c097 | The card 8 camera ([35.0, 31.6], zoom 6.8) showed only Canaan, not "the way down to Egypt" as its comment said | Re-framed to [33.6, 31.0], zoom 6.0. The screenshot shows Canaan, the coast and the way toward the Delta, with no pin, and the comment now matches |
| c177, c253, c259, missed | The pin effectively stands on the "at or near Avaris" proposal, yet the text said it wasn't a choice | Card 14 now says the pin is the gazetteer's point for Goshen, at Qantir by Avaris, one of the proposed areas; the western Wadi Tumilat, the other, lies some 30–40 km south and isn't pinned; the pin doesn't mark the region's extent. Cards 21 and 22 are reworded the same way |
| c217, missed | Card 18 showed "places.json" to readers, and "2 km" was wrong for Pi-Ramesses | Now reads "the Goshen pin already stands at Qantir, so the region of Rameses is shown at the same pin." No reader-facing text names places.json |
| c260 | The finale gave "about 2 km" for Pi-Ramesses at Qantir | Now: the Goshen pin "stands at Qantir, the proposed site of Pi-Ramesses" |
| missed (header and GOSHEN comment) | The comments said the wrong point was at Qantir | Both comments now give the distances listed above |
| missed (meteg) | The meteg was dropped in אֶֽעֱלֶה (44:34) and לְבֵֽית (46:27) | Restored from the Sefaria Miqra text. The verse-final silluq on שִׁבְעִֽים is a cantillation mark and stays dropped; the header now says so. The famine list's Hebrew words (כֶּסֶף, מִקְנֵיכֶם, אַדְמָתֵנוּ) carry no meteg in the source, and neither does the card 4 quote |
| missed (Rashi on 45:27) | The heifer reading should be marked as a midrash | Now: "Rashi on 45:27 brings a midrashic reading, found in Bereshit Rabbah 94:3 in the name of Rabbi Levi citing Rabbi Yoḥanan bar Shaul…". I verified this on Sefaria, in both the Hebrew and the 2022 English. It doesn't say Rashi cites the midrash, since his Hebrew names no source. Bereshit Rabbah 94:3 is added to `sources` |

Checks after the fixes: `check:stories -- vayigash --strict` gives 0 errors and 0 warnings, and `npm run build` passes. I re-screenshotted cards 2, 8, 13, 14, 18, 21 and 22 at phone size and found no framing problems.

## Independent fact-check, pass 3 (wf_eca2fbee-467)

342 claims (254 story, 88 Read tab and history), 329 verified; 13 flagged and 11 "missed" items. I re-checked each one against the source named in its row before deciding. Fixes that need shared files are written up in `2026-09-28-vayigash-shared-fixes.md`.

Distances are haversine from the Goshen point (30.79937 N, 31.834217 E). The western Wadi Tumilat, from its mouth to Tell er-Retaba: Tell er-Retaba (Wikipedia's Wadi Tumilat coordinate, 30.5494 N, 31.9636 E) 30.4 km; Abbasa near the mouth about 31 km (approximate coordinates 30.535 N, 31.717 E). Tell el-Maskhuta, 12 km east of Retaba (Wikipedia), is in the eastern wadi, and Zagazig (about 39–40 km, approximate coordinates) is where the wadi starts, in the Delta. This supersedes the pass 2 figure "30–40 km".

| ID | Finding | Decision | Evidence | Change |
|---|---|---|---|---|
| c51, R33 | "the young one of the tribes" was in quotation marks as if it were the midrash's words | Accepted, reworded | BR 93:10 Hebrew יוֹסֵף קְטַנָּן שֶׁל שְׁבָטִים הָיָה; Sefaria Midrash Rabbah 2022: "Joseph was the youngest of the tribes"; Genesis 44:20 (Benjamin the youngest) | Card 4 note: "the midrash calls Joseph קְטַנָּן שֶׁל שְׁבָטִים, 'the youngest of the tribes' in Sefaria's translation (Benjamin was in fact younger)". Read tab `jewishTradition` says the same, with the Hebrew transliterated (qetannan shel shevatim). I didn't add the checker's "(or 'the least')", because I fetched no source for it |
| c175, c244 | "some 30–40 km south" for the western Wadi Tumilat | Accepted | Distances above; Wikipedia "Wadi Tumilat": the wadi "starts near the modern town of Zagazig… and goes east to the area of modern Ismaïlia" | Card 14 and finale note: "about 30 km". Header comment likewise |
| c187 + missed (Shepherds, guess, Few and hard) | With no stop, numbered pin 2 "Goshen" shows on the audience cards and could read as where Pharaoh received them | Accepted for Shepherds and Few and hard. Not needed for the guess card, where `DaylightMap` hides the stop pins (`card?.kind !== 'guess'`) | Genesis 47:1 (JPS): "…and are now in the region of Goshen"; 47:1–10 name no place for the audience; DaylightMap overview branch | Shepherds note: "The Goshen pin shows where the family was staying (47:1), not where Pharaoh received them". Few and hard note: "the Goshen pin shows where the family was staying (47:1)" |
| c210 | "later names… set into an older story" isn't in the source | Accepted, reworded | Wikipedia "Pi-Ramesses": "they have also been considered to be editorial choices and anachronisms from the 7th century BC, reflecting the time of composition" | Card 18: "others as anachronisms from the 7th century BCE, when they date the text's composition" |
| c249 | The extractor called the route line "straight"; `densify` draws a bowed arc (bow 0.14; for this leg it bends south over north Sinai) | Rejected (no app change) | The claim describes the extractor's wording, not the app. The finale shows the "Route illustrative" tag, and the notes say "Lines join the stops in order; the road isn't known" and "Jacob's road isn't known". Nothing rendered says "straight" | None |
| R41 + missed (historicity) | The "In history" card didn't say that historians doubt the Joseph story | Accepted (fixed in data; the eyebrow is a shared option) | McCarter/Hendel, "The Patriarchal Age": "it is unlikely that much of the information found in Genesis 37 and 39–47 is historically factual. The biblical Joseph story has more in common with a historical romance than a work of history"; "Many scholars believe that the events described in the story of Joseph have an ultimate basis in historical fact"; the narratives "were cast into literary form in the first millennium B.C.E." | `historicalContext` ends: "Historians do not agree whether the Joseph story reflects real events, and many scholars read it as a literary work written down centuries later." The eyebrow alternative is in the shared-fixes doc (item 4) |
| R53 | "the same kind of arrangement" stated a parallel as fact, unattributed | Accepted, reworded | Bietak and Rendsburg, "Egypt and the Exodus" (Rutgers PDF ch. 2): "Most scholars argue, quite cogently, that P.Anastasi VI provides an exceedingly close parallel to the biblical story"; Genesis 47:4 "there is no pasture for your servants' flocks… let your servants stay in the region of Goshen" | "Most scholars, they write, see this as an exceedingly close parallel to the biblical story, where the brothers ask to stay in Goshen because there is no pasture for their flocks (47:4)." |
| R60 | "centuries after the Middle Bronze Age": Aper-el is less than two centuries after 1550 | Accepted | Wikipedia "Aperel": vizier under Amenhotep III and Akhenaten | "later than the Middle Bronze Age" (Vayechi's wording) |
| R64, R65 | Date bar: "often c. 2000–1550 BCE" overstates current scholarship, and the band is solid | Accepted, needs a shared fix | McCarter/Hendel "It has often been supposed…"; "Many of the parallels are no longer regarded as valid"; Wikipedia "Abraham": "By the beginning of the 21st century, archaeologists had stopped trying…" | None here: `patriarchs` is shared by Lech Lecha–Vayechi. Shared-fixes item 1 |
| R80 | timeline.json "earliest known alphabetic writing, c. 1850" | Accepted, needs a shared fix | Wikipedia "Umm el-Marra": cylinders "dated to c. 2350 BC have been hypothesized to be Early Alphabetic Semitic writing" | Shared-fixes item 2 |
| missed (Few and hard body) | The quotation of 47:9 stopped at "ancestors" with a period | Accepted | JPS 47:9: "…nor do they come up to the life spans of my ancestors during their sojourns." | Body now quotes through "during their sojourns." |
| missed (Tosefta citation) | "4:16; 4:16–18 in Lieberman" is looser than needed | Rejected (not wrong) | Sefaria Vilna 4:16 has the Judah question and the four elders. Lieberman 4:16 opens Tarfon's scene with his students, 4:17 has his Judah question, and 4:18 the elders. So 4:16–18 covers the passage, including the "asks his students" setting | None |
| missed (Tosefta: whose teaching the elders discussed) | Lieberman has Rabbi Akiva's teaching (במה ששנה להם ר' עקיבא); Vilna has ר"ט | No change; the text names no teacher | Sefaria, both editions | None |
| missed (finale "Egypt… marked by a hollow pin") | The finale has no spot, so no hollow pin is on screen | Accepted | `talk` card has no `spot` | "Egypt is a region; on earlier cards a hollow pin stands for it and doesn't mark a site." |
| missed (EGYPT_SPOT sits on the Heliopolis/On point) | The hollow pin is exactly at On (named in 46:20), which could suggest a location | Accepted, reworded | places.json af301ca has the same coordinates as Heliopolis | Spot name is now "Egypt (a region, not a site)", so the pin's sub-line reads "a region, not a site" |
| missed (era card vs traditional date) | The era card is "c. 2000–1550 BCE"; the date bar's traditional dot is c. 1523 BCE | Accepted, needs a shared fix | parshaDates.json vayigash AM 2238 = 1523 BCE | Shared-fixes item 3 |
| missed (Rashi on 45:24) | "gives the plain sense" hides that Rashi first gives two other readings | Accepted | Rashi on 45:24: halachic discussion; long strides (Taanit 10b); then "ולפי פשוטו של מקרא" | "Rashi on 45:24, after two other readings, gives the plain sense" |
| missed ("often in the Wadi Tumilat") | The Read tab gave only the Wadi Tumilat view; the story pins Goshen at Qantir by Avaris | Accepted | Wikipedia "Land of Goshen": "perhaps at or near Avaris"; "It covered the western end of the Wadi Tumilat" | "usually placed in the eastern Nile Delta, at or near Avaris or in the western Wadi Tumilat" |
| missed (approximateDateBCE 1700–1550) | No source dates Vayigash to 1700–1550 | Accepted, needs a cross-parsha decision | Only the classic app renders it; Miketz and Vayechi have similar values; McCarter/Hendel describe the Hyksos-period placement as a supposition | Shared-fixes item 5 |

Checks after the fixes: `check:stories -- --strict vayigash` gives 0 errors and 0 warnings, `npm run build` passes, and `check:week` gives 40 dated checks with 0 failures. I did not re-screenshot the cards this pass; the longer spot sub-line ("a region, not a site") should be checked at phone size. There was no cover or `briefs.ts` finding this pass.
