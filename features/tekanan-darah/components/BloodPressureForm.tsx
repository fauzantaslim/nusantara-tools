"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import {
  ArrowRight,
  ShieldAlert,
  HeartPulse,
  RefreshCw,
  Clock,
} from "lucide-react";
import { BPContextType } from "../types";
import { BODY_POSITION, BP_ARM } from "@/lib/constants";

export const BloodPressureForm: React.FC<{ hook: BPContextType }> = ({
  hook,
}) => {
  const { data, updateData, error, handleAnalyze, handleReset } = hook;

  const positionOptions = [
    { value: BODY_POSITION.SITTING, label: "Duduk" },
    { value: BODY_POSITION.STANDING, label: "Berdiri" },
    { value: BODY_POSITION.LYING, label: "Berbaring" },
  ];

  const armOptions = [
    { value: BP_ARM.LEFT, label: "Tangan Kiri" },
    { value: BP_ARM.RIGHT, label: "Tangan Kanan" },
  ];

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative z-10 w-full h-full"
    >
      <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-[#4A7C59]" /> Data Pengukuran
        </h2>
        <p className="text-sm text-secondary font-body mt-2">
          Masukkan hasil pengukuran tekanan darah Anda.
        </p>
      </div>

      <form
        onSubmit={handleAnalyze}
        className="flex flex-col gap-5 relative z-10 h-full"
      >
        <div className="flex gap-4">
          <Input
            id="sys"
            label="Sistolik (atas)"
            type="number"
            placeholder="120"
            min={40}
            max={300}
            value={data.systolic}
            onChange={(e) => updateData("systolic", e.target.value)}
            suffix="mmHg"
            required
            className="flex-1 rounded-xl"
            labelClassName="text-xs font-bold font-ui text-secondary uppercase tracking-wider"
          />
          <div className="flex items-center pt-6">
            <span className="text-3xl font-light text-secondary opacity-30">
              /
            </span>
          </div>
          <Input
            id="dia"
            label="Diastolik (bawah)"
            type="number"
            placeholder="80"
            min={20}
            max={200}
            value={data.diastolic}
            onChange={(e) => updateData("diastolic", e.target.value)}
            suffix="mmHg"
            required
            className="flex-1 rounded-xl"
            labelClassName="text-xs font-bold font-ui text-secondary uppercase tracking-wider"
          />
        </div>

        <Input
          id="heart-rate"
          label="Denyut Jantung (Opsional)"
          type="number"
          placeholder="72"
          suffix="bpm"
          value={data.heartRate}
          onChange={(e) => updateData("heartRate", e.target.value)}
          className="py-3 placeholder:opacity-40 rounded-xl"
          min={30}
          max={250}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
            Waktu Pengukuran
          </label>
          <div className="relative border-2 border-muted rounded-xl h-11 focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20 overflow-hidden transition-all">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Clock className="w-4 h-4 text-secondary opacity-40" />
            </div>
            <input
              type="datetime-local"
              value={data.datetime}
              onChange={(e) => updateData("datetime", e.target.value)}
              className="w-full h-full bg-transparent pl-9 pr-3 text-sm font-bold text-primary outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Posisi"
            options={positionOptions}
            value={data.position}
            onChange={(val) => updateData("position", val)}
          />
          <Select
            label="Lengan"
            options={armOptions}
            value={data.arm}
            onChange={(val) => updateData("arm", val)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
            Catatan (Opsional)
          </label>
          <textarea
            value={data.notes}
            onChange={(e) => updateData("notes", e.target.value)}
            rows={2}
            placeholder="Contoh: Setelah olahraga, sedang stres, dll."
            className="w-full border-2 border-muted rounded-xl px-3 py-2.5 text-sm font-body text-primary placeholder:opacity-40 outline-none focus:border-[#C17A3A] focus:ring-2 focus:ring-[#C17A3A]/20 resize-none bg-white transition-all shadow-inner"
          />
        </div>

        {error && (
          <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        <div className="flex gap-3 mt-auto pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            className="py-4 px-5 rounded-2xl border border-muted shrink-0"
          >
            <RefreshCw className="w-5 h-5 text-primary" />
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="py-4 text-base flex-1 rounded-2xl !bg-[#C17A3A] hover:!bg-[#9C4A2A] text-white outline-none ring-0 shadow-lg group font-ui"
          >
            Analisis
            <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
          </Button>
        </div>
      </form>
    </Card>
  );
};
