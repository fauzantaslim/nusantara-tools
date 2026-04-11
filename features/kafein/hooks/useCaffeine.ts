import { useState, useCallback } from "react";
import {
  CaffeineData,
  CaffeineResult,
  CaffeineEntry,
  CaffeineContextType,
  CaffeineInput,
} from "../types";
import { calculateCaffeine } from "../utils";
import { WEIGHT_UNIT } from "@/lib/constants";

let entryIdCounter = 0;
const newEntry = (): CaffeineEntry => ({
  id: `entry-${++entryIdCounter}`,
  sourceId: "kopi",
  quantity: 1,
});

const initialData: CaffeineData = {
  entries: [newEntry()],
  profile: "adult",
  bodyWeight: "",
  bodyWeightUnit: WEIGHT_UNIT.KG,
};

export const useCaffeine = (): CaffeineContextType => {
  const [data, setData] = useState<CaffeineData>(initialData);
  const [result, setResult] = useState<CaffeineResult | null>(null);
  const [error, setError] = useState<string>("");

  const updateData = useCallback(
    <K extends keyof CaffeineData>(key: K, value: CaffeineData[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const addEntry = useCallback(() => {
    setData((prev) => ({ ...prev, entries: [...prev.entries, newEntry()] }));
  }, []);

  const removeEntry = useCallback((id: string) => {
    setData((prev) => {
      if (prev.entries.length <= 1) return prev;
      return { ...prev, entries: prev.entries.filter((e) => e.id !== id) };
    });
  }, []);

  const updateEntry = useCallback(
    (id: string, patch: Partial<CaffeineEntry>) => {
      setData((prev) => ({
        ...prev,
        entries: prev.entries.map((e) =>
          e.id === id ? { ...e, ...patch } : e,
        ),
      }));
    },
    [],
  );

  const handleCalculate = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      // Validation
      for (const entry of data.entries) {
        if (entry.quantity <= 0) {
          setError("Jumlah pada setiap sumber harus lebih dari 0.");
          setResult(null);
          return;
        }
        if (
          entry.sourceId === "custom" &&
          (!entry.customMg || entry.customMg <= 0)
        ) {
          setError("Masukkan kandungan kafein (mg) untuk sumber kustom Anda.");
          setResult(null);
          return;
        }
      }

      if (data.bodyWeight && Number(data.bodyWeight) <= 0) {
        setError("Berat badan harus berupa angka positif.");
        setResult(null);
        return;
      }

      const input: CaffeineInput = {
        entries: data.entries,
        profile: data.profile,
        bodyWeight: data.bodyWeight ? Number(data.bodyWeight) : undefined,
        bodyWeightUnit: data.bodyWeightUnit,
      };

      setResult(calculateCaffeine(input));
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
    addEntry,
    removeEntry,
    updateEntry,
  };
};
