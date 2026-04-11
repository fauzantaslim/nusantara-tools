"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useMargin } from "@/features/margin/hooks/useMargin";
import { MarginForm } from "@/features/margin/components/MarginForm";
import { MarginResult } from "@/features/margin/components/MarginResult";
import { Info, CheckCircle2 } from "lucide-react";

import { Card } from "@/ui/Card";

export default function MarginPage() {
  const { input, result, updateInput, setMode, resetForm, calculate } =
    useMargin();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Harga Jual & Margin" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Harga Jual & Margin
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Hitung strategi harga yang tepat untuk memaksimalkan profilabilitas
            produk Anda.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <MarginForm
            input={input}
            onChange={updateInput}
            onModeChange={setMode}
            onCalculate={calculate}
            onReset={resetForm}
          />
        </div>

        {/* Right Side: Result */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <MarginResult result={result} input={input} />
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
                    <CheckCircle2 className="w-12 h-12 text-[#9C4A2A]" />
                  </div>
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
                Siap Untuk Menghitung?
              </h3>
              <p className="text-[#EDE0D0] font-body max-w-[320px] text-base leading-relaxed relative z-10 opacity-90 px-4 mx-auto">
                Lengkapi parameter di samping dan klik &quot;Hitung&quot; untuk
                melihat hasil analisis margin Anda.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap justify-center relative z-10">
                {["Profitabilitas", "Harga Optimal"].map((t) => (
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

      {/* Informational Content Section */}
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
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#9C4A2A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Strategi Harga
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Konsep Margin & Markup
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Margin dan markup adalah dua cara berbeda untuk mengungkapkan
                  hubungan antara biaya dan harga jual. Kesalahpahaman dalam
                  membedakan keduanya fatal bagi pertumbuhan bisnis Anda.
                </p>

                {/* Pull Quote */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#9C4A2A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      <strong>Margin</strong> berpusat pada berapa porsi dari
                      kas penjualan yang utuh menjadi profit.{" "}
                      <strong>Markup</strong> berpusat pada seberapa besar
                      penambahan harga di atas modal awal Anda.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                      Jika Anda ingin mendapatkan margin 50%, Anda tidak bisa
                      hanya menaikkan biaya (markup) 50%. Markup 50% hanya akan
                      menghasilkan margin 33.3%, menguras potensi keuntungan
                      nyata secara perlahan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Rumus */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Rumus Kunci Perhitungan
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                          Mgn
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Persentase Margin
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed mb-4">
                        Rumus mendasar untuk mencari porsi keuntungan kotor dari
                        total omset yang ada.
                      </p>
                      <p className="font-mono text-sm text-[#C17A3A]">
                        (Harga Jual - Biaya) ÷ Harga Jual × 100%
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                          Mrk
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Persentase Markup
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed mb-4">
                        Mengukur seberapa jauh harga barang harus dinaikkan dari
                        modal untuk mencapai profit.
                      </p>
                      <p className="font-mono text-sm text-[#C17A3A]">
                        (Harga Jual - Biaya) ÷ Biaya × 100%
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-[#9C4A2A]/30 text-[#FFF0EB] px-2.5 py-1 rounded-full font-mono">
                          H. Jual
                        </span>
                        <h4 className="text-lg font-bold font-heading text-[#FFF0EB]">
                          Target Harga Jual
                        </h4>
                      </div>
                      <p className="text-[#FFF0EB]/80 font-body text-sm leading-relaxed mb-4">
                        Untuk mengetahui besaran harga pasaran barang bila
                        mempertimbangkan target Margin Keuntungan.
                      </p>
                      <p className="font-mono text-sm text-[#FFF0EB]">
                        Biaya Pokok ÷ (1 - Margin Target)
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-[#C17A3A]/30 text-[#FFF3E0] px-2.5 py-1 rounded-full font-mono">
                          H. Modal
                        </span>
                        <h4 className="text-lg font-bold font-heading text-[#FFF3E0]">
                          Max Biaya Produksi (HPP)
                        </h4>
                      </div>
                      <p className="text-[#FFF3E0]/80 font-body text-sm leading-relaxed mb-4">
                        Digunakan pebisnis untuk membatasi pengeluaran dana agar
                        Margin tetap ideal.
                      </p>
                      <p className="font-mono text-sm text-[#FFF3E0]">
                        Harga Jual Target × (1 - Margin Target)
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Konversi Margin & Markup Secara Praktis
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                    <div>
                      <h5 className="font-bold text-xl text-white mb-5">
                        Dampak Perhitungan Berlipat
                      </h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                        Kesalahan pemula sering terletak pada penetapan harga di
                        mana margin keliru diperlakukan laksana markup. Harga
                        penjualan yang ditetapkan akan menjadi lebih rendah dari
                        ekspektasi arus kas yang diharapkan.
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span>
                            Setiap kelipatan modal membutuhkan persentase Markup
                            eksponensial di mana{" "}
                            <strong>
                              Margin selalu dibatasi pada rasio kurang dari
                              100%.
                            </strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span>
                            Penjual ritel di level bawah umumnya menggunakan
                            Markup secara teknis, sementara skala korporasi
                            peduli terhadap persentase Margin bersih per
                            kuartalnya.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                        <h5 className="font-bold text-sm text-[#9C4A2A] uppercase tracking-widest mb-4">
                          Tabel Panduan Singkat
                        </h5>
                        <div className="overflow-hidden border border-white/5 rounded-xl">
                          <table className="w-full text-sm text-left border-collapse">
                            <thead className="bg-[#1A0E07] text-[#EDE0D0]">
                              <tr>
                                <th className="px-4 py-3 font-bold border-b border-white/5 font-heading">
                                  Markup Target
                                </th>
                                <th className="px-4 py-3 font-bold border-b border-white/5 font-heading">
                                  Setara: Margin
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 bg-[#1A0E07]/40 text-[#EDE0D0]/80">
                              <tr>
                                <td className="px-4 py-3 font-mono">25%</td>
                                <td className="px-4 py-3 font-mono font-bold text-[#4A7C59]">
                                  20%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-mono">50%</td>
                                <td className="px-4 py-3 font-mono font-bold text-[#4A7C59]">
                                  33.3%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-mono">100%</td>
                                <td className="px-4 py-3 font-mono font-bold text-[#4A7C59]">
                                  50%
                                </td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 font-mono">200%</td>
                                <td className="px-4 py-3 font-mono font-bold text-[#4A7C59]">
                                  66.7%
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
                      Hal-hal yang sering ditanyakan mengenai penyesuaian
                      stabilitas penetapan margin harga produk.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#9C4A2A] transition">
                          Apa perbedaan teknis saat mengaplikasikan perhitungan
                          margin dan markup?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Margin diukur dalam representasi titik perbandingan
                          keuntungan pada harga jual (bila Anda me-mark-down
                          produk, seberapa jauh perlindungannya), sementara
                          markup di sisi lain adalah ukuran penambahan biaya
                          untuk mendapatkan persentase target tertentu.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#9C4A2A] transition">
                          Bisakah alat ini untuk industri layanan jasa?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Sangat bisa. Selama Anda mengetahui nilai &quot;Biaya
                          Per Jam Pekerja&quot; (termasuk tools/SaaS) plus
                          sarana yang dikeluarkan, Anda dapat merekayasa biaya
                          proyek/jasa profitabel untuk disajikan dalam bentuk
                          Proposal rate-card proyek.
                        </p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apakah alat ini cocok untuk menetapkan e-commerce?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Tentu saja. Dalam bisnis online, potongan tambahan
                          seperti Pajak Transaksi dan Marketplace Fee menjadi
                          pengisi utama. Alat ini memungkinkan pertimbangan
                          akurat pada profit bersih pasca PPN atau Biaya ADM
                          yang tidak dihiraukan sebelumnya.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apakah wajar memakai skema markup di atas 100%?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Sangat wajar! Industri seperti perhiasan, elektronik,
                          farmasi, atau restoran skala besar sering menerapkan
                          skema markup harga di atas 100%—300% untuk menutupi
                          beban biaya pemasaran, overhead toko, dan R&D yang
                          masif.
                        </p>
                      </details>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/finansial/margin" categoryId="finansial" />
    </div>
  );
}
