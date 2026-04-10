"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Baby, Clock, CalendarHeart, Activity } from "lucide-react";
import { PregnancyContextType } from "../types";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const PregnancyResult: React.FC<{ hook: PregnancyContextType }> = ({
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
            src="/hpl.svg"
            alt="Pregnancy Illustration"
            width={300}
            height={200}
            className="w-full max-w-[280px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
            priority
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
          Kalkulator Siap Digunakan
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-sm text-base sm:text-lg leading-relaxed relative z-10 opacity-90 px-4">
          Lengkapi tanggal pada formulir untuk memperkirakan hari kelahiran dan
          melihat tonggak penting kehamilan Anda.
        </p>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] border-[#4A7C59]/30 ring-4 ring-inset ring-[#4A7C59]/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/20 via-transparent to-transparent pointer-events-none transition-colors" />

      <div className="relative z-10 flex flex-col p-8 sm:p-12 h-full">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-white/10 self-center">
          <Baby className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59]" />
        </div>

        <h3 className="text-sm font-bold text-[#EDE0D0] tracking-widest uppercase mb-2 opacity-80 text-center">
          Tanggal Perkiraan Lahir (EDD)
        </h3>
        <div className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tighter leading-none mb-4 text-center drop-shadow-md text-[#E8F5E9]">
          {formatDate(result.edd)}
        </div>

        <div className="px-6 py-2 rounded-full font-bold text-sm border shadow-sm mb-6 tracking-widest text-center self-center bg-[#1A0E07] border-[#4A7C59]/30 text-[#4A7C59]">
          {result.trimester === 1
            ? "Trimester Pertama"
            : result.trimester === 2
              ? "Trimester Kedua"
              : "Trimester Ketiga"}
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mb-2">
          <div className="bg-[#1A0E07]/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
            <Clock className="w-5 h-5 text-[#C17A3A] mb-2 opacity-80" />
            <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
              Minggu Saat Ini
            </span>
            <span className="text-sm sm:text-base font-black text-white font-heading tracking-tight">
              {result.currentWeeks} minggu, {result.currentDays} hari
            </span>
          </div>
          <div className="bg-[#1A0E07]/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center shadow-inner hover:bg-[#1A0E07]/60 transition-colors">
            <CalendarHeart className="w-5 h-5 text-[#4A7C59] mb-2 opacity-80" />
            <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-70">
              Tanggal Konsepsi
            </span>
            <span className="text-sm sm:text-base font-black text-white font-heading tracking-tight">
              {formatDate(result.conceptionDate)}
            </span>
          </div>
        </div>

        {/* Progres Bar */}
        <div className="w-full mt-6 mb-4 bg-[#1A0E07]/60 p-5 rounded-[2rem] border border-white/5 shadow-inner backdrop-blur-md">
          <h4 className="text-left font-bold text-white font-heading mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#C17A3A]" />
            Progres Kehamilan
          </h4>
          <div className="relative w-full pt-4 pb-2">
            {/* Marker */}
            <div
              className="absolute top-0 w-1 bg-white z-20 transition-all duration-1000 ease-out h-[calc(100%-8px)] shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ left: `calc(${result.progressPercent}% - 2px)` }}
            >
              <div className="absolute top-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#2C1A0E] bg-white shadow-md flex items-center justify-center">
                <Baby className="w-2.5 h-2.5 text-[#2C1A0E]" />
              </div>
            </div>

            {/* The Bar */}
            <div className="h-10 rounded-xl flex overflow-hidden w-full relative z-10 shadow-inner opacity-90 ring-1 ring-inset ring-white/10">
              <div
                className="h-full bg-white/20 flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all"
                style={{ width: "33.3%" }}
              >
                <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block opacity-80">
                  Trimester 1
                </span>
              </div>
              <div
                className="h-full bg-[#4A7C59]/80 flex items-center justify-center border-r border-[#2C1A0E]/40 transition-all"
                style={{ width: "33.3%" }}
              >
                <span className="text-[10px] sm:text-xs font-bold text-white px-1">
                  Trimester 2
                </span>
              </div>
              <div
                className="h-full bg-[#C17A3A]/80 flex items-center justify-center transition-all"
                style={{ width: "33.4%" }}
              >
                <span className="text-[10px] font-bold text-white px-1 leading-tight text-center hidden sm:block">
                  Trimester 3
                </span>
              </div>
            </div>

            {/* Labels below */}
            <div className="relative w-full h-6 mt-3 text-[11px] font-bold text-[#EDE0D0] font-mono opacity-60">
              <span className="absolute left-0 -translate-x-1/2">0</span>
              <span className="absolute left-[33.3%] -translate-x-1/2">
                Tri 1
              </span>
              <span className="absolute left-[66.6%] -translate-x-1/2">
                Tri 2
              </span>
              <span className="absolute right-0 translate-x-1/2">EDD</span>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-4 pt-6 border-t border-white/10 w-full flex-grow">
          <h4 className="text-xl font-bold font-heading text-white mb-6">
            Tanggal Penting & Tonggak Sejarah
          </h4>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex flex-col gap-1 border-l-2 border-[#4A7C59] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Trimester Pertama
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.tri1Start)} -{" "}
                {formatDate(result.milestones.tri1End)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#4A7C59] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Trimester Kedua
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.tri2Start)} -{" "}
                {formatDate(result.milestones.tri2End)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#4A7C59] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Trimester Ketiga
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.tri3Start)} -{" "}
                {formatDate(result.milestones.tri3End)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#C17A3A] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Tanggal Viabilitas
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.viability)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#7A5C42] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                USG Pertama (8-12 minggu)
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.firstUltrasoundStart)} -{" "}
                {formatDate(result.milestones.firstUltrasoundEnd)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#7A5C42] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Pindai Anatomi (18-22 mgg)
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.anatomyScanStart)} -{" "}
                {formatDate(result.milestones.anatomyScanEnd)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#7A5C42] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Tes Glukosa (24-28 minggu)
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.glucoseTestStart)} -{" "}
                {formatDate(result.milestones.glucoseTestEnd)}
              </span>
            </div>
            <div className="flex flex-col gap-1 border-l-2 border-[#9C4A2A] pl-3 py-1">
              <span className="text-xs text-[#EDE0D0] font-bold uppercase tracking-wider opacity-80">
                Kehamilan Penuh (37 minggu)
              </span>
              <span className="text-sm text-white font-medium">
                {formatDate(result.milestones.fullTerm)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
