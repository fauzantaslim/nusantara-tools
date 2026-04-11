"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useCicilan } from "@/features/cicilan-kendaraan/hooks/useCicilan";
import { CicilanForm } from "@/features/cicilan-kendaraan/components/CicilanForm";
import { CicilanResult } from "@/features/cicilan-kendaraan/components/CicilanResult";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Card } from "@/ui/Card";
import {
  Car,
  Info,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";

export default function CicilanKendaraanPage() {
  const { input, result, errors, updateInput, calculate, resetForm } =
    useCicilan();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Cicilan Kendaraan" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Cicilan Motor & Mobil
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Simulasikan cicilan kredit kendaraan bermotor dengan jadwal angsuran
            lengkap per bulan.
          </p>
        </div>
      </div>

      {/* Main Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative my-4">
        {/* Left: Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <CicilanForm
            input={input}
            onChange={updateInput}
            onCalculate={calculate}
            onReset={resetForm}
            errors={errors}
          />
        </div>

        {/* Right: Result */}
        <div className="lg:col-span-7 h-full">
          {result ? (
            <CicilanResult result={result} input={input} />
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
                    <Car className="w-12 h-12 text-[#9C4A2A]" />
                  </div>
                </div>
              </div>

              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-3 tracking-tight relative z-10 px-4">
                Siap Menghitung Cicilan?
              </h3>
              <p className="text-[#EDE0D0] font-body max-w-[320px] text-base leading-relaxed relative z-10 opacity-90 px-4 mx-auto">
                Isi parameter di sebelah kiri dan klik &quot;Hitung
                Cicilan&quot; untuk melihat estimasi angsuran bulanan Anda.
              </p>
              <div className="flex gap-3 mt-8 flex-wrap justify-center relative z-10">
                {["Cicilan Bulanan", "Jadwal Angsuran", "Total Bunga"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-xs bg-[#9C4A2A]/20 text-[#C17A3A] px-3 py-1.5 rounded-full font-bold border border-[#9C4A2A]/20"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Informational Content Section */}
      <div className="mt-8 mb-24">
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
                  Edukasi Kredit Kendaraan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Cicilan Kendaraan
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Sebelum mengambil kredit kendaraan, penting untuk memahami
                  cara kerja perhitungan cicilan, agar Anda bisa membandingkan
                  penawaran dan memilih skema yang paling menguntungkan.
                </p>

                {/* Pull Quote */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#9C4A2A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Cicilan bukan sekadar <strong>harga dibagi tenor</strong>{" "}
                      — ada faktor bunga yang terakumulasi secara eksponensial
                      yang perlu diperhitungkan.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                      Dengan bunga 10% per tahun dan tenor 5 tahun, Anda bisa
                      membayar 25–30% lebih mahal dari harga OTR kendaraan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Cara Menghitung */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Cara Menghitung Cicilan
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                          Step 1
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Jumlah Pinjaman
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed mb-3">
                        Harga OTR dikurangi Uang Muka (DP) yang Anda bayarkan di
                        awal.
                      </p>
                      <p className="font-mono text-sm text-[#C17A3A]">
                        P = Harga Kendaraan − Uang Muka
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                          Step 2
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Bunga Bulanan
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed mb-3">
                        Suku bunga tahunan dibagi 12 untuk mendapatkan bunga per
                        bulan.
                      </p>
                      <p className="font-mono text-sm text-[#C17A3A]">
                        i = Bunga Tahunan ÷ 12
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#9C4A2A]/10 border border-[#9C4A2A]/30 hover:border-[#9C4A2A]/50 transition-colors sm:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-[#9C4A2A]/30 text-[#FFF0EB] px-2.5 py-1 rounded-full font-mono">
                          Rumus Anuitas
                        </span>
                        <h4 className="text-lg font-bold font-heading text-[#FFF0EB]">
                          Cicilan Bulanan
                        </h4>
                      </div>
                      <p className="text-[#FFF0EB]/80 font-body text-sm leading-relaxed mb-4">
                        Menggunakan rumus anuitas standar yang digunakan oleh
                        bank dan lembaga pembiayaan.
                      </p>
                      <p className="font-mono text-sm text-[#FFF0EB] bg-[#1A0E07]/40 p-3 rounded-xl">
                        Cicilan = P × [i(1+i)ⁿ] ÷ [(1+i)ⁿ − 1]
                      </p>
                      <p className="text-xs text-[#FFF0EB]/60 mt-2 font-body">
                        P = pokok pinjaman, i = bunga bulanan, n = tenor (bulan)
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                          Step 4
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Total Pembayaran
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed mb-3">
                        Cicilan bulanan dikalikan jumlah bulan tenor.
                      </p>
                      <p className="font-mono text-sm text-[#C17A3A]">
                        Total = Cicilan × Tenor
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono">
                          Step 5
                        </span>
                        <h4 className="text-lg font-bold font-heading text-white">
                          Total Bunga
                        </h4>
                      </div>
                      <p className="text-[#EDE0D0]/80 font-body text-sm leading-relaxed mb-3">
                        Selisih antara total pembayaran dan pokok pinjaman awal.
                      </p>
                      <p className="font-mono text-sm text-[#C17A3A]">
                        Bunga = Total Bayar − Jumlah Pinjaman
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Tips Kredit */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#9C4A2A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                      <Lightbulb className="w-6 h-6 text-[#C17A3A]" />
                      Tips Kredit Kendaraan
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      {
                        icon: "💰",
                        title: "Perbesar DP",
                        desc: "DP yang lebih besar mengurangi pokok pinjaman sehingga cicilan bulanan dan total bunga yang dibayar pun ikut mengecil.",
                      },
                      {
                        icon: "🔍",
                        title: "Bandingkan Leasing",
                        desc: "Jangan hanya membandingkan besaran cicilan, tapi juga total biaya keseluruhan termasuk biaya administrasi dan provisi.",
                      },
                      {
                        icon: "📋",
                        title: "Perhatikan Pajak Kendaraan",
                        desc: "PKB tahunan, biaya balik nama (BBN), dan asuransi wajib perlu diperhitungkan dalam anggaran kendaraan Anda.",
                      },
                      {
                        icon: "🔧",
                        title: "Hitung Biaya Perawatan",
                        desc: "Servis berkala, ban, dan komponen aus adalah biaya rutin yang tidak terhindarkan dan perlu masuk rencana anggaran.",
                      },
                      {
                        icon: "🛡️",
                        title: "Pertimbangkan Asuransi",
                        desc: "Pilih antara asuransi all-risk (comprehensive) atau TLO sesuai usia kendaraan dan kemampuan finansial Anda.",
                      },
                    ].map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                      >
                        <span className="text-2xl">{tip.icon}</span>
                        <div>
                          <h4 className="font-bold text-white mb-1">
                            {tip.title}
                          </h4>
                          <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                            {tip.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* FAQ */}
                <section className="space-y-8 pt-8 border-t border-[#7A5C42]/30">
                  <div className="flex flex-col items-center text-center">
                    <HelpCircle className="w-8 h-8 text-[#9C4A2A] mb-3" />
                    <h3 className="text-2xl font-bold font-heading text-white mb-3">
                      Pertanyaan Umum (FAQ)
                    </h3>
                    <p className="text-[#EDE0D0] font-body text-sm opacity-80">
                      Hal-hal yang sering ditanyakan mengenai kredit kendaraan
                      bermotor.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      {[
                        {
                          q: "Bagaimana cara menghitung cicilan motor atau mobil?",
                          a: "Cicilan dihitung dengan rumus anuitas: Cicilan = P × [i(1+i)ⁿ] ÷ [(1+i)ⁿ−1], di mana P adalah pokok pinjaman, i adalah bunga bulanan, dan n adalah tenor.",
                        },
                        {
                          q: "Berapa minimal DP untuk kredit kendaraan?",
                          a: "Berdasarkan aturan OJK, minimal DP untuk kendaraan bermotor roda empat (mobil) adalah 20% dari harga OTR. Untuk motor, bervariasi tergantung kebijakan masing-masing leasing.",
                        },
                      ].map((item, i) => (
                        <details
                          key={i}
                          className="group border-b border-[#7A5C42]/30 pb-4"
                        >
                          <summary className="font-bold text-white cursor-pointer hover:text-[#9C4A2A] transition list-none flex justify-between items-start gap-3">
                            {item.q}
                            <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 group-open:rotate-180 transition-transform" />
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
                          q: "Apa yang mempengaruhi besar kecilnya cicilan kendaraan?",
                          a: "Harga kendaraan, jumlah uang muka, suku bunga kredit, jangka waktu (tenor), serta biaya tambahan dari lembaga pembiayaan seperti biaya administrasi dan provisi.",
                        },
                        {
                          q: "Lebih baik tenor pendek atau panjang?",
                          a: "Tenor pendek: cicilan lebih besar tapi total bunga lebih sedikit. Tenor panjang: cicilan lebih ringan tapi total bunga lebih besar. Pilih sesuai kemampuan cash flow bulanan Anda.",
                        },
                      ].map((item, i) => (
                        <details
                          key={i}
                          className="group border-b border-[#7A5C42]/30 pb-4"
                        >
                          <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition list-none flex justify-between items-start gap-3">
                            {item.q}
                            <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 group-open:rotate-180 transition-transform" />
                          </summary>
                          <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                            {item.a}
                          </p>
                        </details>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Disclaimer */}
                <section className="pt-8 border-t border-[#7A5C42]/30">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#1A0E07]/50 border border-[#7A5C42]/30">
                    <ShieldAlert className="w-8 h-8 text-[#C17A3A] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-2 font-heading">
                        Penting untuk Diperhatikan
                      </h4>
                      <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                        Hasil dari kalkulator ini adalah{" "}
                        <strong className="text-[#EDE0D0]">estimasi</strong> dan
                        ditujukan untuk tujuan informasi saja. Perhitungan di
                        website ini tidak dimaksudkan sebagai pengganti nasihat
                        dari profesional yang berkualifikasi seperti ahli
                        keuangan atau konsultan kredit. Selalu konsultasikan
                        dengan pihak lembaga pembiayaan resmi sebelum membuat
                        keputusan penting.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath="/finansial/cicilan-kendaraan"
        categoryId="finansial"
      />
    </div>
  );
}
