import React from "react";
import { Card } from "@/ui/Card";
import { Info, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DiabetesContextType } from "../types";
import { CATEGORY_META } from "../utils";

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

const GAUGE_COLORS: Record<string, string> = {
  "text-[#4A7C59]": "#4A7C59",
  "text-[#C17A3A]": "#C17A3A",
  "text-[#FF8A65]": "#FF8A65",
  "text-red-400": "#f87171",
  "text-red-300": "#fca5a5",
};

export const DiabetesResult: React.FC<{ hook: DiabetesContextType }> = ({
  hook,
}) => {
  const { result } = hook;
  const meta = result ? CATEGORY_META[result.category] : null;
  const gaugeColor = meta ? (GAUGE_COLORS[meta.color] ?? "#4A7C59") : "#4A7C59";

  if (!result || !meta) {
    return (
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
    );
  }

  return (
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

        <div
          className={cn(
            "rounded-2xl p-4 border flex gap-3",
            meta.bg,
            meta.border,
          )}
        >
          <Info className={cn("w-4 h-4 shrink-0 mt-0.5", meta.color)} />
          <p className={cn("text-xs font-body leading-relaxed", meta.color)}>
            {meta.description}
          </p>
        </div>

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

        <div className="flex flex-col gap-3 bg-[#1A0E07]/40 rounded-2xl p-4 border border-white/5 flex-1 overflow-y-auto max-h-[250px] scrollbar-thin scrollbar-thumb-white/10">
          <p className="text-[10px] font-bold text-[#EDE0D0] opacity-60 uppercase tracking-wider">
            Kontribusi Per Faktor
          </p>
          {result.factors.map((f) => (
            <FactorBar key={f.label} {...f} />
          ))}
        </div>

        <div className="bg-[#1A0E07]/60 rounded-2xl p-4 border border-white/10 shadow-inner">
          <p className="text-[10px] font-bold text-[#C17A3A] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Rekomendasi Tindakan
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

        <div className="flex items-start gap-2 opacity-60 mt-auto">
          <Info className="w-3.5 h-3.5 text-[#EDE0D0] shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#EDE0D0] font-body leading-relaxed">
            Alat skrining informatif—bukan pengganti evaluasi medis oleh dokter.
          </p>
        </div>
      </div>
    </Card>
  );
};
