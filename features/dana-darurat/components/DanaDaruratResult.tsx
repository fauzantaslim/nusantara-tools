"use client";

import React, { useMemo } from "react";
import {
  DanaDaruratResult as IDanaDaruratResult,
  ChartDataPoint,
} from "../types";
import { Card } from "@/ui/Card";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ShieldCheck,
  Target,
  AlertTriangle,
  Clock,
  Info,
  CheckCircle2,
  TrendingUp,
  Wallet,
  Calendar,
} from "lucide-react";

interface DanaDaruratResultProps {
  result: IDanaDaruratResult | null;
}

function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatIDRShort(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}Jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}Rb`;
  return String(value);
}

const formatMonth = (monthNum: number) => `Bulan ${monthNum}`;

// Custom tooltip for the chart
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const data = payload[0].payload;

  return (
    <div className="bg-[#1A0E07] border border-[#9C4A2A]/40 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-[#C17A3A] font-bold font-heading text-xs mb-2 uppercase tracking-wider">
        {formatMonth(data.month)}
      </p>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4A7C59] shrink-0" />
          <span className="text-[#EDE0D0]/70 text-xs font-body">Saldo:</span>
          <span className="text-white font-bold font-heading text-xs">
            {formatIDR(data.balance)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#9C4A2A] shrink-0" />
          <span className="text-[#EDE0D0]/70 text-xs font-body">Target:</span>
          <span className="text-white font-bold font-heading text-xs">
            {formatIDR(data.target)}
          </span>
        </div>
      </div>
    </div>
  );
}

export const DanaDaruratResult: React.FC<DanaDaruratResultProps> = ({
  result,
}) => {
  const isGoalReached = result?.isGoalReached ?? false;
  const isWarningMode = result
    ? result.currentProgressAmount < result.totalMonthlyExpense * 1.5
    : false;

  const chartData = useMemo(() => {
    if (!result || !result.projectionChart) return [];
    return result.projectionChart;
  }, [result]);

  if (!result || !result.isCalculated) {
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
            <div className="absolute inset-0 rounded-full border-2 border-[#9C4A2A]/25 animate-pulse" />
            <ShieldCheck className="w-16 h-16 text-[#9C4A2A]/40" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
            Menunggu Analisis
          </h3>
          <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed opacity-90">
            Isi formulir simulasi dana darurat di samping untuk melihat hasil
            analisis keamanan finansial Anda.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset border-[#9C4A2A]/40 ring-[#9C4A2A]/20",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#9C4A2A]/10 via-transparent to-transparent pointer-events-none opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full gap-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2",
              isGoalReached
                ? "bg-[#4A7C59]/20 border-[#4A7C59]/40 text-[#4A7C59]"
                : "bg-[#9C4A2A]/20 border-[#9C4A2A]/40 text-[#C17A3A]",
            )}
          >
            {isGoalReached ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <Target className="w-3.5 h-3.5" />
            )}
            {Math.floor(result.progressPercentage)}% Siap Finansial
          </div>
          <span className="text-[#EDE0D0] opacity-80 font-body text-sm mb-1">
            Rekomendasi Target Dana Darurat
          </span>
          <div className="text-[2.5rem] sm:text-[3.5rem] font-black font-heading tracking-tight leading-none text-white mb-2">
            {formatIDR(result.recommendedTarget)}
          </div>
          <span className="text-xs text-[#EDE0D0]/60 font-body">
            Berdasarkan pengeluaran{" "}
            <strong className="text-white">
              {formatIDR(result.totalMonthlyExpense)}
            </strong>{" "}
            per bulan
          </span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1">
              <Wallet className="w-3 h-3" /> Tabungan Saat Ini
            </span>
            <span
              className={cn(
                "font-heading font-extrabold text-lg",
                isGoalReached ? "text-[#4A7C59]" : "text-white",
              )}
            >
              {formatIDR(result.currentProgressAmount)}
            </span>
          </div>
          <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1">
              <Target className="w-3 h-3" /> Target Dasar
            </span>
            <span className="font-heading font-extrabold text-lg text-white">
              {formatIDR(result.baseTarget)}
            </span>
          </div>
          <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1">
              <Clock className="w-3 h-3" /> Estimasi Waktu
            </span>
            <span className="font-heading font-extrabold text-lg text-white">
              {result.monthsToGoal === -1
                ? "-"
                : `${result.monthsToGoal} Bulan`}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-ui text-[#EDE0D0]/80 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#C17A3A]" /> Proyeksi
              Pencapaian
            </h4>
          </div>

          <div className="bg-[#1A0E07]/40 rounded-2xl border border-white/10 p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{
                    fill: "#EDE0D0",
                    fontSize: 10,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  tickFormatter={formatMonth}
                />
                <YAxis
                  tick={{
                    fill: "#EDE0D0",
                    fontSize: 10,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  tickFormatter={formatIDRShort}
                  width={55}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="balance" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isFilled ? "#4A7C59" : "#9C4A2A"}
                      opacity={0.8}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-[#EDE0D0]/40 mt-4 text-center italic">
              *Proyeksi menyertakan asumsi bunga majemuk dan koreksi inflasi per
              bulan secara linear.
            </p>
          </div>
        </div>

        {/* Details Table */}
        {!isGoalReached && result.monthsToGoal !== -1 && (
          <div className="flex flex-col gap-3 mt-2">
            <h4 className="text-sm font-bold font-ui text-[#EDE0D0]/80 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C17A3A]" /> Rincian
              Pertumbuhan
            </h4>
            <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-white/10 max-h-[300px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#1A0E07] border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                      Bulan
                    </th>
                    <th className="text-right py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                      Estimasi Saldo
                    </th>
                    <th className="text-right py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                      Target
                    </th>
                    <th className="text-right py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((row, i) => (
                    <tr
                      key={row.month}
                      className={cn(
                        "border-b border-white/5 transition-colors hover:bg-white/5",
                        i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]",
                      )}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-[#9C4A2A]/20 flex items-center justify-center text-[10px] font-black text-[#C17A3A]">
                            {row.month}
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-3 px-4 font-heading font-bold text-white tabular-nums">
                        {formatIDR(row.balance)}
                      </td>
                      <td className="text-right py-3 px-4 font-body text-[#EDE0D0]/70 tabular-nums">
                        {formatIDR(row.target)}
                      </td>
                      <td className="text-right py-3 px-4 font-heading font-bold tabular-nums">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] uppercase tracking-tighter",
                            row.isFilled
                              ? "bg-[#4A7C59]/20 text-[#4A7C59]"
                              : "bg-[#9C4A2A]/20 text-[#C17A3A]",
                          )}
                        >
                          {row.isFilled ? "Tercapai" : "Proses"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Goal Reached state */}
        {isGoalReached && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#4A7C59]/10 rounded-[2rem] border border-[#4A7C59]/30 mt-2">
            <div className="w-16 h-16 rounded-full bg-[#4A7C59]/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#4A7C59]" />
            </div>
            <h4 className="text-xl font-bold text-white font-heading">
              Target Tercapai!
            </h4>
            <p className="text-sm text-[#EDE0D0]/80 mt-2 max-w-md">
              Luar biasa! Dana darurat Anda saat ini sudah mencukupi target
              keamanan finansial yang direkomendasikan. Jaga terus kedisiplinan
              ini.
            </p>
          </div>
        )}

        {/* No contribution state */}
        {!isGoalReached && result.monthsToGoal === -1 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[#9C4A2A]/10 rounded-[2rem] border border-[#9C4A2A]/30 mt-2">
            <div className="w-16 h-16 rounded-full bg-[#9C4A2A]/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-[#C17A3A]" />
            </div>
            <h4 className="text-xl font-bold text-white font-heading">
              Alokasi Belum Diset
            </h4>
            <p className="text-sm text-[#EDE0D0]/80 mt-2 max-w-md">
              Anda belum menentukan target menabung bulanan. Kami memerlukan
              angka ini untuk mensimulasikan kapan target dana darurat Anda akan
              tercapai.
            </p>
          </div>
        )}

        {/* Recommendation / Advice */}
        <div className="mt-4 rounded-2xl p-5 border bg-[#9C4A2A]/10 border-[#9C4A2A]/30 text-sm font-body leading-relaxed flex gap-4">
          <Info className="w-6 h-6 shrink-0 mt-0.5 text-[#C17A3A]" />
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Rekomendasi
            </h4>
            <p className="text-[#EDE0D0] opacity-90">
              Simpan Dana Darurat Anda di instrumen likuid seperti Reksa Dana
              Pasar Uang atau Tabungan Digital berimbal hasil tinggi. Pastikan
              dana mudah diakses (cair dalam 1-2 hari) namun terpisah dari
              rekening operasional harian.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 74, 42, 0.4);
          border-radius: 4px;
        }
      `}</style>
    </Card>
  );
};
