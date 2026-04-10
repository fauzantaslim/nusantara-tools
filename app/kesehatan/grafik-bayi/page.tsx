"use client";

import React from "react";
import { Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useGrafikBayi } from "@/features/grafik-bayi/hooks/useGrafikBayi";
import { GrafikBayiForm } from "@/features/grafik-bayi/components/GrafikBayiForm";
import { GrafikBayiResult } from "@/features/grafik-bayi/components/GrafikBayiResult";
import { GrafikBayiHistory } from "@/features/grafik-bayi/components/GrafikBayiHistory";

export default function GrafikBayiCalculator() {
  const hook = useGrafikBayi();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Grafik Pertumbuhan Bayi" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Grafik Pertumbuhan Bayi
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Pantau Pertumbuhan Si Kecil Berdasarkan Standar WHO
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <GrafikBayiForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <GrafikBayiResult hook={hook} />
        </div>
      </div>

      {/* History */}
      <GrafikBayiHistory hook={hook} />

      {/* Educational Section */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Pertumbuhan & Pediatri
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami Grafik Pertumbuhan Bayi
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                Grafik pertumbuhan bukan hanya angka—ia adalah narasi visual
                tentang kesehatan dan perkembangan si kecil dari waktu ke waktu.
                Memahami cara membacanya membekali Anda untuk berdiskusi lebih
                cerdas bersama dokter anak.
              </p>
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Standar WHO didasarkan pada data anak-anak sehat dari enam
                    negara—Brazil, Ghana, India, Norwegia, Oman, dan Amerika
                    Serikat—yang dibesarkan dalam kondisi optimal.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Kalkulator ini menggunakan metode LMS WHO untuk menghitung
                    Z-score dan persentil secara akurat. Tren pertumbuhan lebih
                    bermakna dari satu pengukuran tunggal.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Persentil & Z-score */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Membaca Persentil & Z-score
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                <div>
                  <h5 className="font-bold text-xl text-white mb-4">
                    Apa itu Persentil?
                  </h5>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed mb-4 opacity-90">
                    Persentil menunjukkan bagaimana pengukuran bayi Anda
                    dibandingkan dengan 100 bayi sehat lain dengan usia dan
                    jenis kelamin yang sama. Persentil ke-50 berarti tepat di
                    tengah distribusi.
                  </p>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed opacity-90">
                    Tidak ada persentil "terbaik"—yang penting adalah{" "}
                    <strong>konsistensi dan tren</strong>. Bayi yang stabil di
                    persentil ke-10 jauh lebih sehat dari bayi yang tiba-tiba
                    turun dari P70 ke P20.
                  </p>
                </div>
                <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                  <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-4">
                    Interpretasi Z-score
                  </h5>
                  <div className="space-y-3">
                    {[
                      {
                        range: "Z < -3",
                        label: "Sangat Kurang",
                        color: "text-red-400",
                        bg: "bg-red-900/20",
                      },
                      {
                        range: "-3 sampai -2",
                        label: "Di Bawah Normal",
                        color: "text-[#FF8A65]",
                        bg: "bg-[#9C4A2A]/20",
                      },
                      {
                        range: "-2 sampai +2",
                        label: "Normal (WHO)",
                        color: "text-[#4A7C59]",
                        bg: "bg-[#4A7C59]/20",
                      },
                      {
                        range: "+2 sampai +3",
                        label: "Di Atas Normal",
                        color: "text-[#C17A3A]",
                        bg: "bg-[#C17A3A]/20",
                      },
                      {
                        range: "Z > +3",
                        label: "Sangat Tinggi",
                        color: "text-red-400",
                        bg: "bg-red-900/20",
                      },
                    ].map(({ range, label, color, bg }) => (
                      <div
                        key={range}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-xl",
                          bg,
                        )}
                      >
                        <span className="text-xs font-mono text-[#EDE0D0] opacity-80">
                          {range}
                        </span>
                        <span className={cn("text-xs font-bold", color)}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Metode LMS */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Metode Perhitungan LMS
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[#EDE0D0] text-sm font-body leading-relaxed mb-4 opacity-90">
                    WHO menggunakan metode{" "}
                    <strong>LMS (Lambda-Mu-Sigma)</strong> untuk menghitung
                    Z-score yang memperhitungkan distribusi data yang tidak
                    simetris pada anak-anak.
                  </p>
                  <ul className="space-y-3 text-sm font-body text-[#EDE0D0]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>L (Lambda)</strong>: Nilai transformasi Box-Cox
                        untuk mengoreksi skewness data
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>M (Mu)</strong>: Nilai median (persentil ke-50)
                        pada usia tertentu
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        <strong>S (Sigma)</strong>: Koefisien variasi—ukuran
                        sebaran data di sekitar median
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#1A0E07]/60 p-5 rounded-2xl border border-white/10 shadow-inner">
                  <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-4">
                    Rumus Z-score LMS
                  </h5>
                  <div className="space-y-3">
                    <div className="bg-[#2C1A0E] p-3 rounded-xl border border-[#4A7C59]/20">
                      <p className="text-[10px] text-[#EDE0D0] opacity-60 mb-1">
                        Jika L ≠ 0:
                      </p>
                      <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                        Z = ((X/M)^L − 1) / (L × S)
                      </span>
                    </div>
                    <div className="bg-[#2C1A0E] p-3 rounded-xl border border-[#4A7C59]/20">
                      <p className="text-[10px] text-[#EDE0D0] opacity-60 mb-1">
                        Jika L = 0:
                      </p>
                      <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                        Z = ln(X/M) / S
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Bayi Prematur */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Usia Terkoreksi untuk Bayi Prematur
                </h3>
              </div>
              <div className="bg-[#1A0E07]/40 rounded-[2rem] p-6 sm:p-8 border border-[#7A5C42]/30 shadow-sm">
                <p className="text-[#EDE0D0] text-sm font-body leading-relaxed mb-4 opacity-90">
                  Bayi yang lahir sebelum 37 minggu kehamilan memiliki pola
                  perkembangan berbeda. <strong>Usia terkoreksi</strong>{" "}
                  dihitung untuk membandingkan pertumbuhan mereka secara lebih
                  adil:
                </p>
                <div className="bg-[#2C1A0E] p-4 rounded-xl border border-[#4A7C59]/20 mb-4">
                  <span className="font-mono text-sm text-[#F5EDE3] font-bold">
                    Usia Terkoreksi = Usia Kronologis − (40 − Minggu Gestasi)
                  </span>
                </div>
                <p className="text-[#EDE0D0] text-xs font-body leading-relaxed opacity-80">
                  Contoh: Bayi berusia 6 bulan yang lahir di 32 minggu → Usia
                  terkoreksi = 6 − (40−32)/4.3 ≈ 4.1 bulan. Koreksi usia umumnya
                  dilakukan hingga anak berusia 2 tahun.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold font-heading text-white mb-3">
                  Pertanyaan Umum (FAQ)
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                      Apakah persentil rendah selalu jadi masalah?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak selalu. Yang paling penting adalah konsistensi tren.
                      Bayi yang terus tumbuh mengikuti kurvanya sendiri—meski di
                      P5 sekalipun—biasanya sehat. Masalah muncul saat ada
                      penurunan tren yang signifikan antar pengukuran.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                      Seberapa sering saya harus mengukur?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      WHO merekomendasikan pemantauan di kunjungan rutin: setiap
                      bulan pada 6 bulan pertama, setiap 2 bulan dari 6–12
                      bulan, lalu setiap 3–6 bulan setelahnya. Konsultasikan
                      jadwal yang tepat dengan dokter anak Anda.
                    </p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Bisakah saya mengandalkan kalkulator ini untuk diagnosis?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Tidak. Alat ini bersifat informatif dan edukatif semata.
                      Diagnosis pertumbuhan membutuhkan evaluasi klinis
                      menyeluruh oleh dokter anak yang mempertimbangkan riwayat
                      dan konteks kesehatan anak secara lengkap.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Sampai usia berapa kalkulator ini berlaku?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Kalkulator ini menggunakan referensi WHO untuk usia 0–60
                      bulan (5 tahun). Di luar rentang ini, standar yang berlaku
                      berbeda dan kalkulator ini tidak lagi akurat.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#4A7C59]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-[#4A7C59]/5 pointer-events-none" />
              <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">
                Setiap Pengukuran Adalah Cerita
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed relative z-10">
                Gunakan tombol "Simpan Pengukuran" setelah setiap sesi untuk
                membangun rekam jejak pertumbuhan si kecil. Data yang
                terdokumentasi baik adalah aset berharga dalam setiap kunjungan
                ke dokter anak.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath="/kesehatan/grafik-bayi"
        categoryId="kesehatan"
      />
    </div>
  );
}
