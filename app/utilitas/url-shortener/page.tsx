"use client";
import { RelatedTools } from "@/components/layout/RelatedTools";

import React from "react";
import { Breadcrumbs } from "@/ui/Breadcrumbs";
import { useUrlShortener } from "@/features/url-shortener/hooks/useUrlShortener";
import { UrlForm } from "@/features/url-shortener/components/UrlForm";
import { UrlList } from "@/features/url-shortener/components/UrlList";
import {
  Info,
  CheckCircle2,
  Link,
  Zap,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export default function UrlShortenerPage() {
  const { urls, shortenUrl, deleteUrl, copyToClipboard, isCopied } =
    useUrlShortener();

  return (
    <div className="flex flex-col gap-12 w-full pb-20">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { label: "Produktivitas", href: "/produktivitas" },
            { label: "URL Shortener" },
          ]}
        />
        <div className="mt-2">
          <h1 className="text-3xl sm:text-4xl font-black text-primary font-heading tracking-tight">
            URL Shortener
          </h1>
          <p className="text-base sm:text-lg text-secondary font-body mt-1">
            Persingkat link Anda, bagikan dengan mudah, dan pantau
            penggunaannya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative my-4">
        {/* Left Side: Form */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <UrlForm onShorten={shortenUrl} />
        </div>

        {/* Right Side: List & Stats */}
        <div className="lg:col-span-7">
          <UrlList
            urls={urls}
            onCopy={copyToClipboard}
            onDelete={deleteUrl}
            copiedCode={isCopied}
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
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A0E07] rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="flex flex-col gap-16 lg:gap-24 relative z-10">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <span className="text-[#C17A3A] font-bold tracking-widest uppercase text-xs mb-4 block">
                  Manajemen Tautan Digital
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight mb-6">
                  Apa itu URL Shortener?
                </h2>
                <p className="text-lg text-[#EDE0D0] font-body leading-relaxed mb-10 opacity-90">
                  URL Shortener adalah alat yang mengonversi tautan web yang
                  panjang, rumit, dan sulit diingat menjadi versi yang jauh
                  lebih singkat dan estetis. Alat ini merupakan kebutuhan wajib
                  dalam strategi digital marketing dan berbagi informasi di
                  media sosial.
                </p>

                <div className="flex p-6 sm:p-8 rounded-3xl bg-[#1A0E07]/40 border border-[#7A5C42]/30 flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 backdrop-blur-sm mx-auto text-left shadow-inner">
                  <Info className="w-8 h-8 sm:w-10 sm:h-10 text-[#C17A3A] shrink-0" />
                  <div className="flex flex-col gap-3">
                    <p className="text-[#F5EDE3] font-heading font-medium text-lg leading-snug">
                      Gunakan tautan pendek untuk memberikan kesan yang
                      profesional, sambil mengumpulkan data berharga tentang
                      siapa yang mengklik tautan Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Link,
                    title: "Salin Tautan",
                    desc: "Tempelkan tautan URL original Anda yang panjang ke dalam kolom input.",
                  },
                  {
                    icon: Zap,
                    title: "Kecilkan Seketika",
                    desc: "Sistem merotasi deretan kode unik acak untuk menjadi ID URL baru.",
                  },
                  {
                    icon: BarChart3,
                    title: "Bagikan & Pantau",
                    desc: "Lacak jumlah klik, lokasi pengunjung, dan tipe perangkat otomatis.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Aman Sepenuhnya",
                    desc: "Proses validasi dan perlindungan bawaan memastikan tautan berfungsi benar.",
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
                    Mengapa Membutuhkan Tautan Pendek?
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center bg-[#1A0E07]/40 p-6 sm:p-10 rounded-[2.5rem] border border-[#7A5C42]/30 shadow-sm">
                  <div className="space-y-6">
                    <p className="text-[#EDE0D0] font-body text-sm leading-relaxed opacity-90">
                      Tautan yang bersih menunjukkan bahwa Anda peduli terhadap
                      detail dan memprioritaskan kenyamanan audiens Anda saat
                      menjelajahi dunia maya.
                    </p>
                    <ul className="space-y-4 font-body text-[#EDE0D0] text-sm">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Lebih Estetis & Profesional:</strong> URL
                          pendek terlihat lebih rapi di deskripsi media sosial,
                          email, atau poster.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>Analytics & Tracking:</strong> URL asli tidak
                          akan memberitahu Anda dari negara mana pengguna
                          berasal atau waktu mereka klik.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#C17A3A] shrink-0 mt-0.5" />
                        <span>
                          <strong>
                            Meningkatkan Click-Through Rate (CTR):
                          </strong>{" "}
                          URL ramah dipercaya memperbesar angka konversi karena
                          tampak tak mencurigakan.
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-full max-w-[300px] aspect-square">
                      <div className="absolute inset-0 bg-[#C17A3A] blur-[60px] opacity-20 animate-pulse" />
                      <div className="relative z-10 w-full h-full border-4 border-[#C17A3A]/20 rounded-full flex flex-col items-center justify-center p-8 text-center bg-[#1A0E07]/40 backdrop-blur-xl gap-2 hover:scale-[1.02] transition-transform duration-500">
                        <div className="flex items-center text-3xl font-black font-heading text-[#C17A3A] tabular-nums">
                          <span>/s/</span>
                          <span className="text-white">qK9xB</span>
                        </div>
                        <span className="text-xs font-bold text-white tracking-widest uppercase mt-4">
                          NusantaraTools
                        </span>
                        <p className="text-[10px] text-[#EDE0D0] opacity-60 mt-4 leading-relaxed italic">
                          &quot;Solusi sederhana untuk memotong panjang URL
                          mencapai lebih dari 90%.&quot;
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
        currentPath="/utilitas/url-shortener"
        categoryId="utilitas"
      />
    </div>
  );
}
