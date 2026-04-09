"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React, { useEffect } from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useSplitBill } from "@/features/split-bill/hooks/useSplitBill";
import { SplitBillSettings } from "@/features/split-bill/components/SplitBillSettings";
import { SplitBillResult } from "@/features/split-bill/components/SplitBillResult";
import {
  Info,
  CheckCircle2,
  ReceiptText,
  ShieldCheck,
  UsersRound,
  Send,
} from "lucide-react";

export default function SplitBillPage() {
  const {
    mode,
    setMode,
    people,
    addPerson,
    removePerson,
    items,
    addItem,
    removeItem,
    updateItem,
    toggleItemAssignment,
    manualSubTotal,
    setManualSubTotal,
    taxPercent,
    setTaxPercent,
    servicePercent,
    setServicePercent,
    subTotal,
    taxAmount,
    serviceAmount,
    grandTotal,
    breakdown,
    processReceipt,
    isProcessingOcr,
    ocrProgress,
    ocrError,
    generateShareLink,
    loadFromShareLink,
    clearPeople,
  } = useSplitBill();

  // Handle load state from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const s = searchParams.get("s");
    if (s) {
      loadFromShareLink(s);
      // Clean up URL without reload
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [loadFromShareLink]);

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Finansial", href: "/finansial" },
            { label: "Split Bill Calculator" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            Split Bill Calculator
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Hitung patungan otomatis dari foto struk makan, bagikan linknya ke
            teman!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Settings / Uploader */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <SplitBillSettings
            mode={mode}
            setMode={setMode}
            people={people}
            addPerson={addPerson}
            removePerson={removePerson}
            clearPeople={clearPeople}
            manualSubTotal={manualSubTotal}
            setManualSubTotal={setManualSubTotal}
            taxPercent={taxPercent}
            setTaxPercent={setTaxPercent}
            servicePercent={servicePercent}
            setServicePercent={setServicePercent}
            onFileSelect={processReceipt}
            isProcessingOcr={isProcessingOcr}
            ocrProgress={ocrProgress}
            ocrError={ocrError}
          />
        </div>

        {/* Right Side: Interactive List and Result */}
        <div className="lg:col-span-7">
          <SplitBillResult
            mode={mode}
            people={people}
            items={items}
            addItem={addItem}
            updateItem={updateItem}
            removeItem={removeItem}
            toggleItemAssignment={toggleItemAssignment}
            subTotal={subTotal}
            taxAmount={taxAmount}
            serviceAmount={serviceAmount}
            grandTotal={grandTotal}
            breakdown={breakdown}
            generateShareLink={generateShareLink}
          />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-16 mb-24">
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
                  Patungan Adil & Transparan
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Cara Kerja Smart Split
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  Tidak perlu lagi menghitung manual siapa makan apa. Teknologi
                  OCR akan memindai foto struk restoran, mendeteksi harga, dan
                  menghitung tagihan adil beserta pajak atau service charge yang
                  dibagi secara proporsional.
                </p>

                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Pajak dan Service Charge otomatis dibagikan secara adil
                      berdasarkan total jumlah makanan yang Anda pesan. Adil
                      tanpa pusing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: ReceiptText,
                    title: "Foto Struk",
                    desc: "Scan menggunakan kamera smartphone atau unggah file foto struk Anda.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Cek Ulang OCR",
                    desc: "Perhatikan dan edit list item dan harga jika pembacaan belum 100% tepat.",
                  },
                  {
                    icon: UsersRound,
                    title: "Bagi Sesuai Pilihan",
                    desc: "Tentukan 1 menu untuk 1 orang atau bagikan bersama-sama (sharing menu).",
                  },
                  {
                    icon: Send,
                    title: "Share Bukti",
                    desc: "Selesai ditugaskan? Cukup klik 'Share Link' ke grup WhatsApp kalian.",
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

      <RelatedTools
        currentPath="/finansial/split-bill"
        categoryId="finansial"
      />
    </div>
  );
}
