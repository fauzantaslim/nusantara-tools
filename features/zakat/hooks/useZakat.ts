"use client";

import { useState, useCallback } from "react";
import {
  ZakatFormData,
  ZakatCalculationResult,
  ZakatContextType,
} from "../types";
import { calculateZakatData } from "../utils";

const initialData: ZakatFormData = {
  mode: "monthly",
  income: "",
  additional: "",
};

export const useZakat = (): ZakatContextType => {
  const [data, setData] = useState<ZakatFormData>(initialData);
  const [result, setResult] = useState<ZakatCalculationResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback(
    (key: keyof ZakatFormData, value: string) => {
      setData((prev) => ({ ...prev, [key]: value }));
      // Clear error when user types
      if (error) setError("");
    },
    [error],
  );

  const calculate = useCallback(() => {
    const numIncome = parseFloat(data.income) || 0;
    const numAdditional = parseFloat(data.additional) || 0;

    if (numIncome === 0 && numAdditional === 0) {
      setError("Masukkan nilai pendapatan Anda terlebih dahulu.");
      setResult(null);
      return;
    }

    setError("");
    const res = calculateZakatData(data);
    setResult(res);
  }, [data]);

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
    handleReset,
    calculate,
  };
};
