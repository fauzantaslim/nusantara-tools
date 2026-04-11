"use client";

import React from "react";
import { Card } from "@/ui/Card";
import { Input } from "@/ui/Input";
import { Select } from "@/ui/Select";
import { SegmentedControl } from "@/ui/SegmentedControl";
import { MapPin, Settings2, ShieldAlert, RotateCcw } from "lucide-react";
import { PrayerContextType } from "../types";
import {
  PRAYER_METHOD,
  PRAYER_ASR_METHOD,
  PRAYER_HIGH_LAT_RULE,
  PRAYER_PRESET_CITIES,
  PRAYER_TIME_FORMAT,
} from "@/lib/constants";

export const PrayerForm: React.FC<{ hook: PrayerContextType }> = ({ hook }) => {
  const {
    data,
    updateData,
    error,
    isLocating,
    handleGeolocation,
    handleReset,
  } = hook;

  const cityOptions = [
    { value: "GPS", label: "📍 Gunakan Lokasi Saat Ini (GPS)" },
    ...PRAYER_PRESET_CITIES.map((c) => ({ value: c.value, label: c.label })),
  ];

  const methodOptions = Object.entries(PRAYER_METHOD).map(([value, label]) => ({
    value,
    label,
  }));

  const asrOptions = Object.entries(PRAYER_ASR_METHOD).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  const highLatOptions = Object.entries(PRAYER_HIGH_LAT_RULE).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  return (
    <Card
      variant="default"
      className="xl:col-span-4 flex flex-col gap-6 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-[#4A7C59]/[0.02] rounded-[3rem] bg-white relative z-10 w-full"
    >
      <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5E9] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#4A7C59]" /> Konfigurasi Lokasi
        </h2>
        <button
          onClick={handleReset}
          className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <Select
          label="Titik Lokasi Perhitungan"
          options={cityOptions}
          value={data.cityPreset}
          onChange={(val) => {
            if (val === "GPS") {
              handleGeolocation();
            } else {
              updateData("cityPreset", val);
            }
          }}
          placeholder={
            isLocating ? "Mendapatkan GPS..." : "Pilih Kota / GPS..."
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Lintang (Lat)"
            type="number"
            step="any"
            value={data.lat}
            onChange={(e) => updateData("lat", e.target.value)}
            className="rounded-xl h-11"
            labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
          />
          <Input
            label="Bujur (Lng)"
            type="number"
            step="any"
            value={data.lng}
            onChange={(e) => updateData("lng", e.target.value)}
            className="rounded-xl h-11"
            labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
          />
        </div>

        <Input
          label="Tanggal Kalkulasi"
          type="date"
          value={data.date}
          onChange={(e) => updateData("date", e.target.value)}
          className="rounded-xl h-11"
          labelClassName="text-[11px] font-bold text-secondary uppercase tracking-wider"
        />

        {error && (
          <div className="bg-[#FFF0EB] text-[#9C4A2A] text-xs px-3 py-3 rounded-xl border border-[#9C4A2A]/20 font-bold flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        <div className="border-t border-muted/30 pt-6">
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-5 font-ui">
            <Settings2 className="w-4 h-4 text-[#4A7C59]" /> Pengaturan Lanjutan
          </div>

          <div className="space-y-5">
            <Select
              label="Metode Subuh/Isya"
              options={methodOptions}
              value={data.method}
              onChange={(val) => updateData("method", val)}
              size="sm"
            />
            <Select
              label="Metode Asar"
              options={asrOptions}
              value={data.asrMethod}
              onChange={(val) => updateData("asrMethod", val)}
              size="sm"
            />
            <Select
              label="Aturan Lintang Tinggi"
              options={highLatOptions}
              value={data.highLatRule}
              onChange={(val) => updateData("highLatRule", val)}
              size="sm"
            />
            <SegmentedControl
              label="Format Waktu"
              options={[
                { value: PRAYER_TIME_FORMAT.FORMAT_24H, label: "24 Jam" },
                { value: PRAYER_TIME_FORMAT.FORMAT_12H, label: "12 Jam" },
              ]}
              value={data.timeFormat}
              onChange={(val) => updateData("timeFormat", val)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
