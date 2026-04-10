"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Info, Clock, GlassWater, Droplets } from "lucide-react";
import { WaterResult } from "../types";

export const AirResult: React.FC<{ result: WaterResult | null }> = ({
  result,
}) => {
  if (!result) {
    return (
      <Card
        variant="default"
        className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        ></div>

        <div className="relative z-10 w-full flex justify-center mt-4">
          <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-15" />
          <Image
            src="/air.svg"
            alt="Water Intake Calculator"
            width={280}
            height={200}
            className="w-full max-w-[200px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl opacity-90"
            priority
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          {/* Fallback */}
          <div className="w-32 h-32 rounded-full border-4 border-[#4A7C59]/20 flex items-center justify-center bg-[#4A7C59]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
            <Droplets className="w-12 h-12 text-[#4A7C59] opacity-60" />
          </div>
        </div>
        <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
          Kalkulator Siap Digunakan
        </h3>
        <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90 px-4">
          Lengkapi form parameter di samping untuk melihat perkiraan kebutuhan
          asupan air dan jadwal minum optimal Anda.
        </p>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#4A7C59]/30 border-[#4A7C59]/30 text-[#E8F5E9]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/20 via-transparent to-transparent pointer-events-none transition-colors" />

      <div className="relative z-10 flex flex-col items-center justify-between p-8 sm:p-10 h-full w-full">
        {/* Header & Main Target */}
        <div className="flex flex-col items-center w-full">
          <div className="w-16 h-16 rounded-[1.25rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-6 border border-[#4A7C59]/20">
            <GlassWater className="w-8 h-8 text-[#4A7C59]" />
          </div>

          <h3 className="text-xs font-bold text-[#4A7C59] tracking-widest uppercase mb-1 opacity-90 text-center bg-[#4A7C59]/10 px-3 py-1 rounded-full">
            Target Asupan Dasar Air Minum
          </h3>
          <div className="flex items-end justify-center gap-2 mt-4 mb-2">
            <div className="text-[4rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-center drop-shadow-md text-[#F5EDE3]">
              {result.convertedIntake}
            </div>
            <span className="text-lg sm:text-2xl font-bold pb-2 text-[#4A7C59] uppercase">
              {result.unitLabel}
            </span>
          </div>
          <p className="text-[#EDE0D0] text-sm opacity-80 text-center mb-8 font-body max-w-[280px]">
            Berdasarkan perhitungan berat badan, ini adalah minimal asupan dasar
            di hari yang normal tanpa aktivitas berat.
          </p>
        </div>

        {/* Qualitative / Conditional Information block */}
        <div className="w-full bg-[#1A0E07]/60 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-inner mb-6 space-y-3">
          <h4 className="flex items-center gap-2 font-bold font-heading text-sm text-[#F5EDE3]">
            <Info className="w-4 h-4 text-[#C17A3A]" />
            Saran Modifikasi Personal
          </h4>
          <ul className="space-y-3 text-xs font-body text-[#EDE0D0] opacity-90 leading-relaxed max-h-40 overflow-y-auto custom-scrollbar pr-2">
            {result.qualitativeTips.map((tip, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-[#4A7C59] shrink-0 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Hydration Schedule */}
        <div className="w-full mt-auto">
          <h4 className="flex items-center gap-2 font-bold font-heading text-sm text-[#F5EDE3] mb-4">
            <Clock className="w-4 h-4 text-[#4A7C59]" />
            Jadwal Minum Harian
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {result.schedule.map((item, id) => (
              <div
                key={id}
                className="bg-[#1A0E07] rounded-xl p-3 border border-white/5 shadow-inner hover:bg-[#4A7C59]/10 transition-colors group"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-[#E8F5E9] font-mono opacity-80">
                    {item.time}
                  </span>
                  <span className="text-[10px] bg-[#4A7C59]/20 text-[#4A7C59] px-1.5 rounded font-bold">
                    {item.percentage}%
                  </span>
                </div>
                <div className="text-sm font-black text-white font-heading mt-1">
                  {item.amount}{" "}
                  <span className="text-[10px] font-normal opacity-70 ml-0.5 uppercase">
                    {result.unitLabel}
                  </span>
                </div>
                <div className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5 line-clamp-1 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
