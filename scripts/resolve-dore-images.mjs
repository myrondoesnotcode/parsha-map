#!/usr/bin/env node
/**
 * One-time script: resolves all Special:FilePath Doré image URLs in parshaList.json
 * to direct upload.wikimedia.org CDN URLs, then writes the updated JSON back.
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonPath = join(__dirname, '../src/data/parshaList.json')

const parshas = JSON.parse(readFileSync(jsonPath, 'utf8'))

async function resolveCdnUrl(specialFilepathUrl) {
  const filename = specialFilepathUrl.split('/Special:FilePath/')[1]
  if (!filename) return null
  const decoded = decodeURIComponent(filename)
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(decoded)}&prop=imageinfo&iiprop=url&format=json&origin=*&redirects`
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) { console.warn(`  API error ${res.status} for "${decoded}"`); return null }
    const data = await res.json()
    const pages = data?.query?.pages
    if (!pages) return null
    const url = Object.values(pages).map(p => p?.imageinfo?.[0]?.url).find(u => !!u)
    return url ?? null
  } catch (e) {
    console.warn(`  Fetch error for "${decoded}":`, e.message)
    return null
  }
}

let resolved = 0, failed = 0

for (const parsha of parshas) {
  if (!parsha.doreImageUrl) continue
  if (parsha.doreImageUrl.includes('upload.wikimedia.org')) {
    console.log(`  ✓ ${parsha.name} — already CDN URL, skipping`)
    continue
  }
  process.stdout.write(`Resolving ${parsha.name}… `)
  const cdnUrl = await resolveCdnUrl(parsha.doreImageUrl)
  if (cdnUrl) {
    parsha.doreImageUrl = cdnUrl
    console.log(`✓  ${cdnUrl.slice(0, 80)}…`)
    resolved++
  } else {
    console.log(`✗ FAILED — keeping original`)
    failed++
  }
  // Small delay to be polite to Wikimedia API
  await new Promise(r => setTimeout(r, 150))
}

writeFileSync(jsonPath, JSON.stringify(parshas, null, 2) + '\n')
console.log(`\nDone. Resolved: ${resolved}, Failed: ${failed}`)
