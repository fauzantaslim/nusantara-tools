"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { Button } from "@/ui/Button";
import { DanaDaruratInput, TargetDuration, JobStability } from "../types";
import { cn } from "@/lib/utils";
import {
  ShieldAlert,
  Settings,
  ArrowRight,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Target,
  Briefcase,
  Users,
  Wallet,
} from "lucide-react";

interface DanaDaruratFormProps {
  input: DanaDaruratInput;
  updateMonthlyExpense: (val: number) => void;
  updateLifeAdjustment: (
    key: keyof DanaDaruratInput["lifeAdjustments"],
    value: number | JobStability,
  ) => void;
  updateProgress: (
    key: keyof DanaDaruratInput["progress"],
    value: number,
  ) => void;
  updateAdvanced: (
    key: keyof DanaDaruratInput["advanced"],
    value: number,
  ) => void;
  updateDuration: (val: TargetDuration) => void;
  updateCustomDuration: (val: number) => void;
  onCalculate: (e?: React.FormEvent) => void;
  onReset: () => void;
}

export const DanaDaruratForm: React.FC<DanaDaruratFormProps> = ({
  input,
  updateMonthlyExpense,
  updateLifeAdjustment,
  updateProgress,
  updateAdvanced,
  updateDuration,
  updateCustomDuration,
  onCalculate,
  onReset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Validation
  const warnings: string[] = [];
  if (input.monthlyExpense <= 0) {
    warnings.push("Total pengeluaran bulanan harus lebih dari Rp0.");
  }
  if (input.targetDuration === "custom" && input.customDuration <= 0) {
    warnings.push("Target bulan kustom wajib diisi minimal 1 bulan.");
  }

  const durationOptions = [
    { value: 3, label: "3 Bln", sub: "Minimum" },
    { value: 6, label: "6 Bln", sub: "Ideal" },
    { value: 12, label: "12 Bln", sub: "Aman" },
    { value: "custom", label: "Kustom", sub: "Sendiri" },
  ];

  return (
    <Card
      variant="default"
      className="flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-[#9C4A2A]/[0.02] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFF0EB] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-[#9C4A2A]" />
          Konfigurasi Simulasi
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Sesuaikan profil risiko Anda untuk kalkulasi dana darurat yang akurat.
        </p>
      </div>

      {warnings.length > 0 && (
        <div className="bg-[#9C4A2A]/5 border border-[#9C4A2A]/20 text-[#9C4A2A] px-4 py-3 rounded-xl text-xs font-bold font-body relative z-10">
          <ul className="list-disc pl-4 space-y-1">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={onCalculate}
        className="flex flex-col gap-6 relative z-10 h-full mt-2"
      >
        {/* Total Pengeluaran */}
        <CurrencyInput
          label="Pengeluaran Bulanan Esensial"
          value={input.monthlyExpense.toString()}
          onChange={(v) => updateMonthlyExpense(parseInt(v) || 0)}
          placeholder="5.000.000"
          desc="Kebutuhan primer (sewa, utilitas, makan, transportasi, dll)."
        />

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Target Durasi */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider flex items-center gap-2">
            <Target className="w-3.5 h-3.5" /> Target Masa Perlindungan
          </label>
          <div className="grid grid-cols-4 gap-2">
            {durationOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  updateDuration(
                    opt.value === "custom"
                      ? "custom"
                      : (opt.value as TargetDuration),
                  )
                }
                className={cn(
                  "py-3 px-2 text-sm font-bold rounded-xl border-2 transition-all font-ui flex flex-col items-center gap-0.5",
                  input.targetDuration === opt.value
                    ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A] shadow-sm"
                    : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
                )}
              >
                <span className="text-xs font-bold">{opt.label}</span>
                <span className="text-[9px] opacity-70 uppercase tracking-tighter">
                  {opt.sub}
                </span>
              </button>
            ))}
          </div>

          {input.targetDuration === "custom" && (
            <div className="flex items-center gap-3 bg-[#FFF0EB]/30 border-2 border-[#9C4A2A]/30 rounded-xl px-4 h-12 transition-all mt-1 animate-in slide-in-from-top-2">
              <input
                type="number"
                min="1"
                value={input.customDuration || ""}
                onChange={(e) =>
                  updateCustomDuration(parseInt(e.target.value) || 0)
                }
                placeholder="Jumlah Bulan"
                className="w-full bg-transparent text-sm font-bold text-[#9C4A2A] outline-none placeholder:text-[#9C4A2A]/40"
              />
              <span className="text-xs font-bold text-[#9C4A2A] shrink-0 uppercase tracking-wider">
                Bulan
              </span>
            </div>
          )}
        </div>

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Stabilitas Pekerjaan */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5" /> Stabilitas Pemasukan
          </label>
          <div className="relative group">
            <select
              value={input.lifeAdjustments.jobStability}
              onChange={(e) =>
                updateLifeAdjustment(
                  "jobStability",
                  e.target.value as JobStability,
                )
              }
              className="w-full h-14 bg-white hover:bg-surface/30 border-2 border-muted rounded-xl px-4 text-sm font-bold text-primary focus:border-[#C17A3A] focus:ring-2 focus:ring-[#C17A3A]/20 outline-none appearance-none cursor-pointer transition-all shadow-sm"
            >
              <option value="high">
                Sangat Stabil (PNS / BUMN / Karyawan Tetap)
              </option>
              <option value="medium">Moderat (Kontrak / Swasta)</option>
              <option value="low">Rendah (Harian / Musiman)</option>
              <option value="freelance">
                Freelance / Usaha Sendiri (+20% Buffer)
              </option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Jumlah Tanggungan & Sumber Pemasukan */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Tanggungan
            </label>
            <div className="relative flex items-center border-2 rounded-xl h-12 overflow-hidden transition-all shadow-sm bg-white border-muted focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20">
              <input
                type="number"
                min="0"
                value={input.lifeAdjustments.dependents || ""}
                onChange={(e) =>
                  updateLifeAdjustment(
                    "dependents",
                    parseInt(e.target.value) || 0,
                  )
                }
                placeholder="0"
                className="w-full h-full bg-transparent px-4 text-sm font-bold text-primary outline-none"
              />
              <span className="pr-4 text-[10px] font-bold text-secondary uppercase">
                Orang
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5" /> Sumber Dana
            </label>
            <div className="relative flex items-center border-2 rounded-xl h-12 overflow-hidden transition-all shadow-sm bg-white border-muted focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20">
              <input
                type="number"
                min="1"
                value={input.lifeAdjustments.incomeSources || ""}
                onChange={(e) =>
                  updateLifeAdjustment(
                    "incomeSources",
                    parseInt(e.target.value) || 1,
                  )
                }
                placeholder="1"
                className="w-full h-full bg-transparent px-4 text-sm font-bold text-primary outline-none"
              />
              <span className="pr-4 text-[10px] font-bold text-secondary uppercase">
                Aliran
              </span>
            </div>
          </div>
        </div>

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Tabungan & Kontribusi */}
        <div className="grid grid-cols-1 gap-5">
          <CurrencyInput
            label="Alokasi Dana Darurat Saat Ini"
            value={input.progress.currentSavings.toString()}
            onChange={(v) => updateProgress("currentSavings", parseInt(v) || 0)}
            placeholder="0"
            desc="Saldo likuid yang sudah Anda miliki."
          />
          <CurrencyInput
            label="Target Menabung Bulanan"
            value={input.progress.monthlyContribution.toString()}
            onChange={(v) =>
              updateProgress("monthlyContribution", parseInt(v) || 0)
            }
            placeholder="0"
            desc="Jumlah yang akan disisihkan setiap bulan."
          />
        </div>

        {/* Advanced Accordion */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={cn(
              "flex items-center justify-between w-full p-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest",
              showAdvanced
                ? "bg-[#FFF0EB] border-[#9C4A2A]/30 text-[#9C4A2A]"
                : "bg-surface/30 border-muted text-secondary hover:border-[#7A5C42]/40",
            )}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Lanjutan (Bunga & Inflasi)
            </span>
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4 opacity-60" />
            ) : (
              <ChevronDown className="w-4 h-4 opacity-60" />
            )}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-2 gap-4 mt-4 animate-in slide-in-from-top-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Return (%/Thn)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={input.advanced.interestRate || ""}
                    onChange={(e) =>
                      updateAdvanced(
                        "interestRate",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full h-11 bg-white border-2 border-muted rounded-xl pl-3 pr-8 text-sm font-bold text-primary outline-none focus:border-[#C17A3A]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary font-bold text-sm opacity-50">
                    %
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">
                  Inflasi (%/Thn)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={input.advanced.inflationRate || ""}
                    onChange={(e) =>
                      updateAdvanced(
                        "inflationRate",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full h-11 bg-white border-2 border-muted rounded-xl pl-3 pr-8 text-sm font-bold text-primary outline-none focus:border-[#C17A3A]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary font-bold text-sm opacity-50">
                    %
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0 shadow-sm border-b-4 hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] transition-all"
          >
            <RefreshCw className="w-5 h-5 text-secondary" />
          </Button>
          <Button
            type="submit"
            disabled={warnings.length > 0}
            variant="primary"
            className="py-4 text-base flex-1 rounded-2xl !bg-[#9C4A2A] hover:!bg-[#7A3A1E] text-[#FFF8F0] outline-none ring-0 border-b-4 border-[#7A5C42] hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] shadow-sm transition-all group font-ui"
          >
            Hitung Dana Darurat
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
