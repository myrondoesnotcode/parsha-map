const MET_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1'

// Per-era search terms targeting Ancient Near Eastern Art (dept 3) and Egyptian Art (dept 11)
const ERA_QUERIES: Record<string, { q: string; depts: string }> = {
  chalcolithic:        { q: 'chalcolithic copper age neolithic',  depts: '3' },
  'early-bronze':      { q: 'early bronze age sumerian',          depts: '3' },
  'middle-bronze':     { q: 'middle bronze age canaanite',        depts: '3,11' },
  'late-bronze':       { q: 'late bronze age new kingdom egypt',  depts: '3,11' },
  'iron-age-1':        { q: 'iron age philistine israelite',      depts: '3' },
  'iron-age-2':        { q: 'iron age assyrian judah',            depts: '3' },
  'babylonian-persian':{ q: 'babylonian persian achaemenid',      depts: '3' },
}

export interface MetArtifact {
  objectID: number
  title: string
  objectDate: string
  medium: string
  culture: string
  primaryImageSmall: string
  objectURL: string
  department: string
}

export async function fetchMetArtifactsForEra(eraId: string): Promise<MetArtifact[]> {
  const config = ERA_QUERIES[eraId]
  if (!config) return []

  const searchUrl = `${MET_BASE}/search?q=${encodeURIComponent(config.q)}&hasImages=true&departmentIds=${config.depts}`
  const searchRes = await fetch(searchUrl)
  if (!searchRes.ok) return []
  const searchData: { total: number; objectIDs: number[] | null } = await searchRes.json()

  if (!searchData.objectIDs || searchData.objectIDs.length === 0) return []

  // Take first 6 IDs and fetch in parallel, then filter to those with images
  const ids = searchData.objectIDs.slice(0, 6)
  const objects = await Promise.all(
    ids.map((id) =>
      fetch(`${MET_BASE}/objects/${id}`)
        .then((r) => r.ok ? r.json() as Promise<MetArtifact> : null)
        .catch(() => null)
    )
  )

  return objects
    .filter((obj): obj is MetArtifact => !!obj && !!obj.primaryImageSmall)
    .slice(0, 3)
}
