export type PregnancyMethod =
  | "LMP"
  | "CONCEPTION"
  | "IVF"
  | "DUEDATE"
  | "ULTRASOUND";

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
    case "LMP":
      const cycleLength = input.cycleLength || 28;
      // EDD = LMP + 280 days + (Cycle Length - 28 days)
      return addDays(baseDate, 280 + (cycleLength - 28));
    case "CONCEPTION":
      // EDD = Conception + 266 days
      return addDays(baseDate, 266);
    case "IVF":
      const embryoAge = input.embryoAge || 3;
      // Tanggal Jatuh Tempo = Tanggal Transfer + (267 − Usia Embrio dalam Hari)
      return addDays(baseDate, 267 - embryoAge);
    case "ULTRASOUND":
      const weeks = input.ultrasoundWeeks || 0;
      const days = input.ultrasoundDays || 0;
      const totalGestationalDays = weeks * 7 + days;
      return addDays(baseDate, 280 - totalGestationalDays);
    case "DUEDATE":
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

  const today = new Date(); // Or for reproducible tests, let this be passed in, but we'll use local 'now'
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
    // Trimester 1: LMP to 13 weeks 6 days
    tri1Start: estimatedLMP,
    tri1End: addDays(estimatedLMP, 13 * 7 + 6),
    // Trimester 2: 14 weeks to 27 weeks 6 days
    tri2Start: addDays(estimatedLMP, 14 * 7),
    tri2End: addDays(estimatedLMP, 27 * 7 + 6),
    // Trimester 3: 28 weeks to EDD
    tri3Start: addDays(estimatedLMP, 28 * 7),
    tri3End: edd,

    viability: addDays(estimatedLMP, 24 * 7),

    firstUltrasoundStart: addDays(estimatedLMP, 8 * 7),
    firstUltrasoundEnd: addDays(estimatedLMP, 12 * 7),

    anatomyScanStart: addDays(estimatedLMP, 18 * 7),
    anatomyScanEnd: addDays(estimatedLMP, 22 * 7),

    glucoseTestStart: addDays(estimatedLMP, 24 * 7),
    glucoseTestEnd: addDays(estimatedLMP, 28 * 7),

    fullTerm: addDays(estimatedLMP, 37 * 7), // full term is usually 37 weeks
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
