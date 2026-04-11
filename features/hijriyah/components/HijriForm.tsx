"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { Calendar, ArrowRightLeft, RotateCcw, ShieldAlert } from "lucide-react";
import { HijriContextType } from "../types";
import {
  HIJRI_CONVERSION_MODE,
  HIJRI_MONTHS,
  GREGORIAN_MONTHS_ID,
} from "@/lib/constants";

export const HijriForm: React.FC<{ hook: HijriContextType }> = ({ hook }) => {
  const {
    mode,
    data,
    updateData,
    error,
    handleSetToday,
    handleSetTomorrow,
    handleReset,
    toggleMode,
  } = hook;

  const masehiMonthOptions = GREGORIAN_MONTHS_ID.map((name, i) => ({
    value: (i + 1).toString(),
    label: name,
  }));

  const hijriMonthOptions = HIJRI_MONTHS.map((m) => ({
    value: m.value.toString(),
    label: m.name,
  }));

  return (
    <Card
      variant="default"
      className="flex flex-col gap-6 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-[#4A7C59]/[0.02] rounded-[2.5rem] bg-white relative z-10 w-full"
    >
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5E9] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 z-10">
        <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#4A7C59]" />{" "}
          {mode === HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI
            ? "Masehi → Hijriyah"
            : "Hijriyah → Masehi"}
        </h2>
        <Button
          variant="secondary"
          onClick={toggleMode}
          className="text-[#C17A3A] border-[#C17A3A]/30 hover:bg-[#C17A3A]/10 w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl"
        >
          <ArrowRightLeft className="w-4 h-4" /> Tukar Mode
        </Button>
      </div>

      <div className="flex items-center gap-2 z-10 -mt-2">
        <button
          onClick={handleSetToday}
          className="text-xs bg-surface hover:bg-muted text-primary px-3 py-1.5 rounded-lg border font-bold transition-colors"
        >
          Set Hari Ini
        </button>
        <button
          onClick={handleSetTomorrow}
          className="text-xs bg-surface hover:bg-muted text-primary px-3 py-1.5 rounded-lg border font-bold transition-colors"
        >
          Besok
        </button>
        <button
          onClick={handleReset}
          className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg font-bold ml-auto transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        {mode === HIJRI_CONVERSION_MODE.MASEHI_TO_HIJRI ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/4">
              <Input
                label="Tanggal"
                type="number"
                min={1}
                max={31}
                placeholder="DD"
                value={data.gDay}
                onChange={(e) => updateData("gDay", e.target.value)}
                className="rounded-xl"
                labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
              />
            </div>
            <div className="w-full sm:w-2/4">
              <Select
                label="Bulan"
                options={masehiMonthOptions}
                value={data.gMonth}
                onChange={(val) => updateData("gMonth", val)}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <Input
                label="Tahun"
                type="number"
                min={1900}
                max={2100}
                placeholder="YYYY"
                value={data.gYear}
                onChange={(e) => updateData("gYear", e.target.value)}
                className="rounded-xl"
                labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-1/4">
              <Input
                label="Tanggal"
                type="number"
                min={1}
                max={30}
                placeholder="DD"
                value={data.hDay}
                onChange={(e) => updateData("hDay", e.target.value)}
                className="rounded-xl"
                labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
              />
            </div>
            <div className="w-full sm:w-2/4">
              <Select
                label="Bulan Hijriyah"
                options={hijriMonthOptions}
                value={data.hMonth}
                onChange={(val) => updateData("hMonth", val)}
              />
            </div>
            <div className="w-full sm:w-1/4">
              <Input
                label="Tahun H"
                type="number"
                placeholder="Misal 1446"
                value={data.hYear}
                onChange={(e) => updateData("hYear", e.target.value)}
                className="rounded-xl"
                labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
              />
            </div>
          </div>
        )}

        {error && (
          <div className="bg-[#FFF0EB] text-[#9C4A2A] text-xs px-3 py-3 rounded-xl border border-[#9C4A2A]/20 font-bold flex items-center gap-2 mt-2 leading-relaxed animate-in fade-in">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
