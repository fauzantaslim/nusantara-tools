"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { PernikahanResult as IPernikahanResult } from "../types";
import { formatIDR } from "../utils";
import { cn } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Heart,
  Users,
  TrendingUp,
  AlertTriangle,
  Star,
  Layers,
  Banknote,
} from "lucide-react";

interface PernikahanResultProps {
  result: IPernikahanResult;
}

const StatRow: React.FC<{
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: boolean;
  highlight?: boolean;
  danger?: boolean;
}> = ({ label, value, icon: Icon, accent, highlight, danger }) => (
  <div
    className={cn(
      "flex justify-between items-center py-3",
      highlight && !danger ? "bg-[#9C4A2A]/10 -mx-3 px-3 rounded-xl" : "",
      danger ? "bg-red-900/20 -mx-3 px-3 rounded-xl" : "",
    )}
  >
    <span className="flex items-center gap-2 font-body text-sm text-[#EDE0D0]/80">
      <Icon
        className={cn(
          "w-4 h-4 shrink-0",
          accent
            ? "text-[#C17A3A]"
            : danger
              ? "text-red-400"
              : "text-[#EDE0D0]/50",
        )}
      />
      {label}
    </span>
    <span
      className={cn(
        "font-bold tabular-nums",
        accent ? "text-[#C17A3A] text-base" : "",
        danger ? "text-red-400 text-base" : "",
        !accent && !danger ? "text-white text-sm" : "",
      )}
    >
      {value}
    </span>
  </div>
);

// Custom Tooltip for Recharts
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-[#1A0E07] border border-[#7A5C42]/50 rounded-2xl px-4 py-3 shadow-2xl">
        <p
          className="text-xs font-bold uppercase tracking-wider mb-1"
          style={{ color: item.payload.color }}
        >
          {item.name}
        </p>
        <p className="text-white font-bold text-sm">{formatIDR(item.value)}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({
  payload,
}: {
  payload?: Array<{ value: string; color: string }>;
}) => (
  <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center mt-3">
    {(payload ?? []).map((entry) => (
      <span
        key={entry.value}
        className="flex items-center gap-1.5 text-[10px] text-[#EDE0D0]/70 font-body"
      >
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: entry.color }}
        />
        {entry.value}
      </span>
    ))}
  </div>
);

export const PernikahanResult: React.FC<PernikahanResultProps> = ({
  result,
}) => {
  const chartData = result.categoryAllocations
    .filter((c) => c.amount > 0)
    .map((c) => ({
      name: c.name,
      value: c.amount,
      color: c.color,
    }));

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3]",
        result.overBudget
          ? "ring-4 ring-inset ring-red-500/30 border-red-500/30"
          : "ring-4 ring-inset ring-[#9C4A2A]/20 border-[#9C4A2A]/30",
      )}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-white/10 flex items-center justify-center shadow-inner shrink-0">
              <Heart className="w-6 h-6 text-[#9C4A2A]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Rencana Anggaran
              </h2>
              <p className="text-[#EDE0D0]/50 font-body text-xs mt-0.5">
                Estimasi alokasi biaya pernikahan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Over Budget Warning */}
        {result.overBudget && (
          <div className="flex items-center gap-3 bg-red-900/30 border border-red-500/30 rounded-2xl px-4 py-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-red-300 text-sm font-bold font-body">
              Total alokasi melebihi anggaran! Kurangi persentase atau jumlah
              kategori.
            </p>
          </div>
        )}

        {/* Hero metric: Biaya Per Tamu */}
        <div className="p-5 md:p-6 bg-[#1A0E07] rounded-3xl border border-[#9C4A2A]/30 flex flex-col items-center justify-center text-center">
          <p className="text-[#EDE0D0]/50 text-xs uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
            <Users className="w-4 h-4 text-[#C17A3A]" /> Rata-rata Biaya Per
            Tamu
          </p>
          <p className="text-3xl sm:text-4xl font-black font-heading text-[#C17A3A] tabular-nums leading-none mb-1">
            {formatIDR(result.costPerGuest)}
          </p>
          <p className="text-xs text-[#EDE0D0]/40 font-body mt-1">per orang</p>
        </div>

        {/* Stats */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6">
          <div className="divide-y divide-white/5">
            <StatRow
              label="Total Anggaran"
              value={formatIDR(
                result.totalAllocated + result.unallocated < 0
                  ? 0
                  : result.totalAllocated + result.unallocated,
              )}
              icon={Banknote}
            />
            <StatRow
              label="Total Teralokasi"
              value={formatIDR(result.totalAllocated)}
              icon={TrendingUp}
              accent
              highlight
            />
            <StatRow
              label={
                result.unallocated < 0
                  ? "Melebihi Anggaran"
                  : "Sisa Tidak Teralokasi"
              }
              value={formatIDR(Math.abs(result.unallocated))}
              icon={Layers}
              danger={result.unallocated < 0}
            />
          </div>
        </div>

        {/* Planning Insight */}
        {result.topCategory && (
          <div className="flex items-start gap-3 bg-[#C17A3A]/10 border border-[#C17A3A]/30 rounded-2xl px-4 py-3">
            <Star className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#C17A3A] text-xs font-bold uppercase tracking-wider mb-0.5">
                Kategori Terbesar
              </p>
              <p className="text-[#EDE0D0] text-sm font-body">
                <strong className="text-white">
                  {result.topCategory.name}
                </strong>{" "}
                mengambil porsi terbesar:{" "}
                <strong className="text-[#C17A3A]">
                  {formatIDR(result.topCategory.amount)}
                </strong>
              </p>
            </div>
          </div>
        )}

        {/* Pie Chart */}
        {chartData.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#EDE0D0]/50 text-center mb-3">
              Distribusi Pengeluaran
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-[#EDE0D0]/40 text-xs font-body italic leading-relaxed mt-auto">
          * Anggaran pernikahan bersifat estimasi dan dapat bervariasi
          tergantung vendor dan lokasi.
        </p>
      </div>
    </Card>
  );
};
