"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { usePregnancy } from "@/features/kehamilan/hooks/usePregnancy";
import { PregnancyForm } from "@/features/kehamilan/components/PregnancyForm";
import { PregnancyResult } from "@/features/kehamilan/components/PregnancyResult";
import { Info, CheckCircle2 } from "lucide-react";

export default function PregnancyCalculator() {
  const hook = usePregnancy();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Kehamilan" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Kehamilan
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Estimasi milestones dan tanggal perkiraan lahir bayi Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <PregnancyForm hook={hook} />
        <div className="lg:col-span-7 h-full">
          <PregnancyResult hook={hook} />
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
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />

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
                <span className="text-[#4A7C59] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Edukasi Kesehatan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Garis Waktu Kehamilan
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Data serta estimasi dari kalkulator kehamilan ini ditujukan
                  untuk melengkapi proses perencanaan Anda, menyederhanakan
                  pelacakan tahap perkembangan janin, dan membantu persiapan
                  jadwal konsultasi prenatal periodik.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm max-w-2xl mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug text-center sm:text-left">
                    "Setiap perjalanan kehamilan memiliki dinamika yang unik.
                    Jadikan informasi ini sebagai panduan praktis, bukan
                    pengganti diagnosis maupun instruksi ahli tenaga medis
                    profesional."
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Kategori Metode */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Variasi Metode Perhitungan
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* HPHT */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between">
                      <div className="mb-4">
                        <span className="text-sm font-bold text-[#EDE0D0] font-mono bg-white/10 px-3 py-1 rounded-full">
                          Siklus Menstruasi
                        </span>
                      </div>
                      <h4 className="text-xl font-bold font-heading text-white mb-2">
                        HPHT
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80 mb-4">
                        Memanfaatkan Hari Pertama Haid Terakhir. Kalkulasi
                        disesuaikan jika panjang rata-rata siklus Anda berada di
                        luar 28 hari.
                      </p>
                      <div className="mt-auto">
                        <div className="font-mono text-[11px] text-[#EDE0D0] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-white/10 shadow-inner leading-relaxed">
                          <span className="font-bold text-white block mb-1">
                            Aturan Naegele:
                          </span>
                          HPHT + 1 tahun − 3 bln + 7 hari
                          <br />
                          <span className="font-bold text-white block mt-2 mb-1">
                            Disesuaikan untuk Pasca Siklus:
                          </span>
                          LMP + 280 hari + (Siklus − 28 hari)
                        </div>
                      </div>
                    </div>

                    {/* Konsepsi */}
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:border-[#4A7C59]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A7C59]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#E8F5E9] font-mono bg-[#4A7C59]/30 px-3 py-1 rounded-full shadow-sm border border-[#4A7C59]/20">
                          Tepat Waktu
                        </span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#E8F5E9] mb-2">
                        Tanggal Konsepsi
                      </h4>
                      <p className="relative text-[#E8F5E9]/80 font-body text-sm leading-relaxed mb-4">
                        Jika Anda mengetahui secara logis kapan persisnya
                        konsepsi tersebut terjadi, maka ditambahkan tepat 266
                        hari.
                      </p>
                      <div className="relative mt-auto">
                        <div className="font-mono text-[11px] text-[#81C784] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-[#4A7C59]/20 shadow-inner">
                          <span className="font-bold text-[#E8F5E9] block mb-1">
                            Rumus:
                          </span>
                          Konsepsi + 266 hari
                        </div>
                      </div>
                    </div>

                    {/* IVF */}
                    <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30 hover:border-[#C17A3A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C17A3A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF3E0] font-mono bg-[#C17A3A]/30 px-3 py-1 rounded-full shadow-sm border border-[#C17A3A]/20">
                          Prosedur Medis
                        </span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF3E0] mb-2">
                        Transfer Bayi Tabung
                      </h4>
                      <p className="relative text-[#FFF3E0]/80 font-body text-sm leading-relaxed mb-4">
                        Mengintegrasikan tanggal penanaman embrio ke rahim serta
                        mengompensasinya berdasarkan usia pertumbuhan spesifik
                        embrio tesebut.
                      </p>
                      <div className="relative mt-auto">
                        <div className="font-mono text-[11px] text-[#FFB74D] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-[#C17A3A]/20 shadow-inner">
                          <span className="font-bold text-[#FFF3E0] block mb-1">
                            Rumus:
                          </span>
                          Transfer + (267 − Usia Embrio dalam Hari)
                        </div>
                      </div>
                    </div>

                    {/* USG */}
                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#9C4A2A]/20 rounded-full blur-xl" />
                      <div className="relative mb-4">
                        <span className="text-sm font-bold text-[#FFF0EB] font-mono bg-[#9C4A2A]/30 px-3 py-1 rounded-full shadow-sm border border-[#9C4A2A]/20">
                          Evaluasi Klinis
                        </span>
                      </div>
                      <h4 className="relative text-xl font-bold font-heading text-[#FFF0EB] mb-2">
                        Pemindaian USG
                      </h4>
                      <p className="relative text-[#FFF0EB]/80 font-body text-sm leading-relaxed mb-4">
                        Berbasis pada pembacaan usia gestasi mesin pemindai
                        ultrasonik untuk akurasi pelacakan lanjutan terbaik.
                      </p>
                      <div className="relative mt-auto">
                        <div className="font-mono text-[11px] text-[#E57373] bg-[#1A0E07]/60 p-2.5 rounded-lg border border-[#9C4A2A]/20 shadow-inner">
                          <span className="font-bold text-[#FFF0EB] block mb-1">
                            Rumus:
                          </span>
                          280 hari mutlak dari HPHT terestimasi
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Rumus & Metode */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Prinsip Observasi Medikal
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="text-[#EDE0D0] font-body leading-relaxed text-lg mb-4 opacity-90">
                        Secara klinis, siklus prapengeluaran bayi mamalia homo
                        sapiens adalah berkisar antara durasi kurang lebih 280
                        hari operasional.
                      </p>
                      <ul className="space-y-3 font-body text-[#EDE0D0]">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            Hanya <strong>5 persen</strong> dari populasi global
                            direkam menetas mutlak pada pas Hari Perkiraan Lahir
                            (EDD).
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            Memaksimalkan metode observasi obstetri klasik
                            berupa <strong>Hukum Naegele</strong> yang masih
                            menjadi acuan dunia kedokteran hari ini.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1A0E07] p-6 rounded-2xl border border-[#7A5C42]/30 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                      <h5 className="font-bold text-sm text-surface uppercase tracking-widest mb-4 relative z-10">
                        Algoritma Hukum Naegele
                      </h5>
                      <div className="bg-[#2C1A0E] p-4 rounded-xl flex items-center justify-center mb-3 border border-[#7A5C42]/40 relative z-10 shadow-inner">
                        <span className="font-mono font-bold text-lg text-[#F5EDE3] tracking-wide text-center">
                          HPHT + 1 Thun - 3 Bln + 7 Hri
                        </span>
                      </div>
                      <p className="text-xs text-surface font-body text-center mt-2 relative z-10">
                        (Dikalibrasi dinamis dengan durasi riwayat siklus
                        masing-masing pengguna)
                      </p>
                    </div>
                  </div>
                </section>

                {/* 3. Manfaat */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">
                      3
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Manfaat Pelacakan Rutin
                    </h3>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-6 lg:p-8 rounded-[2rem] space-y-6 backdrop-blur-sm">
                    <p className="text-lg font-body text-[#F5EDE3] leading-relaxed">
                      Sinergi peranti lunak prediktif mutakhir dengan
                      perencanaan kesehatan proaktif memberikan{" "}
                      <strong>3 parameter utama bagi orangtua</strong>:
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 focus-within:ring-2 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#C17A3A] pl-3">
                          Identifikasi HPL
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Fokus penuh penanda estimasi persalinan bayi.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#4A7C59] pl-3">
                          Pengawalan Usia Janin
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Pemahaman komprehensif atas konversi usia dalam satuan
                          minggu plus pembagian trimesternya.
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#1A0E07]/60 border border-white/5 transition-all">
                        <h6 className="font-bold text-white mb-1 border-l-2 border-[#9C4A2A] pl-3">
                          Milestone Perawatan
                        </h6>
                        <p className="text-sm font-body text-[#EDE0D0] opacity-80 pl-3">
                          Kalender pengingat pemeriksaan vital layaknya pindaian
                          anatomis dan tes lab.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-6 pt-4">
                  <h3 className="text-2xl font-bold font-heading text-white text-center mb-8">
                    Pertanyaan yang Sering Terjadi (FAQ)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#1A0E07]/40 p-6 rounded-2xl border border-[#7A5C42]/20 shadow-inner">
                      <h4 className="font-bold text-[#4A7C59] mb-2 font-heading text-lg">
                        Apakah tanggal jatuh tempo bersifat mutlak?
                      </h4>
                      <p className="text-sm text-[#EDE0D0] leading-relaxed opacity-80 font-body">
                        Tidak. Tanggal jatuh tempo adalah perkiraan. Kebanyakan
                        bayi lahir antara dua minggu sebelum dan dua minggu
                        setelah tanggal tersebut.
                      </p>
                    </div>
                    <div className="bg-[#1A0E07]/40 p-6 rounded-2xl border border-[#7A5C42]/20 shadow-inner">
                      <h4 className="font-bold text-[#4A7C59] mb-2 font-heading text-lg">
                        Seberapa akurat metode USG?
                      </h4>
                      <p className="text-sm text-[#EDE0D0] leading-relaxed opacity-80 font-body">
                        USG trimester pertama umumnya dianggap sebagai metode
                        paling akurat untuk menentukan usia gestasi bayi karena
                        variasi ukuran janin sangat kecil pada tahap tersebut.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#7A5C42]/40 text-center max-w-3xl mx-auto shadow-inner mt-4">
                  <h4 className="font-heading font-extrabold text-white text-xl mb-4">
                    Pesan Penutup
                  </h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 block">
                    Gunakanlah alat ini untuk membantu Anda merayakan setiap
                    progres kecil dalam kandungan. Kami menyarankan untuk tetap
                    mencatat setiap informasi dari kalkulator ini dan
                    mendiskusikannya pada kunjungan dokter atau bidan Anda
                    berikutnya.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm text-left font-body">
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />{" "}
                      Tinjau hasil USG secara berkala
                    </span>
                    <span className="bg-[#2C1A0E] px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />{" "}
                      Persiapkan kebutuhan Trimester 3 lebih awal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/kehamilan" categoryId="kesehatan" />
    </div>
  );
}
