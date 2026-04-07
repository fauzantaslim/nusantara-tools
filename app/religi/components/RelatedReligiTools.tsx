import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { TOOLS } from "@/lib/data";

export function RelatedReligiTools({ currentPath }: { currentPath: string }) {
  // Ambil tools religi selain halaman yang sedang dibuka
  const tools = TOOLS.filter(
    (t) => t.category === "Religi" && t.path !== currentPath,
  ).slice(0, 3);

  if (tools.length === 0) return null;

  return (
    <div className="w-full border-t border-[#EDE0D0] pt-12 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-primary">
            Kalkulator Religi Lainnya
          </h2>
          <p className="text-secondary font-body mt-1 text-sm sm:text-base">
            Eksplorasi utilitas ibadah kami yang lain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            href={tool.path}
            key={tool.id}
            className="group bg-white rounded-3xl border border-[#EDE0D0]/80 p-6 flex flex-col transition-all duration-300 hover:border-[#4A7C59]/40 hover:shadow-xl hover:shadow-[#4A7C59]/5 hover:-translate-y-1 relative overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A7C59]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner bg-[#E8F5E9] border border-[#4A7C59]/20 mb-5">
                <tool.icon className="w-6 h-6 text-[#4A7C59]" />
              </div>

              <h3 className="font-heading font-extrabold text-lg text-primary group-hover:text-[#4A7C59] transition-colors mb-2">
                {tool.name}
              </h3>
              <p className="text-secondary font-body text-sm leading-relaxed mb-6 flex-grow">
                {tool.desc}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-muted/50 mt-auto">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-widest group-hover:text-[#4A7C59] transition-colors">
                  Buka Tool
                </span>
                <div className="w-8 h-8 rounded-full bg-surface group-hover:bg-[#4A7C59] flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
