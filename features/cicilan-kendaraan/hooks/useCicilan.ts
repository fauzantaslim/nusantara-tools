import { useState, useCallback } from "react";
import { CicilanInput, CicilanResult } from "../types";
import { calculateCicilan, validateCicilan } from "../utils";

const initialInput: CicilanInput = {
  vehicleType: "mobil",
  hargaKendaraan: 200000000,
  uangMukaPercent: 20,
  sukuBungaTahunan: 6,
  tenor: 48,
};

export const useCicilan = () => {
  const [input, setInput] = useState<CicilanInput>(initialInput);
  const [result, setResult] = useState<CicilanResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const updateInput = useCallback(
    <K extends keyof CicilanInput>(key: K, value: CicilanInput[K]) => {
      setInput((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const calculate = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      const validationErrors = validateCicilan(input);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors([]);
      try {
        const res = calculateCicilan(input);
        setResult(res);
      } catch (err) {
        console.error("Calculation Error", err);
      }
    },
    [input],
  );

  const resetForm = useCallback(() => {
    setInput(initialInput);
    setResult(null);
    setErrors([]);
  }, []);

  return {
    input,
    result,
    errors,
    updateInput,
    calculate,
    resetForm,
  };
};
