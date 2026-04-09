"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { MarginResult as IMarginResult, MarginInput } from "../types";
import { cn } from "@/lib/utils";
import {
  Target,
  TrendingUp,
  PiggyBank,
  Activity,
  Calculator,
  CheckCircle2,
} from "lucide-react";

interface MarginResultProps {
  result: IMarginResult;
  input: MarginInput;
}

const StatRow: React.FC<{
  label: string;
  value: string;
  icon: React.ElementType;
  accent?: boolean;
  highlight?: boolean;
}> = ({ label, value, icon: Icon, accent, highlight }) => (
  <div
    className={cn(
      "flex justify-between items-center py-3",
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

export const MarginResult: React.FC<MarginResultProps> = ({
  result,
  input,
}) => {
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: input.decimalPrecision,
      minimumFractionDigits: input.decimalPrecision,
    }).format(val);
  };

  const formatPercent = (val: number) => {
    return (
      new Intl.NumberFormat("id-ID", {
        maximumFractionDigits: 2,
      }).format(val) + "%"
    );
  };

  return (
    <Card
      variant="default"
      className={cn(
        "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-700 h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3]",
        "ring-4 ring-inset ring-[#9C4A2A]/20 border-[#9C4A2A]/30",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10 h-full flex flex-col gap-6">
        <div className="flex items-start justify-between border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-white/10 flex items-center justify-center shadow-inner shrink-0">
              <TrendingUp className="w-6 h-6 text-[#9C4A2A]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                Hasil Kalkulasi
              </h2>
              <p className="text-[#EDE0D0]/50 font-body text-xs mt-0.5">
                Estimasi harga jual, margin, dan profitabilitas.
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 bg-[#1A0E07] rounded-3xl border border-[#9C4A2A]/30 flex flex-col items-center justify-center text-center">
          <p className="text-[#EDE0D0]/50 text-xs uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
            <PiggyBank className="w-4 h-4 text-[#C17A3A]" /> Keuntungan{" "}
            {input.quantity > 1 ? "per Unit" : ""}
          </p>
          <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-[#C17A3A] tabular-nums leading-none mb-1">
            {formatIDR(result.profit)}
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 w-full justify-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-white/50 uppercase">
                Margin
              </span>
              <span className="text-sm font-bold text-[#4A7C59]">
                {formatPercent(result.margin)}
              </span>
            </div>
            <div className="w-px h-6 bg-white/10"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-white/50 uppercase">
                Markup
              </span>
              <span className="text-sm font-bold text-[#4A7C59]">
                {formatPercent(result.markup)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6">
          <div className="divide-y divide-white/5">
            <StatRow
              label="Harga Biaya (Cost)"
              value={formatIDR(result.cost)}
              icon={Target}
            />
            <StatRow
              label="Harga Jual"
              value={formatIDR(result.sellingPrice)}
              icon={TrendingUp}
              accent
              highlight
            />
            {input.quantity > 1 && (
              <>
                <StatRow
                  label={`Total Pendapatan (${input.quantity} unit)`}
                  value={formatIDR(result.totalRevenue)}
                  icon={Calculator}
                />
                <StatRow
                  label={`Total Keuntungan Kotor`}
                  value={formatIDR(result.totalProfit)}
                  icon={PiggyBank}
                />
              </>
            )}
            {(input.taxRate > 0 || input.marketplaceFee > 0) && (
              <StatRow
                label={`Keuntungan Bersih Est.`}
                value={formatIDR(result.netProfitAfterFees)}
                icon={CheckCircle2}
                accent
                highlight
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
