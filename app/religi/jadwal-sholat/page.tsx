"use client";

import React from "react";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { usePrayer } from "@/features/sholat/hooks/usePrayer";
import { PrayerForm } from "@/features/sholat/components/PrayerForm";
import { PrayerResult } from "@/features/sholat/components/PrayerResult";
import { Compass, AlertTriangle } from "lucide-react";

export default function SholatPage() {
  const hook = usePrayer();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Religi", href: "/religi" },
            { label: "Kalkulator Jadwal Sholat" },
          ]}
        />
        <div className="mt-2 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Jadwal Sholat
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2 max-w-2xl text-balance">
            Dapatkan waktu sholat otomatis berbasis lokasi secara akurat dengan
            berbagai metode penghitungan standar internasional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start relative my-4">
        <PrayerForm hook={hook} />
        <PrayerResult hook={hook} />
      </div>

      {/* SEKSI EDUKASI & INFORMASI */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          {/* Background Decorators */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4A7C59] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-[0.08] translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="flex flex-col gap-16 relative z-10 w-full">
            {/* Header Edukasi */}
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block font-ui">
                Edukasi Sains Islam
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6 text-balance">
                Memahami Mekanika Perhitungan Waktu Sholat
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90 max-w-3xl">
                Waktu sholat fardhu secara mutlak ditentukan secara saintifik
                berdasarkan kalkulasi orbit posisi matahari di langit.
                Konstelasi waktu ini berubah setiap siklus harinya dan akan
                sangat bervariasi bergantung pada spesifikasi lokasi (Lintang,
                Bujur, dan Zona Waktu).
              </p>
            </div>

            <div className="flex flex-col gap-16 mx-auto w-full border-t border-[#7A5C42]/30 pt-16">
              {/* 1. Cara Sholat Dihitung */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4 font-ui">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Transisi Posisi Matahari
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-body">
                  {[
                    {
                      name: "Subuh (Fajr)",
                      desc: "Fajar Shadiq mengudara ketika matahari menyentuh sudut elevasi negatif spesifik di bawah cakrawala ufuk timur bumi.",
                    },
                    {
                      name: "Dzuhur (Zawal)",
                      desc: "Matahari melewati garis meridian lokal dan mencapai titik zenit absolut tertinggi di tengah langit hari tersebut.",
                    },
                    {
                      name: "Asar",
                      desc: "Berlaku pasca-dzuhur tatkala bayangan pilar menyentuh panjang yang sama dengan tinggi bendanya seutuhnya.",
                    },
                    {
                      name: "Maghrib",
                      desc: "Titik waktu tatkala seluruh siluet cahaya mentari tenggelam melintasi cakrawala sisi barat secara penuh.",
                    },
                    {
                      name: "Isya",
                      desc: "Ketika awan jingga dan mega merah (sebagai indikator terbenam) menghilang sempurna dari pandangan ufuk barat.",
                    },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className="p-6 rounded-3xl bg-[#4A7C59]/10 border border-[#4A7C59]/30 hover:bg-[#4A7C59]/20 transition-all"
                    >
                      <h4 className="font-heading font-extrabold text-[#E8F5E9] text-xl mb-3">
                        {p.name}
                      </h4>
                      <p className="text-[#EDE0D0] text-sm opacity-80 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 opacity-60">
                    <h4 className="font-heading font-extrabold text-white text-xl mb-3">
                      Syuruq (Terbit)
                    </h4>
                    <p className="text-[#EDE0D0] text-sm opacity-80 leading-relaxed italic">
                      Momen murni ketika titik paling atas matahari muncul
                      mengiris cakrawala timur.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Metode Standar */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4 font-ui">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Metodologi & Parameter Lintang Extrim
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-inner">
                    <h4 className="font-heading font-black text-[#E8F5E9] text-2xl mb-6 border-b border-white/10 pb-4">
                      Otoritas Derajat
                    </h4>
                    <ul className="space-y-4 text-[#EDE0D0]/90 text-sm list-none">
                      <li className="flex gap-3 items-baseline">
                        <span className="text-[#C17A3A] font-bold">MWL:</span>
                        <span>Dunia Islam (MWL), Subuh: 18° / Isya: 17°</span>
                      </li>
                      <li className="flex gap-3 items-baseline border-t border-white/5 pt-4">
                        <span className="text-[#C17A3A] font-bold">ISNA:</span>
                        <span>Amerika Utara, Subuh: 15° / Isya: 15°</span>
                      </li>
                      <li className="flex gap-3 items-baseline border-t border-white/5 pt-4">
                        <span className="text-[#C17A3A] font-bold">Mesir:</span>
                        <span>
                          General Authority, Subuh: 19.5° / Isya: 17.5°
                        </span>
                      </li>
                      <li className="flex gap-3 items-baseline border-t border-white/5 pt-4">
                        <span className="text-[#C17A3A] font-bold">
                          Makkah:
                        </span>
                        <span>
                          Umm al-Qura, Subuh: 18.5° / Isya: Fix 90 mnt.
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#1A0E07]/40 border border-[#C17A3A]/30 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-20 h-20 text-[#C17A3A]" />
                    </div>
                    <h4 className="font-heading font-black text-[#C17A3A] text-2xl mb-6 border-b border-[#C17A3A]/20 pb-4">
                      Masalah Lintang Tinggi
                    </h4>
                    <p className="text-sm text-[#EDE0D0] opacity-80 mb-6 leading-relaxed">
                      Skema perhitungan mengalami anomali di wilayah kutub
                      (matahari tidak terbenam sempurna). Kami menggunakan
                      kaidah darurat fiqhiyyah:
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                        <span className="block font-bold text-white mb-1">
                          Tengah Malam (Middle Night)
                        </span>
                        <span className="text-xs opacity-60">
                          Durasi terbenam ke fajar dibagi rata sebagai
                          kompensasi.
                        </span>
                      </div>
                      <div className="p-4 rounded-2xl bg-black/30 border border-white/5">
                        <span className="block font-bold text-white mb-1">
                          1/7 Malam (One Seventh)
                        </span>
                        <span className="text-xs opacity-60">
                          Pembagian segmen ekuivalen berdasarkan fraksi malam
                          hari.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Penentuan Kiblat */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4 font-ui">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#C17A3A] text-[#1A0E07] flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Landasan Algoritma & Kiblat
                  </h3>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 flex flex-col sm:flex-row gap-10 items-center shadow-inner relative group">
                  <div className="w-24 h-24 rounded-[2rem] bg-[#4A7C59]/20 flex items-center justify-center shrink-0 border border-[#4A7C59]/40 shadow-xl">
                    <Compass className="w-14 h-14 text-[#4A7C59] animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-4 font-body">
                    <h4 className="text-2xl font-black text-[#E8F5E9] font-heading">
                      Penunjuk Arab Ka&apos;bah
                    </h4>
                    <p className="text-base leading-relaxed text-[#EDE0D0]/80">
                      Kiblat dihitung presisi menggunakan rumus trigonometri
                      bola (<em>Spherical Cosinus</em>) untuk menemukan garis
                      lingkaran besar lintasan geodesik terpendek antara titik
                      berdirinya pengguna terhadap koordinat pusaran Ka&apos;bah
                      di Makkah.
                    </p>
                    <div className="text-xs bg-black/40 px-5 py-3 rounded-2xl border border-white/10 font-mono opacity-50 w-fit">
                      Waktu = 720 - 4 × (Bujur + Sudut Jam) - EOT
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#1A0E07]/60 p-10 lg:p-14 rounded-[3rem] border border-[#9C4A2A]/40 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden mt-8">
              <div className="flex flex-col items-center gap-8">
                <AlertTriangle className="w-12 h-12 text-[#9C4A2A] animate-pulse" />
                <div className="flex flex-col gap-5">
                  <h4 className="font-heading font-black text-[#FFF0EB] text-2xl uppercase tracking-[0.2em]">
                    Disclaimer Presisi Astronomikal
                  </h4>
                  <p className="text-[#EDE0D0] font-body text-base leading-relaxed opacity-70 text-balance">
                    NusantaraTools menyuplai wawasan kalkulasi hitung secara
                    otomatis. Meskipun kami mendayakan algoritma adhan standar
                    tingkat atas, faktor distorsi lokal tinggi atmosfer maupun
                    pembulatan kalibrasi tak terduga sangat dapat menyebabkan
                    osilasi presisi jadwal 1-2 menit. Silakan rujuk kalender
                    otoritas masjid yurisdiksi Anda sebagai pengadil syariat
                    resmi final.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools currentPath="/religi/sholat" categoryId="religi" />
    </div>
  );
}
