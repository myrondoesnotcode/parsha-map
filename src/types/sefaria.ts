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

export interface SefariaLink {
  type: string
  category: string
  collectiveTitle: { en: string; he: string }
  sourceRef: string
  sourceHeRef: string
  anchorRef: string
  text: { en: string | string[]; he: string | string[] }
}

export interface SefariaTopicRef {
  ref: string
  heRef?: string
}

export interface SefariaTopicLink {
  toTopic: {
    slug: string
    primaryTitle: { en: string; he: string }
    type: string
  }
  type: string
  ref?: string
}

export interface SefariaTopicResponse {
  slug: string
  primaryTitle: { en: string; he: string }
  description?: { en?: { value: string }; he?: { value: string } }
  refs?: SefariaTopicRef[]
  links?: SefariaTopicLink[]
}
