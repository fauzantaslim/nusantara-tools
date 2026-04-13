"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useAir } from "@/features/air/hooks/useAir";
import { AirForm } from "@/features/air/components/AirForm";
import { AirResult } from "@/features/air/components/AirResult";
import { Activity, CheckCircle2, CloudSun, Droplets, Info } from "lucide-react";

export default function WaterIntakeCalculator() {
  const airHook = useAir();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header Bar */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Kalkulator Kebutuhan Air" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Kebutuhan Air
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Estimasi Target Hidrasi Harian Optimal Anda
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Input Form */}
        <AirForm airHook={airHook} />
        {/* Right Side: Result Display */}
        <div className="lg:col-span-6 h-full">
          <AirResult result={airHook.result} />
        </div>
      </div>

      {/* Informational Content Section (Premium Dark Layout - matching BMI visually, content paraphrased specifically for this tool) */}
      <div className="mt-16 mb-24">
        <div className="relative">
          {/* Main Container - Dark Theme (Tanah Tua) */}
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
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
                  Edukasi Kesehatan & Nutrisi
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Memahami Kebutuhan Air Tubuh Anda
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Konsistensi dalam menghidrasi tubuh adalah esensi dari
                  metabolisme dan fungsi seluler yang optimal. Jumlah air yang
                  Anda perlukan adalah parameter highly-individual yang
                  menyesuaikan dengan adaptasi lingkungan dan aktivitas Anda.
                </p>

                {/* Pull Quote Box */}
                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#4A7C59] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Kalkulator Asupan Air kami membantu Anda memproyeksikan
                      basis logis seberapa banyak air yang idealnya Anda minum
                      berdasarkan berat badan dan elemen terkait lainnya.
                    </p>
                    <p className="text-sm text-[#EDE0D0] font-body">
                      Dengan indikator dasar kalkulasi dari bobot fisik yang
                      disesuaikan secara dinamis, kalkulator ini memandu dan
                      memberikan saran konseptual terbaik, menunjang pola hidup
                      harian—hingga memastikan bahwa sistem tubuh bekerja secara
                      kohesif, tanpa ada risiko yang ditimbulkan dari kelelahan
                      dehidrasi berat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-16 mx-auto w-full">
                {/* 1. Pengaruh dan Dampak */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">
                      1
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Spektrum Faktor Hidrasi
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 transition-colors">
                      <h4 className="flex items-center gap-2 text-xl font-bold font-heading text-[#E8F5E9] mb-3">
                        <Activity className="w-5 h-5 text-[#4A7C59]" /> Tingkat
                        Aktivitas
                      </h4>
                      <p className="text-[#E8F5E9]/80 font-body text-sm leading-relaxed">
                        Gerak badan dan olahraga ekstrem secara langsung
                        mendesak sistem tubuh memproduksi rilis keringat,
                        menghabiskan retensi air jauh lebih pesat.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-colors">
                      <h4 className="flex items-center gap-2 text-xl font-bold font-heading text-white mb-3">
                        <CloudSun className="w-5 h-5 text-[#C17A3A]" /> Iklim
                        Alami
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Eksposur pada ekuator panas dan curah kelembapan pekat
                        mempercepat persentase pembuangan air kulit tanpa
                        disadari oleh individu tersebut.
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 transition-colors">
                      <h4 className="flex items-center gap-2 text-xl font-bold font-heading text-white mb-3">
                        <Droplets className="w-5 h-5 text-[#9C4A2A]" /> Kondisi
                        Fisiologis
                      </h4>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-80">
                        Tahapan krusial medis seperti gestasi (kehamilan), masa
                        pemulihan penyakit flu, serta sistem imun lemah
                        mendorong limitasi rehidrasi yang tak bisa disepelekan.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Sumber Rehidrasi Alternatif */}
                <section className="space-y-8">
                  <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                    <div className="w-10 h-10 rounded-full bg-[#4A7C59] text-[#1A0E07] flex items-center justify-center font-bold">
                      2
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">
                      Sumber Subtitusi Utama
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                    <div>
                      <h5 className="font-bold text-xl text-white mb-5">
                        Diversitas Asupan Air
                      </h5>
                      <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 opacity-90">
                        Meskipun proyeksi basis kalkulator ini didominasi oleh
                        asupan meminum air putih murni setiap hari, pastikan
                        untuk merealisasikan bahwa kompenen tubuh secara konstan
                        pula menerimanya melalui:
                      </p>
                      <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#4A7C59] shrink-0 mt-0.5" />
                          <span>
                            <strong>Air Putih:</strong> Komposisi inti—katalis
                            mutlak, terbaik, murni.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Sayur & Buah Segar:</strong> Kandungan
                            elemen mikro semangka, jeruk nipis, dan bilberry
                            memiliki saturasi fluida yang tajam dan segar.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#9C4A2A] shrink-0 mt-0.5" />
                          <span>
                            <strong>Nutrisi Cair Lainnya:</strong> Jus dan teh
                            harian mampu melengkapi kuotanya (namun perihal
                            kafein diuretik seperti kopi perlu dipertimbangkan
                            matang-matang).
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-[#2C1A0E] p-5 rounded-2xl border border-white/10 shrink-0 shadow-inner">
                        <h5 className="font-bold text-sm text-[#4A7C59] uppercase tracking-widest mb-3">
                          Tanda Hidrasi Memadai
                        </h5>
                        <ul className="space-y-3 font-body text-[#F5EDE3] text-sm">
                          <li className="flex gap-2 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div>{" "}
                            Urine tampak jernih hingga kuning terang.
                          </li>
                          <li className="flex gap-2 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div>{" "}
                            Pengosongan kandung kemih 4-10 interval teratur.
                          </li>
                          <li className="flex gap-2 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]"></div>{" "}
                            Kulit terhidrasi membal dan saliva terasa pekat di
                            kerongkongan.
                          </li>
                        </ul>
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
                      Kredibilitas tambahan pada aspek asupan yang diatur secara
                      sistem.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full font-body">
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Apakah kopi memblokir retensi asupan murni saya?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Secara komprehensif, ya. Kafein bertindak mempercepat
                          stimulasi ekskresi buang air, yang artinya mengurangi
                          net jumlah saturasi rehidrasinya. Itulah karenanya
                          kita merekomendasikan kompensasi volume jika
                          konsumsinya tinggi.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#4A7C59] transition">
                          Haruskah saya menambah proporsi cairan setiap ngegym?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Pasti, transpirasi fisik membuat tubuh langsung
                          mengalami defisit mendadak, menggantinya dengan
                          meminum berulang sesuai target dapat me-restart
                          performa kembali optimal.
                        </p>
                      </details>
                    </div>
                    <div className="space-y-6">
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Hubungan Kalkulator Air dengan Tools Lain
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Air memiliki signifikansi integral untuk semua
                          kalkulator kami. Penggunaan pelacak <em>BMI</em>,
                          misalnya, atau perhitungkan{" "}
                          <em>Macro Diet & Kalori</em> bakal terbuang sia-sia
                          apabila cairan untuk mengoptimasi sistem sekresi
                          internal kekurangan daya dorong. Ini selaras layaknya
                          sepasang sepatu fungsional.
                        </p>
                      </details>
                      <details className="group border-b border-[#7A5C42]/30 pb-4">
                        <summary className="font-bold text-white cursor-pointer hover:text-[#C17A3A] transition">
                          Apakah hasil di platform NusantaraTools mutlak?
                        </summary>
                        <p className="mt-3 text-[#EDE0D0] text-sm leading-relaxed">
                          Segala output data pada modul interkomputerisasi kami
                          sifatnya prediktif dan fundamental rujukan awal
                          semata; ia tidak dapat menggantikan peran utama
                          medikal profesional dari pakar spesialis Anda sendiri.
                        </p>
                      </details>
                    </div>
                  </div>
                </section>

                <div className="bg-[#1A0E07]/60 p-6 sm:p-8 rounded-[2rem] border border-[#4A7C59]/40 text-center max-w-3xl mx-auto shadow-inner mt-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[#4A7C59]/5 pointer-events-none" />
                  <h4 className="font-heading font-extrabold text-white text-xl mb-4 relative z-10">
                    Maksimalkan Tujuan Kesehatan Fisik Penuh
                  </h4>
                  <p className="text-[#EDE0D0] font-body text-sm leading-relaxed mb-6 block relative z-10">
                    Mencapai target metrik kalori atau BMI takkan pernah
                    berjalan mulus jika fondasi harian kita di bawah batas
                    rekomendasi logis Air Putih. Rancang rutinitas sistematis
                    sejak sekarang dan saksikan perubahan besar dari setiap
                    tetesnya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/kesehatan/air" categoryId="kesehatan" />
    </div>
  );
}
