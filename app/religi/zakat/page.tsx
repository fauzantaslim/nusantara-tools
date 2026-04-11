"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useZakat } from "@/features/zakat/hooks/useZakat";
import { ZakatForm } from "@/features/zakat/components/ZakatForm";
import { ZakatResult } from "@/features/zakat/components/ZakatResult";
import { ArrowRight, Info, CheckCircle2, ShieldAlert } from "lucide-react";

export default function KalkulatorZakat() {
  const hook = useZakat();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Religi", href: "/religi" },
            { label: "Kalkulator Zakat Pendapatan" },
          ]}
        />
        <div className="mt-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Zakat Pendapatan
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2 max-w-2xl">
            Hitung kewajiban zakat penghasilan atau profesi sesuai standar nisab
            BAZNAS 2026 secara akurat.
          </p>
        </div>
      </div>

      {/* Kalkulator Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <ZakatForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <ZakatResult hook={hook} />
        </div>
      </div>

      {/* Edukasi BAZNAS */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
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

          <div className="flex flex-col gap-16 relative z-10 w-full">
            {/* Header Edu */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi & Referensi Resmi
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6 text-balance">
                Pedoman Zakat Pendapatan
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Berdasarkan Keputusan Pimpinan Pusat BAZNAS (Badan Amil Zakat
                Nasional) RI Nomor 15 Tahun 2026 yang mengatur penyesuaian nilai
                nisab menggunakan standarisasi emas murni.
              </p>
              <a
                href="https://drive.google.com/file/d/1WIrLaVEfqIokuDBf5g7NIdsXUGpuAz6F/view"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-10 px-5 py-3 rounded-xl border border-[#4A7C59]/40 text-[#4A7C59] font-bold text-sm bg-[#4A7C59]/10 hover:bg-[#4A7C59]/20 transition-all shadow-sm group font-ui w-fit"
              >
                Baca PDF Resmi SK BAZNAS No. 15 Tahun 2026{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col items-start gap-4 backdrop-blur-sm text-left shadow-inner w-full">
                <div className="flex items-center gap-3 w-full border-b border-[#7A5C42]/30 pb-4 mb-2">
                  <div className="bg-[#4A7C59]/20 p-2 rounded-lg">
                    <Info className="w-6 h-6 text-[#4A7C59] shrink-0" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Rincian Keputusan BAZNAS 2026
                  </h3>
                </div>
                <ul className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed space-y-4 w-full">
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>{" "}
                    <div>
                      <strong>Standar Harga Emas:</strong> Nilai nisab tetap
                      berdasarkan kepada 85 gram emas (kadar 14 karat atau
                      58,33%-62,49%), menggunakan rata-rata harga pasar tahun
                      sebelumnya (2025).
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>{" "}
                    <div>
                      <strong>Nilai Konversi Nisab:</strong> Ditetapkan batas
                      wajib nisab setara{" "}
                      <strong>Rp 91.681.728,- per tahun</strong> atau{" "}
                      <strong>Rp 7.640.144,- per bulan</strong>.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>{" "}
                    <div>
                      <strong>Kadar Potongan Zakat:</strong> Sebesar{" "}
                      <strong>2,5% (dua koma lima persen)</strong> khusus untuk
                      zakat dari komoditas pendapatan dan jasa.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>{" "}
                    <div>
                      <strong>Obyek Zakat (Bruto):</strong> Zakat dikeluarkan
                      secara matematis dari{" "}
                      <strong>total penghasilan kotor (bruto)</strong>.
                      Penunaiannya dilakukan seketika pendapatan tersebut
                      diterima.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Tentang Zakat & Konsep Utama
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center">
                    <h4 className="text-xl font-bold font-heading text-white mb-3">
                      Apa Itu Zakat?
                    </h4>
                    <p className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed opacity-90">
                      Zakat adalah salah satu dari lima rukun Islam dan merujuk
                      pada kewajiban bagi umat Muslim untuk memberikan sebagian
                      dari kekayaan mereka kepada yang membutuhkan. Ini adalah
                      bentuk ibadah wajib yang bertujuan untuk membersihkan
                      harta, membantu yang kurang beruntung, dan berkontribusi
                      pada kesejahteraan masyarakat luas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="p-5 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                      <h4 className="font-heading font-bold text-white mb-1 tracking-wide">
                        Nisab
                      </h4>
                      <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                        Jumlah minimum kekayaan yang wajib dimiliki selama
                        setahun (biasanya setara 87,48 gram emas atau 612,36
                        gram perak).
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30">
                      <h4 className="font-heading font-bold text-white mb-1 tracking-wide">
                        Hawl & Tingkat Pembayaran
                      </h4>
                      <p className="text-[#EDE0D0] text-sm opacity-90 leading-relaxed">
                        Hawl adalah kepemilikan aset selama satu tahun lunar
                        penuh. Tingkat standar wajib Zakat umumnya adalah 2.5%.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Kriteria Aset & Pengecualian
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#4A7C59]/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#4A7C59]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-[#4A7C59]" />
                      </div>
                      <h4 className="text-xl font-bold font-heading text-white">
                        Aset Terkena Zakat
                      </h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li className="flex gap-3 items-start">
                        <span className="text-[#4A7C59] font-black mt-0.5">
                          •
                        </span>{" "}
                        Emas dan perak (termasuk perhiasan investasi)
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-[#4A7C59] font-black mt-0.5">
                          •
                        </span>{" "}
                        Uang tunai, dan saldo tabungan
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-[#4A7C59] font-black mt-0.5">
                          •
                        </span>{" "}
                        Saham, obligasi, dan portofolio investasi
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-[#4A7C59] font-black mt-0.5">
                          •
                        </span>{" "}
                        Inventaris barang dagangan bisnis untuk dijual
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-white/20 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-white/70" />
                      </div>
                      <h4 className="text-xl font-bold font-heading text-white">
                        Dikecualikan Dari Zakat
                      </h4>
                    </div>
                    <ul className="space-y-3 text-[#EDE0D0] font-body text-sm opacity-90">
                      <li className="flex gap-3 items-start">
                        <span className="text-white/50 font-black mt-0.5">
                          •
                        </span>{" "}
                        Barang pribadi yang digunakan sehari-hari (rumah
                        tinggal, mobil, pakaian)
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-white/50 font-black mt-0.5">
                          •
                        </span>{" "}
                        Alat dan peralatan berat yang digunakan untuk mencari
                        nafkah
                      </li>
                      <li className="flex gap-3 items-start">
                        <span className="text-white/50 font-black mt-0.5">
                          •
                        </span>{" "}
                        Hutang jatuh tempo dan pengeluaran primer wajib yang
                        diperlukan
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/religi/zakat" categoryId="religi" />
    </div>
  );
}
