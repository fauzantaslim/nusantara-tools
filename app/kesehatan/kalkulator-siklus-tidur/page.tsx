"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useSleep } from "@/features/tidur/hooks/useSleep";
import { SleepForm } from "@/features/tidur/components/SleepForm";
import { SleepResult } from "@/features/tidur/components/SleepResult";
import { Info, CheckCircle2, Zap } from "lucide-react";

export default function SleepCyclePage() {
  const hook = useSleep();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Siklus Tidur" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Siklus Tidur
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Temukan Waktu Tidur & Bangun Paling Optimal
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <SleepForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <SleepResult hook={hook} />
        </div>
      </div>

      {/* Informational Content Section */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-[0.08] translate-y-1/2 -translate-x-1/3" />
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block font-ui">
                  Edukasi Kesehatan & Istirahat
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Siklus Tidur Anda
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Tidur bukan sekadar periode tanpa kesadaran—ia adalah proses
                  kompleks yang terstruktur dalam siklus berulang, masing-masing
                  berlangsung sekitar 90 menit, di mana otak dan tubuh Anda
                  menjalani pemulihan mendalam yang tidak bisa digantikan.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Rahasia tidur yang menyegarkan bukan hanya tentang{" "}
                      <em>berapa lama</em> Anda tidur, melainkan <em>kapan</em>{" "}
                      Anda bangun dalam konteks siklus alami tubuh Anda.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80 leading-relaxed">
                      Kalkulator ini membantu Anda memproyeksikan waktu bangun
                      atau tidur yang paling optimal berdasarkan prinsip siklus
                      sirkadian standar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Tahap Siklus Tidur */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold font-ui">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Tahapan dalam Setiap Siklus Tidur
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                      <div className="flex flex-col gap-4">
                        <div className="text-xs font-bold bg-[#4A7C59]/20 text-[#4A7C59] px-2.5 py-1 rounded-full w-fit font-mono">
                          N1
                        </div>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Transisi Awal
                        </h4>
                        <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                          Fase antara terjaga dan tidur. Stimulus kecil mudah
                          membangunkan Anda.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                      <div className="flex flex-col gap-4">
                        <div className="text-xs font-bold bg-[#4A7C59]/20 text-[#4A7C59] px-2.5 py-1 rounded-full w-fit font-mono">
                          N2
                        </div>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Pemulihan Ringan
                        </h4>
                        <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                          Sistem saraf mulai mengkonsolidasi memori jangka
                          pendek.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                      <div className="flex flex-col gap-4">
                        <div className="text-xs font-bold bg-[#4A7C59]/20 text-[#4A7C59] px-2.5 py-1 rounded-full w-fit font-mono">
                          N3
                        </div>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Tidur Dalam
                        </h4>
                        <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                          Fase paling restoratif untuk fisik, perbaikan
                          jaringan, dan imunitas.
                        </p>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                      <div className="flex flex-col gap-4">
                        <div className="text-xs font-bold bg-[#C17A3A]/20 text-[#C17A3A] px-2.5 py-1 rounded-full w-fit font-mono">
                          REM
                        </div>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Fase Mimpi
                        </h4>
                        <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                          Vital untuk regulasi emosi dan kapasitas belajar
                          kognitif.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Inersia Tidur */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold font-ui">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Inersia Tidur & Cara Hindarinya
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30">
                    <div className="flex flex-col gap-6">
                      <p className="text-[#EDE0D0] font-body text-base leading-relaxed opacity-95">
                        Pernahkah Anda bangun dalam keadaan sangat mengantuk?
                        Itulah <strong>sleep inertia</strong>—kondisi grogi
                        akibat bangun di tengah siklus dalam (N3).
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            Bangun di <strong>akhir siklus</strong> (tidur
                            ringan) meminimalkan rasa pening secara drastis.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            Mendapatkan <strong>5–6 siklus</strong> (7,5–9 jam)
                            sangat disarankan untuk performa kognitif.
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="bg-[#2C1A0E] p-6 rounded-2xl border border-white/10 shadow-inner flex items-center gap-5 group">
                        <div className="w-12 h-12 rounded-full bg-[#4A7C59]/10 border border-[#4A7C59]/30 flex items-center justify-center shrink-0">
                          <Zap className="w-6 h-6 text-[#4A7C59]" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wider font-ui">
                            Strategi Bangun
                          </h4>
                          <p className="text-xs text-[#EDE0D0]/60">
                            Gunakan kalkulator ini untuk menyesuaikan alarm Anda
                            dengan siklus 90 menit tubuh.
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

      <RelatedTools currentPath="/kesehatan/tidur" categoryId="kesehatan" />
    </div>
  );
}
