"use client";

import React from "react";
import { TrendingUp, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GrafikBayiContextType } from "../types";

export const GrafikBayiHistory: React.FC<{ hook: GrafikBayiContextType }> = ({
  hook,
}) => {
  const { history, deleteHistory } = hook;

  if (history.length === 0) return null;

  return (
    <div className="bg-white border border-[#EDE0D0] rounded-[2.5rem] p-6 sm:p-10 shadow-sm mt-12">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-[#4A7C59]" />
        <h2 className="text-xl font-bold font-heading text-primary">
          Riwayat Pengukuran
        </h2>
        <span className="text-xs bg-surface text-secondary px-2 py-1 rounded-full font-bold">
          {history.length} catatan
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[540px]">
          <thead>
            <tr className="border-b border-muted">
              <th className="text-left py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                Tanggal
              </th>
              <th className="text-left py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                Usia
              </th>
              <th className="text-right py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                BB (kg)
              </th>
              <th className="text-right py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                PB (cm)
              </th>
              <th className="text-right py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                LK (cm)
              </th>
              <th className="text-center py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                Z-BB
              </th>
              <th className="py-2 w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            {history.map((h) => (
              <tr key={h.id} className="hover:bg-surface/60 transition-colors">
                <td className="py-2.5 pr-4 text-primary font-medium">
                  {h.date}
                </td>
                <td className="py-2.5 pr-4 text-secondary">
                  {h.ageMonths} bln
                </td>
                <td className="py-2.5 pr-4 text-right font-mono">
                  {h.weight?.toFixed(1) ?? "—"}
                </td>
                <td className="py-2.5 pr-4 text-right font-mono">
                  {h.length?.toFixed(1) ?? "—"}
                </td>
                <td className="py-2.5 pr-4 text-right font-mono">
                  {h.headCirc?.toFixed(1) ?? "—"}
                </td>
                <td className="py-2.5 pr-4 text-center">
                  {h.weightZ !== undefined ? (
                    <span
                      className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        Math.abs(h.weightZ) <= 2
                          ? "bg-[#4A7C59]/10 text-[#4A7C59]"
                          : "bg-[#9C4A2A]/10 text-[#FF8A65]",
                      )}
                    >
                      {h.weightZ > 0 ? "+" : ""}
                      {h.weightZ}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="py-2.5">
                  <button
                    onClick={() => deleteHistory(h.id)}
                    className="p-1 text-accent-3 hover:text-accent-3/80 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
