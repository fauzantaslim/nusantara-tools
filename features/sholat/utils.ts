import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  Madhab,
  HighLatitudeRule,
  CalculationParameters,
  Qibla
} from 'adhan';

export type CalculationMethodOption =
  | 'MuslimWorldLeague'
  | 'Egyptian'
  | 'Karachi'
  | 'UmmAlQura'
  | 'Dubai'
  | 'MoonsightingCommittee'
  | 'NorthAmerica'
  | 'Kuwait'
  | 'Qatar'
  | 'Singapore'
  | 'Tehran'
  | 'Turkey'
  | 'Other';

export type AsrMethodOption = 'Standard' | 'Hanafi';
export type HighLatitudeRuleOption = 'MiddleOfTheNight' | 'SeventhOfTheNight' | 'TwilightAngle';

export interface PrayerTimeSettings {
  latitude: number;
  longitude: number;
  date: Date;
  method: CalculationMethodOption;
  asrMethod: AsrMethodOption;
  highLatitudeRule: HighLatitudeRuleOption;
  timeFormat: '12h' | '24h';
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
  qiblaDirection: number; // Derajat dari utara sejati
}

function getCalculationParams(method: CalculationMethodOption): CalculationParameters {
  switch (method) {
    case 'MuslimWorldLeague':
      return CalculationMethod.MuslimWorldLeague();
    case 'Egyptian':
      return CalculationMethod.Egyptian();
    case 'Karachi':
      return CalculationMethod.Karachi();
    case 'UmmAlQura':
      return CalculationMethod.UmmAlQura();
    case 'Dubai':
      return CalculationMethod.Dubai();
    case 'MoonsightingCommittee':
      return CalculationMethod.MoonsightingCommittee();
    case 'NorthAmerica':
      return CalculationMethod.NorthAmerica();
    case 'Kuwait':
      return CalculationMethod.Kuwait();
    case 'Qatar':
      return CalculationMethod.Qatar();
    case 'Singapore':
      return CalculationMethod.Singapore();
    case 'Tehran':
      return CalculationMethod.Tehran();
    case 'Turkey':
      return CalculationMethod.Turkey();
    default:
      // Default fallback MWL
      return CalculationMethod.MuslimWorldLeague();
  }
}

function getHighLatRule(rule: HighLatitudeRuleOption) {
  switch (rule) {
    case 'MiddleOfTheNight':
      return HighLatitudeRule.MiddleOfTheNight;
    case 'SeventhOfTheNight':
      return HighLatitudeRule.SeventhOfTheNight;
    case 'TwilightAngle':
      return HighLatitudeRule.TwilightAngle;
    default:
      return HighLatitudeRule.MiddleOfTheNight;
  }
}

export function calculatePrayerTimesData(settings: PrayerTimeSettings): DailyPrayerTimes | null {
  try {
    const coordinates = new Coordinates(settings.latitude, settings.longitude);
    
    // Konfigurasi Parameter
    const params = getCalculationParams(settings.method);
    
    // Asr Method
    params.madhab = settings.asrMethod === 'Hanafi' ? Madhab.Hanafi : Madhab.Shafi;
    
    // High Latitude Rules
    params.highLatitudeRule = getHighLatRule(settings.highLatitudeRule);

    // Hitung Jadwal Utama
    const prayerTimesList = new PrayerTimes(coordinates, settings.date, params);

    // Kiblat
    const qibla = Qibla(coordinates);
    
    // Imsak secara tradisional Indonesia/umumnya dianulir 10 menit sebelum subuh
    const imsak = new Date(prayerTimesList.fajr.getTime() - 10 * 60000);

    // Tengah Malam
    // Cara awam kalkulasi midnight dalam adhan.js umumnya mid/night, 
    // namun kita bisa asumsikan pertengahan maghrib ke subuh hari berikutnya
    // adhan.js menyediakan metode untuk ini, kita panggil sunnat calculation
    // Sebaiknya pakai pendekatan sunnatic (tengah dari maghrib - fajr esok) 
    // Jika tidak ada di API dasar, kita hitung kasar untuk fallback:
    const fajrNextDay = new Date(prayerTimesList.fajr.getTime() + 24 * 60 * 60 * 1000);
    const maghribTime = prayerTimesList.maghrib.getTime();
    const midnightTime = maghribTime + (fajrNextDay.getTime() - maghribTime) / 2;
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
      qiblaDirection: qibla
    };
  } catch (err) {
    console.error('Error calculating prayer times:', err);
    return null;
  }
}

export function formatPrayerTime(date: Date | null, timeFormat: '12h' | '24h', timezoneId: string = Intl.DateTimeFormat().resolvedOptions().timeZone): string {
  if (!date || isNaN(date.getTime())) return '--:--';
  
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: timeFormat === '12h',
    timeZone: timezoneId
  }).format(date).replace('.', ':');
}
