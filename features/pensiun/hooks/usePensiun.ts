import { useState, useCallback, useMemo } from "react";
import { PensiunInput, PensiunResult, PensiunContextType } from "../types";
import { calculatePensiun } from "../utils";

const initialState: PensiunInput = {
  currentAge: 30,
  retirementAge: 55,
  lifeExpectancy: 80,

  currentSavings: 50000000,
  monthlyContribution: 2000000,

  desiredAnnualIncome: 120000000,

  preRetirementReturnRate: 8,
  postRetirementReturnRate: 5,
  inflationRate: 4,
  incomeGrowthRate: 5,

  socialSecurityBenefit: 500000,
  otherRetirementIncome: 0,
  taxRate: 5,
};

const initialResult: PensiunResult = {
  isCalculated: false,
  projectedRetirementSavings: 0,
  estimatedMonthlyIncomeFromSavings: 0,
  socialSecurityIncome: 0, // FV
  otherRetirementIncome: 0, // FV
  totalMonthlyRetirementIncome: 0,
  monthlyLivingExpenses: 0, // FV
  surplusDeficit: 0,
  ageFundDepleted: null,
  chartData: [],
  targetRetirementSavings: 0,
  readinessPercentage: 0,
  savingsSurplus: 0,
  requiredMonthlyContribution: 0,
  durationYears: 0,
  input: initialState,
};

export const usePensiun = (): PensiunContextType => {
  const [data, setData] = useState<PensiunInput>(initialState);
  // Auto-calculation on input changes
  const result = useMemo(() => {
    try {
      return calculatePensiun(data);
    } catch (e) {
      console.error("Calculation Error", e);
      return initialResult;
    }
  }, [data]);

  const updateInput = useCallback(
    <K extends keyof PensiunInput>(key: K, value: PensiunInput[K]) => {
      setData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setData(initialState);
  }, []);

  return {
    input: data,
    result,
    updateInput,
    resetForm,
  };
};
