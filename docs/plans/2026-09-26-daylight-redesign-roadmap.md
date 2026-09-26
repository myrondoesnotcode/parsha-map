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
