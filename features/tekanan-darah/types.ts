import {
  BPCategory,
  BodyPosition,
  BloodPressureArm,
  TrendDirection,
} from "@/lib/constants";

export type { BPCategory, BodyPosition, BloodPressureArm, TrendDirection };

export interface BPInput {
  systolic: number;
  diastolic: number;
  heartRate?: number;
  datetime?: string;
  position?: BodyPosition;
  arm?: BloodPressureArm;
  notes?: string;
}

export interface BPResult {
  systolic: number;
  diastolic: number;
  heartRate?: number;
  category: BPCategory;
  label: string;
  description: string;
  recommendation: string;
  isUrgent: boolean;
}

export interface SavedReading extends BPResult {
  id: string;
  datetime: string;
  position?: BodyPosition;
  arm?: BloodPressureArm;
  notes?: string;
}

export interface BPFormData {
  systolic: string;
  diastolic: string;
  heartRate: string;
  datetime: string;
  position: BodyPosition;
  arm: BloodPressureArm;
  notes: string;
}

export interface BPContextType {
  data: BPFormData;
  updateData: <K extends keyof BPFormData>(
    key: K,
    value: BPFormData[K],
  ) => void;
  result: BPResult | null;
  history: SavedReading[];
  error: string;
  trend: TrendDirection;
  handleAnalyze: (e: React.FormEvent) => void;
  handleSave: () => void;
  deleteReading: (id: string) => void;
  handleReset: () => void;
}

export interface CategoryMeta {
  label: string;
  description: string;
  recommendation: string;
  isUrgent: boolean;
  color: string;
  bg: string;
  border: string;
  ringColor: string;
  gradient: string;
  accentText: string;
}
