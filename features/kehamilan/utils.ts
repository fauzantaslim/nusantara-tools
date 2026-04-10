import { PREGNANCY_METHOD } from "@/lib/constants";
import { PregnancyInput, PregnancyResult, PregnancyMilestones } from "./types";

export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDaysDiff(startDate: Date, endDate: Date): number {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const startLocal = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  );
  const endLocal = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
  );
  return Math.round((endLocal.getTime() - startLocal.getTime()) / ONE_DAY);
}

export function calculateEDD(input: PregnancyInput): Date {
  const baseDate = parseLocalDate(input.dateStr);

  switch (input.method) {
    case PREGNANCY_METHOD.LMP:
      const cycleLength = input.cycleLength || 28;
      // EDD = LMP + 280 days + (Cycle Length - 28 days)
      return addDays(baseDate, 280 + (cycleLength - 28));
    case PREGNANCY_METHOD.CONCEPTION:
      // EDD = Conception + 266 days
      return addDays(baseDate, 266);
    case PREGNANCY_METHOD.IVF:
      const embryoAge = input.embryoAge || 3;
      // Tanggal Jatuh Tempo = Tanggal Transfer + (267 − Usia Embrio dalam Hari)
      return addDays(baseDate, 267 - embryoAge);
    case PREGNANCY_METHOD.ULTRASOUND:
      const weeks = input.ultrasoundWeeks || 0;
      const days = input.ultrasoundDays || 0;
      const totalGestationalDays = weeks * 7 + days;
      return addDays(baseDate, 280 - totalGestationalDays);
    case PREGNANCY_METHOD.DUEDATE:
      return baseDate;
    default:
      return baseDate;
  }
}

export function calculatePregnancy(input: PregnancyInput): PregnancyResult {
  const edd = calculateEDD(input);

  // LMP is calculated back from EDD (EDD - 280 days)
  const estimatedLMP = addDays(edd, -280);
  const conceptionDate = addDays(estimatedLMP, 14); // Approximate conception date

  const today = new Date();
  const gestationalDays = getDaysDiff(estimatedLMP, today);

  // Progress clamping
  let progressPercent = (gestationalDays / 280) * 100;
  if (progressPercent < 0) progressPercent = 0;
  if (progressPercent > 100) progressPercent = 100;

  // Weeks & days
  const currentWeeks = Math.max(0, Math.floor(gestationalDays / 7));
  const currentDays = Math.max(0, gestationalDays % 7);

  let trimester: 1 | 2 | 3 = 1;
  if (currentWeeks >= 14 && currentWeeks < 28) {
    trimester = 2;
  } else if (currentWeeks >= 28) {
    trimester = 3;
  }

  const milestones: PregnancyMilestones = {
    tri1Start: estimatedLMP,
    tri1End: addDays(estimatedLMP, 13 * 7 + 6),
    tri2Start: addDays(estimatedLMP, 14 * 7),
    tri2End: addDays(estimatedLMP, 27 * 7 + 6),
    tri3Start: addDays(estimatedLMP, 28 * 7),
    tri3End: edd,
    viability: addDays(estimatedLMP, 24 * 7),
    firstUltrasoundStart: addDays(estimatedLMP, 8 * 7),
    firstUltrasoundEnd: addDays(estimatedLMP, 12 * 7),
    anatomyScanStart: addDays(estimatedLMP, 18 * 7),
    anatomyScanEnd: addDays(estimatedLMP, 22 * 7),
    glucoseTestStart: addDays(estimatedLMP, 24 * 7),
    glucoseTestEnd: addDays(estimatedLMP, 28 * 7),
    fullTerm: addDays(estimatedLMP, 37 * 7),
  };

  return {
    edd,
    conceptionDate,
    currentWeeks,
    currentDays,
    trimester,
    progressPercent,
    milestones,
  };
}
