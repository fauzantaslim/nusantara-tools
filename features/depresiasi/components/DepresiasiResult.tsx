"use client";

import React, { useState, useMemo } from "react";
import { Card } from "@/ui/Card";
import { cn } from "@/lib/utils";
import { DepreciationResult, MonthRecord, YearRecord } from "../utils";
import {
  TrendingDown,
  Info,
  CheckCircle2,
  BookOpen,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type ViewMode = "year" | "month";

interface DepresiasiResultProps {
  result: DepreciationResult | null;
  cost: number;
  method: string;
  groupLabel: string;
  usefulLife: number;
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRupiahShort(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}Jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}Rb`;
  return String(value);
}

// Custom tooltip for the chart
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-[#1A0E07] border border-[#9C4A2A]/40 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-[#C17A3A] font-bold font-heading text-xs mb-2 uppercase tracking-wider">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 py-0.5">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[#EDE0D0]/70 text-xs font-body">
            {entry.dataKey === "depreciation" ? "Penyusutan" : "Nilai Buku"}:
          </span>
          <span className="text-white font-bold font-heading text-xs">
            {formatRupiah(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DepresiasiResult({
  result,
  cost,
  method,
  groupLabel,
}: DepresiasiResultProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("year");

  // Generate chart data
  const chartData = useMemo(() => {
    if (!result) return [];

    if (viewMode === "year") {
      return result.records.map((r: YearRecord) => ({
        label: r.label.replace("Tahun ", "T"),
        depreciation: r.depreciation,
        bookValue: r.bookValue,
      }));
    } else {
      // For monthly, show all records but we might need to thin for very long periods
      const records = result.monthlyRecords;
      if (records.length <= 60) {
        return records.map((r: MonthRecord) => ({
          label: r.label,
          depreciation: r.depreciation,
          bookValue: r.bookValue,
        }));
      }
      // For very long periods, show every 3rd month
      return records
        .filter(
          (_: MonthRecord, i: number) =>
            i % 3 === 0 || i === records.length - 1,
        )
        .map((r: MonthRecord) => ({
          label: r.label,
          depreciation: r.depreciation,
          bookValue: r.bookValue,
        }));
    }
  }, [result, viewMode]);

  if (!result) {
    // Empty state
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
            <TrendingDown className="w-16 h-16 text-[#9C4A2A]/40" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
            Menunggu Data
          </h3>
          <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed opacity-90">
            Isi formulir konfigurasi aset di samping untuk melihat jadwal
            penyusutan sesuai regulasi pajak.
          </p>
        </div>
      </Card>
    );
  }

  const maxDepreciation = Math.max(
    ...result.records.map((r) => r.depreciation),
  );

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
          <div className="px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2 bg-[#9C4A2A]/20 border-[#9C4A2A]/40 text-[#C17A3A]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Jadwal Penyusutan
          </div>
          <span className="text-[#EDE0D0] opacity-80 font-body text-sm mb-1">
            Penyusutan Per Tahun (
            {method === "straight_line" ? "Garis Lurus" : "Saldo Menurun"})
          </span>
          <div className="text-[2.5rem] sm:text-[3.5rem] font-black font-heading tracking-tight leading-none text-white mb-2">
            {formatRupiah(result.records[0]?.depreciation || 0)}
          </div>
          <span className="text-xs text-[#EDE0D0]/60 font-body">
            Aset terdepresiasi penuh dalam{" "}
            <strong className="text-white">
              {result.yearsToFullyDepreciate} tahun
            </strong>{" "}
            mulai{" "}
            <strong className="text-white">
              {formatStartDate(result.startDate)}
            </strong>
          </span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Nilai Perolehan
            </span>
            <span className="font-heading font-extrabold text-lg text-white">
              {formatRupiah(cost)}
            </span>
          </div>
          <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> Kelompok
            </span>
            <span className="font-heading font-extrabold text-lg text-white">
              {groupLabel}
            </span>
          </div>
          <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 flex flex-col gap-1">
            <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-widest flex items-center gap-1">
              <TrendingDown className="w-3 h-3" /> Total Penyusutan
            </span>
            <span className="font-heading font-extrabold text-lg text-white">
              {formatRupiah(result.totalDepreciation)}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-ui text-[#EDE0D0]/80 uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-[#C17A3A]" /> Grafik
              Penyusutan
            </h4>
            {/* Year/Month Toggle */}
            <div className="flex bg-[#1A0E07]/60 rounded-lg border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("year")}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold font-ui rounded-md transition-all cursor-pointer",
                  viewMode === "year"
                    ? "bg-[#9C4A2A] text-white shadow-sm"
                    : "text-[#EDE0D0]/60 hover:text-[#EDE0D0]",
                )}
              >
                Tahun
              </button>
              <button
                type="button"
                onClick={() => setViewMode("month")}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold font-ui rounded-md transition-all cursor-pointer",
                  viewMode === "month"
                    ? "bg-[#9C4A2A] text-white shadow-sm"
                    : "text-[#EDE0D0]/60 hover:text-[#EDE0D0]",
                )}
              >
                Bulan
              </button>
            </div>
          </div>

          <div className="bg-[#1A0E07]/40 rounded-2xl border border-white/10 p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="gradDepreciation"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#C17A3A" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#C17A3A"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradBookValue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#9C4A2A" stopOpacity={0.4} />
                    <stop
                      offset="100%"
                      stopColor="#9C4A2A"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="label"
                  tick={{
                    fill: "#EDE0D0",
                    fontSize: 10,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  interval={
                    viewMode === "month"
                      ? Math.max(0, Math.floor(chartData.length / 8) - 1)
                      : 0
                  }
                  angle={viewMode === "month" ? -45 : 0}
                  textAnchor={viewMode === "month" ? "end" : "middle"}
                  height={viewMode === "month" ? 60 : 30}
                />
                <YAxis
                  tick={{
                    fill: "#EDE0D0",
                    fontSize: 10,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  tickFormatter={formatRupiahShort}
                  width={55}
                />
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value: string) =>
                    value === "depreciation" ? "Penyusutan" : "Nilai Buku"
                  }
                  wrapperStyle={{
                    fontSize: 11,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bookValue"
                  stroke="#9C4A2A"
                  strokeWidth={2}
                  fill="url(#gradBookValue)"
                  name="bookValue"
                  dot={viewMode === "year"}
                  activeDot={{
                    r: 5,
                    fill: "#9C4A2A",
                    stroke: "#FFF0EB",
                    strokeWidth: 2,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="depreciation"
                  stroke="#C17A3A"
                  strokeWidth={2}
                  fill="url(#gradDepreciation)"
                  name="depreciation"
                  dot={viewMode === "year"}
                  activeDot={{
                    r: 5,
                    fill: "#C17A3A",
                    stroke: "#FFF0EB",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Depreciation Table */}
        <div className="flex flex-col gap-3 mt-2">
          <h4 className="text-sm font-bold font-ui text-[#EDE0D0]/80 uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#C17A3A]" />
            {viewMode === "year" ? "Rincian Per Tahun" : "Rincian Per Bulan"}
          </h4>
          <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-white/10 max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#1A0E07] border-b border-white/10">
                  <th className="text-left py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                    {viewMode === "year" ? "Tahun" : "Bulan"}
                  </th>
                  <th className="text-right py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                    Penyusutan
                  </th>
                  <th className="text-right py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui hidden sm:table-cell">
                    Akumulasi
                  </th>
                  <th className="text-right py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                    Nilai Buku
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewMode === "year"
                  ? result.records.map((row, i) => (
                      <tr
                        key={row.year}
                        className={cn(
                          "border-b border-white/5 transition-colors hover:bg-white/5",
                          i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]",
                        )}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-[#9C4A2A]/20 flex items-center justify-center text-xs font-black text-[#C17A3A]">
                              {row.year}
                            </span>
                            <span className="text-[#EDE0D0]/50 text-xs hidden sm:inline">
                              {row.label.match(/\((\d+)\)/)?.[1]}
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-heading font-bold text-white tabular-nums">
                          <div className="flex flex-col items-end gap-1">
                            <span>{formatRupiah(row.depreciation)}</span>
                            <div className="w-full max-w-[100px] h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#C17A3A] rounded-full transition-all"
                                style={{
                                  width: `${(row.depreciation / maxDepreciation) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 font-body text-[#EDE0D0]/70 tabular-nums hidden sm:table-cell">
                          {formatRupiah(row.accumulated)}
                        </td>
                        <td className="text-right py-3 px-4 font-heading font-bold tabular-nums">
                          <span
                            className={cn(
                              row.bookValue === 0
                                ? "text-[#C17A3A]"
                                : "text-white",
                            )}
                          >
                            {formatRupiah(row.bookValue)}
                          </span>
                        </td>
                      </tr>
                    ))
                  : result.monthlyRecords.map((row, i) => (
                      <tr
                        key={row.month}
                        className={cn(
                          "border-b border-white/5 transition-colors hover:bg-white/5",
                          i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]",
                        )}
                      >
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#C17A3A]/60" />
                            <span className="text-xs font-bold text-[#EDE0D0] font-heading">
                              {row.label}
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-2.5 px-4 font-heading font-bold text-white tabular-nums text-xs">
                          {formatRupiah(row.depreciation)}
                        </td>
                        <td className="text-right py-2.5 px-4 font-body text-[#EDE0D0]/70 tabular-nums text-xs hidden sm:table-cell">
                          {formatRupiah(row.accumulated)}
                        </td>
                        <td className="text-right py-2.5 px-4 font-heading font-bold tabular-nums text-xs">
                          <span
                            className={cn(
                              row.bookValue === 0
                                ? "text-[#C17A3A]"
                                : "text-white",
                            )}
                          >
                            {formatRupiah(row.bookValue)}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 rounded-2xl p-4 border bg-[#9C4A2A]/10 border-[#9C4A2A]/30 text-sm font-body leading-relaxed flex gap-3">
          <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#C17A3A]" />
          <p className="text-[#EDE0D0] opacity-90">
            Perhitungan bersifat estimasi berdasarkan ketentuan pajak Indonesia.
            Untuk keperluan pelaporan, konsultasikan dengan konsultan pajak atau
            rujuk panduan resmi DJP.
          </p>
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
}

function formatStartDate(dateStr: string): string {
  const MONTH_NAMES = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const [y, m] = dateStr.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${y}`;
}
