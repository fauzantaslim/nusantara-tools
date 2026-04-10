import { useState, useCallback, useEffect } from "react";
import {
  GrafikBayiData,
  GrowthResult,
  SavedMeasurement,
  GrafikBayiContextType,
  GrowthInput,
} from "../types";
import { calculateGrowth, convertWeight, convertLength } from "../utils";
import { LENGTH_UNIT, WEIGHT_UNIT } from "@/lib/constants";

const STORAGE_KEY = "nusantara-grafik-bayi-history";

const initialData: GrafikBayiData = {
  gender: "male",
  dob: "",
  measureDate: new Date().toISOString().slice(0, 10),
  weightUnit: WEIGHT_UNIT.KG,
  lengthUnit: LENGTH_UNIT.CM,
  weightRaw: "",
  lengthRaw: "",
  headRaw: "",
  isPremature: false,
  gestWeeks: "",
};

function loadHistory(): SavedMeasurement[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveHistory(data: SavedMeasurement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const useGrafikBayi = (): GrafikBayiContextType => {
  const [data, setData] = useState<GrafikBayiData>(initialData);
  const [result, setResult] = useState<GrowthResult | null>(null);
  const [error, setError] = useState<string>("");
  const [history, setHistory] = useState<SavedMeasurement[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const updateData = useCallback((key: keyof GrafikBayiData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      if (!data.dob) return setError("Tanggal lahir wajib diisi.");
      if (new Date(data.measureDate) < new Date(data.dob))
        return setError(
          "Tanggal pengukuran tidak boleh sebelum tanggal lahir.",
        );

      const weightKg = data.weightRaw
        ? convertWeight(Number(data.weightRaw), data.weightUnit, "kg")
        : undefined;
      const lengthCm = data.lengthRaw
        ? convertLength(Number(data.lengthRaw), data.lengthUnit, "cm")
        : undefined;
      const headCm = data.headRaw
        ? convertLength(Number(data.headRaw), data.lengthUnit, "cm")
        : undefined;

      if (!weightKg && !lengthCm && !headCm)
        return setError(
          "Isi minimal satu pengukuran (berat, panjang, atau lingkar kepala).",
        );

      const input: GrowthInput = {
        gender: data.gender,
        dob: data.dob,
        measureDate: data.measureDate,
        weight: weightKg,
        length: lengthCm,
        headCirc: headCm,
        isPremature: data.isPremature,
        gestWeeks:
          data.isPremature && data.gestWeeks
            ? Number(data.gestWeeks)
            : undefined,
      };

      try {
        setResult(calculateGrowth(input));
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan.");
      }
    },
    [data],
  );

  const handleSave = useCallback(() => {
    if (!result) return;
    const entry: SavedMeasurement = {
      id: Date.now().toString(),
      date: data.measureDate,
      ageMonths: result.ageMonths,
      weight: data.weightRaw
        ? convertWeight(Number(data.weightRaw), data.weightUnit, "kg")
        : undefined,
      length: data.lengthRaw
        ? convertLength(Number(data.lengthRaw), data.lengthUnit, "cm")
        : undefined,
      headCirc: data.headRaw
        ? convertLength(Number(data.headRaw), data.lengthUnit, "cm")
        : undefined,
      weightZ: result.weight?.zScore,
      lengthZ: result.length?.zScore,
      headCircZ: result.headCirc?.zScore,
    };
    const updated = [entry, ...history].slice(0, 20);
    setHistory(updated);
    saveHistory(updated);
  }, [result, data, history]);

  const deleteHistory = useCallback(
    (id: string) => {
      const updated = history.filter((h) => h.id !== id);
      setHistory(updated);
      saveHistory(updated);
    },
    [history],
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
    history,
    handleCalculate,
    handleReset,
    handleSave,
    deleteHistory,
  };
};
