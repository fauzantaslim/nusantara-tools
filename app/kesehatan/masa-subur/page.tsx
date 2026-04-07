"use client";

import React, { useState } from "react";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import Image from "next/image";
import {
  ArrowRight,
  Activity,
  Info,
  CalendarDays,
  RefreshCcw,
  ShieldAlert,
  Droplet,
  CheckCircle2,
  HeartPulse,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedHealthTools } from "../components/RelatedHealthTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import {
  calculateMasaSubur,
  MasaSuburInput,
  MasaSuburResult,
  formatDateId,
  getDaysInMonth,
  getDayType,
  getCurrentCycleInfo,
} from "@/features/masa-subur/utils";
import {
  startOfMonth,
  getDay,
  isToday,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import { id } from "date-fns/locale";

export default function MasaSuburCalculator() {
  const [firstDayOfLastPeriod, setFirstDayOfLastPeriod] = useState<string>("");
  const [periodDuration, setPeriodDuration] = useState<number>(5);
  const [averageCycleLength, setAverageCycleLength] = useState<number>(28);

  const [result, setResult] = useState<MasaSuburResult | null>(null);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"table" | "calendar">("table");
  const [calendarMonthStart, setCalendarMonthStart] = useState<Date>(
    new Date(),
  );

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstDayOfLastPeriod) {
      setError(
        "Harap pilih tanggal hari pertama periode menstruasi terakhir Anda.",
      );
      return;
    }

    try {
      const input: MasaSuburInput = {
        firstDayOfLastPeriod,
        periodDuration,
        averageCycleLength,
      };

      const res = calculateMasaSubur(input);
      setResult(res);
      setActiveTab("table"); // Reset back to table view
      setCalendarMonthStart(startOfMonth(res.cycles[0].periodStart));
    } catch (err: any) {
      setError(
        err.message || "Terjadi kesalahan saat mengkalkulasi masa subur.",
      );
      setResult(null);
    }
  };

  const clearForm = () => {
    setFirstDayOfLastPeriod("");
    setPeriodDuration(5);
    setAverageCycleLength(28);
    setResult(null);
    setError("");
  };

  // Komponen Helper untuk merender Kalender 1 Bulan
  const renderCalendar = (baseDate: Date, title: string) => {
    if (!result) return null;

    const year = baseDate.getFullYear();
    const monthIndex = baseDate.getMonth();
    const days = getDaysInMonth(year, monthIndex);
    const startObj = startOfMonth(baseDate);
    const startDayIndex = getDay(startObj); // 0 = Sunday, 1 = Monday

    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const paddingDays = Array.from({ length: startDayIndex }).fill(null);

    return (
      <div className="bg-[#1A0E07]/60 p-5 rounded-3xl border border-white/10 shadow-inner mb-6">
        {title && (
          <h4 className="text-white font-bold font-heading mb-4 text-center text-lg">
            {title}
          </h4>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#9C4A2A]"></div>
            <span className="text-[#EDE0D0]">Menstruasi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#4A7C59]"></div>
            <span className="text-[#EDE0D0]">Masa Subur</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 text-white border-2 border-[#C17A3A] rounded-full"></div>
            <span className="text-[#EDE0D0]">Ovulasi (Puncak)</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dayNames.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] sm:text-xs font-bold text-[#7A5C42] py-2 uppercase"
            >
              {d}
            </div>
          ))}

          {paddingDays.map((_, i) => (
            <div key={`pad-${i}`} className="p-2 sm:p-3" />
          ))}

          {days.map((d, i) => {
            const type = getDayType(d, result.cycles);
            const isTodayDate = isToday(d);

            let bgClass = "hover:bg-white/5 text-[#F5EDE3]"; // normal
            if (type === "period")
              bgClass =
                "bg-[#9C4A2A] text-white font-bold shadow-md shadow-[#9C4A2A]/20";
            if (type === "fertile")
              bgClass =
                "bg-[#4A7C59] text-white font-bold shadow-md shadow-[#4A7C59]/20";
            if (type === "ovulation")
              bgClass =
                "ring-2 ring-inset ring-[#C17A3A] bg-[#C17A3A]/20 text-white font-bold";

            return (
              <div
                key={i}
                className={cn(
                  "relative flex items-center justify-center p-2 sm:p-3 text-sm sm:text-base rounded-xl transition-all cursor-default aspect-square",
                  bgClass,
                )}
              >
                <span className="relative z-10">{d.getDate()}</span>
                {isTodayDate && (
                  <div className="absolute bottom-1 sm:bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Masa Subur" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Masa Subur
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Lacak siklus bulanan & jendela ovulasi Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <Card
          variant="default"
          className="lg:col-span-5 flex flex-col gap-8 p-6 sm:p-10 border border-[#EDE0D0] shadow-xl shadow-black/[0.03] rounded-[2.5rem] bg-white relative overflow-hidden z-10 w-full lg:h-[650px]"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-surface rounded-full blur-[60px] opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading text-primary">
              Data Siklus Berjalan
            </h2>
            <p className="text-sm text-secondary font-body mt-2 leading-relaxed">
              Prediksi jadwal bulanan disesuaikan dengan pola biologis unik
              Anda.
            </p>
          </div>

          <form
            onSubmit={handleCalculate}
            className="flex flex-col gap-6 relative z-10 h-full"
          >
            <div className="space-y-6 flex-grow">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">
                  Kapan hari pertama haid terakhir?
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={firstDayOfLastPeriod}
                    onChange={(e) => setFirstDayOfLastPeriod(e.target.value)}
                    className="w-full h-14 rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">
                  Berapa lama rata-rata haid berlangsung?
                </label>
                <div className="relative">
                  <select
                    value={periodDuration}
                    onChange={(e) => setPeriodDuration(Number(e.target.value))}
                    className="w-full flex h-14 rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none cursor-pointer"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} Hari
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <CalendarDays className="h-5 w-5 text-secondary opacity-50" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold font-ui text-primary">
                  Berapa panjang siklus rata-rata Anda?
                </label>
                <div className="relative">
                  <select
                    value={averageCycleLength}
                    onChange={(e) =>
                      setAverageCycleLength(Number(e.target.value))
                    }
                    className="w-full flex h-14 rounded-xl border bg-white px-4 py-3 text-[15px] transition-colors border-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-1 text-primary font-ui font-medium appearance-none cursor-pointer"
                  >
                    {Array.from({ length: 26 }, (_, i) => i + 20).map((num) => (
                      <option key={num} value={num}>
                        {num} Hari
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <RefreshCcw className="h-5 w-5 text-secondary opacity-50" />
                  </div>
                </div>
                <p className="text-xs text-secondary/70 italic mt-1 font-body">
                  Paling umum berlangsung 28 hari.
                </p>
              </div>

              {error && (
                <div className="bg-accent-3-light text-accent-3 text-sm px-4 py-3 rounded-2xl border border-accent-3/20 font-bold flex items-center gap-2 shadow-sm">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span className="flex-1">{error}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="danger"
                onClick={clearForm}
                className="py-5 font-bold rounded-2xl whitespace-nowrap px-6 border-[#7A5C42] text-primary hover:bg-surface"
              >
                Bersihkan
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="py-5 text-[15px] shadow-lg hover:shadow-xl group rounded-2xl w-full"
              >
                Kalkulasi Siklus
                <ArrowRight className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Right Side: Result Display */}
        <div className="lg:col-span-7 lg:h-[650px]">
          {result ? (
            <Card
              variant="default"
              className="flex flex-col relative rounded-[2.5rem] border shadow-2xl transition-all duration-700 lg:h-full animate-in fade-in zoom-in-95 bg-[#2C1A0E] text-[#F5EDE3] border-[#4A7C59]/30 ring-4 ring-inset ring-[#4A7C59]/10 overflow-hidden"
            >
              <div className="lg:absolute lg:inset-0 lg:overflow-y-auto w-full custom-scrollbar block">
                <div className="flex flex-col p-5 sm:p-10 relative">
                  {/* Decorative Glow */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C17A3A]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A7C59]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />
                  </div>

                  <div className="relative z-10 flex flex-col mb-8 text-center items-center">
                    <div className="w-16 h-16 rounded-[1.2rem] bg-[#1A0E07] shadow-inner flex items-center justify-center mb-4 border border-white/10">
                      <CalendarDays className="w-8 h-8 text-[#C17A3A]" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Laporan Siklus Anda
                    </h3>
                    <p className="text-sm font-body text-[#EDE0D0]/80 mt-1 max-w-sm mb-6">
                      Berikut ini adalah rincian profil siklus menstruasi Anda
                      untuk 6 periode ke depan.
                    </p>

                    {(() => {
                      const summary = getCurrentCycleInfo(result.cycles);
                      if (!summary) return null;
                      return (
                        <div className="w-full mb-2">
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                            {/* 1. Periode Berikutnya */}
                            <div className="bg-[#1A0E07]/60 p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:bg-[#1A0E07]/80 transition-colors">
                              <span className="text-[10px] sm:text-xs font-bold font-ui text-[#9C4A2A] uppercase tracking-wider mb-2">
                                Haid Berikutnya
                              </span>
                              <span className="text-sm sm:text-base font-bold text-white mb-1">
                                {formatDateId(summary.nextPeriod.date, false)}
                              </span>
                              <span className="text-[10px] text-[#EDE0D0]/70">
                                {summary.nextPeriod.daysIn === 0
                                  ? "Hari ini"
                                  : `dalam ${summary.nextPeriod.daysIn} hari`}
                              </span>
                            </div>

                            {/* 2. Jendela Subur */}
                            <div className="bg-[#1A0E07]/60 p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:bg-[#1A0E07]/80 transition-colors">
                              <span className="text-[10px] sm:text-xs font-bold font-ui text-[#4A7C59] uppercase tracking-wider mb-2">
                                Jendela Subur
                              </span>
                              <span className="text-[13px] sm:text-[15px] font-bold text-white leading-tight mb-1">
                                {
                                  formatDateId(
                                    summary.nextFertileWindow.start,
                                    false,
                                  ).split(" ")[0]
                                }{" "}
                                -{" "}
                                {formatDateId(
                                  summary.nextFertileWindow.end,
                                  false,
                                )}
                              </span>
                              <span className="text-[10px] text-[#EDE0D0]/70">
                                {summary.nextFertileWindow.daysIn === 0
                                  ? "Sedang berlangsung"
                                  : `dalam ${summary.nextFertileWindow.daysIn} hari`}
                              </span>
                            </div>

                            {/* 3. Ovulasi */}
                            <div className="bg-[#1A0E07]/60 p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:bg-[#1A0E07]/80 transition-colors">
                              <span className="text-[10px] sm:text-xs font-bold font-ui text-[#C17A3A] uppercase tracking-wider mb-2">
                                Ovulasi (Puncak)
                              </span>
                              <span className="text-sm sm:text-base font-bold text-white mb-1">
                                {formatDateId(
                                  summary.nextOvulation.date,
                                  false,
                                )}
                              </span>
                              <span className="text-[10px] text-[#EDE0D0]/70">
                                {summary.nextOvulation.daysIn === 0
                                  ? "Hari ini!"
                                  : `dalam ${summary.nextOvulation.daysIn} hari`}
                              </span>
                            </div>

                            {/* 4. Siklus Saat Ini */}
                            <div className="bg-[#2C1A0E] p-4 rounded-2xl border border-[#C17A3A]/30 flex flex-col justify-between shadow-inner">
                              <span className="text-[10px] sm:text-xs font-bold font-ui text-[#EDE0D0]/80 uppercase tracking-wider mb-2">
                                Status Saat Ini
                              </span>
                              <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-xl sm:text-2xl font-black text-[#C17A3A] leading-none">
                                  Hari {summary.currentCycleDay}
                                </span>
                              </div>
                              <span className="text-[10px] sm:text-xs font-bold text-white">
                                {summary.currentPhase}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    <div className="bg-[#1A0E07]/40 w-full rounded-2xl p-1.5 flex mt-4 border border-white/5">
                      <button
                        onClick={() => setActiveTab("table")}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all",
                          activeTab === "table"
                            ? "bg-[#C17A3A] text-white shadow-md"
                            : "text-[#EDE0D0]/60 hover:text-white",
                        )}
                      >
                        Tabel Siklus
                      </button>
                      <button
                        onClick={() => setActiveTab("calendar")}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl font-bold text-sm transition-all",
                          activeTab === "calendar"
                            ? "bg-[#C17A3A] text-white shadow-md"
                            : "text-[#EDE0D0]/60 hover:text-white",
                        )}
                      >
                        Kalender Visual
                      </button>
                    </div>
                  </div>

                  {activeTab === "table" && (
                    <div className="relative z-10 w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1A0E07]/60 shadow-inner">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[550px] text-left text-sm text-[#F5EDE3]">
                          <thead className="bg-[#2C1A0E] font-ui uppercase text-[10px] tracking-widest text-[#EDE0D0] border-b border-white/10">
                            <tr>
                              <th className="px-5 py-4 font-bold rounded-tl-[1.5rem]">
                                #
                              </th>
                              <th className="px-5 py-4 font-bold">Masa Haid</th>
                              <th className="px-5 py-4 font-bold">
                                Masa Subur
                              </th>
                              <th className="px-5 py-4 font-bold rounded-tr-[1.5rem]">
                                Ovulasi
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-body">
                            {result.cycles.map((c, idx) => (
                              <tr
                                key={idx}
                                className="hover:bg-white/5 transition-colors group"
                              >
                                <td className="px-5 py-4 border-r border-white/5 text-center">
                                  <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-[#EDE0D0] group-hover:bg-[#C17A3A]/20 mx-auto">
                                    {idx + 1}
                                  </span>
                                </td>
                                <td className="px-5 py-4 font-ui">
                                  <div className="flex flex-col">
                                    <span className="text-[#9C4A2A] font-bold text-xs mb-0.5">
                                      ESTIMASI
                                    </span>
                                    <span>
                                      {formatDateId(c.periodStart, false)} -{" "}
                                      {formatDateId(c.periodEnd, false)}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-5 py-4 font-ui">
                                  <div className="flex flex-col">
                                    <span className="text-[#4A7C59] font-bold text-xs mb-0.5">
                                      JENDELA KESUBURAN
                                    </span>
                                    <span>
                                      {formatDateId(
                                        c.fertileWindowStart,
                                        false,
                                      )}{" "}
                                      -{" "}
                                      {formatDateId(c.fertileWindowEnd, false)}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-5 py-4 font-bold text-white font-ui whitespace-nowrap">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C17A3A]/20 border border-[#C17A3A]/30 text-[#C17A3A] rounded-full text-xs">
                                    <span>
                                      {formatDateId(c.ovulationDate, true)}
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === "calendar" && (
                    <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-2">
                      <p className="text-sm text-[#EDE0D0]/80 mb-4 px-2 text-center">
                        Menavigasi kalender secara visual.
                      </p>

                      {(() => {
                        const minMonth = startOfMonth(
                          result.cycles[0].periodStart,
                        );
                        const maxMonth = startOfMonth(
                          result.cycles[result.cycles.length - 1]
                            .nextPeriodStart,
                        );
                        const isPrevDisabled =
                          calendarMonthStart.getTime() <= minMonth.getTime();
                        const isNextDisabled =
                          calendarMonthStart.getTime() >= maxMonth.getTime();

                        return (
                          <div className="flex justify-between items-center mb-6 px-4 py-2.5 bg-[#1A0E07]/80 rounded-[1.5rem] border border-[#7A5C42]/30 shadow-sm max-w-[300px] mx-auto">
                            <button
                              onClick={() =>
                                setCalendarMonthStart((prev) =>
                                  subMonths(prev, 1),
                                )
                              }
                              disabled={isPrevDisabled}
                              className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full bg-[#2C1A0E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C17A3A] focus:ring-offset-2 focus:ring-offset-[#1A0E07]",
                                isPrevDisabled
                                  ? "text-[#EDE0D0]/30 cursor-not-allowed border border-white/5"
                                  : "text-[#EDE0D0] hover:text-white hover:bg-[#C17A3A] shadow-sm border border-[#7A5C42]/30",
                              )}
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="text-center w-full">
                              <p className="text-base sm:text-lg font-black font-heading text-white tracking-wide uppercase">
                                {format(calendarMonthStart, "MMMM yyyy", {
                                  locale: id,
                                })}
                              </p>
                            </div>
                            <button
                              onClick={() =>
                                setCalendarMonthStart((prev) =>
                                  addMonths(prev, 1),
                                )
                              }
                              disabled={isNextDisabled}
                              className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-full bg-[#2C1A0E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C17A3A] focus:ring-offset-2 focus:ring-offset-[#1A0E07]",
                                isNextDisabled
                                  ? "text-[#EDE0D0]/30 cursor-not-allowed border border-white/5"
                                  : "text-[#EDE0D0] hover:text-white hover:bg-[#C17A3A] shadow-sm border border-[#7A5C42]/30",
                              )}
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })()}

                      {renderCalendar(calendarMonthStart, "")}
                    </div>
                  )}

                  {/* Disclaimer Mini */}
                  <div className="mt-8 mb-4 flex items-start gap-3 bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 p-4 rounded-xl relative z-10 text-left">
                    <Info className="w-4 h-4 mt-0.5 text-[#9C4A2A] shrink-0" />
                    <p className="text-xs text-[#FFF0EB]/80 font-body leading-relaxed">
                      Laporan ini hanya bersifat indikasi dan hitungan matematis
                      belaka—tidak dapat digunakan sebagai saran kontrasepsi
                      primer atau diagnosa kondisi fertilitas absolut.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card
              variant="default"
              className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
            >
              {/* Grain Overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              ></div>

              <div className="relative z-10">
                <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
                <div className="relative z-10 w-full flex justify-center mb-2 mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <Image
                    src="/masa-subur.svg"
                    alt="BMI Calculator Illustration"
                    width={400}
                    height={300}
                    className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
                Siap Memprediksi
              </h3>
              <p className="text-[#EDE0D0] font-body max-w-sm text-base sm:text-lg leading-relaxed relative z-10 opacity-90 px-4">
                Isi formulir hari dan panjang siklus Anda di sebelah kiri untuk
                melihat estimasi jendela fertilitas Anda.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section (Premium Dark Layout) */}
      <div className="mt-16 mb-24">
        <div className="relative">
          {/* Main Container - Dark Theme (Tanah Tua) */}
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Effects Wrapper (handles overflow) */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              {/* Background Glow Effects */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-[0.08] translate-y-1/2 -translate-x-1/3" />

              {/* Grain Overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay transition-opacity"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              ></div>
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Panduan Repro-Kesehatan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Menyelami Siklus Menstruasi Seutuhnya
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Keajaiban ritme hormonal dipersiapkan setiap bulannya.
                  Memahami alur sistem siklus Anda dapat mendukung rencana
                  fertilisasi, mendeteksi ketidakteraturan sejak dini, hingga
                  membaca sinyal alamiah raga Anda.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm max-w-2xl mx-auto text-left shadow-inner">
                  <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug text-center sm:text-left">
                    "Pemetaan siklus masa reproduksi modern menghadirkan kendali
                    penuh bagi perempuan dalam navigasi kesehatan holistik
                    mereka."
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Fase-Fase */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Fase Pembentuk Siklus
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors flex flex-col justify-between">
                      <Droplet className="w-6 h-6 text-[#9C4A2A] mb-4" />
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Menstruasi
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Penebalan lapisan dinding rahim terkikis & luruh.
                        Biasanya menjadi titik nol bulan yang dirasakan 3 hingga
                        7 hari lamanya.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <Activity className="w-6 h-6 text-white/60 mb-4" />
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Folikuler
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Bermula seiring dengan hari haid pertama dan berakhir
                        menjelang ovulasi. Pabrik ovarium merawat kematangan
                        folikel sel telur secara simultan.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17A3A]/20 rounded-full blur-xl" />
                      <HeartPulse className="w-6 h-6 text-[#C17A3A] mb-4 relative z-10" />
                      <h4 className="relative text-xl font-bold font-heading text-white mb-2">
                        Ovulasi (Puncak)
                      </h4>
                      <p className="relative text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Lepasnya telur pamungkas dari ovarium. Secara empiris
                        muncul sekitar H-14 dari hari awal periode siklus
                        mendatang bagi lazimnya tipe 28 hari.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <ShieldAlert className="w-6 h-6 text-[#4A7C59] mb-4" />
                      <h4 className="relative text-xl font-bold font-heading text-white mb-2">
                        Luteal
                      </h4>
                      <p className="relative text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Dimulai saat usai ovulasi dengan durasi presisi sekitar
                        12-14 hari menjelang siklus anyar. Ini saat dimana
                        fondasi rahim menebal memfasilitas implantasi.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Jendela Fertilitas */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Anatomi Jendela Subur
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-[#EDE0D0] font-body leading-relaxed text-lg mb-4 opacity-90">
                        Jendela paling potensial berlangsung selama rentang
                        tempo **6 hari berturut-turut** yang berakhir pas di
                        hari puncak (ovulasi). Durasi ini bukanlah angka mati;
                        rentang yang luas ini mengakomodir parameter biologi
                        penyokong kehamilan.
                      </p>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Masa hidup sperma:</strong> Dapat terus
                            hidup hingga 5 hari bersembunyi di rute reproduksi
                            sang wanita.
                          </span>
                        </li>
                        <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Masa prima telur:</strong> Begitu dirilis,
                            sang sel telur mandiri mengambang merindukan
                            pembuahan maksimum 24 jam.
                          </span>
                        </li>
                      </ul>
                      <p className="text-sm font-body text-white/50 italic mt-4">
                        Peluang optimal diperoleh melalui intiman selang
                        beberapa waktu pada siklus jendela ini jika menargetkan
                        pembuahan secara rasional.
                      </p>
                    </div>

                    <div className="bg-[#1A0E07] p-8 rounded-3xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden flex items-center justify-center min-h-[300px]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,124,89,0.1)_0,transparent_70%)] pointer-events-none" />

                      <div className="relative z-10 text-center">
                        <div className="flex justify-center mb-6">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4A7C59]/80 to-[#1A0E07] flex items-center justify-center p-1 shadow-lg shadow-[#4A7C59]/10 ring-4 ring-[#4A7C59]/20">
                            <div className="w-full h-full bg-[#1A0E07] rounded-full flex items-center justify-center border border-[#4A7C59]/50">
                              <HeartPulse className="w-10 h-10 text-[#4A7C59]" />
                            </div>
                          </div>
                        </div>
                        <h5 className="font-bold text-lg text-white font-heading tracking-wide mb-2">
                          Golden Ratio 6-Hari
                        </h5>
                        <p className="text-sm text-surface/80 font-body px-4">
                          Berdasarkan gabungan daya jelajah sel dan keunikan
                          hormon masing-masing.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Limitations */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Anomali & Batasan
                    </h3>
                  </div>

                  <div className="bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 p-6 lg:p-8 rounded-[2rem] space-y-6 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#9C4A2A]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <h4 className="text-xl font-bold text-[#FFF0EB] relative z-10 flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#9C4A2A]" /> Variasi Alami
                      Itu Lumrah
                    </h4>
                    <p className="text-base font-body text-[#FFF0EB]/90 leading-relaxed mb-4 relative z-10">
                      Konstruksi kalkulator bersandar mutlak pada data observasi
                      konvensional. Tubuh bukanlah mesin berdetik statis,
                      keteraturan dapat mengalami manuver tajam akibat hal-hal
                      berikut:
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#C17A3A] pl-3">
                          Psikosomatis
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Stres ekstrem fisik & mental menunda poros hormon
                          sekunder.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-white pl-3">
                          Berat Badan
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Osilasi berat drastis dalam jangka waktu teramat
                          singkat.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#4A7C59] pl-3">
                          Gaya Hidup
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Olahraga keras ala atlet pro seringkali mengerem laju
                          rutinitas normal siklus.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#9C4A2A] pl-3">
                          Warning Log
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Alat ini{" "}
                          <strong className="text-white">tidak bisa</strong>{" "}
                          direkayasa menjadi platform substitusi metode keluarga
                          berencana konvensional.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedHealthTools currentPath="/kesehatan/masa-subur" />
    </div>
  );
}
