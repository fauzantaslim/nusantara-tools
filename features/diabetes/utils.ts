// Finnish Diabetes Risk Score (FINDRISC) — Standard Implementation
// Source: Lindström & Tuomilehto, Diabetes Care 2003
// Max total score: 26 points | Validated for ~10-year T2D risk

export type Gender = 'male' | 'female';
export type AgeRange = 'lt45' | '45_54' | '55_64' | 'gte65';
export type BMICategory = 'lt25' | '25_30' | 'gt30';
export type WaistMale = 'lt94' | '94_102' | 'gt102';
export type WaistFemale = 'lt80' | '80_88' | 'gt88';
export type FamilyHistory = 'none' | 'distant' | 'close'; // none / grandparent+aunt+cousin / parent+sibling+child
export type RiskCategory = 'low' | 'slightly_elevated' | 'moderate' | 'high' | 'very_high';

export interface FindriscInput {
  gender: Gender;
  ageRange: AgeRange;
  bmiCategory: BMICategory;
  waistMale?: WaistMale;     // required when gender === 'male'
  waistFemale?: WaistFemale; // required when gender === 'female'
  physicalActivity: boolean;     // true = active (≥30 min/day)
  eatsVegetables: boolean;       // true = daily
  bpMedication: boolean;         // true = on BP meds
  highBloodGlucoseHistory: boolean; // true = ever told high blood sugar
  familyHistory: FamilyHistory;
}

export interface FindriscResult {
  totalScore: number;
  maxScore: 26;
  riskPercent: number;
  category: RiskCategory;
  factors: FactorDetail[];
  recommendations: string[];
  topContributors: string[];
}

export interface FactorDetail {
  label: string;
  points: number;
  maxPoints: number;
  description: string;
  isHighContributor: boolean;
}

// ─── Scoring tables ───────────────────────────────────────────────────────────

const AGE_SCORES: Record<AgeRange, number> = {
  lt45: 0, '45_54': 2, '55_64': 3, gte65: 4,
};
const BMI_SCORES: Record<BMICategory, number> = {
  lt25: 0, '25_30': 1, gt30: 3,
};
const WAIST_MALE_SCORES: Record<WaistMale, number> = {
  lt94: 0, '94_102': 3, gt102: 4,
};
const WAIST_FEMALE_SCORES: Record<WaistFemale, number> = {
  lt80: 0, '80_88': 3, gt88: 4,
};
const FAMILY_SCORES: Record<FamilyHistory, number> = {
  none: 0, distant: 3, close: 5,
};

// ─── Category configuration ───────────────────────────────────────────────────

export const CATEGORY_META: Record<RiskCategory, {
  label: string; description: string; chance: string; scoreRange: string;
  color: string; bg: string; border: string; ringColor: string; gradient: string;
  minScore: number; maxScore: number; minPct: number; maxPct: number;
}> = {
  low: {
    label: 'Risiko Rendah', scoreRange: '0–6',
    chance: '~1 dari 100 orang berisiko terkena diabetes dalam 10 tahun.',
    description: 'Profil Anda menunjukkan risiko yang rendah saat ini. Pertahankan gaya hidup sehat.',
    color: 'text-[#4A7C59]', bg: 'bg-[#4A7C59]/15', border: 'border-[#4A7C59]/30',
    ringColor: 'ring-[#4A7C59]/20', gradient: 'from-[#4A7C59]/20',
    minScore: 0, maxScore: 6, minPct: 1, maxPct: 4,
  },
  slightly_elevated: {
    label: 'Sedikit Meningkat', scoreRange: '7–11',
    chance: '~1 dari 25 orang berisiko terkena diabetes dalam 10 tahun.',
    description: 'Risiko sedikit di atas rata-rata. Perubahan gaya hidup preventif sangat dianjurkan.',
    color: 'text-[#C17A3A]', bg: 'bg-[#C17A3A]/15', border: 'border-[#C17A3A]/30',
    ringColor: 'ring-[#C17A3A]/20', gradient: 'from-[#C17A3A]/20',
    minScore: 7, maxScore: 11, minPct: 4, maxPct: 17,
  },
  moderate: {
    label: 'Risiko Sedang', scoreRange: '12–14',
    chance: '~1 dari 6 orang berisiko terkena diabetes dalam 10 tahun.',
    description: 'Ada risiko yang cukup signifikan. Konsultasi medis dan perubahan gaya hidup mendesak.',
    color: 'text-[#FF8A65]', bg: 'bg-[#9C4A2A]/15', border: 'border-[#9C4A2A]/30',
    ringColor: 'ring-[#9C4A2A]/20', gradient: 'from-[#9C4A2A]/20',
    minScore: 12, maxScore: 14, minPct: 17, maxPct: 35,
  },
  high: {
    label: 'Risiko Tinggi ⚠️', scoreRange: '15–20',
    chance: '~1 dari 3 orang berisiko terkena diabetes dalam 10 tahun.',
    description: 'Risiko Anda tinggi. Segera konsultasikan dengan dokter untuk evaluasi dan tes darah.',
    color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-500/40',
    ringColor: 'ring-red-500/25', gradient: 'from-red-900/15',
    minScore: 15, maxScore: 20, minPct: 33, maxPct: 55,
  },
  very_high: {
    label: 'Risiko Sangat Tinggi ⚠️', scoreRange: '≥21',
    chance: '~1 dari 2 orang berisiko terkena diabetes dalam 10 tahun.',
    description: 'Risiko Anda sangat tinggi. Evaluasi medis mendesak diperlukan segera.',
    color: 'text-red-300', bg: 'bg-red-950/40', border: 'border-red-400/60',
    ringColor: 'ring-red-400/30', gradient: 'from-red-950/25',
    minScore: 21, maxScore: 26, minPct: 50, maxPct: 80,
  },
};

function getCategory(score: number): RiskCategory {
  if (score <= 6)  return 'low';
  if (score <= 11) return 'slightly_elevated';
  if (score <= 14) return 'moderate';
  if (score <= 20) return 'high';
  return 'very_high';
}

function scoreToPercent(score: number, cat: RiskCategory): number {
  const m = CATEGORY_META[cat];
  const t = Math.max(0, Math.min(1, (score - m.minScore) / Math.max(1, m.maxScore - m.minScore)));
  return Math.round(m.minPct + t * (m.maxPct - m.minPct));
}

// ─── Recommendations ──────────────────────────────────────────────────────────

const RECOMMENDATIONS: Record<RiskCategory, string[]> = {
  low: [
    'Pertahankan berat badan ideal dan konsumsi sayur, buah, dan biji-bijian setiap hari.',
    'Lakukan aktivitas fisik ≥30 menit sehari, minimal 5 hari per minggu.',
    'Periksakan gula darah secara rutin setidaknya setiap 3 tahun.',
    'Hindari merokok dan batasi konsumsi alkohol.',
  ],
  slightly_elevated: [
    'Tingkatkan aktivitas fisik ke 150–300 menit per minggu secara konsisten.',
    'Kurangi porsi karbohidrat olahan dan ganti dengan sumber serat tinggi.',
    'Targetkan penurunan berat badan 5–7% jika lingkar pinggang di atas normal.',
    'Periksakan kadar gula darah dan HbA1c setiap tahun.',
  ],
  moderate: [
    'Konsultasikan dengan dokter untuk tes gula darah puasa dan HbA1c segera.',
    'Mulai program penurunan berat badan terstruktur dengan target realistis.',
    'Pantau tekanan darah secara rutin; tangani hipertensi jika ada.',
    'Ikuti pola makan Mediterania atau DASH yang terbukti mengurangi risiko diabetes.',
  ],
  high: [
    'Temui dokter segera untuk evaluasi lengkap (gula darah puasa, HbA1c, OGTT).',
    'Pertimbangkan mengikuti Program Pencegahan Diabetes terstruktur.',
    'Target penurunan berat badan 7–10% dalam 6 bulan ke depan.',
    'Diskusikan dengan dokter apakah intervensi farmakologis (Metformin) diperlukan.',
  ],
  very_high: [
    'Segera cari evaluasi medis—Anda mungkin sudah dalam kondisi prediabetes atau diabetes.',
    'Lakukan tes HbA1c, gula darah puasa, dan OGTT secepatnya.',
    'Pantau gula darah mandiri setiap hari jika tersedia alat.',
    'Diskusikan rencana pengobatan komprehensif dengan dokter spesialis endokrin.',
  ],
};

// ─── BMI helpers ──────────────────────────────────────────────────────────────

export function calcBMI(heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  return Math.round((weightKg / (h * h)) * 10) / 10;
}

export function bmiToCategory(bmi: number): BMICategory {
  if (bmi < 25) return 'lt25';
  if (bmi <= 30) return '25_30';
  return 'gt30';
}

// ─── Unit helpers ──────────────────────────────────────────────────────────────

export function ftInToCm(feet: number, inches: number): number {
  return Math.round((feet * 30.48 + inches * 2.54) * 10) / 10;
}
export function lbsToKg(lbs: number): number {
  return Math.round((lbs / 2.20462) * 10) / 10;
}

// ─── Main calculation ──────────────────────────────────────────────────────────

export function calculateFINDRISC(input: FindriscInput): FindriscResult {
  const waistPoints = input.gender === 'male'
    ? WAIST_MALE_SCORES[input.waistMale ?? 'lt94']
    : WAIST_FEMALE_SCORES[input.waistFemale ?? 'lt80'];

  const scores = {
    age:      AGE_SCORES[input.ageRange],
    bmi:      BMI_SCORES[input.bmiCategory],
    waist:    waistPoints,
    activity: input.physicalActivity ? 0 : 2,
    diet:     input.eatsVegetables ? 0 : 1,
    bpMeds:   input.bpMedication ? 2 : 0,
    bgHistory: input.highBloodGlucoseHistory ? 5 : 0,
    family:   FAMILY_SCORES[input.familyHistory],
  };

  const totalScore = Object.values(scores).reduce((a, c) => a + c, 0);
  const category   = getCategory(totalScore);
  const riskPercent = scoreToPercent(totalScore, category);

  const factors: FactorDetail[] = [
    {
      label: 'Usia',
      points: scores.age, maxPoints: 4,
      description: { lt45: 'Di bawah 45 tahun (risiko lebih rendah).', '45_54': '45–54 tahun — usia mulai meningkatkan risiko.', '55_64': '55–64 tahun — risiko meningkat lebih jauh.', gte65: '≥65 tahun — grup usia tertinggi dalam risiko.' }[input.ageRange],
      isHighContributor: scores.age >= 3,
    },
    {
      label: 'Indeks Massa Tubuh (BMI)',
      points: scores.bmi, maxPoints: 3,
      description: { lt25: 'BMI normal (< 25 kg/m²)', '25_30': 'Kelebihan berat badan (25–30 kg/m²)', gt30: 'Obesitas (> 30 kg/m²) — faktor risiko signifikan.' }[input.bmiCategory],
      isHighContributor: scores.bmi >= 3,
    },
    {
      label: 'Lingkar Pinggang',
      points: scores.waist, maxPoints: 4,
      description: input.gender === 'male'
        ? { lt94: 'Normal (< 94 cm).', '94_102': 'Elevated (94–102 cm) — perhatikan berat badan.', gt102: 'Sangat tinggi (> 102 cm) — risiko tinggi.' }[input.waistMale ?? 'lt94']
        : { lt80: 'Normal (< 80 cm).', '80_88': 'Elevated (80–88 cm).', gt88: 'Sangat tinggi (> 88 cm) — risiko tinggi.' }[input.waistFemale ?? 'lt80'],
      isHighContributor: scores.waist >= 4,
    },
    {
      label: 'Aktivitas Fisik Harian',
      points: scores.activity, maxPoints: 2,
      description: input.physicalActivity ? 'Aktif ≥30 menit per hari — faktor protektif.' : 'Kurang aktif — sedentary lifestyle meningkatkan risiko.',
      isHighContributor: scores.activity >= 2,
    },
    {
      label: 'Konsumsi Sayur & Buah',
      points: scores.diet, maxPoints: 1,
      description: input.eatsVegetables ? 'Konsumsi sayur & buah setiap hari — bagus!' : 'Konsumsi sayur & buah tidak rutin — tingkatkan.',
      isHighContributor: false,
    },
    {
      label: 'Obat Tekanan Darah',
      points: scores.bpMeds, maxPoints: 2,
      description: input.bpMedication ? 'Menggunakan obat tekanan darah — terkait resistensi insulin.' : 'Tidak menggunakan obat tekanan darah.',
      isHighContributor: scores.bpMeds >= 2,
    },
    {
      label: 'Riwayat Gula Darah Tinggi',
      points: scores.bgHistory, maxPoints: 5,
      description: input.highBloodGlucoseHistory ? 'Pernah didiagnosis gula darah tinggi — indikator terkuat prediabetes.' : 'Tidak ada riwayat gula darah tinggi.',
      isHighContributor: scores.bgHistory >= 5,
    },
    {
      label: 'Riwayat Keluarga Diabetes',
      points: scores.family, maxPoints: 5,
      description: { none: 'Tidak ada kerabat dengan diabetes.', distant: 'Ada kerabat jauh (kakek/nenek, paman/bibi, sepupu).', close: 'Ada kerabat dekat (orang tua, saudara, anak) — risiko genetik tinggi.' }[input.familyHistory],
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
    topContributors: factors.filter(f => f.isHighContributor).map(f => f.label),
  };
}
