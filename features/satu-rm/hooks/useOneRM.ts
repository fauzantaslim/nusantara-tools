import { useState, useCallback } from "react";
import { z } from "zod";
import {
  OneRMData,
  OneRMResult,
  OneRMInput,
  OneRMContextType,
  FormulaType,
} from "../types";
import { calculateOneRM } from "../utils";

const oneRMSchema = z.object({
  weight: z.coerce
    .number()
    .min(1, "Berat harus lebih dari 0")
    .max(1000, "Berat terlalu besar"),
  reps: z.coerce
    .number()
    .int()
    .min(1, "Minimal 1 repetisi")
    .max(10, "Maksimal 10 repetisi"),
});

const initialData: OneRMData = {
  weight: "",
  reps: "",
  unit: "kg",
  outputUnit: "kg",
  formula: "epley",
};

export const useOneRM = (): OneRMContextType => {
  const [data, setData] = useState<OneRMData>(initialData);
  const [result, setResult] = useState<OneRMResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback((key: keyof OneRMData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = oneRMSchema.parse({
          weight: data.weight,
          reps: data.reps,
        });

        const input: OneRMInput = {
          weight: parsed.weight,
          reps: parsed.reps,
          unit: data.unit,
          outputUnit: data.outputUnit,
          formula: data.formula,
        };

        setResult(calculateOneRM(input));
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else {
          setError(err.message || "Terjadi kesalahan saat menghitung 1RM.");
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

  const handleFormulaChange = useCallback(
    (f: FormulaType) => {
      setData((prev) => ({ ...prev, formula: f }));
      if (result && data.weight && data.reps) {
        try {
          const parsed = oneRMSchema.parse({
            weight: data.weight,
            reps: data.reps,
          });
          setResult(
            calculateOneRM({
              weight: parsed.weight,
              reps: parsed.reps,
              unit: data.unit,
              outputUnit: data.outputUnit,
              formula: f,
            }),
          );
        } catch {
          // silently ignore
        }
      }
    },
    [data, result],
  );

  return {
    data,
    updateData,
    result,
    error,
    handleCalculate,
    handleReset,
    handleFormulaChange,
  };
};
