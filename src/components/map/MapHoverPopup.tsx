import { Popup } from 'react-map-gl/maplibre'
import { TRADE_ROUTE_LAYER_ID } from './TradeRouteLayer'

export interface HoverInfo {
  longitude: number
  latitude: number
  layerId: string
  properties: Record<string, string>
}

export function MapHoverPopup({ info }: { info: HoverInfo }) {
  const isRoute = info.layerId === TRADE_ROUTE_LAYER_ID

  return (
    <Popup
      longitude={info.longitude}
      latitude={info.latitude}
      anchor="bottom"
      offset={10}
      closeButton={false}
      closeOnClick={false}
      className="pointer-events-none"
      maxWidth="240px"
    >
      {isRoute ? (
        <div className="text-xs">
          <p className="font-semibold">{info.properties.name}</p>
          <p className="text-stone-500">{info.properties.description}</p>
          {info.properties.biblicalRef && (
            <p className="text-amber-600 mt-0.5">Ref: {info.properties.biblicalRef}</p>
          )}
        </div>
      ) : (
        <span className="text-xs font-medium">{info.properties.name}</span>
      )}
    </Popup>
  )
}
