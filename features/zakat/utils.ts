import { ZAKAT_NISAB, ZAKAT_RATE } from "@/lib/constants";
import { ZakatCalculationResult, ZakatFormData } from "./types";

/**
 * Calculates Zakat based on BAZNAS 2026 standards.
 * Formula: Zakat = Total Income * 2.5% (if totalIncome >= nisab)
 */
export function calculateZakatData(
  data: ZakatFormData,
): ZakatCalculationResult {
  const numIncome = parseFloat(data.income) || 0;
  const numAdditional = parseFloat(data.additional) || 0;
  const totalIncome = numIncome + numAdditional;

  const nisab =
    data.mode === "yearly" ? ZAKAT_NISAB.YEARLY : ZAKAT_NISAB.MONTHLY;

  const isWajib = totalIncome >= nisab;
  const zakatAmount = isWajib ? totalIncome * ZAKAT_RATE : 0;

  return {
    totalIncome,
    nisab,
    isWajib,
    zakatAmount,
    mode: data.mode,
  };
}

/**
 * Helper to format currency in IDR
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
