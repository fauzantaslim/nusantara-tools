import { PernikahanInput, PernikahanResult, WeddingCategory } from "./types";

// Brand-adjacent chart colors (NusantaraTools palette + wedding harmonics)
export const CATEGORY_COLORS: string[] = [
  "#9C4A2A", // Merah Bata
  "#C17A3A", // Kunyit Emas
  "#4A7C59", // Hijau Hutan
  "#7A5C42", // Tanah Merah
  "#2C6E8A", // Biru Laut
  "#8A4A6E", // Ungu Tua (warm)
  "#5C6A2C", // Hijau Lumut
  "#A05C3A", // Tembaga
  "#6A3A5C", // Ungu Dalam
];

export const DEFAULT_CATEGORIES: WeddingCategory[] = [
  {
    id: "venue",
    name: "Gedung & Venue",
    percentage: 30,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "catering",
    name: "Katering",
    percentage: 25,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "foto",
    name: "Foto & Video",
    percentage: 10,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "busana",
    name: "Busana Pengantin",
    percentage: 8,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "dekorasi",
    name: "Dekorasi & Bunga",
    percentage: 8,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "hiburan",
    name: "Hiburan & MC",
    percentage: 5,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "undangan",
    name: "Undangan",
    percentage: 3,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "transport",
    name: "Transportasi",
    percentage: 3,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
  {
    id: "lainnya",
    name: "Lain-lain",
    percentage: 8,
    amount: 0,
    inputMode: "percentage",
    isCustom: false,
  },
];

export const calculateWedding = (input: PernikahanInput): PernikahanResult => {
  const { totalBudget, guestCount, categories } = input;

  const safeTotal = Math.max(0, totalBudget);
  const safeGuests = Math.max(1, guestCount);

  // Resolve each category's final amount & percentage
  const categoryAllocations = categories.map((cat, index) => {
    let amount: number;
    let percentage: number;

    if (cat.inputMode === "percentage") {
      percentage = Math.max(0, cat.percentage);
      amount = (percentage / 100) * safeTotal;
    } else {
      amount = Math.max(0, cat.amount);
      percentage = safeTotal > 0 ? (amount / safeTotal) * 100 : 0;
    }

    return {
      id: cat.id,
      name: cat.name,
      amount,
      percentage,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    };
  });

  const totalAllocated = categoryAllocations.reduce(
    (sum, c) => sum + c.amount,
    0,
  );
  const percentageTotal = categoryAllocations.reduce(
    (sum, c) => sum + c.percentage,
    0,
  );
  const unallocated = safeTotal - totalAllocated;
  const costPerGuest = safeTotal / safeGuests;
  const overBudget = totalAllocated > safeTotal && safeTotal > 0;

  const topCategory =
    categoryAllocations.length > 0
      ? categoryAllocations.reduce((prev, curr) =>
          curr.amount > prev.amount ? curr : prev,
        )
      : null;

  return {
    isCalculated: true,
    categoryAllocations,
    totalAllocated,
    unallocated,
    costPerGuest,
    overBudget,
    percentageTotal,
    topCategory: topCategory
      ? { name: topCategory.name, amount: topCategory.amount }
      : null,
  };
};

export const formatIDR = (val: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val);

export const generateId = (): string =>
  `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
