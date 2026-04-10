"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { PREGNANCY_METHOD } from "@/lib/constants";
import { PregnancyContextType, PregnancyMethod } from "../types";
import { Select } from "@/ui/Select";

export const PregnancyForm: React.FC<{ hook: PregnancyContextType }> = ({
  hook,
}) => {
  const { data, updateData, error, handleCalculate } = hook;

  const getMethodLabel = (m: PregnancyMethod) => {
    switch (m) {
      case PREGNANCY_METHOD.LMP:
        return "Hari Pertama Haid Terakhir";
      case PREGNANCY_METHOD.CONCEPTION:
        return "Tanggal Konsepsi";
      case PREGNANCY_METHOD.IVF:
        return "Transfer IVF";
      case PREGNANCY_METHOD.DUEDATE:
        return "Tanggal Jatuh Tempo";
      case PREGNANCY_METHOD.ULTRASOUND:
        return "Tanggal USG";
      default:
        return "Tanggal";
    }
  };

  const methodOptions = [
    { value: PREGNANCY_METHOD.LMP, label: "Hari Pertama Haid Terakhir (HPHT)" },
    { value: PREGNANCY_METHOD.CONCEPTION, label: "Tanggal Konsepsi" },
    { value: PREGNANCY_METHOD.IVF, label: "Tanggal Transfer IVF" },
    { value: PREGNANCY_METHOD.ULTRASOUND, label: "Tanggal USG" },
    { value: PREGNANCY_METHOD.DUEDATE, label: "Tanggal Jatuh Tempo (EDD)" },
  ];

  const embryoAgeOptions = [
    { value: "3", label: "3 Hari" },
    { value: "5", label: "5 Hari" },
    { value: "6", label: "6 Hari" },
  ];

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary">
          Data Kehamilan
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Pilih metode perhitungan yang paling sesuai untuk Anda.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10 h-full"
      >
        <div className="space-y-6">
          <Select
            label="Metode Perhitungan"
            options={methodOptions}
            value={data.method}
            onChange={(val) => updateData("method", val)}
            className="w-full"
          />

          <Input
            id="date"
            label={getMethodLabel(data.method)}
            type="date"
            value={data.dateStr}
            onChange={(e) => updateData("dateStr", e.target.value)}
            className="text-lg py-4 rounded-xl"
            required
          />

          {data.method === PREGNANCY_METHOD.LMP && (
            <Input
              id="cycleLength"
              label="Rata-rata Panjang Siklus"
              type="number"
              placeholder="Misal: 28"
              suffix="Hari"
              value={data.cycleLength}
              onChange={(e) => updateData("cycleLength", e.target.value)}
              className="text-lg py-4 placeholder:opacity-40 rounded-xl"
              required
              min={20}
              max={45}
            />
          )}

          {data.method === PREGNANCY_METHOD.IVF && (
            <Select
              label="Usia Embrio"
              options={embryoAgeOptions}
              value={data.embryoAge}
              onChange={(val) => updateData("embryoAge", val)}
              className="w-full"
            />
          )}

          {data.method === PREGNANCY_METHOD.ULTRASOUND && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="ultrasoundWeeks"
                label="Usia (Minggu)"
                type="number"
                placeholder="Minggu"
                value={data.ultrasoundWeeks}
                onChange={(e) => updateData("ultrasoundWeeks", e.target.value)}
                className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                required
                min={0}
                max={42}
              />
              <Input
                id="ultrasoundDays"
                label="Usia (Hari)"
                type="number"
                placeholder="Hari"
                value={data.ultrasoundDays}
                onChange={(e) => updateData("ultrasoundDays", e.target.value)}
                className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                required
                min={0}
                max={6}
              />
            </div>
          )}

          {error && (
            <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="py-5 text-lg mt-auto shadow-lg hover:shadow-xl group rounded-2xl w-full"
        >
          Hitung Kehamilan
          <ArrowLeft className="w-5 h-5 inline-block ml-2 group-hover:-translate-x-1.5 transition-transform rotate-180" />
        </Button>
      </form>
    </Card>
  );
};
