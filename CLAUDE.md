# Parsha Map — Project Guide for Claude

> Interactive map of every place mentioned in the Torah, organized by parsha. Live at **parshamap.com**.

## Two repos, one product

| Repo | Path | Branch | Ships to |
|---|---|---|---|
| **Website** (this repo) | `/Users/myrons/Claude Projects/Parsha` | `main` | parshamap.com (GitHub Pages) |
| **iOS app** | `/Users/myrons/parsha-map` | `claude/app-store-submission-35YJ5` | App Store (Capacitor wrap) |

The iOS repo is a **separate clone with diverged source** — not a submodule. When a fix affects both, apply it to each repo individually. Intentional iOS divergences live there (no React Query devtools, no AppStoreBanner, iOS safe-area padding in the mobile header).

## Stack

React 19 · TypeScript · Vite 6 · Tailwind CSS 3 · Zustand 5 · React Query 5 · React-Leaflet 5 · Radix UI · i18next

**Pinned versions matter:**
- `react-leaflet@5.x` (v4 requires React 18)
- Leaflet CSS must be imported BEFORE `@tailwind` directives in `index.css` (PostCSS `@import must precede` rule)
- `tsconfig.node.json` needs `"composite": true` and must NOT have `"noEmit": true`

## Data sources

| Source | Used for | Notes |
|---|---|---|
| `src/data/parshaList.json` | The 54 parshas — name, hebrewName, book, seferiaUrl range, approximateDateBCE, summary, richContent | Hand-curated. Source of truth for parsha matching. |
| `src/data/places.json` | All map markers | **Generated** — not committed. Regenerate with `npm run geodata`. |
| OpenBible Geocoding | Seed data for `places.json` | `https://raw.githubusercontent.com/openbibleinfo/Bible-Geocoding-Data/master/data/ancient.jsonl`. JSONL; OSIS refs like `Gen.12.4`. 1342 entries → 1256 usable → 273 linked to parshas. |
| Sefaria API | Current week's parsha + Hebrew/English text + commentary | `https://www.sefaria.org/api/calendars?diaspora=0|1` and `/api/texts/{ref}`. The `date` param is **ignored** — always returns the upcoming Shabbat from server-side "now". |
| CARTO Voyager tiles | Map basemap | Free, no API key: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png` |

## Architecture

**State** — single Zustand store (`src/store/useAppStore.ts`):
- `selectedParshaId` + `currentYearBCE` drive the map and timeline
- `setSelectedParsha()` automatically updates `currentYearBCE` from `parshaList.json`
- `isIsrael` (persisted to `localStorage["parsha_region"]`) drives Israel vs. Diaspora Torah reading
- `language`, `showTradeRoutes`, `showTerritories`, `showArchaeologicalSites`, `placeTypeFilter`, etc.

**Layout**
- **Desktop (md+):** 3 fixed columns — Sidebar (288px, resizable) · Map (flex) · ContextPanel (320px, resizable)
- **Mobile:** Tab-based — Map | Text | History | Library, with compact timeline strip

**URL state**
- `?parsha=<id>` syncs to/from `selectedParshaId` (sharable links, browser back/forward)
- `useAutoSelectParsha` runs once per session to set the current week's parsha — gated by `parshaInitialized` so it doesn't override user navigation. Resets to `false` on region toggle.

## Israel/Diaspora toggle

Globe icon in the header. Israel and Diaspora readings diverge for ~6 weeks each year after Shavuot and Pesach until they re-sync at Mattot-Masei (sometimes earlier). The toggle hits the Sefaria calendar with `diaspora=0` or `diaspora=1`. State is persisted to `localStorage["parsha_region"]`.

## Parsha-matching logic (⚠️ historically bug-prone)

`src/hooks/useAutoSelectParsha.ts` reconciles Sefaria's response (`displayValue.en`, `url`) with our local `parshaList.json`. Sefaria's names don't match ours character-for-character (`Sh'lach` vs. `Shelach`, `Beha'alotcha` vs. `Beha'alotecha`, `Chayei Sara` vs. `Chayei Sarah`), and combined parshas (`Nitzavim-Vayeilech`, `Matot-Masei`) have no single name entry.

**Matching cascade — in this order:**
1. **Exact normalized name** (`/[^a-z]/g` stripped) — most weeks
2. **Sefaria URL start-position** (book + start chapter + start verse equal a parsha's start) — canonical; uniquely identifies the first parsha of any combined pair even when chapters overlap (Ki Tavo ends Deut 29:8, Nitzavim starts 29:9)
3. **URL containment** (verse-aware) — for holiday Torah readings whose range sits inside a regular parsha (e.g. Pesach chol haMoed → Ki Tisa)
4. **Loose substring** (last resort, both sides ≥5 chars) — prevents short names like `Tzav` matching inside `Nitzavim-Vayeilech`

**Do not reorder these.** The previous version had loose substring before URL matching, which caused `Sh'lach` → `Vayishlach` (substring of `vayishlach`) and Israel users saw the wrong parsha for ~6 weeks/year. Verified against every Shabbat through 2027-12-31 in both regions (141 Shabbats, 0 failures).

## Key files

```
src/
  App.tsx                      — Layout, mobile/desktop switch, header, URL sync
  store/useAppStore.ts         — Zustand store
  hooks/
    useAutoSelectParsha.ts     — Sefaria → parshaList matching (see above)
    useAutoSelectParshaByYear.ts — Timeline slider → parsha
    useCurrentParsha.ts        — React Query wrapper for fetchCurrentParsha
  api/sefaria.ts               — Sefaria API client
  data/parshaList.json         — Source of truth for parshas (curated)
  data/places.json             — GENERATED, not committed
  components/
    map/ParshaMap.tsx          — React-Leaflet map
    layout/Sidebar.tsx         — Parsha selector
    layout/ContextPanel.tsx    — History / Power detail panel
    parsha/ParshaHeader.tsx    — Parsha summary card
    timeline/TimelineSlider.tsx
scripts/
  build-geodata.ts             — Regenerates places.json from OpenBible
public/CNAME                   — parshamap.com
.github/workflows/
  deploy.yml                   — Build + deploy to GitHub Pages on push to main
  weekly-parsha-notify.yml     — Weekly OneSignal push (sends to iOS app subscribers)
```

## Common commands

```bash
npm run dev          # localhost:5173 (or 5174)
npm run build        # → dist/
npm run preview      # serve dist/ locally
npm run geodata      # regenerate src/data/places.json from OpenBible
npx tsc --noEmit     # typecheck
```

## Deployment

Push to `main` → GitHub Action builds and deploys to GitHub Pages → parshamap.com (CNAME in `public/`). Deploy is ~30s; site update propagates immediately.

## iOS app — in brief

Separate Capacitor wrapper at `/Users/myrons/parsha-map` on branch `claude/app-store-submission-35YJ5`. To ship a parsha/data/UI fix to iOS users, you must also apply it to that repo and submit a new App Store build. See that repo's `CLAUDE.md` for the build/submit flow.

## Historical plans

See `docs/plans/` for design docs from previous redesigns:
- `2026-03-13-desktop-three-column-layout*.md` — current desktop layout
- `2026-03-22-scholarly-modernism-redesign*.md` — current typography/color system
- `2026-04-25-iphone-fixes.md`, `2026-04-27-iphone-app-fixes.md` — split between web and Capacitor app (the App Store banner stayed on web; everything else moved to the iOS repo)
