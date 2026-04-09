"use client";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { RelatedTools } from "@/components/layout/RelatedTools";
import { useSuratLamaran } from "@/features/surat-lamaran-kerja/hooks/useSuratLamaran";
import { SuratLamaranForm } from "@/features/surat-lamaran-kerja/components/SuratLamaranForm";
import { SuratLamaranPreview } from "@/features/surat-lamaran-kerja/components/SuratLamaranPreview";
import { CheckCircle2, FileText, CheckSquare, Target } from "lucide-react";

export default function SuratLamaranKerjaPage() {
  const {
    biodata,
    setBiodata,
    companyData,
    setCompanyData,
    completeness,
    setCompleteness,
    settings,
    setSettings,
    clearData,
    isLoaded,
  } = useSuratLamaran();

  // Prevent hydration mismatch by returning null until client-side loaded.
  // Alternatively we can render skeletons, but text generators often need immediate state.
  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header - Hidden on print */}
      <div className="flex flex-col gap-4 print:hidden">
        <Breadcrumbs
          items={[
            { label: "Produktivitas", href: "/produktivitas" },
            { label: "Surat Lamaran Kerja" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Surat Lamaran Kerja Generator
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Buat cover letter profesional anti-ribet, 100% tersimpan di lokal.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative my-4">
        {/* Left Side: Settings/Form */}
        <div className="lg:col-span-5 flex flex-col gap-6 print:hidden">
          <SuratLamaranForm
            biodata={biodata}
            setBiodata={setBiodata}
            companyData={companyData}
            setCompanyData={setCompanyData}
            completeness={completeness}
            setCompleteness={setCompleteness}
            settings={settings}
            setSettings={setSettings}
            clearData={clearData}
          />
        </div>

        {/* Right Side: Preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-6">
            <SuratLamaranPreview
              biodata={biodata}
              companyData={companyData}
              completeness={completeness}
              settings={settings}
            />
          </div>
        </div>
      </div>

      {/* Educational Content - Hidden on print */}
      <div className="mt-16 mb-24 print:hidden">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#4A7C59] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Panduan Melamar Kerja
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Mengapa Surat Lamaran Itu Penting?
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Surat Lamaran Kerja atau Cover Letter adalah perwakilan diri
                  Anda sebelum bertatap muka langsung dengan pewawancara. Sebuah
                  surat yang terstruktur rapi akan menunjukkan profesionalisme
                  dan keseriusan Anda.
                </p>

                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Pusatkan perhatian rekruter pada kemampuan Anda dengan
                      tidak melupakan format dan etika penulisan yang baku di
                      Indonesia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Kesan Pertama",
                    desc: "Surat lamaran yang baik menunjukkan kemampuan komunikasi tertulis Anda kepada HRD.",
                  },
                  {
                    icon: CheckSquare,
                    title: "Lebih Detail dari CV",
                    desc: "Memungkinkan Anda menjelaskan mengapa pengalaman di CV relevan dengan posisi yang dilamar.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Menunjukkan Niat",
                    desc: "Format yang disiapkan dengan teliti menunjukkan antusiasme dan riset Anda terhadap perusahaan.",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#C17A3A]/30 transition-all group"
                  >
                    <step.icon className="w-8 h-8 text-[#C17A3A] mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-lg font-bold font-heading text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-[#EDE0D0]/70 font-body text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="print:hidden">
        <RelatedTools
          currentPath="/produktivitas/surat-lamaran-kerja"
          categoryId="produktivitas"
        />
      </div>
    </div>
  );
}
