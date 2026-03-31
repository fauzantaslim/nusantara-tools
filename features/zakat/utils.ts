export const NISAB_YEAR = 91681728;
export const NISAB_MONTH = 7640144;
export const ZAKAT_RATE = 0.025;

export type CalculationMode = 'monthly' | 'yearly';

export interface ZakatInput {
  income: number;
  additional: number;
  mode: CalculationMode;
}

export interface ZakatResult {
  totalIncome: number;
  nisab: number;
  isWajib: boolean;
  zakatAmount: number;
}

export function calculateZakat(input: ZakatInput): ZakatResult {
  const totalIncome = input.income + input.additional;
  
  const nisab = input.mode === 'yearly' ? NISAB_YEAR : NISAB_MONTH;
  
  const isWajib = totalIncome >= nisab;
  const zakatAmount = isWajib ? (totalIncome * ZAKAT_RATE) : 0;
  
  return {
    totalIncome,
    nisab,
    isWajib,
    zakatAmount
  };
}
