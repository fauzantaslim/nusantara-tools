"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CicilanResult as CicilanResultType, CicilanInput } from "../types";
import { formatRupiah } from "../utils";
import { cn } from "@/lib/utils";
import {
  TrendingDown,
  TrendingUp,
  Banknote,
  Calendar,
  BarChart3,
  Percent,
  AlertCircle,
} from "lucide-react";

interface CicilanResultProps {
  result: CicilanResultType;
  input: CicilanInput;
}

const StatCard = ({
  label,
  value,
  sub,
  highlight,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex flex-col gap-1.5 p-5 rounded-2xl border transition-all",
      highlight
        ? "bg-[#C17A3A] text-white border-[#C17A3A]/50 shadow-lg shadow-[#C17A3A]/20"
        : "bg-white/5 border-white/10 hover:border-white/20",
    )}
  >
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-bold uppercase tracking-wider",
        highlight ? "text-white/70" : "text-[#EDE0D0]/60",
      )}
    >
      {icon}
      {label}
    </div>
    <p
      className={cn(
        "text-xl sm:text-2xl font-black font-heading tracking-tight",
        highlight ? "text-white" : "text-[#F5EDE3]",
      )}
    >
      {value}
    </p>
    {sub && (
      <p
        className={cn(
          "text-xs font-body",
          highlight ? "text-white/60" : "text-[#EDE0D0]/50",
        )}
      >
        {sub}
      </p>
    )}
  </div>
);

export const CicilanResult: React.FC<CicilanResultProps> = ({
  result,
  input,
}) => {
  const interestRatio = (result.totalBunga / result.totalPembayaran) * 100;

  const insight =
    input.tenor <= 24
      ? {
          type: "short",
          label: "Tenor Pendek",
          icon: <TrendingDown className="w-4 h-4" />,
          desc: "Cicilan lebih besar, namun total bunga yang Anda bayar lebih sedikit. Pilihan hemat untuk jangka panjang.",
        }
      : input.tenor >= 60
        ? {
            type: "long",
            label: "Tenor Panjang",
            icon: <TrendingUp className="w-4 h-4" />,
            desc: "Cicilan lebih ringan tiap bulan, namun total bunga yang dibayar lebih besar. Cocok bila cash flow terbatas.",
          }
        : {
            type: "mid",
            label: "Tenor Menengah",
            icon: <BarChart3 className="w-4 h-4" />,
            desc: "Keseimbangan antara besaran cicilan bulanan dan total bunga yang dibayar.",
          };

  return (
    <Card
      variant="default"
      className="bg-[#2C1A0E] text-[#F5EDE3] border border-[#7A5C42]/40 shadow-2xl rounded-[2.5rem] relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Banknote className="w-5 h-5 text-[#C17A3A]" />
            Hasil Simulasi
          </h3>
          <p className="text-sm text-[#EDE0D0]/60 font-body mt-1">
            {input.vehicleType === "mobil"
              ? "🚗 Kendaraan Mobil"
              : "🏍️ Kendaraan Motor"}{" "}
            · {input.tenor} Bulan · Bunga {input.sukuBungaTahunan}%/thn
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Cicilan / Bulan"
            value={formatRupiah(result.cicilanBulanan)}
            sub={`selama ${input.tenor} bulan`}
            highlight
            icon={<Calendar className="w-3.5 h-3.5" />}
          />
          <StatCard
            label="Jumlah Pinjaman"
            value={formatRupiah(result.jumlahPinjaman)}
            sub={`DP ${input.uangMukaPercent}% = ${formatRupiah(result.uangMuka)}`}
            icon={<Banknote className="w-3.5 h-3.5" />}
          />
          <StatCard
            label="Total Pembayaran"
            value={formatRupiah(result.totalPembayaran)}
            sub="pokok + bunga"
            icon={<BarChart3 className="w-3.5 h-3.5" />}
          />
          <StatCard
            label="Total Bunga"
            value={formatRupiah(result.totalBunga)}
            sub={`${interestRatio.toFixed(1)}% dari total bayar`}
            icon={<Percent className="w-3.5 h-3.5" />}
          />
        </div>

        {/* Interest Bar Visual */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-[#EDE0D0]/60">
            <span>Pokok Pinjaman</span>
            <span>Bunga</span>
          </div>
          <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden flex">
            <div
              className="h-full bg-[#4A7C59] transition-all duration-700"
              style={{ width: `${100 - interestRatio}%` }}
            />
            <div
              className="h-full bg-[#C17A3A] transition-all duration-700"
              style={{ width: `${interestRatio}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#EDE0D0]/50 font-body">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4A7C59] inline-block" />
              {formatRupiah(result.jumlahPinjaman)} (
              {(100 - interestRatio).toFixed(1)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#C17A3A] inline-block" />
              {formatRupiah(result.totalBunga)} ({interestRatio.toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* Insight Chip */}
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-2xl border text-sm font-body",
            insight.type === "short"
              ? "bg-[#4A7C59]/10 border-[#4A7C59]/30 text-[#4A7C59]"
              : insight.type === "long"
                ? "bg-[#C17A3A]/10 border-[#C17A3A]/30 text-[#C17A3A]"
                : "bg-white/5 border-white/10 text-[#EDE0D0]/70",
          )}
        >
          <span className="shrink-0 mt-0.5">{insight.icon}</span>
          <div>
            <span className="font-bold">{insight.label}: </span>
            {insight.desc}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Amortization Table */}
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-base font-bold font-heading text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C17A3A]" />
              Jadwal Angsuran Bulanan
            </h4>
            <p className="text-xs text-[#EDE0D0]/50 font-body mt-0.5">
              Rincian porsi pokok dan bunga tiap bulan — {result.jadwal.length}{" "}
              angsuran total.
            </p>
          </div>

          {/* Scrollable table container */}
          <div className="rounded-xl border border-white/10 overflow-hidden">
            {/* Fixed header */}
            <table className="w-full text-xs text-left table-fixed">
              <thead className="bg-[#1A0E07] text-[#EDE0D0]">
                <tr>
                  <th className="px-3 py-3 font-bold font-ui w-14">Bulan</th>
                  <th className="px-3 py-3 font-bold font-ui text-right">
                    Cicilan
                  </th>
                  <th className="px-3 py-3 font-bold font-ui text-right">
                    Pokok
                  </th>
                  <th className="px-3 py-3 font-bold font-ui text-right">
                    Bunga
                  </th>
                  <th className="px-3 py-3 font-bold font-ui text-right">
                    Sisa
                  </th>
                </tr>
              </thead>
            </table>
            {/* Scrollable body */}
            <div style={{ maxHeight: "224px", overflowY: "auto" }}>
              <table className="w-full text-xs text-left table-fixed">
                <tbody className="divide-y divide-white/5">
                  {result.jadwal.map((row, idx) => (
                    <tr
                      key={row.bulan}
                      className={cn(
                        "transition-colors hover:bg-white/5",
                        idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.03]",
                      )}
                    >
                      <td className="px-3 py-2.5 font-bold text-[#EDE0D0] w-14">
                        {row.bulan}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#F5EDE3]">
                        {formatRupiah(row.cicilan)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#4A7C59]">
                        {formatRupiah(row.porsiPokok)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#C17A3A]">
                        {formatRupiah(row.porsiBunga)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#EDE0D0]/60">
                        {formatRupiah(row.sisaPinjaman)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/10">
          <AlertCircle className="w-4 h-4 text-[#EDE0D0]/40 shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#EDE0D0]/50 font-body leading-relaxed">
            Hasil kalkulator merupakan{" "}
            <strong className="text-[#EDE0D0]/70">estimasi simulasi</strong>.
            Nilai aktual dapat berbeda sesuai kebijakan leasing, biaya
            administrasi, provisi, asuransi, dan syarat pembiayaan lainnya.
          </p>
        </div>
      </div>
    </Card>
  );
};
