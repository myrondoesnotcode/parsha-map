/**
 * One emblem per parsha. Each brief was checked against the verses on Sefaria (JPS)
 * on 2026-09-27. `draw` is what the picture may show; `plain` lists what the text does
 * not specify, which the drawing must keep generic (and the doc records).
 * No people, faces, angels or depictions of God in any scene.
 */
export type Brief = {
  id: string
  refs: string
  tone: 'night' | 'day'
  draw: string
  plain?: string
}

export const BRIEFS: Brief[] = [
  // ——— Genesis
  { id: 'bereshit', refs: 'Genesis 1:10–11, 1:16', tone: 'day', draw: 'The two great lights, drawn as sun and moon (the text calls them the greater and the lesser light, 1:16), with stars, over land with seed-bearing plants and fruit trees, and the sea.', plain: 'Sun, moon and stars shown together in one sky; the scene joins day three (plants, 1:11–12) and day four (the lights, 1:16). The text gives no fruit colour or tree species.' },
  { id: 'noach', refs: 'Genesis 6:15–16 · 8:4 · 8:11 · 9:13', tone: 'day', draw: 'The ark as a long box, 300 × 30 cubits in side view (10 : 1), with an opening for daylight near the top and an entrance in its side, resting on the mountains of Ararat. A rainbow in the clouds. A dove with a plucked olive leaf in its bill.', plain: 'Ark roof shape and how the daylight opening looks. The scene combines moments from 8:4 to 9:13.' },
  { id: 'lech-lecha', refs: 'Genesis 12:8 · 15:5', tone: 'night', draw: 'Tent pitched and an altar built; a night sky full of stars.', plain: 'Tent shape, altar stones; the altar is not shown burning. The dotted route line is the app’s map style, not a road.' },
  { id: 'vayera', refs: 'Genesis 22:2, 22:9, 22:13', tone: 'day', draw: 'A ram caught in a thicket by its horns, on a mountain; an altar with the wood laid out.', plain: 'No people, no knife. Thicket plant and altar construction.' },
  { id: 'chayei-sarah', refs: 'Genesis 24:10–11, 24:15–16', tone: 'day', draw: 'Ten camels kneeling by the well outside the city at evening; a jar by the spring.', plain: 'Well construction and the city’s look. No people.' },
  { id: 'toldot', refs: 'Genesis 25:30, 25:34 · 27:3', tone: 'day', draw: 'A bowl of lentil stew and bread; a quiver and a bow beside them.', plain: 'Bowl and bread shapes. The stew is red (25:30 “that red stuff”).' },
  { id: 'vayetze', refs: 'Genesis 28:11–12', tone: 'night', draw: 'A stairway set on the ground with its top reaching the sky, small lights going up and down it (the angels, shown only as lights); nearby on the ground, the stone Jacob put under his head; night, after sunset.', plain: 'Stairway form (the Hebrew sulam may be a ramp or ladder). Angels are not drawn as figures. The stone was under Jacob’s head (28:11), not at the stairway; where he lay relative to the stairway is not said, so the stone sits apart from its foot.' },
  { id: 'vayishlach', refs: 'Genesis 32:23, 32:25', tone: 'day', draw: 'The Jabbok at the break of dawn: first light behind the hills, the sun not yet up, over the stream and its ford.', plain: 'No figures. The ford’s look. Jacob crossed at night (32:23); the sun itself rose as he passed Penuel (32:32), how far from the ford isn’t given, so it is not drawn.' },
  { id: 'vayeshev', refs: 'Genesis 37:7, 37:9', tone: 'night', draw: 'Joseph’s dreams: one sheaf standing upright; the sun, the moon and exactly eleven stars bowing toward it.', plain: 'Joins the two dreams in one picture. How stars “bow” is drawn as leaning in.' },
  { id: 'miketz', refs: 'Genesis 41:5–7', tone: 'day', draw: 'Pharaoh’s dream: seven ears of grain, solid and healthy, on a single stalk; behind them seven thin ears scorched by the east wind.', plain: 'The text does not say the thin ears share one stalk; draw them sprouting close behind.' },
  { id: 'vayigash', refs: 'Genesis 45:19, 45:21, 45:27', tone: 'day', draw: 'The wagons Joseph sent to bring Jacob and the families down to Egypt, on the road.', plain: 'Number and design of the wagons; drawn empty, with no people or animals. Their cargo is not specified: the wagons were for the children, the wives and Jacob (45:19), and the provisions for Jacob went on donkeys (45:23).' },
  { id: 'vayechi', refs: 'Genesis 49:9, 49:11', tone: 'day', draw: 'Judah’s blessing: a lion crouching, lying down; a donkey’s foal tethered to a vine heavy with grapes.', plain: 'Poetic images, drawn literally.' },
  // ——— Exodus
  { id: 'shemot', refs: 'Exodus 3:1–5', tone: 'day', draw: 'At Horeb: a bush all aflame yet not consumed; a pair of sandals removed on the ground; the flock grazing.', plain: 'Bush species. No figures.' },
  { id: 'vaera', refs: 'Exodus 7:28 · 8:2', tone: 'day', draw: 'Frogs coming up from the Nile and covering the land.', plain: 'River-bank plants.' },
  { id: 'bo', refs: 'Exodus 12:7, 12:22', tone: 'night', draw: 'A house doorway at night, the two doorposts and the lintel marked with blood; a bunch of hyssop in a basin; the door shut until morning.', plain: 'House style. Hyssop plant look.' },
  { id: 'beshalach', refs: 'Exodus 14:19–22', tone: 'night', draw: 'The sea split into a wall of water on the right and on the left, dry ground between; the pillar of cloud behind; night, strong east wind.', plain: 'No people. Look of the pillar.' },
  { id: 'yitro', refs: 'Exodus 19:12, 19:16–18', tone: 'day', draw: 'Mount Sinai in smoke like a kiln, fire, lightning and a dense cloud at dawn; bounds set around the foot of the mountain.', plain: 'Mountain shape; how the bounds were marked.' },
  { id: 'mishpatim', refs: 'Exodus 24:4', tone: 'day', draw: 'Early morning: an altar at the foot of the mountain with exactly twelve pillars.', plain: 'Pillar and altar shapes.' },
  { id: 'terumah', refs: 'Exodus 25:31–37', tone: 'day', draw: 'The lampstand of pure gold: base and shaft, six branches (three each side), three almond-blossom cups on each branch, four on the shaft, a calyx under each pair of branches, seven lamps.', plain: 'Branch shape (curved or straight is debated) and base shape. Drawn unlit: it is being made.' },
  { id: 'tetzaveh', refs: 'Exodus 28:15–21', tone: 'day', draw: 'The breastpiece: square, of gold, blue, purple and crimson yarns and linen, set with twelve stones in four rows of three, each framed in gold. Colours follow the JPS names: carnelian, chrysolite, emerald / turquoise, sapphire, amethyst / jacinth, agate, crystal / beryl, lapis lazuli, jasper.', plain: 'The stones’ identities are uncertain; the names engraved on them are shown as marks, not letters.' },
  { id: 'ki-tisa', refs: 'Exodus 32:15–16 · 34:1 · Bava Batra 14a', tone: 'day', draw: 'The two stone tablets, inscribed on both surfaces, square (six by six handbreadths, per the Talmud), light around them.', plain: 'Writing shown as incised marks, not letters. No golden calf.' },
  { id: 'vayakhel', refs: 'Exodus 35:22–26 · 36:6–7', tone: 'day', draw: 'The gifts piled high, more than enough: gold brooches, earrings, rings; blue, purple and crimson yarn and linen; goats’ hair; ram skins; silver and copper; acacia wood.', plain: 'Object shapes.' },
  { id: 'pekudei', refs: 'Exodus 40:34–38', tone: 'night', draw: 'The finished Tent of Meeting with the cloud resting over it and fire in the cloud by night.', plain: 'Cloud look. Uses the kit’s Tent entrance (Ex 26:36–37).' },
  // ——— Leviticus
  { id: 'vayikra', refs: 'Leviticus 1 · 6:6 · Exodus 27:1–2, 40:6', tone: 'day', draw: 'The copper altar (square, horns on the four corners) before the Tent’s entrance, its fire always burning, smoke rising.', plain: 'Flame shape; the courtyard is left out.' },
  { id: 'tzav', refs: 'Leviticus 8:2, 8:26', tone: 'day', draw: 'For the ordination: the basket of unleavened bread with cakes, oil bread and wafers; the flask of anointing oil; two rams.', plain: 'Basket, bread and flask shapes.' },
  { id: 'shemini', refs: 'Leviticus 11:3, 11:9, 11:21–22', tone: 'day', draw: 'Signs of animals that may be eaten: an ox (cloven hoofs, chews the cud), a fish with fins and scales, a locust with jumping legs.', plain: 'Ox chosen as an example (cattle are permitted, Deut 14:4).' },
  { id: 'tazria', refs: 'Leviticus 12:6–8', tone: 'day', draw: 'Two turtledoves at the entrance of the Tent of Meeting.', plain: 'Bird drawing follows the European turtle dove.' },
  { id: 'metzora', refs: 'Leviticus 14:4–7', tone: 'day', draw: 'Purification: a live bird set free, flying over the open country; cedar wood, crimson yarn and hyssop; an earthen vessel of fresh water.', plain: 'No slaughter or blood shown.' },
  { id: 'acharei-mot', refs: 'Leviticus 16:7–10', tone: 'day', draw: 'Two he-goats standing at the entrance of the Tent of Meeting, a lot beside each.', plain: 'What the lots looked like; drawn as plain tokens.' },
  { id: 'kedoshim', refs: 'Leviticus 19:9–10', tone: 'day', draw: 'A reaped field with its edges left standing and gleanings on the ground; a vineyard with fallen fruit left.', plain: 'Field and vine look.' },
  { id: 'emor', refs: 'Leviticus 23:40, 23:42', tone: 'day', draw: 'The fruit of the hadar tree, palm branches, boughs of leafy trees and willows of the brook; a booth.', plain: 'Citron and myrtle are the traditional identifications (the text is uncertain). Booth construction.' },
  { id: 'behar', refs: 'Leviticus 25:3–4, 25:9', tone: 'day', draw: 'The land resting in the seventh year: an unsown field and an unpruned vineyard; the horn sounded.', plain: 'Horn drawn as a ram’s horn (shofar).' },
  { id: 'bechukotai', refs: 'Leviticus 26:4–5, 26:13', tone: 'day', draw: 'Rain in its season over land yielding produce and trees heavy with fruit; the bars of a yoke broken on the ground.', plain: 'Yoke design.' },
  // ——— Numbers
  { id: 'bamidbar', refs: 'Numbers 2:2', tone: 'day', draw: 'Tents camped around the Tent of Meeting at a distance, each group with its banner.', plain: 'Four groups, after the four camps of Numbers 2. Banner colours and emblems are not in the text; all drawn plain orange.' },
  { id: 'nasso', refs: 'Numbers 7:3', tone: 'day', draw: 'Before the Tabernacle: exactly six carts and twelve oxen, two oxen to each cart.', plain: 'Cart design.' },
  { id: 'behaalotecha', refs: 'Numbers 9:17 · 10:2', tone: 'day', draw: 'Two trumpets of hammered silver; the cloud lifting from the Tent, the signal to set out.', plain: 'Trumpet shape.' },
  { id: 'shelach', refs: 'Numbers 13:23', tone: 'day', draw: 'In the wadi Eshcol: a branch with a single huge cluster of grapes on a carrying frame, with pomegranates and figs.', plain: 'The frame is shown resting; no people.' },
  { id: 'korach', refs: 'Numbers 17:23', tone: 'day', draw: 'Aaron’s staff that sprouted, blossomed and bore almonds.', plain: 'Staff shape. The other staffs are not shown.' },
  { id: 'chukat', refs: 'Numbers 20:11', tone: 'day', draw: 'Water pouring out of the rock in abundance; the livestock drinking.', plain: 'No figures. Rock shape.' },
  { id: 'balak', refs: 'Numbers 23:28–29 · 24:2, 24:5–6', tone: 'day', draw: 'From the peak of Peor: exactly seven altars; below, Israel encamped tribe by tribe, the tents spread like palm groves beside a river.', plain: 'No figures. Altar shapes.' },
  { id: 'pinchas', refs: 'Numbers 28:3–4', tone: 'day', draw: 'The daily offering: two yearling lambs, one for the morning and one for twilight, under a sky that is dawn on one side and dusk on the other.', plain: 'Split sky is a device, not a scene.' },
  { id: 'matot', refs: 'Numbers 32:1, 32:16', tone: 'day', draw: 'The lands of Jazer and Gilead, good for cattle; sheepfolds built for the flocks.', plain: 'Fold construction.' },
  { id: 'masei', refs: 'Numbers 33:5–49', tone: 'night', draw: 'The journey as a dotted route: Rameses and the 41 camps listed after it (42 stops), ending at the steppes of Moab by the Jordan.', plain: 'The route’s shape is symbolic, not a map.' },
  // ——— Deuteronomy
  { id: 'devarim', refs: 'Deuteronomy 1:1, 1:5', tone: 'day', draw: 'On the other side of the Jordan, in the land of Moab: the river with the land beyond it.', plain: 'Landscape look.' },
  { id: 'vaetchanan', refs: 'Deuteronomy 6:9', tone: 'day', draw: 'A house doorpost and a gate with the words inscribed on them.', plain: 'The small cases on the right doorpost and the gate follow Jewish practice (mezuzah); the text says only “inscribe them”. No writing is shown.' },
  { id: 'ekev', refs: 'Deuteronomy 8:7–8', tone: 'day', draw: 'A land of streams and springs; wheat, barley, vines, figs, pomegranates, olive trees and honey.', plain: 'Honey drawn as a jar (tradition reads it as date honey).' },
  { id: 'reeh', refs: 'Deuteronomy 11:29–30', tone: 'day', draw: 'Mount Gerizim and Mount Ebal facing each other, the terebinths of Moreh between.', plain: 'Mountain shapes.' },
  { id: 'shoftim', refs: 'Deuteronomy 20:19', tone: 'day', draw: 'Fruit trees left standing outside a besieged city’s walls.', plain: 'City and tree look.' },
  { id: 'ki-teitzei', refs: 'Deuteronomy 22:6–7', tone: 'day', draw: 'A bird’s nest in a tree by the road, with eggs; the mother bird flying away.', plain: 'Bird species.' },
  { id: 'ki-tavo', refs: 'Deuteronomy 26:2', tone: 'day', draw: 'A basket of first fruits of the soil.', plain: 'Which fruits: drawn from the land’s produce in 8:8 (wheat, grapes, figs, pomegranates, olives); dates stand for its “honey”, as tradition reads it.' },
  { id: 'nitzavim', refs: 'Deuteronomy 30:11–14, 30:19', tone: 'day', draw: 'Not in the heavens, not beyond the sea: a wide sky and a sea horizon, and close at hand a young green shoot (“choose life”).', plain: 'Symbolic.' },
  { id: 'vayeilech', refs: 'Deuteronomy 31:24', tone: 'day', draw: 'The written book of Teaching, finished to the end, rolled as a scroll.', plain: 'Scroll form follows tradition: a Torah scroll is wound on two rollers (Bava Batra 14a). Writing shown as abstract lines.' },
  { id: 'haazinu', refs: 'Deuteronomy 32:1–2, 32:11', tone: 'day', draw: 'Rain and dew on young growth; an eagle spreading its wings over its nest of young.', plain: 'Poetic images, drawn literally.' },
  { id: 'vzot-habracha', refs: 'Deuteronomy 34:1–3', tone: 'day', draw: 'The view from Mount Nebo, opposite Jericho: the land spread out, the Valley of Jericho with its palm trees, the Western Sea in the far distance.', plain: 'Landscape simplified. No figure.' },
]

export const BRIEF_BY_ID: Record<string, Brief> = Object.fromEntries(BRIEFS.map((b) => [b.id, b]))
