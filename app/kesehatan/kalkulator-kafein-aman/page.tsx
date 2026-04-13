"use client";

import React from "react";
import { Info, CheckCircle2, Clock, Zap, AlertTriangle } from "lucide-react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useCaffeine } from "@/features/kafein/hooks/useCaffeine";
import { CaffeineForm } from "@/features/kafein/components/CaffeineForm";
import { CaffeineResult } from "@/features/kafein/components/CaffeineResult";

export default function CaffeineCalculator() {
  const hook = useCaffeine();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Kafein Aman" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Kafein Aman
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Pantau Total Asupan Kafein Harian Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <CaffeineForm hook={hook} />
        <div className="lg:col-span-6 h-full">
          <CaffeineResult hook={hook} />
        </div>
      </div>

      {/* Educational Section */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Kesehatan & Nutrisi
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Memahami Kafein dan Batas Amannya
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                Kafein adalah senyawa psikoaktif yang paling luas dikonsumsi di
                dunia. Memahami cara kerjanya—dan di mana batas toleransi harian
                yang sehat—dapat membantu Anda membuat keputusan konsumsi yang
                lebih cerdas.
              </p>
              <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm text-left shadow-inner">
                <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                <div className="flex flex-col gap-3">
                  <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                    Kafein bekerja dengan memblokir adenosin—neurotransmitter
                    yang mendorong rasa kantuk—sehingga secara temporer
                    meningkatkan kewaspadaan dan mengurangi kelelahan yang
                    dirasakan.
                  </p>
                  <p className="text-sm text-[#EDE0D0] font-body opacity-80">
                    Kalkulator ini membantu Anda memantau akumulasi kafein dari
                    seluruh sumber harian dan membandingkannya terhadap pedoman
                    keamanan berbasis profil kesehatan yang berlaku.
                  </p>
                </div>
              </div>
            </div>

            {/* 1. Batas Rekomendasi */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  1
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Batas Aman Berdasarkan Profil
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30">
                  <span className="text-xs font-bold bg-[#4A7C59]/20 text-[#E8F5E9] px-2.5 py-1 rounded-full font-mono block mb-3 w-fit">
                    ≤ 400 mg/hari
                  </span>
                  <h4 className="text-xl font-bold font-heading text-[#E8F5E9] mb-2">
                    Dewasa Sehat
                  </h4>
                  <p className="text-[#E8F5E9]/80 text-sm font-body leading-relaxed">
                    Batas aman yang ditetapkan untuk sebagian besar orang dewasa
                    normal. Setara dengan sekitar 4 cangkir kopi standar sehari.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-[#C17A3A]/10 border border-[#C17A3A]/30">
                  <span className="text-xs font-bold bg-[#C17A3A]/20 text-[#FFF3E0] px-2.5 py-1 rounded-full font-mono block mb-3 w-fit">
                    ≤ 200 mg/hari
                  </span>
                  <h4 className="text-xl font-bold font-heading text-[#FFF3E0] mb-2">
                    Hamil / Menyusui
                  </h4>
                  <p className="text-[#FFF3E0]/80 text-sm font-body leading-relaxed">
                    Kafein menembus plasenta. WHO dan sebagian besar lembaga
                    kesehatan merekomendasikan pemotongan setengah dari batas
                    normal selama kehamilan.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-xs font-bold bg-white/10 text-[#EDE0D0] px-2.5 py-1 rounded-full font-mono block mb-3 w-fit">
                    ≤ 100 mg/hari
                  </span>
                  <h4 className="text-xl font-bold font-heading text-white mb-2">
                    Remaja (12–18)
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Sistem saraf yang masih berkembang lebih sensitif terhadap
                    stimulan. Batas ketat diperlukan untuk mencegah gangguan
                    tidur dan kecemasan.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Half-Life & Sumber Kafein */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  2
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Metabolisme & Sumber Umum Kafein
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                <div>
                  <h5 className="font-bold text-xl text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#C17A3A]" /> Waktu Paruh
                    Kafein
                  </h5>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-5 opacity-90">
                    Kafein memiliki <strong>waktu paruh 5–6 jam</strong> pada
                    orang dewasa sehat. Artinya, separuh dari kafein yang Anda
                    konsumsi pukul 14:00 masih aktif di sistem Anda saat pukul
                    20:00. Eliminasi penuh bisa memakan waktu{" "}
                    <strong>10–12 jam</strong>.
                  </p>
                  <ul className="space-y-3 text-sm font-body text-[#EDE0D0]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        Hindari kafein setidaknya{" "}
                        <strong>6 jam sebelum tidur</strong> untuk menjaga
                        kualitas tidur.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                      <span>
                        Sensitivitas terhadap kafein meningkat pada orang dengan
                        kondisi <strong>kecemasan, hipertensi</strong>, atau
                        penggunaan obat-obatan tertentu.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shadow-inner">
                  <h5 className="font-bold text-sm text-[#C17A3A] uppercase tracking-widest mb-4">
                    Kandungan Kafein Umum
                  </h5>
                  <div className="space-y-2 text-sm font-body">
                    {[
                      ["Kopi (8 oz)", "80–100 mg"],
                      ["Espresso (1 shot)", "63 mg"],
                      ["Teh Hitam (8 oz)", "47 mg"],
                      ["Teh Hijau (8 oz)", "28 mg"],
                      ["Cola (12 oz)", "35 mg"],
                      ["Minuman Energi (8 oz)", "70–100 mg"],
                      ["Cokelat Hitam (1 oz)", "12 mg"],
                    ].map(([source, mg]) => (
                      <div
                        key={source}
                        className="flex justify-between text-[#EDE0D0]"
                      >
                        <span className="opacity-80">{source}</span>
                        <span className="font-bold text-[#C17A3A]">{mg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Efek & Tips */}
            <section className="space-y-8">
              <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                <div className="w-10 h-10 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold shrink-0">
                  3
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Efek & Manfaat Memantau Kafein
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <Zap className="w-8 h-8 text-[#4A7C59] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Tidur Lebih Berkualitas
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Mengetahui waktu paruh kafein membantu Anda memilih waktu
                    konsumsi yang tidak mengganggu siklus tidur dan pemulihan
                    malam hari.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <AlertTriangle className="w-8 h-8 text-[#C17A3A] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Cegah Efek Berlebihan
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Konsumsi berlebih memicu gelisah, jantung berdebar, sakit
                    kepala, dan kecemasan. Pemantauan rutin mencegah tubuh masuk
                    ke zona berisiko.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-[#9C4A2A] mb-4" />
                  <h4 className="font-bold text-white mb-2">
                    Kesadaran Nutrisi
                  </h4>
                  <p className="text-[#EDE0D0]/80 text-sm font-body leading-relaxed">
                    Banyak orang tidak menyadari berapa banyak kafein yang
                    mereka konsumsi dari berbagai sumber. Kalkulator ini
                    membangun kesadaran holistik.
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
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Berapa banyak kafein yang terlalu banyak?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Untuk dewasa sehat, lebih dari 400mg per hari mulai
                      meningkatkan risiko efek samping. Ini dapat bervariasi
                      tergantung berat badan, usia, genetik, dan kondisi
                      kesehatan individual.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Bisakah saya mencatat beberapa minuman sekaligus?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Ya! Gunakan tombol &quot;+ Tambah Sumber Kafein&quot;
                      untuk menambahkan setiap minuman atau makanan secara
                      terpisah. Kalkulator akan menjumlahkan semuanya secara
                      otomatis.
                    </p>
                  </details>
                </div>
                <div className="space-y-6">
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Mengapa berat badan perlu dimasukkan?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Berat badan memungkinkan perhitungan kafein per kg berat
                      badan (panduan umum: batas aman ≈ 6mg/kg). Ini memberikan
                      perspektif yang lebih personal dibanding angka absolut
                      400mg.
                    </p>
                  </details>
                  <details className="group border-b border-[#7A5C42]/30 pb-4">
                    <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                      Apakah kalkulator ini cocok untuk remaja?
                    </summary>
                    <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                      Ya, pilih profil &quot;Remaja&quot; dan kalkulator akan
                      menggunakan batas yang lebih ketat (100mg). Untuk anak di
                      bawah 12 tahun, kafein sebaiknya tidak dikonsumsi sama
                      sekali.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#C17A3A]/40 text-center max-w-3xl mx-auto shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-[#C17A3A]/5 pointer-events-none" />
              <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">
                Jadikan Kafein Sekutu, Bukan Musuh
              </h4>
              <p className="text-[#EDE0D0] font-body text-sm leading-relaxed relative z-10">
                Dengan kesadaran yang tepat tentang asupan harian, kafein bisa
                menjadi pendukung produktivitas yang efektif. Kombinasikan
                insight dari Kalkulator Kafein ini dengan Kalkulator Kebutuhan
                Air dan Kalkulator Siklus Tidur untuk rutinitas kesehatan yang
                benar-benar holistik.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/kafein" categoryId="kesehatan" />
    </div>
  );
}
