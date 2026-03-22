import { useAppStore } from '../../store/useAppStore'
import { useEraContext } from '../../hooks/useEraContext'
import { formatYearBCE } from '../../utils/yearUtils'

export function EraLabel() {
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const { era } = useEraContext(currentYearBCE)

  return (
    <div className="flex items-center gap-3 min-w-0">
      {era && (
        <div
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: era.color }}
        />
      )}
      <div className="min-w-0">
        <span className="font-label text-sm font-medium text-on-surface truncate block">
          {era ? era.name : 'Unknown Period'}
        </span>
        <span className="font-label text-xs text-on-surface-variant">{formatYearBCE(currentYearBCE)}</span>
      </div>
    </div>
  )
}
