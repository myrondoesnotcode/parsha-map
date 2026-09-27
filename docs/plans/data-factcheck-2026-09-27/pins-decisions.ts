// Pin decisions for Exodus–Deuteronomy (second verifier). Paste each group into the matching table in
// scripts/processGeodata.ts. OSIS in EXTRA_VERSES / DROPPED_VERSES is ENGLISH numbering (none of the refs
// below fall in a shifted range except Deut.23.4 = Hebrew Deut 23:5, converted by ENGLISH_TO_HEBREW).

// UNPINNED
  // Exodus 14:2 "before Pi-hahiroth, between Migdol and the sea, before Baal-zephon"; Numbers 33:7. The three are one camp by the sea, yet
  // OpenBible's pins scatter them 50-100 km apart and none is identified; each proposal depends on the route assumed. [EXO-72, P2-22, P2-9, P1-6]
  ababfd2: { name: 'Pi-hahiroth', note: 'where Israel camped by the sea before the crossing, "between Migdol and the sea, before Baal-zephon" (Exodus 14:2; Numbers 33:7); site unknown' },
  a411283: { name: 'Migdol 1', note: 'near the camp by the sea before the crossing (Exodus 14:2; Numbers 33:7); site unknown. "Migdol" means a fort, and several Egyptian border forts had the name' },
  a22663b: { name: 'Baal-zephon', note: 'faced the camp by the sea before the crossing (Exodus 14:2; Numbers 33:7); site unknown. Proposals range from the Mediterranean coast to the Gulf of Suez, depending on the route assumed' },
  // Exodus 13:20; Numbers 33:6 "Etham, on the edge of the wilderness". No accepted identification; OpenBible's candidates (Pithom, Tell Abu Sefeh,
  // el-Qantara, Tjaru, Ismailia) are route guesses. [EXO-79 (Etham), P1-15]
  a27d0e0: { name: 'Etham', note: 'a camp "on the edge of the wilderness" (Exodus 13:20; Numbers 33:6); site unknown' },
  // Deuteronomy 33:2 names Mount Paran beside Sinai and Seir; Rashi reads the three as separate places (Paran is where Ishmael's sons lived).
  // OpenBible pins it on Jebel Musa as "another name for Mount Sinai". [DEU-87]
  af693b8: { name: 'Mount Paran', note: 'named beside Sinai and Seir in Moses\'s blessing (Deuteronomy 33:2; also Habakkuk 3:3); site unknown' },
  // Numbers 33:30-31: a station between Hashmonah and Bene-jaakan, six stations before Mount Hor (33:37); Deuteronomy 10:6 says Aaron died at
  // Moserah. OpenBible's point is Mount Hor's own (with Hashmonah). [DEU-95, P2-12]
  a88331e: { name: 'Moseroth', note: 'a camp between Hashmonah and Bene-jaakan (Numbers 33:30-31); Deuteronomy 10:6 calls it Moserah and says Aaron died there. Site unknown' },
  // Numbers 33:29-30: the stop before Moseroth; OpenBible pins it on Moseroth's (and Mount Hor's) point. [P1-19]
  aaa8a88: { name: 'Hashmonah', note: 'a camp between Mithkah and Moseroth (Numbers 33:29-30); site unknown' },
  // Numbers 33:31-32; Deuteronomy 10:6 "Beeroth-bene-jaakan". OpenBible's only guess is Birein (score 13); both entries share it. [P1-10, DEU-97]
  a0fe2be: { name: 'Bene-jaakan', note: 'a camp between Moseroth and Hor-haggidgad (Numbers 33:31-32); Deuteronomy 10:6 calls it Beeroth-bene-jaakan. Site unknown' },
  a280f83: { name: 'Beeroth Bene-jaakan', note: '"the wells of Bene-jaakan", the camp before Moserah (Deuteronomy 10:6; Numbers 33:31-32); site unknown' },
  // Numbers 33:32-33; Deuteronomy 10:7 "Gudgod". OpenBible's three guesses score 9-10. [P1-22, DEU-97]
  a5e36e6: { name: 'Hor-haggidgad', note: 'a camp between Bene-jaakan and Jotbathah (Numbers 33:32-33), called Gudgod in Deuteronomy 10:7; site unknown' },
  // Numbers 11:1-3: the verse gives no location; OpenBible has only "within 50 km of Kibroth-hattaavah". [P2-30, DEU-97]
  a028191: { name: 'Taberah', note: 'where a fire of the LORD broke out against the people (Numbers 11:1-3; Deuteronomy 9:22); site unknown' },
  // Numbers 11:34-35; 33:16-17: between the wilderness of Sinai and Hazeroth. No identification: OpenBible's pin was a 1-vote Wadi Sa'l, its top
  // Erweis el-Ebeirig is a route guess (an Early Bronze Age camp on the traditional route). [DEU-97, P2-2]
  ae7836a: { name: 'Kibroth-hattaavah', note: '"the graves of craving", a camp between the wilderness of Sinai and Hazeroth (Numbers 11:34-35; 33:16-17); site unknown' },
  // Deuteronomy 1:1 "near Suph, between Paran and Tophel, Laban, Hazeroth, and Di-zahab". Rashi (after the Sifrei; Onkelos likewise) reads these
  // names as allusions to Israel's sins; Onkelos renders Suph as the Sea of Reeds. OpenBible's guesses score 7-17. [DEU-98]
  af725bb: { name: 'Suph', note: '"near Suph" (Deuteronomy 1:1); site unknown. Onkelos renders it "the Sea of Reeds"' },
  ad763b1: { name: 'Laban', note: 'named in Deuteronomy 1:1; site unknown. Rashi, following the Sifrei and Onkelos, reads the names in this verse as allusions to Israel\'s sins' },
  afcb77d: { name: 'Dizahab', note: 'Di-zahab (Deuteronomy 1:1); site unknown. Onkelos and Rashi read the name ("enough gold") as an allusion to the golden calf' },
  a7ecf6c: { name: 'Tophel', note: 'named in Deuteronomy 1:1; site unknown (Tafila in Edom has been proposed). Rashi, following the Sifrei and Onkelos, reads the names in this verse as allusions to Israel\'s sins' },
  // Deuteronomy 11:30 "near Gilgal, by the terebinths of Moreh"; Sotah 33b reads it loosely and puts the mountains at Shechem. OpenBible's
  // candidates score 8-16. [DEU-99]
  a84a509: { name: 'Gilgal 4', note: 'the Gilgal near Mount Gerizim and Mount Ebal, "by the terebinths of Moreh" (Deuteronomy 11:29-30); site unknown' },
  // Numbers 33:13-14: between Dophkah and Rephidim; OpenBible's only guess scores 10. [P1-12]
  a32397f: { name: 'Alush', note: 'a camp between Dophkah and Rephidim (Numbers 33:13-14); site unknown' },
  // Numbers 33:34-35: between Jotbathah and Ezion-geber; OpenBible's pin was a 1-vote guess. [P1-13]
  a7560c2: { name: 'Abronah', note: 'a camp between Jotbathah and Ezion-geber (Numbers 33:34-35); site unknown' },
  // Numbers 33:24-25: three OpenBible guesses at score 10, 150 km apart. [P1-18]
  a73af5f: { name: 'Haradah', note: 'a camp between Mount Shepher and Makheloth (Numbers 33:24-25); site unknown' },
  // Numbers 33:22-26: Kehelathah and Makheloth are separate stops (Mount Shepher and Haradah between them) but share Kuntillet Ajrud. [P1-29, P2-6]
  a32d25a: { name: 'Kehelathah', note: 'a camp between Rissah and Mount Shepher (Numbers 33:22-23); site unknown' },
  ac1fbba: { name: 'Makheloth', note: 'a camp between Haradah and Tahath (Numbers 33:25-26); site unknown' },
  // Numbers 33:23-24: OpenBible gives only "within 50 km of Haradah". [P2-15]
  a39fe14: { name: 'Mount Shepher', note: 'a camp between Kehelathah and Haradah (Numbers 33:23-24); site unknown' },
  // Numbers 33:26-29: Tahath, Terah and Mithkah share one proximity-guess point beside Kadesh, which the list reaches only at 33:36. [P2-31, P2-32, P2-10]
  abe40d1: { name: 'Tahath', note: 'a camp between Makheloth and Terah (Numbers 33:26-27); site unknown' },
  a944b90: { name: 'Terah', note: 'a camp between Tahath and Mithkah (Numbers 33:27-28); site unknown' },
  aa5f658: { name: 'Mithkah', note: 'a camp between Terah and Hashmonah (Numbers 33:28-29); site unknown' },
  // Numbers 33:20-21: OpenBible pins it on Laban (Tel Abu Seleimeh, north Sinai coast), far from both neighbours. [P2-5]
  a3e94bd: { name: 'Libnah 2', note: 'a camp between Rimmon-perez and Rissah (Numbers 33:20-21); site unknown' },
  // Numbers 33:21-22: OpenBible's 2-vote Sharma is on the Arabian coast, far from both neighbours. [P2-26]
  af04ad9: { name: 'Rissah', note: 'a camp between Libnah and Kehelathah (Numbers 33:21-22); site unknown' },
  // Numbers 33:43-44: between Punon and Iye-abarim. The pin was a 1-vote Telah; OpenBible's top, Ein Weibeh, lies west of Punon, back across the
  // Arabah from Iye-abarim, so it fits the order worse. No accepted identification. [P2-20]
  a0ef1e1: { name: 'Oboth', note: 'a camp between Punon and Iye-abarim (Numbers 21:10-11; 33:43-44); site unknown' },
  // Numbers 33:41-42: between Mount Hor and Punon. Both OpenBible candidates are name-echo guesses (1 and 8 votes). [P2-35]
  a1c6a50: { name: 'Zalmonah', note: 'a camp between Mount Hor and Punon (Numbers 33:41-42); site unknown' },
  // Numbers 22:39: the pin sits exactly on Dibon; OpenBible's candidates range from Dibon to Bamoth-baal. [P2-3]
  aeb19d6: { name: 'Kiriath-huzoth', note: 'a town of Moab where Balak brought Balaam (Numbers 22:39); site unknown' },
  // Numbers 34:7-8: on the northern border. OpenBible's three candidates tie; the pin took the lowest-ranked. [P2-14]
  a62fa2d: { name: 'Mount Hor 2', note: 'a mountain on the northern border, between the Great Sea and Lebo-hamath (Numbers 34:7-8); site unknown. Second Temple and rabbinic tradition identifies it with the Amanus (Amanah)' },
  // Numbers 21:30 (JPS: "Meaning of verse uncertain"), "Nophah, which is hard by Medeba"; the pin is the Moab region's label point. [P2-19]
  aed6b0e: { name: 'Nophah', note: 'named in the song over Moab, "hard by Medeba" (Numbers 21:30); the verse\'s meaning is uncertain and the site unknown' },
  // Numbers 13:21 "Rehob, at Lebo-hamath". The pin is Rehob of Asher near Acre; OpenBible's top (Beth-rehob) is only a Beqaa region point. [P2-24]
  ae4cd38: { name: 'Rehob 1', note: 'Rehob, at Lebo-hamath, the northern limit of the scouts\' route (Numbers 13:21); site unknown' },
  // Numbers 34:10-11: the border runs from Hazar-enan to Shepham, then "descends" to Riblah; OpenBible pins Shepham on Riblah itself. [P2-27]
  a9ba60c: { name: 'Shepham', note: 'on the eastern border, between Hazar-enan and Riblah (Numbers 34:10-11); site unknown' },
  // Numbers 32:3 ("Sebam"), 38. The pin was a 1-vote Sumia; OpenBible's top Qarn al-Qubish is an equal guess near Heshbon; neither fits better. [P2-29]
  aa10f27: { name: 'Sibmah', note: 'a town rebuilt by Reuben, listed with Heshbon and Nebo (Numbers 32:3, 38); site unknown' },
  // Numbers 21:14: named only in a quoted fragment ("its text and meaning are uncertain", JPS); Rashi reads "et vahev" as "what He gave". [P2-33]
  adec54b: { name: 'Waheb', note: '"Waheb in Suphah", quoted from the Book of the Wars of the LORD (Numbers 21:14); site unknown. Rashi reads the words as "what He gave", not a place name' },
  // Numbers 34:4: a point on the southern border between the ascent of Akrabbim and Kadesh-barnea; the Zin Desert point lies east of Akrabbim. [P2-36]
  a190097: { name: 'Zin 2', note: 'a point on the southern border between the ascent of Akrabbim and Kadesh-barnea (Numbers 34:4); site unknown' },

// PICKED
  // Numbers 33:8: Marah is "a three-days' journey" into the wilderness after the sea. Ain Hawarah is the traditional identification and
  // OpenBible's top; the pin was Uyun Musa, beside the Gulf of Suez (and a candidate for Elim). [P2-7, EXO-79 (Marah)]
  ad3970d: { name: 'Marah', match: 'Ain Hawarah', note: 'where the water was bitter, three days into the wilderness after the sea (Exodus 15:23; Numbers 33:8); site unknown — the pin marks the traditional identification, Ain Hawarah in western Sinai', confidence: 'low' },
  // Exodus 17:1-7; Numbers 33:14-15. Massah and Meribah (Exodus 17:7) are pinned at OpenBible's top Rephidim point, Wadi Rufaiyil; the Rephidim pin
  // was a 2-vote Wadi el-Sheikh 21 km away. Wadi Rufaiyil is also nearer the traditional Horeb (17:6). [P2-25, EXO-73, EXO-79 (Rephidim)]
  a05ebb7: { name: 'Rephidim', match: 'Wadi Rufaiyil', note: 'the last camp before the wilderness of Sinai, where there was no water (Exodus 17:1; 19:2); site unknown — the pin marks one proposal on the traditional route, Wadi Rufaiyil near Jebel Musa; Wadi Feiran is another', confidence: 'low' },
  // Deuteronomy 2:8 "away from Elath and Ezion-geber"; 1 Kings 9:26 "Ezion-geber, which is near Eloth": not Elath itself, so it can't share
  // Elath's Aqaba point. Tell el-Kheleifeh is the classic identification (Frank, Glueck); Pharaoh's Island is the other. [P1-16, DEU-94]
  a8e53d5: { name: 'Ezion-geber', match: 'Tell el Kheleifeh', note: 'a port at the head of the Gulf of Aqaba, listed beside Elath (Deuteronomy 2:8) and "near Eloth" (1 Kings 9:26); site debated — the pin marks Tell el-Kheleifeh; Pharaoh\'s Island is another proposal', confidence: 'low' },
  // Numbers 25:1; 33:49 "Abel-shittim". Abel-shittim is already pinned at Tall el-Hammam (Glueck's identification, OpenBible's top); the Shittim pin
  // was a 1-vote Tell Matabi. [P2-28]
  af64fb3: { name: 'Shittim', match: 'Tall el Hammam', note: 'Abel-shittim, the last camp in the steppes of Moab (Numbers 25:1; 33:49); site uncertain — the pin marks Tall el-Hammam, the usual identification; Tall Kafrayn is another proposal', confidence: 'low' },
  // Numbers 34:8-9: the border runs to Zedad, then Ziphron, then Hazar-enan. Huwwarin lies between the Zedad (Sadad) and Hazar-enan (Qaryatayn)
  // pins; the old pin, 1-vote Zifran, lies 50 km south-west of both. [P2-37]
  adf05b8: { name: 'Ziphron', match: 'Huwwarin', note: 'on the northern border, between Zedad and Hazar-enan (Numbers 34:8-9); site uncertain — the pin marks one proposal, Huwwarin', confidence: 'low' },
  // Numbers 20:22-28; 33:37-39: Mount Hor, "on the boundary of the land of Edom", where Aaron died. The customary identification (after Josephus) is
  // Jebel Harun near Petra; the pin was Har Zin (Jebel Madurah) in the Negev, the chief alternative. [DEU-96, P2-13]
  ad8027f: { name: 'Mount Hor 1', match: 'Jebel Nebi Harun', note: 'where Aaron died, "on the boundary of the land of Edom" (Numbers 20:23); location disputed — the pin marks the traditional site, Jebel Harun near Petra; others propose Jebel Madurah (Har Zin) in the Negev', confidence: 'low' },

// DESCRIBED
  // Exodus 19; Leviticus 7:38; 25:1; Numbers 3:1; 28:6; Deuteronomy 33:2. Jebel Musa is the traditional site, not an established one. [EXO-75, LEV-66, DEU-86, P2-16]
  abfba2a: { name: 'Mount Sinai', description: 'location disputed; the pin marks the traditional site, Jebel Musa in southern Sinai, where Saint Catherine\'s Monastery was built in the 6th century CE. Other proposals are in northern Sinai, the Negev (Har Karkom) and north-west Arabia' },
  // Exodus 3:1; Deuteronomy 1:6; 5:2. [EXO-75, DEU-86]
  a9bb03e: { name: 'Mount Horeb', description: 'another name for Mount Sinai; the pin marks the traditional site, Jebel Musa. Location disputed' },
  // Exodus 19:1-2; Numbers 1:1. Placed only relative to Mount Sinai (confidence in RATED). [EXO-76, LEV-67, P2-34]
  ae50cf1: { name: 'Wilderness of Sinai', description: 'the wilderness around Mount Sinai, where Israel camped (Exodus 19:1-2; Numbers 1:1); shown around the traditional site, Jebel Musa. Location disputed' },
  // Exodus 1:11. Tell er-Retaba (Gardiner, Kitchen, Bietak) vs Tell el-Maskhuta. [EXO-77]
  a3870fe: { name: 'Pithom', description: 'one of the cities built for Pharaoh by Israelite labor (Exodus 1:11); the pin marks Tell er-Retaba in Wadi Tumilat, one of two proposed sites (the other is Tell el-Maskhuta)' },
  // Exodus 13:18; 15:4; Numbers 33:8; Deuteronomy 11:4. The crossing site is unknown; OpenBible scores the Gulf of Suez, Bitter Lakes, Lake Timsah
  // and Ballah Lakes close together. [EXO-78, DEU-102, P2-23]
  a3d18b2: { name: 'Red Sea 1', description: 'Yam Suf, the "Sea of Reeds" Israel crossed (Exodus 13:18; 15:4); site unknown — the pin marks one proposal, the Bitter Lakes; others include Lake Timsah, the Ballah Lakes and the Gulf of Suez' },
  // Exodus 15:27; Numbers 33:9. Wadi Gharandal is the usual identification; Uyun Musa has also been proposed. [EXO-79 (Elim)]
  a2410c1: { name: 'Elim', description: 'an oasis with twelve springs and seventy palms (Exodus 15:27); site uncertain — the pin marks the usual identification, Wadi Gharandal in western Sinai' },
  // Exodus 16:1 "the wilderness of Sin, between Elim and Sinai". [EXO-79 (Sin)]
  a0f54e4: { name: 'Sin', description: 'the wilderness "between Elim and Sinai" (Exodus 16:1); location depends on the route — the pin marks one proposal on the traditional route, Debbet er-Ramleh; the coastal plain of el-Markha is another' },
  // Numbers 33:12-13. Serabit el-Khadim rests on linking Dophkah with Egyptian mafkat (turquoise) and assumes the southern route. [P1-11]
  a070c7b: { name: 'Dophkah', description: 'a camp between the wilderness of Sin and Alush (Numbers 33:12-13); site unknown — the pin marks one proposal, the Egyptian turquoise mines at Serabit el-Khadim, which assumes a southern route through Sinai' },
  // Exodus 17:7 "Massah and Meribah" at Rephidim (now pinned at the same point); Rashi's second reading of Deuteronomy 33:8 refers it to Kadesh. [EXO-73, DEU-89]
  a65db0f: { name: 'Meribah 2', description: 'the waters of Meribah at Rephidim, the place also named Massah (Exodus 17:7); site unknown, shown at the Rephidim pin. Rashi also reads Deuteronomy 33:8 as the Meribah at Kadesh' },
  // Numbers 20:13; 27:14 "Meribath-kadesh". [DEU-89, P2-8]
  a505743: { name: 'Meribah 1', description: 'the waters of Meribah at Kadesh, in the wilderness of Zin (Numbers 20:13; 27:14); shown at the Kadesh-barnea pin, Ain el-Qudeirat, the most common identification' },
  // Numbers 13:26; 20:1. Also Genesis 14:7; 16:14; 20:1 (description only; the Genesis pin does not move). [P1-27]
  ac2cef0: { name: 'Kadesh-barnea', description: 'Kadesh, also Kadesh-barnea; the pin marks the most common identification, the oasis of Ain el-Qudeirat in north-eastern Sinai. The site is not certain, and a minority think the Bible speaks of two places named Kadesh' },
  // Numbers 13:29 "Amalekites dwell in the Negeb". A people; the pin is only a region point (Kadesh-barnea's). [DEU-100, P1-1]
  ab95484: { name: 'Amalek', description: 'the Amalekites, a people of the Negeb (Numbers 13:29), not one place; the pin marks only the general area, on the same point as Kadesh-barnea' },
  // Deuteronomy 4:3 "every person who followed Baal-peor"; Numbers 25:3. [DEU-101]
  a3d6e81: { name: 'Baal-peor', description: 'the Baal of Peor, the god Israel worshipped at Peor (Numbers 25:3), and the affair there, which Deuteronomy 4:3 recalls; the pin marks the Peor area' },
  // Deuteronomy 3:17 "from Chinnereth down to the sea of the Arabah". [DEU-103]
  a2bb265: { name: 'Chinnereth', description: 'Kinneret: in Deuteronomy 3:17 the Sea of Galilee or the town on its shore; the pin marks the town\'s mound, Tel Kinrot' },
  // Numbers 23:28 "the peak of Peor"; 25:18 and 31:16 "the affair of Peor". Placed only relative to Beth-peor (confidence in RATED). [P2-21, DEU-104]
  a9ef72b: { name: 'Peor', description: 'the peak of Peor, near Beth-peor (Numbers 23:28); site uncertain. In Numbers 25 and 31:16 "Peor" is the Baal of Peor and the affair there' },
  // Numbers 22:5 "in the land of his kinsfolk" (Hebrew b'nei ammo); RSV/NRSV revocalize it as the land of Amaw. [P1-2]
  ac5cab3: { name: 'Amaw', description: 'Amaw, a land between Aleppo and Carchemish known from the Idrimi inscription; some translations (RSV, NRSV) read it in Numbers 22:5, where the Hebrew is usually translated "the land of his kinsfolk"' },
  // Numbers 21:1; 33:40 "the Canaanite, king of Arad". Tel Arad lacks Middle and Late Bronze Age remains. [P1-3]
  abc358b: { name: 'Arad 1', description: 'the Canaanite city of Arad in the Negeb (Numbers 21:1); site debated — Tel Arad has no Middle or Late Bronze Age remains, so some place Canaanite Arad at Tel Malhata, shown here' },
  // REPLACES the existing DESCRIBED a874951 entry. Numbers 24:22, 24: in Balaam's oracle Asshur is the nation. Genesis 2:14 wording kept. [P1-5]
  a874951: { name: 'Asshur', description: 'the city of Assur, on the west bank of the Tigris, for a time the capital of Assyria. Genesis 2:14 says the Tigris flows east of Asshur, which may mean the city or the land of Assyria; in Balaam\'s oracle (Numbers 24:22, 24) Asshur is the nation, Assyria' },
  // Numbers 32:36 "Beth-haran"; Joshua 13:27 "Beth-haram". OpenBible scores Tall Iktanu and Tall er-Rama close. [P1-9]
  a4590cd: { name: 'Beth-haram', description: 'Beth-haran (Numbers 32:36), called Beth-haram in Joshua 13:27; site uncertain — the pin marks Tall er-Rama; Tall Iktanu is the other proposal' },
  // Numbers 33:33-34; Deuteronomy 10:7 "a region of running brooks". Ein Yotvata keeps the name; Taba is OpenBible's other candidate. [P1-26]
  a7384d7: { name: 'Jotbathah', description: 'a camp between Hor-haggidgad and Abronah (Numbers 33:33-34), "a region of running brooks" (Deuteronomy 10:7); site uncertain — the pin marks Ein Yotvata in the Arabah; Taba is another proposal' },
  // Numbers 24:24 "ships from the quarter of Kittim"; Onkelos (Rome) and Rashi ("these are the Romans"). [P2-4]
  aeb46a8: { name: 'Kittim', description: 'Kition on Cyprus, and by extension Cyprus and the western coastlands; Onkelos and Rashi read Kittim in Numbers 24:24 as Rome' },
  // Numbers 32:41; Deuteronomy 3:14 links the villages with Argob in Bashan. [P1-20]
  a26c8f2: { name: 'Havvoth-jair', description: 'the villages of Jair, in Gilead (Numbers 32:40-41); Deuteronomy 3:14 links them with Argob in Bashan. Exact area uncertain' },

// EXTRA_VERSES
  // Exodus 13:17 "God did not lead them by way of the land of the Philistines". [EXO-80]
  ac71e65: { name: 'Philistia', osises: ['Exod.13.17'] },
  // Deuteronomy 34:1 "Gilead as far as Dan". [DEU-93]
  a513646: { name: 'Dan', osises: ['Deut.34.1'] },
  // Numbers 14:25, 43, 45 name the Amalekites. [P1-1]
  ab95484: { name: 'Amalek', osises: ['Num.14.25', 'Num.14.43', 'Num.14.45'] },
  // Numbers 33:3 "in plain view of all the Egyptians" (Hebrew kol Mitzrayim). [P1-14]
  af301ca: { name: 'Egypt', osises: ['Num.33.3'] },
  // Numbers 23:7 "From Aram has Balak brought me": Balaam's home is "Pethor of Aram-naharaim" (Deuteronomy 23:5 Hebrew = Deut.23.4 English). [P1-4]
  a3c7b44: { name: 'Aram-naharaim', osises: ['Num.23.7', 'Deut.23.4'] },

// DROPPED_VERSES
  // Exodus 15:27 "And they came to Elim" does not name or refer to Marah (15:25 "there" is Marah, and stays). [EXO-74]
  ad3970d: { name: 'Marah', osises: ['Exod.15.27'] },
  // Deuteronomy 33:16 "the Presence in the Bush" (seneh), not Sinai. [DEU-85]
  abfba2a: { name: 'Mount Sinai', osises: ['Deut.33.16'] },
  // Deuteronomy 33:2 "Ribeboth-kodesh": Rashi reads "myriads of holy [angels]"; JPS only compares Meribath-kadesh. [DEU-88]
  a505743: { name: 'Meribah 1', osises: ['Deut.33.2'] },
  // Deuteronomy 2:12 speaks of Seir and "the land they were to possess"; Canaan is not named. [DEU-90]
  a581f0c: { name: 'Canaan', osises: ['Deut.2.12'] },
  // Deuteronomy 1:3, 7:19, 9:29 and Numbers 10:11, 11:4, 11:34 neither name nor refer to Egypt. (Deuteronomy 6:23 "from there" and Numbers 16:13
  // "a land flowing with milk and honey" do refer to Egypt and stay.) [DEU-91, P1-14]
  af301ca: { name: 'Egypt', osises: ['Deut.1.3', 'Deut.7.19', 'Deut.9.29', 'Num.10.11', 'Num.11.4', 'Num.11.34'] },
  // Deuteronomy 3:18, 21, 28; 4:14; 6:1; 11:8, 11 say "cross over" without naming the Jordan; Numbers 32:22 does not name it. [DEU-92, P1-25]
  ae686c9: { name: 'Jordan', osises: ['Num.32.22', 'Deut.3.18', 'Deut.3.21', 'Deut.3.28', 'Deut.4.14', 'Deut.6.1', 'Deut.11.8', 'Deut.11.11'] },
  // Numbers 24:24 ("Ships come from the quarter of Kittim... subject Asshur, subject Eber") does not name Amalek. [P1-1]
  ab95484: { name: 'Amalek', osises: ['Num.24.24'] },
  // Numbers 23:7: Balaam's Aram is Aram-naharaim (above), not Aram-Damascus. [P1-4]
  a3e66cd: { name: 'Aram', osises: ['Num.23.7'] },
  // Numbers 32:41 "captured their villages" does not name Gilead. [P1-17]
  ae73b90: { name: 'Gilead 1', osises: ['Num.32.41'] },
  // Numbers 12:1 (the Cushite woman) does not name Hazeroth; 11:35 and 12:16 do. [P1-21]
  a1b6474: { name: 'Hazeroth', osises: ['Num.12.1'] },
  // Numbers 21:24 Hebrew "ki az" ("for strong/Az was the boundary"); Jazer is the Septuagint reading. Jazer is named in 21:32. [P1-23]
  a095b6e: { name: 'Jazer', osises: ['Num.21.24'] },
  // Numbers 21:20; 23:28 "the wasteland" seen from Pisgah and Peor, north-east of the Dead Sea; the pin is the Judean Jeshimon of 1 Samuel 23. [P1-24]
  ad41f6e: { name: 'Jeshimon', osises: ['Num.21.20', 'Num.23.28'] },
  // Numbers 24:22 "Kain" is the Kenites of 24:21 (JPS note), not the town of Joshua 15:57 that the pin shows. [P1-28]
  a765bd8: { name: 'Kain', osises: ['Num.24.22'] },
  // Numbers 25:2 "their god" does not name Moab (25:1 does). [P2-11]
  aa0b1d6: { name: 'Moab 1', osises: ['Num.25.2'] },

// MOVED
  // (none added. EXO-73's MOVED of Meribah 2 and Massah onto Rephidim is replaced by PICKED Rephidim → Wadi Rufaiyil, the point Meribah 2 and
  // the existing Massah MOVED entry already sit on.)

// RATED
  // Exodus 19:1-2: placed only relative to Mount Sinai, itself low; medium was OpenBible's default 500. [EXO-76, LEV-67, P2-34]
  ae50cf1: { name: 'Wilderness of Sinai', confidence: 'low', why: 'located only relative to the disputed Mount Sinai (low)' },
  // Exodus 17:7: at Rephidim, whose site is unknown (low). [EXO-73, DEU-89]
  a65db0f: { name: 'Meribah 2', confidence: 'low', why: 'at Rephidim, which is low; medium was the default 500' },
  // Numbers 20:13; 27:14: at Kadesh, which is low. [DEU-89, P2-8]
  a505743: { name: 'Meribah 1', confidence: 'low', why: 'at Kadesh-barnea, which is low; medium was the default 500' },
  // Numbers 13:29: a people of the Negeb; the pin is a region point. [DEU-100, P1-1]
  ab95484: { name: 'Amalek', confidence: 'low', why: 'a people, pinned only on a general-area point; medium was the default 500' },
  // Numbers 23:28: near Beth-peor, which is low. [P2-21, DEU-104]
  a9ef72b: { name: 'Peor', confidence: 'low', why: 'placed relative to Beth-peor, which is low; medium was the default 500' },
  // Numbers 22:41: alias of Bamoth, which is low. [P1-7]
  a577c27: { name: 'Bamoth-baal', confidence: 'low', why: 'alias of Bamoth, which is low; medium was the default 500' },
  // Numbers 32:3, 38: Beon = Baal-meon, which is low. [P1-8]
  a882ef5: { name: 'Beon', confidence: 'low', why: 'alias of Baal-meon, which is low; medium was the default 500' },
  // Numbers 32:3, 36: Nimrah = Beth-nimrah, which is low. [P2-17]
  a314731: { name: 'Nimrah', confidence: 'low', why: 'alias of Beth-nimrah, which is low; medium was the default 500' },
  // Numbers 32:42: Kenath renamed Nobah; Kenath is low. [P2-18]
  aa23a3e: { name: 'Nobah 1', confidence: 'low', why: 'alias of Kenath, which is low; medium was the default 500' },
  // Numbers 32:41; Deuteronomy 3:14: area uncertain (Gilead or Argob in Bashan). [P1-20]
  a26c8f2: { name: 'Havvoth-jair', confidence: 'low', why: 'area uncertain; medium was the default 500 for a single identification' },

// TYPED
  // Exodus 14:2: a camp; "mountain" is unsupported. [EXO-72]
  ababfd2: { name: 'Pi-hahiroth', type: 'campsite' },
  // "island" is OpenBible's first type, from the Pharaoh's Island proposal; the pins are on the mainland (Tell el-Kheleifeh; Aqaba). [DEU-94, P1-16]
  a8e53d5: { name: 'Ezion-geber', type: 'settlement' },
  af0ac29: { name: 'Elath', type: 'settlement' },
