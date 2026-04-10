export type BMICategory = "Kurus" | "Normal" | "Berlebih" | "Obesitas";
export type SystemType = "metric" | "imperial";
export type GenderType = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very_active";

export interface BMIInput {
  system: SystemType;
  weight: number;
  heightRaw1: number;
  heightRaw2?: number;
  gender: GenderType;
  age: number;
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
  updateData: (key: keyof BMIData, value: any) => void;
  result: BMIResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
}
