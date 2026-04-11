"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React, { Suspense, useEffect } from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useQrGenerator } from "@/features/qr-generator/hooks/useQrGenerator";
import { QrForm } from "@/features/qr-generator/components/QrForm";
import { QrPreview } from "@/features/qr-generator/components/QrPreview";
import { useSearchParams } from "next/navigation";
import {
  Info,
  CheckCircle2,
  QrCode,
  Smartphone,
  Download,
  Palette,
} from "lucide-react";

function GeneratorContent() {
  const searchParams = useSearchParams();
  const initialUrl = searchParams.get("url") || undefined;

  const {
    activeTab,
    setActiveTab,
    inputData,
    updateInput,
    options,
    updateOptions,
    encodedPayload,
    errors,
    resetForm,
    handleDownload,
  } = useQrGenerator(initialUrl);

  // Auto-set tab to URL if param exists and isn't the active tab on mount
  useEffect(() => {
    if (initialUrl && activeTab !== "url") {
      setActiveTab("url");
    }
  }, [initialUrl, activeTab, setActiveTab]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
      {/* Left Side: Form */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <QrForm
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          inputData={inputData}
          updateInput={updateInput}
          options={options}
          updateOptions={updateOptions}
          errors={errors}
          resetForm={resetForm}
        />
      </div>

      {/* Right Side: Preview */}
      <div className="lg:col-span-7">
        <QrPreview
          payload={encodedPayload}
          options={options}
          onDownload={handleDownload}
        />
      </div>
    </div>
  );
}

export default function QrGeneratorPage() {
  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Utilitas", href: "/utilitas" },
            { label: "QR Generator" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            QR Generator
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Buat kode QR khusus dari berbagai jenis data lalu unduh dengan
            cepat.
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }
      >
        <GeneratorContent />
      </Suspense>

      {/* Educational Content */}
      <div className="mt-16 mb-24">
        <div className="relative">
          <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl relative border border-[#7A5C42]/30">
            {/* Background Decorators */}
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A0E07] rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Jembatan Fisik ke Digital
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Mengapa Membutuhkan QR Code?
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  QR Code (Quick Response Code) adalah standar industri modern
                  untuk menjembatani dunia fisik dan digital. Cukup dengan satu
                  pemindaian dari kamera smartphone, pengguna dapat langsung
                  diarahkan ke form, situs web, atau menyimpan rincian kontak
                  secara otomatis.
                </p>

                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Berikan pengalaman instan tanpa gangguan. Hilangkan
                      rintangan proses mengetik URL secara manual atau
                      memasukkan digit nomor secara lambat!
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: QrCode,
                    title: "Pilih Format",
                    desc: "Berbagai tipe tersedia mulai dari Tautan, Email, Teks hingga Nomor Telepon.",
                  },
                  {
                    icon: Palette,
                    title: "Kustomisasi Tema",
                    desc: "Ubah gaya dan perpaduan warna untuk mencocokkan identitas merek secara bebas.",
                  },
                  {
                    icon: Smartphone,
                    title: "Uji Pindai",
                    desc: "Pratinjau antarmuka langsung bagaimana tampilan QR akan bekerja sebelum diunduh.",
                  },
                  {
                    icon: Download,
                    title: "Unduh Siap Pakai",
                    desc: "Simpan dalam format file vektor berkualitas tinggi (SVG) atau pixel ringan (PNG).",
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

              {/* Benefits Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4 border-b border-[#7A5C42]/30 pb-4">
                  <h3 className="text-2xl font-bold font-heading text-white">
                    Keuntungan Signifikan QR Code
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                  <div className="space-y-6">
                    <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-90">
                      Anda mungkin berpikir stiker sederhana bukanlah revolusi
                      marketing teknologi paling canggih, namun keuntungannya
                      berbicara lain.
                    </p>
                    <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Interaksi Ultra-Cepat:</strong> Bebas proses
                          mengetik manual sehingga cocok ditaruh di kartu nama
                          digital atau banner acara.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Dukungan Lintas Platform Bawaan:</strong>{" "}
                          Mayoritas OS smartphone (Android & iOS) kini memindai
                          QR secara langsung lewat kamera bawaan!
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Terkoneksi O2O Pemasaran:</strong> QR
                          merupakan nyawa dari model sistem periklanan
                          *Offline-to-Online* yang sangat terukur.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[300px] aspect-square">
                      <div className="absolute inset-0 bg-[#C17A3A] blur-[60px] opacity-20 animate-pulse" />
                      <div className="relative z-10 w-full h-full border-4 border-[#C17A3A]/20 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center bg-[#1A0E07]/40 backdrop-blur-xl gap-2 hover:scale-[1.02] transition-transform duration-500">
                        <QrCode className="w-20 h-20 text-[#C17A3A]" />
                        <span className="text-xs font-bold text-white tracking-widest uppercase mt-4">
                          Siap Di Scan
                        </span>
                        <p className="text-[10px] text-[#EDE0D0] opacity-60 mt-4 leading-relaxed italic">
                          &quot;Integrasikan pemasaran tanpa batas pada setiap
                          materi promosi produk Anda&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <RelatedTools
        currentPath="/utilitas/qr-generator"
        categoryId="utilitas"
      />
    </div>
  );
}
