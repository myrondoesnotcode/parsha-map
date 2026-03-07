export const queryKeys = {
  currentParsha: ['currentParsha'] as const,
  parshaText: (ref: string) => ['parshaText', ref] as const,
  wikipedia: (title: string) => ['wikipedia', title] as const,
  sefariaLinks: (ref: string) => ['sefariaLinks', ref] as const,
  commentary: (ref: string, commentator: string) => ['commentary', ref, commentator] as const,
  metArtifacts: (eraId: string) => ['metArtifacts', eraId] as const,
}
