"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { CurrencyInput } from "@/ui/CurrencyInput";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { Button } from "@/ui/Button";
import { Calculator, RefreshCw, ArrowRight, ShieldAlert } from "lucide-react";
import { ZakatContextType, ZakatFormData } from "../types";

export const ZakatForm: React.FC<{ hook: ZakatContextType }> = ({ hook }) => {
  const { data, updateData, error, calculate, handleReset } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-[#4A7C59]/[0.02] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5E9] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Calculator className="w-6 h-6 text-[#4A7C59]" /> Form Perhitungan
        </h2>
        <p className="text-sm text-secondary font-body mt-2">
          Masukkan perkiraan penghasilan bruto (kotor) Anda tanpa dikurangi
          rincian pengeluaran pokok.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
        className="flex flex-col gap-6 relative z-10 h-full mt-2"
      >
        <SegmentedControl
          label="Periode Perhitungan"
          options={[
            { value: "monthly", label: "Bulanan" },
            { value: "yearly", label: "Tahunan" },
          ]}
          value={data.mode}
          onChange={(val) => updateData("mode", val as ZakatFormData["mode"])}
        />

        <div className="h-px bg-muted/60 w-full my-1" />

        <CurrencyInput
          label={
            data.mode === "monthly"
              ? "Gaji & Penghasilan Rutin / Bulan"
              : "Gaji & Penghasilan Rutin / Tahun"
          }
          placeholder="0"
          value={data.income}
          onChange={(val) => updateData("income", val)}
          desc="Gaji, honorarium, upah, jasa, dan pendapatan rutin lainnya."
        />

        <CurrencyInput
          label={
            data.mode === "monthly"
              ? "Penghasilan Tambahan (Bulan Ini)"
              : "Penghasilan Tambahan (Tahun Ini)"
          }
          placeholder="0"
          value={data.additional}
          onChange={(val) => updateData("additional", val)}
          desc="Opsional. Bonus bulanan/tahunan, THR, bagi hasil, atau tunjangan lainnya."
        />

        {error && (
          <div className="bg-[#FFF0EB] text-[#9C4A2A] text-sm px-4 py-3 rounded-2xl border border-[#9C4A2A]/20 font-bold flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-auto pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0 shadow-sm border-b-4 hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] transition-all"
          >
            <RefreshCw className="w-5 h-5 text-secondary" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 rounded-2xl !bg-[#C17A3A] hover:!bg-[#9C4A2A] text-[#FFF8F0] outline-none ring-0 border-b-4 border-[#7A5C42] hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] shadow-sm transition-all group font-ui"
          >
            Hitung Zakat
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
