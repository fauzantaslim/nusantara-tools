"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useBMI } from "@/features/bmi/hooks/useBMI";
import { BMIForm } from "@/features/bmi/components/BMIForm";
import { BMIResult_ } from "@/features/bmi/components/BMIResult";
import { Info, CheckCircle2 } from "lucide-react";

export default function BMICalculator() {
  const bmiHook = useBMI();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator BMI" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator BMI Ideal
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Asesmen tubuh komprehensif
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <BMIForm bmiHook={bmiHook} />
        {/* Right Side: Result Display */}
        <div className="lg:col-span-7 h-full">
          <BMIResult_ result={bmiHook.result} />
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
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />

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
                  Edukasi Kesehatan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Indeks Massa Tubuh
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Hasil kalkulator BMI bukanlah vonis akhir, melainkan titik
                  awal untuk mengenali kondisi tubuh Anda dan menentukan target
                  kesehatan yang lebih baik.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm max-w-2xl mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug text-center sm:text-left">
                    &quot;Menjaga berat badan ideal adalah bentuk investasi
                    jangka panjang untuk kualitas hidup Anda.&quot;
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Cara Membaca Hasil */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Kategori BMI
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Kurus */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-sm font-bold text-[#EDE0D0] font-mono bg-white/10 px-3 py-1 rounded-full">
                          &lt; 18.5
                        </span>
                      </div>
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Kekurangan
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Berat badan di bawah normal. Pertimbangkan untuk
                        meningkatkan asupan kalori bernutrisi.
                      </p>
                    </div>

                    {/* Normal */}
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A7C59]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#E8F5E9] font-mono bg-[#4A7C59]/30 px-3 py-1 rounded-full shadow-sm border border-[#4A7C59]/20">
                          18.5 – 24.9
                        </span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#E8F5E9] mb-2">
                        Normal Ideal
                      </h4>
                      <p className="relative text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        Rentang optimal. Pertahankan pola makan seimbang dan
                        aktivitas fisik.
                      </p>
                    </div>

                    {/* Berlebih */}
                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17A3A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF3E0] font-mono bg-[#C17A3A]/30 px-3 py-1 rounded-full shadow-sm border border-[#C17A3A]/20">
                          25 – 29.9
                        </span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF3E0] mb-2">
                        Berlebih
                      </h4>
                      <p className="relative text-[#FFF3E0]/80 font-body text-sm leading-relaxed">
                        Beresiko bagi kesehatan. Mulai kurangi kalori harian dan
                        tingkatkan olahraga.
                      </p>
                    </div>

                    {/* Obesitas */}
                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C4A2A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF0EB] font-mono bg-[#9C4A2A]/30 px-3 py-1 rounded-full shadow-sm border border-[#9C4A2A]/20">
                          ≥ 30
                        </span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF0EB] mb-2">
                        Obesitas
                      </h4>
                      <p className="relative text-[#FFF0EB]/80 font-body text-sm leading-relaxed">
                        Berada di level bahaya. Sangat disarankan untuk
                        berkonsultasi dengan ahli medis profesional.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Rumus & Metode */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Metodologi
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-[#EDE0D0] font-body leading-relaxed text-lg mb-4 opacity-90">
                        Kalkulator ini menggunakan formula standar WHO yang
                        diakui secara global, dikalibrasi ulang untuk standar
                        BMI metrik Asia-Pasifik.
                      </p>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            Mendukung sistem <strong>Metrik (kg/cm)</strong>.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            Mendukung sistem <strong>Imperial (lb/ft)</strong>.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1A0E07] p-6 rounded-2xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      <h5 className="font-bold text-sm text-surface uppercase tracking-widest mb-4 relative z-10">
                        Formula Kalkulasi
                      </h5>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex items-center justify-center mb-3 border border-[#7A5C42]/40 relative z-10 shadow-inner">
                        <span className="font-mono font-bold text-lg text-[#F5EDE3] tracking-wide">
                          BMI = kg / m²
                        </span>
                      </div>
                      <p className="text-xs text-surface font-body text-center mt-2 relative z-10">
                        (Atau `(lb × 703) / inch²` untuk sistem imperial)
                      </p>
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
                      Batasan Akurasi
                    </h3>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-[2rem] space-y-6 backdrop-blur-sm">
                    <p className="text-lg font-body text-[#F5EDE3] leading-relaxed">
                      Meskipun luas digunakan,{" "}
                      <strong>BMI bukanlah ukuran yang sempurna</strong>. Metode
                      ini tidak secara langsung mengukur persentase lemak tubuh
                      dan bisa jadi kurang akurat untuk:
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 focus-within:ring-2 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#C17A3A] pl-3">
                          Atlet
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Massa otot yang berat dapat menghasilkan BMI yang
                          tinggi.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#4A7C59] pl-3">
                          Lansia
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Cenderung kehilangan massa otot seiring bertambahnya
                          usia.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#9C4A2A] pl-3">
                          Anak-anak
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Harus menggunakan persentil umur dan jenis kelamin
                          khusus.
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

      <RelatedTools currentPath="/kesehatan/bmi" categoryId="kesehatan" />
    </div>
  );
}
