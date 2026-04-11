import { useState, useCallback } from "react";
import { z } from "zod";
import {
  CalorieData,
  CalorieResult,
  CalorieContextType,
  CalorieInput,
} from "../types";
import { calculateCalories } from "../utils";
import {
  SYSTEM,
  GENDER,
  CALORIE_GOAL,
  CALORIE_FORMULA,
  ACTIVITY_LEVEL,
} from "@/lib/constants";

const kaloriSchema = z.object({
  weight: z.coerce
    .number()
    .min(10, "Berat minimal 10 kg")
    .max(500, "Berat maksimal 500 kg"),
  heightRaw1: z.coerce
    .number()
    .min(20, "Tinggi minimal 20 cm")
    .max(300, "Tinggi maksimal 300"),
  heightRaw2: z.coerce.number().optional().default(0),
  age: z.coerce
    .number()
    .min(2, "Umur minimal 2 tahun")
    .max(120, "Umur maksimal 120 tahun"),
  bodyFatPercentage: z.coerce
    .number()
    .min(1, "Persentase minimal 1%")
    .max(80, "Persentase maksimal 80%")
    .optional()
    .or(z.literal("")),
});

const initialData: CalorieData = {
  system: SYSTEM.METRIC,
  gender: GENDER.MALE,
  age: "",
  weight: "",
  heightRaw1: "",
  heightRaw2: "",
  activityLevel: ACTIVITY_LEVEL.MODERATE,
  goal: CALORIE_GOAL.MAINTAIN,
  formula: CALORIE_FORMULA.MIFFLIN,
  bodyFat: "",
  weightChangeRate: 0.5,
};

export const useCalorie = (): CalorieContextType => {
  const [data, setData] = useState<CalorieData>(initialData);
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback(
    <K extends keyof CalorieData>(key: K, value: CalorieData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = kaloriSchema.parse({
          weight: data.weight,
          heightRaw1: data.heightRaw1,
          heightRaw2:
            data.system === SYSTEM.IMPERIAL && data.heightRaw2
              ? data.heightRaw2
              : 0,
          age: data.age,
          bodyFatPercentage: data.bodyFat ? data.bodyFat : undefined,
        });

        if (
          data.formula === CALORIE_FORMULA.KATCH &&
          !parsed.bodyFatPercentage
        ) {
          setError(
            "Rumus Katch-McArdle membutuhkan input persentase lemak tubuh.",
          );
          return;
        }

        const input: CalorieInput = {
          system: data.system,
          gender: data.gender,
          age: parsed.age,
          weight: parsed.weight,
          heightRaw1: parsed.heightRaw1,
          heightRaw2: parsed.heightRaw2,
          activityLevel: data.activityLevel,
          goal: data.goal,
          formula: data.formula,
          bodyFatPercentage: parsed.bodyFatPercentage as number | undefined,
          weightChangeRate:
            data.goal !== CALORIE_GOAL.MAINTAIN
              ? data.weightChangeRate
              : undefined,
        };

        const res = calculateCalories(input);
        setResult(res);
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else if (err instanceof Error) {
          setError(err.message || "Terjadi kesalahan saat menghitung kalori.");
        } else {
          setError("Terjadi kesalahan saat menghitung kalori.");
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
