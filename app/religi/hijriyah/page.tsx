"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React, { useState, useEffect } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import {
  ShieldAlert,
  ArrowRightLeft,
  Calendar,
  Moon,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  convertToHijri,
  convertToGregorian,
  getHijriMonthName,
  getIslamicEvent,
  getTodayHijriString,
  HIJRI_MONTHS,
  GREGORIAN_MONTHS,
  DAYS_ID,
} from "@/features/hijriyah/utils";

type ConversionMode = "MasehiToHijri" | "HijriToMasehi";

export default function HijriyahConverter() {
  const [isClient, setIsClient] = useState(false);

  // Base State
  const [mode, setMode] = useState<ConversionMode>("MasehiToHijri");
  const [errorMsg, setErrorMsg] = useState("");

  // GREGORIAN INPUTS
  const [gDay, setGDay] = useState("");
  const [gMonth, setGMonth] = useState("");
  const [gYear, setGYear] = useState("");

  // HIJRI INPUTS
  const [hDay, setHDay] = useState("");
  const [hMonth, setHMonth] = useState("");
  const [hYear, setHYear] = useState("");

  // RESULTS
  const [resultTitle, setResultTitle] = useState("");
  const [resultSub, setResultSub] = useState("");
  const [resultDay, setResultDay] = useState("");
  const [eventData, setEventData] = useState<{
    name: string;
    emoji: string;
  } | null>(null);

  useEffect(() => {
    setIsClient(true);
    handleSetToday();
  }, []);

  const handleSetToday = () => {
    const now = new Date();
    setMode("MasehiToHijri");
    setGDay(now.getDate().toString());
    setGMonth((now.getMonth() + 1).toString());
    setGYear(now.getFullYear().toString());
  };

  const handleSetTomorrow = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    setMode("MasehiToHijri");
    setGDay(now.getDate().toString());
    setGMonth((now.getMonth() + 1).toString());
    setGYear(now.getFullYear().toString());
  };

  const handleReset = () => {
    setGDay("");
    setGMonth("");
    setGYear("");
    setHDay("");
    setHMonth("");
    setHYear("");
    setResultTitle("");
    setResultSub("");
    setResultDay("");
    setEventData(null);
    setErrorMsg("");
  };

  const toggleMode = () => {
    handleReset();
    setMode(mode === "MasehiToHijri" ? "HijriToMasehi" : "MasehiToHijri");
  };

  // Kalkulasi reaktif
  useEffect(() => {
    const convert = () => {
      setErrorMsg("");
      setResultTitle("");
      setResultSub("");
      setResultDay("");
      setEventData(null);

      if (mode === "MasehiToHijri") {
        const d = parseInt(gDay);
        const m = parseInt(gMonth);
        const y = parseInt(gYear);
        if (!gDay || !gMonth || !gYear) return;
        if (isNaN(d) || isNaN(m) || isNaN(y)) return;

        // Cek basic logic
        const dateObj = new Date(y, m - 1, d);
        if (
          dateObj.getFullYear() !== y ||
          dateObj.getMonth() !== m - 1 ||
          dateObj.getDate() !== d
        ) {
          setErrorMsg("Tanggal Masehi tidak valid (Misal: 31 Februari).");
          return;
        }

        const h = convertToHijri(y, m, d);
        if (h) {
          setResultTitle(`${h.hd} ${getHijriMonthName(h.hm)} ${h.hy} H`);
          setResultSub(`${d} ${GREGORIAN_MONTHS[m - 1]} ${y}`);
          setResultDay(DAYS_ID[dateObj.getDay()]);
          setEventData(getIslamicEvent(h.hm, h.hd));
        } else {
          setErrorMsg(
            "Tahun atau Kombinasi Masehi di luar jangkauan konversi.",
          );
        }
      } else {
        const d = parseInt(hDay);
        const m = parseInt(hMonth);
        const y = parseInt(hYear);
        if (!hDay || !hMonth || !hYear) return;
        if (isNaN(d) || isNaN(m) || isNaN(y)) return;

        if (d < 1 || d > 30) {
          setErrorMsg("Tanggal Hijriah maksimal 30 hari.");
          return;
        }

        const g = convertToGregorian(y, m, d);
        if (g) {
          const dateObj = new Date(g.gy, g.gm - 1, g.gd);
          setResultTitle(`${g.gd} ${GREGORIAN_MONTHS[g.gm - 1]} ${g.gy} M`);
          setResultSub(`${d} ${getHijriMonthName(m)} ${y} H`);
          setResultDay(DAYS_ID[dateObj.getDay()]);
          setEventData(getIslamicEvent(m, d));
        } else {
          setErrorMsg(
            "Luar batas! Format tahun/hari lunar divalidasi dan ditolak.",
          );
        }
      }
    };

    convert();
  }, [mode, gDay, gMonth, gYear, hDay, hMonth, hYear]);

  if (!isClient) return null;

  const bnnrHijri = getTodayHijriString();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Religi", href: "/religi" },
            { label: "Konversi Kalender Hijriyah" },
          ]}
        />
        <div className="mt-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Konversi Penanggalan
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2 max-w-2xl">
            Translasikan siklus kalender Syamsiah (Masehi) ke Qamariyah
            (Hijriyah) maupun sebaliknya.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative my-4 w-full">
        {/* Pengaturan Input */}
        <Card
          variant="default"
          className="flex flex-col gap-6 p-6 sm:p-8 border border-[#EDE0D0] shadow-xl shadow-[#4A7C59]/[0.02] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#E8F5E9] rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 z-10">
            <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4A7C59]" />{" "}
              {mode === "MasehiToHijri"
                ? "Masehi → Hijriyah"
                : "Hijriyah → Masehi"}
            </h2>
            <Button
              variant="secondary"
              onClick={toggleMode}
              className="text-[#C17A3A] border-[#C17A3A]/30 hover:bg-[#C17A3A]/10 w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl"
            >
              <ArrowRightLeft className="w-4 h-4" /> Tukar Mode
            </Button>
          </div>

          <div className="flex items-center gap-2 z-10 -mt-2">
            <button
              onClick={handleSetToday}
              className="text-xs bg-surface hover:bg-muted text-primary px-3 py-1.5 rounded-lg border font-bold transition-colors"
            >
              Set Hari Ini
            </button>
            <button
              onClick={handleSetTomorrow}
              className="text-xs bg-surface hover:bg-muted text-primary px-3 py-1.5 rounded-lg border font-bold transition-colors"
            >
              Besok
            </button>
            <button
              onClick={handleReset}
              className="text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg font-bold ml-auto transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="flex flex-col gap-5 relative z-10">
            {mode === "MasehiToHijri" ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-col gap-1.5 w-full sm:w-1/4">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Tanggal
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="DD"
                    value={gDay}
                    onChange={(e) => setGDay(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-muted focus:border-[#4A7C59] bg-surface text-sm font-bold shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-2/4">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Bulan
                  </label>
                  <select
                    value={gMonth}
                    onChange={(e) => setGMonth(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-muted focus:border-[#4A7C59] bg-surface text-sm font-bold shadow-sm appearance-none"
                  >
                    <option value="" disabled>
                      Pilih Masehi...
                    </option>
                    {GREGORIAN_MONTHS.map((m, i) => (
                      <option key={i} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-1/4">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Tahun
                  </label>
                  <input
                    min="1900"
                    max="2100"
                    type="number"
                    placeholder="YYYY"
                    value={gYear}
                    onChange={(e) => setGYear(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-muted focus:border-[#4A7C59] bg-surface text-sm font-bold shadow-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-col gap-1.5 w-full sm:w-1/4">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Tanggal
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    placeholder="DD"
                    value={hDay}
                    onChange={(e) => setHDay(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-muted focus:border-[#4A7C59] bg-surface text-sm font-bold shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-2/4">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Bulan Hijriyah
                  </label>
                  <select
                    value={hMonth}
                    onChange={(e) => setHMonth(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-muted focus:border-[#4A7C59] bg-surface text-sm font-bold shadow-sm appearance-none"
                  >
                    <option value="" disabled>
                      Pilih Hijriyah...
                    </option>
                    {HIJRI_MONTHS.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 w-full sm:w-1/4">
                  <label className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Tahun H
                  </label>
                  <input
                    type="number"
                    placeholder="Misal 1446"
                    value={hYear}
                    onChange={(e) => setHYear(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl border border-muted focus:border-[#4A7C59] bg-surface text-sm font-bold shadow-sm"
                  />
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="bg-[#FFF0EB] text-[#9C4A2A] text-xs px-3 py-3 rounded-xl border border-[#9C4A2A]/20 font-bold flex items-center gap-2 mt-2 leading-relaxed">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                {errorMsg}
              </div>
            )}
          </div>
        </Card>

        {/* Result Dashboard Premium */}
        <div className="w-full">
          <Card
            variant="default"
            className="flex flex-col relative overflow-hidden rounded-[2.5rem] border border-[#7A5C42]/40 shadow-2xl bg-[#2C1A0E] text-[#F5EDE3] w-full ring-4 ring-inset ring-[#C17A3A]/10 min-h-[350px]"
          >
            {/* Top Info Banner - Bonus Feature */}
            <div className="w-full bg-[#1A0E07]/60 py-3.5 px-6 border-b border-white/10 flex items-center justify-center gap-2 text-sm">
              <span className="opacity-70">Hari ini berjalan:</span>{" "}
              <span className="font-bold text-[#E8F5E9] font-heading">
                {bnnrHijri}
              </span>{" "}
              🌙
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#C17A3A]/10 via-transparent to-transparent pointer-events-none opacity-80" />

            <div className="flex-grow flex flex-col justify-center items-center relative z-10 p-8 sm:p-12 text-center">
              {resultTitle ? (
                <div className="animate-in zoom-in-95 duration-300 w-full flex flex-col items-center">
                  {/* DOW Badge */}
                  <div className="bg-white/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#EDE0D0] mb-6 backdrop-blur-sm border border-white/5">
                    Hari {resultDay}
                  </div>

                  {/* Super Title Display */}
                  <h2
                    className={cn(
                      "font-black font-heading tracking-tight text-white mb-4",
                      resultTitle.length > 20
                        ? "text-3xl sm:text-4xl lg:text-5xl"
                        : "text-4xl sm:text-5xl lg:text-6xl",
                    )}
                  >
                    {resultTitle}
                  </h2>

                  <div className="text-lg sm:text-2xl text-[#C17A3A] font-medium font-body mb-8 opacity-90 flex items-center justify-center gap-2">
                    <ArrowRightLeft className="w-5 h-5" />
                    {resultSub}
                  </div>

                  {/* Event Highlighter */}
                  {eventData ? (
                    <div className="bg-gradient-to-r from-[#4A7C59] to-[#2E5E3D] px-6 py-4 rounded-2xl border border-white/20 shadow-xl flex items-center gap-4 animate-in slide-in-from-bottom-4 shadow-[#4A7C59]/20 w-full sm:w-auto">
                      <span className="text-3xl drop-shadow-md">
                        {eventData.emoji}
                      </span>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-[10px] uppercase font-bold text-white/70 tracking-widest">
                          Hari Besar Tervalidasi
                        </span>
                        <span className="text-white font-bold font-heading text-lg">
                          {eventData.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-16"></div> /* spacer to prevent jank */
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-30 gap-4 mt-8">
                  <Moon className="w-16 h-16" />
                  <p className="font-medium">
                    Lengkapi input form untuk memulai konversi
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* SEKSI EDUKASI & INFORMASI (Sesuai Gaya Premium Zakat & BMI) */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
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
                Eksplorasi Kalender Syamsiah & Qamariyah
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Harmonisasi Dua Rotasi Langit
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Alat konversi presisi ini dibuat tidak hanya membalik urutan
                angka, tetapi bertindak sebagai kalkulator saintifik transisi
                kalender berdasarkan putaran lunar bumi (Bulan) dan orbit
                eliptikal (Matahari).
              </p>
            </div>

            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">
              {/* 1. Masehi VS Hijri */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Kalender Syamsiah (Masehi) vs Qamariyah (Hijriyah)
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#C17A3A]/30 transition-colors">
                    <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#C17A3A]/20 flex items-center justify-center text-[#C17A3A]">
                        ☀️
                      </div>
                      <h4 className="font-heading font-bold text-[#E8F5E9] text-lg">
                        Solar Cycle (Masehi)
                      </h4>
                    </div>
                    <p className="text-sm text-[#EDE0D0] opacity-90 leading-relaxed mb-4">
                      Didikte oleh durasi waktu perputaran penuh Bumi
                      mengelilingi Matahari.
                    </p>
                    <ul className="space-y-2 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />{" "}
                        <strong>Durasi Tahunan:</strong> ~365.25 hari
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />{" "}
                        <strong>Fluktuasi Kritis:</strong> Tahun Kabisat
                        (Februari = 29)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />{" "}
                        <strong>Kegunaan Utama:</strong> Iklim, Musim, Bisnis
                        Global
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#4A7C59]/10 rounded-3xl p-6 sm:p-8 border border-[#4A7C59]/30 hover:bg-[#4A7C59]/20 transition-colors">
                    <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#4A7C59]/20 flex items-center justify-center text-[#4A7C59]">
                        🌙
                      </div>
                      <h4 className="font-heading font-bold text-white text-lg">
                        Lunar Cycle (Hijriyah)
                      </h4>
                    </div>
                    <p className="text-sm text-[#EDE0D0] opacity-90 leading-relaxed mb-4">
                      Mengacu mutlak pada fase revolusi hilal (Bulan) memutari
                      oribital Bumi.
                    </p>
                    <ul className="space-y-2 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />{" "}
                        <strong>Durasi Tahunan:</strong> ~354 / 355 hari
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />{" "}
                        <strong>Fluktuasi Kritis:</strong> Bergeser 10-11 hari
                        mundur tiap tahun Masehi
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />{" "}
                        <strong>Kegunaan Utama:</strong> Penjatuhan Ibadah
                        Syariah & Haji
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Hari Awal */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Batasan Hari Jatuh Tempo
                  </h3>
                </div>
                <div className="bg-[#1A0E07]/40 border border-[#C17A3A]/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="p-4 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 text-[#C17A3A] shrink-0">
                    <RotateCcw className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#E8F5E9] mb-3">
                      Kapan Sebuah Kalender Memulai "Besok"?
                    </h4>
                    <p className="text-sm leading-relaxed text-[#EDE0D0] opacity-90 mb-3">
                      Ini adalah miskonsepsi besar di masyarakat awam! Sebuah
                      hari pada <b>Tanggalan Masehi</b> selalu berganti mutlak
                      secara administratif di titik{" "}
                      <span className="text-[#C17A3A] font-bold">
                        pukul 00:00 (Tengah Malam)
                      </span>
                      .
                    </p>
                    <p className="text-sm leading-relaxed text-[#EDE0D0] opacity-90">
                      Berkebalikan secara ekstrim, kalender Islam{" "}
                      <b>Hijriyah</b> otomatis mereset dan memasuki hari /
                      tanggal "Besok" nya persis berbarengan saat bedug{" "}
                      <span className="text-[#4A7C59] font-bold">
                        Adzan Maghrib (Terbenamnya Matahari)
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Disclaimer Akhir Rukyah vs Hisab */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#9C4A2A]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden mt-8">
              <AlertTriangle className="w-6 h-6 text-[#9C4A2A] mx-auto mb-3" />
              <h4 className="font-heading font-extrabold text-[#FFF0EB] text-lg mb-3">
                Disclaimer (Selisih Hisab & Rukyat lokal)
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed">
                NusantaraTools menggunakan modul konversi tabular matematis (Umm
                al-Qura base) untuk mentranslasikan tanggal. Di wilayah
                Indonesia, penetapan awal kalender peribadahan krusial seperti
                Ramadan atau Idul Fitri senantiasa merujuk pada sidang{" "}
                <strong>Isbat Kemenag RI (Rukyatul Hilal)</strong> yang dapat
                memanifestasikan <i>delay</i> atau penambahan perselisihan 1
                hari absolut terhadap hitungan matematis (*Hisab*).
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/religi/hijriyah" categoryId="religi" />
    </div>
  );
}
