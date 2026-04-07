"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import {
  calculateGrowth,
  GrowthResult,
  GrowthInput,
  MetricResult,
  CATEGORY_CONFIG,
  WeightUnit,
  LengthUnit,
  convertWeight,
  convertLength,
  SavedMeasurement,
} from "@/features/grafik-bayi/utils";
import { Gender } from "@/features/grafik-bayi/who-data";
import {
  ArrowRight,
  ShieldAlert,
  Info,
  Mars,
  Venus,
  RefreshCw,
  Baby,
  CheckCircle2,
  Calendar,
  Save,
  Trash2,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedHealthTools } from "../components/RelatedHealthTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import Image from "next/image";

const STORAGE_KEY = "nusantara-grafik-bayi-history";

function loadHistory(): SavedMeasurement[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function saveHistory(data: SavedMeasurement[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── Z-score bar visual ─────────────────────────────────────────────────────
function ZBar({ z }: { z: number }) {
  // Map z-score (-3 to +3) → 0-100%
  const clampedZ = Math.max(-3, Math.min(3, z));
  const pct = ((clampedZ + 3) / 6) * 100;
  return (
    <div className="w-full mt-2">
      <div className="relative h-2.5 rounded-full overflow-hidden bg-gradient-to-r from-red-600 via-[#C17A3A] via-[#4A7C59] via-[#C17A3A] to-red-600">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md border-2 border-[#2C1A0E] transition-all duration-700"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
      <div className="flex justify-between mt-0.5 text-[9px] text-[#EDE0D0] opacity-50 font-mono">
        <span>-3</span>
        <span>-2</span>
        <span>0</span>
        <span>+2</span>
        <span>+3</span>
      </div>
    </div>
  );
}

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  unit,
  metric,
}: {
  label: string;
  value: number;
  unit: string;
  metric: MetricResult;
}) {
  const cfg = CATEGORY_CONFIG[metric.category];
  if (metric.outOfRange) {
    return (
      <div className="rounded-2xl border border-amber-500/40 bg-amber-900/20 p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider opacity-70">
            {label}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 bg-amber-900/20 text-amber-400">
            Nilai Tidak Realistis
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <p className="text-xs font-body leading-relaxed">
            Nilai{" "}
            <strong>
              {value} {unit}
            </strong>{" "}
            tampak tidak realistis untuk usia ini. Periksa kembali input dan
            satuan pengukuran.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 flex flex-col gap-2",
        cfg.bg,
        cfg.border,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#EDE0D0] uppercase tracking-wider opacity-70">
          {label}
        </span>
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
            cfg.bg,
            cfg.border,
            cfg.color,
          )}
        >
          {cfg.label}
        </span>
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-2xl font-black text-white font-heading">
          {value}
        </span>
        <span className="text-xs text-[#EDE0D0] opacity-60 pb-0.5">{unit}</span>
      </div>
      <div className="flex items-center gap-4 text-xs text-[#EDE0D0] opacity-80">
        <span>
          Z:{" "}
          <span className={cn("font-bold", cfg.color)}>
            {metric.zScore > 0 ? "+" : ""}
            {metric.zScore}
          </span>
        </span>
        <span>
          P: <span className="font-bold text-white">{metric.percentile}%</span>
        </span>
        <span className="opacity-50">
          Median: {metric.median} {unit}
        </span>
      </div>
      <ZBar z={metric.zScore} />
    </div>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────
export default function GrafikBayiCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [dob, setDob] = useState("");
  const [measureDate, setMeasureDate] = useState(() =>
    new Date().toISOString().slice(0, 10),
  );
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("cm");
  const [weightRaw, setWeightRaw] = useState("");
  const [lengthRaw, setLengthRaw] = useState("");
  const [headRaw, setHeadRaw] = useState("");
  const [isPremature, setIsPremature] = useState(false);
  const [gestWeeks, setGestWeeks] = useState("");

  const [result, setResult] = useState<GrowthResult | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<SavedMeasurement[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dob) return setError("Tanggal lahir wajib diisi.");
    if (new Date(measureDate) < new Date(dob))
      return setError("Tanggal pengukuran tidak boleh sebelum tanggal lahir.");

    const weightKg = weightRaw
      ? convertWeight(Number(weightRaw), weightUnit, "kg")
      : undefined;
    const lengthCm = lengthRaw
      ? convertLength(Number(lengthRaw), lengthUnit, "cm")
      : undefined;
    const headCm = headRaw
      ? convertLength(Number(headRaw), lengthUnit, "cm")
      : undefined;

    if (!weightKg && !lengthCm && !headCm)
      return setError(
        "Isi minimal satu pengukuran (berat, panjang, atau lingkar kepala).",
      );

    const input: GrowthInput = {
      gender,
      dob,
      measureDate,
      weight: weightKg,
      length: lengthCm,
      headCirc: headCm,
      isPremature,
      gestWeeks: isPremature && gestWeeks ? Number(gestWeeks) : undefined,
    };

    try {
      setResult(calculateGrowth(input));
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    }
  };

  const handleSave = () => {
    if (!result) return;
    const entry: SavedMeasurement = {
      id: Date.now().toString(),
      date: measureDate,
      ageMonths: result.ageMonths,
      weight: weightRaw
        ? convertWeight(Number(weightRaw), weightUnit, "kg")
        : undefined,
      length: lengthRaw
        ? convertLength(Number(lengthRaw), lengthUnit, "cm")
        : undefined,
      headCirc: headRaw
        ? convertLength(Number(headRaw), lengthUnit, "cm")
        : undefined,
      weightZ: result.weight?.zScore,
      lengthZ: result.length?.zScore,
      headCircZ: result.headCirc?.zScore,
    };
    const updated = [entry, ...history].slice(0, 20);
    setHistory(updated);
    saveHistory(updated);
  };

  const deleteHistory = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    saveHistory(updated);
  };

  const handleReset = () => {
    setDob("");
    setMeasureDate(new Date().toISOString().slice(0, 10));
    setWeightRaw("");
    setLengthRaw("");
    setHeadRaw("");
    setGestWeeks("");
    setIsPremature(false);
    setResult(null);
    setError("");
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Grafik Pertumbuhan Bayi" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Grafik Pertumbuhan Bayi
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Pantau Pertumbuhan Si Kecil Berdasarkan Standar WHO
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Form */}
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
              {(["male", "female"] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all",
                    gender === g
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
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
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
                    value={measureDate}
                    onChange={(e) => setMeasureDate(e.target.value)}
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
                  {(["kg", "lbs"] as WeightUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setWeightUnit(u)}
                      className={cn(
                        "py-1.5 px-2.5 text-xs font-bold rounded transition-all uppercase",
                        weightUnit === u
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
                suffix={weightUnit}
                value={weightRaw}
                onChange={(e) => setWeightRaw(e.target.value)}
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
                  {(["cm", "in"] as LengthUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setLengthUnit(u)}
                      className={cn(
                        "py-1.5 px-2.5 text-xs font-bold rounded transition-all uppercase",
                        lengthUnit === u
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
                suffix={lengthUnit}
                value={lengthRaw}
                onChange={(e) => setLengthRaw(e.target.value)}
                className="py-3 placeholder:opacity-40 rounded-xl flex-1"
                min={1}
                step={0.1}
              />
              <Input
                id="head"
                label="Lingkar Kepala"
                type="number"
                placeholder="43"
                suffix={lengthUnit}
                value={headRaw}
                onChange={(e) => setHeadRaw(e.target.value)}
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
                    checked={isPremature}
                    onChange={(e) => setIsPremature(e.target.checked)}
                    className="rounded text-[#4A7C59]"
                  />
                  <span className="text-sm font-bold text-primary">
                    Bayi lahir prematur
                  </span>
                </label>
                {isPremature && (
                  <div className="relative flex items-center border border-muted bg-white rounded-xl h-10 focus-within:ring-2 focus-within:ring-[#4A7C59]/40 overflow-hidden shadow-sm">
                    <input
                      type="number"
                      placeholder="32"
                      min="22"
                      max="36"
                      value={gestWeeks}
                      onChange={(e) => setGestWeeks(e.target.value)}
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

        {/* Right: Result */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <Card
              variant="default"
              className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#4A7C59]/25 border-[#4A7C59]/25 text-[#E8F5E9] h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/15 via-transparent to-transparent pointer-events-none" />
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />

              <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5 h-full">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#4A7C59] tracking-widest uppercase opacity-80">
                      Standar WHO ·{" "}
                      {result.gender === "male" ? "Laki-laki" : "Perempuan"}
                    </span>
                    <h3 className="text-lg font-extrabold font-heading text-white mt-0.5">
                      Hasil Analisis Pertumbuhan
                    </h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#1A0E07] border border-[#4A7C59]/20 flex items-center justify-center shadow-inner">
                    <Baby className="w-5 h-5 text-[#4A7C59]" />
                  </div>
                </div>

                {/* Age info */}
                <div className="bg-[#1A0E07]/60 rounded-2xl px-4 py-3 border border-white/10 flex flex-wrap gap-4 shadow-inner">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-wider">
                      Usia Kronologis
                    </span>
                    <span className="text-base font-black text-white font-heading">
                      {result.ageMonths} bulan
                    </span>
                  </div>
                  {result.correctedAgeMonths !== null && (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#C17A3A] opacity-90 uppercase tracking-wider">
                        Usia Terkoreksi (Prematur)
                      </span>
                      <span className="text-base font-black text-[#C17A3A] font-heading">
                        {result.correctedAgeMonths} bulan
                      </span>
                    </div>
                  )}
                </div>

                {/* Metrics */}
                <div className="flex flex-col gap-3 flex-1">
                  {result.weight && (
                    <MetricCard
                      label="Berat Badan"
                      value={Number(weightRaw)}
                      unit={weightUnit}
                      metric={result.weight}
                    />
                  )}
                  {result.length && (
                    <MetricCard
                      label="Panjang / Tinggi Badan"
                      value={Number(lengthRaw)}
                      unit={lengthUnit}
                      metric={result.length}
                    />
                  )}
                  {result.headCirc && (
                    <MetricCard
                      label="Lingkar Kepala"
                      value={Number(headRaw)}
                      unit={lengthUnit}
                      metric={result.headCirc}
                    />
                  )}
                </div>

                {/* Legend */}
                <div className="bg-[#1A0E07]/60 rounded-2xl px-4 py-3 border border-white/5 flex items-start gap-2 shadow-inner">
                  <Info className="w-4 h-4 text-[#C17A3A] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#EDE0D0] font-body leading-relaxed opacity-90">
                    <strong>Z-score 0</strong> = rata-rata WHO. Rentang{" "}
                    <strong>-2 s/d +2</strong> dikategorikan{" "}
                    <span className="text-[#4A7C59] font-bold">Normal</span>.
                    Satu kali pengukuran tidak cukup untuk diagnosis—pantau tren
                    dari waktu ke waktu.
                  </p>
                </div>

                {/* Save btn */}
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-[#4A7C59]/40 bg-[#4A7C59]/10 hover:bg-[#4A7C59]/20 text-[#4A7C59] font-bold text-sm transition-all"
                >
                  <Save className="w-4 h-4" /> Simpan Pengukuran Ini
                </button>
              </div>
            </Card>
          ) : (
            <Card
              variant="default"
              className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] relative overflow-hidden shadow-2xl text-[#F5EDE3]"
            >
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative z-10 w-full flex justify-center  mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image
                    src="/bayi.svg"
                    alt="Grafik Bayi Illustration"
                    width={400}
                    height={300}
                    className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
                    priority
                  />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
                  Siap Dipantau
                </h3>
                <p className="text-[#EDE0D0] font-body max-w-[260px] text-base leading-relaxed opacity-90">
                  Isi data bayi dan hasil pengukuran di samping untuk melihat
                  Z-score dan persentil pertumbuhan.
                </p>
                <div className="flex gap-2 mt-6 flex-wrap justify-center">
                  {["Berat Badan", "Panjang Badan", "Lingkar Kepala"].map(
                    (t) => (
                      <span
                        key={t}
                        className="text-xs bg-[#4A7C59]/15 text-[#4A7C59] px-3 py-1.5 rounded-full font-bold border border-[#4A7C59]/20"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white border border-[#EDE0D0] rounded-[2.5rem] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#4A7C59]" />
            <h2 className="text-xl font-bold font-heading text-primary">
              Riwayat Pengukuran
            </h2>
            <span className="text-xs bg-surface text-secondary px-2 py-1 rounded-full font-bold">
              {history.length} catatan
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body min-w-[540px]">
              <thead>
                <tr className="border-b border-muted">
                  <th className="text-left py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                    Tanggal
                  </th>
                  <th className="text-left py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                    Usia
                  </th>
                  <th className="text-right py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                    BB (kg)
                  </th>
                  <th className="text-right py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                    PB (cm)
                  </th>
                  <th className="text-right py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                    LK (cm)
                  </th>
                  <th className="text-center py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-4">
                    Z-BB
                  </th>
                  <th className="py-2 w-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/50">
                {history.map((h) => (
                  <tr
                    key={h.id}
                    className="hover:bg-surface/60 transition-colors"
                  >
                    <td className="py-2.5 pr-4 text-primary font-medium">
                      {h.date}
                    </td>
                    <td className="py-2.5 pr-4 text-secondary">
                      {h.ageMonths} bln
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono">
                      {h.weight?.toFixed(1) ?? "—"}
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono">
                      {h.length?.toFixed(1) ?? "—"}
                    </td>
                    <td className="py-2.5 pr-4 text-right font-mono">
                      {h.headCirc?.toFixed(1) ?? "—"}
                    </td>
                    <td className="py-2.5 pr-4 text-center">
                      {h.weightZ !== undefined ? (
                        <span
                          className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded-full",
                            Math.abs(h.weightZ) <= 2
                              ? "bg-[#4A7C59]/10 text-[#4A7C59]"
                              : "bg-[#9C4A2A]/10 text-[#FF8A65]",
                          )}
                        >
                          {h.weightZ > 0 ? "+" : ""}
                          {h.weightZ}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => deleteHistory(h.id)}
                        className="p-1 text-accent-3 hover:text-accent-3/80 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Educational Section */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Pertumbuhan & Pediatri
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami Grafik Pertumbuhan Bayi
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                Grafik pertumbuhan bukan hanya angka—ia adalah narasi visual
                tentang kesehatan dan perkembangan si kecil dari waktu ke waktu.
                Memahami cara membacanya membekali Anda untuk berdiskusi lebih
                cerdas bersama dokter anak.
              </p>
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Standar WHO didasarkan pada data anak-anak sehat dari enam
                    negara—Brazil, Ghana, India, Norwegia, Oman, dan Amerika
                    Serikat—yang dibesarkan dalam kondisi optimal.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Kalkulator ini menggunakan metode LMS WHO untuk menghitung
                    Z-score dan persentil secara akurat. Tren pertumbuhan lebih
                    bermakna dari satu pengukuran tunggal.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Persentil & Z-score */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Membaca Persentil & Z-score
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                <div>
                  <h5 className="font-bold text-xl text-white mb-4">
                    Apa itu Persentil?
                  </h5>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed mb-4 opacity-90">
                    Persentil menunjukkan bagaimana pengukuran bayi Anda
                    dibandingkan dengan 100 bayi sehat lain dengan usia dan
                    jenis kelamin yang sama. Persentil ke-50 berarti tepat di
                    tengah distribusi.
                  </p>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed opacity-90">
                    Tidak ada persentil "terbaik"—yang penting adalah{" "}
                    <strong>konsistensi dan tren</strong>. Bayi yang stabil di
                    persentil ke-10 jauh lebih sehat dari bayi yang tiba-tiba
                    turun dari P70 ke P20.
                  </p>
                </div>
                <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                  <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-4">
                    Interpretasi Z-score
                  </h5>
                  <div className="space-y-3">
                    {[
                      {
                        range: "Z < -3",
                        label: "Sangat Kurang",
                        color: "text-red-400",
                        bg: "bg-red-900/20",
                      },
                      {
                        range: "-3 sampai -2",
                        label: "Di Bawah Normal",
                        color: "text-[#FF8A65]",
                        bg: "bg-[#9C4A2A]/20",
                      },
                      {
                        range: "-2 sampai +2",
                        label: "Normal (WHO)",
                        color: "text-[#4A7C59]",
                        bg: "bg-[#4A7C59]/20",
                      },
                      {
                        range: "+2 sampai +3",
                        label: "Di Atas Normal",
                        color: "text-[#C17A3A]",
                        bg: "bg-[#C17A3A]/20",
                      },
                      {
                        range: "Z > +3",
                        label: "Sangat Tinggi",
                        color: "text-red-400",
                        bg: "bg-red-900/20",
                      },
                    ].map(({ range, label, color, bg }) => (
                      <div
                        key={range}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-xl",
                          bg,
                        )}
                      >
                        <span className="text-xs font-mono text-[#EDE0D0] opacity-80">
                          {range}
                        </span>
                        <span className={cn("text-xs font-bold", color)}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Metode LMS */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Metode Perhitungan LMS
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed mb-4 opacity-90">
                    WHO menggunakan metode{" "}
                    <strong>LMS (Lambda-Mu-Sigma)</strong> untuk menghitung
                    Z-score yang memperhitungkan distribusi data yang tidak
                    simetris pada anak-anak.
                  </p>
                  <ul className="space-y-3 text-sm font-body text-[#EDE0D0]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>L (Lambda)</strong>: Nilai transformasi Box-Cox
                        untuk mengoreksi skewness data
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>M (Mu)</strong>: Nilai median (persentil ke-50)
                        pada usia tertentu
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>S (Sigma)</strong>: Koefisien variasi—ukuran
                        sebaran data di sekitar median
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#1A0E07]/60 p-5 rounded-2xl border border-white/10 shadow-inner">
                  <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-4">
                    Rumus Z-score LMS
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-[#2C1A0E] p-3 rounded-xl border border-[#4A7C59]/20">
                      <p className="text-[10px] text-[#EDE0D0] opacity-60 mb-1">
                        Jika L ≠ 0:
                      </p>
                      <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                        Z = ((X/M)^L − 1) / (L × S)
                      </span>
                    </div>
                    <div className="bg-[#2C1A0E] p-3 rounded-xl border border-[#4A7C59]/20">
                      <p className="text-[10px] text-[#EDE0D0] opacity-60 mb-1">
                        Jika L = 0:
                      </p>
                      <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                        Z = ln(X/M) / S
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Bayi Prematur */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Usia Terkoreksi untuk Bayi Prematur
                </h3>
              </div>
              <div className="bg-[#1A0E07]/40 rounded-[2rem] p-6 sm:p-8 border border-[#7A5C42]/30 shadow-sm">
                <p className="text-[#EDE0D0] text-sm font-body leading-relaxed mb-4 opacity-90">
                  Bayi yang lahir sebelum 37 minggu kehamilan memiliki pola
                  perkembangan berbeda. <strong>Usia terkoreksi</strong>{" "}
                  dihitung untuk membandingkan pertumbuhan mereka secara lebih
                  adil:
                </p>
                <div className="bg-[#2C1A0E] p-4 rounded-xl border border-[#4A7C59]/20 mb-4">
                  <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                    Usia Terkoreksi = Usia Kronologis − (40 − Minggu Gestasi)
                  </span>
                </div>
                <p className="text-[#EDE0D0] text-xs font-body leading-relaxed opacity-80">
                  Contoh: Bayi berusia 6 bulan yang lahir di 32 minggu → Usia
                  terkoreksi = 6 − (40−32)/4.3 ≈ 4.1 bulan. Koreksi usia umumnya
                  dilakukan hingga anak berusia 2 tahun.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">
                  Pertanyaan Umum (FAQ)
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                      Apakah persentil rendah selalu jadi masalah?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak selalu. Yang paling penting adalah konsistensi tren.
                      Bayi yang terus tumbuh mengikuti kurvanya sendiri—meski di
                      P5 sekalipun—biasanya sehat. Masalah muncul saat ada
                      penurunan tren yang signifikan antar pengukuran.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                      Seberapa sering saya harus mengukur?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      WHO merekomendasikan pemantauan di kunjungan rutin: setiap
                      bulan pada 6 bulan pertama, setiap 2 bulan dari 6–12
                      bulan, lalu setiap 3–6 bulan setelahnya. Konsultasikan
                      jadwal yang tepat dengan dokter anak Anda.
                    </p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Bisakah saya mengandalkan kalkulator ini untuk diagnosis?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak. Alat ini bersifat informatif dan edukatif semata.
                      Diagnosis pertumbuhan membutuhkan evaluasi klinis
                      menyeluruh oleh dokter anak yang mempertimbangkan riwayat
                      dan konteks kesehatan anak secara lengkap.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Sampai usia berapa kalkulator ini berlaku?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Kalkulator ini menggunakan referensi WHO untuk usia 0–60
                      bulan (5 tahun). Di luar rentang ini, standar yang berlaku
                      berbeda dan kalkulator ini tidak lagi akurat.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#4A7C59]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-[#4A7C59]/5 pointer-events-none" />
              <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">
                Setiap Pengukuran Adalah Cerita
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed relative z-10">
                Gunakan tombol "Simpan Pengukuran" setelah setiap sesi untuk
                membangun rekam jejak pertumbuhan si kecil. Data yang
                terdokumentasi baik adalah aset berharga dalam setiap kunjungan
                ke dokter anak.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/grafik-bayi" />
    </div>
  );
}
