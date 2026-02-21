import { create } from 'zustand'
import parshaList from '../data/parshaList.json'
import type { ParshaListItem } from '../types/parsha'

const parshas = parshaList as ParshaListItem[]

interface AppState {
  selectedParshaId: string | null
  currentYearBCE: number
  showTradeRoutes: boolean
  showPlaceLabels: boolean
  parshaInitialized: boolean
  showTerritories: boolean
  selectedPowerId: string | null
  showArchaeologicalSites: boolean
  placeTypeFilter: string
  highlightedPlaceId: string | null

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
}

export const useAppStore = create<AppState>((set) => ({
  selectedParshaId: null,
  currentYearBCE: 1900,
  showTradeRoutes: true,
  showPlaceLabels: false,
  parshaInitialized: false,
  showTerritories: false,
  selectedPowerId: null,
  showArchaeologicalSites: false,
  placeTypeFilter: 'all',
  highlightedPlaceId: null,

  setSelectedParsha: (id: string) => {
    const parsha = parshas.find((p) => p.id === id)
    const year = parsha?.approximateDateBCE?.start ?? 1900
    set({
      selectedParshaId: id,
      currentYearBCE: year,
      highlightedPlaceId: null,
    })
  },

  setCurrentYear: (year: number) => {
    set({ currentYearBCE: year })
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
}))
