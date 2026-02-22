export interface ApproximateDateBCE {
  start: number | null
  end: number | null
}

export interface ParshaListItem {
  id: string
  name: string
  hebrewName: string
  book: 'Genesis' | 'Exodus' | 'Leviticus' | 'Numbers' | 'Deuteronomy'
  seferiaUrl: string
  number: number
  narrativeEra: string | null
  approximateDateBCE: ApproximateDateBCE
  summary?: string
}
