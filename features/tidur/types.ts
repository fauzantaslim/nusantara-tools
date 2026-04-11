import {
  SleepCalculationMode,
  SleepTimeFormat,
  SleepQuality,
} from "@/lib/constants";

export type { SleepCalculationMode, SleepTimeFormat, SleepQuality };

export interface SleepInput {
  mode: SleepCalculationMode;
  targetTime: string; // HH:mm format
  latencyMinutes: number; // default 15
  cycleLengthMinutes: number; // default 90
  maxCycles: number; // default 6
  timeFormat: SleepTimeFormat;
}

export interface CycleResult {
  cycles: number;
  totalMinutes: number;
  totalHours: number;
  displayTime: string; // formatted time string (wake or sleep time)
  quality: SleepQuality;
  isHighlighted: boolean; // true for 5-6 cycle recommendations
}

export interface SleepResult {
  mode: SleepCalculationMode;
  inputTime: string;
  results: CycleResult[];
}

export interface SleepFormData {
  mode: SleepCalculationMode;
  targetTime: string;
  latencyMinutes: string;
  cycleLengthMinutes: string;
  timeFormat: SleepTimeFormat;
}

export interface SleepContextType {
  data: SleepFormData;
  updateData: (key: keyof SleepFormData, value: any) => void;
  result: SleepResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
}
