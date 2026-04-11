import {
  GENDER,
  SYSTEM,
  ACTIVITY_LEVEL,
  BMI_CATEGORY,
  type GenderType,
  type SystemType,
  type ActivityLevel,
  type BMICategory,
} from "@/lib/constants";

export { GENDER, SYSTEM, ACTIVITY_LEVEL, BMI_CATEGORY };
export type { GenderType, SystemType, ActivityLevel, BMICategory };

export interface BMIInput {
  system: SystemType;
  gender: GenderType;
  age: number;
  weight: number;
  heightRaw1: number;
  heightRaw2?: number;
  activityLevel: ActivityLevel;
}

export interface BMIResult {
  score: number;
  category: BMICategory;
  insight: string;
  idealWeightRange: string;
  bodyFatPercentage: number;
  dailyCalories: number;
}

export interface BMIData {
  system: SystemType;
  gender: GenderType;
  age: string;
  weight: string;
  heightRaw1: string;
  heightRaw2: string;
  activityLevel: ActivityLevel;
}

export interface BMIContextType {
  data: BMIData;
  updateData: <K extends keyof BMIData>(key: K, value: BMIData[K]) => void;
  result: BMIResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
}
