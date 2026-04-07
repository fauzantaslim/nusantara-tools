export type CalculationMode = "sleep_at" | "wake_at";
export type TimeFormat = "12h" | "24h";

export interface SleepInput {
  mode: CalculationMode;
  targetTime: string; // HH:mm format
  latencyMinutes: number; // default 15
  cycleLengthMinutes: number; // default 90
  maxCycles: number; // default 6
  timeFormat: TimeFormat;
}

export type SleepQuality = "Buruk" | "Kurang Optimal" | "Baik" | "Ideal";

export interface CycleResult {
  cycles: number;
  totalMinutes: number;
  totalHours: number;
  displayTime: string; // formatted time string (wake or sleep time)
  quality: SleepQuality;
  qualityColor: "red" | "orange" | "blue" | "green";
  isHighlighted: boolean; // true for 5-6 cycle recommendations
}

export interface SleepResult {
  mode: CalculationMode;
  inputTime: string;
  results: CycleResult[];
}

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

function formatTime(time24: string, format: TimeFormat): string {
  if (format === "24h") return time24;

  const { hours, minutes } = parseTime(time24);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
}

function getQuality(cycles: number): {
  quality: SleepQuality;
  color: "red" | "orange" | "blue" | "green";
} {
  if (cycles <= 2) return { quality: "Buruk", color: "red" };
  if (cycles === 3 || cycles === 4)
    return { quality: "Kurang Optimal", color: "orange" };
  if (cycles === 5) return { quality: "Baik", color: "blue" };
  return { quality: "Ideal", color: "green" }; // 6+
}

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

    if (mode === "sleep_at") {
      // User plans to sleep at targetTime → calculate wake time
      // wake = sleep + latency + (cycle * cycleLength)
      resultTime24 = addMinutes(targetTime, totalMinutesWithLatency);
    } else {
      // User wants to wake at targetTime → calculate when to sleep
      // sleep = wake - latency - (cycle * cycleLength)
      resultTime24 = subtractMinutes(targetTime, totalMinutesWithLatency);
    }

    const { quality, color } = getQuality(cycle);
    const isHighlighted = cycle === 5 || cycle === 6;

    results.push({
      cycles: cycle,
      totalMinutes: totalSleepMinutes,
      totalHours,
      displayTime: formatTime(resultTime24, timeFormat),
      quality,
      qualityColor: color,
      isHighlighted,
    });
  }

  return {
    mode,
    inputTime: formatTime(targetTime, timeFormat),
    results,
  };
}
