# Design Doc: Scholarly Modernism Redesign

**Date:** 2026-03-22
**Status:** Approved
**Scope:** Full visual redesign + Parsha Library screen + Commentary tab + editorial context panel treatment

---

## Overview

Apply the "Scholarly Modernism / Digital Archivist" design system (designed in Google AI Studio) to the existing React/Vite app. Zero functionality regressions. All existing hooks, state, APIs, and layout structure are preserved. We add two net-new features (Parsha Library view, Commentary tab) justified by the new screen designs and existing/new data sources.

**Creative north star:** The app should feel like a living scholarly document — a bridge between ancient parchment and contemporary precision. Not a Silicon Valley utility.

---

## 1. Token Layer

### `tailwind.config.js`
Replace the minimal current config with the full Scholarly Modernism token set:

**Colors** (full palette from DESIGN.md):
```
surface: #fcf9f0
surface-bright: #fcf9f0
surface-dim: #dddad1
surface-container-lowest: #ffffff
surface-container-low: #f6f3ea
surface-container: #f1eee5
surface-container-high: #ebe8df
surface-container-highest: #e5e2da
surface-variant: #e5e2da
surface-tint: #934b19

on-surface: #1c1c17
on-surface-variant: #54433a
on-background: #1c1c17
background: #fcf9f0
inverse-surface: #31312b
inverse-on-surface: #f4f1e8

primary: #6c2f00
primary-container: #8b4513
primary-fixed: #ffdbc9
primary-fixed-dim: #ffb68c
on-primary: #ffffff
on-primary-container: #ffc29f
on-primary-fixed: #321200
on-primary-fixed-variant: #753401
inverse-primary: #ffb68c

secondary: #50652a
secondary-container: #cfe99f
secondary-fixed: #d2eca2
secondary-fixed-dim: #b6d088
on-secondary: #ffffff
on-secondary-container: #546a2e
on-secondary-fixed: #131f00
on-secondary-fixed-variant: #394d14

tertiary: #00446c
tertiary-container: #155c8c
tertiary-fixed: #cee5ff
tertiary-fixed-dim: #96ccff
on-tertiary: #ffffff
on-tertiary-container: #a7d3ff
on-tertiary-fixed: #001d32
on-tertiary-fixed-variant: #004a75

outline: #877369
outline-variant: #dac2b6

error: #ba1a1a
error-container: #ffdad6
on-error: #ffffff
on-error-container: #93000a

surface-tint: #934b19
```

**Font families:**
```
font-headline: ['Noto Serif', 'serif']
font-body: ['Newsreader', 'serif']
font-label: ['Inter', 'sans-serif']   // already default
```

**Border radius override:**
```
DEFAULT: '0.125rem'   // near-square — "cut vellum" aesthetic
sm: '0.125rem'
lg: '0.25rem'
xl: '0.5rem'          // kept for rare cases
full: '9999px'        // chips only
```

### Google Fonts (`index.html`)
Add to `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet"/>
```
Inter is already loaded via system font stack.

### `index.css`
- `html, body, #root` background: `#fcf9f0`
- `.panel-header`: remove `border-b border-stone-100`; set `bg-surface-container-low`
- `.info-card`: remove `rounded-xl border border-stone-100 shadow-sm`; use `rounded bg-surface-container-lowest` + ambient shadow `0 8px 24px rgba(28,28,23,0.06)`
- `.scrollbar-thin`: thumb color `#dac2b6` (outline-variant)
- `button.place-highlight`: color `#6c2f00` (primary), hover bg `#ffdbc9` (primary-fixed)
- Add `.manuscript-scroll-indicator`: thin left-margin vertical line using `surface-tint` (#934b19) that grows on scroll (bespoke component per design system)

---

## 2. App Shell (`App.tsx`)

### Header (desktop + mobile)
- Background: `bg-stone-900` → `bg-surface-container-low` (parchment)
- No `border-b` — tonal step from header (`surface-container-low`) to panel content provides separation
- Logo: re-color for light background
  - Map-pin SVG fill: `#F59E0B` → `#6c2f00` (primary)
  - "Parsha" text: `text-stone-100` → `text-on-surface`
  - "Map" label: `text-amber-400` → `text-primary`
- Header action buttons: `text-stone-400 hover:text-stone-200 hover:bg-stone-800` → `text-on-surface-variant hover:text-on-surface hover:bg-surface-container`

### Desktop column separators
Remove all explicit `border-r/l border-stone-200` between columns. Use tonal backgrounds instead:
- Left sidebar: `bg-surface-container-low` (#f6f3ea)
- Center (map area): no background (Leaflet fills it)
- Timeline strip: `bg-surface` (#fcf9f0), no `border-t`
- Right context panel: `bg-surface-container` (#f1eee5)

### Mobile tab bar
- Container: `bg-white border-t border-stone-200` → `bg-surface-container-low` no border
- Active tab: `text-amber-600` → `text-primary`
- Active indicator bar: `bg-amber-500` → `bg-primary`
- Inactive: `text-stone-400` → `text-on-surface-variant`

### Mobile tab labels
Update tab labels to match redesign screens:
- 'Map' → 'MAP' (label-md uppercase)
- 'Torah' → 'TEXT'
- 'World' → 'HISTORY'
- Add 4th tab: 'LIBRARY' → opens new Parsha Library view

---

## 3. Sidebar / Parsha Text Panel (`Sidebar.tsx`, `ParshaHeader.tsx`, `ParshaTextViewer.tsx`)

### `Sidebar.tsx`
- Top section background: `from-stone-50 to-white` gradient → flat `bg-surface-container-low`; remove `border-b border-stone-100`
- Search input: drop `border border-stone-200 rounded-xl focus:ring-amber-400`; apply single bottom-line style — `border-0 border-b border-outline/30 rounded-none bg-transparent focus:border-tertiary focus:outline-none`

### `ParshaHeader.tsx`
- Background: `from-amber-50 to-white` gradient → `bg-surface-container-low`; remove `border-b border-stone-100`
- Parsha name: add `font-headline` (Noto Serif), `text-on-surface`
- Book label: `font-label uppercase tracking-widest text-xs text-on-surface-variant`
- Hebrew name: keep `font-hebrew`
- Metadata row (portion number, dates): `font-label text-xs uppercase tracking-wide text-on-surface-variant`
- "This week's portion" badge: `text-amber-600` → `text-primary font-label uppercase tracking-wide`
- Summary text: add `font-body` (Newsreader) `text-sm leading-relaxed`
- Commentary link: `text-amber-600 hover:text-amber-700` → `text-primary hover:text-primary-container`
- Doré image: add `mix-blend-multiply` to integrate with parchment surface

### `ParshaTextViewer.tsx`
- Verse body text: add `font-body` (Newsreader) for English text
- Hebrew verse text: keep `font-hebrew`
- Verse reference labels: `font-label uppercase tracking-wide text-xs text-on-surface-variant`
- Verse quote/highlight blocks: `bg-amber-50 border-l-2 border-amber-400` → `bg-surface-container border-l-2 border-primary`

---

## 4. Commentary Tab (new feature)

Add a **Commentary** tab to the parsha text panel. Placed as a tab row between `ParshaHeader` and the text content area.

**Tabs:** `SACRED TEXT` | `COMMENTARY`
(Drop "Print Focus" — not useful)

**`useCommentaryText.ts`** already exists in the codebase. Verify it hits Sefaria's commentary endpoint. If it only fetches one commentator, expand to support: Rashi, Ramban, Ibn Ezra (all available via Sefaria's `/api/texts/{ref}?commentary=1` or individual commentator endpoints).

**Commentary tab UI:**
- Commentator name: `font-headline text-base text-on-surface` (Noto Serif)
- Commentary body: `font-body text-sm leading-relaxed text-on-surface` (Newsreader)
- Commentator switcher chips: `bg-secondary-container text-on-secondary-container rounded-full text-xs font-label uppercase tracking-wide`
- Source citation: `text-tertiary font-label text-xs` (slate blue for scholarly asides per design system)

**Tab styling:**
- Active tab: `text-primary font-label uppercase tracking-widest text-xs border-b-2 border-primary`
- Inactive: `text-on-surface-variant font-label uppercase tracking-widest text-xs`
- No tab border container — tonal background provides separation

---

## 5. Context Panel (`ContextPanel.tsx` + all context card components)

### `ContextPanel.tsx`
- Panel header: remove `border-b border-stone-100 from-stone-50 to-white` → `bg-surface-container`
- "Historical Context" label: add `font-label uppercase tracking-widest text-xs`
- Year badge: `bg-amber-50 border border-amber-100 text-amber-600 rounded-full` → `bg-secondary-container text-on-secondary-container rounded-full font-label text-xs uppercase tracking-wide`

### All context cards (`EraCard`, `WorldContextCard`, `PrimarySourcesCard`, `ArtifactsCard`, `MaterialCultureCard`, `HistoricalNote`)
- Card wrapper: `bg-white rounded-xl border border-stone-100 shadow-sm` → use `.info-card` (which becomes `bg-surface-container-lowest rounded` + ambient shadow)
- Card title/header text: add `font-headline` (Noto Serif) for section headlines
- Body text: add `font-body` (Newsreader) for descriptive content
- Metadata labels (dates, era names, source types): `font-label uppercase tracking-wide text-xs text-on-surface-variant`
- All `border-t border-stone-100` internal dividers → removed; use `mt-4` spacing instead
- `amber-*` accent colors → `primary` throughout
- Tags/chips: `bg-stone-100 text-stone-600 rounded` → `bg-secondary-container text-on-secondary-container rounded-full`
- "Scholarly aside" quote blocks (new): for any pullquote-style content, use `bg-surface-container border-l-2 border-primary font-body italic text-sm`

### `HistoricalEventsTicker.tsx`
- Event items: `amber` accents → `primary`
- Event labels: `font-label uppercase tracking-wide text-xs`

---

## 6. Place Detail Panel (`PlaceDetailPanel.tsx`)

### Desktop (slide-in from right — keep existing behavior)
- Panel background: `bg-white rounded-tl-2xl rounded-bl-2xl shadow-xl` → `bg-surface rounded-none` + ambient shadow
- Place name: `font-headline` (Noto Serif) `text-base text-on-surface`
- Alternate names / modern name: `font-label text-xs text-on-surface-variant`
- Google Maps block: `bg-blue-50 rounded-lg` → `bg-surface-container rounded`
- Navigation link: `text-blue-700` → `text-tertiary` (slate blue)
- Travel advisory text: `text-stone-500` → `text-on-surface-variant`
- Wikipedia extract: add `font-body` (Newsreader) `text-xs leading-relaxed`
- "Read more on Wikipedia" link: `text-amber-700` → `text-primary`
- Archaeological significance block: `bg-purple-50 rounded-lg` → `bg-surface-container rounded`
- Arch. significance label: `font-label uppercase tracking-wide text-[10px] text-on-surface-variant` (remove purple)
- Further Reading / Watch section headers: `text-stone-400` → `text-on-surface-variant font-label uppercase tracking-wide`
- Paper/video link rows: `bg-stone-50 hover:bg-amber-50` → `bg-surface-container hover:bg-surface-container-high`
- Verse quote block: `bg-amber-50 border-l-2 border-amber-400` → `bg-surface-container border-l-2 border-primary`
- Verse reference chips: `bg-amber-50 text-amber-700` → `bg-secondary-container text-on-secondary-container rounded-full`
- "Also appears in" chips: `bg-stone-100 text-stone-600 hover:bg-amber-100` → `bg-secondary-container text-on-secondary-container hover:bg-surface-container-high rounded-full`
- Close button: `hover:bg-stone-100 text-stone-400 hover:text-stone-700` → `hover:bg-surface-container text-on-surface-variant hover:text-on-surface`

### Mobile (bottom sheet — new behavior)
On mobile (`< md`), the place detail panel renders as a bottom sheet overlaying the map rather than the current behavior of switching to the context tab. This matches the `map_view_2` redesign screen.
- Positioned `fixed bottom-0 left-0 right-0` with `max-h-[60vh] overflow-y-auto`
- `bg-surface rounded-t-lg` (small top radius is acceptable for bottom sheets as a deliberate exception to the no-round-corners rule)
- Drag handle indicator at top
- Same content as desktop panel, condensed
- Closes via tap-outside or swipe-down

---

## 7. Timeline Slider (`TimelineSlider.tsx` + related components)

**Keep the slider — restyle only.** The timeline scrubber's ability to navigate by historical year is a core differentiator and must not be replaced with a parsha carousel.

- Track background: current stone/amber → `bg-surface-container-high`
- Active track fill: `amber` → `bg-primary`
- Slider thumb: `bg-amber-500` → `bg-primary`
- Era labels (`EraLabel.tsx`): `font-label uppercase tracking-wide text-xs text-on-surface-variant`
- Era jump buttons (`EraJumpButtons.tsx`): `bg-amber-*` → `bg-primary text-on-primary` with `rounded` (not `rounded-xl`)
- Year display: `font-label uppercase tracking-wide text-xs`
- Timeline container background: `bg-white border-t border-stone-200` → `bg-surface` no border (tonal step from map)

---

## 8. Parsha Library Screen (new)

New full-screen view, accessible via the 4th mobile tab ("LIBRARY") and a Library icon button in the desktop header.

### Layout
- Full-screen overlay (mobile) or replaces the left sidebar content (desktop)
- Header: "DIGITAL ARCHIVIST INDEX" in `font-label uppercase tracking-widest text-xs text-on-surface-variant`, then "Parsha Library" in `font-headline text-3xl text-on-surface`
- Search bar: same bottom-line style as Sidebar search

### Content
- Grouped by book: `GENESIS / BERESHIT`, `EXODUS / SHEMOT`, etc.
- Book header: `font-label uppercase tracking-widest text-xs text-on-surface-variant`
- Each parsha row:
  - Thumbnail: use existing `doreImageUrl` from `parshaList.json` with `mix-blend-multiply` on `bg-surface-container` background
  - Parsha name: `font-headline text-base text-on-surface`
  - Hebrew name: `font-hebrew text-sm text-on-surface-variant` right-aligned
  - Verse range: `font-label text-xs text-on-surface-variant`
  - No divider lines — `spacing-6` vertical space between items

### Interaction
- Tapping/clicking a parsha: sets `selectedParshaId` in the store (same as `ParshaSelector`) and navigates to Map tab (mobile) or updates sidebar (desktop)
- No new state management required beyond existing `useAppStore`

---

## 9. Map Markers (`PlaceMarker.tsx`, `ArchaeologicalSiteMarker.tsx`)

- Marker accent: `amber/yellow` fills → `#6c2f00` (primary)
- Marker popup: `bg-white` → `bg-surface`
- Highlight state: `amber` ring → `primary` ring
- `YouAreHereMarker.tsx`: keep distinct color (can stay amber/gold as a deliberate exception — it's a navigational element)

---

## 10. Modals (`NewsletterModal.tsx`, `TutorialOverlay.tsx`)

### `NewsletterModal.tsx`
- Modal background: `bg-white rounded-xl` → `bg-surface rounded`
- Title: `font-headline` (Noto Serif)
- Body: `font-body` (Newsreader)
- CTA button: gradient from `primary` to `primary-container` at 45deg, `text-on-primary`, `rounded` (not `rounded-xl`)
- Close button: `text-stone-400 hover:bg-stone-100` → `text-on-surface-variant hover:bg-surface-container`

### `TutorialOverlay.tsx`
- Spotlight ring: `amber` → `primary` (#6c2f00)
- Tooltip panels: `bg-white` → `bg-surface`, `font-body` for body text, `font-label uppercase` for step labels

---

## What Is NOT Changing

- All hooks, stores, API clients, data files
- Component prop interfaces and event handlers
- Three-column desktop layout structure
- Mobile tab routing logic (except adding 4th Library tab)
- Leaflet map tile source and configuration
- All data fetching (Sefaria, Wikipedia, Met Museum)
- Desktop place detail panel slide-in behavior
- Timeline slider functionality
- `ErrorBoundary.tsx` (utility component, no visual surface)

---

## Files to Touch

| File | Change type |
|---|---|
| `tailwind.config.js` | Token system rewrite |
| `index.html` | Add Google Fonts |
| `src/index.css` | Base styles, utility classes |
| `src/App.tsx` | Header, shell, logo, mobile tabs |
| `src/components/layout/Sidebar.tsx` | Colors, search input |
| `src/components/layout/ContextPanel.tsx` | Colors, typography |
| `src/components/parsha/ParshaHeader.tsx` | Typography, colors |
| `src/components/parsha/ParshaTextViewer.tsx` | Typography, colors |
| `src/components/parsha/ParshaSelector.tsx` | Colors |
| `src/components/map/PlaceDetailPanel.tsx` | Colors, typography, mobile bottom sheet |
| `src/components/map/PlaceMarker.tsx` | Marker color |
| `src/components/map/ArchaeologicalSiteMarker.tsx` | Marker color |
| `src/components/map/MapLegend.tsx` | Colors |
| `src/components/timeline/TimelineSlider.tsx` | Colors, typography |
| `src/components/timeline/EraLabel.tsx` | Typography |
| `src/components/timeline/EraJumpButtons.tsx` | Colors |
| `src/components/timeline/TimelineTrack.tsx` | Colors |
| `src/components/context/EraCard.tsx` | Colors, typography |
| `src/components/context/WorldContextCard.tsx` | Colors, typography |
| `src/components/context/PrimarySourcesCard.tsx` | Colors, typography |
| `src/components/context/ArtifactsCard.tsx` | Colors, typography |
| `src/components/context/MaterialCultureCard.tsx` | Colors, typography |
| `src/components/context/HistoricalNote.tsx` | Colors, typography |
| `src/components/context/HistoricalEventsTicker.tsx` | Colors, typography |
| `src/components/context/EraCard.tsx` | Colors, typography |
| `src/components/context/PowerDetailPanel.tsx` | Colors, typography |
| `src/components/NewsletterModal.tsx` | Colors, typography |
| `src/components/TutorialOverlay.tsx` | Colors |
| `src/hooks/useCommentaryText.ts` | Expand for multi-commentator |
| `src/components/parsha/ParshaTextViewer.tsx` | Add Commentary tab |
| `src/components/parsha/ParshaLibrary.tsx` | **New file** |
