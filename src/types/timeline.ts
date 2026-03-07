export interface HistoricalEvent {
  yearBCE: number
  description: string
  significance?: string
}

export interface WorldEvent {
  region: string
  description: string
}

export interface PrimarySource {
  name: string
  dateLabel: string
  description: string
  excerpt?: string
  imageUrl?: string
  wikiUrl?: string
}

export interface Era {
  id: string
  name: string
  startBCE: number
  endBCE: number
  color: string
  shortDesc: string
  biblicalContext: string
  events?: HistoricalEvent[]
  worldEvents?: WorldEvent[]
  primarySources?: PrimarySource[]
}

export interface MaterialCultureEntry {
  eraId: string
  writing: string
  pottery?: string
  architecture: string
  religion: string
  politics: string
  trade: string
  keyPowers: string[]
  archaeologicalSites?: string[]
}

export interface TradeRouteProperties {
  id: string
  name: string
  nameHe?: string
  activeFrom: number
  activeTo: number
  color: string
  description: string
  biblicalRef?: string
}

export interface TradeRoute {
  type: 'Feature'
  properties: TradeRouteProperties
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
}

export interface TradeRouteCollection {
  type: 'FeatureCollection'
  features: TradeRoute[]
}

export interface TerritoryProperties {
  id: string
  name: string
  controllingPower: string
  eraIds: string[]
  startBCE: number
  endBCE: number
  fillColor: string
  strokeColor: string
  opacity: number
  labelLatLng: [number, number]
}

export interface Territory {
  type: 'Feature'
  properties: TerritoryProperties
  geometry: {
    type: 'Polygon'
    coordinates: [number, number][][]
  }
}

export interface TerritoryCollection {
  type: 'FeatureCollection'
  features: Territory[]
}
