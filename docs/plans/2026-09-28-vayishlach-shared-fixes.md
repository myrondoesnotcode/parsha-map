# Vayishlach: fixes needed in shared files

Found in the final fact-check pass (workflow wf_1be9a141-f3a). None of these files is edited on `review/vayishlach`; each item gives the exact proposed change.

## 1. Route tag on a line that stops at a traditional site (StoryPlayer.tsx)

The Rachel card and the "sons of Jacob" card use `routeTo: 3.5`, which ends the line exactly on the `via` point `RACHELS_TOMB`, a ring labelled "Rachel's Tomb (traditional site)". `src/redesign/StoryPlayer.tsx` (the `dl-route-tag` block) shows "Route illustrative · the line ends at an illustrative point" for any non-integer `routeTo`, which calls a named traditional site an illustrative point.

Proposed: add an optional `routeNote?: string` to `StoryCard` in `src/redesign/story.ts`, and in StoryPlayer use it before the fallback:

```tsx
{card.kind === 'talk'
  ? 'Route illustrative · pin sites are uncertain'
  : card.routeNote
    ? card.routeNote
    : Number.isInteger(card.routeTo)
      ? 'Route illustrative · lines join the stops in order'
      : 'Route illustrative · the line ends at an illustrative point'}
```

Then give the two Vayishlach cards `routeNote: 'Route illustrative · the line stops at the traditional site of Rachel’s Tomb'`. (Lech Lecha's Negev bend really is an illustrative point, so its tag stays as is.) Source for the site: Wikipedia "Rachel's Tomb", 31.7193 N, 35.2021 E, "located at the northern entrance to … Bethlehem".

## 2. places.json: Genesis 35:21 plotted as "Eder" (processGeodata.ts)

`ab80fa1` "Eder 1" is at 31.6793 N, 35.15464 E, description "Khirbet el Bira", confidence low, for Genesis 35:21. The story says Migdal-eder's site is unknown and doesn't mark it, but the Map tab plots this dot, under a name that is also used for a different town (`a1b30e1` "Eder 2", Joshua 15:21, near Arad).

Proposed (in `scripts/processGeodata.ts`, then `npm run geodata`): rename `ab80fa1` to "Migdal-eder" and unpin it (`latitude`/`longitude` null, like `a17e154` Rehoboth 2), description "Genesis 35:21; site unknown, early sources differ".

## 3. places.json: places defined by Bethel rated above Bethel

`af9a894` Allon-bacuth ("within 1 km of Bethel"), `a30b045` El-bethel ("in Bethel") and `a397042` Luz 1 ("another name for Bethel") are confidence "medium" at Bethel's exact coordinates, while `a64f355` Bethel 1 is "low". A place located only by reference to Bethel can't be surer than Bethel. Allon-bacuth also shows on the Map tab as a located dot, while the story says its site isn't known.

Proposed: set confidence "low" on `af9a894`, `a30b045` and `a397042`; unpin `af9a894` (Allon-bacuth), since Genesis 35:8 places it only "below Bethel".

## 4. timeline.json middle-bronze events[0] (alphabet), on `lane/name-letter-cards`

On `lane/name-letter-cards` (wt-cards) it reads "Earliest known alphabetic writing … (often dated c. 1850 BCE; some scholars date it c. 1550)". Wikipedia "Proto-Sinaitic script" reports four inscribed clay cylinders from Umm el-Marra, Syria, "dating to ca. 2300 BC whose incisions have been hypothesized to be Early Alphabetic Semitic writing". So "earliest known" overstates. (On `review/vayishlach` it already reads "Earliest securely identified alphabetic writing … (dates debated)".)

Proposed description: "Earliest securely identified alphabetic writing, by Canaanite speakers in Egypt and Sinai (often dated c. 1850 BCE; some scholars date it c. 1550; older signs from Umm el-Marra, Syria, c. 2300 BCE, may be alphabetic, which is debated)".

## 5. timeline.json middle-bronze primarySources, "Egyptian Execration Texts"

"These are the earliest Egyptian references to biblical cities." Wikipedia "Execration texts" dates the Berlin and Brussels groups from "the end of the 20th century BCE to midway through the 18th century BCE" and says they contain "possibly the first known mention of Jerusalem"; "earliest" for all biblical cities is stronger than that. Not rendered in Daylight.

Proposed: "Among the earliest Egyptian references to cities later named in the Bible."

## 6. parshaDates patriarchs band: `laterToBCE: 1150` (buildParshaDates.mjs, on `lane/name-letter-cards`)

The fading tail runs to 1150 BCE. None of the band's cited sources gives 1150 as an end point: McCarter/Hendel give the Late Bronze Age as "1550–1200 B.C.E." (where the name Abram is "especially well attested") and Iron Age I as 1200–1000; Rendsburg favours a Late Bronze date. (The only 1150 in McCarter/Hendel is that tribal Israel "existed in the central hills before 1150 B.C.E.", which is not a date for the patriarchs.)

Proposed: `laterToBCE: 1200` (end of the Late Bronze Age, per McCarter/Hendel), or cite a source that names c. 1150.

## 7. Classic UI date for Vayishlach (parshaList.json `approximateDateBCE`, all parshiot)

The Vayishlach record has `approximateDateBCE: { start: 1850, end: 1650 }`, shown unhedged by the classic UI (`?ui=classic`, `components/parsha/ParshaHeader.tsx`). It has no source and differs from parshaDates.json ("Date unknown · often c. 2000–1550 BCE, or later"). All 54 records carry this field and the classic time slider uses it (`utils/parshaUtils.ts`, `store/useAppStore.ts`), so changing one record alone would be inconsistent.

Proposed: in ParshaHeader, show the hedged label from parshaDates.json instead of `approximateDateBCE`, app-wide.
