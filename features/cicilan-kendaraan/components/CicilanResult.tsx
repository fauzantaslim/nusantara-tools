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
        ? "bg-[#9C4A2A] text-white border-[#9C4A2A] shadow-lg"
        : "bg-white border-[#EDE0D0] hover:border-[#9C4A2A]/30",
    )}
  >
    <div
      className={cn(
        "flex items-center gap-2 text-xs font-bold uppercase tracking-wider",
        highlight ? "text-white/70" : "text-secondary",
      )}
    >
      {icon}
      {label}
    </div>
    <p
      className={cn(
        "text-xl sm:text-2xl font-black font-heading tracking-tight",
        highlight ? "text-white" : "text-primary",
      )}
    >
      {value}
    </p>
    {sub && (
      <p
        className={cn(
          "text-xs font-body",
          highlight ? "text-white/60" : "text-secondary",
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
      className="p-6 sm:p-8 border border-[#EDE0D0] shadow-xl rounded-[2.5rem] bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#9C4A2A]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
            <Banknote className="w-5 h-5 text-[#9C4A2A]" />
            Hasil Simulasi
          </h3>
          <p className="text-sm text-secondary font-body mt-1">
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
          <div className="flex justify-between text-xs font-bold text-secondary">
            <span>Pokok Pinjaman</span>
            <span>Bunga</span>
          </div>
          <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
            <div
              className="h-full bg-[#4A7C59] transition-all duration-700"
              style={{ width: `${100 - interestRatio}%` }}
            />
            <div
              className="h-full bg-[#9C4A2A] transition-all duration-700"
              style={{ width: `${interestRatio}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-secondary font-body">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4A7C59] inline-block" />
              {formatRupiah(result.jumlahPinjaman)} (
              {(100 - interestRatio).toFixed(1)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#9C4A2A] inline-block" />
              {formatRupiah(result.totalBunga)} ({interestRatio.toFixed(1)}%)
            </span>
          </div>
        </div>

        {/* Insight Chip */}
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-2xl border text-sm font-body",
            insight.type === "short"
              ? "bg-[#4A7C59]/8 border-[#4A7C59]/20 text-[#4A7C59]"
              : insight.type === "long"
                ? "bg-[#C17A3A]/8 border-[#C17A3A]/20 text-[#9C4A2A]"
                : "bg-surface border-muted text-secondary",
          )}
        >
          <span className="shrink-0 mt-0.5">{insight.icon}</span>
          <div>
            <span className="font-bold">{insight.label}: </span>
            {insight.desc}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-muted" />

        {/* Amortization Table */}
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="text-base font-bold font-heading text-primary flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#9C4A2A]" />
              Jadwal Angsuran Bulanan
            </h4>
            <p className="text-xs text-secondary font-body mt-0.5">
              Rincian porsi pokok dan bunga tiap bulan — {result.jadwal.length}{" "}
              angsuran total.
            </p>
          </div>

          {/* Scrollable table container */}
          <div className="rounded-xl border border-muted overflow-hidden">
            {/* Sticky header — sits outside scroll */}
            <table className="w-full text-xs text-left table-fixed">
              <thead className="bg-[#2C1A0E] text-[#F5EDE3]">
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
            <div className="overflow-y-auto max-h-56">
              <table className="w-full text-xs text-left table-fixed">
                <tbody className="divide-y divide-muted/50">
                  {result.jadwal.map((row, idx) => (
                    <tr
                      key={row.bulan}
                      className={cn(
                        "transition-colors hover:bg-surface/60",
                        idx % 2 === 0 ? "bg-white" : "bg-surface/30",
                      )}
                    >
                      <td className="px-3 py-2.5 font-bold text-primary w-14">
                        {row.bulan}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-primary">
                        {formatRupiah(row.cicilan)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#4A7C59]">
                        {formatRupiah(row.porsiPokok)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-[#9C4A2A]">
                        {formatRupiah(row.porsiBunga)}
                      </td>
                      <td className="px-3 py-2.5 text-right font-mono text-secondary">
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
        <div className="flex items-start gap-2 p-3 bg-surface/60 rounded-xl border border-muted">
          <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <p className="text-[10px] text-secondary font-body leading-relaxed">
            Hasil kalkulator merupakan <strong>estimasi simulasi</strong>. Nilai
            aktual dapat berbeda sesuai kebijakan leasing, biaya administrasi,
            provisi, asuransi, dan syarat pembiayaan lainnya.
          </p>
        </div>
      </div>
    </Card>
  );
};
