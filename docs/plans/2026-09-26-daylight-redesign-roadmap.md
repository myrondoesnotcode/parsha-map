# Daylight redesign — roadmap

Status: prototype built on branch `redesign/daylight` (local, not pushed). Agreed direction: **Daylight** (sand / ultramarine / apricot, Bricolage Grotesque + Suez One), map-first, weekly Parsha Stories. Design canvas: https://claude.ai/artifact/Mdo1vGyta9wqJTDrhRTDDG

## What the product is for

One loop, every week: **Shabbat is coming → open the app → watch this week's story on the map → bring a question to the table → share it.** Every item below is judged by whether it strengthens that loop, whether it works for *all 54* parshiot (not just the dramatic ones), and whether it costs money per parsha.

## The hard constraint the prototype hid

The story prototype is map-driven, and Lech Lecha has 40 places. Place counts per parsha in `places.json`:

- **0–2 places (17 parshiot):** all of Leviticus except Behar, plus Terumah, Tetzaveh, Vayakhel, Pekudei, Nasso, Korach, Shoftim, Vayeilech
- **3 places (3 more):** Ki Tisa, Behar, Bamidbar
- **Rich journeys:** Masei 73, Devarim 47, Lech Lecha 40, Chukat 39, Matot 30, Vayishlach 27, Noach 26, Balak 23, Beshalach 22

So roughly a third of the year has no journey to fly. **The story format must work without a route** or those weeks will feel broken. This is the most important design task in the whole plan.

---

## Phase 0 — Foundations (must happen before anything ships)

| # | Item | Why it's needed | Size |
|---|---|---|---|
| 0.1 | **One codebase** for web + iOS (merge `ios` branch divergences into `website`; iOS builds from the same `dist/`, divergences behind a `isNativeApp` check) | Every change below would otherwise be done twice | M |
| 0.2 | **Story format v2** — card types that don't need a route: `scene` (Doré image, Ken Burns), `quote` (Hebrew + English verse), `list` (laws/offerings in N items), `diagram` (Mishkan, camp layout), `timeline`, `quiz`, `talk`. Map cards become one type among several | Makes all 54 possible (see constraint above) | M |
| 0.3 | **Story authoring pipeline** — stories as JSON files per parsha, drafted from `parshaList.json` + Sefaria text, every claim checked against the verse, reviewed by Myron before merge | Content is the real bottleneck, not code | M |
| 0.4 | **Restore weekly auto-select** (prototype hard-codes Lech Lecha) incl. holiday weeks and combined parshiot (which story plays on a double week) | The "this Shabbat" promise is the loop | S |
| 0.5 | **Native basics** — bundle fonts locally, add `@capacitor/haptics`, code-split the >500 kB chunk, respect Reduce Motion, VoiceOver labels on map markers, cache tiles for offline | App Store quality bar | M |
| 0.6 | **Marker grouping** — overlapping stops collapse into a "3 stops" bubble that splits on zoom | Visible bug in the prototype (Shechem/Bethel/Hebron) | S |
| 0.7 | **Desktop decision** — ship Daylight to phones (app + mobile web) first; keep the classic 3-column layout on desktop until a Daylight desktop layout exists | Can't put a phone-width column on parshamap.com desktop | S |
| 0.8 | **Measure it** — Umami events: story opened, card reached, completed, shared, quiz answered | Know whether the wow is working | S |

## Phase 1 — Wow that scales to every week (build once, all 54 benefit, no per-parsha cost)

| # | Item | Notes | Size |
|---|---|---|---|
| 1.1 | **3D terrain** | DEM source already loaded; story camera already pitches. Mountains, Jordan valley, Sinai become physical. Night-sky card tilts up from real terrain | S |
| 1.2 | **Globe opening** | App opens on the globe and dives into the Near East. Doubles as the launch animation (replaces "branded splash") | S |
| 1.3 | **Traveller on the route** | Caravan glyph moves along the line with a dust trail; crowd dots for the Exodus | M |
| 1.4 | **Doré cover with Ken Burns** | Every parsha already has `doreImageUrl` (public domain). Full-bleed story cover + scene cards | S |
| 1.5 | **Map quiz card** | "Tap where Abram went during the famine" — map checks, celebrates. Falls back to multiple-choice on place-less weeks | M |
| 1.6 | **Sound** | Ambient beds per setting (desert, water, city, Sinai) + soft UI ticks, mute toggle, off by default on the web | M |
| 1.7 | **Share as image** | Render the Table Talk / quote card to a PNG for WhatsApp instead of plain text | S |
| 1.8 | **Weekly push** "This week's story is ready" | OneSignal + the existing `weekly-parsha-notify.yml` workflow | S |
| 1.9 | **Streak + Library path** | Shabbat streak on Today; Library becomes a 54-stop path that fills as stories are finished | M |
| 1.10 | **Hebrew word of the week + one commentary card** | Part of the story template (optional card types), links to Sefaria | S (code) |

## Phase 2 — Selective set pieces and growth (after all 54 stories exist)

| # | Item | Notes |
|---|---|---|
| 2.1 | **Signature map moments for ~6 parshiot only**: Noach (flood rises over terrain), Lech Lecha (caravan), Beshalach (sea parts), Va'era/Bo (Nile red, darkness, locusts), Yitro (Sinai smoke + haptic rumble), Masei (all 42 stops replay) | Expensive per parsha — do only the ones that earn it |
| 2.2 | **Weekly "Parsha in 60 seconds" vertical video**, rendered from the story JSON + map flyover (HyperFrames) | Marketing engine; depends on stories existing |
| 2.3 | **Night study + Erev Shabbat themes** | Dark map after sunset, golden theme Friday afternoon |
| 2.4 | **Home-screen widget** (this week's art + countdown) | Native Swift work |
| 2.5 | **Place-type marker icons** (city, well, mountain, altar) | Polish |
| 2.6 | **Custom haptic patterns** synced to set pieces | Pairs with 2.1 |

## Not doing (and why)

| Idea | Reason |
|---|---|
| AI video per parsha (Seedance) | Per-clip cost × 54, and code-rendered map video (2.2) covers the need. Revisit only for a single App Store trailer |
| AR tabletop map | High effort, novelty use; doesn't serve the weekly loop |
| Lock-screen Live Activity countdown | Niche; the widget (2.4) covers it |
| Studio-voice narration | Cost; iOS on-device speech can be a later accessibility option |
| Depth-parallax engravings, stroke-drawn Hebrew | High effort per asset for a small gain over Ken Burns + letter reveal |
| Animated empire borders | Nice, doesn't serve the loop |

## Order of work

1. Phase 0.1 → 0.2 → 0.4 → 0.6 (structure first)
2. Phase 1.1, 1.2, 1.4 (cheap, big visual jump) — then show Myron in the simulator
3. Phase 0.3 authoring pipeline, then write stories book by book (Genesis first); Myron reviews each book
4. Phase 1.5–1.10 alongside story writing
5. Phase 0.5, 0.7, 0.8 → App Store build (see `/Users/myronshneider/.claude/playbooks/ios-app-store-submission.md`) + deploy mobile web
6. Phase 2

---

## Status and backlog — 2026-09-27

Checked against the code on `redesign/daylight` (latest commit `53be97d`) and the Sep 26–27 sessions. Update this section at the end of every session.

### Next session — do these first

1. **Get Myron's answers to the four open decisions below.** Two of them concern things that are wrong on the live site.
2. **Fix the live site** (`main` → parshamap.com): image captions, the Hobah pin, and hide the Empires layer if Myron agrees. These are wrong in production today, so they come before prototype work.
3. ~~**0.4 Real "this week" on launch.**~~ Done on `redesign/real-this-week`; merge into `redesign/daylight` after review. Review links now need `?today=YYYY-MM-DD` or `?parsha=lech-lecha` to open on a story week.
4. **Show Myron the prototype in the iOS simulator** (roadmap step 2).
5. **Run the fact-check workflow once more on the final wording** (`.claude/workflows/parsha-fact-check.js`). The last round of fixes was only checked by hand.
6. Then move on to **0.3 story-writing pipeline** and Genesis stories.

### Open decisions (waiting on Myron)

| Decision | Context |
|---|---|
| **Empires & borders layer: hide it or redraw it?** | The fact-check found the shapes are badly wrong. It is also live on parshamap.com |
| **Map date bar: also show the traditional Jewish date?** | The ranges are also inconsistent (Vayikra overlaps Deuteronomy) |
| **"World around it": dated events per parsha, with the era list as the fallback?** | Today every parsha in an era shows the same list |
| **Home: confirm map-first** (built) over the big-blue-card home | Never explicitly picked |

### Wrong on the live site now (fix on `main`)

- **Image captions:** the wrong artist is credited on nearly all 54 parshiot, and some images are photos (clouds, a wheat field). Task chip exists.
- **Hobah** is pinned on Damascus; Genesis 14:15 says north of it. The error is in the generated `places.json`. Task chip exists.
- **No audit yet of the live summaries and facts for all 54.** Only Lech Lecha and Vayikra have been fact-checked.

### Roadmap items: where they stand

| Item | State |
|---|---|
| 0.1 One codebase | **Done** (`3bf19d1`). Both CLAUDE.md files still describe the two-repo setup; retiring `/parsha/ios` is Myron's call |
| 0.2 Card types for weeks with few places | Partly built. `cover, chapter, stars, letter, name, quote, scale, plan, offerings, guess, talk` exist; no template for all 54 yet |
| 0.3 Story-writing pipeline | Not started. Stories are hand-written in `src/redesign/stories.ts` (Lech Lecha and Vayikra only) |
| 0.4 Real "this week" | **Done** (branch `redesign/real-this-week`). Opens on this Shabbat's parsha from Hebcal; rolls over at local midnight Sat→Sun; double weeks name both halves and open on the half with a story, else the first; holiday Shabbatot name the holiday and its reading and point to the next parsha; Hebcal window moves with the clock (last year → 3 years ahead). Rules in `src/redesign/weekRules.ts`, checked by `npm run check:week` |
| 0.5 App Store polish | Haptics done; Reduce Motion partial. Fonts not bundled, no offline tiles, no VoiceOver labels, no chunk splitting |
| 0.6 Pin grouping | **Done** 2026-09-27. Overlapping stops merge into one pin ("2·3·5·6") and separate again when you zoom in |
| 0.7 Desktop decision | **Blocks shipping** |
| 0.8 Analytics (Umami) | Not started |
| 1.1 3D terrain | **Done** (whole map, true height) |
| 1.2 Globe opening | Not started |
| 1.3 Traveller | Partly built: a dot rides the route; no caravan glyph or dust trail |
| 1.4 Art covers with a slow zoom | The zoom is built (`CoverArt` in `StoryPlayer.tsx`), but neither story has art. Vayikra's was pulled for being the wrong artwork; Lech Lecha needs one |
| 1.5 Map quiz | Partly built: one guess card per story, answered from a list with the options as pins |
| 1.6 Sound | Not started (deferred) |
| 1.7 Share as an image | Not started; sharing is plain text |
| 1.8 Weekly push | Not started |
| 1.9 Streak + Library path | Not started |
| 1.10 Hebrew word + commentary card | Not started |
| Phase 2 | Deferred on purpose |

**Also built, not numbered above:** Shabbat strip (Hebcal dates and candle times, holiday weeks), Watch → Read → Question → Share path with "Ready for Shabbat", act titles, finale with Kids / Everyone / Deeper questions, Sources sheet behind every verse reference, reading-time pacing, resume, swipe down to close, and the fact-check workflow (text, visual, tradition and history checkers).

### Discussed but not yet on the roadmap

**Fact-check system (proposed, not built):**
- a `sources` field and claim tags on every card
- a lint script that checks without AI
- a "Report an error" link on each card
- a rabbi or educator signing off each book before it ships

**Story design ideas (never answered):**
- split the Tabernacle plan card into two beats: the camp, then a close-up
- an interactive plan: tap the altar or the Holy of Holies
- reveal the offerings list one row per tap
- store the card layout choice per card type in the story data
- draw plans as real map layers, so zoom can come back during stories
- short linking lines between cards ("After the altar at Shechem…")
- template the other 16 thin weeks: the Mishkan build-up for Terumah–Pekudei, the camp for Bamidbar and Nasso

**Today and polish:**
- a Today screen that changes through the week, and an opening title card
- physical transitions between screens

**Design pass follow-ups (from the 2026-09-27 audit):**
- story cover: the top half is empty map; add a slow camera move or a faint route preview
- "Abram becomes Abraham" card: the large Hebrew letters overlap pin 4 and the route line

### Cut on purpose

Narration (Myron: "i dont think we need narration"), per-parsha AI video, AR tabletop map, Live Activity, animated empire borders, depth-parallax engravings, stroke-drawn Hebrew. The two unchosen design directions (Illuminated, Expedition) and the three-tab layout were also not taken.
