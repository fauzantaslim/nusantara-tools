"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { Button } from "@/ui/Button";
import { PernikahanInput, WeddingCategory } from "../types";
import { cn } from "@/lib/utils";
import {
  Settings,
  Plus,
  Trash2,
  RefreshCw,
  ArrowRight,
  Users,
  AlertTriangle,
  DollarSign,
  Percent,
} from "lucide-react";

interface PernikahanFormProps {
  input: PernikahanInput;
  onUpdate: <K extends keyof Omit<PernikahanInput, "categories">>(
    key: K,
    value: PernikahanInput[K],
  ) => void;
  onUpdateCategory: (id: string, updates: Partial<WeddingCategory>) => void;
  onAddCategory: () => void;
  onRemoveCategory: (id: string) => void;
  onCalculate: (e?: React.FormEvent) => void;
  onReset: () => void;
}

const percentageTotal = (
  cats: WeddingCategory[],
  totalBudget: number,
): number =>
  cats.reduce((sum, c) => {
    if (c.inputMode === "percentage") return sum + c.percentage;
    if (totalBudget > 0) return sum + (c.amount / totalBudget) * 100;
    return sum;
  }, 0);

const computeAmount = (cat: WeddingCategory, totalBudget: number): number => {
  if (cat.inputMode === "percentage") {
    return (cat.percentage / 100) * Math.max(0, totalBudget);
  }
  return Math.max(0, cat.amount);
};

const formatIDRCompact = (val: number): string => {
  if (val >= 1_000_000_000)
    return `Rp ${(val / 1_000_000_000).toFixed(1).replace(".", ",")} M`;
  if (val >= 1_000_000)
    return `Rp ${(val / 1_000_000).toFixed(1).replace(".", ",")} jt`;
  if (val >= 1_000) return `Rp ${(val / 1_000).toFixed(0)} rb`;
  return `Rp ${val.toFixed(0)}`;
};

// Each row ≈ 52px. Show 5 rows visible, then scroll.
const VISIBLE_ROWS = 5;
const ROW_HEIGHT_PX = 52;

export const PernikahanForm: React.FC<PernikahanFormProps> = ({
  input,
  onUpdate,
  onUpdateCategory,
  onAddCategory,
  onRemoveCategory,
  onCalculate,
  onReset,
}) => {
  const pctTotal = percentageTotal(input.categories, input.totalBudget);
  const isOverPct = pctTotal > 100.1; // Small buffer for float precision
  const isUnderPct = pctTotal < 99.9 && pctTotal > 0;
  const isExactPct = pctTotal >= 99.9 && pctTotal <= 100.1;

  const warnings: string[] = [];
  if (input.totalBudget <= 0)
    warnings.push("Total anggaran harus lebih dari 0.");
  if (input.guestCount <= 0) warnings.push("Jumlah tamu harus lebih dari 0.");
  if (isOverPct)
    warnings.push(
      `Total alokasi melebihi 100% (saat ini ${pctTotal.toFixed(1)}%).`,
    );

  const scrollMaxHeight = VISIBLE_ROWS * ROW_HEIGHT_PX + 8;

  return (
    <Card
      variant="default"
      className="flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      {/* Decorative blur */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#9C4A2A]" />
            Rencanakan Anggaran
          </h2>
          <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
            Atur total budget, jumlah tamu, dan alokasi setiap kategori.
          </p>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="relative z-10 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-bold font-body flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <ul className="list-disc pl-2 space-y-1">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={onCalculate}
        className="flex flex-col gap-8 relative z-10 h-full"
      >
        {/* ── Core Inputs ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#C17A3A]" /> Anggaran Dasar
          </h3>
          <CurrencyInput
            label="Total Anggaran Pernikahan"
            value={input.totalBudget.toString()}
            onChange={(v) => onUpdate("totalBudget", parseInt(v) || 0)}
            placeholder="100.000.000"
            desc="Total dana yang direncanakan untuk keseluruhan pernikahan."
          />
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-secondary flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Jumlah Tamu (orang)
            </label>
            <input
              type="number"
              min="1"
              value={input.guestCount || ""}
              onChange={(e) =>
                onUpdate("guestCount", parseInt(e.target.value) || 0)
              }
              className="w-full h-12 bg-surface/50 border border-muted rounded-xl px-4 text-sm font-bold text-primary focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
              placeholder="200"
            />
          </div>
        </div>

        {/* ── Categories ───────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Section header */}
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-ui text-primary uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-4 h-4 text-[#C17A3A]" /> Kategori Anggaran
            </h3>
            <span
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-full tabular-nums",
                isOverPct
                  ? "bg-red-100 text-red-700"
                  : isUnderPct
                    ? "bg-amber-100 text-amber-700"
                    : isExactPct
                      ? "bg-[#E8F5E9] text-[#4A7C59]"
                      : "bg-surface text-secondary",
              )}
            >
              {pctTotal.toFixed(0)}% teralokasi
            </span>
          </div>

          {/* Column labels */}
          <div className="grid grid-cols-[1fr_32px_84px_88px] gap-2 px-3 text-[10px] font-bold text-secondary uppercase tracking-wider">
            <span>Kategori</span>
            <span className="text-center">Mode</span>
            <span className="text-right">Nilai</span>
            <span className="text-right pr-7">Estimasi</span>
          </div>

          {/* Scrollable list — 5 rows max */}
          <div
            className="overflow-y-auto flex flex-col gap-1.5 pr-0.5"
            style={{ maxHeight: `${scrollMaxHeight}px` }}
          >
            {input.categories.map((cat) => {
              const computed = computeAmount(cat, input.totalBudget);
              const computedPct =
                input.totalBudget > 0
                  ? (cat.amount / input.totalBudget) * 100
                  : 0;

              return (
                <div
                  key={cat.id}
                  className="grid grid-cols-[1fr_32px_84px_88px] gap-2 items-center bg-surface/40 border border-muted rounded-2xl px-3 group hover:border-[#9C4A2A]/30 transition-all"
                  style={{ height: `${ROW_HEIGHT_PX - 4}px` }}
                >
                  {/* Name */}
                  <input
                    type="text"
                    value={cat.name}
                    onChange={(e) =>
                      onUpdateCategory(cat.id, { name: e.target.value })
                    }
                    className="min-w-0 text-xs font-bold text-primary bg-transparent border-none outline-none placeholder-secondary/50 truncate"
                  />

                  {/* Mode toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      const nextMode =
                        cat.inputMode === "percentage"
                          ? "amount"
                          : "percentage";
                      const updates: Partial<WeddingCategory> = {
                        inputMode: nextMode,
                      };

                      if (nextMode === "amount") {
                        // From % to Rp
                        updates.amount =
                          (cat.percentage / 100) * input.totalBudget;
                      } else {
                        // From Rp to %
                        updates.percentage =
                          input.totalBudget > 0
                            ? (cat.amount / input.totalBudget) * 100
                            : 0;
                      }

                      onUpdateCategory(cat.id, updates);
                    }}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all shrink-0",
                      cat.inputMode === "percentage"
                        ? "bg-[#9C4A2A]/10 text-[#9C4A2A]"
                        : "bg-[#C17A3A]/10 text-[#C17A3A]",
                    )}
                  >
                    {cat.inputMode === "percentage" ? "%" : "Rp"}
                  </button>

                  {/* Value input */}
                  {cat.inputMode === "percentage" ? (
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={cat.percentage || ""}
                        onChange={(e) =>
                          onUpdateCategory(cat.id, {
                            percentage: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full h-8 bg-white border border-muted rounded-xl px-2 pr-5 text-xs font-bold text-primary text-right focus:ring-2 focus:ring-[#9C4A2A]/20 outline-none"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-secondary font-bold pointer-events-none">
                        %
                      </span>
                    </div>
                  ) : (
                    <CurrencyInput
                      variant="mini"
                      value={cat.amount.toString()}
                      onChange={(v) =>
                        onUpdateCategory(cat.id, {
                          amount: parseInt(v) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full"
                    />
                  )}

                  {/* Computed amount + delete */}
                  <div className="flex items-center justify-end gap-1">
                    <span
                      className={cn(
                        "text-[11px] font-bold tabular-nums text-right leading-tight",
                        (
                          cat.inputMode === "percentage"
                            ? computed > 0
                            : cat.amount > 0
                        )
                          ? "text-[#9C4A2A]"
                          : "text-secondary/30",
                      )}
                    >
                      {cat.inputMode === "percentage"
                        ? computed > 0
                          ? formatIDRCompact(computed)
                          : "—"
                        : computedPct > 0
                          ? `${computedPct.toFixed(1)}%`
                          : "—"}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveCategory(cat.id)}
                      className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-secondary hover:text-red-600 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          {input.categories.length > VISIBLE_ROWS && (
            <p className="text-center text-[10px] text-secondary/60 font-body">
              ↕ Scroll untuk {input.categories.length - VISIBLE_ROWS} kategori
              lainnya
            </p>
          )}

          {/* Add category button */}
          <button
            type="button"
            onClick={onAddCategory}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl border border-dashed border-[#C17A3A]/40 text-[#C17A3A] hover:border-[#C17A3A] hover:bg-[#FFF3E0]/50 transition-all text-sm font-bold font-ui"
          >
            <Plus className="w-4 h-4" />
            Tambah Kategori
          </button>
        </div>

        {/* Action Buttons */}
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
            Hitung Anggaran
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
