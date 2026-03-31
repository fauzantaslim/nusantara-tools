import { addDays, format, subDays, isBefore, isAfter, isSameDay, differenceInDays, startOfDay } from 'date-fns';
import { id } from 'date-fns/locale';

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

export function calculateMasaSubur(input: MasaSuburInput): MasaSuburResult {
  const { firstDayOfLastPeriod, periodDuration, averageCycleLength } = input;
  
  if (!firstDayOfLastPeriod) {
    throw new Error('Tanggal hari pertama haid terakhir harus diisi');
  }

  if (periodDuration < 1 || periodDuration > 10) {
    throw new Error('Lama menstruasi tidak valid (1-10 hari)');
  }

  if (averageCycleLength < 20 || averageCycleLength > 45) {
    throw new Error('Panjang siklus rata-rata tidak valid (20-45 hari)');
  }

  const cycles: CycleResult[] = [];
  const parts = firstDayOfLastPeriod.split('-');
  let currentStart = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

  for (let i = 0; i < 6; i++) {
    const periodEnd = addDays(currentStart, periodDuration - 1);
    const nextPeriodStart = addDays(currentStart, averageCycleLength);
    
    // Ovulation is approximately 14 days before the NEXT period start
    const ovulationDate = subDays(nextPeriodStart, 14);
    
    // Fertile window is 6 days: 5 days before ovulation and the day of ovulation
    const fertileWindowStart = subDays(ovulationDate, 5);
    const fertileWindowEnd = ovulationDate;

    cycles.push({
      periodStart: currentStart,
      periodEnd,
      ovulationDate,
      fertileWindowStart,
      fertileWindowEnd,
      nextPeriodStart
    });

    currentStart = nextPeriodStart;
  }

  return { cycles };
}

export function formatDateId(date: Date, showYear = true): string {
  if (showYear) {
    return format(date, 'd MMMM yyyy', { locale: id });
  }
  return format(date, 'd MMMM', { locale: id });
}

// Kalender helper
export function getDaysInMonth(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export type DayType = 'normal' | 'period' | 'fertile' | 'ovulation';

export function getDayType(date: Date, cycles: CycleResult[]): DayType {
  for (const cycle of cycles) {
    // Check ovulation (highest priority)
    if (isSameDay(date, cycle.ovulationDate)) {
      return 'ovulation';
    }
    
    // Check period
    if ((isSameDay(date, cycle.periodStart) || isAfter(date, cycle.periodStart)) && 
        (isSameDay(date, cycle.periodEnd) || isBefore(date, cycle.periodEnd))) {
      return 'period';
    }

    // Check fertile
    if ((isSameDay(date, cycle.fertileWindowStart) || isAfter(date, cycle.fertileWindowStart)) && 
        (isSameDay(date, cycle.fertileWindowEnd) || isBefore(date, cycle.fertileWindowEnd))) {
      return 'fertile';
    }
  }

  return 'normal';
}

export interface CycleSummary {
  nextPeriod: { date: Date; daysIn: number };
  nextFertileWindow: { start: Date; end: Date; daysIn: number };
  nextOvulation: { date: Date; daysIn: number };
  currentCycleDay: number;
  currentPhase: string;
}

export function getCurrentCycleInfo(cycles: CycleResult[], today: Date = new Date()): CycleSummary | null {
  if (cycles.length === 0) return null;
  const todayStart = startOfDay(today);

  let activeCycleIdx = -1;
  for (let i = 0; i < cycles.length; i++) {
    if ((isSameDay(todayStart, cycles[i].periodStart) || isAfter(todayStart, cycles[i].periodStart)) && 
        (isBefore(todayStart, cycles[i].nextPeriodStart))) {
      activeCycleIdx = i;
      break;
    }
  }

  if (activeCycleIdx === -1 && isBefore(todayStart, cycles[0].periodStart)) {
    activeCycleIdx = 0;
  }
  
  if (activeCycleIdx === -1) {
     activeCycleIdx = cycles.length - 1; 
  }

  const currentCycle = cycles[activeCycleIdx];
  const currentCycleDay = differenceInDays(todayStart, currentCycle.periodStart) + 1;

  let currentPhase = 'Fase Folikuler';
  const type = getDayType(todayStart, cycles);
  if (type === 'period') {
    currentPhase = 'Fase Menstruasi';
  } else if (type === 'ovulation') {
    currentPhase = 'Fase Ovulasi'; // Puncak
  } else if (isAfter(todayStart, currentCycle.ovulationDate)) {
    currentPhase = 'Fase Luteal';
  } else {
    currentPhase = 'Fase Folikuler';
  }

  let nextPeriod = currentCycle.nextPeriodStart;
  if (isBefore(nextPeriod, todayStart) && activeCycleIdx + 1 < cycles.length) {
     nextPeriod = cycles[activeCycleIdx + 1].nextPeriodStart;
  }
  
  let nextOvulation = currentCycle.ovulationDate;
  if (isBefore(nextOvulation, todayStart) && activeCycleIdx + 1 < cycles.length) {
     nextOvulation = cycles[activeCycleIdx + 1].ovulationDate;
  }

  let nextFertileWindowStart = currentCycle.fertileWindowStart;
  let nextFertileWindowEnd = currentCycle.fertileWindowEnd;
  // Jika jendela subur saat ini BENAR-BENAR SUDAH LEWAT
  if (isBefore(nextFertileWindowEnd, todayStart) && !isSameDay(nextFertileWindowEnd, todayStart) && activeCycleIdx + 1 < cycles.length) {
      nextFertileWindowStart = cycles[activeCycleIdx + 1].fertileWindowStart;
      nextFertileWindowEnd = cycles[activeCycleIdx + 1].fertileWindowEnd;
  }
  
  const periodDaysIn = differenceInDays(nextPeriod, todayStart);
  let fertileDaysIn = differenceInDays(nextFertileWindowStart, todayStart);
  
  if (
     (isSameDay(todayStart, nextFertileWindowStart) || isAfter(todayStart, nextFertileWindowStart)) &&
     (isSameDay(todayStart, nextFertileWindowEnd) || isBefore(todayStart, nextFertileWindowEnd))
  ) {
    fertileDaysIn = 0; // Berlangsung
  }
  
  const ovulationDaysIn = differenceInDays(nextOvulation, todayStart);

  return {
    nextPeriod: {
      date: nextPeriod,
      daysIn: periodDaysIn
    },
    nextFertileWindow: {
      start: nextFertileWindowStart,
      end: nextFertileWindowEnd,
      daysIn: fertileDaysIn
    },
    nextOvulation: {
      date: nextOvulation,
      daysIn: ovulationDaysIn
    },
    currentCycleDay: Math.max(1, currentCycleDay),
    currentPhase
  };
}
