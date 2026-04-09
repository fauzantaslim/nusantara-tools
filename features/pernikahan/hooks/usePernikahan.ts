import { useState, useCallback } from "react";
import { PernikahanInput, PernikahanResult, WeddingCategory } from "../types";
import { calculateWedding, DEFAULT_CATEGORIES, generateId } from "../utils";

const buildInitialInput = (): PernikahanInput => ({
  totalBudget: 100000000, // 100 juta
  guestCount: 200,
  categories: DEFAULT_CATEGORIES.map((c) => ({ ...c })),
});

export const usePernikahan = () => {
  const [input, setInput] = useState<PernikahanInput>(buildInitialInput());
  const [result, setResult] = useState<PernikahanResult | null>(null);

  const calculate = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      try {
        const res = calculateWedding(input);
        setResult(res);
      } catch (err) {
        console.error("Calculation Error", err);
      }
    },
    [input],
  );

  const updateInput = useCallback(
    <K extends keyof Omit<PernikahanInput, "categories">>(
      key: K,
      value: PernikahanInput[K],
    ) => {
      setInput((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const updateCategory = useCallback(
    (id: string, updates: Partial<WeddingCategory>) => {
      setInput((prev) => ({
        ...prev,
        categories: prev.categories.map((cat) =>
          cat.id === id ? { ...cat, ...updates } : cat,
        ),
      }));
    },
    [],
  );

  const addCategory = useCallback(() => {
    const newCategory: WeddingCategory = {
      id: generateId(),
      name: "Kategori Baru",
      percentage: 0,
      amount: 0,
      inputMode: "percentage",
      isCustom: true,
    };
    setInput((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }));
  }, []);

  const removeCategory = useCallback((id: string) => {
    setInput((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id),
    }));
  }, []);

  const resetForm = useCallback(() => {
    setInput(buildInitialInput());
    setResult(null);
  }, []);

  return {
    input,
    result,
    calculate,
    updateInput,
    updateCategory,
    addCategory,
    removeCategory,
    resetForm,
  };
};
