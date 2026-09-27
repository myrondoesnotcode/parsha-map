// node apply.mjs decisions.jsonl  — each line {id, cur, new}; replaces exactly-once substrings in parshaList.json (raw JSON-escaped text)
import fs from 'fs'
const F = '/Users/myronshneider/parsha/wt-data/src/data/parshaList.json'
let raw = fs.readFileSync(F, 'utf8')
const esc = s => JSON.stringify(s).slice(1, -1)
let bad = 0
for (const line of fs.readFileSync(process.argv[2], 'utf8').trim().split('\n')) {
  if (!line.trim()) continue
  const d = JSON.parse(line); const cur = esc(d.cur)
  const n = raw.split(cur).length - 1
  if (n !== 1) { console.log(`SKIP ${d.id}: found ${n} times`); bad++; continue }
  let nu = esc(d.new)
  raw = raw.replace(cur, () => nu)
  console.log(`ok ${d.id}`)
}
JSON.parse(raw); fs.writeFileSync(F, raw); console.log(bad ? `${bad} skipped` : 'all applied')
