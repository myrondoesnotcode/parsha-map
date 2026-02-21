import { useMemo } from 'react'
import sitesData from '../data/archaeologicalSites.json'
import materialCulture from '../data/materialCulture.json'

export interface ArchaeologicalSite {
  id: string
  name: string
  alternateNames: string[]
  latitude: number
  longitude: number
  eraIds: string[]
  description: string
  significance: string
}

const allSites = sitesData as ArchaeologicalSite[]

type MaterialCultureMap = Record<string, { archaeologicalSites?: string[] }>
const culture = materialCulture as MaterialCultureMap

function normalizeForMatch(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export function useArchaeologicalSites(eraId: string | null): ArchaeologicalSite[] {
  return useMemo(() => {
    if (!eraId) return []

    const eraSiteNames: string[] = culture[eraId]?.archaeologicalSites ?? []

    // Return sites listed in the materialCulture for this era
    // Also include sites that list this eraId in their own eraIds array
    const byEraId = allSites.filter((s) => s.eraIds.includes(eraId))

    if (eraSiteNames.length === 0) return byEraId

    const byName = eraSiteNames.flatMap((siteName) => {
      const normalized = normalizeForMatch(siteName)
      const match = allSites.find(
        (s) =>
          normalizeForMatch(s.name) === normalized ||
          s.alternateNames.some((a) => normalizeForMatch(a) === normalized) ||
          normalizeForMatch(s.name).includes(normalized) ||
          normalized.includes(normalizeForMatch(s.name))
      )
      return match ? [match] : []
    })

    // Merge and deduplicate
    const seen = new Set<string>()
    const merged: ArchaeologicalSite[] = []
    for (const site of [...byName, ...byEraId]) {
      if (!seen.has(site.id)) {
        seen.add(site.id)
        merged.push(site)
      }
    }
    return merged
  }, [eraId])
}
