You are drafting "World around it" entries for Parsha Map (a Torah map app for families), book: {{BOOK}} (parshiot: {{IDS}}). Zero tolerance for mistakes: every date, name and sentence is a claim that will be re-verified against the sources you cite.

DO NOT EDIT ANY REPO FILE. Read from /Users/myronshneider/parsha/wt-data. Write your draft only to `{{OUT}}`.

## Read first
- `src/data/worldEvents.json`: the two existing entries (`lech-lecha`, `vayikra`) are the model for format, tone, length and sourcing. Match them exactly in shape: `{ windowStartBCE, windowEndBCE, note, events: [{ yearBCE, endBCE?, approx, description, significance, sources: [{title, url}] }] }`. Source titles quote or paraphrase the specific fact they support, in parentheses, like the existing ones.
- `src/data/parshaDates.json` (`parshiot.<id>`): each parsha's traditional year (Seder Olam) and the shared hedged scholarly range ("exodus": c. 1300–1200 BCE).
- `src/redesign/Screens.tsx` around "Around this time": how it renders (eyebrow `Around this time · c. <windowStart>–<windowEnd> BCE`, then `note`, then events newest-first).
- `src/data/timeline.json` (the era fallback) and `src/data/parshaList.json` (each parsha's `historicalContext`), so you don't contradict or merely repeat them.

## Rules
- Each parsha gets 3–4 events. Every event must fall inside that parsha's window, and the window must cover both the traditional date and (part of) the scholarly range, as Vayikra's does (c. 1321–1185). Keep windows tight and honest; say in `note` what the window spans and that nobody can date the parsha's events. Model the note on Vayikra's.
- Prefer events that connect honestly to the parsha's content (a law collection for a law parsha, a portable shrine for the Tabernacle, a record of runaway slaves for the Exodus, etc.). The `significance` line may point out a resemblance, but must never claim the Torah refers to the event, never claim it proves or disproves the Torah, and must hedge contested parallels (name who argues it, or say "some scholars compare"). If no honest connection exists, a plain "what the world looked like" event is fine.
- Vary events between parshiot of the same book; reuse an event only when it is clearly the best fit, and never more than twice. Don't reuse Vayikra's four events unless essential.
- Only well-established facts from sources you actually fetched (WebFetch/WebSearch): Wikipedia pages (check the claim is in the article, ideally with its own citation), Britannica, museum and university pages, published scholarship. Dates: say which chronology if it matters (Egyptian dates follow the conventional low chronology, e.g. Ramesses II r. 1279–1213). Use `approx: true` for any date not known to the year. Quote the key words in the source title, as the existing entries do.
- Plain, concrete English; short sentences; no hype. Description ≤ ~30 words, significance ≤ ~35 words.
- Avoid anachronism traps: e.g. the Deir Alla Balaam inscription is c. 800 BCE and cannot be "around" a 13th-century window; Papyrus Ipuwer's date is disputed; Arad/Ai/Jericho archaeology is contested.

## Output
Write `{{OUT}}` as a JSON object keyed by parsha id, ready to merge into worldEvents.json. After it, write `{{OUT}}.notes.md` listing, for every event, the exact sentence(s) you found in each source supporting the date and the description (with URL), so a reviewer can re-verify quickly. Final message: short summary (parshiot, event count, anything you were unsure of).
