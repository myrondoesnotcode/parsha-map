import { create } from 'zustand'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

interface AppState {
  selectedParshaId: string | null
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

  setSelectedParsha: (id: string) => void
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

  setSelectedParsha: (id: string) => {
    const parsha = parshas.find((p) => p.id === id)
    const year = parsha?.approximateDateBCE?.start ?? 1900
    set({
      selectedParshaId: id,
      currentYearBCE: year,
      yearSource: 'parsha',
      highlightedPlaceId: null,
    })
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
