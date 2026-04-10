/**
 * Global Constants for Nusantara Tools
 * Standardized objects to avoid magic strings and duplication
 */

export const GENDER = {
  MALE: "male",
  FEMALE: "female",
} as const;

export type GenderType = (typeof GENDER)[keyof typeof GENDER];

export const SYSTEM = {
  METRIC: "metric",
  IMPERIAL: "imperial",
} as const;

export type SystemType = (typeof SYSTEM)[keyof typeof SYSTEM];

/**
 * Common Activity Levels (BMI, Calories)
 */
export const ACTIVITY_LEVEL = {
  SEDENTARY: "sedentary",
  LIGHT: "light",
  MODERATE: "moderate",
  ACTIVE: "active",
  VERY_ACTIVE: "very_active",
} as const;

export type ActivityLevel =
  (typeof ACTIVITY_LEVEL)[keyof typeof ACTIVITY_LEVEL];

/**
 * BMI Specific
 */
export const BMI_CATEGORY = {
  KURUS: "Kurus",
  NORMAL: "Normal",
  BERLEBIH: "Berlebih",
  OBESITAS: "Obesitas",
} as const;

export type BMICategory = (typeof BMI_CATEGORY)[keyof typeof BMI_CATEGORY];

/**
 * Water Intake (Air) Specific
 */
export const AIR_ACTIVITY_LEVEL = {
  LOW: "low",
  MODERATE: "moderate",
  HIGH: "high",
} as const;

export type AirActivityLevel =
  (typeof AIR_ACTIVITY_LEVEL)[keyof typeof AIR_ACTIVITY_LEVEL];

export const CLIMATE = {
  NORMAL: "normal",
  HOT: "hot",
  HUMID: "humid",
} as const;

export type ClimateType = (typeof CLIMATE)[keyof typeof CLIMATE];

export const ALTITUDE = {
  LOW: "low",
  HIGH: "high",
} as const;

export type AltitudeType = (typeof ALTITUDE)[keyof typeof ALTITUDE];

export const OUTPUT_UNIT = {
  ML: "ml",
  LITER: "liter",
  CUPS: "cups",
  OZ: "oz",
} as const;

export type OutputUnitType = (typeof OUTPUT_UNIT)[keyof typeof OUTPUT_UNIT];

/**
 * One Rep Max (1RM) Specific
 */
export const WEIGHT_UNIT = {
  KG: "kg",
  LBS: "lbs",
} as const;

export type WeightUnit = (typeof WEIGHT_UNIT)[keyof typeof WEIGHT_UNIT];

export const LENGTH_UNIT = {
  CM: "cm",
  IN: "in",
} as const;

export type LengthUnit = (typeof LENGTH_UNIT)[keyof typeof LENGTH_UNIT];

export const ONERM_FORMULA = {
  EPLEY: "epley",
  BRZYCKI: "brzycki",
  LOMBARDI: "lombardi",
} as const;

export type OneRMFormulaType =
  (typeof ONERM_FORMULA)[keyof typeof ONERM_FORMULA];

/**
 * Diabetes (FINDRISC) Specific
 */
export const DIABETES_AGE_RANGE = {
  LT45: "lt45",
  RANGE_45_54: "45_54",
  RANGE_55_64: "55_64",
  GTE65: "gte65",
} as const;

export type DiabetesAgeRange =
  (typeof DIABETES_AGE_RANGE)[keyof typeof DIABETES_AGE_RANGE];

export const DIABETES_BMI_CATEGORY = {
  LT25: "lt25",
  RANGE_25_30: "25_30",
  GT30: "gt30",
} as const;

export type DiabetesBMICategory =
  (typeof DIABETES_BMI_CATEGORY)[keyof typeof DIABETES_BMI_CATEGORY];

export const DIABETES_WAIST_MALE = {
  LT94: "lt94",
  RANGE_94_102: "94_102",
  GT102: "gt102",
} as const;

export type DiabetesWaistMale =
  (typeof DIABETES_WAIST_MALE)[keyof typeof DIABETES_WAIST_MALE];

export const DIABETES_WAIST_FEMALE = {
  LT80: "lt80",
  RANGE_80_88: "80_88",
  GT88: "gt88",
} as const;

export type DiabetesWaistFemale =
  (typeof DIABETES_WAIST_FEMALE)[keyof typeof DIABETES_WAIST_FEMALE];

export const DIABETES_FAMILY_HISTORY = {
  NONE: "none",
  DISTANT: "distant",
  CLOSE: "close",
} as const;

export type DiabetesFamilyHistory =
  (typeof DIABETES_FAMILY_HISTORY)[keyof typeof DIABETES_FAMILY_HISTORY];

export const DIABETES_RISK_CATEGORY = {
  LOW: "low",
  SLIGHTLY_ELEVATED: "slightly_elevated",
  MODERATE: "moderate",
  HIGH: "high",
  VERY_HIGH: "very_high",
} as const;

export type DiabetesRiskCategory =
  (typeof DIABETES_RISK_CATEGORY)[keyof typeof DIABETES_RISK_CATEGORY];
