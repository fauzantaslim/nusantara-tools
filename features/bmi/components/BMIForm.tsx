"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { Select } from "@/ui/Select";
import { ArrowRight, ShieldAlert, Venus, Mars, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BMIContextType,
  ActivityLevel,
  GENDER,
  SYSTEM,
  ACTIVITY_LEVEL,
} from "../types";

export const BMIForm: React.FC<{ bmiHook: BMIContextType }> = ({ bmiHook }) => {
  const { data, updateData, error, handleCalculate } = bmiHook;

  return (
    <Card
      variant="default"
      className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Scale className="w-6 h-6 text-accent-1" />
          Data Personal
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Kami memproses data secara lokal di perangkat Anda.
        </p>
      </div>

      <form
        onSubmit={handleCalculate}
        className="flex flex-col gap-6 relative z-10 h-full"
      >
        <div className="space-y-6">
          {/* System Toggle */}
          <SegmentedControl
            value={data.system}
            onChange={(v) => updateData("system", v)}
            options={[
              { value: SYSTEM.METRIC, label: "Metrik (kg, cm)" },
              { value: SYSTEM.IMPERIAL, label: "Imperial (lb, ft)" },
            ]}
          />

          {/* Gender Select */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateData("gender", GENDER.MALE)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                data.gender === GENDER.MALE
                  ? "border-accent-1 bg-accent-1/5 text-accent-1"
                  : "border-muted bg-white text-secondary hover:border-secondary/30",
              )}
            >
              <Mars className="w-8 h-8 mb-2" />
              <span className="font-bold font-ui text-sm">Pria</span>
            </button>
            <button
              type="button"
              onClick={() => updateData("gender", GENDER.FEMALE)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                data.gender === GENDER.FEMALE
                  ? "border-accent-1 bg-accent-1/5 text-accent-1"
                  : "border-muted bg-white text-secondary hover:border-secondary/30",
              )}
            >
              <Venus className="w-8 h-8 mb-2" />
              <span className="font-bold font-ui text-sm">Wanita</span>
            </button>
          </div>

          <Input
            id="age"
            label="Usia"
            type="number"
            placeholder="Misal: 25"
            suffix="Tahun"
            value={data.age}
            onChange={(e) => updateData("age", e.target.value)}
            className="text-lg py-4 placeholder:opacity-40 rounded-xl"
            required
            min={2}
            max={120}
          />

          <Input
            id="weight"
            label="Berat Badan"
            type="number"
            placeholder={
              data.system === SYSTEM.METRIC ? "Misal: 65" : "Misal: 145"
            }
            suffix={data.system === SYSTEM.METRIC ? "kg" : "lb"}
            value={data.weight}
            onChange={(e) => updateData("weight", e.target.value)}
            className="text-lg py-4 placeholder:opacity-40 rounded-xl"
            required
            min={2}
            max={500}
          />

          {data.system === SYSTEM.METRIC ? (
            <Input
              id="height1"
              label="Tinggi Badan"
              type="number"
              placeholder="Misal: 170"
              suffix="cm"
              value={data.heightRaw1}
              onChange={(e) => updateData("heightRaw1", e.target.value)}
              className="text-lg py-4 placeholder:opacity-40 rounded-xl"
              required
              min={2}
              max={300}
            />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="height1"
                label="Tinggi (Kaki)"
                type="number"
                placeholder="Misal: 5"
                suffix="ft"
                value={data.heightRaw1}
                onChange={(e) => updateData("heightRaw1", e.target.value)}
                className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                required
                min={2}
                max={300}
              />
              <Input
                id="height2"
                label="Tinggi (Inci)"
                type="number"
                placeholder="Misal: 7"
                suffix="in"
                value={data.heightRaw2}
                onChange={(e) => updateData("heightRaw2", e.target.value)}
                className="text-lg py-4 placeholder:opacity-40 rounded-xl"
                required
                min={0}
                max={11}
              />
            </div>
          )}

          <Select<ActivityLevel>
            label="Tingkat Aktivitas"
            value={data.activityLevel}
            onChange={(v) => updateData("activityLevel", v)}
            options={[
              {
                value: ACTIVITY_LEVEL.SEDENTARY,
                label: "Jarang Berolahraga (Sedentary)",
              },
              {
                value: ACTIVITY_LEVEL.LIGHT,
                label: "Aktivitas Ringan (1-3 hari/minggu)",
              },
              {
                value: ACTIVITY_LEVEL.MODERATE,
                label: "Aktivitas Sedang (3-5 hari/minggu)",
              },
              {
                value: ACTIVITY_LEVEL.ACTIVE,
                label: "Aktivitas Tinggi (6-7 hari/minggu)",
              },
              {
                value: ACTIVITY_LEVEL.VERY_ACTIVE,
                label: "Aktivitas Sangat Tinggi (Atlet)",
              },
            ]}
          />

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
          Analisis Indeks
          <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
        </Button>
      </form>
    </Card>
  );
};
