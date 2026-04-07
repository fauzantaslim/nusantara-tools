"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { cn } from "@/lib/utils";
import {
  AssetType,
  AssetGroup,
  DepreciationMethod,
  AssetGroupDetail,
} from "../utils";
import {
  Settings,
  Building2,
  Box,
  FileText,
  ArrowRight,
  RefreshCw,
  Calendar,
} from "lucide-react";
import { Button } from "@/ui/Button";

interface DepresiasiFormProps {
  assetType: AssetType;
  setAssetType: (t: AssetType) => void;
  assetGroup: AssetGroup;
  setAssetGroup: (g: AssetGroup) => void;
  method: DepreciationMethod;
  setMethod: (m: DepreciationMethod) => void;
  cost: string;
  setCost: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  error: string;
  availableGroups: AssetGroupDetail[];
  isBuilding: boolean;
  selectedGroupDetail: AssetGroupDetail | undefined;
  onCalculate: (e: React.FormEvent) => void;
  onReset: () => void;
}

export function DepresiasiForm({
  assetType,
  setAssetType,
  assetGroup,
  setAssetGroup,
  method,
  setMethod,
  cost,
  setCost,
  startDate,
  setStartDate,
  error,
  availableGroups,
  isBuilding,
  selectedGroupDetail,
  onCalculate,
  onReset,
}: DepresiasiFormProps) {
  return (
    <Card
      variant="default"
      className="flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-[#9C4A2A]/[0.02] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFF0EB] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#9C4A2A]" /> Konfigurasi Aset
        </h2>
        <p className="text-sm text-secondary font-body mt-2">
          Masukkan jenis aset, kelompok harta, dan metode penyusutan.
        </p>
      </div>

      <form
        onSubmit={onCalculate}
        className="flex flex-col gap-6 relative z-10 h-full mt-2"
      >
        {/* Asset Type */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
            Jenis Harta
          </label>
          <div className="flex gap-2">
            {[
              {
                value: "tangible" as AssetType,
                label: "Harta Berwujud",
                icon: Box,
              },
              {
                value: "intangible" as AssetType,
                label: "Harta Tak Berwujud",
                icon: FileText,
              },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAssetType(opt.value)}
                className={cn(
                  "flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all font-ui flex items-center justify-center gap-2",
                  assetType === opt.value
                    ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A] shadow-sm"
                    : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
                )}
              >
                <opt.icon className="w-4 h-4" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Asset Group */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
            Kelompok Harta
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableGroups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setAssetGroup(g.id)}
                className={cn(
                  "py-3 px-3 text-sm font-bold rounded-xl border-2 transition-all font-ui flex flex-col items-center gap-1",
                  assetGroup === g.id
                    ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A] shadow-sm"
                    : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
                )}
              >
                <span className="text-xs font-bold">{g.label}</span>
                <span className="text-[10px] opacity-70">
                  {g.usefulLife} tahun
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Group Summary */}
        {selectedGroupDetail && (
          <div className="bg-surface/50 rounded-2xl p-4 border border-muted/50">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[#9C4A2A]" />
              <span className="text-xs font-bold font-ui text-primary uppercase tracking-wider">
                Detail Kelompok
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-[10px] font-ui text-secondary uppercase block">
                  Masa Manfaat
                </span>
                <span className="text-sm font-black text-primary">
                  {selectedGroupDetail.usefulLife} thn
                </span>
              </div>
              <div>
                <span className="text-[10px] font-ui text-secondary uppercase block">
                  Garis Lurus
                </span>
                <span className="text-sm font-black text-primary">
                  {selectedGroupDetail.straightLineRate}%
                </span>
              </div>
              <div>
                <span className="text-[10px] font-ui text-secondary uppercase block">
                  Saldo Menurun
                </span>
                <span className="text-sm font-black text-primary">
                  {selectedGroupDetail.decliningBalanceRate
                    ? `${selectedGroupDetail.decliningBalanceRate}%`
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Method */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
            Metode Penyusutan
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMethod("straight_line")}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all font-ui",
                method === "straight_line"
                  ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A] shadow-sm"
                  : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
              )}
            >
              Garis Lurus
            </button>
            <button
              type="button"
              onClick={() => !isBuilding && setMethod("declining_balance")}
              disabled={isBuilding}
              className={cn(
                "flex-1 py-3 text-sm font-bold rounded-xl border-2 transition-all font-ui",
                isBuilding && "opacity-40 cursor-not-allowed",
                method === "declining_balance" && !isBuilding
                  ? "border-[#9C4A2A] bg-[#FFF0EB] text-[#9C4A2A] shadow-sm"
                  : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
              )}
            >
              Saldo Menurun
            </button>
          </div>
          {isBuilding && (
            <p className="text-[10px] text-[#9C4A2A] font-body mt-1 italic">
              * Bangunan hanya dapat menggunakan metode Garis Lurus.
            </p>
          )}
        </div>

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Cost Input */}
        <CurrencyInput
          label="Nilai Perolehan Aset"
          placeholder="0"
          value={cost}
          onChange={setCost}
          desc="Harga beli, pendirian, penambahan, atau biaya perbaikan harta berwujud."
          error={error}
        />

        <div className="h-px bg-muted/60 w-full my-1" />

        {/* Date Input */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="tanggal-perolehan"
            className="text-xs font-bold font-ui text-secondary uppercase tracking-wider"
          >
            Tanggal Perolehan
          </label>
          <div className="relative flex items-center border-2 rounded-xl h-14 overflow-hidden transition-all shadow-sm bg-white border-muted focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20">
            <span className="pl-4 pr-2 pointer-events-none select-none">
              <Calendar className="w-5 h-5 text-secondary opacity-60" />
            </span>
            <input
              id="tanggal-perolehan"
              type="month"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 h-full bg-transparent pr-4 text-base font-bold text-primary outline-none font-heading"
            />
          </div>
          <span className="text-[11px] font-body text-secondary mt-1 opacity-80">
            Bulan dan tahun mulai berlakunya penyusutan sesuai PMK No.72/2023.
          </span>
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
            variant="primary"
            className="py-4 text-base flex-1 rounded-2xl !bg-[#9C4A2A] hover:!bg-[#7A3A1E] text-[#FFF8F0] outline-none ring-0 border-b-4 border-[#7A5C42] hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] shadow-sm transition-all group font-ui"
          >
            Hitung Penyusutan
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
