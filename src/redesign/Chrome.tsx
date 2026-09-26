import { motion } from 'motion/react'
import { Sun, Map as MapIcon, BookOpen, LayoutGrid, Globe2, Search } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { useDaylight, haptic } from './useDaylight'
import type { Tab } from './useDaylight'
import { C, FONT, SPRING, SHADOW } from './theme'

const TABS: { id: Tab; label: string; Icon: typeof Sun }[] = [
  { id: 'today', label: 'Today', Icon: Sun },
  { id: 'map', label: 'Map', Icon: MapIcon },
  { id: 'read', label: 'Read', Icon: BookOpen },
  { id: 'library', label: 'Library', Icon: LayoutGrid },
]

export function TabBar() {
  const tab = useDaylight((s) => s.tab)
  const setTab = useDaylight((s) => s.setTab)
  return (
    <motion.nav
      initial={{ y: 140 }}
      animate={{ y: 0 }}
      exit={{ y: 140 }}
      transition={SPRING.sheet}
      className="dl-tabbar"
      aria-label="Main"
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = tab === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              if (!active) haptic('light')
              setTab(id)
            }}
            aria-current={active ? 'page' : undefined}
            className="dl-tab"
            style={{ color: active ? C.ink : '#a3a5bd' }}
          >
            {active && <motion.span layoutId="dl-tab-pill" className="dl-tab-pill" transition={SPRING.snappy} />}
            <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon size={17} strokeWidth={2.2} />
              {active && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} style={{ overflow: 'hidden' }}>
                  {label}
                </motion.span>
              )}
            </span>
          </button>
        )
      })}
    </motion.nav>
  )
}

export function TopBar({ onSearch }: { onSearch?: () => void }) {
  const isIsrael = useAppStore((s) => s.isIsrael)
  const toggleRegion = useAppStore((s) => s.toggleRegion)
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -80, opacity: 0 }}
      transition={SPRING.soft}
      className="dl-topbar"
    >
      <div className="dl-pill" style={{ font: `800 20px ${FONT.display}`, letterSpacing: '-0.02em', padding: '7px 14px' }}>
        parsha<span style={{ color: C.warm }}>.</span>map
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <motion.button
          whileTap={{ scale: 0.94 }}
          type="button"
          className="dl-pill"
          onClick={() => {
            haptic('light')
            toggleRegion()
          }}
          style={{ height: 40, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 6, font: `600 13px ${FONT.display}` }}
        >
          <Globe2 size={15} />
          {isIsrael ? 'Israel' : 'Diaspora'}
        </motion.button>
        {onSearch && (
          <motion.button whileTap={{ scale: 0.94 }} type="button" aria-label="Search places" className="dl-pill dl-round" onClick={onSearch}>
            <Search size={17} strokeWidth={2.4} />
          </motion.button>
        )}
      </div>
    </motion.header>
  )
}

/** Staggered letter-by-letter entrance for display titles. Words never break mid-word. */
export function RevealText({ text, delay = 0, style }: { text: string; delay?: number; style?: React.CSSProperties }) {
  let n = 0
  return (
    <span style={{ display: 'inline-block', ...style }} aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={`${text}-${w}`} aria-hidden style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((ch) => {
            const i = n++
            return (
              <motion.span
                key={i}
                style={{ display: 'inline-block' }}
                initial={{ y: '0.5em', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...SPRING.soft, delay: delay + Math.min(i, 40) * 0.024 }}
              >
                {ch}
              </motion.span>
            )
          })}
          {w < text.split(' ').length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }} />}
        </span>
      ))}
    </span>
  )
}

export const floatShadow = SHADOW.float
