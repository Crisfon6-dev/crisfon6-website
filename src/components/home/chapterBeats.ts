/** Where in a chapter (0..1) each beat appears. The tail after `result` holds everything visible. */
export const BEAT_THRESHOLDS = { problem: 0, decision: 0.3, result: 0.55 } as const;

export type BeatVisibility = { problem: boolean; decision: boolean; result: boolean };

export const ALL_BEATS_VISIBLE: BeatVisibility = { problem: true, decision: true, result: true };

/** Progress through one chapter's window, clamped to [0, 1]; invalid input or windows read as 0. */
export function chapterProgress(progress: number, chapter: { from: number; to: number }): number {
  if (!Number.isFinite(progress)) return 0;
  const span = chapter.to - chapter.from;
  if (!(span > 0)) return 0;
  return Math.min(1, Math.max(0, (progress - chapter.from) / span));
}

/** Which beats are on screen at a chapter-local progress. A case without a decision never shows one. */
export function beatVisibility(p: number, hasDecision: boolean): BeatVisibility {
  const safe = Number.isFinite(p) ? p : 0;
  return {
    problem: safe >= BEAT_THRESHOLDS.problem,
    decision: hasDecision && safe >= BEAT_THRESHOLDS.decision,
    result: safe >= BEAT_THRESHOLDS.result,
  };
}
