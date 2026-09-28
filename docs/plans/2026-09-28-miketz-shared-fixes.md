# Miketz: proposed fixes to shared files (fact-check pass 3)

These findings from the pass-3 fact-check of Miketz need files the Miketz branch does not own (`src/data/worldEvents.json`, `src/data/places.json`, the date entries of other parshiot, the legacy classic UI). Nothing below has been applied. Each item gives the finding, the evidence and the exact proposed change.

## 1. worldEvents.json: a "World around it" entry for Miketz (findings R83, R84)

**Problem.** Miketz has no entry, so the History tab falls back to the Middle Bronze Age era list: the alphabet (c. 1850), Hammurabi's accession (c. 1792) and the Hyksos (c. 1650). The first two are 250 to 320 years before the dates proposed for Joseph: the Hyksos period (McCarter/Hendel), or the traditional c. 1532 BCE (Chabad timeline: "-1532 2229 Joseph became viceroy of Egypt").

**Proposed entry** (insert after `"lech-lecha"`, same shape as the existing entries):

```json
"miketz": {
  "windowStartBCE": 1650,
  "windowEndBCE": 1532,
  "note": "No one can date Joseph. Scholars who place the patriarchs in the Middle Bronze Age have often put Joseph in the Hyksos period (c. 1675–1550 BCE); many others read the story as a literary work written much later. Traditional Jewish chronology puts Joseph before Pharaoh c. 1532 BCE. These events show the world of that time; the Torah names none of them.",
  "events": [
    {
      "yearBCE": 1650,
      "endBCE": 1550,
      "approx": true,
      "description": "The Hyksos, rulers of Levantine origin, found Egypt's 15th Dynasty and rule from Avaris, in the eastern Nile Delta.",
      "significance": "Scholars who put Joseph in this period argue that an Asiatic king would have welcomed him, and that the Hyksos capital lay in the eastern Delta, generally identified with the land of Goshen (Genesis 45:10). The Torah does not name the Pharaoh.",
      "sources": [
        { "title": "Wikipedia, \"Fifteenth Dynasty of Egypt\" (\"The 15th Dynasty dates approximately from 1650 to 1550 BC\")", "url": "https://en.wikipedia.org/wiki/Fifteenth_Dynasty_of_Egypt" },
        { "title": "Wikipedia, \"Hyksos\" (\"Material finds at Tell El-Dab'a indicate that the Hyksos originated in the Levant\"; \"Their capital city was Avaris at a fork on the now-dry Pelusiac branch of the Nile\")", "url": "https://en.wikipedia.org/wiki/Hyksos" },
        { "title": "P. K. McCarter Jr. and R. S. Hendel, \"The Patriarchal Age\" (Joseph often placed in the Hyksos period, c. 1675–1552; \"since Joseph was himself an Asiatic, he would have been most likely to find a favorable reception from an Asiatic king of Egypt\"; the Hyksos capital was in the eastern Delta, \"generally agreed to have been the site of the biblical 'land of Goshen'\")", "url": "http://cojs.org/wp-content/uploads/Patriarchal_Age.pdf" }
      ]
    },
    {
      "yearBCE": 1595,
      "approx": true,
      "description": "The Hittite king Mursili I marches some 2,000 km from Anatolia and sacks Babylon.",
      "significance": "The raid is thought to have ended the Amorite dynasty of Hammurabi and let the Kassites take power in Babylon. The date follows the middle chronology.",
      "sources": [
        { "title": "Wikipedia, \"Mursili I\" (\"an unprecedented march of 2,000 km southeast into the heart of Mesopotamia, where around 1595 BC he sacked the city of Babylon\"; \"It is thought, however, that the raid on Babylon brought an end to the Amorite dynasty of Hammurabi and allowed the Kassites to take power\"; dates \"as per the middle chronology\")", "url": "https://en.wikipedia.org/wiki/Mursili_I" }
      ]
    },
    {
      "yearBCE": 1550,
      "approx": true,
      "description": "Ahmose I completes the expulsion of the Hyksos and founds Egypt's 18th Dynasty, the start of the New Kingdom.",
      "significance": "The traditional date for Joseph before Pharaoh, c. 1532 BCE, falls early in the New Kingdom. The Torah does not name the Pharaoh.",
      "sources": [
        { "title": "Wikipedia, \"Ahmose I\" (\"founder of the Eighteenth Dynasty\"; \"Ahmose completed the conquest and expulsion of the Hyksos\"; reign \"usually dated to the mid-16th century BC\")", "url": "https://en.wikipedia.org/wiki/Ahmose_I" },
        { "title": "Wikipedia, \"New Kingdom of Egypt\" (\"the establishment of the New Kingdom has been placed between 1570 and 1544 BC\")", "url": "https://en.wikipedia.org/wiki/New_Kingdom_of_Egypt" },
        { "title": "Chabad.org, \"Jewish Timeline for Chabad.org\" (PDF): \"-1532 2229 Joseph became viceroy of Egypt\"", "url": "https://w2.chabad.org/media/pdf/1296/gOiK12961145.pdf" }
      ]
    }
  ]
}
```

Note: the Miketz branch now gives Miketz the `joseph` date range (c. 1675–1550 BCE, or later) in `scripts/buildParshaDates.mjs`, so the window above sits inside its own range plus the traditional date, as `_about` asks.

## 2. parshaDates: the Joseph range for Vayeshev, Vayigash and Vayechi (findings R85, R86, R88)

**Problem.** The `patriarchs` entry's sources are about Abraham and the patriarchal age as a whole; the Joseph story is dated separately. The Miketz branch adds a `joseph` scholarly entry to `scripts/buildParshaDates.mjs` (label "Date unknown · often c. 1675–1550 BCE, or later", start 1675, end 1550, laterToBCE 1150; sources McCarter/Hendel, Rendsburg, Wikipedia "Joseph (Genesis)") and switches only `miketz` to it.

**Proposed change.** When the branches merge, keep one `joseph` entry (the Miketz one) and decide whether `vayeshev`, `vayigash` and `vayechi` should use it too. McCarter/Hendel's sentence covers Joseph's life in Egypt, so it fits Vayigash and Vayechi (Genesis 45–50); Vayeshev (Joseph sold at 17) is the same life. The era midpoint (1612) stays in the Middle Bronze Age, so the era card does not change.

## 3. places.json: the Nile gazetteer dot (Map tab, story closed)

**Problem.** `a012705` "Nile" is pinned at 31.4653 N, 30.3667 E, near the Rosetta mouth on the Mediterranean coast. The Miketz story aims its dream cards at the Nile at Cairo (30.0437 N, 31.2296 E); the Map tab shows a "Nile" dot at the sea.

**Proposed change.** Move `a012705` to a point on the river (e.g. 30.0437 N, 31.2296 E) and mark it illustrative ("Nile River (a river; point illustrative)"), or stop drawing rivers as single dots. This affects every parsha linked to the Nile.

## 4. places.json / Map tab: the Canaan region dot

**Problem.** `a581f0c` "Canaan" is pinned at 32.767 N, 35.333 E (Galilee), with no region hedge on the Map tab. The Miketz story pins Canaan at an illustrative hill-country point and says the Galilee point is not meant.

**Proposed change.** On the Map tab, label region dots as regions ("Canaan (region)") with "point illustrative" in the place sheet for `type: "region"`; or move `a581f0c` to a central hill-country point. This affects every parsha linked to Canaan.

## 5. parshaList.json approximateDateBCE / narrativeEra (legacy classic UI)

**Problem.** Miketz carries `approximateDateBCE {1700, 1550}` and `narrativeEra "middle-bronze"`, unsourced. They are read only by the classic UI (`components/parsha/ParshaHeader.tsx`, shown under `?ui=classic` on the web), `ParshaSelector.tsx`, `utils/parshaUtils.ts` and `store/useAppStore.ts` (`currentYearBCE`); the Daylight screens use `parshaDates.json`. The other patriarchal parshiot have the same kind of field.

**Proposed change.** For all parshiot, either derive these fields from `parshaDates.json` or set `approximateDateBCE` to `{ "start": null, "end": null }` so the classic header shows no unhedged range. It's a cross-parsha decision, so the Miketz branch leaves it alone.
