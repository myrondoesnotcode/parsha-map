# World around it — Leviticus: verification notes

Wikipedia quotes come from the live article text (MediaWiki API plain-text extracts, fetched 2026-09-27); cached copies are in `scratchpad/wl/*.txt` (and `scratchpad/wk/*.txt` from the Exodus pass). PDFs were downloaded and text-extracted into `scratchpad/wl/` (singer.txt, miller2008.txt, pardee.txt, diacritica.txt, lichtheim2.txt). Scripture is quoted from Sefaria's default English (JPS 2023 gender-sensitive), Hebrew verse numbering (e.g. Leviticus 6:7–8 = English 6:14–15); verse texts saved in `scratchpad/wl/sefaria.txt`.

Egyptian regnal years are converted from Ramesses II's accession in 1279 BCE (low chronology), as in the Exodus pass: year n ≈ 1280 − n (year 5 → 1275, year 18 → 1262, year 34 → 1246, year 40 → 1240). Hittite reigns follow the short chronology as given by Singer 2002 (Hattusili III c. 1267–1237, Tudhaliya IV c. 1237–1209, Muwatalli II c. 1295–1272) and Wikipedia for Mursili II (1321–1295, same as the Vayikra entry). NOTE: Wikipedia's "Tudḫaliya IV" and "Alaca Höyük" give Tudhaliya IV c. 1245–1215, which overlaps Wikipedia's own Hattusili III dates (1267–1237); I used Singer's consistent set. Singer's own text layer prints Mursili II as "(c. 1321–1285)", which conflicts with his Muwatalli II "(c. 1295–1272)", so I did not use Singer for Mursili.

Notes for the six undated parshiot say the Torah gives no date and many date Leviticus much later: Wikipedia, "Book of Leviticus": "Many hypotheses presented by scholars as to its origins agree that it developed over a long period of time, reaching its present form during the Persian Period, from 538 to 332 BC, although this is disputed." (source object `LEV` in build script, not attached to events; add to parshaDates if a citation is wanted). Behar's note quotes Leviticus 25:1 "GOD spoke to Moses on Mount Sinai".

---

## tzav (window 1319–1272; traditional 1312)

**c. 1319 — Horemheb's coronation inscription**
- Wikipedia, "Horemheb" (https://en.wikipedia.org/wiki/Horemheb): "He ruled for at least 14 years between 1319 BC and 1292 BC." / "The coronation inscription on the back of a double statue, showing Horemheb with his wife, tells that he is under the protection of Horus and appointed by Amun. It reports further that he had the damaged statues of the old gods remade and had the temples that had fallen into disrepair rebuilt. For the Amun cult, 'he provided them with servants to the god and lector priests from the military elite'."
- Also: "he prevented the Amun priests from forming a stranglehold on power, by deliberately reappointing priests who mostly came from the Egyptian army".
- Date = start of reign (coronation). Distinct from Shemot's 1319 event (accession/heir), same year.
- Leviticus 8:2 "Take Aaron along with his sons…"; 8:33 "For your ordination will require seven days."

**c. 1290–1279 — Great Hypostyle Hall, Karnak**
- Wikipedia, "Great Hypostyle Hall": "The roof, now fallen, was supported by 134 columns in 16 rows" / "The hall was not constructed by Horemheb, or Amenhotep III as earlier scholars had thought but was built entirely by Seti I who engraved the northern wing of the hall with inscriptions. Decoration of the southern wing was completed by his son and successor to the throne Ramesses II." (The article's lead gives "c. 1290–1224 BC" for the 19th-Dynasty building; I dated the building to Seti I's reign.)
- Wikipedia, "Seti I": "ruling 1290 BC to 1279 BC".
- Significance cites Leviticus 6–7 generally (6:5–6 Heb., fire kept burning; 7:31–34 priests' portions). Plain context event, no parallel claimed.

**c. 1295–1272 — Muwatalli II's model prayer**
- Singer, Hittite Prayers (SBL 2002), p. 13: "From Muwatalli II (c. 1295–1272) we have two well-preserved prayers (nos. 19–20)".
- No. 20 intro, p. 85: "The offerings are divided accordingly between the two groups (§§75–87 and 89–92, respectively), and are eventually burnt on the roof (§93)."
- §1: "He places on the roof, facing the Sun, two covered wickerwork tables … On them there are: 35 thick breads of a handful of moist flour, a thin bowl of honey mixed with fine oil, a full pot of fat-bread, a full bowl of groats, thirty pitchers of wine."
- Leviticus 6:8 (Heb.) "A handful of the choice flour and oil of the grain offering shall be taken from it … turned into smoke on the altar"; 2:11 "no leaven or honey may be turned into smoke as an offering by fire to GOD."

## shemini (window 1321–1237; traditional 1312)

**c. 1321–1295 — Mursili II's reform of the Goddess of the Night's cult**
- Miller, "Setting Up the Goddess of the Night Separately" (Anatolian Interfaces, 2008), p. [text]: "the Great King Mursili II (last third of the fourteenth century) makes reference to a time when his forefather, Tudhaliya I (I/II), split the Goddess of the Night from her temple in Kizzuwatna…" / "This activity even included a reform of the cult of the Goddess of the Night in Samuha by Mursili II, who felt that the worship of the deity had become corrupted…" / quoting the incipit: "those rituals and obligations which he determined in the temple of the Goddess of the Night – it came about, however, that the wooden tablet scribes and the temple personnel began incessantly to alter them – I, Mursili, Great King, have re-edited them from the tablets."
- Span = Mursili II's reign (Wikipedia "Mursili II": "1321–1295 BC (short chronology)"); the reform itself is not dated more closely.
- Leviticus 10:1 "they offered before GOD alien fire—which had not been enjoined upon them."

**c. 1267–1237 — Hattusili III's new cult at Urikina**
- Miller 2008: "Ishtar of the Field and Ishtar of Samuha … experience a flurry of cult activity during the reigns of Mursili II and his son Hattusili III, respectively, who venerated these Ishtar hypostases as their patron deities. Hattusili III even further “split” Ishtar of Samuha in order to found an additional cult for her in the town of Urikina."
- Singer 2002, p. 13: "The usurper Hattusili “III” (c. 1267–1237)".
- Leviticus 9:1 "On the eighth day Moses called Aaron and his sons…". Loose thematic link only (new cult place / first day of Tabernacle worship).

**c. 1250 — Lion Gate, Mycenae** (plain context)
- Wikipedia, "Lion Gate": "It was erected during the thirteenth century BC, around 1250 BC, in the northwestern side of the acropolis." / "The gate is the sole surviving monumental piece of Mycenaean sculpture, as well as the largest surviving sculpture in the Bronze Age Aegean." / "the main entrance of the Bronze Age citadel of Mycenae".

## tazria (window 1267–1237; no traditional year)

**c. 1267–1237 — Hattusili III asks Ramesses II for fertility medicine for his sister**
- Diacrítica 37:2 (2023), "Beyond Amarna: Exorcists without Borders in the Levant", p. [~58]: "King Ramesses II refused to send an expert to the Hittite king Ḫattušili III, suggesting instead that he invoke the gods Shamash and Adad; the Egyptian ruler implied that no physician would be able to successfully help Ḫattušili’s sister Matanazi to …" / "Finally, in another letter the Pharaoh responds to the request of the Hittite king by sending both an asû (physician) and an āšipu (exorcist) to aid his sister in giving birth at an advanced age (50 or 60 years old). The Hittite king asks for “a man to prepare a medicine so that she may bear children!”, and the Pharaoh, who initially argued that “One can’t produce medicine to enable her to bear children!”, finally decides to “send a competent āšipu and a competent a[sû] to assist her to produce children” (Bo 652: Vs. 8–Rs. 1; Caramello, 2018, p. 281)."
- Span = Hattusili III's reign (Singer). The article does not date the letter more closely.
- Leviticus 12:2 "When a woman at childbirth bears a male, she shall be impure seven days…"

**c. 1250 — Shang oracle bones; Fu Hao's childbirth**
- Wikipedia, "Oracle bone": "…used in pyromancy – a form of divination – during the Late Shang period (c. 1250 – c. 1050 BCE) in ancient China." / "Oracle bones bear the earliest known significant corpus of ancient Chinese writing" / "Anything of concern to the royal house of Shang served as possible topics for charges, from illness, birth and death, to weather…" / "26 oracle bones throughout Wu Ding's reign have been radiocarbon dated to 1254–1197 BCE (±10 years)". Also: Keightley "proposed that Wu Ding's reign started around 1200 BCE or earlier"; Takashima "dates the earliest oracle bone inscriptions to 1230 BCE". (Hence the hedge in the significance line.)
- Wikipedia, "Fu Hao": "Oracle bone divinations by Nan show concern for her well-being at the time of the birth, and Wu Ding would attempt to predict the date several times".
- UNSURE: the c. 1250 start is Wikipedia's lead figure; dating of Wu Ding is debated. Consider dropping if a tighter source is wanted.

**1246 — Maathorneferure marries Ramesses II**
- Wikipedia, "Maathorneferure": "Maathorneferure was a daughter of the Hittite king Hattusili III and his wife, Queen Puduhepa." / "Maathorneferure was married to the Egyptian Pharaoh Ramesses II in his Year 34, becoming a senior queen, the King's Great Wife." / "Maathorneferure's marriage to the Egyptian king was the conclusion of the subsequent peace process which had begun with the signing of a peace treaty thirteen years earlier, in the autumn of 1259 BC." (1259 − 13 = 1246; year 34 from 1279 = 1246.)

## metzora (window 1267–1213; no traditional year)

**c. 1267–1237 — Hattusili III's Apology: sickly child saved by Ishtar**
- Wikipedia, "Ḫattušili III": "c. 1275–1245 BC (middle chronology) or 1267–1237 BC (short chronology timeline)" / "Much of what is known about the childhood of Hattusili III is gathered from a biographical account, written on a stone tablet during his reign, referred to as the Apology." / "According to Hattusili III himself, he was an ill and sickly child who was initially expected not to survive to adulthood. Hattusili III credited the goddess Ishtar with saving his life during this period".
- (I avoided the article's "stone tablet".) Leviticus 14:8–10 (washing, shaving, bathing; eighth-day offerings).

**c. 1240 — Deir el-Medina absence register (BM EA 5634)**
- University of Hamburg CSMC, Manuscript of the Month 54 (https://www.csmc.uni-hamburg.de/publications/aom/mom/54-en.html): "The 40th year of the king’s reign is written in black ink in the uppermost line on the front of this ostracon (fig. 1). In view of the persons’ names listed on the fragment, this can only refer to the reign of Ramses II (19th dynasty, c. 1250 BCE)." / "many factors point to Deir el-Medina as the location" / "a total of ten workers gave the menstruation of a wife or daughter (or both) as their reason for being absent … “Neferabu: 4th month of the flooding season, day 15 — His daughter was in menstruation (literally, in purification).”" / "By far the most common reason for not going to work, however, was illness. In most cases … the scribe merely noted “ill”." / "two workers suffered from diseases of the eyes, and one was badly stung — by a scorpion." / Description box: "Dating: 19th dynasty, year 39–40; Ramses II., c. 1250 B.C."
- DATE NOTE: I show c. 1240 (year 40 by the 1279 accession); Hamburg rounds to "c. 1250". Change to 1250 if you prefer the source's figure.
- Leviticus 15:19 "she shall remain in her menstrual separation seven days".

**c. 1237–1213 — Ramesses II sends the physician Pariamahu to cure Kurunta**
- Wikipedia, "Kurunta (king)": "One of the so-called "Insibia letters" from Ramesses II to (apparently) Tudḫaliya IV and his mother Puduḫepa records the special dispatch of an Egyptian physician, Pariamaḫu, to cure Kurunta from an unspecified ailment. Kurunta's two attendant physicians, on the other hand, are to be sent to Egypt upon Pariamaḫu's arrival."
- Span = Tudhaliya IV's accession (Singer c. 1237) to Ramesses II's death (1213).
- Leviticus 14:3 "the priest shall go outside the camp. If the priest sees that the leper has been healed…"

## acharei-mot (window 1312–1185; traditional 1312)

**c. 1312 — Ritual to Lelwani for Mursili II's queen**
- Singer 2002, p. 69: "Only when Mursili’s wife, Gassul(iy)awiya, was struck down by a mysterious illness, and prayers to the gods (nos. 15–16) remained unanswered … his beloved wife died, probably in his ninth year of rule (Bryce 1998: 227, n. 70)."
- No. 15 intro, p. 71: "This substitute ritual and prayer for the recovery of Gassuliyawiya is addressed to Lelwani" / "most scholars consider her to be Mursili II’s wife".
- §1: "And you, O god, eat the fat of that [fattened cow and fattened ewe] and satisfy your hunger! [Drink] the blood [and quench your thirst]!" §3: "has sent to you, O god, her substitutes: [one fattened cow,] and one fattened ewe, dressed up in festive garments". §4': "You, O Lelwani, eat the fat of [the fat cow], of the ewe and the nanny-goat … Drink(!) that [blood]". (The ritual also sends a woman as substitute; not mentioned in the entry.)
- Date: Mursili acc. 1321 (Wikipedia short chronology) + ~9 years ≈ 1312. "drink their blood" is a paraphrase across §1/§4' because of the restorations.
- Leviticus 17:11 "For the life of the flesh is in the blood, and I have assigned it to you for making expiation for your lives upon the altar"; 17:12 "No person among you shall partake of blood".

**c. 1295–1272 — Muwatalli II's prayer concerning Kummanni**
- Singer 2002, no. 19 intro, p. 81: "This typical plea of confession and penitence to the Storm-god was dictated, according to its colophon, by the king himself." / "The occasion for the prayer seems to be a general decline in the state of the land of Kizzuwatna/Kummanni".
- §1: "We have invoked the Storm-god, lord of heaven and earth, king of the gods, and [we confess] offence and sin before him" / "May the Storm-god, my lord, hear how I dispel the sins of the lands and make [that into] this plea."
- Leviticus 16:21 "confess over it all the iniquities and transgressions of the Israelites, whatever their sins".

**c. 1200–1185 — Ugarit rite RS 1.002 ("Ritual for National Unity")**
- Pardee, Ritual and Cult at Ugarit (SBL 2002), p. 2: "…it appears likely that the sacrificial texts reflect precise situations and that the vast majority of them date, therefore, to the last few years of the kingdom of Ugarit (i.e., to the years 1200–1185 in round figures)."
- Text 22 intro, p. 77: "One fairly well preserved exemplar of this ritual is known (RS 1.002) while another is sufficiently preserved (RS 17.100A+B) … Four other fragments" / "originally three pairs of paragraphs grouped by reference to the male and the female inhabitants" / "Comparisons with the biblical Day of Atonement are tempting, but the important differences between the two sets of rites mean that only general similarities may be cited until chronological data on the Ugaritic liturgy are forthcoming." Also: "The word “atonement” is often used in classifying this rite. I avoid the term…"
- Translation (p. 80–81): "whether you sin: be it in your anger, be it in your [i]mpatience, [be it in some turpitude] that you should commit; whether you sin: as concerns the <sa>crifices …"
- NOTE: Ugarit is also used by Vayikra (its destruction, c. 1185, and the šlmm). This is a different text; still a second use of the Ugarit ritual corpus.
- Leviticus 16:30 "For on this day atonement shall be made for you to purify you of all your sins".

## kedoshim (window 1300–1200; no traditional year)

**13th century (1300–1201) — Stela of Neferabu to Ptah (BM EA 589)**
- British Museum Images, "Stela, 19th Dynasty, Deir el-Medina" (https://www.bmimages.com/preview.asp?image=00125526001): "Findspot: Deir el-Medina … Period / culture: 19th Dynasty … Object reference numbers: 1843,0507.9 589" / "Round-topped limestone stela of Neferabu … on the upper Ptah … The lower register displays an image of the donor kneeling with raised arms, praying to the god" / keywords "13th century bc 19th dynasty deir el-medina".
- Lichtheim, Ancient Egyptian Literature II (1976), "Votive Stela of Neferabu with Hymn to Ptah", British Museum 589: "In this hymn to Ptah, the draftsman Neferabu relates that he had sworn a false oath, and the god had punished him by making him blind." / text: "I am a man who swore falsely by Ptah, Lord of Maat, And he made me see darkness by day." / "Refrain from uttering Ptah's name falsely".
- UNSURE: only "13th century" / "19th Dynasty" found for the date; the BM collection page (reportedly "reign of Ramesses II") returned 403. A search snippet said Neferabu appears on ostraca of year 36 — not verified, not used. Do not assume he is the Neferabu of the absence ostracon.
- Leviticus 19:12 "You shall not swear falsely by My name, profaning the name of your God".

**c. 1250 — Papyrus of Ani**
- Wikipedia, "Papyrus of Ani": "…created c. 1250 BCE, during the Nineteenth Dynasty" / "the manuscript compiled for the Theban scribe Ani".
- World History Encyclopedia, "The Negative Confession": "The following translation is by E. A. Wallis Budge from his original work on The Egyptian Book of the Dead." / "3. Hail, Fenti, who comest forth from Khemenu, I have not stolen." / "8. Hail, Neba, who comest and goest, I have not uttered lies." Also Wikipedia "Book of the Dead": "the dead person swore that he had not committed any sin from a list of 42 sins, reciting a text known as the "Negative Confession"."
- Leviticus 19:11 "You shall not steal; you shall not deal deceitfully or falsely with one another."

**c. 1200 — Cape Gelidonya shipwreck**
- AJA 125.3 (2021), necrology of G. F. Bass: "Bass observed that pan-balance weights found in the wreck adhered to Near Eastern standards, and by comparing the copper oxhide-shaped ingots … he concluded that the vessel that sank at Cape Gelidonya around 1200 BCE belonged to a tinker of Syro-Canaanite or Cypriot origin."
- INA project page: "DATE OF WRECK: LATE 13TH C. B.C." / "In about 1200 B.C., a merchant vessel apparently ripped its bottom open on a pinnacle of rock" / "Most of the stone weights were either domed or sphendonoid".
- Wikipedia, "Cape Gelidonya": "late Bronze Age shipwreck (c. 1200 BC)… Among the finds were Mycenaean pottery, scrape copper, copper and tin ingots, and merchant weights." (Wikipedia calls it Mycenaean; Bass argued Syro-Canaanite/Cypriot — the entry avoids the ship's origin.)
- Leviticus 19:36 "You shall have an honest balance, honest weights…"

## emor (window 1279–1209; no traditional year)

**c. 1279–1259 — The Ramesseum; festival of Min**
- Wikipedia, "Ramesseum": "Surviving records indicate that work on the project began shortly after the start of his reign and continued for 20 years." / "In the upper registers, are shown a feast in honour of the phallic god Min, god of fertility." / "The upper register of the second western pylon, shows a processions where ancestors of Ramesses II are honored at ceremonies of the festival of Min."
- Wikipedia, "Min (god)": "At the beginning of the harvest season, his image was taken out of the temple and brought to the fields in the festival of the departure of Min, the Min Festival, when they blessed the harvest… This four day festival is evident from the great festivals list at the temple of Ramses III at Medinet Habu." (The harvest timing is sourced from Medinet Habu, a generation later; same festival.)
- Leviticus 23:10 "you shall bring the first sheaf of your harvest to the priest."

**c. 1249 — Ramesses II's first Sed festival**
- Wikipedia, "Sed festival": "Eventually, Sed festivals were jubilees celebrated after a ruler had held the throne for thirty years and then every three to four years after that." / "Ramesses II (who had his first of over a dozen in approximately 1249 BCE)". (Avoided the word "jubilee" so it is not confused with Behar's jubilee.)
- Leviticus 23:4 "which you shall celebrate each at its appointed time". The "not by the years of a king" clause is a contrast drawn from the text of Lev 23 (dates by month and day).

**c. 1267–1209 — hišuwa festival tablets prepared for Puduhepa**
- Wikipedia, "Manuzi": "He was worshiped during nine day hišuwa festival, known from a set of tablets with instructions pertaining to it prepared for queen Puduḫepa." / "Manuzi (also spelled Manuzzi) was a mountain god worshiped in Kizzuwatna."
- Wikipedia, "Puduḫepa": "Puduḫepa was born at the beginning of the 13th century BC in the city of Lawazantiya in Kizzuwatna (i.e. Cilicia, a region south of the Hittite kingdom)." / "After the death of Hattusili, the role of Puduḫepa expanded at least during the early reign of her son Tudhaliya IV, under the title of goddess-queen."
- Span = Hattusili III's accession to Tudhaliya IV's end (Singer), since the tablets are not dated and she stayed queen into her son's reign. A search snippet said the chief scribe Walwaziti compiled them under Hattusili III — not verified from a fetched page, not used.
- Leviticus 23:34–36 Booths "[to last] seven days … On the eighth day you shall observe a sacred occasion".

## behar (window 1262–1209; no traditional year)

**c. 1262 — Mose's land lawsuit**
- Wikipedia, "Mose (scribe)": "He lived under Ramesses II, around 1250 BC." / "Under king Ahmose I, the treasurer Neshi received a piece of land from the king. The land remained over a long time in the hand of one part of the family." … "His widow Nubnofert, wanted to go on, but Khay took over control. Nubnofert complained against this but lost at the court against Khay. This happened in year 18 under Ramesses II. After that, Mose, the son of Nubnofert got involved and tried to claim the land back. The result of his claims are not known as the end of the text is lost".
- Year 18 → c. 1262. Leviticus 25:10 "each of you shall return to your holding and each of you shall return to your family."

**c. 1240 — Tudhaliya IV's dams after drought**
- Wikipedia, "Gölpınar Dam": "A Hittite inscription in Luwian hieroglyphs found during excavation of the area indicates that the structure was dedicated to the Hittite goddess Ḫepat." / "From a cuneiform document it is known that her son, Tudhaliya IV, who succeeded Hattusili, had ten dams built in the Hittite empire around 1240 BC after a period of drought. From this it may be concluded that the Gölpınar dam is the work of Tudhaliya." / "about 1.5 kilometres southeast of the hill settlement of Alaca Höyük".
- Wikipedia "Tudḫaliya IV" says "at least 13 dams"; "Alaca Höyük" says "a series of dams" — so the entry gives no number.
- Leviticus 25:20–21 "What are we to eat in the seventh year…" / "a crop sufficient for three years."

**c. 1237–1209 — Bronze Tablet treaty with Kurunta**
- Wikipedia, "Kurunta (king)": "…the new Hittite monarch, and Kurunta delineated the frontiers of Tarḫuntašša once again, in greater detail, indicating the award or return of additional territories to Kurunta, and granting him the highest status in the Hittite court below the king and crown prince. This new treaty was inscribed on a bronze tablet, discovered at Ḫattuša in 1986, the only one of its kind to be found… Unlike most clay tablets, the bronze tablet of the treaty is in a state of near perfect preservation".
- Wikipedia, "Hattusa": "During the 1986 excavations a large (35 × 24 cm, 5 kg in weight, with 2 attached chains) inscribed metal tablet was discovered 35 meters west of the Sphinx Gate… contained a treaty between Hittite Tudḫaliya IV and Kurunta, King of Tarḫuntašša."
- Span = Tudhaliya IV's reign (Singer). Leviticus 25:23 "the land is Mine; you are but strangers resident with Me."

## bechukotai (window 1267–1203; no traditional year)

**c. 1267–1237 — Puduhepa's vow for Hattusili**
- Singer 2002, intro p. 8: "The influential queen Puduhepa prays for the recuperation of her ailing husband (no. 22)". p. 10–11: "Puduhepa, however, vows specific cult objects to the gods addressed in her prayer if they keep Hattusili alive (no. 22): for Lelwani a full-size silver and gold effigy of Hattusili (§ 9")…"
- §9" (iii 36'–42'): "If you, Liliwani, my lady, will speak favorably [to the gods], and will keep your servant, Hattusili, alive and grant him long years, months and days, I shall come and make for Liliwani, my lady, a silver statue of Hattusili, as big as Hattusili himself, with its head, its hands and its feet of gold; that I will weigh out separately."
- Leviticus 27:2–3 "When anyone explicitly vows to GOD the equivalent for a human being … If it is a male from twenty to sixty years of age, the equivalent is fifty shekels of silver".

**c. 1225 — Tukulti-Ninurta I sacks Babylon**
- Wikipedia, "Kaštiliašu IV": "…the twenty-eighth Kassite king of Kar-Duniaš (Babylon), c. 1232–1225 BC. He … ruled for eight years, and went on to wage war against Assyria resulting in the catastrophic invasion of his homeland" / "Kaštiliašu was captured, single-handed by T[ukulti-Ninurta] … o Assyria. The victorious Assyrian demolished the walls of Babylon … to the Esagila temple, where he made off with the statue of Marduk."
- Wikipedia, "Tukulti-Ninurta I": "reigned c. 1243–1207 BC" / "deported him ignominiously in chains to Assyria".
- Leviticus 26:31–33 "make your sanctuaries desolate … And you I will scatter among the nations".

**c. 1213–1203 — Merneptah ships grain to Hatti**
- Manassa, The Great Karnak Inscription of Merneptah (2003), translation line 24 (archive.org djvu text): "put an end to the Pedjuti-shu. It is in order to vivify this Hittite land that I have caused grain to be sent in ships."
- Knohl, TheTorah.com: "When Ramesses II’s son Merneptah (1213–1203 B.C.E.) takes over as an old man, he immediately has to contend with the challenges… In his first year as Pharaoh, Merneptah boasts how “he caused grain to be taken in ships, to keep alive this land of Hatti” [5] —in other words, he sends boatloads of wheat to the starving Hittite Empire."
- Span = Merneptah's reign (Knohl says year 1; the inscription itself records the year-5 Libyan war). The archive.org copy is an uploaded scan of the book — swap for a publisher link if preferred.
- Leviticus 26:26 "they shall dole out your bread by weight".

---

## Reuse check against worldEvents.json
- No event repeats Vayikra's four or any Exodus event. Nearest overlaps: Horemheb (Shemot 1319 accession vs. Tzav coronation inscription); Mursili II (Vayikra plague prayer, Bo eclipse, Yitro/Ki Tisa treaties vs. Shemini reform and Acharei Lelwani ritual); Ugarit ritual texts (Vayikra šlmm vs. Acharei RS 1.002); Seti I building (Vayakhel Abydos vs. Tzav Karnak hall).
- Within Leviticus, the Hattusili III / Puduhepa family recurs in separate events (Shemini, Tazria ×2, Metzora ×2, Emor, Behar, Bechukotai), because it is the best-documented court of the 13th century.
