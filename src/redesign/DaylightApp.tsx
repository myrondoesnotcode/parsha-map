import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'motion/react'
import { useAppStore } from '../store/useAppStore'
import { useDaylight } from './useDaylight'
import { DaylightMap } from './DaylightMap'
import { TabBar, TopBar } from './Chrome'
import { TodaySheet } from './TodaySheet'
import { MapChrome, PlaceCard } from './MapChrome'
import { StoryPlayer } from './StoryPlayer'
import { ReadScreen, LibraryScreen } from './Screens'
import { getStory } from './stories'
import { useToday, useYear, parshaForWeek, upcomingShabbat, ymd } from './week'
import { isNativeApp } from '../platform'
import './daylight.css'

const LINKED_PARSHA = new URLSearchParams(window.location.search).get('parsha')

export default function DaylightApp() {
  const setSelectedParsha = useAppStore((s) => s.setSelectedParsha)
  const setParshaInitialized = useAppStore((s) => s.setParshaInitialized)
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const { tab, storyOpen, selectedPlaceId, setTab } = useDaylight()
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // A shared link (?parsha=<id>) opens that parsha instead of this week's.
    if (LINKED_PARSHA) {
      setSelectedParsha(LINKED_PARSHA)
      setParshaInitialized()
    }
    // Prototype review links: ?tab=map|read|library opens that tab; ?card=N opens the story on card N.
    const params = new URLSearchParams(window.location.search)
    const reviewTab = params.get('tab')
    if (reviewTab === 'map' || reviewTab === 'read' || reviewTab === 'library') setTab(reviewTab)
    const card = params.get('card')
    if (card !== null) setTimeout(() => useDaylight.getState().openStory(Number(card)), 900)
  }, [setSelectedParsha, setParshaInitialized, setTab])

  // This week's parsha, from Hebcal (rules in weekRules.ts): on launch, again when the
  // Israel/Diaspora toggle re-arms `parshaInitialized`, and when the week rolls over
  // (local midnight Saturday→Sunday) if the reader is still on the week's own parsha.
  const { data: year } = useYear()
  const today = useToday()
  const parshaInitialized = useAppStore((s) => s.parshaInitialized)
  const auto = useRef<{ shabbat: string; id: string } | null>(null)
  const shabbat = ymd(upcomingShabbat(today))
  useEffect(() => {
    if (!year) return
    const rolledOver = auto.current && auto.current.shabbat !== shabbat && auto.current.id === useAppStore.getState().selectedParshaId
    // Read the store, not the render value: the link effect above may have just set it.
    if (useAppStore.getState().parshaInitialized && !rolledOver) return
    const id = parshaForWeek(year, today)
    if (id) {
      // Not written to the URL: a reload after the week rolls over must pick the new week.
      setSelectedParsha(id, { syncUrl: false })
      auto.current = { shabbat, id }
    }
    setParshaInitialized()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, shabbat, parshaInitialized])

  const overMap = tab === 'today' || tab === 'map'
  // With the story closed the map still draws its whole route; the same caveat goes with it.
  const routeShown = !storyOpen && overMap && (getStory(selectedParshaId ?? '')?.route.length ?? 0) > 1

  return (
    <div className="dl-root">
      {/* Wide screens only (CSS hides it below 1100px): the app sits in a column, with a short intro beside it. */}
      {!isNativeApp && (
        <aside className="dl-desk-intro" aria-label="About Parsha Map">
          <div className="dl-desk-mark">
            parsha<span>.</span>map
          </div>
          <p>The weekly Torah portion on a map: its places, its verses and questions for the Shabbat table.</p>
          <a href="https://apps.apple.com/app/id6762464493" target="_blank" rel="noopener noreferrer">
            Get the iPhone app
          </a>
        </aside>
      )}
      <div className="dl-device" data-tab={storyOpen ? 'story' : tab}>
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

        {routeShown && <div className="dl-route-tag dl-route-tag-map">Route illustrative · lines join the stops in order</div>}

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
