import { toHijri, toGregorian } from "hijri-converter";
import {
  HIJRI_MONTHS,
  GREGORIAN_MONTHS_ID,
  DAYS_ID,
  ISLAMIC_EVENTS,
} from "@/lib/constants";
import { HijriDate, GregorianDate, IslamicEvent } from "./types";

// ─── Internal Utilities ──────────────────────────────────────────────────────

export function getHijriMonthName(monthNumber: number): string {
  if (!monthNumber || isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12)
    return "";
  return HIJRI_MONTHS[monthNumber - 1].name;
}

export function getGregorianMonthName(monthNumber: number): string {
  if (!monthNumber || isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12)
    return "";
  return GREGORIAN_MONTHS_ID[monthNumber - 1];
}

export function getDayName(dayIndex: number): string {
  return DAYS_ID[dayIndex] || "";
}

// ─── Conversion Logic ────────────────────────────────────────────────────────

export function convertToHijri(
  gy: number,
  gm: number,
  gd: number,
): HijriDate | null {
  try {
    const d = new Date(gy, gm - 1, gd);
    // Simple verification check to avoid manual date rollover (like Feb 31 -> Mar 3)
    if (
      d.getFullYear() !== gy ||
      d.getMonth() !== gm - 1 ||
      d.getDate() !== gd
    ) {
      return null;
    }

    const result = toHijri(gy, gm, gd);
    if (!result || isNaN(result.hy) || isNaN(result.hm) || isNaN(result.hd)) {
      return null;
    }
    return result;
  } catch {
    return null;
  }
}

export function convertToGregorian(
  hy: number,
  hm: number,
  hd: number,
): GregorianDate | null {
  try {
    if (hy < 1 || hm < 1 || hm > 12 || hd < 1 || hd > 30) {
      return null;
    }
    const result = toGregorian(hy, hm, hd);
    if (!result || isNaN(result.gy) || isNaN(result.gm) || isNaN(result.gd)) {
      return null;
    }
    return result;
  } catch {
    return null;
  }
}

/**
 * Searches for Islamic events based on Hijri month and day.
 */
export function findIslamicEvent(hm: number, hd: number): IslamicEvent | null {
  const key = `${hm}-${hd}` as keyof typeof ISLAMIC_EVENTS;
  const event = ISLAMIC_EVENTS[key];
  if (!event) return null;

  return {
    name: event.name,
    emoji: event.emoji,
    type: event.type as IslamicEvent["type"],
  };
}

/**
 * Generates a localized string for today's Hijri date.
 */
export function getTodayHijriString(): string {
  const now = new Date();
  const hc = toHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const dayName = getDayName(now.getDay());
  const monthName = getHijriMonthName(hc.hm);

  return `${dayName}, ${hc.hd} ${monthName} ${hc.hy} H`;
}
