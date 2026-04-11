"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useOneRM } from "@/features/satu-rm/hooks/useOneRM";
import { OneRMForm } from "@/features/satu-rm/components/OneRMForm";
import { OneRMResultView } from "@/features/satu-rm/components/OneRMResult";
import { Info, CheckCircle2, TrendingUp, Target, Zap } from "lucide-react";

export default function OneRepMaxCalculator() {
  const hook = useOneRM();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator 1RM" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator One Rep Max (1RM)
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Estimasi Kekuatan Angkat Beban Maksimum Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Input Form */}
        <OneRMForm hook={hook} />
        {/* Right: Results */}
        <div className="lg:col-span-7 h-full">
          <OneRMResultView result={hook.result} />
        </div>
      </div>

      {/* Informational Content Section */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          {/* Background Decorators */}
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
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

          <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Kekuatan & Performa
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami One Rep Max (1RM)
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                One Rep Max adalah fondasi ilmiah dari semua program pelatihan
                kekuatan yang terstruktur. Dengan mengetahui 1RM Anda, setiap
                sesi latihan bisa diprogram secara presisi—bukan sekadar
                tebakan.
              </p>

              {/* Pull Quote */}
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Melakukan tes 1RM langsung bisa berisiko cedera, terutama
                    tanpa spotter berpengalaman. Rumus estimasi matematis hadir
                    sebagai solusi yang lebih aman dan dapat diandalkan.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Kalkulator ini mendukung tiga rumus terpercaya—Epley,
                    Brzycki, dan Lombardi—serta menyajikan tabel latihan
                    persentase 1RM agar Anda bisa langsung merancang sesi
                    pelatihan tanpa perlu menghitung manual.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Formula Breakdown */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Tiga Rumus yang Didukung
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Epley */}
                <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C17A3A]/10 rounded-full blur-xl" />
                  <div className="relative mb-3">
                    <span className="text-xs font-bold text-[#FFF3E0] font-mono bg-[#C17A3A]/25 px-2.5 py-1 rounded-full">
                      Epley
                    </span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-xl px-3 py-2 mb-3 border border-[#C17A3A]/20">
                    <span className="font-mono text-sm text-[#FFF3E0] font-bold">
                      1RM = W × (1 + r/30)
                    </span>
                  </div>
                  <p className="text-[#FFF3E0]/80 text-sm font-body leading-relaxed">
                    Formula paling umum digunakan. Sangat serbaguna dan cocok
                    sebagai referensi utama untuk berbagai jenis latihan dan
                    level kemampuan.
                  </p>
                </div>

                {/* Brzycki */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className="relative mb-3">
                    <span className="text-xs font-bold text-[#EDE0D0] font-mono bg-white/10 px-2.5 py-1 rounded-full">
                      Brzycki
                    </span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-xl px-3 py-2 mb-3 border border-white/10">
                    <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                      1RM = W × 36/(37−r)
                    </span>
                  </div>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Terbukti memberikan presisi lebih tinggi pada set dengan
                    repetisi rendah (1–6). Ideal untuk powerlifter dan atlet
                    kekuatan murni.
                  </p>
                </div>

                {/* Lombardi */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className="relative mb-3">
                    <span className="text-xs font-bold text-[#EDE0D0] font-mono bg-white/10 px-2.5 py-1 rounded-full">
                      Lombardi
                    </span>
                  </div>
                  <div className="bg-[#1A0E07]/60 rounded-xl px-3 py-2 mb-3 border border-white/10">
                    <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                      1RM = W × r^0.1
                    </span>
                  </div>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Dirancang untuk memproyeksikan kekuatan pada set repetisi
                    menengah hingga tinggi, di mana rumus lain cenderung
                    over-estimasi.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Cara Menggunakan 1RM */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Cara Mengintegrasikan 1RM ke Program Latihan
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                <div>
                  <h5 className="font-bold text-xl text-white mb-5">
                    Tabel Persentase sebagai Panduan
                  </h5>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                    Setelah Anda mengetahui estimasi 1RM, gunakan persentase
                    berikut untuk merancang program yang terstruktur berdasarkan
                    tujuan latihan Anda:
                  </p>
                  <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span>
                        <strong>85–100% 1RM (1–5 reps):</strong> Zona kekuatan
                        murni. Melatih sistem saraf pusat dan rekrutmen motor
                        unit.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span>
                        <strong>70–85% 1RM (6–10 reps):</strong> Zona
                        hipertrofi. Optimal untuk membangun volume dan massa
                        otot.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>60–70% 1RM (10–15 reps):</strong> Zona daya
                        tahan otot. Tepat untuk mengembangkan kapasitas aerobik
                        lokal.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                    <h5 className="font-bold text-sm text-[#C17A3A] uppercase tracking-widest mb-4">
                      Tips Akurasi Hasil
                    </h5>
                    <ul className="space-y-3 font-body text-[#F5EDE3] text-sm">
                      <li className="flex gap-2 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] mt-1.5 shrink-0"></div>
                        Gunakan repetisi dalam rentang 1–10 untuk hasil paling
                        akurat.
                      </li>
                      <li className="flex gap-2 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] mt-1.5 shrink-0"></div>
                        Pastikan teknik gerakan benar saat mengumpulkan data
                        untuk kalkulator.
                      </li>
                      <li className="flex gap-2 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A] mt-1.5 shrink-0"></div>
                        Pertimbangkan rata-rata dari beberapa rumus untuk
                        estimasi yang lebih konservatif.
                      </li>
                      <li className="flex gap-2 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59] mt-1.5 shrink-0"></div>
                        Akurasi formula menurun saat repetisi melebihi
                        10—hindari menginput data di atas batas itu.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Manfaat Melacak 1RM */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Mengapa Melacak 1RM Secara Berkala?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <TrendingUp className="w-8 h-8 text-[#C17A3A] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Ukur Progres Nyata
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Perubahan 1RM dari waktu ke waktu adalah indikator
                    terpercaya pertumbuhan kekuatan—lebih objektif dari perasaan
                    atau tampilan fisik semata.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Target className="w-8 h-8 text-[#4A7C59] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Program Lebih Terarah
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Tanpa data 1RM, pemilihan beban latihan cenderung subjektif.
                    Dengan 1RM, setiap sesi bisa diprogramkan secara ilmiah
                    berdasarkan persentase yang tepat.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-8 h-8 text-[#9C4A2A] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Tetapkan Target Realistis
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Mengetahui baseline 1RM Anda saat ini memungkinkan penetapan
                    target jangka pendek dan jangka panjang yang challengeable
                    namun dapat dicapai.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">
                  Pertanyaan Umum (FAQ)
                </h3>
                <p className="text-[#EDE0D0] font-body text-sm">
                  Hal-hal yang sering ditanyakan tentang 1RM dan estimasinya.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Rumus mana yang paling akurat?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak ada rumus yang universal &quot;terbaik&quot; untuk
                      semua orang. Epley cocok sebagai titik awal. Brzycki
                      cenderung lebih presisi untuk repetisi rendah. Lombardi
                      lebih stabil pada repetisi tinggi. Untuk hasil paling
                      konservatif, bandingkan rata-rata ketiganya.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Apakah 1RM sama untuk semua gerakan latihan?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak. 1RM bersifat spesifik per gerakan. 1RM bench press
                      Anda akan sangat berbeda dari 1RM squat. Selalu hitung per
                      latihan secara terpisah agar perencanaan program lebih
                      akurat.
                    </p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Seberapa sering saya harus mengukur 1RM?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Untuk atlet natural, estimasi 1RM bisa di-update setiap
                      4–8 minggu—selaras dengan siklus deload atau akhir blok
                      pelatihan. Jangan terlalu sering melakukan tes, karena
                      overhead-nya tinggi bagi sistem saraf.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Apakah hasil ini bisa menggantikan tes langsung?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Kalkulator ini memberikan estimasi yang sangat berguna
                      untuk perencanaan, namun bukan pengganti tes 1RM langsung.
                      Hasil aktual Anda mungkin sedikit berbeda, tergantung
                      faktor teknis, kondisi tubuh, dan pengalaman latihan.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#C17A3A]/40 text-center max-w-3xl mx-auto shadow-inner mt-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#C17A3A]/5 pointer-events-none" />
              <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">
                Bangun Program Latihan yang Lebih Cerdas
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed relative z-10">
                Kombinasikan data 1RM Anda dengan alat lainnya di
                NusantaraTools—Kalkulator Kalori untuk memastikan energi cukup,
                dan Kalkulator Air untuk pemulihan yang optimal. Kekuatan sejati
                dibangun di atas fondasi holistik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/1rm" categoryId="kesehatan" />
    </div>
  );
}
