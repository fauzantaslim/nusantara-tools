import { WeightUnit } from "@/lib/constants";

export type { WeightUnit };
export type UserProfile = "adult" | "pregnant" | "teen";
export type CaffeineStatus = "Safe" | "Moderate" | "High" | "Excessive";

export interface CaffeineSource {
  id: string;
  name: string;
  mgPerUnit: number;
  unit: string;
}

export interface CaffeineEntry {
  id: string;
  sourceId: string;
  quantity: number;
  customMg?: number;
}

export interface CaffeineInput {
  entries: CaffeineEntry[];
  bodyWeight?: number;
  bodyWeightUnit?: WeightUnit;
  profile: UserProfile;
}

export interface CaffeineEntryResult {
  name: string;
  quantity: number;
  mgPerUnit: number;
  totalMg: number;
}

export interface CaffeineResult {
  totalMg: number;
  perBodyWeightMgKg: number | null;
  recommendedLimitMg: number;
  perBodyWeightLimit: number | null;
  status: CaffeineStatus;
  statusColor: "green" | "yellow" | "orange" | "red";
  insight: string;
  breakdown: CaffeineEntryResult[];
  profile: UserProfile;
}

export interface CaffeineData {
  entries: CaffeineEntry[];
  profile: UserProfile;
  bodyWeight: string;
  bodyWeightUnit: WeightUnit;
}

export interface CaffeineContextType {
  data: CaffeineData;
  updateData: <K extends keyof CaffeineData>(
    key: K,
    value: CaffeineData[K],
  ) => void;
  result: CaffeineResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
  addEntry: () => void;
  removeEntry: (id: string) => void;
  updateEntry: (id: string, patch: Partial<CaffeineEntry>) => void;
}
