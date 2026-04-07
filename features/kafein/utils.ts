export type WeightUnit = "kg" | "lbs";
export type UserProfile = "adult" | "pregnant" | "teen";
export type CaffeineStatus = "Safe" | "Moderate" | "High" | "Excessive";

export interface CaffeineSource {
  id: string;
  name: string;
  mgPerUnit: number; // caffeine per serving in mg
  unit: string; // e.g. "per gelas (8oz)", "per shot"
}

export const CAFFEINE_SOURCES: CaffeineSource[] = [
  { id: "kopi", name: "Kopi (8 oz)", mgPerUnit: 95, unit: "per gelas" },
  {
    id: "espresso",
    name: "Espresso (1 shot)",
    mgPerUnit: 63,
    unit: "per shot",
  },
  {
    id: "kopi-drip",
    name: "Kopi Drip/Filter (8 oz)",
    mgPerUnit: 140,
    unit: "per gelas",
  },
  {
    id: "kopi-instan",
    name: "Kopi Instan (8 oz)",
    mgPerUnit: 65,
    unit: "per gelas",
  },
  {
    id: "teh-hitam",
    name: "Teh Hitam (8 oz)",
    mgPerUnit: 47,
    unit: "per gelas",
  },
  {
    id: "teh-hijau",
    name: "Teh Hijau (8 oz)",
    mgPerUnit: 28,
    unit: "per gelas",
  },
  { id: "teh-matcha", name: "Matcha (8 oz)", mgPerUnit: 70, unit: "per gelas" },
  { id: "cola", name: "Cola/Soda (12 oz)", mgPerUnit: 35, unit: "per kaleng" },
  {
    id: "energy-drink",
    name: "Minuman Energi (8 oz)",
    mgPerUnit: 85,
    unit: "per sajian",
  },
  {
    id: "energy-shot",
    name: "Energy Shot (2 oz)",
    mgPerUnit: 200,
    unit: "per botol",
  },
  {
    id: "cokelat-hitam",
    name: "Cokelat Hitam (1 oz)",
    mgPerUnit: 12,
    unit: "per porsi",
  },
  {
    id: "custom",
    name: "Sumber Kustom (isi manual)",
    mgPerUnit: 0,
    unit: "per sajian",
  },
];

export interface CaffeineEntry {
  id: string;
  sourceId: string;
  quantity: number;
  customMg?: number; // used only when sourceId === 'custom'
}

export interface CaffeineInput {
  entries: CaffeineEntry[];
  bodyWeight?: number;
  bodyWeightUnit?: WeightUnit;
  profile: UserProfile;
}

export interface CaffeineEntryResult {
  name: string;
  quantity: number;
  mgPerUnit: number;
  totalMg: number;
}

export interface CaffeineResult {
  totalMg: number;
  perBodyWeightMgKg: number | null;
  recommendedLimitMg: number;
  perBodyWeightLimit: number | null; // 6 × kg
  status: CaffeineStatus;
  statusColor: "green" | "yellow" | "orange" | "red";
  insight: string;
  breakdown: CaffeineEntryResult[];
  profile: UserProfile;
}

const PROFILE_LIMITS: Record<UserProfile, number> = {
  adult: 400,
  pregnant: 200,
  teen: 100,
};

const PROFILE_LABELS: Record<UserProfile, string> = {
  adult: "Dewasa (≤400 mg/hari)",
  pregnant: "Hamil/Menyusui (≤200 mg/hari)",
  teen: "Remaja (≤100 mg/hari)",
};

function getStatus(
  totalMg: number,
  limit: number,
): {
  status: CaffeineStatus;
  color: "green" | "yellow" | "orange" | "red";
  insight: string;
} {
  const ratio = totalMg / limit;

  if (ratio <= 0.5) {
    return {
      status: "Safe",
      color: "green",
      insight:
        "Asupan kafein Anda berada di level yang aman. Otak dan tubuh Anda mendapat stimulasi yang cukup tanpa risiko efek berlebihan.",
    };
  } else if (ratio <= 1.0) {
    return {
      status: "Moderate",
      color: "yellow",
      insight:
        "Asupan Anda mendekati batas aman harian. Pertimbangkan untuk tidak menambah konsumsi kafein, terutama di sore atau malam hari agar kualitas tidur tetap terjaga.",
    };
  } else if (ratio <= 1.5) {
    return {
      status: "High",
      color: "orange",
      insight:
        "Asupan kafein Anda melebihi batas yang direkomendasikan. Efek seperti gelisah, jantung berdebar, dan gangguan tidur dapat mulai dirasakan. Kurangi konsumsi Anda hari ini.",
    };
  } else {
    return {
      status: "Excessive",
      color: "red",
      insight:
        "Asupan kafein Anda jauh di atas ambang aman. Risiko efek samping serius meningkat secara signifikan: mual, kecemasan, aritmia jantung, dan insomnia. Hentikan konsumsi kafein untuk sisa hari ini.",
    };
  }
}

export function calculateCaffeine(input: CaffeineInput): CaffeineResult {
  const { entries, bodyWeight, bodyWeightUnit, profile } = input;

  const breakdown: CaffeineEntryResult[] = entries.map((entry) => {
    const source = CAFFEINE_SOURCES.find((s) => s.id === entry.sourceId);
    const mgPerUnit =
      entry.sourceId === "custom"
        ? (entry.customMg ?? 0)
        : (source?.mgPerUnit ?? 0);
    const totalMg = mgPerUnit * entry.quantity;
    return {
      name:
        entry.sourceId === "custom"
          ? "Sumber Kustom"
          : (source?.name ?? "Tidak diketahui"),
      quantity: entry.quantity,
      mgPerUnit,
      totalMg,
    };
  });

  const totalMg = breakdown.reduce((acc, b) => acc + b.totalMg, 0);

  let bodyWeightKg: number | undefined;
  if (bodyWeight && bodyWeight > 0) {
    bodyWeightKg = bodyWeightUnit === "lbs" ? bodyWeight / 2.20462 : bodyWeight;
  }

  const perBodyWeightMgKg = bodyWeightKg
    ? Math.round((totalMg / bodyWeightKg) * 10) / 10
    : null;
  const perBodyWeightLimit = bodyWeightKg ? Math.round(bodyWeightKg * 6) : null;

  const recommendedLimitMg = PROFILE_LIMITS[profile];
  const { status, color, insight } = getStatus(totalMg, recommendedLimitMg);

  return {
    totalMg: Math.round(totalMg),
    perBodyWeightMgKg,
    recommendedLimitMg,
    perBodyWeightLimit,
    status,
    statusColor: color,
    insight,
    breakdown,
    profile,
  };
}

export { PROFILE_LABELS };
