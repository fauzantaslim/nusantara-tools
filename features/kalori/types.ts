import {
  SystemType,
  GenderType,
  ActivityLevel,
  CalorieGoal as GoalType,
  CalorieFormula as BMRFormula,
} from "@/lib/constants";

export type { SystemType, GenderType, ActivityLevel, GoalType, BMRFormula };

export interface CalorieInput {
  system: SystemType;
  gender: GenderType;
  age: number;
  weight: number;
  heightRaw1: number;
  heightRaw2?: number;
  activityLevel: ActivityLevel;
  goal: GoalType;
  formula: BMRFormula;
  bodyFatPercentage?: number;
  weightChangeRate?: number;
}

export interface MacroResult {
  proteinCal: number;
  proteinGrams: number;
  carbsCal: number;
  carbsGrams: number;
  fatCal: number;
  fatGrams: number;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  goal: GoalType;
  macros: MacroResult;
  warning?: string;
  weightInKg: number;
  heightInCm: number;
}

export interface CalorieData {
  system: SystemType;
  gender: GenderType;
  age: string;
  weight: string;
  heightRaw1: string;
  heightRaw2: string;
  activityLevel: ActivityLevel;
  goal: GoalType;
  formula: BMRFormula;
  bodyFat: string;
  weightChangeRate: number;
}

export interface CalorieContextType {
  data: CalorieData;
  updateData: (key: keyof CalorieData, value: any) => void;
  result: CalorieResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
}
