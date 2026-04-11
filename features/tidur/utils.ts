import {
  SLEEP_CALCULATION_MODE,
  SLEEP_TIME_FORMAT,
  SLEEP_QUALITY,
} from "@/lib/constants";
import {
  SleepTimeFormat,
  SleepQuality,
  SleepInput,
  CycleResult,
  SleepResult,
} from "./types";

// ─── Internal Utilities ──────────────────────────────────────────────────────

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [h, m] = timeStr.split(":").map(Number);
  return { hours: h, minutes: m };
}

function addMinutes(timeStr: string, minutesToAdd: number): string {
  const { hours, minutes } = parseTime(timeStr);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;
  // Handle day overflow/underflow
  const normalizedMinutes = ((totalMinutes % 1440) + 1440) % 1440;
  const newHours = Math.floor(normalizedMinutes / 60);
  const newMins = normalizedMinutes % 60;
  return `${String(newHours).padStart(2, "0")}:${String(newMins).padStart(2, "0")}`;
}

function subtractMinutes(timeStr: string, minutesToSub: number): string {
  return addMinutes(timeStr, -minutesToSub);
}

export function formatSleepTime(
  time24: string,
  format: SleepTimeFormat,
): string {
  if (format === SLEEP_TIME_FORMAT.FORMAT_24H) return time24;

  const { hours, minutes } = parseTime(time24);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getSleepQuality(cycles: number): SleepQuality {
  if (cycles <= 2) return SLEEP_QUALITY.BURUK;
  if (cycles === 3 || cycles === 4) return SLEEP_QUALITY.KURANG_OPTIMAL;
  if (cycles === 5) return SLEEP_QUALITY.BAIK;
  return SLEEP_QUALITY.IDEAL; // 6+
}

// ─── Main calculator ──────────────────────────────────────────────────────────

export function calculateSleepCycles(input: SleepInput): SleepResult {
  const {
    mode,
    targetTime,
    latencyMinutes,
    cycleLengthMinutes,
    maxCycles,
    timeFormat,
  } = input;
  const results: CycleResult[] = [];

  for (let cycle = 1; cycle <= maxCycles; cycle++) {
    const totalSleepMinutes = cycleLengthMinutes * cycle;
    const totalMinutesWithLatency = totalSleepMinutes + latencyMinutes;
    const totalHours = Math.round((totalSleepMinutes / 60) * 10) / 10;

    let resultTime24: string;

    if (mode === SLEEP_CALCULATION_MODE.SLEEP_AT) {
      // User plans to sleep at targetTime → calculate wake time
      // wake = sleep + latency + (cycle * cycleLength)
      resultTime24 = addMinutes(targetTime, totalMinutesWithLatency);
    } else {
      // User wants to wake at targetTime → calculate when to sleep
      // sleep = wake - latency - (cycle * cycleLength)
      resultTime24 = subtractMinutes(targetTime, totalMinutesWithLatency);
    }

    const quality = getSleepQuality(cycle);
    const isHighlighted = cycle === 5 || cycle === 6;

    results.push({
      cycles: cycle,
      totalMinutes: totalSleepMinutes,
      totalHours,
      displayTime: formatSleepTime(resultTime24, timeFormat),
      quality,
      isHighlighted,
    });
  }

  return {
    mode,
    inputTime: formatSleepTime(targetTime, timeFormat),
    results,
  };
}
