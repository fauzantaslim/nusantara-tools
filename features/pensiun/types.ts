export interface PensiunInput {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;

  currentSavings: number;
  monthlyContribution: number;

  desiredAnnualIncome: number; // Today's money

  preRetirementReturnRate: number; // %
  postRetirementReturnRate: number; // %
  inflationRate: number; // %
  incomeGrowthRate: number; // %

  socialSecurityBenefit: number; // monthly (Today's money)
  otherRetirementIncome: number; // monthly (Today's money)
  taxRate: number; // %
}

export interface PensiunChartPoint {
  year: number;
  age: number;
  fundBalance: number;
  isRetirement: boolean;
  expenses: number;
  income: number;
}

export interface PensiunResult {
  isCalculated: boolean;

  // Future Value at Retirement
  projectedRetirementSavings: number;

  // Averages based on the simple prompt formula
  estimatedMonthlyIncomeFromSavings: number;
  socialSecurityIncome: number;
  otherRetirementIncome: number;
  totalMonthlyRetirementIncome: number;

  monthlyLivingExpenses: number;
  surplusDeficit: number;

  ageFundDepleted: number | null;
  chartData: PensiunChartPoint[];

  // Detailed Analysis
  targetRetirementSavings: number;
  readinessPercentage: number;
  savingsSurplus: number;
  requiredMonthlyContribution: number;
  durationYears: number | string;
  input: PensiunInput;
}

export interface PensiunContextType {
  input: PensiunInput;
  updateInput: <K extends keyof PensiunInput>(
    key: K,
    value: PensiunInput[K],
  ) => void;
  result: PensiunResult;
  resetForm: () => void;
}
