# Noach story: self fact-check

Story: `src/redesign/stories/noach.ts` (branch `review/noach`). Checked 2026-09-27 against sources fetched that day.

**Sources fetched.** Verses: Sefaria API v3, Genesis 6–11 and 2 Kings 19:37, THE JPS TANAKH: Gender-Sensitive Edition (English, with its footnotes) and Miqra according to the Masorah (Hebrew). Rashi: Rosenbaum–Silbermann (English + Hebrew). Talmud: William Davidson edition (Sanhedrin 56a, 56b, 108a, 108b; Rosh Hashanah 11b; Berakhot 59a). Pirkei Avot 5:2 (Kulp; Torat Emet Hebrew). Bereshit Rabbah 38:13 (Sefaria Midrash Rabbah 2022). Targum Onkelos on Genesis 8:4 (Metsudah). Shulchan Arukh, Orach Chayim 229:1. Scholarship: Wikipedia articles *Gilgamesh flood myth*, *Mount Ararat*, *Urartu*, *Etemenanki*, *Uruk*, *Ur of the Chaldees*.

Also checked against the Genesis fact-check report (Noach section): nothing it flags as wrong is repeated. In particular, the story does not say the Noahide laws come from this parsha, does not attribute a "limited moral courage" reading to Sanhedrin 108b, does not call the Gilgamesh birds "near-identical", does not pin Ararat as if it were the Torah's site, and does not end the parsha at Babel.

No dates are added: the only numbers are the Torah's own (Noah's 600th year, months and days). No Hebrew shows the Tetragrammaton (the Hebrew fields are 9:13, item terms from 6:14–16 and 7:2, and month/day labels). No depictions of God.

Verdicts: **verified** = matches the fetched text; **fixed** = was wrong or loose in a draft and changed before commit.

## Cover and setting

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 1 | cover | Title Noach, range Genesis 6:9 – 11:32, tagline "A new beginning." | parshaList.json; checker | verified (tagline is a theme line, not a factual claim) |
| 2 | cover | Anchor "the mountains of Ararat (8:4)" | Genesis 8:4 "on the mountains of Ararat"; places.json ab89be9 | verified |
| 3 | 1 | The Torah doesn't say where Noah lived or built the ark | Genesis 6:9 – 7:10 name no place | verified |
| 4 | 1 | Quote "Noah was a righteous man; he was blameless in his age; Noah walked with God." | Genesis 6:9 JPS | verified |
| 5 | 1 | The earth is filled with lawlessness; God tells Noah to build an ark | Genesis 6:11–14 | verified |
| 6 | 1 note | Places named later: mountains of Ararat, land of Shinar, Ur, Haran | 8:4, 10:10, 11:2, 11:28, 11:31 | verified |
| 7 | 1 note | "In his age" is literally "in his generations" (בְּדֹרֹתָיו) | Hebrew 6:9 | verified |
| 8 | 1 note | Rashi on 6:9: some Rabbis read it as praise (righteous even in his generation), others as a limit (righteous only compared with it), citing Sanhedrin 108a | Rashi on 6:9 (Hebrew: לשבח / לגנאי, "סנה' ק"ח") | verified |

## Building the ark

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 9 | 2 | Gopher wood; quote "Make yourself an ark of gopher wood." | 6:14 JPS | verified |
| 10 | 2 | Compartments; Rashi: a separate stall for each kind of animal | 6:14; Rashi on 6:14 קנים "מדורים מדורים לכל בהמה וחיה" | verified |
| 11 | 2 | Pitch, inside and out | 6:14 | verified |
| 12 | 2 | 300 cubits long, 50 wide, 30 high (ש׳ אַמָּה = 300 cubits) | 6:15 | verified |
| 13 | 2 | An opening for daylight; Rashi: some say a window, others a precious stone that gave light | 6:16; Rashi on 6:16 צהר | verified |
| 14 | 2 | Entrance in its side; Rashi: so the rain wouldn't come in | 6:16; Rashi on 6:16 "שלא יפלו הגשמים בה" | verified |
| 15 | 2 | Three decks: bottom, second and third | 6:16 | verified |
| 16 | 2 note | "Within a cubit of the top" is uncertain in the Hebrew (JPS note); Rashi: roof sloping up to a cubit, so rain runs off | JPS footnote on 6:16 "Meaning of Heb. uncertain"; Rashi on 6:16 | verified |
| 17 | 3 | Quote "Noah did so; just as God commanded him, so he did." | 6:22 JPS | verified |
| 18 | 3 | Sanhedrin 108b: Noah warned (rebuked) his generation and they mocked him | Sanhedrin 108b (Rava): "Noah the righteous would rebuke… they would treat him with contempt" | verified |
| 19 | 3 | Rashi on 6:14: God had Noah build an ark so people would see him at it, ask what it was for, and perhaps repent | Rashi on 6:14 ("perhaps they might repent", citing Sanhedrin 108b) | verified |
| 20 | 3 title/note | "Old man, why are you building this ark?" | Sanhedrin 108b, William Davidson translation, verbatim | verified |
| 21 | 3 note | Rashi says 120 years; the Torah doesn't say how long the building took | Rashi on 6:14 "ק"כ שנה"; Genesis 6 gives no duration | verified |

## The animals (guess)

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 22 | 4 | Two of every kind first | 6:19–20 | verified |
| 23 | 4 | Seven pairs of every pure animal; two of the not pure; quote of 7:2 | 7:2 JPS verbatim | verified |
| 24 | 4 | Seven pairs of the birds of the sky too | 7:3 | verified |
| 25 | 4 | Rashi on 7:2: the extra ones so Noah could bring offerings on leaving the ark | Rashi on 7:2 שבעה שבעה "כדי שיקריב מהם קרבן בצאתו" | verified |
| 26 | 4 note | Hebrew "seven seven" (שִׁבְעָה שִׁבְעָה), JPS "seven pairs" | Hebrew and JPS 7:2 | verified |
| 27 | 4 tokens | שְׁנַיִם "two" (7:2 uses it for the not-pure pair); עֲשָׂרָה עֲשָׂרָה is a made-up wrong option | 7:2 | verified (distractor, not a claim) |

## The Flood and its calendar

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 28 | 5 | Noah's 600th year, 17th of the second month, fountains of the great deep burst, floodgates of the sky opened | 7:11 | verified |
| 29 | 5 | Family and animals went in; God shut him in | 7:13–16 ("GOD shut him in", English "God" used) | verified |
| 30 | 5 | Rain forty days and forty nights | 7:12 | verified |
| 31 | 5 | Highest mountains covered; only Noah and those with him in the ark left | 7:19–20, 7:23 | verified |
| 32 | 5 note | Rashi on 7:11: R. Eliezer says Marcheshvan, R. Joshua says Iyar (Rosh Hashanah 11b); counting from Tishrei / from Nisan | Rashi on 7:11; Rosh Hashanah 11b ("second month counting from Tishrei" / "from Nisan") | verified |
| 33 | 5 note | The Torah doesn't say where the ark was during the Flood | 7:17–18 ("the ark drifted upon the waters") | verified |
| 34 | 6 | Month 2 day 17, 600th year: Flood begins | 7:11 | verified |
| 35 | 6 | Forty days and nights of rain | 7:12 | verified |
| 36 | 6 | The waters swell 150 days; then God remembers Noah and sends a wind | 7:24 – 8:1 | verified |
| 37 | 6 | Month 7 day 17: ark rests on the mountains of Ararat | 8:4 | verified |
| 38 | 6 | Month 10 day 1: mountaintops visible | 8:5 | verified |
| 39 | 6 | Month 1 day 1 of the 601st year: ground drying | 8:13 | verified |
| 40 | 6 | Month 2 day 27: earth dry; "Come out of the ark" | 8:14–16 | verified |
| 41 | 6 note | Months are numbered, not named | 7:11, 8:4, 8:5, 8:13, 8:14 | verified |
| 42 | 6 note | Rashi on 8:14: the extra days are the solar year's excess over the lunar year; the judgment lasted a full year | Rashi on 8:14 (Hebrew says 11 days; the story gives no number, to avoid the English/Hebrew discrepancy) | verified |

## Ararat, the birds

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 43 | 7 | God remembers Noah and the animals, sends a wind, waters go down | 8:1–3 | verified |
| 44 | 7 | 17th of the 7th month, "the mountains of Ararat"; a range, not a single peak | 8:4 (הָרֵי אֲרָרָט, plural) | verified |
| 45 | 7 note | Sennacherib's sons flee "to the land of Ararat" | 2 Kings 19:36–37 JPS | verified |
| 46 | 7 note | Historians generally take Ararat as the Hebrew name of Urartu, an ancient kingdom in the Armenian highlands | Wikipedia *Mount Ararat* ("Historians and Bible scholars generally agree…"); *Urartu* ("centered on the Armenian highlands") | verified (scholarship, labelled as historians' view) |
| 47 | 7 note | The pin is today's Mount Ararat, in eastern Turkey | Wikipedia *Mount Ararat* (Eastern Anatolia, Turkey); places.json ab89be9 | verified |
| 48 | 7 note | Linking that peak with the ark is a later tradition, not the Torah's | Wikipedia *Urartu*: "a modern identification based on postbiblical tradition"; *Mount Ararat*: associated since the 11th century | verified |
| 49 | 7 note | Onkelos: "the mountains of Kardu" | Onkelos Genesis 8:4 "עַל טוּרֵי קַרְדּוּ" | verified |
| 50 | 7, 8 spot | "Mount Ararat (today's peak)" | as 47 | verified; label shortened from a longer hedge that was clipped on screen |
| 51 | 8 | Window opened; raven sent; then dove; dove finds no rest and returns | 8:6–9 | verified |
| 52 | 8 | Seven days later, toward evening, a plucked-off olive leaf in its bill; Noah knows the waters have decreased | 8:10–11 JPS | verified |
| 53 | 8 | Seven days later it doesn't return | 8:12 | verified |
| 54 | 8 note | Gilgamesh XI: Utnapishtim releases a dove and a swallow, which return, then a raven, which doesn't; scholars debate the relationship | Wikipedia *Gilgamesh flood myth*; parshaList historicalContext (already corrected per the Genesis report) | verified (scholarship, labelled) |

## After the Flood

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 55 | 9 | God tells Noah to come out with family and every creature | 8:15–17 | verified |
| 56 | 9 | Noah builds an altar and brings (burnt) offerings | 8:20 | verified |
| 57 | 9 | God resolves never again to destroy every living being | 8:21 | verified |
| 58 | 9 | Quote "So long as the earth endures, seedtime and harvest, cold and heat, summer and winter, day and night shall not cease." | 8:22 JPS (poetry line breaks joined with commas) | verified |
| 59 | 9 note | The Torah doesn't say where the altar was | 8:20 | verified |
| 60 | 10 | Blessing "Be fertile and increase, and fill the earth." | 9:1 JPS | verified |
| 61 | 10 | May eat meat, but not flesh with its life-blood | 9:3–4 | verified |
| 62 | 10 | Whoever sheds human blood must answer for it, "for in the image of God was humankind made" | 9:5–6 JPS | verified |
| 63 | 10 note | Sanhedrin 56a: seven commandments for the descendants of Noah (courts; not cursing God, idolatry, forbidden relations, bloodshed, robbery, a limb from a living animal) | Sanhedrin 56a baraita | verified |
| 64 | 10 note | Rabbi Yochanan derives them from Genesis 2:16 (Sanhedrin 56b), not from this chapter | Sanhedrin 56b; Genesis report (fix to jewishTradition) | verified |
| 65 | 11 | Quote "I have set My bow in the clouds, and it shall serve as a sign of the covenant between Me and the earth." + Hebrew | 9:13 JPS; Hebrew 9:13 (cantillation removed) | verified |
| 66 | 11 | Never again a flood to destroy the earth | 9:11, 9:15 | verified |
| 67 | 11 | Berakhot 59a blessing "Blessed… Who remembers the covenant and is faithful to His covenant and fulfills His word." | Berakhot 59a, William Davidson, verbatim (Rav Pappa's combined form) | verified |
| 68 | 11 note | Two versions combined per Rav Pappa; Shulchan Arukh OC 229:1 gives it so and says not to gaze at the rainbow further | Berakhot 59a; SA OC 229:1 "ואסור להסתכל בו ביותר" | verified |
| 69 | 12 | Noah, the tiller of the soil, the first to plant a vineyard; drinks, lies uncovered in his tent | 9:20–21 JPS | verified |
| 70 | 12 | Ham sees and tells his brothers; Shem and Japheth walk backward with a cloth and cover him without looking | 9:22–23 | verified |
| 71 | 12 note | Noah curses Ham's son Canaan, blesses Shem and Japheth | 9:18, 9:24–27 | verified |
| 72 | 12 note | Noah lives 350 years after the Flood, 950 in all | 9:28–29 | verified |

## The nations and Babel

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 73 | 13 | Chapter 10 lists the families of Shem, Ham and Japheth, "by their lands—each with its language" | 10:1, 10:5 JPS | verified |
| 74 | 13 | Nimrod "a mighty hunter"; mainstays of his kingdom Babylon, Erech, Accad, Calneh, in the land of Shinar | 10:8–10 JPS | fixed ("begins with" → JPS "mainstays") |
| 75 | 13 note | Erech is Uruk, ruins at Warka, southern Iraq; one of the first great cities of Sumer | Wikipedia *Uruk* ("known today as Warka… Iraq"; "leading role in the early urbanization of Sumer"); places.json a5db1a6 | verified (no date given) |
| 76 | 13 note | Asshur builds Nineveh and Calah (10:11), north of Shinar | 10:11; places.json pins (Nineveh 36.36° N, Calah 36.10° N vs Babel 32.54° N) | verified |
| 77 | 13 note | JPS: "and Calneh" may better be read "all of them being" | JPS footnote on 10:10 | verified |
| 78 | 14 | Everyone had one language; a valley in the land of Shinar; they make bricks | 11:1–3 | verified |
| 79 | 14 | Quote "Come, let us build us a city, and a tower with its top in the sky, to make a name for ourselves" | 11:4 JPS verbatim | verified |
| 80 | 14 | God confounds their speech and scatters them over the whole earth; the city called Babel | 11:7–9 | verified |
| 81 | 14 note | JPS: Babel is "Babylon"; name plays on balal "confound" | JPS footnotes on 11:9 | verified |
| 82 | 14 note | Pin = ruins of Babylon, Iraq; tower site unknown | places.json ab8fdbc (32.54, 44.42); Torah gives no site | verified |
| 83 | 14 note | Brick for stone, bitumen for mortar | 11:3 | verified |
| 84 | 14 note | Some scholars think Etemenanki (Babylon's temple tower), of brick and bitumen, may have influenced the story | Wikipedia *Etemenanki* ("Some scholars have proposed… may have influenced"; "bitumen and bricks") | verified (scholarship, labelled) |
| 85 | 14 note | Rashi on 11:1: the one language was the Holy Tongue | Rashi on 11:1 "לשון הקודש" | verified |

## Toward Abram

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 86 | 15 | From Shem the line runs ten generations to Abram, son of Terah | 11:10–26: Shem, Arpachshad, Shelah, Eber, Peleg, Reu, Serug, Nahor, Terah, Abram = 10 | verified |
| 87 | 15 | Abram's brother Haran dies in his native land, Ur of the Chaldeans | 11:27–28 | verified |
| 88 | 15 | Abram marries Sarai, who has no child | 11:29–30 | verified |
| 89 | 15 note | Pirkei Avot 5:2: "ten generations from Noah to Abraham," to show God's patience | Avot 5:2 | verified |
| 90 | 15 note | Ur usually identified with the Sumerian city of Ur in southern Iraq (the pin); some Jewish traditions place it near Urfa, Turkey | Wikipedia *Ur of the Chaldees* (Woolley; "According to some Jewish traditions…" Şanlıurfa); places.json a6cf75c | verified |
| 91 | 15 note | Rashi on 11:28 (Bereshit Rabbah 38:13): Abram smashed his father's idols, Nimrod threw him into a furnace, he was saved; the name Ur (fire) alludes to it | Rashi on 11:28; Bereshit Rabbah 38:13 | verified |
| 92 | 16 | Terah takes Abram, Sarai and grandson Lot from Ur of the Chaldeans for Canaan; they come as far as Haran and settle; Terah dies in Haran | 11:31–32 | verified |
| 93 | 16 | Next week, in Lech Lecha, God tells Abram to go | 12:1 (parsha Lech Lecha begins 12:1) | verified |
| 94 | 16 note | Haran usually identified with Harran, southern Turkey | places.json a6d9af3 "Harran"; same wording as the Lech Lecha story | verified |
| 95 | 16 note | Town חָרָן vs brother הָרָן | Hebrew 11:31 (עַד־חָרָן) and 11:27–31 (הָרָן) | verified |

## Questions and finale

| # | Card | Claim | Source | Verdict |
|---|---|---|---|---|
| 96 | Kids | Dove sent out three times; second time brought an olive leaf, telling Noah the waters had decreased | 8:8–12 | verified |
| 97 | Everyone / talk | Babel builders: "to make a name for ourselves"; Noah "a righteous man" | 11:4, 6:9 | verified |
| 98 | Deeper | R. Yochanan: righteous only relative to his generation; Reish Lakish: righteous even then, all the more in other generations (Sanhedrin 108a) | Sanhedrin 108a, verbatim sense | verified |
| 99 | talk note | No route; pins are usual identifications; Noah's home and the tower's site unknown | as above | verified |

## Not verified / left out on purpose

- The date bar (traditional c. 2105 BCE, "Not datable by historians") is automatic; the story adds no dates.
- Left out for lack of a fetched source: metric conversion of the cubit, the "seventy nations" count, the Zohar's critique of Noah, and Yoma 10a's Calneh = Nippur.
- The parsha-fact-check workflow (`.claude/workflows/parsha-fact-check.js`) was not run from this session (no workflow tool available to the authoring agent); it should be run before merge, per `docs/plans/story-authoring.md` step 5.
