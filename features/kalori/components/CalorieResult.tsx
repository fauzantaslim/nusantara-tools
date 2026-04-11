"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Target, Scale, Activity, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { CalorieContextType, GoalType } from "../types";

import { CALORIE_GOAL } from "@/lib/constants";

const getGoalTheme = (currentGoal: GoalType) => {
  switch (currentGoal) {
    case CALORIE_GOAL.LOSE:
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
    case CALORIE_GOAL.GAIN:
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
    case CALORIE_GOAL.MAINTAIN:
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

export const CalorieResult: React.FC<{ hook: CalorieContextType }> = ({
  hook,
}) => {
  const { result } = hook;

  if (!result) {
    return (
      <Card
        variant="default"
        className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative z-10 w-full flex justify-center mt-4">
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
          <div className="w-32 h-32 rounded-full border-4 border-[#C17A3A]/20 flex items-center justify-center bg-[#C17A3A]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
            <Activity className="w-12 h-12 text-[#C17A3A] opacity-60" />
          </div>
        </div>
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
          Kalkulator Siap Digunakan
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-sm text-base sm:text-lg leading-relaxed relative z-10 opacity-90 px-4">
          Lengkapi data diri dan target yang ingin dicapai melalui formulir
          untuk mendapatkan analisis nutrisi yang tepat.
        </p>
      </Card>
    );
  }

  const theme = getGoalTheme(result.goal);
  const IconResult = theme.icon;

  return (
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
                <span className="text-xs font-bold text-[#4A7C59] ml-1">g</span>
              </div>
              <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-1">
                {result.macros.proteinCal} kkal
              </div>
            </div>
            <div className="bg-[#2C1A0E] rounded-2xl p-3 border border-[#C17A3A]/30 hover:bg-[#C17A3A]/10 transition-colors">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C17A3A] shadow-[0_0_8px_rgba(193,122,58,0.6)]"></div>
                <span className="text-xs font-bold text-[#FFF3E0]">Karbo</span>
              </div>
              <div className="text-xl font-black text-white font-heading">
                {result.macros.carbsGrams}
                <span className="text-xs font-bold text-[#C17A3A] ml-1">g</span>
              </div>
              <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-1">
                {result.macros.carbsCal} kkal
              </div>
            </div>
            <div className="bg-[#2C1A0E] rounded-2xl p-3 border border-[#9C4A2A]/30 hover:bg-[#9C4A2A]/10 transition-colors">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#9C4A2A] shadow-[0_0_8px_rgba(156,74,42,0.6)]"></div>
                <span className="text-xs font-bold text-[#FFF0EB]">Lemak</span>
              </div>
              <div className="text-xl font-black text-white font-heading">
                {result.macros.fatGrams}
                <span className="text-xs font-bold text-[#9C4A2A] ml-1">g</span>
              </div>
              <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-1">
                {result.macros.fatCal} kkal
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
