"use client";

import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export function ShortLinkRedirectError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center text-center gap-6 border border-[#EDE0D0]">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold font-heading text-primary">
          Tautan Tidak Valid
        </h1>
        <p className="text-secondary font-body">
          Tautan tidak ditemukan, sudah dihapus, atau penulisan kodenya salah.
        </p>
        <Link
          href="/utilitas/url-shortener"
          className="mt-4 px-6 py-3 bg-[#1A0E07] text-[#F5EDE3] font-bold font-ui rounded-xl shadow-lg hover:bg-[#2C1A0E] transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke URL Shortener
        </Link>
      </div>
    </div>
  );
}
