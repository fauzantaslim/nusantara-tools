import { HijriConversionMode } from "@/lib/constants";

export type { HijriConversionMode };

export interface HijriDate {
  hy: number;
  hm: number;
  hd: number;
}

export interface GregorianDate {
  gy: number;
  gm: number;
  gd: number;
}

export interface IslamicEvent {
  name: string;
  emoji: string;
  type: "celebration" | "fasting" | "historical";
}

export interface HijriFormData {
  gDay: string;
  gMonth: string;
  gYear: string;
  hDay: string;
  hMonth: string;
  hYear: string;
}

export interface HijriResult {
  title: string;
  sub: string;
  day: string;
  event: IslamicEvent | null;
}

export interface HijriContextType {
  mode: HijriConversionMode;
  data: HijriFormData;
  updateData: (key: keyof HijriFormData, value: string) => void;
  result: HijriResult | null;
  error: string;
  handleSetToday: () => void;
  handleSetTomorrow: () => void;
  handleReset: () => void;
  toggleMode: () => void;
  todayHijri: string;
}
