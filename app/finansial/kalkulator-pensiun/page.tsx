"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { usePensiun } from "@/features/pensiun/hooks/usePensiun";
import { PensiunForm } from "@/features/pensiun/components/PensiunForm";
import { PensiunResultComp } from "@/features/pensiun/components/PensiunResult";
import {
  Info,
  CheckCircle2,
  Scale,
  Calculator,
  BookOpen,
  PieChart,
} from "lucide-react";

export default function PensiunPage() {
  const { input, result, updateInput, resetForm } = usePensiun();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Kalkulator Pensiun" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Pensiun
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1 max-w-2xl">
            Simulasikan kebutuhan dana pensiun Anda menggunakan proyeksi bunga
            majemuk, inflasi, dan target pengeluaran.
          </p>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <PensiunForm
            input={input}
            onChange={updateInput}
            onReset={resetForm}
          />
        </div>

        <div className="lg:col-span-7">
          <PensiunResultComp
            result={result}
            currentAge={input.currentAge}
            retirementAge={input.retirementAge}
          />
        </div>
      </div>

      {/* ── Educational / Info Section ────────────────────────────────────── */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Hero Info */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Perencanaan Masa Depan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Tentang Perencanaan Pensiun
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Merencanakan pensiun sangat penting untuk memastikan keamanan
                  finansial selama tahun-tahun emas Anda. Rencana pensiun yang
                  sukses memerlukan pertimbangan yang cermat terhadap tabungan,
                  investasi, inflasi, dan gaya hidup yang diharapkan.
                </p>
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0 mt-1" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Memahami Kalkulator Pensiun
                    </p>
                    <p className="text-sm font-body text-[#EDE0D0]/80">
                      Kalkulator ini membantu memperkirakan kesiapan finansial.
                      Dengan memasukkan detail, Anda mendapatkan gambaran jelas
                      tentang berapa yang harus ditabung, pendapatan pensiun
                      yang diharapkan, dan mencegah risiko umur panjang
                      (kehabisan tabungan).
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Faktor Kunci */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Faktor Kunci dalam Perencanaan Pensiun
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Jangka Waktu",
                        desc: "Semakin awal Anda mulai menabung, semakin banyak waktu investasi Anda tumbuh melalui *compounding*.",
                      },
                      {
                        title: "Tarif Tabungan",
                        desc: "Secara konsisten menabung persentase dari pendapatan pendapatan sangat penting.",
                      },
                      {
                        title: "Pengembalian (Return)",
                        desc: "Pengembalian yang lebih tinggi sangat berdampak signifikan, namun datang dengan risiko yang relevan.",
                      },
                      {
                        title: "Inflasi",
                        desc: "Inflasi mengikis daya beli seiring waktu dan harus selalu diperhitungkan.",
                      },
                      {
                        title: "Gaya Hidup Pensiun",
                        desc: "Standar hidup langsung mempengaruhi berapa banyak yang perlu Anda tabung.",
                      },
                      {
                        title: "Risiko Umur Panjang",
                        desc: "Mencegah Anda kehabisan tabungan selagi masih hidup.",
                      },
                    ].map((step, i) => (
                      <div
                        key={i}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9C4A2A]/30 transition-all group"
                      >
                        <PieChart className="w-8 h-8 text-[#C17A3A] mb-4 group-hover:scale-110 transition-transform" />
                        <h4 className="text-base font-bold font-heading text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. Rumus & Cara Kerja */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Bagaimana Kalkulator Bekerja
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <p className="font-bold text-[#C17A3A] text-sm">
                        Data yang Dikumpulkan
                      </p>
                      <ul className="space-y-3">
                        {[
                          "Informasi usia dan ekspektasi hidup.",
                          "Tabungan awal dan kontribusi bulanan secara teratur.",
                          "Estimasi pendapatan investasi (Return) & Inflasi.",
                          "Pengeluaran dana dan pendapatan pasif lainnya di masa pensiun.",
                        ].map((row) => (
                          <li
                            key={row}
                            className="flex items-start gap-2 text-[#EDE0D0]/70 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#9C4A2A] shrink-0 mt-0.5" />
                            <span>{row}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <p className="font-bold text-[#C17A3A] text-sm">
                        Rumus yang Digunakan
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-[#EDE0D0]/70 text-sm">
                          <Calculator className="w-4 h-4 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Total Tabungan:</strong> Awal + (Bulanan ×
                            Bulan) + Bunga Majemuk.
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-[#EDE0D0]/70 text-sm">
                          <Calculator className="w-4 h-4 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Total Pendapatan Pensiun:</strong> Penarikan
                            Tabungan + Pensiun Pemerintah +Lainnya.
                          </span>
                        </li>
                        <li className="flex items-start gap-2 text-[#EDE0D0]/70 text-sm">
                          <Calculator className="w-4 h-4 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Uang Tersisa (Surplus/Kekurangan):</strong>{" "}
                            Total Pendapatan - Biaya Hidup.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 px-5 py-4 bg-[#9C4A2A]/10 border border-[#9C4A2A]/20 rounded-2xl mt-4">
                    <Scale className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                    <p className="text-[#EDE0D0]/70 text-xs font-body leading-relaxed">
                      <strong className="text-white">
                        Aturan 4% (The 4% Rule):
                      </strong>{" "}
                      Pedoman umum dalam perencanaan pensiun adalah aturan 4%,
                      yang menyarankan bahwa pensiunan dapat menarik 4% dari
                      tabungan pada tahun pertama, kemudian disesuaikan dengan
                      inflasi setiap tahunnya, dan diperkirakan tabungan tidak
                      akan habis selama 30 tahun masa pensiun.
                    </p>
                  </div>
                </section>

                {/* 3. FAQ */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <BookOpen className="w-6 h-6 text-[#C17A3A]" />
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Pertanyaan Umum
                    </h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        q: "Bisakah saya menyesuaikan nilai yang sudah diisi?",
                        a: "Ya, semua bidang dapat disesuaikan untuk sesuai dengan situasi finansial spesifik Anda. Termasuk asumsi tingkat pengembalian maupun ekspektasi inflasi negara.",
                      },
                      {
                        q: "Apa yang ditunjukkan grafik?",
                        a: "Grafik menggambarkan fluktuasi total dana Anda (Balance) seiring berjalannya usia. Ini membantu memvisualisasikan bagaimana bunga majemuk berperan dan kapan—jika ada—kehabisan uang (Longevity risk).",
                      },
                      {
                        q: "Bagaimana jika pengeluaran saya melebihi pendapatan / dana habis?",
                        a: "Anda dapat memodifikasi rencana tabungan Anda, mencari return yang lebih kompetitif, menurunkan target pengeluaran, atau menunda usia pensiun untuk menyelaraskan keuangan secara ideal.",
                      },
                      {
                        q: "Manfaat menggunakan kalkulator ini?",
                        a: "Memberdayakan pengguna untuk merencanakan keamanan finansial, memahami compounding factor, dan memvisualisasikan masa tua mereka agar tidak menjadi generasi 'Sandwich'.",
                      },
                    ].map((item) => (
                      <div
                        key={item.q}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10"
                      >
                        <p className="font-bold text-white text-sm mb-2">
                          {item.q}
                        </p>
                        <p className="text-[#EDE0D0]/70 text-sm font-body leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/20">
                <Scale className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                <p className="text-[#EDE0D0]/70 text-xs font-body leading-relaxed">
                  <strong className="text-white">Disclaimer:</strong> Kalkulator
                  ini menyediakan estimasi/proyeksi finansial saja (berdasarkan
                  asumsi konstanta abstrak) dan tidak boleh menggantikan
                  konsultasi maupun saran dari penasihat keuangan bersertifikat.
                  Lakukan riset Anda sendiri.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/finansial/pensiun" categoryId="finansial" />
    </div>
  );
}
