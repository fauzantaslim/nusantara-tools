"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { PREGNANCY_METHOD } from "@/lib/constants";
import {
  PregnancyData,
  PregnancyResult,
  PregnancyContextType,
  PregnancyInput,
} from "../types";
import { calculatePregnancy } from "../utils";

const pregnancySchema = z.object({
  dateStr: z.string().min(1, "Silakan pilih tanggal terlebih dahulu."),
  cycleLength: z.coerce.number().min(20).max(45).optional(),
  embryoAge: z.coerce.number().optional(),
  ultrasoundWeeks: z.coerce.number().min(0).max(42).optional(),
  ultrasoundDays: z.coerce.number().min(0).max(6).optional(),
});

const initialData: PregnancyData = {
  method: PREGNANCY_METHOD.LMP,
  dateStr: "",
  cycleLength: "28",
  embryoAge: "3",
  ultrasoundWeeks: "",
  ultrasoundDays: "0",
};

export const usePregnancy = (): PregnancyContextType => {
  const [data, setData] = useState<PregnancyData>(initialData);
  const [result, setResult] = useState<PregnancyResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback(
    (
      key: keyof PregnancyData,
      value: string | (typeof PREGNANCY_METHOD)[keyof typeof PREGNANCY_METHOD],
    ) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = pregnancySchema.parse({
          dateStr: data.dateStr,
          cycleLength:
            data.method === PREGNANCY_METHOD.LMP ? data.cycleLength : undefined,
          embryoAge:
            data.method === PREGNANCY_METHOD.IVF ? data.embryoAge : undefined,
          ultrasoundWeeks:
            data.method === PREGNANCY_METHOD.ULTRASOUND
              ? data.ultrasoundWeeks
              : undefined,
          ultrasoundDays:
            data.method === PREGNANCY_METHOD.ULTRASOUND
              ? data.ultrasoundDays
              : undefined,
        });

        const input: PregnancyInput = {
          method: data.method,
          dateStr: parsed.dateStr,
          cycleLength: parsed.cycleLength,
          embryoAge: parsed.embryoAge,
          ultrasoundWeeks: parsed.ultrasoundWeeks,
          ultrasoundDays: parsed.ultrasoundDays,
        };

        const res = calculatePregnancy(input);
        setResult(res);
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else if (err instanceof Error) {
          setError(
            err.message || "Terjadi kesalahan saat menghitung kehamilan.",
          );
        } else {
          setError("Terjadi kesalahan saat menghitung kehamilan.");
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
