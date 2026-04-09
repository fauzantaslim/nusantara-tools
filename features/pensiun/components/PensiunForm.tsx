"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { PensiunInput } from "../types";
import { cn } from "@/lib/utils";
import {
  Settings,
  Target,
  PiggyBank,
  TrendingUp,
  Sliders,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface PensiunFormProps {
  input: PensiunInput;
  onChange: <K extends keyof PensiunInput>(
    key: K,
    value: PensiunInput[K],
  ) => void;
  onReset: () => void;
}

export const PensiunForm: React.FC<PensiunFormProps> = ({
  input,
  onChange,
  onReset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Validation warnings
  const warnings = [];
  if (input.currentAge >= input.retirementAge) {
    warnings.push("Usia pensiun harus lebih besar dari usia saat ini.");
  }
  if (input.retirementAge >= input.lifeExpectancy) {
    warnings.push("Ekspektasi hidup harus lebih panjang dari usia pensiun.");
  }

  return (
    <Card
      variant="default"
      className="flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#9C4A2A]" />
            Data Finansial
          </h2>
          <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
            Masukkan data finansial dan usia Anda untuk mulai memproyeksikan
            dana pensiun.
          </p>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-bold font-body">
          <ul className="list-disc pl-4 space-y-1">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-8 relative z-10">
        {/* 1. Informasi Pribadi */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#C17A3A]" /> Profil Usia
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary">
                Usia Saat Ini
              </label>
              <input
                type="number"
                min="18"
                max="80"
                value={input.currentAge || ""}
                onChange={(e) =>
                  onChange("currentAge", parseInt(e.target.value) || 0)
                }
                className="h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary">
                Usia Pensiun
              </label>
              <input
                type="number"
                min="30"
                max="90"
                value={input.retirementAge || ""}
                onChange={(e) =>
                  onChange("retirementAge", parseInt(e.target.value) || 0)
                }
                className="h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary">
                Ekspektasi Hidup
              </label>
              <input
                type="number"
                min="50"
                max="120"
                value={input.lifeExpectancy || ""}
                onChange={(e) =>
                  onChange("lifeExpectancy", parseInt(e.target.value) || 0)
                }
                className="h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Tabungan */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-[#C17A3A]" /> Tabungan Pensiun
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <CurrencyInput
              label="Tabungan Pensiun Saat Ini"
              value={input.currentSavings.toString()}
              onChange={(v) => onChange("currentSavings", parseInt(v) || 0)}
              placeholder="50.000.000"
              desc="Total dana yang sudah terkumpul sejauh ini"
            />
            <CurrencyInput
              label="Kontribusi Bulanan"
              value={input.monthlyContribution.toString()}
              onChange={(v) =>
                onChange("monthlyContribution", parseInt(v) || 0)
              }
              placeholder="2.000.000"
              desc="Jumlah yang sanggup disisihkan per bulan"
            />
          </div>
        </div>

        {/* 3. Tujuan */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C17A3A]" /> Target Pengeluaran
          </h3>
          <div className="flex flex-col">
            <CurrencyInput
              label="Pengeluaran Pensiun / Tahun"
              value={input.desiredAnnualIncome.toString()}
              onChange={(v) =>
                onChange("desiredAnnualIncome", parseInt(v) || 0)
              }
              placeholder="120.000.000"
              desc="Kebutuhan dana tahunan yang diharapkan saat pensiun (nilai masa kini)"
            />
            {input.desiredAnnualIncome > 0 && (
              <p className="text-xs text-secondary mt-2 px-2 font-medium">
                Sama dengan{" "}
                <span className="font-bold text-[#9C4A2A] bg-[#9C4A2A]/10 px-1 py-0.5 rounded">
                  Rp{" "}
                  {(input.desiredAnnualIncome / 12).toLocaleString("id-ID", {
                    maximumFractionDigits: 0,
                  })}
                </span>{" "}
                per bulan.
              </p>
            )}
          </div>
        </div>

        {/* 4. Advanced Accordion */}
        <div className="pt-4 border-t border-muted">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full p-3 bg-surface/50 rounded-2xl border border-muted hover:border-[#9C4A2A]/30 transition-all font-bold text-sm text-primary"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C17A3A]" />
              Asumsi Investasi & Lanjutan
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 text-secondary" />
            ) : (
              <ChevronDown className="w-4 h-4 text-secondary" />
            )}
          </button>

          {showAdvanced && (
            <div className="flex flex-col gap-6 mt-6 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary">
                    Return Pra-Pensiun (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.preRetirementReturnRate || ""}
                    onChange={(e) =>
                      onChange(
                        "preRetirementReturnRate",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary">
                    Return Pasca-Pensiun (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.postRetirementReturnRate || ""}
                    onChange={(e) =>
                      onChange(
                        "postRetirementReturnRate",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary">
                    Tingkat Inflasi (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.inflationRate || ""}
                    onChange={(e) =>
                      onChange("inflationRate", parseFloat(e.target.value) || 0)
                    }
                    className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary">
                    Kenaikan Pemasukan (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.incomeGrowthRate || ""}
                    onChange={(e) =>
                      onChange(
                        "incomeGrowthRate",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <CurrencyInput
                  label="Pensiun BPJS / Negara (Bulan)"
                  value={input.socialSecurityBenefit.toString()}
                  onChange={(v) =>
                    onChange("socialSecurityBenefit", parseInt(v) || 0)
                  }
                  placeholder="500.000"
                />
                <CurrencyInput
                  label="Pendapatan Tambahan Lainnya (Bulan)"
                  value={input.otherRetirementIncome.toString()}
                  onChange={(v) =>
                    onChange("otherRetirementIncome", parseInt(v) || 0)
                  }
                  placeholder="0"
                />
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary font-ui uppercase">
                    Estimasi Pajak Pensiun (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={input.taxRate || ""}
                    onChange={(e) =>
                      onChange("taxRate", parseFloat(e.target.value) || 0)
                    }
                    className="w-full h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
