"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Award, BarChart2, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { OneRMResult } from "../types";

export const OneRMResultView: React.FC<{ result: OneRMResult | null }> = ({
  result,
}) => {
  if (!result) {
    return (
      <Card
        variant="default"
        className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative z-10 w-full flex justify-center mt-4">
          <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-10" />
          <div className="relative z-10 w-full flex justify-center mt-4">
            <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
            <Image
              src="/1rm.svg"
              alt="1RM Calculator Illustration"
              width={400}
              height={300}
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
          Kalkulator Siap Digunakan
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90 px-4">
          Masukkan beban dan repetisi dari set terakhir Anda untuk mendapatkan
          estimasi 1RM dan tabel rencana latihan.
        </p>
        <div className="flex gap-2 mt-8 flex-wrap justify-center relative z-10">
          {["Epley", "Brzycki", "Lombardi"].map((f) => (
            <span
              key={f}
              className="text-xs bg-[#C17A3A]/15 text-[#C17A3A] px-3 py-1.5 rounded-full font-bold border border-[#C17A3A]/20"
            >
              {f}
            </span>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#C17A3A]/30 border-[#C17A3A]/30 text-[#FFF3E0]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C17A3A]/15 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-6 h-full">
        {/* Main 1RM Result */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-[#1A0E07] shadow-inner flex items-center justify-center mb-4 border border-[#C17A3A]/20">
            <Award className="w-7 h-7 text-[#C17A3A]" />
          </div>
          <span className="text-xs font-bold text-[#C17A3A] tracking-widest uppercase mb-1 opacity-90 bg-[#C17A3A]/10 px-3 py-1 rounded-full">
            Estimasi One Rep Max · {result.formulaLabel}
          </span>
          <div className="flex items-end justify-center gap-2 mt-4 mb-1">
            <div className="text-[4.5rem] sm:text-[5.5rem] font-black font-heading tracking-tighter leading-none text-[#FFF3E0] drop-shadow-md">
              {result.oneRM}
            </div>
            <span className="text-2xl font-bold pb-3 text-[#C17A3A] uppercase">
              {result.unit}
            </span>
          </div>
          <p className="text-xs text-[#EDE0D0] opacity-70 font-body">
            Perkiraan dihitung menggunakan rumus {result.formulaLabel}
          </p>
        </div>

        {/* Formula Comparison */}
        <div className="bg-[#1A0E07]/60 rounded-2xl border border-white/10 p-4 shadow-inner">
          <h4 className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest mb-3 flex items-center gap-2">
            <BarChart2 className="w-4 h-4" /> Perbandingan Semua Rumus
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {result.comparisonResults.map((c) => (
              <div
                key={c.formula}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl border transition-all",
                  c.formula === result.formula
                    ? "bg-[#C17A3A]/20 border-[#C17A3A]/40"
                    : "bg-white/5 border-white/5",
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-wider mb-1",
                    c.formula === result.formula
                      ? "text-[#C17A3A]"
                      : "text-[#EDE0D0] opacity-60",
                  )}
                >
                  {c.label}
                </span>
                <span className="text-lg font-black text-white font-heading">
                  {c.value}
                </span>
                <span className="text-[10px] text-[#EDE0D0] opacity-50 uppercase">
                  {result.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Percentage Table */}
        <div className="flex-1">
          <h4 className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" /> Tabel Persentase & Progam Latihan
          </h4>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-inner">
            <div className="grid grid-cols-3 bg-[#1A0E07]/80 px-4 py-2 border-b border-white/5">
              <span className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-wider">
                % 1RM
              </span>
              <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider text-center">
                Repetisi
              </span>
              <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider text-right">
                Beban ({result.unit})
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {result.percentageTable.map((row) => (
                <div
                  key={row.percent}
                  className={cn(
                    "grid grid-cols-3 px-4 py-2.5 hover:bg-white/5 transition-colors",
                    row.percent >= 85 && "bg-[#C17A3A]/10",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-bold font-mono",
                      row.percent === 100 ? "text-[#C17A3A]" : "text-[#FFF3E0]",
                    )}
                  >
                    {row.percent}%
                  </span>
                  <span className="text-sm text-[#EDE0D0] text-center opacity-80">
                    {row.reps} rep{row.reps > 1 ? "s" : ""}
                  </span>
                  <span className="text-sm font-bold text-white text-right">
                    {row.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
