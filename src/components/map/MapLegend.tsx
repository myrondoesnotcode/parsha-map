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
  const [collapsed, setCollapsed] = useState(false)

  const hasContent =
    showArchaeologicalSites ||
    routes.length > 0 ||
    (showTerritories && territories.length > 0)

  if (!hasContent) return null

  return (
    <div className="absolute bottom-20 left-3 z-[1000] bg-white/90 backdrop-blur-md rounded-xl shadow-md border border-white/70 px-3 py-2 text-xs min-w-[148px]">
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between w-full gap-3"
      >
        <p className="font-semibold text-stone-500 text-[10px] uppercase tracking-wider">
          Legend
        </p>
        {collapsed ? (
          <ChevronDown size={11} className="text-stone-400" />
        ) : (
          <ChevronUp size={11} className="text-stone-400" />
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
                  backgroundColor: '#7C3AED',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 0 1.5px white',
                }}
              />
              <span className="text-stone-500">Archaeological site</span>
            </div>
          )}

          {/* Trade routes */}
          {routes.map((r) => (
            <div key={r.properties.id} className="flex items-center gap-2">
              <div
                className="h-0 w-5 shrink-0"
                style={{ borderTop: `2px dashed ${r.properties.color}` }}
              />
              <span className="text-stone-500">{r.properties.name}</span>
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
                  <span className="text-stone-500 truncate max-w-[120px]">{t.properties.name}</span>
                </div>
              ))}
              {territories.length > 5 && (
                <p className="text-stone-400 text-[10px]">+{territories.length - 5} more</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
