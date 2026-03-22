# Scholarly Modernism Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the "Scholarly Modernism / Digital Archivist" design system to the full app — parchment palette, editorial typography, no-border tonal separation — plus add a new Parsha Library screen.

**Architecture:** Pure visual migration. Token layer first (tailwind.config + fonts + index.css), then structural shell (App.tsx), then panels left-to-right, then map/timeline, then modals, then new Library screen. Every task is independently verifiable by running `npm run dev` and checking visually. No logic, state, or API changes except wiring the Library screen into the tab bar.

**Tech Stack:** React 19, Vite, TypeScript, Tailwind CSS v3, Radix UI, Leaflet, Zustand, TanStack Query. Working directory: `~/Claude Projects/Parsha`.

---

## How to verify each task

No unit test framework is configured. After each task:
1. Run `npm run dev` in `~/Claude Projects/Parsha`
2. Open `http://localhost:5173`
3. Check the specific elements described in the verification step
4. Commit only when the visual result matches

---

## Task 1: Token Layer — tailwind.config.js + Google Fonts

**Files:**
- Modify: `tailwind.config.js`
- Modify: `index.html`

**Step 1: Replace `tailwind.config.js` entirely**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        'surface': '#fcf9f0',
        'surface-bright': '#fcf9f0',
        'surface-dim': '#dddad1',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3ea',
        'surface-container': '#f1eee5',
        'surface-container-high': '#ebe8df',
        'surface-container-highest': '#e5e2da',
        'surface-variant': '#e5e2da',
        'surface-tint': '#934b19',
        // On-surface
        'on-surface': '#1c1c17',
        'on-surface-variant': '#54433a',
        'on-background': '#1c1c17',
        'background': '#fcf9f0',
        'inverse-surface': '#31312b',
        'inverse-on-surface': '#f4f1e8',
        // Primary (Burnt Sienna)
        'primary': '#6c2f00',
        'primary-container': '#8b4513',
        'primary-fixed': '#ffdbc9',
        'primary-fixed-dim': '#ffb68c',
        'on-primary': '#ffffff',
        'on-primary-container': '#ffc29f',
        'on-primary-fixed': '#321200',
        'on-primary-fixed-variant': '#753401',
        'inverse-primary': '#ffb68c',
        // Secondary (Olive Green)
        'secondary': '#50652a',
        'secondary-container': '#cfe99f',
        'secondary-fixed': '#d2eca2',
        'secondary-fixed-dim': '#b6d088',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#546a2e',
        'on-secondary-fixed': '#131f00',
        'on-secondary-fixed-variant': '#394d14',
        // Tertiary (Slate Blue — for scholarly asides, links)
        'tertiary': '#00446c',
        'tertiary-container': '#155c8c',
        'tertiary-fixed': '#cee5ff',
        'tertiary-fixed-dim': '#96ccff',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#a7d3ff',
        'on-tertiary-fixed': '#001d32',
        'on-tertiary-fixed-variant': '#004a75',
        // Outlines
        'outline': '#877369',
        'outline-variant': '#dac2b6',
        // Error
        'error': '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
      fontFamily: {
        'headline': ['"Noto Serif"', 'serif'],
        'body': ['"Newsreader"', 'serif'],
        'label': ['Inter', 'sans-serif'],
        'hebrew': ['"Frank Ruhl Libre"', 'David', 'serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.25rem',
        'xl': '0.5rem',
        '2xl': '0.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'ambient': '0 8px 24px rgba(28, 28, 23, 0.06)',
        'ambient-md': '0 4px 16px rgba(28, 28, 23, 0.08)',
      },
    },
  },
  plugins: [],
}
```

**Step 2: Add Google Fonts to `index.html`**

Inside `<head>`, before the existing title tag, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap" rel="stylesheet">
```

**Step 3: Verify**
Run `npm run dev`. Open browser devtools → Elements. Verify `font-headline` and `font-body` appear in the computed font-family list when applied to a test element. No visual change expected yet (tokens aren't used by components yet).

**Step 4: Commit**
```bash
git add tailwind.config.js index.html
git commit -m "feat: add Scholarly Modernism token system and Google Fonts"
```

---

## Task 2: Token Layer — `src/index.css`

**Files:**
- Modify: `src/index.css`

**Step 1: Replace `src/index.css` entirely**

```css
/* Leaflet map CSS must come before @tailwind directives */
@import 'leaflet/dist/leaflet.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #fcf9f0;
    color: #1c1c17;
  }

  /* Hebrew text */
  .font-hebrew {
    font-family: 'Frank Ruhl Libre', 'David', serif;
  }

  /* Leaflet z-index fixes */
  .leaflet-pane { z-index: 10; }
  .leaflet-top, .leaflet-bottom { z-index: 15; }
}

@layer components {
  /* Place name highlights in Torah text */
  button.place-highlight {
    background: none;
    border: none;
    padding: 0;
    color: #6c2f00;
    font-weight: 500;
    text-decoration: underline;
    text-decoration-style: dotted;
    cursor: pointer;
  }

  button.place-highlight:hover {
    color: #8b4513;
    background-color: #ffdbc9;
    border-radius: 2px;
  }

  /* Scrollbar */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: #dac2b6 transparent;
  }

  .scrollbar-thin::-webkit-scrollbar { width: 4px; }
  .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: #dac2b6;
    border-radius: 2px;
  }

  /* Panel header — no border, uses tonal background instead */
  .panel-header {
    @apply px-4 py-3 bg-surface-container-low shrink-0;
  }

  /* Card style — no border, ambient shadow only */
  .info-card {
    @apply bg-surface-container-lowest rounded overflow-hidden;
    box-shadow: 0 8px 24px rgba(28, 28, 23, 0.06);
  }

  /* Manuscript scroll progress indicator (left-margin vertical line) */
  .manuscript-scroll-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 2px;
    background-color: #934b19;
    transition: height 0.1s linear;
  }
}

/* Tutorial spotlight ring */
@keyframes tutorial-ring-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(108, 47, 0, 0.5), inset 0 0 0 2px rgba(108, 47, 0, 0.5); }
  50%       { box-shadow: 0 0 0 8px rgba(108, 47, 0, 0),   inset 0 0 0 2px rgba(108, 47, 0, 0.8); }
}

.tutorial-ring {
  animation: tutorial-ring-pulse 2s ease-in-out infinite;
  border: 2px solid rgba(108, 47, 0, 0.55);
}
```

**Step 2: Verify**
Run `npm run dev`. The page background should now be parchment (`#fcf9f0`) instead of white. The dark stone-900 header will still be dark (we haven't changed App.tsx yet) — that contrast is expected at this step.

**Step 3: Commit**
```bash
git add src/index.css
git commit -m "feat: update base styles and utility classes for Scholarly Modernism"
```

---

## Task 3: App Shell — Header + Logo

**Files:**
- Modify: `src/App.tsx`

**Step 1: Update `LogoLockup` component** (lines 35–51)

Replace the existing `LogoLockup` function with:

```tsx
function LogoLockup() {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <svg width="16" height="20" viewBox="0 0 20 24" fill="none" aria-hidden="true">
        <path
          d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 14 10 14s10-6.5 10-14C20 4.477 15.523 0 10 0z"
          fill="#6c2f00"
        />
        <circle cx="10" cy="10" r="3.5" fill="#fcf9f0" />
      </svg>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className="font-hebrew font-medium text-on-surface text-lg tracking-wide">Parsha</span>
        <span className="font-label text-primary text-[10px] tracking-widest uppercase">Map</span>
      </span>
    </div>
  )
}
```

**Step 2: Update desktop header** (the `<header>` block inside `hidden md:flex`)

Replace:
```tsx
<header className="shrink-0 z-[1100] h-11 flex items-center gap-1 px-3
  bg-stone-900/95 backdrop-blur-sm border-b border-stone-800/60">
```
With:
```tsx
<header className="shrink-0 z-[1100] h-11 flex items-center gap-1 px-3 bg-surface-container-low">
```

Replace the divider `<div className="w-px h-5 bg-stone-700 mx-2" />` with:
```tsx
<div className="w-px h-5 bg-outline-variant mx-2" />
```

Replace the parsha name pill:
```tsx
<span className="text-xs text-amber-400/80 truncate max-w-[200px]">
```
With:
```tsx
<span className="font-label text-xs text-primary truncate max-w-[200px]">
```

Replace Subscribe button classes:
```tsx
className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-all"
```
With:
```tsx
className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-label font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
```

Replace the second divider:
```tsx
<div className="w-px h-5 bg-stone-700 mx-1" />
```
With:
```tsx
<div className="w-px h-5 bg-outline-variant mx-1" />
```

Replace X/Twitter link classes:
```tsx
className="p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
```
With:
```tsx
className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
```

Replace Help button classes:
```tsx
className="p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
```
With:
```tsx
className="p-1.5 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
```

**Step 3: Update mobile header**

Replace:
```tsx
<header className="shrink-0 h-11 flex items-center justify-between px-4
  bg-stone-900 border-b border-stone-800/60">
```
With:
```tsx
<header className="shrink-0 h-11 flex items-center justify-between px-4 bg-surface-container-low">
```

Replace mobile parsha name span:
```tsx
<span className="text-xs text-amber-400/80 font-medium truncate max-w-[100px]">
```
With:
```tsx
<span className="font-label text-xs text-primary truncate max-w-[100px]">
```

Replace mobile icon button classes (Subscribe, X, Help — all three):
```tsx
className="p-1 rounded-lg text-stone-500 hover:text-stone-300 transition-colors"
```
With:
```tsx
className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
```

**Step 4: Verify**
Run dev server. The header should now be parchment (`#f6f3ea`) with dark-ink text and a burnt sienna logo. No more dark header.

**Step 5: Commit**
```bash
git add src/App.tsx
git commit -m "feat: retheme app header and logo for Scholarly Modernism"
```

---

## Task 4: App Shell — Column Backgrounds + Mobile Tab Bar

**Files:**
- Modify: `src/App.tsx`

**Step 1: Update desktop three-column backgrounds**

Find the three column divs inside `<div className="flex-1 flex min-h-0">`:

Left sidebar — replace:
```tsx
<div className="w-72 h-full shrink-0 border-r border-stone-200 bg-white overflow-y-auto">
```
With:
```tsx
<div className="w-72 h-full shrink-0 bg-surface-container-low overflow-y-auto">
```

Timeline strip — replace:
```tsx
<div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-stone-200/70 px-5 py-2.5 h-[72px]">
```
With:
```tsx
<div className="shrink-0 bg-surface px-5 py-2.5 h-[72px]">
```

Right context panel — replace:
```tsx
<div className="w-80 h-full shrink-0 border-l border-stone-200 bg-white overflow-y-auto">
```
With:
```tsx
<div className="w-80 h-full shrink-0 bg-surface-container overflow-y-auto">
```

**Step 2: Update mobile tab content backgrounds**

Text tab — replace:
```tsx
<div className={`absolute inset-0 bg-white ${mobileTab === 'text' ? '' : 'hidden'}`}>
```
With:
```tsx
<div className={`absolute inset-0 bg-surface-container-low ${mobileTab === 'text' ? '' : 'hidden'}`}>
```

History tab — replace:
```tsx
<div className={`absolute inset-0 bg-white ${mobileTab === 'context' ? '' : 'hidden'}`}>
```
With:
```tsx
<div className={`absolute inset-0 bg-surface-container ${mobileTab === 'context' ? '' : 'hidden'}`}>
```

Mobile timeline strip — replace:
```tsx
<div className="shrink-0 bg-white border-t border-stone-200 px-4 py-2.5">
```
With:
```tsx
<div className="shrink-0 bg-surface px-4 py-2.5">
```

**Step 3: Update mobile tab bar**

Replace the `<nav>` element:
```tsx
<nav className="shrink-0 flex h-16 border-t border-stone-200 bg-white">
```
With:
```tsx
<nav className="shrink-0 flex h-16 bg-surface-container-low">
```

Update the active/inactive tab color logic:
```tsx
className={`flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors ${
  mobileTab === id ? 'text-primary' : 'text-on-surface-variant'
}`}
```

Update the active indicator bar:
```tsx
<span className="absolute top-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
```

Update the label span:
```tsx
<span className={`text-[11px] font-label font-semibold tracking-widest uppercase ${mobileTab === id ? 'text-primary' : 'text-on-surface-variant'}`}>
```

**Step 4: Verify**
Desktop: three columns — left is slightly darker parchment, center has map, right is slightly darker. No border lines between columns. Mobile: tab bar is parchment with burnt sienna active state.

**Step 5: Commit**
```bash
git add src/App.tsx
git commit -m "feat: apply tonal surface hierarchy to columns and mobile tab bar"
```

---

## Task 5: Sidebar — Search Input + ParshaSelector

**Files:**
- Modify: `src/components/layout/Sidebar.tsx`
- Modify: `src/components/parsha/ParshaSelector.tsx`

**Step 1: Update `Sidebar.tsx`**

Replace the top section div:
```tsx
<div className="p-3 border-b border-stone-100 bg-gradient-to-b from-stone-50 to-white shrink-0 space-y-2">
```
With:
```tsx
<div className="p-3 bg-surface-container-low shrink-0 space-y-2">
```

Replace the search input:
```tsx
className="w-full pl-7 pr-3 py-2 text-xs border border-stone-200 rounded-xl bg-white text-stone-700 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
```
With:
```tsx
className="w-full pl-7 pr-3 py-2 text-xs font-label border-0 border-b border-outline/30 rounded-none bg-transparent text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-tertiary transition-colors"
```

**Step 2: Update `ParshaSelector.tsx`**

Replace the Select.Trigger classes:
```tsx
'flex items-center justify-between w-full px-3 py-2 text-sm',
'border border-stone-200 rounded-lg bg-white',
'text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-amber-500',
'transition-colors'
```
With:
```tsx
'flex items-center justify-between w-full px-3 py-2 text-sm font-label',
'border-0 border-b border-outline/30 bg-transparent rounded-none',
'text-on-surface hover:bg-surface-container focus:outline-none focus:border-tertiary',
'transition-colors'
```

Replace Select.Content classes:
```tsx
'z-50 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xl',
```
With:
```tsx
'z-50 overflow-hidden rounded border border-outline-variant bg-surface shadow-ambient-md',
```

Replace Select.Label classes:
```tsx
className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wide"
```
With:
```tsx
className="px-3 py-1.5 font-label text-xs font-semibold text-on-surface-variant uppercase tracking-widest"
```

Replace Select.Item classes:
```tsx
'flex items-center gap-2 px-3 py-1.5 text-sm rounded-md cursor-pointer',
'text-stone-700 select-none outline-none',
'data-[highlighted]:bg-amber-50 data-[highlighted]:text-amber-900',
'data-[state=checked]:font-medium'
```
With:
```tsx
'flex items-center gap-2 px-3 py-1.5 text-sm rounded cursor-pointer',
'text-on-surface select-none outline-none',
'data-[highlighted]:bg-surface-container-low data-[highlighted]:text-primary',
'data-[state=checked]:font-medium'
```

Replace Select.ItemIndicator class:
```tsx
className="text-amber-600"
```
With:
```tsx
className="text-primary"
```

Replace the scroll button classes on both ScrollUpButton and ScrollDownButton:
```tsx
className="flex items-center justify-center py-1 text-stone-400 bg-white"
```
With:
```tsx
className="flex items-center justify-center py-1 text-on-surface-variant bg-surface"
```

**Step 3: Verify**
The sidebar search input should have a single bottom-line style on parchment background. The parsha dropdown should open with parchment background and burnt sienna highlights.

**Step 4: Commit**
```bash
git add src/components/layout/Sidebar.tsx src/components/parsha/ParshaSelector.tsx
git commit -m "feat: restyle sidebar search and parsha selector"
```

---

## Task 6: ParshaHeader

**Files:**
- Modify: `src/components/parsha/ParshaHeader.tsx`

**Step 1: Update `ParshaImage` component** (inner `img` tag)

Add `mix-blend-multiply` to the image:
```tsx
className="w-full object-cover max-h-52 mix-blend-multiply"
```

**Step 2: Update empty state** (the "Select a Parsha to begin" block)

Replace the wrapper div:
```tsx
<div className="p-4 border-b border-stone-100 shrink-0">
```
With:
```tsx
<div className="p-4 bg-surface-container-low shrink-0">
```

Replace:
```tsx
<div className="flex items-center gap-2 text-stone-400 text-sm">
```
With:
```tsx
<div className="flex items-center gap-2 text-on-surface-variant text-sm font-label">
```

Replace "This week:" text:
```tsx
<p className="mt-2 text-xs text-stone-400">
  This week:{' '}
  <span className="font-medium text-amber-700">{currentWeekParsha.name}</span>
</p>
```
With:
```tsx
<p className="mt-2 font-label text-xs text-on-surface-variant uppercase tracking-wide">
  This week:{' '}
  <span className="font-medium text-primary">{currentWeekParsha.name}</span>
</p>
```

**Step 3: Update the main parsha header wrapper**

Replace:
```tsx
<div className="border-b border-stone-100 bg-gradient-to-b from-amber-50 to-white shrink-0">
```
With:
```tsx
<div className="bg-surface-container-low shrink-0">
```

**Step 4: Update typography inside the header**

Replace parsha name heading:
```tsx
<h2 className="font-semibold text-stone-900 text-base leading-tight">
```
With:
```tsx
<h2 className="font-headline font-bold text-on-surface text-base leading-tight">
```

Replace book label:
```tsx
<p className="text-xs text-stone-500 mt-0.5">{parsha.book}</p>
```
With:
```tsx
<p className="font-label text-xs text-on-surface-variant mt-0.5 uppercase tracking-widest">{parsha.book}</p>
```

Replace metadata row div:
```tsx
<div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
```
With:
```tsx
<div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-label text-xs text-on-surface-variant uppercase tracking-wide">
```

Replace "This week's portion" badge:
```tsx
<span className="text-amber-600 font-medium">This week's portion</span>
```
With:
```tsx
<span className="text-primary font-semibold">This week's portion</span>
```

Replace summary paragraph:
```tsx
<p className="mt-2 text-xs text-stone-500 leading-relaxed transition-all">
```
With:
```tsx
<p className="mt-2 font-body text-sm text-on-surface-variant leading-relaxed transition-all">
```

Replace commentary link:
```tsx
className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium"
```
With:
```tsx
className="inline-flex items-center gap-1 font-label text-xs text-primary hover:text-primary-container font-medium uppercase tracking-wide transition-colors"
```

**Step 5: Verify**
The parsha name should render in Noto Serif, book/metadata labels in Inter uppercase, summary in Newsreader. No border separating header from text below — tonal background shift handles it.

**Step 6: Commit**
```bash
git add src/components/parsha/ParshaHeader.tsx
git commit -m "feat: apply editorial typography to ParshaHeader"
```

---

## Task 7: ParshaTextViewer

**Files:**
- Modify: `src/components/parsha/ParshaTextViewer.tsx`

**Step 1: Update the controls bar** (the sticky top bar)

Replace:
```tsx
<div className="sticky top-0 z-10 bg-white border-b border-stone-100 px-4 py-2 flex items-center justify-between gap-2">
```
With:
```tsx
<div className="sticky top-0 z-10 bg-surface-container-low px-4 py-2 flex items-center justify-between gap-2">
```

**Step 2: Update the Hebrew toggle button**

Replace:
```tsx
className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors ${
  showHebrew
    ? 'bg-stone-800 text-stone-100'
    : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
}`}
```
With:
```tsx
className={`flex items-center gap-1.5 font-label text-xs px-2.5 py-1 rounded-full transition-colors ${
  showHebrew
    ? 'bg-primary text-on-primary'
    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
}`}
```

**Step 3: Update the commentator dropdown button**

Replace:
```tsx
className="flex items-center gap-1 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded transition-colors"
```
With:
```tsx
className="flex items-center gap-1 font-label text-xs text-on-surface-variant bg-surface-container hover:bg-surface-container-high px-2.5 py-1 rounded-full transition-colors"
```

Replace the dropdown menu:
```tsx
<div className="absolute right-0 top-full mt-1 bg-white border border-stone-200 rounded shadow-md z-20 py-1 min-w-[100px]">
```
With:
```tsx
<div className="absolute right-0 top-full mt-1 bg-surface border border-outline-variant rounded shadow-ambient z-20 py-1 min-w-[100px]">
```

Replace commentator menu item classes:
```tsx
className={`w-full text-left px-3 py-1.5 text-xs hover:bg-stone-50 transition-colors ${
  c === selectedCommentator ? 'text-amber-700 font-medium' : 'text-stone-700'
}`}
```
With:
```tsx
className={`w-full text-left px-3 py-1.5 font-label text-xs hover:bg-surface-container-low transition-colors ${
  c === selectedCommentator ? 'text-primary font-semibold' : 'text-on-surface'
}`}
```

**Step 4: Update the Commentary toggle button**

Replace:
```tsx
className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-colors ${
  commentaryOpen
    ? 'bg-amber-600 text-white'
    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
}`}
```
With:
```tsx
className={`flex items-center gap-1.5 font-label text-xs px-2.5 py-1 rounded-full uppercase tracking-wide transition-colors ${
  commentaryOpen
    ? 'bg-primary text-on-primary'
    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
}`}
```

**Step 5: Update verse text styling**

Replace verse number:
```tsx
<span className="text-[10px] text-stone-300 font-mono select-none">{i + 1}</span>
```
With:
```tsx
<span className="font-label text-[10px] text-on-surface-variant/50 select-none">{i + 1}</span>
```

Replace English verse paragraph:
```tsx
<p
  className="text-sm text-stone-600 leading-relaxed"
  dangerouslySetInnerHTML=...
```
With:
```tsx
<p
  className="font-body text-sm text-on-surface leading-relaxed"
  dangerouslySetInnerHTML=...
```

**Step 6: Update Load More buttons**

Replace the "Show next" button:
```tsx
className="flex-1 text-xs text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 py-2 rounded transition-colors font-medium"
```
With:
```tsx
className="flex-1 font-label text-xs text-primary hover:text-primary-container bg-surface-container hover:bg-surface-container-high py-2 rounded transition-colors font-medium uppercase tracking-wide"
```

Replace "Show all" button:
```tsx
className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
```
With:
```tsx
className="font-label text-xs text-on-surface-variant hover:text-on-surface transition-colors"
```

Replace "All X verses shown" paragraph:
```tsx
className="text-xs text-stone-300 text-center pt-1"
```
With:
```tsx
className="font-label text-xs text-on-surface-variant/60 text-center pt-1"
```

**Step 7: Update Commentary section**

Replace the commentary section border:
```tsx
<div ref={commentaryRef} className="border-t border-amber-100 pt-4">
```
With:
```tsx
<div ref={commentaryRef} className="mt-4 pt-4 bg-surface-container-low -mx-4 px-4">
```

Replace commentary header:
```tsx
<div className="flex items-center gap-2 mb-3">
  <ScrollText size={13} className="text-amber-600" />
  <h3 className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
    {selectedCommentator} on {parsha.name}
  </h3>
</div>
```
With:
```tsx
<div className="flex items-center gap-2 mb-3">
  <ScrollText size={13} className="text-primary" />
  <h3 className="font-headline text-sm font-bold text-on-surface">
    {selectedCommentator} <span className="font-label text-xs text-on-surface-variant font-normal uppercase tracking-widest">on {parsha.name}</span>
  </h3>
</div>
```

Replace loading skeleton pulse:
```tsx
<div className="h-2.5 w-12 bg-amber-100 rounded animate-pulse" />
```
With:
```tsx
<div className="h-2.5 w-12 bg-surface-container-high rounded animate-pulse" />
```

Replace empty commentary message:
```tsx
<p className="text-xs text-stone-400 italic">
```
With:
```tsx
<p className="font-body text-sm text-on-surface-variant italic">
```

Replace commentary entry number:
```tsx
<span className="inline-block font-mono text-amber-600 font-medium text-[10px]">
```
With:
```tsx
<span className="inline-block font-label text-primary font-medium text-[10px]">
```

Replace commentary English text:
```tsx
<p className="text-xs text-stone-600 leading-relaxed">{en}</p>
```
With:
```tsx
<p className="font-body text-sm text-on-surface leading-relaxed">{en}</p>
```

Replace "Show more comments" button:
```tsx
className="flex-1 text-xs text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 py-2 rounded transition-colors font-medium"
```
With:
```tsx
className="flex-1 font-label text-xs text-primary hover:text-primary-container bg-surface-container hover:bg-surface-container-high py-2 rounded uppercase tracking-wide transition-colors font-medium"
```

**Step 8: Verify**
Sacred text renders in Newsreader. Hebrew stays in Frank Ruhl Libre. Controls use Inter label style. Commentary section has a parchment-tinted background.

**Step 9: Commit**
```bash
git add src/components/parsha/ParshaTextViewer.tsx
git commit -m "feat: apply Scholarly Modernism typography and colors to text viewer"
```

---

## Task 8: ContextPanel Header

**Files:**
- Modify: `src/components/layout/ContextPanel.tsx`

**Step 1: Update panel header**

Replace:
```tsx
<div className="px-4 py-3 border-b border-stone-100 bg-gradient-to-b from-stone-50 to-white shrink-0">
```
With:
```tsx
<div className="px-4 py-3 bg-surface-container shrink-0">
```

Replace the heading:
```tsx
<h2 className="text-sm font-semibold text-stone-800">Historical Context</h2>
```
With:
```tsx
<h2 className="font-label text-xs font-semibold text-on-surface uppercase tracking-widest">Historical Context</h2>
```

Replace the year badge:
```tsx
<span className="text-[11px] font-medium text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
```
With:
```tsx
<span className="font-label text-[11px] font-medium text-on-secondary-container bg-secondary-container rounded-full px-2 py-0.5 uppercase tracking-wide">
```

**Step 2: Update the empty state**

Replace:
```tsx
<div className="flex items-center justify-center h-32 text-stone-300 text-sm">
  <div className="text-center">
    <div className="text-3xl mb-2">🏺</div>
    <p>Select a Parsha to see its historical context</p>
  </div>
</div>
```
With:
```tsx
<div className="flex items-center justify-center h-32">
  <div className="text-center">
    <div className="text-3xl mb-2">🏺</div>
    <p className="font-body text-sm text-on-surface-variant italic">Select a Parsha to see its historical context</p>
  </div>
</div>
```

**Step 3: Verify**
Right panel header should be slightly darker parchment (`#f1eee5`) with uppercase Inter label and olive-green year chip.

**Step 4: Commit**
```bash
git add src/components/layout/ContextPanel.tsx
git commit -m "feat: restyle ContextPanel header with Scholarly Modernism tokens"
```

---

## Task 9: Context Cards — Batch 1

**Files:**
- Modify: `src/components/context/EraCard.tsx`
- Modify: `src/components/context/HistoricalNote.tsx`
- Modify: `src/components/context/HistoricalEventsTicker.tsx`

Read each file before editing to understand the exact current classes, then apply these rules consistently:

**Rules for all context cards:**
- `bg-white` → `bg-surface-container-lowest` (or keep `.info-card` which now does this)
- `rounded-xl border border-stone-100 shadow-sm` → remove (handled by `.info-card`)
- `border-t border-stone-100` (internal dividers) → remove, use `mt-4` spacing only
- `text-stone-900` or `text-stone-800` (headings) → `text-on-surface font-headline` (Noto Serif)
- `text-stone-600` or `text-stone-500` (body) → `text-on-surface-variant font-body` (Newsreader)
- `text-stone-400` (metadata/labels) → `text-on-surface-variant font-label uppercase tracking-wide text-xs`
- `text-amber-*` (accents) → `text-primary`
- `bg-amber-*` (tint backgrounds) → `bg-surface-container`
- `bg-stone-100 rounded` (tags) → `bg-secondary-container text-on-secondary-container rounded-full`
- `rounded-lg` on card sub-elements → `rounded`
- Remove all `shadow-sm` on sub-elements (ambient shadow only on card root)

**Step 1: Read and update `EraCard.tsx`**
Apply rules above to all className strings.

**Step 2: Read and update `HistoricalNote.tsx`**
Apply rules above. This component typically shows a note/disclaimer — body text should be `font-body italic text-on-surface-variant`.

**Step 3: Read and update `HistoricalEventsTicker.tsx`**
Apply rules above. Event items should use `font-label uppercase tracking-wide text-xs text-on-surface-variant` for labels and `font-body text-sm text-on-surface` for event descriptions. The `amber` accent on current events → `text-primary`.

**Step 4: Verify**
Check the right context panel with a parsha selected. Era card and events ticker should show parchment backgrounds with no visible borders.

**Step 5: Commit**
```bash
git add src/components/context/EraCard.tsx src/components/context/HistoricalNote.tsx src/components/context/HistoricalEventsTicker.tsx
git commit -m "feat: restyle EraCard, HistoricalNote, and EventsTicker"
```

---

## Task 10: Context Cards — Batch 2

**Files:**
- Modify: `src/components/context/WorldContextCard.tsx`
- Modify: `src/components/context/PrimarySourcesCard.tsx`
- Modify: `src/components/context/ArtifactsCard.tsx`
- Modify: `src/components/context/MaterialCultureCard.tsx`
- Modify: `src/components/context/PowerDetailPanel.tsx`

Apply the same rules from Task 9 to all five files. Additional specifics:

**`ArtifactsCard.tsx`** — museum artifact images: add `mix-blend-multiply` to integrate with parchment.

**`PrimarySourcesCard.tsx`** — source citation links: use `text-tertiary` (slate blue) for external scholarly links per design system.

**`PowerDetailPanel.tsx`** — this is a slide-in panel for ancient powers/empires:
- Background: `bg-white` → `bg-surface`
- Internal `border-*` → remove all
- Apply same heading/body/label typography rules

**Step 1: Read each file, apply rules, save**

**Step 2: Verify**
Scroll through all context cards with a parsha selected (try Shemot or Lech-Lecha which have rich context). All cards should be parchment-toned, no visible borders, serif headings, Newsreader body text.

**Step 3: Commit**
```bash
git add src/components/context/WorldContextCard.tsx src/components/context/PrimarySourcesCard.tsx src/components/context/ArtifactsCard.tsx src/components/context/MaterialCultureCard.tsx src/components/context/PowerDetailPanel.tsx
git commit -m "feat: restyle remaining context cards and PowerDetailPanel"
```

---

## Task 11: PlaceDetailPanel — Desktop Restyle

**Files:**
- Modify: `src/components/map/PlaceDetailPanel.tsx`

**Step 1: Update the slide-in panel container**

Replace:
```tsx
className={`absolute inset-y-0 right-0 left-8 bg-white z-10 overflow-y-auto transition-transform duration-300 rounded-tl-2xl rounded-bl-2xl shadow-xl ${...}`}
```
With:
```tsx
className={`absolute inset-y-0 right-0 left-8 bg-surface z-10 overflow-y-auto transition-transform duration-300 shadow-ambient ${...}`}
```

**Step 2: Update place name and metadata**

Replace:
```tsx
<h3 className="text-base font-semibold text-stone-900">{item.name}</h3>
```
With:
```tsx
<h3 className="font-headline text-base font-bold text-on-surface">{item.name}</h3>
```

Replace alternate names:
```tsx
<p className="text-xs text-stone-400 mt-0.5">
```
With:
```tsx
<p className="font-label text-xs text-on-surface-variant mt-0.5">
```

Replace modern name:
```tsx
<p className="text-xs text-stone-400">Modern: {place.modernName}</p>
```
With:
```tsx
<p className="font-label text-xs text-on-surface-variant">Modern: {place.modernName}</p>
```

Replace close button:
```tsx
className="flex-shrink-0 p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors"
```
With:
```tsx
className="flex-shrink-0 p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
```

**Step 3: Update the Google Maps block**

Replace:
```tsx
<div className="bg-blue-50 rounded-lg p-3 space-y-1.5">
```
With:
```tsx
<div className="bg-surface-container rounded p-3 space-y-1.5">
```

Replace navigation link:
```tsx
className="inline-flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-medium transition-colors"
```
With:
```tsx
className="inline-flex items-center gap-1.5 font-label text-xs text-tertiary hover:text-tertiary-container font-medium transition-colors"
```

Replace travel advisory text:
```tsx
<p className="text-[10px] text-stone-500 leading-relaxed">
```
With:
```tsx
<p className="font-label text-[10px] text-on-surface-variant leading-relaxed">
```

Replace travel advisory link:
```tsx
className="text-blue-600 hover:underline"
```
With:
```tsx
className="text-tertiary hover:underline"
```

**Step 4: Update Wikipedia section**

Replace loading skeleton:
```tsx
<div className="h-32 bg-stone-100 rounded-lg" />
```
With:
```tsx
<div className="h-32 bg-surface-container rounded animate-pulse" />
```

Replace extract paragraph:
```tsx
<p className="text-xs text-stone-600 leading-relaxed">{wiki.extract}</p>
```
With:
```tsx
<p className="font-body text-sm text-on-surface leading-relaxed">{wiki.extract}</p>
```

Replace "Read more on Wikipedia" link:
```tsx
className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 transition-colors"
```
With:
```tsx
className="inline-flex items-center gap-1 font-label text-[11px] text-primary hover:text-primary-container uppercase tracking-wide transition-colors"
```

**Step 5: Update Archaeological Significance block**

Replace:
```tsx
<div className="bg-purple-50 rounded-lg p-3">
  <p className="text-[10px] uppercase font-medium text-purple-700 mb-1 tracking-wide">
    Archaeological Significance
  </p>
  <p className="text-xs text-stone-700 leading-relaxed">
```
With:
```tsx
<div className="bg-surface-container rounded p-3">
  <p className="font-label text-[10px] uppercase font-medium text-on-surface-variant mb-1 tracking-widest">
    Archaeological Significance
  </p>
  <p className="font-body text-sm text-on-surface leading-relaxed">
```

**Step 6: Update Further Reading and Watch sections**

Replace `border-t border-stone-100 pt-3` dividers:
```tsx
<div className="border-t border-stone-100 pt-3 space-y-1.5">
```
With:
```tsx
<div className="mt-4 space-y-1.5">
```

Replace section header labels:
```tsx
<p className="text-[10px] uppercase font-medium text-stone-400 tracking-wide flex items-center gap-1.5">
```
With:
```tsx
<p className="font-label text-[10px] uppercase font-medium text-on-surface-variant tracking-widest flex items-center gap-1.5">
```

Replace link row backgrounds:
- Further Reading: `bg-stone-50 hover:bg-amber-50` → `bg-surface-container hover:bg-surface-container-high`
- Watch: `bg-stone-50 hover:bg-red-50` → `bg-surface-container hover:bg-surface-container-high`

Replace link text:
```tsx
<span className="text-xs text-stone-600 group-hover:text-amber-800 leading-snug">
```
With:
```tsx
<span className="font-label text-xs text-on-surface group-hover:text-primary leading-snug">
```

**Step 7: Update cross-parsha and verse sections**

Replace `border-t border-stone-100 pt-3` → `mt-4`

Replace section header labels (same as Step 6 pattern).

Replace "Also appears in" chips:
```tsx
className="px-2 py-1 bg-stone-100 text-stone-600 rounded text-[11px] hover:bg-amber-100 hover:text-amber-800 transition-colors"
```
With:
```tsx
className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded-full font-label text-[11px] hover:bg-surface-container-high transition-colors"
```

Replace verse quote block:
```tsx
<div className="bg-amber-50 rounded-lg p-3 border-l-2 border-amber-400">
  <p className="text-xs text-stone-700 leading-relaxed italic">"{verseText}"</p>
  <p className="text-[10px] text-amber-700 mt-1 font-medium">{firstVerse}</p>
```
With:
```tsx
<div className="bg-surface-container rounded p-3 border-l-2 border-primary">
  <p className="font-body text-sm text-on-surface leading-relaxed italic">"{verseText}"</p>
  <p className="font-label text-[10px] text-primary mt-1 font-medium">{firstVerse}</p>
```

Replace verse reference chips:
```tsx
className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px]"
```
With:
```tsx
className="px-1.5 py-0.5 bg-secondary-container text-on-secondary-container rounded-full font-label text-[10px]"
```

**Step 8: Verify**
Click a location on the map to open the detail panel. Should slide in with parchment surface, no rounded corners, serif place name, slate-blue Maps link, no purple archaeology block.

**Step 9: Commit**
```bash
git add src/components/map/PlaceDetailPanel.tsx
git commit -m "feat: restyle PlaceDetailPanel for Scholarly Modernism"
```

---

## Task 12: PlaceDetailPanel — Mobile Bottom Sheet

**Files:**
- Modify: `src/components/map/PlaceDetailPanel.tsx`
- Modify: `src/App.tsx`

**Context:** On mobile, the current behavior switches to the Context tab when a place is selected. We change this so the detail overlays the map directly as a bottom sheet, matching the `map_view_2` redesign screen.

**Step 1: Make `PlaceDetailPanel` render conditionally as bottom sheet on mobile**

In `PlaceDetailPanel.tsx`, the current outer div uses `absolute inset-y-0 right-0 left-8` positioning. We need to render differently on mobile vs desktop.

Replace the outer container:
```tsx
<div
  className={`absolute inset-y-0 right-0 left-8 bg-surface z-10 overflow-y-auto transition-transform duration-300 shadow-ambient ${
    item ? 'translate-x-0' : 'translate-x-full'
  }`}
>
```
With:
```tsx
<>
  {/* Desktop: slide-in from right (unchanged) */}
  <div
    className={`hidden md:block absolute inset-y-0 right-0 left-8 bg-surface z-10 overflow-y-auto transition-transform duration-300 shadow-ambient ${
      item ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    {item && <div className="p-4 space-y-4">{/* ...existing content... */}</div>}
  </div>

  {/* Mobile: bottom sheet overlay */}
  <div
    className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-lg shadow-ambient max-h-[65vh] overflow-y-auto transition-transform duration-300 ${
      item ? 'translate-y-0' : 'translate-y-full'
    }`}
  >
    {item && (
      <>
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1 shrink-0">
          <div className="w-8 h-1 bg-outline-variant rounded-full" />
        </div>
        <div className="p-4 space-y-4">{/* ...same content as desktop... */}</div>
      </>
    )}
  </div>
</>
```

**Note:** The content inside both panels is identical — extract it into a local `PlaceDetailContent` component to avoid duplication:

```tsx
function PlaceDetailContent({ item, place, isPlace, otherParshas, wiki, wikiLoading, verseText, firstVerse, closePlacePanel, setSelectedParsha, selectedParshaId }: { ... }) {
  return (
    <div className="p-4 space-y-4">
      {/* ...all existing content JSX from Task 11... */}
    </div>
  )
}
```

Then use `<PlaceDetailContent ... />` in both the desktop and mobile wrappers.

**Step 2: Update `App.tsx` — remove the "switch to context tab on place select" side effect on mobile**

In `App.tsx`, find:
```tsx
// When a place panel opens, jump to the context tab on mobile
useEffect(() => {
  if (selectedPlacePanel) setMobileTab('context')
}, [selectedPlacePanel])
```

Remove this `useEffect` entirely. The bottom sheet now handles the mobile place detail directly on the map tab.

**Step 3: Verify**
On mobile (resize browser to < 768px): tap a place marker. A bottom sheet should slide up from the bottom of the map with the drag handle and place info. The context tab should NOT auto-switch. On desktop: same slide-in-from-right behavior as before.

**Step 4: Commit**
```bash
git add src/components/map/PlaceDetailPanel.tsx src/App.tsx
git commit -m "feat: add mobile bottom sheet for place detail panel"
```

---

## Task 13: Map Markers + Legend

**Files:**
- Modify: `src/components/map/PlaceMarker.tsx`
- Modify: `src/components/map/ArchaeologicalSiteMarker.tsx`
- Modify: `src/components/map/MapLegend.tsx`

**Step 1: Read each file, then apply color rules**

General rules:
- Marker fill colors: `amber/yellow` hex values → `#6c2f00` (primary)
- Marker ring/highlight colors: amber → primary
- Popup backgrounds: `bg-white` → `bg-surface`
- Popup text: `text-stone-*` → `text-on-surface` / `text-on-surface-variant`
- Popup links: `text-amber-*` → `text-primary`
- `YouAreHereMarker.tsx` — deliberately keep its gold/amber color as a navigational exception

**Step 2: Update `MapLegend.tsx`**
- Legend container: `bg-white border border-stone-200` → `bg-surface shadow-ambient` no border
- Legend labels: `font-label text-xs text-on-surface-variant uppercase tracking-wide`
- Legend color swatches: update amber swatch → primary (#6c2f00)

**Step 3: Verify**
Load the map with a parsha (try Yitro or Shemot which have many locations). Markers should have burnt sienna accents. The legend should be parchment-toned. YouAreHere marker stays gold.

**Step 4: Commit**
```bash
git add src/components/map/PlaceMarker.tsx src/components/map/ArchaeologicalSiteMarker.tsx src/components/map/MapLegend.tsx
git commit -m "feat: restyle map markers and legend"
```

---

## Task 14: Timeline Components

**Files:**
- Modify: `src/components/timeline/TimelineSlider.tsx`
- Modify: `src/components/timeline/TimelineTrack.tsx`
- Modify: `src/components/timeline/EraLabel.tsx`
- Modify: `src/components/timeline/EraJumpButtons.tsx`

**Step 1: Read all four files**

**Step 2: Apply rules to `TimelineSlider.tsx`**
- Slider thumb: `bg-amber-500` or amber hex → `bg-primary`
- Active track fill: amber → `bg-primary`
- Year display text: `font-label uppercase tracking-wide text-xs text-on-surface-variant`
- Container background: white → `bg-surface` (already handled in App.tsx)

**Step 3: Apply rules to `TimelineTrack.tsx`**
- Track background: stone/gray → `bg-surface-container-high`
- Active fill: amber → `bg-primary`

**Step 4: Apply rules to `EraLabel.tsx`**
- Era name text: `font-label text-xs uppercase tracking-widest text-on-surface-variant`
- Active era: `text-primary font-semibold`

**Step 5: Apply rules to `EraJumpButtons.tsx`**
- Button backgrounds: `bg-amber-*` → `bg-primary text-on-primary`
- Button shape: `rounded-lg` → `rounded`
- Hover: `hover:bg-primary-container`

**Step 6: Verify**
The timeline strip should look parchment-toned with burnt sienna accents. Era labels in small caps Inter. Jump buttons are rectangular burnt sienna.

**Step 7: Commit**
```bash
git add src/components/timeline/TimelineSlider.tsx src/components/timeline/TimelineTrack.tsx src/components/timeline/EraLabel.tsx src/components/timeline/EraJumpButtons.tsx
git commit -m "feat: restyle timeline components"
```

---

## Task 15: Modals

**Files:**
- Modify: `src/components/NewsletterModal.tsx`
- Modify: `src/components/TutorialOverlay.tsx`

**Step 1: Update `NewsletterModal.tsx`**

Read the file first. Apply rules:
- Modal backdrop: keep as-is (dark overlay)
- Modal panel: `bg-white rounded-xl shadow-xl` → `bg-surface rounded shadow-ambient`
- Title: add `font-headline` (Noto Serif)
- Body text: add `font-body` (Newsreader) `leading-relaxed`
- CTA button: replace flat amber with gradient + rectangular:
  ```tsx
  className="w-full py-3 rounded font-label font-bold text-on-primary uppercase tracking-widest text-sm transition-opacity hover:opacity-90"
  style={{ background: 'linear-gradient(45deg, #6c2f00, #8b4513)' }}
  ```
- Input field: same bottom-line style as search inputs (no border box)
- Close button: `text-stone-400 hover:bg-stone-100` → `text-on-surface-variant hover:bg-surface-container`

**Step 2: Update `TutorialOverlay.tsx`**

Read the file first. Apply rules:
- Spotlight ring animation already updated in `index.css` (Task 2) — primary color
- Tooltip panels: `bg-white rounded-xl` → `bg-surface rounded shadow-ambient`
- Tooltip title: `font-headline` (Noto Serif)
- Tooltip body: `font-body text-sm leading-relaxed`
- Step labels: `font-label uppercase tracking-widest text-xs text-on-surface-variant`
- Navigation buttons: amber → `bg-primary text-on-primary rounded`
- Skip/close: `text-stone-400` → `text-on-surface-variant`

**Step 3: Verify**
Open newsletter modal (`/` → click subscribe or wait 50s). Modal should be parchment-toned with gradient CTA button. Open tutorial (click ? icon) — tooltip panels should be parchment.

**Step 4: Commit**
```bash
git add src/components/NewsletterModal.tsx src/components/TutorialOverlay.tsx
git commit -m "feat: restyle newsletter modal and tutorial overlay"
```

---

## Task 16: Parsha Library Screen

**Files:**
- Create: `src/components/parsha/ParshaLibrary.tsx`

**Step 1: Create `ParshaLibrary.tsx`**

```tsx
import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshasGroupedByBook, BOOKS_ORDER } from '../../utils/parshaUtils'
import parshaList from '../../data/parshaList.json'
import type { ParshaListItem } from '../../types/parsha'

const parshas = parshaList as ParshaListItem[]
const grouped = getParshasGroupedByBook()

function matchesQuery(parsha: ParshaListItem, query: string): boolean {
  const q = query.toLowerCase()
  return (
    parsha.name.toLowerCase().includes(q) ||
    parsha.hebrewName.includes(q) ||
    parsha.book.toLowerCase().includes(q)
  )
}

interface Props {
  onSelect?: () => void // called after selecting a parsha (e.g. to switch to map tab)
}

export function ParshaLibrary({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)

  const q = query.trim()

  const handleSelect = (id: string) => {
    setSelectedParsha(id)
    onSelect?.()
  }

  return (
    <div className="flex flex-col h-full bg-surface-container-low overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 shrink-0">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">
          Digital Archivist Index
        </p>
        <h1 className="font-headline text-3xl font-bold text-on-surface leading-tight">
          Parsha Library
        </h1>

        {/* Search */}
        <div className="relative mt-4">
          <Search
            size={13}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search the scrolls…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-5 pr-3 py-2 font-label text-sm border-0 border-b border-outline/30 rounded-none bg-transparent text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-tertiary transition-colors"
          />
        </div>
      </div>

      {/* Parsha list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pb-8">
        {BOOKS_ORDER.map((book) => {
          const items = q
            ? parshas.filter((p) => p.book === book && matchesQuery(p, q))
            : grouped[book] ?? []
          if (items.length === 0) return null

          return (
            <div key={book} className="mb-8">
              {/* Book header */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                  {book}
                </span>
                <span className="font-hebrew text-sm text-on-surface-variant/60">
                  {items[0]?.book === 'Genesis' ? 'בְּרֵאשִׁית'
                    : items[0]?.book === 'Exodus' ? 'שְׁמוֹת'
                    : items[0]?.book === 'Leviticus' ? 'וַיִּקְרָא'
                    : items[0]?.book === 'Numbers' ? 'בְּמִדְבַּר'
                    : items[0]?.book === 'Deuteronomy' ? 'דְּבָרִים'
                    : ''}
                </span>
              </div>

              {/* Parsha rows */}
              <div className="space-y-6">
                {items.map((parsha) => {
                  const isSelected = parsha.id === selectedParshaId
                  return (
                    <button
                      key={parsha.id}
                      onClick={() => handleSelect(parsha.id)}
                      className={`w-full text-left flex items-center gap-4 group transition-opacity ${
                        isSelected ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 shrink-0 bg-surface-container overflow-hidden rounded">
                        {parsha.doreImageUrl ? (
                          <img
                            src={parsha.doreImageUrl}
                            alt={parsha.name}
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high" />
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className={`font-headline text-base leading-snug ${isSelected ? 'text-primary' : 'text-on-surface group-hover:text-primary'} transition-colors`}>
                            {parsha.name}
                          </span>
                          <span className="font-hebrew text-sm text-on-surface-variant shrink-0">
                            {parsha.hebrewName}
                          </span>
                        </div>
                        <p className="font-label text-xs text-on-surface-variant mt-0.5 uppercase tracking-wide">
                          {parsha.book} · {parsha.verses}
                        </p>
                      </div>

                      {/* Selected indicator */}
                      {isSelected && (
                        <div className="w-1 h-8 bg-primary rounded-full shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

**Step 2: Verify the component renders** (not wired in yet)
Temporarily import and render `<ParshaLibrary />` inside App.tsx to check it looks right. Then revert — full wiring is Task 17.

**Step 3: Commit**
```bash
git add src/components/parsha/ParshaLibrary.tsx
git commit -m "feat: create ParshaLibrary discovery screen"
```

---

## Task 17: Wire Library into App

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/types/parsha.ts` (if `verses` field is missing from `ParshaListItem`)

**Step 1: Check `ParshaListItem` type has a `verses` field**

Open `src/types/parsha.ts`. If `verses` (verse range string like "Genesis 12:1 - 17:27") is missing from the type, add it as `verses?: string`.

Also check `src/data/parshaList.json` to confirm the field name for verse range — it may be `verseRange` or `chapters` instead of `verses`. Update the `ParshaLibrary.tsx` component to use the correct field name.

**Step 2: Add 'library' to `MobileTab` type in `App.tsx`**

Replace:
```tsx
type MobileTab = 'map' | 'text' | 'context'
```
With:
```tsx
type MobileTab = 'map' | 'text' | 'context' | 'library'
```

**Step 3: Add Library import to `App.tsx`**

Add to imports:
```tsx
import { ParshaLibrary } from './components/parsha/ParshaLibrary'
import { Library } from 'lucide-react'
```

**Step 4: Add Library tab content** (inside mobile tab content area, after the History tab div)

```tsx
{/* Library tab */}
<div className={`absolute inset-0 ${mobileTab === 'library' ? '' : 'hidden'}`}>
  <ParshaLibrary onSelect={() => setMobileTab('map')} />
</div>
```

**Step 5: Add Library to the mobile tab bar array**

Replace the tabs array:
```tsx
[
  { id: 'map' as MobileTab, label: 'MAP', Icon: Map },
  { id: 'text' as MobileTab, label: 'TEXT', Icon: BookOpen },
  { id: 'context' as MobileTab, label: 'HISTORY', Icon: Globe },
  { id: 'library' as MobileTab, label: 'LIBRARY', Icon: Library },
] as const
```

**Step 6: Add Library button to desktop header**

Inside the desktop header, before the Subscribe button, add:
```tsx
<button
  onClick={() => {
    // On desktop, Library replaces the Sidebar content
    // We'll use a simple toggle state for now
    setShowLibrary((v) => !v)
  }}
  className="flex items-center gap-1.5 px-3 py-1.5 rounded font-label text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
  title="Parsha Library"
>
  <Library size={13} />
  <span className="hidden lg:inline">Library</span>
</button>
```

Add `showLibrary` state near the top of App:
```tsx
const [showLibrary, setShowLibrary] = useState(false)
```

**Step 7: Wire Library into desktop left column**

In the desktop left column (sidebar), wrap with conditional:
```tsx
<div className="w-72 h-full shrink-0 bg-surface-container-low overflow-y-auto">
  {showLibrary ? (
    <ParshaLibrary onSelect={() => setShowLibrary(false)} />
  ) : (
    <Sidebar />
  )}
</div>
```

**Step 8: Verify**
Mobile: tap LIBRARY tab → Parsha Library screen loads, grouped by book with Doré thumbnails. Tap a parsha → auto-switches to MAP tab with that parsha selected.
Desktop: click Library in header → left panel shows Library. Select a parsha → returns to Sidebar view.

**Step 9: Commit**
```bash
git add src/App.tsx src/components/parsha/ParshaLibrary.tsx src/types/parsha.ts
git commit -m "feat: wire ParshaLibrary into mobile tabs and desktop header"
```

---

## Final Verification Checklist

Before declaring done, walk through the full app:

- [ ] Header is parchment (`#f6f3ea`), not dark
- [ ] Logo is burnt sienna on parchment
- [ ] No visible 1px border lines between any panels
- [ ] Left panel (`#f6f3ea`) is lighter than right panel (`#f1eee5`)
- [ ] Parsha name renders in Noto Serif
- [ ] Summary text renders in Newsreader
- [ ] Labels/metadata render in Inter uppercase
- [ ] Amber color is nowhere visible (all replaced with `#6c2f00` primary)
- [ ] Cards have no visible borders, only ambient shadow
- [ ] Chips are rounded-full (olive green chips, not stone gray)
- [ ] Commentary section works (select Rashi/Ramban/etc)
- [ ] Place detail panel slides in on desktop, bottom sheet on mobile
- [ ] Timeline slider accent is burnt sienna
- [ ] Parsha Library screen loads with Doré thumbnails
- [ ] Selecting from Library switches to map on mobile, returns to sidebar on desktop
- [ ] No TypeScript errors (`npm run build` passes cleanly)

```bash
npm run build
# Expected: no errors, dist/ generated successfully
git add -A
git commit -m "feat: complete Scholarly Modernism redesign"
```
