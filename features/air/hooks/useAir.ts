import { useState, useCallback } from "react";
import { z } from "zod";
import {
  AirData,
  WaterResult,
  WaterInput,
  AirContextType,
  GENDER,
  SYSTEM,
  ACTIVITY_LEVEL,
  CLIMATE,
  ALTITUDE,
  OUTPUT_UNIT,
} from "../types";
import { calculateWaterIntake } from "../utils";

const airSchema = z.object({
  weight: z.coerce
    .number()
    .min(10, "Berat minimal 10 kg")
    .max(500, "Berat maksimal 500 kg"),
  age: z.coerce
    .number()
    .min(2, "Umur minimal 2 tahun")
    .max(120, "Umur maksimal 120 tahun"),
  exerciseDuration: z.coerce.number().min(0).max(1000).optional().default(0),
});

const initialData: AirData = {
  system: SYSTEM.METRIC,
  gender: GENDER.MALE,
  age: "",
  weight: "",
  activityLevel: ACTIVITY_LEVEL.MODERATE,
  exerciseDuration: "",
  climate: CLIMATE.NORMAL,
  altitude: ALTITUDE.LOW,
  caffeine: false,
  alcohol: false,
  highProtein: false,
  pregnant: false,
  sick: false,
  unit: OUTPUT_UNIT.LITER,
};

export const useAir = (): AirContextType => {
  const [data, setData] = useState<AirData>(initialData);
  const [result, setResult] = useState<WaterResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback((key: keyof AirData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const parsed = airSchema.parse({
          weight: data.weight,
          age: data.age,
          exerciseDuration:
            data.exerciseDuration === "" ? 0 : data.exerciseDuration,
        });

        const input: WaterInput = {
          system: data.system,
          gender: data.gender,
          age: parsed.age,
          weight: parsed.weight,
          activityLevel: data.activityLevel,
          exerciseDuration: parsed.exerciseDuration,
          climate: data.climate,
          altitude: data.altitude,
          caffeine: data.caffeine,
          alcohol: data.alcohol,
          highProtein: data.highProtein,
          pregnant: data.pregnant,
          sick: data.sick,
          unit: data.unit,
        };

        const res = calculateWaterIntake(input);
        setResult(res);
      } catch (err: any) {
        if (err instanceof z.ZodError) {
          setError(err.issues[0].message);
        } else {
          setError(
            err.message || "Terjadi kesalahan saat menghitung asupan air.",
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
