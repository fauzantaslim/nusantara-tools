"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { useOvulation } from "@/features/masa-subur/hooks/useOvulation";
import { OvulationForm } from "@/features/masa-subur/components/OvulationForm";
import { OvulationResult } from "@/features/masa-subur/components/OvulationResult";
import {
  Activity,
  HeartPulse,
  ShieldAlert,
  Droplet,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

export default function MasaSuburCalculator() {
  const hook = useOvulation();

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
        <OvulationForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <OvulationResult hook={hook} />
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
                    &quot;Pemetaan siklus masa reproduksi modern menghadirkan
                    kendali penuh bagi perempuan dalam navigasi kesehatan
                    holistik mereka.&quot;
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
                      <div className="flex flex-col items-center gap-6 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-[#C17A3A]/20 border border-[#C17A3A] flex items-center justify-center animate-pulse">
                          <HeartPulse className="w-12 h-12 text-[#C17A3A]" />
                        </div>
                        <div className="text-center space-y-2">
                          <h4 className="font-heading font-bold text-xl text-white">
                            Pelacak Ovulasi Presisi
                          </h4>
                          <p className="text-[#EDE0D0]/70 text-sm max-w-[240px]">
                            Gunakan alat ini untuk memetakan hari-hari paling
                            subur Anda bulan ini.
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
      </div>

      <RelatedTools
        currentPath="/kesehatan/masa-subur"
        categoryId="kesehatan"
      />
    </div>
  );
}
