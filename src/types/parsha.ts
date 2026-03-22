export interface ApproximateDateBCE {
  start: number | null
  end: number | null
}

export interface ParshaRichContent {
  /** 4–6 sentence narrative summary written as engaging prose */
  narrativeSummary: string
  /** 3–6 thematic keywords shown as chips */
  themes: string[]
  /** Named individuals central to the portion */
  keyFigures: string[]
  /** 2-sentence spotlight/hook fact for curious readers */
  didYouKnow: string
  /** Archaeological or ancient Near Eastern historical context */
  historicalContext: string
  /** Rabbinic tradition, liturgical connection, or ongoing relevance */
  jewishTradition: string
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
  richContent?: ParshaRichContent
  commentaryUrl?: string
  doreImageUrl?: string
  doreImageCaption?: string
}
