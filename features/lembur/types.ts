export type HourUnit = "weekly" | "daily";
export type OvertimeMode = "global" | "indonesia";
export type WorkSchedule = 5 | 6; // days per week
export type DayType = "regular" | "holiday";

export type OvertimeMultiplier = 1.5 | 2 | 2.5 | 3 | "custom";

export interface OvertimeTier {
  id: string;
  multiplier: OvertimeMultiplier;
  customMultiplier?: number;
  hours: number;
}

export interface LemburInput {
  // Mode
  mode: OvertimeMode;

  // Global mode fields
  hourlyRate: number;
  regularHours: number;
  hourUnit: HourUnit;
  overtimeTiers: OvertimeTier[];

  // Indonesia mode fields (PP No. 35 Tahun 2021)
  monthlySalary: number;
  fixedAllowance: number;
  enableFixedAllowance: boolean;
  workSchedule: WorkSchedule;
  dayType: DayType;
  indonesiaOvertimeHours: number; // jam lembur hari ini

  // Shared
  bonus: number;
  enableBonus: boolean;
  taxRate: number;
  enableTax: boolean;
}

export interface TierBreakdown {
  tierId: string;
  multiplierLabel: string;
  effectiveMultiplier: number;
  hours: number;
  pay: number;
}

export interface ComplianceWarning {
  type: "daily_limit" | "weekly_limit";
  message: string;
}

export interface LemburResult {
  // Core
  regularPay: number;
  totalOvertimePay: number;
  bonusAmount: number;
  grossPay: number;
  taxAmount: number;
  netPay: number;
  tierBreakdowns: TierBreakdown[];
  overtimePremium: number;
  hasOvertime: boolean;

  // Indonesia mode extras
  hourlyWage?: number; // 1/173 × monthly salary
  complianceWarnings: ComplianceWarning[];
  isIndonesiaMode: boolean;
}
