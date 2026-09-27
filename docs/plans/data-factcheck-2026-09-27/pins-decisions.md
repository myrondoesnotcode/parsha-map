# Pin decisions, Exodus–Deuteronomy (second verifier)

Fragments are in `pins-decisions.ts`. I checked every verse against Sefaria (Hebrew and JPS English; cached in `pvsef/`) and every identification against OpenBible `ancient.jsonl`, plus Wikipedia (Mount Hor, Kadesh, Stations of the Exodus, Taberah, Rephidim, Marah, Elim, Ezion-Geber, Tel Arad, Pithom, Tall el-Hammam), Rashi and Onkelos.

## How I applied the policy

- **Stays pinned at `low`, with a note naming it as the traditional or usual identification:** a site with a real tradition or accepted identification behind it. That covers Mount Sinai (Jebel Musa), Kadesh (Ain el-Qudeirat) and Mount Hor (Jebel Harun), plus the traditional southern-route stations: Marah (Ain Hawarah), Elim (Wadi Gharandal), Rephidim, Sin, Dophkah. It also covers Pithom, Ezion-geber, Shittim, Jotbathah and the Red Sea crossing (the pin is one proposal, and the note names the others).
- **Unpinned:** a site known only from a route guess, a "within N km of X" guess or a 1–2-vote guess, or one that sits on another station's point. That covers the Delta camp (Etham, Pi-hahiroth, Migdol, Baal-zephon), most of the Numbers 33 stations between Hazeroth and Kadesh and in the Arabah, the Deuteronomy 1:1 names, and similar cases.
- **OpenBible's top-ranked site replaced the pin only where the verse or neighbouring pins fit it better:** Ziphron, Rephidim, Shittim and Marah. I rejected three of those swaps (Oboth, Zalmonah, Sibmah) because the new site fits no better.
- **`RATED` replaces the `PICKED`-with-own-identification workaround** for confidence-only fixes.
- **Verses:** a verse stays if it names the place or points to it with "there" or "from there" (Exod 15:25 for Marah, Deut 6:23 for Egypt). It is dropped only if it neither names nor refers to the place.

## Findings

| Finding | Decision | Notes |
|---|---|---|
| EXO-72 | accepted | Pi-hahiroth, Migdol, Baal-zephon unpinned (notes reworded). Pi-hahiroth TYPED `campsite`. |
| EXO-73 | modified | Instead of moving Meribah 2 and Massah onto Rephidim's Wadi el-Sheikh point, Rephidim is PICKED at Wadi Rufaiyil (see P2-25), where Meribah 2 and Massah already sit. Meribah 2 is RATED low with a DESCRIBED note. |
| EXO-74 | modified | Dropped only Exod 15:27 (Elim). 15:25 "there" is the Marah episode, so it stays. |
| EXO-75 | accepted (merged) | Mount Sinai and Horeb DESCRIBED as the traditional site, location disputed. |
| EXO-76 | accepted (merged) | Wilderness of Sinai: DESCRIBED, and RATED low. |
| EXO-77 | accepted | Pithom DESCRIBED. JPS reads "garrison cities", so the note avoids "store city". |
| EXO-78 | accepted (merged) | Red Sea 1 DESCRIBED as site unknown, the pin one proposal. |
| EXO-79 | modified | Elim, Sin DESCRIBED; Marah PICKED at Ain Hawarah (the traditional site, per Wikipedia "Marah"); Rephidim PICKED at Wadi Rufaiyil; Etham unpinned (no accepted identification, and OpenBible's candidates tie) rather than described. |
| EXO-80 | accepted | Philistia + Exod 13:17. |
| LEV-66 | accepted (merged) | See EXO-75. |
| LEV-67 | modified | RATED + DESCRIBED instead of a PICKED workaround. |
| DEU-85 | accepted | Drop Deut 33:16 (seneh, "bush"). |
| DEU-86 | accepted (merged) | See EXO-75. |
| DEU-87 | accepted | Mount Paran unpinned. Rashi on 33:2 treats Paran as a separate place (Ishmael's sons). |
| DEU-88 | accepted | Drop Deut 33:2 from Meribah 1. Meribah 1 loses its vzot-habracha tag. |
| DEU-89 | accepted (via RATED) | Meribah 1 and 2 low, DESCRIBED. Rashi's second reading of 33:8 (Aaron and Miriam) refers to Kadesh, and the note says so. |
| DEU-90 | accepted | Drop Deut 2:12 from Canaan. |
| DEU-91 | modified | Dropped Deut 1:3, 7:19, 9:29; kept 6:23 ("freed us from there" = Egypt). |
| DEU-92 | accepted (merged with P1-25) | |
| DEU-93 | accepted | Dan + Deut 34:1. Adds vzot-habracha. Dan also has Genesis (lech-lecha); only a verse is added. |
| DEU-94 | accepted (merged with P1-16) | Ezion-geber PICKED at Tell el-Kheleifeh, so it no longer shares Elath's point. Both TYPED `settlement`. |
| DEU-95 | accepted (merged with P2-12) | Moseroth unpinned. |
| DEU-96 | modified | Moved to Jebel Harun (see P2-13). |
| DEU-97 | accepted | Beeroth Bene-jaakan, Hor-haggidgad, Taberah, Kibroth-hattaavah unpinned. I dropped the finding's "three days from Mount Sinai" wording, which is inference. |
| DEU-98 | accepted | Suph, Laban, Dizahab, Tophel unpinned. The Onkelos clause is checked: Onkelos has "facing the Sea of Suf". |
| DEU-99 | accepted | Gilgal 4 unpinned. |
| DEU-100 | accepted (merged with P1-1) | Amalek DESCRIBED + RATED low. |
| DEU-101 | accepted | Baal-peor DESCRIBED. |
| DEU-102 | accepted (merged) | See EXO-78. |
| DEU-103 | accepted | Chinnereth DESCRIBED; type left as-is. |
| DEU-104 | accepted (merged with P2-21) | Peor RATED low. |
| P1-1 | accepted | Amalek: + Num 14:25, 43, 45; − 24:24; description; RATED low. |
| P1-2 | accepted | Amaw DESCRIBED. |
| P1-3 | accepted | Arad 1 DESCRIBED (Tel Arad quote checked). |
| P1-4 | accepted, extended | Num 23:7 moves from Aram to Aram-naharaim, and I also added Deut.23.4 (English numbering; Hebrew 23:5, "Pethor of Aram-naharaim"). Aram-naharaim gains balak and ki-teitzei. |
| P1-5 | accepted | Replaces the existing Asshur DESCRIBED entry, keeping its Genesis 2:14 clause. **Asshur is also a Genesis (bereshit) place**; only the description changes. |
| P1-6 | modified | Baal-zephon unpinned (EXO-72) instead of described. |
| P1-7 | modified | Bamoth-baal RATED low (description unchanged). |
| P1-8 | modified | Beon RATED low. |
| P1-9 | accepted | Beth-haram DESCRIBED; בית הרן checked. |
| P1-10 | accepted | Bene-jaakan unpinned, and Beeroth Bene-jaakan too. |
| P1-11 | accepted | Dophkah DESCRIBED. |
| P1-12 | accepted | Alush unpinned. |
| P1-13 | accepted | Abronah unpinned. |
| P1-14 | modified | Dropped Num 10:11, 11:4, 11:34. **Kept 16:13** ("a land flowing with milk and honey" refers to Egypt), so Egypt keeps its korach tag. Added 33:3. |
| P1-15 | modified | Etham unpinned rather than described. |
| P1-16 | accepted | Ezion-geber PICKED at Tell el-Kheleifeh (low); TYPED settlement. OpenBible ranks Pharaoh's Island first, but Tell el-Kheleifeh is the classic identification and sits "near Eloth" on the mainland. The note names both. |
| P1-17 | accepted | Gilead 1 − Num 32:41. |
| P1-18 | accepted | Haradah unpinned. |
| P1-19 | accepted | Hashmonah unpinned. |
| P1-20 | modified | Havvoth-jair: RATED low + DESCRIBED. |
| P1-21 | accepted | Hazeroth − Num 12:1. |
| P1-22 | accepted | Hor-haggidgad unpinned. |
| P1-23 | accepted | Jazer − Num 21:24. |
| P1-24 | accepted | Jeshimon − Num 21:20, 23:28. Loses chukat and balak; it had no other Torah verse. |
| P1-25 | accepted | Jordan − Num 32:22. |
| P1-26 | accepted | Jotbathah DESCRIBED. |
| P1-27 | accepted | Kadesh-barnea DESCRIBED. **Kadesh-barnea is also a Genesis place** (lech-lecha, vayera); description only, and the pin does not move. |
| P1-28 | accepted | Kain − Num 24:22. Loses balak. |
| P1-29 | accepted | Kehelathah unpinned (Makheloth too, P2-6). |
| P2-1 | noted, no table entry | The script-level concern (picking by vote_average, and the default 500 → medium) is resolved place by place here. A script change would affect Genesis too and is outside this brief. |
| P2-2 | rejected | Kibroth-hattaavah unpinned (DEU-97). Erweis el-Ebeirig is a route guess: Wikipedia (Taberah) says it depends on Mount Sinai's location, and the camp there is Early Bronze Age. |
| P2-3 | accepted | Kiriath-huzoth unpinned. |
| P2-4 | accepted | Kittim DESCRIBED (Onkelos and Rashi checked). |
| P2-5 | accepted | Libnah 2 unpinned. |
| P2-6 | accepted | Makheloth unpinned. |
| P2-7 | accepted | Marah PICKED at Ain Hawarah (the traditional site), low. |
| P2-8 | modified | RATED low + DESCRIBED instead of a PICKED workaround. |
| P2-9 | rejected | Migdol unpinned (EXO-72), not moved to Tell el-Herr: the verse puts Migdol with Pi-hahiroth and Baal-zephon, and none is identified. |
| P2-10 | accepted | Mithkah unpinned. |
| P2-11 | accepted | Moab 1 − Num 25:2. |
| P2-12 | accepted | Moseroth unpinned. |
| P2-13 | modified | Mount Hor 1 PICKED at **Jebel Nebi Harun** (low), rather than only describing the Har Zin pin. Wikipedia: the customary identification, after Josephus, is Jebel Harun. Har Zin (= Jebel Madurah) is the chief alternative, and the note names it. The verse ("on the boundary of Edom") doesn't decide between them. |
| P2-14 | accepted | Mount Hor 2 unpinned. The note cites the Second Temple / rabbinic Amanus (Amanah) tradition (Wikipedia, Mount Hor). |
| P2-15 | accepted | Mount Shepher unpinned. |
| P2-16 | accepted (merged) | See EXO-75. |
| P2-17 | modified | Nimrah RATED low. |
| P2-18 | modified | Nobah 1 RATED low. |
| P2-19 | accepted | Nophah unpinned (JPS note checked). |
| P2-20 | modified | Oboth **unpinned**, not moved to Ein Weibeh. Ein Weibeh lies west of Punon, back across the Arabah from Iye-abarim, so the itinerary fits it worse; the old pin was a 1-vote guess. |
| P2-21 | modified | Peor RATED low + DESCRIBED. |
| P2-22 | accepted | Pi-hahiroth unpinned. |
| P2-23 | accepted (merged) | See EXO-78. |
| P2-24 | modified | Rehob 1 **unpinned**, not moved to "Beth-rehob". OpenBible's Beth-rehob point is only a Beqaa region label, and Beth-rehob itself is pinned elsewhere (upper Huleh), so no site is identified. |
| P2-25 | accepted | Rephidim PICKED at Wadi Rufaiyil. This aligns it with Meribah 2 and Massah, and the site is nearer the traditional Horeb (Exod 17:6). |
| P2-26 | accepted | Rissah unpinned. |
| P2-27 | accepted | Shepham unpinned. |
| P2-28 | accepted | Shittim PICKED at Tall el-Hammam (Glueck's identification); it now matches Abel-shittim. |
| P2-29 | modified | Sibmah **unpinned**. Qarn al-Qubish and Sumia are equal guesses near Heshbon, and neither fits the verse better. |
| P2-30 | accepted | Taberah unpinned. |
| P2-31 | accepted | Tahath unpinned. |
| P2-32 | accepted | Terah unpinned. |
| P2-33 | accepted | Waheb unpinned (Rashi checked). |
| P2-34 | modified | RATED + DESCRIBED. |
| P2-35 | modified | Zalmonah **unpinned**, not moved. Wadi es-Salmaneh lies beyond Punon, so it fits the order no better; both candidates are name-echo guesses. |
| P2-36 | accepted | Zin 2 unpinned. |
| P2-37 | accepted | Ziphron PICKED at Huwwarin. It lies between the Zedad (Sadad) and Hazar-enan (Qaryatayn) pins, matching the border order in Num 34:8-9; Zifran was 50 km off the line. |

Totals, 97 findings: 72 accepted (including merged ones and P1-4 extended), 22 modified, 2 rejected (P2-2, P2-9), 1 noted (P2-1).

## Genesis pins touched

No Genesis place is moved or unpinned. Of the places changed here, eight also carry Genesis parshas:

- **Descriptions only:** Kadesh-barnea (lech-lecha, vayera) and Asshur (bereshit). Asshur replaces the existing entry, and its Genesis 2:14 sentence is kept.
- **Only non-Genesis verses dropped:** Canaan (Deut 2:12), Egypt (Deut and Num verses), Jordan (Deut and Num verses), Gilead 1 (Num 32:41), Moab 1 (Num 25:2). Their Genesis tags are unchanged.
- **Verse added:** Dan gains Deut 34:1; its lech-lecha tag is unchanged.

**Follow-up outside scope:** Genesis 24:10 names Aram-naharaim. It isn't in OpenBible's verse list, so the place still lacks chayei-sarah.

## Test run

I copied the script to `pd-test/processGeodata.ts`, set `ROOT` to wt-data and `OUT_PATH` to `pd-test/places.json`, pasted the fragments in (replacing the old Asshur DESCRIBED line) and ran it with tsx. It ran with no errors: every name, id, PICKED match and DROPPED osis resolved, and it wrote 1254 places, the same as before. The repo's places.json was not touched.

**84 places changed:**

- **Unpinned (38):** Abronah, Alush, Baal-zephon, Beeroth Bene-jaakan, Bene-jaakan, Dizahab, Etham, Gilgal 4, Haradah, Hashmonah, Hor-haggidgad, Kehelathah, Kibroth-hattaavah, Kiriath-huzoth, Laban, Libnah 2, Makheloth, Migdol 1, Mithkah, Moseroth, Mount Hor 2, Mount Paran, Mount Shepher, Nophah, Oboth, Pi-hahiroth, Rehob 1, Rissah, Shepham, Sibmah, Suph, Taberah, Tahath, Terah, Tophel, Waheb, Zalmonah, Zin 2.
- **Pin moved (6):**
  - Marah: Uyun Musa → Ain Hawarah
  - Rephidim: Wadi el-Sheikh → Wadi Rufaiyil
  - Ezion-geber: Aqaba → Tell el-Kheleifeh
  - Mount Hor 1: Har Zin → Jebel Harun
  - Shittim: Tell Matabi → Tall el-Hammam
  - Ziphron: Zifran → Huwwarin
- **Confidence medium → low (10):** Amalek, Bamoth-baal, Beon, Havvoth-jair, Meribah 1, Meribah 2, Nimrah, Nobah 1, Peor, Wilderness of Sinai.
- **Type:** Pi-hahiroth → campsite; Ezion-geber and Elath → settlement.
- **Description only:** Amaw, Arad 1, Asshur, Baal-peor, Beth-haram, Chinnereth, Dophkah, Elim, Jotbathah, Kadesh-barnea, Kittim, Mount Horeb, Mount Sinai (and − Deut 33:16), Pithom, Red Sea 1, Sin.
- **Verses:**
  - Aram − Num 23:7; loses balak.
  - Aram-naharaim + Num 23:7, Deut 23:5; gains balak and ki-teitzei.
  - Canaan − Deut 2:12.
  - Dan + Deut 34:1; gains vzot-habracha.
  - Egypt − 6 verses, + Num 33:3.
  - Gilead 1 − Num 32:41.
  - Hazeroth − Num 12:1.
  - Jazer − Num 21:24.
  - Jeshimon − Num 21:20, 23:28; loses chukat and balak.
  - Jordan − 8 verses.
  - Kain − Num 24:22; loses balak.
  - Marah − Exod 15:27.
  - Meribah 1 − Deut 33:2; loses vzot-habracha.
  - Moab 1 − Num 25:2.
  - Philistia + Exod 13:17.
  - Amalek − Num 24:24, + Num 14:25, 43, 45.

**Shared points after the change:**

- Massah | Meribah 2 | Rephidim share one point. This is intended: Exodus 17:7 puts them in one place.
- Mount Sinai | Horeb | Wilderness of Sinai share one point, as intended.
- Shittim now shares Abel-shittim's point (an alias).
- Stations the text lists separately no longer share a point.
