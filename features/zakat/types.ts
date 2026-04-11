export type ZakatCalculationMode = "monthly" | "yearly";

export interface ZakatFormData {
  mode: ZakatCalculationMode;
  income: string;
  additional: string;
}

export interface ZakatCalculationResult {
  totalIncome: number;
  nisab: number;
  isWajib: boolean;
  zakatAmount: number;
  mode: ZakatCalculationMode;
}

export interface ZakatContextType {
  data: ZakatFormData;
  updateData: (key: keyof ZakatFormData, value: string) => void;
  result: ZakatCalculationResult | null;
  error: string;
  handleReset: () => void;
  calculate: () => void;
}
