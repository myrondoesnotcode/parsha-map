# Numbers fact-check (PARTIAL: captions + date bar done; text and pins still running)

## Captions (all 10 wrong)
| parsha | current | corrected | note |
|---|---|---|---|
| bamidbar | The Census of Israel — Schnorr von Carolsfeld, 1860 | Inverted nun in the Leningrad Codex, Numbers 10:35–36 | manuscript photo; the verse is in Behaalotecha: move it there or replace |
| nasso | The Nazirite Vow — Schnorr, 1860 | Birkat Kohanim at the Western Wall, Passover — photograph, 2004 | photo; subject fits 6:22-27 |
| behaalotecha | Aaron Lighting the Menorah — Doré, 1866 | Blowing the Trumpet at the Feast of the New Moon — illustrators of the 1890 Holman Bible, 1890 | fits 10:10 |
| shelach | The Spies with the Grapes of Canaan — Doré, 1866 | The Grapes of Canaan — James Tissot, c. 1896–1902 | |
| korach | Korah Swallowed by the Earth — Doré, 1866 | The Punishment of Korah — Sandro Botticelli | Commons has no date; Wikipedia says 1480–1482 |
| chukat | The Brazen Serpent — Doré, 1866 | Moses Striking the Rock — Nicolas Poussin, 1633–1635 | wrong scene in the caption; the painting could show Exod 17 or Num 20 |
| balak | Balaam and the Angel — Doré, 1866 | Balaam and the Angel — Gustav Jäger, 1836 | |
| pinchas | Pinchas Stays the Plague — Schnorr, 1860 | Phinehas Slaying Zimri and Kozbi — Jeremias van Winghe | Commons files it under "Topless women in art": check it suits a family app |
| matot | The Tribes Settle the Land — Schnorr, 1860 | Hills of Gilead — photograph, 2009 | landscape photo |
| masei | The Israelites Cross the Jordan River — Doré, 1866 | Encampment of Israelites, Mount Sinai — after J. M. W. Turner, 1836 | the Jordan crossing isn't in Masei; the print fits 33:15 |

## Date bar
Verified: bamidbar, nasso, behaalotecha, shelach (years and conversions correct; the Exodus in 2448 = 1313 BCE matches Chabad).
- NUM-11 korach: the note says there is no traditional date, but Seder Olam 8 places the rebellion right after the spies. Reword the note.
- NUM-12 chukat: the 40th year for Miriam's death comes from Seder Olam 9, which isn't cited. Add SOR(9).
- NUM-13 to NUM-16 balak, pinchas, matot, masei: AM 2487 alone is too precise. The stay on the plains of Moab runs past Tishrei into AM 2488 (the script itself dates Deuteronomy 1:3 to 2488). Use a range: AM 2487–2488, c. 1274–1273 BCE.

## Still running
- Text checks on the Read-tab fields. Output files: findings-Numbers-T1.jsonl (bamidbar, nasso, behaalotecha), -T2 (shelach, korach, chukat), -T3 (balak, pinchas, matot, masei).
- Map-pin checks on 138 places. Output files: findings-Numbers-P1.jsonl (places 0–68) and -P2 (places 69–137). The index is in num_places.txt.
These files are not yet merged into findings-Numbers.jsonl. Renumber their entries starting at NUM-17.
