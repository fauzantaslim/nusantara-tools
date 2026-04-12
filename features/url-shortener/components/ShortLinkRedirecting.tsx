"use client";

import { useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";

interface ShortLinkRedirectingProps {
  targetUrl: string;
}

export function ShortLinkRedirecting({ targetUrl }: ShortLinkRedirectingProps) {
  useEffect(() => {
    // Small delay to ensure the user sees the page and to allow server-side operations to settle
    const timer = setTimeout(() => {
      window.location.replace(targetUrl);
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EDE3] p-4 font-body">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full flex flex-col items-center text-center gap-6 border border-[#EDE0D0]">
        <div className="w-20 h-20 bg-[#fff3e0] text-[#C17A3A] rounded-full flex items-center justify-center mb-2 animate-pulse">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-heading text-[#2C1A0E]">
            Sedang Mengalihkan...
          </h1>
          <p className="text-[#7A5C42] text-sm">
            Tunggu sebentar, kami sedang membawa Anda ke tujuan.
          </p>
        </div>

        <div className="w-full bg-[#F5EDE3] p-4 rounded-xl border border-[#EDE0D0] overflow-hidden">
          <p className="text-xs font-mono text-[#7A5C42] truncate mb-1 uppercase tracking-wider">
            Tujuan:
          </p>
          <p className="text-[#2C1A0E] font-medium truncate text-sm">
            {targetUrl}
          </p>
        </div>

        <a
          href={targetUrl}
          className="mt-2 text-[#C17A3A] hover:text-[#2C1A0E] transition-colors text-sm font-ui font-semibold flex items-center gap-2 group"
        >
          Klik di sini jika Anda tidak dialihkan otomatis
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        <div className="pt-4 mt-2 border-t border-[#EDE0D0] w-full">
          <p className="text-[10px] text-[#7A5C42] uppercase tracking-[0.2em] font-ui font-bold opacity-60">
            NusantaraTools
          </p>
        </div>
      </div>
    </div>
  );
}
