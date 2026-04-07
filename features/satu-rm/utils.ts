export type WeightUnit = "kg" | "lbs";
export type FormulaType = "epley" | "brzycki" | "lombardi";

export interface OneRMInput {
  weight: number;
  reps: number;
  unit: WeightUnit;
  outputUnit: WeightUnit;
  formula: FormulaType;
}

export interface PercentageRow {
  percent: number;
  weight: number;
  reps: number;
}

export interface OneRMResult {
  oneRM: number;
  unit: WeightUnit;
  formula: FormulaType;
  formulaLabel: string;
  percentageTable: PercentageRow[];
  comparisonResults: { formula: FormulaType; label: string; value: number }[];
}

// --- Formulas ---
function calculateEpley(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return weight * (1 + reps / 30);
}

function calculateBrzycki(weight: number, reps: number): number {
  if (reps === 1) return weight;
  if (reps >= 37) return weight; // safety guard
  return weight * (36 / (37 - reps));
}

function calculateLombardi(weight: number, reps: number): number {
  if (reps === 1) return weight;
  return weight * Math.pow(reps, 0.1);
}

function compute(formula: FormulaType, weight: number, reps: number): number {
  switch (formula) {
    case "epley":
      return calculateEpley(weight, reps);
    case "brzycki":
      return calculateBrzycki(weight, reps);
    case "lombardi":
      return calculateLombardi(weight, reps);
  }
}

const FORMULA_LABELS: Record<FormulaType, string> = {
  epley: "Epley",
  brzycki: "Brzycki",
  lombardi: "Lombardi",
};

// Approximate rep ranges for % 1RM (standard powerlifting table)
const PERCENT_REP_MAP: { percent: number; reps: number }[] = [
  { percent: 100, reps: 1 },
  { percent: 95, reps: 2 },
  { percent: 90, reps: 3 },
  { percent: 85, reps: 5 },
  { percent: 80, reps: 6 },
  { percent: 75, reps: 8 },
  { percent: 70, reps: 10 },
  { percent: 65, reps: 12 },
  { percent: 60, reps: 15 },
];

function convertWeight(
  value: number,
  from: WeightUnit,
  to: WeightUnit,
): number {
  if (from === to) return value;
  if (from === "kg" && to === "lbs") return value * 2.20462;
  return value / 2.20462; // lbs → kg
}

export function calculateOneRM(input: OneRMInput): OneRMResult {
  const { weight, reps, unit, outputUnit, formula } = input;

  // Convert to kg for calculation, then output in desired unit
  const weightInKg =
    unit === "lbs" ? convertWeight(weight, "lbs", "kg") : weight;

  const oneRMKg = compute(formula, weightInKg, reps);
  const oneRM = Math.round(convertWeight(oneRMKg, "kg", outputUnit) * 10) / 10;

  // Percentage table
  const percentageTable: PercentageRow[] = PERCENT_REP_MAP.map(
    ({ percent, reps: r }) => ({
      percent,
      reps: r,
      weight:
        Math.round(
          convertWeight((oneRMKg * percent) / 100, "kg", outputUnit) * 10,
        ) / 10,
    }),
  );

  // All-formula comparison
  const comparisonResults = (
    ["epley", "brzycki", "lombardi"] as FormulaType[]
  ).map((f) => ({
    formula: f,
    label: FORMULA_LABELS[f],
    value:
      Math.round(
        convertWeight(compute(f, weightInKg, reps), "kg", outputUnit) * 10,
      ) / 10,
  }));

  return {
    oneRM,
    unit: outputUnit,
    formula,
    formulaLabel: FORMULA_LABELS[formula],
    percentageTable,
    comparisonResults,
  };
}
