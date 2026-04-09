"use client";

import React from "react";
import { useDanaDarurat } from "@/features/dana-darurat/hooks/useDanaDarurat";
import { DanaDaruratForm } from "@/features/dana-darurat/components/DanaDaruratForm";
import { DanaDaruratResult } from "@/features/dana-darurat/components/DanaDaruratResult";
import { ShieldAlert, Info, CheckCircle2 } from "lucide-react";
import { Card } from "@/ui/Card";

export default function DanaDaruratPage() {
  const {
    input,
    result,
    updateMonthlyExpense,
    updateLifeAdjustment,
    updateProgress,
    updateAdvanced,
    updateDuration,
    updateCustomDuration,
    calculate,
    resetForm,
  } = useDanaDarurat();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-[#9C4A2A] font-bold tracking-widest uppercase text-xs mb-2">
          <ShieldAlert className="w-4 h-4" /> Finansial Profesional
        </div>
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-primary tracking-tight">
            Kalkulator Dana Darurat
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Hitung seberapa siap Anda secara finansial bila kondisi terburuk
            terjadi di esok hari.
          </p>
        </div>
      </div>

      {/* Main Calculator Layout — 12-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left: Form */}
        <div className="lg:col-span-5 h-full">
          <DanaDaruratForm
            input={input}
            updateMonthlyExpense={updateMonthlyExpense}
            updateLifeAdjustment={updateLifeAdjustment}
            updateProgress={updateProgress}
            updateAdvanced={updateAdvanced}
            updateDuration={updateDuration}
            updateCustomDuration={updateCustomDuration}
            onCalculate={calculate}
            onReset={resetForm}
          />
        </div>

        {/* Right: Result or Placeholder */}
        <div className="lg:col-span-7 h-full">
          {!result || !result.isCalculated ? (
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
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9C4A2A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-[#9C4A2A]/15 flex items-center justify-center mb-6 border border-[#9C4A2A]/20">
                  <ShieldAlert className="w-10 h-10 text-[#9C4A2A]" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight">
                  Siap Melindungi Diri?
                </h3>
                <p className="text-[#EDE0D0] font-body max-w-[300px] text-base leading-relaxed opacity-90">
                  Isi data pengeluaran dan profil risiko Anda, lalu tekan
                  &ldquo;Hitung&rdquo; untuk melihat target dana darurat ideal.
                </p>
                <div className="flex gap-2 mt-8 flex-wrap justify-center">
                  {["3 Bulan", "6 Bulan", "12 Bulan"].map((f) => (
                    <span
                      key={f}
                      className="text-xs bg-[#9C4A2A]/15 text-[#C17A3A] px-3 py-1.5 rounded-full font-bold border border-[#9C4A2A]/20"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full">
              <DanaDaruratResult result={result} />
            </div>
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
              {/* Intro Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#9C4A2A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Pentingnya Keamanan Finansial
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Tentang Dana Darurat
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Dana darurat adalah sejumlah uang yang disisihkan untuk
                  menutupi keadaan darurat finansial yang tidak terduga. Ini
                  berfungsi sebagai jaring pengaman finansial yang membantu Anda
                  menghindari utang berbunga tinggi ketika pengeluaran luar
                  biasa muncul.
                </p>

                {/* Pull Quote */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#9C4A2A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Mengapa Anda Membutuhkan Dana Darurat?
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80 leading-relaxed mb-2">
                      <strong>Keamanan Finansial:</strong> Ketenangan pikiran
                      saat badai krisis datang tanpa terduga. <br />
                      <strong>Perlindungan Kehilangan Pekerjaan:</strong>{" "}
                      Menutupi pengeluaran penting bulanan jika Anda kehilangan
                      sumber penghasilan utama. <br />
                      <strong>Darurat Medis / Kendaraan:</strong> Menutupi biaya
                      medis atau perbaikan barang mendadak tanpa merusak pos
                      anggaran aset lain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Tempat Menabung */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Di Mana Menyimpan Dana Darurat?
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A]" />
                        <h4 className="text-lg font-bold font-heading text-white">
                          Rekening Bunga Tinggi
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed">
                        Bank digital sering menawarkan rekening tabungan dengan
                        akses mudah (likuid) dan suku bunga menarik lebih tinggi
                        dari bank konvensional.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A]" />
                        <h4 className="text-lg font-bold font-heading text-white">
                          Akun Pasar Uang
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed">
                        Instrumen Reksa Dana Pasar Uang (RDPU) di broker pilihan
                        Anda menawarkan fluktuasi tanpa risiko kerugian tinggi
                        namun return per harinya nyata.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Formulasi */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[white] flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Asumsi Formulasi Kami
                    </h3>
                  </div>

                  <div className="p-6 sm:p-10 rounded-[2.5rem] bg-[#1A0E07]/40 border border-[#7A5C42]/30 shadow-sm flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                      <h5 className="font-bold text-xl text-white">
                        Rumus Dana Darurat
                      </h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-90">
                        Kami melakukan komputasi bukan sekedar "Pengeluaran x
                        Durasi Bulan", namun menambahkan "Faktor Penyesuaian".
                        Di mana pengguna dengan risiko ketidakstabilan pekerjaan
                        (Freelancer) atau rasio jumlah tanggungan lebih banyak
                        akan mendapatkan proporsi komputasi target nominal yang
                        dilipatkan (+5% s.d +20%).
                      </p>
                    </div>
                    <div className="flex-1 w-full bg-[#2C1A0E] p-6 rounded-2xl border border-white/10 shadow-inner">
                      <p className="font-mono text-sm text-[#4A7C59] break-words text-center">
                        Target = (Σ Pengeluaran Bulanan × Bulan Terlindungi) ×
                        (1 + Bobot Risiko Profil)
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
                      Temukan jawaban atas rasa penasaran Anda mengenai tata
                      cara dan pentingnya alokasi dana darurat.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Berapa banyak yang harus saya miliki dalam dana
                          darurat?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Aturan umum adalah menabung minimal untuk menutupi 3
                          hingga 6 bulan pengeluaran penting. Namun, jika
                          pekerjaan Anda kurang stabil atau berwiraswasta secara
                          lepas, disarankan untuk menargetkan angka pendanaan
                          yang lebih besar, sekitar 9 hingga 12 bulan.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Pengeluaran apa yang saya masukkan?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Kebutuhan penting termasuk: biaya perumahan/sewa
                          apartemen, makanan (bukan jajan di luar), utilitas air
                          dan listrik terendah, biaya transport rutin ke
                          fasilitas kritis, hingga biaya pendidikan wajib bagi
                          tanggungan peliharaan/anak Anda. Singkatnya, hal yang
                          tidak dapat Anda tunda sama sekali kendati
                          musibah/PHK.
                        </p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Seberapa sering saya harus meninjau ulang target ini?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Sangatlah wajar bila taraf gaya hidup Anda meningkat
                          dari tahun ke tahun. Segera kembali lakukan tinjauan
                          pada instrumen aset likuid Anda begitu status keluarga
                          bertambah, asuransi hangus, atau mengalami resesi
                          perolehan omset bulanan yang radikal. Saran yang
                          dianjurkan ialah peninjauan kembali minimal per
                          triwulan (Quarterly).
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
    </div>
  );
}
