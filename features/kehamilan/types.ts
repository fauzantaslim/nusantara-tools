import { PregnancyMethod } from "@/lib/constants";

export type { PregnancyMethod };

export interface PregnancyInput {
  method: PregnancyMethod;
  dateStr: string; // YYYY-MM-DD
  cycleLength?: number;
  embryoAge?: number;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
}

export interface PregnancyMilestones {
  tri1Start: Date;
  tri1End: Date;
  tri2Start: Date;
  tri2End: Date;
  tri3Start: Date;
  tri3End: Date;
  viability: Date;
  firstUltrasoundStart: Date;
  firstUltrasoundEnd: Date;
  anatomyScanStart: Date;
  anatomyScanEnd: Date;
  glucoseTestStart: Date;
  glucoseTestEnd: Date;
  fullTerm: Date;
}

export interface PregnancyResult {
  edd: Date;
  conceptionDate: Date;
  currentWeeks: number;
  currentDays: number;
  trimester: 1 | 2 | 3;
  progressPercent: number;
  milestones: PregnancyMilestones;
}

export interface PregnancyData {
  method: PregnancyMethod;
  dateStr: string;
  cycleLength: string;
  embryoAge: string;
  ultrasoundWeeks: string;
  ultrasoundDays: string;
}

export interface PregnancyContextType {
  data: PregnancyData;
  updateData: (
    key: keyof PregnancyData,
    value: string | PregnancyMethod,
  ) => void;
  result: PregnancyResult | null;
  error: string;
  handleCalculate: (e: React.FormEvent) => void;
  handleReset: () => void;
}
