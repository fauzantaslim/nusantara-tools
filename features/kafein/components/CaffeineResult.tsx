"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import {
  Coffee,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CaffeineContextType } from "../types";

const STATUS_CONFIG = {
  Safe: {
    bg: "bg-[#4A7C59]/15",
    border: "border-[#4A7C59]/40",
    text: "text-[#4A7C59]",
    icon: CheckCircle2,
    label: "Aman",
  },
  Moderate: {
    bg: "bg-[#C17A3A]/15",
    border: "border-[#C17A3A]/40",
    text: "text-[#C17A3A]",
    icon: AlertTriangle,
    label: "Moderat",
  },
  High: {
    bg: "bg-[#9C4A2A]/15",
    border: "border-[#9C4A2A]/40",
    text: "text-[#FF8A65]",
    icon: AlertTriangle,
    label: "Tinggi",
  },
  Excessive: {
    bg: "bg-red-900/20",
    border: "border-red-500/40",
    text: "text-red-400",
    icon: XCircle,
    label: "Berlebihan",
  },
};

export const CaffeineResult: React.FC<{ hook: CaffeineContextType }> = ({
  hook,
}) => {
  const { result, data } = hook;

  if (!result) {
    return (
      <Card
        variant="default"
        className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-[#F5EDE3]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative z-10">
          <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
          <div className="relative z-10 w-full flex justify-center mt-4">
            <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
            <Image
              src="/kafein.svg"
              alt="Caffeine Calculator Illustration"
              width={400}
              height={300}
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight relative z-10">
          Kalkulator Siap
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90">
          Tambahkan sumber kafein Anda hari ini dan klik "Hitung" untuk melihat
          status asupan Anda.
        </p>
      </Card>
    );
  }

  const sc = STATUS_CONFIG[result.status];
  const StatusIcon = sc.icon;
  const progressPercent = Math.min(
    (result.totalMg / result.recommendedLimitMg) * 100,
    100,
  );

  return (
    <Card
      variant="default"
      className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#C17A3A]/25 border-[#C17A3A]/25 text-[#FFF3E0] h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C17A3A]/15 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5">
        {/* Status Badge & Total */}
        <div className="flex flex-col items-center text-center pt-2">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border shadow-inner",
              sc.bg,
              sc.border,
            )}
          >
            <StatusIcon className={cn("w-7 h-7", sc.text)} />
          </div>
          <span
            className={cn(
              "text-xs font-bold tracking-widest uppercase mb-1 opacity-90 px-3 py-1 rounded-full border",
              sc.bg,
              sc.border,
              sc.text,
            )}
          >
            Status: {sc.label}
          </span>
          <div className="flex items-end justify-center gap-2 mt-4 mb-1">
            <div className="text-[4rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-[#FFF3E0] drop-shadow-md">
              {result.totalMg}
            </div>
            <span className="text-2xl font-bold pb-3 text-[#C17A3A]">mg</span>
          </div>
          <p className="text-xs text-[#EDE0D0] opacity-70 font-body">
            Total kafein hari ini
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-bold text-[#EDE0D0] opacity-80">
              Asupan vs Batas Aman
            </span>
            <span className="text-xs font-bold text-[#C17A3A]">
              Batas: {result.recommendedLimitMg} mg
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-1000",
                result.status === "Safe"
                  ? "bg-[#4A7C59]"
                  : result.status === "Moderate"
                    ? "bg-[#C17A3A]"
                    : result.status === "High"
                      ? "bg-[#9C4A2A]"
                      : "bg-red-500",
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[10px] text-[#EDE0D0] opacity-60 mt-2">
            {Math.round(progressPercent)}% dari batas harian{" "}
            {data.profile === "adult"
              ? "dewasa (400mg)"
              : data.profile === "pregnant"
                ? "ibu hamil (200mg)"
                : "remaja (100mg)"}
          </p>
        </div>

        {/* Per Body Weight (if provided) */}
        {result.perBodyWeightMgKg !== null && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1A0E07]/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center shadow-inner">
              <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-60">
                Per Berat Badan
              </span>
              <span className="text-xl font-black text-white font-heading">
                {result.perBodyWeightMgKg}
              </span>
              <span className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5">
                mg/kg
              </span>
            </div>
            <div className="bg-[#1A0E07]/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center shadow-inner">
              <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-60">
                Limit per Berat
              </span>
              <span className="text-xl font-black text-white font-heading">
                {result.perBodyWeightLimit}
              </span>
              <span className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5">
                mg (6mg/kg)
              </span>
            </div>
          </div>
        )}

        {/* Insight */}
        <div
          className={cn(
            "rounded-2xl p-4 border flex gap-3 shadow-inner",
            sc.bg,
            sc.border,
          )}
        >
          <Info className={cn("w-5 h-5 shrink-0 mt-0.5", sc.text)} />
          <p className={cn("text-sm font-body leading-relaxed", sc.text)}>
            {result.insight}
          </p>
        </div>

        {/* Breakdown Table */}
        {result.breakdown.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5" /> Rincian Per Sumber
            </h4>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-4 bg-[#1A0E07]/80 px-4 py-2">
                <span className="text-[10px] font-bold text-[#C17A3A] uppercase col-span-2">
                  Sumber
                </span>
                <span className="text-[10px] font-bold text-[#EDE0D0] uppercase text-center">
                  Qty
                </span>
                <span className="text-[10px] font-bold text-[#EDE0D0] uppercase text-right">
                  Total
                </span>
              </div>
              <div className="divide-y divide-white/5">
                {result.breakdown.map((b, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 px-4 py-2.5 hover:bg-white/5 transition-colors"
                  >
                    <span className="text-xs text-[#FFF3E0] col-span-2 truncate pr-2">
                      {b.name}
                    </span>
                    <span className="text-xs text-[#EDE0D0] text-center opacity-70">
                      ×{b.quantity}
                    </span>
                    <span className="text-xs font-bold text-white text-right">
                      {Math.round(b.totalMg)} mg
                    </span>
                  </div>
                ))}
                <div className="grid grid-cols-4 px-4 py-2.5 bg-[#C17A3A]/10">
                  <span className="text-xs font-bold text-[#C17A3A] col-span-3">
                    Total
                  </span>
                  <span className="text-sm font-black text-[#C17A3A] text-right">
                    {result.totalMg} mg
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
