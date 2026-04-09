"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { usePernikahan } from "@/features/pernikahan/hooks/usePernikahan";
import { PernikahanForm } from "@/features/pernikahan/components/PernikahanForm";
import { PernikahanResult } from "@/features/pernikahan/components/PernikahanResult";
import { Card } from "@/ui/Card";
import { Info, Heart } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";

export default function PernikahanPage() {
  const {
    input,
    result,
    calculate,
    updateInput,
    updateCategory,
    addCategory,
    removeCategory,
    resetForm,
  } = usePernikahan();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Anggaran Pernikahan" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Anggaran Pernikahan
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Rencanakan biaya pernikahan impian Anda dengan alokasi yang tepat
            dan terstruktur.
          </p>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <PernikahanForm
            input={input}
            onUpdate={updateInput}
            onUpdateCategory={updateCategory}
            onAddCategory={addCategory}
            onRemoveCategory={removeCategory}
            onCalculate={calculate}
            onReset={resetForm}
          />
        </div>

        {/* Right: Result */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <PernikahanResult result={result} />
          ) : (
            <Card
              variant="default"
              className="flex flex-col items-center justify-center text-center p-12 h-full min-h-[500px] border-dashed border-2 bg-[#2C1A0E] border-[#7A5C42]/40 rounded-[2.5rem] transition-all relative overflow-hidden shadow-2xl text-[#F5EDE3]"
            >
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
              />

              <div className="relative z-10">
                <div className="absolute inset-0 bg-[#9C4A2A] blur-[80px] rounded-full opacity-10" />
                <div className="relative z-10 w-full flex justify-center mt-4">
                  <div className="absolute inset-0 bg-[#C17A3A] blur-[80px] rounded-full opacity-15" />
                  <div className="w-32 h-32 rounded-full bg-[#1A0E07] border border-[#9C4A2A]/30 flex items-center justify-center shadow-inner mb-6">
                    <Heart className="w-12 h-12 text-[#9C4A2A]" />
                  </div>
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
                Siap Merencanakan?
              </h3>
              <p className="text-[#EDE0D0] font-body max-w-[320px] text-base leading-relaxed relative z-10 opacity-90 px-4 mx-auto">
                Isi total anggaran, jumlah tamu, dan sesuaikan kategori di
                samping, lalu klik &quot;Hitung Anggaran&quot;.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap justify-center relative z-10">
                {["Pie Chart", "Biaya Per Tamu", "Smart Alerts"].map((t) => (
                  <span
                    key={t}
                    className="text-xs bg-[#9C4A2A]/20 text-[#C17A3A] px-3 py-1.5 rounded-full font-bold border border-[#9C4A2A]/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background decorators */}
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
              {/* Section Header */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#9C4A2A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Panduan Perencanaan Keuangan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Apa Itu Kalkulator Anggaran Pernikahan?
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Kalkulator Anggaran Pernikahan adalah alat interaktif yang
                  membantu Anda merencanakan dan mengelola pengeluaran
                  pernikahan ke berbagai kategori. Dengan melihat bagaimana dana
                  Anda dialokasikan, Anda dapat membuat keputusan yang lebih
                  tepat dan menghindari biaya tak terduga.
                </p>

                {/* Pull Quote */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#9C4A2A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      <strong>Alokasi Kategori</strong> = (Persentase ÷ 100) ×
                      Total Anggaran
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                      <strong className="text-white">Biaya Per Tamu</strong> =
                      Total Anggaran ÷ Jumlah Tamu. Gunakan ini untuk memahami
                      apakah biaya per kepala sesuai ekspektasi Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Cara Menggunakan */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#F5EDE3] flex items-center justify-center font-bold shrink-0 text-sm">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Cara Menggunakan Kalkulator
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      {
                        step: "01",
                        title: "Masukkan Total Anggaran",
                        desc: "Ini adalah jumlah total yang Anda rencanakan untuk dibelanjakan pada seluruh pernikahan.",
                      },
                      {
                        step: "02",
                        title: "Masukkan Jumlah Tamu",
                        desc: "Membantu menghitung biaya rata-rata per orang dan memahami skala acara Anda.",
                      },
                      {
                        step: "03",
                        title: "Sesuaikan Kategori",
                        desc: "Setiap kategori dapat disesuaikan nama, persentase, atau jumlah tetapnya. Tambah kategori khusus sesuai kebutuhan.",
                      },
                      {
                        step: "04",
                        title: 'Klik "Hitung Anggaran"',
                        desc: "Alat memproses input Anda dan menampilkan rincian pengeluaran lengkap termasuk pie chart.",
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                            {item.step}
                          </span>
                          <h4 className="text-lg font-bold font-heading text-white">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 2. Mengapa Berguna */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#F5EDE3] flex items-center justify-center font-bold shrink-0 text-sm">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Mengapa Alat Ini Berguna
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30">
                    <div>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                        Merencanakan pernikahan melibatkan berbagai biaya.
                        Kalkulator ini menjaga pengeluaran Anda tetap pada jalur
                        yang tepat dan memastikan tidak ada kategori yang
                        terlewat.
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                        {[
                          "Memungkinkan keputusan hemat biaya dengan membandingkan persentase dan nilai.",
                          "Memahami berapa banyak biaya rata-rata per tamu.",
                          "Mengidentifikasi area di mana Anda mungkin mengeluarkan terlalu banyak.",
                          "Menyesuaikan angka dengan cepat saat rencana pernikahan berkembang.",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-[#9C4A2A] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                      <h5 className="font-bold text-sm text-[#9C4A2A] uppercase tracking-widest mb-4">
                        Alokasi Ideal (Rata-rata)
                      </h5>
                      <div className="overflow-hidden border border-white/5 rounded-xl">
                        <table className="w-full text-sm text-left border-collapse">
                          <thead className="bg-[#1A0E07] text-[#EDE0D0]">
                            <tr>
                              <th className="px-4 py-3 font-bold border-b border-white/5 font-heading">
                                Kategori
                              </th>
                              <th className="px-4 py-3 font-bold border-b border-white/5 font-heading text-right">
                                % Ideal
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 bg-[#1A0E07]/40 text-[#EDE0D0]/80">
                            {[
                              ["Gedung & Venue", "30%"],
                              ["Katering", "25%"],
                              ["Foto & Video", "10%"],
                              ["Busana", "8%"],
                              ["Dekorasi", "8%"],
                              ["Lain-lain", "19%"],
                            ].map(([cat, pct]) => (
                              <tr key={cat}>
                                <td className="px-4 py-2.5 font-body">{cat}</td>
                                <td className="px-4 py-2.5 font-mono font-bold text-[#4A7C59] text-right">
                                  {pct}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                      Hal-hal yang sering ditanyakan seputar perencanaan
                      anggaran pernikahan.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      {[
                        {
                          q: "Bisakah saya menambahkan kategori anggaran sendiri?",
                          a: 'Ya. Gunakan tombol "Tambah Kategori" untuk menyertakan pengeluaran tambahan yang unik untuk acara Anda.',
                        },
                        {
                          q: "Apa yang terjadi jika kategori tidak menjumlah hingga 100%?",
                          a: "Setiap anggaran yang tidak teralokasi akan ditampilkan secara terpisah, memberi fleksibilitas untuk disimpan atau dialihkan kemudian.",
                        },
                      ].map((item) => (
                        <details
                          key={item.q}
                          className="group border-b border-[#7A5C42]/30 pb-4"
                        >
                          <summary className="font-bold text-white cursor-pointer hover:text-[#9C4A2A] transition">
                            {item.q}
                          </summary>
                          <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                            {item.a}
                          </p>
                        </details>
                      ))}
                    </div>
                    <div className="space-y-6">
                      {[
                        {
                          q: "Bisakah saya melihat biaya per tamu?",
                          a: "Ya. Setelah menghitung, sistem otomatis menampilkan rata-rata biaya per tamu berdasarkan total anggaran dan jumlah tamu yang Anda masukkan.",
                        },
                        {
                          q: "Bagaimana jika saya mengubah total anggaran nanti?",
                          a: "Kalkulator akan otomatis menyesuaikan jumlah semua kategori berdasarkan persentase yang telah ditetapkan, menjaga konsistensi alokasi.",
                        },
                      ].map((item) => (
                        <details
                          key={item.q}
                          className="group border-b border-[#7A5C42]/30 pb-4"
                        >
                          <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                            {item.q}
                          </summary>
                          <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                            {item.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedTools
        currentPath="/finansial/pernikahan"
        categoryId="finansial"
      />
    </div>
  );
}
