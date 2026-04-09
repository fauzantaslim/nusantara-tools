"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import {
  analyzeBP,
  analyzeTrend,
  CATEGORY_META,
  BPResult,
  SavedReading,
  BPInput,
  BodyPosition,
  Arm,
  systolicToPercent,
  TrendDirection,
} from "@/features/tekanan-darah/utils";
import {
  ArrowRight,
  ShieldAlert,
  Info,
  RefreshCw,
  HeartPulse,
  TrendingDown,
  TrendingUp,
  Minus,
  Trash2,
  Save,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import Image from "next/image";

const STORAGE_KEY = "nusantara-tensi-history";

function loadHistory(): SavedReading[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function saveHistory(data: SavedReading[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ─── Scale component ──────────────────────────────────────────────────────────
const SCALE_BANDS: {
  label: string;
  from: number;
  to: number;
  color: string;
}[] = [
  { label: "Rendah", from: 0, to: 12.3, color: "bg-blue-600/60" }, // <90
  { label: "Normal", from: 12.3, to: 38.5, color: "bg-[#4A7C59]/80" }, // 90–120
  { label: "Elevated", from: 38.5, to: 46.2, color: "bg-[#C17A3A]/80" }, // 120–129
  { label: "H.1", from: 46.2, to: 53.8, color: "bg-orange-600/80" }, // 130–139
  { label: "H.2", from: 53.8, to: 84.6, color: "bg-red-600/80" }, // 140–180
  { label: "Krisis", from: 84.6, to: 100, color: "bg-red-900/90" }, // 180+
];

function BPScale({ systolic }: { systolic?: number }) {
  const pct = systolic !== undefined ? systolicToPercent(systolic) : null;
  return (
    <div className="w-full">
      <div className="flex h-5 rounded-full overflow-hidden w-full relative shadow-inner">
        {SCALE_BANDS.map((b) => (
          <div
            key={b.label}
            className={cn("h-full", b.color)}
            style={{ width: `${b.to - b.from}%` }}
          />
        ))}
        {pct !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-[#2C1A0E] transition-all duration-700 z-10"
            style={{ left: `calc(${pct}% - 8px)` }}
          />
        )}
      </div>
      <div className="flex justify-between mt-1 text-[9px] text-[#EDE0D0] opacity-50 font-mono select-none">
        <span>70</span>
        <span>90</span>
        <span>120</span>
        <span>130</span>
        <span>140</span>
        <span>180</span>
        <span>200+</span>
      </div>
      <div className="flex mt-0.5" style={{ gap: 0 }}>
        {SCALE_BANDS.map((b) => (
          <div
            key={b.label}
            className="text-[8px] text-[#EDE0D0] opacity-40 text-center truncate"
            style={{ width: `${b.to - b.from}%` }}
          >
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Trend icon ───────────────────────────────────────────────────────────────
function TrendBadge({ trend }: { trend: TrendDirection }) {
  if (trend === "insufficient") return null;
  const cfg = {
    improving: {
      icon: TrendingDown,
      label: "Membaik 📉",
      color: "text-[#4A7C59]",
      bg: "bg-[#4A7C59]/15",
      border: "border-[#4A7C59]/30",
    },
    worsening: {
      icon: TrendingUp,
      label: "Memburuk 📈",
      color: "text-[#9C4A2A]",
      bg: "bg-[#9C4A2A]/15",
      border: "border-[#9C4A2A]/30",
    },
    stable: {
      icon: Minus,
      label: "Stabil",
      color: "text-[#C17A3A]",
      bg: "bg-[#C17A3A]/15",
      border: "border-[#C17A3A]/30",
    },
  }[trend];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold",
        cfg.bg,
        cfg.border,
        cfg.color,
      )}
    >
      <Icon className="w-3 h-3" /> Tren: {cfg.label}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function TekananDarahCalculator() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [datetime, setDatetime] = useState(() =>
    new Date().toISOString().slice(0, 16),
  );
  const [position, setPosition] = useState<BodyPosition>("sitting");
  const [arm, setArm] = useState<Arm>("left");
  const [notes, setNotes] = useState("");

  const [result, setResult] = useState<BPResult | null>(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<SavedReading[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const trend = analyzeTrend(history);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const sys = Number(systolic);
    const dia = Number(diastolic);
    if (!sys || !dia)
      return setError("Tekanan sistolik dan diastolik wajib diisi.");
    if (sys <= 0 || dia <= 0)
      return setError("Nilai tekanan darah harus berupa angka positif.");
    if (sys < dia)
      return setError("Tekanan sistolik harus lebih besar dari diastolik.");
    const input: BPInput = {
      systolic: sys,
      diastolic: dia,
      heartRate: heartRate ? Number(heartRate) : undefined,
      datetime,
      position,
      arm,
      notes: notes || undefined,
    };
    setResult(analyzeBP(input));
  };

  const handleSave = () => {
    if (!result) return;
    const entry: SavedReading = {
      ...result,
      id: Date.now().toString(),
      datetime,
      position,
      arm,
      notes: notes || undefined,
    };
    const updated = [entry, ...history].slice(0, 30);
    setHistory(updated);
    saveHistory(updated);
  };

  const deleteReading = (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    saveHistory(updated);
  };

  const handleReset = () => {
    setSystolic("");
    setDiastolic("");
    setHeartRate("");
    setNotes("");
    setDatetime(new Date().toISOString().slice(0, 16));
    setResult(null);
    setError("");
  };

  const meta = result ? CATEGORY_META[result.category] : null;

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Tekanan Darah" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Tekanan Darah
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Analisis & Pantau Kesehatan Kardiovaskular Anda
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
            {/* Systolic & Diastolic — primary */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
                  Sistolik (atas)
                </label>
                <div className="relative flex items-center border-2 border-muted rounded-xl h-14 focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20 overflow-hidden transition-all shadow-sm bg-white">
                  <input
                    type="number"
                    placeholder="120"
                    min={40}
                    max={300}
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    required
                    className="flex-1 h-full bg-transparent px-4 text-2xl font-black text-primary outline-none font-heading"
                  />
                  <span className="pr-4 text-xs text-secondary font-bold opacity-50 shrink-0">
                    mmHg
                  </span>
                </div>
              </div>
              <div className="flex items-center pt-6">
                <span className="text-3xl font-light text-secondary opacity-30">
                  /
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
                  Diastolik (bawah)
                </label>
                <div className="relative flex items-center border-2 border-muted rounded-xl h-14 focus-within:border-[#C17A3A] focus-within:ring-2 focus-within:ring-[#C17A3A]/20 overflow-hidden transition-all shadow-sm bg-white">
                  <input
                    type="number"
                    placeholder="80"
                    min={20}
                    max={200}
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    required
                    className="flex-1 h-full bg-transparent px-4 text-2xl font-black text-primary outline-none font-heading"
                  />
                  <span className="pr-4 text-xs text-secondary font-bold opacity-50 shrink-0">
                    mmHg
                  </span>
                </div>
              </div>
            </div>

            {/* Heart rate */}
            <Input
              id="heart-rate"
              label="Denyut Jantung (Opsional)"
              type="number"
              placeholder="72"
              suffix="bpm"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              className="py-3 placeholder:opacity-40 rounded-xl"
              min={30}
              max={250}
            />

            {/* Date time */}
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
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  className="w-full h-full bg-transparent pl-9 pr-3 text-sm font-bold text-primary outline-none"
                />
              </div>
            </div>

            {/* Position & Arm */}
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
                  Posisi
                </label>
                <div className="relative">
                  <select
                    value={position}
                    onChange={(e) =>
                      setPosition(e.target.value as BodyPosition)
                    }
                    className="w-full h-11 rounded-xl border-2 border-muted bg-white px-3 text-sm font-bold text-primary appearance-none cursor-pointer focus:border-[#C17A3A] focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/20 hover:border-[#7A5C42]/40 transition-all"
                  >
                    <option value="sitting">Duduk</option>
                    <option value="standing">Berdiri</option>
                    <option value="lying">Berbaring</option>
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
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
                  Lengan
                </label>
                <div className="flex gap-2 h-11">
                  {(["left", "right"] as Arm[]).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setArm(a)}
                      className={cn(
                        "flex-1 py-1.5 text-sm font-bold rounded-xl border-2 transition-all font-ui",
                        arm === a
                          ? "border-[#C17A3A] bg-[#FFF3E0] text-[#9C4A2A]"
                          : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
                      )}
                    >
                      {a === "left" ? "Kiri" : "Kanan"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
                Catatan (Opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Contoh: Setelah olahraga, sedang stres, dll."
                className="w-full border-2 border-muted rounded-xl px-3 py-2.5 text-sm font-body text-primary placeholder:opacity-40 outline-none focus:border-[#C17A3A] focus:ring-2 focus:ring-[#C17A3A]/20 resize-none bg-white transition-all"
              />
            </div>

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
                className="py-4 text-base flex-1 rounded-2xl !bg-[#C17A3A] hover:!bg-[#9C4A2A] text-[#FFF8F0] outline-none ring-0 shadow-lg group font-ui"
              >
                Analisis
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Right: Result */}
        <div className="lg:col-span-7 h-full">
          {result && meta ? (
            <Card
              variant="default"
              className={cn(
                "flex flex-col relative overflow-hidden rounded-[2.5rem] border shadow-2xl animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset",
                meta.border,
                meta.ringColor,
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br via-transparent to-transparent pointer-events-none opacity-60",
                  meta.gradient,
                )}
              />
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />

              <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-5 h-full">
                {/* Crisis warning banner */}
                {result.isUrgent && (
                  <div className="bg-red-500/20 border border-red-500/60 rounded-2xl px-4 py-3 flex items-center gap-3 animate-pulse">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-sm font-bold text-red-300">
                      Segera cari pertolongan medis!
                    </span>
                  </div>
                )}

                {/* Category badge & reading */}
                <div className="flex flex-col items-center text-center pt-2">
                  <span
                    className={cn(
                      "text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border mb-3",
                      meta.bg,
                      meta.border,
                      meta.color,
                    )}
                  >
                    {result.label}
                  </span>
                  <div className="flex items-end gap-2 mt-2">
                    <span className="text-[4.5rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-white">
                      {result.systolic}
                    </span>
                    <span className="text-2xl font-light text-[#EDE0D0] pb-3 opacity-60">
                      /
                    </span>
                    <span className="text-[4.5rem] sm:text-[5rem] font-black font-heading tracking-tighter leading-none text-white">
                      {result.diastolic}
                    </span>
                    <span className="text-base font-bold text-[#EDE0D0] pb-3 opacity-60">
                      mmHg
                    </span>
                  </div>
                  {result.heartRate && (
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-[#EDE0D0] opacity-70">
                      <HeartPulse className="w-4 h-4" />
                      {result.heartRate} bpm
                    </div>
                  )}
                  {history.length >= 3 && (
                    <div className="mt-3">
                      <TrendBadge trend={trend} />
                    </div>
                  )}
                </div>

                {/* BP Scale */}
                <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner">
                  <p className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-wider mb-3">
                    Posisi pada Skala mmHg
                  </p>
                  <BPScale systolic={result.systolic} />
                </div>

                {/* Description */}
                <div
                  className={cn(
                    "rounded-2xl p-4 border flex gap-3",
                    meta.bg,
                    meta.border,
                  )}
                >
                  <Info className={cn("w-5 h-5 shrink-0 mt-0.5", meta.color)} />
                  <p
                    className={cn(
                      "text-sm font-body leading-relaxed",
                      meta.color,
                    )}
                  >
                    {result.description}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner flex-1">
                  <p className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Rekomendasi
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body leading-relaxed">
                    {result.recommendation}
                  </p>
                </div>

                {/* Save */}
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-[#C17A3A]/40 bg-[#C17A3A]/15 hover:bg-[#C17A3A]/25 text-[#FFF8F0] font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/50"
                >
                  <Save className="w-4 h-4" /> Tambahkan ke Riwayat
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
                <div className="relative z-10 w-full flex justify-center mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image
                    src="/tekanan-darah.svg"
                    alt="Tekanan Darah Illustration"
                    width={400}
                    height={300}
                    className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
                    priority
                  />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-white mb-3 tracking-tight">
                  Siap Dianalisis
                </h3>
                <p className="text-[#EDE0D0] font-body max-w-[260px] text-base leading-relaxed opacity-90">
                  Masukkan nilai tekanan sistolik dan diastolik untuk
                  mendapatkan analisis kategori dan rekomendasi.
                </p>
                <div className="mt-6 w-full px-4">
                  <BPScale />
                </div>
                <div className="flex gap-2 mt-5 flex-wrap justify-center">
                  {["Normal", "Elevated", "Hipert.1", "Hipert.2", "Krisis"].map(
                    (t) => (
                      <span
                        key={t}
                        className="text-xs bg-white/5 text-[#EDE0D0] px-2.5 py-1 rounded-full font-bold border border-white/10 opacity-70"
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
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-[#4A7C59]" />
              <h2 className="text-xl font-bold font-heading text-primary">
                Riwayat Pengukuran
              </h2>
              <span className="text-xs bg-surface text-secondary px-2 py-1 rounded-full font-bold">
                {history.length}
              </span>
            </div>
            {history.length >= 3 && <TrendBadge trend={trend} />}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body min-w-[640px]">
              <thead>
                <tr className="border-b border-muted">
                  {[
                    "Waktu",
                    "Sistolik",
                    "Diastolik",
                    "BPM",
                    "Posisi",
                    "Kategori",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2 text-xs font-bold text-secondary uppercase tracking-wide pr-3 last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-muted/50">
                {history.map((r) => {
                  const m = CATEGORY_META[r.category];
                  return (
                    <tr
                      key={r.id}
                      className="hover:bg-surface/60 transition-colors"
                    >
                      <td className="py-2.5 pr-3 text-secondary text-xs">
                        {r.datetime?.slice(0, 16).replace("T", " ")}
                      </td>
                      <td className="py-2.5 pr-3 font-black text-primary font-heading">
                        {r.systolic}
                      </td>
                      <td className="py-2.5 pr-3 font-black text-primary font-heading">
                        {r.diastolic}
                      </td>
                      <td className="py-2.5 pr-3 text-secondary">
                        {r.heartRate ?? "—"}
                      </td>
                      <td className="py-2.5 pr-3 text-secondary capitalize text-xs">
                        {r.position ?? "—"}
                      </td>
                      <td className="py-2.5 pr-3">
                        <span
                          className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded-full border",
                            m.bg,
                            m.border,
                            m.color,
                          )}
                        >
                          {m.label}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <button
                          onClick={() => deleteReading(r.id)}
                          className="p-1 text-accent-3 hover:text-accent-3/80 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Educational Section */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
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
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Kesehatan Kardiovaskular
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami Tekanan Darah Anda
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                Tekanan darah adalah tanda vital paling informatif yang bisa
                Anda pantau sendiri di rumah. Memahami arti angka-angka ini
                adalah langkah pertama untuk menjaga kesehatan jantung jangka
                panjang.
              </p>
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Hipertensi sering disebut "silent killer" karena biasanya
                    tidak menimbulkan gejala hingga komplikasi serius sudah
                    terjadi.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Pemantauan rutin di rumah—dikombinasikan dengan catatan
                    riwayat yang baik—adalah cara paling efektif untuk
                    mendeteksi pola berbahaya sebelum terlambat.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Kategori */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#FFF8F0] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Kategori Tekanan Darah (AHA)
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(
                  [
                    {
                      range: "< 90/60",
                      label: "Rendah (Hipotensi)",
                      color: "text-blue-300",
                      desc: "Bisa menyebabkan pusing dan lemas.",
                    },
                    {
                      range: "< 120/80",
                      label: "Normal",
                      color: "text-[#4A7C59]",
                      desc: "Kondisi ideal. Pertahankan gaya hidup sehat.",
                    },
                    {
                      range: "120–129/< 80",
                      label: "Meningkat",
                      color: "text-[#C17A3A]",
                      desc: "Sinyal awal. Ubah gaya hidup segera.",
                    },
                    {
                      range: "130–139/80–89",
                      label: "Hipertensi Tahap 1",
                      color: "text-[#FF8A65]",
                      desc: "Konsultasi dokter dianjurkan.",
                    },
                    {
                      range: "≥ 140/≥ 90",
                      label: "Hipertensi Tahap 2",
                      color: "text-red-400",
                      desc: "Pengobatan medis kemungkinan diperlukan.",
                    },
                    {
                      range: "≥ 180/≥ 120",
                      label: "Krisis Hipertensi",
                      color: "text-red-300",
                      desc: "Darurat medis. Segera ke rumah sakit.",
                    },
                  ] as const
                ).map(({ range, label, color, desc }) => (
                  <div
                    key={label}
                    className="bg-[#1A0E07]/50 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
                  >
                    <span className="font-mono text-xs bg-white/10 px-2 py-0.5 rounded-full text-[#EDE0D0] opacity-80 block mb-2 w-fit">
                      {range} mmHg
                    </span>
                    <h4 className={cn("font-bold text-base mb-1", color)}>
                      {label}
                    </h4>
                    <p className="text-xs text-[#EDE0D0] opacity-70 font-body leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Sistolik vs Diastolik */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#FFF8F0] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Sistolik vs Diastolik: Apa Bedanya?
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30">
                <div>
                  <div className="text-3xl font-black text-white font-heading mb-2">
                    Sistolik <span className="text-red-400">(angka atas)</span>
                  </div>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed opacity-90">
                    Tekanan yang terjadi saat jantung ber
                    <strong>kontraksi</strong> dan memompa darah ke seluruh
                    tubuh. Ini adalah tekanan puncak dalam satu siklus jantung.
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-black text-white font-heading mb-2">
                    Diastolik{" "}
                    <span className="text-blue-400">(angka bawah)</span>
                  </div>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed opacity-90">
                    Tekanan yang terjadi saat jantung ber
                    <strong>istirahat</strong> di antara detak dan mengisi ulang
                    dengan darah. Menggambarkan resistensi pembuluh darah saat
                    relaksasi.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Tips Pengukuran */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#FFF8F0] flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Tips Pengukuran yang Akurat
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Duduk dengan punggung lurus dan kaki menapak rata di lantai.",
                  "Letakkan lengan di atas permukaan setinggi jantung saat mengukur.",
                  "Istirahat minimal 5 menit sebelum pengukuran.",
                  "Hindari kafein, olahraga, dan merokok 30 menit sebelum mengukur.",
                  "Kosongkan kandung kemih sebelum mengukur.",
                  "Lakukan dua kali pengukuran, ambil rata-rata untuk hasil lebih akurat.",
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#1A0E07]/40 p-4 rounded-2xl border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#EDE0D0] font-body leading-relaxed opacity-90">
                      {tip}
                    </p>
                  </div>
                ))}
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
                      Seberapa sering saya harus mengukur tekanan darah?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Bagi individu sehat, cukup 1–2 kali setahun saat kunjungan
                      dokter. Bagi mereka dengan hipertensi atau faktor risiko,
                      pengukuran harian di waktu yang sama (pagi dan malam)
                      sangat dianjurkan.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Apakah tekanan darah satu kali sudah cukup untuk
                      diagnosis?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak. Satu pembacaan bisa dipengaruhi "white-coat
                      hypertension" (tegang di klinik) atau fluktuasi harian
                      normal. Diperlukan minimal 2–3 pembacaan di waktu berbeda
                      untuk pola yang representatif.
                    </p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Mengapa tekanan darah saya berbeda pagi dan malam?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Normal! Tekanan darah mengikuti ritme sirkadian: biasanya
                      rendah saat tidur, naik saat bangun, dan memuncak di sore
                      hari. Fluktuasi 10–15 mmHg sepanjang hari adalah hal
                      wajar.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Apa faktor utama yang meningkatkan tekanan darah?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Diet tinggi natrium, stres kronis, kurang tidur, merokok,
                      obesitas, kurang aktivitas fisik, dan konsumsi alkohol
                      berlebih adalah faktor risiko utama yang bisa
                      dimodifikasi.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#9C4A2A]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden">
              <AlertTriangle className="w-6 h-6 text-[#9C4A2A] mx-auto mb-3" />
              <h4 className="font-heading font-extrabold text-[#FFF0EB] text-lg mb-3">
                Penting: Ini Bukan Pengganti Saran Medis
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">
                Kalkulator ini adalah alat informatif untuk membantu Anda
                memahami pembacaan tekanan darah. Diagnosis, pengobatan, dan
                keputusan medis apapun harus selalu dilakukan bersama tenaga
                medis profesional yang berwenang.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath="/kesehatan/tekanan-darah"
        categoryId="kesehatan"
      />
    </div>
  );
}
