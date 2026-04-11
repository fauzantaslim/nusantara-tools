"use client";

import { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import { startOfMonth } from "date-fns";
import {
  MasaSuburData,
  MasaSuburResult,
  MasaSuburContextType,
  MasaSuburInput,
  CycleSummary,
} from "../types";
import { calculateMasaSubur, getCurrentCycleInfo } from "../utils";

const ovulationSchema = z.object({
  firstDayOfLastPeriod: z
    .string()
    .min(1, "Silakan pilih tanggal terlebih dahulu."),
  periodDuration: z.coerce.number().min(1).max(10),
  averageCycleLength: z.coerce.number().min(20).max(45),
});

const initialData: MasaSuburData = {
  firstDayOfLastPeriod: "",
  periodDuration: "5",
  averageCycleLength: "28",
};

export const useOvulation = (): MasaSuburContextType => {
  const [data, setData] = useState<MasaSuburData>(initialData);
  const [result, setResult] = useState<MasaSuburResult | null>(null);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"table" | "calendar">("table");
  const [calendarMonthStart, setCalendarMonthStart] = useState<Date>(
    new Date(),
  );

  const summary = useMemo<CycleSummary | null>(() => {
    if (!result) return null;
    return getCurrentCycleInfo(result.cycles);
  }, [result]);

  const updateData = useCallback((key: keyof MasaSuburData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = ovulationSchema.parse(data);

        const input: MasaSuburInput = {
          firstDayOfLastPeriod: parsed.firstDayOfLastPeriod,
          periodDuration: parsed.periodDuration,
          averageCycleLength: parsed.averageCycleLength,
        };

        const res = calculateMasaSubur(input);
        setResult(res);
        setActiveTab("table");
        setCalendarMonthStart(startOfMonth(res.cycles[0].periodStart));
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else if (err instanceof Error) {
          setError(
            err.message || "Terjadi kesalahan saat menghitung masa subur.",
          );
        } else {
          setError("Terjadi kesalahan saat menghitung masa subur.");
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
    setActiveTab("table");
    setCalendarMonthStart(new Date());
  }, []);

  return {
    data,
    updateData,
    result,
    summary,
    error,
    activeTab,
    setActiveTab,
    handleCalculate,
    handleReset,
    calendarMonthStart,
    setCalendarMonthStart,
  };
};
