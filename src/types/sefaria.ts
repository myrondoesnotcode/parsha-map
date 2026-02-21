export interface SefariaTextResponse {
  ref: string
  heRef: string
  text: string | string[] | string[][]
  he: string | string[] | string[][]
  versionTitle?: string
  heVersionTitle?: string
  type?: string
  lengths?: number[]
  sectionRef?: string
}

export interface SefariaCalendarItem {
  title: { en: string; he: string }
  displayValue: { en: string; he: string }
  url: string
  ref: string
  heRef: string
  order: number
  category: string
  extraDetails?: Record<string, unknown>
  description?: { en: string; he: string }
}

export interface SefariaCalendarResponse {
  calendar_items: SefariaCalendarItem[]
  date: string
  timezone: string
}
