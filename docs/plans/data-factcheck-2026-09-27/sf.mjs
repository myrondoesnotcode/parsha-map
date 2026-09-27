// usage: node sf.mjs Ref [en|he|both] [grep]
const [ref, lang='en', pat] = process.argv.slice(2)
const strip = s => (Array.isArray(s)? s.flat(9).join(' | ') : String(s)).replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,' ')
for (const v of (lang==='both'?['english','hebrew']:[lang==='he'?'hebrew':'english'])) {
  const r = await fetch(`https://www.sefaria.org/api/v3/texts/${encodeURIComponent(ref)}?version=${v}`,{headers:{'User-Agent':'parsha-factcheck/1.0'}})
  const j = await r.json(); const t = strip(j.versions?.[0]?.text ?? j.error ?? '')
  if (pat) { const re=new RegExp(`.{0,200}${pat}.{0,200}`,'gi'); console.log(v, (t.match(re)||['(no match)']).join('\n…')) } else console.log(v, t.slice(0,1500))
}
