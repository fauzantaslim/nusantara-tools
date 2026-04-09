"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { cn } from "@/lib/utils";
import {
  LemburInput,
  OvertimeTier,
  OvertimeMultiplier,
  OvertimeMode,
} from "../types";
import {
  Settings,
  Plus,
  Trash2,
  Percent,
  Gift,
  RotateCcw,
  Clock,
  ChevronDown,
  Globe,
  Flag,
} from "lucide-react";

interface LemburFormProps {
  input: LemburInput;
  onSelectMode: (m: OvertimeMode) => void;
  onHourlyRateChange: (v: number) => void;
  onRegularHoursChange: (v: number) => void;
  onHourUnitChange: (v: "weekly" | "daily") => void;
  onMonthlySalaryChange: (v: number) => void;
  onFixedAllowanceChange: (v: number) => void;
  onEnableFixedAllowanceChange: (v: boolean) => void;
  onWorkScheduleChange: (v: 5 | 6) => void;
  onDayTypeChange: (v: "regular" | "holiday") => void;
  onIndonesiaOvertimeHoursChange: (v: number) => void;
  onBonusChange: (v: number) => void;
  onEnableBonusChange: (v: boolean) => void;
  onTaxRateChange: (v: number) => void;
  onEnableTaxChange: (v: boolean) => void;
  onAddTier: () => void;
  onRemoveTier: (id: string) => void;
  onUpdateTierMultiplier: (
    id: string,
    m: OvertimeMultiplier,
    custom?: number,
  ) => void;
  onUpdateTierHours: (id: string, h: number) => void;
  onUpdateTierCustomRate: (id: string, r: number) => void;
  onReset: () => void;
}

const MULTIPLIER_OPTIONS: { value: OvertimeMultiplier; label: string }[] = [
  { value: 1.5, label: "1.5× (Waktu & Setengah)" },
  { value: 2, label: "2× (Dua Kali Lipat)" },
  { value: 2.5, label: "2.5× (Dua Setengah Kali)" },
  { value: 3, label: "3× (Tiga Kali Lipat)" },
  { value: "custom", label: "Kustom..." },
];

const Toggle: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: React.ReactNode;
}> = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={cn(
      "flex items-center gap-3 text-sm font-bold font-ui transition-colors cursor-pointer select-none",
      checked ? "text-[#9C4A2A]" : "text-secondary",
    )}
  >
    <span
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors border-2",
        checked ? "bg-[#9C4A2A] border-[#9C4A2A]" : "bg-muted border-muted",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </span>
    {label}
  </button>
);

const TierRow: React.FC<{
  tier: OvertimeTier;
  canRemove: boolean;
  onRemove: () => void;
  onMultiplierChange: (m: OvertimeMultiplier, custom?: number) => void;
  onHoursChange: (h: number) => void;
  onCustomRateChange: (r: number) => void;
}> = ({
  tier,
  canRemove,
  onRemove,
  onMultiplierChange,
  onHoursChange,
  onCustomRateChange,
}) => {
  const isCustom = tier.multiplier === "custom";
  return (
    <div className="flex flex-col gap-3 p-4 bg-surface rounded-2xl border border-muted">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <select
            value={String(tier.multiplier)}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === "custom") {
                onMultiplierChange("custom", tier.customMultiplier ?? 1.5);
              } else {
                onMultiplierChange(parseFloat(raw) as OvertimeMultiplier);
              }
            }}
            className="w-full h-11 bg-white border border-muted rounded-xl px-4 pr-10 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none appearance-none cursor-pointer"
          >
            {MULTIPLIER_OPTIONS.map((opt) => (
              <option key={String(opt.value)} value={String(opt.value)}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="h-11 w-11 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {isCustom && (
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-secondary shrink-0">
            Pengali Kustom
          </label>
          <input
            type="number"
            min="1"
            step="0.1"
            value={tier.customMultiplier ?? 1.5}
            onChange={(e) =>
              onCustomRateChange(parseFloat(e.target.value) || 1.5)
            }
            className="flex-1 h-10 bg-white border border-[#9C4A2A]/30 rounded-xl px-3 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
          />
          <span className="text-xs text-secondary shrink-0">×</span>
        </div>
      )}
      <div className="flex items-center gap-3">
        <Clock className="w-4 h-4 text-[#9C4A2A] shrink-0" />
        <input
          type="number"
          min="0"
          step="0.5"
          value={tier.hours || ""}
          onChange={(e) => onHoursChange(parseFloat(e.target.value) || 0)}
          className="flex-1 h-10 bg-white border border-muted rounded-xl px-3 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
          placeholder="Jam lembur"
        />
        <span className="text-xs text-secondary shrink-0">jam</span>
      </div>
    </div>
  );
};

export const LemburForm: React.FC<LemburFormProps> = ({
  input,
  onSelectMode,
  onHourlyRateChange,
  onRegularHoursChange,
  onHourUnitChange,
  onMonthlySalaryChange,
  onFixedAllowanceChange,
  onEnableFixedAllowanceChange,
  onWorkScheduleChange,
  onDayTypeChange,
  onIndonesiaOvertimeHoursChange,
  onBonusChange,
  onEnableBonusChange,
  onTaxRateChange,
  onEnableTaxChange,
  onAddTier,
  onRemoveTier,
  onUpdateTierMultiplier,
  onUpdateTierHours,
  onUpdateTierCustomRate,
  onReset,
}) => {
  const isIndonesia = input.mode === "indonesia";
  const maxDailyLimit =
    input.dayType === "regular" ? 4 : input.workSchedule === 5 ? 12 : 11;

  return (
    <Card
      variant="default"
      className="flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#9C4A2A]" />
            Pengaturan Lembur
          </h2>
          <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
            Masukkan tarif dan jam kerja untuk menghitung penghasilan lembur.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-secondary hover:text-[#9C4A2A] font-bold transition-colors bg-surface px-3 py-2 rounded-xl"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* Mode toggle */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider">
            Mode Perhitungan
          </label>
          <div className="grid grid-cols-2 gap-3 bg-surface p-1.5 rounded-2xl border border-muted/50">
            <button
              type="button"
              onClick={() =>
                typeof onSelectMode === "function" && onSelectMode("global")
              }
              className={cn(
                "px-4 py-3 rounded-xl transition-all text-sm font-bold font-ui flex items-center justify-center gap-2",
                !isIndonesia
                  ? "bg-white text-[#9C4A2A] shadow-sm"
                  : "text-secondary hover:text-primary",
              )}
            >
              <Globe className="w-4 h-4" /> Global / Umum
            </button>
            <button
              type="button"
              onClick={() =>
                typeof onSelectMode === "function" && onSelectMode("indonesia")
              }
              className={cn(
                "px-4 py-3 rounded-xl transition-all text-sm font-bold font-ui flex items-center justify-center gap-2",
                isIndonesia
                  ? "bg-[#9C4A2A] text-white shadow-sm"
                  : "text-secondary hover:text-primary",
              )}
            >
              <Flag className="w-4 h-4" /> 🇮🇩 Indonesia
            </button>
          </div>
          {isIndonesia && (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0EB] border border-[#9C4A2A]/20 rounded-xl">
              <span className="text-xs font-bold text-[#9C4A2A]">
                🇮🇩 Sesuai PP No. 35 Tahun 2021
              </span>
            </div>
          )}
        </div>

        {/* ── INDONESIA MODE ─────────────────────────────────────────────── */}
        {isIndonesia ? (
          <>
            {/* Gaji bulanan */}
            <div className="flex flex-col gap-4 p-6 bg-surface/50 rounded-3xl border border-muted/50">
              <CurrencyInput
                label="Gaji Pokok Bulanan"
                value={input.monthlySalary.toString()}
                onChange={(v) => onMonthlySalaryChange(parseInt(v) || 0)}
                placeholder="5.000.000"
                desc="Gaji pokok tanpa tunjangan (digunakan sebagai dasar 1/173)"
              />
              <Toggle
                checked={input.enableFixedAllowance}
                onChange={onEnableFixedAllowanceChange}
                label="+ Tunjangan Tetap"
              />
              {input.enableFixedAllowance && (
                <CurrencyInput
                  label="Tunjangan Tetap"
                  value={input.fixedAllowance.toString()}
                  onChange={(v) => onFixedAllowanceChange(parseInt(v) || 0)}
                  placeholder="500.000"
                  desc="Tunjangan tetap yang masuk dalam komponen upah"
                />
              )}
            </div>

            {/* Jadwal kerja */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider">
                Jadwal Kerja
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([5, 6] as const).map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => onWorkScheduleChange(days)}
                    className={cn(
                      "px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all",
                      input.workSchedule === days
                        ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A]"
                        : "border-muted text-secondary hover:border-[#9C4A2A]/30",
                    )}
                  >
                    {days} Hari/Minggu
                  </button>
                ))}
              </div>
            </div>

            {/* Jenis hari */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider">
                Jenis Hari Lembur
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "regular", label: "Hari Kerja Biasa" },
                    { value: "holiday", label: "Hari Libur / Istirahat" },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onDayTypeChange(opt.value)}
                    className={cn(
                      "px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all text-left",
                      input.dayType === opt.value
                        ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A]"
                        : "border-muted text-secondary hover:border-[#9C4A2A]/30",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {/* Quick preview of applicable rule */}
              <div className="text-xs text-secondary bg-surface px-4 py-3 rounded-xl border border-muted leading-relaxed">
                {input.dayType === "regular" ? (
                  <>
                    Jam ke-1: <strong>1.5×</strong> · Jam ke-2+:{" "}
                    <strong>2×</strong>
                  </>
                ) : input.workSchedule === 5 ? (
                  <>
                    Jam 1–8: <strong>2×</strong> · Jam 9: <strong>3×</strong> ·
                    Jam 10–12: <strong>4×</strong>
                  </>
                ) : (
                  <>
                    Jam 1–7: <strong>2×</strong> · Jam 8: <strong>3×</strong> ·
                    Jam 9–11: <strong>4×</strong>
                  </>
                )}
              </div>
            </div>

            {/* Jam lembur */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex justify-between items-center">
                <span>Jam Lembur</span>
                <span
                  className={cn(
                    "text-[10px] px-2 py-1 rounded-full font-bold",
                    input.indonesiaOvertimeHours > maxDailyLimit
                      ? "bg-red-50 text-red-500"
                      : "bg-[#FFF0EB] text-[#9C4A2A]",
                  )}
                >
                  Maks. {maxDailyLimit} jam/hari
                </span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max={maxDailyLimit}
                  step="0.5"
                  value={input.indonesiaOvertimeHours || ""}
                  onChange={(e) =>
                    onIndonesiaOvertimeHoursChange(
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className={cn(
                    "flex-1 h-12 bg-white border rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 outline-none transition-colors",
                    input.indonesiaOvertimeHours > maxDailyLimit
                      ? "border-red-400 focus:ring-red-500/20"
                      : "border-muted focus:ring-[#9C4A2A]/20",
                  )}
                  placeholder="2"
                />
                <span className="text-sm text-secondary font-bold shrink-0">
                  jam
                </span>
              </div>
              {input.indonesiaOvertimeHours > maxDailyLimit && (
                <p className="text-xs text-red-500 font-bold">
                  ⚠ Melebihi batas {maxDailyLimit} jam/hari sesuai PP No. 35
                  Tahun 2021.
                </p>
              )}
            </div>
          </>
        ) : (
          /* ── GLOBAL MODE ──────────────────────────────────────────────── */
          <>
            {/* Tarif per jam */}
            <div className="flex flex-col gap-4 p-6 bg-surface/50 rounded-3xl border border-muted/50">
              <CurrencyInput
                label="Tarif Per Jam"
                value={input.hourlyRate.toString()}
                onChange={(v) => onHourlyRateChange(parseInt(v) || 0)}
                placeholder="50.000"
                desc="Upah yang diterima per satu jam kerja reguler"
              />
            </div>

            {/* Jam reguler */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider">
                  Jam Reguler
                </label>
                <div className="flex gap-1 bg-surface p-1 rounded-xl border border-muted/50">
                  {(["weekly", "daily"] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => onHourUnitChange(unit)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                        input.hourUnit === unit
                          ? "bg-white text-[#9C4A2A] shadow-sm"
                          : "text-secondary hover:text-primary",
                      )}
                    >
                      {unit === "weekly" ? "Per Minggu" : "Per Hari"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={input.regularHours || ""}
                  onChange={(e) =>
                    onRegularHoursChange(parseFloat(e.target.value) || 0)
                  }
                  className="flex-1 h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
                  placeholder={input.hourUnit === "weekly" ? "40" : "8"}
                />
                <span className="text-sm text-secondary font-bold shrink-0">
                  jam/{input.hourUnit === "weekly" ? "minggu" : "hari"}
                </span>
              </div>
            </div>

            {/* Overtime tiers */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold font-ui text-primary uppercase tracking-wider">
                  Jam Lembur
                </label>
                <button
                  type="button"
                  onClick={onAddTier}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#9C4A2A] hover:text-[#7A3A1A] transition-colors bg-[#FFF0EB] px-3 py-1.5 rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Tambah Tier
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {input.overtimeTiers.map((tier) => (
                  <TierRow
                    key={tier.id}
                    tier={tier}
                    canRemove={input.overtimeTiers.length > 1}
                    onRemove={() => onRemoveTier(tier.id)}
                    onMultiplierChange={(m, c) =>
                      onUpdateTierMultiplier(tier.id, m, c)
                    }
                    onHoursChange={(h) => onUpdateTierHours(tier.id, h)}
                    onCustomRateChange={(r) =>
                      onUpdateTierCustomRate(tier.id, r)
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── SHARED: Bonus & Tax ────────────────────────────────────────── */}
        <div className="flex flex-col gap-5 pt-4 border-t border-muted/50">
          <div className="flex flex-col gap-3">
            <Toggle
              checked={input.enableBonus}
              onChange={onEnableBonusChange}
              label={
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4" /> Bonus
                </span>
              }
            />
            {input.enableBonus && (
              <CurrencyInput
                label="Jumlah Bonus"
                value={input.bonus.toString()}
                onChange={(v) => onBonusChange(parseInt(v) || 0)}
                placeholder="500.000"
              />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Toggle
              checked={input.enableTax}
              onChange={onEnableTaxChange}
              label={
                <span className="flex items-center gap-1.5">
                  <Percent className="w-4 h-4" /> Estimasi Pajak
                </span>
              }
            />
            {input.enableTax && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.5"
                  value={input.taxRate || ""}
                  onChange={(e) =>
                    onTaxRateChange(parseFloat(e.target.value) || 0)
                  }
                  className="w-32 h-12 bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
                />
                <span className="text-sm text-secondary font-bold">%</span>
                <span className="text-xs text-secondary">dari Gaji Kotor</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
