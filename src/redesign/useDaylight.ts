import { create } from 'zustand'
import type { MapRef } from 'react-map-gl/maplibre'

export type Tab = 'today' | 'map' | 'read' | 'library'

interface DaylightState {
  tab: Tab
  storyOpen: boolean
  storyIndex: number
  selectedPlaceId: string | null
  layersOpen: boolean
  showTrade: boolean
  showEmpires: boolean
  setTab: (tab: Tab) => void
  openStory: (index?: number) => void
  closeStory: () => void
  setStoryIndex: (i: number) => void
  selectPlace: (id: string | null) => void
  toggleLayers: () => void
  toggleTrade: () => void
  toggleEmpires: () => void
}

export const useDaylight = create<DaylightState>((set) => ({
  tab: 'today',
  storyOpen: false,
  storyIndex: 0,
  selectedPlaceId: null,
  layersOpen: false,
  showTrade: false,
  showEmpires: false,
  setTab: (tab) => set({ tab, selectedPlaceId: null, layersOpen: false }),
  openStory: (index = 0) => set({ storyOpen: true, storyIndex: index, selectedPlaceId: null }),
  closeStory: () => set({ storyOpen: false }),
  setStoryIndex: (storyIndex) => set({ storyIndex }),
  selectPlace: (selectedPlaceId) => set({ selectedPlaceId }),
  toggleLayers: () => set((s) => ({ layersOpen: !s.layersOpen })),
  toggleTrade: () => set((s) => ({ showTrade: !s.showTrade })),
  toggleEmpires: () => set((s) => ({ showEmpires: !s.showEmpires })),
}))

// The single map instance, shared so any screen can move the camera.
export const mapHandle: { current: MapRef | null } = { current: null }

/** Light tap feedback: native haptics inside the iOS app, a short vibration elsewhere. */
export function haptic(style: 'light' | 'medium' = 'light') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cap = (window as any).Capacitor
  const Haptics = cap?.Plugins?.Haptics
  if (Haptics?.impact) {
    Haptics.impact({ style: style === 'light' ? 'LIGHT' : 'MEDIUM' }).catch(() => {})
    return
  }
  navigator.vibrate?.(style === 'light' ? 8 : 14)
}
