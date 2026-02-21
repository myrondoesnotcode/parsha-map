import * as Slider from '@radix-ui/react-slider'
import { useAppStore } from '../../store/useAppStore'
import { EraLabel } from './EraLabel'
import { TimelineTrack } from './TimelineTrack'
import { EraJumpButtons } from './EraJumpButtons'
import { SLIDER_MIN, SLIDER_MAX } from '../../utils/yearUtils'

interface Props {
  compact?: boolean
}

export function TimelineSlider({ compact }: Props) {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const setCurrentYear = useAppStore((s) => s.setCurrentYear)

  const sliderValue = currentYearBCE

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <EraLabel />
        {!compact && (
          <div className="flex items-center gap-2 text-xs text-stone-400 shrink-0">
            <span>{SLIDER_MAX} BCE</span>
            <span>←</span>
            <span className="font-medium text-stone-500">Older</span>
            <span className="text-stone-200">|</span>
            <span className="font-medium text-stone-500">More Recent</span>
            <span>→</span>
            <span>{SLIDER_MIN} BCE</span>
          </div>
        )}
        {compact && (
          <span className="text-xs text-stone-400 shrink-0">{currentYearBCE} BCE</span>
        )}
      </div>

      {/* Era color band */}
      <TimelineTrack />

      {/* Era jump buttons */}
      <EraJumpButtons />

      {/* Slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
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
          className="block w-6 h-6 bg-white border-2 border-amber-500 rounded-full shadow-md
            hover:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
            cursor-grab active:cursor-grabbing transition-colors"
        />
      </Slider.Root>

      {/* Era tick labels — hidden in compact mode */}
      {!compact && (
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
      )}
    </div>
  )
}
