import { DanaDaruratInput, DanaDaruratResult, ChartDataPoint } from "./types";

export function calculateDanaDarurat(
  input: DanaDaruratInput,
): DanaDaruratResult {
  const totalMonthlyExpense = input.monthlyExpense;

  // Determine months
  const targetMonths =
    input.targetDuration === "custom"
      ? input.customDuration
      : input.targetDuration;

  const baseTarget = totalMonthlyExpense * targetMonths;

  // Life adjustments logic
  let adjustmentPercentage = 0;

  if (input.lifeAdjustments.jobStability === "freelance")
    adjustmentPercentage += 0.2;
  else if (input.lifeAdjustments.jobStability === "low")
    adjustmentPercentage += 0.15;
  else if (input.lifeAdjustments.jobStability === "high")
    adjustmentPercentage -= 0.05;

  if (input.lifeAdjustments.incomeSources === 1) adjustmentPercentage += 0.1;
  else if (input.lifeAdjustments.incomeSources >= 3)
    adjustmentPercentage -= 0.05;

  adjustmentPercentage += input.lifeAdjustments.dependents * 0.05;

  const adjustmentFactor = 1 + Math.max(adjustmentPercentage, -0.1); // cap reduction to max 10%
  const recommendedTarget = Math.round(baseTarget * adjustmentFactor);

  const currentSavings = input.progress.currentSavings;
  let progressPercentage = 0;

  if (recommendedTarget > 0) {
    progressPercentage = (currentSavings / recommendedTarget) * 100;
  }

  let isGoalReached = false;
  if (currentSavings >= recommendedTarget && recommendedTarget > 0) {
    isGoalReached = true;
    progressPercentage = 100;
  }

  // Growth Projection tracking months to goal
  const projectionChart: ChartDataPoint[] = [];
  let monthsToGoal = 0;
  let currentBal = currentSavings;
  let currentTarget = recommendedTarget;

  const monthlyRate = input.advanced.interestRate / 100 / 12;
  const inflationAnnualRate = input.advanced.inflationRate / 100;
  const inflationMonthlyRate = Math.pow(1 + inflationAnnualRate, 1 / 12) - 1;

  if (
    !isGoalReached &&
    recommendedTarget > 0 &&
    input.progress.monthlyContribution > 0
  ) {
    const maxMonths = 360; // Hard cap at 30 years
    let isFilled = false;

    // Initial Month (0)
    projectionChart.push({
      month: 0,
      balance: Math.round(currentBal),
      target: Math.round(currentTarget),
      isFilled: currentBal >= currentTarget,
    });

    while (currentBal < currentTarget && monthsToGoal < maxMonths) {
      monthsToGoal++;
      currentBal =
        currentBal * (1 + monthlyRate) + input.progress.monthlyContribution;
      currentTarget = currentTarget * (1 + inflationMonthlyRate);

      if (currentBal >= currentTarget) {
        isFilled = true;
      }

      // We store progression points to render smooth charts (store every 3rd month)
      if (monthsToGoal % 3 === 0 || isFilled || monthsToGoal <= 12) {
        projectionChart.push({
          month: monthsToGoal,
          balance: Math.round(currentBal),
          target: Math.round(currentTarget),
          isFilled,
        });
      }
    }
  } else if (
    !isGoalReached &&
    recommendedTarget > 0 &&
    input.progress.monthlyContribution <= 0
  ) {
    // If no monthly contribution is provided but they need to reach target
    monthsToGoal = -1; // -1 means infinite/cannot be reached
  }

  return {
    isCalculated: true,
    totalMonthlyExpense,
    baseTarget,
    adjustmentFactor,
    recommendedTarget,
    currentProgressAmount: currentSavings,
    progressPercentage: Math.min(progressPercentage, 100),
    monthsToGoal,
    isGoalReached,
    projectionChart,
  };
}
