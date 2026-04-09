export type MarginMode = "marginMarkup" | "sellingPrice" | "costPrice";

export interface MarginInput {
  mode: MarginMode;

  // Common inputs
  cost: number;
  sellingPrice: number;

  // Percentages
  desiredMargin: number;
  desiredMarkup: number;

  // Formatting and extra
  decimalPrecision: number;
  taxRate: number; // For inclusion if needed
  marketplaceFee: number; // For advanced features
  quantity: number; // Extra business scenario
}

export interface MarginResult {
  isCalculated: boolean;

  // Final calculated values
  cost: number;
  sellingPrice: number;
  profit: number;
  margin: number; // percentage
  markup: number; // percentage

  // Business features
  totalProfit: number; // profit * quantity
  totalRevenue: number; // sellingPrice * quantity
  netProfitAfterFees: number; // profit - tax - marketplace fees
}
