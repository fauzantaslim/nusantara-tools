import { POMODORO_MODE } from "@/lib/constants";

export type PomodoroMode = (typeof POMODORO_MODE)[keyof typeof POMODORO_MODE];

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
