import {
  LemburInput,
  LemburResult,
  TierBreakdown,
  OvertimeTier,
  ComplianceWarning,
} from "./types";

// ─── Labels ─────────────────────────────────────────────────────────────────

export const MULTIPLIER_LABELS: Record<string, string> = {
  "1.5": "1.5× (Waktu & Setengah)",
  "2": "2× (Dua Kali Lipat)",
  "2.5": "2.5× (Dua Setengah Kali)",
  "3": "3× (Tiga Kali Lipat)",
  custom: "Kustom",
};

export const getEffectiveMultiplier = (tier: OvertimeTier): number => {
  if (tier.multiplier === "custom") return tier.customMultiplier ?? 1.5;
  return tier.multiplier;
};

export const getMultiplierLabel = (tier: OvertimeTier): string => {
  if (tier.multiplier === "custom") {
    return `${tier.customMultiplier ?? 1.5}× (Kustom)`;
  }
  return MULTIPLIER_LABELS[String(tier.multiplier)] ?? `${tier.multiplier}×`;
};

// ─── Global mode ─────────────────────────────────────────────────────────────

const calculateGlobalLembur = (
  input: LemburInput,
): Omit<
  LemburResult,
  "isIndonesiaMode" | "complianceWarnings" | "hourlyWage"
> => {
  const {
    hourlyRate,
    regularHours,
    hourUnit,
    overtimeTiers,
    bonus,
    enableBonus,
    taxRate,
    enableTax,
  } = input;

  const effectiveRegularHours =
    hourUnit === "daily" ? regularHours * 5 : regularHours;
  const regularPay = effectiveRegularHours * hourlyRate;

  const tierBreakdowns: TierBreakdown[] = overtimeTiers
    .filter((t) => t.hours > 0)
    .map((tier) => {
      const effectiveMultiplier = getEffectiveMultiplier(tier);
      return {
        tierId: tier.id,
        multiplierLabel: getMultiplierLabel(tier),
        effectiveMultiplier,
        hours: tier.hours,
        pay: Math.round(tier.hours * hourlyRate * effectiveMultiplier),
      };
    });

  const totalOvertimePay = tierBreakdowns.reduce((a, t) => a + t.pay, 0);
  const overtimeHoursTotal = tierBreakdowns.reduce((a, t) => a + t.hours, 0);
  const overtimePremium = totalOvertimePay - overtimeHoursTotal * hourlyRate;

  const bonusAmount = enableBonus ? bonus : 0;
  const grossPay = regularPay + totalOvertimePay + bonusAmount;
  const taxAmount = enableTax ? grossPay * (taxRate / 100) : 0;

  return {
    regularPay,
    totalOvertimePay,
    bonusAmount,
    grossPay,
    taxAmount,
    netPay: grossPay - taxAmount,
    tierBreakdowns,
    overtimePremium,
    hasOvertime: totalOvertimePay > 0,
  };
};

// ─── Indonesia mode (PP No. 35 Tahun 2021) ───────────────────────────────────

/**
 * Upah per jam = 1/173 × gaji pokok (+ tunjangan tetap jika ada)
 * Ref: PP 35/2021 Pasal 31
 */
export const calcHourlyWage = (
  monthlySalary: number,
  fixedAllowance: number,
): number => {
  return Math.round((1 / 173) * (monthlySalary + fixedAllowance));
};

/**
 * Build tier breakdowns for Indonesia PP 35/2021 rules.
 *
 * Regular working day:
 *   - 1st hour  = 1.5×
 *   - 2nd+ hours = 2×
 *
 * Holiday, 5-day work week:
 *   - Hours 1–8  = 2×
 *   - Hour 9     = 3×
 *   - Hours 10–12 = 4×
 *
 * Holiday, 6-day work week:
 *   - Hours 1–7  = 2×
 *   - Hour 8     = 3×
 *   - Hours 9–11 = 4×
 *
 * Ref: PP 35/2021 Pasal 31
 */
const buildIndonesiaTierBreakdowns = (
  overtimeHours: number,
  hourlyWage: number,
  dayType: "regular" | "holiday",
  workSchedule: 5 | 6,
): TierBreakdown[] => {
  const breakdowns: TierBreakdown[] = [];
  if (overtimeHours <= 0) return breakdowns;

  type Slot = { maxHour: number; mult: number; label: string };
  let slots: Slot[];

  if (dayType === "regular") {
    slots = [
      { maxHour: 1, mult: 1.5, label: "1.5× (Jam ke-1)" },
      { maxHour: Infinity, mult: 2, label: "2× (Jam ke-2+)" },
    ];
  } else if (workSchedule === 5) {
    slots = [
      { maxHour: 8, mult: 2, label: "2× (Jam 1–8)" },
      { maxHour: 9, mult: 3, label: "3× (Jam ke-9)" },
      { maxHour: 12, mult: 4, label: "4× (Jam 10–12)" },
    ];
  } else {
    // 6-day work week
    slots = [
      { maxHour: 7, mult: 2, label: "2× (Jam 1–7)" },
      { maxHour: 8, mult: 3, label: "3× (Jam ke-8)" },
      { maxHour: 11, mult: 4, label: "4× (Jam 9–11)" },
    ];
  }

  let remainingHours = overtimeHours;
  let usedHours = 0;

  for (const slot of slots) {
    if (remainingHours <= 0) break;
    const slotCapacity = slot.maxHour - usedHours;
    const hoursInSlot = Math.min(remainingHours, slotCapacity);
    if (hoursInSlot > 0) {
      breakdowns.push({
        tierId: `id-tier-${slot.mult}-${slot.label}`,
        multiplierLabel: slot.label,
        effectiveMultiplier: slot.mult,
        hours: hoursInSlot,
        pay: Math.round(hoursInSlot * hourlyWage * slot.mult),
      });
      usedHours += hoursInSlot;
      remainingHours -= hoursInSlot;
    }
  }

  return breakdowns;
};

const calculateIndonesiaLembur = (input: LemburInput): LemburResult => {
  const {
    monthlySalary,
    fixedAllowance,
    enableFixedAllowance,
    workSchedule,
    dayType,
    indonesiaOvertimeHours,
    bonus,
    enableBonus,
    taxRate,
    enableTax,
  } = input;

  const effectiveAllowance = enableFixedAllowance ? fixedAllowance : 0;
  const hourlyWage = calcHourlyWage(monthlySalary, effectiveAllowance);

  // Regular pay = monthly salary / 4.33 (est. monthly based on weekly hours implicit)
  // PP 35/2021 doesn't prescribe weekly pay, but we show monthly salary as regularPay
  const regularPay = monthlySalary + effectiveAllowance;

  const tierBreakdowns = buildIndonesiaTierBreakdowns(
    indonesiaOvertimeHours,
    hourlyWage,
    dayType,
    workSchedule,
  );

  const totalOvertimePay = tierBreakdowns.reduce((a, t) => a + t.pay, 0);
  const overtimePremium = totalOvertimePay; // everything from overtime is premium in ID mode
  const bonusAmount = enableBonus ? bonus : 0;
  const grossPay = regularPay + totalOvertimePay + bonusAmount;
  const taxAmount = enableTax ? grossPay * (taxRate / 100) : 0;
  const netPay = grossPay - taxAmount;

  // Compliance warnings (PP 35/2021 Pasal 30 & 31)
  const complianceWarnings: ComplianceWarning[] = [];
  const maxDailyLimit =
    dayType === "regular" ? 4 : workSchedule === 5 ? 12 : 11;

  if (indonesiaOvertimeHours > maxDailyLimit) {
    const contextStr =
      dayType === "regular"
        ? "hari kerja biasa"
        : `hari libur (${workSchedule} hari kerja)`;
    complianceWarnings.push({
      type: "daily_limit",
      message: `Jam lembur (${indonesiaOvertimeHours} jam) melebihi batas harian ${maxDailyLimit} jam untuk ${contextStr} sesuai PP No. 35 Tahun 2021.`,
    });
  }

  return {
    regularPay,
    totalOvertimePay,
    bonusAmount,
    grossPay,
    taxAmount,
    netPay,
    tierBreakdowns,
    overtimePremium,
    hasOvertime: totalOvertimePay > 0,
    hourlyWage,
    complianceWarnings,
    isIndonesiaMode: true,
  };
};

// ─── Main orchestrator ────────────────────────────────────────────────────────

export const calculateLembur = (input: LemburInput): LemburResult => {
  if (input.mode === "indonesia") {
    return calculateIndonesiaLembur(input);
  }

  return {
    ...calculateGlobalLembur(input),
    complianceWarnings: [],
    isIndonesiaMode: false,
  };
};
