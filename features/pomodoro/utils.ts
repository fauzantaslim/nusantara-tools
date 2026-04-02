export type PomodoroMode = "focus" | "shortBreak" | "longBreak";

export type FocusPreset =
  | "Baby Step"
  | "Popular"
  | "Medium"
  | "Extended"
  | "Custom";

export interface PomodoroSettings {
  focusDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // sessions before long break
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  soundEnabled: boolean;
  notificationEnabled: boolean;
  volume: number; // 0 to 1
}

export const POMODORO_PRESETS: Record<
  Exclude<FocusPreset, "Custom">,
  Partial<PomodoroSettings>
> = {
  "Baby Step": {
    focusDuration: 10,
    shortBreakDuration: 5,
    longBreakDuration: 10,
  },
  Popular: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
  },
  Medium: {
    focusDuration: 40,
    shortBreakDuration: 8,
    longBreakDuration: 20,
  },
  Extended: {
    focusDuration: 60,
    shortBreakDuration: 10,
    longBreakDuration: 25,
  },
};

export const DEFAULT_SETTINGS: PomodoroSettings = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
  notificationEnabled: true,
  volume: 0.5,
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const getModeLabel = (mode: PomodoroMode): string => {
  switch (mode) {
    case "focus":
      return "Fokus 🔥";
    case "shortBreak":
      return "Istirahat Sejenak 🌿";
    case "longBreak":
      return "Istirahat Panjang 🌊";
  }
};

export const getModeColor = (mode: PomodoroMode): string => {
  switch (mode) {
    case "focus":
      return "#C17A3A"; // Kunyit Emas
    case "shortBreak":
      return "#4A7C59"; // Hijau Hutan
    case "longBreak":
      return "#7A5C42"; // Tanah Merah
  }
};
