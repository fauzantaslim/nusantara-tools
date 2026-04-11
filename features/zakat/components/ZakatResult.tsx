"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CheckCircle2, Info, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZakatContextType } from "../types";
import { formatRupiah } from "../utils";

export const ZakatResult: React.FC<{ hook: ZakatContextType }> = ({ hook }) => {
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
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center mb-6 mt-4">
            <div className="absolute inset-0 rounded-full border-2 border-[#C17A3A]/25 animate-pulse" />
            <Wallet className="w-16 h-16 text-[#C17A3A] opacity-50" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
            Menunggu Data
          </h3>
          <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed opacity-90">
            Isi formulir nilai penghasilan di samping untuk mengetahui besaran
            wajib zakat Anda sesuai BAZNAS.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset",
        result.isWajib
          ? "border-[#4A7C59]/60 ring-[#4A7C59]/20"
          : "border-[#EDE0D0] ring-transparent",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br pointer-events-none opacity-60",
          result.isWajib
            ? "from-[#4A7C59]/10 via-transparent to-transparent"
            : "from-[#1A0E07]/20 via-transparent to-transparent",
        )}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full">
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 flex items-center gap-2",
              result.isWajib
                ? "bg-[#4A7C59]/20 border-[#4A7C59]/40 text-[#4A7C59]"
                : "bg-[#1A0E07]/60 border-white/20 text-[#EDE0D0]",
            )}
          >
            {result.isWajib ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Info className="w-3.5 h-3.5" />
            )}
            {result.isWajib
              ? "Wajib Zakat (Mencapai Nisab)"
              : "Belum Wajib Zakat"}
          </div>

          <span className="text-[#EDE0D0] opacity-80 font-body text-sm mb-2">
            {result.isWajib
              ? "Kewajiban Zakat (2,5%) :"
              : "Pendapatan belum mencapai batas nisab"}
          </span>
          <div className="text-[3rem] sm:text-[4rem] font-black font-heading tracking-tight leading-none text-white overflow-x-auto w-full mb-8">
            {formatRupiah(result.zakatAmount)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-auto">
          <div className="bg-[#1A0E07]/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-2">
            <span className="text-xs font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" /> Total Pendapatan
            </span>
            <span className="font-heading font-extrabold text-xl text-white">
              {formatRupiah(result.totalIncome)}
            </span>
            <span className="text-[10px] text-[#EDE0D0] opacity-50 font-body uppercase">
              {data.mode === "monthly" ? "Per Bulan" : "Per Tahun"}
            </span>
          </div>
          <div className="bg-[#1A0E07]/60 rounded-2xl p-5 border border-white/10 flex flex-col gap-2">
            <span className="text-xs font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Batas Nisab BAZNAS
            </span>
            <span className="font-heading font-extrabold text-xl text-white">
              {formatRupiah(result.nisab)}
            </span>
            <span className="text-[10px] text-[#EDE0D0] opacity-50 font-body uppercase">
              {data.mode === "monthly" ? "Per Bulan" : "Per Tahun (2026)"}
            </span>
          </div>
        </div>

        <div
          className={cn(
            "mt-6 rounded-2xl p-4 border text-sm font-body leading-relaxed flex gap-3",
            result.isWajib
              ? "bg-[#C17A3A]/15 border-[#C17A3A]/30 text-[#F5EDE3]"
              : "bg-surface/5 border-white/10 text-[#EDE0D0] opacity-80",
          )}
        >
          <Info className="w-5 h-5 shrink-0 mt-0.5 opacity-80" />
          <p>
            {result.isWajib
              ? `Penghasilan bruto Anda telah melebihi ambang batas nisab saat ini sebesar ${formatRupiah(result.nisab)}. Anda diwajibkan menyisihkan 2,5% hak mustahik dari penghasilan yang diperoleh.`
              : `Karena penghasilan total Anda (${formatRupiah(result.totalIncome)}) masih di bawah ambang nisab BAZNAS (${formatRupiah(result.nisab)}), Anda tidak diwajibkan untuk menunaikan zakat profesi/penghasilan, namun sangat dianjurkan untuk memperbanyak infak/sedekah.`}
          </p>
        </div>
      </div>
    </Card>
  );
};
