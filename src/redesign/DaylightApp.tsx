import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'motion/react'
import { useAppStore } from '../store/useAppStore'
import { useAutoSelectParsha } from '../hooks/useAutoSelectParsha'
import { useDaylight } from './useDaylight'
import { DaylightMap } from './DaylightMap'
import { TabBar, TopBar } from './Chrome'
import { TodaySheet } from './TodaySheet'
import { MapChrome, PlaceCard } from './MapChrome'
import { StoryPlayer } from './StoryPlayer'
import { ReadScreen, LibraryScreen } from './Screens'
import './daylight.css'

// Prototype: open on the parsha that has a finished story, unless a link names one.
const PROTOTYPE_START = 'lech-lecha'

export default function DaylightApp() {
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const setParshaInitialized = useAppStore((s) => s.setParshaInitialized)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const { tab, storyOpen, selectedPlaceId, setTab } = useDaylight()
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('parsha')
    setSelectedParsha(fromUrl ?? PROTOTYPE_START)
    setParshaInitialized()
    // Prototype review links: ?card=N opens the story on card N.
    const card = new URLSearchParams(window.location.search).get('card')
    if (card !== null) setTimeout(() => useDaylight.getState().openStory(Number(card)), 900)
  }, [setSelectedParsha, setParshaInitialized])

  // Still honours the Israel/Diaspora toggle, which re-arms weekly auto-selection.
  useAutoSelectParsha()

  const overMap = tab === 'today' || tab === 'map'

  return (
    <div className="dl-root">
      <div className="dl-device">
        <DaylightMap />

        <AnimatePresence>
          {!storyOpen && overMap && (
            <TopBar
              key="top"
              onSearch={
                tab === 'today'
                  ? () => {
                      setTab('map')
                      setTimeout(() => searchRef.current?.focus(), 350)
                    }
                  : undefined
              }
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!storyOpen && tab === 'map' && <MapChrome key="mapchrome" searchRef={searchRef} />}
        </AnimatePresence>

        <AnimatePresence>
          {!storyOpen && tab === 'today' && selectedParshaId && <TodaySheet key="today" />}
        </AnimatePresence>

        <AnimatePresence>{!storyOpen && overMap && selectedPlaceId && <PlaceCard key={selectedPlaceId} />}</AnimatePresence>

        <AnimatePresence>
          {!storyOpen && tab === 'read' && <ReadScreen key="read" />}
          {!storyOpen && tab === 'library' && <LibraryScreen key="library" />}
        </AnimatePresence>

        <AnimatePresence>{!storyOpen && <TabBar key="tabs" />}</AnimatePresence>

        <AnimatePresence>{storyOpen && <StoryPlayer key="story" />}</AnimatePresence>
      </div>
    </div>
  )
}
