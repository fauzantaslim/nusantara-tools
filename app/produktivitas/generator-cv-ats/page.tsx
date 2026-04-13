"use client";

import React from "react";
import { useCVATS } from "@/features/cv-ats/hooks/useCVATS";
import { CVATSForm } from "@/features/cv-ats/components/CVATSForm";
import { CVATSPreview } from "@/features/cv-ats/components/CVATSPreview";
import { Info, Briefcase } from "lucide-react";

export default function CVATSPage() {
  const cvHook = useCVATS();

  if (!cvHook.isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary">
        Memuat...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-2">
          <Briefcase className="w-4 h-4" /> Karir & Produktivitas
        </div>
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading text-primary tracking-tight">
            Generator CV ATS-Friendly
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-2">
            Buat daftar riwayat hidup gratis yang dioptimasi khusus untuk dibaca
            oleh Applicant Tracking System (ATS).
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Form */}
        <div className="lg:col-span-5 h-full">
          <CVATSForm cvHook={cvHook} />
        </div>

        {/* Right Side: Preview */}
        <div className="lg:col-span-7 h-full">
          <CVATSPreview cvHook={cvHook} />
        </div>
      </div>

      {/* Informational Section */}
      <div className="mt-16 mb-24">
        <div className="bg-[#2C1A0E] text-[#F5EDE3] rounded-[3rem] p-8 sm:p-12 shadow-2xl relative border border-[#7A5C42]/30 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C17A3A] rounded-full blur-[120px] opacity-10 -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#9C4A2A] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/3" />
          </div>

          <div className="relative z-10 flex flex-col gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                Panduan Terbaik
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white leading-tight mb-6">
                Apa Itu CV ATS?
              </h2>
              <p className="text-lg text-[#EDE0D0] font-body leading-relaxed opacity-90">
                Applicant Tracking System (ATS) adalah perangkat lunak yang
                digunakan HRD untuk menyaring ribuan CV yang masuk. CV yang baik
                adalah CV yang mudah dibaca oleh robot ini. Tanpa tabel, grafik,
                kolom yang rumit, atau gambar/icon berukuran besar.
              </p>
            </div>

            <div className="flex bg-[#1A0E07]/40 border border-[#7A5C42]/30 p-6 sm:p-8 rounded-3xl items-start gap-5">
              <Info className="w-8 h-8 text-[#C17A3A] shrink-0" />
              <div className="flex flex-col gap-2">
                <p className="font-heading font-medium text-lg text-[#F5EDE3]">
                  Rahasia Lolos Mesin ATS
                </p>
                <ul className="text-sm text-[#EDE0D0] leading-relaxed opacity-80 list-disc pl-4 space-y-2">
                  <li>
                    <strong>Gunakan Kata Kunci (Keywords):</strong> Pastikan ada
                    kecocokan kosakata antara skill yang Anda miliki dengan
                    persyaratan di deskripsi lowongan pekerjaan (Job
                    Description).
                  </li>
                  <li>
                    <strong>Ganti Grafik dengan Angka Nyata:</strong> Daripada
                    memakai bar grafik untuk rating skill, lebih baik menulis{" "}
                    <em>
                      &quot;Meningkatkan engagement sosial media hingga
                      30%&quot;
                    </em>{" "}
                    di pengalaman kerja.
                  </li>
                  <li>
                    <strong>Standardisasi Judul Bagian:</strong> Jangan
                    menggunakan judul unik seperti{" "}
                    <em>&quot;Penjelajahan Karirku&quot;</em>. Gunakan judul
                    standar yang dikenali sistem: &ldquo;Experience&rdquo;,
                    &ldquo;Education&rdquo;, &ldquo;Skills&rdquo;.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
