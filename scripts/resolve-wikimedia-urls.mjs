/**
 * Resolves all commons.wikimedia.org redirect URLs (Special:FilePath,
 * Special:Redirect/file) in parshaList.json and timeline.json to direct
 * upload.wikimedia.org CDN URLs using the Wikimedia API.
 *
 * Run once: node scripts/resolve-wikimedia-urls.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── 1. Collect all Wikimedia redirect URLs from both JSON files ──────────────

function extractWikimediaFilenames(text) {
  const patterns = [
    /commons\.wikimedia\.org\/(?:wiki\/)?Special:FilePath\/([^"&\s]+)/g,
    /commons\.wikimedia\.org\/(?:wiki\/)?Special:Redirect\/file\/([^"&\s]+)/g,
  ]
  const filenames = new Set()
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      filenames.add(decodeURIComponent(m[1]))
    }
  }
  return filenames
}

const parshaPath = join(ROOT, 'src/data/parshaList.json')
const timelinePath = join(ROOT, 'src/data/timeline.json')

const parshaText = readFileSync(parshaPath, 'utf8')
const timelineText = readFileSync(timelinePath, 'utf8')

const allFilenames = new Set([
  ...extractWikimediaFilenames(parshaText),
  ...extractWikimediaFilenames(timelineText),
])

console.log(`Found ${allFilenames.size} unique Wikimedia files to resolve...`)

// ── 2. Query Wikimedia API in batches of 25 ──────────────────────────────────

async function resolveFilenames(filenames) {
  const resolved = {}
  const batch = [...filenames]
  const BATCH_SIZE = 25

  for (let i = 0; i < batch.length; i += BATCH_SIZE) {
    const chunk = batch.slice(i, i + BATCH_SIZE)
    const titles = chunk.map(f => `File:${f}`).join('|')
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=${encodeURIComponent(titles)}&origin=*`

    console.log(`  Querying batch ${Math.floor(i / BATCH_SIZE) + 1}...`)
    const res = await fetch(url)
    const data = await res.json()

    for (const page of Object.values(data.query.pages)) {
      if (page.imageinfo?.[0]?.url) {
        // Normalize title back to filename (strip "File:" prefix)
        const filename = page.title.replace(/^File:/, '')
        resolved[filename] = page.imageinfo[0].url
        console.log(`    ✓ ${filename.substring(0, 50)}`)
      } else {
        console.log(`    ✗ Not found: ${page.title}`)
      }
    }
  }
  return resolved
}

const resolved = await resolveFilenames(allFilenames)

// ── 3. Replace all redirect URLs with direct CDN URLs in both JSON files ─────

function replaceUrls(text, resolved) {
  let result = text
  for (const [filename, directUrl] of Object.entries(resolved)) {
    // Match both URL patterns (with or without /wiki/, with or without encoding)
    const encoded = encodeURIComponent(filename)
    const patterns = [
      `https://commons.wikimedia.org/Special:FilePath/${encoded}`,
      `https://commons.wikimedia.org/Special:FilePath/${filename}`,
      `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}`,
      `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}`,
      `https://commons.wikimedia.org/Special:Redirect/file/${encoded}`,
      `https://commons.wikimedia.org/Special:Redirect/file/${filename}`,
      `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encoded}`,
      `https://commons.wikimedia.org/wiki/Special:Redirect/file/${filename}`,
    ]
    for (const pattern of patterns) {
      result = result.split(pattern).join(directUrl)
    }
  }
  return result
}

const newParshaText = replaceUrls(parshaText, resolved)
const newTimelineText = replaceUrls(timelineText, resolved)

// ── 4. Write updated files ───────────────────────────────────────────────────

writeFileSync(parshaPath, newParshaText)
writeFileSync(timelinePath, newTimelineText)

// ── 5. Report ────────────────────────────────────────────────────────────────

const parshaReplaced = allFilenames.size - [...allFilenames].filter(f =>
  newParshaText.includes('Special:FilePath') || newParshaText.includes('Special:Redirect')
).length

console.log(`\nDone!`)
console.log(`  ${Object.keys(resolved).length}/${allFilenames.size} URLs resolved`)
console.log(`  parshaList.json updated`)
console.log(`  timeline.json updated`)

// Verify no more redirect URLs remain
const remainingParsha = [...parshaText.matchAll(/Special:(?:FilePath|Redirect)/g)].length
const remainingTimeline = [...timelineText.matchAll(/Special:(?:FilePath|Redirect)/g)].length
console.log(`  Remaining redirect URLs: parshaList=${[...newParshaText.matchAll(/Special:(?:FilePath|Redirect)/g)].length}, timeline=${[...newTimelineText.matchAll(/Special:(?:FilePath|Redirect)/g)].length}`)
