import { useMemo } from 'react'
import tradeRoutesData from '../data/tradeRoutes.json'
import type { TradeRoute, TradeRouteCollection } from '../types/timeline'

const collection = tradeRoutesData as TradeRouteCollection

// Returns routes active during the given year BCE
// activeFrom = start of route use (larger BCE = older), activeTo = end (smaller BCE = more recent)
export function useTradeRoutes(yearBCE: number): TradeRoute[] {
  return useMemo(() => {
    return collection.features.filter(
      (r) => r.properties.activeFrom >= yearBCE && r.properties.activeTo <= yearBCE
    )
  }, [yearBCE])
}

export function useAllTradeRoutes(): TradeRoute[] {
  return collection.features
}
