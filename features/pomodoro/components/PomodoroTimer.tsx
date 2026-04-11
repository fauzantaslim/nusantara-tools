"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { formatTime, getModeLabel } from "../utils";
import { PomodoroMode } from "../types";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Coffee,
  Flame,
  Waves,
} from "lucide-react";

interface PomodoroTimerProps {
  mode: PomodoroMode;
  timeLeft: number;
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  sessionsToday: number;
  completedSessions: number;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  mode,
  timeLeft,
  isActive,
  toggleTimer,
  resetTimer,
  skipSession,
  sessionsToday,
  completedSessions,
}) => {
  const getIcon = () => {
    switch (mode) {
      case "focus":
        return <Flame className="w-8 h-8 text-[#C17A3A]" />;
      case "shortBreak":
        return <Coffee className="w-8 h-8 text-[#4A7C59]" />;
      case "longBreak":
        return <Waves className="w-8 h-8 text-[#7A5C42]" />;
    }
  };

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3]",
        mode === "focus"
          ? "ring-4 ring-inset ring-[#C17A3A]/30 border-[#C17A3A]/30"
          : mode === "shortBreak"
            ? "ring-4 ring-inset ring-[#4A7C59]/30 border-[#4A7C59]/30"
            : "ring-4 ring-inset ring-[#7A5C42]/30 border-[#7A5C42]/30",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-8 sm:p-12 h-full flex flex-col items-center justify-center gap-10">
        {/* Mode Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1A0E07] border border-white/10 flex items-center justify-center shadow-inner">
            {getIcon()}
          </div>
          <div className="text-center">
            <span
              className={cn(
                "text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full border",
                mode === "focus"
                  ? "bg-[#C17A3A]/10 border-[#C17A3A]/30 text-[#C17A3A]"
                  : mode === "shortBreak"
                    ? "bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59]"
                    : "bg-[#7A5C42]/10 border-[#7A5C42]/30 text-[#7A5C42]",
              )}
            >
              {getModeLabel(mode)}
            </span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex flex-col items-center">
          <h1 className="text-8xl sm:text-9xl font-black font-heading tracking-tighter text-white tabular-nums drop-shadow-2xl">
            {formatTime(timeLeft)}
          </h1>
          <p className="text-[#EDE0D0]/50 font-body text-sm mt-4">
            Sesi selesai:{" "}
            <span className="text-white font-bold">
              {sessionsToday} hari ini
            </span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={resetTimer}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-[#EDE0D0]"
            title="Reset"
          >
            <RotateCcw className="w-6 h-6" />
          </button>

          <button
            onClick={toggleTimer}
            className={cn(
              "w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95",
              isActive
                ? "bg-white/10 border-2 border-white/20 text-white"
                : "bg-[#C17A3A] text-white",
            )}
          >
            {isActive ? (
              <Pause className="w-10 h-10 fill-current" />
            ) : (
              <Play className="w-10 h-10 fill-current ml-1" />
            )}
          </button>

          <button
            onClick={skipSession}
            className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-[#EDE0D0]"
            title="Skip"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Session Progress */}
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                i < completedSessions % 4
                  ? "bg-[#C17A3A] scale-110 shadow-[0_0_10px_rgba(193,122,58,0.5)]"
                  : "bg-white/10",
              )}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
