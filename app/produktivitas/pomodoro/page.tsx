"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { usePomodoro } from "@/features/pomodoro/hooks/usePomodoro";
import { PomodoroSettings } from "@/features/pomodoro/components/PomodoroSettings";
import { PomodoroTimer } from "@/features/pomodoro/components/PomodoroTimer";
import { Info, CheckCircle2, Flame, Target, Zap, Clock } from "lucide-react";

export default function PomodoroPage() {
  const {
    settings,
    preset,
    mode,
    timeLeft,
    isActive,
    completedSessions,
    sessionsToday,
    toggleTimer,
    resetTimer,
    skipSession,
    updatePreset,
    updateCustomSettings,
    requestPermission,
  } = usePomodoro();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Produktivitas", href: "/produktivitas" },
            { label: "Pomodoro Timer" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Pomodoro Timer
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Fokus Lebih Dalam, Istirahat Lebih Berkualitas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Settings */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <PomodoroSettings
            settings={settings}
            preset={preset}
            updatePreset={updatePreset}
            updateCustomSettings={updateCustomSettings}
            requestPermission={requestPermission}
          />
        </div>

        {/* Right Side: Timer */}
        <div className="lg:col-span-7">
          <PomodoroTimer
            mode={mode}
            timeLeft={timeLeft}
            isActive={isActive}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
            skipSession={skipSession}
            sessionsToday={sessionsToday}
            completedSessions={completedSessions}
          />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Metode Produktivitas Teruji
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Apa itu Teknik Pomodoro?
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Teknik Pomodoro adalah sistem manajemen waktu yang mendorong
                  orang untuk bekerja <em>dengan</em> waktu yang mereka
                  miliki—bukan melawannya. Menggunakan metode ini, Anda membagi
                  hari kerja Anda menjadi blok waktu 25 menit yang dipisahkan
                  oleh istirahat 5 menit. Blok-blok ini disebut sebagai
                  pomodoro.
                </p>

                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Fokus pada satu tugas dalam satu waktu, dan biarkan otak
                      Anda beristirahat secara berkala untuk menjaga ketajaman
                      mental.
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Pilih Tugas",
                    desc: "Tentukan satu tugas spesifik yang ingin Anda selesaikan sekarang.",
                  },
                  {
                    icon: Flame,
                    title: "Fokus 25 Menit",
                    desc: "Bekerja dengan konsentrasi penuh hingga timer alarm berbunyi.",
                  },
                  {
                    icon: Zap,
                    title: "Istirahat 5 Menit",
                    desc: "Berdiri, minum air, atau lakukan peregangan singkat.",
                  },
                  {
                    icon: Clock,
                    title: "Istirahat Panjang",
                    desc: "Setelah 4 sesi pomodoro, ambil istirahat lebih lama (15-30 mnt).",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C17A3A]/30 transition-all group"
                  >
                    <step.icon className="w-8 h-8 text-[#C17A3A] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-bold font-heading text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Benefits Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Mengapa Teknik Ini Berhasil?
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                  <div className="space-y-6">
                    <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-90">
                      Pomodoro membantu Anda mengatasi prokrastinasi dan
                      kelelahan mental dengan memberikan struktur yang jelas
                      pada hari kerja Anda.
                    </p>
                    <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Mencegah Burnout:</strong> Istirahat rutin
                          menjaga energi Anda tetap stabil sepanjang hari.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Melatih Fokus:</strong> Membiasakan otak untuk
                          berkonsentrasi dalam blok waktu tertentu.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Kesadaran Waktu:</strong> Memberikan gambaran
                          nyata berapa banyak waktu yang dihabiskan untuk suatu
                          tugas.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[300px] aspect-square">
                      <div className="absolute inset-0 bg-[#C17A3A] blur-[60px] opacity-20 animate-pulse" />
                      <div className="relative z-10 w-full h-full border-4 border-[#C17A3A]/20 rounded-full flex flex-col items-center justify-center p-8 text-center bg-[#1A0E07]/40 backdrop-blur-xl">
                        <span className="text-4xl font-black font-heading text-[#C17A3A]">
                          4:1
                        </span>
                        <span className="text-xs font-bold text-white tracking-widest uppercase mt-2">
                          Rasio Fokus
                        </span>
                        <p className="text-[10px] text-[#EDE0D0] opacity-60 mt-4 leading-relaxed italic">
                          "Empat sesi kerja singkat diselingi istirahat, diikuti
                          oleh satu istirahat panjang."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath="/produktivitas/pomodoro"
        categoryId="produktivitas"
      />
    </div>
  );
}
