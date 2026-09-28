# Vayeshev: fixes that need a change outside the story file

From the independent fact-check, pass 3 (wf_e3eb356b-2b9). Each item was re-checked against the source named. None of these files was edited on `review/vayeshev`.

**Why the Read-tab items are here and not applied.** `review/vayeshev` is 9 commits behind `redesign/daylight`. Daylight already rewrote the Vayeshev record in `src/data/parshaList.json` (commit 42f4f1c, Read tab pass 2), the patriarchs band in `scripts/buildParshaDates.mjs` (c554522) and the Vayeshev cover brief (b93fdfd). Pass 3 checked that newer text. Editing the older copy here would conflict with those lines (or undo them on merge). Apply the changes below on `redesign/daylight`, or merge daylight into this branch first and apply them here.

## 1. `parshaList.json` vayeshev.summary: Judah and Tamar is in the wrong place

Genesis 38 (Judah and Tamar) comes before 39 (Potiphar's house, prison). Rashi on 39:1: "It (Scripture) now reverts to the original subject". The daylight summary puts ch. 38 after the imprisonment.

Replace (the pass-2 text from commit 42f4f1c):

> In Egypt, Joseph serves in Potiphar's house but is falsely accused and imprisoned. The narrative then turns to Judah and Tamar. In prison, Joseph correctly interprets the dreams of Pharaoh's cupbearer and baker.

with:

> The narrative then turns to Judah and Tamar. In Egypt, Joseph serves in Potiphar's house but is falsely accused and imprisoned; in prison, he correctly interprets the dreams of Pharaoh's cupbearer and baker.

(The first two sentences stay. "After his dreams they hate him even more" is supported by 37:8 JPS: "they hated him even more for his talk about his dreams.")

## 2. `parshaList.json` vayeshev.richContent.narrativeSummary: "who does not know her" (R25)

"Know" in biblical English means sexual relations (38:26 JPS: "he was not intimate with her again", Hebrew לְדַעְתָּהּ), so "becomes pregnant by Judah, who does not know her" reads as self-contradictory. 38:16 JPS: "he did not know that she was his daughter-in-law".

Replace `who does not know her` with `who does not recognize her`.

## 3. `parshaList.json` vayeshev.richContent.historicalContext: end of the Middle Kingdom (R74)

Wikipedia, "Middle Kingdom of Egypt": it lasted "from approximately 2040 to 1782 or 1700 BC (depending on the definition)"; "Some scholars also include the Thirteenth Dynasty … wholly into this period, in which case the Middle Kingdom would end around 1650 BC". Wikipedia, "Second Intermediate Period of Egypt": "There is no universal agreement in Egyptology about how to define the period." A flat "in the 18th century BCE" takes one definition.

Replace `Egypt's Middle Kingdom gave way in the 18th century BCE to the Second Intermediate Period (to c. 1550 BCE)` with `Egypt's Middle Kingdom gave way, in the 18th or 17th century BCE (Egyptologists draw the line differently), to the Second Intermediate Period (to c. 1550 BCE)`.

## 4. Date bar: the shared "patriarchs" label on the Joseph parshiot (R97)

`scripts/buildParshaDates.mjs` `patriarchs.label` is shared by every Genesis parsha from Lech Lecha on. Its sources date "the patriarchal age" as a whole (McCarter/Hendel: Middle Bronze Age texts "dating to about 2000–1550 B.C.E."; Rendsburg on the Middle Bronze Age dating, c. 2000–c. 1550). Shown on Vayeshev, the label reads as a date for Joseph's sale. Proposed (either one):

- Label: `Date unknown · the patriarchal stories are often placed c. 2000–1550 BCE, or later`; or
- give Vayeshev–Vayechi their own band, only if a source is found that dates the Joseph story itself (none was fetched in this pass).

Not re-read in this pass: the Rendsburg and McCarter/Hendel PDFs (the quotes above are the script's own source titles and the checker's quotations).

## 5. `parshaList.json` vayeshev.approximateDateBCE `{1750, 1550}`

Unhedged and unsourced, and it differs from the date bar's 2000–1550 band. The checker says the legacy (`?ui=classic`) ParshaHeader, ParshaSelector and `utils/parshaUtils.ts` read it; I did not confirm what they display. Proposal: hedge it where it is shown ("date unknown; often placed …") or align it with `parshaDates.json`.

## 6. `places.json` af82614 (Adullam) description

The description is "Khirbet esh Sheikh Madhkur" only. Wikipedia, "Adullam": Madhkur "is thought by modern historical geographers to be the 'upper Adullam'"; Kh. ʿId el-Minya, directly below it, "is the site recognised as Adullam proper". Proposed `DESCRIBED` override in `scripts/processGeodata.ts`: `Khirbet esh-Sheikh Madhkur ("upper Adullam"), above Kh. ʿId el-Minya, identified as Adullam itself; the identification is inconclusive.` The story no longer names Madhkur on its label (see the claim table, pass 3).
