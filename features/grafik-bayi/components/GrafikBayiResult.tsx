"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { Baby, Info, Save } from "lucide-react";
import { GrafikBayiContextType } from "../types";
import { MetricCard } from "./MetricDisplay";

export const GrafikBayiResult: React.FC<{ hook: GrafikBayiContextType }> = ({
  hook,
}) => {
  const { result, data, handleSave } = hook;

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
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative z-10 w-full flex justify-center mt-4">
            <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
            <Image
              src="/bayi.svg"
              alt="Grafik Bayi Illustration"
              width={400}
              height={300}
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
              priority
            />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
            Siap Dipantau
          </h3>
          <p className="text-[#EDE0D0] font-body max-w-[260px] text-base leading-relaxed opacity-90">
            Isi data bayi dan hasil pengukuran di samping untuk melihat Z-score
            dan persentil pertumbuhan.
          </p>
          <div className="flex gap-2 mt-6 flex-wrap justify-center">
            {["Berat Badan", "Panjang Badan", "Lingkar Kepala"].map((t) => (
              <span
                key={t}
                className="text-xs bg-[#4A7C59]/15 text-[#4A7C59] px-3 py-1.5 rounded-full font-bold border border-[#4A7C59]/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#4A7C59]/25 border-[#4A7C59]/25 text-[#E8F5E9] h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/15 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4A7C59] tracking-widest uppercase opacity-80">
              Standar WHO ·{" "}
              {result.gender === "male" ? "Laki-laki" : "Perempuan"}
            </span>
            <h3 className="text-lg font-extrabold font-heading text-white mt-0.5">
              Hasil Analisis Pertumbuhan
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-[#4A7C59]/20 flex items-center justify-center shadow-inner">
            <Baby className="w-5 h-5 text-[#4A7C59]" />
          </div>
        </div>

        {/* Age info */}
        <div className="bg-[#1A0E07]/60 rounded-2xl px-4 py-3 border border-white/10 flex flex-wrap gap-4 shadow-inner">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-wider">
              Usia Kronologis
            </span>
            <span className="text-base font-black text-white font-heading">
              {result.ageMonths} bulan
            </span>
          </div>
          {result.correctedAgeMonths !== null && (
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#C17A3A] opacity-90 uppercase tracking-wider">
                Usia Terkoreksi (Prematur)
              </span>
              <span className="text-base font-black text-[#C17A3A] font-heading">
                {result.correctedAgeMonths} bulan
              </span>
            </div>
          )}
        </div>

        {/* Metrics */}
        <div className="flex flex-col gap-3 flex-1">
          {result.weight && (
            <MetricCard
              label="Berat Badan"
              value={Number(data.weightRaw)}
              unit={data.weightUnit}
              metric={result.weight}
            />
          )}
          {result.length && (
            <MetricCard
              label="Panjang / Tinggi Badan"
              value={Number(data.lengthRaw)}
              unit={data.lengthUnit}
              metric={result.length}
            />
          )}
          {result.headCirc && (
            <MetricCard
              label="Lingkar Kepala"
              value={Number(data.headRaw)}
              unit={data.lengthUnit}
              metric={result.headCirc}
            />
          )}
        </div>

        {/* Legend */}
        <div className="bg-[#1A0E07]/60 rounded-2xl px-4 py-3 border border-white/5 flex items-start gap-2 shadow-inner">
          <Info className="w-4 h-4 text-[#C17A3A] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#EDE0D0] font-body leading-relaxed opacity-90">
            <strong>Z-score 0</strong> = rata-rata WHO. Rentang{" "}
            <strong>-2 s/d +2</strong> dikategorikan{" "}
            <span className="text-[#4A7C59] font-bold">Normal</span>. Satu kali
            pengukuran tidak cukup untuk diagnosis—pantau tren dari waktu ke
            waktu.
          </p>
        </div>

        {/* Save btn */}
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-[#4A7C59]/40 bg-[#4A7C59]/10 hover:bg-[#4A7C59]/20 text-[#4A7C59] font-bold text-sm transition-all"
        >
          <Save className="w-4 h-4" /> Simpan Pengukuran Ini
        </button>
      </div>
    </Card>
  );
};
