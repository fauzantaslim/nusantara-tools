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

export const ONERM_FORMULA = {
  EPLEY: "epley",
  BRZYCKI: "brzycki",
  LOMBARDI: "lombardi",
} as const;

export type OneRMFormulaType =
  (typeof ONERM_FORMULA)[keyof typeof ONERM_FORMULA];
