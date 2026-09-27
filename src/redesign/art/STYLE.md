# Emblem art: style guide

Read this before drawing a scene. The finished examples to match are `LechLecha` (`scenes-genesis.tsx`), and `Vayikra` and `Tazria` (`scenes-leviticus.tsx`).

## What a scene is
- A React component returning SVG elements, drawn in a **400 × 560** box (`W`, `H` from `kit.tsx`). It's anchored to the bottom and cropped to fill, so:
  - keep the subject inside **x 40–360, y 280–520**;
  - the top ~120 px sits under the story header, so put only sky there;
  - the bottom ~40 px fades into the sand page below, so put only ground there.
- Register it in that book's `SCENES` map: `'parsha-id': () => <Scene />`.
- Captions and verses come from `briefs.ts`, and scenes never render text or letters.

## Papercut look
- Build it from **3–5 `<Layer depth={…}>`** groups, back to front: sky (0.05–0.15), far land (0.3), middle (0.5–0.7), foreground subject (1).
- Layers with depth > 0.15 get a paper drop shadow automatically.
- Shapes are flat fills, with no strokes except thin details (ropes, stems).
  - Shade with a second, darker flat shape on one side, the way the tent and altar do it.
- Keep silhouettes simple and bold, since it must read at 200 px wide.
- Optional: `filter="url(#soft)"` for a haze band, and `fill="url(#glow)"` for warm light.

## Palette
Use `C` tokens (`sand`, `land`, `ink`, `blue`, `blueSoft`, `warm`, `water`, `muted`) plus only these accents:

| Use | Colours |
|---|---|
| Night sky | `#0e1554` → `C.blue` → `#6f7be6` |
| Night hills (far → near) | `#4a5ad6`, `#2b39b8`, `#1a2280`, `#141c6e` |
| Day sky | `#f4b27c` or `C.blueSoft` → `C.sand` |
| Desert land (far → near) | `#e6cfa8`, `C.land`, `#e2d2b2`, `#d9ccb1` |
| Greens | `#a9bf7e`, `#7d9a5a`, `#5f7d45` |
| Water | `C.water`, `#8fb3d4`, `#5d86b8` |
| Copper / wood | `#e59b62`, `#c9773f`, `#b0612f`, `#8a5a3c` |
| Gold | `#e2b04a`, `#f1cf7a` |
| Fire | `#e8573a`, `C.warm`, `#ffe2b8` |
| Yarns | blue `#2536c4`, purple `#6a3d9a`, crimson `#b3263a`, linen `#f6f0e2` |
| Animals | `#cfae98`, `#b77b4d`, `#8a6a58`, `#f6f0e2`, `#3b2a24` |

## Motion
- Give each scene **one signature motion** tied to the story, e.g.:
  - stars arriving;
  - fire flickering;
  - water pouring;
  - a bird taking off;
  - blossoms opening.
- Add one or two quiet secondary loops at most.
- Use `motion.*` from `motion/react`. Loop gently (2–8 s, ease in and out) and never flash.
- Read `const { tilt, still } = useArtMotion()`, pass `tilt` to every `Layer`, and when `still` is true render the final resting frame with no animation.
- SVG transforms need `style={{ originX: '<x>px', originY: '<y>px', transformBox: 'view-box' }}`, as in `Flame`.

## Accuracy (non-negotiable)
- Draw **only what the brief lists**. Anything in `plain` stays generic; don't add detail the text doesn't give.
- Counts are exact. If the brief says seven, there are seven; if it gives no number, don't show a countable set that implies one.
- Never draw people, faces, hands, angels or God. Show a moment through objects, animals and landscape.
- No letters, words or numbers inside the art.
- No anachronisms: no buildings, tools or clothing from later periods, and no modern objects.

## Technical
- Prefix every gradient, mask and clipPath `id` with the parsha id (e.g. `noach-sky`), because many scenes render on one page.
- Deterministic: use `rng(seed)` from the kit, not `Math.random()`.
- Only `kit.tsx`, `motion/react` and `C`. No images, fonts or network requests.

## Checking your work
The dev server is on http://localhost:5181.
- One scene at cover size: `node .claude/cdp-shot.mjs out.png "?art=<id>" 4000` with `BASE=http://localhost:5181` (run from the repo root, with `PATH=/opt/homebrew/opt/node@22/bin:$PATH`). Then look at the PNG.
- All of a book: `?art=gallery&book=exodus`, with `W=1200 H=1400` for a desktop-size sheet.
- Before calling a scene done:
  - Review it at least twice and fix what looks weak.
  - Check it against the brief line by line.
  - Run `npx tsc -b`.
