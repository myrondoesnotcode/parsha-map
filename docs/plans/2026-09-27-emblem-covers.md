# Emblem covers

Branch `art/emblem-covers` (from `redesign/daylight`). One papercut emblem per parsha, all 54, replacing the Doré/stock images. They are drawn as layered SVG in the Daylight palette and animated in code (`src/redesign/art/`).

Review: `?art=gallery` (add `&book=exodus` to narrow), `?art=<parsha-id>` for one scene at cover size. The Lech Lecha and Vayikra stories open with theirs: `?parsha=lech-lecha&card=0&hold=1`.

## How it works
- `briefs.ts` is the source of truth: what each scene may show (`draw`), what the text leaves open (`plain`), and the verses for the caption. This page is generated from it.
- `kit.tsx` holds the shared pieces (layers, parallax, Tent entrance, flame, smoke); `scenes-<book>.tsx` holds the scenes; `STYLE.md` is the drawing guide.
- Each scene has 3–6 paper layers that drift and follow the pointer, and one signature motion. With reduced motion, everything holds still.
- No images or network requests. No people, faces, angels or depictions of God, and no letters.

## Sources, per parsha
Verses checked on Sefaria (JPS, 2026-09-27). Two Talmud references (Bava Batra 14a) are cited where a shape comes from there. Each cover shows "Illustrative" and its verses.


### Genesis

| Parsha | Verses | Shows | Not in the text (kept plain) |
|---|---|---|---|
| bereshit | Genesis 1:10–11, 1:16 | The two great lights, drawn as sun and moon (the text calls them the greater and the lesser light, 1:16), with stars, over land with seed-bearing plants and fruit trees, and the sea. | Sun, moon and stars shown together in one sky; the scene joins day three (plants, 1:11–12) and day four (the lights, 1:16). The text gives no fruit colour or tree species. |
| noach | Genesis 6:15–16 · 8:4 · 8:11 · 9:13 | The ark as a long box, 300 × 30 cubits in side view (10 : 1), with an opening for daylight near the top and an entrance in its side, resting on the mountains of Ararat. A rainbow in the clouds. A dove with a plucked olive leaf in its bill. | Ark roof shape and how the daylight opening looks. The scene combines moments from 8:4 to 9:13. |
| lech-lecha | Genesis 12:8 · 15:5 | Tent pitched and an altar built; a night sky full of stars. | Tent shape, altar stones; the altar is not shown burning. The dotted route line is the app’s map style, not a road. |
| vayera | Genesis 22:2, 22:9, 22:13 | A ram caught in a thicket by its horns, on a mountain; an altar with the wood laid out. | No people, no knife. Thicket plant and altar construction. |
| chayei-sarah | Genesis 24:10–11, 24:15–16 | Ten camels kneeling by the well outside the city at evening; a jar by the spring. | Well construction and the city’s look. No people. |
| toldot | Two scenes in one picture · Genesis 25:30, 25:34 · 27:3 | A bowl of lentil stew and bread; a quiver and a bow beside them. | Bowl and bread shapes. The stew is red (25:30 “that red stuff”). Joins two separate scenes: the stew (25:29–34) and the quiver and bow Isaac tells Esau to take (27:3); the caption says so. |
| vayetze | Genesis 28:11–12 | A stairway set on the ground with its top reaching the sky, small lights going up and down it (the angels, shown only as lights); nearby on the ground, the stone Jacob put under his head; night, after sunset. | Stairway form (the Hebrew sulam may be a ramp or ladder). Angels are not drawn as figures. The stone was under Jacob’s head (28:11), not at the stairway; where he lay relative to the stairway is not said, so the stone sits apart from its foot. |
| vayishlach | Genesis 32:23, 32:25, 32:32 | The ford of the Jabbok at the break of dawn, the sun rising over the stream. | No figures. The ford’s look. |
| vayeshev | Genesis 37:7, 37:9 | Joseph’s dreams: one sheaf standing upright; the sun, the moon and exactly eleven stars bowing toward it. | Joins the two dreams in one picture. How stars “bow” is drawn as leaning in. |
| miketz | Genesis 41:5–7 | Pharaoh’s dream: seven ears of grain, solid and healthy, on a single stalk; behind them seven thin ears scorched by the east wind. | The text does not say the thin ears share one stalk; draw them sprouting close behind. |
| vayigash | Genesis 45:19, 45:21, 45:27 | The wagons Joseph sent to bring Jacob and the families down to Egypt, on the road. | Number and design of the wagons; drawn empty, with no people or animals. Their cargo is not specified: the wagons were for the children, the wives and Jacob (45:19), and the provisions for Jacob went on donkeys (45:23). |
| vayechi | Genesis 49:9, 49:11 | Judah’s blessing: a lion crouching, lying down; a donkey’s foal tethered to a vine heavy with grapes. | Poetic images, drawn literally. |

### Exodus

| Parsha | Verses | Shows | Not in the text (kept plain) |
|---|---|---|---|
| shemot | Exodus 3:1–5 | At Horeb: a bush all aflame yet not consumed; a pair of sandals removed on the ground; the flock grazing. | Bush species. No figures. |
| vaera | Exodus 7:28 · 8:2 | Frogs coming up from the Nile and covering the land. | River-bank plants. |
| bo | Exodus 12:7, 12:22 | A house doorway at night, the two doorposts and the lintel marked with blood; a bunch of hyssop in a basin; the door shut until morning. | House style. Hyssop plant look. |
| beshalach | Exodus 14:19–22 | The sea split into a wall of water on the right and on the left, dry ground between; the pillar of cloud behind; night, strong east wind. | No people. Look of the pillar. |
| yitro | Exodus 19:12, 19:16–18 | Mount Sinai in smoke like a kiln, fire, lightning and a dense cloud at dawn; bounds set around the foot of the mountain. | Mountain shape; how the bounds were marked. |
| mishpatim | Exodus 24:4 | Early morning: an altar at the foot of the mountain with exactly twelve pillars. | Pillar and altar shapes. |
| terumah | Exodus 25:31–37 | The lampstand of pure gold: base and shaft, six branches (three each side), three almond-blossom cups on each branch, four on the shaft, a calyx under each pair of branches, seven lamps. | Branch shape (curved or straight is debated) and base shape. Drawn unlit: it is being made. |
| tetzaveh | Exodus 28:15–21 | The breastpiece: square, of gold, blue, purple and crimson yarns and linen, set with twelve stones in four rows of three, each framed in gold. Colours follow the JPS names: carnelian, chrysolite, emerald / turquoise, sapphire, amethyst / jacinth, agate, crystal / beryl, lapis lazuli, jasper. | The stones’ identities are uncertain; the names engraved on them are shown as marks, not letters. |
| ki-tisa | Exodus 32:15–16 · 34:1 · Bava Batra 14a | The two stone tablets, inscribed on both surfaces, square (six by six handbreadths, per the Talmud), light around them. | Writing shown as incised marks, not letters. No golden calf. |
| vayakhel | Exodus 35:22–26 · 36:6–7 | The gifts piled high, more than enough: gold brooches, earrings, rings; blue, purple and crimson yarn and linen; goats’ hair; ram skins; silver and copper; acacia wood. | Object shapes. |
| pekudei | Exodus 40:34–38 | The finished Tent of Meeting with the cloud resting over it and fire in the cloud by night. | Cloud look. Uses the kit’s Tent entrance (Ex 26:36–37). |

### Leviticus

| Parsha | Verses | Shows | Not in the text (kept plain) |
|---|---|---|---|
| vayikra | Leviticus 1 · 6:6 · Exodus 27:1–2, 40:6 | The copper altar (square, horns on the four corners) before the Tent’s entrance, its fire always burning, smoke rising. | Flame shape; the courtyard is left out. |
| tzav | Leviticus 8:2, 8:26 | For the ordination: the basket of unleavened bread with cakes, oil bread and wafers; the flask of anointing oil; two rams. | Basket, bread and flask shapes. |
| shemini | Leviticus 11:3, 11:9, 11:21–22 | Signs of animals that may be eaten: an ox (cloven hoofs, chews the cud), a fish with fins and scales, a locust with jumping legs. | Ox chosen as an example (cattle are permitted, Deut 14:4). |
| tazria | Leviticus 12:6–8 | Two turtledoves at the entrance of the Tent of Meeting. | Bird drawing follows the European turtle dove. |
| metzora | Leviticus 14:4–7 | Purification: a live bird set free, flying over the open country; cedar wood, crimson yarn and hyssop; an earthen vessel of fresh water. | No slaughter or blood shown. |
| acharei-mot | Leviticus 16:7–10 | Two he-goats standing at the entrance of the Tent of Meeting, a lot beside each. | What the lots looked like; drawn as plain tokens. |
| kedoshim | Leviticus 19:9–10 | A reaped field with its edges left standing and gleanings on the ground; a vineyard with fallen fruit left. | Field and vine look. |
| emor | Leviticus 23:40, 23:42 | The fruit of the hadar tree, palm branches, boughs of leafy trees and willows of the brook; a booth. | Citron and myrtle are the traditional identifications (the text is uncertain). Booth construction. |
| behar | Leviticus 25:3–4, 25:9 | The land resting in the seventh year: an unsown field and an unpruned vineyard; the horn sounded. | Horn drawn as a ram’s horn (shofar). |
| bechukotai | Leviticus 26:4–5, 26:13 | Rain in its season over land yielding produce and trees heavy with fruit; the bars of a yoke broken on the ground. | Yoke design. |

### Numbers

| Parsha | Verses | Shows | Not in the text (kept plain) |
|---|---|---|---|
| bamidbar | Numbers 2:2 | Tents camped around the Tent of Meeting at a distance, each group with its banner. | Four groups, after the four camps of Numbers 2. Banner colours and emblems are not in the text; all drawn plain orange. |
| nasso | Numbers 7:3 | Before the Tabernacle: exactly six carts and twelve oxen, two oxen to each cart. | Cart design. |
| behaalotecha | Numbers 9:17 · 10:2 | Two trumpets of hammered silver; the cloud lifting from the Tent, the signal to set out. | Trumpet shape. |
| shelach | Numbers 13:23 | In the wadi Eshcol: a branch with a single huge cluster of grapes on a carrying frame, with pomegranates and figs. | The frame is shown resting; no people. |
| korach | Numbers 17:23 | Aaron’s staff that sprouted, blossomed and bore almonds. | Staff shape. The other staffs are not shown. |
| chukat | Numbers 20:11 | Water pouring out of the rock in abundance; the livestock drinking. | No figures. Rock shape. |
| balak | Numbers 23:28–29 · 24:2, 24:5–6 | From the peak of Peor: exactly seven altars; below, Israel encamped tribe by tribe, the tents spread like palm groves beside a river. | No figures. Altar shapes. |
| pinchas | Numbers 28:3–4 | The daily offering: two yearling lambs, one for the morning and one for twilight, under a sky that is dawn on one side and dusk on the other. | Split sky is a device, not a scene. |
| matot | Numbers 32:1, 32:16 | The lands of Jazer and Gilead, good for cattle; sheepfolds built for the flocks. | Fold construction. |
| masei | Numbers 33:5–49 | The journey as a dotted route: Rameses and the 41 camps listed after it (42 stops), ending at the steppes of Moab by the Jordan. | The route’s shape is symbolic, not a map. |

### Deuteronomy

| Parsha | Verses | Shows | Not in the text (kept plain) |
|---|---|---|---|
| devarim | Deuteronomy 1:1, 1:5 | On the other side of the Jordan, in the land of Moab: the river with the land beyond it. | Landscape look. |
| vaetchanan | Deuteronomy 6:9 | A house doorpost and a gate with the words inscribed on them. | The small cases on the right doorpost and the gate follow Jewish practice (mezuzah); the text says only “inscribe them”. No writing is shown. |
| ekev | Deuteronomy 8:7–8 | A land of streams and springs; wheat, barley, vines, figs, pomegranates, olive trees and honey. | Honey drawn as a jar (tradition reads it as date honey). |
| reeh | Deuteronomy 11:29–30 | Mount Gerizim and Mount Ebal facing each other, the terebinths of Moreh between. | Mountain shapes. |
| shoftim | Deuteronomy 20:19 | Fruit trees left standing outside a besieged city’s walls. | City and tree look. |
| ki-teitzei | Deuteronomy 22:6–7 | A bird’s nest in a tree by the road, with eggs; the mother bird flying away. | Bird species. |
| ki-tavo | Deuteronomy 26:2 | A basket of first fruits of the soil. | Which fruits: drawn from the land’s produce in 8:8 (wheat, grapes, figs, pomegranates, olives); dates stand for its “honey”, as tradition reads it. |
| nitzavim | Deuteronomy 30:11–14, 30:19 | Not in the heavens, not beyond the sea: a wide sky and a sea horizon, and close at hand a young green shoot (“choose life”). | Symbolic. |
| vayeilech | Deuteronomy 31:24 | The written book of Teaching, finished to the end, rolled as a scroll. | Scroll form follows tradition: a Torah scroll is wound on two rollers (Bava Batra 14a). Writing shown as abstract lines. |
| haazinu | Deuteronomy 32:1–2, 32:11 | Rain and dew on young growth; an eagle spreading its wings over its nest of young. | Poetic images, drawn literally. |
| vzot-habracha | Deuteronomy 34:1–3 | The view from Mount Nebo, opposite Jericho: the land spread out, the Valley of Jericho with its palm trees, the Western Sea in the far distance. | Landscape simplified. No figure. |

## Known soft spots
- Vayakhel: the gold reads more like a tower than a pile.
- Beshalach: the pillar of cloud is a stack of puffs.
- Yitro: fire above a cloud ring can read as a volcano; the mountain is drawn in desert stone to soften that.

## Next
- Wire covers into every story as stories get written (today only Lech Lecha and Vayikra have stories).
- Optional: a raster texture pass (needs an image model; not set up on this machine).
