# Emblem covers — prototype

Branch `art/emblem-covers` (from `redesign/daylight`). Replaces the Doré/stock images with one papercut emblem per parsha, drawn as layered SVG in the Daylight palette and animated in code (`src/redesign/art/EmblemArt.tsx`).

Review: `?art=gallery` shows all three; `?parsha=lech-lecha&card=0&hold=1` and `?parsha=vayikra&card=0&hold=1` show them as story covers. Tazria has no story yet, so it's in the gallery only.

## How it moves
- 3–5 paper layers per scene; each drifts slowly and follows the pointer at its own depth (parallax).
- Scene motion: stars keep arriving (Lech Lecha), fire flickers and smoke rises (Vayikra), doves breathe and turn their heads (Tazria), light pulses.
- `prefers-reduced-motion`: everything holds still.
- No images or network requests. The whole file is about 22 KB of source.

## What each picture claims, and where it comes from
Texts checked on Sefaria (JPS) on 2026-09-27. Anything the text doesn't specify is drawn plain, and every cover carries an "Illustrative" caption with its verses.

| Parsha | Element | Source | Not in the text (kept plain or labelled) |
|---|---|---|---|
| Lech Lecha | Tent pitched, altar built | Gen 12:8 | Tent shape, altar stones; the altar is not shown burning |
| Lech Lecha | Night sky full of stars | Gen 15:5 "count the stars" | Joined to 12:8 in one picture; the caption gives both refs |
| Lech Lecha | Dotted route line | The app's own map route style | Symbolic, not a real road |
| Vayikra | Altar square, horns on four corners, copper | Ex 27:1–2 (front drawn 5 wide : 3 high) | — |
| Vayikra | Fire always burning | Lev 6:6 | Flame shape |
| Vayikra | Altar before the Tent's entrance | Ex 40:6 | The courtyard is left out |
| Vayikra, Tazria | Entrance screen: blue, purple, crimson yarns, linen; five gold-covered posts, copper sockets | Ex 26:36–37 | Band order and embroidery pattern; the colour of the roof covering |
| Tazria | Two turtledoves at the Tent's entrance | Lev 12:6–8 | Bird drawing follows the European turtle dove (striped neck patch) |

## Next
1. Decide on the style (papercut as built, or try risograph / stained glass).
2. A written brief per parsha (emblem + verses) for all 54, fact-checked before drawing.
3. Optional: a raster pass for texture (needs an image model; not set up on this machine).
