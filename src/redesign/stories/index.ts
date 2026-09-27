// Parsha Stories registry. Every `stories/<parshaId>.ts` file is picked up here automatically:
// adding a story means adding one file, never editing a shared one. Files starting with `_`
// (the template) are skipped. `npm run check:stories` checks that each file's name matches its parshaId.
import type { ParshaStory } from '../story'

export * from '../story'

const FILES = import.meta.glob<ParshaStory>(['./*.ts', '!./_*.ts', '!./index.ts'], { eager: true, import: 'default' })

const STORIES: Record<string, ParshaStory> = Object.fromEntries(Object.values(FILES).map((story) => [story.parshaId, story]))

export function getStory(parshaId: string | null): ParshaStory | null {
  return parshaId ? STORIES[parshaId] ?? null : null
}
