"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Scale, HeartPulse, ShieldAlert, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { BMIResult, BMICategory, BMI_CATEGORY } from "../types";

const getCategoryTheme = (category: BMICategory) => {
  switch (category) {
    case BMI_CATEGORY.NORMAL:
      return {
        cardBg: "bg-[#2C1A0E]",
        ring: "ring-[#4A7C59]/30",
        text: "text-[#E8F5E9]",
        accentText: "text-[#4A7C59]",
        border: "border-[#4A7C59]/30",
        icon: HeartPulse,
        gradient: "from-[#4A7C59]/20 via-transparent to-transparent",
      };
    case BMI_CATEGORY.KURUS:
      return {
        cardBg: "bg-[#2C1A0E]",
        ring: "ring-[#EDE0D0]/20",
        text: "text-[#F5EDE3]",
        accentText: "text-[#EDE0D0]",
        border: "border-white/10",
        icon: Scale,
        gradient: "from-white/5 via-transparent to-transparent",
      };
    case BMI_CATEGORY.BERLEBIH:
      return {
        cardBg: "bg-[#2C1A0E]",
        ring: "ring-[#C17A3A]/30",
        text: "text-[#FFF3E0]",
        accentText: "text-[#C17A3A]",
        border: "border-[#C17A3A]/30",
        icon: ShieldAlert,
        gradient: "from-[#C17A3A]/20 via-transparent to-transparent",
      };
    case BMI_CATEGORY.OBESITAS:
      return {
        cardBg: "bg-[#2C1A0E]",
        ring: "ring-[#9C4A2A]/30",
        text: "text-[#FFF0EB]",
        accentText: "text-[#9C4A2A]",
        border: "border-[#9C4A2A]/30",
        icon: ShieldAlert,
        gradient: "from-[#9C4A2A]/20 via-transparent to-transparent",
      };
    default:
      return {
        cardBg: "bg-[#2C1A0E]",
        ring: "ring-[#EDE0D0]/20",
        text: "text-[#F5EDE3]",
        accentText: "text-[#EDE0D0]",
        border: "border-white/10",
        icon: Scale,
        gradient: "from-white/5 via-transparent to-transparent",
      };
  }
};

const BMIScale: React.FC<{ score: number }> = ({ score }) => {
  const min = 16;
  const max = 40;
  const clamped = Math.max(min, Math.min(score, max));
  const percent = ((clamped - min) / (max - min)) * 100;

  return (
    <div className="w-full mt-4 mb-4 bg-[#1A0E07]/60 p-5 rounded-[2rem] border border-white/5 shadow-inner backdrop-blur-md">
      <h4 className="text-left font-bold text-white font-heading mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-[#C17A3A]" />
        Skala BMI
      </h4>
      <div className="relative w-full pt-4 pb-2">
        {/* Marker */}
        <div
          className="absolute top-0 w-1 bg-white z-20 transition-all duration-1000 ease-out h-[calc(100%-8px)] shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          style={{ left: `calc(${percent}% - 2px)` }}
        >
          <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#2C1A0E] bg-white shadow-md" />
        </div>

        {/* The Bar */}
        <div className="h-10 rounded-xl flex overflow-hidden w-full relative z-10 shadow-inner opacity-90 ring-1 ring-inset ring-white/10">
          <div
            className="h-full bg-white/20 flex items-center justify-center border-r border-[#2C1A0E]/40"
            style={{ width: "10.4%" }}
          >
            <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block truncate opacity-80">
              Kurus
            </span>
          </div>
          <div
            className="h-full bg-[#4A7C59] flex items-center justify-center border-r border-[#2C1A0E]/40"
            style={{ width: "27.1%" }}
          >
            <span className="text-[10px] sm:text-xs font-bold text-white px-1">
              Normal
            </span>
          </div>
          <div
            className="h-full bg-[#C17A3A] flex items-center justify-center border-r border-[#2C1A0E]/40"
            style={{ width: "20.8%" }}
          >
            <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block">
              Berlebih
            </span>
          </div>
          <div
            className="h-full bg-[#9C4A2A] flex items-center justify-center"
            style={{ width: "41.7%" }}
          >
            <span className="text-[10px] sm:text-xs font-bold text-white px-1">
              Obesitas
            </span>
          </div>
        </div>

        {/* Labels */}
        <div className="relative w-full h-6 mt-3 text-[11px] font-bold text-[#EDE0D0] font-mono opacity-60">
          <span className="absolute left-0 -translate-x-1/2">16</span>
          <span className="absolute left-[10.4%] -translate-x-1/2">18.5</span>
          <span className="absolute left-[37.5%] -translate-x-1/2">25</span>
          <span className="absolute left-[58.3%] -translate-x-1/2">30</span>
          <span className="absolute right-0 translate-x-1/2">40</span>
        </div>
      </div>
    </div>
  );
};

export const BMIResult_: React.FC<{ result: BMIResult | null }> = ({
  result,
}) => {
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
        ></div>

        <div className="relative z-10 w-full flex justify-center mb-10 mt-4">
          <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
          <Image
            src="/bmi.svg"
            alt="BMI Calculator Illustration"
            width={400}
            height={300}
            className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
            priority
          />
        </div>
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
          Kalkulator Siap Digunakan
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-sm text-base sm:text-lg leading-relaxed relative z-10 opacity-90 px-4">
          Lengkapi data diri Anda pada formulir untuk memperoleh analisis medis
          standar akurat.
        </p>
      </Card>
    );
  }

  const theme = getCategoryTheme(result.category);
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

      <div className="relative z-10 flex flex-col items-center p-8 sm:p-14 h-full">
        <div className="w-20 h-20 rounded-[1.5rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-white/10">
          <IconResult className={cn("w-10 h-10", theme.accentText)} />
        </div>

        <h3 className="text-sm font-bold text-[#EDE0D0] tracking-widest uppercase mb-2 opacity-80 text-center">
          Skor Indeks Massa Tubuh
        </h3>
        <div
          className={cn(
            "text-[5rem] sm:text-[7rem] font-black font-heading tracking-tighter leading-none mb-6 text-center drop-shadow-md",
            theme.text,
          )}
        >
          {result.score}
        </div>

        <div
          className={cn(
            "px-6 py-2 rounded-full font-bold text-sm border shadow-sm mb-6 tracking-widest text-center bg-[#1A0E07]",
            theme.border,
            theme.accentText,
          )}
        >
          {result.category.toUpperCase()}
        </div>

        <div className="bg-[#1A0E07]/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-inner text-center w-full relative mb-4">
          <p className="text-base text-[#F5EDE3] font-body leading-relaxed">
            {result.insight}
          </p>
        </div>

        <BMIScale score={result.score} />

        {/* Additional Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-auto">
          <div className="bg-[#1A0E07]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
            <Scale className="w-6 h-6 text-[#C17A3A] mb-3 opacity-80" />
            <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
              Berat Ideal
            </span>
            <span className="text-base lg:text-lg font-black text-white font-heading tracking-tight">
              {result.idealWeightRange}
            </span>
          </div>
          <div className="bg-[#1A0E07]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
            <User className="w-6 h-6 text-[#4A7C59] mb-3 opacity-80" />
            <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
              Lemak Tubuh
            </span>
            <span className="text-base lg:text-lg font-black text-white font-heading tracking-tight">
              {result.bodyFatPercentage}%
            </span>
          </div>
          <div className="bg-[#1A0E07]/40 border border-white/5 p-5 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
            <Activity className="w-6 h-6 text-[#9C4A2A] mb-3 opacity-80" />
            <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
              Kalori Harian
            </span>
            <span className="text-base lg:text-lg font-black text-white font-heading tracking-tight">
              {result.dailyCalories} kcal
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
