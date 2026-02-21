import { Polyline, Tooltip } from 'react-leaflet'
import { useAllTradeRoutes } from '../../hooks/useTradeRoutes'

export function TradeRouteLayer() {
  const routes = useAllTradeRoutes()

  return (
    <>
      {routes.map((route) => (
        <Polyline
          key={route.properties.id}
          positions={route.geometry.coordinates.map(([lng, lat]) => [lat, lng])}
          pathOptions={{
            color: route.properties.color,
            weight: 2.5,
            opacity: 0.7,
            dashArray: '6 4',
          }}
        >
          <Tooltip sticky>
            <div className="text-xs">
              <p className="font-semibold">{route.properties.name}</p>
              <p className="text-stone-500">{route.properties.description}</p>
              {route.properties.biblicalRef && (
                <p className="text-amber-600 mt-0.5">Ref: {route.properties.biblicalRef}</p>
              )}
            </div>
          </Tooltip>
        </Polyline>
      ))}
    </>
  )
}
