"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { Select } from "@/ui/Select";
import {
  ArrowRight,
  ShieldAlert,
  Venus,
  Mars,
  Droplets,
  Coffee,
  Wine,
  ThermometerSun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AirContextType,
  ActivityLevel,
  ClimateType,
  AltitudeType,
  OutputUnitType,
  GENDER,
  SYSTEM,
  ACTIVITY_LEVEL,
  CLIMATE,
  ALTITUDE,
  OUTPUT_UNIT,
} from "../types";

export const AirForm: React.FC<{ airHook: AirContextType }> = ({ airHook }) => {
  const { data, updateData, error, handleCalculate } = airHook;

  return (
    <Card
      variant="default"
      className="lg:col-span-6 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full h-full"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
          <Droplets className="w-6 h-6 text-[#4A7C59]" />
          Data Primer
        </h2>
        <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
          Masukkan metrik dasar tubuh untuk asupan minimum cairan Anda.
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

          {/* Gender */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateData("gender", GENDER.MALE)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                data.gender === GENDER.MALE
                  ? "border-[#4A7C59] bg-[#4A7C59]/10 text-[#4A7C59]"
                  : "border-muted bg-white text-secondary hover:border-secondary/30",
              )}
            >
              <Mars className="w-6 h-6 mb-1" />
              <span className="font-bold font-ui text-xs">Pria</span>
            </button>
            <button
              type="button"
              onClick={() => updateData("gender", GENDER.FEMALE)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all",
                data.gender === GENDER.FEMALE
                  ? "border-[#4A7C59] bg-[#4A7C59]/10 text-[#4A7C59]"
                  : "border-muted bg-white text-secondary hover:border-secondary/30",
              )}
            >
              <Venus className="w-6 h-6 mb-1" />
              <span className="font-bold font-ui text-xs">Wanita</span>
            </button>
          </div>

          <div className="flex gap-4">
            <Input
              id="age"
              label="Usia"
              type="number"
              placeholder="25"
              suffix="Thn"
              value={data.age}
              onChange={(e) => updateData("age", e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl"
              required
              min={2}
              max={120}
            />
            <Input
              id="weight"
              label="Berat"
              type="number"
              placeholder={data.system === SYSTEM.METRIC ? "65" : "145"}
              suffix={data.system === SYSTEM.METRIC ? "kg" : "lb"}
              value={data.weight}
              onChange={(e) => updateData("weight", e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl"
              required
              min={10}
              max={500}
            />
          </div>

          {/* Activity Level */}
          <div className="flex gap-4">
            <Select<ActivityLevel>
              className="flex-1"
              label="Tingkat Aktivitas (Harian)"
              value={data.activityLevel}
              onChange={(v) => updateData("activityLevel", v)}
              options={[
                { value: ACTIVITY_LEVEL.LOW, label: "Rendah (Sedentary)" },
                { value: ACTIVITY_LEVEL.MODERATE, label: "Sedang (Aktif)" },
                { value: ACTIVITY_LEVEL.HIGH, label: "Tinggi (Fisik Berat)" },
              ]}
            />
            <Input
              id="exerciseDuration"
              label="Olahraga (Hari Ini)"
              type="number"
              placeholder="0"
              min={0}
              suffix="mnt"
              value={data.exerciseDuration}
              onChange={(e) => updateData("exerciseDuration", e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl"
              fullWidth={false}
            />
          </div>

          {/* Output Unit Selection */}
          <SegmentedControl
            label="Satuan Output"
            value={data.unit}
            onChange={(v) => updateData("unit", v as OutputUnitType)}
            options={[
              { value: OUTPUT_UNIT.LITER, label: "Liter" },
              { value: OUTPUT_UNIT.ML, label: "ML" },
              { value: OUTPUT_UNIT.CUPS, label: "Gelas" },
              { value: OUTPUT_UNIT.OZ, label: "OZ" },
            ]}
          />

          {/* Advanced Environmental / Lifestyle Form (Using details) */}
          <details className="group [&_summary::-webkit-details-marker]:hidden bg-surface rounded-2xl border border-muted/50 overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 text-primary font-bold hover:bg-white/50 transition-colors">
              <div className="flex items-center gap-2">
                <ThermometerSun className="w-5 h-5 text-[#C17A3A]" />
                <h3 className="text-sm font-medium">
                  Faktor Lingkungan & Gaya Hidup
                </h3>
              </div>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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

            <div className="px-4 pb-5 space-y-5 border-t border-muted/30 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Select<ClimateType>
                  label="Iklim & Cuaca"
                  size="sm"
                  value={data.climate}
                  onChange={(v) => updateData("climate", v)}
                  options={[
                    { value: CLIMATE.NORMAL, label: "Normal / Sedang" },
                    { value: CLIMATE.HOT, label: "Panas Terik" },
                    { value: CLIMATE.HUMID, label: "Sangat Lembap" },
                  ]}
                />
                <Select<AltitudeType>
                  label="Ketinggian Tempat"
                  size="sm"
                  value={data.altitude}
                  onChange={(v) => updateData("altitude", v)}
                  options={[
                    { value: ALTITUDE.LOW, label: "Rendah / Normal" },
                    { value: ALTITUDE.HIGH, label: "Dataran Tinggi" },
                  ]}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold font-ui text-secondary block">
                  Gaya Hidup & Diet
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 hover:border-[#C17A3A]/30 transition-all flex-1">
                    <input
                      type="checkbox"
                      checked={data.caffeine}
                      onChange={(e) => updateData("caffeine", e.target.checked)}
                      className="rounded text-[#C17A3A] focus:ring-[#C17A3A]"
                    />
                    <span className="text-xs font-bold flex items-center gap-1">
                      <Coffee className="w-3.5 h-3.5" />
                      Kafein
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 hover:border-[#9C4A2A]/30 transition-all flex-1">
                    <input
                      type="checkbox"
                      checked={data.alcohol}
                      onChange={(e) => updateData("alcohol", e.target.checked)}
                      className="rounded text-[#9C4A2A] focus:ring-[#9C4A2A]"
                    />
                    <span className="text-xs font-bold flex items-center gap-1">
                      <Wine className="w-3.5 h-3.5" />
                      Alkohol
                    </span>
                  </label>
                </div>
                <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 hover:border-[#4A7C59]/30 transition-all">
                  <input
                    type="checkbox"
                    checked={data.highProtein}
                    onChange={(e) =>
                      updateData("highProtein", e.target.checked)
                    }
                    className="rounded text-[#4A7C59] focus:ring-[#4A7C59]"
                  />
                  <span className="text-xs font-bold">Diet Tinggi Protein</span>
                </label>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold font-ui text-secondary block">
                  Status Kesehatan / Khusus
                </label>
                <div className="flex flex-col gap-2">
                  {data.gender === GENDER.FEMALE && (
                    <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 transition-all">
                      <input
                        type="checkbox"
                        checked={data.pregnant}
                        onChange={(e) =>
                          updateData("pregnant", e.target.checked)
                        }
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="text-xs font-bold">
                        Sedang Hamil / Menyusui
                      </span>
                    </label>
                  )}
                  <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border border-muted/50 transition-all">
                    <input
                      type="checkbox"
                      checked={data.sick}
                      onChange={(e) => updateData("sick", e.target.checked)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-xs font-bold">
                      Sedang Sakit (Demam / Lainnya)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </details>

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
          className="py-5 text-lg mt-auto shadow-lg hover:shadow-xl group rounded-2xl w-full !bg-[#4A7C59] hover:!bg-[#3a6346] text-white outline-none ring-0"
        >
          Analisis Asupan Air
          <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
        </Button>
      </form>
    </Card>
  );
};
