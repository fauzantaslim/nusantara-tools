export interface WeddingCategory {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  inputMode: "percentage" | "amount";
  isCustom: boolean;
}

export interface PernikahanInput {
  totalBudget: number;
  guestCount: number;
  categories: WeddingCategory[];
}

export interface CategoryAllocation {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface PernikahanResult {
  isCalculated: boolean;
  categoryAllocations: CategoryAllocation[];
  totalAllocated: number;
  unallocated: number;
  costPerGuest: number;
  overBudget: boolean;
  percentageTotal: number;
  topCategory: { name: string; amount: number } | null;
}
