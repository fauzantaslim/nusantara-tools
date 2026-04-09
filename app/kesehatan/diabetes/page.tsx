"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import {
  calculateFINDRISC,
  FindriscResult,
  CATEGORY_META,
  Gender,
  AgeRange,
  BMICategory,
  WaistMale,
  WaistFemale,
  FamilyHistory,
  calcBMI,
  bmiToCategory,
  RiskCategory,
} from "@/features/diabetes/utils";
import {
  ArrowRight,
  ShieldAlert,
  Info,
  RefreshCw,
  Activity,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import Image from "next/image";

// ─── SVG Semicircle Gauge ─────────────────────────────────────────────────────
function RiskGauge({ percent, color }: { percent: number; color: string }) {
  const r = 78;
  const cx = 100;
  const cy = 100;
  const totalLen = Math.PI * r;
  const fillLen = (percent / 100) * totalLen;
  return (
    <svg viewBox="0 0 200 108" className="w-full max-w-[220px] mx-auto">
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={`${fillLen} ${totalLen}`}
        style={{ transition: "stroke-dasharray 1s cubic-bezier(.4,0,.2,1)" }}
      />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="white"
        fontSize="30"
        fontWeight="900"
      >
        {percent}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="rgba(255,255,255,0.35)"
        fontSize="8.5"
        letterSpacing="1.5"
      >
        ESTIMASI RISIKO 10 TAHUN
      </text>
    </svg>
  );
}

// ─── Factor bar ───────────────────────────────────────────────────────────────
function FactorBar({
  label,
  points,
  maxPoints,
  description,
  isHighContributor,
}: {
  label: string;
  points: number;
  maxPoints: number;
  description: string;
  isHighContributor: boolean;
}) {
  const pct = maxPoints > 0 ? (points / maxPoints) * 100 : 0;
  const barColor =
    pct === 0 ? "bg-white/15" : pct < 60 ? "bg-[#C17A3A]/80" : "bg-red-500/80";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isHighContributor && (
            <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
          )}
          <span
            className={cn(
              "text-xs font-bold",
              isHighContributor ? "text-red-300" : "text-[#EDE0D0] opacity-80",
            )}
          >
            {label}
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#EDE0D0] opacity-50">
          {points}/{maxPoints}
        </span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            barColor,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-[#EDE0D0] opacity-50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ─── Select field (brand-compliant) ──────────────────────────────────────────
function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className="w-full h-11 rounded-xl border-2 border-muted bg-white pl-4 pr-10 text-sm font-bold text-primary appearance-none cursor-pointer
            focus:border-[#C17A3A] focus:outline-none focus:ring-2 focus:ring-[#C17A3A]/20
            hover:border-[#7A5C42]/40 transition-all"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="h-4 w-4 text-[#7A5C42] opacity-60"
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
  );
}

// ─── Yes/No toggle (brand-compliant) ─────────────────────────────────────────
function YesNoToggle({
  label,
  value,
  onChange,
  yesLabel = "Ya",
  noLabel = "Tidak",
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-2">
        {[
          { v: true, l: yesLabel },
          { v: false, l: noLabel },
        ].map(({ v, l }) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              "flex-1 py-2.5 text-sm font-bold rounded-xl border-2 transition-all font-ui",
              value === v
                ? "border-[#C17A3A] bg-[#FFF3E0] text-[#9C4A2A]"
                : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 mt-2 -mb-1">
      <div className="h-px flex-1 bg-muted/60" />
      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest shrink-0 opacity-70">
        {label}
      </span>
      <div className="h-px flex-1 bg-muted/60" />
    </div>
  );
}

const GAUGE_COLORS: Record<string, string> = {
  "text-[#4A7C59]": "#4A7C59",
  "text-[#C17A3A]": "#C17A3A",
  "text-[#FF8A65]": "#FF8A65",
  "text-red-400": "#f87171",
  "text-red-300": "#fca5a5",
};

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DiabetesRiskCalculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [ageRange, setAgeRange] = useState<AgeRange>("lt45");
  const [bmiCategory, setBmiCategory] = useState<BMICategory>("lt25");
  const [waistMale, setWaistMale] = useState<WaistMale>("lt94");
  const [waistFemale, setWaistFemale] = useState<WaistFemale>("lt80");
  const [physicalActivity, setPhysicalActivity] = useState(true);
  const [eatsVegetables, setEatsVegetables] = useState(true);
  const [bpMedication, setBpMedication] = useState(false);
  const [highBGHistory, setHighBGHistory] = useState(false);
  const [familyHistory, setFamilyHistory] = useState<FamilyHistory>("none");

  // BMI auto calculator (optional)
  const [showBMICalc, setShowBMICalc] = useState(false);
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [calcedBMI, setCalcedBMI] = useState<number | null>(null);

  const [result, setResult] = useState<FindriscResult | null>(null);
  const [error, setError] = useState("");

  const handleBMICalc = () => {
    const h = Number(heightCm);
    const w = Number(weightKg);
    if (!h || !w || h < 100 || h > 250 || w < 20 || w > 300) return;
    const bmi = calcBMI(h, w);
    setCalcedBMI(bmi);
    setBmiCategory(bmiToCategory(bmi));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(
      calculateFINDRISC({
        gender,
        ageRange,
        bmiCategory,
        waistMale: gender === "male" ? waistMale : undefined,
        waistFemale: gender === "female" ? waistFemale : undefined,
        physicalActivity,
        eatsVegetables,
        bpMedication,
        highBloodGlucoseHistory: highBGHistory,
        familyHistory,
      }),
    );
  };

  const handleReset = () => {
    setAgeRange("lt45");
    setBmiCategory("lt25");
    setWaistMale("lt94");
    setWaistFemale("lt80");
    setPhysicalActivity(true);
    setEatsVegetables(true);
    setBpMedication(false);
    setHighBGHistory(false);
    setFamilyHistory("none");
    setResult(null);
    setError("");
    setHeightCm("");
    setWeightKg("");
    setCalcedBMI(null);
    setShowBMICalc(false);
  };

  const meta = result ? CATEGORY_META[result.category] : null;
  const gaugeColor = meta ? (GAUGE_COLORS[meta.color] ?? "#4A7C59") : "#4A7C59";

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Risiko Diabetes" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Risiko Diabetes
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Penilaian Risiko Diabetes Tipe 2 — Berbasis Skor FINDRISC
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Form */}
        <Card
          variant="default"
          className="lg:col-span-5 flex flex-col gap-5 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 h-full"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary flex items-center gap-2">
              <Activity className="w-6 h-6 text-[#C17A3A]" /> Data Kesehatan
            </h2>
            <p className="text-sm text-secondary font-body mt-2">
              Berdasarkan skor FINDRISC — alat skrining diabetes yang divalidasi
              WHO.
            </p>
          </div>

          <form
            onSubmit={handleCalculate}
            className="flex flex-col gap-5 relative z-10 h-full"
          >
            {/* — Personal Info — */}
            <SectionHead label="Informasi Pribadi" />

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold font-ui text-secondary uppercase tracking-wider">
                Jenis Kelamin
              </label>
              <div className="flex gap-2">
                {(["male", "female"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={cn(
                      "flex-1 py-2.5 text-sm font-bold rounded-xl border-2 transition-all font-ui",
                      gender === g
                        ? "border-[#C17A3A] bg-[#FFF3E0] text-[#9C4A2A]"
                        : "border-muted bg-white text-secondary hover:border-[#7A5C42]/40",
                    )}
                  >
                    {g === "male" ? "♂ Laki-laki" : "♀ Perempuan"}
                  </button>
                ))}
              </div>
            </div>

            <SelectField<AgeRange>
              label="Usia"
              value={ageRange}
              onChange={setAgeRange}
              options={[
                { value: "lt45", label: "Di bawah 45 tahun" },
                { value: "45_54", label: "45–54 tahun" },
                { value: "55_64", label: "55–64 tahun" },
                { value: "gte65", label: "65 tahun ke atas" },
              ]}
            />

            {/* — Body Measurements — */}
            <SectionHead label="Pengukuran Tubuh" />

            <SelectField<BMICategory>
              label="Indeks Massa Tubuh (IMT / BMI)"
              value={bmiCategory}
              onChange={setBmiCategory}
              options={[
                { value: "lt25", label: "Kurang dari 25 kg/m²" },
                { value: "25_30", label: "25–30 kg/m²" },
                { value: "gt30", label: "Lebih dari 30 kg/m²" },
              ]}
            />

            {/* BMI auto calculator */}
            <button
              type="button"
              onClick={() => setShowBMICalc((v) => !v)}
              className="flex items-center gap-2 text-xs font-bold text-[#C17A3A] hover:text-[#9C4A2A] transition -mt-2"
            >
              <Calculator className="w-3.5 h-3.5" />
              {showBMICalc
                ? "Sembunyikan kalkulator BMI"
                : "Hitung BMI saya otomatis"}
            </button>
            {showBMICalc && (
              <div className="bg-surface rounded-2xl border border-muted/50 p-4 -mt-2 space-y-3">
                <div className="flex gap-3">
                  <Input
                    id="hcm"
                    label="Tinggi"
                    type="number"
                    placeholder="170"
                    suffix="cm"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="py-2.5 rounded-xl flex-1"
                    min={100}
                    max={250}
                  />
                  <Input
                    id="wkg"
                    label="Berat"
                    type="number"
                    placeholder="70"
                    suffix="kg"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="py-2.5 rounded-xl flex-1"
                    min={20}
                    max={300}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleBMICalc}
                  className="w-full py-2.5 rounded-xl bg-[#C17A3A] text-[#FFF8F0] text-sm font-bold font-ui hover:bg-[#9C4A2A] transition"
                >
                  Hitung & Terapkan BMI
                </button>
                {calcedBMI && (
                  <p className="text-xs text-center text-[#4A7C59] font-bold">
                    BMI Anda: {calcedBMI} kg/m² → Kategori diterapkan otomatis ✓
                  </p>
                )}
              </div>
            )}

            {/* Waist circumference */}
            {gender === "male" ? (
              <SelectField<WaistMale>
                label="Lingkar Pinggang (Laki-laki)"
                value={waistMale}
                onChange={setWaistMale}
                options={[
                  { value: "lt94", label: "Kurang dari 94 cm (< 37 inci)" },
                  { value: "94_102", label: "94–102 cm (37–40 inci)" },
                  { value: "gt102", label: "Lebih dari 102 cm (> 40 inci)" },
                ]}
              />
            ) : (
              <SelectField<WaistFemale>
                label="Lingkar Pinggang (Perempuan)"
                value={waistFemale}
                onChange={setWaistFemale}
                options={[
                  { value: "lt80", label: "Kurang dari 80 cm (< 32 inci)" },
                  { value: "80_88", label: "80–88 cm (32–35 inci)" },
                  { value: "gt88", label: "Lebih dari 88 cm (> 35 inci)" },
                ]}
              />
            )}

            {/* — Lifestyle & Medical — */}
            <SectionHead label="Gaya Hidup & Riwayat Medis" />

            <YesNoToggle
              label="Aktivitas Fisik ≥ 30 Menit Sehari"
              value={physicalActivity}
              onChange={setPhysicalActivity}
              yesLabel="Ya, setiap hari"
              noLabel="Tidak / Jarang"
            />

            <YesNoToggle
              label="Konsumsi Sayur, Buah, atau Beri"
              value={eatsVegetables}
              onChange={setEatsVegetables}
              yesLabel="Ya, hampir setiap hari"
              noLabel="Tidak rutin"
            />

            <YesNoToggle
              label="Pengobatan untuk Tekanan Darah Tinggi"
              value={bpMedication}
              onChange={setBpMedication}
              yesLabel="Ya"
              noLabel="Tidak"
            />

            <YesNoToggle
              label="Pernah Didiagnosis Gula Darah Tinggi"
              value={highBGHistory}
              onChange={setHighBGHistory}
              yesLabel="Ya (termasuk saat hamil)"
              noLabel="Tidak pernah"
            />

            <SelectField<FamilyHistory>
              label="Riwayat Keluarga Diabetes"
              value={familyHistory}
              onChange={setFamilyHistory}
              options={[
                { value: "none", label: "Tidak ada kerabat dengan diabetes" },
                {
                  value: "distant",
                  label: "Kakek/nenek, paman/bibi, atau sepupu",
                },
                {
                  value: "close",
                  label: "Orang tua, saudara, atau anak kandung",
                },
              ]}
            />

            {error && (
              <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2">
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
                Hitung Risiko
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
                  "absolute inset-0 bg-gradient-to-br via-transparent to-transparent pointer-events-none opacity-50",
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
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#C17A3A] tracking-widest uppercase opacity-80">
                      FINDRISC · Skor {result.totalScore}/26
                    </span>
                    <h3 className="text-lg font-extrabold font-heading text-white mt-0.5">
                      Hasil Penilaian Risiko
                    </h3>
                  </div>
                  <span
                    className={cn(
                      "text-[9px] font-bold px-2.5 py-1 rounded-full border",
                      meta.bg,
                      meta.border,
                      meta.color,
                    )}
                  >
                    {meta.scoreRange} poin
                  </span>
                </div>

                {/* Gauge + category */}
                <div className="bg-[#1A0E07]/60 rounded-2xl border border-white/10 p-5 shadow-inner flex flex-col items-center gap-3">
                  <RiskGauge percent={result.riskPercent} color={gaugeColor} />
                  <div className="text-center">
                    <span className={cn("text-sm font-extrabold", meta.color)}>
                      {meta.label}
                    </span>
                    <p className="text-[11px] text-[#EDE0D0] opacity-70 mt-1 max-w-xs">
                      {meta.chance}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div
                  className={cn(
                    "rounded-2xl p-4 border flex gap-3",
                    meta.bg,
                    meta.border,
                  )}
                >
                  <Info className={cn("w-4 h-4 shrink-0 mt-0.5", meta.color)} />
                  <p
                    className={cn(
                      "text-xs font-body leading-relaxed",
                      meta.color,
                    )}
                  >
                    {meta.description}
                  </p>
                </div>

                {/* Top contributors */}
                {result.topContributors.length > 0 && (
                  <div className="bg-red-950/30 border border-red-500/25 rounded-2xl px-4 py-3">
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Faktor Risiko Utama
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {result.topContributors.map((c) => (
                        <span
                          key={c}
                          className="text-[10px] bg-red-500/15 text-red-300 border border-red-500/25 px-2 py-0.5 rounded-full font-bold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Factor bars */}
                <div className="flex flex-col gap-3 bg-[#1A0E07]/40 rounded-2xl p-4 border border-white/5 flex-1">
                  <p className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-wider">
                    Kontribusi Per Faktor
                  </p>
                  {result.factors.map((f) => (
                    <FactorBar key={f.label} {...f} />
                  ))}
                </div>

                {/* Recommendations */}
                <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner">
                  <p className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Rekomendasi
                    Tindakan
                  </p>
                  <ul className="space-y-1.5">
                    {result.recommendations.map((r, i) => (
                      <li
                        key={i}
                        className="text-xs text-[#EDE0D0] font-body leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-[#C17A3A] font-bold mt-0.5 shrink-0">
                          {i + 1}.
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-2 opacity-60">
                  <Info className="w-3.5 h-3.5 text-[#EDE0D0] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#EDE0D0] font-body leading-relaxed">
                    Alat skrining informatif—bukan pengganti evaluasi medis oleh
                    dokter.
                  </p>
                </div>
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
                    src="/diabetes.svg"
                    alt="Diabetes Illustration"
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
                  Lengkapi semua pertanyaan di formulir sebelah kiri, lalu klik
                  "Hitung Risiko".
                </p>
                <div className="mt-8 bg-[#1A0E07]/60 rounded-2xl p-5 border border-white/10 text-left w-full max-w-[270px]">
                  <p className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-widest mb-3">
                    Skor FINDRISC
                  </p>
                  {[
                    ["0–6", "Risiko Rendah", "text-[#4A7C59]"],
                    ["7–11", "Sedikit Meningkat", "text-[#C17A3A]"],
                    ["12–14", "Risiko Sedang", "text-[#FF8A65]"],
                    ["15–20", "Risiko Tinggi", "text-red-400"],
                    ["≥21", "Risiko Sangat Tinggi", "text-red-300"],
                  ].map(([s, l, c]) => (
                    <div
                      key={s}
                      className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0"
                    >
                      <span className="font-mono text-xs text-[#EDE0D0] opacity-50">
                        {s}
                      </span>
                      <span className={cn("text-xs font-bold", c)}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

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
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Diabetes & Pencegahan
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Tentang FINDRISC & Diabetes Tipe 2
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90">
                Skor FINDRISC (Finnish Diabetes Risk Score) dikembangkan oleh
                Lindström & Tuomilehto pada 2003 dan direkomendasikan oleh WHO
                dan IDF sebagai alat skrining diabetes yang non-invasif dan
                bebas biaya.
              </p>
            </div>

            <section className="space-y-6">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#FFF8F0] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Interpretasi Skor FINDRISC
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(
                  Object.entries(CATEGORY_META) as [
                    string,
                    (typeof CATEGORY_META)[RiskCategory],
                  ][]
                ).map(([, m]) => (
                  <div
                    key={m.label}
                    className="bg-[#1A0E07]/50 border border-white/10 rounded-2xl p-5"
                  >
                    <span className="font-mono text-xs bg-white/10 px-2 py-0.5 rounded-full text-[#EDE0D0] opacity-80 block mb-2 w-fit">
                      Skor {m.scoreRange}
                    </span>
                    <h4 className={cn("font-bold text-sm mb-1", m.color)}>
                      {m.label}
                    </h4>
                    <p className="text-xs text-[#EDE0D0] opacity-70 font-body leading-relaxed">
                      {m.chance}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#FFF8F0] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Faktor Risiko yang Bisa Diubah
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Lingkar Pinggang",
                    desc: "Lemak perut (visceral) adalah prediktor terkuat resistensi insulin. Target < 94 cm (pria) dan < 80 cm (wanita).",
                  },
                  {
                    label: "Aktivitas Fisik",
                    desc: "Sedentary lifestyle meningkatkan risiko 2×. Target 150+ menit kardio sedang per minggu.",
                  },
                  {
                    label: "Pola Makan",
                    desc: "Konsumsi sayur, buah, dan biji-bijian setiap hari terbukti menurunkan risiko diabetes.",
                  },
                  {
                    label: "BMI & Berat Badan",
                    desc: "Setiap penurunan 5–7% berat badan pada orang overweight mengurangi risiko diabetes secara signifikan.",
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 bg-[#1A0E07]/40 p-4 rounded-2xl border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs text-[#EDE0D0] opacity-70 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 pt-8 border-t border-[#7A5C42]/30">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold font-heading text-white">
                  FAQ
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                {[
                  {
                    q: "Apakah skor tinggi berarti saya pasti terkena diabetes?",
                    a: "Tidak. Skor tinggi berarti risiko lebih besar, bukan kepastian. Banyak orang dengan skor tinggi berhasil mencegah diabetes melalui perubahan gaya hidup—terutama penurunan berat badan dan aktivitas fisik.",
                  },
                  {
                    q: "Apa itu prediabetes?",
                    a: "Prediabetes adalah kondisi gula darah di atas normal (100–125 mg/dL puasa) tapi belum mencapai ambang diabetes. Kondisi ini seringkali bisa dibalik dengan intervensi gaya hidup yang tepat waktu.",
                  },
                  {
                    q: "Seberapa akurat FINDRISC?",
                    a: "FINDRISC telah divalidasi dalam berbagai populasi dengan sensitivitas ~76% dan spesifisitas ~66% untuk mendeteksi diabetes yang belum didiagnosis. Cocok untuk skrining populasi, bukan diagnosis individual.",
                  },
                  {
                    q: "Siapa yang harus melakukan tes ini?",
                    a: "Semua orang dewasa ≥35 tahun, terutama mereka dengan kelebihan berat badan, gaya hidup sedentary, atau riwayat keluarga diabetes. WHO merekomendasikan skrining berkala setiap 3–5 tahun.",
                  },
                ].map(({ q, a }) => (
                  <details
                    key={q}
                    className="group border-b border-[#7A5C42]/30 pb-4"
                  >
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      {q}
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      {a}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#9C4A2A]/30 text-center max-w-3xl mx-auto shadow-inner">
              <AlertTriangle className="w-6 h-6 text-[#9C4A2A] mx-auto mb-3" />
              <h4 className="font-heading font-extrabold text-white text-lg mb-3">
                Disclaimer Medis
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">
                Kalkulator ini adalah <strong>alat skrining informatif</strong>,
                bukan pengganti pemeriksaan medis. Risiko diabetes sesungguhnya
                hanya dapat ditentukan melalui pemeriksaan darah dan evaluasi
                klinis oleh dokter. Jangan menunda saran medis profesional.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/diabetes" categoryId="kesehatan" />
    </div>
  );
}
