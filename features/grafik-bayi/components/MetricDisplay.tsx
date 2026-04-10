"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { MetricResult } from "../types";
import { CATEGORY_CONFIG } from "../utils";
import { AlertTriangle } from "lucide-react";

export function ZBar({ z }: { z: number }) {
  // Map z-score (-3 to +3) → 0-100%
  const clampedZ = Math.max(-3, Math.min(3, z));
  const pct = ((clampedZ + 3) / 6) * 100;
  return (
    <div className="w-full mt-2">
      <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-red-600 via-[#C17A3A] via-[#4A7C59] via-[#C17A3A] to-red-600">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md border-2 border-[#2C1A0E] transition-all duration-700"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between mt-0.5 text-[9px] text-[#EDE0D0] opacity-50 font-mono">
        <span>-3</span>
        <span>-2</span>
        <span>0</span>
        <span>+2</span>
        <span>+3</span>
      </div>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  unit,
  metric,
}: {
  label: string;
  value: number;
  unit: string;
  metric: MetricResult;
}) {
  const cfg = CATEGORY_CONFIG[metric.category];
  if (metric.outOfRange) {
    return (
      <div className="rounded-2xl border border-amber-500/40 bg-amber-900/20 p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider opacity-70">
            {label}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-900/20 text-amber-400">
            Nilai Tidak Realistis
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p className="text-xs font-body leading-relaxed">
            Nilai{" "}
            <strong>
              {value} {unit}
            </strong>{" "}
            tampak tidak realistis untuk usia ini. Periksa kembali input dan
            satuan pengukuran.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 flex flex-col gap-2",
        cfg.bg,
        cfg.border,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider opacity-70">
          {label}
        </span>
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
            cfg.bg,
            cfg.border,
            cfg.color,
          )}
        >
          {cfg.label}
        </span>
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-2xl font-black text-white font-heading">
          {value}
        </span>
        <span className="text-xs text-[#EDE0D0] opacity-60 pb-0.5">{unit}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-[#EDE0D0] opacity-80">
        <span>
          Z:{" "}
          <span className={cn("font-bold", cfg.color)}>
            {metric.zScore > 0 ? "+" : ""}
            {metric.zScore}
          </span>
        </span>
        <span>
          P: <span className="font-bold text-white">{metric.percentile}%</span>
        </span>
        <span className="opacity-50">
          Median: {metric.median} {unit}
        </span>
      </div>
      <ZBar z={metric.zScore} />
    </div>
  );
}
