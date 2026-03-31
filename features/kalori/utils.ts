export type SystemType = 'metric' | 'imperial';
export type GenderType = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type GoalType = 'maintain' | 'lose' | 'gain';
export type BMRFormula = 'mifflin' | 'harris' | 'katch';

export interface CalorieInput {
  system: SystemType;
  gender: GenderType;
  age: number;
  weight: number; // in kg (metric) or lbs (imperial)
  heightRaw1: number; // cm OR ft
  heightRaw2?: number; // inch (imperial)
  activityLevel: ActivityLevel;
  goal: GoalType;
  formula: BMRFormula;
  bodyFatPercentage?: number; // optional, mainly for katch
  weightChangeRate?: number; // kg per week (0.25, 0.5, 0.75, 1)
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

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateCalories(input: CalorieInput): CalorieResult {
  // 1. Convert everything to Metric
  let weightInKg = input.weight;
  let heightInCm = input.heightRaw1;

  if (input.system === 'imperial') {
    weightInKg = input.weight * 0.453592;
    // heightRaw1 = feet, heightRaw2 = inches
    const inches = (input.heightRaw1 * 12) + (input.heightRaw2 || 0);
    heightInCm = inches * 2.54;
  }

  // 2. Kalkulasi BMR
  let bmr = 0;
  if (input.formula === 'katch' && input.bodyFatPercentage) {
    // Katch-McArdle: 370 + (21.6 * Lean Body Mass in kg)
    const leanBodyMass = weightInKg * (1 - (input.bodyFatPercentage / 100));
    bmr = 370 + (21.6 * leanBodyMass);
  } else if (input.formula === 'harris') {
    // Harris-Benedict (Original 1919)
    if (input.gender === 'male') {
      bmr = 66.5 + (13.75 * weightInKg) + (5.003 * heightInCm) - (6.75 * input.age);
    } else {
      bmr = 655.1 + (9.563 * weightInKg) + (1.85 * heightInCm) - (4.676 * input.age);
    }
  } else {
    // Mifflin-St Jeor (Default)
    if (input.gender === 'male') {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * input.age) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * input.age) - 161;
    }
  }

  bmr = Math.round(bmr);

  // 3. Kalkulasi TDEE
  const actMultiplier = ACTIVITY_MULTIPLIERS[input.activityLevel] || 1.2;
  const tdee = Math.round(bmr * actMultiplier);

  // 4. Kalkulasi Target Kalori Berdasarkan Goal
  let targetCalories = tdee;
  let warning: string | undefined = undefined;

  if (input.goal === 'lose' && input.weightChangeRate) {
    // Defisit: 7700 kcal per kg (1100 kcal defisit per hari = 1 kg/minggu)
    const deficitPerDay = (7700 * input.weightChangeRate) / 7;
    targetCalories = tdee - deficitPerDay;
  } else if (input.goal === 'gain' && input.weightChangeRate) {
    const surplusPerDay = (7700 * input.weightChangeRate) / 7;
    targetCalories = tdee + surplusPerDay;
  }
  
  targetCalories = Math.round(targetCalories);

  // Minimum safety thresholds
  const MIN_CALORIES_FEMALE = 1200;
  const MIN_CALORIES_MALE = 1500;

  if (input.gender === 'female' && targetCalories < MIN_CALORIES_FEMALE) {
    warning = "Peringatan: Asupan target di bawah 1200 kkal/hari. Ini mungkin tidak aman tanpa pengawasan medis.";
    targetCalories = MIN_CALORIES_FEMALE;
  } else if (input.gender === 'male' && targetCalories < MIN_CALORIES_MALE) {
    warning = "Peringatan: Asupan target di bawah 1500 kkal/hari. Ini mungkin tidak aman tanpa pengawasan medis.";
    targetCalories = MIN_CALORIES_MALE;
  }

  // 5. Kalkulasi Macronutrients
  // Standard distribution depending on goals
  let proteinPerc = 0.30;
  let carbsPerc = 0.40;
  let fatPerc = 0.30;

  if (input.goal === 'lose') {
    proteinPerc = 0.40; // High protein to preserve muscle mass
    carbsPerc = 0.35;
    fatPerc = 0.25;
  } else if (input.goal === 'gain') {
    proteinPerc = 0.25; // Enough protein, more carbs for energy / surplus
    carbsPerc = 0.50;
    fatPerc = 0.25;
  }

  const proteinCal = Math.round(targetCalories * proteinPerc);
  const carbsCal = Math.round(targetCalories * carbsPerc);
  const fatCal = Math.round(targetCalories * fatPerc);

  const macros: MacroResult = {
    proteinCal,
    proteinGrams: Math.round(proteinCal / 4),
    carbsCal,
    carbsGrams: Math.round(carbsCal / 4),
    fatCal,
    fatGrams: Math.round(fatCal / 9),
  };

  return {
    bmr,
    tdee,
    targetCalories,
    goal: input.goal,
    macros,
    warning,
    weightInKg: Math.round(weightInKg * 10) / 10,
    heightInCm: Math.round(heightInCm * 10) / 10,
  };
}
