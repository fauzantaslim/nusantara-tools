"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { Button } from "@/ui/Button";
import { CicilanInput, VehicleType } from "../types";
import { DP_GUIDANCE } from "../utils";
import { cn } from "@/lib/utils";
import {
  Car,
  Bike,
  RefreshCw,
  ArrowRight,
  Calculator,
  Info,
  AlertCircle,
} from "lucide-react";

interface CicilanFormProps {
  input: CicilanInput;
  onChange: <K extends keyof CicilanInput>(
    key: K,
    value: CicilanInput[K],
  ) => void;
  onCalculate: (e?: React.FormEvent) => void;
  onReset: () => void;
  errors: string[];
}

const VEHICLE_TABS: {
  label: string;
  value: VehicleType;
  icon: React.ReactNode;
}[] = [
  { label: "Mobil", value: "mobil", icon: <Car className="w-4 h-4" /> },
  { label: "Motor", value: "motor", icon: <Bike className="w-4 h-4" /> },
];

const TENOR_OPTIONS = [12, 24, 36, 48, 60, 72, 84, 96];

export const CicilanForm: React.FC<CicilanFormProps> = ({
  input,
  onChange,
  onCalculate,
  onReset,
  errors,
}) => {
  const dpGuidance = DP_GUIDANCE[input.vehicleType];
  const uangMukaValue = (input.uangMukaPercent / 100) * input.hargaKendaraan;
  const jumlahPinjaman = input.hargaKendaraan - uangMukaValue;

  return (
    <Card
      variant="default"
      className="flex flex-col gap-6 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
            <Calculator className="w-6 h-6 text-[#9C4A2A]" />
            Simulasi Cicilan
          </h2>
          <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
            Hitung estimasi cicilan bulanan kendaraan Anda.
          </p>
        </div>
      </div>

      {/* Vehicle Type Toggle */}
      <div className="relative z-10 flex flex-col gap-2">
        <label className="text-xs font-bold text-secondary uppercase tracking-wider">
          Jenis Kendaraan
        </label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-surface/60 rounded-2xl border border-muted">
          {VEHICLE_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange("vehicleType", tab.value)}
              className={cn(
                "flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-sm transition-all duration-200",
                input.vehicleType === tab.value
                  ? "bg-[#9C4A2A] text-white shadow-md"
                  : "text-secondary hover:text-primary hover:bg-white/60",
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* DP Guidance Chip */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#9C4A2A]/8 rounded-xl border border-[#9C4A2A]/20 mt-1">
          <Info className="w-3.5 h-3.5 text-[#9C4A2A] shrink-0" />
          <p className="text-xs text-[#9C4A2A] font-bold">{dpGuidance.label}</p>
        </div>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="relative z-10 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-body">
          <div className="flex items-center gap-2 mb-1 font-bold">
            <AlertCircle className="w-4 h-4" /> Periksa Input Anda
          </div>
          <ul className="list-disc pl-4 space-y-0.5">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={onCalculate}
        className="flex flex-col gap-5 relative z-10 h-full"
      >
        {/* Harga Kendaraan */}
        <CurrencyInput
          label="Harga Kendaraan (OTR)"
          value={input.hargaKendaraan.toString()}
          onChange={(v) => onChange("hargaKendaraan", parseInt(v) || 0)}
          placeholder="200.000.000"
          desc="Harga On The Road kendaraan yang ingin dibeli."
        />

        {/* DP */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">
              Uang Muka / DP
            </label>
            <span className="text-xs font-bold text-[#9C4A2A] bg-[#9C4A2A]/10 px-2 py-0.5 rounded-full">
              {input.uangMukaPercent}% ≈{" "}
              {new Intl.NumberFormat("id-ID", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(uangMukaValue)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={80}
            step={5}
            value={input.uangMukaPercent}
            onChange={(e) =>
              onChange("uangMukaPercent", parseFloat(e.target.value))
            }
            className="w-full accent-[#9C4A2A]"
          />
          <div className="flex justify-between text-[10px] text-secondary font-ui">
            <span>0%</span>
            <span
              className={cn(
                "font-bold",
                input.uangMukaPercent < dpGuidance.min
                  ? "text-red-500"
                  : "text-[#4A7C59]",
              )}
            >
              {input.vehicleType === "mobil" ? "Min 20%" : "Fleksibel"}
            </span>
            <span>80%</span>
          </div>
          {input.vehicleType === "mobil" && input.uangMukaPercent < 20 && (
            <p className="text-xs text-red-500 font-bold">
              ⚠ DP mobil minimal 20% sesuai aturan OJK.
            </p>
          )}
        </div>

        {/* Suku Bunga */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-secondary uppercase tracking-wider">
            Suku Bunga Tahunan (%)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              max="30"
              value={input.sukuBungaTahunan || ""}
              onChange={(e) =>
                onChange("sukuBungaTahunan", parseFloat(e.target.value) || 0)
              }
              required
              className="w-full h-12 bg-surface/50 border border-muted rounded-xl px-4 pr-10 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
              placeholder="6"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-bold text-sm">
              %
            </span>
          </div>
          <p className="text-[10px] text-secondary font-body">
            Rata-rata bunga leasing kendaraan di Indonesia berkisar 3–15% per
            tahun.
          </p>
        </div>

        {/* Tenor */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-secondary uppercase tracking-wider">
              Tenor / Jangka Waktu
            </label>
            <span className="text-xs font-bold text-[#9C4A2A] bg-[#9C4A2A]/10 px-2 py-0.5 rounded-full">
              {input.tenor} Bulan
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {TENOR_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange("tenor", t)}
                className={cn(
                  "py-2 rounded-xl text-xs font-bold transition-all border",
                  input.tenor === t
                    ? "bg-[#9C4A2A] text-white border-[#9C4A2A] shadow-sm"
                    : "bg-surface/50 text-secondary border-muted hover:border-[#9C4A2A]/30 hover:text-primary",
                )}
              >
                {t > 12 ? `${t / 12}th` : `${t}bl`}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-secondary font-body">
            Jumlah Pinjaman:{" "}
            <span className="font-bold text-primary">
              Rp {jumlahPinjaman.toLocaleString("id-ID")}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0 hover:border-secondary/30"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#9C4A2A] hover:!bg-[#7A3A20] text-white outline-none ring-0"
          >
            Hitung Cicilan
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
