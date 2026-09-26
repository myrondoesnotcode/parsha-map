export const meta = {
  name: 'parsha-fact-check',
  description: 'Fact-check one Parsha Map story: extract every claim (text and visual), then three independent checkers verify against Sefaria',
  whenToUse: 'Before any parsha story is merged; pass {parshaId, files}',
  phases: [
    { title: 'Extract', detail: 'list every factual claim in text, labels, badges, positions' },
    { title: 'Check', detail: 'text, visual and tradition checkers, independently, against Sefaria' },
  ],
}

const P = args.parshaId
const FILES = args.files.join('\n- ')

const CLAIM = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    where: { type: 'string', description: 'file + card kind/index or map element' },
    claim: { type: 'string', description: 'the exact assertion a reader or viewer would take away' },
    kind: { type: 'string', enum: ['text', 'visual', 'tradition', 'number', 'framing'] },
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
const extracted = await agent(
  `You are extracting claims for a fact-check of the Parsha Map story "${P}". Read these files:
- ${FILES}

List EVERY assertion a user could take away from the "${P}" story as rendered, including:
- card titles, body text, refs, Hebrew words and quotes, the cover meta line
- everything drawn on the map for this story: positions, sizes, distances, colours that encode meaning, labels, badges like "TO SCALE", scale notes, which place is pinned and what it is called
- anything implied by framing or timing (e.g. showing something during this parsha that the text describes elsewhere)
Only the "${P}" story and the map elements its cards trigger. One claim per item; split compound sentences. Do not judge truth; just extract precisely, with the source cited in the data (or "none").`,
  { label: 'extract claims', phase: 'Extract', schema: CLAIMS }
)
const claims = extracted?.claims ?? []
log(`${claims.length} claims extracted`)
// Never let a failed run look like a clean one.
if (!claims.length) return { parsha: P, status: 'FAILED', reason: 'claim extraction returned nothing (agent failed or hit a limit)' }

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
]

phase('Check')
const results = await parallel(
  LENSES.map((l) => () =>
    agent(
      `You are an independent fact-checker for the Parsha Map story "${P}". You did not write it; assume it contains mistakes and find them. Zero tolerance: this is Torah content for families.

${l.brief}

Files (read them yourself, don't trust the claim list blindly):
- ${FILES}

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
return { parsha: P, status, lensesFailed, lensesRan, total: rows.length, problems, missed, unchecked: unchecked.map((c) => c.id), verifiedCount: rows.length - problems.length - unchecked.length }