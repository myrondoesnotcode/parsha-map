/**
 * processGeodata.ts
 *
 * Downloads the OpenBible Bible-Geocoding-Data ancient.jsonl,
 * cross-references verse OSISes with parshaList.json,
 * and writes src/data/places.json.
 *
 * Run with: npx tsx scripts/processGeodata.ts
 * Or:       npm run geodata
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_PATH = path.join(ROOT, 'src', 'data', 'places.json');
// ---------------------------------------------------------------------------
// OSIS book name to canonical name map
// OSIS format: Gen, Exod, Lev, Num, Deut, ...
// ---------------------------------------------------------------------------
const OSIS_TO_BOOK = {
    Gen: 'Genesis',
    Exod: 'Exodus',
    Lev: 'Leviticus',
    Num: 'Numbers',
    Deut: 'Deuteronomy',
    Josh: 'Joshua',
    Judg: 'Judges',
    Ruth: 'Ruth',
    '1Sam': '1 Samuel',
    '2Sam': '2 Samuel',
    '1Kgs': '1 Kings',
    '2Kgs': '2 Kings',
    '1Chr': '1 Chronicles',
    '2Chr': '2 Chronicles',
    Ezra: 'Ezra',
    Neh: 'Nehemiah',
    Esth: 'Esther',
    Job: 'Job',
    Ps: 'Psalms',
    Prov: 'Proverbs',
    Eccl: 'Ecclesiastes',
    Song: 'Song of Songs',
    Isa: 'Isaiah',
    Jer: 'Jeremiah',
    Lam: 'Lamentations',
    Ezek: 'Ezekiel',
    Dan: 'Daniel',
    Hos: 'Hosea',
    Joel: 'Joel',
    Amos: 'Amos',
    Obad: 'Obadiah',
    Jonah: 'Jonah',
    Mic: 'Micah',
    Nah: 'Nahum',
    Hab: 'Habakkuk',
    Zeph: 'Zephaniah',
    Hag: 'Haggai',
    Zech: 'Zechariah',
    Mal: 'Malachi',
};
// Convert OSIS ref "Gen.12.4" → "Genesis 12:4"
function osisToVerseRef(osis) {
    const parts = osis.split('.');
    const bookOsis = parts[0];
    const chapter = parts[1];
    const verse = parts[2];
    const book = OSIS_TO_BOOK[bookOsis] ?? bookOsis;
    if (chapter && verse)
        return `${book} ${chapter}:${verse}`;
    if (chapter)
        return `${book} ${chapter}`;
    return book;
}
const parshaList = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'parshaList.json'), 'utf8'));
function parseSeferiaUrl(url) {
    // "Genesis.12.1-17.27" or "Genesis.12.1"
    const dotParts = url.split('.');
    const book = dotParts[0].replace(/_/g, ' ');
    const rest = dotParts.slice(1).join('.');
    const [startStr, endStr] = rest.split('-');
    function parseCV(s) {
        const [ch, v] = s.split('.').map(Number);
        return { chapter: ch ?? 1, verse: v ?? 1 };
    }
    const start = parseCV(startStr);
    const end = endStr ? parseCV(endStr) : start;
    return {
        book,
        startChapter: start.chapter,
        startVerse: start.verse,
        endChapter: end.chapter,
        endVerse: end.verse,
    };
}
const parshaRanges = parshaList.map((p) => ({
    parshaId: p.id,
    ...parseSeferiaUrl(p.seferiaUrl),
}));
function getParshasForOsises(osises) {
    const ids = new Set();
    for (const osis of osises) {
        const parts = osis.split('.');
        const bookOsis = parts[0];
        const chapter = parseInt(parts[1] ?? '0');
        const verse = parseInt(parts[2] ?? '0');
        const book = OSIS_TO_BOOK[bookOsis];
        if (!book)
            continue;
        for (const range of parshaRanges) {
            if (range.book !== book)
                continue;
            const vNum = chapter * 1000 + verse;
            const startNum = range.startChapter * 1000 + range.startVerse;
            const endNum = range.endChapter * 1000 + range.endVerse;
            if (vNum >= startNum && vNum <= endNum) {
                ids.add(range.parshaId);
            }
        }
    }
    return Array.from(ids);
}
// ---------------------------------------------------------------------------
// Main processing
// ---------------------------------------------------------------------------
const ANCIENT_JSONL_URL = 'https://raw.githubusercontent.com/openbibleinfo/Bible-Geocoding-Data/master/data/ancient.jsonl';
async function main() {
    console.log('Fetching OpenBible Bible-Geocoding-Data ancient.jsonl...');
    const res = await fetch(ANCIENT_JSONL_URL);
    if (!res.ok)
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const raw = await res.text();
    const lines = raw.split('\n').filter((l) => l.trim());
    console.log(`Total entries: ${lines.length}`);
    const places = [];
    let parsed = 0;
    let skipped = 0;
    for (const line of lines) {
        let entry;
        try {
            entry = JSON.parse(line);
        }
        catch {
            skipped++;
            continue;
        }
        // Extract osises from the extra field
        let osises = [];
        try {
            const extra = JSON.parse(entry.extra);
            osises = extra.osises ?? [];
        }
        catch {
            skipped++;
            continue;
        }
        if (osises.length === 0) {
            skipped++;
            continue;
        }
        // Get best location from identifications
        let lonlat = null;
        let bestScore = 0;
        let modernDescription;
        for (const ident of entry.identifications) {
            const score = ident.score?.vote_average ?? 0;
            if (score >= bestScore) {
                for (const res of ident.resolutions ?? []) {
                    if (res.lonlat) {
                        lonlat = res.lonlat;
                        bestScore = score;
                        modernDescription = ident.description
                            ?.replace(/<[^>]+>/g, '') // strip HTML tags
                            .trim();
                        break;
                    }
                }
            }
        }
        if (!lonlat) {
            skipped++;
            continue;
        }
        const [lngStr, latStr] = lonlat.split(',');
        const lng = parseFloat(lngStr);
        const lat = parseFloat(latStr);
        if (isNaN(lat) || isNaN(lng)) {
            skipped++;
            continue;
        }
        const parshas = getParshasForOsises(osises);
        const verses = osises.map(osisToVerseRef);
        // Confidence based on score
        const confidence = bestScore >= 750 ? 'high' : bestScore >= 400 ? 'medium' : 'low';
        // Type from entry.types
        const type = entry.types?.[0] ?? 'settlement';
        const place = {
            id: entry.id,
            name: entry.friendly_id,
            alternateNames: [],
            latitude: lat,
            longitude: lng,
            confidence,
            type,
            verses,
            parshas,
        };
        if (modernDescription) {
            place.description = modernDescription;
        }
        // Only include places in the broader Near East / biblical region
        const inRegion = lat > 15 && lat < 50 && lng > 20 && lng < 60;
        if (!inRegion && parshas.length === 0) {
            skipped++;
            continue;
        }
        places.push(place);
        parsed++;
    }
    console.log(`Processed ${parsed} places, skipped ${skipped}`);
    console.log(`Places with Parsha links: ${places.filter((p) => p.parshas.length > 0).length}`);
    // Sort: places with parsha links first
    places.sort((a, b) => {
        if (a.parshas.length > 0 && b.parshas.length === 0)
            return -1;
        if (a.parshas.length === 0 && b.parshas.length > 0)
            return 1;
        return a.name.localeCompare(b.name);
    });
    fs.writeFileSync(OUT_PATH, JSON.stringify(places, null, 2));
    console.log(`Written ${places.length} places to ${OUT_PATH}`);
    // Print parsha coverage stats
    const parshaStats = {};
    for (const p of places) {
        for (const pid of p.parshas) {
            parshaStats[pid] = (parshaStats[pid] ?? 0) + 1;
        }
    }
    const topParshas = Object.entries(parshaStats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);
    console.log('\nTop parshas by place count:');
    for (const [id, count] of topParshas) {
        console.log(`  ${id}: ${count} places`);
    }
}
main().catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
});
