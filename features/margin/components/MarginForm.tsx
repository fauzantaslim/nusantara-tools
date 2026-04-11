"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { Button } from "@/ui/Button";
import { MarginInput, MarginMode } from "../types";
import {
  Settings,
  TrendingUp,
  Sliders,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

interface MarginFormProps {
  input: MarginInput;
  onChange: <K extends keyof MarginInput>(
    key: K,
    value: MarginInput[K],
  ) => void;
  onModeChange: (mode: MarginMode) => void;
  onCalculate: (e?: React.FormEvent) => void;
  onReset: () => void;
}

export const MarginForm: React.FC<MarginFormProps> = ({
  input,
  onChange,
  onModeChange,
  onCalculate,
  onReset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Validation warnings
  const warnings = [];
  if (input.sellingPrice <= 0 && input.mode === "marginMarkup") {
    warnings.push(
      "Harga Jual harus lebih besar dari 0 untuk menghitung margin/markup.",
    );
  }
  if (
    input.desiredMargin >= 100 &&
    (input.mode === "sellingPrice" || input.mode === "costPrice")
  ) {
    warnings.push(
      "Margin tidak bisa 100% atau lebih karena akan menghasilkan harga jual tak terhingga atau biaya negatif.",
    );
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
            Parameter Kalkulasi
          </h2>
          <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
            Hitung metrik profitabilitas Anda atau tentukan target harga produk.
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

      {/* Select Control for Mode */}
      <div className="relative z-10 flex flex-col gap-2">
        <label className="text-xs font-bold text-secondary">
          Mode Kalkulasi Target
        </label>
        <div className="relative">
          <select
            value={input.mode}
            onChange={(e) => onModeChange(e.target.value as MarginMode)}
            className="w-full h-12 bg-surface/50 hover:bg-white border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none appearance-none cursor-pointer transition-colors"
          >
            <option value="marginMarkup">Margin & Markup</option>
            <option value="sellingPrice">Hitung Harga Jual</option>
            <option value="costPrice">Hitung Biaya</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary pointer-events-none" />
        </div>
      </div>

      <form
        onSubmit={onCalculate}
        className="flex flex-col gap-8 relative z-10 h-full"
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            {(input.mode === "marginMarkup" ||
              input.mode === "sellingPrice") && (
              <CurrencyInput
                label="Harga Biaya (Cost)"
                value={input.cost.toString()}
                onChange={(v) => onChange("cost", parseInt(v) || 0)}
                placeholder="100.000"
                desc="Total modal atau biaya pokok produksi produk."
              />
            )}

            {(input.mode === "marginMarkup" || input.mode === "costPrice") && (
              <CurrencyInput
                label="Harga Jual (Selling Price)"
                value={input.sellingPrice.toString()}
                onChange={(v) => onChange("sellingPrice", parseInt(v) || 0)}
                placeholder="150.000"
                desc="Harga akhir yang dibayar oleh pelanggan."
              />
            )}

            {(input.mode === "sellingPrice" || input.mode === "costPrice") && (
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-secondary">
                  Target Margin Keuntungan (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="99"
                    value={input.desiredMargin || ""}
                    onChange={(e) =>
                      onChange("desiredMargin", parseFloat(e.target.value) || 0)
                    }
                    required
                    className="w-full h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
                    placeholder="20"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary font-bold text-sm">
                    %
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bonus Feature: Quantity */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C17A3A]" /> Skenario Volume
            Bisnis
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-secondary">
                Kuantitas Penjualan (Unit)
              </label>
              <input
                type="number"
                min="1"
                value={input.quantity || ""}
                onChange={(e) =>
                  onChange("quantity", parseInt(e.target.value) || 1)
                }
                className="w-full h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        {/* Advanced Accordion */}
        <div className="pt-4 border-t border-muted">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full p-3 bg-surface/50 rounded-2xl border border-muted hover:border-[#9C4A2A]/30 transition-all font-bold text-sm text-primary"
          >
            <span className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#C17A3A]" />
              Pengaturan Lanjutan (Pajak & Desimal)
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
                    Pajak / PPN (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={input.taxRate || ""}
                    onChange={(e) =>
                      onChange("taxRate", parseFloat(e.target.value) || 0)
                    }
                    className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-secondary">
                    Fee Marketplace (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={input.marketplaceFee || ""}
                    onChange={(e) =>
                      onChange(
                        "marketplaceFee",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-secondary">
                  Presisi Desimal Hasil
                </label>
                <select
                  value={input.decimalPrecision}
                  onChange={(e) =>
                    onChange("decimalPrecision", parseInt(e.target.value) || 0)
                  }
                  className="h-10 bg-surface/50 border border-muted rounded-xl px-3 text-sm font-bold text-primary outline-none"
                >
                  <option value={0}>Tidak ada (Dibulatkan)</option>
                  <option value={1}>1 Desimal</option>
                  <option value={2}>2 Desimal</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-auto pt-4">
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
            disabled={warnings.length > 0}
            variant="primary"
            className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#9C4A2A] hover:!bg-[#7A3A20] text-white outline-none ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {input.mode === "marginMarkup"
              ? "Hitung Margin"
              : input.mode === "sellingPrice"
                ? "Hitung Harga Jual"
                : "Hitung Biaya"}
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
