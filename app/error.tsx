"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NusantaraTools Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4 py-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-3/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Icon */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-accent-3/5 border border-accent-3/20" />
          <div className="absolute inset-0 rounded-full border-2 border-accent-3/15 animate-[ping_2s_ease-in-out_infinite]" />
          <AlertTriangle className="w-14 h-14 text-accent-3/60" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary tracking-tight mb-3">
          Terjadi Kesalahan
        </h1>

        {/* Description */}
        <p className="text-base text-secondary font-body leading-relaxed mb-3 max-w-sm">
          Maaf, terjadi kesalahan yang tidak terduga saat memproses halaman ini.
        </p>

        {/* Error digest (for debugging) */}
        {error?.digest && (
          <p className="text-xs font-mono text-secondary/50 bg-muted/50 px-3 py-1.5 rounded-lg mb-6 border border-muted">
            Kode: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-accent-3 text-[#FFF0EB] font-ui font-bold text-sm shadow-lg shadow-accent-3/20 border-b-4 border-[#7A3A1E] hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] transition-all group cursor-pointer"
          >
            <RefreshCw className="w-4.5 h-4.5 group-hover:rotate-180 transition-transform duration-500" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-transparent text-primary font-ui font-bold text-sm border-2 border-muted hover:border-secondary/40 hover:bg-muted/30 transition-all"
          >
            <Home className="w-4.5 h-4.5" />
            Beranda
          </Link>
        </div>

        {/* Batik-inspired decorative line */}
        <div className="mt-12 flex items-center gap-2 opacity-30">
          <div className="w-8 h-px bg-secondary" />
          <div className="w-2 h-2 rounded-full bg-accent-1" />
          <div className="w-16 h-px bg-secondary" />
          <div className="w-2 h-2 rounded-full bg-accent-3" />
          <div className="w-16 h-px bg-secondary" />
          <div className="w-2 h-2 rounded-full bg-accent-1" />
          <div className="w-8 h-px bg-secondary" />
        </div>
      </div>
    </div>
  );
}
