import { useState, useCallback } from "react";
import { z } from "zod";
import {
  BMIData,
  BMIResult,
  BMIInput,
  BMIContextType,
  GENDER,
  SYSTEM,
  ACTIVITY_LEVEL,
} from "../types";
import { calculateBMI } from "../utils";

const bmiSchema = z.object({
  weight: z.coerce
    .number()
    .min(2, "Berat minimal 2 kg")
    .max(500, "Berat maksimal 500 kg"),
  heightRaw1: z.coerce
    .number()
    .min(20, "Tinggi minimal 20 cm")
    .max(300, "Tinggi maksimal 300 cm"),
  heightRaw2: z.coerce.number().optional().default(0),
  age: z.coerce
    .number()
    .min(2, "Umur minimal 2 tahun")
    .max(120, "Umur maksimal 120 tahun"),
});

const initialData: BMIData = {
  system: SYSTEM.METRIC,
  gender: GENDER.MALE,
  age: "",
  weight: "",
  heightRaw1: "",
  heightRaw2: "",
  activityLevel: ACTIVITY_LEVEL.MODERATE,
};

export const useBMI = (): BMIContextType => {
  const [data, setData] = useState<BMIData>(initialData);
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback(
    <K extends keyof BMIData>(key: K, value: BMIData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = bmiSchema.parse({
          weight: data.weight,
          heightRaw1: data.heightRaw1,
          heightRaw2:
            data.system === SYSTEM.IMPERIAL && data.heightRaw2
              ? data.heightRaw2
              : 0,
          age: data.age,
        });

        const input: BMIInput = {
          system: data.system,
          weight: parsed.weight,
          heightRaw1: parsed.heightRaw1,
          heightRaw2: parsed.heightRaw2,
          gender: data.gender,
          age: parsed.age,
          activityLevel: data.activityLevel,
        };

        const res = calculateBMI(input);
        setResult(res);
      } catch (err: unknown) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else {
          setError(
            (err as Error).message || "Terjadi kesalahan saat menghitung BMI",
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

  return { data, updateData, result, error, handleCalculate, handleReset };
};
