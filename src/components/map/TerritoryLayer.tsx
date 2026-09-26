import { Source, Layer } from 'react-map-gl/maplibre'
import { useMemo } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { useTerritories } from '../../hooks/useTerritories'

export const TERRITORY_FILL_LAYER_ID = 'territories-fill'

export function TerritoryLayer() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const territories = useTerritories(currentYearBCE)

  const featureCollection = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: territories,
    }),
    [territories]
  )

  return (
    <Source id="territories-src" type="geojson" data={featureCollection}>
      <Layer
        id={TERRITORY_FILL_LAYER_ID}
        type="fill"
        paint={{
          'fill-color': ['get', 'fillColor'],
          'fill-opacity': ['get', 'opacity'],
        }}
      />
      <Layer
        id="territories-outline"
        type="line"
        paint={{
          'line-color': ['get', 'strokeColor'],
          'line-width': 1.5,
          'line-opacity': 0.8,
          'line-dasharray': [2.5, 2],
        }}
      />
    </Source>
  )
}
