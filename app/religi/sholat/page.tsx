"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React, { useState, useEffect } from "react";
import { Card } from "@/ui/Card";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import {
  ShieldAlert,
  MapPin,
  Settings2,
  Compass,
  Clock,
  AlertTriangle,
} from "lucide-react";
import {
  calculatePrayerTimesData,
  PrayerTimeSettings,
  DailyPrayerTimes,
  CalculationMethodOption,
  AsrMethodOption,
  HighLatitudeRuleOption,
  formatPrayerTime,
} from "@/features/sholat/utils";

// Helper for ticking clock
function formatCountdown(diffMs: number) {
  if (diffMs < 0) return "00:00:00";
  const totalSeconds = Math.floor(diffMs / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const PRESET_CITIES = [
  { name: "Jakarta (WIB)", lat: -6.2088, lng: 106.8456 },
  { name: "Surabaya (WIB)", lat: -7.2504, lng: 112.7688 },
  { name: "Bandung (WIB)", lat: -6.9175, lng: 107.6191 },
  { name: "Medan (WIB)", lat: 3.5952, lng: 98.6722 },
  { name: "Makassar (WITA)", lat: -5.1477, lng: 119.4327 },
  { name: "Denpasar (WITA)", lat: -8.6705, lng: 115.2126 },
  { name: "Jayapura (WIT)", lat: -2.5337, lng: 140.7181 },
];

export default function SholatCalculator() {
  const [isClient, setIsClient] = useState(false);

  // Settings State
  const [lat, setLat] = useState<string>("-6.2088");
  const [lng, setLng] = useState<string>("106.8456");
  const [locationName, setLocationName] = useState<string>(
    "Jakarta (WIB) - Default",
  );
  const [date, setDate] = useState<string>("");
  const [method, setMethod] =
    useState<CalculationMethodOption>("MuslimWorldLeague");
  const [asrMethod, setAsrMethod] = useState<AsrMethodOption>("Standard");
  const [highLatRule, setHighLatRule] =
    useState<HighLatitudeRuleOption>("MiddleOfTheNight");
  const [timeFormat, setTimeFormat] = useState<"12h" | "24h">("24h");

  const [showSettings, setShowSettings] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Result State
  const [prayerTimes, setPrayerTimes] = useState<DailyPrayerTimes | null>(null);

  // Realtime Countdown State
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [nextPrayerName, setNextPrayerName] = useState<string>("");
  const [countdownStr, setCountdownStr] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  // Update Calculation Whenever Settings Change
  useEffect(() => {
    if (!isClient) return;
    try {
      setErrorMsg("");
      const pLat = parseFloat(lat);
      const pLng = parseFloat(lng);

      if (isNaN(pLat) || pLat < -90 || pLat > 90)
        throw new Error("Latitude tidak valid (-90 s/d 90).");
      if (isNaN(pLng) || pLng < -180 || pLng > 180)
        throw new Error("Longitude tidak valid (-180 s/d 180).");

      const calcDate = date ? new Date(date) : new Date();
      // Reset hours to 12 PM to avoid timezone boundary issues jumping days incorrectly in basic JS date
      calcDate.setHours(12, 0, 0, 0);

      const config: PrayerTimeSettings = {
        latitude: pLat,
        longitude: pLng,
        date: calcDate,
        method,
        asrMethod,
        highLatitudeRule: highLatRule,
        timeFormat,
      };

      const pt = calculatePrayerTimesData(config);
      setPrayerTimes(pt);
    } catch (e: any) {
      setErrorMsg(e.message || "Error kalkulasi");
      setPrayerTimes(null);
    }
  }, [lat, lng, date, method, asrMethod, highLatRule, timeFormat, isClient]);

  // Tick Timer for Countdown
  useEffect(() => {
    if (!prayerTimes) return;
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      // Determine next prayer
      const timesArray = [
        { name: "Imsak", time: prayerTimes.imsak.getTime() },
        { name: "Subuh", time: prayerTimes.fajr.getTime() },
        { name: "Terbit", time: prayerTimes.sunrise.getTime() },
        { name: "Dzuhur", time: prayerTimes.dhuhr.getTime() },
        { name: "Asar", time: prayerTimes.asr.getTime() },
        { name: "Maghrib", time: prayerTimes.maghrib.getTime() },
        { name: "Isya", time: prayerTimes.isha.getTime() },
      ];

      let next = null;
      for (const t of timesArray) {
        if (now.getTime() < t.time) {
          next = t;
          break;
        }
      }

      if (next) {
        setNextPrayerName(next.name);
        setCountdownStr(formatCountdown(next.time - now.getTime()));
      } else {
        setNextPrayerName("Subuh (Esok)");
        setCountdownStr("--:--:--"); // Ideally calculate tomorrow's Fajr here, but keeping it simple
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const handleGeolocation = () => {
    setIsLocating(true);
    setErrorMsg("");
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude.toString());
          setLng(pos.coords.longitude.toString());
          setLocationName("Lokasi GPS Akurat 📍");
          setIsLocating(false);
        },
        (err) => {
          setErrorMsg("Izin lokasi ditolak atau gagal mengambil GPS.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 10000 },
      );
    } else {
      setErrorMsg("Browser Anda tidak mendukung Geolocation.");
      setIsLocating(false);
    }
  };

  const presetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) return;

    if (val === "GPS") {
      handleGeolocation();
      return;
    }

    const city = PRESET_CITIES.find((c) => c.name === val);
    if (city) {
      setLat(city.lat.toString());
      setLng(city.lng.toString());
      setLocationName(city.name);
    }
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Religi", href: "/religi" },
            { label: "Kalkulator Jadwal Sholat" },
          ]}
        />
        <div className="mt-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Jadwal Sholat
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2 max-w-2xl">
            Dapatkan waktu sholat otomatis berbasis lokasi secara akurat dengan
            berbagai metode penghitungan standar internasional (MWL, ISNA, dsb).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative my-4">
        {/* Kiri: Form Input Lokasi & Pengaturan */}
        <Card
          variant="default"
          className="xl:col-span-4 flex flex-col gap-6 p-6 border border-[#EDE0D0] shadow-xl shadow-[#4A7C59]/[0.02] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5E9] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#4A7C59]" /> Konfigurasi Lokasi
            </h2>
          </div>

          <div className="flex flex-col gap-5 relative z-10 mt-2">
            {/* Manual Presets & Auto Loc */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold font-ui text-secondary uppercase">
                Titik Lokasi Perhitungan
              </label>
              <select
                onChange={presetChange}
                className="w-full h-12 px-4 rounded-xl border border-muted bg-surface/50 text-sm font-bold font-ui text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-[#4A7C59]/20"
                defaultValue=""
                disabled={isLocating}
              >
                <option value="" disabled>
                  {isLocating ? "Mendapatkan GPS..." : "Pilih Kota / GPS..."}
                </option>
                <option value="GPS" className="font-bold text-[#4A7C59]">
                  📍 Gunakan Lokasi Saat Ini (GPS)
                </option>
                {PRESET_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold font-ui text-secondary uppercase">
                  Lintang (Latitude)
                </label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => {
                    setLat(e.target.value);
                    setLocationName("Titik Kustom");
                  }}
                  className="w-full h-11 px-3 rounded-lg border border-muted bg-white text-sm font-bold shadow-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold font-ui text-secondary uppercase">
                  Bujur (Longitude)
                </label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => {
                    setLng(e.target.value);
                    setLocationName("Titik Kustom");
                  }}
                  className="w-full h-11 px-3 rounded-lg border border-muted bg-white text-sm font-bold shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-[11px] font-bold font-ui text-secondary uppercase">
                Tanggal Kalkulasi
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-11 px-4 rounded-lg border border-muted bg-white text-sm font-bold shadow-sm"
              />
            </div>

            {errorMsg && (
              <div className="bg-[#FFF0EB] text-[#9C4A2A] text-xs px-3 py-2.5 rounded-xl border border-[#9C4A2A]/20 font-bold flex items-center gap-2 mt-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            {/* Advanced Settings */}
            <div className="border-t border-muted/60 mt-4 pt-4">
              <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                <Settings2 className="w-4 h-4 text-[#4A7C59]" /> Pengaturan
                Lanjutan (Madzhab)
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-secondary uppercase">
                    Metode Penghitungan Subuh/Isya
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border text-xs font-medium transition-colors focus:outline-none focus:border-[#4A7C59]/40 bg-surface/30"
                  >
                    <option value="MuslimWorldLeague">
                      Muslim World League (MWL)
                    </option>
                    <option value="Egyptian">Egyptian General Authority</option>
                    <option value="Karachi">Karachi (Islamic Sciences)</option>
                    <option value="UmmAlQura">Umm al-Qura (Makkah)</option>
                    <option value="NorthAmerica">ISNA (North America)</option>
                    <option value="Tehran">
                      Institute of Geophysics (Tehran)
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-secondary uppercase">
                    Metode Asar
                  </label>
                  <select
                    value={asrMethod}
                    onChange={(e) => setAsrMethod(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border text-xs font-medium transition-colors focus:outline-none focus:border-[#4A7C59]/40 bg-surface/30"
                  >
                    <option value="Standard">
                      Standar (Syafii, Maliki, Hanbali)
                    </option>
                    <option value="Hanafi">
                      Hanafi (Bayangan 2x panjang benda)
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-secondary uppercase">
                    Aturan Lintang Tinggi (Kutub)
                  </label>
                  <select
                    value={highLatRule}
                    onChange={(e) => setHighLatRule(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border text-xs font-medium transition-colors focus:outline-none focus:border-[#4A7C59]/40 bg-surface/30"
                  >
                    <option value="MiddleOfTheNight">PERTENGAHAN MALAM</option>
                    <option value="SeventhOfTheNight">1/7 MALAM</option>
                    <option value="TwilightAngle">SUDUT SENJA METODE</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-secondary uppercase">
                    Format Waktu
                  </label>
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border text-xs font-medium transition-colors focus:outline-none focus:border-[#4A7C59]/40 bg-surface/30"
                  >
                    <option value="24h">24-Jam (15.30)</option>
                    <option value="12h">12-Jam (03.30 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Kanan: Result Board */}
        <div className="xl:col-span-8 h-full">
          <Card
            variant="default"
            className="flex flex-col relative overflow-hidden rounded-[2.5rem] border border-[#7A5C42]/40 shadow-2xl bg-[#2C1A0E] text-[#F5EDE3] h-full ring-4 ring-inset ring-[#4A7C59]/10"
          >
            {/* Dark Premium Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59]/10 via-transparent to-transparent pointer-events-none opacity-80" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />

            <div className="relative z-10 p-6 sm:p-10 flex flex-col h-full">
              {/* Top Banner: Location & Countdown */}
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-8 gap-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold font-ui uppercase tracking-widest text-[#C17A3A] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#C17A3A] animate-pulse"></span>{" "}
                    Mode Akurat Adhan
                  </div>
                  <h2 className="text-3xl font-black font-heading text-white line-clamp-1">
                    {locationName}
                  </h2>
                  <span className="text-sm font-body text-[#EDE0D0] mt-1 opacity-70">
                    Lintang {parseFloat(lat).toFixed(4)}° • Bujur{" "}
                    {parseFloat(lng).toFixed(4)}° • {date}
                  </span>
                </div>

                {prayerTimes && countdownStr && (
                  <div className="bg-[#1A0E07]/60 rounded-2xl p-4 sm:p-5 border border-white/10 flex flex-col items-center md:items-end min-w-[200px] shrink-0">
                    <span className="text-[10px] font-bold text-[#EDE0D0] uppercase tracking-wider opacity-60 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Menuju {nextPrayerName}
                    </span>
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#4A7C59] mt-1.5 tracking-tighter tabular-nums drop-shadow-md">
                      {countdownStr}
                    </span>
                  </div>
                )}
              </div>

              {/* Grid Jadwal */}
              {prayerTimes ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-grow mb-8">
                  {/* Imsak & Terbit */}
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-between group hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold text-[#C17A3A] uppercase tracking-widest">
                      Imsak
                    </span>
                    <span className="text-3xl font-black font-heading mt-2 tabular-nums">
                      {formatPrayerTime(prayerTimes.imsak, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-[#4A7C59]/20 border border-[#4A7C59]/30 shadow-inner p-4 rounded-2xl flex flex-col justify-between group hover:bg-[#4A7C59]/30 transition-colors relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#4A7C59]/20 rounded-full blur-xl" />
                    <span className="relative text-xs font-bold text-[#E8F5E9] uppercase tracking-widest flex items-center gap-2">
                      Subuh{" "}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8F5E9] ml-auto"></span>
                    </span>
                    <span className="relative text-3xl font-black font-heading mt-2 tabular-nums">
                      {formatPrayerTime(prayerTimes.fajr, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-between group hover:bg-white/10 transition-colors">
                    <span className="text-xs font-bold text-[#EDE0D0] opacity-70 uppercase tracking-widest">
                      Syuruq (Terbit)
                    </span>
                    <span className="text-3xl font-black font-heading mt-2 tabular-nums text-white/50">
                      {formatPrayerTime(prayerTimes.sunrise, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-[#4A7C59]/20 border border-[#4A7C59]/30 shadow-inner p-4 rounded-2xl flex flex-col justify-between group hover:bg-[#4A7C59]/30 transition-colors">
                    <span className="text-xs font-bold text-[#E8F5E9] uppercase tracking-widest flex items-center gap-2">
                      Dzuhur{" "}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8F5E9] ml-auto"></span>
                    </span>
                    <span className="text-3xl font-black font-heading mt-2 tabular-nums">
                      {formatPrayerTime(prayerTimes.dhuhr, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-[#4A7C59]/20 border border-[#4A7C59]/30 shadow-inner p-4 rounded-2xl flex flex-col justify-between group hover:bg-[#4A7C59]/30 transition-colors">
                    <span className="text-xs font-bold text-[#E8F5E9] uppercase tracking-widest flex items-center gap-2">
                      Asar{" "}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8F5E9] ml-auto"></span>
                    </span>
                    <span className="text-3xl font-black font-heading mt-2 tabular-nums">
                      {formatPrayerTime(prayerTimes.asr, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-[#4A7C59]/20 border border-[#4A7C59]/30 shadow-inner p-4 rounded-2xl flex flex-col justify-between group hover:bg-[#4A7C59]/30 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-[#C17A3A]/10 to-transparent pointer-events-none" />
                    <span className="relative text-xs font-bold text-[#E8F5E9] uppercase tracking-widest flex items-center gap-2">
                      Maghrib{" "}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8F5E9] ml-auto"></span>
                    </span>
                    <span className="relative text-3xl font-black font-heading mt-2 tabular-nums">
                      {formatPrayerTime(prayerTimes.maghrib, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-[#4A7C59]/20 border border-[#4A7C59]/30 shadow-inner p-4 rounded-2xl flex flex-col justify-between group hover:bg-[#4A7C59]/30 transition-colors">
                    <span className="text-xs font-bold text-[#E8F5E9] uppercase tracking-widest flex items-center gap-2">
                      Isya{" "}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8F5E9] ml-auto"></span>
                    </span>
                    <span className="text-3xl font-black font-heading mt-2 tabular-nums">
                      {formatPrayerTime(prayerTimes.isha, timeFormat)}
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col justify-between group hover:bg-white/10 transition-colors pb-3">
                    <span className="text-xs font-bold text-[#EDE0D0] opacity-70 uppercase tracking-widest">
                      Tengah Malam
                    </span>
                    <span className="text-2xl font-bold font-heading mt-2 tabular-nums text-white/50">
                      {formatPrayerTime(prayerTimes.midnight, timeFormat)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex-grow flex items-center justify-center text-center opacity-50 py-10">
                  Parameter lintang dan bujur tidak akurat. Gagal memuat jadwal.
                </div>
              )}

              {/* Kompas Kiblat Bottom Bar */}
              {prayerTimes && (
                <div className="mt-auto bg-[#1A0E07]/60 rounded-2xl p-4 sm:p-5 border border-white/10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 border-l-4 border-[#C17A3A] pl-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A]/20 flex items-center justify-center shrink-0">
                      <Compass
                        className="w-5 h-5 text-[#C17A3A]"
                        style={{
                          transform: `rotate(${prayerTimes.qiblaDirection}deg)`,
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#EDE0D0] opacity-70 uppercase tracking-widest">
                        Arah Kiblat (Makkah)
                      </span>
                      <span className="font-heading font-extrabold text-white text-lg">
                        {prayerTimes.qiblaDirection.toFixed(2)}° dari Utara
                        Sejati
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* SEKSI EDUKASI & INFORMASI (Sesuai Gaya Premium) */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 relative z-10 w-full">
            {/* Header Edukasi */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Sains Islam
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami Mekanika Perhitungan Waktu Sholat
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Waktu sholat fardhu secara mutlak ditentukan secara saintifik
                berdasarkan kalkulasi orbit posisi matahari di langit.
                Konstelasi waktu ini berubah setiap siklus harinya dan akan
                sangat bervariasi bergantung pada spesifikasi lokasi (Lintang,
                Bujur, dan Zona Waktu kompensasi).
              </p>
            </div>

            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">
              {/* 1. Cara Sholat Dihitung */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Transisi Posisi Matahari
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                    <h4 className="font-heading font-bold text-white mb-2">
                      Subuh (Fajr)
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                      Fajar Shadiq mengudara ketika matahari menyentuh sudut
                      elevasi negatif spesifik di bawah cakrawala ufuk timur
                      bumi.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-heading font-bold text-white mb-2 text-white/70">
                      Matahari Terbit (Syuruq)
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed text-white/50">
                      Momen murni ketika titik paling atas (tepi piringan luar)
                      dari sinar matahari muncul mengiris cakrawala timur.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                    <h4 className="font-heading font-bold text-white mb-2">
                      Dzuhur (Zawal)
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                      Matahari melewati garis meridian lokal dan mencapai titik
                      zenit absolut tertinggi di tengah langit hari tersebut.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                    <h4 className="font-heading font-bold text-white mb-2">
                      Asar
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                      Berlaku pasca-dzuhur tatkala bayangan pilar yang disinari
                      matahari menyentuh panjang yang sama dengan tinggi
                      bendanya seutuhnya.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                    <h4 className="font-heading font-bold text-white mb-2">
                      Maghrib
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                      Titik waktu krusial tatkala seluruh siluet cahaya mentari
                      tenggelam melintasi cakrawala sisi barat secara penuh.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                    <h4 className="font-heading font-bold text-white mb-2">
                      Isya
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                      Ketika awan jingga dan mega merah (sebagai indikator
                      terbenam) menghilang sempurna dari pandangan ufuk barat.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Metode Standar */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Metodologi & Parameter Lintang Extrim
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mb-4">
                      <h4 className="font-heading font-bold text-[#E8F5E9] text-xl">
                        Metode Otoritas Derajat
                      </h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90 list-disc ml-5">
                      <li>
                        <strong>Muslim World League (MWL):</strong> Subuh: 18° /
                        Isya: 17°
                      </li>
                      <li>
                        <strong>ISNA:</strong> Subuh: 15° / Isya: 15°
                      </li>
                      <li>
                        <strong>Mesir (Egyptian):</strong> Subuh: 19.5° / Isya:
                        17.5°
                      </li>
                      <li>
                        <strong>Karachi:</strong> Subuh: 18° / Isya: 18°
                      </li>
                      <li>
                        <strong>Umm al-Qura (Makkah):</strong> Subuh: 18.5° /
                        Isya: Fix 90 mnt pasca Maghrib.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#1A0E07]/40 border border-[#C17A3A]/30 rounded-3xl p-6 sm:p-8 relative">
                    <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mb-4">
                      <h4 className="font-heading font-bold text-[#C17A3A] text-xl">
                        Masalah Kutub / Lintang Tinggi
                      </h4>
                    </div>
                    <p className="text-sm text-[#EDE0D0] opacity-90 mb-4 leading-relaxed">
                      Skema perhitungan mengalami *anomaly* di mana matahari
                      bisa saja tidak terbit atau terbenam melintasi hari
                      (seperti kawasan kutub utara). Kita mengatasi ini dengan
                      kaidah darurat fiqhiyyah Lintang Tinggi:
                    </p>
                    <ul className="space-y-2 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li>
                        <span className="text-[#C17A3A]">•</span>{" "}
                        <strong>Tengah Malam:</strong> Waktu terbenam ke
                        matahari terbit dilipatdua sebagai kompensasi.
                      </li>
                      <li>
                        <span className="text-[#C17A3A]">•</span>{" "}
                        <strong>1/7 Malam:</strong> Malam dibagi 7 segmen
                        ekuivalen pembagian Isya/Subuh.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Penentuan Kiblat */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Landasan Algoritma & Kiblat
                  </h3>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center">
                  <Compass className="w-16 h-16 text-[#4A7C59] shrink-0 opacity-80" />
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">
                      Penunjuk Arab Ka'bah
                    </h4>
                    <p className="text-sm leading-relaxed text-[#EDE0D0] opacity-90">
                      Kiblat dihitung presisi menggunakan rumus trigonometri
                      bola (*Spherical Cosinus*) untuk menemukan garis lingkaran
                      besar lintasan geodesik terpendek antara titik berdirinya
                      pengguna terhadap koordinat Makkah.{" "}
                    </p>
                    <p className="text-xs bg-black/40 px-3 py-2 rounded border border-white/10 mt-3 font-mono opacity-60">
                      Rumus Solar Utama: Waktu = 720 - 4 × (Bujur + Sudut Jam) -
                      Equation of Time
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. FAQ */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Pertanyaan Umum (FAQ)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1A0E07]/60 border border-white/10 p-5 rounded-2xl">
                    <h4 className="font-bold text-white mb-1">
                      Perbedaan Asar Standar vs Hanafi?
                    </h4>
                    <p className="text-sm text-[#EDE0D0] opacity-80 leading-relaxed">
                      Secara eksklusif mazhab Hanafi menunda eksekusi adzan asar
                      hingga ukuran bayangan memanjang menjadi setara (dua kali
                      lipat) tinggi objek benda aslinya.
                    </p>
                  </div>
                  <div className="bg-[#1A0E07]/60 border border-white/10 p-5 rounded-2xl">
                    <h4 className="font-bold text-white mb-1">
                      Mengapa Waktu Isya Bervariasi?
                    </h4>
                    <p className="text-sm text-[#EDE0D0] opacity-80 leading-relaxed">
                      Berbeda kawasan memiliki kriteria elevasi minus cahaya
                      cakrawala (*Twilight zone*) yang berbeda. Ada yang memakai
                      persentase waktu konstan misal mutlak 90 menit sesudah
                      maghrib.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#9C4A2A]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden mt-4">
              <AlertTriangle className="w-6 h-6 text-[#9C4A2A] mx-auto mb-3" />
              <h4 className="font-heading font-extrabold text-[#FFF0EB] text-lg mb-3">
                Disclaimer Presisi Astronomikal
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">
                Platform NusantaraTools ini murni menyuplai wawasan kalkulasi
                hitung secara otomatis. Meskipun kami mendayakan algoritma adhan
                standar tingkat atas, faktor distorsi lokal tinggi atmosfer
                maupun pembulatan kalibrasi tak terduga sangat dapat menyebabkan
                osilasi presisi jadwal 1-2 menit. Silakan rujuk kalender
                otoritas masjid yurisdiksi Anda sebagai pengadil syariat resmi
                final.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/religi/sholat" categoryId="religi" />
    </div>
  );
}
