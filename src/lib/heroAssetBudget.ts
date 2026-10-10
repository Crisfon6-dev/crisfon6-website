import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

/** Budgets in BYTES, never MB or MiB (the two differ by about 5% and caused a real mix-up). */
export const HERO_ASSET_BUDGET = { video: 15_000_000, poster: 200_000, still: 150_000 } as const;

/** Terms that must never appear in a hero asset file name. Real client names come via the env list. */
const BUILT_IN_DENYLIST = ['aphrodite', 'nsfw', 'adult', 'stealth'];

/** Scrubbing seeks to any frame, so keyframes must be close: a seek decodes at most this many frames. */
export const MAX_KEYFRAME_INTERVAL = 6;

/** The only format tags allowed: the container's own brand fields. */
const ALLOWED_FORMAT_TAGS = new Set(['major_brand', 'minor_version', 'compatible_brands']);

type Options = { probe?: boolean; extraDenylist?: readonly string[] };
export type AssetCheck = { ok: boolean; violations: string[] };

export function toolsAvailable(): boolean {
  try {
    execFileSync('ffprobe', ['-version'], { stdio: 'ignore' });
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function probe(args: string[]): string {
  return execFileSync('ffprobe', ['-v', 'error', ...args], { encoding: 'utf8' });
}

function checkVideoStreams(file: string, name: string, violations: string[]) {
  const streamTypes = probe(['-show_entries', 'stream=codec_type', '-of', 'csv=p=0', file])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (streamTypes.includes('audio')) violations.push(`${name}: has an audio stream`);

  const frameTypes = probe([
    '-select_streams',
    'v:0',
    '-show_entries',
    'frame=pict_type',
    '-of',
    'csv=p=0',
    file,
  ])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  // csv output can carry a trailing empty field ("I,"), so compare only the first field
  let longestRun = 0;
  let run = 0;
  for (const line of frameTypes) {
    run = line.split(',')[0] === 'I' ? 1 : run + 1;
    longestRun = Math.max(longestRun, run);
  }
  if (
    frameTypes.length === 0 ||
    frameTypes[0].split(',')[0] !== 'I' ||
    longestRun > MAX_KEYFRAME_INTERVAL
  ) {
    violations.push(
      `${name}: keyframes are too far apart (longest stretch ${longestRun} frames, max ${MAX_KEYFRAME_INTERVAL})`
    );
  }

  const tags = JSON.parse(probe(['-show_entries', 'format_tags', '-of', 'json', file])) as {
    format?: { tags?: Record<string, string> };
  };
  const extraTags = Object.keys(tags.format?.tags ?? {}).filter(
    (key) => !ALLOWED_FORMAT_TAGS.has(key)
  );
  if (extraTags.length > 0) violations.push(`${name}: has format tags (${extraTags.join(', ')})`);
}

/** Checks every file in a hero asset directory against the byte budgets and hygiene rules. */
export function checkHeroAssets(dir: string, options: Options = {}): AssetCheck {
  const violations: string[] = [];
  if (!existsSync(dir)) {
    return { ok: false, violations: [`${dir}: directory not found`] };
  }
  const denylist = [...BUILT_IN_DENYLIST, ...(options.extraDenylist ?? [])].map((term) =>
    term.toLowerCase()
  );

  for (const name of readdirSync(dir).sort()) {
    const file = path.join(dir, name);
    if (!statSync(file).isFile()) continue;
    const bytes = statSync(file).size;
    const lower = name.toLowerCase();
    const ext = path.extname(lower);

    if (!/-v\d+/.test(lower)) violations.push(`${name}: missing a version suffix such as -v1`);
    if (denylist.some((term) => term && lower.includes(term))) {
      violations.push(`${name}: file name contains a denylisted term`);
    }
    if (ext !== '.mp4' && ext !== '.webp') {
      violations.push(`${name}: unexpected file type ${ext || '(none)'}`);
      continue;
    }
    if (ext === '.mp4') {
      if (lower.includes('mobile')) violations.push(`${name}: a mobile video must not exist`);
      if (bytes > HERO_ASSET_BUDGET.video) {
        violations.push(
          `${name}: ${bytes} bytes exceeds the ${HERO_ASSET_BUDGET.video} byte budget`
        );
      }
      if (options.probe) checkVideoStreams(file, name, violations);
    } else {
      const limit = lower.includes('poster') ? HERO_ASSET_BUDGET.poster : HERO_ASSET_BUDGET.still;
      if (bytes > limit)
        violations.push(`${name}: ${bytes} bytes exceeds the ${limit} byte budget`);
    }
  }
  return { ok: violations.length === 0, violations };
}
