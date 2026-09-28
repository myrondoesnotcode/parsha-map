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
| Canaan (a581f0c) is a region; where Jacob was isn't said in this parsha; last named place is the valley of Hebron | places.json; 45:25; 37:14 | ✅ spot "Canaan (a region)" |
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
