// usage: node cdp.mjs out.png "<query>" [waitMs] ...(repeat pairs: out query wait)
import { spawn } from 'node:child_process'
import { writeFileSync, mkdtempSync } from 'node:fs'
const CH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = 9333 + Math.floor(Math.random() * 500)
const prof = mkdtempSync(process.env.TMPDIR + 'cdp-prof-')
const chrome = spawn(CH, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist', '--hide-scrollbars', '--window-size=800,1000', 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let targets
for (let i = 0; i < 50; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.find((t) => t.type === 'page')) break } catch {} await sleep(200) }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0; const pending = new Map()
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } }
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
await send('Emulation.setDeviceMetricsOverride', { width: Number(process.env.W ?? 390), height: Number(process.env.H ?? 844), deviceScaleFactor: 2, mobile: !process.env.W })
await send('Page.enable')
const args = process.argv.slice(2)
for (let i = 0; i < args.length; i += 3) {
  const [out, q, wait] = [args[i], args[i + 1], Number(args[i + 2] ?? 8000)]
  await send('Page.navigate', { url: q.startsWith('file:') ? q : `http://localhost:5173/${q}` })
  await sleep(wait)
  const shot = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(out, Buffer.from(shot.result.data, 'base64'))
  console.log('saved', out)
}
ws.close(); chrome.kill()
