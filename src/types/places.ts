export interface Place {
  id: string
  name: string
  alternateNames: string[]
  latitude: number
  longitude: number
  confidence: 'high' | 'medium' | 'low'
  type: string
  verses: string[]
  parshas: string[]
  description?: string
  modernName?: string
}
