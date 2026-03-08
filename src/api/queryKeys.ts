export const queryKeys = {
  currentParsha: ['currentParsha'] as const,
  parshaText: (ref: string) => ['parshaText', ref] as const,
  wikipedia: (title: string) => ['wikipedia', title] as const,
  sefariaLinks: (ref: string) => ['sefariaLinks', ref] as const,
  sefariaCommentary: (ref: string, commentator: string) => ['sefariaCommentary', ref, commentator] as const,
  wikimediaImage: (filename: string) => ['wikimediaImage', filename] as const,
  metArtifacts: (eraId: string) => ['metArtifacts', eraId] as const,
  verseText: (ref: string) => ['verseText', ref] as const,
}
