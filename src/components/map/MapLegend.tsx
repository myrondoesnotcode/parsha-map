import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAllTradeRoutes } from '../../hooks/useTradeRoutes'
import { useAppStore } from '../../store/useAppStore'
import { useTerritories } from '../../hooks/useTerritories'

export function MapLegend() {
  const routes = useAllTradeRoutes()
  const showTerritories = useAppStore((s) => s.showTerritories)
  const showArchaeologicalSites = useAppStore((s) => s.showArchaeologicalSites)
  const currentYearBCE = useAppStore((s) => s.currentYearBCE)
  const territories = useTerritories(currentYearBCE)
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 768)

  const hasContent =
    showArchaeologicalSites ||
    routes.length > 0 ||
    (showTerritories && territories.length > 0)

  if (!hasContent) return null

  return (
    <div className="absolute bottom-20 left-3 z-[1000] bg-surface/90 backdrop-blur-md rounded shadow-ambient px-3 py-2 text-xs min-w-[148px]">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between w-full gap-3"
      >
        <p className="font-label font-semibold text-on-surface-variant text-[10px] uppercase tracking-widest">
          Legend
        </p>
        {collapsed ? (
          <ChevronDown size={11} className="text-on-surface-variant" />
        ) : (
          <ChevronUp size={11} className="text-on-surface-variant" />
        )}
      </button>

      {!collapsed && (
        <div className="space-y-1.5 mt-2">
          {/* Archaeological sites */}
          {showArchaeologicalSites && (
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 shrink-0"
                style={{
                  backgroundColor: '#2d6a4f',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 0 1.5px #fcf9f0',
                }}
              />
              <span className="font-label text-on-surface-variant">Archaeological site</span>
            </div>
          )}

          {/* Trade routes */}
          {routes.map((r) => (
            <div key={r.properties.id} className="flex items-start gap-2">
              <div
                className="h-0 w-5 shrink-0 mt-[7px]"
                style={{ borderTop: `2px dashed ${r.properties.color}` }}
              />
              <div>
                <span className="font-label text-on-surface-variant">{r.properties.name}</span>
                {r.properties.context && (
                  <p className="font-body text-[9px] text-on-surface-variant/60 leading-snug mt-0.5 max-w-[160px]">
                    {r.properties.context}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Territories */}
          {showTerritories && territories.length > 0 && (
            <>
              {territories.slice(0, 5).map((t) => (
                <div key={t.properties.id} className="flex items-center gap-2">
                  <div
                    className="w-4 h-2.5 shrink-0 rounded-sm"
                    style={{
                      backgroundColor: t.properties.fillColor,
                      opacity: 0.85,
                      border: `1px solid ${t.properties.strokeColor}`,
                    }}
                  />
                  <span className="font-label text-on-surface-variant truncate max-w-[120px]">{t.properties.name}</span>
                </div>
              ))}
              {territories.length > 5 && (
                <p className="font-label text-on-surface-variant/60 text-[10px]">+{territories.length - 5} more</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
