"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import {
  Baby,
  Mars,
  Venus,
  Calendar,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GrafikBayiContextType } from "../types";
import { WEIGHT_UNIT, LENGTH_UNIT } from "@/lib/constants";

export const GrafikBayiForm: React.FC<{ hook: GrafikBayiContextType }> = ({
  hook,
}) => {
  const { data, updateData, error, handleCalculate, handleReset } = hook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Baby className="w-6 h-6 text-[#4A7C59]" /> Data Pengukuran
        </h2>
        <p className="text-sm text-secondary font-body mt-2">
          Masukkan data bayi dan hasil pengukuran terkini.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-5 relative z-10 h-full"
      >
        {/* Gender */}
        <div className="flex gap-3">
          {(["male", "female"] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => updateData("gender", g)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all",
                data.gender === g
                  ? "border-[#4A7C59] bg-[#4A7C59]/8 text-[#4A7C59]"
                  : "border-muted bg-white text-secondary hover:border-secondary/30",
              )}
            >
              {g === "male" ? (
                <Mars className="w-6 h-6" />
              ) : (
                <Venus className="w-6 h-6" />
              )}
              <span className="text-xs font-bold">
                {g === "male" ? "Laki-laki" : "Perempuan"}
              </span>
            </button>
          ))}
        </div>

        {/* DOB & Measure Date */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
              Tanggal Lahir
            </label>
            <div className="relative border-2 border-muted rounded-xl h-11 focus-within:border-[#4A7C59] overflow-hidden transition-all">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar className="w-4 h-4 text-secondary opacity-40" />
              </div>
              <input
                type="date"
                value={data.dob}
                onChange={(e) => updateData("dob", e.target.value)}
                required
                className="w-full h-full bg-transparent pl-9 pr-3 text-sm font-bold text-primary outline-none"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
              Tgl Pengukuran
            </label>
            <div className="relative border-2 border-muted rounded-xl h-11 focus-within:border-[#4A7C59] overflow-hidden transition-all">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Calendar className="w-4 h-4 text-secondary opacity-40" />
              </div>
              <input
                type="date"
                value={data.measureDate}
                onChange={(e) => updateData("measureDate", e.target.value)}
                required
                className="w-full h-full bg-transparent pl-9 pr-3 text-sm font-bold text-primary outline-none"
              />
            </div>
          </div>
        </div>

        {/* Weight */}
        <div className="flex gap-3 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
              Satuan
            </label>
            <div className="bg-surface p-1 rounded-lg flex">
              {Object.values(WEIGHT_UNIT).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => updateData("weightUnit", u)}
                  className={cn(
                    "py-1.5 px-2.5 text-xs font-bold rounded transition-all uppercase",
                    data.weightUnit === u
                      ? "bg-white text-primary shadow-sm"
                      : "text-secondary hover:text-primary",
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <Input
            id="weight"
            label="Berat Badan"
            type="number"
            placeholder="7.5"
            suffix={data.weightUnit}
            value={data.weightRaw}
            onChange={(e) => updateData("weightRaw", e.target.value)}
            className="py-3 placeholder:opacity-40 rounded-xl flex-1"
            min={0.5}
            step={0.1}
          />
        </div>

        {/* Length & Head */}
        <div className="flex gap-3 items-end">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
              Satuan
            </label>
            <div className="bg-surface p-1 rounded-lg flex">
              {Object.values(LENGTH_UNIT).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => updateData("lengthUnit", u)}
                  className={cn(
                    "py-1.5 px-2.5 text-xs font-bold rounded transition-all uppercase",
                    data.lengthUnit === u
                      ? "bg-white text-primary shadow-sm"
                      : "text-secondary hover:text-primary",
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <Input
            id="length"
            label="Panjang/Tinggi"
            type="number"
            placeholder="67"
            suffix={data.lengthUnit}
            value={data.lengthRaw}
            onChange={(e) => updateData("lengthRaw", e.target.value)}
            className="py-3 placeholder:opacity-40 rounded-xl flex-1"
            min={1}
            step={0.1}
          />
          <Input
            id="head"
            label="Lingkar Kepala"
            type="number"
            placeholder="43"
            suffix={data.lengthUnit}
            value={data.headRaw}
            onChange={(e) => updateData("headRaw", e.target.value)}
            className="py-3 placeholder:opacity-40 rounded-xl flex-1"
            min={1}
            step={0.1}
          />
        </div>

        {/* Premature toggle */}
        <details className="group [&_summary::-webkit-details-marker]:hidden bg-surface rounded-2xl border border-muted/50 overflow-hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-bold hover:bg-white/50 transition-colors">
            <span className="text-sm font-medium text-primary">
              Lahir Prematur? (Opsional)
            </span>
            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                className="h-5 w-5 text-secondary opacity-50"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>
          <div className="px-4 pb-5 border-t border-muted/30 pt-4 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isPremature}
                onChange={(e) => updateData("isPremature", e.target.checked)}
                className="rounded text-[#4A7C59]"
              />
              <span className="text-sm font-bold text-primary">
                Bayi lahir prematur
              </span>
            </label>
            {data.isPremature && (
              <div className="relative flex items-center border border-muted bg-white rounded-xl h-10 focus-within:ring-2 focus-within:ring-[#4A7C59]/40 overflow-hidden shadow-sm">
                <input
                  type="number"
                  placeholder="32"
                  min="22"
                  max="36"
                  value={data.gestWeeks}
                  onChange={(e) => updateData("gestWeeks", e.target.value)}
                  className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-primary outline-none"
                />
                <span className="pr-3 text-xs text-secondary font-bold opacity-50">
                  minggu gestasi
                </span>
              </div>
            )}
          </div>
        </details>

        {error && (
          <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="flex gap-3 mt-auto">
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
            className="py-4 text-base flex-1 rounded-2xl !bg-[#4A7C59] hover:!bg-[#3a6346] text-white outline-none ring-0 shadow-lg group"
          >
            Hitung Persentil
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
