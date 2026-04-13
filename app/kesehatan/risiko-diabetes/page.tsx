"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { DiabetesForm } from "@/features/diabetes/components/DiabetesForm";
import { DiabetesResult } from "@/features/diabetes/components/DiabetesResult";
import { useDiabetes } from "@/features/diabetes/hooks/useDiabetes";
import { RelatedTools } from "@/components/layout/RelatedTools";

export default function DiabetesRiskCalculator() {
  const diabetesHook = useDiabetes();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Kesehatan", href: "/kesehatan" },
            { label: "Risiko Diabetes" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Kalkulator Risiko Diabetes
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Penilaian Risiko Diabetes Tipe 2 — Berbasis Skor FINDRISC
          </p>
        </div>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        <DiabetesForm hook={diabetesHook} />
        <div className="lg:col-span-7 h-full">
          <DiabetesResult hook={diabetesHook} />
        </div>
      </div>

      {/* Educational Section */}
      <div className="mt-8 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
          <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900 rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            <div
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>
          <div className="flex flex-col gap-16 relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Edukasi Diabetes & Pencegahan
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                Tentang FINDRISC & Diabetes Tipe 2
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-8 opacity-90">
                Skor FINDRISC (Finnish Diabetes Risk Score) dikembangkan oleh
                Lindström & Tuomilehto pada 2003 dan direkomendasikan oleh WHO
                dan IDF sebagai alat skrining diabetes yang non-invasif dan
                akurat.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C17A3A] text-white text-sm">
                      1
                    </span>
                    Mengapa Skrining Penting?
                  </h3>
                  <p className="text-[#EDE0D0] leading-relaxed opacity-80">
                    Banyak orang menderita diabetes tipe 2 selama bertahun-tahun
                    tanpa menyadarinya. Skrining memungkinkan deteksi dini dan
                    intervensi gaya hidup yang dapat menunda atau mencegah
                    penyakit sepenuhnya.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C17A3A] text-white text-sm">
                      2
                    </span>
                    Gejala Umum Diabetes
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {[
                      "Sering merasa haus (polidipsia)",
                      "Sering buang air kecil, terutama di malam hari",
                      "Luka yang sulit sembuh",
                      "Pandangan kabur atau sering pusing",
                      "Penurunan berat badan tanpa sebab jelas",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-[#EDE0D0] opacity-80"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C17A3A]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Langkah Pencegahan
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#C17A3A]/20 flex items-center justify-center shrink-0">
                      <Activity className="w-6 h-6 text-[#C17A3A]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        Aktivitas Fisik
                      </h4>
                      <p className="text-sm text-[#EDE0D0] opacity-70">
                        Minimal 150 menit aktivitas intensitas sedang per minggu
                        (seperti jalan cepat).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-900/20 flex items-center justify-center shrink-0">
                      <div className="w-6 h-6 rounded-full bg-green-500/40" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        Nutrisi Seimbang
                      </h4>
                      <p className="text-sm text-[#EDE0D0] opacity-70">
                        Perbanyak serat dari sayuran, buah, dan biji-bijian.
                        Batasi asupan gula dan karbohidrat olahan.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-900/20 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        Kontrol Berat Badan
                      </h4>
                      <p className="text-sm text-[#EDE0D0] opacity-70">
                        Menurunkan berat badan 5–7% saja sudah secara langsung
                        mengurangi risiko diabetes secara signifikan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/kesehatan/diabetes" categoryId="kesehatan" />
    </div>
  );
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
