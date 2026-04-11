"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Clock, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrayerContextType } from "../types";
import { formatPrayerTime } from "../utils";

export const PrayerResult: React.FC<{ hook: PrayerContextType }> = ({
  hook,
}) => {
  const { data, prayerTimes, countdown } = hook;

  const prayers = prayerTimes
    ? [
        {
          name: "Imsak",
          time: prayerTimes.imsak,
          color: "text-[#C17A3A]",
          isMain: false,
        },
        {
          name: "Subuh",
          time: prayerTimes.fajr,
          color: "text-[#E8F5E9]",
          isMain: true,
        },
        {
          name: "Syuruq",
          time: prayerTimes.sunrise,
          color: "text-[#EDE0D0] opacity-70",
          isMain: false,
        },
        {
          name: "Dzuhur",
          time: prayerTimes.dhuhr,
          color: "text-[#E8F5E9]",
          isMain: true,
        },
        {
          name: "Asar",
          time: prayerTimes.asr,
          color: "text-[#E8F5E9]",
          isMain: true,
        },
        {
          name: "Maghrib",
          time: prayerTimes.maghrib,
          color: "text-[#E8F5E9]",
          isMain: true,
        },
        {
          name: "Isya",
          time: prayerTimes.isha,
          color: "text-[#E8F5E9]",
          isMain: true,
        },
        {
          name: "Tengah Malam",
          time: prayerTimes.midnight,
          color: "text-[#EDE0D0] opacity-70",
          isMain: false,
        },
      ]
    : [];

  return (
    <div className="xl:col-span-8 h-full">
      <Card
        variant="default"
        className="flex flex-col relative overflow-hidden rounded-[3rem] border border-[#7A5C42]/40 shadow-2xl bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset ring-[#4A7C59]/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/15 via-transparent to-transparent pointer-events-none opacity-80" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full animate-in fade-in duration-700">
          {/* Top Banner */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-bold font-ui uppercase tracking-[0.2em] text-[#C17A3A]">
                <span className="w-2 h-2 rounded-full bg-[#C17A3A] animate-pulse"></span>
                Mode Akurat Adhan
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight line-clamp-1">
                {data.locationName}
              </h2>
              <div className="text-sm font-body text-[#EDE0D0] opacity-60 flex flex-wrap gap-x-4 gap-y-1">
                <span>Lat {parseFloat(data.lat || "0").toFixed(4)}°</span>
                <span>•</span>
                <span>Lng {parseFloat(data.lng || "0").toFixed(4)}°</span>
                <span>•</span>
                <span>{data.date}</span>
              </div>
            </div>

            {prayerTimes && countdown.countdownStr && (
              <div className="bg-[#1A0E07]/60 rounded-[2rem] p-5 sm:p-6 border border-white/10 flex flex-col items-center lg:items-end min-w-[240px] shadow-2xl backdrop-blur-md">
                <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-[0.15em] opacity-60 flex items-center gap-2 mb-2 font-ui">
                  <Clock className="w-3.5 h-3.5" /> Menuju{" "}
                  {countdown.nextPrayerName}
                </span>
                <span className="font-heading font-extrabold text-4xl sm:text-5xl text-[#4A7C59] tracking-tighter tabular-nums drop-shadow-lg">
                  {countdown.countdownStr}
                </span>
              </div>
            )}
          </div>

          {/* Grid Jadwal */}
          {prayerTimes ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
              {prayers.map((prayer) => (
                <div
                  key={prayer.name}
                  className={cn(
                    "p-5 rounded-[1.5rem] border transition-all duration-300 flex flex-col justify-between h-32 group",
                    prayer.isMain
                      ? "bg-[#4A7C59]/15 border-[#4A7C59]/20 hover:bg-[#4A7C59]/25"
                      : "bg-white/5 border-white/5 hover:bg-white/10",
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest font-ui",
                        prayer.color,
                      )}
                    >
                      {prayer.name}
                    </span>
                    {prayer.isMain && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] group-hover:scale-125 transition-transform" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-3xl font-black font-heading tracking-tight tabular-nums",
                      !prayer.isMain && "opacity-50 text-white/70",
                    )}
                  >
                    {formatPrayerTime(prayer.time, data.timeFormat)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center opacity-40 py-20 gap-4">
              <Clock className="w-16 h-16 animate-spin-slow" />
              <p className="font-medium font-ui tracking-wide">
                Parameter astronomi tidak akurat.
                <br />
                Gagal memuat jadwal.
              </p>
            </div>
          )}

          {/* Qibla Indicator */}
          {prayerTimes && (
            <div className="mt-auto bg-[#1A0E07]/60 rounded-3xl p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-sm">
              <div className="flex items-center gap-5 border-l-4 border-[#C17A3A] pl-6 h-full">
                <div className="w-12 h-12 rounded-2xl bg-[#C17A3A]/20 flex items-center justify-center shrink-0 shadow-inner group transition-all">
                  <Compass
                    className="w-6 h-6 text-[#C17A3A] transition-transform duration-700 ease-out"
                    style={{
                      transform: `rotate(${prayerTimes.qiblaDirection}deg)`,
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#EDE0D0] opacity-50 uppercase tracking-[0.2em] font-ui">
                    Arah Kiblat (Makkah)
                  </span>
                  <span className="font-heading font-black text-white text-xl sm:text-2xl mt-0.5">
                    {prayerTimes.qiblaDirection.toFixed(2)}°{" "}
                    <span className="text-sm font-medium opacity-60 ml-1 font-body">
                      dari Utara Sejati
                    </span>
                  </span>
                </div>
              </div>
              <div className="hidden sm:block h-10 w-px bg-white/10" />
              <div className="text-[11px] text-[#EDE0D0] opacity-50 font-body max-w-xs text-center sm:text-right leading-relaxed italic">
                Arah dihitung menggunakan rumus trigonometri bola geodesik
                lintasan terpendek.
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
