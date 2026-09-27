# Exodus fact-check (report only; no repo files edited)

Source read: /Users/myronshneider/parsha/wt-data (parshaList.json, places.json, parshaDates.json + scripts/buildParshaDates.mjs, timeline.json, useEraContext.ts / placeText.ts, scripts/processGeodata.ts).
Full findings with evidence and exact fixes: findings-Exodus.jsonl (EXO-1 to EXO-80). 80 findings: 35 wrong, 36 misleading, 9 unsupported.

Claim counts are approximate (each text field split into single claims; verified = checked against a fetched source with no problem).

## Per parsha (Read-tab text + caption)

| Parsha | Claims checked | Verified | Flagged (findings) |
|---|---|---|---|
| Shemot | ~32 | ~24 | 7 text + caption (+1 pin) |
| Vaera | ~28 | ~23 | 5 text + caption |
| Bo | ~30 | ~24 | 5 text + caption |
| Beshalach | ~34 | ~29 | 4 text + caption (+7 pin findings) |
| Yitro | ~30 | ~24 | 6 text + caption (+1 pin) |
| Mishpatim | ~32 | ~25 | 7 text + caption |
| Terumah | ~28 | ~19 | 9 text + caption |
| Tetzaveh | ~30 | ~24 | 6 text + caption |
| Ki Tisa | ~30 | ~25 | 5 text; caption correct |
| Vayakhel | ~22 | ~19 | 3 text + caption |
| Pekudei | ~26 | ~22 | 4 text + caption |

### Shemot
- EXO-1 "revealing YHWH for the first time": the name is used throughout Genesis (Gen 15:7, 28:13); misleading.
- EXO-2 Sargon "exact parallel", "royal gardener", c. 2300 BCE: wrong (Akki the water-drawer; text is 7th c. BCE).
- EXO-3 Pithom "archaeologically real": site disputed (Retaba vs Maskhuta).
- EXO-4 Leiden Papyrus "'Apiru making bricks": wrong, they haul stone for a pylon (Leiden 348).
- EXO-5 Haggadah names Moses once "to prevent...": motive stated as fact; attribute.
- EXO-6 "one of four" double name-calls in the Torah: wrong, three in the Torah (Shemot Rabbah 2:6).
- EXO-7 keyFigures Yocheved/Miriam: not named in this parsha.
### Vaera
- EXO-8 summary "each time Pharaoh hardens his heart": God hardens after boils (9:12).
- EXO-9 "first appear before Pharaoh": wrong, first audience is 5:1.
- EXO-10 "3-3-1 pattern", "announced at the Nile": pattern is sets of three (Rashbam 7:26); hail announced in the morning.
- EXO-11 Maimonides and "first five plagues": the five-plague point is Rashi/Midrash, not Rambam.
- EXO-12 "ten drops": Rema records sixteen; reason is a popular explanation.
### Bo
- EXO-13 summary "angel of death", "after 430 years": verse says God passes over; Rashi counts 430 from Abraham.
- EXO-14 "in Egypt exactly 430 years": attribute; tradition says otherwise.
- EXO-15 firstborn "ritual figures", Egyptian parallels to a "sea crossing": unsupported.
- EXO-16 seder "most widely practiced Jewish ritual in the world": unsupported (Pew: 62% vs 72% for Jewish food).
- EXO-17 four cups = four expressions "in this portion": wrong, they are in Vaera (6:6-7).
### Beshalach
- EXO-18 Song of the Sea layout "unique": Megillah 16b says all biblical songs use it.
- EXO-19 "most frequently recited biblical poem": wrong, Ashrei (Ps 145) is said three times a day.
- EXO-20 "Sanhedrin 91b... unborn souls": wrong page; Sotah 30b (Rabbi Meir, fetuses).
- EXO-21 "one of the oldest poems": scholarly view stated as fact.
### Yitro
- EXO-22 summary "Moses ascends and receives the Ten Commandments": God speaks them; tablets come later.
- EXO-23 Jethro "prostrates himself": wrong, Moses bows to Jethro (18:7).
- EXO-24 "one significant difference" between the Decalogues: there are several.
- EXO-25 Lecha Dodi / "collapse of language": attribute to Rosh Hashanah 27a, drop the gloss.
- EXO-26 Baal "exactly these terms"; Jebel Musa pilgrims "for millennia": overstated.
- EXO-27 "only parsha named after a non-Israelite": wrong (Balak, Noach).
### Mishpatim
- EXO-28 "strikes another and they die, it is murder"; "ox that gores must be stoned": the text distinguishes accident; ox only if it kills.
- EXO-29 "widow's garment as collateral": wrong, that is Deut 24:17.
- EXO-30 "without describing what they saw": wrong, sapphire pavement (24:10).
- EXO-31 "world's earliest legislation against price gouging": wrong/unsupported.
- EXO-32 differences from Hammurabi (slavery limits, selling for debt): wrong; Hammurabi 117 limits debt-slavery, Ex 21:7 allows selling a daughter.
- EXO-33 stranger "36 times... more than any other... always the same reason": attribute to Bava Metzia 59b; cut the rest.
- EXO-34 "one of only two blood-covenant rituals": unsupported.
### Terumah
- EXO-35 "After... forty days": the instructions come during the forty days.
- EXO-36 "wool with embroidered cherubim": linen plus yarns, woven (Rashi 26:1).
- EXO-37 Ark "most famous object in religious history": unsupported.
- EXO-38 menorah "75-100 lb": the talent includes its tongs and pans.
- EXO-39 Egyptian barque shrines "for consultation": unsupported; the real parallel is Ramesses II's Kadesh camp (Homan).
- EXO-40 "Purple dye (tekhelet)": wrong, tekhelet is blue; purple is argaman.
- EXO-41 "more medieval commentary than almost any other section": unsupported.
- EXO-42 Ark layers = "Torah wrapped in scholarship wrapped in fear of God": unsupported; Yoma 72b says something else.
- EXO-43 tzedakah "must come from genuine generosity": wrong, tzedakah can be compelled (Bava Batra 8b).
### Tetzaveh
- EXO-44 / EXO-47 Moses's name absent "the only such portion": wrong, several Deuteronomy portions also lack it (Baal HaTurim excludes Deuteronomy); Baal HaTurim's reason misstated.
- EXO-45 priests stay at the entrance seven days: that is Lev 8:33.
- EXO-46 incense altar "blood never... purely olfactory": wrong, 30:10.
- EXO-48 Egyptian breastplate parallel: unsupported.
- EXO-49 robe's atonement reason: wrong (Arakhin 16a: sound atones for sound).
### Ki Tisa
- EXO-50 summary "thousands die in a plague": 3,000 killed by Levites; plague has no toll.
- EXO-51 "gone forty days": text says "delayed"; Rashi says they miscounted.
- EXO-52 torn-contract parable misdescribed (Shemot Rabbah 43:1).
- EXO-53 "Excavations at Dan and Bethel unearthed golden calves": wrong, none found.
- EXO-54 "original sin": not the Talmud's claim or term.
### Vayakhel
- EXO-55 craftsmen vs Moses stopping the donations (36:5-6).
- EXO-56 Bezalel "kabbalistic... which is why": over-reads Berakhot 55a.
- EXO-57 temple-building "uniformly... Egyptian texts": overstated; use the Gudea Cylinders.
### Pekudei
- EXO-58 Moses "protecting himself": attribute to Shemot Rabbah 51:6.
- EXO-59 eighteen "as YHWH commanded Moses" = 18 vertebrae: the Jerusalem Talmud (Berakhot 4:3) links them to the Amidah's 18 blessings. (Count verified: 18.)
- EXO-60 "Tanchuma Pekudei 11... light, water, bread, incense": wrong ref (it is Pekudei 2) and wrong pairings.
- EXO-61 Moses blesses with "Numbers 6, quoted here": wrong; Rashi gives a different blessing.

## Captions (all checked on Commons extmetadata)

| Parsha | Current | Corrected |
|---|---|---|
| Shemot | Moses and the Burning Bush — Gustave Doré, 1866 | Moses — Jusepe de Ribera, 1638 (a portrait, not the bush; consider swapping) |
| Vaera | The Plague of Frogs — Gustave Doré, 1866 | The Seventh Plague — John Martin, 1823 |
| Bo | The Plague of the Firstborn — Gustave Doré, 1866 | The Death of the Firstborn and the Departure from Egypt — Sister Haggadah, 14th century |
| Beshalach | Crossing the Red Sea — Gustave Doré, 1866 | Pharaoh's Army Engulfed by the Red Sea — Frederick Arthur Bridgman, 1900 |
| Yitro | Moses on Mount Sinai — Gustave Doré, 1866 | The Ten Commandments, parchment — Jekuthiel Sofer, 1768 (photo of a manuscript) |
| Mishpatim | The Giving of the Law on Mount Sinai — Gustave Doré, 1866 | Moses Receiving the Law — João Zeferino da Costa, 1868 |
| Terumah | God Speaks to Moses on the Mountain — Schnorr von Carolsfeld, 1860 | NOT AN ARTWORK: 2011 photo of the Tabernacle model at Timna Park (Ruk7, CC BY-SA 3.0) |
| Tetzaveh | Moses Receives Instructions for the Sanctuary — Schnorr von Carolsfeld, 1860 | NOT AN ARTWORK / wrong subject: 2014 photo of a breastplate decoration on a Ramat Gan synagogue (Avishai Teicher, CC BY 2.5) |
| Ki Tisa | Moses Breaks the Tablets — Gustave Doré, 1866 | correct (Commons: Doré, 1866) |
| Vayakhel | The Completion of the Tabernacle — Schnorr von Carolsfeld, 1860 | The Erection of the Tabernacle and the Sacred Vessels — Gerard Hoet, 1728 (shows Ex 40:17, i.e. Pekudei) |
| Pekudei | The Ark of the Covenant — Gustave Doré, 1866 | The Tabernacle in the Wilderness — Holman Bible, 1890 |

10 of 11 captions are wrong; only Ki Tisa is right. Two files are photos, not art.

## Map pins (31 places)
- Wrong: EXO-72 Pi-hahiroth / Migdol 1 / Baal-zephon are pinned 50-100 km apart though 14:2 puts them together, and Pi-hahiroth's "within 1 km of Baal-zephon" is false for its own pin: UNPIN all three (sites unidentified). EXO-73 Massah and Meribah 2 are "at Rephidim" but ~21 km from the Rephidim pin, and Meribah is rated medium: MOVE both to Rephidim (and make Meribah low). EXO-74 Marah: drop Exod 15:25 and 15:27 (they don't name it).
- Misleading descriptions (confidence already low, but the text reads as a known site): EXO-75 Mount Sinai / Horeb (say "traditional site, disputed"), EXO-77 Pithom, EXO-78 Red Sea 1 (crossing site), EXO-79 Elim, Etham, Sin, Rephidim, Marah. EXO-76 Wilderness of Sinai is rated medium around a low-confidence mountain: make it low.
- Missing verse: EXO-80 Philistia, Exod 13:17.
- Checked and OK: Amalek, Canaan, Edom, Egypt, Euphrates (Ex 23:31 "the River"), Goshen 1, Great Sea, Midian, Moab 1, Nile, Rameses, Red Sea 2 (Gulf of Aqaba, Ex 23:31), Red Sea 3 (Ex 10:19, low), Shur, Succoth 2 (Tell el-Maskhuta is the usual identification), Rephidim verses. Parsha tags match their verses; I found no place wrongly tagged into an Exodus parsha.
- Honest handling for the disputed sites (Sinai, Yam Suf, the stations): keep them low, state in the description that the pin marks one traditional or proposed site and name the rival proposals; unpin where the verse ties several places together that the source pins scatter (Pi-hahiroth group).

## Date bar (parshaDates.json)
All 11 entries verified. Chain: Exodus = Isaac's birth (2048) + 400 = AM 2448 (SOR 3; Chabad 2448 = 1313 BCE). Shemot 2447 (SOR 5: the bush "at the time of Passover... in that same time the next year, the Children of Israel went out"); Vaera 2447-2448 (SOR 3: "מכות מצרים י\"ב חדשים", the plagues took 12 months); Bo 15 Nisan 2448 (Num 33:3); Beshalach sea crossing on the last festival day of Passover (SOR 5); Yitro third month (Ex 19:1); Mishpatim/Terumah/Tetzaveh 2448 (Ex 24:16-18); Ki Tisa 17 Tammuz 2448 (Mishnah Taanit 4:6); Vayakhel from the day after Yom Kippur (Rashi 35:1), 2449 = autumn 1313 to spring 1312 BCE; Pekudei 1 Nisan 2449 = 1312 BCE (Ex 40:17). Conversions correct. No findings.

## Era fallback card (era)
None of the 11 parshiot has a worldEvents.json entry, so all get eraYear = (1300+1200)/2 = 1250, the "Late Bronze Age", 1550-1200 BCE. The card shows name, dates, shortDesc and event descriptions (not significance). Name, range and shortDesc are fine. Events: Megiddo c. 1457 (Thutmose III vs a coalition led by the king of Kadesh), Akhenaten c. 1353 (reigned c. 1353-1336 or 1351-1334), Kadesh c. 1274 (May 1274 BCE, low chronology), collapse c. 1200 (late 13th to early 12th century): all verified against Wikipedia. The fairness note on the card ("No one knows when...; the Torah names none of them") covers them. Minor note, not a finding: Megiddo and Akhenaten are 50-150 years before the date bar's own 1300-1200 window; only Kadesh and the collapse fall inside it. No findings.

## Could not check / caveats
- WebFetch hit its session limit partway through; later checks used the Wikipedia and Commons APIs and Sefaria via curl instead.
- EXO-39 relies on search-result summaries of Homan's BAR article and TheTorah.com (the page itself not fetched).
- Vaera's Ipuwer "river is blood" and Hort's plague-cascade theory are accepted as correctly hedged; I did not fetch the primary texts.
- Menorah weight in pounds (EXO-38): I did not verify modern talent estimates; the finding only fixes what the talent covers.
- Pesikta Rabbati 21 (Ten Commandments matching the ten sayings of creation) was confirmed only from a secondary page, not the Sefaria text.
- Sefaria's Kitzur Baal HaTurim was used for the Tetzaveh finding (the full Baal HaTurim title didn't resolve).
- Process note: I accidentally overwrote the pre-existing scratchpad/sef.sh helper with my own version (same usage: `sef.sh Ref [english|hebrew]`). My working copies are in scratchpad/exo/.
