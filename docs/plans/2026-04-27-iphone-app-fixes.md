# iPhone App Fixes & Website Cleanup Plan

> **Status: ✅ Implemented and shipped.** Website cleanup (App Store banner, removed iOS-only features) shipped to parshamap.com. iOS-side fixes (email popup, scroll, native push) shipped via the Capacitor app at `/Users/myrons/parsha-map`. iOS app currently at version 1.6 (build 6). Kept here for historical reference only; do not re-implement.

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean up the website (revert iPhone-only features, add App Store banner), then apply the correct fixes to the Capacitor iPhone app (remove email popup, fix x-axis scroll, add native push notifications).

**Architecture:** Two branches of the same repo. `main` = parshamap.com website. `claude/app-store-submission-35YJ5` = Capacitor iOS app at `/Users/myrons/parsha-map/`. Website changes work in `/Users/myrons/Claude Projects/Parsha/`. App changes work in `/Users/myrons/parsha-map/` on a new branch from the app branch. The GitHub Action for weekly push notifications stays in the website repo since that's where the secrets live — it sends to all OneSignal subscribers regardless of platform.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Capacitor 8, OneSignal (onesignal-capacitor for native iOS push)

---

## ⚠️ Prerequisites

1. **App Store numeric ID** — needed for the smart banner meta tag. Find it at [appstoreconnect.apple.com](https://appstoreconnect.apple.com) → Your App → General → App Information → Apple ID. Looks like a 9-10 digit number. Plug it into Task 2.

---

## PART 1: Website (`/Users/myrons/Claude Projects/Parsha/`, `main` branch)

---

## Task 1: Remove iPhone-specific features from website

The SplashScreen, NotificationPrompt, and OneSignal web push were added to the wrong repo. Keep the x-axis fixes (they help all mobile users). Keep the GitHub Action (it'll send to native app subscribers).

**Files:**
- Delete: `src/components/SplashScreen.tsx`
- Delete: `src/components/NotificationPrompt.tsx`
- Delete: `public/OneSignalSDKWorker.js`
- Modify: `src/App.tsx`
- Modify: `index.html`

### Step 1: Delete the three files
```bash
cd "/Users/myrons/Claude Projects/Parsha"
rm src/components/SplashScreen.tsx
rm src/components/NotificationPrompt.tsx
rm public/OneSignalSDKWorker.js
```

### Step 2: Clean up App.tsx

Read `src/App.tsx` first. Remove all of these (read the file to get current line numbers):

1. Import line: `import { SplashScreen } from './components/SplashScreen'`
2. Import line: `import { NotificationPrompt } from './components/NotificationPrompt'`
3. State: `const [showSplash, setShowSplash] = useState(...)`
4. Handler: `function handleSplashDone() { ... }`
5. Render: `{showSplash && <SplashScreen onDone={handleSplashDone} />}`
6. Render: `<NotificationPrompt />`

**Keep untouched:**
- `style={{ touchAction: 'pan-y' }}` on the text tab div — this stays
- Everything else in App.tsx — do not touch

### Step 3: Remove OneSignal from index.html

Read `index.html`. Find and remove only these lines (the OneSignal comment + 2 script tags):
```html
<!-- OneSignal Web Push -->
<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer></script>
<script>
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  OneSignalDeferred.push(async function(OneSignal) {
    await OneSignal.init({
      appId: "bf551fe6-a3b9-4d4e-b36f-bd45ae2e2db5",
      notifyButton: { enable: false },
      allowLocalhostAsSecureOrigin: true,
    });
  });
</script>
```

### Step 4: TypeScript check
```bash
cd "/Users/myrons/Claude Projects/Parsha"
npx tsc --noEmit
```
Expected: no errors

### Step 5: Commit
```bash
git add -A
git commit -m "revert: remove iPhone-only features from website (splash, web push prompt)"
```

---

## Task 2: Add App Store banner to website + verify mobile/desktop layout

Replace the removed newsletter popup slot with two things:
1. **Apple Smart Banner** — iOS Safari automatically shows a native "Open in App" / "Get" bar at the top of the page. Zero effort, just a meta tag.
2. **Custom download prompt** — a subtle banner for the first visit (mobile users who don't have the app) with an App Store badge link.

**Desktop must be unaffected:** The `AppStoreBanner` component already guards with a mobile user-agent check — desktop users never see it. After implementing, verify the desktop 3-column layout renders correctly and no new elements appear on desktop.

**Mobile layout check:** The banner uses `fixed bottom-20` to sit above the mobile tab bar (h-16 = 4rem, bottom-20 = 5rem gives clearance). Verify it doesn't overlap the tab bar.

**Files:**
- Modify: `index.html`
- Create: `src/components/AppStoreBanner.tsx`
- Modify: `src/App.tsx`

### Step 1: Add Apple Smart Banner meta tag to index.html

In `index.html`, inside `<head>`, add this line after the existing apple meta tags (around line 11):
```html
<meta name="apple-itunes-app" content="app-id=YOUR_APP_STORE_ID">
```
Replace `YOUR_APP_STORE_ID` with the numeric App Store ID (from Prerequisites above).

This is all that's needed for iOS Safari to show the native "Get" banner automatically.

### Step 2: Create AppStoreBanner component

Create `src/components/AppStoreBanner.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const BANNER_KEY = 'app-banner-dismissed'

export function AppStoreBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(BANNER_KEY)) return
    // Only show on mobile (iOS or Android)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) return
    // Delay slightly so it doesn't flash on load
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function handleDismiss() {
    setVisible(false)
    localStorage.setItem(BANNER_KEY, '1')
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-3 right-3 z-[2000] rounded-xl bg-surface-container-high shadow-lg border border-outline-variant p-3 flex items-center gap-3">
      <img src="/icon-192.png" alt="Parsha Map" className="w-10 h-10 rounded-xl shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="font-label text-xs font-semibold text-on-surface">Parsha Map</p>
        <p className="font-label text-[10px] text-on-surface-variant">Better on the iPhone app</p>
      </div>
      <a
        href="https://apps.apple.com/app/id YOUR_APP_STORE_ID"
        target="_blank"
        rel="noreferrer"
        className="shrink-0 px-3 py-1.5 bg-primary text-on-primary rounded-lg font-label text-xs font-semibold"
        onClick={handleDismiss}
      >
        Get App
      </a>
      <button
        onClick={handleDismiss}
        className="shrink-0 p-1 text-on-surface-variant"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
```

Replace `YOUR_APP_STORE_ID` in the `href` with the numeric App Store ID.

### Step 3: Wire AppStoreBanner into App.tsx

Add import near the top:
```tsx
import { AppStoreBanner } from './components/AppStoreBanner'
```

In the mobile layout section, add `<AppStoreBanner />` inside the tab content wrapper, alongside where `<NotificationPrompt />` used to be:
```tsx
<div className="flex-1 min-h-0 relative overflow-hidden">
  <AppStoreBanner />
  {/* ... existing tab divs ... */}
```

### Step 4: TypeScript check
```bash
npx tsc --noEmit
```

### Step 5: Commit and push
```bash
git add -A
git commit -m "feat: add App Store download banner for mobile website visitors"
git push origin main
```

---

## PART 2: Capacitor iPhone App (`/Users/myrons/parsha-map/`)

Work on a new branch from the current app branch.

```bash
cd /Users/myrons/parsha-map
git checkout -b feat/iphone-fixes
```

---

## Task 3: Remove email popup from Capacitor app

The Capacitor app still has `NewsletterModal.tsx` and its 50s auto-show timer.

**Files:**
- Delete: `src/components/NewsletterModal.tsx`
- Modify: `src/App.tsx`

### Step 1: Delete the file
```bash
rm src/components/NewsletterModal.tsx
```

### Step 2: Clean up App.tsx

Read `src/App.tsx`. Remove:
1. `import { NewsletterModal } from './components/NewsletterModal'`
2. `Mail` from lucide-react imports
3. `const [newsletterOpen, setNewsletterOpen] = useState(false)`
4. The 50s auto-show `useEffect` block (`NEWSLETTER_KEY`, `THIRTY_DAYS`, timer)
5. `<NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />`
6. Desktop Subscribe button (with `Mail` icon and `onClick={() => setNewsletterOpen(true)}`)
7. Mobile Subscribe button (with `Mail size={15}` and `onClick={() => setNewsletterOpen(true)}`)

### Step 3: TypeScript check
```bash
npx tsc --noEmit
```

### Step 4: Commit
```bash
git add -A
git commit -m "feat: remove newsletter email popup from iPhone app"
```

---

## Task 4: Fix x-axis horizontal scroll in Capacitor app

The app already has `overflow-x-hidden` on the text tab container (from commit `d947058`) but still needs `touch-action: pan-y` (the CSS-only fix doesn't stop iOS rubber-band momentum) and `overflow-x: hidden` on the document root.

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`

### Step 1: Add touch-action to App.tsx

Read `src/App.tsx`. Find the text tab div (it has `overflow-y-auto overflow-x-hidden bg-surface-container-low`). Add `style={{ touchAction: 'pan-y' }}`:

```tsx
<div className={`absolute inset-0 overflow-y-auto overflow-x-hidden bg-surface-container-low ${mobileTab === 'text' ? '' : 'hidden'}`} style={{ touchAction: 'pan-y' }}>
```

### Step 2: Add overflow-x: hidden to index.css

Read `src/index.css`. Find the `html, body, #root` block in `@layer base`. Add `overflow-x: hidden;`:

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

### Step 3: TypeScript check
```bash
npx tsc --noEmit
```

### Step 4: Commit
```bash
git add src/App.tsx src/index.css
git commit -m "fix: prevent horizontal scroll/drift on iPhone text tab"
```

---

## Task 5: Configure splash screen for Capacitor app

The `@capacitor/splash-screen` plugin is already installed. Currently `launchShowDuration: 0` hides it immediately. We want a ~1.5s branded splash: app icon centered on the dark background (`#0f172a`).

The cleanest approach is to generate proper splash assets from the existing icon using `@capacitor/assets`, then set a duration.

**Files:**
- Modify: `capacitor.config.ts`
- Run: `npx @capacitor/assets generate` (regenerates native splash images)

### Step 1: Add a splash source image

The `Resources/` folder already has `icon.png`. Add a `splash.png` there — it should be a centered logo on dark background, at least 2732×2732px. The simplest approach: copy the existing icon as splash source (Capacitor assets tool will add the dark background):

```bash
cp Resources/icon.png Resources/splash.png
```

### Step 2: Update capacitor.config.ts

Find the `SplashScreen` plugin config and update it:

```ts
SplashScreen: {
  launchShowDuration: 1500,
  launchAutoHide: true,
  backgroundColor: '#fcf9f0',
  androidSplashResourceName: 'splash',
  showSpinner: false,
  splashFullScreen: true,
  splashImmersive: true,
},
```

### Step 3: Regenerate splash assets

```bash
npx @capacitor/assets generate --ios
```

Expected: generates all required sizes in `ios/App/App/Assets.xcassets/Splash.imageset/`

### Step 4: Sync
```bash
npx cap sync ios
```

### Step 5: Commit
```bash
git add capacitor.config.ts Resources/splash.png ios/
git commit -m "feat: enable 1.5s branded splash screen on launch"
```

---

## Task 6: Add native push notifications via OneSignal

OneSignal has a Capacitor SDK (`onesignal-capacitor`) that integrates with Apple Push Notification Service (APNs). It uses the same OneSignal App ID already configured for the website, so the same GitHub Action sends notifications to both web and native subscribers.

**Files:**
- Modify: `package.json` (install)
- Modify: `capacitor.config.ts`
- Modify: `src/App.tsx`
- Modify: `ios/App/App/AppDelegate.swift`
- New: `ios/App/App/App.entitlements` (if it doesn't exist)

### Step 1: Install OneSignal Capacitor plugin
```bash
npm install onesignal-capacitor
```

### Step 2: Initialize OneSignal in App.tsx

Read `src/App.tsx`. Add import at top:
```tsx
import OneSignal from 'onesignal-capacitor'
```

Add a `useEffect` inside the App component (near the other useEffects):
```tsx
useEffect(() => {
  OneSignal.setAppId('bf551fe6-a3b9-4d4e-b36f-bd45ae2e2db5')
  OneSignal.setNotificationOpenedHandler((notification) => {
    console.log('OneSignal notification opened:', notification)
  })
  // Ask for permission after 5 seconds
  const timer = setTimeout(() => {
    OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
      console.log('Push notification permission:', accepted)
    })
  }, 5000)
  return () => clearTimeout(timer)
}, [])
```

### Step 3: Sync to iOS
```bash
npx cap sync ios
```
Expected: "✔ Updating iOS plugins" and "✔ Copying web assets to iOS"

### Step 4: Add Push Notifications capability in Xcode

Open Xcode:
```bash
npx cap open ios
```

In Xcode:
1. Click on "App" in the project navigator (top-level target)
2. Go to "Signing & Capabilities" tab
3. Click "+ Capability"
4. Add "Push Notifications"
5. Add "Background Modes" → check "Remote notifications"

This creates/updates `App.entitlements` with `aps-environment = development` (Xcode handles this automatically).

### Step 5: Verify AppDelegate.swift

Read `ios/App/App/AppDelegate.swift`. Capacitor's OneSignal plugin handles APNs registration automatically via method swizzling — no manual changes to AppDelegate needed. Just verify the file still has the standard Capacitor boilerplate and hasn't been modified.

### Step 6: Commit the JS/config changes
```bash
git add package.json package-lock.json src/App.tsx capacitor.config.ts
git commit -m "feat: add OneSignal native push notifications to iPhone app"
```

---

## Task 7: Rebuild and sync Capacitor app

### Step 1: Build the web assets
```bash
cd /Users/myrons/parsha-map
npm run build
```
Expected: `dist/` updated with new build

### Step 2: Sync to iOS
```bash
npx cap sync ios
```
Expected: "✔ Copying web assets" and "✔ Updating iOS plugins"

### Step 3: Test in Xcode simulator
```bash
npx cap open ios
```
In Xcode: select a simulator → Product → Run

Check:
- App launches with native splash screen
- No email popup appears at any point
- Text tab: swipe diagonally → no horizontal drift
- After 5 seconds: iOS permission dialog for notifications appears

### Step 4: Push the branch
```bash
git push origin feat/iphone-fixes
```

---

## Verification Checklist

### Website (parshamap.com)
- [ ] No splash screen on page load
- [ ] No notification prompt anywhere
- [ ] No OneSignal scripts loading (check Network tab)
- [ ] Email popup gone ✓ (already done)
- [ ] On iPhone Safari: native "Get" bar appears at top (once App Store ID is added)
- [ ] After 3s on mobile: "Better on the iPhone app" banner appears
- [ ] x-axis scroll: no horizontal drift on text tab

### Capacitor iPhone App
- [ ] No email popup after 50s
- [ ] Text tab: no horizontal drift on swipe
- [ ] On first launch: iOS permission dialog for notifications
- [ ] Accept notifications → check OneSignal dashboard for new subscriber
- [ ] Manually trigger GitHub Action → notification arrives on device
