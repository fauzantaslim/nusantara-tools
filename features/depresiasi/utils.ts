export type AssetType = "tangible" | "intangible";

export type AssetGroup =
  | "group1"
  | "group2"
  | "group3"
  | "group4"
  | "building_permanent"
  | "building_nonpermanent";

export type DepreciationMethod = "straight_line" | "declining_balance";

export interface AssetGroupDetail {
  id: AssetGroup;
  label: string;
  usefulLife: number;
  straightLineRate: number; // as percentage (e.g. 25 for 25%)
  decliningBalanceRate: number | null; // null if not applicable
}

export const ASSET_GROUPS: Record<AssetType, AssetGroupDetail[]> = {
  tangible: [
    {
      id: "group1",
      label: "Kelompok 1",
      usefulLife: 4,
      straightLineRate: 25,
      decliningBalanceRate: 50,
    },
    {
      id: "group2",
      label: "Kelompok 2",
      usefulLife: 8,
      straightLineRate: 12.5,
      decliningBalanceRate: 25,
    },
    {
      id: "group3",
      label: "Kelompok 3",
      usefulLife: 16,
      straightLineRate: 6.25,
      decliningBalanceRate: 12.5,
    },
    {
      id: "group4",
      label: "Kelompok 4",
      usefulLife: 20,
      straightLineRate: 5,
      decliningBalanceRate: 10,
    },
    {
      id: "building_permanent",
      label: "Bangunan Permanen",
      usefulLife: 20,
      straightLineRate: 5,
      decliningBalanceRate: null,
    },
    {
      id: "building_nonpermanent",
      label: "Bangunan Tidak Permanen",
      usefulLife: 10,
      straightLineRate: 10,
      decliningBalanceRate: null,
    },
  ],
  intangible: [
    {
      id: "group1",
      label: "Kelompok 1",
      usefulLife: 4,
      straightLineRate: 25,
      decliningBalanceRate: 50,
    },
    {
      id: "group2",
      label: "Kelompok 2",
      usefulLife: 8,
      straightLineRate: 12.5,
      decliningBalanceRate: 25,
    },
    {
      id: "group3",
      label: "Kelompok 3",
      usefulLife: 16,
      straightLineRate: 6.25,
      decliningBalanceRate: 12.5,
    },
    {
      id: "group4",
      label: "Kelompok 4",
      usefulLife: 20,
      straightLineRate: 5,
      decliningBalanceRate: 10,
    },
  ],
};

export interface DepreciationInput {
  cost: number;
  type: AssetType;
  group: AssetGroup;
  method: DepreciationMethod;
  startDate: string; // format: "YYYY-MM"
}

export interface YearRecord {
  year: number;
  label: string; // e.g. "Tahun 1 (2026)"
  depreciation: number;
  accumulated: number;
  bookValue: number;
}

export interface MonthRecord {
  month: number; // 1-based month within asset lifetime
  calendarMonth: number; // 1-12
  calendarYear: number;
  label: string; // e.g. "Jan 2026"
  depreciation: number;
  accumulated: number;
  bookValue: number;
}

export interface DepreciationResult {
  records: YearRecord[];
  monthlyRecords: MonthRecord[];
  totalDepreciation: number;
  isFullyDepreciated: boolean;
  yearsToFullyDepreciate: number;
  startDate: string;
}

const MONTH_NAMES_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export const getAssetGroupDetail = (
  type: AssetType,
  groupId: AssetGroup,
): AssetGroupDetail | undefined => {
  return ASSET_GROUPS[type].find((g) => g.id === groupId);
};

export const calculateDepreciation = (
  input: DepreciationInput,
): DepreciationResult | null => {
  if (input.cost <= 0) return null;

  const detail = getAssetGroupDetail(input.type, input.group);
  if (!detail) return null;

  // Validate method (buildings cannot use declining balance)
  if (
    input.method === "declining_balance" &&
    detail.decliningBalanceRate === null
  ) {
    input.method = "straight_line";
  }

  // Parse start date
  const [startYear, startMonth] = input.startDate.split("-").map(Number);

  const records: YearRecord[] = [];
  let currentBookValue = input.cost;
  let accumulated = 0;

  if (input.method === "straight_line") {
    const annualDepreciation = input.cost * (detail.straightLineRate / 100);

    for (let year = 1; year <= detail.usefulLife; year++) {
      let depreciation =
        year === detail.usefulLife
          ? currentBookValue
          : Math.min(annualDepreciation, currentBookValue);
      depreciation = Math.round(depreciation);

      currentBookValue -= depreciation;
      accumulated += depreciation;

      const calYear = startYear + (year - 1);

      records.push({
        year,
        label: `Tahun ${year} (${calYear})`,
        depreciation,
        accumulated,
        bookValue: Math.max(0, currentBookValue),
      });

      if (currentBookValue <= 0) break;
    }
  } else if (input.method === "declining_balance") {
    const rate = (detail.decliningBalanceRate || 0) / 100;

    for (let year = 1; year <= detail.usefulLife; year++) {
      let depreciation = 0;

      if (year === detail.usefulLife) {
        depreciation = currentBookValue;
      } else {
        depreciation = Math.round(currentBookValue * rate);
      }

      currentBookValue -= depreciation;
      accumulated += depreciation;

      const calYear = startYear + (year - 1);

      records.push({
        year,
        label: `Tahun ${year} (${calYear})`,
        depreciation,
        accumulated,
        bookValue: Math.max(0, currentBookValue),
      });

      if (currentBookValue <= 0) break;
    }
  }

  // Generate monthly records from yearly records
  const monthlyRecords = generateMonthlyRecords(
    records,
    startMonth,
    startYear,
    input.method,
  );

  return {
    records,
    monthlyRecords,
    totalDepreciation: accumulated,
    isFullyDepreciated: currentBookValue <= 0,
    yearsToFullyDepreciate: detail.usefulLife,
    startDate: input.startDate,
  };
};

function generateMonthlyRecords(
  yearRecords: YearRecord[],
  startMonth: number,
  startYear: number,
  method: DepreciationMethod,
): MonthRecord[] {
  const monthly: MonthRecord[] = [];
  let globalMonth = 0;
  let accumulatedTotal = 0;
  let currentBookValue =
    yearRecords.length > 0
      ? yearRecords[0].depreciation + yearRecords[0].bookValue // = cost at year start
      : 0;

  // Calculate initial cost from first year record
  if (yearRecords.length > 0) {
    currentBookValue =
      yearRecords[0].accumulated -
      yearRecords[0].depreciation +
      yearRecords[0].depreciation +
      yearRecords[0].bookValue;
    // Simpler: cost = accumulated of last year = totalDepreciation
    currentBookValue = yearRecords[0].bookValue + yearRecords[0].accumulated;
    // Actually even simpler: the first year's bookValue + first year's depreciation gives cost for first year
    // But accumulated includes all previous. For year 1: accumulated = depreciation, so bookValue + accumulated = cost
  }

  const totalCost =
    yearRecords.length > 0
      ? yearRecords[yearRecords.length - 1].accumulated +
        yearRecords[yearRecords.length - 1].bookValue
      : 0;

  currentBookValue = totalCost;

  for (const yearRecord of yearRecords) {
    // Distribute annual depreciation across 12 months
    const monthlyDepreciation = Math.floor(yearRecord.depreciation / 12);
    const remainder = yearRecord.depreciation - monthlyDepreciation * 12;

    for (let m = 0; m < 12; m++) {
      globalMonth++;

      // Calculate calendar month/year
      const totalMonths = startMonth - 1 + (globalMonth - 1);
      const calMonth = (totalMonths % 12) + 1;
      const calYear = startYear + Math.floor(totalMonths / 12);

      // Last month of the year gets the remainder
      let dep = monthlyDepreciation;
      if (m === 11) {
        dep = monthlyDepreciation + remainder;
      }

      accumulatedTotal += dep;
      currentBookValue -= dep;

      monthly.push({
        month: globalMonth,
        calendarMonth: calMonth,
        calendarYear: calYear,
        label: `${MONTH_NAMES_SHORT[calMonth - 1]} ${calYear}`,
        depreciation: dep,
        accumulated: accumulatedTotal,
        bookValue: Math.max(0, Math.round(currentBookValue)),
      });
    }
  }

  return monthly;
}
