import {
  WEIGHT_UNIT,
  ONERM_FORMULA as FORMULA,
  type WeightUnit,
  type OneRMFormulaType as FormulaType,
} from "@/lib/constants";

export { WEIGHT_UNIT, FORMULA };
export type { WeightUnit, FormulaType };

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

export interface OneRMData {
  weight: string;
  reps: string;
  unit: WeightUnit;
  outputUnit: WeightUnit;
  formula: FormulaType;
}

export interface OneRMContextType {
  data: OneRMData;
  updateData: <K extends keyof OneRMData>(key: K, value: OneRMData[K]) => void;
  result: OneRMResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
  handleFormulaChange: (f: FormulaType) => void;
}

export const FORMULA_INFO: Record<
  FormulaType,
  { label: string; desc: string; best: string }
> = {
  epley: {
    label: "Epley",
    desc: "Rumus paling populer dan serbaguna untuk sebagian besar pengguna.",
    best: "Estimasi kekuatan umum",
  },
  brzycki: {
    label: "Brzycki",
    desc: "Dikenal akurat untuk set dengan repetisi rendah (1–6 reps).",
    best: "Set repetisi rendah",
  },
  lombardi: {
    label: "Lombardi",
    desc: "Memperhitungkan set dengan repetisi lebih tinggi secara lebih proporsional.",
    best: "Set repetisi tinggi",
  },
};
