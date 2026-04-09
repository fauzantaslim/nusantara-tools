import { MarginInput, MarginResult } from "./types";

export const calculateMargin = (input: MarginInput): MarginResult => {
  let {
    mode,
    cost,
    sellingPrice,
    desiredMargin,
    desiredMarkup,
    taxRate,
    marketplaceFee,
    quantity,
  } = input;

  let profit = 0;
  let margin = 0;
  let markup = 0;

  // Sanitize negative inputs to 0
  cost = Math.max(0, cost);
  sellingPrice = Math.max(0, sellingPrice);

  switch (mode) {
    case "marginMarkup":
      if (sellingPrice > 0) {
        profit = sellingPrice - cost;
        margin = (profit / sellingPrice) * 100;
        markup = cost > 0 ? (profit / cost) * 100 : 0;
      } else {
        // If selling price is 0 but cost exists, technically markup is undefined and margin is -infinity, but we cap to 0 functionally for empty states.
        profit = -cost;
        margin = 0;
        markup = 0;
      }
      break;

    case "sellingPrice":
      // Input: Cost, desired margin
      const marginDec = Math.min(99.99, desiredMargin) / 100; // Cap margin to avoid division by 0 or negative selling price
      if (marginDec < 1) {
        sellingPrice = cost / (1 - marginDec);
        profit = sellingPrice - cost;
        margin = desiredMargin;
        markup = cost > 0 ? (profit / cost) * 100 : 0;
      }
      break;

    case "costPrice":
      // Input: Selling Price, desired margin
      const marginDec2 = Math.min(100, desiredMargin) / 100;
      cost = sellingPrice * (1 - marginDec2);
      profit = sellingPrice - cost;
      margin = desiredMargin;
      markup = cost > 0 ? (profit / cost) * 100 : 0;
      break;
  }

  const actQuantity = Math.max(1, quantity);
  const totalRevenue = sellingPrice * actQuantity;
  const totalCost = cost * actQuantity;
  const totalProfit = totalRevenue - totalCost;

  // Deduction: tax applied to selling price, fee applied to selling price
  // Simple deduction model: tax is subtracted from gross profit, fee subtracted from gross profit.
  const taxDeduction = totalRevenue * (taxRate / 100);
  const feeDeduction = totalRevenue * (marketplaceFee / 100);
  const netProfitAfterFees = totalProfit - taxDeduction - feeDeduction;

  return {
    isCalculated: true,
    cost,
    sellingPrice,
    profit,
    margin,
    markup,
    totalProfit,
    totalRevenue,
    netProfitAfterFees,
  };
};
