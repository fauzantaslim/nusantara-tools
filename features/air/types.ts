export type SystemType = "metric" | "imperial";
export type GenderType = "male" | "female";
export type ActivityLevel = "low" | "moderate" | "high";
export type ClimateType = "normal" | "hot" | "humid";
export type AltitudeType = "low" | "high";
export type OutputUnitType = "ml" | "liter" | "cups" | "oz";

export interface WaterInput {
  system: SystemType;
  gender: GenderType;
  age: number;
  weight: number;
  activityLevel: ActivityLevel;
  exerciseDuration: number;
  climate: ClimateType;
  altitude: AltitudeType;
  caffeine: boolean;
  alcohol: boolean;
  highProtein: boolean;
  pregnant: boolean;
  sick: boolean;
  unit: OutputUnitType;
}

export interface HydrationSchedule {
  time: string;
  label: string;
  amount: number;
  percentage: number;
}

export interface WaterResult {
  baseIntakeMl: number;
  totalIntakeMl: number;
  convertedIntake: number;
  unitLabel: string;
  schedule: HydrationSchedule[];
  qualitativeTips: string[];
}

export interface AirData {
  system: SystemType;
  gender: GenderType;
  age: string;
  weight: string;
  activityLevel: ActivityLevel;
  exerciseDuration: string;
  climate: ClimateType;
  altitude: AltitudeType;
  caffeine: boolean;
  alcohol: boolean;
  highProtein: boolean;
  pregnant: boolean;
  sick: boolean;
  unit: OutputUnitType;
}

export interface AirContextType {
  data: AirData;
  updateData: (key: keyof AirData, value: any) => void;
  result: WaterResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
}
