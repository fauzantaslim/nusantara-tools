// WHO Child Growth Standards (2006) — LMS Reference Data
// Source: https://www.who.int/tools/child-growth-standards/standards
// Coverage: 0–60 months — monthly for 0–6, quarterly thereafter

export type Gender = 'male' | 'female';
export type GrowthIndicator = 'weight' | 'length' | 'headCirc';

export interface LMSPoint {
  month: number;
  L: number; // Box-Cox power
  M: number; // Median
  S: number; // Coefficient of variation
}

// ─── Boys ───────────────────────────────────────────────────────────────────

const boysWeight: LMSPoint[] = [
  { month: 0,  L: 0.3487,  M: 3.3464,  S: 0.14602 },
  { month: 1,  L: 0.2297,  M: 4.4709,  S: 0.13395 },
  { month: 2,  L: 0.1970,  M: 5.5675,  S: 0.12385 },
  { month: 3,  L: 0.1857,  M: 6.3762,  S: 0.11727 },
  { month: 4,  L: 0.1855,  M: 7.0023,  S: 0.11316 },
  { month: 5,  L: 0.1816,  M: 7.5105,  S: 0.11096 },
  { month: 6,  L: 0.1714,  M: 7.9340,  S: 0.10927 },
  { month: 9,  L: 0.1195,  M: 8.9014,  S: 0.10856 },
  { month: 12, L: 0.0589,  M: 9.6242,  S: 0.11245 },
  { month: 18, L: -0.0630, M: 10.8160, S: 0.12089 },
  { month: 24, L: -0.1665, M: 11.8694, S: 0.12737 },
  { month: 36, L: -0.3514, M: 13.8489, S: 0.13614 },
  { month: 48, L: -0.5252, M: 15.8023, S: 0.14297 },
  { month: 60, L: -0.6984, M: 17.7730, S: 0.14953 },
];

const boysLength: LMSPoint[] = [
  { month: 0,  L: 1.0, M: 49.88,  S: 0.03795 },
  { month: 1,  L: 1.0, M: 54.72,  S: 0.03557 },
  { month: 2,  L: 1.0, M: 58.42,  S: 0.03243 },
  { month: 3,  L: 1.0, M: 61.43,  S: 0.03067 },
  { month: 4,  L: 1.0, M: 63.89,  S: 0.02953 },
  { month: 5,  L: 1.0, M: 65.90,  S: 0.02910 },
  { month: 6,  L: 1.0, M: 67.62,  S: 0.02912 },
  { month: 9,  L: 1.0, M: 72.00,  S: 0.02870 },
  { month: 12, L: 1.0, M: 75.75,  S: 0.02897 },
  { month: 18, L: 1.0, M: 82.32,  S: 0.02969 },
  { month: 24, L: 1.0, M: 87.77,  S: 0.03084 },
  { month: 36, L: 1.0, M: 96.10,  S: 0.03229 },
  { month: 48, L: 1.0, M: 103.31, S: 0.03463 },
  { month: 60, L: 1.0, M: 110.00, S: 0.03626 },
];

const boysHead: LMSPoint[] = [
  { month: 0,  L: 1.0, M: 34.47, S: 0.03661 },
  { month: 1,  L: 1.0, M: 37.87, S: 0.03309 },
  { month: 2,  L: 1.0, M: 39.42, S: 0.03032 },
  { month: 3,  L: 1.0, M: 40.51, S: 0.03207 },
  { month: 4,  L: 1.0, M: 41.74, S: 0.03018 },
  { month: 5,  L: 1.0, M: 42.61, S: 0.03052 },
  { month: 6,  L: 1.0, M: 43.33, S: 0.03175 },
  { month: 9,  L: 1.0, M: 45.15, S: 0.03196 },
  { month: 12, L: 1.0, M: 46.57, S: 0.03279 },
  { month: 18, L: 1.0, M: 48.05, S: 0.03470 },
  { month: 24, L: 1.0, M: 49.13, S: 0.03569 },
  { month: 36, L: 1.0, M: 50.35, S: 0.03674 },
  { month: 48, L: 1.0, M: 51.17, S: 0.03718 },
  { month: 60, L: 1.0, M: 51.89, S: 0.03813 },
];

// ─── Girls ──────────────────────────────────────────────────────────────────

const girlsWeight: LMSPoint[] = [
  { month: 0,  L: 0.3809,  M: 3.2322,  S: 0.14171 },
  { month: 1,  L: 0.2773,  M: 4.1873,  S: 0.13724 },
  { month: 2,  L: 0.2579,  M: 5.1282,  S: 0.13000 },
  { month: 3,  L: 0.2437,  M: 5.8458,  S: 0.12729 },
  { month: 4,  L: 0.2388,  M: 6.4237,  S: 0.12435 },
  { month: 5,  L: 0.2339,  M: 6.8985,  S: 0.12258 },
  { month: 6,  L: 0.2261,  M: 7.2973,  S: 0.12131 },
  { month: 9,  L: 0.1813,  M: 8.2220,  S: 0.12025 },
  { month: 12, L: 0.1132,  M: 8.9481,  S: 0.12248 },
  { month: 18, L: -0.0557, M: 10.2113, S: 0.12995 },
  { month: 24, L: -0.1886, M: 11.5022, S: 0.13490 },
  { month: 36, L: -0.3737, M: 13.9120, S: 0.13919 },
  { month: 48, L: -0.4865, M: 16.1178, S: 0.13914 },
  { month: 60, L: -0.5666, M: 18.2025, S: 0.13977 },
];

const girlsLength: LMSPoint[] = [
  { month: 0,  L: 1.0, M: 49.15,  S: 0.03790 },
  { month: 1,  L: 1.0, M: 53.74,  S: 0.03631 },
  { month: 2,  L: 1.0, M: 57.07,  S: 0.03237 },
  { month: 3,  L: 1.0, M: 59.80,  S: 0.03099 },
  { month: 4,  L: 1.0, M: 62.09,  S: 0.02993 },
  { month: 5,  L: 1.0, M: 64.03,  S: 0.02953 },
  { month: 6,  L: 1.0, M: 65.73,  S: 0.02941 },
  { month: 9,  L: 1.0, M: 70.14,  S: 0.02891 },
  { month: 12, L: 1.0, M: 73.95,  S: 0.02913 },
  { month: 18, L: 1.0, M: 80.68,  S: 0.02968 },
  { month: 24, L: 1.0, M: 86.36,  S: 0.03122 },
  { month: 36, L: 1.0, M: 95.12,  S: 0.03269 },
  { month: 48, L: 1.0, M: 102.68, S: 0.03472 },
  { month: 60, L: 1.0, M: 109.37, S: 0.03685 },
];

const girlsHead: LMSPoint[] = [
  { month: 0,  L: 1.0, M: 33.88, S: 0.03693 },
  { month: 1,  L: 1.0, M: 37.03, S: 0.03334 },
  { month: 2,  L: 1.0, M: 38.49, S: 0.03097 },
  { month: 3,  L: 1.0, M: 39.44, S: 0.03274 },
  { month: 4,  L: 1.0, M: 40.45, S: 0.03058 },
  { month: 5,  L: 1.0, M: 41.27, S: 0.03082 },
  { month: 6,  L: 1.0, M: 42.22, S: 0.03213 },
  { month: 9,  L: 1.0, M: 44.03, S: 0.03255 },
  { month: 12, L: 1.0, M: 45.26, S: 0.03298 },
  { month: 18, L: 1.0, M: 46.84, S: 0.03486 },
  { month: 24, L: 1.0, M: 47.83, S: 0.03521 },
  { month: 36, L: 1.0, M: 49.10, S: 0.03633 },
  { month: 48, L: 1.0, M: 50.05, S: 0.03689 },
  { month: 60, L: 1.0, M: 50.70, S: 0.03781 },
];

export const WHO_LMS: Record<Gender, Record<GrowthIndicator, LMSPoint[]>> = {
  male:   { weight: boysWeight,  length: boysLength,  headCirc: boysHead  },
  female: { weight: girlsWeight, length: girlsLength, headCirc: girlsHead },
};

// ─── Physiological validation bounds ────────────────────────────────────────
// Values outside these ranges at the given age should trigger a warning

export const VALID_BOUNDS: Record<GrowthIndicator, { minCm: number; maxCm: number; unit: string }> = {
  weight:   { minCm: 0.5,  maxCm: 30,  unit: 'kg'  },
  length:   { minCm: 40,   maxCm: 130, unit: 'cm'  },
  headCirc: { minCm: 25,   maxCm: 65,  unit: 'cm'  },
};
