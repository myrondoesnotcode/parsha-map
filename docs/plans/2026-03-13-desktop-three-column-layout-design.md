# Desktop Three-Column Layout Design

**Date:** 2026-03-13
**Status:** Approved

## Problem

The current desktop layout uses slide-in overlay panels (Sidebar left, ContextPanel right) toggled by header buttons. All three sections (Torah text, map, historical context) are never visible simultaneously, requiring users to toggle back and forth.

## Solution

Replace the overlay mechanism with a permanent three-column layout where all sections are always visible.

## Layout

```
┌─────────────────────────────────────────────────────┐
│  Header (full width)                                 │
├──────────────┬──────────────────────┬────────────────┤
│              │                      │                │
│   Sidebar    │       Map            │  ContextPanel  │
│   288px      │     (flex-1)         │    320px       │
│              │                      │                │
│              ├──────────────────────┤                │
│              │  Timeline            │                │
└──────────────┴──────────────────────┴────────────────┘
```

- **Left column:** `Sidebar` component, fixed 288px width, independently scrollable
- **Center column:** `flex-1`, stacks `ParshaMap` (flex-1) above `TimelineSlider` (shrink-0)
- **Right column:** `ContextPanel` component, fixed 320px width, independently scrollable
- **Header:** Full width, unchanged content minus the two panel toggle buttons

## Changes Required

All changes in `src/App.tsx`, desktop section only:

1. Remove state: `leftOpen`, `rightOpen`
2. Remove component: `PanelShell`
3. Remove from desktop header: BookOpen toggle button, Globe toggle button
4. Replace `hidden md:block` overlay section with flex-row three-column layout
5. Mobile layout: **no changes**

## Out of Scope

- No changes to `Sidebar.tsx`, `ContextPanel.tsx`, or any other component
- No responsive breakpoint-based width adjustments (can revisit if needed)
- No collapse/resize handles
