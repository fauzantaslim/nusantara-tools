import { DayType, OvulationPhase } from "@/lib/constants";

export type { DayType, OvulationPhase };

export interface MasaSuburInput {
  firstDayOfLastPeriod: string; // ISO string 'YYYY-MM-DD'
  periodDuration: number;
  averageCycleLength: number;
}

export interface CycleResult {
  periodStart: Date;
  periodEnd: Date;
  ovulationDate: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  nextPeriodStart: Date;
}

export interface MasaSuburResult {
  cycles: CycleResult[];
}

export interface CycleSummary {
  nextPeriod: { date: Date; daysIn: number };
  nextFertileWindow: { start: Date; end: Date; daysIn: number };
  nextOvulation: { date: Date; daysIn: number };
  currentCycleDay: number;
  currentPhase: OvulationPhase;
}

export interface MasaSuburData {
  firstDayOfLastPeriod: string;
  periodDuration: string;
  averageCycleLength: string;
}

export interface MasaSuburContextType {
  data: MasaSuburData;
  updateData: (key: keyof MasaSuburData, value: string) => void;
  result: MasaSuburResult | null;
  summary: CycleSummary | null;
  error: string;
  activeTab: "table" | "calendar";
  setActiveTab: (tab: "table" | "calendar") => void;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
  calendarMonthStart: Date;
  setCalendarMonthStart: (date: Date | ((prev: Date) => Date)) => void;
}
