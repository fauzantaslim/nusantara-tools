"use client";

import React from "react";
import { Info, CheckCircle2, ShieldAlert } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useCalorie } from "@/features/kalori/hooks/useCalorie";
import { CalorieForm } from "@/features/kalori/components/CalorieForm";
import { CalorieResult } from "@/features/kalori/components/CalorieResult";

export default function CalorieCalculator() {
  const hook = useCalorie();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Kalori Harian" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Kalori Harian
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Hitung kebutuhan energi harian, TDEE, & makronutrien
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <CalorieForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <CalorieResult hook={hook} />
        </div>
      </div>

      {/* Educational Section */}
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
                  Memahami Kebutuhan Kalori
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Kebutuhan kalori harian Anda tergantung pada beberapa faktor
                  termasuk usia, jenis kelamin, tinggi badan, berat badan,
                  komposisi tubuh, dan tingkat aktivitas.
                </p>

                {/* Pull Quote Box / Ikhtisar */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Kalkulator kalori ini membantu memperkirakan kebutuhan
                      kalori harian Anda berdasarkan ukuran tubuh, tingkat
                      aktivitas, dan tujuan kebugaran Anda.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body">
                      Ini memberi Anda gambaran tentang berapa banyak kalori
                      yang harus Anda konsumsi per hari untuk mempertahankan,
                      menurunkan, atau menambah berat badan. Apakah Anda
                      bertujuan untuk mengurangi lemak, menambah otot, atau
                      hanya mempertahankan berat badan Anda, alat ini dapat
                      membimbing pilihan nutrisi Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Komponen Utama */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Komponen Utama
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        Laju Metabolisme Basal (BMR)
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Kalori yang dibutuhkan tubuh Anda untuk fungsi dasar
                        biologis saat beristirahat.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between">
                      <h4 className="text-xl font-bold font-heading text-[#E8F5E9] mb-2">
                        Total Pengeluaran Energi Harian (TDEE)
                      </h4>
                      <p className="text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        BMR ditambah kalori yang dibakar melalui aktivitas fisik
                        harian dan olahraga.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between">
                      <h4 className="text-xl font-bold font-heading text-[#FFF3E0] mb-2">
                        Makronutrien Khusus
                      </h4>
                      <p className="text-[#FFF3E0]/80 font-body text-sm leading-relaxed">
                        Protein, karbohidrat, dan lemak yang menyediakan dasar
                        kalori dan nutrisi untuk tubuh.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Metode & Rumus */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Bagaimana Kalkulator Bekerja
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h5 className="font-bold text-lg text-white mb-4">
                        Metode Perhitungan BMR
                      </h5>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm md:text-base">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Persamaan Mifflin-St Jeor:</strong> Dianggap
                            paling akurat untuk sebagian besar orang (Default
                            yang kami gunakan).
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Persamaan Harris-Benedict:</strong> Salah
                            satu rumus BMR yang paling awal dan banyak digunakan
                            secara luas.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Rumus Katch-McArdle:</strong>{" "}
                            Memperhitungkan massa tubuh tanpa lemak dan mungkin
                            lebih akurat untuk individu atletik.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1A0E07] p-6 rounded-2xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden flex flex-col gap-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                      <h5 className="font-bold text-sm text-surface uppercase tracking-widest relative z-10">
                        Rumus Terapan (Mifflin)
                      </h5>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex flex-col gap-2 border border-[#7A5C42]/40 relative z-10 shadow-inner">
                        <p className="text-xs text-[#C17A3A] font-bold">
                          Pria:
                        </p>
                        <span className="font-mono text-sm text-[#F5EDE3]">
                          BMR = (10 × kg) + (6.25 × cm) - (5 × usia) + 5
                        </span>
                      </div>

                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex flex-col gap-2 border border-[#7A5C42]/40 relative z-10 shadow-inner mt-2">
                        <p className="text-xs text-[#C17A3A] font-bold">
                          Wanita:
                        </p>
                        <span className="font-mono text-sm text-[#F5EDE3]">
                          BMR = (10 × kg) + (6.25 × cm) - (5 × usia) - 161
                        </span>
                      </div>

                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex flex-col gap-2 border border-[#7A5C42]/40 relative z-10 shadow-inner mt-2">
                        <p className="text-xs text-[#4A7C59] font-bold">
                          TDEE & Penyesuaian Kalori:
                        </p>
                        <span className="font-mono text-xs text-[#F5EDE3]">
                          TDEE = BMR × Faktor Aktivitas
                        </span>
                        <span className="font-mono text-xs text-[#F5EDE3]">
                          Perubahan kalori = (7700 × kg/minggu) / 7
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Keseimbangan Makro & Manajemen */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Makronutrien & Manajemen
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Makronutrien */}
                    <div className="bg-[#1A0E07]/40 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <h5 className="font-bold text-xl text-white mb-4">
                        Keseimbangan Makronutrien
                      </h5>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex gap-3 items-start border-l-2 border-[#4A7C59] pl-3 py-1">
                          <div className="flex-1">
                            <span className="font-bold text-[#4A7C59] block">
                              Protein (4 kalori/gram)
                            </span>
                            <span className="text-sm opacity-80">
                              Penting untuk perbaikan dan pertumbuhan jaringan
                              otot.
                            </span>
                          </div>
                        </li>
                        <li className="flex gap-3 items-start border-l-2 border-[#C17A3A] pl-3 py-1">
                          <div className="flex-1">
                            <span className="font-bold text-[#C17A3A] block">
                              Karbohidrat (4 kalori/gram)
                            </span>
                            <span className="text-sm opacity-80">
                              Sebagai sumber energi utama bagi tubuh Anda.
                            </span>
                          </div>
                        </li>
                        <li className="flex gap-3 items-start border-l-2 border-[#9C4A2A] pl-3 py-1">
                          <div className="flex-1">
                            <span className="font-bold text-[#9C4A2A] block">
                              Lemak (9 kalori/gram)
                            </span>
                            <span className="text-sm opacity-80">
                              Penting untuk produksi hormon dan penyerapan
                              nutrisi.
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Manajemen */}
                    <div className="bg-[#1A0E07]/40 p-6 rounded-[2rem] border border-white/5 space-y-4">
                      <h5 className="font-bold text-xl text-white mb-4">
                        Manajemen Berat Badan
                      </h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-4">
                        Untuk manajemen berat badan Anda dapat memilih salah
                        satu langkah berikut:
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] mb-6">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-surface shrink-0 mt-0.5 opacity-60" />
                          <span>
                            <strong>Pertahankan:</strong> Konsumsi sesuai batas
                            TDEE Anda.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Turunkan berat:</strong> Buat defisit kalori
                            (konsumsi kurang dari TDEE).
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Tingkatkan berat:</strong> Buat surplus
                            kalori (konsumsi lebih dari TDEE).
                          </span>
                        </li>
                      </ul>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl border border-[#7A5C42]/30 flex gap-4 items-start shadow-inner">
                        <ShieldAlert className="w-6 h-6 shrink-0 text-[#C17A3A]" />
                        <p className="text-xs font-medium text-[#F5EDE3]">
                          Kecepatan perubahan berat badan yang aman dan
                          berkelanjutan umumnya adalah 0.5-1 kg (1-2 pon) per
                          minggu.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-2xl font-bold font-heading text-white mb-3">
                      Pertanyaan yang Sering Diajukan (FAQ)
                    </h3>
                    <p className="text-[#EDE0D0] font-body">
                      Penjelasan lebih mendalam terkait alat kami.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apa itu BMR dan mengapa itu penting?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          BMR adalah singkatan dari Tingkat Metabolisme Basal.
                          Ini mewakili jumlah kalori yang dibutuhkan tubuh Anda
                          untuk melakukan fungsi dasar yang mendukung kehidupan
                          seperti bernapas dan pencernaan. Perkiraan BMR adalah
                          dasar untuk memecahkan kebutuhan kalori total Anda.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apa itu defisit kalori?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Defisit kalori berarti mengonsumsi kalori lebih
                          sedikit daripada yang dibakar tubuh Anda. Kalkulator
                          kami memperkirakan tepat berapa banyak kalori yang
                          harus dikurangi per hari untuk mencapai tujuan
                          spesifik penurunan berat badan Anda dengan aman.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apakah ini memperhitungkan lemak tubuh?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Jika Anda memilih rumus Katch-McArdle dan memberikan
                          persentase lemak tubuh Anda, kalkulator akan
                          menawarkan perkiraan presisi dengan mempertimbangkan
                          massa tubuh tanpa lemak (Lean Body Mass) Anda.
                        </p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Bisakah saya menghitung BMI saya di sini?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Alat kalori ini lebih difokuskan pada pemrosesan
                          kalori. Tetapi platform kami memiliki kalkulator BMI
                          otomatis yang terpisah untuk menilai spesifikasi
                          rentang berat badan yang sehat.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Apakah ini juga kalkulator massa tanpa lemak?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Ya, saat menggunakan input lemak tubuh, formulasi
                          otomatis ini mengestimasi massa tanpa lemak Anda, yang
                          sangat mendukung perhitungan kalori dan makro yang
                          jauh lebih akurat.
                        </p>
                      </details>
                    </div>
                  </div>
                </section>

                <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#7A5C42]/40 text-center max-w-3xl mx-auto shadow-inner mt-4">
                  <h4 className="font-heading font-extrabold text-white text-xl mb-4">
                    Kesimpulan & Tips Terbaik
                  </h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 block">
                    Kalkulator kalori ini adalah alat praktis dan mudah
                    digunakan untuk menetapkan target nutrisi Anda, dukungan
                    untuk BMR, TDEE, makronutrien, memberikan gambaran spesifik
                    pada kebutuhan harian tubuh. Terdapat beberapa hal krusial
                    untuk dicatat:
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm text-left font-body">
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />{" "}
                      Tinjau ulang angka secara berkala
                    </span>
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9C4A2A]" />{" "}
                      Wanita: Minimum 1200 kkal/hari
                    </span>
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9C4A2A]" />{" "}
                      Pria: Minimum 1500 kkal/hari
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/kalori" categoryId="kesehatan" />
    </div>
  );
}
