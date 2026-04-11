"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { useBloodPressure } from "@/features/tekanan-darah/hooks/useBloodPressure";
import { BloodPressureForm } from "@/features/tekanan-darah/components/BloodPressureForm";
import { BloodPressureResult } from "@/features/tekanan-darah/components/BloodPressureResult";
import { BloodPressureHistory } from "@/features/tekanan-darah/components/BloodPressureHistory";
import {
  Stethoscope,
  Droplet,
  HeartPulse,
  Activity,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function TekananDarahPage() {
  const hook = useBloodPressure();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Tekanan Darah" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Tekanan Darah
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Analisis & Pantau Kesehatan Kardiovaskular Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <BloodPressureForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <BloodPressureResult hook={hook} />
        </div>
      </div>

      {/* History Section */}
      <BloodPressureHistory hook={hook} />

      {/* Informational Content Section (Premium Dark Layout) */}
      <div className="mt-16 mb-24">
        <div className="relative">
          {/* Main Container - Dark Theme (Tanah Tua) */}
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Effects Wrapper */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-[0.08] translate-y-1/2 -translate-x-1/3" />
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay transition-opacity"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block font-ui">
                  Edukasi Kesehatan Kardiovaskular
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Tekanan Darah Anda
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Tekanan darah adalah tanda vital paling informatif yang bisa
                  Anda pantau sendiri di rumah. Memahami arti angka-angka ini
                  adalah langkah pertama untuk menjaga kesehatan jantung jangka
                  panjang.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner max-w-2xl mx-auto">
                  <Stethoscope className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Hipertensi sering disebut &quot;silent killer&quot; karena
                      biasanya tidak menimbulkan gejala hingga komplikasi serius
                      sudah terjadi.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80 leading-relaxed">
                      Pemantauan rutin di rumah—dikombinasikan dengan catatan
                      riwayat yang baik—adalah cara paling efektif untuk
                      mendeteksi pola berbahaya sebelum terlambat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Kategori */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold font-ui">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Kategori Kedaruratan (AHA)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-2xl bg-blue-900/10 border border-blue-500/20 hover:border-blue-500/40 transition-colors flex flex-col justify-between group">
                      <Droplet className="w-6 h-6 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Hipotensi
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Tekanan di bawah normal (&lt;90/60). Dapat menyebabkan
                        pusing, lemas, hingga pingsan jika oksigen ke otak
                        berkurang.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/20 hover:border-[#4A7C59]/40 transition-colors flex flex-col justify-between group">
                      <CheckCircle2 className="w-6 h-6 text-[#4A7C59] mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Normal
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Kondisi jantung paling prima (&lt;120/80). Cukup
                        pertahankan gaya hidup sehat dan pola makan seimbang.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/20 hover:border-[#9C4A2A]/40 transition-colors flex flex-col justify-between group">
                      <Activity className="w-6 h-6 text-[#9C4A2A] mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Pre-Hipertensi
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Sinyal peringatan dini (120-139/80-89). Mulailah kurangi
                        asupan garam dan perbaiki jam tidur Anda.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-red-900/10 border border-red-500/20 hover:border-red-500/40 transition-colors flex flex-col justify-between group">
                      <ShieldAlert className="w-6 h-6 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Hipertensi
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Tekanan persisten tinggi (&gt;140/90). Risiko stroke dan
                        serangan jantung meningkat. Segera konsultasi medis.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Tips Pengukuran */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold font-ui">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Prinsip Pengukuran Akurat
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <p className="text-[#EDE0D0] font-body leading-relaxed text-lg opacity-95">
                        Posisi tubuh saat melakukan tensi sangat mempengaruhi
                        validitas angka yang muncul pada alat. Ikuti langkah
                        berikut:
                      </p>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Dukungan Lengan:</strong> Pastikan lengan
                            berada setinggi jantung, relaks di atas meja atau
                            sandaran.
                          </span>
                        </li>
                        <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Masa Tenang:</strong> Istirahatlah dalam
                            posisi duduk diam minimal 5 menit sebelum
                            pengukuran.
                          </span>
                        </li>
                        <li className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10 group">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Hindari Stimulan:</strong> Jangan minum
                            kopi, merokok, atau berolahraga 30 menit sebelumnya.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1A0E07] p-8 rounded-3xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden flex items-center justify-center min-h-[300px]">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-accent-1)_0%,_transparent_70%)]" />
                      <div className="flex flex-col items-center gap-6 relative z-10">
                        <div className="w-24 h-24 rounded-full bg-[#C17A3A]/20 border border-[#C17A3A] flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(193,122,58,0.2)]">
                          <HeartPulse className="w-12 h-12 text-[#C17A3A]" />
                        </div>
                        <div className="text-center space-y-2">
                          <h4 className="font-heading font-bold text-xl text-white">
                            Monitoring Berkala
                          </h4>
                          <p className="text-[#EDE0D0]/70 text-sm max-w-[240px] font-body leading-relaxed">
                            Lacak riwayat tensi Anda setiap pagi & malam untuk
                            mendeteksi tren kesehatan jantung.
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
        currentPath="/kesehatan/tekanan-darah"
        categoryId="kesehatan"
      />
    </div>
  );
}
