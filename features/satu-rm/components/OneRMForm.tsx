"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { ArrowRight, ShieldAlert, Dumbbell, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { OneRMContextType, FormulaType, FORMULA_INFO } from "../types";

export const OneRMForm: React.FC<{ hook: OneRMContextType }> = ({ hook }) => {
  const {
    data,
    updateData,
    error,
    handleCalculate,
    handleReset,
    handleFormulaChange,
  } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Dumbbell className="w-6 h-6 text-[#C17A3A]" />
          Data Latihan
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Masukkan beban dan repetisi dari set terakhir Anda.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10 h-full"
      >
        <div className="space-y-6">
          {/* Input Unit Toggle */}
          <SegmentedControl
            label="Satuan Beban Input"
            value={data.unit}
            onChange={(v) => updateData("unit", v)}
            options={[
              { value: "kg", label: "KG" },
              { value: "lbs", label: "LBS" },
            ]}
          />

          {/* Weight & Reps */}
          <div className="flex gap-4">
            <Input
              id="weight"
              label="Berat Diangkat"
              type="number"
              placeholder="100"
              suffix={data.unit}
              value={data.weight}
              onChange={(e) => updateData("weight", e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl"
              required
              min={1}
            />
            <Input
              id="reps"
              label="Repetisi"
              type="number"
              placeholder="5"
              suffix="reps"
              value={data.reps}
              onChange={(e) => updateData("reps", e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl"
              required
              min={1}
              max={10}
            />
          </div>

          {/* Output Unit Toggle */}
          <SegmentedControl
            label="Satuan Output Hasil"
            value={data.outputUnit}
            onChange={(v) => updateData("outputUnit", v)}
            options={[
              { value: "kg", label: "KG" },
              { value: "lbs", label: "LBS" },
            ]}
          />

          {/* Formula Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold font-ui text-primary">
              Rumus Perhitungan
            </label>
            <div className="flex flex-col gap-2">
              {(Object.keys(FORMULA_INFO) as FormulaType[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleFormulaChange(f)}
                  className={cn(
                    "flex items-center gap-4 p-3.5 rounded-xl border-2 text-left transition-all",
                    data.formula === f
                      ? "border-[#C17A3A] bg-[#C17A3A]/8 text-[#C17A3A]"
                      : "border-muted bg-white text-secondary hover:border-secondary/30",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 font-mono",
                      data.formula === f
                        ? "bg-[#C17A3A]/15 text-[#C17A3A]"
                        : "bg-surface text-secondary",
                    )}
                  >
                    {f === "epley" ? "E" : f === "brzycki" ? "B" : "L"}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold font-ui text-primary truncate">
                      {FORMULA_INFO[f].label}
                    </div>
                    <div className="text-xs text-secondary opacity-80 truncate">
                      {FORMULA_INFO[f].best}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-auto">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#C17A3A] hover:!bg-[#a4622a] text-white outline-none ring-0"
          >
            Hitung 1RM
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
