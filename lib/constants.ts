/**
 * Global Constants for Nusantara Tools
 * Standardized objects to avoid magic strings and duplication
 */

export const GENDER = {
  MALE: "male",
  FEMALE: "female",
} as const;

export type GenderType = (typeof GENDER)[keyof typeof GENDER];

export const SYSTEM = {
  METRIC: "metric",
  IMPERIAL: "imperial",
} as const;

export type SystemType = (typeof SYSTEM)[keyof typeof SYSTEM];

/**
 * Common Activity Levels (BMI, Calories)
 */
export const ACTIVITY_LEVEL = {
  SEDENTARY: "sedentary",
  LIGHT: "light",
  MODERATE: "moderate",
  ACTIVE: "active",
  VERY_ACTIVE: "very_active",
} as const;

export type ActivityLevel =
  (typeof ACTIVITY_LEVEL)[keyof typeof ACTIVITY_LEVEL];

/**
 * Calorie Specific
 */
export const CALORIE_GOAL = {
  MAINTAIN: "maintain",
  LOSE: "lose",
  GAIN: "gain",
} as const;

export type CalorieGoal = (typeof CALORIE_GOAL)[keyof typeof CALORIE_GOAL];

export const CALORIE_FORMULA = {
  MIFFLIN: "mifflin",
  HARRIS: "harris",
  KATCH: "katch",
} as const;

export type CalorieFormula =
  (typeof CALORIE_FORMULA)[keyof typeof CALORIE_FORMULA];

/**
 * Pregnancy Specific
 */
export const PREGNANCY_METHOD = {
  LMP: "LMP",
  CONCEPTION: "CONCEPTION",
  IVF: "IVF",
  ULTRASOUND: "ULTRASOUND",
  DUEDATE: "DUEDATE",
} as const;

export type PregnancyMethod =
  (typeof PREGNANCY_METHOD)[keyof typeof PREGNANCY_METHOD];

/**
 * Ovulation (Masa Subur) Specific
 */
export const OVULATION_PHASE = {
  MENSTRUASI: "Fase Menstruasi",
  FOLIKULER: "Fase Folikuler",
  OVULASI: "Fase Ovulasi",
  LUTEAL: "Fase Luteal",
} as const;

export type OvulationPhase =
  (typeof OVULATION_PHASE)[keyof typeof OVULATION_PHASE];

export const DAY_TYPE = {
  NORMAL: "normal",
  PERIOD: "period",
  FERTILE: "fertile",
  OVULATION: "ovulation",
} as const;

export type DayType = (typeof DAY_TYPE)[keyof typeof DAY_TYPE];

/**
 * Blood Pressure (Tekanan Darah) Specific
 */
export const BP_CATEGORY = {
  LOW: "low",
  NORMAL: "normal",
  ELEVATED: "elevated",
  HYPERTENSION_1: "hypertension_1",
  HYPERTENSION_2: "hypertension_2",
  CRISIS: "crisis",
} as const;

export type BPCategory = (typeof BP_CATEGORY)[keyof typeof BP_CATEGORY];

export const BODY_POSITION = {
  SITTING: "sitting",
  STANDING: "standing",
  LYING: "lying",
} as const;

export type BodyPosition = (typeof BODY_POSITION)[keyof typeof BODY_POSITION];

export const BP_ARM = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export type BloodPressureArm = (typeof BP_ARM)[keyof typeof BP_ARM];

export const TREND_DIRECTION = {
  IMPROVING: "improving",
  WORSENING: "worsening",
  STABLE: "stable",
  INSUFFICIENT: "insufficient",
} as const;

export type TrendDirection =
  (typeof TREND_DIRECTION)[keyof typeof TREND_DIRECTION];

/**
 * Sleep (Tidur) Specific
 */
export const SLEEP_CALCULATION_MODE = {
  WAKE_AT: "wake_at",
  SLEEP_AT: "sleep_at",
} as const;

export type SleepCalculationMode =
  (typeof SLEEP_CALCULATION_MODE)[keyof typeof SLEEP_CALCULATION_MODE];

export const SLEEP_TIME_FORMAT = {
  FORMAT_24H: "24h",
  FORMAT_12H: "12h",
} as const;

export type SleepTimeFormat =
  (typeof SLEEP_TIME_FORMAT)[keyof typeof SLEEP_TIME_FORMAT];

export const SLEEP_QUALITY = {
  BURUK: "Buruk",
  KURANG_OPTIMAL: "Kurang Optimal",
  BAIK: "Baik",
  IDEAL: "Ideal",
} as const;

export type SleepQuality = (typeof SLEEP_QUALITY)[keyof typeof SLEEP_QUALITY];

export const QUALITY_STYLE_CONFIG = {
  [SLEEP_QUALITY.BURUK]: {
    bg: "bg-[#9C4A2A]/15",
    border: "border-[#9C4A2A]/30",
    text: "text-[#FF8A65]",
    badge: "bg-[#9C4A2A]/30 text-[#FF8A65]",
  },
  [SLEEP_QUALITY.KURANG_OPTIMAL]: {
    bg: "bg-[#C17A3A]/15",
    border: "border-[#C17A3A]/30",
    text: "text-[#C17A3A]",
    badge: "bg-[#C17A3A]/30 text-[#C17A3A]",
  },
  [SLEEP_QUALITY.BAIK]: {
    bg: "bg-blue-900/20",
    border: "border-blue-500/30",
    text: "text-blue-300",
    badge: "bg-blue-900/40 text-blue-300",
  },
  [SLEEP_QUALITY.IDEAL]: {
    bg: "bg-[#4A7C59]/15",
    border: "border-[#4A7C59]/30",
    text: "text-[#4A7C59]",
    badge: "bg-[#4A7C59]/30 text-[#4A7C59]",
  },
} as const;

/**
 * Hijriyah Specific
 */
export const HIJRI_CONVERSION_MODE = {
  MASEHI_TO_HIJRI: "MasehiToHijri",
  HIJRI_TO_MASEHI: "HijriToMasehi",
} as const;

export type HijriConversionMode =
  (typeof HIJRI_CONVERSION_MODE)[keyof typeof HIJRI_CONVERSION_MODE];

export const HIJRI_MONTHS = [
  { value: 1, name: "Muharram" },
  { value: 2, name: "Safar" },
  { value: 3, name: "Rabiul Awal" },
  { value: 4, name: "Rabiul Akhir" },
  { value: 5, name: "Jumadil Awal" },
  { value: 6, name: "Jumadil Akhir" },
  { value: 7, name: "Rajab" },
  { value: 8, name: "Syaban" },
  { value: 9, name: "Ramadhan" },
  { value: 10, name: "Syawal" },
  { value: 11, name: "Dzulqa’dah" },
  { value: 12, name: "Dzulhijjah" },
] as const;

export const GREGORIAN_MONTHS_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

export const DAYS_ID = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
] as const;

export const ISLAMIC_EVENTS = {
  "1-1": { name: "Tahun Baru Hijriyah", emoji: "🌟", type: "celebration" },
  "1-10": { name: "Hari Asyura", emoji: "🗓️", type: "fasting" },
  "3-12": {
    name: "Maulid Nabi Muhammad SAW",
    emoji: "🕌",
    type: "celebration",
  },
  "7-27": { name: "Isra Mikraj", emoji: "✨", type: "historical" },
  "8-15": { name: "Nisfu Syaban", emoji: "🤲", type: "historical" },
  "9-1": { name: "Awal Bulan Suci Ramadhan", emoji: "🌙", type: "fasting" },
  "9-17": { name: "Nuzulul Quran", emoji: "📖", type: "historical" },
  "10-1": { name: "Hari Raya Idul Fitri", emoji: "🎉", type: "celebration" },
  "12-9": { name: "Puasa Arafah", emoji: "🙏", type: "fasting" },
  "12-10": { name: "Hari Raya Idul Adha", emoji: "🐐", type: "celebration" },
  "12-11": { name: "Hari Tasyrik Pertama", emoji: "🥩", type: "celebration" },
  "12-12": { name: "Hari Tasyrik Kedua", emoji: "🥩", type: "celebration" },
  "12-13": { name: "Hari Tasyrik Ketiga", emoji: "🥩", type: "celebration" },
} as const;

/**
 * Prayer Specific
 */
export const PRAYER_METHOD = {
  MuslimWorldLeague: "Muslim World League (MWL)",
  Egyptian: "Egyptian General Authority",
  Karachi: "Karachi (Islamic Sciences)",
  UmmAlQura: "Umm al-Qura (Makkah)",
  NorthAmerica: "ISNA (North America)",
  Tehran: "Institute of Geophysics (Tehran)",
  Singapore: "MUIS (Singapore)",
  Turkey: "Diyanet (Turkey)",
  Dubai: "Dubai (UAE)",
  Kuwait: "Kuwait",
  Qatar: "Qatar",
  MoonsightingCommittee: "Moonsighting Committee",
} as const;

export const PRAYER_ASR_METHOD = {
  Standard: "Standar (Syafii, Maliki, Hanbali)",
  Hanafi: "Hanafi (Bayangan 2x)",
} as const;

export const PRAYER_HIGH_LAT_RULE = {
  MiddleOfTheNight: "Pertengahan Malam",
  SeventhOfTheNight: "1/7 Malam",
  TwilightAngle: "Sudut Senja",
} as const;

export const PRAYER_TIME_FORMAT = {
  FORMAT_24H: "24h",
  FORMAT_12H: "12h",
} as const;

export const PRAYER_PRESET_CITIES = [
  { value: "Jakarta", label: "Jakarta (WIB)", lat: -6.2088, lng: 106.8456 },
  { value: "Surabaya", label: "Surabaya (WIB)", lat: -7.2504, lng: 112.7688 },
  { value: "Bandung", label: "Bandung (WIB)", lat: -6.9175, lng: 107.6191 },
  { value: "Medan", label: "Medan (WIB)", lat: 3.5952, lng: 98.6722 },
  { value: "Makassar", label: "Makassar (WITA)", lat: -5.1477, lng: 119.4327 },
  { value: "Denpasar", label: "Denpasar (WITA)", lat: -8.6705, lng: 115.2126 },
  { value: "Jayapura", label: "Jayapura (WIT)", lat: -2.5337, lng: 140.7181 },
] as const;

/**
 * Zakat Specific
 * Based on BAZNAS 2026 Standards
 */
export const ZAKAT_NISAB = {
  MONTHLY: 7640144,
  YEARLY: 91681728,
} as const;

export const ZAKAT_RATE = 0.025; // 2.5%

/**
 * BMI Specific
 */
export const BMI_CATEGORY = {
  KURUS: "Kurus",
  NORMAL: "Normal",
  BERLEBIH: "Berlebih",
  OBESITAS: "Obesitas",
} as const;

export type BMICategory = (typeof BMI_CATEGORY)[keyof typeof BMI_CATEGORY];

/**
 * Water Intake (Air) Specific
 */
export const AIR_ACTIVITY_LEVEL = {
  LOW: "low",
  MODERATE: "moderate",
  HIGH: "high",
} as const;

export type AirActivityLevel =
  (typeof AIR_ACTIVITY_LEVEL)[keyof typeof AIR_ACTIVITY_LEVEL];

export const CLIMATE = {
  NORMAL: "normal",
  HOT: "hot",
  HUMID: "humid",
} as const;

export type ClimateType = (typeof CLIMATE)[keyof typeof CLIMATE];

export const ALTITUDE = {
  LOW: "low",
  HIGH: "high",
} as const;

export type AltitudeType = (typeof ALTITUDE)[keyof typeof ALTITUDE];

export const OUTPUT_UNIT = {
  ML: "ml",
  LITER: "liter",
  CUPS: "cups",
  OZ: "oz",
} as const;

export type OutputUnitType = (typeof OUTPUT_UNIT)[keyof typeof OUTPUT_UNIT];

/**
 * One Rep Max (1RM) Specific
 */
export const WEIGHT_UNIT = {
  KG: "kg",
  LBS: "lbs",
} as const;

export type WeightUnit = (typeof WEIGHT_UNIT)[keyof typeof WEIGHT_UNIT];

export const LENGTH_UNIT = {
  CM: "cm",
  IN: "in",
} as const;

export type LengthUnit = (typeof LENGTH_UNIT)[keyof typeof LENGTH_UNIT];

export const ONERM_FORMULA = {
  EPLEY: "epley",
  BRZYCKI: "brzycki",
  LOMBARDI: "lombardi",
} as const;

export type OneRMFormulaType =
  (typeof ONERM_FORMULA)[keyof typeof ONERM_FORMULA];

/**
 * Diabetes (FINDRISC) Specific
 */
export const DIABETES_AGE_RANGE = {
  LT45: "lt45",
  RANGE_45_54: "45_54",
  RANGE_55_64: "55_64",
  GTE65: "gte65",
} as const;

export type DiabetesAgeRange =
  (typeof DIABETES_AGE_RANGE)[keyof typeof DIABETES_AGE_RANGE];

export const DIABETES_BMI_CATEGORY = {
  LT25: "lt25",
  RANGE_25_30: "25_30",
  GT30: "gt30",
} as const;

export type DiabetesBMICategory =
  (typeof DIABETES_BMI_CATEGORY)[keyof typeof DIABETES_BMI_CATEGORY];

export const DIABETES_WAIST_MALE = {
  LT94: "lt94",
  RANGE_94_102: "94_102",
  GT102: "gt102",
} as const;

export type DiabetesWaistMale =
  (typeof DIABETES_WAIST_MALE)[keyof typeof DIABETES_WAIST_MALE];

export const DIABETES_WAIST_FEMALE = {
  LT80: "lt80",
  RANGE_80_88: "80_88",
  GT88: "gt88",
} as const;

export type DiabetesWaistFemale =
  (typeof DIABETES_WAIST_FEMALE)[keyof typeof DIABETES_WAIST_FEMALE];

export const DIABETES_FAMILY_HISTORY = {
  NONE: "none",
  DISTANT: "distant",
  CLOSE: "close",
} as const;

export type DiabetesFamilyHistory =
  (typeof DIABETES_FAMILY_HISTORY)[keyof typeof DIABETES_FAMILY_HISTORY];

export const DIABETES_RISK_CATEGORY = {
  LOW: "low",
  SLIGHTLY_ELEVATED: "slightly_elevated",
  MODERATE: "moderate",
  HIGH: "high",
  VERY_HIGH: "very_high",
} as const;

export type DiabetesRiskCategory =
  (typeof DIABETES_RISK_CATEGORY)[keyof typeof DIABETES_RISK_CATEGORY];

/**
 * Password Generator Specific
 */
export const PASSWORD_GENERATOR_WORDLIST = [
  "langit",
  "bintang",
  "kuda",
  "hijau",
  "merah",
  "api",
  "air",
  "angin",
  "tanah",
  "batu",
  "gunung",
  "laut",
  "awan",
  "hujan",
  "badai",
  "petir",
  "cerah",
  "gelap",
  "terang",
  "hitam",
  "putih",
  "biru",
  "kuning",
  "ungu",
  "naga",
  "harimau",
  "elang",
  "singa",
  "gajah",
  "pohon",
  "daun",
  "bunga",
  "akar",
  "ranting",
  "hutan",
  "sungai",
  "danau",
  "pantai",
  "ombak",
  "pasir",
  "karang",
  "ikan",
  "paus",
  "hiu",
  "kura",
  "penyu",
  "burung",
  "kucing",
  "anjing",
  "beruang",
  "serigala",
  "rubah",
  "kelinci",
  "rusa",
  "kancil",
  "harimau",
  "macan",
  "zebra",
  "jerapah",
  "kuda",
  "apel",
  "mangga",
  "jeruk",
  "pisang",
  "anggur",
  "melon",
  "semangka",
  "nanas",
  "pepaya",
  "durian",
  "kopi",
  "teh",
  "susu",
  "sirup",
  "madu",
  "gula",
  "garam",
  "merica",
  "cabai",
  "bawang",
  "meja",
  "kursi",
  "pintu",
  "jendela",
  "atap",
  "lantai",
  "kaca",
  "jam",
  "lampu",
  "kipas",
  "buku",
  "pena",
  "pensil",
  "kertas",
  "tas",
  "sepatu",
  "baju",
  "celana",
  "topi",
  "sabuk",
  "mobil",
  "motor",
  "sepeda",
  "kereta",
  "bus",
  "kapal",
  "perahu",
  "pesawat",
  "roket",
  "balon",
  "pedang",
  "panah",
  "tombak",
  "perisai",
  "baju besi",
  "helm",
  "sarung",
  "cincin",
  "kalung",
  "gelang",
  "emas",
  "perak",
  "besi",
  "baja",
  "tembaga",
  "perunggu",
  "berlian",
  "zamrud",
  "safir",
  "rubi",
  "matahari",
  "bulan",
  "planet",
  "bintang",
  "galaksi",
  "komet",
  "meteor",
  "asteroid",
  "nebula",
  "kosmos",
  "senin",
  "selasa",
  "rabu",
  "kamis",
  "jumat",
  "sabtu",
  "minggu",
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
  "hari",
  "mimpi",
  "tidur",
  "bangun",
  "pagi",
  "siang",
  "sore",
  "malam",
  "waktu",
  "jam",
  "menit",
  "detik",
  "abad",
  "tahun",
  "bulan",
  "minggu",
  "hari",
  "sekarang",
  "dulu",
  "nanti",
  "sebentar",
  "satu",
  "dua",
  "tiga",
  "empat",
  "lima",
  "enam",
  "tujuh",
  "delapan",
  "sembilan",
  "sepuluh",
  "merdeka",
  "bebas",
  "damai",
  "cinta",
  "kasih",
  "sayang",
  "harapan",
  "impian",
  "cita",
  "sukses",
  "sukacita",
] as const;

export const PASSWORD_CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*",
} as const;

/**
 * Pomodoro Specific
 */
export const POMODORO_MODE = {
  FOCUS: "focus",
  SHORT_BREAK: "shortBreak",
  LONG_BREAK: "longBreak",
} as const;

export const POMODORO_PRESETS = {
  "Baby Step": {
    focusDuration: 10,
    shortBreakDuration: 5,
    longBreakDuration: 10,
  },
  Popular: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
  },
  Medium: {
    focusDuration: 40,
    shortBreakDuration: 8,
    longBreakDuration: 20,
  },
  Extended: {
    focusDuration: 60,
    shortBreakDuration: 10,
    longBreakDuration: 25,
  },
} as const;

export const POMODORO_DEFAULT_SETTINGS = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
  notificationEnabled: true,
  volume: 0.5,
} as const;

export const POMODORO_MODE_CONFIG = {
  [POMODORO_MODE.FOCUS]: {
    label: "Fokus 🔥",
    color: "#C17A3A",
  },
  [POMODORO_MODE.SHORT_BREAK]: {
    label: "Istirahat Sejenak 🌿",
    color: "#4A7C59",
  },
  [POMODORO_MODE.LONG_BREAK]: {
    label: "Istirahat Panjang 🌊",
    color: "#7A5C42",
  },
} as const;

/**
 * QR Generator Specific
 */
export const QR_MODE = {
  URL: "url",
  TEXT: "text",
  EMAIL: "email",
  PHONE: "phone",
} as const;

export const QR_DEFAULT_OPTIONS = {
  fgColor: "#2C1A0E",
  bgColor: "#ffffff",
} as const;

export const QR_REGEX = {
  PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
} as const;

/**
 * Job Application Letter (Surat Lamaran Kerja) Specific
 */
export const JOB_LETTER_PAPER_SIZES = [
  { label: "A4 (210 x 297 mm)", value: "a4" },
  { label: "Folio (210 x 330 mm)", value: "folio" },
] as const;

export const JOB_LETTER_FONTS = [
  { label: "Sistem (Default)", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Courier New", value: "'Courier New', Courier, monospace" },
] as const;

export const JOB_LETTER_FONT_SIZES = [
  { label: "80%", value: "0.8rem" },
  { label: "85%", value: "0.85rem" },
  { label: "90%", value: "0.9rem" },
  { label: "95%", value: "0.95rem" },
  { label: "Default", value: "1rem" },
  { label: "105%", value: "1.05rem" },
  { label: "110%", value: "1.1rem" },
] as const;

export const JOB_LETTER_LINE_HEIGHTS = [
  { label: "Default", value: "1.5" },
  { label: "100%", value: "1" },
  { label: "125%", value: "1.25" },
  { label: "150%", value: "1.5" },
  { label: "175%", value: "1.75" },
  { label: "200%", value: "2" },
] as const;

export const JOB_LETTER_ALIGNMENTS = [
  { label: "Rata kiri kanan (justify)", value: "justify" },
  { label: "Rata kiri (left)", value: "left" },
] as const;

export const JOB_LETTER_INDENTATIONS = [
  { label: "Ya", value: "yes" },
  { label: "Tidak", value: "no" },
] as const;

export const JOB_LETTER_DATE_PLACEMENTS = [
  { label: "Atas Kanan", value: "top-right" },
  { label: "Atas Kiri", value: "top-left" },
  { label: "Bawah (Ikut Tanda Tangan)", value: "bottom" },
] as const;

export const JOB_LETTER_SIGNATURE_PLACEMENTS = [
  { label: "Kanan", value: "right" },
  { label: "Kiri", value: "left" },
] as const;

export const JOB_LETTER_LAMPIRAN_OPTIONS = [
  { label: "Curriculum Vitae (CV)", value: "Curriculum Vitae" },
  { label: "Portfolio", value: "Portfolio" },
  { label: "Fotokopi Ijazah Terakhir", value: "Fotokopi Ijazah Terakhir" },
  { label: "Fotokopi Transkrip Nilai", value: "Fotokopi Transkrip Nilai" },
  { label: "Sertifikat Pelatihan", value: "Sertifikat Pelatihan" },
  { label: "Fotokopi SKCK", value: "Fotokopi SKCK" },
  { label: "Fotokopi KTP", value: "Fotokopi KTP" },
  { label: "Pas Foto Terbaru", value: "Pas Foto Terbaru" },
] as const;

export const JOB_LETTER_DEFAULT_STATE = {
  biodata: {
    namaLengkap: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "Pria",
    status: "Lajang",
    pendidikanTerakhir: "",
    noHp: "",
    email: "",
    alamatKota: "",
    alamatLengkap: "",
  },
  companyData: {
    kepadaYth: "Bapak/Ibu",
    hrd: "HRD",
    namaPerusahaan: "",
    kotaPerusahaan: "",
    jenisInstansi: "Perusahaan",
    posisiLowongan: "",
    sumberLowongan: "",
  },
  completeness: {
    tanggalLamaran: new Date().toISOString().split("T")[0],
    lampiran: ["Curriculum Vitae", "Fotokopi KTP", "Pas Foto Terbaru"],
  },
  settings: {
    paperSize: "a4",
    font: "",
    fontSize: "1rem",
    lineHeight: "1.5",
    alignment: "justify",
    indentation: "yes",
    datePlacement: "top-right",
    signaturePlacement: "right",
  },
};

/**
 * URL Shortener Specific
 */
export const URL_SHORTENER_STORAGE_KEY = "nusantara_url_shortener";
export const URL_SHORTENER_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const URL_SHORTENER_DEFAULT_LENGTH = 6;
export const URL_SHORTENER_BASE_URL = "https://nusantara-tools.com";
export const URL_SHORTENER_ALIAS_REGEX = /^[a-zA-Z0-9-_]*$/;
