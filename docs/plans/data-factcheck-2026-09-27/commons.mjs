import fs from 'fs'
const books = process.argv.slice(2)
const a = JSON.parse(fs.readFileSync('src/data/parshaList.json','utf8')).filter(p=>books.includes(p.book))
const strip = s => (s||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,160)
const files = a.map(p => decodeURIComponent(p.doreImageUrl.match(/\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/]+)/)[1]))
const url = `https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&format=json&titles=${files.map(f=>encodeURIComponent('File:'+f)).join('|')}`
const r = await fetch(url,{headers:{'User-Agent':'parsha-factcheck/1.0 (myronshneider@gmail.com)'}}).then(r=>r.text())
const j = JSON.parse(r)
const norm = Object.fromEntries((j.query.normalized??[]).map(n=>[n.from,n.to]))
const byTitle = Object.fromEntries(Object.values(j.query.pages).map(p=>[p.title,p]))
a.forEach((p,i)=>{ const t='File:'+files[i]; const pg=byTitle[norm[t]??t]; const md=pg?.imageinfo?.[0]?.extmetadata??{}
  console.log(`${p.id} | CUR: ${p.doreImageCaption}\n   title: ${strip(md.ObjectName?.value)} | artist: ${strip(md.Artist?.value)} | date: ${strip(md.DateTimeOriginal?.value)}\n   desc: ${strip(md.ImageDescription?.value)}`)})
