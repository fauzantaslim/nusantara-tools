"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import {
  HeartPulse,
  TrendingDown,
  TrendingUp,
  Minus,
  Save,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BPContextType, TrendDirection } from "../types";
import { CATEGORY_META, systolicToPercent } from "../utils";
import { TREND_DIRECTION } from "@/lib/constants";

// ─── Scale component ──────────────────────────────────────────────────────────
const SCALE_BANDS: {
  label: string;
  from: number;
  to: number;
  color: string;
}[] = [
  { label: "Rendah", from: 0, to: 12.3, color: "bg-blue-600/60" }, // <90
  { label: "Normal", from: 12.3, to: 38.5, color: "bg-[#4A7C59]/80" }, // 90–120
  { label: "Elevated", from: 38.5, to: 46.2, color: "bg-[#C17A3A]/80" }, // 120–129
  { label: "H.1", from: 46.2, to: 53.8, color: "bg-orange-600/80" }, // 130–139
  { label: "H.2", from: 53.8, to: 84.6, color: "bg-red-600/80" }, // 140–180
  { label: "Krisis", from: 84.6, to: 100, color: "bg-red-900/90" }, // 180+
];

function BPScale({ systolic }: { systolic?: number }) {
  const pct = systolic !== undefined ? systolicToPercent(systolic) : null;
  return (
    <div className="w-full">
      <div className="flex h-5 rounded-full overflow-hidden w-full relative shadow-inner">
        {SCALE_BANDS.map((b) => (
          <div
            key={b.label}
            className={cn("h-full", b.color)}
            style={{ width: `${b.to - b.from}%` }}
          />
        ))}
        {pct !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-[#2C1A0E] transition-all duration-700 z-10"
            style={{ left: `calc(${pct}% - 8px)` }}
          />
        )}
      </div>
      <div className="flex justify-between mt-1 text-[9px] text-[#EDE0D0] opacity-50 font-mono select-none">
        <span>70</span>
        <span>90</span>
        <span>120</span>
        <span>130</span>
        <span>140</span>
        <span>180</span>
        <span>200+</span>
      </div>
      <div className="flex mt-0.5" style={{ gap: 0 }}>
        {SCALE_BANDS.map((b) => (
          <div
            key={b.label}
            className="text-[8px] text-[#EDE0D0] opacity-40 text-center truncate"
            style={{ width: `${b.to - b.from}%` }}
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trend icon ───────────────────────────────────────────────────────────────
function TrendBadge({ trend }: { trend: TrendDirection }) {
  if (trend === TREND_DIRECTION.INSUFFICIENT) return null;
  const cfg = {
    [TREND_DIRECTION.IMPROVING]: {
      icon: TrendingDown,
      label: "Membaik 📉",
      color: "text-[#4A7C59]",
      bg: "bg-[#4A7C59]/15",
      border: "border-[#4A7C59]/30",
    },
    [TREND_DIRECTION.WORSENING]: {
      icon: TrendingUp,
      label: "Memburuk 📈",
      color: "text-[#9C4A2A]",
      bg: "bg-[#9C4A2A]/15",
      border: "border-[#9C4A2A]/30",
    },
    [TREND_DIRECTION.STABLE]: {
      icon: Minus,
      label: "Stabil",
      color: "text-[#C17A3A]",
      bg: "bg-[#C17A3A]/15",
      border: "border-[#C17A3A]/30",
    },
  }[trend as Exclude<TrendDirection, "insufficient">];

  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold font-ui",
        cfg.bg,
        cfg.border,
        cfg.color,
      )}
    >
      <Icon className="w-3 h-3" /> Tren: {cfg.label}
    </span>
  );
}

export const BloodPressureResult: React.FC<{ hook: BPContextType }> = ({
  hook,
}) => {
  const { result, history, trend, handleSave } = hook;
  const meta = result ? CATEGORY_META[result.category] : null;

  if (!result || !meta) {
    return (
      <Card
        variant="default"
        className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-[#F5EDE3]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative z-10 w-full flex justify-center mt-4">
            <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
            <Image
              src="/tekanan-darah.svg"
              alt="Tekanan Darah Illustration"
              width={400}
              height={300}
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
            Siap Dianalisis
          </h3>
          <p className="text-[#EDE0D0] font-body max-w-[260px] text-base leading-relaxed opacity-90">
            Masukkan nilai tekanan sistolik dan diastolik untuk mendapatkan
            analisis kategori dan rekomendasi jantung.
          </p>
          <div className="mt-6 w-full px-4">
            <BPScale />
          </div>
          <div className="flex gap-2 mt-5 flex-wrap justify-center font-ui">
            {["Normal", "Elevated", "Hipert.1", "Hipert.2", "Krisis"].map(
              (t) => (
                <span
                  key={t}
                  className="text-xs bg-white/5 text-[#EDE0D0] px-2.5 py-1 rounded-full font-bold border border-white/10 opacity-70"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset transition-colors duration-500",
        meta.border,
        meta.ringColor,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br via-transparent to-transparent pointer-events-none opacity-60 transition-opacity duration-700",
          meta.gradient,
        )}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5 h-full">
        {/* Crisis warning banner */}
        {result.isUrgent && (
          <div className="bg-red-500/20 border border-red-500/60 rounded-2xl px-4 py-3 flex items-center gap-3 animate-pulse">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-sm font-bold text-red-300 font-ui">
              Segera cari pertolongan medis!
            </span>
          </div>
        )}

        {/* Category badge & reading */}
        <div className="flex flex-col items-center text-center pt-2">
          <span
            className={cn(
              "text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border mb-3 font-ui transition-colors",
              meta.bg,
              meta.border,
              meta.color,
            )}
          >
            {result.label}
          </span>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-[4.5rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-white">
              {result.systolic}
            </span>
            <span className="text-2xl font-light text-[#EDE0D0] pb-3 opacity-60">
              /
            </span>
            <span className="text-[4.5rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-white">
              {result.diastolic}
            </span>
            <span className="text-base font-bold text-[#EDE0D0] pb-3 opacity-60 font-heading uppercase">
              mmHg
            </span>
          </div>
          {result.heartRate && (
            <div className="flex items-center gap-1.5 mt-1 text-sm text-[#EDE0D0] opacity-70 font-ui font-medium">
              <HeartPulse className="w-4 h-4 text-red-400" />
              {result.heartRate} bpm
            </div>
          )}
          {history.length >= 3 && (
            <div className="mt-3">
              <TrendBadge trend={trend} />
            </div>
          )}
        </div>

        {/* BP Scale */}
        <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner">
          <p className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-wider mb-3 font-ui">
            Posisi pada Skala Klinik
          </p>
          <BPScale systolic={result.systolic} />
        </div>

        {/* Description */}
        <div
          className={cn(
            "rounded-2xl p-4 border flex gap-3 transition-colors",
            meta.bg,
            meta.border,
          )}
        >
          <Info className={cn("w-5 h-5 shrink-0 mt-0.5", meta.color)} />
          <p className={cn("text-sm font-body leading-relaxed", meta.color)}>
            {result.description}
          </p>
        </div>

        {/* Recommendation */}
        <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner flex-1">
          <p className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-ui">
            <CheckCircle2 className="w-3.5 h-3.5" /> Rekomendasi Medis
          </p>
          <p className="text-sm text-[#EDE0D0] font-body leading-relaxed">
            {result.recommendation}
          </p>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border border-[#C17A3A]/40 bg-[#C17A3A]/15 hover:bg-[#C17A3A]/25 text-white font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/50 font-ui shadow-lg group active:scale-95"
        >
          <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />{" "}
          Tambahkan ke Riwayat Pengukuran
        </button>
      </div>
    </Card>
  );
};
