"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Moon, Sun, Info, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SleepContextType } from "../types";
import { SLEEP_CALCULATION_MODE, QUALITY_STYLE_CONFIG } from "@/lib/constants";

export const SleepResult: React.FC<{ hook: SleepContextType }> = ({ hook }) => {
  const { result } = hook;

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

        <div className="relative z-10">
          <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
          <div className="relative z-10 w-full flex justify-center mt-4">
            <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
            <Image
              src="/tidur.svg"
              alt="Sleep Calculator Illustration"
              width={400}
              height={300}
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4 mt-6">
          Siap Untuk Mulai?
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90 px-4">
          Pilih mode kalkulasi, masukkan waktu Anda, lalu lihat rekomendasinya
          di sini.
        </p>
        <div className="flex gap-3 mt-8 flex-wrap justify-center relative z-10">
          {["5 Siklus = 7.5 Jam", "6 Siklus = 9 Jam"].map((t) => (
            <span
              key={t}
              className="text-xs bg-[#4A7C59]/20 text-[#4A7C59] px-3 py-1.5 rounded-full font-bold border border-[#4A7C59]/20 font-ui"
            >
              {t}
            </span>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#4A7C59]/30 border-[#4A7C59]/30 text-[#E8F5E9]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/15 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4A7C59] tracking-widest uppercase opacity-80 block mb-1 font-ui">
              {result.mode === SLEEP_CALCULATION_MODE.WAKE_AT
                ? "Bangun jam"
                : "Tidur jam"}{" "}
              {result.inputTime}
            </span>
            <h3 className="text-xl font-extrabold font-heading text-white">
              {result.mode === SLEEP_CALCULATION_MODE.WAKE_AT
                ? "Rekomendasi Waktu Tidur"
                : "Rekomendasi Waktu Bangun"}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-[#4A7C59]/20 flex items-center justify-center shadow-inner">
            {result.mode === SLEEP_CALCULATION_MODE.WAKE_AT ? (
              <Moon className="w-5 h-5 text-[#4A7C59]" />
            ) : (
              <Sun className="w-5 h-5 text-[#C17A3A]" />
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-sm text-[#EDE0D0]/70 font-body leading-relaxed bg-white/5 rounded-xl px-4 py-3 border border-white/5">
          {result.mode === SLEEP_CALCULATION_MODE.WAKE_AT
            ? `Jika ingin bangun jam ${result.inputTime}, berikut waktu terbaik untuk mulai tidur malam ini:`
            : `Jika tidur jam ${result.inputTime}, berikut estimasi waktu bangun yang optimal:`}
        </p>

        {/* Cycle Results List */}
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
          {result.results.map((item) => {
            const style = QUALITY_STYLE_CONFIG[item.quality];
            return (
              <div
                key={item.cycles}
                className={cn(
                  "relative flex items-center gap-4 p-4 rounded-2xl border transition-all hover:scale-[1.01] duration-300",
                  style.bg,
                  style.border,
                  item.isHighlighted && "ring-1 ring-inset ring-[#4A7C59]/40",
                )}
              >
                {item.isHighlighted && (
                  <div className="absolute top-2 right-3">
                    <Star className="w-3.5 h-3.5 text-[#4A7C59] fill-[#4A7C59] animate-pulse" />
                  </div>
                )}

                {/* Time Display */}
                <div className="flex flex-col items-center justify-center w-24 shrink-0">
                  <span className="font-black font-heading text-2xl text-white tracking-tight leading-none">
                    {item.displayTime}
                  </span>
                  <span className="text-[10px] text-[#EDE0D0] opacity-60 mt-1 font-mono uppercase tracking-wider">
                    {item.cycles === 1 ? "1 siklus" : `${item.cycles} siklus`}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-px h-10 bg-white/10 shrink-0" />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1.5">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md w-fit uppercase tracking-tighter",
                        style.badge,
                      )}
                    >
                      {item.quality}
                    </span>
                    <span className="text-xs text-[#EDE0D0] opacity-80 font-ui font-medium">
                      {item.totalHours} jam istirahat
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="bg-[#1A0E07]/60 rounded-2xl px-4 py-4 border border-white/5 flex items-start gap-3 shadow-inner mt-auto">
          <Info className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#EDE0D0] font-body leading-relaxed opacity-90">
            <span className="text-[#4A7C59] font-bold">★ Saran Klinik:</span>{" "}
            5–6 siklus (7,5–9 jam) adalah standar tidur yang ideal. Bangun di
            akhir siklus meminimalkan rasa pening (sleep inertia).
          </p>
        </div>
      </div>
    </Card>
  );
};
