"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Mars, Venus, ShieldAlert, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalorieContextType, ActivityLevel, BMRFormula } from "../types";
import {
  SYSTEM,
  GENDER,
  CALORIE_GOAL,
  CALORIE_FORMULA,
  ACTIVITY_LEVEL,
} from "@/lib/constants";

export const CalorieForm: React.FC<{ hook: CalorieContextType }> = ({
  hook,
}) => {
  const { data, updateData, error, handleCalculate } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary">
          Data & Tujuan
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Masukkan metrik tubuh untuk estimasi energi akurat.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10 h-full"
      >
        <div className="space-y-6">
          {/* System Toggle */}
          <div className="bg-surface p-1.5 rounded-xl flex items-center max-w-sm">
            <button
              type="button"
              onClick={() => updateData("system", SYSTEM.METRIC)}
              className={cn(
                "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                data.system === SYSTEM.METRIC
                  ? "bg-white text-primary shadow-sm"
                  : "text-secondary hover:text-primary",
              )}
            >
              Metrik (kg, cm)
            </button>
            <button
              type="button"
              onClick={() => updateData("system", SYSTEM.IMPERIAL)}
              className={cn(
                "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                data.system === SYSTEM.IMPERIAL
                  ? "bg-white text-primary shadow-sm"
                  : "text-secondary hover:text-primary",
              )}
            >
              Imperial (lb, ft)
            </button>
          </div>

          {/* Gender & Age */}
          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <button
                type="button"
                onClick={() => updateData("gender", GENDER.MALE)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                  data.gender === GENDER.MALE
                    ? "border-accent-1 bg-accent-1/5 text-accent-1"
                    : "border-muted bg-white text-secondary hover:border-secondary/30",
                )}
              >
                <Mars className="w-6 h-6 mb-1" />
                <span className="font-bold font-ui text-xs">Pria</span>
              </button>
              <button
                type="button"
                onClick={() => updateData("gender", GENDER.FEMALE)}
                className={cn(
                  "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                  data.gender === GENDER.FEMALE
                    ? "border-accent-1 bg-accent-1/5 text-accent-1"
                    : "border-muted bg-white text-secondary hover:border-secondary/30",
                )}
              >
                <Venus className="w-6 h-6 mb-1" />
                <span className="font-bold font-ui text-xs">Wanita</span>
              </button>
            </div>
            <div className="flex-1">
              <Input
                id="age"
                label="Usia"
                type="number"
                placeholder="25"
                value={data.age}
                onChange={(e) => updateData("age", e.target.value)}
                className="h-[76px] placeholder:opacity-40 rounded-xl mt-0"
                required
                min={2}
                max={120}
              />
            </div>
          </div>

          {/* Weight & Height */}
          <div className="flex gap-4">
            <Input
              id="weight"
              label="Berat Badan"
              type="number"
              placeholder={data.system === SYSTEM.METRIC ? "65" : "145"}
              suffix={data.system === SYSTEM.METRIC ? "kg" : "lb"}
              value={data.weight}
              onChange={(e) => updateData("weight", e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl w-full"
              required
              min={10}
              max={500}
            />

            {data.system === SYSTEM.METRIC ? (
              <Input
                id="height1"
                label="Tinggi Badan"
                type="number"
                placeholder="170"
                suffix="cm"
                value={data.heightRaw1}
                onChange={(e) => updateData("heightRaw1", e.target.value)}
                className="py-3 placeholder:opacity-40 rounded-xl w-full"
                required
                min={20}
                max={300}
              />
            ) : (
              <div className="flex gap-2 w-full">
                <Input
                  id="height1"
                  label="Kaki"
                  type="number"
                  placeholder="5"
                  value={data.heightRaw1}
                  onChange={(e) => updateData("heightRaw1", e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl w-full"
                  required
                  min={1}
                  max={9}
                />
                <Input
                  id="height2"
                  label="Inci"
                  type="number"
                  placeholder="7"
                  value={data.heightRaw2}
                  onChange={(e) => updateData("heightRaw2", e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl w-full"
                  required
                  min={0}
                  max={11}
                />
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold font-ui text-primary">
              Tingkat Aktivitas
            </label>
            <div className="relative">
              <select
                value={data.activityLevel}
                onChange={(e) =>
                  updateData("activityLevel", e.target.value as ActivityLevel)
                }
                className="w-full flex h-12 rounded-xl border bg-white px-4 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none shadow-sm"
              >
                <option value={ACTIVITY_LEVEL.SEDENTARY}>
                  Jarang Berolahraga (Sedentary)
                </option>
                <option value={ACTIVITY_LEVEL.LIGHT}>
                  Aktivitas Ringan (1-3 hari/minggu)
                </option>
                <option value={ACTIVITY_LEVEL.MODERATE}>
                  Aktivitas Sedang (3-5 hari/minggu)
                </option>
                <option value={ACTIVITY_LEVEL.ACTIVE}>
                  Aktivitas Tinggi (6-7 hari/minggu)
                </option>
                <option value={ACTIVITY_LEVEL.VERY_ACTIVE}>
                  Aktivitas Ekstra (Atlet / Fisik Berat)
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="h-4 w-4 text-secondary opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Goal Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold font-ui text-primary">
              Target Fisik
            </label>
            <div className="grid grid-cols-3 gap-2 bg-surface p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => updateData("goal", CALORIE_GOAL.LOSE)}
                className={cn(
                  "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
                  data.goal === CALORIE_GOAL.LOSE
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary",
                )}
              >
                Turunkan
              </button>
              <button
                type="button"
                onClick={() => updateData("goal", CALORIE_GOAL.MAINTAIN)}
                className={cn(
                  "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
                  data.goal === CALORIE_GOAL.MAINTAIN
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary",
                )}
              >
                Pertahankan
              </button>
              <button
                type="button"
                onClick={() => updateData("goal", CALORIE_GOAL.GAIN)}
                className={cn(
                  "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
                  data.goal === CALORIE_GOAL.GAIN
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary",
                )}
              >
                Tingkatkan
              </button>
            </div>
          </div>

          {/* Target Rate */}
          {data.goal !== CALORIE_GOAL.MAINTAIN && (
            <div className="flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in duration-300">
              <label className="text-sm font-bold font-ui text-primary line-clamp-1">
                Target{" "}
                {data.goal === CALORIE_GOAL.LOSE ? "Penurunan" : "Peningkatan"}{" "}
                / Minggu
              </label>
              <div className="relative">
                <select
                  value={data.weightChangeRate}
                  onChange={(e) =>
                    updateData("weightChangeRate", parseFloat(e.target.value))
                  }
                  className="w-full flex h-12 rounded-xl border bg-white px-4 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none shadow-sm"
                >
                  <option value={0.25}>0.25 kg / minggu (Ringan)</option>
                  <option value={0.5}>0.5 kg / minggu (Normal)</option>
                  <option value={0.75}>0.75 kg / minggu (Lebih Cepat)</option>
                  <option value={1}>1 kg / minggu (Ekstrem)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg
                    className="h-4 w-4 text-secondary opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-surface p-4 text-primary font-bold focus:ring-2 focus:ring-accent-1">
              <h3 className="text-sm font-medium">
                Pengaturan Lanjutan (Opsional)
              </h3>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <div className="mt-4 px-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">
                  Rumus BMR
                </label>
                <select
                  value={data.formula}
                  onChange={(e) =>
                    updateData("formula", e.target.value as BMRFormula)
                  }
                  className="w-full flex h-11 rounded-lg border bg-white px-3 text-sm transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui appearance-none"
                >
                  <option value={CALORIE_FORMULA.MIFFLIN}>
                    Mifflin-St Jeor (Akurat & Default)
                  </option>
                  <option value={CALORIE_FORMULA.HARRIS}>
                    Harris-Benedict (Klasik)
                  </option>
                  <option value={CALORIE_FORMULA.KATCH}>
                    Katch-McArdle (Perlu Lemak Tubuh)
                  </option>
                </select>
              </div>
              <Input
                id="bodyfat"
                label="Persentase Lemak Tubuh"
                type="number"
                placeholder="Misal: 15"
                suffix="%"
                value={data.bodyFat}
                onChange={(e) => updateData("bodyFat", e.target.value)}
                className="text-sm py-2 placeholder:opacity-40 rounded-lg"
                min={1}
                max={80}
              />
            </div>
          </details>

          {error && (
            <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="py-5 text-lg mt-auto shadow-lg hover:shadow-xl group rounded-2xl w-full"
        >
          Hitung Kalori
          <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
        </Button>
      </form>
    </Card>
  );
};
