"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { SegmentedControl } from "@/ui/SegmentedControl";
import {
  Moon,
  Sun,
  ArrowRight,
  ShieldAlert,
  Clock,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SleepContextType } from "../types";
import { SLEEP_CALCULATION_MODE, SLEEP_TIME_FORMAT } from "@/lib/constants";

export const SleepForm: React.FC<{ hook: SleepContextType }> = ({ hook }) => {
  const { data, updateData, error, handleCalculate, handleReset } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Moon className="w-6 h-6 text-[#4A7C59]" />
          Parameter Tidur
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Pilih mode kalkulasi dan masukkan waktu target Anda.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10 h-full"
      >
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold font-ui text-primary">
              Mode Kalkulasi
            </label>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() =>
                  updateData("mode", SLEEP_CALCULATION_MODE.WAKE_AT)
                }
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                  data.mode === SLEEP_CALCULATION_MODE.WAKE_AT
                    ? "border-[#4A7C59] bg-[#4A7C59]/8 text-[#4A7C59]"
                    : "border-muted bg-white text-secondary hover:border-secondary/30",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    data.mode === SLEEP_CALCULATION_MODE.WAKE_AT
                      ? "bg-[#4A7C59]/10"
                      : "bg-surface group-hover:bg-muted",
                  )}
                >
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold font-ui text-sm block">
                    Saya ingin bangun jam...
                  </span>
                  <span className="text-xs opacity-70">
                    Hitung waktu harus mulai tidur
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  updateData("mode", SLEEP_CALCULATION_MODE.SLEEP_AT)
                }
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group",
                  data.mode === SLEEP_CALCULATION_MODE.SLEEP_AT
                    ? "border-[#4A7C59] bg-[#4A7C59]/8 text-[#4A7C59]"
                    : "border-muted bg-white text-secondary hover:border-secondary/30",
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                    data.mode === SLEEP_CALCULATION_MODE.SLEEP_AT
                      ? "bg-[#4A7C59]/10"
                      : "bg-surface group-hover:bg-muted",
                  )}
                >
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold font-ui text-sm block">
                    Saya berencana tidur jam...
                  </span>
                  <span className="text-xs opacity-70">
                    Hitung rekomendasi jam bangun
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Time Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold font-ui text-primary">
              {data.mode === SLEEP_CALCULATION_MODE.WAKE_AT
                ? "Jam Bangun yang Diinginkan"
                : "Jam Rencana Tidur"}
            </label>
            <div className="relative flex items-center border-2 border-muted bg-white rounded-2xl shadow-sm h-14 focus-within:border-[#4A7C59] focus-within:ring-2 focus-within:ring-[#4A7C59]/20 overflow-hidden transition-all">
              <div className="pl-4 pr-2 flex items-center">
                {data.mode === SLEEP_CALCULATION_MODE.WAKE_AT ? (
                  <Sun className="w-5 h-5 text-[#C17A3A]" />
                ) : (
                  <Moon className="w-5 h-5 text-[#4A7C59]" />
                )}
              </div>
              <input
                type="time"
                value={data.targetTime}
                onChange={(e) => updateData("targetTime", e.target.value)}
                required
                className="flex-1 h-full bg-transparent px-2 text-lg font-black text-primary outline-none font-heading tracking-tight"
              />
            </div>
          </div>

          {/* Time Format Toggle */}
          <SegmentedControl
            label="Format Waktu Output"
            options={[
              { value: SLEEP_TIME_FORMAT.FORMAT_24H, label: "24 Jam" },
              { value: SLEEP_TIME_FORMAT.FORMAT_12H, label: "12 Jam (AM/PM)" },
            ]}
            value={data.timeFormat}
            onChange={(val) => updateData("timeFormat", val)}
          />

          {/* Advanced Options */}
          <details className="group [&_summary::-webkit-details-marker]:hidden bg-surface rounded-2xl border border-muted/50 overflow-hidden transition-all">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-primary font-bold hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C17A3A]" />
                <span className="text-sm font-medium">
                  Pengaturan Lanjutan (Opsional)
                </span>
              </div>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <div className="px-4 pb-5 space-y-4 border-t border-muted/30 pt-4">
              <Input
                id="latency"
                label="Waktu Butuh Tertidur (menit)"
                type="number"
                min={1}
                max={60}
                value={data.latencyMinutes}
                onChange={(e) => updateData("latencyMinutes", e.target.value)}
                suffix="mnt"
                className="rounded-xl h-11 text-sm"
              />
              <Input
                id="cycle"
                label="Durasi Satu Siklus (menit)"
                type="number"
                min={70}
                max={120}
                value={data.cycleLengthMinutes}
                onChange={(e) =>
                  updateData("cycleLengthMinutes", e.target.value)
                }
                suffix="mnt"
                className="rounded-xl h-11 text-sm"
              />
            </div>
          </details>

          {error && (
            <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span className="flex-1">{error}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-auto pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0 hover:border-secondary/30"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#4A7C59] hover:!bg-[#3a6346] text-white outline-none ring-0"
          >
            {data.mode === SLEEP_CALCULATION_MODE.WAKE_AT
              ? "Hitung Waktu Tidur"
              : "Hitung Waktu Bangun"}
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
