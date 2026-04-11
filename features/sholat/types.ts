import {
  PRAYER_METHOD,
  PRAYER_ASR_METHOD,
  PRAYER_HIGH_LAT_RULE,
  PRAYER_TIME_FORMAT,
} from "@/lib/constants";

export type PrayerCalculationMethod = keyof typeof PRAYER_METHOD;
export type PrayerAsrMethod = keyof typeof PRAYER_ASR_METHOD;
export type PrayerHighLatRule = keyof typeof PRAYER_HIGH_LAT_RULE;
export type PrayerTimeFormat =
  (typeof PRAYER_TIME_FORMAT)[keyof typeof PRAYER_TIME_FORMAT];

export interface PrayerSettings {
  latitude: number;
  longitude: number;
  date: Date;
  method: PrayerCalculationMethod;
  asrMethod: PrayerAsrMethod;
  highLatitudeRule: PrayerHighLatRule;
  timeFormat: PrayerTimeFormat;
}

export interface DailyPrayerTimes {
  imsak: Date;
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
  midnight: Date;
  qiblaDirection: number;
}

export interface PrayerFormData {
  lat: string;
  lng: string;
  locationName: string;
  date: string;
  method: PrayerCalculationMethod;
  asrMethod: PrayerAsrMethod;
  highLatRule: PrayerHighLatRule;
  timeFormat: PrayerTimeFormat;
  cityPreset: string;
}

export interface PrayerCountdown {
  nextPrayerName: string;
  countdownStr: string;
}

export interface PrayerContextType {
  data: PrayerFormData;
  updateData: (key: keyof PrayerFormData, value: string) => void;
  prayerTimes: DailyPrayerTimes | null;
  countdown: PrayerCountdown;
  error: string;
  isLocating: boolean;
  handleGeolocation: () => void;
  handleReset: () => void;
}
