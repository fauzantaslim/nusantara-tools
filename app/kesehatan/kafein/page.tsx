"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import {
  calculateCaffeine,
  CaffeineResult,
  CaffeineEntry,
  CaffeineInput,
  CAFFEINE_SOURCES,
  UserProfile,
  WeightUnit,
  PROFILE_LABELS,
} from "@/features/kafein/utils";
import {
  Plus,
  Trash2,
  ArrowRight,
  ShieldAlert,
  Info,
  Coffee,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
  Clock,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedHealthTools } from "../components/RelatedHealthTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import Image from "next/image";

let entryIdCounter = 0;
function newEntry(): CaffeineEntry {
  return { id: `entry-${++entryIdCounter}`, sourceId: "kopi", quantity: 1 };
}

const STATUS_CONFIG = {
  Safe: {
    bg: "bg-[#4A7C59]/15",
    border: "border-[#4A7C59]/40",
    text: "text-[#4A7C59]",
    icon: CheckCircle2,
    label: "Aman",
  },
  Moderate: {
    bg: "bg-[#C17A3A]/15",
    border: "border-[#C17A3A]/40",
    text: "text-[#C17A3A]",
    icon: AlertTriangle,
    label: "Moderat",
  },
  High: {
    bg: "bg-[#9C4A2A]/15",
    border: "border-[#9C4A2A]/40",
    text: "text-[#FF8A65]",
    icon: AlertTriangle,
    label: "Tinggi",
  },
  Excessive: {
    bg: "bg-red-900/20",
    border: "border-red-500/40",
    text: "text-red-400",
    icon: XCircle,
    label: "Berlebihan",
  },
};

export default function CaffeineCalculator() {
  const [entries, setEntries] = useState<CaffeineEntry[]>([newEntry()]);
  const [profile, setProfile] = useState<UserProfile>("adult");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyWeightUnit, setBodyWeightUnit] = useState<WeightUnit>("kg");

  const [result, setResult] = useState<CaffeineResult | null>(null);
  const [error, setError] = useState("");

  const addEntry = () => setEntries((prev) => [...prev, newEntry()]);

  const removeEntry = (id: string) => {
    if (entries.length <= 1) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEntry = (id: string, patch: Partial<CaffeineEntry>) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
  };

  const handleReset = () => {
    setEntries([newEntry()]);
    setBodyWeight("");
    setResult(null);
    setError("");
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    for (const entry of entries) {
      if (entry.quantity <= 0) {
        setError("Jumlah pada setiap sumber harus lebih dari 0.");
        setResult(null);
        return;
      }
      if (
        entry.sourceId === "custom" &&
        (!entry.customMg || entry.customMg <= 0)
      ) {
        setError("Masukkan kandungan kafein (mg) untuk sumber kustom Anda.");
        setResult(null);
        return;
      }
    }

    if (bodyWeight && Number(bodyWeight) <= 0) {
      setError("Berat badan harus berupa angka positif.");
      setResult(null);
      return;
    }

    const input: CaffeineInput = {
      entries,
      profile,
      bodyWeight: bodyWeight ? Number(bodyWeight) : undefined,
      bodyWeightUnit,
    };

    setResult(calculateCaffeine(input));
  };

  const progressPercent = result
    ? Math.min((result.totalMg / result.recommendedLimitMg) * 100, 100)
    : 0;

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Kafein Aman" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Kafein Aman
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Pantau Total Asupan Kafein Harian Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Input Form */}
        <Card
          variant="default"
          className="lg:col-span-6 flex flex-col gap-6 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full "
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <Coffee className="w-6 h-6 text-[#C17A3A]" />
              Sumber Kafein Hari Ini
            </h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
              Tambahkan semua minuman dan makanan berkafein yang Anda konsumsi
              hari ini.
            </p>
          </div>

          <form
            onSubmit={handleCalculate}
            className="flex flex-col gap-6 relative z-10"
          >
            {/* Profile */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold font-ui text-primary flex items-center gap-1.5">
                <User className="w-4 h-4" /> Profil Pengguna
              </label>
              <div className="grid grid-cols-3 gap-2 bg-surface p-1.5 rounded-xl">
                {(["adult", "pregnant", "teen"] as UserProfile[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProfile(p)}
                    className={cn(
                      "py-2 px-1 text-xs font-bold rounded-lg transition-all text-center",
                      profile === p
                        ? "bg-white text-primary shadow-sm"
                        : "text-secondary hover:text-primary",
                    )}
                  >
                    {p === "adult"
                      ? "Dewasa"
                      : p === "pregnant"
                        ? "Hamil/Menyusui"
                        : "Remaja"}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-secondary opacity-70 font-body">
                Batas harian: {PROFILE_LABELS[profile]}
              </p>
            </div>

            {/* Caffeine Sources */}
            <div className="flex flex-col gap-3">
              {entries.map((entry, idx) => {
                const source = CAFFEINE_SOURCES.find(
                  (s) => s.id === entry.sourceId,
                );
                return (
                  <div
                    key={entry.id}
                    className="bg-surface rounded-2xl p-4 border border-muted/50 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                        Sumber #{idx + 1}
                      </span>
                      {entries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEntry(entry.id)}
                          className="text-accent-3 hover:text-accent-3/80 transition p-1 rounded-lg hover:bg-accent-3/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Source dropdown */}
                    <div className="relative">
                      <select
                        value={entry.sourceId}
                        onChange={(e) =>
                          updateEntry(entry.id, {
                            sourceId: e.target.value,
                            customMg: undefined,
                          })
                        }
                        className="w-full h-11 rounded-xl border bg-white px-3 text-sm text-primary font-ui font-medium appearance-none border-muted focus:ring-2 focus:ring-[#C17A3A]/40 focus:outline-none"
                      >
                        {CAFFEINE_SOURCES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}{" "}
                            {s.mgPerUnit > 0 ? `(${s.mgPerUnit}mg)` : ""}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <svg
                          className="h-4 w-4 text-secondary opacity-40"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {/* Quantity */}
                      <div className="flex-1">
                        <div className="relative flex items-center border border-muted bg-white rounded-xl h-11 focus-within:ring-2 focus-within:ring-[#C17A3A]/40 overflow-hidden transition-colors shadow-sm">
                          <input
                            type="number"
                            placeholder="1"
                            min="0.5"
                            step="0.5"
                            value={entry.quantity}
                            onChange={(e) =>
                              updateEntry(entry.id, {
                                quantity: Number(e.target.value),
                              })
                            }
                            className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-primary outline-none"
                            required
                          />
                          <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">
                            {source?.unit ?? "sajian"}
                          </span>
                        </div>
                      </div>

                      {/* Custom mg (only if custom source) */}
                      {entry.sourceId === "custom" && (
                        <div className="flex-1">
                          <div className="relative flex items-center border border-muted bg-white rounded-xl h-11 focus-within:ring-2 focus-within:ring-[#C17A3A]/40 overflow-hidden transition-colors shadow-sm">
                            <input
                              type="number"
                              placeholder="Kafein (mg)"
                              min="1"
                              value={entry.customMg ?? ""}
                              onChange={(e) =>
                                updateEntry(entry.id, {
                                  customMg: Number(e.target.value),
                                })
                              }
                              className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-primary outline-none"
                              required
                            />
                            <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">
                              mg
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Per-entry subtotal badge */}
                      {entry.sourceId !== "custom" && (
                        <div className="flex items-center justify-center bg-[#C17A3A]/10 border border-[#C17A3A]/20 rounded-xl px-3 min-w-[64px]">
                          <span className="text-sm font-black text-[#C17A3A] font-heading">
                            {Math.round(
                              (source?.mgPerUnit ?? 0) * entry.quantity,
                            )}
                          </span>
                          <span className="text-[10px] text-[#C17A3A] ml-1 opacity-70">
                            mg
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={addEntry}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-muted hover:border-[#C17A3A]/40 hover:bg-[#C17A3A]/5 text-secondary hover:text-[#C17A3A] transition-all font-bold text-sm"
              >
                <Plus className="w-4 h-4" /> Tambah Sumber Kafein
              </button>
            </div>

            {/* Optional: Body Weight */}
            <details className="group [&_summary::-webkit-details-marker]:hidden bg-surface rounded-2xl border border-muted/50 overflow-hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-4 font-bold hover:bg-white/50 transition-colors">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#C17A3A]" />
                  <span className="text-sm font-medium text-primary">
                    Berat Badan (Opsional)
                  </span>
                </div>
                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
              <div className="px-4 pb-5 space-y-4 border-t border-muted/30 pt-4">
                <p className="text-xs text-secondary font-body opacity-70">
                  Masukkan berat badan untuk mendapatkan analisis kafein per
                  kilogram berat badan (batas aman: 6mg/kg).
                </p>
                <div className="flex gap-3">
                  <div className="bg-surface p-1 rounded-lg flex items-center shrink-0">
                    {(["kg", "lbs"] as WeightUnit[]).map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setBodyWeightUnit(u)}
                        className={cn(
                          "py-1.5 px-3 text-xs font-bold rounded transition-all uppercase",
                          bodyWeightUnit === u
                            ? "bg-white text-primary shadow-sm"
                            : "text-secondary hover:text-primary",
                        )}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                  <div className="relative flex items-center border border-muted bg-white rounded-xl h-10 focus-within:ring-2 focus-within:ring-[#C17A3A]/40 overflow-hidden flex-1 transition-colors shadow-sm">
                    <input
                      type="number"
                      placeholder={bodyWeightUnit === "kg" ? "65" : "145"}
                      min="1"
                      value={bodyWeight}
                      onChange={(e) => setBodyWeight(e.target.value)}
                      className="flex-1 h-full bg-transparent px-3 text-sm font-bold text-primary outline-none"
                    />
                    <span className="pr-3 text-xs text-secondary font-bold select-none opacity-50">
                      {bodyWeightUnit}
                    </span>
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

            <div className="flex gap-3">
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
                Hitung Kafein Saya
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Right: Results */}
        <div className="lg:col-span-6 h-full">
          {result ? (
            (() => {
              const sc = STATUS_CONFIG[result.status];
              const StatusIcon = sc.icon;
              return (
                <Card
                  variant="default"
                  className="flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] ring-4 ring-inset ring-[#C17A3A]/25 border-[#C17A3A]/25 text-[#FFF3E0] h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C17A3A]/15 via-transparent to-transparent pointer-events-none" />
                  <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                    }}
                  />

                  <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5">
                    {/* Status Badge & Total */}
                    <div className="flex flex-col items-center text-center pt-2">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border shadow-inner",
                          sc.bg,
                          sc.border,
                        )}
                      >
                        <StatusIcon className={cn("w-7 h-7", sc.text)} />
                      </div>
                      <span
                        className={cn(
                          "text-xs font-bold tracking-widest uppercase mb-1 opacity-90 px-3 py-1 rounded-full border",
                          sc.bg,
                          sc.border,
                          sc.text,
                        )}
                      >
                        Status: {sc.label}
                      </span>
                      <div className="flex items-end justify-center gap-2 mt-4 mb-1">
                        <div className="text-[4rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-[#FFF3E0] drop-shadow-md">
                          {result.totalMg}
                        </div>
                        <span className="text-2xl font-bold pb-3 text-[#C17A3A]">
                          mg
                        </span>
                      </div>
                      <p className="text-xs text-[#EDE0D0] opacity-70 font-body">
                        Total kafein hari ini
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-[#EDE0D0] opacity-80">
                          Asupan vs Batas Aman
                        </span>
                        <span className="text-xs font-bold text-[#C17A3A]">
                          Batas: {result.recommendedLimitMg} mg
                        </span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            result.status === "Safe"
                              ? "bg-[#4A7C59]"
                              : result.status === "Moderate"
                                ? "bg-[#C17A3A]"
                                : result.status === "High"
                                  ? "bg-[#9C4A2A]"
                                  : "bg-red-500",
                          )}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#EDE0D0] opacity-60 mt-2">
                        {Math.round(progressPercent)}% dari batas harian{" "}
                        {profile === "adult"
                          ? "dewasa (400mg)"
                          : profile === "pregnant"
                            ? "ibu hamil (200mg)"
                            : "remaja (100mg)"}
                      </p>
                    </div>

                    {/* Per Body Weight (if provided) */}
                    {result.perBodyWeightMgKg !== null && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#1A0E07]/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center shadow-inner">
                          <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-60">
                            Per Berat Badan
                          </span>
                          <span className="text-xl font-black text-white font-heading">
                            {result.perBodyWeightMgKg}
                          </span>
                          <span className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5">
                            mg/kg
                          </span>
                        </div>
                        <div className="bg-[#1A0E07]/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center shadow-inner">
                          <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider mb-1 opacity-60">
                            Limit per Berat
                          </span>
                          <span className="text-xl font-black text-white font-heading">
                            {result.perBodyWeightLimit}
                          </span>
                          <span className="text-[10px] text-[#EDE0D0] opacity-60 mt-0.5">
                            mg (6mg/kg)
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Insight */}
                    <div
                      className={cn(
                        "rounded-2xl p-4 border flex gap-3 shadow-inner",
                        sc.bg,
                        sc.border,
                      )}
                    >
                      <Info
                        className={cn("w-5 h-5 shrink-0 mt-0.5", sc.text)}
                      />
                      <p
                        className={cn(
                          "text-sm font-body leading-relaxed",
                          sc.text,
                        )}
                      >
                        {result.insight}
                      </p>
                    </div>

                    {/* Breakdown Table */}
                    {result.breakdown.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Coffee className="w-3.5 h-3.5" /> Rincian Per Sumber
                        </h4>
                        <div className="rounded-2xl overflow-hidden border border-white/10">
                          <div className="grid grid-cols-4 bg-[#1A0E07]/80 px-4 py-2">
                            <span className="text-[10px] font-bold text-[#C17A3A] uppercase col-span-2">
                              Sumber
                            </span>
                            <span className="text-[10px] font-bold text-[#EDE0D0] uppercase text-center">
                              Qty
                            </span>
                            <span className="text-[10px] font-bold text-[#EDE0D0] uppercase text-right">
                              Total
                            </span>
                          </div>
                          <div className="divide-y divide-white/5">
                            {result.breakdown.map((b, idx) => (
                              <div
                                key={idx}
                                className="grid grid-cols-4 px-4 py-2.5 hover:bg-white/5 transition-colors"
                              >
                                <span className="text-xs text-[#FFF3E0] col-span-2 truncate pr-2">
                                  {b.name}
                                </span>
                                <span className="text-xs text-[#EDE0D0] text-center opacity-70">
                                  ×{b.quantity}
                                </span>
                                <span className="text-xs font-bold text-white text-right">
                                  {Math.round(b.totalMg)} mg
                                </span>
                              </div>
                            ))}
                            <div className="grid grid-cols-4 px-4 py-2.5 bg-[#C17A3A]/10">
                              <span className="text-xs font-bold text-[#C17A3A] col-span-3">
                                Total
                              </span>
                              <span className="text-sm font-black text-[#C17A3A] text-right">
                                {result.totalMg} mg
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })()
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

              <div className="relative z-10">
                <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
                <div className="relative z-10 w-full flex justify-center  mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image
                    src="/kafein.svg"
                    alt="BMI Calculator Illustration"
                    width={400}
                    height={300}
                    className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight relative z-10">
                Kalkulator Siap
              </h3>
              <p className="text-[#EDE0D0] font-body max-w-[280px] text-base leading-relaxed relative z-10 opacity-90">
                Tambahkan sumber kafein Anda hari ini dan klik "Hitung" untuk
                melihat status asupan Anda.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Educational Section */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Kesehatan & Nutrisi
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami Kafein dan Batas Amannya
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                Kafein adalah senyawa psikoaktif yang paling luas dikonsumsi di
                dunia. Memahami cara kerjanya—dan di mana batas toleransi harian
                yang sehat—dapat membantu Anda membuat keputusan konsumsi yang
                lebih cerdas.
              </p>
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Kafein bekerja dengan memblokir adenosin—neurotransmitter
                    yang mendorong rasa kantuk—sehingga secara temporer
                    meningkatkan kewaspadaan dan mengurangi kelelahan yang
                    dirasakan.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Kalkulator ini membantu Anda memantau akumulasi kafein dari
                    seluruh sumber harian dan membandingkannya terhadap pedoman
                    keamanan berbasis profil kesehatan yang berlaku.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Batas Rekomendasi */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Batas Aman Berdasarkan Profil
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                  <span className="text-xs font-bold bg-[#4A7C59]/20 text-[#E8F5E9] px-2.5 py-1 rounded-full font-mono block mb-3 w-fit">
                    ≤ 400 mg/hari
                  </span>
                  <h4 className="text-xl font-bold font-heading text-[#E8F5E9] mb-2">
                    Dewasa Sehat
                  </h4>
                  <p className="text-[#E8F5E9]/80 text-sm font-body leading-relaxed">
                    Batas aman yang ditetapkan untuk sebagian besar orang dewasa
                    normal. Setara dengan sekitar 4 cangkir kopi standar sehari.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30">
                  <span className="text-xs font-bold bg-[#C17A3A]/20 text-[#FFF3E0] px-2.5 py-1 rounded-full font-mono block mb-3 w-fit">
                    ≤ 200 mg/hari
                  </span>
                  <h4 className="text-xl font-bold font-heading text-[#FFF3E0] mb-2">
                    Hamil / Menyusui
                  </h4>
                  <p className="text-[#FFF3E0]/80 text-sm font-body leading-relaxed">
                    Kafein menembus plasenta. WHO dan sebagian besar lembaga
                    kesehatan merekomendasikan pemotongan setengah dari batas
                    normal selama kehamilan.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono block mb-3 w-fit">
                    ≤ 100 mg/hari
                  </span>
                  <h4 className="text-xl font-bold font-heading text-white mb-2">
                    Remaja (12–18)
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Sistem saraf yang masih berkembang lebih sensitif terhadap
                    stimulan. Batas ketat diperlukan untuk mencegah gangguan
                    tidur dan kecemasan.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Half-Life & Sumber Kafein */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Metabolisme & Sumber Umum Kafein
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                <div>
                  <h5 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#C17A3A]" /> Waktu Paruh
                    Kafein
                  </h5>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-5 opacity-90">
                    Kafein memiliki <strong>waktu paruh 5–6 jam</strong> pada
                    orang dewasa sehat. Artinya, separuh dari kafein yang Anda
                    konsumsi pukul 14:00 masih aktif di sistem Anda saat pukul
                    20:00. Eliminasi penuh bisa memakan waktu{" "}
                    <strong>10–12 jam</strong>.
                  </p>
                  <ul className="space-y-3 text-sm font-body text-[#EDE0D0]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        Hindari kafein setidaknya{" "}
                        <strong>6 jam sebelum tidur</strong> untuk menjaga
                        kualitas tidur.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        Sensitivitas terhadap kafein meningkat pada orang dengan
                        kondisi <strong>kecemasan, hipertensi</strong>, atau
                        penggunaan obat-obatan tertentu.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                  <h5 className="font-bold text-sm text-[#C17A3A] uppercase tracking-widest mb-4">
                    Kandungan Kafein Umum
                  </h5>
                  <div className="space-y-2 text-sm font-body">
                    {[
                      ["Kopi (8 oz)", "80–100 mg"],
                      ["Espresso (1 shot)", "63 mg"],
                      ["Teh Hitam (8 oz)", "47 mg"],
                      ["Teh Hijau (8 oz)", "28 mg"],
                      ["Cola (12 oz)", "35 mg"],
                      ["Minuman Energi (8 oz)", "70–100 mg"],
                      ["Cokelat Hitam (1 oz)", "12 mg"],
                    ].map(([source, mg]) => (
                      <div
                        key={source}
                        className="flex justify-between text-[#EDE0D0]"
                      >
                        <span className="opacity-80">{source}</span>
                        <span className="font-bold text-[#C17A3A]">{mg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Efek & Tips */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Efek & Manfaat Memantau Kafein
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-8 h-8 text-[#4A7C59] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Tidur Lebih Berkualitas
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Mengetahui waktu paruh kafein membantu Anda memilih waktu
                    konsumsi yang tidak mengganggu siklus tidur dan pemulihan
                    malam hari.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <AlertTriangle className="w-8 h-8 text-[#C17A3A] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Cegah Efek Berlebihan
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Konsumsi berlebih memicu gelisah, jantung berdebar, sakit
                    kepala, dan kecemasan. Pemantauan rutin mencegah tubuh masuk
                    ke zona berisiko.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-[#9C4A2A] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Kesadaran Nutrisi
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Banyak orang tidak menyadari berapa banyak kafein yang
                    mereka konsumsi dari berbagai sumber. Kalkulator ini
                    membangun kesadaran holistik.
                  </p>
                </div>
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
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Berapa banyak kafein yang terlalu banyak?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Untuk dewasa sehat, lebih dari 400mg per hari mulai
                      meningkatkan risiko efek samping. Ini dapat bervariasi
                      tergantung berat badan, usia, genetik, dan kondisi
                      kesehatan individual.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Bisakah saya mencatat beberapa minuman sekaligus?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Ya! Gunakan tombol "+ Tambah Sumber Kafein" untuk
                      menambahkan setiap minuman atau makanan secara terpisah.
                      Kalkulator akan menjumlahkan semuanya secara otomatis.
                    </p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Mengapa berat badan perlu dimasukkan?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Berat badan memungkinkan perhitungan kafein per kg berat
                      badan (panduan umum: batas aman ≈ 6mg/kg). Ini memberikan
                      perspektif yang lebih personal dibanding angka absolut
                      400mg.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Apakah kalkulator ini cocok untuk remaja?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Ya, pilih profil "Remaja" dan kalkulator akan menggunakan
                      batas yang lebih ketat (100mg). Untuk anak di bawah 12
                      tahun, kafein sebaiknya tidak dikonsumsi sama sekali.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#C17A3A]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-[#C17A3A]/5 pointer-events-none" />
              <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">
                Jadikan Kafein Sekutu, Bukan Musuh
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed relative z-10">
                Dengan kesadaran yang tepat tentang asupan harian, kafein bisa
                menjadi pendukung produktivitas yang efektif. Kombinasikan
                insight dari Kalkulator Kafein ini dengan Kalkulator Kebutuhan
                Air dan Kalkulator Siklus Tidur untuk rutinitas kesehatan yang
                benar-benar holistik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/kafein" />
    </div>
  );
}
