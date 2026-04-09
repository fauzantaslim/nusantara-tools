import { useState, useEffect, useCallback } from "react";
import { MarginInput, MarginResult } from "../types";
import { calculateMargin } from "../utils";

const initialState: MarginInput = {
  mode: "marginMarkup",
  cost: 100000,
  sellingPrice: 150000,
  desiredMargin: 20,
  desiredMarkup: 25,
  decimalPrecision: 0,
  taxRate: 0,
  marketplaceFee: 0,
  quantity: 1,
};

const initialResult: MarginResult = {
  isCalculated: false,
  cost: 0,
  sellingPrice: 0,
  profit: 0,
  margin: 0,
  markup: 0,
  totalProfit: 0,
  totalRevenue: 0,
  netProfitAfterFees: 0,
};

export const useMargin = () => {
  const [input, setInput] = useState<MarginInput>(initialState);
  const [result, setResult] = useState<MarginResult | null>(null);

  const calculate = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      try {
        const calculatedResult = calculateMargin(input);
        setResult(calculatedResult);
      } catch (e) {
        console.error("Calculation Error", e);
      }
    },
    [input],
  );

  const updateInput = useCallback(
    <K extends keyof MarginInput>(key: K, value: MarginInput[K]) => {
      setInput((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setMode = useCallback((mode: MarginInput["mode"]) => {
    setInput((prev) => ({ ...prev, mode }));
    setResult(null);
  }, []);

  const resetForm = useCallback(() => {
    setInput(initialState);
    setResult(null);
  }, []);

  return {
    input,
    result,
    updateInput,
    setMode,
    resetForm,
    calculate,
  };
};
