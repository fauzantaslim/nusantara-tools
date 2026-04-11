"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { PensiunResult } from "../types";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  Wallet,
  Activity,
  AlertTriangle,
  Banknote,
  PiggyBank,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface PensiunResultProps {
  result: PensiunResult;
  currentAge: number;
  retirementAge: number;
}

const formatIDR = (val: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Math.round(val));

const formatCompactYAxis = (val: number) => {
  if (val >= 1e12) return (val / 1e12).toFixed(1) + "T";
  if (val >= 1e9) return (val / 1e9).toFixed(1) + "M";
  if (val >= 1e6) return (val / 1e6).toFixed(1) + "Jt";
  return val.toString();
};

const StatRow: React.FC<{
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: boolean;
  muted?: boolean;
  highlight?: boolean;
}> = ({ label, value, icon: Icon, accent, muted, highlight }) => (
  <div
    className={cn(
      "flex justify-between items-center py-3",
      muted ? "opacity-60" : "",
      highlight ? "bg-[#9C4A2A]/10 -mx-3 px-3 rounded-xl" : "",
    )}
  >
    <span className="flex items-center gap-2 font-body text-sm text-[#EDE0D0]/80">
      <Icon
        className={cn(
          "w-4 h-4 shrink-0",
          accent ? "text-[#C17A3A]" : "text-[#EDE0D0]/50",
        )}
      />
      {label}
    </span>
    <span
      className={cn(
        "font-bold tabular-nums",
        accent ? "text-[#C17A3A] text-base" : "text-white text-sm",
      )}
    >
      {value}
    </span>
  </div>
);

export const PensiunResultComp: React.FC<PensiunResultProps> = ({
  result,
  currentAge,
  retirementAge,
}) => {
  const {
    projectedRetirementSavings,
    estimatedMonthlyIncomeFromSavings,
    socialSecurityIncome,
    otherRetirementIncome,
    totalMonthlyRetirementIncome,
    monthlyLivingExpenses,
    surplusDeficit,
    ageFundDepleted,
    chartData,
    targetRetirementSavings,
    readinessPercentage,
    savingsSurplus,
    requiredMonthlyContribution,
    durationYears,
    input,
  } = result;

  const isFundDepleted = ageFundDepleted !== null;

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3]",
        "ring-4 ring-inset ring-[#9C4A2A]/20 border-[#9C4A2A]/30",
      )}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-white/10 flex items-center justify-center shadow-inner shrink-0">
              <TrendingUp className="w-6 h-6 text-[#9C4A2A]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Proyeksi Pensiun
              </h2>
              <p className="text-[#EDE0D0]/50 font-body text-xs mt-0.5">
                Estimasi kekayaan dan pendapatan di masa tua.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Result */}
        <div className="flex flex-col gap-2">
          {isFundDepleted ? (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-bold text-sm">
                  Dana Anda akan habis pada Usia {ageFundDepleted}
                </p>
                <p className="text-red-300 text-xs font-medium leading-relaxed opacity-80 mt-1">
                  Pengeluaran bulanan melebihi pendapatan. Dana Anda tidak akan
                  bertahan target lama ekspektasi hidup!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 bg-[#4A7C59]/10 border border-[#4A7C59]/20 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
              <div>
                <p className="text-[#4A7C59] font-bold text-sm">
                  Selamat! Dana Anda Aman
                </p>
                <p className="text-[#4A7C59]/80 text-xs font-medium leading-relaxed mt-1">
                  Proyeksi keuangan menunjukkan bahwa dana pensiun Anda
                  diperkirakan cukup hingga akhir ekspektasi hidup.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Readiness Info */}
        <div className="bg-[#1A0E07] rounded-3xl border border-[#9C4A2A]/30 p-5 md:p-6">
          <h3 className="text-[#EDE0D0]/60 font-bold font-ui text-xs uppercase tracking-widest mb-4">
            Hasil Perencanaan Pensiun
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-[#EDE0D0]/50 text-xs font-bold mb-1">
                Kesiapan Pensiun
              </p>
              <p
                className={cn(
                  "text-3xl font-black mb-1",
                  readinessPercentage >= 100
                    ? "text-[#4A7C59]"
                    : "text-[#C17A3A]",
                )}
              >
                {readinessPercentage.toFixed(1)}%
              </p>
              <p
                className={cn(
                  "text-[10px] uppercase tracking-wider font-bold",
                  readinessPercentage >= 100
                    ? "text-[#4A7C59]/80"
                    : "text-[#C17A3A]/80",
                )}
              >
                {readinessPercentage >= 100
                  ? "Dalam Jalur untuk Pensiun"
                  : "Perlu Penyesuaian"}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-[#EDE0D0]/50 text-xs font-bold mb-1">
                Durasi Pensiun
              </p>
              <p className="text-3xl font-black text-white mb-1">
                {durationYears} {durationYears !== ">100" ? "tahun" : " tahun"}
              </p>
              <p className="text-[#EDE0D0]/40 text-[10px] uppercase tracking-wider font-bold">
                Tabungan akan bertahan
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            <StatRow
              label="Tabungan Pensiun Target"
              value={formatIDR(targetRetirementSavings)}
              icon={Wallet}
              muted
            />
            <StatRow
              label="Tabungan Pensiun yang Diproyeksikan"
              value={formatIDR(projectedRetirementSavings)}
              icon={PiggyBank}
              accent
              highlight
            />
            <StatRow
              label="Surplus / Kekurangan Tabungan"
              value={
                (savingsSurplus >= 0 ? "+" : "") + formatIDR(savingsSurplus)
              }
              icon={TrendingUp}
            />
            <StatRow
              label="Kontribusi Bulanan yang Diperlukan"
              value={formatIDR(requiredMonthlyContribution)}
              icon={Banknote}
            />
            <StatRow
              label="Tahun Hingga Pensiun"
              value={`${Math.max(0, retirementAge - currentAge)} tahun`}
              icon={Activity}
              muted
            />
          </div>
        </div>

        {/* Summary Details */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6">
          <h3 className="text-[#EDE0D0]/60 font-bold font-ui text-xs uppercase tracking-widest mb-3">
            Analisis Bulanan Saat Masa Pensiun
          </h3>
          <div className="divide-y divide-white/5">
            <StatRow
              label="Estimasi Penarikan Tabungan"
              value={formatIDR(estimatedMonthlyIncomeFromSavings)}
              icon={Wallet}
            />
            {socialSecurityIncome > 0 && (
              <StatRow
                label="Pensiun Negara / BPJS"
                value={formatIDR(socialSecurityIncome)}
                icon={Banknote}
              />
            )}
            {otherRetirementIncome > 0 && (
              <StatRow
                label="Pendapatan Pasif Lainnya"
                value={formatIDR(otherRetirementIncome)}
                icon={Banknote}
              />
            )}
            <StatRow
              label="TOTAL Pemasukan Estimasi"
              value={formatIDR(totalMonthlyRetirementIncome)}
              icon={TrendingUp}
              accent
              highlight
            />
            <StatRow
              label="Target Pengeluaran Bulanan"
              value={`-${formatIDR(monthlyLivingExpenses)}`}
              icon={Activity}
              muted
            />
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
            <p className="text-[#EDE0D0]/50 text-xs uppercase tracking-widest font-bold">
              Surplus / Kekurangan
            </p>
            <p
              className={cn(
                "text-lg font-black tabular-nums",
                surplusDeficit >= 0 ? "text-[#4A7C59]" : "text-red-500",
              )}
            >
              {surplusDeficit >= 0 ? "+" : ""}
              {formatIDR(surplusDeficit)}
            </p>
          </div>
        </div>

        {/* Chart Visualization */}
        {chartData.length > 0 && (
          <div className="bg-[#1A0E07] rounded-3xl border border-[#9C4A2A]/30 p-5 mt-2 h-[300px] flex flex-col">
            <h3 className="text-[#EDE0D0]/60 font-bold font-ui text-xs uppercase tracking-widest mb-4">
              Pergerakan Dana Pensiun terhadap Usia
            </h3>
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorFund" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C17A3A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#C17A3A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff10"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="age"
                    stroke="#ffffff40"
                    tick={{ fill: "#ffffff40", fontSize: 10 }}
                    tickMargin={10}
                    tickFormatter={(val) => `Usia ${val}`}
                  />
                  <YAxis
                    stroke="#ffffff40"
                    tick={{ fill: "#ffffff40", fontSize: 10 }}
                    tickFormatter={formatCompactYAxis}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2C1A0E",
                      border: "1px solid #7A5C42",
                      borderRadius: "12px",
                      color: "#F5EDE3",
                    }}
                    labelStyle={{ color: "#C17A3A", fontWeight: "bold" }}
                    formatter={(
                      val:
                        | number
                        | string
                        | readonly (number | string)[]
                        | undefined,
                    ) =>
                      val !== undefined && val !== null
                        ? formatIDR(Number(Array.isArray(val) ? val[0] : val))
                        : ""
                    }
                  />
                  {/* Demarcation line for retirement */}
                  <ReferenceLine
                    x={retirementAge}
                    stroke="#9C4A2A"
                    strokeDasharray="3 3"
                    label={{
                      position: "top",
                      value: "Pensiun",
                      fill: "#9C4A2A",
                      fontSize: 10,
                    }}
                  />
                  {isFundDepleted && (
                    <ReferenceLine
                      x={ageFundDepleted}
                      stroke="red"
                      strokeDasharray="3 3"
                      label={{
                        position: "insideTopRight",
                        value: "Habis",
                        fill: "red",
                        fontSize: 10,
                      }}
                    />
                  )}
                  <Area
                    type="monotone"
                    dataKey="fundBalance"
                    name="Dana"
                    stroke="#C17A3A"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorFund)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed Info */}
        <div className="bg-[#1A0E07]/50 rounded-3xl border border-white/5 p-5 md:p-6 text-[#EDE0D0]/70 text-xs mt-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <h3 className="text-white font-bold font-ui uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#C17A3A]" />
            Informasi Perhitungan
          </h3>
          <div className="space-y-6 relative z-10">
            <div>
              <p className="font-bold text-[#C17A3A] mb-2 border-b border-white/5 pb-1">
                Nilai Input Dasar:
              </p>
              <ul className="space-y-1 pl-1">
                <li>
                  <span className="font-medium text-[#EDE0D0]">
                    Usia Saat Ini:
                  </span>{" "}
                  {input?.currentAge} tahun •{" "}
                  <span className="font-medium text-[#EDE0D0]">
                    Usia Pensiun:
                  </span>{" "}
                  {input?.retirementAge} tahun •{" "}
                  <span className="font-medium text-[#EDE0D0]">
                    Harapan Hidup:
                  </span>{" "}
                  {input?.lifeExpectancy} tahun (
                  {input?.lifeExpectancy - input?.retirementAge} tahun dalam
                  pensiun)
                </li>
                <li>
                  <span className="font-medium text-[#EDE0D0]">
                    Tabungan Pensiun Saat Ini:
                  </span>{" "}
                  {formatIDR(input?.currentSavings || 0)}
                </li>
                <li>
                  <span className="font-medium text-[#EDE0D0]">
                    Kontribusi Bulanan:
                  </span>{" "}
                  {formatIDR(input?.monthlyContribution || 0)}{" "}
                  <span className="opacity-50">
                    (meningkat {input?.incomeGrowthRate}% per tahun)
                  </span>
                </li>
                <li>
                  <span className="font-medium text-[#EDE0D0]">
                    Target Pengeluaran Tahunan (Nilai Saat Ini):
                  </span>{" "}
                  {formatIDR(input?.desiredAnnualIncome || 0)}
                </li>
                <li>
                  <span className="font-medium text-[#EDE0D0]">Asumsi:</span>{" "}
                  ROA Pra-Pensiun {input?.preRetirementReturnRate}% • ROA
                  Pasca-Pensiun {input?.postRetirementReturnRate}% • Inflasi{" "}
                  {input?.inflationRate}%
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-[#C17A3A] mb-2 border-b border-white/5 pb-1">
                1. Tabungan Proyeksi Saat Pensiun
              </p>
              <p className="leading-relaxed mb-2">
                Dimulai dengan tabungan saat ini sebesar{" "}
                {formatIDR(input?.currentSavings || 0)}, model memproyeksikan
                pertumbuhan portofolio secara majemuk (compound interest) selama{" "}
                {Math.max(0, input?.retirementAge - input?.currentAge)} tahun.
                Ini mencakup kontribusi bulanan rutin sebesar{" "}
                {formatIDR(input?.monthlyContribution || 0)} yang disesuaikan
                dengan asumsi pertumbuhan pendapatan {input?.incomeGrowthRate}%
                per tahun, dan pengembalian investasi (ROA) pra-pensiun sebesar{" "}
                {input?.preRetirementReturnRate}%.
              </p>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[#EDE0D0] font-bold">
                  Hasil Proyeksi Saat Pensiun:{" "}
                </span>
                <span className="text-[#C17A3A] font-black">
                  {formatIDR(projectedRetirementSavings)}
                </span>
              </div>
            </div>

            <div>
              <p className="font-bold text-[#C17A3A] mb-2 border-b border-white/5 pb-1">
                2. Kebutuhan Tabungan Target
              </p>
              <p className="leading-relaxed mb-2">
                Target pengeluaran tahunan sebesar{" "}
                {formatIDR(input?.desiredAnnualIncome || 0)} disesuaikan dengan
                asumsi inflasi {input?.inflationRate}% hingga masa pensiun tiba.
                Menggunakan nilai sekarang (Present Value) dari anuitas aliran
                penarikan yang akan terus disesuaikan dengan inflasi selama sisa
                hidup (
                {Math.max(0, input?.lifeExpectancy - input?.retirementAge)}{" "}
                tahun pengembangan pasca-pensiun), dengan asumsi pengembalian
                investasi pasca-pensiun yang lebih konservatif sebesar{" "}
                {input?.postRetirementReturnRate}%, kami menghitung total dana
                mengendap (Target) yang diperlukan pada hari pertama masa
                pensiun Anda.
              </p>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[#EDE0D0] font-bold">
                  Tabungan Target Yang Dibutuhkan:{" "}
                </span>
                <span className="text-[#C17A3A] font-black">
                  {formatIDR(targetRetirementSavings)}
                </span>
              </div>
            </div>

            <div>
              <p className="font-bold text-[#C17A3A] mb-2 border-b border-white/5 pb-1">
                3. Penilaian Akhir & Kesimpulan
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-black/20 p-2 rounded-lg">
                  <p className="text-[#EDE0D0]/50 text-[10px] uppercase">
                    Surplus/Defisit Berdasarkan Target
                  </p>
                  <p
                    className={cn(
                      "font-bold",
                      savingsSurplus >= 0 ? "text-[#4A7C59]" : "text-red-500",
                    )}
                  >
                    {(savingsSurplus >= 0 ? "+" : "") +
                      formatIDR(savingsSurplus)}
                  </p>
                </div>
                <div className="bg-black/20 p-2 rounded-lg">
                  <p className="text-[#EDE0D0]/50 text-[10px] uppercase">
                    Level Kesiapan
                  </p>
                  <p
                    className={cn(
                      "font-bold text-lg",
                      readinessPercentage >= 100
                        ? "text-[#4A7C59]"
                        : "text-[#C17A3A]",
                    )}
                  >
                    {readinessPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
