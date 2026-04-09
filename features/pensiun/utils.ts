import { PensiunInput, PensiunResult, PensiunChartPoint } from "./types";

export const calculatePensiun = (input: PensiunInput): PensiunResult => {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    desiredAnnualIncome,
    preRetirementReturnRate,
    postRetirementReturnRate,
    inflationRate,
    incomeGrowthRate,
    socialSecurityBenefit,
    otherRetirementIncome,
    taxRate,
  } = input;

  // Basic duration
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);
  const totalMonthsInRetirement = yearsInRetirement * 12;

  // Rates in decimal
  const preReturnDec = preRetirementReturnRate / 100;
  const postReturnDec = postRetirementReturnRate / 100;
  const inflationDec = inflationRate / 100;
  const growthDec = incomeGrowthRate / 100;

  // 1. Chart Data & Trajectory simulation
  const chartData: PensiunChartPoint[] = [];
  let currentBalance = currentSavings;
  let currentMonthlyContrib = monthlyContribution;
  let targetAnnualExpense = desiredAnnualIncome;
  let currentSSB = socialSecurityBenefit;
  let currentOther = otherRetirementIncome;

  let projectedRetirementSavings = 0;
  let ageFundDepleted: number | null = null;

  for (let age = currentAge; age <= lifeExpectancy; age++) {
    const isRetirement = age >= retirementAge;
    let income = 0;
    let expenses = 0;

    if (!isRetirement) {
      // Accumulation Phase
      // We add annual contribution spaced throughout the year (simplification: end of year)
      // Actually standard compound interest is annual.
      const annualContrib = currentMonthlyContrib * 12;
      currentBalance = currentBalance * (1 + preReturnDec) + annualContrib;

      // Inflate variables
      currentMonthlyContrib = currentMonthlyContrib * (1 + growthDec);
      targetAnnualExpense = targetAnnualExpense * (1 + inflationDec);
      currentSSB = currentSSB * (1 + inflationDec);
      currentOther = currentOther * (1 + inflationDec);

      chartData.push({
        year: new Date().getFullYear() + (age - currentAge),
        age,
        fundBalance: Math.max(0, currentBalance),
        isRetirement: false,
        expenses: 0,
        income: annualContrib,
      });

      if (age === retirementAge - 1 || yearsToRetirement === 0) {
        projectedRetirementSavings = currentBalance;
      }
    } else {
      // Decumulation Phase
      if (age === retirementAge && yearsToRetirement === 0) {
        projectedRetirementSavings = currentBalance;
      }

      const annualSSB = currentSSB * 12;
      const annualOther = currentOther * 12;
      const grossIncomeFromOthers = annualSSB + annualOther;
      const taxOnOthers = grossIncomeFromOthers * (taxRate / 100);
      const netIncomeFromOthers = grossIncomeFromOthers - taxOnOthers;

      // Expense is inflated every year
      expenses = targetAnnualExpense;

      // How much we need from savings
      let shortfall = expenses - netIncomeFromOthers;
      if (shortfall < 0) shortfall = 0; // we have more than enough without savings

      // Withdraw from savings (gross required to cover net shortfall)
      // If we pull from savings and it's taxed...
      // Simplification: We just pull the exact shortfall amount plus taxes on the withdrawal.
      const withdrawalNeeded = shortfall / (1 - taxRate / 100);

      if (currentBalance >= withdrawalNeeded) {
        currentBalance -= withdrawalNeeded;
        income = grossIncomeFromOthers + withdrawalNeeded;
      } else {
        // Run out of money this year
        income = grossIncomeFromOthers + currentBalance;
        currentBalance = 0;
        if (ageFundDepleted === null) {
          ageFundDepleted = age;
        }
      }

      // Grow remaining balance
      currentBalance = currentBalance * (1 + postReturnDec);

      // Inflate targets for next year
      targetAnnualExpense = targetAnnualExpense * (1 + inflationDec);
      currentSSB = currentSSB * (1 + inflationDec);
      currentOther = currentOther * (1 + inflationDec);

      chartData.push({
        year: new Date().getFullYear() + (age - currentAge),
        age,
        fundBalance: Math.max(0, currentBalance),
        isRetirement: true,
        expenses: expenses,
        income: income,
      });
    }
  }

  // 2. Simple formulas based strictly on Acceptance Criteria for the top cards view

  // (We use Future Values at retirement age for these fixed metrics so they make sense together)
  // Projected Retirement Savings is already calculated from the loop at the exact transition year.

  const estimatedMonthlyIncomeFromSavings =
    totalMonthsInRetirement > 0
      ? projectedRetirementSavings / totalMonthsInRetirement
      : 0;

  // The prompt says "System displays: ... Social security income, Other retirement income ... Total retirement income".
  // We'll show the FV at the first year of retirement for these.
  const inflationMultiplierToRetirement = Math.pow(
    1 + inflationDec,
    yearsToRetirement,
  );

  const futureSSB = socialSecurityBenefit * inflationMultiplierToRetirement;
  const futureOther = otherRetirementIncome * inflationMultiplierToRetirement;

  const totalMonthlyRetirementIncome =
    estimatedMonthlyIncomeFromSavings + futureSSB + futureOther;

  const futureMonthlyLivingExpenses =
    (desiredAnnualIncome * inflationMultiplierToRetirement) / 12;

  const surplusDeficit =
    totalMonthlyRetirementIncome - futureMonthlyLivingExpenses;

  // Additional Detailed Analysis calculations
  const futureDesiredAnnualIncome =
    desiredAnnualIncome * Math.pow(1 + inflationDec, yearsToRetirement);
  const futureAnnualSSBAndOther =
    (socialSecurityBenefit + otherRetirementIncome) *
    12 *
    Math.pow(1 + inflationDec, yearsToRetirement);
  const requiredFromSavingsPerYear =
    futureDesiredAnnualIncome - futureAnnualSSBAndOther;
  const grossRequiredWithdrawal =
    requiredFromSavingsPerYear > 0
      ? requiredFromSavingsPerYear / (1 - taxRate / 100)
      : 0;

  let targetRetirementSavings = 0;
  if (grossRequiredWithdrawal > 0 && yearsInRetirement > 0) {
    if (postReturnDec === inflationDec) {
      targetRetirementSavings =
        (grossRequiredWithdrawal * yearsInRetirement) / (1 + postReturnDec);
    } else {
      targetRetirementSavings =
        (grossRequiredWithdrawal *
          (1 -
            Math.pow(
              (1 + inflationDec) / (1 + postReturnDec),
              yearsInRetirement,
            ))) /
        (postReturnDec - inflationDec);
    }
  }

  const savingsSurplus = projectedRetirementSavings - targetRetirementSavings;
  const readinessPercentage =
    targetRetirementSavings > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (projectedRetirementSavings / targetRetirementSavings) * 100,
          ),
        )
      : 100;

  let durationYears: number | string =
    ageFundDepleted !== null ? ageFundDepleted - retirementAge : ">100";
  if (ageFundDepleted === null) {
    if (chartData[chartData.length - 1]?.fundBalance > 0) {
      durationYears = "100";
    }
  }

  let requiredMonthlyContribution = 0;
  if (
    targetRetirementSavings >
    currentSavings * Math.pow(1 + preReturnDec, yearsToRetirement)
  ) {
    const fvCurrentSavings =
      currentSavings * Math.pow(1 + preReturnDec, yearsToRetirement);
    const denominator =
      preReturnDec === growthDec
        ? yearsToRetirement * Math.pow(1 + preReturnDec, yearsToRetirement - 1)
        : (Math.pow(1 + preReturnDec, yearsToRetirement) -
            Math.pow(1 + growthDec, yearsToRetirement)) /
          (preReturnDec - growthDec);

    const requiredAnnualContribution =
      denominator > 0
        ? (targetRetirementSavings - fvCurrentSavings) / denominator
        : 0;
    requiredMonthlyContribution = requiredAnnualContribution / 12;
  }

  // Adjust output to be clean rounded numbers
  return {
    isCalculated: true,
    projectedRetirementSavings: Math.round(projectedRetirementSavings),
    estimatedMonthlyIncomeFromSavings: Math.round(
      estimatedMonthlyIncomeFromSavings,
    ),
    socialSecurityIncome: Math.round(futureSSB),
    otherRetirementIncome: Math.round(futureOther),
    totalMonthlyRetirementIncome: Math.round(totalMonthlyRetirementIncome),
    monthlyLivingExpenses: Math.round(futureMonthlyLivingExpenses),
    surplusDeficit: Math.round(surplusDeficit),
    ageFundDepleted,
    chartData: chartData.map((d) => ({
      ...d,
      fundBalance: Math.round(d.fundBalance),
      expenses: Math.round(d.expenses),
      income: Math.round(d.income),
    })),
    // Detailed metrics
    targetRetirementSavings,
    readinessPercentage,
    savingsSurplus,
    requiredMonthlyContribution,
    durationYears,
    input,
  };
};
