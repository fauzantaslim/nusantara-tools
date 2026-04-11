"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import {
  SleepFormData,
  SleepResult,
  SleepContextType,
  SleepInput,
} from "../types";
import { calculateSleepCycles } from "../utils";
import { SLEEP_CALCULATION_MODE, SLEEP_TIME_FORMAT } from "@/lib/constants";

const sleepSchema = z.object({
  targetTime: z.string().min(1, "Waktu tidak boleh kosong"),
  latencyMinutes: z.coerce
    .number()
    .min(1, "Minimal 1 menit")
    .max(60, "Maksimal 60 menit"),
  cycleLengthMinutes: z.coerce
    .number()
    .min(70, "Minimal 70 menit")
    .max(120, "Maksimal 120 menit"),
});

const initialData: SleepFormData = {
  mode: SLEEP_CALCULATION_MODE.WAKE_AT,
  targetTime: "07:00",
  latencyMinutes: "15",
  cycleLengthMinutes: "90",
  timeFormat: SLEEP_TIME_FORMAT.FORMAT_24H,
};

export const useSleep = (): SleepContextType => {
  const [data, setData] = useState<SleepFormData>(initialData);
  const [result, setResult] = useState<SleepResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback((key: keyof SleepFormData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = sleepSchema.parse({
          targetTime: data.targetTime,
          latencyMinutes: data.latencyMinutes,
          cycleLengthMinutes: data.cycleLengthMinutes,
        });

        const input: SleepInput = {
          mode: data.mode,
          targetTime: parsed.targetTime,
          latencyMinutes: parsed.latencyMinutes,
          cycleLengthMinutes: parsed.cycleLengthMinutes,
          maxCycles: 6,
          timeFormat: data.timeFormat,
        };

        const res = calculateSleepCycles(input);
        setResult(res);
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else {
          setError(
            err.message || "Terjadi kesalahan saat menghitung siklus tidur.",
          );
        }
        setResult(null);
      }
    },
    [data],
  );

  const handleReset = useCallback(() => {
    setData(initialData);
    setResult(null);
    setError("");
  }, []);

  return {
    data,
    updateData,
    result,
    error,
    handleCalculate,
    handleReset,
  };
};
