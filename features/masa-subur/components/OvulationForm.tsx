"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import {
  ArrowRight,
  ShieldAlert,
  CalendarDays,
  RefreshCcw,
  RefreshCw,
} from "lucide-react";
import { MasaSuburContextType } from "../types";

export const OvulationForm: React.FC<{ hook: MasaSuburContextType }> = ({
  hook,
}) => {
  const { data, updateData, error, handleCalculate, handleReset } = hook;

  const durationOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1} Hari`,
  }));

  const cycleOptions = Array.from({ length: 26 }, (_, i) => ({
    value: (i + 20).toString(),
    label: `${i + 20} Hari`,
  }));

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full lg:h-[650px]"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary">
          Data Siklus Berjalan
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Prediksi jadwal bulanan disesuaikan dengan pola biologis unik Anda.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10 h-full"
      >
        <div className="space-y-6 flex-grow">
          <Input
            id="firstDay"
            label="Kapan hari pertama haid terakhir?"
            type="date"
            value={data.firstDayOfLastPeriod}
            onChange={(e) => updateData("firstDayOfLastPeriod", e.target.value)}
            className="text-lg py-4 rounded-xl"
            required
          />

          <Select
            label="Berapa lama rata-rata haid berlangsung?"
            options={durationOptions}
            value={data.periodDuration}
            onChange={(val) => updateData("periodDuration", val)}
            icon={<CalendarDays className="h-5 w-5" />}
          />

          <div className="flex flex-col gap-2">
            <Select
              label="Berapa panjang siklus rata-rata Anda?"
              options={cycleOptions}
              value={data.averageCycleLength}
              onChange={(val) => updateData("averageCycleLength", val)}
              icon={<RefreshCcw className="h-5 w-5" />}
            />
            <p className="text-xs text-secondary/70 italic mt-1 font-body">
              Paling umum berlangsung 28 hari.
            </p>
          </div>

          {error && (
            <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span className="flex-1">{error}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0"
          >
            <RefreshCw className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 shadow-lg hover:shadow-xl group rounded-2xl !bg-[#C17A3A] hover:!bg-[#a4622a] text-white outline-none ring-0"
          >
            Hitung Masa Subur
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
