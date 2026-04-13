"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useDepresiasi } from "@/features/depresiasi/hooks/useDepresiasi";
import { DepresiasiForm } from "@/features/depresiasi/components/DepresiasiForm";
import { DepresiasiResult } from "@/features/depresiasi/components/DepresiasiResult";
import { KelompokHartaSection } from "@/features/depresiasi/components/KelompokHartaSection";
import {
  Info,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Building2,
  Scale,
  BookOpen,
} from "lucide-react";

export default function DepresiasiPage() {
  const {
    assetType,
    setAssetType,
    assetGroup,
    setAssetGroup,
    method,
    setMethod,
    cost,
    setCost,
    startDate,
    setStartDate,
    result,
    error,
    availableGroups,
    selectedGroupDetail,
    isBuilding,
    calculate,
    reset,
  } = useDepresiasi();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculate();
  };

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Kalkulator Depresiasi Aset" },
          ]}
        />
        <div className="mt-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Depresiasi Aset
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2 max-w-2xl">
            Hitung penyusutan harta berwujud dan amortisasi harta tak berwujud
            sesuai regulasi pajak DJP Indonesia (PMK No.72/2023).
          </p>
        </div>
      </div>

      {/* Main App Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <DepresiasiForm
            assetType={assetType}
            setAssetType={setAssetType}
            assetGroup={assetGroup}
            setAssetGroup={setAssetGroup}
            method={method}
            setMethod={setMethod}
            cost={cost}
            setCost={setCost}
            startDate={startDate}
            setStartDate={setStartDate}
            error={error}
            availableGroups={availableGroups}
            isBuilding={isBuilding}
            selectedGroupDetail={selectedGroupDetail}
            onCalculate={handleCalculate}
            onReset={reset}
          />
        </div>

        {/* Right Side: Result */}
        <div className="lg:col-span-7 h-full">
          <DepresiasiResult
            result={result}
            cost={Number(cost) || 0}
            method={method}
            groupLabel={selectedGroupDetail?.label || ""}
            usefulLife={selectedGroupDetail?.usefulLife || 0}
          />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
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

          <div className="flex flex-col gap-16 relative z-10 w-full">
            {/* Header Edu */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Regulasi & Panduan Resmi
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Penyusutan & Amortisasi Pajak
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Berdasarkan Peraturan Menteri Keuangan (PMK) Nomor 72 Tahun 2023
                tentang Penyusutan Harta Berwujud dan/atau Amortisasi Harta Tak
                Berwujud untuk keperluan perpajakan.
              </p>
              <a
                href="https://pajak.go.id/id/penyusutan-dan-amortisasi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mb-10 px-5 py-3 rounded-xl border border-[#9C4A2A]/40 text-[#C17A3A] font-bold text-sm bg-[#9C4A2A]/10 hover:bg-[#9C4A2A]/20 transition-all shadow-sm group font-ui w-fit"
              >
                Baca di Situs Resmi DJP{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col items-start gap-4 backdrop-blur-sm text-left shadow-inner w-full">
                <div className="flex items-center gap-3 w-full border-b border-[#7A5C42]/30 pb-4 mb-2">
                  <div className="bg-[#9C4A2A]/20 p-2 rounded-lg">
                    <Info className="w-6 h-6 text-[#C17A3A] shrink-0" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Ringkasan Ketentuan PMK No.72/2023
                  </h3>
                </div>
                <ul className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed space-y-4 w-full">
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>
                    <div>
                      <strong>Penyusutan Harta Berwujud:</strong> Dilakukan
                      dalam bagian-bagian yang sama besar selama masa manfaat
                      (Garis Lurus) atau dalam bagian-bagian yang menurun dari
                      nilai sisa buku (Saldo Menurun).
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>
                    <div>
                      <strong>Amortisasi Harta Tak Berwujud:</strong> Termasuk
                      biaya perpanjangan HGB, HGU, hak pakai, dan muhibah yang
                      masa manfaatnya lebih dari 1 tahun.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>
                    <div>
                      <strong>Saldo Menurun:</strong> Pada akhir masa manfaat,
                      nilai sisa buku disusutkan sekaligus (fully depreciated),
                      dengan syarat dilakukan secara taat asas.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#C17A3A] font-black mt-0.5">•</span>
                    <div>
                      <strong>Bangunan:</strong> Hanya menggunakan metode Garis
                      Lurus. Bangunan permanen 20 tahun (5%), tidak permanen 10
                      tahun (10%).
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content Sections */}
            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">
              {/* 1. Kelompok Harta Berwujud */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Kelompok Harta Berwujud Bukan Bangunan
                  </h3>
                </div>
                <p className="text-[#EDE0D0] font-body text-sm sm:text-base leading-relaxed opacity-90">
                  Masa manfaat harta berwujud bukan bangunan dikelompokkan
                  menjadi 4 kelompok sesuai PMK No.72/2023. Jenis harta yang
                  tidak tercantum dalam lampiran menggunakan masa manfaat
                  Kelompok 3 (16 tahun).
                </p>

                {/* Rate Table */}
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1A0E07]/80 border-b border-white/10">
                        <th className="text-left py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                          Kelompok
                        </th>
                        <th className="text-center py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                          Masa Manfaat
                        </th>
                        <th className="text-center py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                          Garis Lurus
                        </th>
                        <th className="text-center py-3 px-4 text-[10px] font-bold text-[#EDE0D0]/60 uppercase tracking-widest font-ui">
                          Saldo Menurun
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          group: "Kelompok 1",
                          life: "4 tahun",
                          sl: "25%",
                          db: "50%",
                        },
                        {
                          group: "Kelompok 2",
                          life: "8 tahun",
                          sl: "12,5%",
                          db: "25%",
                        },
                        {
                          group: "Kelompok 3",
                          life: "16 tahun",
                          sl: "6,25%",
                          db: "12,5%",
                        },
                        {
                          group: "Kelompok 4",
                          life: "20 tahun",
                          sl: "5%",
                          db: "10%",
                        },
                      ].map((row, i) => (
                        <tr
                          key={row.group}
                          className={
                            i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                          }
                        >
                          <td className="py-3 px-4 font-bold text-white font-heading">
                            {row.group}
                          </td>
                          <td className="text-center py-3 px-4 text-[#EDE0D0] font-body">
                            {row.life}
                          </td>
                          <td className="text-center py-3 px-4 font-bold text-[#C17A3A]">
                            {row.sl}
                          </td>
                          <td className="text-center py-3 px-4 font-bold text-[#C17A3A]">
                            {row.db}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 2. Daftar Jenis Harta Per Kelompok */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Daftar Jenis Harta Per Kelompok
                  </h3>
                </div>
                <KelompokHartaSection />
              </section>

              {/* 3. Bangunan */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Penyusutan Bangunan
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#C17A3A]" />
                      <h4 className="text-lg font-bold font-heading text-white">
                        Bangunan Permanen
                      </h4>
                    </div>
                    <p className="text-[#EDE0D0] font-body text-sm opacity-90">
                      Masa manfaat <strong>20 tahun</strong> dengan tarif
                      penyusutan <strong>5%</strong> per tahun (hanya metode
                      Garis Lurus).
                    </p>
                    <p className="text-[#EDE0D0] font-body text-xs opacity-70">
                      Apabila masa manfaat melebihi 20 tahun, penyusutan dapat
                      sesuai masa manfaat sesungguhnya berdasarkan pembukuan WP,
                      dilakukan secara taat asas.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#C17A3A]" />
                      <h4 className="text-lg font-bold font-heading text-white">
                        Bangunan Tidak Permanen
                      </h4>
                    </div>
                    <p className="text-[#EDE0D0] font-body text-sm opacity-90">
                      Masa manfaat <strong>10 tahun</strong> dengan tarif
                      penyusutan <strong>10%</strong> per tahun (hanya metode
                      Garis Lurus).
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Metode Penyusutan */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    4
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Metode Penyusutan
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#9C4A2A]/30 flex flex-col gap-4">
                    <h4 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                      <Scale className="w-5 h-5 text-[#C17A3A]" /> Garis Lurus
                      (Straight-Line)
                    </h4>
                    <p className="text-[#EDE0D0] font-body text-sm opacity-90 leading-relaxed">
                      Penyusutan dialokasikan dalam bagian-bagian yang{" "}
                      <strong>sama besar</strong> selama masa manfaat. Rumus:{" "}
                      <strong>Nilai Perolehan × Tarif</strong>.
                    </p>
                    <div className="mt-auto bg-[#9C4A2A]/10 rounded-xl p-3 border border-[#9C4A2A]/20">
                      <p className="text-xs text-[#EDE0D0] font-body opacity-80">
                        Contoh: Aset Rp 10.000.000 (Kel.1, 4 thn) → Rp
                        2.500.000/tahun.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#C17A3A]/30 flex flex-col gap-4">
                    <h4 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-[#C17A3A]" /> Saldo
                      Menurun (Declining Balance)
                    </h4>
                    <p className="text-[#EDE0D0] font-body text-sm opacity-90 leading-relaxed">
                      Penyusutan dihitung dari <strong>nilai sisa buku</strong>{" "}
                      setiap tahun. Jumlah penyusutan{" "}
                      <strong>semakin kecil</strong> tiap tahunnya. Pada akhir
                      masa manfaat, sisa nilai buku disusutkan sekaligus.
                    </p>
                    <div className="mt-auto bg-[#C17A3A]/10 rounded-xl p-3 border border-[#C17A3A]/20">
                      <p className="text-xs text-[#EDE0D0] font-body opacity-80">
                        Contoh: Aset Rp 10.000.000 (Kel.1, tarif 50%) → T1: Rp
                        5.000.000, T2: Rp 2.500.000, T3: Rp 1.250.000, T4: Rp
                        1.250.000 (habis).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. Saat Mulainya Penyusutan */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    5
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Saat Mulainya Penyusutan
                  </h3>
                </div>
                <div className="space-y-4">
                  <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span>
                        <strong>Default:</strong> Penyusutan dimulai pada{" "}
                        <strong>bulan dilakukannya pengeluaran</strong> untuk
                        memperoleh harta berwujud tersebut.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span>
                        <strong>Dalam Proses Pengerjaan:</strong> Dimulai pada
                        bulan selesainya pengerjaan harta.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                      <span>
                        <strong>Belum Digunakan/Menghasilkan:</strong> Dimulai
                        pada bulan harta tersebut digunakan atau mulai
                        menghasilkan, dengan persetujuan Direktur Jenderal
                        Pajak.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. Amortisasi */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    6
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Amortisasi Harta Tak Berwujud
                  </h3>
                </div>
                <div className="p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-[#C17A3A]" />
                    <h4 className="font-heading font-bold text-lg text-white">
                      Ketentuan Amortisasi
                    </h4>
                  </div>
                  <p className="text-[#EDE0D0] font-body text-sm opacity-90 leading-relaxed">
                    Amortisasi atas pengeluaran untuk memperoleh harta tak
                    berwujud dan pengeluaran lainnya termasuk biaya perpanjangan
                    HGB, HGU, hak pakai, dan muhibah yang mempunyai masa manfaat
                    lebih dari 1 tahun dilakukan dalam bagian-bagian yang sama
                    besar atau menurun selama masa manfaat.
                  </p>
                  <p className="text-[#EDE0D0] font-body text-sm opacity-90 leading-relaxed">
                    Tarif amortisasi harta tak berwujud mengikuti{" "}
                    <strong>kelompok yang sama</strong> dengan harta berwujud
                    bukan bangunan (Kelompok 1-4). Amortisasi dimulai pada bulan
                    dilakukannya pengeluaran.
                  </p>
                  <div className="bg-[#C17A3A]/10 rounded-xl p-4 border border-[#C17A3A]/20 mt-4">
                    <p className="text-xs text-[#EDE0D0] font-body opacity-80">
                      <strong>Perangkat Lunak:</strong> Program Aplikasi Khusus
                      (perbankan, pasar modal, perhotelan, dll.) diamortisasi
                      dalam <strong>Kelompok 1</strong> (4 tahun, 25%). Program
                      Aplikasi Umum dibebankan sekaligus.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Disclaimer */}
              <section className="space-y-4">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    !
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Disclaimer
                  </h3>
                </div>
                <div className="rounded-3xl bg-[#9C4A2A]/15 border border-[#9C4A2A]/30 p-6 sm:p-8 flex gap-4">
                  <Info className="w-6 h-6 text-[#C17A3A] shrink-0 mt-0.5" />
                  <div className="space-y-3 text-[#EDE0D0] font-body text-sm leading-relaxed">
                    <p>
                      Perhitungan ini bersifat <strong>estimasi</strong> dan
                      berdasarkan ketentuan peraturan perpajakan Indonesia yang
                      berlaku. Untuk keperluan pelaporan pajak resmi,{" "}
                      <strong>
                        konsultasikan dengan konsultan pajak profesional
                      </strong>{" "}
                      atau rujuk langsung ke panduan resmi Direktorat Jenderal
                      Pajak (DJP).
                    </p>
                    <p className="opacity-70">
                      Referensi utama: PMK No. 72 Tahun 2023 tentang Penyusutan
                      Harta Berwujud dan/atau Amortisasi Harta Tak Berwujud.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath="/finansial/depresiasi"
        categoryId="finansial"
      />
    </div>
  );
}
