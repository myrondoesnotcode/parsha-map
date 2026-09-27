# Exodus–Deuteronomy data fact-check and World around it (Lanes 2–3)

Branch `lane/data-factcheck`, sessions of 2026-09-27 and 2026-09-28. Done.

## How it was run

1. **Report-only check, one agent per book** (briefs: `brief-<Book>.md`). Each agent checked the Read-tab fields in `parshaList.json`, the image captions (against Wikimedia Commons metadata), every pin tagged to the book in `places.json`, and the date bar. Numbers was split across helper agents (T1–T3 text, P1–P2 pins). Raw findings are in `findings-*.jsonl`.
2. **Independent second verification.** A fresh agent re-fetched every source (Sefaria in Hebrew and English, Commons, Wikipedia, published scholarship) and accepted, modified or rejected each finding. It also caught errors the first pass missed. Text: `verify-text-brief.md`, output in `dec-<Book>.jsonl`. Pins: all four books in one pass (`verify-pins-brief.md`), merged into `pins-decisions.ts` / `.md`.
3. **Applied by exact match.** `apply.mjs` replaces a string only if it occurs exactly once. `check-dec.mjs` is its dry run. I read every modified decision and every edited paragraph as a whole, spot-checked sources, and fixed or cut the leftover claims no checker flagged (`dec-*-own.jsonl`).
4. **World around it.** One draft per book (`world-brief-<Book>.md`, output in `world-<Book>.json` plus `.notes.md` with the supporting sentences). Every event was checked for its date, its window and its wording, and the chronology was kept consistent across books.

## Result

| | Exodus | Leviticus | Numbers | Deuteronomy |
|---|---|---|---|---|
| Read-tab + caption fixes applied | 74 + 2 own | 65 | 91 + 4 own | 88 + 4 own |
| Findings rejected by the verifier | 1 | 0 | 0 | 0 |
| New errors the verifier found | 4 | 2 | 0 | 4 |
| World around it events | 34 (11 parshiot) | 27 (9; Vayikra already had 4) | 30 (10) | 34 (11) |

- **Pins:** 97 findings, 84 places changed. 38 were unpinned: conjectural wilderness stations, stations that shared one point though the text lists them separately, and the Pi-hahiroth, Migdol and Baal-zephon group. 6 were moved to the traditional or usual identification at low confidence. Disputed sites are now labelled as disputed, and verse tags were corrected. No Genesis pin moved or changed tags. `processGeodata.ts` gained two override tables, `RATED` (confidence) and `TYPED`, plus an optional `confidence` on `MOVED`.
- **Date bar:** Balak–Masei now span AM 2487–2488 (c. 1274–1273 BCE). Chukat cites Seder Olam 9. The Korach note cites Seder Olam 8.
- **Vayikra:** the Merneptah Stele is now the "earliest certain" mention of Israel, since an older reading on the Berlin pedestal relief is debated.
- **Chronology used in worldEvents.json:**
  - Egypt: the low chronology (Ramesses II 1279–1213).
  - Hittites: the short chronology. Mursili II 1321–1295, Muwatalli II 1295–1272, Hattusili III 1267–1237, Tudhaliya IV 1237–1209 (Singer, *Hittite Prayers*).

## Left for Myron (not text fixes)

- **Images.** Only the captions were corrected; no image was swapped.
  - Replace: the Metzora file is missing on Commons (the page shows a broken image). The Nitzavim, Kedoshim and Behar images are photos (clouds, a wheat field, a shofar).
  - Wrong scene: Shemini (Tissot's "Moses and Joshua in the Tabernacle"). Shoftim (Rembrandt's tablets, an Ekev scene). Vayakhel (Hoet's raising of the Tabernacle, which is in Pekudei). Bamidbar (the Leningrad Codex inverted nun, Numbers 10:35–36, which is in Behaalotecha). Shemot (Ribera's portrait of Moses, not the burning bush).
  - Duplicate: Bechukotai uses Vayikra's image.
  - Check suitability: Pinchas (van Winghe) is filed on Commons under "Topless women in art".
  - Check the licence: the Aleppo Codex photo (V'Zot HaBerachah) is marked "(C) Ben Zvi Institute".
  - These images show only in the classic UI (`ParshaHeader`, `ParshaLibrary`); Daylight doesn't render them.
- **`approximateDateBCE`** in `parshaList.json` is still the old unsourced ranges (Deuteronomy says 1210–1180). Only the classic UI and `getParshaForYear` read it.
- **The pin-selection rule.** `processGeodata.ts` picks the identification with the highest `vote_average`, and a lone identification defaults to 500 ("medium"). The four books above are fixed place by place. Changing the rule itself would move pins in Genesis too, so it is your decision.
- **A Genesis gap noticed in passing:** Genesis 24:10 names Aram-naharaim, but OpenBible doesn't tag it, so that place is not linked to Chayei Sarah.
