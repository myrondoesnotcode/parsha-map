import { useMemo } from 'react'
import territoriesData from '../data/territories.json'
import type { Territory, TerritoryCollection } from '../types/timeline'

const collection = territoriesData as TerritoryCollection

export function useTerritories(yearBCE: number): Territory[] {
  return useMemo(() => {
    return collection.features.filter(
      (t) => t.properties.startBCE >= yearBCE && t.properties.endBCE <= yearBCE
    )
  }, [yearBCE])
}
