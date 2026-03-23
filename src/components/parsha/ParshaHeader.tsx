import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, ExternalLink, Lightbulb } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { getParshaById } from '../../utils/parshaUtils'
import { formatYearBCE } from '../../utils/yearUtils'
import { useCurrentParsha } from '../../hooks/useCurrentParsha'
import { useWikimediaImage } from '../../hooks/useWikimediaImage'
import parshaList from '../../data/parshaList.json'
import type { ParshaListItem, ParshaRichContent } from '../../types/parsha'

const parshas = parshaList as ParshaListItem[]

function ParshaImage({ url, caption, name }: { url: string; caption?: string; name: string }) {
  return (
    <div className="mt-3 -mx-4 relative">
      <img
        src={url}
        alt={caption ?? `${name} illustration`}
        className="w-full object-cover max-h-52"
        onError={(e) => {
          (e.currentTarget.parentElement as HTMLElement).style.display = 'none'
        }}
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 py-2.5">
          <p className="text-[10px] text-white/90 italic leading-snug">{caption}</p>
        </div>
      )}
    </div>
  )
}

function ParshaImageFromWikimedia({ specialFilepathUrl, caption, name }: { specialFilepathUrl: string; caption?: string; name: string }) {
  const { data: resolvedUrl } = useWikimediaImage(specialFilepathUrl)
  return <ParshaImage url={resolvedUrl ?? specialFilepathUrl} caption={caption} name={name} />
}

function ParshaChips({ richContent }: { richContent: ParshaRichContent }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {richContent.themes.length > 0 && (
        <div>
          <p className="font-label text-[10px] font-medium text-on-surface-variant uppercase tracking-widest mb-1.5">
            Themes
          </p>
          <div className="flex flex-wrap gap-1.5">
            {richContent.themes.map((theme) => (
              <span
                key={theme}
                className="px-2 py-0.5 font-label text-xs rounded-full bg-primary-container text-on-primary-container"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}
      {richContent.keyFigures.length > 0 && (
        <div>
          <p className="font-label text-[10px] font-medium text-on-surface-variant uppercase tracking-widest mb-1.5">
            Key Figures
          </p>
          <div className="flex flex-wrap gap-1.5">
            {richContent.keyFigures.map((figure) => (
              <span
                key={figure}
                className="px-2 py-0.5 font-label text-xs rounded-full bg-surface-container-high text-on-surface"
              >
                {figure}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ParshaDeepDive({ richContent }: { richContent: ParshaRichContent }) {
  return (
    <div className="mt-3 flex flex-col gap-3">
      {richContent.narrativeSummary && (
        <div className="border-l-2 border-primary/40 pl-3">
          <p className="font-label text-[10px] font-medium text-on-surface-variant uppercase tracking-widest mb-1">
            Full Narrative
          </p>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            {richContent.narrativeSummary}
          </p>
        </div>
      )}
      {richContent.didYouKnow && (
        <div className="flex gap-2 px-3 py-2.5 bg-tertiary-container rounded">
          <Lightbulb size={14} className="text-on-tertiary-container shrink-0 mt-0.5" />
          <div>
            <p className="font-label text-[10px] font-medium text-on-tertiary-container uppercase tracking-widest mb-1">
              Did You Know
            </p>
            <p className="font-body text-xs text-on-tertiary-container leading-relaxed">
              {richContent.didYouKnow}
            </p>
          </div>
        </div>
      )}
      {richContent.historicalContext && (
        <div className="rounded-lg px-3 py-2.5 bg-primary-fixed/40 border border-primary-fixed">
          <p className="font-label text-[10px] font-medium text-on-primary-fixed uppercase tracking-widest mb-1">
            Historical Context
          </p>
          <p className="font-body text-xs text-on-primary-fixed leading-relaxed">
            {richContent.historicalContext}
          </p>
        </div>
      )}
      {richContent.jewishTradition && (
        <div className="rounded-lg px-3 py-2.5 bg-secondary-fixed/40 border border-secondary-fixed">
          <p className="font-label text-[10px] font-medium text-on-secondary-fixed uppercase tracking-widest mb-1">
            In Jewish Tradition
          </p>
          <p className="font-body text-xs text-on-secondary-fixed leading-relaxed">
            {richContent.jewishTradition}
          </p>
        </div>
      )}
    </div>
  )
}

export function ParshaHeader({ summaryCollapsed = false }: { summaryCollapsed?: boolean }) {
  const selectedParshaId = useAppStore((s) => s.selectedParshaId)
  const { data: currentParsha } = useCurrentParsha()
  const [deepDiveOpen, setDeepDiveOpen] = useState(false)

  const parsha = selectedParshaId ? getParshaById(selectedParshaId) : null

  const currentWeekParsha = currentParsha
    ? parshas.find(
        (p) =>
          p.name.toLowerCase().replace(/[^a-z]/g, '') ===
          currentParsha.displayValue.en.toLowerCase().replace(/[^a-z]/g, '')
      )
    : null

  if (!parsha) {
    return (
      <div className="px-4 py-4 bg-surface-container-low shrink-0">
        <div className="flex items-center gap-2 text-on-surface-variant font-label text-sm">
          <BookOpen size={16} />
          <span>Select a Parsha to begin</span>
        </div>
        {currentWeekParsha && (
          <p className="mt-2 font-label text-xs text-on-surface-variant">
            This week:{' '}
            <span className="font-medium text-primary">{currentWeekParsha.name}</span>
          </p>
        )}
      </div>
    )
  }

  const richContent = parsha.richContent

  return (
    <div className="bg-surface-container-low shrink-0">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="font-headline text-xl font-semibold text-on-surface leading-tight">
              {parsha.name}
            </h2>
            <p className="font-label text-xs text-on-surface-variant uppercase tracking-widest mt-0.5">{parsha.book}</p>
          </div>
          <span className="font-hebrew text-xl text-on-surface-variant leading-tight shrink-0">
            {parsha.hebrewName}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-label text-xs text-on-surface-variant">
          <span>Portion {parsha.number} of {parshas.length}</span>
          {parsha.approximateDateBCE.start && (
            <span>
              {formatYearBCE(parsha.approximateDateBCE.start)}
              {parsha.approximateDateBCE.end &&
                parsha.approximateDateBCE.end !== parsha.approximateDateBCE.start
                ? ` – ${formatYearBCE(parsha.approximateDateBCE.end)}`
                : ''}
            </span>
          )}
          {currentWeekParsha?.id === parsha.id && (
            <span className="text-primary font-medium">This week's portion</span>
          )}
        </div>

        {!summaryCollapsed && (
          <>
            {(parsha.summary || richContent?.narrativeSummary) && (
              <p className="mt-2 font-body text-sm text-on-surface-variant leading-relaxed">
                {parsha.summary ?? richContent?.narrativeSummary}
              </p>
            )}
          </>
        )}
      </div>

      {parsha.doreImageUrl && (
        <ParshaImageFromWikimedia
          specialFilepathUrl={parsha.doreImageUrl}
          caption={parsha.doreImageCaption}
          name={parsha.name}
        />
      )}

      {richContent && !summaryCollapsed && (
        <>
          <div className="px-4 pt-1 pb-0">
            {deepDiveOpen && <ParshaDeepDive richContent={richContent} />}
          </div>
          <button
            onClick={() => setDeepDiveOpen((v) => !v)}
            className="flex items-center gap-1 font-label text-xs text-primary hover:text-primary/80 font-medium px-4 py-2"
          >
            {deepDiveOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
            {deepDiveOpen ? 'Show less' : 'Learn more'}
          </button>
        </>
      )}

      {parsha.commentaryUrl && (
        <div className="px-4 py-2.5">
          <a
            href={parsha.commentaryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-label text-xs text-tertiary hover:text-tertiary/80 font-medium"
          >
            Read commentary by Michael Eisenberg
            <ExternalLink size={10} />
          </a>
        </div>
      )}

      {richContent && !summaryCollapsed && (
        <div className="px-4 pb-3">
          <ParshaChips richContent={richContent} />
        </div>
      )}
    </div>
  )
}
