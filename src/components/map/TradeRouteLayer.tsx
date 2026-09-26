import { Source, Layer } from 'react-map-gl/maplibre'
import { useMemo } from 'react'
import { useAllTradeRoutes } from '../../hooks/useTradeRoutes'

export const TRADE_ROUTE_LAYER_ID = 'trade-routes'

export function TradeRouteLayer() {
  const routes = useAllTradeRoutes()

  const featureCollection = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: routes,
    }),
    [routes]
  )

  return (
    <Source id="trade-routes-src" type="geojson" data={featureCollection}>
      <Layer
        id={TRADE_ROUTE_LAYER_ID}
        type="line"
        paint={{
          'line-color': ['get', 'color'],
          'line-width': 2.5,
          'line-opacity': 0.7,
          'line-dasharray': [2.5, 1.6],
        }}
        layout={{ 'line-cap': 'round' }}
      />
    </Source>
  )
}
