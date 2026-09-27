# Lanes 2–3 status (stopped at usage limit, 2026-09-27)

Raw findings from the report-only fact-check agents, one file per book or helper (`findings-*.jsonl`). Each finding must be re-verified on Sefaria before it is applied.

**Applied (commit on `lane/data-factcheck`):**
- Numbers Read-tab text: T1 (Bamidbar, Nasso, Behaalotecha) and T2 (Shelach, Korach, Chukat). Every finding was re-verified; decisions are in `dec-num-t12*.jsonl`. T2-7 was reworded to drop the claims about city walls.
- Numbers date bar (NUM-11 to NUM-16): Korach note; Seder Olam 9 added for Chukat; Balak–Masei now span AM 2487–2488 (c. 1274–1273 BCE).

**Not yet applied:**
- Numbers captions NUM-1 to NUM-10. Re-verified against Commons with `commons.mjs`; all 10 are wrong. Apply the fixed captions. The Pinchas image is tagged "Topless women in art": ask Myron.
- Numbers T3 (Balak–Masei text). Its agent was still finishing Matot and Masei.
- Numbers pins P2 (37 findings). P1 (29 findings) is also done.
- P2-1, a root cause: processGeodata picks pins by vote_average, not OpenBible's rank, and places with a single identification default to "medium". This affects all five books, Genesis included, and needs a decision.
- Exodus (43 findings) and Leviticus (36) were still in progress. Deuteronomy had no findings file yet.
- Lane 3 world events: the Exodus draft was in progress (source pages cached under scratchpad/wk; nothing written). Numbers, Leviticus and Deuteronomy are not started.

Tools: `apply.mjs <decisions.jsonl>` replaces text only when it occurs exactly once in parshaList.json. For a cut, include the leading space in `cur`. `sf.mjs Ref en|he|both [regex]` fetches a Sefaria text; `commons.mjs <Book>` fetches Commons metadata for that book's captions in one batch.
