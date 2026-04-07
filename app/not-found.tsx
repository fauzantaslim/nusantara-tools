import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] px-4 py-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-3/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Icon */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-accent-3/20 animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute inset-3 rounded-full border border-muted/40" />
          <SearchX className="w-16 h-16 text-accent-3/50" />
        </div>

        {/* Error Code */}
        <span className="text-8xl sm:text-9xl font-black font-heading text-primary/10 leading-none select-none mb-2">
          404
        </span>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-primary tracking-tight -mt-6 mb-3">
          Halaman Tidak Ditemukan
        </h1>

        {/* Description */}
        <p className="text-base text-secondary font-body leading-relaxed mb-8 max-w-sm">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. Silakan
          kembali ke beranda untuk melanjutkan.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-accent-3 text-[#FFF0EB] font-ui font-bold text-sm shadow-lg shadow-accent-3/20 hover:shadow-accent-3/30 border-b-4 border-[#7A3A1E] hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] transition-all group"
        >
          <Home className="w-4.5 h-4.5" />
          Kembali ke Beranda
        </Link>

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
