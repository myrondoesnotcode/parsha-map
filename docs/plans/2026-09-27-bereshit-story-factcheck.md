# Bereshit story: self fact-check

Story: `src/redesign/stories/bereshit.ts` (Genesis 1:1 – 6:8, read Sat Oct 10, 2026). Self-check by the author, 2026-09-27. It does not replace the parsha-fact-check workflow or Myron's review.

**Sources fetched for this check**
- Verses: Sefaria API v3, `Genesis.1` – `Genesis.6`. English: THE JPS TANAKH: Gender-Sensitive Edition. Hebrew: Miqra according to the Masorah.
- Rashi on Genesis 1:1, 2:3, 2:11, 2:13 and 3:9: Sefaria, Rosenbaum–Silbermann (Hebrew and English).
- Bereshit Rabbah 1:10: Sefaria Midrash Rabbah (2022), Hebrew and English.
- Pirkei Avot 5:2: Sefaria (Mishnah Yomit English; Torat Emet Hebrew).
- Siddur Ashkenaz, Shabbat, Shabbat Evening, Kiddush: Sefaria (Metsudah siddur, 1981, Hebrew and English).
- Siddur Edot HaMizrach, Shabbat Evening, Kiddush: Sefaria (Hebrew).
- Wikipedia summaries (REST API) of Shatt al-Arab, Al-Qurna, Tigris and Euphrates.
- Genesis fact-check report of 2026-09-27, Bereshit section. The story repeats none of the claims it flags: no Eden, Cush or Havilah pin, no "Babylonia", Rashi's two comments on 1:1 kept apart, Kiddush worded as the verses being *said*, and no dates.

**Verdicts:** ✓ verified against the named source · ~ judgment or wording, checked for fairness · ✗ found wrong and fixed (the fixed text is shown).

## Cover and framing

| # | Where | Claim | Source | Verdict |
|---|---|---|---|---|
| 1 | cover | Title "Bereshit", tagline "In the beginning.", range Genesis 1:1 – 6:8 | parshaList.json; checker | ✓ |
| 2 | anchor | "the Tigris and Euphrates (2:14)": the one real geography the text names | Genesis 2:14 | ✓ Anchor pin is places.json Tigris (a38ebfd), al-Qurnah. Not drawn; it frames the camera. |
| 3 | card 1 | "No journey this week" | Genesis 1–6 (no travel narrative) | ✓ |
| 4 | card 1 | Bereshit begins with heaven and earth | Genesis 1:1 | ✓ |
| 5 | card 1 | The garden is placed only "in the east" | Genesis 2:8, "planted a garden in Eden, in the east" | ✓ |
| 6 | card 1 | No one knows where the land of Nod was | Genesis 4:16 names it and gives only "east of Eden"; no identification exists | ✓ (not pinned; not in places.json) |
| 7 | card 1 | Two rivers it names still flow today | Genesis 2:14; Wikipedia Tigris, Euphrates | ✓ |
| 8 | card 1 note | 2:14 names Asshur (Assyria); the Tigris flows east of it | Genesis 2:14, "the one that flows east of Asshur" | ✓ |
| 9 | card 1 note | The map is a backdrop and doesn't mark where anything happened | design | ✓ |
| — | card 1 note | (Draft) "The Torah gives no dates for these chapters" | Genesis 5 gives ages, from which Seder Olam computes years | ✗ Removed. The story now says nothing about dates. |

## Creation

| # | Where | Claim | Source | Verdict |
|---|---|---|---|---|
| 10 | card 2 guess | The Torah begins with bet | Genesis 1:1, בְּרֵאשִׁית | ✓ |
| 11 | card 2 reveal | Bereshit Rabbah 1:10 asks why not aleph; one answer is that bet begins the word for blessing, berakhah | Bereshit Rabbah 1:10: "why with a beit? Because it alludes to an expression of blessing [berakha]. And why not with an alef? Because it alludes to … curse" | ✓ |
| 12 | card 2 note | Another answer: bet is closed on three sides and open in front, so one may ask only from creation onward, not what is above, below or before | Bereshit Rabbah 1:10, R. Yonah in the name of R. Levi | ✓ |
| 13 | card 3 | English "When God began to create heaven and earth—" | JPS Gender-Sensitive, Genesis 1:1 (exact) | ✓ |
| 14 | card 3 | Hebrew בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ | Miqra according to the Masorah, 1:1 (cantillation removed) | ✓ |
| 15 | card 3 | Seven Hebrew words | Counted in 1:1 | ✓ |
| 16 | card 3 | Rashi on Genesis 1:1 reads the first word as "at the beginning of God's creating" | Rashi 1:1 (second comment): "at the beginning of God's creating" | ✓ |
| 17 | card 3 | Rashi says the verse doesn't come to teach what was created first | Rashi 1:1: "The text does not intend to point out the order of the acts of Creation — to state that these … were created first" | ✓ |
| 18 | card 3 note | Rashi's commentary opens with another question, from Rabbi Isaac: why begin with creation, not the first commandment given to Israel (Exodus 12:2)? | Rashi 1:1 (first comment) | ✓ (Draft said "opens with a second question", which was misleading: it is the *first* comment; ✗ fixed.) |
| 19 | card 3 note | His answer: the whole earth is God's, to give to whom God pleases | Rashi 1:1: "All the earth belongs to the Holy One … He created it and gave it to whom He pleased" | ✓ |
| 20 | card 4 | Day 1: light, separated from darkness; Day and Night | Genesis 1:3–5 | ✓ |
| 21 | card 4 | Day 2: an expanse between the waters (sky) | Genesis 1:6–8 | ✓ |
| 22 | card 4 | Day 3: dry land and seas; plants and fruit trees | Genesis 1:9–13 | ✓ |
| 23 | card 4 | Day 4: great lights and stars, to rule day and night and mark set times | Genesis 1:14–19 ("signs for the set times"; "to dominate the day and the night") | ✓ (Draft said "seasons", a word JPS doesn't use; ✗ fixed.) |
| 24 | card 4 | Day 5: swarms in the water, birds in the sky | Genesis 1:20–23 | ✓ |
| 25 | card 4 | Day 6: animals and humankind, humankind in the divine image; all "very good" | Genesis 1:24–31 ("created humankind in the divine image"; "found it very good") | ✓ |
| 26 | card 4 | Day 7: God ceases from the work and makes it holy | Genesis 2:2–3 ("ceasing on the seventh day"; "declared it holy") | ✓ |
| 27 | card 4 | Hebrew labels אֶחָד, שֵׁנִי, שְׁלִישִׁי, רְבִיעִי, חֲמִישִׁי, הַשִּׁשִּׁי, הַשְּׁבִיעִי | Genesis 1:5, 8, 13, 19, 23, 31; 2:3 | ✓ |
| 28 | card 4 note | Day one is יוֹם אֶחָד, literally "one day"; JPS says "a first day" | Genesis 1:5 Hebrew and JPS | ✓ |
| 29 | card 4 note | The Torah doesn't name the sun and moon here; it calls them the greater and lesser lights | Genesis 1:14–18 (מְאֹרֹת; no שֶׁמֶשׁ or יָרֵחַ) | ✓ |
| 30 | card 5 | Quote: "God made the two great lights, … the lesser light to dominate the night, and the stars." | JPS Gender-Sensitive, 1:16 (ellipsis marks the omitted clause) | ✓ |
| 31 | card 5 | The fourth day | Genesis 1:19 | ✓ |
| 32 | card 5 note | The night sky is an illustration | design | ✓ |
| 33 | card 6 | Quote: "And God blessed the seventh day and declared it holy" | JPS Gender-Sensitive, 2:3 (exact fragment) | ✓ |
| 34 | card 6 | Hebrew וַיְבָרֶךְ אֱלֹהִים אֶת־יוֹם הַשְּׁבִיעִי וַיְקַדֵּשׁ אֹתוֹ | Genesis 2:3 | ✓ |
| 35 | card 6 | Friday-night Kiddush recites Genesis 2:1–3 | Siddur Ashkenaz (Metsudah) and Siddur Edot HaMizrach, Shabbat evening Kiddush | ✓ Worded as "recites", not as the source of the obligation (the Genesis report's fix). |
| 36 | card 6 note | Said just after the words "the sixth day" from 1:31 | Both siddurim: יוֹם הַשִּׁשִּׁי: וַיְכֻלּוּ… | ✓ |
| 37 | card 6 | The Kiddush blessing calls Shabbat "a commemoration of the work of creation" (זִכָּרוֹן לְמַעֲשֵׂה בְרֵאשִׁית) | Siddur Ashkenaz (Metsudah English, exact); Edot HaMizrach has the same Hebrew | ✓ |

## The garden

| # | Where | Claim | Source | Verdict |
|---|---|---|---|---|
| 38 | card 7 | A river flows out of Eden to water the garden, then branches into four | Genesis 2:10 | ✓ |
| 39 | card 7 | Two of them are the Tigris and the Euphrates | Genesis 2:14 | ✓ |
| 40 | card 7 | They still meet today in southern Iraq | Wikipedia, Shatt al-Arab: "formed at the confluence of the Euphrates and Tigris rivers in the town of al-Qurnah"; Al-Qurna: southern Iraq | ✓ |
| 41 | card 7 | The Torah puts the garden "in the east" and no more; no one knows where it was | Genesis 2:8; Genesis report: "Eden has never been located" | ✓ Stated as not known; nothing is pinned. |
| 42 | card 7 note | Hebrew names חִדֶּקֶל (Hiddekel) and פְרָת (Perat) | Genesis 2:14 Hebrew | ✓ |
| 43 | card 7 note | The Pishon, the Gihon, Havilah and Cush can't be identified with certainty | Genesis report (Eden/Cush/Havilah/Pishon/Gihon rows) | ✓ No pins, and no "Babylonia". |
| 44 | card 7 note | Rashi on Genesis 2:11 says the Pishon is the Nile | Rashi 2:11: "This is the Nile, the River of Egypt" | ✓ |
| 45 | card 7 spot | The pin marks al-Qurnah, where the two rivers join to form the Shatt al-Arab | Wikipedia (as 40). Pin: places.json Tigris [47.4421, 31.0043]; Wikipedia gives al-Qurnah as 31.016, 47.431, about 1.7 km away. | ✓ |
| 46 | card 7 note | Local folklore there says the garden was at al-Qurnah; the Torah doesn't say so, and the pin doesn't mark Eden | Wikipedia, Al-Qurna: "Local folklore holds Qurnah to have been the original site of … the Garden of Eden"; Genesis 2:8–14 | ✓ |
| 47 | card 8 | God settles the first human in the garden to till and tend it | Genesis 2:15 | ✓ ("the Human" in JPS; "first human" follows 2:7) |
| 48 | card 8 | God forbids the fruit of the tree of knowledge of good and bad | Genesis 2:16–17 | ✓ |
| 49 | card 8 | The serpent persuades the woman to eat; she gives some to her husband, and he eats | Genesis 3:1–6, 3:13 ("The serpent duped me") | ✓ |
| 50 | card 8 | They hide, and God calls out, "Where are you?" | Genesis 3:8–9 | ✓ |
| 51 | card 8 | They are sent out of the garden | Genesis 3:23 ("banished them from the garden of Eden") | ✓ |
| 52 | card 8 note | "Good and bad" is JPS's rendering; many translations say "good and evil" | JPS 2:9, 2:17 | ✓ |
| 53 | card 8 note | The Torah doesn't say what kind of fruit it was | Genesis 3:2–6 ("fruit" only) | ✓ |
| 54 | card 8 note | Cherubim and a fiery ever-turning sword guard the way to the tree of life | Genesis 3:24 | ✓ |

## Outside the garden

| # | Where | Claim | Source | Verdict |
|---|---|---|---|---|
| 55 | card 9 | Cain brings an offering from the fruit of the soil; Abel the choicest of the firstlings of his flock | Genesis 4:3–4 | ✓ |
| 56 | card 9 | God pays heed to Abel and his offering, but not to Cain and his | Genesis 4:4–5 | ✓ |
| 57 | card 9 | Cain kills his brother | Genesis 4:8 | ✓ |
| 58 | card 9 | "Where is your brother Abel?" / "I do not know. Am I my brother's keeper?" | JPS 4:9 (exact) | ✓ |
| 59 | card 9 note | God puts a mark on Cain so that no one who meets him will kill him | Genesis 4:15 | ✓ |
| 60 | card 9 note | Cain settles in the land of Nod, east of Eden; its site is unknown, so it isn't pinned | Genesis 4:16 | ✓ |
| 61 | card 10 | Chapter 5 lists ten generations, from Adam to Noah | Genesis 5 (Adam, Seth, Enosh, Kenan, Mahalalel, Jared, Enoch, Methuselah, Lamech, Noah) | ✓ |
| 62 | card 10 | Methuselah lives longest, 969 years | Genesis 5:27; the others in ch. 5: 930, 912, 905, 910, 895, 962, 365, 777; Noah's lifespan isn't given in this parsha | ✓ |
| 63 | card 10 | "Enoch walked with God; then he was no more, for God took him." | JPS 5:24 (exact) | ✓ (Draft said "Of Enoch it says *only*"; 5:22–23 say more, ✗ fixed.) |
| 64 | card 10 note | The ten names | Genesis 5:3–32 | ✓ |
| 65 | card 10 note | Pirkei Avot 5:2 counts "ten generations from Adam to Noah," to show how patient God was | Pirkei Avot 5:2: "to make known what long-suffering is His" | ✓ |
| 66 | card 11 | God sees how great human wickedness has become and regrets having made humankind | Genesis 6:5–6 | ✓ |
| 67 | card 11 | The parsha ends: "But Noah found favor with GOD." | JPS 6:8 (exact); the parsha ends at 6:8 | ✓ |
| 68 | card 11 | His story is next week's parsha, Noach | Noach begins at Genesis 6:9 (parshaList); check:week shows Noach on Oct 17, 2026 | ✓ |
| 69 | card 11 note | "GOD" is how the JPS Gender-Sensitive Edition renders God's four-letter name in this verse | JPS 6:8 vs Hebrew יְהֹוָה | ✓ |

## Finale and questions

| # | Where | Claim | Source | Verdict |
|---|---|---|---|---|
| 70 | talk / Everyone | God asked Cain where his brother was; Cain answered, "Am I my brother's keeper?" | Genesis 4:9 | ✓ |
| 71 | talk note | No route; the one pin marks where the rivers meet, not Eden; the other places can't be located | design; Genesis report | ✓ |
| 72 | Kids | God blessed the seventh day and made it holy | Genesis 2:3 | ✓ |
| 73 | Deeper | Rashi on Genesis 3:9 says God knew where the first human was and asked "Where are you?" to open a conversation | Rashi 3:9: "He knew where he was, but He asked this in order to open up a conversation with him" | ✓ |

## Not claimed, on purpose

- No historical date for creation, Eden or the flood generations (the date bar says "Not datable by historians").
- No pin for Eden, the Pishon, the Gihon, Havilah, Cush or Nod.
- No depiction of God. The only art is the emblem cover and the generic night sky of the `stars` card.
- The Tetragrammaton isn't shown in Hebrew; the Hebrew quotes name God only as אֱלֹהִים.
- No new card kind. `name` and `plan` are not used.

## Left for the workflow and review

- Run the parsha-fact-check workflow (`.claude/workflows/parsha-fact-check.js`) on this file before merge. This table is a self-check.
- **Outside the story:** the Today and Map tabs still draw the places.json dots for Eden 1, Cush 2 and Havilah 1 (on Babylon) and pins for Gihon (Uganda) and Pishon (Karun). The Genesis report flags all of these. Dots are hidden while the story plays, but the Today screen shows them behind the sheet. The fix belongs in `scripts/processGeodata.ts` (`UNPINNED`), not in this story.
