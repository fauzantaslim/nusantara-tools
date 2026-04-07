import {
  WHO_LMS,
  Gender,
  GrowthIndicator,
  LMSPoint,
  VALID_BOUNDS,
} from "./who-data";

export type WeightUnit = "kg" | "lbs";
export type LengthUnit = "cm" | "in";

export type GrowthCategory =
  | "severe_low"
  | "low"
  | "normal"
  | "high"
  | "severe_high";

export interface MetricResult {
  zScore: number;
  percentile: number;
  category: GrowthCategory;
  median: number;
  unit: string;
  outOfRange?: boolean; // flag for physiologically implausible values
}

export interface GrowthResult {
  ageMonths: number;
  correctedAgeMonths: number | null;
  weight: MetricResult | null;
  length: MetricResult | null;
  headCirc: MetricResult | null;
  gender: Gender;
}

export interface SavedMeasurement {
  id: string;
  date: string;
  ageMonths: number;
  weight?: number;
  length?: number;
  headCirc?: number;
  weightZ?: number;
  lengthZ?: number;
  headCircZ?: number;
}

// ─── LMS Interpolation ────────────────────────────────────────────────────────

function interpolateLMS(
  data: LMSPoint[],
  ageMonths: number,
): { L: number; M: number; S: number } {
  if (ageMonths <= data[0].month) return data[0];
  const last = data[data.length - 1];
  if (ageMonths >= last.month) return last;

  for (let i = 0; i < data.length - 1; i++) {
    const a = data[i];
    const b = data[i + 1];
    if (ageMonths >= a.month && ageMonths <= b.month) {
      const t = (ageMonths - a.month) / (b.month - a.month);
      return {
        L: a.L + t * (b.L - a.L),
        M: a.M + t * (b.M - a.M),
        S: a.S + t * (b.S - a.S),
      };
    }
  }
  return last;
}

// ─── Z-score (WHO LMS method) ─────────────────────────────────────────────────

function lmsZScore(X: number, L: number, M: number, S: number): number {
  let z: number;
  if (Math.abs(L) < 0.0001) {
    z = Math.log(X / M) / S;
  } else {
    z = (Math.pow(X / M, L) - 1) / (L * S);
  }
  // WHO recommends capping extreme Z-scores (|z|>3) using extended formula,
  // but for display purposes cap at ±10 to prevent astronomical values
  return Math.max(-10, Math.min(10, z));
}

// ─── Normal CDF (Abramowitz & Stegun approximation, error < 7.5e-8) ──────────

function normalCDF(z: number): number {
  const sign = z >= 0 ? 1 : -1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const erf =
    1 -
    (0.254829592 * t -
      0.284496736 * t * t +
      1.421413741 * t * t * t -
      1.453152027 * t * t * t * t +
      1.061405429 * t * t * t * t * t) *
      Math.exp(-x * x);
  return 0.5 * (1 + sign * erf);
}

// ─── Category ─────────────────────────────────────────────────────────────────

function classifyZ(z: number): GrowthCategory {
  if (z < -3) return "severe_low";
  if (z < -2) return "low";
  if (z <= 2) return "normal";
  if (z <= 3) return "high";
  return "severe_high";
}

// ─── Validation bounds check ─────────────────────────────────────────────────

function isOutOfRange(value: number, indicator: GrowthIndicator): boolean {
  const b = VALID_BOUNDS[indicator];
  return value < b.minCm || value > b.maxCm;
}

// ─── Evaluate single metric ───────────────────────────────────────────────────

function evaluate(
  value: number | undefined,
  gender: Gender,
  indicator: GrowthIndicator,
  ageMonths: number,
  unit: string,
): MetricResult | null {
  if (!value || value <= 0) return null;

  const outOfRange = isOutOfRange(value, indicator);
  const lms = interpolateLMS(WHO_LMS[gender][indicator], ageMonths);
  const rawZ = lmsZScore(value, lms.L, lms.M, lms.S);

  // Round to 2 decimal places
  const z = Math.round(rawZ * 100) / 100;
  const percentile = Math.round(normalCDF(z) * 1000) / 10; // 1 dp

  return {
    zScore: z,
    percentile: Math.min(99.9, Math.max(0.1, percentile)),
    category: classifyZ(z),
    median: Math.round(lms.M * 10) / 10,
    unit,
    outOfRange,
  };
}

// ─── Age calculation ──────────────────────────────────────────────────────────

/** Returns whole months between two dates */
export function calcAgeMonths(dob: Date, measureDate: Date): number {
  let months =
    (measureDate.getFullYear() - dob.getFullYear()) * 12 +
    (measureDate.getMonth() - dob.getMonth());
  // Adjust if day of month hasn't been reached yet
  if (measureDate.getDate() < dob.getDate()) months -= 1;
  return Math.max(0, months);
}

/** Corrected age for preemies (applies until 24 months) */
export function calcCorrectedAge(ageMonths: number, gestWeeks: number): number {
  const weeksPremature = Math.max(0, 40 - Math.min(39, gestWeeks));
  const correctionMonths = weeksPremature / 4.345;
  return Math.max(0, Math.round((ageMonths - correctionMonths) * 10) / 10);
}

// ─── Main calculator ──────────────────────────────────────────────────────────

export interface GrowthInput {
  gender: Gender;
  dob: string;
  measureDate: string;
  weight?: number; // always in kg
  length?: number; // always in cm
  headCirc?: number; // always in cm
  isPremature?: boolean;
  gestWeeks?: number;
}

export function calculateGrowth(input: GrowthInput): GrowthResult {
  const dob = new Date(input.dob);
  const mDate = new Date(input.measureDate);
  const ageMonths = calcAgeMonths(dob, mDate);

  const correctedAgeMonths =
    input.isPremature && input.gestWeeks
      ? calcCorrectedAge(ageMonths, input.gestWeeks)
      : null;

  const ageForCalc = correctedAgeMonths ?? ageMonths;

  return {
    ageMonths,
    correctedAgeMonths,
    gender: input.gender,
    weight: evaluate(input.weight, input.gender, "weight", ageForCalc, "kg"),
    length: evaluate(input.length, input.gender, "length", ageForCalc, "cm"),
    headCirc: evaluate(
      input.headCirc,
      input.gender,
      "headCirc",
      ageForCalc,
      "cm",
    ),
  };
}

// ─── Unit conversion ──────────────────────────────────────────────────────────

export function convertWeight(
  val: number,
  from: WeightUnit,
  to: WeightUnit,
): number {
  if (from === to) return val;
  return from === "kg" ? val * 2.20462 : val / 2.20462;
}

export function convertLength(
  val: number,
  from: LengthUnit,
  to: LengthUnit,
): number {
  if (from === to) return val;
  return from === "cm" ? val / 2.54 : val * 2.54;
}

// ─── Category config ──────────────────────────────────────────────────────────

export const CATEGORY_CONFIG: Record<
  GrowthCategory,
  { label: string; color: string; bg: string; border: string }
> = {
  severe_low: {
    label: "Sangat Kurang",
    color: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-500/40",
  },
  low: {
    label: "Di Bawah Normal",
    color: "text-[#FF8A65]",
    bg: "bg-[#9C4A2A]/15",
    border: "border-[#9C4A2A]/30",
  },
  normal: {
    label: "Normal",
    color: "text-[#4A7C59]",
    bg: "bg-[#4A7C59]/15",
    border: "border-[#4A7C59]/30",
  },
  high: {
    label: "Di Atas Normal",
    color: "text-[#C17A3A]",
    bg: "bg-[#C17A3A]/15",
    border: "border-[#C17A3A]/30",
  },
  severe_high: {
    label: "Jauh Di Atas Normal",
    color: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-500/40",
  },
};
