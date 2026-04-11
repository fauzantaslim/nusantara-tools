import { WeightUnit, LengthUnit } from "@/lib/constants";
import { Gender } from "./who-data";

export type { WeightUnit, LengthUnit };

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
  outOfRange?: boolean;
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
  weight?: number; // always in kg
  length?: number; // always in cm
  headCirc?: number; // always in cm
  weightZ?: number;
  lengthZ?: number;
  headCircZ?: number;
}

export interface GrafikBayiData {
  gender: Gender;
  dob: string;
  measureDate: string;
  weightUnit: WeightUnit;
  lengthUnit: LengthUnit;
  weightRaw: string;
  lengthRaw: string;
  headRaw: string;
  isPremature: boolean;
  gestWeeks: string;
}

export interface GrafikBayiContextType {
  data: GrafikBayiData;
  updateData: <K extends keyof GrafikBayiData>(
    key: K,
    value: GrafikBayiData[K],
  ) => void;
  result: GrowthResult | null;
  error: string;
  history: SavedMeasurement[];
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
  handleSave: () => void;
  deleteHistory: (id: string) => void;
}

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
