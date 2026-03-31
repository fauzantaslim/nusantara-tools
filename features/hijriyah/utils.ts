import { toHijri, toGregorian } from 'hijri-converter';

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
  type: 'celebration' | 'fasting' | 'historical';
}

export const HIJRI_MONTHS = [
  { value: 1, name: 'Muharram' },
  { value: 2, name: 'Safar' },
  { value: 3, name: 'Rabiul Awal' },
  { value: 4, name: 'Rabiul Akhir' },
  { value: 5, name: 'Jumadil Awal' },
  { value: 6, name: 'Jumadil Akhir' },
  { value: 7, name: 'Rajab' },
  { value: 8, name: 'Syaban' },
  { value: 9, name: 'Ramadhan' },
  { value: 10, name: 'Syawal' },
  { value: 11, name: 'Dzulqa’dah' },
  { value: 12, name: 'Dzulhijjah' },
];

export const GREGORIAN_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export const DAYS_ID = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

export function getHijriMonthName(monthIndex: number): string {
  if (!monthIndex || isNaN(monthIndex) || monthIndex < 1 || monthIndex > 12) return '';
  return HIJRI_MONTHS[monthIndex - 1].name;
}

export function convertToHijri(gy: number, gm: number, gd: number): HijriDate | null {
  try {
    const d = new Date(gy, gm - 1, gd);
    // Simple verification check to avoid manual date rollover (like Feb 31 -> Mar 3)
    if (d.getFullYear() !== gy || d.getMonth() !== gm - 1 || d.getDate() !== gd) {
      return null;
    }
    
    const result = toHijri(gy, gm, gd);
    if (!result || isNaN(result.hy) || isNaN(result.hm) || isNaN(result.hd)) {
      return null;
    }
    return result;
  } catch (err) {
    return null;
  }
}

export function convertToGregorian(hy: number, hm: number, hd: number): GregorianDate | null {
  try {
    if (hy < 1 || hm < 1 || hm > 12 || hd < 1 || hd > 30) {
      return null;
    }
    const result = toGregorian(hy, hm, hd);
    if (!result || isNaN(result.gy) || isNaN(result.gm) || isNaN(result.gd)) {
      return null;
    }
    return result;
  } catch (err) {
    return null;
  }
}

export function getIslamicEvent(hm: number, hd: number): IslamicEvent | null {
  const events: Record<string, IslamicEvent> = {
    '1-1': { name: 'Tahun Baru Hijriyah', emoji: '🌟', type: 'celebration' },
    '1-10': { name: 'Hari Asyura', emoji: '🗓️', type: 'fasting' },
    '3-12': { name: 'Maulid Nabi Muhammad SAW', emoji: '🕌', type: 'celebration' },
    '7-27': { name: 'Isra Mikraj', emoji: '✨', type: 'historical' },
    '8-15': { name: 'Nisfu Syaban', emoji: '🤲', type: 'historical' },
    '9-1': { name: 'Awal Bulan Suci Ramadhan', emoji: '🌙', type: 'fasting' },
    '9-17': { name: 'Nuzulul Quran', emoji: '📖', type: 'historical' },
    '10-1': { name: 'Hari Raya Idul Fitri', emoji: '🎉', type: 'celebration' },
    '12-9': { name: 'Puasa Arafah', emoji: '🙏', type: 'fasting' },
    '12-10': { name: 'Hari Raya Idul Adha', emoji: '🐐', type: 'celebration' },
    '12-11': { name: 'Hari Tasyrik Pertama', emoji: '🥩', type: 'celebration' },
    '12-12': { name: 'Hari Tasyrik Kedua', emoji: '🥩', type: 'celebration' },
    '12-13': { name: 'Hari Tasyrik Ketiga', emoji: '🥩', type: 'celebration' },
  };

  const key = `${hm}-${hd}`;
  return events[key] || null;
}

export function getTodayHijriString(): string {
  const now = new Date();
  const hc = toHijri(now.getFullYear(), now.getMonth() + 1, now.getDate());
  const dayName = DAYS_ID[now.getDay()];
  const monthName = getHijriMonthName(hc.hm);
  
  return `${dayName}, ${hc.hd} ${monthName} ${hc.hy} H`;
}
