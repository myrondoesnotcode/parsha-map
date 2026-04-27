# iPhone Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix four iPhone/mobile issues: x-axis scroll lock, remove email popup, add weekly push notifications via OneSignal, add splash screen.

**Architecture:** All changes are in the React SPA (`src/`) plus one new service worker shim (`public/`), one GitHub Action (`.github/`), and minor additions to `index.html` and `index.css`. No new dependencies except OneSignal's CDN script.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 3, OneSignal Web Push (CDN), GitHub Actions

---

## Task 1: Fix X-Axis Horizontal Scroll

iOS Safari allows rubber-band horizontal momentum scrolling even when `overflow-x: hidden` is set on a container. The fix is to use `touch-action: pan-y` to tell iOS to only accept vertical pan gestures, plus `overflow-x: hidden` on the document root.

**Files:**
- Modify: `src/App.tsx` line 372
- Modify: `src/index.css` lines 8–16

### Step 1: Add touch-action to text tab container

In `src/App.tsx`, find line 372:
```tsx
<div className={`absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface-container-low ${mobileTab === 'text' ? '' : 'hidden'}`}>
```

Change to:
```tsx
<div className={`absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface-container-low ${mobileTab === 'text' ? '' : 'hidden'}`} style={{ touchAction: 'pan-y' }}>
```

### Step 2: Add overflow-x: hidden to html/body in index.css

In `src/index.css`, find the `@layer base` block with `html, body, #root`:
```css
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #fcf9f0;
  color: #1c1c17;
}
```

Change to:
```css
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background-color: #fcf9f0;
  color: #1c1c17;
  overflow-x: hidden;
}
```

### Step 3: Commit

```bash
git add src/App.tsx src/index.css
git commit -m "fix: prevent horizontal scroll/drift on iPhone text tab"
```

---

## Task 2: Remove Email Popup

The newsletter modal and all its triggers need to be fully removed from the codebase.

**Files:**
- Delete: `src/components/NewsletterModal.tsx`
- Modify: `src/App.tsx` (multiple locations)

### Step 1: Delete the modal component

```bash
rm src/components/NewsletterModal.tsx
```

### Step 2: Remove from App.tsx — imports

Find line 7:
```tsx
import { NewsletterModal } from './components/NewsletterModal'
```
Delete that line.

Also in the lucide-react import block (around lines 16–24), remove `Mail,` since it won't be used after this task:
```tsx
import {
  Map,
  BookOpen,
  Globe,
  HelpCircle,
  Mail,        // ← remove this line
  Library,
  CalendarSearch,
} from 'lucide-react'
```

### Step 3: Remove newsletterOpen state (line 75)

Find:
```tsx
const [newsletterOpen, setNewsletterOpen] = useState(false)
```
Delete that line.

### Step 4: Remove the 50s auto-show useEffect (lines 150–161)

Find and delete:
```tsx
// Auto-show newsletter popup after 50s, once per 30 days
useEffect(() => {
  const NEWSLETTER_KEY = 'newsletter-last-shown'
  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000
  const lastShown = localStorage.getItem(NEWSLETTER_KEY)
  if (lastShown && Date.now() - Number(lastShown) < THIRTY_DAYS) return
  const timer = setTimeout(() => {
    setNewsletterOpen(true)
    localStorage.setItem(NEWSLETTER_KEY, String(Date.now()))
  }, 50_000)
  return () => clearTimeout(timer)
}, [])
```

### Step 5: Remove the modal render (line 183)

Find and delete:
```tsx
<NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
```

### Step 6: Remove desktop Subscribe button (lines 232–239)

Find and delete:
```tsx
{/* Subscribe */}
<button
  onClick={() => setNewsletterOpen(true)}
  className="flex items-center gap-1.5 px-3 py-1.5 rounded font-label text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
  title="Get weekly parsha by email"
>
  <Mail size={13} />
  <span className="hidden lg:inline">{t.header.subscribe}</span>
</button>
```

### Step 7: Remove mobile Subscribe button (around lines 333–338)

Find and delete:
```tsx
<button
  onClick={() => setNewsletterOpen(true)}
  className="p-1 rounded text-on-surface-variant hover:text-on-surface transition-colors"
  title="Subscribe"
>
  <Mail size={15} />
</button>
```

### Step 8: Check TypeScript compiles

```bash
npx tsc --noEmit
```
Expected: no errors

### Step 9: Commit

```bash
git add -A
git commit -m "feat: remove newsletter email popup entirely"
```

---

## Task 3: Add Splash Screen

A brief animated splash shown once per browser session before the app content appears.

**Files:**
- Create: `src/components/SplashScreen.tsx`
- Modify: `src/App.tsx`

### Step 1: Create SplashScreen component

Create `src/components/SplashScreen.tsx`:

```tsx
import { useEffect, useState } from 'react'

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), 1200)
    const doneTimer = setTimeout(onDone, 1700)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]"
      style={{
        transition: 'opacity 500ms ease-out',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <img
        src="/icon-512.png"
        alt="Parsha Map"
        className="w-24 h-24 rounded-2xl shadow-2xl"
        style={{ animation: 'splashPulse 1s ease-out forwards' }}
      />
      <p className="mt-4 font-hebrew text-2xl font-medium text-white tracking-wide">Parsha</p>
      <p className="font-label text-[11px] text-white/50 tracking-widest uppercase mt-0.5">Map</p>
      <style>{`
        @keyframes splashPulse {
          0% { opacity: 0; transform: scale(0.88); }
          60% { opacity: 1; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
```

### Step 2: Wire SplashScreen into App.tsx

In `src/App.tsx`, add `showSplash` state near the top of the App function (after the existing state declarations):

```tsx
const [showSplash, setShowSplash] = useState(
  () => sessionStorage.getItem('splashed') !== '1'
)
```

Add an `onDone` handler just before the `return`:

```tsx
function handleSplashDone() {
  sessionStorage.setItem('splashed', '1')
  setShowSplash(false)
}
```

Add the import at the top of the file with other component imports:
```tsx
import { SplashScreen } from './components/SplashScreen'
```

Inside the `return`, as the very first child of the outermost `<div>`:
```tsx
{showSplash && <SplashScreen onDone={handleSplashDone} />}
```

### Step 3: Check TypeScript compiles

```bash
npx tsc --noEmit
```

### Step 4: Commit

```bash
git add src/components/SplashScreen.tsx src/App.tsx
git commit -m "feat: add animated splash screen on first session load"
```

---

## Task 4: Add Weekly Push Notifications (OneSignal)

OneSignal handles service worker, VAPID keys, and subscription management. The app registers users for push, then a GitHub Action sends the weekly notification every Friday.

**⚠️ User pre-requisite:** Before this works in production, you need to:
1. Create a free account at [onesignal.com](https://onesignal.com)
2. Create a new app → choose "Web Push"
3. Set your site URL to `https://parshamap.com`
4. Copy your **App ID** (looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
5. Copy your **REST API Key** from Settings → Keys & IDs
6. Add two GitHub repo secrets: `ONESIGNAL_APP_ID` and `ONESIGNAL_REST_API_KEY`

**Files:**
- Modify: `index.html`
- Create: `public/OneSignalSDKWorker.js`
- Create: `src/components/NotificationPrompt.tsx`
- Modify: `src/App.tsx`
- Create: `.github/workflows/weekly-parsha-notify.yml`

### Step 1: Add OneSignal service worker shim

Create `public/OneSignalSDKWorker.js`:
```js
importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');
```

### Step 2: Add OneSignal SDK to index.html

In `index.html`, inside `<head>`, add before the closing `</head>` tag:

```html
<!-- OneSignal Web Push -->
<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
<script>
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.init({
      appId: "YOUR_ONESIGNAL_APP_ID",
      notifyButton: { enable: false },
      allowLocalhostAsSecureOrigin: true,
    });
  });
</script>
```

Replace `YOUR_ONESIGNAL_APP_ID` with the actual App ID once you have it.

### Step 3: Create NotificationPrompt component

Create `src/components/NotificationPrompt.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'

const PROMPT_KEY = 'notif-prompt-dismissed'

export function NotificationPrompt() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(PROMPT_KEY)) return
    // Only show if notifications are not already granted/denied
    if (Notification.permission !== 'default') return
    const timer = setTimeout(() => setVisible(true), 30_000)
    return () => clearTimeout(timer)
  }, [])

  function handleEnable() {
    setVisible(false)
    localStorage.setItem(PROMPT_KEY, '1')
    window.OneSignalDeferred?.push((OneSignal: { showNativePrompt: () => void }) => {
      OneSignal.showNativePrompt()
    })
  }

  function handleDismiss() {
    setVisible(false)
    localStorage.setItem(PROMPT_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[2000] mx-3 mb-3 rounded-xl bg-surface-container-high shadow-lg border border-outline-variant p-3 flex items-center gap-3">
      <Bell size={18} className="text-primary shrink-0" />
      <p className="flex-1 font-label text-xs text-on-surface leading-snug">
        Get weekly parsha reminders every Shabbat
      </p>
      <button
        onClick={handleEnable}
        className="shrink-0 px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label text-xs font-medium"
      >
        Enable
      </button>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 text-on-surface-variant hover:text-on-surface"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
```

### Step 4: Wire NotificationPrompt into mobile layout

In `src/App.tsx`, add the import:
```tsx
import { NotificationPrompt } from './components/NotificationPrompt'
```

In the mobile layout section (around line 358, inside the `flex-col` mobile container), add `NotificationPrompt` inside the tab content area. Find the tab content wrapper:
```tsx
{/* Tab content */}
<div className="flex-1 min-h-0 relative overflow-hidden">
```

Add `<NotificationPrompt />` as the first child inside that div:
```tsx
{/* Tab content */}
<div className="flex-1 min-h-0 relative overflow-hidden">
  <NotificationPrompt />
```

### Step 5: Add type declaration for OneSignalDeferred

In `src/components/NotificationPrompt.tsx` the `window.OneSignalDeferred` reference needs a global type. Add this to `src/vite-env.d.ts` (or create it if it doesn't exist):

```ts
interface Window {
  OneSignalDeferred?: Array<(OneSignal: { showNativePrompt: () => void }) => void>
}
```

### Step 6: Create GitHub Action for weekly notification

Create `.github/workflows/weekly-parsha-notify.yml`:

```yaml
name: Weekly Parsha Push Notification

on:
  schedule:
    - cron: '0 8 * * 5'   # Every Friday at 8:00 AM UTC
  workflow_dispatch:         # Allow manual trigger for testing

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Get current parsha from Sefaria
        id: parsha
        run: |
          RESPONSE=$(curl -s "https://www.sefaria.org/api/calendars?diaspora=1")
          PARSHA=$(echo "$RESPONSE" | python3 -c "
          import json, sys
          data = json.load(sys.stdin)
          items = data.get('calendar_items', [])
          for item in items:
              if item.get('title', {}).get('en') == 'Parashat Hashavua':
                  print(item['displayValue']['en'])
                  break
          ")
          echo "name=$PARSHA" >> $GITHUB_OUTPUT

      - name: Send OneSignal push notification
        run: |
          curl -X POST "https://onesignal.com/api/v1/notifications" \
            -H "Authorization: Basic ${{ secrets.ONESIGNAL_REST_API_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{
              "app_id": "${{ secrets.ONESIGNAL_APP_ID }}",
              "included_segments": ["All"],
              "headings": {"en": "This week'\''s Parsha 📖"},
              "contents": {"en": "Parashat ${{ steps.parsha.outputs.name }} — Open the map to explore"},
              "url": "https://parshamap.com"
            }'
```

### Step 7: Check TypeScript compiles

```bash
npx tsc --noEmit
```

### Step 8: Commit

```bash
git add index.html public/OneSignalSDKWorker.js src/components/NotificationPrompt.tsx src/App.tsx .github/workflows/weekly-parsha-notify.yml
git commit -m "feat: add weekly push notifications via OneSignal"
```

---

## Verification

### X-axis scroll
1. Deploy to GitHub Pages (or test with `npm run dev` on a device via local network)
2. Open on iPhone Safari, select a parsha that has an image (e.g., "Lech Lecha")
3. Swipe up/down — confirm no horizontal drift
4. Try swiping aggressively diagonally — still no horizontal shift

### Email popup removed
1. Clear localStorage: `localStorage.clear()` in browser console
2. Reload app, wait 60+ seconds
3. Confirm no modal appears
4. Check header: no "Subscribe" / Mail icon button anywhere

### Splash screen
1. Clear sessionStorage: `sessionStorage.clear()` in browser console
2. Reload — confirm logo + "Parsha Map" shows for ~1.5s then fades
3. Reload again without clearing sessionStorage — confirm splash does NOT show

### Push notifications
1. After OneSignal account is set up and App ID is added to `index.html`
2. Load app → wait 30s → confirm notification prompt banner appears above tab bar
3. Tap "Enable" → confirm native browser permission dialog appears
4. Grant permission → go to OneSignal dashboard to confirm subscriber was registered
5. Manually trigger GitHub Action: repo → Actions → "Weekly Parsha Push Notification" → Run workflow
6. Confirm push notification arrives on device
