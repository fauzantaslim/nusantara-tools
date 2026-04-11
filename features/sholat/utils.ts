import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
  HighLatitudeRule,
  CalculationParameters,
  Qibla,
} from "adhan";
import {
  PrayerSettings,
  DailyPrayerTimes,
  PrayerCalculationMethod,
  PrayerHighLatRule,
  PrayerTimeFormat,
} from "./types";

// ─── Internal Mappings ──────────────────────────────────────────────────────

function getCalculationParams(
  method: PrayerCalculationMethod,
): CalculationParameters {
  switch (method) {
    case "MuslimWorldLeague":
      return CalculationMethod.MuslimWorldLeague();
    case "Egyptian":
      return CalculationMethod.Egyptian();
    case "Karachi":
      return CalculationMethod.Karachi();
    case "UmmAlQura":
      return CalculationMethod.UmmAlQura();
    case "Dubai":
      return CalculationMethod.Dubai();
    case "MoonsightingCommittee":
      return CalculationMethod.MoonsightingCommittee();
    case "NorthAmerica":
      return CalculationMethod.NorthAmerica();
    case "Kuwait":
      return CalculationMethod.Kuwait();
    case "Qatar":
      return CalculationMethod.Qatar();
    case "Singapore":
      return CalculationMethod.Singapore();
    case "Tehran":
      return CalculationMethod.Tehran();
    case "Turkey":
      return CalculationMethod.Turkey();
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}

function getHighLatRule(
  rule: PrayerHighLatRule,
): (typeof HighLatitudeRule)[keyof typeof HighLatitudeRule] {
  switch (rule) {
    case "MiddleOfTheNight":
      return HighLatitudeRule.MiddleOfTheNight;
    case "SeventhOfTheNight":
      return HighLatitudeRule.SeventhOfTheNight;
    case "TwilightAngle":
      return HighLatitudeRule.TwilightAngle;
    default:
      return HighLatitudeRule.MiddleOfTheNight;
  }
}

// ─── Primary Calculation ────────────────────────────────────────────────────

export function calculatePrayerTimesData(
  settings: PrayerSettings,
): DailyPrayerTimes | null {
  try {
    const coordinates = new Coordinates(settings.latitude, settings.longitude);

    // Initial Parameters
    const params = getCalculationParams(settings.method);

    // Asr Method (Madhab)
    params.madhab =
      settings.asrMethod === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;

    // High Latitude Regulations
    params.highLatitudeRule = getHighLatRule(settings.highLatitudeRule);

    // Main Calculation
    const prayerTimesList = new PrayerTimes(coordinates, settings.date, params);

    // Qibla Direction
    const qibla = Qibla(coordinates);

    // Imsak Logic (Traditionally 10 mins before Fajr in SEA/Indonesia)
    const imsak = new Date(prayerTimesList.fajr.getTime() - 10 * 60000);

    // Midnight Logic (Sunnatic approach: middle of Maghrib to next day Fajr)
    const fajrNextDay = new Date(
      prayerTimesList.fajr.getTime() + 24 * 60 * 60 * 1000,
    );
    const maghribTime = prayerTimesList.maghrib.getTime();
    const midnightTime =
      maghribTime + (fajrNextDay.getTime() - maghribTime) / 2;
    const midnight = new Date(midnightTime);

    return {
      imsak,
      fajr: prayerTimesList.fajr,
      sunrise: prayerTimesList.sunrise,
      dhuhr: prayerTimesList.dhuhr,
      asr: prayerTimesList.asr,
      maghrib: prayerTimesList.maghrib,
      isha: prayerTimesList.isha,
      midnight,
      qiblaDirection: qibla,
    };
  } catch (err) {
    console.error("Error calculating prayer times:", err);
    return null;
  }
}

// ─── UI Formatting ──────────────────────────────────────────────────────────

export function formatPrayerTime(
  date: Date | null,
  timeFormat: PrayerTimeFormat,
  timezoneId: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
): string {
  if (!date || isNaN(date.getTime())) return "--:--";

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: timeFormat === "12h",
    timeZone: timezoneId,
  })
    .format(date)
    .replace(".", ":");
}

/**
 * Helper to display the countdown in HH:mm:ss
 */
export function formatCountdown(diffMs: number): string {
  if (diffMs < 0) return "00:00:00";
  const totalSeconds = Math.floor(diffMs / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
