# Vayigash fact-check pass 3: fixes that need shared files

The Vayigash review branch doesn't edit shared files (app code, `timeline.json`, `worldEvents.json`) or data entries that other parshiot share. These findings from pass 3 (wf_eca2fbee-467) need one of those. Each proposal below was checked against the source quoted with it.

## 1. Date bar: the shared "patriarchs" label and band (R64, R65)

**Files:** `scripts/buildParshaDates.mjs` (`SCHOLARLY.patriarchs`, then regenerate `src/data/parshaDates.json`), `src/redesign/MapChrome.tsx` (band style).
**Why shared:** `patriarchs` is one entry used by every parsha from Lech Lecha to Vayechi. Changing it on this branch would change ten other parshiot' date bars from a Vayigash review branch.

**Finding (accepted).** The label reads "Date unknown · often c. 2000–1550 BCE, or later". The present-tense "often" overstates how widely the Middle Bronze Age dating is held today:
- McCarter and Hendel, "The Patriarchal Age" (http://cojs.org/wp-content/uploads/Patriarchal_Age.pdf): "It has often been supposed, especially by those scholars who believe that Abraham, Isaac and Jacob lived in the Middle Bronze Age (about 2000–1550 B.C.E.)…"; "Many of the parallels are no longer regarded as valid."
- Wikipedia, "Abraham" (https://en.wikipedia.org/wiki/Abraham): "By the beginning of the 21st century, archaeologists had stopped trying to recover any context that would make Abraham, Isaac or Jacob credible historical figures."

**Proposed label:**
```js
label: 'Date unknown · once often placed c. 2000–1550 BCE; others later, or not datable',
```
Check that it fits the date bar at 375 px. If it doesn't, `'Date unknown · older view c. 2000–1550 BCE; others later'`.

**Band (R65), optional:** in `MapChrome.tsx`, draw the `band` div at the tail's weight (for example `opacity: 0.2`) so the 2000–1550 stretch doesn't read as the main range. Only needed if the label keeps "often".

## 2. Timeline: "earliest known alphabetic writing" (R80)

**File:** `src/data/timeline.json`, `middle-bronze` era, event `yearBCE: 1850` (line 77). Shown on the Read tab's era card for every middle-bronze parsha.

**Finding (accepted).** "Earliest known" is no longer safe. Wikipedia, "Umm el-Marra" (https://en.wikipedia.org/wiki/Umm_el-Marra): "Incisions on four lightly baked fragmentary clay cylinders dated to c. 2350 BC have been hypothesized to be Early Alphabetic Semitic writing, which would make them the oldest such examples." The same article notes "an intrusive Late Bronze pit dug into that area of the tomb, which the excavators discounted", so the claim is debated.

**Proposed entry:**
```json
{ "yearBCE": 1850, "description": "Earliest widely accepted alphabetic writing, by Canaanite speakers in Egypt and Sinai (often dated c. 1850 BCE; some scholars date it c. 1550). Older marks from Umm el-Marra, Syria (c. 2350 BCE) have been proposed as alphabetic; this is debated", "significance": "Ancestor of the Hebrew, Greek, Latin and Arabic alphabets" },
```

## 3. Read tab: era card vs the traditional date (missed item)

**File:** `src/redesign/Screens.tsx`, the era fallback card (around line 191: "Across the {era.name} · c. {era.startBCE}–{era.endBCE} BCE").

**Finding (accepted).** For Vayigash the era card says "Across the Middle Bronze Age · c. 2000–1550 BCE", and the date bar on the same screen shows the traditional date c. 1523 BCE (AM 2238, `parshaDates.json`), which is outside that era. The card's caveat says "some scholars place them in this era, others later" and says nothing about the traditional date. Vayechi (c. 1506) has the same mismatch.

**Proposed change:** after the existing caveat sentence, when the parsha has a traditional date outside the era, add one sentence (`trad = getParshaDate(parsha.id)?.traditional`):
```tsx
{trad && (trad.yearBCE > era.startBCE || trad.yearBCE < era.endBCE) && (
  <> The traditional Jewish count gives c. {trad.yearBCE} BCE for this parsha’s event, outside this era.</>
)}
```

## 4. Read tab eyebrow "In history" (R41), optional

**File:** `src/redesign/Screens.tsx` line 166.

**Finding (accepted, fixed in data).** Under the "In history" eyebrow, the Vayigash card didn't say that historians doubt the Joseph story. This branch adds a sentence to the Vayigash `historicalContext` (sourced to McCarter/Hendel: "it is unlikely that much of the information found in Genesis 37 and 39–47 is historically factual. The biblical Joseph story has more in common with a historical romance than a work of history."), so no shared change is required. The checker also offered a shared alternative: label the card "The world of the story" for the patriarchal parshiot (for example when `getParshaDate(id)?.scholarly` is `patriarchs`). That's a design call for the coordinator.

## 5. Classic app: `approximateDateBCE` 1700–1550 (missed item)

**Files:** `src/data/parshaList.json` (`approximateDateBCE` on every Genesis parsha from Lech Lecha to Vayechi), shown by `src/components/parsha/ParshaHeader.tsx` and `ParshaSelector.tsx` (classic app only; the redesign's date bar uses `parshaDates.json`).

**Finding (accepted, needs a cross-parsha decision).** No source gives 1700–1550 BCE for Vayigash's events. It follows the Hyksos-period theory, which McCarter/Hendel describe as something "often … supposed" by scholars who date the patriarchs to the Middle Bronze Age ("that Joseph lived during the so-called Hyksos period (c. 1675–1552)"). Miketz and Vayechi have similar values. The redesign doesn't render this field. Options: (a) in the classic header, show the value with the same label as the date bar ("Date unknown · …"); or (b) set `start`/`end` to `null` for all the patriarchal parshiot at once (`parshaUtils.ts` already skips nulls). Changing Vayigash alone would leave it inconsistent with its neighbours, so this branch leaves it.
