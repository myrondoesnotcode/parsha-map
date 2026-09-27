// Scripted iPhone walkthrough over CDP. usage: node walk.mjs steps.json outDir
// steps: [{nav:"?q"}, {click:"css selector" | text:"button text"}, {wait:ms}, {shot:"name"}, {eval:"js"}]
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync, readFileSync, mkdirSync } from 'node:fs'
const CH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = 9333 + Math.floor(Math.random() * 500)
const prof = mkdtempSync(process.env.TMPDIR + 'cdp-prof-')
const chrome = spawn(CH, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--hide-scrollbars', '--autoplay-policy=no-user-gesture-required', '--window-size=800,1000', 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let targets
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.find((t) => t.type === 'page')) break } catch {} await sleep(200) }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0; const pending = new Map(); const logs = []
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + JSON.stringify(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text).slice(0, 300)); if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') logs.push('ERR ' + m.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 300)) }
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
await send('Emulation.setDeviceMetricsOverride', { width: Number(process.env.W ?? 390), height: Number(process.env.H ?? 844), deviceScaleFactor: 2, mobile: true })
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 })
await send('Page.enable'); await send('Runtime.enable')
const steps = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const out = process.argv[3]; mkdirSync(out, { recursive: true })
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value
for (const s of steps) {
  if (s.nav !== undefined) { await send('Page.navigate', { url: s.nav.startsWith('file:') ? s.nav : `http://localhost:5173/${s.nav}` }); await sleep(s.wait ?? 6000); continue }
  if (s.click) { const ok = await ev(`(()=>{const e=document.querySelector(${JSON.stringify(s.click)}); if(!e) return false; e.click(); return true})()`); if (!ok) console.log('MISSING', s.click) }
  if (s.text) { const ok = await ev(`(()=>{const e=[...document.querySelectorAll('button,a,[role=button]')].find(b=>b.innerText.trim().includes(${JSON.stringify(s.text)})); if(!e) return false; e.click(); return true})()`); if (!ok) console.log('MISSING text', s.text) }
  if (s.tap) { const [x, y] = s.tap; for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x, y, button: 'left', clickCount: 1 }) }
  if (s.eval) console.log('eval:', JSON.stringify(await ev(s.eval)))
  if (s.wait && s.nav === undefined) await sleep(s.wait)
  if (s.shot) { const shot = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(`${out}/${s.shot}.png`, Buffer.from(shot.result.data, 'base64')); console.log('saved', s.shot) }
}
if (logs.length) console.log(logs.join('\n'))
ws.close(); chrome.kill()
