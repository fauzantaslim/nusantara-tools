import { useState, useCallback } from "react";
import {
  DiabetesData,
  FindriscResult,
  DiabetesContextType,
  GENDER,
  AGE_RANGE,
  BMI_CATEGORY,
  WAIST_MALE,
  WAIST_FEMALE,
  FAMILY_HISTORY,
} from "../types";
import { calculateFINDRISC, calcBMI, bmiToCategory } from "../utils";

// Schema moved or removed if not used

const initialData: DiabetesData = {
  gender: GENDER.MALE,
  ageRange: AGE_RANGE.LT45,
  bmiCategory: BMI_CATEGORY.LT25,
  waistMale: WAIST_MALE.LT94,
  waistFemale: WAIST_FEMALE.LT80,
  physicalActivity: true,
  eatsVegetables: true,
  bpMedication: false,
  highBloodGlucoseHistory: false,
  familyHistory: FAMILY_HISTORY.NONE,
  heightCm: "",
  weightKg: "",
  calcedBMI: null,
  showBMICalc: false,
};

export const useDiabetes = (): DiabetesContextType => {
  const [data, setData] = useState<DiabetesData>(initialData);
  const [result, setResult] = useState<FindriscResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback(
    <K extends keyof DiabetesData>(key: K, value: DiabetesData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleBMICalc = useCallback(() => {
    const h = Number(data.heightCm);
    const w = Number(data.weightKg);
    if (!h || !w || h < 100 || h > 250 || w < 20 || w > 300) return;
    const bmi = calcBMI(h, w);
    setData((prev) => ({
      ...prev,
      calcedBMI: bmi,
      bmiCategory: bmiToCategory(bmi),
    }));
  }, [data.heightCm, data.weightKg]);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      try {
        const res = calculateFINDRISC({
          gender: data.gender,
          ageRange: data.ageRange,
          bmiCategory: data.bmiCategory,
          waistMale: data.gender === GENDER.MALE ? data.waistMale : undefined,
          waistFemale:
            data.gender === GENDER.FEMALE ? data.waistFemale : undefined,
          physicalActivity: data.physicalActivity,
          eatsVegetables: data.eatsVegetables,
          bpMedication: data.bpMedication,
          highBloodGlucoseHistory: data.highBloodGlucoseHistory,
          familyHistory: data.familyHistory,
        });
        setResult(res);
      } catch (err: unknown) {
        setError(
          (err as Error).message || "Terjadi kesalahan saat menghitung risiko.",
        );
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
    handleBMICalc,
  };
};
