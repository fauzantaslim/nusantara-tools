"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/ui/Card";
import { CalendarDays, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateId, getDaysInMonth, getDayType } from "../utils";
import { MasaSuburContextType, CycleResult } from "../types";
import { DAY_TYPE } from "@/lib/constants";
import { getDay, isToday, format, startOfMonth } from "date-fns";
import { id } from "date-fns/locale";

export const OvulationResult: React.FC<{ hook: MasaSuburContextType }> = ({
  hook,
}) => {
  const {
    result,
    summary,
    activeTab,
    setActiveTab,
    calendarMonthStart,
    setCalendarMonthStart,
  } = hook;

  if (!result || !summary) {
    return (
      <Card
        variant="default"
        className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
      >
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none transition-opacity"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <div className="relative z-10">
          <div className="absolute inset-0 bg-[#4A7C59] blur-[80px] rounded-full opacity-10" />
          <div className="relative z-10 w-full flex justify-center mb-2 mt-4">
            <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
            <Image
              src="/masa-subur.svg"
              alt="Ovulation Illustration"
              width={400}
              height={300}
              className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain relative z-10 select-none pointer-events-none drop-shadow-2xl"
              priority
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
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
    );
  }

  const renderCalendar = (baseDate: Date) => {
    const year = baseDate.getFullYear();
    const monthIndex = baseDate.getMonth();
    const days = getDaysInMonth(year, monthIndex);
    const startObj = startOfMonth(baseDate);
    const startDayIndex = getDay(startObj);

    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const paddingDays = Array.from({ length: startDayIndex }).fill(null);

    return (
      <div className="bg-[#1A0E07]/60 p-5 rounded-3xl border border-white/10 shadow-inner mb-6">
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

            let bgClass = "hover:bg-white/5 text-[#F5EDE3]";
            if (type === DAY_TYPE.PERIOD)
              bgClass =
                "bg-[#9C4A2A] text-white font-bold shadow-md shadow-[#9C4A2A]/20";
            if (type === DAY_TYPE.FERTILE)
              bgClass =
                "bg-[#4A7C59] text-white font-bold shadow-md shadow-[#4A7C59]/20";
            if (type === DAY_TYPE.OVULATION)
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
              Berikut ini adalah rincian profil siklus menstruasi Anda untuk 6
              periode ke depan.
            </p>

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
                    - {formatDateId(summary.nextFertileWindow.end, false)}
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
                    {formatDateId(summary.nextOvulation.date, false)}
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
            <div className="relative z-10 w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1A0E07]/60 shadow-inner animate-in fade-in slide-in-from-bottom-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[550px] text-left text-sm text-[#F5EDE3]">
                  <thead className="bg-[#2C1A0E] font-ui uppercase text-[10px] tracking-widest text-[#EDE0D0] border-b border-white/10">
                    <tr>
                      <th className="px-5 py-4 font-bold rounded-tl-[1.5rem]">
                        #
                      </th>
                      <th className="px-5 py-4 font-bold">Masa Haid</th>
                      <th className="px-5 py-4 font-bold">Masa Subur</th>
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
                              {formatDateId(c.fertileWindowStart, false)} -{" "}
                              {formatDateId(c.fertileWindowEnd, false)}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-bold text-white font-ui whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C17A3A]/20 border border-[#C17A3A]/30 text-[#C17A3A] rounded-full text-xs">
                            <span>{formatDateId(c.ovulationDate, true)}</span>
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
                const minMonth = startOfMonth(result.cycles[0].periodStart);
                const maxMonth = startOfMonth(
                  result.cycles[result.cycles.length - 1].nextPeriodStart,
                );
                const isPrevDisabled =
                  calendarMonthStart.getTime() <= minMonth.getTime();
                const isNextDisabled =
                  calendarMonthStart.getTime() >= maxMonth.getTime();

                return (
                  <div className="flex justify-between items-center mb-6 px-4 py-2.5 bg-[#1A0E07]/80 rounded-[1.5rem] border border-[#7A5C42]/30 shadow-sm max-w-[300px] mx-auto">
                    <button
                      onClick={() =>
                        setCalendarMonthStart(
                          (prev) =>
                            new Date(
                              prev.getFullYear(),
                              prev.getMonth() - 1,
                              1,
                            ),
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
                        setCalendarMonthStart(
                          (prev) =>
                            new Date(
                              prev.getFullYear(),
                              prev.getMonth() + 1,
                              1,
                            ),
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

              {renderCalendar(calendarMonthStart)}
            </div>
          )}

          {/* Disclaimer Mini */}
          <div className="mt-8 mb-4 flex items-start gap-3 bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 p-4 rounded-xl relative z-10 text-left">
            <Info className="w-4 h-4 mt-0.5 text-[#9C4A2A] shrink-0" />
            <p className="text-xs text-[#FFF0EB]/80 font-body leading-relaxed">
              Laporan ini hanya bersifat indikasi dan hitungan matematis
              belaka—tidak dapat digunakan sebagai saran kontrasepsi primer atau
              diagnosa kondisi fertilitas absolut.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
