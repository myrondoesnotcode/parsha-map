# Desktop Three-Column Layout Implementation Plan

> **Status: ✅ Implemented and shipped.** Live on parshamap.com. Kept here for historical reference only.

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the overlay/slide-in panel system on desktop with a permanent three-column layout (Sidebar | Map+Timeline | ContextPanel).

**Architecture:** All changes are in `src/App.tsx`, desktop section only. Remove the `PanelShell` overlay component and toggle state. Replace the `hidden md:block` absolute-positioned map with a flex-row layout where all three panels are always visible. Mobile layout is untouched.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 3

---

### Task 1: Remove overlay state and PanelShell component

**Files:**
- Modify: `src/App.tsx`

**Step 1: Remove `leftOpen` and `rightOpen` state**

In `App.tsx`, delete these two lines from the state declarations (around line 105-106):
```tsx
const [leftOpen, setLeftOpen] = useState(false)
const [rightOpen, setRightOpen] = useState(false)
```

**Step 2: Delete the `PanelShell` component entirely**

Delete the entire `PanelShell` function (lines 58–96):
```tsx
function PanelShell({ ... }) { ... }
```

**Step 3: Verify TypeScript still compiles**

Run: `npm run build 2>&1 | head -30`
Expected: Build may fail due to references to removed state — that's fine, we'll fix in Task 2.

**Step 4: Commit (partial — will fix errors in Task 2)**

Skip commit until Task 2 is done.

---

### Task 2: Replace desktop layout with three-column flex

**Files:**
- Modify: `src/App.tsx`

**Step 1: Replace the entire desktop block**

Find the desktop section comment block (around line 147–252):
```tsx
{/* ══════════════════════════════════════════════════════
    DESKTOP  (md +)  — map fills full screen, panels overlay
    ══════════════════════════════════════════════════════ */}
<div className="hidden md:block h-full relative">
  ...
</div>
```

Replace the entire desktop block with:
```tsx
{/* ══════════════════════════════════════════════════════
    DESKTOP  (md +)  — permanent three-column layout
    ══════════════════════════════════════════════════════ */}
<div className="hidden md:flex md:flex-col h-full">

  {/* ── Header ── */}
  <header className="shrink-0 z-[1100] h-11 flex items-center gap-1 px-3
    bg-stone-900/95 backdrop-blur-sm border-b border-stone-800/60">

    <LogoLockup />

    <div className="w-px h-5 bg-stone-700 mx-2" />

    {/* Parsha name pill */}
    {parsha && (
      <span className="text-xs text-amber-400/80 truncate max-w-[200px]">
        {parsha.hebrewName}
      </span>
    )}

    <div className="flex-1" />

    {/* Subscribe */}
    <button
      onClick={() => setNewsletterOpen(true)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-all"
      title="Get weekly parsha by email"
    >
      <Mail size={13} />
      <span className="hidden lg:inline">Subscribe</span>
    </button>

    <div className="w-px h-5 bg-stone-700 mx-1" />

    {/* X / Twitter */}
    <a
      href="https://x.com/Mshneider"
      target="_blank"
      rel="noreferrer"
      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
      title="@Mshneider on X"
    >
      <XLogo size={14} />
    </a>

    {/* Help */}
    <button
      onClick={reopenTutorial}
      className="p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-stone-800 transition-colors"
      title="Show tutorial"
    >
      <HelpCircle size={15} />
    </button>
  </header>

  {/* ── Three columns ── */}
  <div className="flex-1 flex min-h-0">

    {/* Left: Sidebar */}
    <div className="w-72 shrink-0 border-r border-stone-200 bg-white overflow-y-auto">
      <Sidebar />
    </div>

    {/* Center: Map + Timeline */}
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex-1 relative min-h-0">
        <ParshaMap />
      </div>
      <div className="shrink-0 bg-white/95 backdrop-blur-md border-t border-stone-200/70 px-5 py-2.5 h-[72px]">
        <TimelineSlider />
      </div>
    </div>

    {/* Right: ContextPanel */}
    <div className="w-80 shrink-0 border-l border-stone-200 bg-white overflow-y-auto">
      <ContextPanel />
    </div>
  </div>
</div>
```

**Step 2: Clean up unused imports**

Remove these imports that are no longer used in the desktop section:
```tsx
import { ChevronDown, ChevronUp } from 'lucide-react'
```

Also remove `BookOpen` and `Globe` from the lucide imports if they're only used in the desktop header (check mobile — `Globe` and `Map` and `BookOpen` ARE used in the mobile tab bar, so keep those).

Double-check: the mobile tab bar uses `Map`, `BookOpen`, `Globe` — keep all three. Only `ChevronDown` and `ChevronUp` can be removed.

**Step 3: Verify build passes**

Run: `npm run build 2>&1 | tail -20`
Expected: `✓ built in` with no errors.

**Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: replace desktop overlay panels with permanent three-column layout"
```

---

### Task 3: Visual verification

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Check desktop layout**

Open browser at `http://localhost:5173`. At viewport width ≥ 768px, verify:
- Sidebar visible on the left (fixed width, scrollable)
- Map visible in the center
- ContextPanel visible on the right
- Timeline visible at the bottom of the map column
- No toggle buttons in header
- Header shows logo, optional parsha name, Subscribe, X, Help

**Step 3: Check mobile layout**

Resize viewport to < 768px. Verify:
- Header with logo
- Tab content (Map / Torah / World)
- Bottom tab bar with three tabs
- Mobile timeline visible on Map tab

**Step 4: Commit if any fixups were needed**

```bash
git add src/App.tsx
git commit -m "fix: desktop three-column layout adjustments"
```
