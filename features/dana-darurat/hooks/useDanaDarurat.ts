import { useState, useCallback } from "react";
import {
  DanaDaruratInput,
  DanaDaruratResult,
  TargetDuration,
  JobStability,
} from "../types";
import { calculateDanaDarurat } from "../utils";

const initialState: DanaDaruratInput = {
  monthlyExpense: 0,
  targetDuration: 6,
  customDuration: 6,
  lifeAdjustments: {
    jobStability: "medium",
    incomeSources: 1,
    dependents: 0,
  },
  progress: {
    currentSavings: 0,
    monthlyContribution: 0,
  },
  advanced: {
    interestRate: 4, // 4% default annual return on HYSA / mutual funds
    inflationRate: 5, // 5% default inflation assumption
  },
};

export const useDanaDarurat = () => {
  const [input, setInput] = useState<DanaDaruratInput>(initialState);
  const [result, setResult] = useState<DanaDaruratResult | null>(null);

  const calculate = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      try {
        const computedResult = calculateDanaDarurat(input);
        setResult(computedResult);
      } catch (err) {
        console.error("Calculation Error", err);
      }
    },
    [input],
  );

  const updateMonthlyExpense = useCallback((value: number) => {
    setInput((prev) => ({
      ...prev,
      monthlyExpense: value,
    }));
  }, []);

  const updateLifeAdjustment = useCallback(
    (
      key: keyof DanaDaruratInput["lifeAdjustments"],
      value: number | JobStability,
    ) => {
      setInput((prev) => ({
        ...prev,
        lifeAdjustments: { ...prev.lifeAdjustments, [key]: value },
      }));
    },
    [],
  );

  const updateProgress = useCallback(
    (key: keyof DanaDaruratInput["progress"], value: number) => {
      setInput((prev) => ({
        ...prev,
        progress: { ...prev.progress, [key]: value },
      }));
    },
    [],
  );

  const updateAdvanced = useCallback(
    (key: keyof DanaDaruratInput["advanced"], value: number) => {
      setInput((prev) => ({
        ...prev,
        advanced: { ...prev.advanced, [key]: value },
      }));
    },
    [],
  );

  const updateDuration = useCallback((duration: TargetDuration) => {
    setInput((prev) => ({
      ...prev,
      targetDuration: duration,
    }));
  }, []);

  const updateCustomDuration = useCallback((val: number) => {
    setInput((prev) => ({
      ...prev,
      customDuration: val,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setInput(initialState);
    setResult(null);
  }, []);

  return {
    input,
    result,
    updateMonthlyExpense,
    updateLifeAdjustment,
    updateProgress,
    updateAdvanced,
    updateDuration,
    updateCustomDuration,
    calculate,
    resetForm,
  };
};
