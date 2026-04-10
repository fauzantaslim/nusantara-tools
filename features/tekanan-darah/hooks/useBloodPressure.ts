"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  BPFormData,
  BPResult,
  SavedReading,
  BPContextType,
  BPInput,
} from "../types";
import { analyzeBP, analyzeTrend } from "../utils";
import { BODY_POSITION, BP_ARM } from "@/lib/constants";

const STORAGE_KEY = "nusantara-tensi-history";

const initialData: BPFormData = {
  systolic: "",
  diastolic: "",
  heartRate: "",
  datetime: new Date().toISOString().slice(0, 16),
  position: BODY_POSITION.SITTING,
  arm: BP_ARM.LEFT,
  notes: "",
};

function loadHistory(): SavedReading[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveHistory(data: SavedReading[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const useBloodPressure = (): BPContextType => {
  const [data, setData] = useState<BPFormData>(initialData);
  const [result, setResult] = useState<BPResult | null>(null);
  const [history, setHistory] = useState<SavedReading[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const trend = useMemo(() => analyzeTrend(history), [history]);

  const updateData = useCallback((key: keyof BPFormData, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAnalyze = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      const sys = Number(data.systolic);
      const dia = Number(data.diastolic);

      if (!sys || !dia) {
        setError("Tekanan sistolik dan diastolik wajib diisi.");
        return;
      }

      if (sys <= 0 || dia <= 0) {
        setError("Nilai tekanan darah harus berupa angka positif.");
        return;
      }

      if (sys < dia) {
        setError("Tekanan sistolik harus lebih besar dari diastolik.");
        return;
      }

      const input: BPInput = {
        systolic: sys,
        diastolic: dia,
        heartRate: data.heartRate ? Number(data.heartRate) : undefined,
        datetime: data.datetime,
        position: data.position,
        arm: data.arm,
        notes: data.notes || undefined,
      };

      setResult(analyzeBP(input));
    },
    [data],
  );

  const handleSave = useCallback(() => {
    if (!result) return;

    const entry: SavedReading = {
      ...result,
      id: Date.now().toString(),
      datetime: data.datetime,
      position: data.position,
      arm: data.arm,
      notes: data.notes || undefined,
    };

    const updated = [entry, ...history].slice(0, 30);
    setHistory(updated);
    saveHistory(updated);
  }, [result, data, history]);

  const deleteReading = useCallback(
    (id: string) => {
      const updated = history.filter((h) => h.id !== id);
      setHistory(updated);
      saveHistory(updated);
    },
    [history],
  );

  const handleReset = useCallback(() => {
    setData({
      ...initialData,
      datetime: new Date().toISOString().slice(0, 16),
    });
    setResult(null);
    setError("");
  }, []);

  return {
    data,
    updateData,
    result,
    history,
    error,
    trend,
    handleAnalyze,
    handleSave,
    deleteReading,
    handleReset,
  };
};
