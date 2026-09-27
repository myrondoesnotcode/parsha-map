// The story files the app registers: src/redesign/stories/<parshaId>.ts, skipping `_*.ts` (the template)
// and index.ts (the registry). Keep in step with the import.meta.glob pattern in src/redesign/stories/index.ts.
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const STORY_DIR = fileURLToPath(new URL('../src/redesign/stories/', import.meta.url))

export const isStoryFile = (file: string) => file.endsWith('.ts') && !file.startsWith('_') && file !== 'index.ts'

/** Every file in the stories folder, registered or not (so the checker can flag strays). */
export const allStoryDirFiles = () => readdirSync(STORY_DIR).sort()

/** Parsha ids that have a story, from the file names. */
export const storyFileIds = () => allStoryDirFiles().filter(isStoryFile).map((f) => f.slice(0, -3))
