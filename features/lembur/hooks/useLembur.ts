import { useState, useMemo, useCallback } from "react";
import {
  LemburInput,
  LemburResult,
  OvertimeTier,
  OvertimeMultiplier,
  OvertimeMode,
} from "../types";
import { calculateLembur } from "../utils";

const DEFAULT_TIER: OvertimeTier = {
  id: "tier-1",
  multiplier: 1.5,
  hours: 0,
};

const DEFAULT_INPUT: LemburInput = {
  mode: "global",
  // Global
  hourlyRate: 50000,
  regularHours: 40,
  hourUnit: "weekly",
  overtimeTiers: [{ ...DEFAULT_TIER }],
  // Indonesia
  monthlySalary: 5000000,
  fixedAllowance: 0,
  enableFixedAllowance: false,
  workSchedule: 5,
  dayType: "regular",
  indonesiaOvertimeHours: 2,
  // Shared
  bonus: 0,
  enableBonus: false,
  taxRate: 5,
  enableTax: false,
};

export const useLembur = () => {
  const [input, setInput] = useState<LemburInput>(DEFAULT_INPUT);

  const result = useMemo<LemburResult>(() => calculateLembur(input), [input]);

  // ── Mode ───────────────────────────────────────────────────────────────
  const updateMode = useCallback((mode: OvertimeMode) => {
    setInput((prev) => ({ ...prev, mode }));
  }, []);

  // ── Global fields ──────────────────────────────────────────────────────
  const setHourlyRate = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, hourlyRate: val }));
  }, []);

  const setRegularHours = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, regularHours: val }));
  }, []);

  const setHourUnit = useCallback((val: "weekly" | "daily") => {
    setInput((prev) => ({
      ...prev,
      hourUnit: val,
      regularHours:
        val === "daily" && prev.hourUnit === "weekly"
          ? Math.round(prev.regularHours / 5)
          : val === "weekly" && prev.hourUnit === "daily"
            ? prev.regularHours * 5
            : prev.regularHours,
    }));
  }, []);

  // ── Indonesia fields ───────────────────────────────────────────────────
  const setMonthlySalary = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, monthlySalary: val }));
  }, []);

  const setFixedAllowance = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, fixedAllowance: val }));
  }, []);

  const setEnableFixedAllowance = useCallback((val: boolean) => {
    setInput((prev) => ({ ...prev, enableFixedAllowance: val }));
  }, []);

  const setWorkSchedule = useCallback((val: 5 | 6) => {
    setInput((prev) => ({ ...prev, workSchedule: val }));
  }, []);

  const setDayType = useCallback((val: "regular" | "holiday") => {
    setInput((prev) => ({ ...prev, dayType: val }));
  }, []);

  const setIndonesiaOvertimeHours = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, indonesiaOvertimeHours: val }));
  }, []);

  // ── Shared toggles ─────────────────────────────────────────────────────
  const setBonus = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, bonus: val }));
  }, []);

  const setEnableBonus = useCallback((val: boolean) => {
    setInput((prev) => ({ ...prev, enableBonus: val }));
  }, []);

  const setTaxRate = useCallback((val: number) => {
    setInput((prev) => ({ ...prev, taxRate: val }));
  }, []);

  const setEnableTax = useCallback((val: boolean) => {
    setInput((prev) => ({ ...prev, enableTax: val }));
  }, []);

  // ── Overtime tiers (global mode) ───────────────────────────────────────
  const addTier = useCallback(() => {
    setInput((prev) => ({
      ...prev,
      overtimeTiers: [
        ...prev.overtimeTiers,
        {
          id: `tier-${Date.now()}`,
          multiplier: 2 as OvertimeMultiplier,
          hours: 0,
        },
      ],
    }));
  }, []);

  const removeTier = useCallback((id: string) => {
    setInput((prev) => ({
      ...prev,
      overtimeTiers: prev.overtimeTiers.filter((t) => t.id !== id),
    }));
  }, []);

  const updateTierMultiplier = useCallback(
    (id: string, multiplier: OvertimeMultiplier, customVal?: number) => {
      setInput((prev) => ({
        ...prev,
        overtimeTiers: prev.overtimeTiers.map((t) =>
          t.id === id
            ? {
                ...t,
                multiplier,
                customMultiplier: customVal ?? t.customMultiplier,
              }
            : t,
        ),
      }));
    },
    [],
  );

  const updateTierHours = useCallback((id: string, hours: number) => {
    setInput((prev) => ({
      ...prev,
      overtimeTiers: prev.overtimeTiers.map((t) =>
        t.id === id ? { ...t, hours } : t,
      ),
    }));
  }, []);

  const updateTierCustomRate = useCallback((id: string, rate: number) => {
    setInput((prev) => ({
      ...prev,
      overtimeTiers: prev.overtimeTiers.map((t) =>
        t.id === id ? { ...t, customMultiplier: rate } : t,
      ),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setInput({ ...DEFAULT_INPUT, overtimeTiers: [{ ...DEFAULT_TIER }] });
  }, []);

  return {
    input,
    result,
    updateMode,
    setHourlyRate,
    setRegularHours,
    setHourUnit,
    setMonthlySalary,
    setFixedAllowance,
    setEnableFixedAllowance,
    setWorkSchedule,
    setDayType,
    setIndonesiaOvertimeHours,
    setBonus,
    setEnableBonus,
    setTaxRate,
    setEnableTax,
    addTier,
    removeTier,
    updateTierMultiplier,
    updateTierHours,
    updateTierCustomRate,
    resetForm,
  };
};
