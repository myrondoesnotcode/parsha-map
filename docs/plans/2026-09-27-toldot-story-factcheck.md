# Toldot story: self fact-check

Story: `src/redesign/stories/toldot.ts` (Genesis 25:19 – 28:9), 20 cards. Checked 2026-09-27 by the author, before review.

**How.** Every verse was fetched from the Sefaria API v3 (`/api/v3/texts/<Ref>`): English = THE JPS TANAKH: Gender-Sensitive Edition (with its footnotes), Hebrew = Miqra according to the Masorah. Rashi = Rosenbaum–Silbermann (Sefaria), 25:26 = Sefaria Edition. Talmud = William Davidson edition. Midrash = Sefaria Midrash Rabbah (2022). Onkelos = Metsudah Chumash. Ramban = Chavel. Site identifications = Wikipedia ("Gerar", "Tel Haror", "Tel Be'er Sheva", "Rehoboth (Bible)" quoting Easton's Bible Dictionary, "Rehovot-in-the-Negev") and `src/data/places.json`.

**Earlier fact-check respected** (`factcheck-genesis-1.md`, Toldot section): no Nuzi parallels, no "deathbed blessing"; "when one rises, the other falls" is attributed to Megillah 6a (quoted by Rashi on 25:23), not "the Midrash"; the smell came from Esau's clothes, the goat skins were for touch; the birthright's content is given as Rashi's reading, not as fact; Esek and Sitnah are not pinned.

**Verdicts:** ✅ verified against the source named. No claim is left unverified.

## Map and places

| Claim | Source | Verdict |
|---|---|---|
| Route Gerar → Rehoboth → Beersheba, in that order | 26:6, 26:17, 26:22, 26:23 | ✅ |
| Gerar pin = Tel Haror (Tell Abu Hureyra), north-west of Beersheba, on Nahal Gerar (Wadi esh-Sheri'a); "the site most often identified with Gerar"; not certain | places.json a3f5814 [34.6065, 31.3821]; Wikipedia "Tel Haror" (same coordinates; "north bank of Wadi Gerar … Wadi esh-Sheri'a"); Wikipedia "Gerar" ("Most commentators see the mound of Tel Haror … as representing the ancient Gerar"; ISBE puts the valley in Wady Sheri'a) | ✅ |
| Rehoboth pin = ruins of Rehovot-in-the-Negev in Wadi er-Ruheibeh; an old proposal (Easton's); site unknown; town Nabatean and Byzantine | places.json ab1d954 [34.5658, 31.0311] = Wikipedia "Rehovot-in-the-Negev" coordinates (31.0317, 34.565); Wikipedia "Rehoboth (Bible)": Easton's "thought to have been in Wady er-Ruheibeh"; "Rehovot-in-the-Negev": "Apparently founded in the first century CE by the Nabateans … thriving … Byzantine period" | ✅ |
| Beersheba pin = Tel Be'er Sheva (Tell es-Seba), east of the modern city, its usual identification | places.json a075d61 [34.8408, 31.2447]; Wikipedia "Tel Be'er Sheva" (same coordinates; "believed to be the site of the ancient biblical town … lies east of modern Beersheba") | ✅ |
| Haran pin = Harran in southern Turkey, usual identification | places.json a6d9af3 ("Harran"); same pin as Lech Lecha | ✅ |
| Esek and Sitnah dug "in the wadi of Gerar"; sites unknown, not pinned | 26:17–21; places.json a43608b, aa454f7 (latitude null) | ✅ |
| Chapter 27 names no place; Isaac last at Beersheba; Jacob leaves Beersheba next week | Genesis 27 (no place name); 26:23–33; 28:10 "Jacob left Beer-sheba, and set out for Haran" | ✅ |
| Act one has no stated place; Isaac earlier "settled in the region of the Negeb" (24:62) and near Beer-lahai-roi (25:11), site unknown; Negev map is a backdrop | 24:62, 25:11 (fetched); story camera frames no pin in act one | ✅ |
| All places used are linked to toldot in places.json | `check:stories --strict` 0 warnings | ✅ |

## Cards

| # | Claim | Source | Verdict |
|---|---|---|---|
| 0 | Title Toldot, tagline, range 25:19 – 28:9 | parshaList.json; checker | ✅ |
| 1 | Isaac 40 at marriage; Rebekah infertile; Isaac pleads; she conceives; twins struggle; "If so, why do I exist?"; she goes to inquire of God | 25:20–22 (JPS) | ✅ |
| 1 | Isaac 60 at the birth, twenty years after the wedding | 25:20, 25:26 | ✅ |
| 1 note | Rashi on 25:22: passing "doors of the Torah (Shem and Eber)" Jacob stirred, passing idol worship Esau; or they quarreled over dividing two worlds | Rashi on 25:22 | ✅ |
| 2 | Quote of 25:23 (JPS), omitted line "Two separate peoples shall issue from your body"; Hebrew is the qere גוֹיִם, no divine name | 25:23 (JPS; Masorah, ketiv גיים / qere גוֹיִם) | ✅ |
| 2 | Megillah 6a, quoted by Rashi on 25:23: the two never great at once; when one rises the other falls; Rav Naḥman bar Yitzḥak | Megillah 6a ("Rav Naḥman bar Yitzḥak said … when one nation rises, the other necessarily falls"); Rashi on 25:23 ("when one rises the other will fall … (Megillah 6a)") | ✅ |
| 3 | Esau red, "like a hairy mantle"; Jacob holding the heel; names; hunter/man of the outdoors vs. mild man in camp; Isaac favors Esau (taste for game), Rebekah Jacob | 25:25–28 (JPS) | ✅ |
| 3 note | JPS notes: Esau ~ se'ar "hair", Jacob ~ 'aqeb "heel"; "stayed in camp" lit. "a sitter in tents" | JPS footnotes on 25:25–27 | ✅ |
| 3 note | Rashi on 25:27: tents of Shem and Eber (places of study, cf. Rashi on 25:22, 25:27 "houses of learning") | Rashi on 25:22, 25:27 | ✅ |
| 3 note | Rashi on 25:26 cites a midrash: Jacob held on with justice, conceived first, firstborn place rightly his | Rashi on 25:26 ("It was with justice … take the first-born status with justice") | ✅ |
| 4 | Guess: "that red stuff" → named Edom; lentils; "bread and lentil stew" | 25:30, 25:34 (JPS); JPS note "Edom: play on Heb. ʼadom 'red'" | ✅ |
| 4 note | Aram = Rebekah's family's land; Gerar is where Isaac goes next | 25:20 ("Bethuel the Aramean of Paddan-aram"); 26:1 | ✅ |
| 5 | Dialogue and "Thus did Esau spurn the birthright" | 25:31–34 (JPS) | ✅ |
| 5 note | Rashi on 25:31: birthright = sacrificial service, then done by firstborn | Rashi on 25:31 | ✅ |
| 5 note | Bava Batra 16b (brought by Rashi on 25:30): Abraham died that day; Jacob cooked lentils to comfort Isaac; lentils the mourners' meal | Bava Batra 16b (baraita); Rashi on 25:30 | ✅ |
| 5 note | On that reading the twins were 15: Abraham 100 at Isaac's birth, died at 175, Isaac 60 at twins' birth (160 → 175) | 21:5, 25:7, 25:26 | ✅ |
| 6 | Famine; Isaac to Abimelech king of the Philistines in Gerar; told not to go down to Egypt, stay in the land; says "she is my sister" for fear of the locals because she is beautiful; Abimelech sees, realizes she is his wife, orders death to anyone who harms them | 26:1–11 (JPS) | ✅ |
| 6 note | Earlier famine in Abraham's days, Abram went down to Egypt | 26:1; 12:10 | ✅ |
| 6 note | Abraham said of Sarah "She is my sister" to King Abimelech of Gerar; Torah doesn't say if same king | 20:1–2 | ✅ |
| 7 | Hundredfold that year; very wealthy; Philistines envy; wells of Abraham's servants filled with earth; "Go away from us"; moves to the wadi of Gerar | 26:12–17 (JPS) | ✅ |
| 8 | Abraham's wells re-dug with his names; Esek "contention" (quarrel, "The water is ours"); Sitnah "harassment"; Rehoboth "ample space", no quarrel; Shibah "as though 'oath'", found the day of the oaths with Abimelech | 26:18–22, 26:31–33; JPS notes on 26:20, 21, 22, 33 | ✅ |
| 8 note | Ramban on 26:20: wells hint at the three Temples; Esek and Sitnah the first two, contended over and destroyed; Rehoboth the future third, built without quarrel | Ramban on 26:20 (Chavel) | ✅ |
| 9 | Moved on, new well, no quarrel, named Rehoboth, quote | 26:22 (JPS) | ✅ |
| 9 note | "GOD" is the JPS GSE rendering of the four-letter name | JPS GSE text (same convention as Bereshit) | ✅ |
| 10 | Quote of 26:24; "That night"; "went up to Beer-sheba" | 26:23–24 (JPS) | ✅ |
| 11 | Altar, tent; Abimelech from Gerar with councilor (Ahuzzath) and army chief (Phicol); "We now see plainly that GOD has been with you"; feast, oaths, depart in peace; same day "We have found water!"; Shibah → Beer-sheba | 26:25–33 (JPS) | ✅ |
| 11 note | Genesis 21:31: Abraham and Abimelech swore an oath there | 21:31 ("there the two of them swore an oath"), 21:27 | ✅ |
| 12 | Isaac old, eyes too dim; quiver and bow; dish he likes; "so that I may give you my innermost blessing before I die" | 27:1–4 (JPS) | ✅ |
| 12 note | Esau at 40 marries Judith and Basemath, Hittites, "a source of bitterness to Isaac and Rebekah" | 26:34–35 (JPS) | ✅ |
| 13 | Rebekah overhears; two kids; she cooks; Jacob fears being felt and seen as a trickster; "Your curse, my son, be upon me!"; Esau's best clothes; kid skins on hands and neck | 27:5–17 (JPS) | ✅ |
| 13 note | Onkelos on 27:13: "It was said regarding me in a prophecy that curses will not come upon you" (Metsudah); Torah gives no reason; she had been told 25:23 | Targum Onkelos 27:13 (Metsudah); 25:22–23 | ✅ |
| 14 | "I am Esau, your first-born"; Isaac asks how so quickly; calls him close to feel him, whether really Esau | 27:18–21 (JPS) | ✅ |
| 14 note | Rashi on 27:19: "I am he that brings food to you, and Esau is your first-born"; 27:24 Jacob answers "I am"; Rashi: he did not say "I am Esau" | Rashi on 27:19, 27:24; 27:24 (JPS) | ✅ |
| 15 | Quote 27:22 (JPS) and Hebrew (no divine name) | 27:22 | ✅ |
| 15 | Rashi on 27:22: Jacob spoke entreatingly ("Pray sit up", 27:19), Esau harshly ("Let my father sit up", 27:31) | Rashi on 27:22; 27:19, 27:31 (JPS wording) | ✅ |
| 15 note | Bereshit Rabbah 65:20: when the voice of Jacob is in the synagogues (and study halls), the hands of Esau do not prevail | Bereshit Rabbah 65:20 (R. Abba bar Kahana) | ✅ |
| 16 | Isaac eats, drinks (wine); Jacob kisses him; Isaac smells his clothes; quote; dew of heaven, fat of the earth; "Let peoples serve you, And nations bow to you; Be master over your brothers" | 27:23–29 (JPS) | ✅ |
| 17 | Esau returns with a dish; Isaac trembles; "I blessed him; now he must remain blessed!"; "Have you but one blessing, Father? Bless me too, Father!"; Isaac's answer: fat of the earth, dew of heaven, live by sword, serve brother, break his yoke | 27:30–40 (JPS). 27:39 says Isaac "answered", so the story says "answers", not "blesses" | ✅ |
| 17 note | Rashi on 27:33: Isaac confirmed the blessing of his own free will, so one could not say Jacob got it only by deceit | Rashi on 27:33 | ✅ |
| 17 note | Devarim Rabbah 1:15: Rabban Shimon ben Gamliel, Esau honored his father more than he did; served him in fine garments, the garments Rebekah put on Jacob | Devarim Rabbah 1:15 | ✅ |
| 18 | Esau resolves to kill Jacob after the mourning; Rebekah: flee to Laban in Haran "until your brother's fury subsides"; Isaac sends for Jacob, blesses him with the blessing of Abraham, sends him to Paddan-aram to take a wife | 27:41–45, 28:1–5 (JPS) | ✅ |
| 18 note | Esau marries Mahalath, Ishmael's daughter, in addition to his wives | 28:6–9 | ✅ |
| 18 note | Rashi on 28:5: "I do not know what the addition of these words is intended to tell us" | Rashi on 28:5 (Rosenbaum–Silbermann) | ✅ |
| 19 | Talk card and "About the map" note | as above | ✅ |
| Q | Kids: Esek for a quarrel, Rehoboth room for everyone | 26:20, 26:22 | ✅ |
| Q | Deeper: 25:23 heard before birth; Isaac blesses Jacob again by name before sending him (28:1–4) | 25:22–23; 28:1–4 | ✅ |

## Deliberate choices

- Jacob, Esau and Rebekah: the story states what the verses say and gives each reading with its author (Rashi, Onkelos, Devarim Rabbah, Bereshit Rabbah). Esau's side gets the text's own weeping (27:34, 38) and Rabban Shimon ben Gamliel's praise.
- No date other than the automatic date bar.
- No `name` card (Jacob's renaming is in Vayishlach) and no `plan` card. No `letter` card: the small kuf of קַצְתִּי (27:46; Kitzur Baal HaTurim on 27:46) sits mid-word, and the letter card always shrinks the last letter.

## Round 2: independent fact-check (4 lenses), applied 2026-09-27

Each finding was re-checked before any change: Sefaria v3, JPS Gender-Sensitive (with its notes) + Miqra according to the Masorah, for Genesis 20:1–5, 24:62, 25:19–34, 26, 27, 28:1–9, 36:9; Rashi on 25:22, 27:19, 27:22, 27:24, 27:33; Bereshit Rabbah 65:20; Megillah 6a; Wikipedia *Rehovot-in-the-Negev* and *Negev*. Rows above for the Rehoboth pin, "Chapter 27 names no place", the act-one backdrop, card 17, and the two questions are superseded by these fixes.

**Story (`toldot.ts`)**
- Act-one backdrop moved from the central Negev (30.25° N, ~110 km south of Beersheba) to the northern Negev (30.95° N), the Bible's Negeb (Wikipedia *Negev*: the biblical Negev is only the northern, semi-arid part). No route pin shows before the first stop (app fix on redesign/daylight).
- Card 1 note: 25:11 (Beer-lahai-roi) is dated after Abraham's death, some fifteen years after the twins' birth (21:5, 25:7, 25:26), so it no longer reads as where they were born; the JPS note says the Hebrew of "why do I exist?" is uncertain, and Rashi on 25:22 reads it as why she had longed and prayed to become pregnant.
- Card 3: "so they name him Jacob" → "and he is named Jacob" (25:26 Hebrew וַיִּקְרָא is singular; 25:25 is plural).
- Card 6 note and sources: Abraham's "She is my sister" said to Abimelech is 20:1–5 (the "to me" is 20:5).
- Card 8: "Abraham's wells (several)" (26:18, plural).
- Card 9 note, talk note, route hedge: Ruheibeh was Easton's proposal (1890s) and modern archaeology rejects it (no remains older than the Roman period); hedge "site unknown · pin illustrative".
- Card 10 → 11: "The pin marks Tel Be'er Sheva…" moved to card 11; on the stars card the sky covers the pin.
- Card 12 note and header: chapter 27 doesn't say where the family is living (it names Haran as Jacob's destination, 27:43).
- Card 15: `stop: 3`, so the Beersheba pin stays active through the scene; note: "One reading in Bereshit Rabbah 65:20" (the promise reading is one of several, told of Avnimos).
- Card 17: "but one day break his yoke" → "but when he grows restive he will break his yoke" (27:40); note: the JPS note to 27:39 records the opposite reading, "be away from the fat of the earth."
- Questions: Kids "room and no quarrel" (26:22 "us", not "everyone"); Deeper "this time knowing it is Jacob" (Isaac's words in 28:1–4 don't use his name).

**Read tab (`parshaList.json` toldot)**
- In brief: no "violently", no "would define her family for generations" or primogeniture editorial; 25:23 given as told; birthright sold for "bread and a red lentil stew" (25:34), not "a single bowl"; Isaac "hears Jacob's voice but feels hairy hands" (27:22–23); "a blessing of abundance" (27:28), not "fertility" (that is 28:3); Isaac lets the blessing stand (27:33) and Esau weeps on learning what happened (27:34), not on arrival.
- Did you know: Rashi on 27:19 and 27:24 given as he says them, not "never tells an outright lie"; "The Torah traces the Edomites to Esau (36:9)"; Edom = Rome sourced to Megillah 6a ("Caesarea, daughter of Edom"), not "throughout rabbinic literature … allegory".
- History: "Isaac lets the spoken blessing stand … Rashi reads this as Isaac confirming it of his own free will" (27:33), not "cannot be recalled".
- In Jewish tradition: dropped "and later with Christian civilization in general" (no fetched source).

**Art**: caption "Two scenes in one picture": the stew (25:29–34) and the quiver and bow of 27:3.

**Places**: `Rehoboth 1` (ab1d954) description now says the Ruheibeh identification is rejected and the real site is unknown (DESCRIBED table).
