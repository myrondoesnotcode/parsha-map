// Per-device progress: finished stories, where a story was left, and the week's steps.
import { create } from 'zustand'

const KEY = 'dl_completed_stories_v1'
const WEEK_KEY = 'dl_week_v1'

function read(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export function isStoryComplete(parshaId: string): boolean {
  return parshaId in read()
}

export function markStoryComplete(parshaId: string) {
  try {
    const all = read()
    all[parshaId] = Date.now()
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch {
    /* storage unavailable — progress just isn't remembered */
  }
  useWeekProgress.getState().update(parshaId, { watched: true, resumeAt: undefined })
}

export function completedCount(): number {
  return Object.keys(read()).length
}

/** The four steps of a week: watch the story, read the verses, pick a question, share it. */
export interface WeekSteps {
  watched?: boolean
  read?: boolean
  /** Index into the story's table questions. */
  question?: number
  shared?: boolean
  /** Card to resume on when a story was left part-way. */
  resumeAt?: number
}

function readWeek(): Record<string, WeekSteps> {
  try {
    return JSON.parse(localStorage.getItem(WEEK_KEY) ?? '{}')
  } catch {
    return {}
  }
}

interface WeekProgressState {
  all: Record<string, WeekSteps>
  update: (parshaId: string, patch: Partial<WeekSteps>) => void
}

export const useWeekProgress = create<WeekProgressState>((set, get) => ({
  all: readWeek(),
  update: (parshaId, patch) => {
    const all = { ...get().all, [parshaId]: { ...get().all[parshaId], ...patch } }
    set({ all })
    try {
      localStorage.setItem(WEEK_KEY, JSON.stringify(all))
    } catch {
      /* not remembered */
    }
  },
}))

export function useSteps(parshaId: string | null): WeekSteps {
  return useWeekProgress((s) => (parshaId ? s.all[parshaId] : undefined)) ?? {}
}
