# Writing a Parsha Story

Roadmap item 0.3. How to add one parsha's story so that many people (or agents) can write stories at the same time without touching a shared file.

**Accuracy is zero-tolerance.** This is Torah content for families. Every sentence, label, pin, badge and date is a claim. Nothing merges until the checks below pass **and Myron has reviewed the story**.

## Where stories live

```
src/redesign/story.ts               types, helpers (cardSeconds, isStageCard…), MISHKAN_AT. Shared: don't edit to add a story.
src/redesign/stories/index.ts       registry: picks up every stories/<parshaId>.ts via import.meta.glob. Don't edit.
src/redesign/stories/<parshaId>.ts  one story per file, `export default` a ParshaStory.
src/redesign/stories/_template.ts   copy this to start. Files starting with `_` are not registered.
scripts/check-stories.ts            npm run check:stories
```

Adding a story = adding one file. The app, `npm run check:week` and `npm run check:stories` all find it by its file name. The file name must be the parsha's `id` in `src/data/parshaList.json` (e.g. `chayei-sarah.ts`).

**Cover art is automatic.** The cover card shows the parsha's papercut emblem from `src/redesign/art/`, chosen by `parshaId` (`hasEmblem` in `EmblemArt.tsx`). All 54 exist. Don't set `image`.

Stories stay TypeScript, not JSON: the types catch a wrong field while you type, constants (`const SHECHEM: LngLat = …`) keep a place's point in one spot, and comments can say where a number comes from.

## The file

Start from `src/redesign/stories/_template.ts`. The parts:

| Field | What it is |
|---|---|
| header comment | Line 1 is exactly `// <Name> — <range>`, e.g. `// Bereshit — Genesis 1:1 – 6:8`, then the line telling the next editor to run the fact-check workflow. The checker prints the exact line it expects. |
| `parshaId` | The id from `parshaList.json`; must equal the file name. |
| `tagline` | Two to four words. Shown under the title on the cover and in the Today sheet. |
| `sources` | Every source the cards cite: verse ranges first (`'Leviticus 1–5, 7:8'`), then named works with where they comment (`'Rashi on Exodus 26:32, 27:18'`). Every card `ref` must be covered by it. |
| `route` | Numbered journey stops in travel order (`name`, `at`, `place`, optional `via` and `hedge`). Empty for a week that stays put. |
| `anchor` | For a week that stays put: where the map holds (`name` shows on the cover, e.g. "in the wilderness of Sinai"). |
| `cards` | Cover first, talk card last, the story in between. |
| `questions` | Exactly three, in order: `Kids`, `Everyone`, `Deeper`. By convention the talk card's title is the `Everyone` question. |

**Places.** Every route stop and the anchor need `place`, an id from `src/data/places.json`, and `at` must sit within 10 km of that place's pin. Find ids with:

```bash
node -e 'const p=require("./src/data/places.json");for(const x of p.filter(x=>x.parshas?.includes("lech-lecha")))console.log(x.id,x.name,x.longitude,x.latitude)'
```

Note `at` is `[longitude, latitude]`; places.json stores latitude first. A place with no pin (`latitude: null`, site unknown) can't be a numbered stop or anchor; mention it in a note or show it as a hedged `spot`. Spots and pinned guess options may carry `place` too; a spot's pin may differ from the gazetteer's on purpose, and then its note must say so (Lech Lecha's Beer-lahai-roi does). Uncertain sites carry their hedge on screen: `hedge` on a stop, "(site unknown)" / "(usual site: …)" in a spot's name.

**Camera.** `center` `[lng, lat]`, `zoom` 0–22, `pitch` 0–85, `bearing`. `routeTo` is how far the route line is drawn (an index along `route`, fractions allowed; 0 when there is no route). `stop` spotlights a numbered stop (1-based).

**Pacing.** Cards advance on their own, paced to reading time (`cardSeconds`: about 190 words a minute, 6–24 s). Keep a body to two or three sentences; long caveats go in `note`, which sits behind the verse reference (the Sources sheet).

## Card kinds

| Kind | Needs | Shows | Use it for |
|---|---|---|---|
| `cover` | title, body, ref | Emblem art, Hebrew name, title, tagline, range (+ anchor) | Always first, once. Title, body and ref must be the parsha's display name, the tagline and its range; the checker gives the exact values. |
| `chapter` | title, body, ref | A card over the map, pointing at the camera's subject | The workhorse: one event at one place. With a route, set `stop`/`routeTo`; add a `spot` for an extra place. |
| `stars` | title, body, ref; optional `sky` | A night sky over the map; the title is set as a quotation. `sky: 'dawn'` warms the lower sky and leaves a few stars high up | A night scene the verses describe (Lech Lecha 15:5); `dawn` for daybreak (Vayishlach 32:27, "dawn is breaking"). |
| `quote` | title, hebrew, body, ref | The Hebrew verse large on the stage, the English as a quotation | A key verse. `title` is the English (quote the translation you cite), `hebrew` the Hebrew, `body` a line on why it matters. |
| `letter` | title, hebrew, body, ref; optional `letterAt`, `letterSize` | The Hebrew word, then **one letter shrinks (or grows)**, "size illustrative" | Only for a small or large letter the scribal tradition records. `letterAt` picks the letter: 0-based, counted from the start of `hebrew`, vowel marks not counted; default the last letter. `letterSize: 'large'` grows it instead (default `'small'`). |
| `guess` | title, ref, options (2–4, exactly one `correct`) | A question; the story waits for an answer | One per story. With `at` on every option it is a map guess (pins); with none, tokens on the stage (`he` optional). `reveal` quotes the verse that answers it. |
| `offerings` | title, ref, items; optional `numberFrom` | A numbered list (Hebrew term, English, note) | Lists of laws, offerings, gifts, tribes, stages: anything the text itself enumerates. A list split over two cards continues its numbering with `numberFrom` (Vayetze's sons: the second card starts at 7). |
| `scale` | title, body, ref, items (2–3) | A descending staircase, "step heights illustrative" | A graded rule: if you can't afford this, bring that. |
| `plan` | title, body, ref | **The Tabernacle courtyard to scale** at `MISHKAN_AT`, with its own camera | The Tabernacle only (e.g. Terumah–Pekudei, Vayikra). It always draws the same plan. |
| `name` | title, body, ref, `names: { from, to }` | The Hebrew name `from` turning into `to`: letters both spellings share (in order) stay put, the others drop out and the new ones drop in, in apricot | A renaming the verses narrate (Lech Lecha: `{ from: 'אברם', to: 'אברהם' }`; Vayishlach: Jacob → Israel). One word each, letters only, no vowel marks. |
| `talk` | title | The finale: the three questions, share, "Ready for Shabbat" | Always last, once. No ref needed; a `note` becomes "About the map". |

`act` on a card starts a named part of the story ("The journey", "The covenant"); the progress bar leaves a gap there.

## Weeks with few places (the hard constraint)

About a third of the year has 0–3 places in `places.json` (all of Leviticus but Behar, Terumah–Pekudei, Nasso, Korach, Shoftim, Vayeilech; Ki Tisa, Behar and Bamidbar have 3). Those stories must not pretend to be journeys:

- `route: []` and an `anchor` at the one place the text puts the people (the Sinai camp, the steppes of Moab). Say in the first chapter card that there is no journey this week and why (Vayikra: "No journey this week. The people are camped…").
- Carry the story with page cards, which don't need the map: `quote`, `offerings`, `scale`, `guess` without pins, `letter` where the text has one. Vayikra is the model: cover, where we are, a letter, the plan, a list, a scale, a guess, a quote, talk.
- Keep the camera on the anchor; page cards point it at the strip above the card, so the terrain stays as a backdrop.
- Tabernacle weeks can use `plan`. Anything else drawn to scale needs a new card kind first (roadmap 0.2), not a relabelled plan.
- Don't pull in places from other parshiot to fill the map. If a place is shown that `places.json` doesn't link to this parsha, the checker warns, and the card must say why it's there.

## Drafting a story

1. **Read the parsha first.** Its record in `parshaList.json` (range, summary, richContent) and the full text on Sefaria: `https://www.sefaria.org/api/texts/<Book>.<c>.<v>-<c>.<v>` (Hebrew + JPS English). Fetch before you write, not after.
2. **Pick the beats** the verses actually narrate or command, in order, and the shape (journey or stays put). Pick the places from `places.json`.
3. **Write each card from its verses.** Every clause in a body must be traceable to the verses in its `ref`. Paraphrase; when quoting, quote the translation you name.
4. **Name every interpretation.** "Rashi on 1:1 says…", not "commentators say". A tradition is attributed, never stated as plain fact. Add the work to `sources`.
5. **Hedge on screen what the drawing claims:** uncertain sites, illustrative routes, sizes, the location of a plan. Longer caveats go in `note`.
6. **Questions:** Kids (answerable from the story), Everyone (the talk card), Deeper (needs the text or a commentary).
7. **Don't touch shared files.** If the story needs something the cards can't do, write it down for a code change; don't bend a card kind into something it doesn't show.

## Checks before review

Run all of these; each must pass.

1. `npm run check:stories -- <parshaId> --strict` (no AI). New stories should have no warnings; if one must stay, say why in the PR.
2. `npm run build` (type-checks every story and the template).
3. `npm run check:week` (network; confirms the week rules still agree with Hebcal now that the parsha has a story).
4. Look at every card: `npm run dev`, then `?parsha=<id>&card=N&hold=1` for each N (see `.claude/cdp-walk.mjs` and `walk-*.json` for a scripted walk at iPhone size; use the CDP script with the GPU, not `chrome --headless --screenshot`).
5. **Fact-check workflow** `.claude/workflows/parsha-fact-check.js` with `{ parshaId: '<id>', files: ['src/redesign/stories/<id>.ts', 'src/redesign/StoryPlayer.tsx', 'src/redesign/DaylightMap.tsx', 'src/redesign/art/briefs.ts'] }` (`readFiles` defaults to the Read tab and era files). Fix every `wrong`, `misleading` and `unsupported` finding, then **run it again**: new wording is where new mistakes appear.
6. **Myron reviews the story before merge.** Send him the review links, the fact-check result (claims confirmed / flagged) and anything left unverified. Nothing merges without his yes.

## What check:stories checks

Errors (fail the run):
- the file loads and default-exports a story; its name is `<parshaId>.ts`; no two files share a parshaId; no stray non-story files in the folder
- `parshaId` is in `parshaList.json`; the parsha has an emblem (`hasEmblem` + `briefs.ts`)
- the header line `// <Name> — <range>` and the fact-check line
- `tagline`; `sources` present, non-empty and readable
- no unknown fields anywhere (catches typos like `refs`)
- cover first, talk last, one of each; the cover's title, body (= tagline) and ref (= the parsha's range) match the parsha record; cover `routeTo` is 0
- every kind but `talk` has a `ref` with at least one book-chapter-verse reference; every book reference in a `ref` is covered, chapter by chapter, by `sources`, and every named work in a `ref` appears in `sources`
- required fields per kind (body, hebrew with Hebrew letters, items, 2–4 guess options with exactly one correct, pins on all options or none, distinct labels); `options`/`reveal` only on guess cards
- `name` cards have `names: { from, to }`, each one Hebrew word; `letterAt` is a letter of the letter card's `hebrew`, `letterSize` is `small` or `large`; `scale` with 2–3 items
- coordinates are `[lng, lat]` inside the region the stories cover; camera zoom 0–22, pitch 0–85, bearing ±360; `routeTo` within the route; `stop` is a real stop
- route stops and the anchor have a `place` id that exists, is pinned and lies within 10 km of `at` (the stop's name must match the place's name); spot and option `place` ids exist
- exactly three questions: Kids, Everyone, Deeper

Warnings (`--strict` fails on them):
- a place not linked to this parsha in `places.json`
- a book reference (e.g. "Judges 18:29") or named work (Rashi, Ramban, Seder Olam…) in a body, note or reveal that `sources` doesn't carry
- a `plan` card that isn't about the Tabernacle; `hebrew`, `items`, `names`, `letterAt`/`letterSize`, `sky`, `numberFrom` or `image` on a kind that doesn't show them

It does not judge whether anything is true. That is the fact-check workflow's job and Myron's.
