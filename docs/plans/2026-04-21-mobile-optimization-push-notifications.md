# Mobile Optimization & Push Notifications Design

**Date:** 2026-04-21  
**Status:** ✅ Implemented and shipped (iOS app v1.6/6). Splash, safe-area insets, and OneSignal native push are all live.

## Context

The Parsha Map iOS app (Capacitor-wrapped React app) needed three improvements:
1. The Leaflet map attribution shows a Ukrainian flag emoji (added by Leaflet post-2022)
2. The map legend defaults to expanded on mobile, covering 40%+ of the map
3. No push notification system existed for weekly parsha reminders

## Changes

### 1. Remove Ukrainian Flag from Leaflet Attribution

Leaflet 1.x sets `🇺🇦` as its default attribution prefix. Fix by passing `prefix: ''` to the attribution control.

**File:** `src/components/map/ParshaMap.tsx`  
**Change:** Add `attributionControl={{ prefix: '' }}` prop to `<MapContainer>`

### 2. Mobile Optimizations

**a) Legend collapsed by default on mobile**  
**File:** `src/components/map/MapLegend.tsx`  
**Change:** `useState(window.innerWidth < 768)` instead of `useState(false)`

**b) Safe area insets**  
**Files:** `src/App.tsx` (mobile header + bottom tab bar)  
**Change:** Add `pt-[env(safe-area-inset-top)]` to mobile header and `pb-[env(safe-area-inset-bottom)]` to bottom tab bar  
**Also:** `index.css` — add `safe-area-inset` meta viewport if not already present

**c) Map controls safe area**  
**File:** `src/components/map/ParshaMap.tsx`  
**Change:** Ensure the right-side control pill has `mr-[env(safe-area-inset-right)]` or equivalent

### 3. Push Notifications (OneSignal)

**Overview:** OneSignal Capacitor plugin registers devices and handles APNs. Weekly pushes are sent via GitHub Actions cron (no backend server needed).

**Installation:**
```
npm install onesignal-capacitor
npx cap sync
```

**Initialization (`src/main.tsx`):**
- Import and init OneSignal with App ID
- Call `OneSignal.Notifications.requestPermission()` on first launch (after a short delay, not immediately)

**`capacitor.config.ts`:**
- No changes needed (OneSignal manages its own plugin config)

**Weekly automation (`.github/workflows/weekly-parsha-push.yml`):**
- Schedule: `cron: '0 23 * * 4'` (Thursday 11pm UTC = Thursday 7pm ET)
- Step 1: Fetch current parsha from `https://www.sefaria.org/api/calendars?diaspora=1`
- Step 2: POST to OneSignal REST API with parsha name in notification body
- Secrets required: `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_API_KEY`

**Notification format:**
- Title: `"This week's Torah portion"`
- Body: `"Parsha {name} — tap to explore the map"`
- Data payload: `{ parshaId: "{id}" }` for deep-link handling

**Deep link handling (optional, phase 2):** App can read the notification data payload on open and auto-select the parsha.

## Verification

1. Build and run in Xcode simulator — verify:
   - No Ukrainian flag in map attribution
   - Legend starts collapsed on mobile viewport
   - Header and tab bar don't get clipped by notch/home indicator
2. Run on real device — test OneSignal permission prompt appears
3. OneSignal dashboard — send test push, verify it arrives
4. Trigger GitHub Action manually — verify correct parsha name in notification
