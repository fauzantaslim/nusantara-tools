import {
  AgeRange,
  BMICategory,
  WaistMale,
  WaistFemale,
  FamilyHistory,
  RiskCategory,
  FindriscInput,
  FindriscResult,
  FactorDetail,
  AGE_RANGE,
  BMI_CATEGORY,
  WAIST_MALE,
  WAIST_FEMALE,
  FAMILY_HISTORY,
  RISK_CATEGORY,
  GENDER,
} from "./types";

// ─── Scoring tables ───────────────────────────────────────────────────────────

const AGE_SCORES: Record<AgeRange, number> = {
  [AGE_RANGE.LT45]: 0,
  [AGE_RANGE.RANGE_45_54]: 2,
  [AGE_RANGE.RANGE_55_64]: 3,
  [AGE_RANGE.GTE65]: 4,
};

const BMI_SCORES: Record<BMICategory, number> = {
  [BMI_CATEGORY.LT25]: 0,
  [BMI_CATEGORY.RANGE_25_30]: 1,
  [BMI_CATEGORY.GT30]: 3,
};

const WAIST_MALE_SCORES: Record<WaistMale, number> = {
  [WAIST_MALE.LT94]: 0,
  [WAIST_MALE.RANGE_94_102]: 3,
  [WAIST_MALE.GT102]: 4,
};

const WAIST_FEMALE_SCORES: Record<WaistFemale, number> = {
  [WAIST_FEMALE.LT80]: 0,
  [WAIST_FEMALE.RANGE_80_88]: 3,
  [WAIST_FEMALE.GT88]: 4,
};

const FAMILY_SCORES: Record<FamilyHistory, number> = {
  [FAMILY_HISTORY.NONE]: 0,
  [FAMILY_HISTORY.DISTANT]: 3,
  [FAMILY_HISTORY.CLOSE]: 5,
};

// ─── Category configuration ───────────────────────────────────────────────────

export const CATEGORY_META: Record<
  RiskCategory,
  {
    label: string;
    description: string;
    chance: string;
    scoreRange: string;
    color: string;
    bg: string;
    border: string;
    ringColor: string;
    gradient: string;
    minScore: number;
    maxScore: number;
    minPct: number;
    maxPct: number;
  }
> = {
  [RISK_CATEGORY.LOW]: {
    label: "Risiko Rendah",
    scoreRange: "0–6",
    chance: "~1 dari 100 orang berisiko terkena diabetes dalam 10 tahun.",
    description:
      "Profil Anda menunjukkan risiko yang rendah saat ini. Pertahankan gaya hidup sehat.",
    color: "text-[#4A7C59]",
    bg: "bg-[#4A7C59]/15",
    border: "border-[#4A7C59]/30",
    ringColor: "ring-[#4A7C59]/20",
    gradient: "from-[#4A7C59]/20",
    minScore: 0,
    maxScore: 6,
    minPct: 1,
    maxPct: 4,
  },
  [RISK_CATEGORY.SLIGHTLY_ELEVATED]: {
    label: "Sedikit Meningkat",
    scoreRange: "7–11",
    chance: "~1 dari 25 orang berisiko terkena diabetes dalam 10 tahun.",
    description:
      "Risiko sedikit di atas rata-rata. Perubahan gaya hidup preventif sangat dianjurkan.",
    color: "text-[#C17A3A]",
    bg: "bg-[#C17A3A]/15",
    border: "border-[#C17A3A]/30",
    ringColor: "ring-[#C17A3A]/20",
    gradient: "from-[#C17A3A]/20",
    minScore: 7,
    maxScore: 11,
    minPct: 4,
    maxPct: 17,
  },
  [RISK_CATEGORY.MODERATE]: {
    label: "Risiko Sedang",
    scoreRange: "12–14",
    chance: "~1 dari 6 orang berisiko terkena diabetes dalam 10 tahun.",
    description:
      "Ada risiko yang cukup signifikan. Konsultasi medis dan perubahan gaya hidup mendesak.",
    color: "text-[#FF8A65]",
    bg: "bg-[#9C4A2A]/15",
    border: "border-[#9C4A2A]/30",
    ringColor: "ring-[#9C4A2A]/20",
    gradient: "from-[#9C4A2A]/20",
    minScore: 12,
    maxScore: 14,
    minPct: 17,
    maxPct: 35,
  },
  [RISK_CATEGORY.HIGH]: {
    label: "Risiko Tinggi ⚠️",
    scoreRange: "15–20",
    chance: "~1 dari 3 orang berisiko terkena diabetes dalam 10 tahun.",
    description:
      "Risiko Anda tinggi. Segera konsultasikan dengan dokter untuk evaluasi dan tes darah.",
    color: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-500/40",
    ringColor: "ring-red-500/25",
    gradient: "from-red-900/15",
    minScore: 15,
    maxScore: 20,
    minPct: 33,
    maxPct: 55,
  },
  [RISK_CATEGORY.VERY_HIGH]: {
    label: "Risiko Sangat Tinggi ⚠️",
    scoreRange: "≥21",
    chance: "~1 dari 2 orang berisiko terkena diabetes dalam 10 tahun.",
    description:
      "Risiko Anda sangat tinggi. Evaluasi medis mendesak diperlukan segera.",
    color: "text-red-300",
    bg: "bg-red-950/40",
    border: "border-red-400/60",
    ringColor: "ring-red-400/30",
    gradient: "from-red-950/25",
    minScore: 21,
    maxScore: 26,
    minPct: 50,
    maxPct: 80,
  },
};

function getCategory(score: number): RiskCategory {
  if (score <= 6) return RISK_CATEGORY.LOW;
  if (score <= 11) return RISK_CATEGORY.SLIGHTLY_ELEVATED;
  if (score <= 14) return RISK_CATEGORY.MODERATE;
  if (score <= 20) return RISK_CATEGORY.HIGH;
  return RISK_CATEGORY.VERY_HIGH;
}

function scoreToPercent(score: number, cat: RiskCategory): number {
  const m = CATEGORY_META[cat];
  const t = Math.max(
    0,
    Math.min(1, (score - m.minScore) / Math.max(1, m.maxScore - m.minScore)),
  );
  return Math.round(m.minPct + t * (m.maxPct - m.minPct));
}

// ─── Recommendations ──────────────────────────────────────────────────────────

const RECOMMENDATIONS: Record<RiskCategory, string[]> = {
  [RISK_CATEGORY.LOW]: [
    "Pertahankan berat badan ideal dan konsumsi sayur, buah, dan biji-bijian setiap hari.",
    "Lakukan aktivitas fisik ≥30 menit sehari, minimal 5 hari per minggu.",
    "Periksakan gula darah secara rutin setidaknya setiap 3 tahun.",
    "Hindari merokok dan batasi konsumsi alkohol.",
  ],
  [RISK_CATEGORY.SLIGHTLY_ELEVATED]: [
    "Tingkatkan aktivitas fisik ke 150–300 menit per minggu secara konsisten.",
    "Kurangi porsi karbohidrat olahan dan ganti dengan sumber serat tinggi.",
    "Targetkan penurunan berat badan 5–7% jika lingkar pinggang di atas normal.",
    "Periksakan kadar gula darah dan HbA1c setiap tahun.",
  ],
  [RISK_CATEGORY.MODERATE]: [
    "Konsultasikan dengan dokter untuk tes gula darah puasa dan HbA1c segera.",
    "Mulai program penurunan berat badan terstruktur dengan target realistis.",
    "Pantau tekanan darah secara rutin; tangani hipertensi jika ada.",
    "Ikuti pola makan Mediterania atau DASH yang terbukti mengurangi risiko diabetes.",
  ],
  [RISK_CATEGORY.HIGH]: [
    "Temui dokter segera untuk evaluasi lengkap (gula darah puasa, HbA1c, OGTT).",
    "Pertimbangkan mengikuti Program Pencegahan Diabetes terstruktur.",
    "Target penurunan berat badan 7–10% dalam 6 bulan ke depan.",
    "Diskusikan dengan dokter apakah intervensi farmakologis (Metformin) diperlukan.",
  ],
  [RISK_CATEGORY.VERY_HIGH]: [
    "Segera cari evaluasi medis—Anda mungkin sudah dalam kondisi prediabetes atau diabetes.",
    "Lakukan tes HbA1c, gula darah puasa, dan OGTT secepatnya.",
    "Pantau gula darah mandiri setiap hari jika tersedia alat.",
    "Diskusikan rencana pengobatan komprehensif dengan dokter spesialis endokrin.",
  ],
};

// ─── BMI helpers ──────────────────────────────────────────────────────────────

export function calcBMI(heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

export function bmiToCategory(bmi: number): BMICategory {
  if (bmi < 25) return BMI_CATEGORY.LT25;
  if (bmi <= 30) return BMI_CATEGORY.RANGE_25_30;
  return BMI_CATEGORY.GT30;
}

// ─── Main calculation ──────────────────────────────────────────────────────────

export function calculateFINDRISC(input: FindriscInput): FindriscResult {
  const waistPoints =
    input.gender === GENDER.MALE
      ? WAIST_MALE_SCORES[input.waistMale ?? WAIST_MALE.LT94]
      : WAIST_FEMALE_SCORES[input.waistFemale ?? WAIST_FEMALE.LT80];

  const scores = {
    age: AGE_SCORES[input.ageRange],
    bmi: BMI_SCORES[input.bmiCategory],
    waist: waistPoints,
    activity: input.physicalActivity ? 0 : 2,
    diet: input.eatsVegetables ? 0 : 1,
    bpMeds: input.bpMedication ? 2 : 0,
    bgHistory: input.highBloodGlucoseHistory ? 5 : 0,
    family: FAMILY_SCORES[input.familyHistory],
  };

  const totalScore = Object.values(scores).reduce((a, c) => a + c, 0);
  const category = getCategory(totalScore);
  const riskPercent = scoreToPercent(totalScore, category);

  const factors: FactorDetail[] = [
    {
      label: "Usia",
      points: scores.age,
      maxPoints: 4,
      description: {
        [AGE_RANGE.LT45]: "Di bawah 45 tahun (risiko lebih rendah).",
        [AGE_RANGE.RANGE_45_54]:
          "45–54 tahun — usia mulai meningkatkan risiko.",
        [AGE_RANGE.RANGE_55_64]: "55–64 tahun — risiko meningkat lebih jauh.",
        [AGE_RANGE.GTE65]: "≥65 tahun — grup usia tertinggi dalam risiko.",
      }[input.ageRange],
      isHighContributor: scores.age >= 3,
    },
    {
      label: "Indeks Massa Tubuh (BMI)",
      points: scores.bmi,
      maxPoints: 3,
      description: {
        [BMI_CATEGORY.LT25]: "BMI normal (< 25 kg/m²)",
        [BMI_CATEGORY.RANGE_25_30]: "Kelebihan berat badan (25–30 kg/m²)",
        [BMI_CATEGORY.GT30]:
          "Obesitas (> 30 kg/m²) — faktor risiko signifikan.",
      }[input.bmiCategory],
      isHighContributor: scores.bmi >= 3,
    },
    {
      label: "Lingkar Pinggang",
      points: scores.waist,
      maxPoints: 4,
      description:
        input.gender === GENDER.MALE
          ? {
              [WAIST_MALE.LT94]: "Normal (< 94 cm).",
              [WAIST_MALE.RANGE_94_102]:
                "Elevated (94–102 cm) — perhatikan berat badan.",
              [WAIST_MALE.GT102]: "Sangat tinggi (> 102 cm) — risiko tinggi.",
            }[input.waistMale ?? WAIST_MALE.LT94]
          : {
              [WAIST_FEMALE.LT80]: "Normal (< 80 cm).",
              [WAIST_FEMALE.RANGE_80_88]: "Elevated (80–88 cm).",
              [WAIST_FEMALE.GT88]: "Sangat tinggi (> 88 cm) — risiko tinggi.",
            }[input.waistFemale ?? WAIST_FEMALE.LT80],
      isHighContributor: scores.waist >= 4,
    },
    {
      label: "Aktivitas Fisik Harian",
      points: scores.activity,
      maxPoints: 2,
      description: input.physicalActivity
        ? "Aktif ≥30 menit per hari — faktor protektif."
        : "Kurang aktif — sedentary lifestyle meningkatkan risiko.",
      isHighContributor: scores.activity >= 2,
    },
    {
      label: "Konsumsi Sayur & Buah",
      points: scores.diet,
      maxPoints: 1,
      description: input.eatsVegetables
        ? "Konsumsi sayur & buah setiap hari — bagus!"
        : "Konsumsi sayur & buah tidak rutin — tingkatkan.",
      isHighContributor: false,
    },
    {
      label: "Obat Tekanan Darah",
      points: scores.bpMeds,
      maxPoints: 2,
      description: input.bpMedication
        ? "Menggunakan obat tekanan darah — terkait resistensi insulin."
        : "Tidak menggunakan obat tekanan darah.",
      isHighContributor: scores.bpMeds >= 2,
    },
    {
      label: "Riwayat Gula Darah Tinggi",
      points: scores.bgHistory,
      maxPoints: 5,
      description: input.highBloodGlucoseHistory
        ? "Pernah didiagnosis gula darah tinggi — indikator terkuat prediabetes."
        : "Tidak ada riwayat gula darah tinggi.",
      isHighContributor: scores.bgHistory >= 5,
    },
    {
      label: "Riwayat Keluarga Diabetes",
      points: scores.family,
      maxPoints: 5,
      description: {
        [FAMILY_HISTORY.NONE]: "Tidak ada kerabat dengan diabetes.",
        [FAMILY_HISTORY.DISTANT]:
          "Ada kerabat jauh (kakek/nenek, paman/bibi, sepupu).",
        [FAMILY_HISTORY.CLOSE]:
          "Ada kerabat dekat (orang tua, saudara, anak) — risiko genetik tinggi.",
      }[input.familyHistory],
      isHighContributor: scores.family >= 5,
    },
  ];

  return {
    totalScore,
    maxScore: 26,
    riskPercent,
    category,
    factors,
    recommendations: RECOMMENDATIONS[category],
    topContributors: factors
      .filter((f) => f.isHighContributor)
      .map((f) => f.label),
  };
}
