"use client";

import React from "react";
import {
  Trash2,
  Activity,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BPContextType, TrendDirection } from "../types";
import { CATEGORY_META } from "../utils";
import { TREND_DIRECTION } from "@/lib/constants";

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

export const BloodPressureHistory: React.FC<{ hook: BPContextType }> = ({
  hook,
}) => {
  const { history, trend, deleteReading } = hook;

  if (history.length === 0) return null;

  return (
    <div className="bg-white border border-[#EDE0D0] rounded-[2.5rem] p-6 sm:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#4A7C59]" />
          <h2 className="text-xl font-bold font-heading text-primary">
            Riwayat Pengukuran
          </h2>
          <span className="text-xs bg-surface text-secondary px-2.5 py-1 rounded-full font-bold font-ui">
            {history.length} Entri
          </span>
        </div>
        {history.length >= 3 && <TrendBadge trend={trend} />}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-muted/30">
        <table className="w-full text-sm font-body min-w-[640px]">
          <thead>
            <tr className="border-b border-muted bg-surface/50">
              {[
                "Waktu",
                "Sistolik",
                "Diastolik",
                "BPM",
                "Posisi",
                "Kategori",
                "Aksi",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left py-4 px-4 text-[10px] font-black text-secondary uppercase tracking-[0.1em] font-ui"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {history.map((r) => {
              const m = CATEGORY_META[r.category];
              return (
                <tr
                  key={r.id}
                  className="hover:bg-surface/60 transition-colors group"
                >
                  <td className="py-4 px-4 text-secondary text-xs font-medium">
                    {r.datetime?.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="py-4 px-4 font-black text-primary font-heading text-lg">
                    {r.systolic}
                  </td>
                  <td className="py-4 px-4 font-black text-primary font-heading text-lg">
                    {r.diastolic}
                  </td>
                  <td className="py-4 px-4 text-secondary font-mono">
                    {r.heartRate ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                        {r.heartRate}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="py-4 px-4 text-secondary capitalize text-xs font-semibold">
                    {r.position ?? "—"}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full border shadow-sm transition-colors",
                        m.bg,
                        m.border,
                        m.color,
                      )}
                    >
                      {m.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => deleteReading(r.id)}
                      className="p-2 text-accent-3 hover:bg-accent-3/10 rounded-lg transition-colors group-hover:scale-110"
                      title="Hapus Pengukuran"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
