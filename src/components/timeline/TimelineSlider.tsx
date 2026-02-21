import * as Slider from '@radix-ui/react-slider'
import { useAppStore } from '../../store/useAppStore'
import { EraLabel } from './EraLabel'
import { TimelineTrack } from './TimelineTrack'
import { EraJumpButtons } from './EraJumpButtons'
import { SLIDER_MIN, SLIDER_MAX } from '../../utils/yearUtils'

export function TimelineSlider() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const setCurrentYear = useAppStore((s) => s.setCurrentYear)

  // Slider stores value as BCE (4500 = oldest left, 400 = most recent right)
  // We invert visually so "oldest" is on the left side
  const sliderValue = currentYearBCE

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <EraLabel />
        <div className="flex items-center gap-2 text-xs text-stone-400 shrink-0">
          <span>{SLIDER_MAX} BCE</span>
          <span>←</span>
          <span className="font-medium text-stone-500">Older</span>
          <span className="text-stone-200">|</span>
          <span className="font-medium text-stone-500">More Recent</span>
          <span>→</span>
          <span>{SLIDER_MIN} BCE</span>
        </div>
      </div>

      {/* Era color band */}
      <TimelineTrack />

      {/* Era jump buttons */}
      <EraJumpButtons />

      {/* Slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[sliderValue]}
        min={SLIDER_MIN}
        max={SLIDER_MAX}
        step={50}
        inverted
        onValueChange={([val]) => setCurrentYear(val)}
        aria-label="Timeline year BCE"
      >
        <Slider.Track className="relative bg-transparent grow rounded-full h-2">
          <Slider.Range className="absolute bg-transparent rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-amber-500 rounded-full shadow-md
            hover:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
            cursor-grab active:cursor-grabbing transition-colors"
        />
      </Slider.Root>

      {/* Era tick labels */}
      <div className="relative h-4">
        {[4500, 3300, 2000, 1550, 1200, 900, 586, 400].map((year) => {
          const pct = ((SLIDER_MAX - year) / (SLIDER_MAX - SLIDER_MIN)) * 100
          return (
            <span
              key={year}
              className="absolute text-[10px] text-stone-300 -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${pct}%` }}
            >
              {year}
            </span>
          )
        })}
      </div>
    </div>
  )
}
