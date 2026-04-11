"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Moon, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { HijriContextType } from "../types";

export const HijriResult: React.FC<{ hook: HijriContextType }> = ({ hook }) => {
  const { result, todayHijri } = hook;

  return (
    <div className="w-full">
      <Card
        variant="default"
        className="flex flex-col relative overflow-hidden rounded-[2.5rem] border border-[#7A5C42]/40 shadow-2xl bg-[#2C1A0E] text-[#F5EDE3] w-full ring-4 ring-inset ring-[#C17A3A]/10 min-h-[350px]"
      >
        {/* Top Info Banner */}
        <div className="w-full bg-[#1A0E07]/60 py-3.5 px-6 border-b border-white/10 flex items-center justify-center gap-2 text-sm backdrop-blur-sm">
          <span className="opacity-70 font-ui text-xs">HARI INI BERJALAN:</span>{" "}
          <span className="font-bold text-[#E8F5E9] font-heading tracking-wide">
            {todayHijri || "..."}
          </span>{" "}
          🌙
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-[#C17A3A]/10 via-transparent to-transparent pointer-events-none opacity-80" />

        <div className="flex-grow flex flex-col justify-center items-center relative z-10 p-8 sm:p-12 text-center">
          {result ? (
            <div className="animate-in zoom-in-95 duration-500 w-full flex flex-col items-center">
              {/* DOW Badge */}
              <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#EDE0D0] mb-6 backdrop-blur-sm border border-white/5 font-ui">
                HARI {result.day}
              </div>

              {/* Super Title Display */}
              <h2
                className={cn(
                  "font-black font-heading tracking-tight text-white mb-4",
                  result.title.length > 20
                    ? "text-3xl sm:text-4xl lg:text-5xl"
                    : "text-4xl sm:text-5xl lg:text-6xl",
                )}
              >
                {result.title}
              </h2>

              <div className="text-lg sm:text-2xl text-[#C17A3A] font-medium font-body mb-8 opacity-90 flex items-center justify-center gap-3">
                <ArrowRightLeft className="w-5 h-5 opacity-50" />
                {result.sub}
              </div>

              {/* Event Highlighter */}
              {result.event ? (
                <div className="bg-gradient-to-r from-[#4A7C59] to-[#2E5E3D] px-6 py-4 rounded-2xl border border-white/20 shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-4 shadow-[#4A7C59]/20 w-full sm:w-auto transform hover:scale-[1.02] transition-transform">
                  <span className="text-4xl drop-shadow-md">
                    {result.event.emoji}
                  </span>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest font-ui">
                      HARI BESAR TERVALIDASI
                    </span>
                    <span className="text-white font-bold font-heading text-lg leading-tight uppercase">
                      {result.event.name}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-20"></div> /* spacer to prevent jank */
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center opacity-30 gap-6 mt-8 animate-pulse text-[#EDE0D0]">
              <div className="relative">
                <Moon className="w-20 h-20" />
                <div className="absolute inset-0 bg-white blur-[40px] rounded-full opacity-20" />
              </div>
              <p className="font-medium font-ui tracking-wide">
                Lengkapi input form untuk memulai konversi
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
