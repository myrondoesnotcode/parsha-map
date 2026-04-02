import { create } from 'zustand'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'
import type { Language } from '../i18n/translations'
import { LANGUAGE_DIR } from '../i18n/translations'

const parshas = parshaList as ParshaListItem[]

interface AppState {
  selectedParshaId: string | null
  language: Language
  currentYearBCE: number
  yearSource: 'parsha' | 'slider'
  showTradeRoutes: boolean
  showPlaceLabels: boolean
  parshaInitialized: boolean
  showTerritories: boolean
  selectedPowerId: string | null
  showArchaeologicalSites: boolean
  placeTypeFilter: string
  highlightedPlaceId: string | null
  basemapStyle: 'voyager' | 'satellite'
  selectedPlacePanel: { id: string; type: 'place' | 'site' } | null
  fitBoundsKey: number

  setLanguage: (lang: Language) => void
  setSelectedParsha: (id: string) => void
  setParshaIdOnly: (id: string) => void
  setCurrentYear: (year: number) => void
  toggleTradeRoutes: () => void
  togglePlaceLabels: () => void
  setParshaInitialized: () => void
  toggleTerritories: () => void
  setSelectedPower: (id: string | null) => void
  toggleArchaeologicalSites: () => void
  setPlaceTypeFilter: (filter: string) => void
  setHighlightedPlace: (id: string | null) => void
  toggleBasemap: () => void
  openPlacePanel: (id: string, type: 'place' | 'site') => void
  closePlacePanel: () => void
  triggerFitBounds: () => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedParshaId: null,
  language: 'en',
  currentYearBCE: 1900,
  yearSource: 'parsha',
  showTradeRoutes: true,
  showPlaceLabels: false,
  parshaInitialized: false,
  showTerritories: false,
  selectedPowerId: null,
  showArchaeologicalSites: true,
  placeTypeFilter: 'all',
  highlightedPlaceId: null,
  basemapStyle: 'voyager',
  selectedPlacePanel: null,
  fitBoundsKey: 0,

  setLanguage: (lang: Language) => {
    document.documentElement.dir = LANGUAGE_DIR[lang]
    document.documentElement.lang = lang
    set({ language: lang })
  },

  setSelectedParsha: (id: string) => {
    const parsha = parshas.find((p) => p.id === id)
    const year = parsha?.approximateDateBCE?.start ?? 1900
    set({
      selectedParshaId: id,
      currentYearBCE: year,
      yearSource: 'parsha',
      highlightedPlaceId: null,
    })
    // Sync parsha to URL so it can be shared/bookmarked
    const url = new URL(window.location.href)
    url.searchParams.set('parsha', id)
    window.history.pushState({ parsha: id }, '', url.toString())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).umami?.track('parsha-viewed', { parsha: id, name: parsha?.name })
  },

  setParshaIdOnly: (id: string) => {
    set({ selectedParshaId: id })
  },

  setCurrentYear: (year: number) => {
    set({ currentYearBCE: year, yearSource: 'slider' })
  },

  toggleTradeRoutes: () => {
    set((state) => ({ showTradeRoutes: !state.showTradeRoutes }))
  },

  togglePlaceLabels: () => {
    set((state) => ({ showPlaceLabels: !state.showPlaceLabels }))
  },

  setParshaInitialized: () => {
    set({ parshaInitialized: true })
  },

  toggleTerritories: () => {
    set((state) => ({ showTerritories: !state.showTerritories }))
  },

  setSelectedPower: (id: string | null) => {
    set({ selectedPowerId: id })
  },

  toggleArchaeologicalSites: () => {
    set((state) => ({ showArchaeologicalSites: !state.showArchaeologicalSites }))
  },

  setPlaceTypeFilter: (filter: string) => {
    set({ placeTypeFilter: filter })
  },

  setHighlightedPlace: (id: string | null) => {
    set({ highlightedPlaceId: id })
  },

  toggleBasemap: () => {
    set((state) => ({
      basemapStyle: state.basemapStyle === 'voyager' ? 'satellite' : 'voyager',
    }))
  },

  openPlacePanel: (id: string, type: 'place' | 'site') => {
    set({ selectedPlacePanel: { id, type }, selectedPowerId: null })
  },

  closePlacePanel: () => {
    set({ selectedPlacePanel: null })
  },

  triggerFitBounds: () => {
    set((state) => ({ fitBoundsKey: state.fitBoundsKey + 1 }))
  },
}))
