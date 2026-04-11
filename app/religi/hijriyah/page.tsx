"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useHijri } from "@/features/hijriyah/hooks/useHijri";
import { HijriForm } from "@/features/hijriyah/components/HijriForm";
import { HijriResult } from "@/features/hijriyah/components/HijriResult";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function HijriyahPage() {
  const hook = useHijri();

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

      <div className="flex flex-col gap-8 relative my-4 w-full">
        <HijriForm hook={hook} />
        <HijriResult hook={hook} />
      </div>

      {/* SEKSI EDUKASI & INFORMASI */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          {/* Background Decorators */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-[0.08] translate-y-1/2 -translate-x-1/3" />
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
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block font-ui">
                Eksplorasi Kalender Syamsiah & Qamariyah
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Harmonisasi Dua Rotasi Langit
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Alat konversi presisi ini dibuat sebagai kalkulator saintifik
                transisi kalender berdasarkan putaran lunar bumi (Bulan) dan
                orbit eliptikal (Matahari).
              </p>
            </div>

            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">
              {/* 1. Masehi VS Hijri */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold font-ui">
                    1
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Kalender Syamsiah vs Qamariyah
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
                  <div className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#C17A3A]/30 transition-all duration-300">
                    <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mb-4">
                      <span className="text-2xl">☀️</span>
                      <h4 className="font-heading font-bold text-[#E8F5E9] text-xl">
                        Solar Cycle (Masehi)
                      </h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] text-sm opacity-90">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] shrink-0" />
                        <span>
                          <strong>Durasi:</strong> Sekitar 365.25 hari per tahun
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] shrink-0" />
                        <span>
                          <strong>Metode:</strong> Mengikuti orbit bumi terhadap
                          matahari
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#4A7C59]/10 rounded-3xl p-6 sm:p-8 border border-[#4A7C59]/30 hover:bg-[#4A7C59]/20 transition-all duration-300">
                    <div className="flex items-center gap-3 w-full border-b border-white/10 pb-4 mb-4">
                      <span className="text-2xl">🌙</span>
                      <h4 className="font-heading font-bold text-white text-xl">
                        Lunar Cycle (Hijriyah)
                      </h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] text-sm opacity-90">
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] shrink-0" />
                        <span>
                          <strong>Durasi:</strong> Sekitar 354-355 hari per
                          tahun
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] shrink-0" />
                        <span>
                          <strong>Metode:</strong> Mengacu pada fase revolusi
                          hilal/bulan
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 2. Hari Awal */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold font-ui">
                    2
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Batasan Hari Jatuh Tempo
                  </h3>
                </div>
                <div className="bg-[#1A0E07]/40 border border-[#C17A3A]/30 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row gap-8 items-center shadow-inner">
                  <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 text-[#C17A3A] shrink-0">
                    <RotateCcw className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-4 font-body">
                    <h4 className="text-xl font-bold text-[#E8F5E9] font-heading">
                      Kapan Kalender Memulai &quot;Besok&quot;?
                    </h4>
                    <p className="text-sm leading-relaxed text-[#EDE0D0] opacity-90">
                      Hari pada <strong>Masehi</strong> berganti administratif
                      pada titik <strong>00:00 (Tengah Malam)</strong>.
                      Sebaliknya, kalender <strong>Hijriyah</strong> berganti
                      hari persis saat Matahari terbenam (Adzan Maghrib).
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#1A0E07]/60 p-8 sm:p-12 rounded-[2.5rem] border border-[#9C4A2A]/40 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="flex flex-col items-center gap-6">
                <AlertTriangle className="w-10 h-10 text-[#9C4A2A] animate-pulse" />
                <div className="flex flex-col gap-4">
                  <h4 className="font-heading font-extrabold text-[#FFF0EB] text-xl uppercase tracking-wider">
                    Disclaimer Hisab & Rukyah
                  </h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                    NusantaraTools menggunakan modul konversi tabular matematis
                    (Umm al-Qura). Untuk penetapan ibadah krusial seperti
                    Ramadan/Idul Fitri di Indonesia, senantiasa merujuk pada
                    penetapan sidang{" "}
                    <strong>Isbat Kemenag RI (Rukyatul Hilal)</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/religi/hijriyah" categoryId="religi" />
    </div>
  );
}
