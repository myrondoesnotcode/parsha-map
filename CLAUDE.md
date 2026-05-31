# Parsha Map iOS — Project Guide for Claude

> Capacitor 8 wrapper of the Parsha Map web app, shipped to the App Store as **com.parshamap.app**.

## Relationship to the web repo

This repo is a **separate clone** of the website source at `/Users/myrons/Claude Projects/Parsha`, kept on its own long-lived branch `claude/app-store-submission-35YJ5`. It is **not** a submodule and does not pull web changes automatically — every time a fix lands on parshamap.com that also matters on iOS, it has to be ported here too.

**Intentional divergences from web (do not "sync"):**
- `src/main.tsx` — no React Query Devtools (stripped from shipped bundle)
- `src/App.tsx` — no `<AppStoreBanner />`; mobile header uses `paddingTop: 'env(safe-area-inset-top)'` and `minHeight: 'calc(44px + env(safe-area-inset-top))'` for the notch
- `src/components/map/PlaceDetailPanel/PlaceDetailPanel.tsx` — fixed `left-8` (web has responsive `sm:left-8`)

When porting changes, prefer file-by-file diffs: `diff -u src/foo "/Users/myrons/Claude Projects/Parsha/src/foo"`.

## Capacitor config (`capacitor.config.ts`)

- `appId: com.parshamap.app`
- `webDir: dist` — points at the Vite build output
- **No `server.url`** — set this and Apple rejects the submission as a "web clip"
- Plugins: SplashScreen (cream `#fcf9f0` bg, 1.5s, no spinner), StatusBar (dark), Keyboard (body resize)
- OneSignal iOS push is in via Swift Package Manager, not capacitor.config (see `ios/App/CapApp-SPM/`)

## Versioning

Both build numbers live in `ios/App/App.xcodeproj/project.pbxproj` (4 places — Debug + Release configs, both `App` and any extension target):

```
MARKETING_VERSION = 1.6;           ← user-visible (1.6 in App Store)
CURRENT_PROJECT_VERSION = 6;       ← build number (must increase every upload)
```

Bump rules: **build number increases every upload**, marketing version only when a real feature/fix is user-visible.

Current shipped: **1.6 (6)** — adds Israel/Diaspora toggle, fixes parsha matcher.

## Build & submit flow

```bash
# 1. Build the web bundle (compiles to dist/)
npm run build

# 2. Sync web assets into ios/App/App/public/
npx cap sync ios

# 3. Bump version in pbxproj (use sed or Xcode > General tab)
#    Both MARKETING_VERSION and CURRENT_PROJECT_VERSION

# 4. Commit web changes + version bump
git add src/ ios/App/App.xcodeproj/project.pbxproj
git commit -m "..."
git push origin claude/app-store-submission-35YJ5

# 5. Open Xcode and Archive
open ios/App/App.xcodeproj
# In Xcode:
#   - Set scheme target to "Any iOS Device (arm64)" (not a simulator)
#   - Product → Archive (1–3 min)
#   - Organizer opens → Distribute App → App Store Connect → Upload
#   - Apple processes for 5–15 min

# 6. Submit on appstoreconnect.apple.com
#   - Parsha Map → + Version or Platform → enter MARKETING_VERSION
#   - Fill release notes → Save → Add for Review → Submit for Review
```

No fastlane is configured — Archive + Distribute is GUI-driven via Xcode. Submission to Apple's review queue requires the App Store Connect web UI; there's no CLI path for that step.

## Native plugins

| Plugin | Source | Purpose |
|---|---|---|
| `@capacitor/keyboard` | npm | Body resize on keyboard show |
| `@capacitor/splash-screen` | npm | Cream-bg launch splash (1.5s) |
| `@capacitor/status-bar` | npm | Dark text on light bg |
| `onesignal-capacitor` (via SPM) | Swift Package | Native push notifications, paired with the `weekly-parsha-notify.yml` GitHub Action in the **web** repo (that's where the OneSignal app secret lives) |

## Splash + icon

- App icon: `ios/App/App/Assets.xcassets/AppIcon.appiconset/` — only the 1024×1024 `AppIcon-512@2x.png` is sourced; Apple generates the rest at build
- Splash imageset: `ios/App/App/Assets.xcassets/Splash.imageset/Contents.json` references `Default@{1,2,3}x~universal~anyany[-dark].png`. The legacy `splash-2732x2732*.png` files were deleted (unused).
- Launch storyboard: `ios/App/App/Base.lproj/LaunchScreen.storyboard` — uses `scaleAspectFit` so the logo isn't cropped on tall devices, cream `#FCF9F0` background

## Parsha-matching logic (synced from web — do not break)

`src/hooks/useAutoSelectParsha.ts` reconciles Sefaria's response with our local `parshaList.json`. The matching cascade order is **load-bearing**:

1. Exact normalized name
2. Sefaria URL start-position (book + start chapter + start verse equal a parsha's start) — picks the first half of combined parshas (`Nitzavim-Vayeilech` → `nitzavim`)
3. URL containment, verse-aware — for holiday readings inside a regular parsha
4. Loose substring (last resort, both sides ≥5 chars)

**Why this order:** before the fix shipped in commit `1d9bda2`, loose substring ran before URL matching. Sefaria returns `Sh'lach` (normalizes to `shlach`) and that substring-matched `Vayishlach` → Israel users saw the wrong parsha for ~6 weeks every year. Verified against 141 Shabbats through end of 2027.

## Common Xcode pitfalls

- **"No account for team HEM4ABVR4M"** — sign into Xcode → Settings → Accounts with the App Store Connect Apple ID
- **"Provisioning profile doesn't match"** — Release config uses Manual signing (`CODE_SIGN_STYLE = Manual`), Debug uses Automatic. For Archive (which uses Release), the provisioning profile must be downloaded/installed via Xcode → Settings → Accounts → Download Manual Profiles
- **"App Store Connect couldn't find this version"** — version 1.x must exist in App Store Connect before upload; create it via + Version or Platform first, OR upload first and create the version after (Apple accepts both orders, but the version must match)
- **Rejected as "web clip"** — `capacitor.config.ts` must NOT set `server.url`. Don't re-add it.

## Historical plans

`docs/plans/` — design docs from prior milestones:
- `2026-04-21-mobile-optimization-push-notifications.md` — splash, safe-area insets, OneSignal integration (implemented and shipped)
- `2026-03-13-desktop-three-column-layout-design.md`, `2026-03-22-scholarly-modernism-redesign*.md` — shared with web

## Common commands

```bash
npm run dev          # vite localhost (for quick UI checks; native plugins won't run)
npm run build        # tsc -b && vite build → dist/
npx cap sync ios     # copy dist/ → ios/App/App/public/, update plugins
npx cap open ios     # open Xcode workspace
npx tsc --noEmit     # typecheck
```
