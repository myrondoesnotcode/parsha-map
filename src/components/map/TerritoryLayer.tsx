import { GeoJSON, Tooltip } from 'react-leaflet'
import { useAppStore } from '../../store/useAppStore'
import { useTerritories } from '../../hooks/useTerritories'
import type { Territory } from '../../types/timeline'
import type { PathOptions } from 'leaflet'
import type { GeoJsonObject } from 'geojson'

export function TerritoryLayer() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const territories = useTerritories(currentYearBCE)

  return (
    <>
      {territories.map((territory) => (
        <TerritoryPolygon key={territory.properties.id} territory={territory} />
      ))}
    </>
  )
}

function TerritoryPolygon({ territory }: { territory: Territory }) {
  const { fillColor, strokeColor, opacity, name } = territory.properties

  const style: PathOptions = {
    fillColor,
    fillOpacity: opacity,
    color: strokeColor,
    weight: 1.5,
    dashArray: '4 3',
    opacity: 0.8,
  }

  return (
    <GeoJSON
      data={territory as unknown as GeoJsonObject}
      style={style}
    >
      <Tooltip sticky>
        <span className="text-xs font-medium">{name}</span>
      </Tooltip>
    </GeoJSON>
  )
}
