import {
  POMODORO_PRESETS as POMODORO_PRESETS_CONST,
  POMODORO_DEFAULT_SETTINGS,
  POMODORO_MODE_CONFIG,
} from "@/lib/constants";
import { PomodoroMode, PomodoroSettings } from "./types";

export const POMODORO_PRESETS = POMODORO_PRESETS_CONST;
export const DEFAULT_SETTINGS: PomodoroSettings = POMODORO_DEFAULT_SETTINGS;

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const getModeLabel = (mode: PomodoroMode): string => {
  return POMODORO_MODE_CONFIG[mode]?.label || "Fokus 🔥";
};

export const getModeColor = (mode: PomodoroMode): string => {
  return POMODORO_MODE_CONFIG[mode]?.color || "#C17A3A";
};
