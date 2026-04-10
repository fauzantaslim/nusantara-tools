import {
  GENDER,
  DIABETES_AGE_RANGE,
  DIABETES_BMI_CATEGORY,
  DIABETES_WAIST_MALE,
  DIABETES_WAIST_FEMALE,
  DIABETES_FAMILY_HISTORY,
  DIABETES_RISK_CATEGORY,
  type GenderType,
  type DiabetesAgeRange,
  type DiabetesBMICategory,
  type DiabetesWaistMale,
  type DiabetesWaistFemale,
  type DiabetesFamilyHistory,
  type DiabetesRiskCategory,
} from "@/lib/constants";

export {
  GENDER,
  DIABETES_AGE_RANGE as AGE_RANGE,
  DIABETES_BMI_CATEGORY as BMI_CATEGORY,
  DIABETES_WAIST_MALE as WAIST_MALE,
  DIABETES_WAIST_FEMALE as WAIST_FEMALE,
  DIABETES_FAMILY_HISTORY as FAMILY_HISTORY,
  DIABETES_RISK_CATEGORY as RISK_CATEGORY,
};

export type Gender = GenderType;
export type AgeRange = DiabetesAgeRange;
export type BMICategory = DiabetesBMICategory;
export type WaistMale = DiabetesWaistMale;
export type WaistFemale = DiabetesWaistFemale;
export type FamilyHistory = DiabetesFamilyHistory;
export type RiskCategory = DiabetesRiskCategory;

export interface FindriscInput {
  gender: Gender;
  ageRange: AgeRange;
  bmiCategory: BMICategory;
  waistMale?: WaistMale;
  waistFemale?: WaistFemale;
  physicalActivity: boolean;
  eatsVegetables: boolean;
  bpMedication: boolean;
  highBloodGlucoseHistory: boolean;
  familyHistory: FamilyHistory;
}

export interface FactorDetail {
  label: string;
  points: number;
  maxPoints: number;
  description: string;
  isHighContributor: boolean;
}

export interface FindriscResult {
  totalScore: number;
  maxScore: 26;
  riskPercent: number;
  category: RiskCategory;
  factors: FactorDetail[];
  recommendations: string[];
  topContributors: string[];
}

export interface DiabetesData {
  gender: Gender;
  ageRange: AgeRange;
  bmiCategory: BMICategory;
  waistMale: WaistMale;
  waistFemale: WaistFemale;
  physicalActivity: boolean;
  eatsVegetables: boolean;
  bpMedication: boolean;
  highBloodGlucoseHistory: boolean;
  familyHistory: FamilyHistory;
  // BMI calc helper state
  heightCm: string;
  weightKg: string;
  calcedBMI: number | null;
  showBMICalc: boolean;
}

export interface DiabetesContextType {
  data: DiabetesData;
  updateData: <K extends keyof DiabetesData>(
    key: K,
    value: DiabetesData[K],
  ) => void;
  result: FindriscResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
  handleBMICalc: () => void;
}
