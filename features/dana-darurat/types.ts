export type JobStability = "high" | "medium" | "low" | "freelance";
export type TargetDuration = 3 | 6 | 9 | 12 | "custom";

export interface LifeAdjustments {
  jobStability: JobStability;
  incomeSources: number; // 1, 2, 3+
  dependents: number;
}

export interface ProgressInputs {
  currentSavings: number;
  monthlyContribution: number;
}

export interface AdvancedInputs {
  interestRate: number; // annual
  inflationRate: number; // annual
}

export interface DanaDaruratInput {
  monthlyExpense: number;
  targetDuration: TargetDuration;
  customDuration: number;
  lifeAdjustments: LifeAdjustments;
  progress: ProgressInputs;
  advanced: AdvancedInputs;
}

export interface ChartDataPoint {
  month: number;
  balance: number;
  target: number;
  isFilled: boolean;
}

export interface DanaDaruratResult {
  isCalculated: boolean;
  totalMonthlyExpense: number;
  baseTarget: number;
  adjustmentFactor: number;
  recommendedTarget: number;
  currentProgressAmount: number;
  progressPercentage: number;
  monthsToGoal: number; // estimate
  isGoalReached: boolean;
  projectionChart: ChartDataPoint[];
}
