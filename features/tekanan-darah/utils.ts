export type BPCategory =
  | 'low'
  | 'normal'
  | 'elevated'
  | 'hypertension_1'
  | 'hypertension_2'
  | 'crisis';

export type BodyPosition = 'sitting' | 'standing' | 'lying';
export type Arm = 'left' | 'right';

export interface BPInput {
  systolic: number;
  diastolic: number;
  heartRate?: number;
  datetime?: string;
  position?: BodyPosition;
  arm?: Arm;
  notes?: string;
}

export interface BPResult {
  systolic: number;
  diastolic: number;
  heartRate?: number;
  category: BPCategory;
  label: string;
  description: string;
  recommendation: string;
  isUrgent: boolean;
}

export interface SavedReading extends BPResult {
  id: string;
  datetime: string;
  position?: BodyPosition;
  arm?: Arm;
  notes?: string;
}

export type TrendDirection = 'improving' | 'worsening' | 'stable' | 'insufficient';

// ─── Classification ──────────────────────────────────────────────────────────

export function classifyBP(systolic: number, diastolic: number): BPCategory {
  if (systolic >= 180 || diastolic >= 120) return 'crisis';
  if (systolic >= 140 || diastolic >= 90) return 'hypertension_2';
  if (systolic >= 130 || diastolic >= 80) return 'hypertension_1';
  if (systolic >= 120 && diastolic < 80) return 'elevated';
  if (systolic < 90 && diastolic < 60) return 'low';
  return 'normal';
}

interface CategoryMeta {
  label: string;
  description: string;
  recommendation: string;
  isUrgent: boolean;
  color: string;
  bg: string;
  border: string;
  ringColor: string;
  gradient: string;
  accentText: string;
}

export const CATEGORY_META: Record<BPCategory, CategoryMeta> = {
  low: {
    label: 'Tekanan Darah Rendah',
    description: 'Tekanan darah Anda berada di bawah rentang normal. Kondisi ini disebut hipotensi dan dapat menyebabkan pusing, lemas, atau pingsan.',
    recommendation: 'Perbanyak asupan cairan dan garam secukupnya. Hindari berdiri tiba-tiba. Jika gejala muncul, segera konsultasikan dengan dokter.',
    isUrgent: false,
    color: 'text-blue-300', bg: 'bg-blue-900/20', border: 'border-blue-500/30',
    ringColor: 'ring-blue-500/20', gradient: 'from-blue-900/20', accentText: 'text-blue-300',
  },
  normal: {
    label: 'Normal',
    description: 'Tekanan darah Anda berada pada rentang ideal. Kondisi jantung dan pembuluh darah Anda bekerja dengan baik.',
    recommendation: 'Pertahankan gaya hidup sehat: olahraga rutin, diet seimbang, kurangi stres, dan tidur cukup. Pantau secara berkala.',
    isUrgent: false,
    color: 'text-[#4A7C59]', bg: 'bg-[#4A7C59]/15', border: 'border-[#4A7C59]/30',
    ringColor: 'ring-[#4A7C59]/20', gradient: 'from-[#4A7C59]/20', accentText: 'text-[#4A7C59]',
  },
  elevated: {
    label: 'Meningkat (Elevated)',
    description: 'Tekanan darah Anda sedikit di atas normal. Ini bukan hipertensi, tetapi merupakan sinyal peringatan dini.',
    recommendation: 'Ubah gaya hidup: kurangi asupan natrium, perbanyak aktivitas fisik, batasi alkohol, dan kelola stres. Pantau setiap beberapa hari.',
    isUrgent: false,
    color: 'text-[#C17A3A]', bg: 'bg-[#C17A3A]/15', border: 'border-[#C17A3A]/30',
    ringColor: 'ring-[#C17A3A]/20', gradient: 'from-[#C17A3A]/20', accentText: 'text-[#C17A3A]',
  },
  hypertension_1: {
    label: 'Hipertensi Tahap 1',
    description: 'Tekanan darah Anda berada pada level hipertensi tahap pertama. Ini meningkatkan risiko penyakit jantung dan stroke.',
    recommendation: 'Segera konsultasikan dengan dokter. Perubahan gaya hidup diperlukan dan dokter mungkin mempertimbangkan pengobatan.',
    isUrgent: false,
    color: 'text-[#FF8A65]', bg: 'bg-[#9C4A2A]/15', border: 'border-[#9C4A2A]/30',
    ringColor: 'ring-[#9C4A2A]/20', gradient: 'from-[#9C4A2A]/20', accentText: 'text-[#FF8A65]',
  },
  hypertension_2: {
    label: 'Hipertensi Tahap 2',
    description: 'Tekanan darah Anda berada pada level hipertensi yang serius. Risiko komplikasi kardiovaskular meningkat secara signifikan.',
    recommendation: 'Segera temui dokter. Kemungkinan besar diperlukan pengobatan medis dan perubahan gaya hidup yang signifikan.',
    isUrgent: true,
    color: 'text-red-400', bg: 'bg-red-900/25', border: 'border-red-500/40',
    ringColor: 'ring-red-500/25', gradient: 'from-red-900/20', accentText: 'text-red-400',
  },
  crisis: {
    label: 'Krisis Hipertensi ⚠️',
    description: 'DARURAT MEDIS. Tekanan darah Anda sangat tinggi dan berpotensi mengancam jiwa. Ini membutuhkan perhatian medis segera.',
    recommendation: 'SEGERA hubungi layanan darurat atau pergi ke UGD rumah sakit terdekat. Jangan tunggu atau abaikan kondisi ini.',
    isUrgent: true,
    color: 'text-red-300', bg: 'bg-red-950/40', border: 'border-red-400/60',
    ringColor: 'ring-red-400/30', gradient: 'from-red-950/30', accentText: 'text-red-300',
  },
};

// ─── Main calculator ──────────────────────────────────────────────────────────

export function analyzeBP(input: BPInput): BPResult {
  const category = classifyBP(input.systolic, input.diastolic);
  const meta = CATEGORY_META[category];
  return {
    systolic: input.systolic,
    diastolic: input.diastolic,
    heartRate: input.heartRate,
    category,
    label: meta.label,
    description: meta.description,
    recommendation: meta.recommendation,
    isUrgent: meta.isUrgent,
  };
}

// ─── Trend analysis ───────────────────────────────────────────────────────────

const CATEGORY_SCORE: Record<BPCategory, number> = {
  low: 1, normal: 2, elevated: 3, hypertension_1: 4, hypertension_2: 5, crisis: 6,
};

export function analyzeTrend(readings: SavedReading[]): TrendDirection {
  if (readings.length < 3) return 'insufficient';
  const recent = readings.slice(0, 3).map(r => CATEGORY_SCORE[r.category]);
  const older = readings.slice(3, 6).map(r => CATEGORY_SCORE[r.category]);
  if (older.length === 0) return 'insufficient';
  const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
  const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
  if (recentAvg < olderAvg - 0.3) return 'improving';
  if (recentAvg > olderAvg + 0.3) return 'worsening';
  return 'stable';
}

// ─── BP scale for visual ──────────────────────────────────────────────────────

/** Returns 0-100 position on the scale for a given systolic value */
export function systolicToPercent(systolic: number): number {
  const min = 70;
  const max = 200;
  return Math.max(0, Math.min(100, ((systolic - min) / (max - min)) * 100));
}
