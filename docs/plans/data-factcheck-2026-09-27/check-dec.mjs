// node check-dec.mjs dec.jsonl — dry-run: simulates applying accept/modify decisions in order to parshaList.json; changes nothing.
import fs from 'fs'
let raw = fs.readFileSync('/Users/myronshneider/parsha/wt-data/src/data/parshaList.json', 'utf8')
const esc = s => JSON.stringify(s).slice(1, -1)
let bad = 0, n = 0
for (const line of fs.readFileSync(process.argv[2], 'utf8').trim().split('\n')) {
  if (!line.trim()) continue
  let d; try { d = JSON.parse(line) } catch (e) { console.log('BAD JSON:', line.slice(0, 80)); bad++; continue }
  if (d.verdict === 'reject') continue
  const c = raw.split(esc(d.cur)).length - 1
  if (c !== 1) { console.log(`${d.id}: cur found ${c} times (after earlier decisions applied)`); bad++; continue }
  raw = raw.replace(esc(d.cur), () => esc(d.new)); n++
  if (/\s{2,}|\s[.,;]/.test(d.new) || / $/.test(d.new) && d.new !== '') console.log(`${d.id}: check spacing in new`)
}
try { JSON.parse(raw) } catch { console.log('result is not valid JSON'); bad++ }
console.log(`${n} would apply, ${bad} problems`)
