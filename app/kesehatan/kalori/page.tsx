"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import {
  calculateCalories,
  CalorieResult,
  SystemType,
  GenderType,
  ActivityLevel,
  GoalType,
  BMRFormula,
  CalorieInput,
} from "@/features/kalori/utils";
import Image from "next/image";
import {
  ArrowRight,
  ShieldAlert,
  Activity,
  Info,
  Venus,
  Mars,
  Scale,
  Target,
  CheckCircle2,
  Flame,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";

const kaloriSchema = z.object({
  weight: z.coerce
    .number()
    .min(10, "Berat minimal 10 kg")
    .max(500, "Berat maksimal 500 kg"),
  heightRaw1: z.coerce
    .number()
    .min(20, "Tinggi minimal 20 cm")
    .max(300, "Tinggi maksimal 300 ft"),
  heightRaw2: z.coerce.number().optional().default(0),
  age: z.coerce
    .number()
    .min(2, "Umur minimal 2 tahun")
    .max(120, "Umur maksimal 120 tahun"),
  bodyFatPercentage: z.coerce
    .number()
    .min(1, "Persentase minimal 1%")
    .max(80, "Persentase maksimal 80%")
    .optional()
    .or(z.literal("")),
  weightChangeRate: z.coerce.number().optional(),
});

export default function CalorieCalculator() {
  const [system, setSystem] = useState<SystemType>("metric");
  const [gender, setGender] = useState<GenderType>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightRaw1, setHeightRaw1] = useState("");
  const [heightRaw2, setHeightRaw2] = useState("");
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<GoalType>("maintain");
  const [formula, setFormula] = useState<BMRFormula>("mifflin");
  const [bodyFat, setBodyFat] = useState("");
  const [weightChangeRate, setWeightChangeRate] = useState<number>(0.5); // Default 0.5kg/week

  const [result, setResult] = useState<CalorieResult | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const parsed = kaloriSchema.parse({
        weight,
        heightRaw1,
        heightRaw2: system === "imperial" && heightRaw2 ? heightRaw2 : 0,
        age,
        bodyFatPercentage: bodyFat ? bodyFat : undefined,
      });

      if (formula === "katch" && !parsed.bodyFatPercentage) {
        setError(
          "Rumus Katch-McArdle membutuhkan input persentase lemak tubuh.",
        );
        return;
      }

      const input: CalorieInput = {
        system,
        gender,
        age: parsed.age,
        weight: parsed.weight,
        heightRaw1: parsed.heightRaw1,
        heightRaw2: parsed.heightRaw2,
        activityLevel,
        goal,
        formula,
        bodyFatPercentage: parsed.bodyFatPercentage as number | undefined,
        weightChangeRate: goal !== "maintain" ? weightChangeRate : undefined,
      };

      const res = calculateCalories(input);
      setResult(res);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0].message);
      } else {
        setError(err.message || "Terjadi kesalahan saat menghitung Kalori.");
      }
      setResult(null);
    }
  };

  const getGoalTheme = (currentGoal: GoalType) => {
    switch (currentGoal) {
      case "lose":
        return {
          cardBg: "bg-[#2C1A0E]",
          ring: "ring-[#4A7C59]/30",
          text: "text-[#E8F5E9]",
          accentText: "text-[#4A7C59]",
          border: "border-[#4A7C59]/30",
          icon: Target,
          gradient: "from-[#4A7C59]/20 via-transparent to-transparent",
          label: "Defisit Kalori",
        };
      case "gain":
        return {
          cardBg: "bg-[#2C1A0E]",
          ring: "ring-[#C17A3A]/30",
          text: "text-[#FFF3E0]",
          accentText: "text-[#C17A3A]",
          border: "border-[#C17A3A]/30",
          icon: Target,
          gradient: "from-[#C17A3A]/20 via-transparent to-transparent",
          label: "Surplus Kalori",
        };
      case "maintain":
      default:
        return {
          cardBg: "bg-[#2C1A0E]",
          ring: "ring-[#EDE0D0]/20",
          text: "text-[#F5EDE3]",
          accentText: "text-[#EDE0D0]",
          border: "border-white/10",
          icon: Scale,
          gradient: "from-white/5 via-transparent to-transparent",
          label: "Pemeliharaan Berat Badan",
        };
    }
  };

  const theme = result ? getGoalTheme(result.goal) : null;
  const IconResult = theme ? theme.icon : Flame;

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Kalori Harian" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Kalori Harian
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Hitung kebutuhan energi harian, TDEE, & makronutrien
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
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
                  onClick={() => setSystem("metric")}
                  className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                    system === "metric"
                      ? "bg-white text-primary shadow-sm"
                      : "text-secondary hover:text-primary",
                  )}
                >
                  Metrik (kg, cm)
                </button>
                <button
                  type="button"
                  onClick={() => setSystem("imperial")}
                  className={cn(
                    "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                    system === "imperial"
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
                    onClick={() => setGender("male")}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                      gender === "male"
                        ? "border-accent-1 bg-accent-1/5 text-accent-1"
                        : "border-muted bg-white text-secondary hover:border-secondary/30",
                    )}
                  >
                    <Mars className="w-6 h-6 mb-1" />
                    <span className="font-bold font-ui text-xs">Pria</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={cn(
                      "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                      gender === "female"
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
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
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
                  placeholder={system === "metric" ? "65" : "145"}
                  suffix={system === "metric" ? "kg" : "lb"}
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="py-3 placeholder:opacity-40 rounded-xl w-full"
                  required
                  min={10}
                  max={500}
                />

                {system === "metric" ? (
                  <Input
                    id="height1"
                    label="Tinggi Badan"
                    type="number"
                    placeholder="170"
                    suffix="cm"
                    value={heightRaw1}
                    onChange={(e) => setHeightRaw1(e.target.value)}
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
                      value={heightRaw1}
                      onChange={(e) => setHeightRaw1(e.target.value)}
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
                      value={heightRaw2}
                      onChange={(e) => setHeightRaw2(e.target.value)}
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
                    value={activityLevel}
                    onChange={(e) =>
                      setActivityLevel(e.target.value as ActivityLevel)
                    }
                    className="w-full flex h-12 rounded-xl border bg-white px-4 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none shadow-sm"
                  >
                    <option value="sedentary">
                      Jarang Berolahraga (Sedentary)
                    </option>
                    <option value="light">
                      Aktivitas Ringan (1-3 hari/minggu)
                    </option>
                    <option value="moderate">
                      Aktivitas Sedang (3-5 hari/minggu)
                    </option>
                    <option value="active">
                      Aktivitas Tinggi (6-7 hari/minggu)
                    </option>
                    <option value="very_active">
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
                    onClick={() => setGoal("lose")}
                    className={cn(
                      "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
                      goal === "lose"
                        ? "bg-white text-primary shadow-sm"
                        : "text-secondary hover:text-primary",
                    )}
                  >
                    Turunkan
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoal("maintain")}
                    className={cn(
                      "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
                      goal === "maintain"
                        ? "bg-white text-primary shadow-sm"
                        : "text-secondary hover:text-primary",
                    )}
                  >
                    Pertahankan
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoal("gain")}
                    className={cn(
                      "py-2 px-1 text-xs md:text-sm font-bold rounded-lg transition-all text-center",
                      goal === "gain"
                        ? "bg-white text-primary shadow-sm"
                        : "text-secondary hover:text-primary",
                    )}
                  >
                    Tingkatkan
                  </button>
                </div>
              </div>

              {/* Target Rate (Only if goal is 'lose' or 'gain') */}
              {goal !== "maintain" && (
                <div className="flex flex-col gap-2 animate-in slide-in-from-top-2 fade-in duration-300">
                  <label className="text-sm font-bold font-ui text-primary line-clamp-1">
                    Target {goal === "lose" ? "Penurunan" : "Peningkatan"} /
                    Minggu
                  </label>
                  <div className="relative">
                    <select
                      value={weightChangeRate}
                      onChange={(e) =>
                        setWeightChangeRate(parseFloat(e.target.value))
                      }
                      className="w-full flex h-12 rounded-xl border bg-white px-4 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none shadow-sm"
                    >
                      <option value={0.25}>0.25 kg / minggu (Ringan)</option>
                      <option value={0.5}>0.5 kg / minggu (Normal)</option>
                      <option value={0.75}>
                        0.75 kg / minggu (Lebih Cepat)
                      </option>
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
                      value={formula}
                      onChange={(e) => setFormula(e.target.value as BMRFormula)}
                      className="w-full flex h-11 rounded-lg border bg-white px-3 text-sm transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui appearance-none"
                    >
                      <option value="mifflin">
                        Mifflin-St Jeor (Akurat & Default)
                      </option>
                      <option value="harris">Harris-Benedict (Klasik)</option>
                      <option value="katch">
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
                    value={bodyFat}
                    onChange={(e) => setBodyFat(e.target.value)}
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

        {/* Right Side: Result Display */}
        <div className="lg:col-span-7 h-full">
          {result && theme ? (
            <Card
              variant="default"
              className={cn(
                "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95",
                theme.cardBg,
                theme.border,
                "ring-4 ring-inset",
                theme.ring,
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br pointer-events-none transition-colors",
                  theme.gradient,
                )}
              />

              <div className="relative z-10 flex flex-col items-center p-8 sm:p-12 h-full">
                <div className="w-16 h-16 rounded-[1.25rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-white/10">
                  <IconResult className={cn("w-8 h-8", theme.accentText)} />
                </div>

                <h3 className="text-sm font-bold text-[#EDE0D0] tracking-widest uppercase mb-2 opacity-80 text-center">
                  {theme.label}
                </h3>
                <div className="flex items-end justify-center gap-2 mb-6">
                  <div
                    className={cn(
                      "text-[4.5rem] sm:text-[6rem] font-black font-heading tracking-tighter leading-none text-center drop-shadow-md",
                      theme.text,
                    )}
                  >
                    {result.targetCalories}
                  </div>
                  <span
                    className={cn(
                      "text-xl sm:text-2xl font-bold pb-2",
                      theme.accentText,
                    )}
                  >
                    kkal/hari
                  </span>
                </div>

                {result.warning && (
                  <div className="bg-[#9C4A2A]/20 border border-[#9C4A2A]/40 text-[#FFF0EB] p-4 rounded-xl text-sm font-medium mb-6 text-center shadow-sm w-full font-body">
                    {result.warning}
                  </div>
                )}

                <div className="bg-[#1A0E07]/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-inner w-full mb-8 flex justify-around">
                  <div className="text-center flex-1 border-r border-white/10">
                    <span className="block text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
                      Basal (BMR)
                    </span>
                    <span className="text-xl font-black text-white font-heading">
                      {result.bmr}{" "}
                      <span className="text-[10px] font-normal opacity-70 relative -top-1">
                        kkal
                      </span>
                    </span>
                  </div>
                  <div className="text-center flex-1">
                    <span className="block text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
                      Total (TDEE)
                    </span>
                    <span className="text-xl font-black text-white font-heading">
                      {result.tdee}{" "}
                      <span className="text-[10px] font-normal opacity-70 relative -top-1">
                        kkal
                      </span>
                    </span>
                  </div>
                </div>

                {/* Macromutrients UI - Premium Implementation */}
                <div className="w-full mt-auto bg-[#1A0E07] p-6 rounded-3xl border border-white/5 shadow-inner">
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="font-heading font-extrabold text-[#F5EDE3] flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-[#C17A3A]" />
                      Makronutrien
                    </h4>
                    <span className="text-xs text-[#EDE0D0] opacity-60 font-medium">
                      Estimasi Harian
                    </span>
                  </div>

                  {/* Custom Visual Bar Chart for Macros */}
                  <div className="h-4 w-full rounded-full flex overflow-hidden mb-6 border border-white/10 ring-1 ring-inset ring-black/40">
                    <div
                      className="bg-[#4A7C59]"
                      style={{
                        width: `${(result.macros.proteinCal / result.targetCalories) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="bg-[#C17A3A]"
                      style={{
                        width: `${(result.macros.carbsCal / result.targetCalories) * 100}%`,
                      }}
                    ></div>
                    <div
                      className="bg-[#9C4A2A]"
                      style={{
                        width: `${(result.macros.fatCal / result.targetCalories) * 100}%`,
                      }}
                    ></div>
                  </div>

                  {/* Macro details grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#2C1A0E] rounded-2xl p-3 border border-[#4A7C59]/30 hover:bg-[#4A7C59]/10 transition-colors">
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4A7C59] shadow-[0_0_8px_rgba(74,124,89,0.6)]"></div>
                        <span className="text-xs font-bold text-[#E8F5E9]">
                          Protein
                        </span>
                      </div>
                      <div className="text-xl font-black text-white font-heading">
                        {result.macros.proteinGrams}
                        <span className="text-xs font-bold text-[#4A7C59] ml-1">
                          g
                        </span>
                      </div>
                      <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-1">
                        {result.macros.proteinCal} kkal
                      </div>
                    </div>
                    <div className="bg-[#2C1A0E] rounded-2xl p-3 border border-[#C17A3A]/30 hover:bg-[#C17A3A]/10 transition-colors">
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#C17A3A] shadow-[0_0_8px_rgba(193,122,58,0.6)]"></div>
                        <span className="text-xs font-bold text-[#FFF3E0]">
                          Karbo
                        </span>
                      </div>
                      <div className="text-xl font-black text-white font-heading">
                        {result.macros.carbsGrams}
                        <span className="text-xs font-bold text-[#C17A3A] ml-1">
                          g
                        </span>
                      </div>
                      <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-1">
                        {result.macros.carbsCal} kkal
                      </div>
                    </div>
                    <div className="bg-[#2C1A0E] rounded-2xl p-3 border border-[#9C4A2A]/30 hover:bg-[#9C4A2A]/10 transition-colors">
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#9C4A2A] shadow-[0_0_8px_rgba(156,74,42,0.6)]"></div>
                        <span className="text-xs font-bold text-[#FFF0EB]">
                          Lemak
                        </span>
                      </div>
                      <div className="text-xl font-black text-white font-heading">
                        {result.macros.fatGrams}
                        <span className="text-xs font-bold text-[#9C4A2A] ml-1">
                          g
                        </span>
                      </div>
                      <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-1">
                        {result.macros.fatCal} kkal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card
              variant="default"
              className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
            >
              {/* Grain Overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              ></div>

              <div className="relative z-10 w-full flex justify-center  mt-4">
                <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                <Image
                  src="/kalori.svg"
                  alt="Calorie Calculator"
                  width={300}
                  height={200}
                  className="w-full max-w-[240px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
                  priority
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                {/* Fallback icon if image doesn't exist */}
                <div className="w-32 h-32 rounded-full border-4 border-[#C17A3A]/20 flex items-center justify-center bg-[#C17A3A]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                  <Activity className="w-12 h-12 text-[#C17A3A] opacity-60" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
                Kalkulator Siap Digunakan
              </h3>
              <p className="text-[#EDE0D0] font-body max-w-sm text-base sm:text-lg leading-relaxed relative z-10 opacity-90 px-4">
                Lengkapi data diri dan target yang ingin dicapai melalui
                formulir untuk mendapatkan analisis nutrisi yang tepat.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section (Premium Dark Layout - matching BMI layout exactly structurally with modified requested text) */}
      <div className="mt-16 mb-24">
        <div className="relative">
          {/* Main Container - Dark Theme (Tanah Tua) */}
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Effects Wrapper (handles overflow) */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              {/* Background Glow Effects */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />

              {/* Grain Overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay transition-opacity"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              ></div>
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Kesehatan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Kebutuhan Kalori
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Kebutuhan kalori harian Anda tergantung pada beberapa faktor
                  termasuk usia, jenis kelamin, tinggi badan, berat badan,
                  komposisi tubuh, dan tingkat aktivitas.
                </p>

                {/* Pull Quote Box / Ikhtisar */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Kalkulator kalori ini membantu memperkirakan kebutuhan
                      kalori harian Anda berdasarkan ukuran tubuh, tingkat
                      aktivitas, dan tujuan kebugaran Anda.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body">
                      Ini memberi Anda gambaran tentang berapa banyak kalori
                      yang harus Anda konsumsi per hari untuk mempertahankan,
                      menurunkan, atau menambah berat badan. Apakah Anda
                      bertujuan untuk mengurangi lemak, menambah otot, atau
                      hanya mempertahankan berat badan Anda, alat ini dapat
                      membimbing pilihan nutrisi Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Komponen Utama */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Komponen Utama
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Laju Metabolisme Basal (BMR)
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Kalori yang dibutuhkan tubuh Anda untuk fungsi dasar
                        biologis saat beristirahat.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between">
                      <h4 className="text-xl font-bold font-heading text-[#E8F5E9] mb-2">
                        Total Pengeluaran Energi Harian (TDEE)
                      </h4>
                      <p className="text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        BMR ditambah kalori yang dibakar melalui aktivitas fisik
                        harian dan olahraga.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between">
                      <h4 className="text-xl font-bold font-heading text-[#FFF3E0] mb-2">
                        Makronutrien Khusus
                      </h4>
                      <p className="text-[#FFF3E0]/80 font-body text-sm leading-relaxed">
                        Protein, karbohidrat, dan lemak yang menyediakan dasar
                        kalori dan nutrisi untuk tubuh.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Metode & Rumus */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Bagaimana Kalkulator Bekerja
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h5 className="font-bold text-lg text-white mb-4">
                        Metode Perhitungan BMR
                      </h5>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm md:text-base">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Persamaan Mifflin-St Jeor:</strong> Dianggap
                            paling akurat untuk sebagian besar orang (Default
                            yang kami gunakan).
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Persamaan Harris-Benedict:</strong> Salah
                            satu rumus BMR yang paling awal dan banyak digunakan
                            secara luas.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Rumus Katch-McArdle:</strong>{" "}
                            Memperhitungkan massa tubuh tanpa lemak dan mungkin
                            lebih akurat untuk individu atletik.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1A0E07] p-6 rounded-2xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden flex flex-col gap-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                      <h5 className="font-bold text-sm text-surface uppercase tracking-widest relative z-10">
                        Rumus Terapan (Mifflin)
                      </h5>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex flex-col gap-2 border border-[#7A5C42]/40 relative z-10 shadow-inner">
                        <p className="text-xs text-[#C17A3A] font-bold">
                          Pria:
                        </p>
                        <span className="font-mono text-sm text-[#F5EDE3]">
                          BMR = (10 × kg) + (6.25 × cm) - (5 × usia) + 5
                        </span>
                      </div>

                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex flex-col gap-2 border border-[#7A5C42]/40 relative z-10 shadow-inner mt-2">
                        <p className="text-xs text-[#C17A3A] font-bold">
                          Wanita:
                        </p>
                        <span className="font-mono text-sm text-[#F5EDE3]">
                          BMR = (10 × kg) + (6.25 × cm) - (5 × usia) - 161
                        </span>
                      </div>

                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex flex-col gap-2 border border-[#7A5C42]/40 relative z-10 shadow-inner mt-2">
                        <p className="text-xs text-[#4A7C59] font-bold">
                          TDEE & Penyesuaian Kalori:
                        </p>
                        <span className="font-mono text-xs text-[#F5EDE3]">
                          TDEE = BMR × Faktor Aktivitas
                        </span>
                        <span className="font-mono text-xs text-[#F5EDE3]">
                          Perubahan kalori = (7700 × kg/minggu) / 7
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Keseimbangan Makro & Manajemen */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Makronutrien & Manajemen
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Makronutrien */}
                    <div className="bg-[#1A0E07]/40 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <h5 className="font-bold text-xl text-white mb-4">
                        Keseimbangan Makronutrien
                      </h5>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex gap-3 items-start border-l-2 border-[#4A7C59] pl-3 py-1">
                          <div className="flex-1">
                            <span className="font-bold text-[#4A7C59] block">
                              Protein (4 kalori/gram)
                            </span>
                            <span className="text-sm opacity-80">
                              Penting untuk perbaikan dan pertumbuhan jaringan
                              otot.
                            </span>
                          </div>
                        </li>
                        <li className="flex gap-3 items-start border-l-2 border-[#C17A3A] pl-3 py-1">
                          <div className="flex-1">
                            <span className="font-bold text-[#C17A3A] block">
                              Karbohidrat (4 kalori/gram)
                            </span>
                            <span className="text-sm opacity-80">
                              Sebagai sumber energi utama bagi tubuh Anda.
                            </span>
                          </div>
                        </li>
                        <li className="flex gap-3 items-start border-l-2 border-[#9C4A2A] pl-3 py-1">
                          <div className="flex-1">
                            <span className="font-bold text-[#9C4A2A] block">
                              Lemak (9 kalori/gram)
                            </span>
                            <span className="text-sm opacity-80">
                              Penting untuk produksi hormon dan penyerapan
                              nutrisi.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Manajemen */}
                    <div className="bg-[#1A0E07]/40 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <h5 className="font-bold text-xl text-white mb-4">
                        Manajemen Berat Badan
                      </h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-4">
                        Untuk manajemen berat badan Anda dapat memilih salah
                        satu langkah berikut:
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] mb-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-surface shrink-0 mt-0.5 opacity-60" />
                          <span>
                            <strong>Pertahankan:</strong> Konsumsi sesuai batas
                            TDEE Anda.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Turunkan berat:</strong> Buat defisit kalori
                            (konsumsi kurang dari TDEE).
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Tingkatkan berat:</strong> Buat surplus
                            kalori (konsumsi lebih dari TDEE).
                          </span>
                        </li>
                      </ul>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl border border-[#7A5C42]/30 flex gap-4 items-start shadow-inner">
                        <ShieldAlert className="w-6 h-6 shrink-0 text-[#C17A3A]" />
                        <p className="text-xs font-medium text-[#F5EDE3]">
                          Kecepatan perubahan berat badan yang aman dan
                          berkelanjutan umumnya adalah 0.5-1 kg (1-2 pon) per
                          minggu.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold font-heading text-white mb-3">
                      Pertanyaan yang Sering Diajukan (FAQ)
                    </h3>
                    <p className="text-[#EDE0D0] font-body">
                      Penjelasan lebih mendalam terkait alat kami.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apa itu BMR dan mengapa itu penting?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          BMR adalah singkatan dari Tingkat Metabolisme Basal.
                          Ini mewakili jumlah kalori yang dibutuhkan tubuh Anda
                          untuk melakukan fungsi dasar yang mendukung kehidupan
                          seperti bernapas dan pencernaan. Perkiraan BMR adalah
                          dasar untuk memecahkan kebutuhan kalori total Anda.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apa itu defisit kalori?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Defisit kalori berarti mengonsumsi kalori lebih
                          sedikit daripada yang dibakar tubuh Anda. Kalkulator
                          kami memperkirakan tepat berapa banyak kalori yang
                          harus dikurangi per hari untuk mencapai tujuan
                          spesifik penurunan berat badan Anda dengan aman.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apakah ini memperhitungkan lemak tubuh?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Jika Anda memilih rumus Katch-McArdle dan memberikan
                          persentase lemak tubuh Anda, kalkulator akan
                          menawarkan perkiraan presisi dengan mempertimbangkan
                          massa tubuh tanpa lemak (Lean Body Mass) Anda.
                        </p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Bisakah saya menghitung BMI saya di sini?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Alat kalori ini lebih difokuskan pada pemrosesan
                          kalori. Tetapi platform kami memiliki kalkulator BMI
                          otomatis yang terpisah untuk menilai spesifikasi
                          rentang berat badan yang sehat.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Apakah ini juga kalkulator massa tanpa lemak?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Ya, saat menggunakan input lemak tubuh, formulasi
                          otomatis ini mengestimasi massa tanpa lemak Anda, yang
                          sangat mendukung perhitungan kalori dan makro yang
                          jauh lebih akurat.
                        </p>
                      </details>
                    </div>
                  </div>
                </section>

                <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#7A5C42]/40 text-center max-w-3xl mx-auto shadow-inner mt-4">
                  <h4 className="font-heading font-extrabold text-white text-xl mb-4">
                    Kesimpulan & Tips Terbaik
                  </h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 block">
                    Kalkulator kalori ini adalah alat praktis dan mudah
                    digunakan untuk menetapkan target nutrisi Anda, dukungan
                    untuk BMR, TDEE, makronutrien, memberikan gambaran spesifik
                    pada kebutuhan harian tubuh. Terdapat beberapa hal krusial
                    untuk dicatat:
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm text-left font-body">
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />{" "}
                      Tinjau ulang angka secara berkala
                    </span>
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9C4A2A]" />{" "}
                      Wanita: Minimum 1200 kkal/hari
                    </span>
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9C4A2A]" />{" "}
                      Pria: Minimum 1500 kkal/hari
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/kalori" categoryId="kesehatan" />
    </div>
  );
}
