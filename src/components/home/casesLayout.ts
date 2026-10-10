export type CasesLayout = 'track' | 'grid';

/** From this width up (and with motion allowed) the featured cases scroll sideways. */
export const CASES_MIN_WIDTH = 1024;

/** Viewport-heights of vertical scroll the pinned horizontal track lasts. */
export const CASES_TRAVEL_VH = 1.5;

export function chooseCasesLayout({
  width,
  reducedMotion,
}: {
  width: number;
  reducedMotion: boolean;
}): CasesLayout {
  return !reducedMotion && width >= CASES_MIN_WIDTH ? 'track' : 'grid';
}
