export interface HistoricalPower {
  id: string
  name: string
  alternateNames: string[]
  eraIds: string[]
  startBCE: number
  endBCE: number
  capital: {
    name: string
    modernName?: string
    latitude: number
    longitude: number
  }
  description: string
  israelRelationship: string
  biblicalFigures: string[]
  biblicalEvents: string[]
  color: string
}
