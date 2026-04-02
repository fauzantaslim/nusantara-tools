"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  PomodoroMode,
  PomodoroSettings,
  DEFAULT_SETTINGS,
  FocusPreset,
  POMODORO_PRESETS,
} from "../utils";

const STORAGE_KEY_SETTINGS = "pomodoro_settings";
const STORAGE_KEY_SESSIONS = "pomodoro_sessions_today";
const STORAGE_KEY_DATE = "pomodoro_last_session_date";

export const usePomodoro = () => {
  const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
  const [preset, setPreset] = useState<FocusPreset>("Popular");
  const [mode, setMode] = useState<PomodoroMode>("focus");
  const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [showSessionComplete, setShowSessionComplete] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize from storage
  useEffect(() => {
    const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);
        setSettings(parsed);
        // Determine preset
        const matchedPreset = (
          Object.keys(POMODORO_PRESETS) as Array<Exclude<FocusPreset, "Custom">>
        ).find(
          (p) =>
            POMODORO_PRESETS[p].focusDuration === parsed.focusDuration &&
            POMODORO_PRESETS[p].shortBreakDuration ===
              parsed.shortBreakDuration &&
            POMODORO_PRESETS[p].longBreakDuration === parsed.longBreakDuration,
        );
        setPreset(matchedPreset || "Custom");
        setTimeLeft(parsed.focusDuration * 60);
      } catch (e) {
        console.error("Error parsing stored settings", e);
      }
    }

    const todayStr = new Date().toDateString();
    const storedDate = localStorage.getItem(STORAGE_KEY_DATE);
    if (storedDate === todayStr) {
      const storedSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (storedSessions) {
        setSessionsToday(parseInt(storedSessions, 10));
      }
    } else {
      localStorage.setItem(STORAGE_KEY_DATE, todayStr);
      localStorage.setItem(STORAGE_KEY_SESSIONS, "0");
    }

    // Prepare audio
    audioRef.current = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
    );
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Handle countdown
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionEnd();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const playAlarm = useCallback(() => {
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.volume = settings.volume;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio play failed", e));
    }
  }, [settings.soundEnabled, settings.volume]);

  const showNotification = useCallback(
    (title: string, body: string) => {
      if (
        settings.notificationEnabled &&
        Notification.permission === "granted"
      ) {
        new Notification(title, { body, icon: "/favicon.ico" });
      }
    },
    [settings.notificationEnabled],
  );

  const handleSessionEnd = useCallback(() => {
    setIsActive(false);
    playAlarm();

    let nextMode: PomodoroMode;
    let nextTime: number;

    if (mode === "focus") {
      const newCompleted = completedSessions + 1;
      const newToday = sessionsToday + 1;
      setCompletedSessions(newCompleted);
      setSessionsToday(newToday);
      localStorage.setItem(STORAGE_KEY_SESSIONS, newToday.toString());

      showNotification("Sesi Fokus Selesai!", "Waktunya istirahat sejenak.");
      setShowSessionComplete(true);

      if (newCompleted % settings.longBreakInterval === 0) {
        nextMode = "longBreak";
        nextTime = settings.longBreakDuration * 60;
      } else {
        nextMode = "shortBreak";
        nextTime = settings.shortBreakDuration * 60;
      }

      if (settings.autoStartBreaks) setIsActive(true);
    } else {
      nextMode = "focus";
      nextTime = settings.focusDuration * 60;
      showNotification("Istirahat Selesai!", "Waktunya fokus kembali.");
      setShowSessionComplete(true);
      if (settings.autoStartFocus) setIsActive(true);
    }

    setMode(nextMode);
    setTimeLeft(nextTime);
  }, [
    mode,
    completedSessions,
    sessionsToday,
    settings,
    playAlarm,
    showNotification,
  ]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(
      mode === "focus"
        ? settings.focusDuration * 60
        : mode === "shortBreak"
          ? settings.shortBreakDuration * 60
          : settings.longBreakDuration * 60,
    );
  };

  const skipSession = () => {
    handleSessionEnd();
  };

  const updatePreset = (newPreset: FocusPreset) => {
    setPreset(newPreset);
    if (newPreset !== "Custom") {
      const presetSettings = { ...settings, ...POMODORO_PRESETS[newPreset] };
      setSettings(presetSettings);
      if (!isActive) {
        setTimeLeft(presetSettings.focusDuration * 60);
        setMode("focus");
      }
    }
  };

  const updateCustomSettings = (newSettings: Partial<PomodoroSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    setPreset("Custom");
    if (!isActive && mode === "focus") {
      setTimeLeft(updated.focusDuration * 60);
    }
  };

  const requestPermission = async () => {
    if (Notification.permission !== "granted") {
      await Notification.requestPermission();
    }
  };

  return {
    settings,
    preset,
    mode,
    timeLeft,
    isActive,
    completedSessions,
    sessionsToday,
    toggleTimer,
    resetTimer,
    skipSession,
    showSessionComplete,
    setShowSessionComplete,
    updatePreset,
    updateCustomSettings,
    requestPermission,
  };
};
