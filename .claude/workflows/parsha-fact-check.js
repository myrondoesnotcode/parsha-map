export const meta = {
  name: 'parsha-fact-check',
  description: 'Fact-check one parsha: story + Read tab + history. Extract every claim, then text, visual, tradition and history checkers verify independently',
  whenToUse: 'Before any parsha story is merged; pass {parshaId, files, readFiles?}',
  phases: [
    { title: 'Extract', detail: 'story claims, and Read-tab / historical-context claims, in parallel' },
    { title: 'Check', detail: 'text, visual, tradition (Sefaria) and history (scholarly sources) checkers, independently' },
  ],
}

const P = args.parshaId
const FILES = args.files.join('\n- ')
// The Read tab (summary, did-you-know, tradition, "the world around it", era card with events) and the map's date bar.
const READ_FILES = (args.readFiles ?? [
  'src/redesign/Screens.tsx', 'src/redesign/MapChrome.tsx', 'src/redesign/placeText.ts', 'src/hooks/useEraContext.ts',
  'src/redesign/parshaDates.ts', 'src/data/parshaDates.json', 'src/data/worldEvents.json',
  'src/data/parshaList.json', 'src/data/timeline.json',
]).join('\n- ')
const ALL_FILES = FILES + '\n- ' + READ_FILES

const CLAIM = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    where: { type: 'string', description: 'file + card kind/index or map element' },
    claim: { type: 'string', description: 'the exact assertion a reader or viewer would take away' },
    kind: { type: 'string', enum: ['text', 'visual', 'tradition', 'number', 'framing', 'history'] },
    cited: { type: 'string', description: 'source cited in the data, or "none"' },
  },
  required: ['id', 'where', 'claim', 'kind', 'cited'],
}
const CLAIMS = { type: 'object', properties: { claims: { type: 'array', items: CLAIM } }, required: ['claims'] }

const VERDICTS = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          status: { type: 'string', enum: ['verified', 'wrong', 'misleading', 'unsupported', 'not-my-lens'] },
          evidence: { type: 'string', description: 'quote the source text you fetched (ref + words), or explain' },
          fix: { type: 'string', description: 'exact replacement wording or change; empty if verified' },
        },
        required: ['id', 'status', 'evidence', 'fix'],
      },
    },
    missed: {
      type: 'array',
      description: 'claims the extractor missed that are wrong, misleading or unsupported',
      items: {
        type: 'object',
        properties: { where: { type: 'string' }, claim: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' } },
        required: ['where', 'claim', 'problem', 'fix'],
      },
    },
  },
  required: ['verdicts', 'missed'],
}

phase('Extract')
const [extracted, extractedRead] = await parallel([() => agent(
  `You are extracting claims for a fact-check of the Parsha Map story "${P}". Read these files:
- ${FILES}

List EVERY assertion a user could take away from the "${P}" story as rendered, including:
- card titles, body text, refs, Hebrew words and quotes, the cover meta line
- everything drawn on the map for this story: positions, sizes, distances, colours that encode meaning, labels, badges like "TO SCALE", scale notes, which place is pinned and what it is called
- anything implied by framing or timing (e.g. showing something during this parsha that the text describes elsewhere)
Only the "${P}" story and the map elements its cards trigger. One claim per item; split compound sentences. Do not judge truth; just extract precisely, with the source cited in the data (or "none").`,
  { label: 'extract: story', phase: 'Extract', schema: CLAIMS }
), () => agent(
  `You are extracting claims for a fact-check of what the Parsha Map "Daylight" UI shows about the parsha "${P}" OUTSIDE the story player: the Read tab and the map's date bar. Read these files:
- ${READ_FILES}

Work out exactly what renders for "${P}": its record in parshaList.json (only the fields Screens.tsx and MapChrome.tsx actually render, e.g. richContent.narrativeSummary, didYouKnow, jewishTradition, themes, historicalContext, approximateDateBCE), the map date bar (scholarly label/range and traditional year from parshaDates.json via parshaDates.ts), and the history section: the parsha's dated events in worldEvents.json if it has an entry, otherwise the timeline.json era that useEraContext picks for eraYear(parsha) in placeText.ts (null for undated parshiot, which get a \"When\" card instead), with that era's name, startBCE–endBCE, shortDesc and events.
List EVERY assertion a reader could take away, one per item, splitting compound sentences: dates, era boundaries, ancient texts and what they say, empires and rulers, archaeology, customs, statistics, Hebrew words and meanings, traditions and who holds them, and framing (e.g. the era card's events are presented as "the world around" this parsha, so each is implicitly claimed to be roughly contemporary with it; a date range shown on the bar is implicitly presented as the date of these events). Prefix each id with "R". Use kind "history" for historical/archaeological/dating claims. Do not judge truth; extract precisely, with the source cited in the data (or "none").`,
  { label: 'extract: read tab + history', phase: 'Extract', schema: CLAIMS }
)])
const storyClaims = extracted?.claims ?? []
const readClaims = extractedRead?.claims ?? []
const claims = [...storyClaims, ...readClaims]
log(`${storyClaims.length} story claims + ${readClaims.length} Read-tab/history claims extracted`)
// Never let a failed run look like a clean one.
if (!storyClaims.length || !readClaims.length) return { parsha: P, status: 'FAILED', reason: `claim extraction returned nothing for ${!storyClaims.length ? 'the story' : 'the Read tab'} (agent failed or hit a limit)` }

const LENSES = [
  {
    key: 'text',
    brief: `TEXT lens: does the cited verse actually say this? Check names, numbers, directions, who/what/where, Hebrew spelling and vowels, verse ranges. Fetch every cited verse from the Sefaria API (e.g. curl -s "https://www.sefaria.org/api/v3/texts/Leviticus.1.1?version=english" and ?version=hebrew) and quote it. A claim that goes beyond the verse is "misleading" or "unsupported".`,
  },
  {
    key: 'visual',
    brief: `VISUAL lens: do map positions, sizes, labels, badges, colours and scale match the text AND each other? E.g. a "to scale" badge next to anything not to scale, labels that undercount (a division of three tribes labelled with one name), locations presented as certain when they are traditional or disputed (check the confidence field in src/data/places.json), illustrative distances not labelled as illustrative. Fetch the verses that the drawing depends on.`,
  },
  {
    key: 'tradition',
    brief: `TRADITION & FRAMING lens: is every interpretation, midrash or commentary attributed and phrased as tradition rather than fact? Is anything presented as happening in this parsha that the Torah places elsewhere or later (check chronology verses)? Are loaded words ("every", "always", "first", "only", "just") supported? Is the table-talk question fair to the text? Fetch sources; for commentary claims, find the actual commentator on Sefaria if you can and name them.`,
  },
  {
    key: 'history',
    brief: `HISTORY lens: every claim about history, archaeology, dating, the ancient Near East, empires, rulers, ancient texts (e.g. Mari, Nuzi, Ugarit, Egyptian records), customs, populations and statistics. Verify with reputable sources you actually fetch (WebSearch/WebFetch: Britannica, museum and university pages, peer-reviewed or standard reference works; quote them). Check in particular:
- dates and era boundaries against standard chronologies (say which, e.g. Middle vs Low chronology, and whether the difference matters here);
- every event on the era card: is the date right, is the description right, and is it fairly presented as "the world around" this parsha (it must fall in or near this parsha's date range, not just somewhere in a 350-year era);
- dating of the biblical events themselves: a scholarly date range (e.g. patriarchs in the Middle Bronze Age, a 13th-century Exodus) is an estimate that many scholars dispute, and traditional Jewish chronology (Seder Olam) gives different dates; the UI must not present either as settled fact;
- claimed parallels (e.g. Nuzi/Mari customs "strikingly similar" to Genesis): state the current scholarly view, including whether the parallel is now contested;
- statistics (e.g. worldwide numbers): find a current source; if none, "unsupported".
Wording that goes further than the sources support is "misleading". If you cannot find positive support, "unsupported".`,
  },
]

phase('Check')
const results = await parallel(
  LENSES.map((l) => () =>
    agent(
      `You are an independent fact-checker for the Parsha Map story "${P}" and what the app's Read tab shows about it. You did not write it; assume it contains mistakes and find them. Zero tolerance: this is Torah content for families.

${l.brief}

Files (read them yourself, don't trust the claim list blindly; for the Read tab only the "${P}" record and its era matter):
- ${ALL_FILES}

Claims to judge (mark ones outside your lens "not-my-lens"):
${JSON.stringify(claims, null, 1)}

Rules: fetch sources before judging; quote the fetched text in evidence; if you cannot find positive support, the status is "unsupported" (absence of contradiction is not verification). Give an exact fix for anything not verified. Also report anything the extractor MISSED within your lens.`,
      { label: `check: ${l.key}`, phase: 'Check', schema: VERDICTS }
    ).then((r) => (r ? { lens: l.key, ...r } : null))
  )
)

const byId = {}
for (const c of claims) byId[c.id] = { ...c, checks: {} }
const missed = []
for (const r of results.filter(Boolean)) {
  for (const v of r.verdicts) if (byId[v.id] && v.status !== 'not-my-lens') byId[v.id].checks[r.lens] = v
  for (const m of r.missed) missed.push({ lens: r.lens, ...m })
}
const rows = Object.values(byId)
const problems = rows.filter((c) => Object.values(c.checks).some((v) => v.status !== 'verified'))
const unchecked = rows.filter((c) => Object.keys(c.checks).length === 0)
const lensesRan = results.filter(Boolean).map((r) => r.lens)
const lensesFailed = LENSES.map((l) => l.key).filter((k) => !lensesRan.includes(k))
const hardErrors = problems.filter((c) => Object.values(c.checks).some((v) => v.status === 'wrong'))
const status = lensesFailed.length || unchecked.length ? 'INCOMPLETE' : hardErrors.length ? 'ERRORS' : problems.length || missed.length ? 'NOTES' : 'CLEAN'
return { parsha: P, status, storyClaims: storyClaims.length, readClaims: readClaims.length, lensesFailed, lensesRan, total: rows.length, problems, missed, unchecked: unchecked.map((c) => c.id), verifiedCount: rows.length - problems.length - unchecked.length }